// Import the main SCSS file
import '../scss/main.scss';

// Import classes
// import VideoPlayer from './video-player.js';
import Lightbox from './lightbox.js';

// Init on DOM ready
document.addEventListener( 'DOMContentLoaded', function() {
	// new VideoPlayer();
	new Lightbox();
} );
