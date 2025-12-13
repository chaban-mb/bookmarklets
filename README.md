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
javascript:[].forEach.call(document.querySelectorAll('a.positive[href*=approve]'), function(el) {el.click();});
```

### Toggle relationships for removal
```javascript
javascript:[].forEach.call(document.querySelectorAll('.relationship-list .remove-item'), function(el) {el.click();});
```

### Toggle links for removal
```javascript
javascript:[].forEach.call(document.querySelectorAll('[title="Remove link"]'), function(el) {el.click();});
```

### Add currently viewed entity to merge queue
```javascript
javascript:document.querySelector('#sidebar [href*="merge_queue"]').click();
```

### Submit edit votable
```javascript
javascript:document.querySelectorAll(".make-votable, [name*=make_votable]")[0].click(); document.querySelectorAll('#enter-edit, button.submit, #submitAliases')[0].click()
```

### Open current page in Harmony
```javascript
javascript:(function(){const S=[{s:'meta[property="music:album"]',p:'content'},{s:'meta[property="music:album:url"]',p:'content'},{s:'meta[name="music:album"]',p:'content'},{s:'meta[property="og:url"]',t:'meta[property="og:type"][content="music.album"]',p:'content'},{s:'[data-testid="entityTitle"]~div a[href^="/album/"]',p:'href'},{s:'[data-testid="track-page"]>div:first-child a[href^="/album/"]',p:'href'}];const g=()=>{for(const i of S){const e=document.querySelector(i.s);if(e&&(!i.t||document.querySelector(i.t))){const v=e[i.p];if(v)return v}}return null};const a=g();const u=a||location.href;const h=new URL('https://harmony.pulsewidth.org.uk/release');h.searchParams.set('url',u);h.searchParams.set('category','preferred');location.href=h.toString();})();
```

### Open current page in Harmony (new tab)
```javascript
javascript:(function(){const S=[{s:'meta[property="music:album"]',p:'content'},{s:'meta[property="music:album:url"]',p:'content'},{s:'meta[name="music:album"]',p:'content'},{s:'meta[property="og:url"]',t:'meta[property="og:type"][content="music.album"]',p:'content'},{s:'[data-testid="entityTitle"]~div a[href^="/album/"]',p:'href'},{s:'[data-testid="track-page"]>div:first-child a[href^="/album/"]',p:'href'}];const g=()=>{for(const i of S){const e=document.querySelector(i.s);if(e&&(!i.t||document.querySelector(i.t))){const v=e[i.p];if(v)return v}}return null};const a=g();const u=a||location.href;const h=new URL('https://harmony.pulsewidth.org.uk/release');h.searchParams.set('url',u);h.searchParams.set('category','preferred');window.open(h.toString(),'_blank');})();
```

### Multi-tool
Go to next release editor tab, apply guess case, submit edit, confirm seeding form and OAuth, reload on error, update release from Harmony or seed it, go to ISRC submitter.
```javascript
javascript:(function(){if((location.hostname.includes('magicisrc')&&document.querySelector('#container h1')?.innerText.includes('error'))||(location.hostname.includes('harmony.pulsewidth.org.uk')&&Array.from(document.querySelectorAll('.message p')).some(p=>p.textContent?.includes('rate limit')))){location.reload();}else if(location.href.includes('musicbrainz.org/release')&&typeof MB!=='undefined'&&MB?._releaseEditor){const releaseEditor=MB._releaseEditor;switch(releaseEditor.activeTabID()){case "#tracklist":if(document.querySelectorAll(".capitalized-eti, .miscapitalized-titles").length!==0){document.querySelector("#guess-case-button")?.click();}else{const isReuseRecordingsDialogOpen=document.querySelector('[data-click="reuseUnsetPreviousRecordings"]');if(isReuseRecordingsDialogOpen){releaseEditor.nextTab();}else{const allEdits=releaseEditor.allEdits();const hasTrackEdits=allEdits.some(edit=>{return edit.edit_type===51||edit.edit_type===52||edit.edit_type===53;});if(hasTrackEdits){releaseEditor.nextTab();}else{releaseEditor.lastTab();}}}break;case "#edit-note":releaseEditor.submitEdits();break;default:releaseEditor.nextTab();break;}}else if(document.getElementsByClassName('MMR2099userjs120382').length!==0){document.querySelector('[ref="Merge all found recordings"]')?.click();}else if(location.hostname.includes('harmony.pulsewidth.org.uk')){(document.querySelector('[value="Update external links in MusicBrainz"]')||document.querySelector('[value="Import into MusicBrainz"]')||document.querySelector('.magic-isrc'))?.click();}else if(!document.querySelector('h1 .mp [href^="/url/"]')){document.querySelectorAll('#enter-edit, #edit-submit, button.submit, #submit-button, #submitAliases, #batch_video, #check-isrcs button[type=button], #index-mbid-submit, .confirm-seed button[type="submit"], form[action*="importisrc"][method="post"] .btn, a[href*="importisrc?releaseId="], a[href^="https://musicbrainz.org/oauth2/authorize"]')[0]?.click();}})();
```

### Convert to pseudo-release
```javascript
javascript:$('[title="Remove link"]').click(); [].forEach.call(document.querySelectorAll('.remove-release-event, .remove-release-label'), function(el) {el.click();}); $('#status').val('4').trigger('change');  $('#barcode').val('').trigger('change'); $('#no-barcode').prop('checked', false); $("select[id|='packaging']").val('').trigger('change') ; $("select[id|='medium-format']").val('').trigger('change'); $('.format input[type=checkbox]').prop('checked', false); $('.format input[type=checkbox]').click(); $('.track-length').val('').trigger('change'); $("[href^='#edit-note']").click(); $('#edit-note-text').val('pseudo-release').trigger('change');
```

### Lookup current page URL in MusicBrainz
```javascript
javascript:void open(`https://musicbrainz.org/otherlookup/url?other-lookup.url=${encodeURIComponent(location)}`);
```

### Search YouTube video in archives
```javascript
javascript:if (location.toString().indexOf('youtube.com')>0) {void(open('https://findyoutubevideo.thetechrobo.ca/noscript_load.html?d=%27 + encodeURIComponent(location.href)));}
```

### Open YouTube page in MW Metadata
```javascript
javascript:if (location.toString().indexOf('youtube.com') > 0) {void(open(`https://mattw.io/youtube-metadata/?url=${encodeURIComponent(location.href)}&submit=true`));}
```

### Open current Spotify or Deezer page in ISRC Hunt (new tab)
```javascript
javascript:if (location.href.match(/open\.spotify\.com\/(?:[^/]+\/)?(?:playlist|artist)/)) { open(`https://isrchunt.com/?spotifyPlaylist=${location.href}`, null, "noopener");} else if (location.href.match(/open\.spotify\.com\/album/)) { open(`https://isrchunt.com/spotify/importisrc?releaseId=${location.href}`, null, "noopener");} else if (location.href.match(/www\.deezer\.com\/[^/]*\/album/)) { open(`https://isrchunt.com/deezer/importisrc?releaseId=${location.href}`, null, "noopener");}
```

### Show API data for Qobuz album
```javascript
javascript:(()=>{const s=window.location.href.match(/\/([0-9a-z]+)$/)?.slice(1);s&&open(((s)=>`https://www.qobuz.com/api.json/0.2/album/get?album_id=${s}&app_id=712109809`)(...s))})();
```

### Show API data for Deezer album
```javascript
javascript:(()=>{const s=window.location.href.match(/deezer\.com\/\w{2}\/(album\/[0-9]+)$/)?.slice(1);s&&open(((s)=>`https://api.deezer.com/${s}`)(...s))})();
```

### Open current page in MET - MusicBrainz Metadata Seeder
```javascript
javascript:void open(`https://seed.musichoarders.xyz?identifier=${encodeURIComponent(location)}`);
```

### Convert URLs with "album/" or "release/" to Harmony links
```javascript
javascript:document.querySelectorAll('a[href*="album/"], a[href*="release/"]').forEach((a)=>{a.href='https://harmony.pulsewidth.org.uk/release?url=%27 + encodeURIComponent(a) + %27&category=preferred%27;});
```

### Convert URLs with "/album" to ISRC Hunt links
```javascript
javascript:document.querySelectorAll('a[href*="album/"]').forEach((a)=>{a.href='https://isrchunt.com/spotify/importisrc?releaseId=%27 + encodeURIComponent(a);});
```

### Convert URLs with "/artist" to SAMBL links
For use on Spotify only

```javascript
javascript:(function(){document.querySelectorAll('a[href*="artist/"]').forEach(function(a){var match=a.href.match(/artist\/([^/]+)/);if(match&&match[1]){var providerId=match[1];a.href='https://sambl.lioncat6.com/artist?provider=spotify&provider_id=%27+providerId;}});})();
```

### Search for releases of current artist
```javascript
javascript:(function()%7Bswitch (!0) %7B%0Acase -1 < location.toString().indexOf("musicbrainz.org%2Fartist%2F")%3A%0A void open("https%3A%2F%2Fmusicbrainz.org%2Fsearch%3Fquery%3Darid%253A" %2B location.pathname.toString().slice(8%2C 45) %2B "%26type%3Drelease%26limit%3D100%26method%3Dadvanced")%3B%0A%7D%3B%0Avoid 0%7D)()%3B
```

### Search for recordings of current release or release group
```javascript
javascript:switch(!0)%7Bcase -1<location.toString().indexOf("musicbrainz.org%2Frelease%2F")%3Avoid open("https%3A%2F%2Fmusicbrainz.org%2Fsearch%3Fquery%3Dreid%253A"%2Blocation.pathname.toString().slice(9%2C45)%2B"%26type%3Drecording%26limit%3D100%26method%3Dadvanced")%3Bbreak%3Bcase -1<location.toString().indexOf("musicbrainz.org%2Frelease-group%2F")%3Avoid open("https%3A%2F%2Fmusicbrainz.org%2Fsearch%3Fquery%3Drgid%253A"%2Blocation.pathname.toString().slice(15%2C51)%2B"%26type%3Drecording%26limit%3D100%26method%3Dadvanced")%7D%3Bvoid+0
```
