importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0wpXiVL4wOROPVo-zv8xvmx4qSXOGg50",
    authDomain: "buziness-46ae2.firebaseapp.com",
    databaseURL: "https://buziness-46ae2.firebaseio.com",
    projectId: "buziness-46ae2",
    storageBucket: "buziness-46ae2.appspot.com",
    messagingSenderId: "737555594069"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();	

  messaging.setBackgroundMessageHandler(function(payLoad) {
    const title = payLoad.notification.title;
    const options = {
      body: payLoad.notification.body,
      click_action: payLoad.notification.click_action
    }
  	return self.registration.showNotification(title, options);
  });