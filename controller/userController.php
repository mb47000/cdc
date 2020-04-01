<?php

function homePage()
{
    global $indexRootPath;
    global $mainFolderPath;

    $title = 'Accueil';
    $content = 'indexView.php';

    require($indexRootPath . 'view/user/template.php');
}

function indexContent()
{
    global $indexRootPath;
    require($indexRootPath . 'view/user/indexView.php');
}