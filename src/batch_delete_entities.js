/**
 * Batch Delete Entities
 * 
 * Requires the MusicBrainz Batch Delete Entities userscript:
 * https://github.com/chaban-mb/userscripts/blob/main/src/MusicBrainz%20Batch%20Delete%20Entities.user.js
 */
(function batchDeleteEntities() {
    const items = Array.from(
        document.querySelectorAll('input[name="add-to-merge"]:checked, input[name="remove"]:checked'),
        (checkbox) => (checkbox.closest('tr,li') || checkbox.parentElement)?.querySelector('a[href]')?.href
    ).filter(Boolean);

    const wasHandled = !document.dispatchEvent(
        new CustomEvent('UserJS:MusicBrainz', {
            detail: { action: 'delete', items },
            bubbles: true,
            cancelable: true
        })
    );

    if (!wasHandled) {
        alert('MusicBrainz: Batch Delete Entities userscript is not active on this page.');
    }
})();
