/**
 * Search for Recordings of Current Release, Release Group, or Artist
 */
(function searchRecordings() {
    const match = location.pathname.match(/\/(release|release-group|artist)\/([a-f0-9-]{36})/);
    if (match) {
        const paramMap = {
            'release': 'reid',
            'release-group': 'rgid',
            'artist': 'arid'
        };
        window.open(`${location.origin}/search?query=${paramMap[match[1]]}:${match[2]}&type=recording&limit=100&method=advanced`);
    }
})();
