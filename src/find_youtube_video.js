/**
 * Search for YouTube Video in Archives with YouTube Video Finder
 * https://findyoutubevideo.thetechrobo.ca/
 */
(function findYouTubeVideo() {
    if (location.hostname.includes('youtube.com')) {
        window.open(`https://findyoutubevideo.thetechrobo.ca/noscript_load.html?d=${encodeURIComponent(location.href)}`);
    }
})();
