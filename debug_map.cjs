const { chromium } = require('playwright');
(async () => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        
        console.log("Navigating to Kontakt page...");
        await page.goto('http://localhost:4321/kontakt', { timeout: 30000 });
        
        console.log("Waiting 5 seconds for Leaflet map to load...");
        await page.waitForTimeout(5000);
        
        console.log("Taking screenshot...");
        await page.screenshot({ path: 'debug_map.png', fullPage: true });
        
        const mapHtml = await page.innerHTML('#location-map').catch(e => "Error getting HTML: " + e);
        
        if (mapHtml.includes('leaflet-tile')) {
            const tileCount = await page.locator('.leaflet-tile').count();
            console.log(`✅ SUCCESS: Found ${tileCount} Leaflet tiles in DOM!`);
        } else {
            console.log('❌ FAILED: No tiles rendered. Map container inner HTML:');
            console.log(mapHtml.substring(0, 500));
        }
        
        await browser.close();
    } catch (e) {
        console.error("Script error:", e);
        process.exit(1);
    }
})();
