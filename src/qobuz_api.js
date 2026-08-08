/**
 * Show API Data for Qobuz Album
 */
(function showQobuzApiData() {
    const match = window.location.href.match(/\/([0-9a-z]+)$/)?.slice(1);
    if (match) {
        window.open(`https://www.qobuz.com/api.json/0.2/album/get?album_id=${match[0]}&app_id=712109809`);
    }
})();
