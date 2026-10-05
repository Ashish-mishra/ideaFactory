/**
 * CloudFront Function: URL rewriter for Next.js SSG static export.
 *
 * Problem: S3 only serves index.html for the root URL (Default Root Object).
 * For any subdirectory like /mugs/ or /mugs/couple-mug-mug02/, S3 returns 403
 * because it can't find the object — it doesn't know to look for index.html.
 *
 * Fix: Rewrite incoming URIs so that directory paths resolve to their index.html.
 *   /                          → /index.html        (handled by Default Root Object, but covered here too)
 *   /mugs/                     → /mugs/index.html
 *   /mugs/couple-mug-mug02/    → /mugs/couple-mug-mug02/index.html
 *
 * Paths with a file extension (JS, CSS, images, XML, etc.) are passed through unchanged.
 *
 * Deploy: AWS Console → CloudFront → Functions → Create → paste this code →
 *         Associate with your distribution's "Viewer Request" event for cache behaviour "/*"
 */
function handler(event) {
    var request = event.request;
    var host = request.headers.host ? request.headers.host.value : '';
    var uri = request.uri;

    // 1. Canonicalization: Redirect www -> non-www
    // This prevents "Duplicate Content" and consolidates SEO authority.
    if (host && host.startsWith('www.')) {
        var newUrl = 'https://' + host.replace(/^www\./, '') + uri;
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                "location": { "value": newUrl }
            }
        };
    }

    // 2. Product-level 301 redirects for old/renamed URLs (GSC cleanup)
    // Normalize: ensure trailing slash for lookup
    var lookupUri = uri.endsWith('/') ? uri : uri + '/';
    var productRedirects = {
        // — Jewellery (jwl → bct/lct series) —
        '/jewellery/bar-locket-jwl11/': '/jewellery/bar-locket-bct11/',
        '/jewellery/black-half-kada-jwl04/': '/jewellery/black-half-kada-bct10/',
        '/jewellery/bracelet-jwl14/': '/jewellery/',
        '/jewellery/braclet-jwl05/': '/jewellery/',
        '/jewellery/bracelet-jwl07/': '/jewellery/',
        '/jewellery/bracelet-jwl09/': '/jewellery/',
        '/jewellery/locket-jwl13/': '/jewellery/',
        '/jewellery/envelope-necklace-jwl01/': '/jewellery/envelope-necklace-lct12/',
        '/jewellery/golden-half-kada-bct01/': '/jewellery/golden-half-kada-bct09/',
        '/jewellery/hanuman-chalisa-pendant-locket-jwl02/': '/jewellery/hanuman-chalisa-pendant-locket-lct09/',
        '/jewellery/wing-necklace-jwl15/': '/jewellery/wing-necklace-lct07/',
        '/jewellery/copper-half-kada-jwl06/': '/jewellery/half-kada-golden-bct06/',
        '/jewellery/neclace-jwl10/': '/jewellery/eye-pendant-necklace-lct10/',
        '/jewellery/silver-half-kada-jwl12/': '/jewellery/silver-half-kada-bct12/',
        '/jewellery/silver-full-kada-bct02/': '/jewellery/silver-full-kada-bct12/',
        '/jewellery/chain-bracelet-black-jwl08/': '/jewellery/chain-bracelet-black-bct03/',
        // — KeyRings (kcn → bkc/hkc/skc/dkc/ckc/key series) —
        '/keyrings/bike-keychain-kcn09/': '/keyrings/bike-keychain-bkc/',
        '/keyrings/heart-metal-keychain-kcn07/': '/keyrings/heart-metal-keychain-hkc/',
        '/keyrings/keychain-kcn04/': '/keyrings/keychain-key02/',
        '/keyrings/keychain-kcn05/': '/keyrings/keychain-key02/',
        '/keyrings/acrylic-keychain-kcn03/': '/keyrings/apple-acrylic-keychain-key03/',
        '/keyrings/keychain-circle-kcn08/': '/keyrings/keychain-circle-skc/',
        '/keyrings/keychain-rectangle-kcn06/': '/keyrings/keychain-rectangle-dkc/',
        '/keyrings/wooden-keychain-rectangle-kcn02/': '/keyrings/wooden-keychain-rectangle-key02/',
        '/keyrings/car-keychain-kcn10/': '/keyrings/car-keychain-ckc/',
        // — Pillows (plw → cush series) —
        '/pillows/fur-cushion-plw02/': '/pillows/fur-cushion-cush02/',
        '/pillows/pillow-plw01/': '/pillows/matic-pillow-cush03/',
        // — Others —
        '/others/trophy-trp/': '/others/trophy-tro01/',
        // — Photo frames (slug renames) —
        '/photo-frames/circle-shape-acrylic-acl03/': '/photo-frames/circle-shaped-acrylic-photo-acr01/',
        '/photo-frames/mirror-lamp-mirror-photo-lamp/': '/photo-frames/mirror-lamp-lmp07/',
        '/photo-frames/rectangle-shaped-acrylic-acl02/': '/photo-frames/rectangle-shaped-acrylic-acr01/',
        '/photo-frames/rotating-lamp-lmp03/': '/photo-frames/rotating-lamp-large-lmp03/',
        '/photo-frames/led-couple-photo-frame-frm12/': '/photo-frames/led-couple-photo-frame-frm03/',
        // — Mugs (name corrections) —
        '/mugs/photo-mug-mug05/': '/mugs/photo-mug-with-heart-handle-mug05/',
        '/mugs/plaim-mug-mug06/': '/mugs/plain-photo-mug-mug06/',
        // — Bottles (typo fix) —
        '/bottles/water-sipper-botttle-btl05/': '/bottles/water-sipper-bottle-btl05/'
    };
    if (productRedirects[lookupUri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                "location": { "value": 'https://createmygift.in' + productRedirects[lookupUri] }
            }
        };
    }

    // 3. Redirect legacy /category/<Name> → /<slug>/
    if (uri.match(/^\/category\//i)) {
        var catName = decodeURIComponent(uri.replace(/^\/category\//i, '').replace(/\/$/, ''));
        var slug = catName.toLowerCase().trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                "location": { "value": 'https://createmygift.in/' + slug + '/' }
            }
        };
    }

    // 4. Magnet short-link redirect: /m/{id} → API Gateway (Lambda does the real 301)
    var magnetMatch = uri.match(/^\/m\/([a-zA-Z0-9]+)\/?$/);
    if (magnetMatch) {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                "location": { "value": 'https://1i7yobjjll.execute-api.ap-south-1.amazonaws.com/dev/m/' + magnetMatch[1] }
            }
        };
    }

    // 5. Redirect legacy /home → /
    if (uri === '/home' || uri === '/home/') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                "location": { "value": 'https://createmygift.in/' }
            }
        };
    }

    // Pass through requests that already point to a file (have an extension)
    if (uri.match(/\.[a-zA-Z0-9]+$/)) {
        return request;
    }

    // Append index.html to directory paths (with or without trailing slash)
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else {
        request.uri = uri + '/index.html';
    }

    return request;
}
