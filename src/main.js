// Main entry point for Vite bundling with Asset Preloading and Performance Mode
import { assetPreloader } from './assetPreloader.js';
import { loadingScreen } from './loadingScreen.js';
import './storage.js';
import './sounds.js';
import './animations.js';
import './admin.js';
import './app.js';
import './expandButton.js';
// Import performance system components
import { performanceManager } from './performanceManager.js';
import { modeSelectionModal } from './modeSelectionModal.js';

// Explicitly assign to window for global access
window.performanceManager = performanceManager;
window.modeSelectionModal = modeSelectionModal;

// Initialize the application with asset preloading and performance management
async function initializeApp() {
    console.log('🎰 Initializing Slot Machine App...');
    
    // Debug: Check if components are available
    console.log('🔍 Debug - window.performanceManager:', !!window.performanceManager);
    console.log('🔍 Debug - window.modeSelectionModal:', !!window.modeSelectionModal);
    
    // Initialize performance manager early
    if (window.performanceManager) {
        window.performanceManager.initialize();
        console.log('⚡ Performance manager initialized');
    } else {
        console.error('❌ Performance manager not found on window object');
    }
    
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
            console.log('✅ All assets preloaded, checking performance mode...');
            
            // Small delay to show 100% completion
            setTimeout(() => {
                loadingScreen.hide();
                
                // Check if user has already selected a performance mode
                const savedMode = localStorage.getItem('slotMachine_performanceMode');
                
                if (!savedMode) {
                    // First time user - show mode selection modal
                    console.log('🎯 First time user, showing mode selection modal');
                    console.log('🔍 Debug - modeSelectionModal available:', !!window.modeSelectionModal);
                    if (window.modeSelectionModal) {
                        window.modeSelectionModal.show().then((selectedMode) => {
                            console.log(`✅ User selected: ${selectedMode}`);
                            showMainApplication(loadedAssets);
                        });
                    } else {
                        console.warn('❌ Mode selection modal not available, using default mode');
                        showMainApplication(loadedAssets);
                    }
                } else {
                    // Returning user - initialize with saved mode
                    console.log(`🔄 Returning user, using saved mode: ${savedMode}`);
                    if (window.performanceManager) {
                        window.performanceManager.initializeMode(savedMode);
                    }
                    showMainApplication(loadedAssets);
                }
            }, 300);
        }
    );
}

// Show the main application after mode selection
function showMainApplication(loadedAssets) {
    console.log('🎰 Showing main application');
    
    // Make sure the main app is visible
    const appContainer = document.querySelector('.slot-machine-cabinet');
    console.log('🔍 Debug - appContainer found:', !!appContainer);
    if (appContainer) {
        console.log('🔍 Debug - setting opacity to 1');
        appContainer.style.opacity = '1';
        appContainer.style.transition = 'opacity 0.5s ease-in';
        console.log('🔍 Debug - appContainer opacity set to:', appContainer.style.opacity);
    } else {
        console.error('❌ Could not find .slot-machine-cabinet element!');
    }
    
    // Trigger any post-load initialization
    if (window.slotMachine && window.slotMachine.onAssetsLoaded) {
        console.log('🎮 Triggering slot machine onAssetsLoaded');
        window.slotMachine.onAssetsLoaded(loadedAssets);
    } else {
        console.log('🔍 Debug - window.slotMachine:', !!window.slotMachine);
        console.log('🔍 Debug - window.slotMachine.onAssetsLoaded:', !!(window.slotMachine && window.slotMachine.onAssetsLoaded));
    }
    
    // Initialize performance-aware systems
    if (window.performanceManager) {
        const currentMode = window.performanceManager.getMode();
        console.log(`🚀 Application initialized in ${currentMode} mode`);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
