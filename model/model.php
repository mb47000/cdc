<?php

function text()
{
    global $indexRootPath;

    include($indexRootPath . "model/INC/config.inc.php");

    $dbh = new PDO($dsn, $username, $password, $options);
    // $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $textRequest = $dbh->prepare("SELECT cdc_text FROM `cdctext` WHERE cdc_nameText LIKE 'Index Content';");
    $textRequest->execute();
    $dbh = null;

    return  $textRequest;
}

function sendMail()
{
    $lastName = $_POST["nom"];
    $firstName = $_POST["prenom"];
    $replyMail = $_POST["email"];
    $contentMail = $_POST["message"] . "\r\n $lastName $firstName";
    $to = "mbweb47@gmail.com"; //afpa.webdesigners.begles@gmail.com
    $subject = 'Audit AFPA DWWM';
    $headers = "From: $replyMail" . "\r\n" .
        "Reply-To: $replyMail" . "\r\n" .
        "X-Mailer: PHP/ . phpversion()";

    if (mail($to, $subject, $contentMail, $headers)) {
        return true;
    } else {
        return false;
    }
}
