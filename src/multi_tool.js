/**
 * Multi-Tool for Release Editing & Seeding
 * 
 * Automates: Release editor tab navigation & Guess Case, edit submission,
 * Mass Merge Recordings, seeding/OAuth confirmations, Harmony actions,
 * and automatic reload on MagicISRC errors or Harmony rate limit / server busy errors.
 */
(function multiTool() {
    const errorMessages = [
        'rate limit',
        'Failed to fetch resource at',
        'Too many requests queued',
        'currently busy'
    ];

    const hasRateLimitError = (location.hostname.includes('magicisrc') && document.querySelector('#container h1')?.innerText.includes('error')) ||
        ((location.hostname.includes('harmony.pulsewidth.org.uk') || location.hostname.includes('harmony.mybrainz.dev')) &&
            Array.from(document.querySelectorAll('.message p')).some((p) => errorMessages.some((err) => p.textContent?.includes(err))));

    if (hasRateLimitError) {
        location.reload();
        return;
    }

    if (location.href.includes('musicbrainz.org/release') && typeof MB !== 'undefined' && MB?._releaseEditor) {
        const releaseEditor = MB._releaseEditor;

        switch (releaseEditor.activeTabID()) {
            case '#tracklist': {
                if (document.querySelectorAll('.capitalized-eti, .miscapitalized-titles').length !== 0) {
                    document.querySelector('#guess-case-button')?.click();
                } else {
                    const isReuseRecordingsDialogOpen = document.querySelector('[data-click="reuseUnsetPreviousRecordings"]');
                    if (isReuseRecordingsDialogOpen) {
                        releaseEditor.nextTab();
                    } else {
                        const allEdits = releaseEditor.allEdits();
                        const hasTrackEdits = allEdits.some((e) => [51, 52, 53].includes(e.edit_type));
                        if (hasTrackEdits) {
                            releaseEditor.nextTab();
                        } else {
                            releaseEditor.lastTab();
                        }
                    }
                }
                break;
            }
            case '#edit-note':
                releaseEditor.submitEdits();
                break;
            default:
                releaseEditor.nextTab();
                break;
        }
        return;
    }

    if (document.getElementsByClassName('MMR2099userjs120382').length !== 0) {
        document.querySelector('[ref="Merge all found recordings"]')?.click();
        return;
    }

    if (location.hostname.includes('harmony.pulsewidth.org.uk') || location.hostname.includes('harmony.mybrainz.dev')) {
        (document.querySelector('[value="Update external links in MusicBrainz"]') ||
            document.querySelector('[value="Import into MusicBrainz"]') ||
            document.querySelector('#falcon-harmony-btn'))?.click();
        return;
    }

    if (!document.querySelector('h1 .mp [href^="/url/"]')) {
        document.querySelectorAll(
            '#enter-edit, #edit-submit, button.submit, #submit-button, #submitAliases, ' +
            '#batch_video, #check-isrcs button[type=button], #index-mbid-submit, ' +
            '.confirm-seed button[type="submit"], form[action*="importisrc"][method="post"] .btn, ' +
            'a[href*="importisrc?releaseId="], a[href^="https://musicbrainz.org/oauth2/authorize"]'
        )[0]?.click();
    }
})();
