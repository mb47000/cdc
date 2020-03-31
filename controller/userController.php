<?php

function homePage()
{
    global $indexRootPath;
    global $mainFolderPath;

    $title = 'Accueil';
    $content = 'indexView.php';

    require($indexRootPath . 'view/user/template.php');
}