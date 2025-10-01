<?php
/**
 * Plugin Name: Enhanced REST API Fields
 * Description: Extends WordPress REST API to include plugin fields (ACF, Yoast SEO, Elementor, etc.)
 * Version: 1.0.0
 * Author: FadiTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class EnhancedRestApiFields {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_rest_fields'));
        add_filter('rest_prepare_post', array($this, 'add_plugin_fields_to_posts'), 10, 3);
        add_filter('rest_prepare_page', array($this, 'add_plugin_fields_to_pages'), 10, 3);
    }
    
    /**
     * Register custom REST API fields
     */
    public function register_rest_fields() {
        // Register fields for posts
        register_rest_field('post', 'acf', array(
            'get_callback' => array($this, 'get_acf_fields'),
            'schema' => array(
                'description' => 'ACF custom fields',
                'type' => 'object'
            )
        ));
        
        register_rest_field('post', 'yoast_head_json', array(
            'get_callback' => array($this, 'get_yoast_seo_data'),
            'schema' => array(
                'description' => 'Yoast SEO data',
                'type' => 'object'
            )
        ));
        
        register_rest_field('post', 'elementor_data', array(
            'get_callback' => array($this, 'get_elementor_data'),
            'schema' => array(
                'description' => 'Elementor page builder data',
                'type' => 'object'
            )
        ));
        
        // Register fields for pages
        register_rest_field('page', 'acf', array(
            'get_callback' => array($this, 'get_acf_fields'),
            'schema' => array(
                'description' => 'ACF custom fields',
                'type' => 'object'
            )
        ));
        
        register_rest_field('page', 'yoast_head_json', array(
            'get_callback' => array($this, 'get_yoast_seo_data'),
            'schema' => array(
                'description' => 'Yoast SEO data',
                'type' => 'object'
            )
        ));
        
        register_rest_field('page', 'elementor_data', array(
            'get_callback' => array($this, 'get_elementor_data'),
            'schema' => array(
                'description' => 'Elementor page builder data',
                'type' => 'object'
            )
        ));
    }
    
    /**
     * Get ACF fields for posts and pages
     */
    public function get_acf_fields($object, $field_name, $request) {
        if (!function_exists('get_fields')) {
            return null;
        }
        
        $post_id = $object['id'];
        return get_fields($post_id);
    }
    
    /**
     * Get Yoast SEO data
     */
    public function get_yoast_seo_data($object, $field_name, $request) {
        if (!class_exists('WPSEO_Utils')) {
            return null;
        }
        
        $post_id = $object['id'];
        
        // Get Yoast SEO data
        $yoast_data = array();
        
        // Meta title
        $yoast_data['title'] = get_post_meta($post_id, '_yoast_wpseo_title', true);
        if (empty($yoast_data['title'])) {
            $yoast_data['title'] = get_the_title($post_id);
        }
        
        // Meta description
        $yoast_data['description'] = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
        if (empty($yoast_data['description'])) {
            $yoast_data['description'] = wp_trim_words(get_the_excerpt($post_id), 25, '...');
        }
        
        // Canonical URL
        $yoast_data['canonical'] = get_post_meta($post_id, '_yoast_wpseo_canonical', true);
        
        // Open Graph title
        $yoast_data['og_title'] = get_post_meta($post_id, '_yoast_wpseo_opengraph-title', true);
        if (empty($yoast_data['og_title'])) {
            $yoast_data['og_title'] = $yoast_data['title'];
        }
        
        // Open Graph description
        $yoast_data['og_description'] = get_post_meta($post_id, '_yoast_wpseo_opengraph-description', true);
        if (empty($yoast_data['og_description'])) {
            $yoast_data['og_description'] = $yoast_data['description'];
        }
        
        // Twitter title
        $yoast_data['twitter_title'] = get_post_meta($post_id, '_yoast_wpseo_twitter-title', true);
        if (empty($yoast_data['twitter_title'])) {
            $yoast_data['twitter_title'] = $yoast_data['title'];
        }
        
        // Twitter description
        $yoast_data['twitter_description'] = get_post_meta($post_id, '_yoast_wpseo_twitter-description', true);
        if (empty($yoast_data['twitter_description'])) {
            $yoast_data['twitter_description'] = $yoast_data['description'];
        }
        
        return $yoast_data;
    }
    
    /**
     * Get Elementor data
     */
    public function get_elementor_data($object, $field_name, $request) {
        if (!class_exists('\Elementor\Plugin')) {
            return null;
        }
        
        $post_id = $object['id'];
        $elementor_data = get_post_meta($post_id, '_elementor_data', true);
        
        if ($elementor_data) {
            return json_decode($elementor_data, true);
        }
        
        return null;
    }
    
    /**
     * Add plugin fields to posts
     */
    public function add_plugin_fields_to_posts($data, $post, $request) {
        // Add RankMath data if available
        if (class_exists('RankMath')) {
            $rankmath_data = array();
            $post_id = $post->ID;
            
            // Get RankMath data
            $rankmath_data['title'] = get_post_meta($post_id, 'rank_math_title', true);
            $rankmath_data['description'] = get_post_meta($post_id, 'rank_math_description', true);
            $rankmath_data['canonical_url'] = get_post_meta($post_id, 'rank_math_canonical_url', true);
            $rankmath_data['focus_keyword'] = get_post_meta($post_id, 'rank_math_focus_keyword', true);
            $rankmath_data['facebook_title'] = get_post_meta($post_id, 'rank_math_facebook_title', true);
            $rankmath_data['facebook_description'] = get_post_meta($post_id, 'rank_math_facebook_description', true);
            $rankmath_data['twitter_title'] = get_post_meta($post_id, 'rank_math_twitter_title', true);
            $rankmath_data['twitter_description'] = get_post_meta($post_id, 'rank_math_twitter_description', true);
            
            $data->data['rank_math_seo'] = $rankmath_data;
        }
        
        return $data;
    }
    
    /**
     * Add plugin fields to pages
     */
    public function add_plugin_fields_to_pages($data, $post, $request) {
        // Add RankMath data if available
        if (class_exists('RankMath')) {
            $rankmath_data = array();
            $post_id = $post->ID;
            
            // Get RankMath data
            $rankmath_data['title'] = get_post_meta($post_id, 'rank_math_title', true);
            $rankmath_data['description'] = get_post_meta($post_id, 'rank_math_description', true);
            $rankmath_data['canonical_url'] = get_post_meta($post_id, 'rank_math_canonical_url', true);
            $rankmath_data['focus_keyword'] = get_post_meta($post_id, 'rank_math_focus_keyword', true);
            $rankmath_data['facebook_title'] = get_post_meta($post_id, 'rank_math_facebook_title', true);
            $rankmath_data['facebook_description'] = get_post_meta($post_id, 'rank_math_facebook_description', true);
            $rankmath_data['twitter_title'] = get_post_meta($post_id, 'rank_math_twitter_title', true);
            $rankmath_data['twitter_description'] = get_post_meta($post_id, 'rank_math_twitter_description', true);
            
            $data->data['rank_math_seo'] = $rankmath_data;
        }
        
        return $data;
    }
}

// Initialize the plugin
new EnhancedRestApiFields();

/**
 * Add CORS headers for Next.js frontend
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Expose-Headers: Link');
        return $value;
    });
}, 15);

/**
 * Add custom endpoints for better performance
 */
add_action('rest_api_init', function() {
    // Custom endpoint for pages with all fields
    register_rest_route('faditools/v1', '/pages', array(
        'methods' => 'GET',
        'callback' => function($request) {
            $args = array(
                'post_type' => 'page',
                'post_status' => 'publish',
                'posts_per_page' => 100,
                'orderby' => 'menu_order title',
                'order' => 'ASC'
            );
            
            $pages = get_posts($args);
            $data = array();
            
            foreach ($pages as $page) {
                $page_data = array(
                    'id' => $page->ID,
                    'title' => array('rendered' => $page->post_title),
                    'slug' => $page->post_name,
                    'content' => array('rendered' => $page->post_content),
                    'excerpt' => array('rendered' => $page->post_excerpt),
                    'date' => $page->post_date,
                    'modified' => $page->post_modified,
                    'status' => $page->post_status,
                    'featured_media' => get_post_thumbnail_id($page->ID)
                );
                
                // Add plugin fields
                if (function_exists('get_fields')) {
                    $page_data['acf'] = get_fields($page->ID);
                }
                
                // Add Yoast SEO data
                if (class_exists('WPSEO_Utils')) {
                    $page_data['yoast_head_json'] = array(
                        'title' => get_post_meta($page->ID, '_yoast_wpseo_title', true) ?: $page->post_title,
                        'description' => get_post_meta($page->ID, '_yoast_wpseo_metadesc', true) ?: wp_trim_words($page->post_excerpt, 25, '...'),
                        'canonical' => get_post_meta($page->ID, '_yoast_wpseo_canonical', true),
                        'og_title' => get_post_meta($page->ID, '_yoast_wpseo_opengraph-title', true),
                        'og_description' => get_post_meta($page->ID, '_yoast_wpseo_opengraph-description', true),
                        'twitter_title' => get_post_meta($page->ID, '_yoast_wpseo_twitter-title', true),
                        'twitter_description' => get_post_meta($page->ID, '_yoast_wpseo_twitter-description', true)
                    );
                }
                
                // Add RankMath SEO data
                if (class_exists('RankMath')) {
                    $page_data['rank_math_seo'] = array(
                        'title' => get_post_meta($page->ID, 'rank_math_title', true),
                        'description' => get_post_meta($page->ID, 'rank_math_description', true),
                        'canonical_url' => get_post_meta($page->ID, 'rank_math_canonical_url', true),
                        'focus_keyword' => get_post_meta($page->ID, 'rank_math_focus_keyword', true),
                        'facebook_title' => get_post_meta($page->ID, 'rank_math_facebook_title', true),
                        'facebook_description' => get_post_meta($page->ID, 'rank_math_facebook_description', true),
                        'twitter_title' => get_post_meta($page->ID, 'rank_math_twitter_title', true),
                        'twitter_description' => get_post_meta($page->ID, 'rank_math_twitter_description', true)
                    );
                }
                
                $data[] = $page_data;
            }
            
            return $data;
        },
        'permission_callback' => '__return_true'
    ));
});

/**
 * Chat Settings - Admin Page
 */
class FadiToolsChatSettings {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    public function add_settings_page() {
        add_options_page(
            'Chat Settings',
            'Chat Settings',
            'manage_options',
            'faditools-chat-settings',
            array($this, 'settings_page_html')
        );
    }
    
    public function register_settings() {
        register_setting('faditools_chat_settings', 'faditools_whatsapp_number');
        register_setting('faditools_chat_settings', 'faditools_facebook_link');
        register_setting('faditools_chat_settings', 'faditools_email');
        register_setting('faditools_chat_settings', 'faditools_whatsapp_enabled');
        register_setting('faditools_chat_settings', 'faditools_facebook_enabled');
        register_setting('faditools_chat_settings', 'faditools_email_enabled');
    }
    
    public function settings_page_html() {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        if (isset($_GET['settings-updated'])) {
            add_settings_error('faditools_chat_messages', 'faditools_chat_message', 'Settings Saved', 'updated');
        }
        
        settings_errors('faditools_chat_messages');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('faditools_chat_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="faditools_whatsapp_number">WhatsApp Number</label></th>
                        <td>
                            <input type="text" 
                                   id="faditools_whatsapp_number" 
                                   name="faditools_whatsapp_number" 
                                   value="<?php echo esc_attr(get_option('faditools_whatsapp_number')); ?>" 
                                   class="regular-text"
                                   placeholder="+923001234567">
                            <p class="description">Enter with country code (e.g., +923001234567)</p>
                            <label>
                                <input type="checkbox" 
                                       name="faditools_whatsapp_enabled" 
                                       value="1" 
                                       <?php checked(get_option('faditools_whatsapp_enabled'), 1); ?>>
                                Enable WhatsApp Button
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="faditools_facebook_link">Facebook Page Link</label></th>
                        <td>
                            <input type="text" 
                                   id="faditools_facebook_link" 
                                   name="faditools_facebook_link" 
                                   value="<?php echo esc_attr(get_option('faditools_facebook_link')); ?>" 
                                   class="regular-text"
                                   placeholder="https://www.facebook.com/yourpage">
                            <p class="description">Enter your Facebook page URL</p>
                            <label>
                                <input type="checkbox" 
                                       name="faditools_facebook_enabled" 
                                       value="1" 
                                       <?php checked(get_option('faditools_facebook_enabled'), 1); ?>>
                                Enable Facebook Button
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="faditools_email">Email Address</label></th>
                        <td>
                            <input type="email" 
                                   id="faditools_email" 
                                   name="faditools_email" 
                                   value="<?php echo esc_attr(get_option('faditools_email')); ?>" 
                                   class="regular-text"
                                   placeholder="support@faditools.com">
                            <p class="description">Enter your support email address</p>
                            <label>
                                <input type="checkbox" 
                                       name="faditools_email_enabled" 
                                       value="1" 
                                       <?php checked(get_option('faditools_email_enabled'), 1); ?>>
                                Enable Email Button
                            </label>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save Settings'); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize chat settings
new FadiToolsChatSettings();

/**
 * REST API endpoint for chat settings
 */
add_action('rest_api_init', function() {
    register_rest_route('faditools/v1', '/chat-settings', array(
        'methods' => 'GET',
        'callback' => function($request) {
            return array(
                'whatsapp' => array(
                    'number' => get_option('faditools_whatsapp_number', ''),
                    'enabled' => (bool) get_option('faditools_whatsapp_enabled', false)
                ),
                'facebook' => array(
                    'link' => get_option('faditools_facebook_link', ''),
                    'enabled' => (bool) get_option('faditools_facebook_enabled', false)
                ),
                'email' => array(
                    'address' => get_option('faditools_email', ''),
                    'enabled' => (bool) get_option('faditools_email_enabled', false)
                )
            );
        },
        'permission_callback' => '__return_true'
    ));
});

/**
 * Extend WooCommerce REST API to include SEO data
 */
add_action('rest_api_init', function() {
    // Add SEO fields to WooCommerce products
    register_rest_field('product', 'yoast_head_json', array(
        'get_callback' => function($object) {
            if (!class_exists('WPSEO_Utils')) {
                return null;
            }
            
            $post_id = $object['id'];
            
            return array(
                'title' => get_post_meta($post_id, '_yoast_wpseo_title', true) ?: $object['name'],
                'description' => get_post_meta($post_id, '_yoast_wpseo_metadesc', true) ?: wp_trim_words($object['short_description'], 25, '...'),
                'canonical' => get_post_meta($post_id, '_yoast_wpseo_canonical', true),
                'og_title' => get_post_meta($post_id, '_yoast_wpseo_opengraph-title', true),
                'og_description' => get_post_meta($post_id, '_yoast_wpseo_opengraph-description', true),
                'twitter_title' => get_post_meta($post_id, '_yoast_wpseo_twitter-title', true),
                'twitter_description' => get_post_meta($post_id, '_yoast_wpseo_twitter-description', true)
            );
        },
        'schema' => array(
            'description' => 'Yoast SEO data for WooCommerce products',
            'type' => 'object'
        )
    ));
    
    register_rest_field('product', 'rank_math_seo', array(
        'get_callback' => function($object) {
            if (!class_exists('RankMath')) {
                return null;
            }
            
            $post_id = $object['id'];
            
            return array(
                'title' => get_post_meta($post_id, 'rank_math_title', true),
                'description' => get_post_meta($post_id, 'rank_math_description', true),
                'canonical_url' => get_post_meta($post_id, 'rank_math_canonical_url', true),
                'focus_keyword' => get_post_meta($post_id, 'rank_math_focus_keyword', true),
                'facebook_title' => get_post_meta($post_id, 'rank_math_facebook_title', true),
                'facebook_description' => get_post_meta($post_id, 'rank_math_facebook_description', true),
                'twitter_title' => get_post_meta($post_id, 'rank_math_twitter_title', true),
                'twitter_description' => get_post_meta($post_id, 'rank_math_twitter_description', true)
            );
        },
        'schema' => array(
            'description' => 'RankMath SEO data for WooCommerce products',
            'type' => 'object'
        )
    ));
});
?>
