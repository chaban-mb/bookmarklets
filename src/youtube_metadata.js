/**
 * Open YouTube Page in MW Metadata
 * https://mattw.io/youtube-metadata/
 */
(function openYouTubeMetadata() {
    if (location.hostname.includes('youtube.com')) {
        window.open(`https://mattw.io/youtube-metadata/?url=${encodeURIComponent(location.href)}&submit=true`);
    }
})();
