export async function fetchJSON (url, options = {}) {
    const headers = {Accept: 'application/json', ...options.headers};
    const r = await fetch(url,{...options, headers});
    if (r.ok) {
        return await r.json();
    }
    throw new Error('Unable to fetch JSON', {cause:r});
}
