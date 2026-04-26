<?php

switch ($_SERVER['REQUEST_METHOD']) {

    case "OPTIONS":
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");

        $json   = file_get_contents('php://input');
        $params = json_decode($json);

        // Felder aus dem Booking-Formular
        $name      = htmlspecialchars($params->name);
        $email     = htmlspecialchars($params->email);
        $anlass    = htmlspecialchars($params->anlass);
        $datum     = htmlspecialchars($params->datum);
        $nachricht = htmlspecialchars($params->nachricht);

        $recipient = 'kontakt@aero-art.de';
        $subject   = "Booking-Anfrage: $anlass am $datum";

        $message = "
            <html><body>
            <h2>Neue Booking-Anfrage</h2>
            <table>
                <tr><td><strong>Name:</strong></td><td>$name</td></tr>
                <tr><td><strong>E-Mail:</strong></td><td>$email</td></tr>
                <tr><td><strong>Anlass:</strong></td><td>$anlass</td></tr>
                <tr><td><strong>Datum:</strong></td><td>$datum</td></tr>
                <tr><td><strong>Nachricht:</strong></td><td>$nachricht</td></tr>
            </table>
            </body></html>
        ";

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: kontakt@bastian-wolff.de";
        $headers[] = "Reply-To: $email";

        $success = mail($recipient, $subject, $message, implode("\r\n", $headers));

        http_response_code($success ? 200 : 500);
        echo json_encode(['success' => $success]);
        break;

    default:
        header("Allow: POST", true, 405);
        exit;
}