importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Configuración de tu proyecto nene-banko
firebase.initializeApp({
  apiKey: "AIzaSyDummyKey",
  authDomain: "nene-banko-default-rtdb.firebaseapp.com",
  databaseURL: "https://nene-banko-default-rtdb.firebaseio.com",
  projectId: "nene-banko-default-rtdb",
  storageBucket: "nene-banko-default-rtdb.appspot.com",
  messagingSenderId: "100000000000",
  appId: "1:100000000000:web:dummy"
});

const messaging = firebase.messaging();

// Captura y muestra las notificaciones cuando la app está CERRADA
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en segundo plano:', payload);
  
  const notificationTitle = payload.notification ? payload.notification.title : (payload.data ? payload.data.title : 'VERSO Chat');
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : (payload.data ? payload.data.body : 'Tienes un nuevo mensaje'),
    icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    vibrate: [100, 50, 100],
    data: { url: '/' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('/');
    })
  );
});
