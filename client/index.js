/**
 * External dependencies.
 */
import React from 'react';
const { render } = window.wp.element;

/**
 * Internal dependencies.
 */
import BlockPreview from 'components/block-preview';

const temp = document.createElement( 'div' );
const scriptUrlsString = document.getElementById( 'preview' ).getAttribute( 'data-script-urls' );
const scriptUrls = scriptUrlsString.split( ',' );

render(
	<BlockPreview scriptUrls={ scriptUrls } />,
	temp
);

setTimeout( () => {
	window.document.querySelector(
		'.entry-content' ).replaceChild( temp.querySelector( '#preview' ),
		document.getElementById( 'preview' )
	);
} );