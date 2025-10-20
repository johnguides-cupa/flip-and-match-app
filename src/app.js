// Main slot machine application
class SlotMachine {
    constructor() {
        // Performance optimization: Cache frequently used values
        this.cachedPrizes = null;
        this.cachedAvailablePrizes = null;
        this.cachedTotalChance = null;
        this.lastPrizeUpdate = 0;
        this.preloadedAssets = null; // Store preloaded assets
        
        this.initialize();
        this.setupEventListeners();
    }

    // Called when assets are preloaded
    onAssetsLoaded(loadedAssets) {
        this.preloadedAssets = loadedAssets;
        console.log('✅ Slot machine received preloaded assets:', loadedAssets.size);
        
        // Refresh displays with preloaded images
        this.updatePrizeDisplay();
        this.populateReels();
        
        // Preload any dynamic images that might be used
        this.optimizeImageLoading();
    }

    // Optimize image loading by using preloaded assets
    optimizeImageLoading() {
        // Find all images in the DOM and replace with preloaded versions if available
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const preloadedImage = this.getPreloadedImage(img.src);
            if (preloadedImage) {
                // Use the preloaded image data
                img.src = preloadedImage.src;
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            }
        });
    }

    // Get preloaded image if available
    getPreloadedImage(src) {
        if (!this.preloadedAssets) return null;
        
        // Try to find matching preloaded asset
        for (let [url, asset] of this.preloadedAssets) {
            if (url === src || url.includes(src) || src.includes(url)) {
                return asset.element;
            }
        }
        return null;
    }

    initialize() {
        this.updatePrizeDisplay();
        //this.updateGameInfo();
        this.populateReels();
        
        // Initialize animations (will handle both cards and reels)
        this.initializeAnimations();
        
        // Start background ambience after a short delay
        setTimeout(() => {
            if (window.soundManager) {
                window.soundManager.onBackgroundStart();
            }
        }, 2000);
    }

    setupEventListeners() {
        // Performance optimization: Debounce spin button to prevent spam
        let spinCooldown = false;
        
        // Spin button
        document.getElementById('spinButton').addEventListener('click', () => {
            if (spinCooldown || animationManager.isSpinning) return;
            
            spinCooldown = true;
            setTimeout(() => spinCooldown = false, 300); // 300ms cooldown
            
            if (window.soundManager) {
                window.soundManager.onButtonClick();
            }
            this.spin();
        });

        // Close prize popup
        document.getElementById('closePopup').addEventListener('click', () => {
            if (window.soundManager) {
                window.soundManager.onButtonClick();
            }
            animationManager.closePrizePopup();
        });

        // Keyboard shortcuts with debouncing
        let keyboardCooldown = false;
        document.addEventListener('keydown', (e) => {
            // Check if popup is visible or spin button is disabled
            const popup = document.getElementById('prizePopup');
            const spinButton = document.getElementById('spinButton');
            const isPopupVisible = popup && !popup.classList.contains('hidden');
            const isSpinButtonDisabled = spinButton && spinButton.disabled;
            
            if ((e.key === 'Enter' || e.key === ' ') && !keyboardCooldown && !animationManager.isSpinning && !isPopupVisible && !isSpinButtonDisabled) {
                e.preventDefault();
                keyboardCooldown = true;
                setTimeout(() => keyboardCooldown = false, 300);
                this.spin();
            }
        });
    }

    updatePrizeDisplay() {
        const prizeList = document.getElementById('prizeList');
        const prizes = storageManager.getPrizes();
        
        // Performance optimization: Only update if prizes changed
        const currentUpdate = Date.now();
        if (this.cachedPrizes && 
            JSON.stringify(this.cachedPrizes) === JSON.stringify(prizes) &&
            currentUpdate - this.lastPrizeUpdate < 100) {
            return; // Skip update if same data and updated recently
        }
        
        this.cachedPrizes = [...prizes]; // Create copy for comparison
        this.lastPrizeUpdate = currentUpdate;
        
        // Clear cache when prizes update
        this.clearPrizeCache();
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Exclude the default/consolation prize (highest chance) from display
        const defaultPrize = prizes.reduce((max, p) => p.chance > max.chance ? p : max, prizes[0] || {chance:0});
        prizes.filter(prize => prize.id !== defaultPrize.id).forEach(prize => {
            const prizeItem = document.createElement('div');
            prizeItem.className = 'prize-item';
            if (prize.quantity === 0) {
                prizeItem.classList.add('out-of-stock');
            }
            prizeItem.innerHTML = `
                <img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null; this.style.display='none';">
                <span>${prize.name}</span>
                ${prize.quantity === 0 ? '<div class="out-of-stock-overlay"><div class="x-mark">X</div></div>' : ''}
            `;
            fragment.appendChild(prizeItem);
        });
        
        // Single DOM update
        prizeList.innerHTML = '';
        prizeList.appendChild(fragment);

        // Animate prize showcase
        setTimeout(() => {
            animationManager.animatePrizeShowcase();
        }, 100);
    }

    // Performance optimization: Clear cached prize data
    clearPrizeCache() {
        this.cachedAvailablePrizes = null;
        this.cachedTotalChance = null;
    }

    // Performance optimization: Get available prizes with caching
    getAvailablePrizes(prizes) {
        if (!this.cachedAvailablePrizes) {
            // Include prizes with quantity > 0 OR unlimited consolation prizes (even if quantity is 0)
            this.cachedAvailablePrizes = prizes.filter(p => p.quantity > 0 || p.unlimitedConsolation);
            this.cachedTotalChance = this.cachedAvailablePrizes.reduce((sum, prize) => sum + prize.chance, 0);
        }
        return {
            prizes: this.cachedAvailablePrizes,
            totalChance: this.cachedTotalChance
        };
    }

    // updateGameInfo() {
    //     // Simple display for probability mode
    //     const modeDisplay = document.getElementById('modeDisplay');
    //     modeDisplay.textContent = 'Probability Mode';
    // }

    populateReels() {
        const prizes = storageManager.getPrizes();
        // animationManager will auto-detect if using cards or reels
        animationManager.populateReels(prizes);
    }

    initializeAnimations() {
        animationManager.initializeButtonEffects();
    }

    spin() {
        if (animationManager.isSpinning) return;

        // Clear cache at the start of each spin to ensure fresh prize data
        this.clearPrizeCache();

        const prizes = storageManager.getPrizes();
        if (prizes.length === 0) {
            alert('No prizes available! Please add some prizes in the admin panel.');
            return;
        }

        // Determine winning prize based on game mode
        const { prize: winningPrize, randomValue } = this.determineWinningPrize(prizes);
        if (!winningPrize) {
            alert('No more prizes available!');
            return;
        }
        
        // Store random value for logging
        this.lastRandomValue = randomValue;

        // Suspenseful slot icon logic for default prize
        let slotIcons = [];
        let actualPrize = winningPrize;
        const defaultPrize = prizes.reduce((max, p) => p.chance > max.chance ? p : max, prizes[0] || {chance:0});
        if (winningPrize.id === defaultPrize.id) {
            const available = prizes.filter(p => p.id !== defaultPrize.id);
            if (available.length === 0) {
                slotIcons = [defaultPrize, defaultPrize, defaultPrize];
            } else {
                // 50% chance slot 1 and 2 match, slot 3 always different
                const idx1 = Math.floor(Math.random() * available.length);
                let idx2 = Math.floor(Math.random() * available.length);
                let idx3 = Math.floor(Math.random() * available.length);
                if (Math.random() < 0.5) {
                    idx2 = idx1;
                } else {
                    // Ensure slot 2 is different from slot 1
                    while (idx2 === idx1 && available.length > 1) {
                        idx2 = Math.floor(Math.random() * available.length);
                    }
                }
                // Ensure slot 3 is different from slot 1 and 2
                while ((idx3 === idx1 || idx3 === idx2) && available.length > 1) {
                    idx3 = Math.floor(Math.random() * available.length);
                }
                slotIcons = [available[idx1], available[idx2], available[idx3]];
            }
            // If all icons match, set actualPrize to that icon; else, defaultPrize
            if (slotIcons[0].id === slotIcons[1].id && slotIcons[1].id === slotIcons[2].id) {
                actualPrize = slotIcons[0];
            } else {
                actualPrize = defaultPrize;
            }
        } else {
            slotIcons = [winningPrize, winningPrize, winningPrize];
            actualPrize = winningPrize;
        }
        // Mark if actualPrize is the default prize
        actualPrize = { ...actualPrize, isDefault: actualPrize.id === defaultPrize.id };

        // Log the spin (always use actualPrize)
        this.logSpin(actualPrize);

        // Update game info
        //this.updateGameInfo();

    // Start the spin animation with slotIcons, show actualPrize in popup
    // Note: Cache is already cleared in selectPrizeByProbability when prize quantity decreases
    animationManager.spinReels(actualPrize, prizes, slotIcons);
    }

    determineWinningPrize(prizes) {
        return this.selectPrizeByProbability(prizes);
    }

    selectPrizeByProbability(prizes) {
        // Performance optimization: Use cached available prizes
        const { prizes: availablePrizes, totalChance } = this.getAvailablePrizes(prizes);
        
        // Store totalChance for logging
        this.lastTotalChance = totalChance;
        
        if (availablePrizes.length === 0) {
            console.log('❌ No prizes available - all quantities exhausted!');
            return { prize: null, randomValue: 0 };
        }

        if (totalChance === 0) {
            // If no chances set, select randomly from available
            return { 
                prize: availablePrizes[Math.floor(Math.random() * availablePrizes.length)],
                randomValue: 0
            };
        }

        // Generate random number between 0 and totalChance (cached)
        let random = Math.random() * totalChance;
        console.log('🎲 Spin - Available prizes:', availablePrizes.length, 'Total chance:', totalChance);
        console.log('   Random value:', random.toFixed(3));
        console.log('   📋 Prize pool breakdown:');

        let selectedPrize = null;
        let cumulativeChance = 0;
        
        for (const prize of availablePrizes) {
            const rangeStart = cumulativeChance;
            cumulativeChance += prize.chance;
            const rangeEnd = cumulativeChance;
            const unlimitedTag = prize.unlimitedConsolation ? ' [UNLIMITED]' : '';
            const actualPercentage = ((prize.chance / totalChance) * 100).toFixed(2);
            console.log(`      ${prize.name}: Range ${rangeStart.toFixed(1)}-${rangeEnd.toFixed(1)} | Chance: ${prize.chance}% of ${totalChance} = ${actualPercentage}% actual | Qty: ${prize.quantity}${unlimitedTag}`);
            if (random <= cumulativeChance && !selectedPrize) {
                selectedPrize = prize;
                console.log(`   ✅ Selected: ${prize.name} (random ${random.toFixed(3)} fell in range ${rangeStart.toFixed(1)}-${rangeEnd.toFixed(1)})`);
                // Only decrease quantity if not unlimitedConsolation
                if (!prize.unlimitedConsolation) {
                    const updatedPrize = { ...prize, quantity: prize.quantity - 1 };
                    storageManager.updatePrize(updatedPrize);
                    console.log(`   📦 ${prize.name} quantity: ${prize.quantity} → ${updatedPrize.quantity}`);
                    if (updatedPrize.quantity === 0) {
                        console.log(`   🚫 ${prize.name} is now exhausted and will be removed from future spins!`);
                    }
                    // Clear cache so next spin recalculates available prizes
                    this.clearPrizeCache();
                } else {
                    console.log(`   ♾️ ${prize.name} is unlimited - quantity remains at ${prize.quantity}`);
                }
                break;
            }
        }
        
        // Fallback (should rarely happen)
        if (!selectedPrize) {
            selectedPrize = availablePrizes[availablePrizes.length - 1];
            console.log('⚠️ Fallback selected:', selectedPrize.name);
        }
        
        return { prize: selectedPrize, randomValue: random };
    }

    // Updated test function to account for quantity depletion and unlimited consolation
    testProbabilityAccuracy(iterations = 100) {
        console.log(`\n🧪 Testing quantity-based probability system with ${iterations} iterations...`);
        
        const prizes = storageManager.getPrizes();
        const results = {};
        const originalQuantities = {};
        
        // Initialize counters and save original quantities
        prizes.forEach(prize => {
            results[prize.name] = 0;
            originalQuantities[prize.name] = prize.quantity;
        });
        
        console.log('\n📦 Starting quantities:');
        prizes.forEach(prize => {
            const unlimitedTag = prize.unlimitedConsolation ? ' [UNLIMITED ♾️]' : '';
            console.log(`  ${prize.name}: ${prize.quantity} (${prize.chance}%)${unlimitedTag}`);
        });
        
        // Run test iterations
        let completedSpins = 0;
        for (let i = 0; i < iterations; i++) {
            const currentPrizes = storageManager.getPrizes();
            // Include unlimited consolation prizes even if quantity is 0
            const availablePrizes = currentPrizes.filter(p => p.quantity > 0 || p.unlimitedConsolation);
            
            if (availablePrizes.length === 0) {
                console.log(`\n🏁 All prizes exhausted after ${i} spins!`);
                break;
            }
            
            const { prize: winner } = this.selectPrizeByProbability(currentPrizes);
            if (winner) {
                results[winner.name]++;
                completedSpins++;
            }
        }
        
        // Calculate and display results
        console.log('\n📊 Final Results after ' + completedSpins + ' spins:');
        console.log('Prize\t\t\tWins\tActual %\tExpected %\tOriginal Qty\tRemaining\tStatus');
        console.log('─'.repeat(95));
        
        const finalPrizes = storageManager.getPrizes();
        
        // Sort prizes: lowest chance first (rarest prizes), highest chance last (consolation)
        const sortedPrizeNames = Object.keys(results).sort((a, b) => {
            const prizeA = prizes.find(p => p.name === a);
            const prizeB = prizes.find(p => p.name === b);
            return (prizeA?.chance || 0) - (prizeB?.chance || 0);
        });
        
        sortedPrizeNames.forEach(prizeName => {
            const finalPrize = finalPrizes.find(p => p.name === prizeName);
            const wins = results[prizeName];
            const actualPercentage = ((wins / completedSpins) * 100).toFixed(2); // 2 decimals for accuracy
            const expectedPercentage = finalPrize ? finalPrize.chance.toFixed(2) : '0.00'; // 2 decimals
            const originalQty = originalQuantities[prizeName];
            const remaining = finalPrize ? finalPrize.quantity : 0;
            const isUnlimited = finalPrize && finalPrize.unlimitedConsolation;
            const status = isUnlimited ? '♾️ UNLIMITED' : (remaining === 0 ? '❌ EXHAUSTED' : '✅ AVAILABLE');
            
            console.log(`${prizeName.padEnd(20)}\t${wins}\t${actualPercentage}%\t\t${expectedPercentage}%\t\t${originalQty}\t\t${remaining}\t\t${status}`);
        });
        
        // Show total wins vs iterations
        const totalWins = Object.values(results).reduce((sum, count) => sum + count, 0);
        console.log('\n📈 Summary:');
        console.log(`  Total spins completed: ${completedSpins} / ${iterations}`);
        console.log(`  Total prizes won: ${totalWins}`);
        console.log(`  Prizes still available: ${finalPrizes.filter(p => p.quantity > 0 || p.unlimitedConsolation).length}`);
        
        console.log('\n✅ Test completed. Quantities decreased as prizes were won (except unlimited).');
        console.log('💡 Reset the game to restore original quantities.');
    }

    logSpin(winningPrize) {
        const logEntry = {
            prizeName: winningPrize.name,
            gameMode: 'Probability',
            randomValue: this.lastRandomValue || 0,
            totalChance: this.lastTotalChance || 0
        };
        storageManager.addLog(logEntry);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.slotMachine = new SlotMachine();
    
    // Add probability test function to global scope for easy testing
    window.testProbability = (iterations = 1000) => {
        window.slotMachine.testProbabilityAccuracy(iterations);
    };
    
    console.log('🎰 Slot Machine loaded! Test probability with: testProbability(1000)');
});