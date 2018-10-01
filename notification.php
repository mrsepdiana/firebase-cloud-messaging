<?php 
if(!empty($_POST['channel']) && !empty($_POST['message']) && !empty($_POST['title'])) {
	$title = isset($_POST['title']) ? $_POST['title'] : null;
	$message = isset($_POST['message']) ? $_POST['message'] : null;
	$channel = isset($_POST['channel']) ? $_POST['channel'] : null;

	$url = "https://fcm.googleapis.com/fcm/send";
	$data = [
		'notification' => [
			'title' => $title,
			'body' => $message,
			"click_action" => "http://localhost/firebase-cloud-messaging/"
		],
		'to' => '/topics/' . $channel
	];

	$options = [
		'http' => [
			'header' => [
				"Authorization: key=AAAAq7m9O1U:APA91bFIqnWbILVhSmL7R2gKR60ed2Dv-h4IDArb6tuRIYqKks8DQ6yHvDZYoIw4Yin9L0iQIE9zr_xbn5Rb3oh8NgmW3w13rjxED2Qvy8TP_7VphcpuPe946UQyI8lx_BRaSElTjclQ", 
				"Content-type: application/json",
			],
			'method'  => 'POST',
			'content' => json_encode($data)
		]
	];

	$context = stream_context_create($options);
	$result = file_get_contents($url, false, $context);

	header('location: http://localhost/firebase-cloud-messaging/form/announcement.html');

} else {
	$title = null;
	$message = null;
	$channel = null;
	echo 'semua harus disi ya :)';
	return false;
}

        
    
