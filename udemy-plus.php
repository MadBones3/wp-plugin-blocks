<?php 
/*
 * Plugin Name:       Udemy Plus
 * Plugin URI:        https://udemy.com
 * Description:       A plugin for adding blocks to a theme.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Ashton Blignaut
 * Author URI:        https://ashblignaut.co.za
 * Text Domain:       udemy-plus
 * Domain Path:       /languages
 */

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
    echo 'Seems like you stumbled here by accident';
    exit;
}

// Setup
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach($allFiles as $filename) {
    include_once($filename);
}
// Basically what the foreach is doing
// include(UP_PLUGIN_DIR . 'includes/register-blocks.php');
// include(UP_PLUGIN_DIR . 'includes/blocks/search-form.php');

// Hooks
add_action('init', 'up_register_blocks');
add_action('rest_api_init', 'up_rest_api_init');
add_action('wp_enqueue_scripts', 'up_enqueue_scripts');
add_action('init', 'up_recipe_post_type');
