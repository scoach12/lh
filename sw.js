// Service Worker for Liebe-Heilung.de
// Provides offline functionality and performance improvements

const CACHE_NAME = 'liebe-heilung-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
    'https://cdn.tailwindcss.com'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log('Service Worker: All resources cached');
                return self.skipWaiting();
            })
            .catch(function(error) {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return response;
                }
                
                return fetch(event.request).then(function(response) {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // Return offline page for navigation requests
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', function(event) {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(processContactForm());
    }
});

// Process offline form submissions
function processContactForm() {
    return new Promise(function(resolve, reject) {
        // Get stored form data from IndexedDB
        const request = self.indexedDB.open('liebe-heilung-db', 1);
        
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['form-submissions'], 'readonly');
            const objectStore = transaction.objectStore('form-submissions');
            const getAllRequest = objectStore.getAll();
            
            getAllRequest.onsuccess = function(event) {
                const submissions = event.target.result;
                
                // Process each submission
                const promises = submissions.map(submission => {
                    return fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(submission.data)
                    }).then(response => {
                        if (response.ok) {
                            // Remove from IndexedDB after successful submission
                            const deleteTransaction = db.transaction(['form-submissions'], 'readwrite');
                            const deleteStore = deleteTransaction.objectStore('form-submissions');
                            deleteStore.delete(submission.id);
                        }
                        return response;
                    });
                });
                
                Promise.all(promises)
                    .then(() => resolve())
                    .catch(() => reject());
            };
        };
        
        request.onerror = function() {
            reject();
        };
    });
}

// Push notification handler
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            actions: [
                {
                    action: 'view',
                    title: 'Anzeigen'
                },
                {
                    action: 'dismiss',
                    title: 'Schließen'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker: Registered successfully');