/**
 * Convert Supported Artist URLs to SAMBL Links
 * https://github.com/Lioncat6/SAMBL-React
 */
(function convertToSamblLinks(newTab = false) {
    const isSoundCloud = location.hostname.includes('soundcloud.com');
    let selector = 'a[href*="/artist/"],a[href*="/interpreter/"],a[href*=".bandcamp.com"],a[href*="music.apple.com/"],a[href*="vibe.naver.com"]';

    if (!isSoundCloud) {
        selector += ',a[href*="soundcloud.com/"]';
    } else {
        selector += ',a[class*="username"]:not([aria-haspopup="true"]),a[class*="Badge"]:not([aria-haspopup="true"]),a[class*="avatar"]:not([aria-haspopup="true"])';
    }

    const providers = {
        spotify: /spotify\.com\/(?:intl-[a-z]+\/)?artist\/(\w+)/,
        deezer: /deezer\.com\/.*artist\/(\d+)/,
        tidal: /tidal\.com\/.*artist\/(\d+)/,
        bandcamp: /:\/\/([^.]+)\.bandcamp\.com/,
        soundcloud: /soundcloud\.com\/([^/?#]+)(?:$|[?#])/,
        volumo: /volumo\.com\/(?:\w+\/)?artist\/(\d+)/,
        discogs: /discogs\.com\/artist\/(\d+)/,
        applemusic: /music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(\d+)/,
        qobuz: /qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?([A-Za-z0-9]+)\/?(?:[?#]|$)/,
        naver: /vibe\.naver\.com\/artist\/(\d+)/
    };

    document.querySelectorAll(selector).forEach((anchor) => {
        const url = anchor.href;
        let providerKey = null;
        let providerId = null;

        Object.entries(providers).some(([prov, regex]) => {
            const match = url.match(regex);
            if (match) {
                providerKey = prov;
                providerId = prov === 'soundcloud' ? `https://soundcloud.com/${match[1]}` : match[1];
                return true;
            }
            return false;
        });

        if (providerKey) {
            anchor.href = `https://sambl.lioncat6.com/newartist?provider=${providerKey}&provider_id=${encodeURIComponent(providerId)}`;
            if (newTab) {
                anchor.target = '_blank';
            }
        }
    });
})();
