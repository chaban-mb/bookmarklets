/**
 * MusicBrainz Entity-Agnostic URL Transformer Bookmarklets
 * 
 * Includes all 14 core entities from MusicBrainz Database Schema:
 *   area, artist, collection, event, genre, instrument, label,
 *   place, recording, release, release-group, series, work, url.
 * 
 * Features:
 *   - State Tracking: Uses `anchor.dataset.mbBase` to store the original root path.
 *   - Subpage Protection: Existing subpages (e.g., /release-group/<uuid>/aliases)
 *     are NEVER modified on initial or subsequent runs.
 *   - Multi-Run Toggling: Re-running allows toggling between action pages
 *     only affecting previously transformed URLs.
 */

// ============================================================================
// 1. ALL-IN-ONE UNIVERSAL SWITCHER (Interactive Prompt with State Toggling)
// ============================================================================

/* --- Unminified Source --- */
(function universalSwitcher() {
    const actionConfigMap = {
        e: { p: 'edit' },
        t: { p: 'tags', x: ['url', 'genre', 'collection'] },
        a: { p: 'aliases', x: ['release', 'url', 'collection'] },
        o: { p: 'open_edits', x: ['genre'] },
        h: { p: 'edits', x: ['genre'] },
        d: { p: 'delete' },
        c: {
            fn: (ent) => (ent === 'event' ? 'event-art' : 'cover-art'),
            o: ['release', 'event']
        },
        s: {
            fn: (ent) => (ent === 'release-group' ? 'set-cover-art' : ent === 'event' ? 'add-event-art' : 'add-cover-art'),
            o: ['release-group', 'release', 'event']
        },
        n: { p: 'edit_annotation', x: ['genre', 'url', 'collection'] },
        l: { p: 'details', x: ['url', 'collection'] },
        r: { p: 'ratings', o: ['artist', 'release', 'release-group', 'recording', 'work', 'event', 'label', 'place'] },
        rel: { p: 'edit-relationships', o: ['release'] },
        b: { p: '' } // Revert to base URL
    };

    const userInput = prompt(
        'Convert/Toggle base entity links to:\n' +
        '[e]dit | [t]ags | [a]liases | [o]pen_edits | [h]istory | [d]elete\n' +
        '[c] artwork (release/event) | [s] set/add art (rg / release / event)\n' +
        '[n]otation (edit_annotation) | detai[l]s | [r]atings | [rel]ationships\n' +
        '[b]ase (revert to original)\n' +
        '(or enter custom subpage):',
        'e'
    );
    if (!userInput) return;

    const key = userInput.trim().toLowerCase();
    const config = actionConfigMap[key] || { p: key };

    // Matches strictly root entity paths for all 14 core MB schema entities
    const rootEntityRegex = /^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;

    let count = 0;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = null;

        if (base) {
            match = base.match(rootEntityRegex);
        } else {
            match = anchor.pathname.match(rootEntityRegex);
            if (match) {
                anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
                base = anchor.dataset.mbBase;
            }
        }

        if (match) {
            const entityType = match[1].toLowerCase();
            const isAllowed = !config.o || config.o.includes(entityType);
            const isNotExcluded = !config.x || !config.x.includes(entityType);

            if (isAllowed && isNotExcluded) {
                const subpage = config.fn ? config.fn(entityType) : config.p;
                anchor.pathname = subpage ? `${base}/${subpage}` : base;
                anchor.target = subpage ? '_blank' : '';
                count++;
            }
        }
    });

    console.log(`[MB Transformer] Transformed ${count} entity links to '${config.p || key}'`);
})();

/* --- Minified Bookmarklet --- */
// javascript:(()=>{const map={e:{p:'edit'},t:{p:'tags',x:['url','genre','collection']},a:{p:'aliases',x:['release','url','collection']},o:{p:'open_edits',x:['genre']},h:{p:'edits',x:['genre']},d:{p:'delete'},c:{fn:e=>e==='event'?'event-art':'cover-art',o:['release','event']},s:{fn:e=>e==='release-group'?'set-cover-art':e==='event'?'add-event-art':'add-cover-art',o:['release-group','release','event']},n:{p:'edit_annotation',x:['genre','url','collection']},l:{p:'details',x:['url','collection']},r:{p:'ratings',o:['artist','release','release-group','recording','work','event','label','place']},rel:{p:'edit-relationships',o:['release']},b:{p:''}};const input=prompt('Convert/Toggle base entity links to:\n[e]dit | [t]ags | [a]liases | [o]pen_edits | [h]istory | [d]elete\n[c] artwork (release/event) | [s] set/add art (rg / release / event)\n[n]otation (edit_annotation) | detai[l]s | [r]atings | [rel]ationships\n[b]ase (revert)\n(or custom subpage):','e');if(!input)return;const key=input.trim().toLowerCase();const cfg=map[key]||{p:key};const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();if((!cfg.o||cfg.o.includes(ent))&&(!cfg.x||!cfg.x.includes(ent))){const sub=cfg.fn?cfg.fn(ent):cfg.p;a.pathname=sub?`${b}/${sub}`:b;a.target=sub?'_blank':'';}}});})();


// ============================================================================
// 2. DEDICATED STANDALONE TRANSFORMERS
// ============================================================================

// ----------------------------------------------------------------------------
// 2.1 Edit (/edit) - Supported on ALL 14 Entities
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToEdit() {
    const rootEntityRegex = /^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/edit`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.2 Tags (/tags) - Excludes 'url', 'genre', 'collection'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToTags() {
    const rootEntityRegex = /^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/tags`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/tags`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.3 Aliases (/aliases) - Excludes 'release', 'url', 'collection'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToAliases() {
    const rootEntityRegex = /^\/(artist|release-group|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/aliases`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|release-group|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/aliases`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.4 Open Edits (/open_edits) - Excludes 'genre'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToOpenEdits() {
    const rootEntityRegex = /^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/open_edits`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/open_edits`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.5 Edit History (/edits) - Excludes 'genre'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToEdits() {
    const rootEntityRegex = /^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/edits`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edits`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.6 Delete (/delete) - Supported on ALL 14 Entities
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToDelete() {
    const rootEntityRegex = /^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/delete`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/delete`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.7 View Artwork - /cover-art (Release) & /event-art (Event)
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToViewArtwork() {
    const rootEntityRegex = /^\/(release|event)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            const entityType = match[1].toLowerCase();
            const subpage = entityType === 'event' ? 'event-art' : 'cover-art';
            anchor.pathname = `${base}/${subpage}`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(release|event)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();const sub=ent==='event'?'event-art':'cover-art';a.pathname=`${b}/${sub}`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.8 Set / Add Artwork - /set-cover-art (RG), /add-cover-art (Release), /add-event-art (Event)
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToSetAddArtwork() {
    const rootEntityRegex = /^\/(release(?:-group)?|event)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            const entityType = match[1].toLowerCase();
            const subpage = entityType === 'release-group' ? 'set-cover-art' : entityType === 'event' ? 'add-event-art' : 'add-cover-art';
            anchor.pathname = `${base}/${subpage}`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(release(?:-group)?|event)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();const sub=ent==='release-group'?'set-cover-art':ent==='event'?'add-event-art':'add-cover-art';a.pathname=`${b}/${sub}`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.9 Edit Annotation (/edit_annotation) - Excludes 'genre', 'url', 'collection'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToEditAnnotation() {
    const rootEntityRegex = /^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/edit_annotation`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit_annotation`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.10 Details (/details) - Excludes 'url', 'collection'
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToDetails() {
    const rootEntityRegex = /^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/details`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/details`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.11 Ratings (/ratings) - Supported on 8 Core Entities
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToRatings() {
    const rootEntityRegex = /^\/(artist|release(?:-group)?|recording|work|event|label|place)\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/ratings`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|event|label|place)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/ratings`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.12 Edit Release Relationships (/edit-relationships) - Release Only
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function convertToEditRelationships() {
    const rootEntityRegex = /^\/release\/([0-9a-f-]{36})\/?$/i;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        let base = anchor.dataset.mbBase;
        let match = base ? base.match(rootEntityRegex) : anchor.pathname.match(rootEntityRegex);
        if (!base && match) {
            anchor.dataset.mbBase = anchor.pathname.replace(/\/+$/, '');
            base = anchor.dataset.mbBase;
        }
        if (match) {
            anchor.pathname = `${base}/edit-relationships`;
            anchor.target = '_blank';
        }
    });
})();

/* --- Minified --- */
// javascript:(()=>{const r=/^\/release\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit-relationships`;a.target='_blank';}});})();


// ----------------------------------------------------------------------------
// 2.13 Revert to Base URLs (Restores modified links back to original root paths)
// ----------------------------------------------------------------------------
/* --- Unminified --- */
(function revertToBaseUrls() {
    let count = 0;
    document.querySelectorAll('a[href]').forEach((anchor) => {
        if (anchor.dataset.mbBase) {
            anchor.pathname = anchor.dataset.mbBase;
            anchor.target = '';
            count++;
        }
    });
    console.log(`[MB Transformer] Reverted ${count} links back to original base URLs.`);
})();

/* --- Minified --- */
// javascript:(()=>{document.querySelectorAll('a[href]').forEach(a=>{if(a.dataset.mbBase){a.pathname=a.dataset.mbBase;a.target='';}});})();
