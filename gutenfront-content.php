<?php

$localised_domain = parse_url( home_url( '/' ), PHP_URL_HOST );

$title = __( 'Block Preview', 'wporg' );

$content = '' . "\n\n";


return compact( 'title', 'content' );
