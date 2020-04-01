<?php 
require($indexRootPath . 'view/user/INC/header.inc.php');
?>

<div class="main" id="content">
    <?php
        require($indexRootPath . 'view/user/' . $content);
    ?>
</div>

<?php
require($indexRootPath . 'view/user/INC/footer.inc.php');
?>