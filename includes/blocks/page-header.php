<?php

function up_page_header_render_cb($attr) {
    $heading = esc_html($attr['content']);

    if($attr['showCategory']) {
        $heading = get_the_archive_title();
    }

    ob_start();

    ?>
    <div class="wp-block-udemy-plus-page-header">
        <div class="inner-page-header">
            <h1><?php echo $heading; ?></h1>
        </div>
    </div>
    <?php

    $output = ob_get_contents();
    ob_end_clean();

    return $output;

}

?>