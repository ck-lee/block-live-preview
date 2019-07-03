import React from 'react';
import Script from 'react-load-script';

const { serialize, createBlock, getBlockTypes }  = window.wp.blocks;
const { withSelect } = window.wp.data;

function BlockPreview( props ) {
	const { scriptUrls, blocks } = props;

	const previewHtml = {
		__html: serialize( blocks ),
	};

	const scripts = [];
	const css = [];

	scriptUrls.forEach( file => {
		if ( file.match( /\.js$/ig ) ) {
			scripts.push( file );
		} else if ( file.match( /\.css$/ig ) ) {
			css.push( file );
		}
	} );

	let scriptsCount = scripts.length;

	const scriptLoaded = () => {
		scriptsCount--;
		if ( scriptsCount > 0 ) {
			return;
		}
		const registeredBlocks = getBlockTypes();
		if ( registeredBlocks.length ) {
			const block = createBlock( registeredBlocks[registeredBlocks.length - 1].name );
			window.wp.data.dispatch( 'core/editor' ).insertBlock( block );
		}
	};

	return (
		<div id="preview">
			{ scripts.map( ( scriptUrl, index ) =>
				<Script
					key={ index }
					url={ scriptUrl }
					onLoad={ scriptLoaded }
				></Script>
			) }
			{ css.map( ( cssUrl, index ) =>
				<link
					key={ index }
					rel="stylesheet"
					type="text/css"
					href={ cssUrl }
				></link>
			) }
			<div className="preview-container">
				<div className="playground__preview" dangerouslySetInnerHTML={ previewHtml }></div>
			</div>
		</div>
	);
}

export default withSelect( select => {
	const { getBlocks } = select('core/editor');
    return {
        blocks: getBlocks(),
    }
} )( BlockPreview );