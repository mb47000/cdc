<?php
$mainFolderPath = '/cdc/';
$indexRootPath = $_SERVER['DOCUMENT_ROOT'] . $mainFolderPath;

try {
require('controller/userController.php');
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        if (isset($_POST['navSection']) && !empty($_POST['navSection'])) {
            
            switch ($_POST['navSection']) {
                case 'Médias':
                    mediasContent();
                    break;
                case 'Contact':
                    // contact media
                    break;

                default:
                indexContent();
            }

        } elseif (isset($_POST['userAction']) && !empty($_POST['userAction'])) {
            //post form
        }
    } else {
        homePage();
    }
} catch (Exception $error) {
    echo 'Erreur : ' . $error->getMessage();
}
