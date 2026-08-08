/**
 * Approve All Edits on Current Page
 * 
 * Requires the power vote userscript:
 * https://github.com/jesus2099/konami-command/blob/master/mb_POWER-VOTE.user.js
 */
(function approveAllEdits() {
    document.querySelectorAll('a.positive[href*=approve]').forEach((el) => {
        el.click();
    });
})();
