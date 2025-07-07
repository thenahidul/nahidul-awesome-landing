// Import the main SCSS file
import '../scss/main.scss';

// Import classes
// import VideoPlayer from './video';
import Lightbox from './lightbox';

// Init on DOM ready
document.addEventListener( 'DOMContentLoaded', function() {
	// new VideoPlayer();
	new Lightbox();
} );
