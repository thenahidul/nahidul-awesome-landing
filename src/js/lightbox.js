import VideoPlayer from './video-player';

class Lightbox {
	constructor() {
		this.lightbox = null;
		this.overlay = null;
		this.content = null;

		this.init();
	}

	// Initialize lightbox structure and events
	init() {
		this.buildLightbox();
		this.bindEvents();
	}

	// Build DOM elements for lightbox
	buildLightbox() {
		this.overlay = document.createElement( 'div' );
		this.overlay.className = 'naf-lightbox-overlay';

		this.lightbox = document.createElement( 'div' );
		this.lightbox.className = 'naf-lightbox';

		this.content = document.createElement( 'div' );
		this.content.className = 'naf-lightbox-content';

		this.lightbox.appendChild( this.content );
		this.overlay.appendChild( this.lightbox );
		document.body.appendChild( this.overlay );

		// Close on overlay click
		this.overlay.addEventListener( 'click', ( event ) => {
			if ( event.target === this.overlay ) {
				this.close();
			}
		} );
	}

	// Bind click events on trigger links
	bindEvents() {
		const triggers = document.querySelectorAll( '.js-naf-lightbox' );

		triggers.forEach( ( trigger ) => {
			trigger.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				const href = trigger.getAttribute( 'href' );
				this.open( href, trigger );
			} );
		} );
	}

	// Open image or video in lightbox
	open( url, trigger = null ) {
		this.content.innerHTML = '';

		if ( this.isVideo( url ) ) {
			const videoPlayer = new VideoPlayer( url, this.content );
			videoPlayer.playVideo();
		} else if ( trigger?.querySelector( 'img' ) ) {
			const clonedImage = trigger.querySelector( 'img' ).cloneNode( true );
			this.content.appendChild( clonedImage );
		} else {
			const img = document.createElement( 'img' );
			img.src = url;
			img.alt = '';
			this.content.appendChild( img );
		}

		this.overlay.classList.add( 'is-active' );
	}

	// Close lightbox
	close() {
		this.overlay.classList.remove( 'is-active' );
		this.content.innerHTML = '';
	}

	// Check if URL is a video
	isVideo( url ) {
		return url.includes( 'youtube.com' ) || url.includes( 'youtu.be' ) || url.includes( 'vimeo.com' );
	}
}

export default Lightbox;
