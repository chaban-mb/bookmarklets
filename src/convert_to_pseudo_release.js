/**
 * Convert to Pseudo-Release
 * 
 * Removes links, events, and labels; sets status to pseudo-release (4);
 * clears barcodes and packaging/format dropdowns; and populates edit note.
 */
(function convertToPseudoRelease() {
    document.querySelectorAll('[title="Remove link"], .remove-release-event, .remove-release-label').forEach((el) => el.click());

    const statusSelect = document.getElementById('status');
    if (statusSelect) {
        statusSelect.value = '4';
        statusSelect.dispatchEvent(new Event('change'));
    }

    const barcodeInput = document.getElementById('barcode');
    if (barcodeInput) {
        barcodeInput.value = '';
        barcodeInput.dispatchEvent(new Event('change'));
    }

    const noBarcodeCheckbox = document.getElementById('no-barcode');
    if (noBarcodeCheckbox && noBarcodeCheckbox.checked) {
        noBarcodeCheckbox.click();
    }

    document.querySelectorAll('select[id|="packaging"], select[id|="medium-format"]').forEach((el) => {
        el.value = '';
        el.dispatchEvent(new Event('change'));
    });

    document.querySelectorAll('.format input[type="checkbox"]').forEach((el) => {
        el.checked = false;
        el.click();
    });

    document.querySelectorAll('.track-length').forEach((el) => {
        el.value = '';
        el.dispatchEvent(new Event('change'));
    });

    const editNoteTab = document.querySelector('[href^="#edit-note"]');
    if (editNoteTab) editNoteTab.click();

    const noteTextarea = document.getElementById('edit-note-text');
    if (noteTextarea) {
        noteTextarea.focus();
        noteTextarea.select();
        document.execCommand('insertText', false, 'pseudo-release');
    }
})();
