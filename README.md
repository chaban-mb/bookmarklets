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
javascript:document.querySelectorAll('a.positive[href*=approve]').forEach(el=>el.click());
```

### Toggle relationships for removal
```javascript
javascript:document.querySelectorAll('.relationship-list .remove-item').forEach(el=>el.click());
```

### Toggle links for removal
```javascript
javascript:document.querySelectorAll('[title="Remove link"]').forEach(el=>el.click());
```

### Add currently viewed entity to merge queue
```javascript
javascript:document.querySelector('#sidebar [href*="merge_queue"]')?.click();
```

### Submit edit votable
```javascript
javascript:document.querySelector('.make-votable, [name*="make_votable"]')?.click();document.querySelector('#enter-edit, button.submit, #submitAliases')?.click();
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
Go to next release editor tab, apply guess case, submit edit, confirm seeding form and OAuth, reload on error, update release from Harmony or seed it, go to ISRC submitter.
```javascript
javascript:(function(){if((location.hostname.includes('magicisrc')&&document.querySelector('#container h1')?.innerText.includes('error'))||(location.hostname.includes('harmony.pulsewidth.org.uk')&&Array.from(document.querySelectorAll('.message p')).some(p=>p.textContent?.includes('rate limit')))){location.reload();}else if(location.href.includes('musicbrainz.org/release')&&typeof MB!=='undefined'&&MB?._releaseEditor){const releaseEditor=MB._releaseEditor;switch(releaseEditor.activeTabID()){case "#tracklist":if(document.querySelectorAll(".capitalized-eti, .miscapitalized-titles").length!==0){document.querySelector("#guess-case-button")?.click();}else{const isReuseRecordingsDialogOpen=document.querySelector('[data-click="reuseUnsetPreviousRecordings"]');if(isReuseRecordingsDialogOpen){releaseEditor.nextTab();}else{const allEdits=releaseEditor.allEdits();const hasTrackEdits=allEdits.some(edit=>{return edit.edit_type===51||edit.edit_type===52||edit.edit_type===53;});if(hasTrackEdits){releaseEditor.nextTab();}else{releaseEditor.lastTab();}}}break;case "#edit-note":releaseEditor.submitEdits();break;default:releaseEditor.nextTab();break;}}else if(document.getElementsByClassName('MMR2099userjs120382').length!==0){document.querySelector('[ref="Merge all found recordings"]')?.click();}else if(location.hostname.includes('harmony.pulsewidth.org.uk')){(document.querySelector('[value="Update external links in MusicBrainz"]')||document.querySelector('[value="Import into MusicBrainz"]')||document.querySelector('.magic-isrc'))?.click();}else if(!document.querySelector('h1 .mp [href^="/url/"]')){document.querySelectorAll('#enter-edit, #edit-submit, button.submit, #submit-button, #submitAliases, #batch_video, #check-isrcs button[type=button], #index-mbid-submit, .confirm-seed button[type="submit"], form[action*="importisrc"][method="post"] .btn, a[href*="importisrc?releaseId="], a[href^="https://musicbrainz.org/oauth2/authorize"]')[0]?.click();}})();
```

### Convert to pseudo-release
```javascript
javascript:$('[title="Remove link"]').click(); document.querySelectorAll('.remove-release-event, .remove-release-label').forEach(el=>el.click()); $('#status').val('4').trigger('change');  $('#barcode').val('').trigger('change'); $('#no-barcode').prop('checked', false); $("select[id|='packaging']").val('').trigger('change') ; $("select[id|='medium-format']").val('').trigger('change'); $('.format input[type=checkbox]').prop('checked', false); $('.format input[type=checkbox]').click(); $('.track-length').val('').trigger('change'); $("[href^='#edit-note']").click(); $('#edit-note-text').val('pseudo-release').trigger('change');
```

### Lookup current page URL in MusicBrainz
```javascript
javascript:void(window.open(`https://musicbrainz.org/otherlookup/url?other-lookup.url=${encodeURIComponent(location.href)}`));
```

### Search for YouTube video in archives with [YouTube Video Finder](https://findyoutubevideo.thetechrobo.ca/)
```javascript
javascript:if(location.hostname.includes('youtube.com')){window.open(`https://findyoutubevideo.thetechrobo.ca/noscript_load.html?d=${encodeURIComponent(location.href)}`);}
```

### Open YouTube page in [MW Metadata](https://mattw.io/youtube-metadata/)
```javascript
javascript:if(location.hostname.includes('youtube.com')){window.open(`https://mattw.io/youtube-metadata/?url=${encodeURIComponent(location.href)}&submit=true`);}
```

### Open current Spotify or Deezer page in [ISRC Hunt](https://isrchunt.com/) (new tab)
```javascript
javascript:(()=>{const h=location.href;if(h.match(/open\.spotify\.com\/(?:[^/]+\/)?(?:playlist|artist)/)){window.open(`https://isrchunt.com/?spotifyPlaylist=${h}`,null,"noopener")}else if(h.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?album/)){window.open(`https://isrchunt.com/spotify/importisrc?releaseId=${h}`,null,"noopener")}else if(h.match(/www\.deezer\.com\/[^/]*\/album/)){window.open(`https://isrchunt.com/deezer/importisrc?releaseId=${h}`,null,"noopener")}})()
```

### Open current artist page in [SAMBL](https://github.com/Lioncat6/SAMBL-React)

```javascript
javascript:(()=>{const p={spotify:/spotify\.com\/artist\/(?:intl-[a-z]+\/)?(?<id>\w+)/,deezer:/deezer\.com\/.*artist\/(?<id>\d+)/,tidal:/tidal\.com\/.*artist\/(?<id>\d+)/,bandcamp:/:\/\/(?<id>[^.]+)\.bandcamp\.com/,soundcloud:/(?<id>^https?:\/\/soundcloud\.com\/[^\/?#]+)/};for(const[k,r]of Object.entries(p)){const m=location.href.match(r);if(m){location.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(m.groups.id)}`;break}}})();
```

### Open current artist page in [SAMBL](https://github.com/Lioncat6/SAMBL-React) (new tab)

```javascript
javascript:(()=>{const p={spotify:/spotify\.com\/artist\/(?:intl-[a-z]+\/)?(?<id>\w+)/,deezer:/deezer\.com\/.*artist\/(?<id>\d+)/,tidal:/tidal\.com\/.*artist\/(?<id>\d+)/,bandcamp:/:\/\/(?<id>[^.]+)\.bandcamp\.com/,soundcloud:/(?<id>^https?:\/\/soundcloud\.com\/[^\/?#]+)/};for(const[k,r]of Object.entries(p)){const m=location.href.match(r);if(m){window.open(`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(m.groups.id)}`);break}}})();
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
javascript:void(window.open(`https://seed.musichoarders.xyz?identifier=${encodeURIComponent(location.href)}`));
```

### Convert URLs with "album/" or "release/" to Harmony links
```javascript
javascript:document.querySelectorAll('a[href*="album/"], a[href*="release/"]').forEach(a=>{a.href=`https://harmony.pulsewidth.org.uk/release?url=${encodeURIComponent(a.href)}&category=preferred`;});
```

### Convert URLs with "/album" to ISRC Hunt links
```javascript
javascript:document.querySelectorAll('a[href*="album/"]').forEach(a=>{a.href=`https://isrchunt.com/spotify/importisrc?releaseId=${encodeURIComponent(a.href)}`;});
```

### Convert supported artist URLs to [SAMBL](https://github.com/Lioncat6/SAMBL-React) links

```javascript
javascript:(()=>{const i=location.hostname.includes('soundcloud.com');let s='a[href*="/artist/"],a[href*=".bandcamp.com"]';if(!i)s+=',a[href*="soundcloud.com/"]';if(i)s+=',a[class*="username"]:not([aria-haspopup="true"]),a[class*="Badge"]:not([aria-haspopup="true"]),a[class*="avatar"]:not([aria-haspopup="true"])';const p={s:/spotify\.com\/(?:intl-[a-z]+\/)?artist\/(\w+)/,d:/deezer\.com\/.*artist\/(\d+)/,t:/tidal\.com\/.*artist\/(\d+)/,b:/:\/\/([^.]+)\.bandcamp\.com/,sc:/soundcloud\.com\/([^\/?#]+)(?:$|[?#])/};document.querySelectorAll(s).forEach(a=>{const u=a.href;let k=0,id=0;if(u.match(p.s)){k='spotify';id=RegExp.$1}else if(u.match(p.b)){k='bandcamp';id=RegExp.$1}else if(u.match(p.d)){k='deezer';id=RegExp.$1}else if(u.match(p.t)){k='tidal';id=RegExp.$1}else{const m=u.match(p.sc);if(m){k='soundcloud';id='https://soundcloud.com/'+m[1]}}if(k)a.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(id)}`})})();
```

### Convert supported artist URLs to [SAMBL](https://github.com/Lioncat6/SAMBL-React) links (new tab)

```javascript
javascript:(()=>{const i=location.hostname.includes('soundcloud.com');let s='a[href*="/artist/"],a[href*=".bandcamp.com"]';if(!i)s+=',a[href*="soundcloud.com/"]';if(i)s+=',a[class*="username"]:not([aria-haspopup="true"]),a[class*="Badge"]:not([aria-haspopup="true"]),a[class*="avatar"]:not([aria-haspopup="true"])';const p={s:/spotify\.com\/(?:intl-[a-z]+\/)?artist\/(\w+)/,d:/deezer\.com\/.*artist\/(\d+)/,t:/tidal\.com\/.*artist\/(\d+)/,b:/:\/\/([^.]+)\.bandcamp\.com/,sc:/soundcloud\.com\/([^\/?#]+)(?:$|[?#])/};document.querySelectorAll(s).forEach(a=>{const u=a.href;let k=0,id=0;if(u.match(p.s)){k='spotify';id=RegExp.$1}else if(u.match(p.b)){k='bandcamp';id=RegExp.$1}else if(u.match(p.d)){k='deezer';id=RegExp.$1}else if(u.match(p.t)){k='tidal';id=RegExp.$1}else{const m=u.match(p.sc);if(m){k='soundcloud';id='https://soundcloud.com/'+m[1]}}if(k){a.href=`https://sambl.lioncat6.com/newartist?provider=${k}&provider_id=${encodeURIComponent(id)}`;a.target="_blank"}})})();
```
### Search for releases of current artist or label
```javascript
javascript:(()=>{const m=location.pathname.match(/\/(artist|label)\/([a-f0-9-]{36})/);if(m)window.open(location.origin+"/search?query="+(m[1]==='artist'?'arid':'laid')+":"+m[2]+"&type=release&limit=100&method=advanced");})();
```

### Search for recordings of current release or release group
```javascript
javascript:(()=>{const m=location.pathname.match(/\/(release|release-group)\/([a-f0-9-]{36})/);if(m)window.open(location.origin+"/search?query="+(m[1]==='release'?'reid':'rgid')+":"+m[2]+"&type=recording&limit=100&method=advanced");})();
```
