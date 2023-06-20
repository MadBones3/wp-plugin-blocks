<?php
// interject inline js script 
function up_enqueue_scripts() {
    $authURLs = json_encode([
        'signup'    => esc_url_raw(rest_url('up/v1/signup')),
        'signin'    => esc_url_raw(rest_url('up/v1/signin'))
    ]);

    wp_add_inline_script(
        'udemy-plus-auth-modal-view-script',
        "const up_auth_rest = {$authURLs}",
        'before'
    );
}