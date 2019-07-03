<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>
	</head>

	<body <?php body_class( 'folded' ); ?>>
		<div class="gutenberg">
			<div id="editor" class="gutenberg__editor"></div>
			<?php
				if (isset($_GET['block'])) {
					$block = $_GET['block'];

					//TODO: get blocks block_scripts metadata from REST api.
					if ( 'boxer-block' === $block ) {
						$block_files = ['http://plugins.svn.wordpress.org/boxer-block/trunk/editor.css', 'http://plugins.svn.wordpress.org/boxer-block/trunk/style.css', 'http://plugins.svn.wordpress.org/boxer-block/trunk/build/view.js', 'http://plugins.svn.wordpress.org/boxer-block/trunk/build/index.js'];
					}
				} else {
					wp_die();
				}
			?>
			<div class="entry-content">
				<div id="preview" data-script-urls="<?php echo implode( ',', $block_files ); ?>" class="gutenberg__editor">
				</div>
			</div>
		</div>
		<?php wp_footer();?>
	</body>
</html>
