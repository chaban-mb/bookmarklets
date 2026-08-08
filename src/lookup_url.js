/**
 * Lookup Current Page URL in MusicBrainz
 */
(function lookupUrlInMusicBrainz() {
    window.open(`https://musicbrainz.org/otherlookup/url?other-lookup.url=${encodeURIComponent(location.href)}`);
})();
