/**
 * Export localStorage and Accessible Cookies
 * 
 * Generates an executable restore script and copies it directly to the clipboard.
 */
(function exportStorageAndCookies() {
    try {
        const storageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            storageData[key] = localStorage.getItem(key);
        }

        const serializedStorage = JSON.stringify(storageData);
        const cookies = document.cookie;

        const storageSnippet = `const localStorageRestoreData=${serializedStorage};for(const k in localStorageRestoreData){if(Object.hasOwnProperty.call(localStorageRestoreData,k)){localStorage.setItem(k,localStorageRestoreData[k]);}}console.log('✅ localStorage restored: '+Object.keys(localStorageRestoreData).length+' items.');`.trim();
        const cookieSnippet = `const cookieString=\`${cookies.replace(/`/g, '\\`')}\`;if(cookieString){cookieString.split('; ').forEach(cp=>{document.cookie=cp;});console.log('✅ Attempted to restore accessible cookies.');}else{console.log('ℹ️ No accessible cookies found to restore.');}`.trim();

        const restoreScript = `/**\n * Restore localStorage and accessible cookies\n * Generated: ${new Date().toISOString()}\n */\n(function(){'use strict';${storageSnippet}${cookieSnippet}})();`.trim();

        const textarea = document.createElement('textarea');
        textarea.value = restoreScript;
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        alert('LocalStorage and accessible cookie restore script copied to clipboard!');
    } catch (error) {
        alert('Failed to copy data. See console for details.');
        console.error('Bookmarklet Error:', error);
    }
})();
