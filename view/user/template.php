<?php 
require($indexRootPath . 'view/user/INC/header.inc.php');
?>
<div class="main bg-content align-self-center w-100">
<div class="bg-content text-white d-flex align-items-center justify-content-center h-100" id="content">
    <?php
        require($indexRootPath . 'view/user/' . $content);
    ?>
</div>
</div>
<?php
require($indexRootPath . 'view/user/INC/footer.inc.php');
?>