# MusicBrainz Entity URL Transformers

A collection of entity-agnostic bookmarklets to convert and toggle MusicBrainz entity links on any page to their respective action subpages.

## Features
- **All 14 Core Schema Entities**: Supports `area`, `artist`, `collection`, `event`, `genre`, `instrument`, `label`, `place`, `recording`, `release`, `release-group`, `series`, `work`, and `url`.
- **State Tracking (`dataset.mbBase`)**: Stores the original root entity path on modified links.
- **Subpage Protection**: Links that already point to a subpage (e.g. `/release-group/<uuid>/aliases` or `/release/<uuid>/cover-art`) are **never modified**.
- **Multi-Run Toggling**: Re-running any transformer smoothly switches between action pages without accumulating nested subpaths, affecting only previously converted links.

---

## 1. Universal Switcher (All-in-One)

Prompts for the target subpage with single-letter shortcuts. Automatically enforces entity compatibility and ignores pre-existing subpages.

### Supported Shortcuts
- **`e`**: `/edit` *(All 14 entities)*
- **`t`**: `/tags` *(All except `url`, `genre`, `collection`)*
- **`a`**: `/aliases` *(All except `release`, `url`, `collection`)*
- **`o`**: `/open_edits` *(All except `genre`)*
- **`h`**: `/edits` *(All except `genre`)*
- **`d`**: `/delete` *(All 14 entities)*
- **`c`**: `/cover-art` (Release) / `/event-art` (Event)
- **`s`**: `/set-cover-art` (RG) / `/add-cover-art` (Release) / `/add-event-art` (Event)
- **`n`**: `/edit_annotation` *(All except `genre`, `url`, `collection`)*
- **`l`**: `/details` *(All except `url`, `collection`)*
- **`r`**: `/ratings` *(Artist, Release, RG, Recording, Work, Event, Label, Place)*
- **`rel`**: `/edit-relationships` *(Release only)*
- **`b`**: Base URL *(Reverts previously modified links back to original root paths)*

```javascript
javascript:(()=>{const map={e:{p:'edit'},t:{p:'tags',x:['url','genre','collection']},a:{p:'aliases',x:['release','url','collection']},o:{p:'open_edits',x:['genre']},h:{p:'edits',x:['genre']},d:{p:'delete'},c:{fn:e=>e==='event'?'event-art':'cover-art',o:['release','event']},s:{fn:e=>e==='release-group'?'set-cover-art':e==='event'?'add-event-art':'add-cover-art',o:['release-group','release','event']},n:{p:'edit_annotation',x:['genre','url','collection']},l:{p:'details',x:['url','collection']},r:{p:'ratings',o:['artist','release','release-group','recording','work','event','label','place']},rel:{p:'edit-relationships',o:['release']},b:{p:''}};const input=prompt('Convert/Toggle base entity links to:\n[e]dit | [t]ags | [a]liases | [o]pen_edits | [h]istory | [d]elete\n[c] artwork (release/event) | [s] set/add art (rg / release / event)\n[n]otation (edit_annotation) | detai[l]s | [r]atings | [rel]ationships\n[b]ase (revert)\n(or custom subpage):','e');if(!input)return;const key=input.trim().toLowerCase();const cfg=map[key]||{p:key};const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();if((!cfg.o||cfg.o.includes(ent))&&(!cfg.x||!cfg.x.includes(ent))){const sub=cfg.fn?cfg.fn(ent):cfg.p;a.pathname=sub?`${b}/${sub}`:b;a.target=sub?'_blank':'';}}});})();
```

---

## 2. Dedicated Standalone Bookmarklets

### Edit (`/edit`)
Converts all 14 core entity links to `/edit`.
```javascript
javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit`;a.target='_blank';}});})();
```

### Tags (`/tags`)
Converts entity links to `/tags` (excludes `url`, `genre`, `collection`).
```javascript
javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/tags`;a.target='_blank';}});})();
```

### Aliases (`/aliases`)
Converts entity links to `/aliases` (excludes `release`, `url`, `collection`).
```javascript
javascript:(()=>{const r=/^\/(artist|release-group|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/aliases`;a.target='_blank';}});})();
```

### Open Edits (`/open_edits`)
Converts entity links to `/open_edits` (excludes `genre`).
```javascript
javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/open_edits`;a.target='_blank';}});})();
```

### Edit History (`/edits`)
Converts entity links to full edit history (`/edits`, excludes `genre`).
```javascript
javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edits`;a.target='_blank';}});})();
```

### Delete (`/delete`)
Converts entity links to `/delete` (All 14 entities).
```javascript
javascript:(()=>{const r=/^\/(artist|collection|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre|url)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/delete`;a.target='_blank';}});})();
```

### View Artwork (`/cover-art` & `/event-art`)
Converts Release links to `/cover-art` and Event links to `/event-art`.
```javascript
javascript:(()=>{const r=/^\/(release|event)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();const sub=ent==='event'?'event-art':'cover-art';a.pathname=`${b}/${sub}`;a.target='_blank';}});})();
```

### Set / Add Artwork (`/set-cover-art`, `/add-cover-art`, `/add-event-art`)
Converts Release Group links to `/set-cover-art`, Release links to `/add-cover-art`, and Event links to `/add-event-art`.
```javascript
javascript:(()=>{const r=/^\/(release(?:-group)?|event)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){const ent=m[1].toLowerCase();const sub=ent==='release-group'?'set-cover-art':ent==='event'?'add-event-art':'add-cover-art';a.pathname=`${b}/${sub}`;a.target='_blank';}});})();
```

### Edit Annotation (`/edit_annotation`)
Converts entity links to `/edit_annotation` (excludes `genre`, `url`, `collection`).
```javascript
javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit_annotation`;a.target='_blank';}});})();
```

### Details (`/details`)
Converts entity links to `/details` (excludes `url`, `collection`).
```javascript
javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|label|place|event|series|instrument|area|genre)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/details`;a.target='_blank';}});})();
```

### Ratings (`/ratings`)
Converts supported entity links to `/ratings` (`artist`, `release`, `release-group`, `recording`, `work`, `event`, `label`, `place`).
```javascript
javascript:(()=>{const r=/^\/(artist|release(?:-group)?|recording|work|event|label|place)\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/ratings`;a.target='_blank';}});})();
```

### Edit Release Relationships (`/edit-relationships`)
Converts Release links to `/edit-relationships` (Release only).
```javascript
javascript:(()=>{const r=/^\/release\/([0-9a-f-]{36})\/?$/i;document.querySelectorAll('a[href]').forEach(a=>{let b=a.dataset.mbBase,m=b?b.match(r):a.pathname.match(r);if(!b&&m){a.dataset.mbBase=a.pathname.replace(/\/+$/,'');b=a.dataset.mbBase;}if(m){a.pathname=`${b}/edit-relationships`;a.target='_blank';}});})();
```

### Revert to Base URLs
Reverts all previously modified links back to their original root entity URLs.
```javascript
javascript:(()=>{document.querySelectorAll('a[href]').forEach(a=>{if(a.dataset.mbBase){a.pathname=a.dataset.mbBase;a.target='';}});})();
```
