class Video {
	constructor( videoUrl, videoContainer ) {
		this.playButton = document.querySelector( '.js-naf-video-handler' );

		// Fallback to data-url if not passed
		if ( ! videoUrl && this.playButton ) {
			videoUrl = this.playButton.getAttribute( 'data-url' );
		}

		if ( ! videoUrl ) {
			console.warn( 'No video URL provided' );
			return;
		}

		this.videoUrl = videoUrl;

		// Fallback to closest container
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

	// Initialize
	init() {
		if ( ! this.videoContainer || ! this.playButton ) {
			return;
		}

		this.bindEvents();
	}

	// Bind play handler
	bindEvents() {
		this.playButton.addEventListener( 'click', () => this.playVideo() );
	}

	// Render iframe or <video>
	playVideo() {
		this.videoContainer.innerHTML = '';

		if ( this.isSelfHosted( this.videoUrl ) ) {
			const video = document.createElement( 'video' );
			video.src = this.videoUrl;
			video.setAttribute( 'controls', true );
			video.setAttribute( 'autoplay', true );
			video.setAttribute( 'width', '960' );
			video.setAttribute( 'height', '540' );
			video.setAttribute( 'playsinline', '' );
			video.style.aspectRatio = '16 / 9';

			this.videoContainer.appendChild( video );
		} else {
			const iframe = document.createElement( 'iframe' );
			iframe.src = this.getEmbedUrl( this.videoUrl );

			iframe.setAttribute( 'frameborder', '0' );
			iframe.setAttribute(
				'allow',
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; encrypted-media'
			);
			iframe.setAttribute( 'allowfullscreen', '' );
			iframe.setAttribute( 'width', '960' );
			iframe.setAttribute( 'height', '540' );
			iframe.style.aspectRatio = '16 / 9';

			this.videoContainer.appendChild( iframe );
		}
	}

	// Check if it's a direct video file
	isSelfHosted( url ) {
		return /\.(mp4|webm|ogg)$/i.test( url );
	}

	// Generate embed URL from known platforms
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

export default Video;
