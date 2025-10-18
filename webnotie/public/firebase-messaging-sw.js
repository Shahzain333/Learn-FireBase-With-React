importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
   apiKey: "AIzaSyDQl69C5gRfwNFF-PXR75h0w9cOdtRUtBg",
  authDomain: "web-notification-e9eed.firebaseapp.com",
  projectId: "web-notification-e9eed",
  storageBucket: "web-notification-e9eed.firebasestorage.app",
  messagingSenderId: "714636090903",
  appId: "1:714636090903:web:666851d86ba54ec4cd4652"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});