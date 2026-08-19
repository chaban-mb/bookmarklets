# MusicBrainz Bookmarklets

A collection of bookmarklets for MusicBrainz.

[Dedicated support thread](https://community.metabrainz.org/t/768583/)

## Disclaimer

These scripts were created with the help of Google Gemini. While they are functional, they may not always be perfect. I am not a developer, so my ability to fix complex issues is limited. Please report any bugs or issues, and I will do my best to address them.

## Installation

To install a bookmarklet, create a new bookmark in your browser and paste the code snippet from the respective section below into the URL field.

## Bookmarklets

### Approve all edits on current page
Requires the [power vote script](https://github.com/jesus2099/konami-command/blob/master/mb_POWER-VOTE.user.js).
```javascript
javascript:(()=>{document.querySelectorAll('a.positive[href*=approve]').forEach(el=>el.click());})();
```

### Toggle relationships for removal
```javascript
javascript:(()=>{document.querySelectorAll('.relationship-list .remove-item').forEach(el=>el.click());})();
```

### Toggle links for removal
```javascript
javascript:(()=>{document.querySelectorAll('[title="Remove link"]').forEach(el=>el.click());})();
```

### Add currently viewed entity to merge queue
```javascript
javascript:(()=>{document.querySelector('#sidebar [href*="merge_queue"]')?.click();})();
```

### Batch delete entities
Requires the [MusicBrainz Batch Delete Entities](https://github.com/chaban-mb/userscripts/blob/main/src/MusicBrainz%20Batch%20Delete%20Entities.user.js) userscript.
```javascript
javascript:(()=>{const items=Array.from(document.querySelectorAll('input[name="add-to-merge"]:checked, input[name="remove"]:checked'),b=>(b.closest('tr,li')||b.parentElement)?.querySelector('a[href]')?.href).filter(Boolean);if(document.dispatchEvent(new CustomEvent('UserJS:MusicBrainz',{detail:{action:'delete',items},bubbles:!0,cancelable:!0})))alert('MusicBrainz: Batch Delete Entities userscript is not active on this page.');})();
```

### Submit edit votable
```javascript
javascript:(()=>{document.querySelector('.make-votable, [name*="make_votable"]')?.click();document.querySelector('#enter-edit, button.submit, #submitAliases')?.click();})();
```

### Open current page in [Harmony](https://harmony.pulsewidth.org.uk/)
```javascript
javascript:(()=>{const S=[{s:'meta[property="music:album"]',p:'content'},{s:'meta[property="music:album:url"]',p:'content'},{s:'meta[name="music:album"]',p:'content'},{s:'meta[property="og:url"]',t:'meta[property="og:type"][content="music.album"]',p:'content'},{s:'[data-testid="entityTitle"]~div a[href^="/album/"]',p:'href'},{s:'[data-testid="track-page"]>div:first-child a[href^="/album/"]',p:'href'}];const u=S.reduce((a,i)=>{if(a)return a;const e=document.querySelector(i.s);return(e&&(!i.t||document.querySelector(i.t)))?e[i.p]:null},null)||location.href;const h=new URL('https://harmony.pulsewidth.org.uk/release');h.searchParams.set('url',u);h.searchParams.set('category','preferred');location.href=h.toString();})();
```

### Open current page in Harmony (new tab)
```javascript
javascript:(()=>{const S=[{s:'meta[property="music:album"]',p:'content'},{s:'meta[property="music:album:url"]',p:'content'},{s:'meta[name="music:album"]',p:'content'},{s:'meta[property="og:url"]',t:'meta[property="og:type"][content="music.album"]',p:'content'},{s:'[data-testid="entityTitle"]~div a[href^="/album/"]',p:'href'},{s:'[data-testid="track-page"]>div:first-child a[href^="/album/"]',p:'href'}];const u=S.reduce((a,i)=>{if(a)return a;const e=document.querySelector(i.s);return(e&&(!i.t||document.querySelector(i.t)))?e[i.p]:null},null)||location.href;const h=new URL('https://harmony.pulsewidth.org.uk/release');h.searchParams.set('url',u);h.searchParams.set('category','preferred');window.open(h.toString(),'_blank');})();
```

### Multi-tool
Advances release editor tabs, triggers Guess Case, submits edits, handles Mass Merge Recordings, confirms seeding and OAuth forms, imports/updates releases in Harmony, and reloads MagicISRC or Harmony on rate limit or server busy errors.
```javascript
javascript:(function(){const errs=['rate limit','Failed to fetch resource at','Too many requests queued','currently busy'];if((location.hostname.includes('magicisrc')&&document.querySelector('#container h1')?.innerText.includes('error'))||((location.hostname.includes('harmony.pulsewidth.org.uk')||location.hostname.includes('harmony.mybrainz.dev'))&&Array.from(document.querySelectorAll('.message p')).some(p=>errs.some(e=>p.textContent?.includes(e))))){location.reload();}else if(location.href.includes('musicbrainz.org/release')&&typeof MB!=='undefined'&&MB?._releaseEditor){const releaseEditor=MB._releaseEditor;switch(releaseEditor.activeTabID()){case "#tracklist":if(document.querySelectorAll(".capitalized-eti, .miscapitalized-titles").length!==0){document.querySelector("#guess-case-button")?.click();}else{const isReuseRecordingsDialogOpen=document.querySelector('[data-click="reuseUnsetPreviousRecordings"]');if(isReuseRecordingsDialogOpen){releaseEditor.nextTab();}else{const allEdits=releaseEditor.allEdits();const hasTrackEdits=allEdits.some(e=>[51,52,53].includes(e.edit_type));if(hasTrackEdits){releaseEditor.nextTab();}else{releaseEditor.lastTab();}}}break;case "#edit-note":releaseEditor.submitEdits();break;default:releaseEditor.nextTab();break;}}else if(document.getElementsByClassName('MMR2099userjs120382').length!==0){document.querySelector('[ref="Merge all found recordings"]')?.click();}else if(location.hostname.includes('harmony.pulsewidth.org.uk')||location.hostname.includes('harmony.mybrainz.dev')){(document.querySelector('[value="Update external links in MusicBrainz"]')||document.querySelector('[value="Import into MusicBrainz"]'))?.click();}else if(!document.querySelector('h1 .mp [href^="/url/"]')){document.querySelectorAll('#enter-edit, #edit-submit, button.submit, #submit-button, #submitAliases, #batch_video, #check-isrcs button[type=button], #index-mbid-submit, .confirm-seed button[type="submit"], form[action*="importisrc"][method="post"] .btn, a[href*="importisrc?releaseId="], a[href^="https://musicbrainz.org/oauth2/authorize"]')[0]?.click();}})();
```

### Convert to pseudo-release
```javascript
javascript:(() => { document.querySelectorAll('[title="Remove link"], .remove-release-event, .remove-release-label').forEach(el => el.click()); const s = document.getElementById('status'); if (s) { s.value = '4'; s.dispatchEvent(new Event('change')); } const b = document.getElementById('barcode'); if (b) { b.value = ''; b.dispatchEvent(new Event('change')); } const n = document.getElementById('no-barcode'); if (n && n.checked) n.click(); document.querySelectorAll('select[id|="packaging"], select[id|="medium-format"]').forEach(el => { el.value = ''; el.dispatchEvent(new Event('change')); }); document.querySelectorAll('.format input[type="checkbox"]').forEach(el => { el.checked = false; el.click(); }); document.querySelectorAll('.track-length').forEach(el => { el.value = ''; el.dispatchEvent(new Event('change')); }); const t = document.querySelector('[href^="#edit-note"]'); if (t) t.click(); const nt = document.getElementById('edit-note-text'); if (nt) { nt.focus(); nt.select(); document.execCommand('insertText', false, 'pseudo-release'); } })();
```

### Lookup current page URL in MusicBrainz
```javascript
javascript:(()=>{window.open(`https://musicbrainz.org/otherlookup/url?other-lookup.url=${encodeURIComponent(location.href)}`);})();
```

### Search for YouTube video in archives with [YouTube Video Finder](https://findyoutubevideo.thetechrobo.ca/)
```javascript
javascript:(()=>{if(location.hostname.includes('youtube.com')){window.open(`https://findyoutubevideo.thetechrobo.ca/noscript_load.html?d=${encodeURIComponent(location.href)}`);}})();
```

### Open YouTube page in [MW Metadata](https://mattw.io/youtube-metadata/)
```javascript
javascript:(()=>{if(location.hostname.includes('youtube.com')){window.open(`https://mattw.io/youtube-metadata/?url=${encodeURIComponent(location.href)}&submit=true`);}})();
```

### Open current Spotify or Deezer page in [ISRC Hunt](https://isrchunt.com/) (new tab)
```javascript
javascript:(()=>{const h=location.href;const m=[{r:/open\.spotify\.com\/(?:[^/]+\/)?(?:playlist|artist)/,u:`https://isrchunt.com/?spotifyPlaylist=${h}`},{r:/open\.spotify\.com\/(?:intl-[a-z]+\/)?album/,u:`https://isrchunt.com/spotify/importisrc?releaseId=${h}`},{r:/www\.deezer\.com\/[^/]*\/album/,u:`https://isrchunt.com/deezer/importisrc?releaseId=${h}`}].find(x=>x.r.test(h));if(m)window.open(m.u,null,"noopener")})()
```

### Open current artist page in [SAMBL](https://github.com/Lioncat6/SAMBL-React)

```javascript
javascript:(()=>{const p={spotify:/spotify\.com\/artist\/(?:intl-[a-z]+\/)?(?<id>\w+)/,deezer:/deezer\.com\/.*artist\/(?<id>\d+)/,tidal:/tidal\.com\/.*artist\/(?<id>\d+)/,bandcamp:/:\/\/(?<id>[^.]+)\.bandcamp\.com/,soundcloud:/(?<id>^https?:\/\/soundcloud\.com\/[^\/?#]+)/,volumo:/volumo\.com\/(?:\w+\/)?artist\/(?<id>\d+)/,discogs:/discogs\.com\/artist\/(?<id>\d+)/,applemusic:/music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(?<id>\d+)/,qobuz:/qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?(?<id>[A-Za-z0-9]+)\/?(?:[?#]|$)/,naver:/vibe\.naver\.com\/artist\/(?<id>\d+)/};for(const[k,r]of Object.entries(p)){const m=location.href.match(r);if(m){location.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(m.groups.id)}`;break}}})();
```

### Open current artist page in [SAMBL](https://github.com/Lioncat6/SAMBL-React) (new tab)

```javascript
javascript:(()=>{const p={spotify:/spotify\.com\/artist\/(?:intl-[a-z]+\/)?(?<id>\w+)/,deezer:/deezer\.com\/.*artist\/(?<id>\d+)/,tidal:/tidal\.com\/.*artist\/(?<id>\d+)/,bandcamp:/:\/\/(?<id>[^.]+)\.bandcamp\.com/,soundcloud:/(?<id>^https?:\/\/soundcloud\.com\/[^\/?#]+)/,volumo:/volumo\.com\/(?:\w+\/)?artist\/(?<id>\d+)/,discogs:/discogs\.com\/artist\/(?<id>\d+)/,applemusic:/music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(?<id>\d+)/,qobuz:/qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?(?<id>[A-Za-z0-9]+)\/?(?:[?#]|$)/,naver:/vibe\.naver\.com\/artist\/(?<id>\d+)/};for(const[k,r]of Object.entries(p)){const m=location.href.match(r);if(m){window.open(`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(m.groups.id)}`);break}}})();
```

### Show API data for Qobuz album
```javascript
javascript:(()=>{const s=window.location.href.match(/\/([0-9a-z]+)$/)?.slice(1);s&&window.open(((s)=>`https://www.qobuz.com/api.json/0.2/album/get?album_id=${s}&app_id=712109809`)(...s))})();
```

### Show API data for Deezer album
```javascript
javascript:(()=>{const s=window.location.href.match(/deezer\.com\/\w{2}\/(album\/[0-9]+)$/)?.slice(1);s&&window.open(((s)=>`https://api.deezer.com/${s}`)(...s))})();
```

### Open current page in [MET - MusicBrainz Metadata Seeder](https://seed.musichoarders.xyz/)
```javascript
javascript:(()=>{window.open(`https://seed.musichoarders.xyz?identifier=${encodeURIComponent(location.href)}`);})();
```

### Convert URLs with "album/" or "release/" to Harmony links
```javascript
javascript:(()=>{document.querySelectorAll('a[href*="album/"], a[href*="release/"]').forEach(a=>{a.href=`https://harmony.pulsewidth.org.uk/release?url=${encodeURIComponent(a.href)}&category=preferred`;});})();
```

### Convert URLs with "/album" to ISRC Hunt links
```javascript
javascript:(()=>{document.querySelectorAll('a[href*="album/"]').forEach(a=>{a.href=`https://isrchunt.com/spotify/importisrc?releaseId=${encodeURIComponent(a.href)}`;});})();
```

### Convert supported artist URLs to [SAMBL](https://github.com/Lioncat6/SAMBL-React) links

```javascript
javascript:(()=>{const i=location.hostname.includes('soundcloud.com');let s='a[href*="/artist/"],a[href*="/interpreter/"],a[href*=".bandcamp.com"],a[href*="music.apple.com/"],a[href*="vibe.naver.com"]';if(!i)s+=',a[href*="soundcloud.com/"]';if(i)s+=',a[class*="username"]:not([aria-haspopup="true"]),a[class*="Badge"]:not([aria-haspopup="true"]),a[class*="avatar"]:not([aria-haspopup="true"])';const p={spotify:/spotify\.com\/(?:intl-[a-z]+\/)?artist\/(\w+)/,deezer:/deezer\.com\/.*artist\/(\d+)/,tidal:/tidal\.com\/.*artist\/(\d+)/,bandcamp:/:\/\/([^.]+)\.bandcamp\.com/,soundcloud:/soundcloud\.com\/([^\/?#]+)(?:$|[?#])/,volumo:/volumo\.com\/(?:\w+\/)?artist\/(\d+)/,discogs:/discogs\.com\/artist\/(\d+)/,applemusic:/music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(\d+)/,qobuz:/qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?([A-Za-z0-9]+)\/?(?:[?#]|$)/,naver:/vibe\.naver\.com\/artist\/(\d+)/};document.querySelectorAll(s).forEach(a=>{const u=a.href;let k=0,id=0;Object.entries(p).some(([prov,r])=>{const m=u.match(r);if(m){k=prov;id=prov==='soundcloud'?'https://soundcloud.com/'+m[1]:m[1];return true}});if(k)a.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(id)}`})})();
```

### Convert supported artist URLs to [SAMBL](https://github.com/Lioncat6/SAMBL-React) links (new tab)

```javascript
javascript:(()=>{const i=location.hostname.includes('soundcloud.com');let s='a[href*="/artist/"],a[href*="/interpreter/"],a[href*=".bandcamp.com"],a[href*="music.apple.com/"],a[href*="vibe.naver.com"]';if(!i)s+=',a[href*="soundcloud.com/"]';if(i)s+=',a[class*="username"]:not([aria-haspopup="true"]),a[class*="Badge"]:not([aria-haspopup="true"]),a[class*="avatar"]:not([aria-haspopup="true"])';const p={spotify:/spotify\.com\/(?:intl-[a-z]+\/)?artist\/(\w+)/,deezer:/deezer\.com\/.*artist\/(\d+)/,tidal:/tidal\.com\/.*artist\/(\d+)/,bandcamp:/:\/\/([^.]+)\.bandcamp\.com/,soundcloud:/soundcloud\.com\/([^\/?#]+)(?:$|[?#])/,volumo:/volumo\.com\/(?:\w+\/)?artist\/(\d+)/,discogs:/discogs\.com\/artist\/(\d+)/,applemusic:/music\.apple\.com\/.+?\/artist\/(?:.+?\/)?(\d+)/,qobuz:/qobuz\.com\/(?:\w{2}-\w{2}\/)?(?:interpreter|artist)\/(?:[^\/]+\/)*?([A-Za-z0-9]+)\/?(?:[?#]|$)/,naver:/vibe\.naver\.com\/artist\/(\d+)/};document.querySelectorAll(s).forEach(a=>{const u=a.href;let k=0,id=0;Object.entries(p).some(([prov,r])=>{const m=u.match(r);if(m){k=prov;id=prov==='soundcloud'?'https://soundcloud.com/'+m[1]:m[1];return true}});if(k){a.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(id)}`;a.target="_blank"}})})();
```
### Search for releases of current artist or label
```javascript
javascript:(()=>{const m=location.pathname.match(/\/(artist|label)\/([a-f0-9-]{36})/);if(m)window.open(`${location.origin}/search?query=${m[1]==='artist'?'arid':'laid'}:${m[2]}&type=release&limit=100&method=advanced`);})();
```

### Search for recordings of current release, release group, or artist
```javascript
javascript:(()=>{const m=location.pathname.match(/\/(release|release-group|artist)\/([a-f0-9-]{36})/);if(m){const p={'release':'reid','release-group':'rgid','artist':'arid'};window.open(`${location.origin}/search?query=${p[m[1]]}:${m[2]}&type=recording&limit=100&method=advanced`);}})();
```

### Export localStorage and Cookies
```javascript
javascript:(function(){try{const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);data[k]=localStorage.getItem(k);}const l=JSON.stringify(data);const c=document.cookie;const s=`const localStorageRestoreData=${l};for(const k in localStorageRestoreData){if(Object.hasOwnProperty.call(localStorageRestoreData,k)){localStorage.setItem(k,localStorageRestoreData[k]);}}console.log('✅ localStorage restored: '+Object.keys(localStorageRestoreData).length+' items.');`.trim();const t=`const cookieString=\`${c.replace(/`/g,'\\`')}\`;if(cookieString){cookieString.split('; ').forEach(cp=>{document.cookie=cp;});console.log('✅ Attempted to restore accessible cookies.');}else{console.log('ℹ️ No accessible cookies found to restore.');}`.trim();const r=`/** * Restore localStorage and accessible cookies * Generated: ${new Date().toISOString()} */\n(function(){'use strict';${s}${t}})();`.trim();const a=document.createElement('textarea');a.value=r;a.style.position='absolute';a.style.left='-9999px';a.style.top='0';document.body.appendChild(a);a.select();document.execCommand('copy');document.body.removeChild(a);alert("LocalStorage and accessible cookie restore script copied to clipboard!");}catch(e){alert("Failed to copy data. See console for details.");console.error("Bookmarklet Error:",e);}})();
```
