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
// this get user's subsribe from ID channel on HTML tag.
var userChannel = document.getElementById("channel").innerHTML;

navigator.serviceWorker.register('http://localhost/firebase-messaging-sw.js') // register firebase service worker 
.then((registration) => {
	messaging.useServiceWorker(registration);

	// Get Instance ID token. Initially this makes a network call, once retrieved
	// subsequent calls to getToken will return from cache.
	messaging.getToken().then(function(currentToken) {
		if (currentToken) {
			sendTokenToServer(currentToken);
			//updateUIForPushEnabled(currentToken);
		} else {
			// Show permission request.
			console.log('No Instance ID token available. Request permission to generate one.');
			// Show permission UI.
			//updateUIForPushPermissionRequired();
			setTokenSentToServer(false);
		}
	}).catch(function(err) {
		console.log('An error occurred while retrieving token. ', err);
		setTokenSentToServer(false);
	});

	// [START refresh_token]
	// Callback fired if Instance ID token is updated.
	messaging.onTokenRefresh(function() {
		messaging.getToken().then(function(refreshedToken) {
			console.log('Token refreshed.');
			// Indicate that the new Instance ID token has not yet been sent to the
			// app server.
			setTokenSentToServer(false);
			// Send Instance ID token to app server.
			sendTokenToServer(refreshedToken);
			// [START_EXCLUDE]
			// Display new Instance ID token and clear UI of all previous messages.
			//resetUI();
			// [END_EXCLUDE]
		}).catch(function(err) {
			console.log('Unable to retrieve refreshed token ', err);
		});
	});

	function isTokenSentToServer() {
    	return window.localStorage.getItem('sentToServer') === '1';
  	}

	function setTokenSentToServer(sent) {
    	window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  	}

  	// Send the Instance ID token your application server, so that it can:
  	// - send messages back to this app
  	// - subscribe/unsubscribe the token from topics
  	function sendTokenToServer(currentToken) {
  		if (!isTokenSentToServer()) {
  			console.log('Sending token to server...');
  			// TODO(developer): Send the current token to your server.
  			setTokenSentToServer(true);
  		} else {
  			console.log('Token already sent to server so won\'t send it again ' + 'unless it changes');
  		}
  	}


	messaging.requestPermission()
	.then(function() {
		console.log('Have permission');
	    return messaging.getToken();
	})
	.then(function(token) {
	    console.log(token);
	    // register user's token to some topic
	    subscribe(token, userChannel);
	})
	.catch(function(err) {
	    console.log('Error Occured', err);
	})


	messaging.onMessage(function(payLoad) {
	    console.log('OnMessage', payLoad);
	    // Showing notification data form payLoad
	    const title = payLoad.notification.title;
	    const options = {
	      body: payLoad.notification.body,
	      click_action: payLoad.notification.click_action
	    }
	    // Show Notification
	    registration.showNotification(title, options);
	});

	// subsribe user's token to some topic.
	function subscribe(token, topic) {
		fetch('https://iid.googleapis.com/iid/v1/'+ token +'/rel/topics/' + topic, {
			method: 'POST',
			// Authorization: key=<your_server_key>
			headers: new Headers({
				'Authorization': 'key=AAAAq7m9O1U:APA91bFIqnWbILVhSmL7R2gKR60ed2Dv-h4IDArb6tuRIYqKks8DQ6yHvDZYoIw4Yin9L0iQIE9zr_xbn5Rb3oh8NgmW3w13rjxED2Qvy8TP_7VphcpuPe946UQyI8lx_BRaSElTjclQ',
				'Content-Type': 'application/json'
			})
		})
		.then(response => {
			if(response.status < 200 || response.status >=400) {
				throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
			}
			console.log('Subscribed to ' + topic);
		})
		.catch(function(err) {
			console.log(err)
		})
	}

});








