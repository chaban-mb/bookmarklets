/**
 * Open Current Spotify or Deezer Page in ISRC Hunt
 * https://isrchunt.com/
 */
(function openInIsrcHunt() {
    const currentUrl = location.href;
    const matchers = [
        { regex: /open\.spotify\.com\/(?:[^/]+\/)?(?:playlist|artist)/, url: `https://isrchunt.com/?spotifyPlaylist=${currentUrl}` },
        { regex: /open\.spotify\.com\/(?:intl-[a-z]+\/)?album/, url: `https://isrchunt.com/spotify/importisrc?releaseId=${currentUrl}` },
        { regex: /www\.deezer\.com\/[^/]*\/album/, url: `https://isrchunt.com/deezer/importisrc?releaseId=${currentUrl}` }
    ];

    const match = matchers.find((item) => item.regex.test(currentUrl));
    if (match) {
        window.open(match.url, '_blank', 'noopener');
    }
})();
