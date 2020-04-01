<?php
$text = $textRequest->fetch(PDO::FETCH_ASSOC);
?>

<p class="m-4">
    <?=  $text['cdc_text']; ?>
</p>
