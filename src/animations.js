// Animation manager using GSAP
class AnimationManager {
    constructor() {
        this.isSpinning = false;
        this.reelHeight = null; // Will be set dynamically
        this.idleTimelines = [];
    }

    // Get animation settings (high-quality always)
    getAnimationSettings() {
        return {
            spinDuration: 0.12,
            spinEase: "none",
            stopDuration: 1.0,
            stopEase: "power2.out",
            popupScale: true,
            popupDuration: 0.4,
            popupEase: "back.out(1.7)",
            enableConfetti: true,
            confettiAmount: 7,
            confettiInterval: 200,
            confettiMultiplier: 2,
            enableIdleAnimations: true
        };
    }

    // Create reel items for animation (DEPRECATED - kept for compatibility)
    createReelItems(prizes, defaultPrize = null) {
        const items = [];
        
        // Add all prizes multiple times for seamless animation
        for (let i = 0; i < 15; i++) {
            prizes.forEach(prize => {
                items.push(this.createReelItem(prize));
            });
        }
        
        return items;
    }

    createReelItem(prize) {
        const item = document.createElement('div');
        item.className = 'reel-item';
        item.innerHTML = `
            <img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null; this.style.display='none';">
        `;
        // Dynamically set reelHeight if not set
        if (!this.reelHeight) {
            document.body.appendChild(item);
            this.reelHeight = item.offsetHeight;
            document.body.removeChild(item);
        }
        return item;
    }

    // ===== CARD GAME METHODS =====

    // Resolve an image src from the preloaded asset cache when available,
    // falling back to a direct network request if not found.
    getImageSrc(src) {
        if (window.slotMachine && window.slotMachine.preloadedAssets) {
            const asset = window.slotMachine.preloadedAssets.get(src);
            if (asset && asset.element) return asset.element.src;
        }
        return src;
    }

    // Initialize cards with prize images
    initializeCards(prizes) {
        const cards = document.querySelectorAll('.card');
        if (cards.length === 0) {
            console.warn('No cards found in DOM');
            return;
        }
        
        // Set initial card positions
        cards.forEach((card, index) => {
            card.dataset.position = index;
            card.classList.remove('flipped');
            
            // Set a random prize image on each card (will be updated on flip)
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            const img = card.querySelector('.card-prize-image');
            if (img) {
                img.src = this.getImageSrc(randomPrize.image);
                img.alt = randomPrize.name;
            }
        });
        
        // Start continuous shuffle animation
        this.startCardShuffle();
    }

    // Continuous card shuffle animation with random intervals
    startCardShuffle() {
        this.stopCardShuffle();
        
        const cards = document.querySelectorAll('.card');
        if (cards.length !== 3) return;
        
        this.shuffleTimeline = gsap.timeline({ repeat: -1 });
        
        const swapDuration = 0.4;
        
        // Create shuffle timeline with sequential swaps (no overlapping)
        let cumulativeTime = 0;
        for (let i = 0; i < 50; i++) { // 50 shuffles in the loop
            // Random delay between shuffles (0.3-1 seconds)
            const delayBetween = 0.3 + Math.random() * 0.7;
            
            // Random pair to swap (0-1, 1-2, or 0-2)
            const swapPairs = [[0, 1], [1, 2], [0, 2]];
            const [pos1, pos2] = swapPairs[Math.floor(Math.random() * swapPairs.length)];
            
            // Schedule swap at specific time (delay + previous swap duration)
            cumulativeTime += delayBetween;
            
            this.shuffleTimeline.call(() => {
                this.swapCardPositions(pos1, pos2);
            }, [], cumulativeTime);
            
            // Add swap duration to cumulative time so next swap starts after this one finishes
            cumulativeTime += swapDuration;
        }
    }

    // Swap two cards by position (using absolute positioning for smooth animation)
    swapCardPositions(pos1, pos2) {
        const cardsArea = document.querySelector('.cards-area');
        if (!cardsArea) return;
        
        const cards = Array.from(cardsArea.querySelectorAll('.card'));
        const card1 = cards.find(c => parseInt(c.dataset.position) === pos1);
        const card2 = cards.find(c => parseInt(c.dataset.position) === pos2);
        
        if (!card1 || !card2) return;
        
        // Get target positions based on data-position
        const positions = {
            0: 'calc(50% - 440px)',
            1: 'calc(50% - 140px)',
            2: 'calc(50% + 160px)'
        };
        
        const duration = 0.4;
        
        // Get current computed left values
        const card1Left = card1.getBoundingClientRect().left - cardsArea.getBoundingClientRect().left;
        const card2Left = card2.getBoundingClientRect().left - cardsArea.getBoundingClientRect().left;
        
        // Animate to each other's positions with arc
        gsap.to(card1, {
            left: card2Left,
            top: -30,
            duration: duration / 2,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.to(card1, {
                    top: 0,
                    duration: duration / 2,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        // Update position and set to CSS calc value
                        card1.dataset.position = pos2;
                        card1.style.left = positions[pos2];
                        card1.style.top = '0';
                    }
                });
            }
        });
        
        gsap.to(card2, {
            left: card1Left,
            top: -30,
            duration: duration / 2,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.to(card2, {
                    top: 0,
                    duration: duration / 2,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        // Update position and set to CSS calc value
                        card2.dataset.position = pos1;
                        card2.style.left = positions[pos1];
                        card2.style.top = '0';
                    }
                });
            }
        });
    }

    // Stop card shuffle
    stopCardShuffle() {
        if (this.shuffleTimeline) {
            this.shuffleTimeline.kill();
            this.shuffleTimeline = null;
        }
        
        // Reset cards to their position-based locations
        const cards = document.querySelectorAll('.card');
        const positions = {
            0: 'calc(50% - 440px)',
            1: 'calc(50% - 140px)',
            2: 'calc(50% + 160px)'
        };
        
        cards.forEach(card => {
            gsap.killTweensOf(card);
            const pos = parseInt(card.dataset.position);
            card.style.left = positions[pos];
            card.style.top = '0';
        });
    }

    // Flip cards animation (one by one from left to right)
    async flipCards(cardPrizes) {
        if (this.isSpinning) return;
        this.isSpinning = true;
        
        // Stop shuffle animation
        this.stopCardShuffle();
        
        const spinButton = document.getElementById('spinButton');
        spinButton.disabled = true;
        spinButton.querySelector('.button-text').textContent = 'FLIPPING...';
        
        // Get cards sorted by position
        const cards = Array.from(document.querySelectorAll('.card'))
            .sort((a, b) => parseInt(a.dataset.position) - parseInt(b.dataset.position));
        
        // Set prize images before flipping
        cards.forEach((card, index) => {
            const img = card.querySelector('.card-prize-image');
            if (img && cardPrizes[index]) {
                img.src = this.getImageSrc(cardPrizes[index].image);
                img.alt = cardPrizes[index].name;
            }
        });
        
        // Play drumroll sound effect before first card flip
        if (window.soundManager && typeof window.soundManager.onDrumroll === 'function') {
            window.soundManager.onDrumroll();
        }
        
        // Flip each card sequentially
        const flipDuration = 0.6;
        const delayBetween = 0.5;
        
        for (let i = 0; i < cards.length; i++) {
            // Add 1 second delay before first card flip (for drumroll)
            const extraDelay = i === 0 ? 1000 : 0;
            
            await new Promise(resolve => {
                setTimeout(() => {
                    cards[i].classList.add('flipped');
                    
                    // Play card flip sound
                    if (window.soundManager) {
                        window.soundManager.onCardFlip();
                    }
                    
                    setTimeout(resolve, flipDuration * 1000);
                }, (i * delayBetween * 1000) + extraDelay);
            });
        }
        
        // Small delay before showing prize popup
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return cards;
    }

    // Populate reels with items (DEPRECATED - for card game, use initializeCards)
    populateReels(prizes) {
        // Check if we're using cards or reels
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            // Card game mode
            this.initializeCards(prizes);
            return;
        }
        
        // Legacy reel mode (fallback)
        const reels = document.querySelectorAll('.reel');
        
        reels.forEach((reel, index) => {
            const strip = reel.querySelector('.reel-strip');
            strip.innerHTML = '';
            
            const items = this.createReelItems(prizes);
            items.forEach(item => strip.appendChild(item));
            
            // Position reel to show first prize initially
            gsap.set(strip, { y: -this.reelHeight });
        });
        // Start idle animation after populating reels
        this.startIdleAnimation();
    }
    // Idle animation: slow continuous spinning
    startIdleAnimation() {
        this.stopIdleAnimation();
    const reels = Array.from(document.querySelectorAll('.reel .reel-strip'));
        this.idleTimelines = [];
        // Use different intervals for each reel
        const durations = [6, 7.5, 9]; // You can tweak these for more/less variation
        reels.forEach((reel, i) => {
            const timeline = gsap.timeline({ repeat: -1 });
            const startY = gsap.getProperty(reel, 'y');
            const endY = startY - this.reelHeight * 10;
            timeline.to(reel, {
                y: endY,
                duration: durations[i % durations.length],
                ease: 'linear',
            });
            this.idleTimelines.push(timeline);
        });
    }

    // Stop idle animation
    stopIdleAnimation() {
        if (this.idleTimelines && this.idleTimelines.length) {
            this.idleTimelines.forEach(tl => tl.kill());
        }
        this.idleTimelines = [];
    }

    // Spin animation with precise landing (supports both reels and cards)
    async spinReels(targetPrize, prizes, slotIcons) {
        // Check if we're using cards or reels
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            // Card game mode
            const spinButton = document.getElementById('spinButton');
            try {
                await this.flipCards(slotIcons);
                this.showPrizePopup(targetPrize);
            } catch (error) {
                console.error('Error during card flip:', error);
            } finally {
                // Always re-enable button and clear spinning flag — even if something throws
                spinButton.disabled = false;
                spinButton.querySelector('.button-text').textContent = 'FLIP!';
                this.isSpinning = false;
            }

            // { once: true } prevents listener stacking on consecutive flips
            document.getElementById('closePopup').addEventListener('click', () => {
                setTimeout(() => {
                    cards.forEach(card => card.classList.remove('flipped'));
                    this.initializeCards(prizes);
                }, 300);
            }, { once: true });

            return;
        }
        
        // Legacy reel mode (fallback)
        if (this.isSpinning) return;
        this.isSpinning = true;

        // Stop idle animation before spinning
        this.stopIdleAnimation();

        // Play spin sound
        if (window.soundManager) {
            window.soundManager.onSpinStart();
        }

        const reels = Array.from(document.querySelectorAll('.reel .reel-strip'));
        const spinButton = document.getElementById('spinButton');

        // Disable spin button
        spinButton.disabled = true;
        spinButton.querySelector('.button-text').textContent = 'SPINNING...';

        // Dynamically calculate reelHeight if not set
        if (!this.reelHeight) {
            // Create a temp item to measure
            const tempItem = this.createReelItem(prizes[0]);
            document.body.appendChild(tempItem);
            this.reelHeight = tempItem.offsetHeight;
            document.body.removeChild(tempItem);
        }

        // For each reel, populate with random icons for suspense, then land on the result icon
        // Ensure enough icons to fill the reel and always center the winning icon
        const cycles = 30; // More cycles for extra buffer
        const bufferBelow = 10; // More buffer below
        reels.forEach((reel, i) => {
            reel.innerHTML = '';
            // Fill with suspenseful random icons above
            for (let c = 0; c < cycles; c++) {
                const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                reel.appendChild(this.createReelItem(randomPrize));
            }
            // Add the winning icon in the center position
            reel.appendChild(this.createReelItem(slotIcons[i]));
            // Fill with suspenseful random icons below
            for (let extra = 0; extra < bufferBelow; extra++) {
                const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                reel.appendChild(this.createReelItem(randomPrize));
            }
            // Center the winning icon
            const visibleCount = Math.floor(reel.parentNode.offsetHeight / this.reelHeight);
            // Adjust centerOffset to align with winning box position 
            // Winning box is at 50% + 7px, and reel-item height is now 180px
            const centerOffset = this.reelHeight * Math.floor(visibleCount / 2) - 30;
            gsap.set(reel, { y: -(cycles * this.reelHeight - centerOffset) });
        });

        // Calculate target positions for each slot icon
        const targetPositions = reels.map((reel, i) => {
            // The final index is cycles (for the selected icon at the end)
            const finalIndex = cycles;
            const visibleCount = Math.floor(reel.parentNode.offsetHeight / this.reelHeight);
            // Adjust centerOffset to align with winning box position
            // Winning box is at 50% + 7px, and reel-item height is now 180px
            const centerOffset = this.reelHeight * Math.floor(visibleCount / 2) - 30;
            return -(finalIndex * this.reelHeight - centerOffset);
        });

        // Seamless slot machine spin: all reels spin in a loop, then each stops in turn
        const settings = this.getAnimationSettings();
        const spinSpeed = settings.spinDuration;
        const spinCycles = 15;
        const staggerDelay = 1.5;
        const itemsToSpin = this.reelHeight * 10;
        const reelLoops = [];
        const reelPromises = reels.map((reel, i) => {
            return new Promise(resolve => {
                const loopTimeline = gsap.timeline({ repeat: -1 });
                reelLoops[i] = loopTimeline;
                loopTimeline.to(reel, {
                    y: `-=${itemsToSpin}`,
                    duration: spinSpeed,
                    ease: settings.spinEase
                });
                setTimeout(() => {
                    loopTimeline.kill();
                    gsap.to(reel, {
                        y: targetPositions[i],
                        duration: settings.stopDuration,
                        ease: settings.stopEase,
                        onComplete: () => {
                            // Play reel stop sound
                            if (window.soundManager) {
                                window.soundManager.onReelStop();
                            }
                            resolve();
                        }
                    });
                }, i * staggerDelay * 1000 + spinCycles * spinSpeed * 1000);
            });
        });

        for (let i = 0; i < reelPromises.length; i++) {
            await reelPromises[i];
        }

        // Show prize popup after animation
        setTimeout(() => {
            this.showPrizePopup(targetPrize);
        }, 100); // Reduced delay from 500ms to 100ms

        // Re-enable spin button
        spinButton.disabled = false;
        spinButton.querySelector('.button-text').textContent = 'SPIN!';
        this.isSpinning = false;

        // After popup is closed, repopulate reels with all prize icons and resume idle animation
        document.getElementById('closePopup').addEventListener('click', () => {
            setTimeout(() => {
                this.populateReels(prizes);
            }, 400);
        }, { once: true });
    }

    // Calculate where each reel should stop to show the target prize
    calculateTargetPositions(targetPrize, prizes) {
        const positions = [];
        const itemsPerCycle = prizes.length;
        
        for (let i = 0; i < 3; i++) {
            // Find the target prize index within one cycle
            let targetIndex = prizes.findIndex(p => p.id === targetPrize.id);
            if (targetIndex === -1) targetIndex = 0;
            
            // Calculate position to center the prize in the visible area
            // We want to land in the middle cycle (around cycle 7-8) for smooth animation
            const targetCycle = 7 + Math.floor(Math.random() * 2); // Cycle 7 or 8
            const finalIndex = targetCycle * itemsPerCycle + targetIndex;
            
            // Position to center the item in the middle of the visible reel (position 1 of 3 visible)
            const centerOffset = this.reelHeight; // Center position
            const targetY = -(finalIndex * this.reelHeight - centerOffset);
            
            positions.push(targetY);
        }
        
        return positions;
    }

    // Animate individual reel
    animateReel(reel, targetY, duration) {
        return new Promise((resolve) => {
            // Create a smooth deceleration animation
            const timeline = gsap.timeline();
            
            // Fast initial spin
            timeline.to(reel, {
                y: targetY - (this.reelHeight * 10), // Overshoot by 10 items
                duration: duration * 0.7,
                ease: "power2.in"
            });
            
            // Slow deceleration to final position
            timeline.to(reel, {
                y: targetY,
                duration: duration * 0.3,
                ease: "power3.out",
                onComplete: () => {
                    resolve();
                }
            });
        });
    }

    // Determine prize type based on win chance and default status
    determinePrizeType(prize, allPrizes) {
        if (prize.isDefault) {
            return 'consolation';
        }
        
        // Get all non-default prizes and sort by chance (ascending)
        const nonDefaultPrizes = allPrizes.filter(p => !p.isDefault);
        nonDefaultPrizes.sort((a, b) => a.chance - b.chance);
        
        // If this is the lowest chance (grand prize)
        if (nonDefaultPrizes.length > 0 && prize.id === nonDefaultPrizes[0].id) {
            return 'grandPrize';
        }
        
        // Otherwise it's a medium tier prize
        return 'mediumPrize';
    }

    // Show prize won popup with celebration
    showPrizePopup(prize) {
        // Stop drumroll when modal appears
        if (window.soundManager && typeof window.soundManager.stopDrumroll === 'function') {
            window.soundManager.stopDrumroll();
        }
        
        const popup = document.getElementById('prizePopup');
        const prizeImage = document.getElementById('wonPrizeImage');
        const prizeName = document.getElementById('wonPrizeName');
        const prizeTitle = document.getElementById('prizePopupTitle');
        const prizeShield = popup.querySelector('.prize-shield');

        // Get all prizes to determine prize type
        const allPrizes = window.storageManager ? window.storageManager.getPrizes() : [];
        const prizeType = this.determinePrizeType(prize, allPrizes);

        // For consolation prize, remove prize image and show only large sad crying cat
        if (prizeType === 'consolation') {
            prizeImage.style.display = 'none';
            prizeName.textContent = prize.name;
            if (prizeTitle) prizeTitle.textContent = 'Better luck next time!';
            if (prizeShield) {
                prizeShield.style.width = '';
                prizeShield.style.height = '';
                prizeShield.style.display = '';
                prizeShield.style.justifyContent = '';
                prizeShield.style.alignItems = '';
                prizeShield.innerHTML = `<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`;
            }
        } else {
            // Pre-load image to prevent lag during animation
            prizeImage.style.display = '';
            const img = new Image();
            img.onload = () => {
                prizeImage.src = prize.image;
            };
            img.src = prize.image;
            prizeName.textContent = `You won ${prize.name}!`;
        }

        // Force hardware acceleration before animation (moved up for both types)
        gsap.set(popup, { force3D: true });
        gsap.set(popup.querySelector('.popup-content'), { force3D: true });

        // Handle different prize types with appropriate images and sounds
        if (prizeType === 'consolation') {
            // Default/consolation prize - show crying cat and play miaw
            if (prizeTitle) prizeTitle.textContent = 'Better luck next time!';
            if (prizeShield) {
                prizeShield.innerHTML = `<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`;
            }
            
            // Play custom miaw sound with slight delay to not interfere with animation
            setTimeout(() => {
                if (window.soundManager) {
                    window.soundManager.onPopupLose();
                }
            }, 100);
        } else if (prizeType === 'grandPrize') {
            // Grand prize (lowest win chance) - show dancing cat and play congratulations
            if (prizeTitle) prizeTitle.textContent = 'Congratulations!';
            if (prizeShield) {
                prizeShield.innerHTML = `<img src="/assets/images/dancing-cat.gif" alt="Dancing Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/dancing-cat.gif'">`;
            }
            
            // Play custom congratulations sound with slight delay to not interfere with animation
            setTimeout(() => {
                if (window.soundManager) {
                    window.soundManager.onPopupWin();
                }
            }, 100);
        } else if (prizeType === 'mediumPrize') {
            // Medium tier prizes - show happy cat gif and play happy sound
            if (prizeTitle) prizeTitle.textContent = 'Congratulations!';
            if (prizeShield) {
                prizeShield.innerHTML = `<img src="/assets/images/Happy cat.gif" alt="Happy Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/Happy cat.gif'">`;
            }
            
            // Play custom happy happy happy sound with slight delay to not interfere with animation
            setTimeout(() => {
                if (window.soundManager) {
                    window.soundManager.onPopupHappy();
                }
            }, 100);
        }

        popup.classList.remove('hidden');

        // Get performance-optimized animation settings
        const settings = this.getAnimationSettings();

        // Optimized popup entrance animation
        if (settings.popupScale) {
            // High quality mode - full scale animation with bounce
            gsap.fromTo(popup.querySelector('.popup-content'), 
                { 
                    scale: 0, 
                    rotation: prizeType === 'consolation' ? 10 : -10, // Slight variation for lose vs win
                    opacity: 0
                },
                { 
                    scale: 1, 
                    rotation: 0, 
                    opacity: 1,
                    duration: settings.popupDuration,
                    ease: settings.popupEase,
                    force3D: true,
                    onComplete: () => {
                        // Add a subtle pulse effect for "better luck next time"
                        if (prizeType === 'consolation') {
                            gsap.to(popup.querySelector('.popup-content'), {
                                scale: 1.02,
                                duration: 0.3,
                                ease: "power2.inOut",
                                yoyo: true,
                                repeat: 1,
                                force3D: true
                            });
                        }
                    }
                }
            );
        } else {
            // Performance mode - simple fade in
            gsap.fromTo(popup.querySelector('.popup-content'), 
                { opacity: 0 },
                { 
                    opacity: 1,
                    duration: settings.popupDuration,
                    ease: settings.popupEase,
                    force3D: true
                }
            );
        }

        // Trigger confetti only if not consolation prize and confetti is enabled
        if (prizeType !== 'consolation' && settings.enableConfetti) {
            console.log(`🎊 Triggering confetti - Prize Type: ${prizeType}, Mode: ${this.performanceMode}, EnableConfetti: ${settings.enableConfetti}`);
            // Delay confetti slightly to not interfere with popup animation
            setTimeout(() => {
                this.triggerConfetti();
            }, 200);
        } else {
            console.log(`🚫 Confetti skipped - Prize Type: ${prizeType}, Mode: ${this.performanceMode}, EnableConfetti: ${settings.enableConfetti}`);
        }
    }

    // Confetti celebration with performance-aware settings
    triggerConfetti() {
        const settings = this.getAnimationSettings();
        console.log(`🎊 triggerConfetti() called - Mode: ${this.performanceMode}, EnableConfetti: ${settings.enableConfetti}`);
        
        const duration = settings.enableConfetti ? 1500 : 0; // Longer duration for more visible confetti
        const animationEnd = Date.now() + duration;
        const defaults = { 
            startVelocity: 45, 
            spread: 420, 
            ticks: 90, 
            zIndex: 2000 // Ensure confetti is always above modal popup
        };
        if (!settings.enableConfetti) {
            console.log('⚡ Confetti disabled in performance mode - RETURNING EARLY');
            return; // Skip confetti entirely when disabled
        }

        console.log('🎊 Confetti enabled - proceeding with animation');

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = settings.confettiAmount * (timeLeft / duration);
            const multiplier = settings.confettiMultiplier || 1;

            // Performance-aware confetti bursts - from modal edges
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount * multiplier,
                origin: { x: 0.35, y: 0.35 } // Top-left edge of modal
            }));
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount * multiplier,
                origin: { x: 0.65, y: 0.35 } // Top-right edge of modal
            }));
            
            // Additional bursts from bottom edges
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount,
                origin: { x: 0.35, y: 0.55 } // Bottom-left edge of modal
            }));
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount,
                origin: { x: 0.65, y: 0.55 } // Bottom-right edge of modal
            }));
        }, settings.confettiInterval || 150); // Use performance-aware interval
    }

    // Close popup animation
    closePrizePopup() {
        const popup = document.getElementById('prizePopup');
        
        // Stop any playing custom sounds when closing popup
        if (window.soundManager) {
            window.soundManager.stopCustomSounds();
        }
        
        // Force hardware acceleration
        gsap.set(popup.querySelector('.popup-content'), { force3D: true });
        
        gsap.to(popup.querySelector('.popup-content'), {
            scale: 0,
            rotation: 10,
            opacity: 0,
            duration: 0.25, // Faster close animation
            ease: "back.in(1.4)", // Less bounce
            force3D: true, // GPU acceleration
            onComplete: () => {
                popup.classList.add('hidden');
                
                // Update prize display to reflect any quantity changes (like exhausted prizes)
                if (window.slotMachine && window.slotMachine.updatePrizeDisplay) {
                    window.slotMachine.updatePrizeDisplay();
                }
            }
        });
    }

    // Animate prize showcase
    animatePrizeShowcase() {
        const prizes = document.querySelectorAll('.prize-item');
        
        gsap.fromTo(prizes, 
            { y: -50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.1,
                ease: "back.out(1.7)"
            }
        );
    }

    // Button hover effects
    initializeButtonEffects() {
        const spinButton = document.getElementById('spinButton');
        
        spinButton.addEventListener('mouseenter', () => {
            if (!spinButton.disabled) {
                gsap.to(spinButton, { scale: 1.05, duration: 0.2 });
            }
        });
        
        spinButton.addEventListener('mouseleave', () => {
            if (!spinButton.disabled) {
                gsap.to(spinButton, { scale: 1, duration: 0.2 });
            }
        });
    }
}

// Global animation manager instance
window.animationManager = new AnimationManager();