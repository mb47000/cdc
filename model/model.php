<?php

include($indexRootPath . "model/INC/config.inc.php");

$dbh = new PDO($dsn, $username, $password, $options);
// $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function text()
{
    global $dbh;

    $textRequest = $dbh->prepare("SELECT cdc_text FROM `cdctext` WHERE cdc_nameText LIKE 'Index Content';");

    $textRequest->execute();

    $dbh = null;

    return  $textRequest;
}
