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

 

navigator.serviceWorker.register('http://localhost/firebase-messaging-sw.js') // register firebase service worker 
.then((registration) => {
	messaging.useServiceWorker(registration);

	messaging.requestPermission()
	.then(function() {
		console.log('Have permission');
	    return messaging.getToken();
	})
	.then(function(token) {
	    console.log(token);
	})
	.catch(function(err) {
	    console.log('Error Occured', err);
	})

	messaging.onMessage(function(payLoad) {
    console.log('OnMessage', payLoad);
    // Showing notification data form payLoad
    const title = payLoad.data.title;
    const options = {
      body: payLoad.data.body
    }
    // Show Notification
    registration.showNotification(title, options);
  });
});








