<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?= $title ?></title>
    <!-- Custom fonts for this template-->
    <link href="<?= $mainFolderPath ?>vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <!-- Custom styles for this template-->
    <link id="mainStyle1" rel="stylesheet" href="<?= $mainFolderPath ?>public/css/style.min.css">
    <link id="mainStyle" rel="stylesheet" href="<?= $mainFolderPath ?>public/css/animate.css">

</head>

<body class="d-flex flex-column">
    <nav class="navbar navbar-dark bg-primary navbar-expand-md">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbar">
            <ul class="navbar-nav text-white">
                <li class="nav-item">
                    <a class="nav-link" href="<?= $mainFolderPath . "index.php" ?>">Accueil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= $mainFolderPath . "controller/produit.php?type=complete" ?>">Médias</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= $mainFolderPath . "controller/recapContact.php" ?>">Contact</a>
                </li>
            </ul>
        </div>
    </nav>