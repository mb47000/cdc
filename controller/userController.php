<?php

require($indexRootPath . 'model/model.php');


function homePage()
{
    global $indexRootPath;
    global $mainFolderPath;

    $title = 'Accueil';
    $content = 'indexView.php';

    $textRequest = text();
    require($indexRootPath . 'view/user/template.php');
}

function indexContent()
{
    global $indexRootPath;

    $textRequest = text();
    require($indexRootPath . 'view/user/indexView.php');
}

function mediasContent() {
    global $indexRootPath;

    require($indexRootPath . 'view/user/mediasView.php');
}

function contactContent() {
    global $indexRootPath;
    require_once($indexRootPath . 'controller/DataValider.php');
    require($indexRootPath . 'view/user/contactView.php');
}