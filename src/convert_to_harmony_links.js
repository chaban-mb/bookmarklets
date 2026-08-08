/**
 * Convert URLs with "album/" or "release/" to Harmony Links
 */
(function convertToHarmonyLinks() {
    document.querySelectorAll('a[href*="album/"], a[href*="release/"]').forEach((anchor) => {
        anchor.href = `https://harmony.pulsewidth.org.uk/release?url=${encodeURIComponent(anchor.href)}&category=preferred`;
    });
})();
