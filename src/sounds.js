// Sound manager for the slot machine app
class SoundManager {
    constructor() {
        this.sounds = {};
        this.audioContext = null;
        this.isMuted = false;
        this.volume = 0.5; // Default volume 50%
        this.isPlayingCustomSound = false;
        
        this.initializeSounds();
        this.createVolumeControl();
    }

    // Check if sound should play
    shouldPlaySound(soundType) {
        if (this.isMuted) return false;
        return true;
    }

    // Initialize audio context and load sounds
    initializeSounds() {
        // Initialize Web Audio API context
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }

        // Load custom MP3 files
        this.loadCustomSounds();

        // Define sound URLs (you can replace these with your own sound files)
        const soundUrls = {
            spin: 'https://www.soundjay.com/misc/sounds/slot-machine-spinning.wav',
            win: 'https://www.soundjay.com/misc/sounds/slot-machine-win.wav',
            lose: 'https://www.soundjay.com/misc/sounds/slot-machine-lose.wav',
            click: 'https://www.soundjay.com/misc/sounds/button-click.wav',
            reelStop: 'https://www.soundjay.com/misc/sounds/slot-reel-stop.wav',
            jackpot: 'https://www.soundjay.com/misc/sounds/jackpot.wav',
            background: 'https://www.soundjay.com/misc/sounds/casino-ambience.wav'
        };

        // For demo purposes, we'll create simple programmatic sounds
        // You can replace these with actual audio file loading
        this.createProgrammaticSounds();
    }

    // Load custom MP3 sound files with performance optimizations
    loadCustomSounds() {
        this.customSounds = {};
        
        // Load congratulations sound
        const congratsAudio = new Audio('./assets/sounds/Congratulations.mp3');
        congratsAudio.volume = this.volume;
        congratsAudio.preload = 'auto';
        this.customSounds.congratulations = congratsAudio;

        // Load miaw sound
        const miawAudio = new Audio('./assets/sounds/miaw.mp3');
        miawAudio.volume = this.volume;
        miawAudio.preload = 'auto';
        this.customSounds.miaw = miawAudio;

        // Load happy happy happy sound
        const happyAudio = new Audio('./assets/sounds/Happy Happy Happy.mp3');
        happyAudio.volume = this.volume;
        happyAudio.preload = 'auto';
        this.customSounds.happy = happyAudio;

        // Handle loading errors gracefully
        congratsAudio.addEventListener('error', () => {
            console.warn('Could not load congratulations sound');
        });

        miawAudio.addEventListener('error', () => {
            console.warn('Could not load miaw sound');
        });

        happyAudio.addEventListener('error', () => {
            console.warn('Could not load happy happy happy sound');
        });

        // Add event listeners for performance mode tracking
        congratsAudio.addEventListener('ended', () => {
            this.isPlayingCustomSound = false;
        });

        miawAudio.addEventListener('ended', () => {
            this.isPlayingCustomSound = false;
        });

        happyAudio.addEventListener('ended', () => {
            this.isPlayingCustomSound = false;
        });
    }

    // Create simple beep sounds programmatically (fallback)
    createProgrammaticSounds() {
        this.sounds = {
            spin: () => this.createSpinSound(),
            win: () => this.createMelody([523, 659, 784, 1047], 0.3), // C-E-G-C chord
            lose: () => this.createTone(150, 0.8, 'sine'),
            click: () => this.createTone(800, 0.1, 'square'),
            reelStop: () => this.createTone(400, 0.2, 'triangle'),
            jackpot: () => this.createCelebrationSound(),
            background: () => this.createAmbientSound()
        };
    }

    // Create a realistic spinning sound
    createSpinSound() {
        if (!this.audioContext || this.isMuted) return;

        const duration = 2.5;
        const clickCount = 8;
        const clickInterval = 300;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();

        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Start with a higher frequency and gradually lower it
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + duration);
        
        // Use sawtooth wave for a mechanical sound
        oscillator.type = 'sawtooth';

        // Add some filtering for realism
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        filterNode.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + duration);

        // Volume envelope
        const volumeMultiplier = 0.4;
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * volumeMultiplier, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        // Add clicking sounds to simulate mechanical reels (reduced in performance mode)
        for (let i = 0; i < clickCount; i++) {
            setTimeout(() => {
                this.createTone(600 + Math.random() * 200, 0.05, 'square');
            }, i * clickInterval);
        }
    }

    // Create a single tone
    createTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext || this.isMuted) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = waveType;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Create a melody (sequence of tones)
    createMelody(frequencies, noteDuration) {
        if (!this.audioContext || this.isMuted) return;

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.createTone(freq, noteDuration, 'sine');
            }, index * noteDuration * 200);
        });
    }

    // Create celebration sound for jackpot
    createCelebrationSound() {
        if (!this.audioContext || this.isMuted) return;

        // Play a rising arpeggio
        const notes = [261, 329, 392, 523, 659, 784, 1047, 1319]; // C major scale
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.createTone(freq, 0.4, 'sine');
            }, index * 100);
        });

        // Add some sparkle effects
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    this.createTone(1000 + Math.random() * 1000, 0.1, 'square');
                }, i * 50);
            }
        }, 800);
    }

    // Create ambient background sound
    createAmbientSound() {
        if (!this.audioContext || this.isMuted) return;

        // Create a subtle background hum
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);

        oscillator.start();
        
        // Stop after 5 seconds (you can make this loop)
        setTimeout(() => {
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
            oscillator.stop(this.audioContext.currentTime + 1);
        }, 5000);
    }

    // Play specific sound with performance mode support
    playSound(soundName) {
        // Check if sound should play based on performance mode
        if (!this.shouldPlaySound(soundName) || !this.sounds[soundName]) {
            if (this.isMuted) {
                console.log(`Sound ${soundName} muted`);
            } else if (!this.sounds[soundName]) {
                console.warn(`Sound ${soundName} not found`);
            }
            return;
        }

        try {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    this.sounds[soundName]();
                }).catch(error => {
                    console.warn('Failed to resume audio context:', error);
                });
            } else {
                this.sounds[soundName]();
            }
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }

    // Control functions
    mute() {
        this.isMuted = true;
        this.updateVolumeButton();
    }

    unmute() {
        this.isMuted = false;
        this.updateVolumeButton();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateVolumeButton();
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // Update custom sounds volume if they exist
        if (this.customSounds) {
            Object.values(this.customSounds).forEach(audio => {
                if (audio) {
                    audio.volume = this.volume;
                }
            });
        }
        
        this.updateVolumeSlider();
    }

    // Create volume control UI at bottom of page
    createVolumeControl() {
        // Create bottom controls container
        let bottomControls = document.querySelector('.bottom-controls');
        if (!bottomControls) {
            bottomControls = document.createElement('div');
            bottomControls.className = 'bottom-controls';
            document.body.appendChild(bottomControls);
            
            // Listen for orientation changes and reposition controls
            this.repositionControls();
            window.addEventListener('resize', () => this.repositionControls());
            window.addEventListener('orientationchange', () => {
                setTimeout(() => this.repositionControls(), 100);
            });
        }

        const soundControl = document.createElement('div');
        soundControl.className = 'sound-control';
        soundControl.innerHTML = `
            <div class="sound-controls">
                <button id="muteButton" class="mute-button" title="Toggle Sound">
                    🔊
                </button>
                <input type="range" id="volumeSlider" class="volume-slider" 
                       min="0" max="100" value="50" title="Volume">
                <span class="volume-label">50%</span>
                <button id="testSoundButton" class="test-sound-button" title="Test Sound">
                    🎵
                </button>
            </div>
        `;

        // Add styles for bottom controls
        const style = document.createElement('style');
        style.textContent = `
            .bottom-controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin-top: 30px;
                padding: 20px;
            }
            
            .sound-control {
                display: flex;
                justify-content: center;
            }
            
            .sound-controls {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(0,0,0,0.8);
                padding: 12px 16px;
                border-radius: 25px;
                border: 2px solid #FFD700;
                backdrop-filter: blur(5px);
            }

            .admin-button {
                background: rgba(0,0,0,0.8);
                border: 2px solid #FFD700;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 1.5em;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .admin-button:hover {
                background: rgba(255,215,0,0.2);
                transform: scale(1.1);
            }
            
            .mute-button {
                background: none;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.2s ease;
                color: white;
            }
            
            .mute-button:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .mute-button.muted {
                opacity: 0.5;
            }
            
            .test-sound-button {
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.2s ease;
                color: white;
            }
            
            .test-sound-button:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .volume-slider {
                width: 100px;
                height: 5px;
                border-radius: 5px;
                background: #ddd;
                outline: none;
                -webkit-appearance: none;
            }
            
            .volume-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #FFD700;
                cursor: pointer;
            }
            
            .volume-slider::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #FFD700;
                cursor: pointer;
                border: none;
            }
            
            .volume-label {
                color: white;
                font-weight: bold;
                min-width: 30px;
                text-align: center;
                font-size: 0.9em;
            }

            @media (max-width: 768px) {
                .bottom-controls {
                    margin-top: 20px;
                    padding: 15px;
                    gap: 12px;
                }

                .sound-controls {
                    padding: 10px 12px;
                    gap: 8px;
                }

                .admin-button {
                    width: 45px;
                    height: 45px;
                    font-size: 1.3em;
                }
            }

            @media (max-width: 480px) {
                .bottom-controls {
                    margin-top: 15px;
                    padding: 12px;
                    gap: 10px;
                }

                .sound-controls {
                    padding: 8px 10px;
                    gap: 6px;
                }

                .volume-slider {
                    width: 60px;
                }

                .admin-button {
                    width: 40px;
                    height: 40px;
                    font-size: 1.2em;
                }
            }
        `;
        document.head.appendChild(style);

        // Add admin button to bottom controls
        const adminButton = document.createElement('button');
        adminButton.className = 'admin-button';
        adminButton.title = 'Admin Access';
        adminButton.innerHTML = '🤫';
        adminButton.addEventListener('click', () => {
            if (window.showAdminLogin) {
                window.showAdminLogin();
            }
        });

        bottomControls.appendChild(soundControl);
        bottomControls.appendChild(adminButton);
        
        // Initialize volume display
        this.updateVolumeSlider();

        // Add event listeners
        document.getElementById('muteButton').addEventListener('click', () => {
            this.toggleMute();
            this.playSound('click'); // Play click sound when toggling
        });

        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            const volume = parseInt(e.target.value) / 100;
            this.setVolume(volume);
            this.playSound('click'); // Play click sound when adjusting
        });

        document.getElementById('testSoundButton').addEventListener('click', () => {
            console.log('Testing spin sound...');
            this.testSound('spin');
        });
    }

    // Reposition controls based on orientation
    repositionControls() {
        const bottomControls = document.querySelector('.bottom-controls');
        const headerLogo = document.querySelector('.header-logo');
        
        if (!bottomControls || !headerLogo) return;
        
        const isLandscape = window.innerWidth > window.innerHeight;
        
        if (isLandscape) {
            // Move controls to header in landscape mode
            if (bottomControls.parentElement !== headerLogo) {
                headerLogo.appendChild(bottomControls);
            }
        } else {
            // Move controls back to body in portrait mode
            if (bottomControls.parentElement !== document.body) {
                document.body.appendChild(bottomControls);
            }
        }
    }

    // Update volume button appearance
    updateVolumeButton() {
        const button = document.getElementById('muteButton');
        if (button) {
            button.textContent = this.isMuted ? '🔇' : '🔊';
            button.classList.toggle('muted', this.isMuted);
        }
    }

    // Update volume slider and label
    updateVolumeSlider() {
        const slider = document.getElementById('volumeSlider');
        const label = document.querySelector('.volume-label');
        
        if (slider) {
            slider.value = this.volume * 100;
        }
        
        if (label) {
            label.textContent = Math.round(this.volume * 100) + '%';
        }
    }

    // Integration methods for slot machine events
    onSpinStart() {
        this.playSound('spin');
    }

    onReelStop() {
        this.playSound('reelStop');
    }
    
    // Card flip sound effect (generated)
    onCardFlip() {
        if (this.isMuted) return;
        
        // Generate a quick "whoosh" sound for card flip
        if (this.audioContext) {
            const now = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Quick descending tone
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
            
            // Quick fade in and out
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15 * this.volume, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            oscillator.start(now);
            oscillator.stop(now + 0.15);
        }
    }
    
    // Drumroll sound effect (suspense before first flip) - cute playful anticipation sound
    onDrumroll() {
        if (this.isMuted) {
            console.log('🔇 Drumroll skipped: sound is muted');
            return;
        }
        
        // Generate a cute, playful anticipation sound
        if (this.audioContext) {
            // Resume audio context if suspended (required by browsers)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('🔊 Audio context resumed for drumroll');
                });
            }
            
            console.log('✨ Playing cute anticipation sound');
            const now = this.audioContext.currentTime;
            const duration = 3.5;
            
            // Create a playful bouncing/bubbling sound with ascending tones
            const mainGain = this.audioContext.createGain();
            mainGain.connect(this.audioContext.destination);
            
            this.drumrollOscillators = [];
            
            // Generate cute bouncing tones (like excited anticipation)
            const numBounces = 28; // Cute bouncing sounds
            for (let i = 0; i < numBounces; i++) {
                const progress = i / numBounces;
                const bounceTime = now + (progress * duration);
                
                // Create oscillator for each bounce
                const osc = this.audioContext.createOscillator();
                osc.type = 'sine'; // Soft, cute sine wave
                
                // Playful ascending melody (major scale intervals)
                const baseFreq = 400;
                const scaleSteps = [0, 2, 4, 5, 7, 9, 11, 12]; // Major scale
                const note = scaleSteps[i % scaleSteps.length];
                const octaveBoost = Math.floor(i / scaleSteps.length) * 12;
                const freq = baseFreq * Math.pow(2, (note + octaveBoost) / 12);
                
                osc.frequency.setValueAtTime(freq, bounceTime);
                
                // Quick vibrato for cuteness
                osc.frequency.linearRampToValueAtTime(freq * 1.02, bounceTime + 0.05);
                
                const bounceGain = this.audioContext.createGain();
                
                // Cute envelope (quick attack, gentle decay)
                const velocity = 0.15 + (progress * 0.15); // Gets slightly louder
                bounceGain.gain.setValueAtTime(0, bounceTime);
                bounceGain.gain.linearRampToValueAtTime(velocity * this.volume, bounceTime + 0.01);
                bounceGain.gain.exponentialRampToValueAtTime(0.001, bounceTime + 0.12);
                
                osc.connect(bounceGain);
                bounceGain.connect(mainGain);
                
                osc.start(bounceTime);
                osc.stop(bounceTime + 0.12);
                
                this.drumrollOscillators.push(osc);
            }
            
            // Add a gentle sustained tone underneath for continuity
            const sustainOsc = this.audioContext.createOscillator();
            sustainOsc.type = 'triangle'; // Warmer sound
            sustainOsc.frequency.setValueAtTime(300, now);
            sustainOsc.frequency.linearRampToValueAtTime(500, now + duration); // Gentle rise
            
            const sustainGain = this.audioContext.createGain();
            sustainGain.gain.setValueAtTime(0, now);
            sustainGain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.5);
            sustainGain.gain.linearRampToValueAtTime(0.12 * this.volume, now + duration - 0.3);
            
            sustainOsc.connect(sustainGain);
            sustainGain.connect(mainGain);
            
            sustainOsc.start(now);
            sustainOsc.stop(now + duration);
            
            this.drumrollOscillators.push(sustainOsc);
            this.drumrollGain = mainGain;
            
        } else {
            console.warn('⚠️ Audio context not available for drumroll');
        }
    }
    
    // Stop drumroll early (when modal appears)
    stopDrumroll() {
        if (this.drumrollOscillators && this.drumrollOscillators.length > 0) {
            console.log('🛑 Stopping anticipation sound');
            const now = this.audioContext.currentTime;
            
            // Gracefully stop all oscillators
            this.drumrollOscillators.forEach(osc => {
                try {
                    osc.stop(now + 0.05);
                } catch (e) {
                    // Already stopped
                }
            });
            
            if (this.drumrollGain) {
                this.drumrollGain.gain.cancelScheduledValues(now);
                this.drumrollGain.gain.setValueAtTime(this.drumrollGain.gain.value, now);
                this.drumrollGain.gain.linearRampToValueAtTime(0.001, now + 0.05);
            }
            
            this.drumrollOscillators = [];
            this.drumrollGain = null;
        }
    }

    onWin(isJackpot = false) {
        if (isJackpot) {
            this.playSound('jackpot');
        } else {
            this.playSound('win');
        }
    }

    onLose() {
        this.playSound('lose');
    }

    // Play congratulations sound for popup wins
    onPopupWin() {
        this.playCustomSound('congratulations');
    }

    // Play miaw sound for popup losses (default prize)
    onPopupLose() {
        this.playCustomSound('miaw');
    }

    // Play happy happy happy sound for special wins (medium tier prizes)
    onPopupHappy() {
        this.playCustomSound('happy');
    }

    // Play custom MP3 sounds with performance mode support
    playCustomSound(soundName) {
        if (this.isMuted || !this.customSounds || !this.customSounds[soundName]) {
            return;
        }

        try {
            const audio = this.customSounds[soundName];
            audio.preload = 'auto';
            this.isPlayingCustomSound = true;
            setTimeout(() => {
                this.isPlayingCustomSound = false;
            }, 2000);

            audio.currentTime = 0;
            audio.volume = this.volume;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn(`Could not play ${soundName} sound:`, error);
                    this.isPlayingCustomSound = false;
                });
            }
        } catch (error) {
            console.warn(`Error playing custom sound ${soundName}:`, error);
            this.isPlayingCustomSound = false;
        }
    }

    // Stop all custom sounds
    stopCustomSounds() {
        if (!this.customSounds) {
            return;
        }

        try {
            Object.values(this.customSounds).forEach(audio => {
                if (audio && !audio.paused) {
                    audio.pause();
                    audio.currentTime = 0; // Reset to beginning
                }
            });
        } catch (error) {
            console.warn('Error stopping custom sounds:', error);
        }
    }

    onButtonClick() {
        this.playSound('click');
    }

    onBackgroundStart() {
        this.playSound('background');
    }

    // Debug function to test sounds
    testSound(soundName) {
        console.log(`Testing sound: ${soundName}`);
        if (this.audioContext && this.audioContext.state === 'suspended') {
            console.log('Audio context suspended, trying to resume...');
            this.audioContext.resume().then(() => {
                console.log('Audio context resumed');
                this.playSound(soundName);
            });
        } else {
            this.playSound(soundName);
        }
    }

    // Test all sounds (for debugging)
    testAllSounds() {
        const soundNames = ['click', 'spin', 'reelStop', 'win', 'lose', 'jackpot'];
        soundNames.forEach((sound, index) => {
            setTimeout(() => {
                console.log(`Testing ${sound}...`);
                this.testSound(sound);
            }, index * 1000);
        });
    }
}

// Global sound manager instance
// Initialize sound manager and load custom sounds
window.soundManager = new SoundManager();
window.soundManager.loadCustomSounds();
