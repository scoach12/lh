/**
 * Einfacher Formular-Handler ohne CORS-Probleme
 * Alternative zu Make.com für Kontaktformulare
 */

function initSimpleContactForm() {
    const form = document.getElementById('contact-form') || document.getElementById('contact-form-modal');
    if (!form) return;

    // Form für Netlify vorbereiten
    form.setAttribute('name', 'contact');
    form.setAttribute('method', 'POST');
    form.setAttribute('data-netlify', 'true');
    form.setAttribute('action', '/thank-you.html');
    
    // Hidden field für Netlify
    const netlifyField = document.createElement('input');
    netlifyField.type = 'hidden';
    netlifyField.name = 'form-name';
    netlifyField.value = 'contact';
    form.appendChild(netlifyField);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        try {
            // Button Status ändern
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            
            // Formulardaten sammeln
            const formData = new FormData(form);
            
            // Zusätzliche Daten hinzufügen
            formData.append('timestamp', new Date().toISOString());
            formData.append('source', window.location.href);
            
            // An Netlify senden
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                // Erfolg anzeigen
                showSuccessMessage('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.');
                form.reset();
                
                // Bei eigenständiger Seite: Nach oben scrollen
                if (window.location.pathname.includes('kontakt.html')) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Modal schließen (falls noch vorhanden)
                    setTimeout(() => {
                        const modal = document.getElementById('kontaktModal');
                        if (modal) modal.classList.add('hidden');
                    }, 3000);
                }
                
            } else {
                throw new Error('Netzwerk-Fehler');
            }
            
        } catch (error) {
            console.error('Fehler:', error);
            showErrorMessage('Es tut uns leid, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.');
        } finally {
            // Button zurücksetzen
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

/**
 * Erfolgs-Nachricht anzeigen
 */
function showSuccessMessage(message) {
    createNotification(message, 'success');
}

/**
 * Fehler-Nachricht anzeigen
 */
function showErrorMessage(message) {
    createNotification(message, 'error');
}

/**
 * Notification erstellen
 */
function createNotification(message, type = 'info') {
    // Entferne bestehende Notifications
    const existing = document.querySelectorAll('.notification-toast');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                ${type === 'success' ? '<i class="fas fa-check-circle text-xl"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle text-xl"></i>' : 
                  '<i class="fas fa-info-circle text-xl"></i>'}
            </div>
            <div class="ml-3 pr-8">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="absolute top-2 right-2 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Automatisch nach 6 Sekunden entfernen
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 6000);
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    // Warte kurz, dann initialisiere
    setTimeout(initSimpleContactForm, 300);
});