const { chromium } = require('playwright');

(async () => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        
        console.log("Navigating to Kontakt page...");
        await page.goto('http://localhost:4321/kontakt');
        
        console.log("Waiting for map to initialize...");
        // Wait longer to ensure Leaflet has time to mount and fetch tiles
        await page.waitForTimeout(4000); 
        
        const mapHtml = await page.innerHTML('#location-map');
        
        if (mapHtml.includes('leaflet-tile')) {
            console.log('✅ SUCCESS: Leaflet tiles found in DOM!');
            
            // Check bounding boxes
            const tileCount = await page.locator('.leaflet-tile').count();
            console.log(`Found ${tileCount} tiles.`);
            
        } else {
            console.log('❌ FAILED: No tiles rendered. Map container HTML:');
            console.log(mapHtml.substring(0, 500));
        }
        
        await browser.close();
    } catch (e) {
        console.error("Test error:", e);
        process.exit(1);
    }
})();
