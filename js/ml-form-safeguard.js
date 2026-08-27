/*
 * MailerLite Formular-Sicherung
 * ------------------------------------------------------------
 * Problem: MailerLite bindet den echten AJAX-Submit-Handler erst,
 * nachdem sein Skript asynchron jQuery + Input-Mask-Plugin nachgeladen
 * hat. Klickt eine Besucherin auf "Absenden", BEVOR dieser Handler
 * gebunden ist (z.B. direkter Klick nach dem Laden der Seite oder bei
 * langsamer Verbindung), löst der Browser stattdessen die native
 * HTML-Formular-Übermittlung aus (echter POST in einen neuen leeren
 * Tab wegen target="_blank"). Die Anmeldung wird dann NICHT über den
 * korrekten JSONP-Ajax-Mechanismus gemeldet, den MailerLite fürs
 * Dashboard/Automations-Tracking benutzt, und die Nutzerin sieht keine
 * Erfolgsmeldung.
 *
 * Lösung: Wir fangen den nativen "submit" auf Capture-Phase JEDES
 * MailerLite-Formulars ab, verhindern IMMER die native Übermittlung,
 * und lösen die Übermittlung stattdessen manuell über denselben
 * JSONP-GET-Mechanismus aus, den MailerLite selbst verwendet -
 * unabhängig davon, ob deren eigener Handler schon gebunden hat.
 */
(function () {
  function buildGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function getGuid() {
    try {
      if (window.localStorage) {
        var stored = window.localStorage.getItem('ml_guid');
        if (stored) return stored;
        var fresh = buildGuid();
        window.localStorage.setItem('ml_guid', fresh);
        return fresh;
      }
    } catch (e) {}
    return buildGuid();
  }

  function showServerError(form, message) {
    var wrapper = form.closest('.ml-form-embedBody') || form;
    var errorBox = wrapper.querySelector('.ml-form-safeguard-error');
    if (!errorBox) {
      errorBox = document.createElement('p');
      errorBox.className = 'ml-form-safeguard-error';
      errorBox.style.cssText = 'color:#dc2626;font-size:0.875rem;margin-top:0.75rem;';
      form.parentNode.insertBefore(errorBox, form.nextSibling);
    }
    errorBox.textContent = message;
  }

  function showSuccess(form) {
    var container = form.closest('.ml-form-embedContainer') || form.closest('.ml-embedded') || form.parentNode;
    var successBlock = container ? container.querySelector('.ml-block-success, .ml-form-successBody, .ml-form-embedSuccessBody') : null;
    var formBlock = container ? container.querySelector('.ml-block-form') : null;
    if (successBlock && formBlock) {
      successBlock.style.display = '';
      formBlock.style.display = 'none';
    } else {
      showServerError(form, 'Danke! Bitte schau in dein E-Mail-Postfach (ggf. Spam-Ordner), um deine Anmeldung zu bestätigen.');
    }
  }

  // WICHTIG: MailerLites Server verpackt die Antwort NUR als ausfuehrbares
  // JavaScript (fuer <script src="..."> nutzbar), wenn der callback-Parameter
  // exakt "mlWebformSubmitted" lautet. Bei jedem anderen Namen (auch
  // Gross-/Kleinschreibungs-Varianten) liefert der Server rohes JSON
  // zurueck, das als Script-Inhalt ungueltig ist und lautlos fehlschlaegt.
  // Deshalb muessen wir diesen festen Namen verwenden und Submits bei
  // Bedarf nacheinander abarbeiten (Queue), statt pro Submit einen eigenen
  // eindeutigen Callback-Namen zu erzeugen.
  var FIXED_CALLBACK_NAME = 'mlWebformSubmitted';
  var jsonpQueue = [];
  var jsonpBusy = false;

  function processJsonpQueue() {
    if (jsonpBusy || jsonpQueue.length === 0) return;
    jsonpBusy = true;
    var job = jsonpQueue.shift();
    runJsonpRequest(job.action, job.params, job.onDone);
  }

  function runJsonpRequest(action, params, onDone) {
    var script = document.createElement('script');
    var cleaned = false;
    var timeoutId;

    function cleanup(result) {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(timeoutId);
      window[FIXED_CALLBACK_NAME] = function () {}; // evtl. verspaetete Antwort ignorieren
      if (script.parentNode) script.parentNode.removeChild(script);
      jsonpBusy = false;
      onDone(result);
      processJsonpQueue();
    }

    window[FIXED_CALLBACK_NAME] = function (response) {
      cleanup({ ok: true, response: response });
    };

    script.onerror = function () {
      cleanup({ ok: false, error: 'network' });
    };

    params.set('callback', FIXED_CALLBACK_NAME);
    script.src = action + (action.indexOf('?') > -1 ? '&' : '?') + params.toString();
    script.async = true;
    document.head.appendChild(script);

    timeoutId = setTimeout(function () {
      cleanup({ ok: false, error: 'timeout' });
    }, 10000);
  }

  function submitViaJsonp(form) {
    var action = form.getAttribute('action');
    if (!action) return;

    var params = new URLSearchParams();
    var formData = new FormData(form);
    formData.forEach(function (value, key) {
      params.append(key, value);
    });
    params.set('ajax', '1');
    params.set('guid', getGuid());

    jsonpQueue.push({
      action: action,
      params: params,
      onDone: function (result) {
        if (!result.ok) {
          showServerError(
            form,
            'Verbindung zum Server fehlgeschlagen. Bitte versuch es gleich noch einmal.'
          );
          return;
        }
        var response = result.response;
        if (response && response.success) {
          showSuccess(form);
        } else if (response && response.errors) {
          var firstError = 'Bitte überprüfe deine Eingaben.';
          try {
            var fieldErrors = response.errors.fields;
            if (fieldErrors) {
              var firstKey = Object.keys(fieldErrors)[0];
              if (firstKey && fieldErrors[firstKey] && fieldErrors[firstKey][0]) {
                firstError = fieldErrors[firstKey][0];
              }
            }
          } catch (e) {}
          showServerError(form, firstError);
        } else {
          showServerError(form, 'Da ist etwas schiefgelaufen. Bitte versuch es gleich noch einmal.');
        }
      },
    });
    processJsonpQueue();
  }

  function isMailerLiteForm(form) {
    return !!(form.closest('.ml-embedded') || form.classList.contains('ml-block-form'));
  }

  document.addEventListener(
    'submit',
    function (event) {
      var form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!isMailerLiteForm(form)) return;

      // Pflichtfeld-Grundcheck (E-Mail), damit keine leeren Anfragen rausgehen
      var emailInput = form.querySelector('input[name="fields[email]"]');
      if (emailInput && !emailInput.value.trim()) {
        return; // MailerLites eigene Validierung greift, falls schon geladen; sonst einfach nichts tun
      }

      // Immer die native Übermittlung verhindern und stattdessen sicher per JSONP senden.
      event.preventDefault();
      event.stopImmediatePropagation();
      submitViaJsonp(form);
    },
    true // Capture-Phase: läuft VOR MailerLites eigenem Handler
  );
})();
