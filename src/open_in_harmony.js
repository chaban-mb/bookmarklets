/**
 * Open Current Page in Harmony
 * 
 * Supports both same-tab and new-tab navigation.
 */
(function openInHarmony(newTab = false) {
    const selectors = [
        { s: 'meta[property="music:album"]', p: 'content' },
        { s: 'meta[property="music:album:url"]', p: 'content' },
        { s: 'meta[name="music:album"]', p: 'content' },
        { s: 'meta[property="og:url"]', t: 'meta[property="og:type"][content="music.album"]', p: 'content' },
        { s: '[data-testid="entityTitle"]~div a[href^="/album/"]', p: 'href' },
        { s: '[data-testid="track-page"]>div:first-child a[href^="/album/"]', p: 'href' }
    ];

    const targetUrl = selectors.reduce((acc, item) => {
        if (acc) return acc;
        const el = document.querySelector(item.s);
        return (el && (!item.t || document.querySelector(item.t))) ? el[item.p] : null;
    }, null) || location.href;

    const harmonyUrl = new URL('https://harmony.pulsewidth.org.uk/release');
    harmonyUrl.searchParams.set('url', targetUrl);
    harmonyUrl.searchParams.set('category', 'preferred');

    if (newTab) {
        window.open(harmonyUrl.toString(), '_blank');
    } else {
        location.href = harmonyUrl.toString();
    }
})();
