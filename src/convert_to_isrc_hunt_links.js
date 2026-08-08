/**
 * Convert URLs with "/album" to ISRC Hunt Links
 */
(function convertToIsrcHuntLinks() {
    document.querySelectorAll('a[href*="album/"]').forEach((anchor) => {
        anchor.href = `https://isrchunt.com/spotify/importisrc?releaseId=${encodeURIComponent(anchor.href)}`;
    });
})();
