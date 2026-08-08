/**
 * Open Current Page in MET - MusicBrainz Metadata Seeder
 * https://seed.musichoarders.xyz/
 */
(function openInMetSeeder() {
    window.open(`https://seed.musichoarders.xyz?identifier=${encodeURIComponent(location.href)}`);
})();
