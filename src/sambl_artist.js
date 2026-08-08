/**
 * Open Current Artist Page in SAMBL
 * https://github.com/Lioncat6/SAMBL-React
 */
(function openInSambl(newTab = false) {
    const providers = {
        spotify: /spotify\.com\/artist\/(?:intl-[a-z]+\/)?(?<id>\w+)/,
        deezer: /deezer\.com\/.*artist\/(?<id>\d+)/,
        tidal: /tidal\.com\/.*artist\/(?<id>\d+)/,
        bandcamp: /:\/\/(?<id>[^.]+)\.bandcamp\.com/,
        soundcloud: /(?<id>^https?:\/\/soundcloud\.com\/[^\/?#]+)/,
        volumo: /volumo\.com\/(?:\w+\/)?artist\/(?<id>\d+)/,
        discogs: /discogs\.com\/artist\/(?<id>\d+)/,
        applemusic: /music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(?<id>\d+)/,
        qobuz: /qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?(?<id>[A-Za-z0-9]+)\/?(?:[?#]|$)/,
        naver: /vibe\.naver\.com\/artist\/(?<id>\d+)/
    };

    for (const [provider, regex] of Object.entries(providers)) {
        const match = location.href.match(regex);
        if (match) {
            const targetUrl = `https://sambl.lioncat6.com/newartist?provider=${provider}&provider_id=${encodeURIComponent(match.groups.id)}`;
            if (newTab) {
                window.open(targetUrl);
            } else {
                location.href = targetUrl;
            }
            break;
        }
    }
})();
