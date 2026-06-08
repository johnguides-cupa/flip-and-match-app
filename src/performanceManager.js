// Performance Manager - High Quality Mode Only
class PerformanceManager {
    constructor() {
        this.mode = 'high-quality';
        this.listeners = [];
        this.initialized = false;

        this.config = {
            name: 'High Quality Mode',
            settings: {
                useGSAPAnimations: true,
                enableParticleEffects: true,
                useAdvancedEasing: true,
                enableSoundOverlap: true,
                enableHoverEffects: true,
                enableShadowEffects: true,
                animationDuration: 'normal',
                enableBackgroundEffects: true
            }
        };
    }

    getMode() {
        return this.mode;
    }

    getSettings() {
        return this.config.settings;
    }

    isEnabled(settingName) {
        return this.config.settings[settingName] === true;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    initialize() {
        if (this.initialized) return;
        this.applyOptimizations();
        this.initialized = true;
    }

    initializeMode(mode) {
        // Always high-quality regardless of argument
        if (!this.initialized) {
            this.initialize();
        }
    }

    applyOptimizations() {
        document.body.classList.remove('performance-low');
        document.body.classList.add('performance-high');
    }
}

export const performanceManager = new PerformanceManager();

if (typeof window !== 'undefined') {
    window.performanceManager = performanceManager;
}