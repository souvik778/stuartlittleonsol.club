<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the name
    if (empty(trim($_POST["name"]))) {
        $nameErr = "Name is required.";
    } else {
        $name = htmlspecialchars(trim($_POST["name"]));
    }

    // Sanitize and validate the email
    if (empty(trim($_POST["email"]))) {
        $emailErr = "Email is required.";
    } else {
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format.";
        }
    }

    // Sanitize and validate the message
    if (empty(trim($_POST["message"]))) {
        $messageErr = "Message is required.";
    } else {
        $message = htmlspecialchars(trim($_POST["message"]));
    }

    // Check for errors
    if (empty($nameErr) && empty($emailErr) && empty($messageErr)) {
        // Set the recipient email address
        $recipient = "bitelder01@gmail.com"; // Replace with your email address

        // Set the email subject
        $subject = "New contact from $name";

        // Build the email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers
        $email_headers = "From: $name <$email>";

        // Send the email
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Redirect to the thank you page
            header("Location: thankyou.html");
            exit;
        } else {
            // Handle the error if the email couldn't be sent
            echo "Oops! Something went wrong, and we couldn't send your message.";
        }
    } else {
        // Display errors (you can customize this part to better fit your website's design)
        echo "<h3>There were errors in your form submission:</h3>";
        if (!empty($nameErr)) echo "<p>$nameErr</p>";
        if (!empty($emailErr)) echo "<p>$emailErr</p>";
        if (!empty($messageErr)) echo "<p>$messageErr</p>";
        echo "<p>Please go back and fix these errors.</p>";
    }
} else {
    // If the form wasn't submitted via POST, redirect back to the form
    header("Location: contact.html"); // Replace with your contact form page
    exit;
}
?>
