/**
 * Show API Data for Deezer Album
 */
(function showDeezerApiData() {
    const match = window.location.href.match(/deezer\.com\/\w{2}\/(album\/[0-9]+)$/)?.slice(1);
    if (match) {
        window.open(`https://api.deezer.com/${match[0]}`);
    }
})();
