/**
 * Search for Releases of Current Artist or Label
 */
(function searchReleases() {
    const match = location.pathname.match(/\/(artist|label)\/([a-f0-9-]{36})/);
    if (match) {
        const queryParam = match[1] === 'artist' ? 'arid' : 'laid';
        window.open(`${location.origin}/search?query=${queryParam}:${match[2]}&type=release&limit=100&method=advanced`);
    }
})();
