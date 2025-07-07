class VideoPlayer {
	constructor( videoUrl, videoContainer ) {
		this.playButton = document.querySelector( '.js-naf-video-handler' );

		// Fallback to button's data-url if videoUrl not provided
		if ( ! videoUrl && this.playButton ) {
			videoUrl = this.playButton.getAttribute( 'data-url' );
		}

		if ( ! videoUrl ) {
			console.warn( 'No video URL provided' );
			return;
		}

		this.videoUrl = videoUrl;

		// Fallback to closest container if not provided
		if ( ! videoContainer ) {
			if ( this.playButton ) {
				videoContainer = this.playButton.closest( '.js-naf-video-container' );
			} else {
				videoContainer = document.querySelector( '.js-naf-video-container' );
			}
		}

		if ( ! videoContainer ) {
			console.warn( 'Video container not found' );
			return;
		}

		this.videoContainer = videoContainer;

		this.init();
	}

	// Initialize video player
	init() {
		if ( ! this.videoContainer || ! this.playButton ) {
			return;
		}

		this.bindEvents();
	}

	// Bind play event
	bindEvents() {
		this.playButton.addEventListener( 'click', () => this.playVideo() );
	}

	// Inject iframe and play video
	playVideo() {
		this.videoContainer.innerHTML = '';

		const iframe = document.createElement( 'iframe' );
		iframe.src = this.getEmbedUrl( this.videoUrl );

		iframe.setAttribute( 'frameborder', '0' );
		iframe.setAttribute(
			'allow',
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; encrypted-media'
		);
		iframe.setAttribute( 'allowfullscreen', '' );
		iframe.setAttribute( 'width', '960px' );
		iframe.setAttribute( 'height', '540px' );
		iframe.setAttribute( 'aspectRatio', '16 / 9' );

		this.videoContainer.appendChild( iframe );
	}

	// Generate embed URL from video URL
	getEmbedUrl( url ) {
		if ( url.includes( 'youtube.com' ) ) {
			const videoId = url.split( 'v=' )[1]?.split( '&' )[0];
			return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		}

		if ( url.includes( 'youtu.be' ) ) {
			const videoId = url.split( '/' ).pop();
			return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		}

		if ( url.includes( 'vimeo.com' ) ) {
			const videoId = url.split( '/' ).pop();
			return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
		}

		return url;
	}
}

export default VideoPlayer;
