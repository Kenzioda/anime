<?php







if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = $_POST['to'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $headers = 'From: ' . $name . ' <' . $email . '>' . "\r\n" .
               'Reply-To: ' . $email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo "Your message has been sent. Thank you!";
    } else {
        http_response_code(500);
        echo "Error: Failed to send message.";
    }
} else {
    http_response_code(400);
    echo "Error: Invalid request.";
}


?>