// Main entry point for Vite bundling with Asset Preloading
import { assetPreloader } from './assetPreloader.js';
import { loadingScreen } from './loadingScreen.js';
import './storage.js';
import './sounds.js';
import './animations.js';
import './admin.js';
import './app.js';
import './expandButton.js';
import { performanceManager } from './performanceManager.js';

// Assign to window for global access
window.performanceManager = performanceManager;

// Initialize the application with asset preloading
async function initializeApp() {
    // Always use high-quality mode
    window.performanceManager.initializeMode('high-quality');

    // Show loading screen immediately
    loadingScreen.show();

    // Start asset preloading
    await assetPreloader.preloadAssets(
        // Progress callback
        (percentage, loaded, total) => {
            loadingScreen.updateProgress(percentage, loaded, total);
        },
        // Complete callback
        (loadedAssets) => {
            // Small delay to show 100% completion
            setTimeout(() => {
                loadingScreen.hide();
                showMainApplication(loadedAssets);
            }, 300);
        }
    );
}

// Show the main application
function showMainApplication(loadedAssets) {
    const appContainer = document.querySelector('.slot-machine-cabinet');
    if (appContainer) {
        appContainer.style.opacity = '1';
        appContainer.style.transition = 'opacity 0.5s ease-in';
    }

    if (window.slotMachine && window.slotMachine.onAssetsLoaded) {
        window.slotMachine.onAssetsLoaded(loadedAssets);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
