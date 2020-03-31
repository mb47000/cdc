<?php
$mainFolderPath = '/cdc/';
$indexRootPath = $_SERVER['DOCUMENT_ROOT'] . $mainFolderPath;

try {

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            require('controller/userController.php');

        if (isset($_POST['navSection']) && !empty($_POST['navSection'])) {
            
            switch ($_POST['navSection']) {
                case 'media':
                    // page media
                    break;
                case 'contact':
                    // contact media
                    break;

                default:
                homePage();
            }
        } elseif (isset($_POST['userAction']) && !empty($_POST['userAction'])) {
            //post form
        }
    } else {
        require('controller/userController.php');
        homePage();
    }
} catch (Exception $error) {
    echo 'Erreur : ' . $error->getMessage();
}
