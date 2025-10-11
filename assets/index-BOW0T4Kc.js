(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const C="/flip-and-match-app/",x=[{id:"development-evp-shield",name:"Development EVP Shield",filename:"Development-EVP-shield.png",path:`${C}assets/images/prizes/Development-EVP-shield.png`,description:"Development EVP shield logo"},{id:"inclusion-evp-shield",name:"Inclusion EVP Shield",filename:"Inclusion-EVP-shield.png",path:`${C}assets/images/prizes/Inclusion-EVP-shield.png`,description:"Inclusion EVP shield logo"},{id:"innovation-evp-shield",name:"Innovation EVP Shield",filename:"Innovation-EVP-shield.png",path:`${C}assets/images/prizes/Innovation-EVP-shield.png`,description:"Innovation EVP shield logo"}],$={sadCat:{id:"sad-cat",name:"Sad Cat",filename:"Sad_cat.png",path:`${C}assets/images/Sad_cat.png`,description:"Default fallback image for failed loads"},winnerCat:{id:"winner-cat",name:"Winner Cat",filename:"cat_win.png",path:`${C}assets/images/cat_win.png`,description:"Victory celebration image"},logo:{id:"pursuing-potential-header",name:"Pursuing Potential Header Logo",filename:"Pursuing Potential Logo.png",path:`${C}assets/images/Pursuing Potential Logo.png`,description:"Main header logo"},catCrying:{id:"cat-crying",name:"Crying Cat",filename:"cat-crying.gif",path:`${C}assets/images/cat-crying.gif`,description:"Crying cat gif"},dancingCat:{id:"dancing-cat",name:"Dancing Cat",filename:"dancing-cat.gif",path:`${C}assets/images/dancing-cat.gif`,description:"Dancing cat gif"},happyCat:{id:"happy-cat",name:"Happy Cat",filename:"Happy cat.gif",path:`${C}assets/images/Happy cat.gif`,description:"Happy cat gif"}},M=f=>{const e=encodeURIComponent(f);return`${C}assets/images/prizes/${e}`};class B{constructor(){this.loadedCount=0,this.totalAssets=0,this.loadedAssets=new Map,this.onProgressCallback=null,this.onCompleteCallback=null,this.preloadStartTime=null}async preloadAssets(e,t){this.onProgressCallback=e,this.onCompleteCallback=t,this.preloadStartTime=performance.now();const n=this.collectImageUrls();this.totalAssets=n.length,console.log(`🎰 Starting preload of ${this.totalAssets} assets...`);const o=n.map((a,i)=>this.preloadImage(a,i));try{await Promise.allSettled(o);const a=performance.now()-this.preloadStartTime;console.log(`✅ Asset preloading completed in ${Math.round(a)}ms`),console.log(`📊 Successfully loaded: ${this.loadedAssets.size}/${this.totalAssets} assets`),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}catch(a){console.error("❌ Asset preloading error:",a),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}}collectImageUrls(){const e=new Set;return x.forEach(t=>{e.add(t.path)}),Object.values($).forEach(t=>{e.add(t.path)}),e.add("./assets/images/Pursuing Potential Logo.png"),e.add("/flip-and-match-app/assets/images/Pursuing%20Potential%20Logo.png"),Array.from(e).filter(t=>t&&t.trim()!=="")}preloadImage(e,t){return new Promise(n=>{const o=new Image;o.loading="eager",o.decoding="async",o.crossOrigin="anonymous";const a=setTimeout(()=>{console.warn(`⏰ Timeout loading image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"timeout"})},1e4);o.onload=()=>{clearTimeout(a),this.handleImageLoad(e,t,!0,o),n({success:!0,url:e})},o.onerror=()=>{clearTimeout(a),console.warn(`⚠️  Failed to load image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"error"})},o.src=e})}handleImageLoad(e,t,n,o=null){this.loadedCount++,n&&o&&this.loadedAssets.set(e,{url:e,element:o,loaded:!0,index:t});const a=this.loadedCount/this.totalAssets*100;this.onProgressCallback&&this.onProgressCallback(a,this.loadedCount,this.totalAssets)}getPreloadedImage(e){const t=this.loadedAssets.get(e);return t&&t.loaded?t.element:null}isComplete(){return this.loadedCount>=this.totalAssets}getStats(){return{loaded:this.loadedCount,total:this.totalAssets,percentage:this.totalAssets>0?this.loadedCount/this.totalAssets*100:0,loadedUrls:Array.from(this.loadedAssets.keys())}}}const q=new B;class D{constructor(){this.container=null,this.progressBar=null,this.progressText=null,this.statusText=null,this.loadingAnimation=null}show(){this.createLoadingHTML(),this.startLoadingAnimation(),document.body.appendChild(this.container)}updateProgress(e,t,n){if(this.progressBar&&(this.progressBar.style.width=`${e}%`),this.progressText&&(this.progressText.textContent=`${Math.round(e)}%`),this.statusText){let o="";e<25?o=`Loading prize images... ${t}/${n}`:e<50?o=`Loading app assets... ${t}/${n}`:e<75?o=`Preparing slot machine... ${t}/${n}`:e<100?o=`Finalizing setup... ${t}/${n}`:o=`Ready to play! ${t}/${n}`,this.statusText.textContent=o}}hide(){this.loadingAnimation&&clearInterval(this.loadingAnimation),this.container&&(this.container.style.transition="opacity 0.5s ease-out",this.container.style.opacity="0",setTimeout(()=>{this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)},500))}createLoadingHTML(){this.container=document.createElement("div"),this.container.id="asset-loading-screen",this.container.innerHTML=`
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="slot-spinner">
                        <div class="spinner-reel">🎰</div>
                        <div class="spinner-reel">🎯</div>
                        <div class="spinner-reel">⭐</div>
                    </div>
                </div>
                
                <h1 class="loading-title">Pursuing Potential</h1>
                <h2 class="loading-subtitle">Slot Machine</h2>
                
                <div class="loading-progress">
                    <div class="progress-container">
                        <div class="progress-bar-bg">
                            <div class="progress-bar" id="progress-bar"></div>
                            <div class="progress-shine"></div>
                        </div>
                        <div class="progress-text" id="progress-text">0%</div>
                    </div>
                    <div class="status-text" id="status-text">Initializing...</div>
                </div>
                
                <div class="loading-tips">
                    <p>🎲 Preparing your gaming experience...</p>
                </div>
            </div>
        `,this.addLoadingStyles(),this.progressBar=this.container.querySelector("#progress-bar"),this.progressText=this.container.querySelector("#progress-text"),this.statusText=this.container.querySelector("#status-text")}addLoadingStyles(){const e=document.createElement("style");e.textContent=`
            #asset-loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #3C1366 50%, #8128E7 50%, #3C1366 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: 'Open Sans', sans-serif;
                color: white;
                opacity: 1;
                transition: opacity 0.5s ease-out;
            }

            .loading-content {
                text-align: center;
                max-width: 500px;
                padding: 40px;
            }

            .loading-logo {
                margin-bottom: 30px;
            }

            .slot-spinner {
                display: flex;
                justify-content: center;
                gap: 10px;
                font-size: 3em;
                margin-bottom: 20px;
            }

            .spinner-reel {
                animation: spinReel 2s linear infinite;
                display: inline-block;
            }

            .spinner-reel:nth-child(2) {
                animation-delay: 0.3s;
            }

            .spinner-reel:nth-child(3) {
                animation-delay: 0.6s;
            }

            @keyframes spinReel {
                0% { transform: rotateY(0deg); }
                100% { transform: rotateY(360deg); }
            }

            .loading-title {
                font-family: 'Value Serif', serif;
                font-size: 2.5em;
                font-weight: 700;
                margin: 0 0 10px 0;
                color: #FFD700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                letter-spacing: 2px;
            }

            .loading-subtitle {
                font-family: 'Value Serif', serif;
                font-size: 1.5em;
                font-weight: 600;
                margin: 0 0 40px 0;
                color: #00FFFF;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                letter-spacing: 1px;
            }

            .loading-progress {
                margin: 30px 0;
            }

            .progress-container {
                position: relative;
                margin-bottom: 15px;
            }

            .progress-bar-bg {
                width: 100%;
                height: 25px;
                background: rgba(0,0,0,0.3);
                border-radius: 15px;
                border: 2px solid #F49E06;
                overflow: hidden;
                position: relative;
                box-shadow: 
                    inset 0 2px 4px rgba(0,0,0,0.3),
                    0 2px 8px rgba(244,158,6,0.3);
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, 
                    #FFD700 0%, 
                    #F49E06 50%, 
                    #FFD700 100%
                );
                border-radius: 13px;
                width: 0%;
                transition: width 0.3s ease-out;
                position: relative;
                box-shadow: 
                    0 0 15px rgba(255,215,0,0.6),
                    inset 0 2px 4px rgba(255,255,255,0.3);
            }

            .progress-shine {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255,255,255,0.4), 
                    transparent
                );
                animation: progressShine 2s ease-in-out infinite;
            }

            @keyframes progressShine {
                0% { left: -100%; }
                50% { left: 100%; }
                100% { left: 100%; }
            }

            .progress-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-weight: bold;
                font-size: 0.9em;
                color: #2c3e50;
                text-shadow: 1px 1px 0px rgba(255,255,255,0.5);
                z-index: 10;
            }

            .status-text {
                font-size: 1.1em;
                color: #8EE8D8;
                font-weight: 600;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                margin-bottom: 20px;
            }

            .loading-tips {
                margin-top: 30px;
                opacity: 0.8;
            }

            .loading-tips p {
                font-size: 1em;
                color: #D4ADFF;
                margin: 5px 0;
                font-style: italic;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .loading-content {
                    padding: 20px;
                    max-width: 90%;
                }
                
                .loading-title {
                    font-size: 2em;
                }
                
                .loading-subtitle {
                    font-size: 1.2em;
                }
                
                .slot-spinner {
                    font-size: 2.5em;
                }
            }
        `,document.head.appendChild(e)}startLoadingAnimation(){let e=0;this.loadingAnimation=setInterval(()=>{if(this.statusText&&this.statusText.textContent.includes("Loading assets")){e=(e+1)%4;const t=".".repeat(e),n=this.statusText.textContent.split("...")[0].split("..")[0].split(".")[0];this.statusText.textContent=n+t}},500)}}const z=new D;class H{constructor(){this.initializeDefaults()}initializeDefaults(){if(!this.getPrizes().length){const e=[{id:1,name:"Grand Prize",image:x[0].path,quantity:50,chance:1},{id:2,name:"2nd Prize",image:x[1].path,quantity:10,chance:2},{id:3,name:"3rd Prize",image:x[2].path,quantity:5,chance:3},{id:4,name:"Consolation",image:$.sadCat.path,quantity:999,chance:94}];this.setPrizes(e)}}getPrizes(){const e=localStorage.getItem("prizes");return e?JSON.parse(e):[]}setPrizes(e){localStorage.setItem("prizes",JSON.stringify(e))}addPrize(e){const t=this.getPrizes();return e.id=Date.now(),t.push(e),this.setPrizes(t),e}updatePrize(e){const t=this.getPrizes(),n=t.findIndex(o=>o.id===e.id);return n!==-1?(t[n]=e,this.setPrizes(t),!0):!1}deletePrize(e){const t=this.getPrizes(),n=t.filter(o=>o.id!==e);return this.setPrizes(n),n.length!==t.length}getLogs(){const e=localStorage.getItem("spinLogs");return e?JSON.parse(e):[]}addLog(e){const t=this.getLogs();e.timestamp=new Date().toISOString(),t.unshift(e),t.length>100&&t.splice(100),localStorage.setItem("spinLogs",JSON.stringify(t))}clearLogs(){localStorage.removeItem("spinLogs")}resetAll(){localStorage.clear(),this.initializeDefaults()}}window.storageManager=new H;class F{constructor(){this.sounds={},this.audioContext=null,this.isMuted=!1,this.volume=.5,this.performanceMode="high-quality",this.audioQueue=[],this.isPlayingCustomSound=!1,this.initializeSounds(),this.createVolumeControl(),this.setupPerformanceModeListener()}setupPerformanceModeListener(){const e=()=>window.performanceManager&&window.performanceManager.addListener?(console.log("🔗 Registering performance mode listener for sound manager"),window.performanceManager.addListener((t,n)=>{console.log(`🔊 Sound manager received mode change: ${t}`),this.onPerformanceModeChange(t,n)}),!0):!1;e()||(console.log("⏳ Performance manager not ready, will retry..."),setTimeout(()=>{e()||setTimeout(()=>{e()||setTimeout(()=>{e()||console.warn("❌ Could not register performance mode listener after multiple attempts")},3e3)},1e3)},100))}onPerformanceModeChange(e,t){this.performanceMode=e,console.log(`🔊 Sound system switched to: ${e}`),e==="performance"?this.enablePerformanceOptimizations():this.disablePerformanceOptimizations(),this.updatePerformanceModeLabel()}enablePerformanceOptimizations(){this.stopBackgroundAmbience(),this.audioQueue=[],this.preloadEssentialSounds()}disablePerformanceOptimizations(){}preloadEssentialSounds(){const e=["congratulations","miaw","happy"];Object.keys(this.customSounds).forEach(t=>{if(!e.includes(t)){const n=this.customSounds[t];n&&(n.pause(),n.currentTime=0)}})}shouldPlaySound(e){return!(this.isMuted||this.performanceMode==="performance"&&(e==="background"||e==="ambience"||this.isPlayingCustomSound&&(e==="congratulations"||e==="miaw"||e==="happy")))}initializeSounds(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.warn("Web Audio API not supported:",e)}this.loadCustomSounds(),this.createProgrammaticSounds()}loadCustomSounds(){this.customSounds={};const e=new Audio("./assets/sounds/Congratulations.mp3");e.volume=this.volume,this.performanceMode==="performance"?e.preload="metadata":e.preload="auto",this.customSounds.congratulations=e;const t=new Audio("./assets/sounds/miaw.mp3");t.volume=this.volume,this.performanceMode==="performance"?t.preload="metadata":t.preload="auto",this.customSounds.miaw=t;const n=new Audio("./assets/sounds/Happy Happy Happy.mp3");n.volume=this.volume,this.performanceMode==="performance"?n.preload="metadata":n.preload="auto",this.customSounds.happy=n,e.addEventListener("error",()=>{console.warn("Could not load congratulations sound")}),t.addEventListener("error",()=>{console.warn("Could not load miaw sound")}),n.addEventListener("error",()=>{console.warn("Could not load happy happy happy sound")}),e.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),t.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),n.addEventListener("ended",()=>{this.isPlayingCustomSound=!1})}createProgrammaticSounds(){this.sounds={spin:()=>this.createSpinSound(),win:()=>this.createMelody([523,659,784,1047],.3),lose:()=>this.createTone(150,.8,"sine"),click:()=>this.createTone(800,.1,"square"),reelStop:()=>this.createTone(400,.2,"triangle"),jackpot:()=>this.createCelebrationSound(),background:()=>this.createAmbientSound()}}createSpinSound(){if(!this.audioContext||this.isMuted)return;const e=this.performanceMode==="performance"?1.5:2.5,t=this.performanceMode==="performance"?4:8,n=this.performanceMode==="performance"?200:300,o=this.audioContext.createOscillator(),a=this.audioContext.createGain(),i=this.audioContext.createBiquadFilter();o.connect(i),i.connect(a),a.connect(this.audioContext.destination),o.frequency.setValueAtTime(400,this.audioContext.currentTime),o.frequency.exponentialRampToValueAtTime(200,this.audioContext.currentTime+e),o.type="sawtooth",i.type="lowpass",i.frequency.setValueAtTime(1e3,this.audioContext.currentTime),i.frequency.exponentialRampToValueAtTime(300,this.audioContext.currentTime+e);const s=this.performanceMode==="performance"?.3:.4;a.gain.setValueAtTime(0,this.audioContext.currentTime),a.gain.linearRampToValueAtTime(this.volume*s,this.audioContext.currentTime+.1),a.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+e),o.start(this.audioContext.currentTime),o.stop(this.audioContext.currentTime+e);for(let r=0;r<t;r++)setTimeout(()=>{this.createTone(600+Math.random()*200,.05,"square")},r*n)}createTone(e,t,n="sine"){if(!this.audioContext||this.isMuted)return;const o=this.audioContext.createOscillator(),a=this.audioContext.createGain();o.connect(a),a.connect(this.audioContext.destination),o.frequency.setValueAtTime(e,this.audioContext.currentTime),o.type=n,a.gain.setValueAtTime(0,this.audioContext.currentTime),a.gain.linearRampToValueAtTime(this.volume*.3,this.audioContext.currentTime+.01),a.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+t),o.start(this.audioContext.currentTime),o.stop(this.audioContext.currentTime+t)}createMelody(e,t){!this.audioContext||this.isMuted||e.forEach((n,o)=>{setTimeout(()=>{this.createTone(n,t,"sine")},o*t*200)})}createCelebrationSound(){if(!this.audioContext||this.isMuted)return;[261,329,392,523,659,784,1047,1319].forEach((t,n)=>{setTimeout(()=>{this.createTone(t,.4,"sine")},n*100)}),setTimeout(()=>{for(let t=0;t<10;t++)setTimeout(()=>{this.createTone(1e3+Math.random()*1e3,.1,"square")},t*50)},800)}createAmbientSound(){if(!this.audioContext||this.isMuted)return;if(this.performanceMode==="performance"){console.log("🔊 Ambient sound skipped in performance mode");return}const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.setValueAtTime(60,this.audioContext.currentTime),e.type="sine",t.gain.setValueAtTime(this.volume*.1,this.audioContext.currentTime),e.start(),setTimeout(()=>{t.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+1),e.stop(this.audioContext.currentTime+1)},5e3)}playSound(e){if(!this.shouldPlaySound(e)||!this.sounds[e]){this.isMuted?console.log(`Sound ${e} muted`):this.sounds[e]||console.warn(`Sound ${e} not found`);return}try{if(this.performanceMode==="performance"){if(e==="background"||e==="ambient")return;this.audioContext&&this.audioContext.state==="suspended"?this.audioContext.resume().then(()=>{this.sounds[e]()}).catch(t=>{console.warn("Failed to resume audio context:",t)}):this.sounds[e]()}else this.audioContext&&this.audioContext.state==="suspended"?this.audioContext.resume().then(()=>{this.sounds[e]()}).catch(t=>{console.warn("Failed to resume audio context:",t)}):this.sounds[e]()}catch(t){console.warn("Error playing sound:",t)}}mute(){this.isMuted=!0,this.updateVolumeButton()}unmute(){this.isMuted=!1,this.updateVolumeButton()}toggleMute(){this.isMuted=!this.isMuted,this.updateVolumeButton()}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.customSounds&&Object.values(this.customSounds).forEach(t=>{t&&(t.volume=this.volume)}),this.updateVolumeSlider()}createVolumeControl(){let e=document.querySelector(".bottom-controls");e||(e=document.createElement("div"),e.className="bottom-controls",document.body.appendChild(e),this.repositionControls(),window.addEventListener("resize",()=>this.repositionControls()),window.addEventListener("orientationchange",()=>{setTimeout(()=>this.repositionControls(),100)}));const t=document.createElement("div");t.className="sound-control",t.innerHTML=`
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
        `;const n=document.createElement("style");n.textContent=`
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

            .performance-button {
                background: rgba(52,152,219,0.9) !important;
                border: 2px solid #3498db !important;
                border-radius: 50% !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 1.5em !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                backdrop-filter: blur(5px) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-left: 10px !important;
                position: relative !important;
            }

            .performance-button:hover {
                background: rgba(52,152,219,0.2);
                transform: scale(1.1);
            }

            .performance-control {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-left: 10px;
            }

            .performance-label {
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 15px;
                font-size: 0.9em;
                font-weight: 500;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255,255,255,0.2);
                white-space: nowrap;
                transition: all 0.3s ease;
            }

            .performance-label.high-quality {
                background: rgba(39, 174, 96, 0.9);
                border-color: rgba(39, 174, 96, 0.5);
            }

            .performance-label.performance {
                background: rgba(231, 76, 60, 0.9);
                border-color: rgba(231, 76, 60, 0.5);
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

                .performance-button {
                    width: 45px;
                    height: 45px;
                    font-size: 1.3em;
                    margin-left: 8px;
                }

                .volume-slider {
                    width: 80px;
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

                .performance-button {
                    width: 40px;
                    height: 40px;
                    font-size: 1.2em;
                    margin-left: 6px;
                }

                .performance-control {
                    flex-direction: column;
                    gap: 5px;
                    margin-left: 6px;
                }

                .performance-label {
                    font-size: 0.8em;
                    padding: 4px 8px;
                    border-radius: 10px;
                }
            }
        `,document.head.appendChild(n);const o=document.createElement("button");o.className="admin-button",o.title="Admin Access",o.innerHTML="🤫",o.addEventListener("click",()=>{window.showAdminLogin&&window.showAdminLogin()});const a=document.createElement("button");a.className="performance-button",a.title="Performance Settings",a.innerHTML="⚡";const i=document.createElement("span");i.className="performance-label",i.id="performance-mode-label";const s=document.createElement("div");s.className="performance-control",s.appendChild(a),s.appendChild(i),console.log("🔧 Creating performance button..."),a.addEventListener("click",()=>{console.log("🔧 Performance button clicked!"),console.log("🔍 Debug - modeSelectionModal available:",!!window.modeSelectionModal),(()=>{window.modeSelectionModal?(console.log("📋 Showing mode selection modal..."),window.modeSelectionModal.show().then(l=>{console.log(`✅ Modal resolved with mode: ${l}`),setTimeout(()=>{this.updatePerformanceModeLabel()},500)}).catch(l=>{console.error("❌ Modal promise rejected:",l)})):(console.warn("⏳ Modal not ready yet, waiting..."),setTimeout(()=>{window.modeSelectionModal?(console.log("📋 Modal now available, showing..."),window.modeSelectionModal.show().then(l=>{console.log(`✅ Modal resolved with mode: ${l}`),setTimeout(()=>{this.updatePerformanceModeLabel()},500)})):(console.error("❌ Mode selection modal still not found after waiting!"),alert("Performance settings not available yet. Please try again in a moment."))},100))})()}),e.appendChild(t),e.appendChild(o),e.appendChild(s),console.log("🔧 Performance button added to DOM"),this.updatePerformanceModeLabel(),setTimeout(()=>{this.updatePerformanceModeLabel()},1e3),setTimeout(()=>{this.updatePerformanceModeLabel()},3e3),document.getElementById("muteButton").addEventListener("click",()=>{this.toggleMute(),this.playSound("click")}),document.getElementById("volumeSlider").addEventListener("input",r=>{const l=parseInt(r.target.value)/100;this.setVolume(l),this.playSound("click")}),document.getElementById("testSoundButton").addEventListener("click",()=>{console.log("Testing spin sound..."),this.testSound("spin")})}repositionControls(){const e=document.querySelector(".bottom-controls"),t=document.querySelector(".header-logo");if(!e||!t)return;window.innerWidth>window.innerHeight?e.parentElement!==t&&t.appendChild(e):e.parentElement!==document.body&&document.body.appendChild(e)}updateVolumeButton(){const e=document.getElementById("muteButton");e&&(e.textContent=this.isMuted?"🔇":"🔊",e.classList.toggle("muted",this.isMuted))}updateVolumeSlider(){const e=document.getElementById("volumeSlider"),t=document.querySelector(".volume-label");e&&(e.value=this.volume*100),t&&(t.textContent=Math.round(this.volume*100)+"%")}onSpinStart(){this.playSound("spin")}onReelStop(){this.playSound("reelStop")}onCardFlip(){if(!this.isMuted&&this.audioContext){const e=this.audioContext.currentTime,t=this.audioContext.createOscillator(),n=this.audioContext.createGain();t.connect(n),n.connect(this.audioContext.destination),t.frequency.setValueAtTime(800,e),t.frequency.exponentialRampToValueAtTime(200,e+.1),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.15*this.volume,e+.02),n.gain.exponentialRampToValueAtTime(.01,e+.15),t.start(e),t.stop(e+.15)}}onDrumroll(){if(this.isMuted){console.log("🔇 Drumroll skipped: sound is muted");return}if(this.audioContext){this.audioContext.state==="suspended"&&this.audioContext.resume().then(()=>{console.log("🔊 Audio context resumed for drumroll")}),console.log("✨ Playing cute anticipation sound");const e=this.audioContext.currentTime,t=3.5,n=this.audioContext.createGain();n.connect(this.audioContext.destination),this.drumrollOscillators=[];const o=28;for(let s=0;s<o;s++){const r=s/o,l=e+r*t,m=this.audioContext.createOscillator();m.type="sine";const d=400,h=[0,2,4,5,7,9,11,12],u=h[s%h.length],p=Math.floor(s/h.length)*12,g=d*Math.pow(2,(u+p)/12);m.frequency.setValueAtTime(g,l),m.frequency.linearRampToValueAtTime(g*1.02,l+.05);const c=this.audioContext.createGain(),y=.15+r*.15;c.gain.setValueAtTime(0,l),c.gain.linearRampToValueAtTime(y*this.volume,l+.01),c.gain.exponentialRampToValueAtTime(.001,l+.12),m.connect(c),c.connect(n),m.start(l),m.stop(l+.12),this.drumrollOscillators.push(m)}const a=this.audioContext.createOscillator();a.type="triangle",a.frequency.setValueAtTime(300,e),a.frequency.linearRampToValueAtTime(500,e+t);const i=this.audioContext.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(.08*this.volume,e+.5),i.gain.linearRampToValueAtTime(.12*this.volume,e+t-.3),a.connect(i),i.connect(n),a.start(e),a.stop(e+t),this.drumrollOscillators.push(a),this.drumrollGain=n}else console.warn("⚠️ Audio context not available for drumroll")}stopDrumroll(){if(this.drumrollOscillators&&this.drumrollOscillators.length>0){console.log("🛑 Stopping anticipation sound");const e=this.audioContext.currentTime;this.drumrollOscillators.forEach(t=>{try{t.stop(e+.05)}catch{}}),this.drumrollGain&&(this.drumrollGain.gain.cancelScheduledValues(e),this.drumrollGain.gain.setValueAtTime(this.drumrollGain.gain.value,e),this.drumrollGain.gain.linearRampToValueAtTime(.001,e+.05)),this.drumrollOscillators=[],this.drumrollGain=null}}onWin(e=!1){e?this.playSound("jackpot"):this.playSound("win")}onLose(){this.playSound("lose")}onPopupWin(){this.playCustomSound("congratulations")}onPopupLose(){this.playCustomSound("miaw")}onPopupHappy(){this.playCustomSound("happy")}playCustomSound(e){if(!(this.isMuted||!this.customSounds||!this.customSounds[e])&&this.shouldPlaySound(e))try{const t=this.customSounds[e];if(this.performanceMode==="performance"?(this.isPlayingCustomSound=!0,setTimeout(()=>{this.isPlayingCustomSound=!1},500),t.preload="metadata"):(t.preload="auto",this.isPlayingCustomSound=!0,setTimeout(()=>{this.isPlayingCustomSound=!1},2e3)),t.currentTime=0,t.volume=this.volume,this.performanceMode==="performance")t.play().catch(n=>{console.warn(`Could not play ${e} sound:`,n),this.isPlayingCustomSound=!1});else{const n=t.play();n!==void 0&&n.catch(o=>{console.warn(`Could not play ${e} sound:`,o),this.isPlayingCustomSound=!1})}}catch(t){console.warn(`Error playing custom sound ${e}:`,t),this.isPlayingCustomSound=!1}}stopCustomSounds(){if(this.customSounds)try{Object.values(this.customSounds).forEach(e=>{e&&!e.paused&&(e.pause(),e.currentTime=0)})}catch(e){console.warn("Error stopping custom sounds:",e)}}updatePerformanceModeLabel(){const e=document.getElementById("performance-mode-label");if(console.log("🏷️ Updating performance label, element found:",!!e),!e){console.warn("❌ Performance label element not found");return}let t="high-quality",n="🚀 High Quality";if(window.performanceManager&&window.performanceManager.getMode){const o=window.performanceManager.getMode();console.log("🔍 Performance manager mode:",o),o==="performance"?(t="performance",n="⚡ Performance"):o==="high-quality"&&(t="high-quality",n="🚀 High Quality")}else console.warn("❌ Performance manager not available for label update");e.textContent=n,e.className=`performance-label ${t}`,console.log(`✅ Performance label updated: ${n} (class: ${e.className})`)}onButtonClick(){this.playSound("click")}onBackgroundStart(){this.playSound("background")}testSound(e){console.log(`Testing sound: ${e}`),this.audioContext&&this.audioContext.state==="suspended"?(console.log("Audio context suspended, trying to resume..."),this.audioContext.resume().then(()=>{console.log("Audio context resumed"),this.playSound(e)})):this.playSound(e)}testAllSounds(){["click","spin","reelStop","win","lose","jackpot"].forEach((t,n)=>{setTimeout(()=>{console.log(`Testing ${t}...`),this.testSound(t)},n*1e3)})}}window.soundManager=new F;window.soundManager.loadCustomSounds();class N{constructor(){this.isSpinning=!1,this.reelHeight=null,this.idleTimelines=[],this.performanceMode="high-quality",this.setupPerformanceModeListener()}setupPerformanceModeListener(){if(window.performanceManager)console.log("🎬 Setting up performance mode listener immediately"),window.performanceManager.addListener((e,t)=>{this.onPerformanceModeChange(e,t)}),this.performanceMode=window.performanceManager.getMode();else{console.log("🎬 Performance manager not ready, setting up retry...");const e=setInterval(()=>{window.performanceManager&&(console.log("🎬 Performance manager found, setting up listener"),window.performanceManager.addListener((t,n)=>{this.onPerformanceModeChange(t,n)}),this.performanceMode=window.performanceManager.getMode(),clearInterval(e))},500)}}onPerformanceModeChange(e,t){this.performanceMode=e,console.log(`🎬 Animation system switched to: ${e}`),e==="performance"?this.enablePerformanceOptimizations():this.disablePerformanceOptimizations()}enablePerformanceOptimizations(){document.querySelectorAll(".reel, .reel-strip, .reel-item, .prize-popup, .popup-content").forEach(t=>{t.style.transform="translateZ(0)",t.style.willChange="transform",t.style.backfaceVisibility="hidden"})}disablePerformanceOptimizations(){document.querySelectorAll(".reel, .reel-strip, .reel-item, .prize-popup, .popup-content").forEach(t=>{t.style.transform="",t.style.willChange="",t.style.backfaceVisibility=""})}getAnimationSettings(){window.performanceManager&&(this.performanceMode=window.performanceManager.getMode());const e=this.performanceMode==="performance";return console.log(`🎬 Getting animation settings - Mode: ${this.performanceMode}, IsPerformanceMode: ${e}`),{spinDuration:e?.08:.12,spinEase:"none",stopDuration:e?.6:1,stopEase:"power2.out",popupScale:!0,popupDuration:e?.3:.4,popupEase:e?"back.out(1.2)":"back.out(1.7)",enableConfetti:!e,confettiAmount:7,confettiInterval:200,confettiMultiplier:2,enableIdleAnimations:!e,enableGPUAcceleration:e,reduceAnimationComplexity:e}}createReelItems(e,t=null){const n=[];for(let o=0;o<15;o++)e.forEach(a=>{n.push(this.createReelItem(a))});return n}createReelItem(e){const t=document.createElement("div");return t.className="reel-item",t.innerHTML=`
            <img src="${e.image}" alt="${e.name}" onerror="this.onerror=null; this.style.display='none';">
        `,this.reelHeight||(document.body.appendChild(t),this.reelHeight=t.offsetHeight,document.body.removeChild(t)),t}initializeCards(e){const t=document.querySelectorAll(".card");if(t.length===0){console.warn("No cards found in DOM");return}t.forEach((n,o)=>{n.dataset.position=o,n.classList.remove("flipped");const a=e[Math.floor(Math.random()*e.length)],i=n.querySelector(".card-prize-image");i&&(i.src=a.image,i.alt=a.name)}),this.startCardShuffle()}startCardShuffle(){if(this.stopCardShuffle(),document.querySelectorAll(".card").length!==3)return;this.shuffleTimeline=gsap.timeline({repeat:-1});const t=this.performanceMode==="performance"?.3:.4;let n=0;for(let o=0;o<50;o++){const a=.3+Math.random()*.7,i=[[0,1],[1,2],[0,2]],[s,r]=i[Math.floor(Math.random()*i.length)];n+=a,this.shuffleTimeline.call(()=>{this.swapCardPositions(s,r)},[],n),n+=t}}swapCardPositions(e,t){const n=document.querySelector(".cards-area");if(!n)return;const o=Array.from(n.querySelectorAll(".card")),a=o.find(d=>parseInt(d.dataset.position)===e),i=o.find(d=>parseInt(d.dataset.position)===t);if(!a||!i)return;const s={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"},r=this.performanceMode==="performance"?.3:.4,l=a.getBoundingClientRect().left-n.getBoundingClientRect().left,m=i.getBoundingClientRect().left-n.getBoundingClientRect().left;gsap.to(a,{left:m,top:-30,duration:r/2,ease:"power1.inOut",onComplete:()=>{gsap.to(a,{top:0,duration:r/2,ease:"power1.inOut",onComplete:()=>{a.dataset.position=t,a.style.left=s[t],a.style.top="0"}})}}),gsap.to(i,{left:l,top:-30,duration:r/2,ease:"power1.inOut",onComplete:()=>{gsap.to(i,{top:0,duration:r/2,ease:"power1.inOut",onComplete:()=>{i.dataset.position=e,i.style.left=s[e],i.style.top="0"}})}})}stopCardShuffle(){this.shuffleTimeline&&(this.shuffleTimeline.kill(),this.shuffleTimeline=null);const e=document.querySelectorAll(".card"),t={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"};e.forEach(n=>{gsap.killTweensOf(n);const o=parseInt(n.dataset.position);n.style.left=t[o],n.style.top="0"})}async flipCards(e){if(this.isSpinning)return;this.isSpinning=!0,this.stopCardShuffle();const t=document.getElementById("spinButton");t.disabled=!0,t.querySelector(".button-text").textContent="FLIPPING...";const n=Array.from(document.querySelectorAll(".card")).sort((i,s)=>parseInt(i.dataset.position)-parseInt(s.dataset.position));n.forEach((i,s)=>{const r=i.querySelector(".card-prize-image");r&&e[s]&&(r.src=e[s].image,r.alt=e[s].name)}),window.soundManager&&typeof window.soundManager.onDrumroll=="function"&&window.soundManager.onDrumroll();const o=this.performanceMode==="performance"?.4:.6,a=this.performanceMode==="performance"?.3:.5;for(let i=0;i<n.length;i++){const s=i===0?1e3:0;await new Promise(r=>{setTimeout(()=>{n[i].classList.add("flipped"),window.soundManager&&window.soundManager.onCardFlip(),setTimeout(r,o*1e3)},i*a*1e3+s)})}return await new Promise(i=>setTimeout(i,300)),n}populateReels(e){if(document.querySelectorAll(".card").length>0){this.initializeCards(e);return}document.querySelectorAll(".reel").forEach((o,a)=>{const i=o.querySelector(".reel-strip");i.innerHTML="",this.createReelItems(e).forEach(r=>i.appendChild(r)),gsap.set(i,{y:-this.reelHeight})}),this.startIdleAnimation()}startIdleAnimation(){this.stopIdleAnimation();const e=Array.from(document.querySelectorAll(".reel .reel-strip"));this.idleTimelines=[];const t=[6,7.5,9];e.forEach((n,o)=>{const a=gsap.timeline({repeat:-1}),s=gsap.getProperty(n,"y")-this.reelHeight*10;a.to(n,{y:s,duration:t[o%t.length],ease:"linear"}),this.idleTimelines.push(a)})}stopIdleAnimation(){this.idleTimelines&&this.idleTimelines.length&&this.idleTimelines.forEach(e=>e.kill()),this.idleTimelines=[]}async spinReels(e,t,n){const o=document.querySelectorAll(".card");if(o.length>0){await this.flipCards(n),this.showPrizePopup(e);const c=document.getElementById("spinButton");c.disabled=!1,c.querySelector(".button-text").textContent="FLIP!",this.isSpinning=!1;const y=document.getElementById("closePopup"),w=()=>{setTimeout(()=>{o.forEach(E=>E.classList.remove("flipped")),this.initializeCards(t)},300),y.removeEventListener("click",w)};y.addEventListener("click",w);return}if(this.isSpinning)return;this.isSpinning=!0,this.stopIdleAnimation(),window.soundManager&&window.soundManager.onSpinStart();const a=Array.from(document.querySelectorAll(".reel .reel-strip")),i=document.getElementById("spinButton");if(i.disabled=!0,i.querySelector(".button-text").textContent="SPINNING...",!this.reelHeight){const c=this.createReelItem(t[0]);document.body.appendChild(c),this.reelHeight=c.offsetHeight,document.body.removeChild(c)}const s=30,r=10;a.forEach((c,y)=>{c.innerHTML="";for(let S=0;S<s;S++){const P=t[Math.floor(Math.random()*t.length)];c.appendChild(this.createReelItem(P))}c.appendChild(this.createReelItem(n[y]));for(let S=0;S<r;S++){const P=t[Math.floor(Math.random()*t.length)];c.appendChild(this.createReelItem(P))}const w=Math.floor(c.parentNode.offsetHeight/this.reelHeight),E=this.reelHeight*Math.floor(w/2)-30;gsap.set(c,{y:-(s*this.reelHeight-E)})});const l=a.map((c,y)=>{const w=s,E=Math.floor(c.parentNode.offsetHeight/this.reelHeight),S=this.reelHeight*Math.floor(E/2)-30;return-(w*this.reelHeight-S)}),m=this.getAnimationSettings(),d=m.spinDuration,h=this.performanceMode==="performance"?10:15,u=this.performanceMode==="performance"?1:1.5,p=this.reelHeight*(this.performanceMode==="performance"?6:10),g=a.map((c,y)=>new Promise(w=>{const E=gsap.timeline({repeat:-1});E.to(c,{y:`-=${p}`,duration:d,ease:m.spinEase}),setTimeout(()=>{E.kill(),gsap.to(c,{y:l[y],duration:m.stopDuration,ease:m.stopEase,onComplete:()=>{window.soundManager&&window.soundManager.onReelStop(),w()}})},y*u*1e3+h*d*1e3)}));for(let c=0;c<g.length;c++)await g[c];setTimeout(()=>{this.showPrizePopup(e)},100),i.disabled=!1,i.querySelector(".button-text").textContent="SPIN!",this.isSpinning=!1,document.getElementById("closePopup").addEventListener("click",()=>{setTimeout(()=>{this.populateReels(t)},400)},{once:!0})}calculateTargetPositions(e,t){const n=[],o=t.length;for(let a=0;a<3;a++){let i=t.findIndex(d=>d.id===e.id);i===-1&&(i=0);const r=(7+Math.floor(Math.random()*2))*o+i,l=this.reelHeight,m=-(r*this.reelHeight-l);n.push(m)}return n}animateReel(e,t,n){return new Promise(o=>{const a=gsap.timeline();a.to(e,{y:t-this.reelHeight*10,duration:n*.7,ease:"power2.in"}),a.to(e,{y:t,duration:n*.3,ease:"power3.out",onComplete:()=>{o()}})})}determinePrizeType(e,t){if(e.isDefault)return"consolation";const n=t.filter(o=>!o.isDefault);return n.sort((o,a)=>o.chance-a.chance),n.length>0&&e.id===n[0].id?"grandPrize":"mediumPrize"}showPrizePopup(e){window.soundManager&&typeof window.soundManager.stopDrumroll=="function"&&window.soundManager.stopDrumroll();const t=document.getElementById("prizePopup"),n=document.getElementById("wonPrizeImage"),o=document.getElementById("wonPrizeName"),a=document.getElementById("prizePopupTitle"),i=t.querySelector(".prize-shield"),s=window.storageManager?window.storageManager.getPrizes():[],r=this.determinePrizeType(e,s);if(r==="consolation")n.style.display="none",o.textContent=e.name,a&&(a.textContent="Better luck next time!"),i&&(i.style.width="",i.style.height="",i.style.display="",i.style.justifyContent="",i.style.alignItems="",i.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`);else{n.style.display="";const m=new Image;m.onload=()=>{n.src=e.image},m.src=e.image,o.textContent=`You won ${e.name}!`}gsap.set(t,{force3D:!0}),gsap.set(t.querySelector(".popup-content"),{force3D:!0}),r==="consolation"?(a&&(a.textContent="Better luck next time!"),i&&(i.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupLose()},100)):r==="grandPrize"?(i&&(i.innerHTML=`<img src="/assets/images/dancing-cat.gif" alt="Dancing Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/dancing-cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupWin()},100)):r==="mediumPrize"&&(a&&(a.textContent="Congratulations!"),i&&(i.innerHTML=`<img src="/assets/images/Happy cat.gif" alt="Happy Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/Happy cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupHappy()},100)),t.classList.remove("hidden");const l=this.getAnimationSettings();l.popupScale?gsap.fromTo(t.querySelector(".popup-content"),{scale:0,rotation:r==="consolation"?10:-10,opacity:0},{scale:1,rotation:0,opacity:1,duration:l.popupDuration,ease:l.popupEase,force3D:!0,onComplete:()=>{r==="consolation"&&this.performanceMode==="high-quality"&&gsap.to(t.querySelector(".popup-content"),{scale:1.02,duration:.3,ease:"power2.inOut",yoyo:!0,repeat:1,force3D:!0})}}):gsap.fromTo(t.querySelector(".popup-content"),{opacity:0},{opacity:1,duration:l.popupDuration,ease:l.popupEase,force3D:!0}),r!=="consolation"&&l.enableConfetti?(console.log(`🎊 Triggering confetti - Prize Type: ${r}, Mode: ${this.performanceMode}, EnableConfetti: ${l.enableConfetti}`),setTimeout(()=>{this.triggerConfetti()},200)):console.log(`🚫 Confetti skipped - Prize Type: ${r}, Mode: ${this.performanceMode}, EnableConfetti: ${l.enableConfetti}`)}triggerConfetti(){const e=this.getAnimationSettings();console.log(`🎊 triggerConfetti() called - Mode: ${this.performanceMode}, EnableConfetti: ${e.enableConfetti}`);const t=e.enableConfetti?1500:0,n=Date.now()+t,o={startVelocity:45,spread:420,ticks:90,zIndex:2e3};if(!e.enableConfetti){console.log("⚡ Confetti disabled in performance mode - RETURNING EARLY");return}console.log("🎊 Confetti enabled - proceeding with animation");const a=setInterval(function(){const i=n-Date.now();if(i<=0)return clearInterval(a);const s=e.confettiAmount*(i/t),r=e.confettiMultiplier||1;confetti(Object.assign({},o,{particleCount:s*r,origin:{x:.35,y:.35}})),confetti(Object.assign({},o,{particleCount:s*r,origin:{x:.65,y:.35}})),confetti(Object.assign({},o,{particleCount:s,origin:{x:.35,y:.55}})),confetti(Object.assign({},o,{particleCount:s,origin:{x:.65,y:.55}}))},e.confettiInterval||150)}closePrizePopup(){const e=document.getElementById("prizePopup");window.soundManager&&window.soundManager.stopCustomSounds(),gsap.set(e.querySelector(".popup-content"),{force3D:!0}),gsap.to(e.querySelector(".popup-content"),{scale:0,rotation:10,opacity:0,duration:.25,ease:"back.in(1.4)",force3D:!0,onComplete:()=>{e.classList.add("hidden"),window.slotMachine&&window.slotMachine.updatePrizeDisplay&&window.slotMachine.updatePrizeDisplay()}})}animatePrizeShowcase(){const e=document.querySelectorAll(".prize-item");gsap.fromTo(e,{y:-50,opacity:0},{y:0,opacity:1,duration:.6,stagger:.1,ease:"back.out(1.7)"})}initializeButtonEffects(){const e=document.getElementById("spinButton");e.addEventListener("mouseenter",()=>{e.disabled||gsap.to(e,{scale:1.05,duration:.2})}),e.addEventListener("mouseleave",()=>{e.disabled||gsap.to(e,{scale:1,duration:.2})})}}window.animationManager=new N;function I(f,e,t=0,n=!1,o=null,a=null){const i=document.getElementById(f);if(!i)return null;const s=n?`inline-winChance-${o}`:"winChance",r=`${s}-slider`,l=`${s}-label`,m=document.createElement("div");m.className="win-chance-slider-container",m.innerHTML=`
        <div class="slider-row">
            <span id="${l}" class="chance-value">${t}%</span>
        </div>
        <div class="slider-controls">
            <input type="range" 
                   id="${r}" 
                   class="win-chance-slider" 
                   min="0" 
                   max="100" 
                   step="0.1" 
                   value="${t}"
                   title="Adjust win chance">
            <div class="chance-marks">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>
        </div>
    `,i.appendChild(m);const d=document.getElementById(r),h=document.getElementById(l),u=document.getElementById(e),p=c=>{const y=parseFloat(c),w=y%1===0?y.toString():y.toFixed(1);h.textContent=`${w}%`,u&&(u.value=y,u.dispatchEvent(new Event("input",{bubbles:!0}))),a&&typeof a=="function"&&a(y)},g=c=>{const y=Math.max(0,Math.min(100,parseFloat(c)||0)),w=y%1===0?y.toString():y.toFixed(1);d.value=y,h.textContent=`${w}%`,a&&typeof a=="function"&&a(y)};return d.addEventListener("input",c=>{p(c.target.value)}),u&&(u.addEventListener("input",c=>{g(c.target.value)}),u.addEventListener("blur",c=>{g(c.target.value)})),{slider:d,label:h,setValue:c=>{g(c)},getValue:()=>parseFloat(d.value),destroy:()=>{m.remove()}}}function T(){if(document.getElementById("win-chance-slider-styles"))return;const f=document.createElement("style");f.id="win-chance-slider-styles",f.textContent=`
        .win-chance-slider-container {
            margin: 15px 0;
            padding: 15px;
            background: rgba(52, 73, 94, 0.8);
            border-radius: 8px;
            border: 1px solid #34495e;
        }

        .slider-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .slider-label {
            font-weight: bold;
            color: #ecf0f1;
            font-size: 14px;
        }

        .chance-value {
            font-weight: bold;
            color: #3498db;
            font-size: 16px;
            min-width: 50px;
            text-align: right;
        }

        .slider-controls {
            position: relative;
        }

        .win-chance-slider {
            width: 100%;
            height: 8px;
            border-radius: 5px;
            background: linear-gradient(to right, #e74c3c 0%, #f39c12 25%, #f1c40f 50%, #27ae60 75%, #2ecc71 100%);
            outline: none;
            -webkit-appearance: none;
            cursor: pointer;
            margin-bottom: 10px;
        }

        .win-chance-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3498db;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }

        .win-chance-slider::-webkit-slider-thumb:hover {
            background: #2980b9;
            transform: scale(1.1);
        }

        .win-chance-slider::-webkit-slider-thumb:active {
            transform: scale(1.2);
        }

        .win-chance-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3498db;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }

        .win-chance-slider::-moz-range-thumb:hover {
            background: #2980b9;
            transform: scale(1.1);
        }

        .win-chance-slider::-moz-range-thumb:active {
            transform: scale(1.2);
        }

        .chance-marks {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #95a5a6;
            margin-top: 5px;
        }

        .chance-marks span {
            font-size: 10px;
            color: #bdc3c7;
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
            .win-chance-slider-container {
                margin: 10px 0;
                padding: 12px;
            }

            .win-chance-slider {
                height: 10px;
                margin-bottom: 8px;
            }

            .win-chance-slider::-webkit-slider-thumb {
                width: 24px;
                height: 24px;
            }

            .win-chance-slider::-moz-range-thumb {
                width: 24px;
                height: 24px;
            }

            .slider-label {
                font-size: 13px;
            }

            .chance-value {
                font-size: 15px;
            }

            .chance-marks {
                font-size: 9px;
            }
        }

        /* Touch device optimization */
        @media (pointer: coarse) {
            .win-chance-slider {
                height: 12px;
            }

            .win-chance-slider::-webkit-slider-thumb {
                width: 28px;
                height: 28px;
            }

            .win-chance-slider::-moz-range-thumb {
                width: 28px;
                height: 28px;
            }
        }
    `,document.head.appendChild(f)}const b=()=>window.storageManager;class R{constructor(){this.currentEditingPrize=null,this.initializeEventListeners()}initializeEventListeners(){document.querySelectorAll(".tab-button").forEach(e=>{e.addEventListener("click",()=>this.switchTab(e.dataset.tab))}),document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("prizeName");e&&(e.removeAttribute("pattern"),e.style.userSelect="text",e.style.pointerEvents="auto",e.addEventListener("keydown",t=>{t.keyCode===32&&t.stopPropagation()}))}),document.getElementById("closeAdmin").addEventListener("click",()=>{if(b().getPrizes().reduce((n,o)=>n+o.chance,0)!==100){alert("Total win chance must be exactly 100% before closing the admin panel.");return}this.hide()}),document.getElementById("addPrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.showPrizeEditor()}),document.getElementById("savePrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.savePrize()}),document.getElementById("cancelEdit").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.hidePrizeEditor()}),document.getElementById("resetGame").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),confirm("Are you sure you want to reset the game and clear all logs?")&&this.resetGame()}),document.addEventListener("click",e=>{e.target.classList.contains("quantity-btn")&&(window.soundManager&&window.soundManager.onButtonClick(),this.handleQuantityChange(e.target))})}show(){document.getElementById("adminPanel").classList.remove("hidden"),this.refreshContent(),setTimeout(()=>{const e=document.getElementById("prizeName");e&&(e.removeAttribute("pattern"),e.style.userSelect="text",e.style.pointerEvents="auto",e.addEventListener("keydown",t=>{t.keyCode===32&&t.stopPropagation()}),console.log("Prize name input initialized for spaces"))},100)}hide(){document.getElementById("adminPanel").classList.add("hidden"),this.hidePrizeEditor(),this.refreshSlotMachine()}switchTab(e){switch(document.querySelectorAll(".tab-button").forEach(t=>{t.classList.remove("active")}),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll(".tab-content").forEach(t=>{t.classList.remove("active")}),document.getElementById(`${e}Tab`).classList.add("active"),e){case"prizes":this.refreshPrizesList();break;case"settings":this.refreshSettings();break;case"logs":this.refreshLogs();break}}refreshContent(){this.refreshPrizesList(),this.refreshSettings(),this.refreshLogs()}refreshPrizesList(){const e=document.getElementById("prizesList"),t=b().getPrizes();e.innerHTML="",t.forEach(n=>{const o=document.createElement("div");o.className="prize-card",o.setAttribute("data-prize-id",n.id),o.innerHTML=`
                <img src="${n.image}" alt="${n.name}" onerror="this.onerror=null; this.style.display='none';">
                <div class="prize-info">
                    <h4>${n.name}</h4>
                    <p>Quantity: ${n.quantity}</p>
                    <p>Win Chance: ${n.chance}%</p>
                </div>
                <div class="prize-actions">
                    <button onclick="adminPanel.editPrize(${n.id})">Edit</button>
                    <button class="delete" onclick="adminPanel.deletePrize(${n.id})">Delete</button>
                </div>
            `,e.appendChild(o)})}showPrizeEditor(e=null){const t=document.getElementById("prizeEditor"),n=document.getElementById("editorTitle");function o(u,p){const g=document.getElementById(u);if(g){let c=document.getElementById(u+"-label");c||(c=document.createElement("label"),c.id=u+"-label",c.htmlFor=u,c.textContent=p,c.style.display="block",c.style.fontWeight="bold",c.style.margin="8px 0 2px 0",g.parentNode.insertBefore(c,g))}}o("prizeName","Prize Name"),o("prizeImage","Prize Image URL"),o("prizeQuantity","Quantity"),o("prizeChance","Win Chance (%)");const a=document.getElementById("prizeQuantity");let i=document.getElementById("unlimited-checkbox-container");if(!i){i=document.createElement("div"),i.id="unlimited-checkbox-container",i.style.display="block",i.style.marginTop="12px",i.style.marginBottom="12px",i.style.padding="10px",i.style.backgroundColor="#fff3cd",i.style.borderRadius="4px",i.style.border="1px solid #ffc107",a.nextSibling?a.parentNode.insertBefore(i,a.nextSibling):a.parentNode.appendChild(i);const u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.marginBottom="4px";const p=document.createElement("input");p.type="checkbox",p.id="unlimitedConsolation",p.style.marginRight="8px",p.style.width="18px",p.style.height="18px",p.style.cursor="pointer",p.style.flexShrink="0";const g=document.createElement("label");g.id="unlimitedConsolation-label",g.htmlFor="unlimitedConsolation",g.textContent="Unlimited consolation (quantity never decreases)",g.style.cursor="pointer",g.style.userSelect="none",g.style.margin="0",g.style.fontWeight="bold",g.style.color="#000",u.appendChild(p),u.appendChild(g);const c=document.createElement("div");c.id="unlimited-hint",c.style.fontSize="12px",c.style.color="#856404",c.style.marginTop="4px",c.textContent="Note: Only applies to the prize with the highest win chance (consolation prize)",i.appendChild(u),i.appendChild(c)}const s=b().getPrizes();let r=!1;if(e){const u=[...s].sort((p,g)=>g.chance-p.chance);r=u.length>0&&u[0].id===e.id,console.log("Editing prize:",e.name,"Is highest chance:",r,"Chance:",e.chance)}else r=!1,console.log("Adding new prize, checkbox disabled by default");const l=document.getElementById("unlimitedConsolation"),m=document.getElementById("unlimited-hint");if(l&&(l.disabled=!r,r?(m.textContent="✓ This is the consolation prize (highest win chance)",m.style.color="#155724",i.style.backgroundColor="#d4edda",i.style.borderColor="#28a745"):(m.textContent="ⓘ This option only applies to the prize with the highest win chance",m.style.color="#856404",i.style.backgroundColor="#fff3cd",i.style.borderColor="#ffc107")),i.style.display="block",T(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),p=document.createElement("div");p.id="winChanceSliderContainer",u.parentNode.insertBefore(p,u.nextSibling),this.winChanceSlider=I("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(this.createImageSourceSelector(),T(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),p=document.createElement("div");p.id="winChanceSliderContainer",u.parentNode.insertBefore(p,u.nextSibling),this.winChanceSlider=I("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(e){this.currentEditingPrize=e,n.textContent="Edit Prize",document.getElementById("prizeName").value=e.name,document.getElementById("prizeImage").value=e.image||"",document.getElementById("prizeQuantity").value=e.quantity,document.getElementById("prizeChance").value=e.chance;const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!!e.unlimitedConsolation),this.updateImageSourceSelector(e.image)}else{this.currentEditingPrize=null,n.textContent="Add New Prize",document.getElementById("prizeName").value="",document.getElementById("prizeImage").value="",document.getElementById("prizeQuantity").value="",document.getElementById("prizeChance").value="";const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!1),this.updateImageSourceSelector("")}let d=document.getElementById("chanceMessage");d||(d=document.createElement("div"),d.id="chanceMessage",d.style.margin="10px 0",d.style.fontWeight="bold",d.style.color="#e74c3c",t.appendChild(d)),e?(this.winChanceSlider&&this.winChanceSlider.setValue(e.chance),this.updateChanceMessage()):this.winChanceSlider&&this.winChanceSlider.setValue(0),this.updateChanceMessage();const h=document.getElementById("prizeChance");h.hasAttribute("data-listener-added")||(h.addEventListener("input",()=>{this.updateChanceMessage()}),h.setAttribute("data-listener-added","true")),this.updateDefaultPrizeLabel(),t.classList.remove("hidden")}updateDefaultPrizeLabel(){const e=b().getPrizes(),t=document.getElementById("prizeEditor");let n=document.getElementById("defaultPrizeLabel");if(n||(n=document.createElement("div"),n.id="defaultPrizeLabel",n.style.margin="10px 0",n.style.fontWeight="bold",n.style.color="#FFD700",n.style.fontSize="1.1em",t.appendChild(n)),e.length===0)n.textContent="No prizes yet - add your first prize!";else{const o=e.reduce((a,i)=>i.chance>a.chance?i:a);n.textContent=`Default Prize: ${o.name} (${o.chance}%)`}}updateChanceMessage(){const e=document.getElementById("prizeChance"),t=parseFloat(e.value)||0,n=b().getPrizes();let o=0;this.currentEditingPrize?o=n.reduce((i,s)=>i+(s.id===this.currentEditingPrize.id?t:s.chance),0):o=n.reduce((i,s)=>i+s.chance,0)+t;let a=document.getElementById("chanceMessage");if(!a){const i=document.getElementById("prizeEditor");a=document.createElement("div"),a.id="chanceMessage",a.style.margin="10px 0",a.style.fontWeight="bold",a.style.color="#e74c3c",i.appendChild(a)}if(o<100)a.textContent=`Total win chance: ${o.toFixed(1)}%. ${(100-o).toFixed(1)}% left to allocate.`,a.style.color="#e67e22",this.hideAutoAdjustWarning();else if(o>100){const i=o-100;a.textContent=`Total win chance: ${o.toFixed(1)}%. Exceeded by ${i.toFixed(1)}%.`,a.style.color="#e74c3c",this.showAutoAdjustWarning(i)}else a.textContent="Total win chance: 100%. Ready to save!",a.style.color="#27ae60",this.hideAutoAdjustWarning()}showAutoAdjustWarning(e){let t=document.getElementById("autoAdjustWarning");if(!t){t=document.createElement("div"),t.id="autoAdjustWarning",t.style.cssText=`
                margin: 15px 0;
                padding: 15px;
                background-color: rgba(255, 193, 7, 0.1);
                border: 2px solid #ffc107;
                border-radius: 8px;
                color: #ff8f00;
                font-weight: bold;
                font-size: 0.95em;
                display: block;
                position: relative;
                z-index: 1000;
            `;const i=document.getElementById("chanceMessage");i&&i.parentNode?i.parentNode.insertBefore(t,i.nextSibling):document.getElementById("prizeEditor").appendChild(t)}const n=b().getPrizes();let o=null,a=0;for(const i of n)this.currentEditingPrize&&i.id===this.currentEditingPrize.id||i.chance>a&&(a=i.chance,o=i);if(o){const i=Math.max(.1,a-e);t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${e.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${o.name}"</strong> will be reduced from ${a}% to ${i.toFixed(1)}%
            `}else t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;t.style.display="block",t.style.visibility="visible",t.style.opacity="1"}hideAutoAdjustWarning(){const e=document.getElementById("autoAdjustWarning");e&&(e.style.display="none")}hidePrizeEditor(){document.getElementById("prizeEditor").classList.add("hidden"),this.currentEditingPrize=null}createImageSourceSelector(){if(document.getElementById("imageSourceSelector"))return;const e=document.getElementById("prizeImage"),t=e.parentNode,n=document.createElement("div");n.id="imageSourceSelector",n.className="image-source-selector";const o=document.createElement("label");o.textContent="Image Source",o.style.display="block",o.style.fontWeight="bold",o.style.margin="8px 0 5px 0";const a=document.createElement("div");a.className="image-source-option",a.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="url" checked>
                <span>Use URL</span>
            </label>
        `;const i=document.createElement("div");i.className="image-source-option",i.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="asset">
                <span>Choose from Assets</span>
            </label>
        `;const s=document.createElement("div");s.id="assetGallery",s.className="asset-gallery hidden",x.filter(m=>m.path&&m.path.includes("/prizes/")).forEach(m=>{const d=document.createElement("div");d.className="asset-item",d.dataset.assetId=m.id,d.dataset.assetPath=m.path;const h=M(m.filename);d.innerHTML=`
                <img src="${h}" alt="${m.name}" title="${m.description}" onerror="this.style.display='none';">
                <span>${m.name}</span>
            `,d.addEventListener("click",()=>{this.selectAsset(m)}),s.appendChild(d)});const r=document.createElement("div");r.id="imagePreview",r.className="image-preview",r.innerHTML=`
            <label>Preview:</label>
            <div class="preview-content">
                <img id="previewImage" src="" alt="No image selected" style="display: none;">
                <span id="previewText">No image selected</span>
            </div>
        `,[a,i].forEach(m=>{const d=m.querySelector('input[type="radio"]');d.addEventListener("change",()=>{this.handleImageSourceChange(d.value)})}),e.addEventListener("input",()=>{this.updateImagePreview(e.value)}),t.insertBefore(o,e),t.insertBefore(n,e),n.appendChild(a),n.appendChild(i),n.appendChild(s),t.insertBefore(r,e.nextSibling)}updateImageSourceSelector(e){const t=document.querySelector('input[name="imageSource"][value="url"]'),n=document.querySelector('input[name="imageSource"][value="asset"]');if(x.some(a=>{const i=M(a.filename);return e===i||e===a.path||e.includes(a.filename)})){n.checked=!0,this.handleImageSourceChange("asset");const a=x.find(i=>{const s=M(i.filename);return e===s||e===i.path||e.includes(i.filename)});a&&this.highlightSelectedAsset(a.id)}else t.checked=!0,this.handleImageSourceChange("url");this.updateImagePreview(e)}handleImageSourceChange(e){const t=document.getElementById("prizeImage"),n=document.getElementById("assetGallery");e==="asset"?(t.style.display="none",n.classList.remove("hidden")):(t.style.display="block",n.classList.add("hidden"),this.clearAssetSelection())}selectAsset(e){const t=document.getElementById("prizeImage"),n=M(e.filename);t.value=n,this.highlightSelectedAsset(e.id),this.updateImagePreview(n)}highlightSelectedAsset(e){document.querySelectorAll(".asset-item").forEach(n=>{n.classList.remove("selected")});const t=document.querySelector(`[data-asset-id="${e}"]`);t&&t.classList.add("selected")}clearAssetSelection(){document.querySelectorAll(".asset-item").forEach(e=>{e.classList.remove("selected")})}updateImagePreview(e){const t=document.getElementById("previewImage"),n=document.getElementById("previewText");e&&e.trim()?(t.src=e,t.style.display="block",n.style.display="none",t.onerror=()=>{t.style.display="none",t.alt="Image not found"}):(t.style.display="none",n.style.display="block",n.textContent="No image selected")}savePrize(){var m;const e=document.getElementById("prizeName").value.trim(),t=document.getElementById("prizeImage").value.trim(),n=parseInt(document.getElementById("prizeQuantity").value),o=parseFloat(document.getElementById("prizeChance").value),a=((m=document.getElementById("unlimitedConsolation"))==null?void 0:m.checked)||!1;let i=document.getElementById("chanceMessage");if(!e||!t||n<0||o<0||o>100){i.textContent="Please fill all fields with valid values.",i.style.color="#e74c3c";return}const s=b().getPrizes();let r=0;if(this.currentEditingPrize?r=s.reduce((d,h)=>d+(h.id===this.currentEditingPrize.id?o:h.chance),0):r=s.reduce((d,h)=>d+h.chance,0)+o,r>100){const d=r-100;let h=null,u=0;for(const p of s)this.currentEditingPrize&&p.id===this.currentEditingPrize.id||p.chance>u&&(u=p.chance,h=p);if(h){const p=Math.max(.1,u-d),g={...h,chance:p};b().updatePrize(g)}}else if(r<100){const d=100-r;let h=null,u=0;for(const p of s)this.currentEditingPrize&&p.id===this.currentEditingPrize.id||p.chance>u&&(u=p.chance,h=p);if(h){const p=Math.min(100,u+d),g={...h,chance:p};b().updatePrize(g)}}i.textContent="Prize saved successfully!",i.style.color="#27ae60";const l={name:e,image:t,quantity:n,chance:o,unlimitedConsolation:a};this.currentEditingPrize?(l.id=this.currentEditingPrize.id,b().updatePrize(l)):b().addPrize(l),this.hideAutoAdjustWarning(),this.updateDefaultPrizeLabel(),this.hidePrizeEditor(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}editPrize(e){this.closeAllInlineEditors();const n=b().getPrizes().find(o=>o.id===e);n&&this.showInlineEditor(n,e)}closeAllInlineEditors(){this.inlineSliders&&(this.inlineSliders.forEach((n,o)=>{n&&n.destroy&&n.destroy()}),this.inlineSliders.clear()),document.querySelectorAll(".inline-prize-editor").forEach(n=>n.remove()),document.querySelectorAll(".prize-card").forEach(n=>n.style.display="flex")}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`);if(t){const n=parseFloat(t.value)||0,o=b().getPrizes(),a=o.find(r=>r.id===parseInt(e));let i=0;a&&(i=o.reduce((r,l)=>r+(l.id===a.id?n:l.chance),0));let s=document.getElementById(`inline-chance-indicator-${e}`);s||(s=document.createElement("span"),s.id=`inline-chance-indicator-${e}`,s.style.cssText=`
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: bold;
                `,t.parentNode.appendChild(s)),i>100?(s.textContent=`⚠️ Total: ${i.toFixed(1)}%`,s.style.color="#e74c3c"):i===100?(s.textContent="✓ Total: 100%",s.style.color="#27ae60"):(s.textContent=`Total: ${i.toFixed(1)}%`,s.style.color="#3498db")}}showInlineEditor(e,t){this.closeAllInlineEditors();const n=document.querySelector(`.prize-card[data-prize-id="${t}"]`);if(!n){console.error("Target card not found for prize ID:",t);return}console.log("Found target card:",n),console.log("Parent node:",n.parentNode),console.log("Next sibling:",n.nextSibling);const o=document.createElement("div");o.className="inline-prize-editor",o.id=`inline-editor-${t}`,o.innerHTML=`
            <h3>Edit Prize</h3>
            <div class="editor-form">
                <label for="inline-prizeName-${t}">Prize Name</label>
                <input type="text" id="inline-prizeName-${t}" value="${e.name}" placeholder="Prize Name">
                
                <label>Image Source</label>
                <div class="inline-image-source-selector">
                    <div class="image-source-option">
                        <label>
                            <input type="radio" name="inline-imageSource-${t}" value="url" checked>
                            <span>Use URL</span>
                        </label>
                    </div>
                    <div class="image-source-option">
                        <label>
                            <input type="radio" name="inline-imageSource-${t}" value="asset">
                            <span>Choose from Assets</span>
                        </label>
                    </div>
                </div>
                
                <label for="inline-prizeImage-${t}">Image URL</label>
                <input type="url" id="inline-prizeImage-${t}" value="${e.image||""}" placeholder="Image URL">
                
                <div id="inline-assetGallery-${t}" class="asset-gallery hidden">
                    ${this.generateAssetGalleryHTML(t)}
                </div>
                
                <div class="image-preview-container">
                    <label>Image Preview</label>
                    <div class="image-preview">
                        <img id="inline-previewImage-${t}" src="${e.image}" alt="Prize Preview" style="display: ${e.image?"block":"none"}">
                        <div id="inline-previewText-${t}" style="display: ${e.image?"none":"block"}">No image selected</div>
                    </div>
                </div>
                
                <label for="inline-prizeQuantity-${t}">Quantity</label>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus-btn" data-target="inline-prizeQuantity-${t}">−</button>
                    <input type="number" id="inline-prizeQuantity-${t}" value="${e.quantity}" placeholder="Quantity" min="0">
                    <button type="button" class="quantity-btn plus-btn" data-target="inline-prizeQuantity-${t}">+</button>
                </div>
                
                <div id="inline-unlimited-checkbox-container-${t}" style="display: block; margin-top: 12px; margin-bottom: 12px; padding: 10px; background-color: #fff3cd; border-radius: 4px; border: 1px solid #ffc107;">
                    <div style="display: flex; align-items: center; margin-bottom: 4px;">
                        <input type="checkbox" id="inline-unlimitedConsolation-${t}" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;">
                        <label for="inline-unlimitedConsolation-${t}" style="cursor: pointer; user-select: none; margin: 0; font-weight: bold; color: #000;">Unlimited consolation (quantity never decreases)</label>
                    </div>
                    <div id="inline-unlimited-hint-${t}" style="font-size: 12px; color: #856404; margin-top: 4px;">
                        ⓘ This option only applies to the prize with the highest win chance
                    </div>
                </div>
                
                <label for="inline-prizeChance-${t}">Win Chance (%)</label>
                <input type="number" id="inline-prizeChance-${t}" value="${e.chance}" placeholder="Win Chance %" min="0" max="100" step="0.1">
                
                <div id="inline-winChanceSliderContainer-${t}"></div>
                
                <div id="inline-chanceMessage-${t}" style="margin: 10px 0; font-weight: bold; color: #e74c3c;"></div>
                
                <div class="editor-buttons">
                    <button class="save-btn" onclick="adminPanel.saveInlineEdit(${t})">Save Changes</button>
                    <button class="cancel-btn" onclick="adminPanel.closeAllInlineEditors()">Cancel</button>
                </div>
            </div>
        `,console.log("Inserting inline editor after target card"),n.parentNode.insertBefore(o,n.nextSibling),console.log("Inline editor inserted at:",o.offsetTop),this.setupInlineEditorEvents(t,e.image),setTimeout(()=>{o.scrollIntoView({behavior:"smooth",block:"center"})},100)}generateAssetGalleryHTML(e){return x.map(t=>{const n=M(t.filename);return`
                <div class="asset-item" data-asset-id="${t.id}" data-asset-path="${t.path}" data-prize-id="${e}">
                    <img src="${n}" alt="${t.name}" title="${t.description}">
                    <span>${t.name}</span>
                </div>
            `}).join("")}setupInlineEditorEvents(e,t){T();const n=document.getElementById(`inline-prizeChance-${e}`).value,o=I(`inline-winChanceSliderContainer-${e}`,`inline-prizeChance-${e}`,parseFloat(n)||0,!0,e,()=>this.updateInlineChanceMessage&&this.updateInlineChanceMessage(e));this.inlineSliders||(this.inlineSliders=new Map),this.inlineSliders.set(e,o);const a=document.getElementById(`inline-prizeImage-${e}`);document.getElementById(`inline-previewImage-${e}`),document.getElementById(`inline-previewText-${e}`),a.addEventListener("input",()=>{this.updateInlineImagePreview(e,a.value.trim())}),document.querySelectorAll(`input[name="inline-imageSource-${e}"]`).forEach(g=>{g.addEventListener("change",()=>{this.handleInlineImageSourceChange(e,g.value)})}),document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(g=>{g.addEventListener("click",()=>{const c=g.dataset.assetId,y=x.find(w=>w.id===c);y&&this.selectInlineAsset(e,y)})}),this.updateInlineImageSourceState(e,t);const r=b().getPrizes(),l=[...r].sort((g,c)=>c.chance-g.chance),m=l.length>0&&l[0].id===e,d=document.getElementById(`inline-unlimitedConsolation-${e}`),h=document.getElementById(`inline-unlimited-hint-${e}`),u=document.getElementById(`inline-unlimited-checkbox-container-${e}`);if(d&&h&&u){const g=r.find(c=>c.id===e);d.checked=!!(g&&g.unlimitedConsolation),d.disabled=!m,m?(h.textContent="✓ This is the consolation prize (highest win chance)",h.style.color="#155724",u.style.backgroundColor="#d4edda",u.style.borderColor="#28a745"):(h.textContent="ⓘ This option only applies to the prize with the highest win chance",h.style.color="#856404",u.style.backgroundColor="#fff3cd",u.style.borderColor="#ffc107")}document.getElementById(`inline-prizeChance-${e}`).addEventListener("input",()=>{this.updateInlineChanceMessage(e)}),this.updateInlineChanceMessage(e)}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`),n=parseFloat(t.value)||0,a=b().getPrizes().reduce((s,r)=>s+(r.id===e?n:r.chance),0);let i=document.getElementById(`inline-chanceMessage-${e}`);if(i)if(a<100)i.textContent=`Total win chance: ${a.toFixed(1)}%. ${(100-a).toFixed(1)}% left to allocate.`,i.style.color="#e67e22",this.hideInlineAutoAdjustWarning(e);else if(a>100){const s=a-100;i.textContent=`Total win chance: ${a.toFixed(1)}%. Exceeded by ${s.toFixed(1)}%.`,i.style.color="#e74c3c",this.showInlineAutoAdjustWarning(e,s)}else i.textContent="Total win chance: 100%. Ready to save!",i.style.color="#27ae60",this.hideInlineAutoAdjustWarning(e)}showInlineAutoAdjustWarning(e,t){let n=document.getElementById(`inline-autoAdjustWarning-${e}`);if(!n){n=document.createElement("div"),n.id=`inline-autoAdjustWarning-${e}`,n.style.cssText=`
                margin: 15px 0;
                padding: 15px;
                background-color: rgba(255, 193, 7, 0.1);
                border: 2px solid #ffc107;
                border-radius: 8px;
                color: #ff8f00;
                font-weight: bold;
                font-size: 0.95em;
                display: block;
                position: relative;
                z-index: 1000;
            `;const s=document.getElementById(`inline-chanceMessage-${e}`);s&&s.parentNode&&s.parentNode.insertBefore(n,s.nextSibling)}const o=b().getPrizes();let a=null,i=0;for(const s of o)s.id!==e&&s.chance>i&&(i=s.chance,a=s);if(a){const s=Math.max(.1,i-t);n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${t.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${a.name}"</strong> will be reduced from ${i}% to ${s.toFixed(1)}%
            `}else n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;n.style.display="block",n.style.visibility="visible",n.style.opacity="1"}hideInlineAutoAdjustWarning(e){const t=document.getElementById(`inline-autoAdjustWarning-${e}`);t&&(t.style.display="none")}handleInlineImageSourceChange(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),o=document.getElementById(`inline-assetGallery-${e}`);t==="asset"?(n.style.display="none",o.classList.remove("hidden")):(n.style.display="block",o.classList.add("hidden"),this.clearInlineAssetSelection(e))}selectInlineAsset(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),o=M(t.filename);n.value=o,this.highlightInlineSelectedAsset(e,t.id),this.updateInlineImagePreview(e,o)}highlightInlineSelectedAsset(e,t){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(a=>{a.classList.remove("selected")});const o=document.querySelector(`[data-asset-id="${t}"][data-prize-id="${e}"]`);o&&o.classList.add("selected")}clearInlineAssetSelection(e){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(n=>{n.classList.remove("selected")})}updateInlineImagePreview(e,t){const n=document.getElementById(`inline-previewImage-${e}`),o=document.getElementById(`inline-previewText-${e}`);t&&t.trim()?(n.src=t,n.style.display="block",o.style.display="none",n.onerror=()=>{n.style.display="none",n.alt="Image not found"}):(n.style.display="none",o.style.display="block")}updateInlineImageSourceState(e,t){const n=document.querySelector(`input[name="inline-imageSource-${e}"][value="url"]`),o=document.querySelector(`input[name="inline-imageSource-${e}"][value="asset"]`);if(x.some(i=>{const s=M(i.filename);return t===s||t===i.path})&&t){o.checked=!0;const i=x.find(s=>{const r=M(s.filename);return t===r||t===s.path});i&&(this.handleInlineImageSourceChange(e,"asset"),this.highlightInlineSelectedAsset(e,i.id))}else n.checked=!0,this.handleInlineImageSourceChange(e,"url")}saveInlineEdit(e){var m;const t=document.getElementById(`inline-prizeName-${e}`).value.trim(),n=document.getElementById(`inline-prizeImage-${e}`).value.trim(),o=parseInt(document.getElementById(`inline-prizeQuantity-${e}`).value),a=parseFloat(document.getElementById(`inline-prizeChance-${e}`).value),i=((m=document.getElementById(`inline-unlimitedConsolation-${e}`))==null?void 0:m.checked)||!1;if(!t){alert("Prize name is required");return}if(isNaN(o)||o<0){alert("Please enter a valid quantity (0 or more)");return}if(isNaN(a)||a<0||a>100){alert("Please enter a valid win chance between 0 and 100");return}const s={id:e,name:t,image:n,quantity:o,chance:a,unlimitedConsolation:i},r=b().getPrizes(),l=r.reduce((d,h)=>d+(h.id===e?a:h.chance),0);if(l!==100){if(l>100){const d=l-100;let h=null,u=0;for(const p of r)p.id!==e&&p.chance>u&&(u=p.chance,h=p);if(h){const p=Math.max(.1,u-d),g={...h,chance:p};b().updatePrize(g)}}else if(l<100){const d=100-l;let h=null,u=0;for(const p of r)p.id!==e&&p.chance>u&&(u=p.chance,h=p);if(h){const p=Math.min(100,u+d),g={...h,chance:p};b().updatePrize(g)}}}b().updatePrize(s);{this.closeAllInlineEditors(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels());const d=document.createElement("div");d.textContent="Prize updated successfully!",d.style.cssText=`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                font-weight: bold;
            `,document.body.appendChild(d),setTimeout(()=>{d.remove()},3e3)}}deletePrize(e){if(confirm("Are you sure you want to delete this prize?")){const n=b().getPrizes().find(i=>i.id===e);if(!n)return;const o=n.chance;b().deletePrize(e);const a=b().getPrizes();if(a.length>0&&o>0){const i=a.reduce((l,m)=>m.chance>l.chance?m:l),s={...i,chance:Math.min(100,i.chance+o)};b().updatePrize(s);const r=document.createElement("div");r.textContent=`Prize deleted. ${o}% redistributed to "${i.name}" (now ${s.chance}%)`,r.style.cssText=`
                    position: fixed;
                    top: 70px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    font-weight: bold;
                    max-width: 400px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                `,document.body.appendChild(r),setTimeout(()=>{r.remove()},4e3)}this.refreshPrizesList(),this.updateDefaultPrizeLabel(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}}refreshSettings(){}resetGame(){b().resetAll(),this.refreshContent(),window.slotMachine&&window.slotMachine.initialize(),alert("Game has been reset successfully!")}refreshLogs(){const e=document.getElementById("spinLogs"),t=b().getLogs();if(e.innerHTML="",t.length===0){e.innerHTML="<p>No spins recorded yet.</p>";return}t.forEach((n,o)=>{const a=document.createElement("div");a.className="log-entry";const i=new Date(n.timestamp).toLocaleString(),s=t.length-o;a.innerHTML=`
                <strong>${i}</strong><br>
                Spin #${s}<br>
                Prize: ${n.prizeName}
                ${n.gameMode==="duration"?`<br>Remaining in deck: ${n.remainingInDeck}`:""}
            `,e.appendChild(a)})}refreshSlotMachine(){window.slotMachine&&window.slotMachine.populateReels()}handleQuantityChange(e){const t=e.dataset.target,n=document.getElementById(t);if(!n)return;let o=parseInt(n.value)||0;e.classList.contains("plus-btn")?o++:o=Math.max(0,o-1),n.value=o,n.dispatchEvent(new Event("input",{bubbles:!0}))}}function V(){const f=document.getElementById("adminConfirmModal"),e=document.getElementById("adminConfirmYes"),t=document.getElementById("adminConfirmNo");f.classList.remove("hidden");function n(){f.classList.add("hidden"),adminPanel.show(),a()}function o(){f.classList.add("hidden"),a()}function a(){e.removeEventListener("click",n),t.removeEventListener("click",o)}e.addEventListener("click",n),t.addEventListener("click",o),e.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()}),t.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()})}window.showAdminLogin=V;window.adminPanel=new R;class O{constructor(){this.cachedPrizes=null,this.cachedAvailablePrizes=null,this.cachedTotalChance=null,this.lastPrizeUpdate=0,this.preloadedAssets=null,this.initialize(),this.setupEventListeners()}onAssetsLoaded(e){this.preloadedAssets=e,console.log("✅ Slot machine received preloaded assets:",e.size),this.updatePrizeDisplay(),this.populateReels(),this.optimizeImageLoading()}optimizeImageLoading(){document.querySelectorAll("img").forEach(t=>{const n=this.getPreloadedImage(t.src);n&&(t.src=n.src,t.style.opacity="1",t.style.transition="opacity 0.3s ease")})}getPreloadedImage(e){if(!this.preloadedAssets)return null;for(let[t,n]of this.preloadedAssets)if(t===e||t.includes(e)||e.includes(t))return n.element;return null}initialize(){this.updatePrizeDisplay(),this.populateReels(),this.initializeAnimations(),setTimeout(()=>{window.soundManager&&window.soundManager.onBackgroundStart()},2e3)}setupEventListeners(){let e=!1;document.getElementById("spinButton").addEventListener("click",()=>{e||animationManager.isSpinning||(e=!0,setTimeout(()=>e=!1,300),window.soundManager&&window.soundManager.onButtonClick(),this.spin())}),document.getElementById("closePopup").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),animationManager.closePrizePopup()});let t=!1;document.addEventListener("keydown",n=>{const o=document.getElementById("prizePopup"),a=document.getElementById("spinButton"),i=o&&!o.classList.contains("hidden"),s=a&&a.disabled;(n.key==="Enter"||n.key===" ")&&!t&&!animationManager.isSpinning&&!i&&!s&&(n.preventDefault(),t=!0,setTimeout(()=>t=!1,300),this.spin())})}updatePrizeDisplay(){const e=document.getElementById("prizeList"),t=storageManager.getPrizes(),n=Date.now();if(this.cachedPrizes&&JSON.stringify(this.cachedPrizes)===JSON.stringify(t)&&n-this.lastPrizeUpdate<100)return;this.cachedPrizes=[...t],this.lastPrizeUpdate=n,this.clearPrizeCache();const o=document.createDocumentFragment(),a=t.reduce((i,s)=>s.chance>i.chance?s:i,t[0]||{chance:0});t.filter(i=>i.id!==a.id).forEach(i=>{const s=document.createElement("div");s.className="prize-item",i.quantity===0&&s.classList.add("out-of-stock"),s.innerHTML=`
                <img src="${i.image}" alt="${i.name}" onerror="this.onerror=null; this.style.display='none';">
                <span>${i.name}</span>
                ${i.quantity===0?'<div class="out-of-stock-overlay"><div class="x-mark">X</div></div>':""}
            `,o.appendChild(s)}),e.innerHTML="",e.appendChild(o),setTimeout(()=>{animationManager.animatePrizeShowcase()},100)}clearPrizeCache(){this.cachedAvailablePrizes=null,this.cachedTotalChance=null}getAvailablePrizes(e){return this.cachedAvailablePrizes||(this.cachedAvailablePrizes=e.filter(t=>t.quantity>0||t.unlimitedConsolation),this.cachedTotalChance=this.cachedAvailablePrizes.reduce((t,n)=>t+n.chance,0)),{prizes:this.cachedAvailablePrizes,totalChance:this.cachedTotalChance}}populateReels(){const e=storageManager.getPrizes();animationManager.populateReels(e)}initializeAnimations(){animationManager.initializeButtonEffects()}spin(){if(animationManager.isSpinning)return;this.clearPrizeCache();const e=storageManager.getPrizes();if(e.length===0){alert("No prizes available! Please add some prizes in the admin panel.");return}const t=this.determineWinningPrize(e);if(!t){alert("No more prizes available!");return}let n=[],o=t;const a=e.reduce((i,s)=>s.chance>i.chance?s:i,e[0]||{chance:0});if(t.id===a.id){const i=e.filter(s=>s.id!==a.id);if(i.length===0)n=[a,a,a];else{const s=Math.floor(Math.random()*i.length);let r=Math.floor(Math.random()*i.length),l=Math.floor(Math.random()*i.length);if(Math.random()<.5)r=s;else for(;r===s&&i.length>1;)r=Math.floor(Math.random()*i.length);for(;(l===s||l===r)&&i.length>1;)l=Math.floor(Math.random()*i.length);n=[i[s],i[r],i[l]]}n[0].id===n[1].id&&n[1].id===n[2].id?o=n[0]:o=a}else n=[t,t,t],o=t;o={...o,isDefault:o.id===a.id},this.logSpin(o),animationManager.spinReels(o,e,n)}determineWinningPrize(e){return this.selectPrizeByProbability(e)}selectPrizeByProbability(e){const{prizes:t,totalChance:n}=this.getAvailablePrizes(e);if(t.length===0)return console.log("❌ No prizes available - all quantities exhausted!"),null;if(n===0)return t[Math.floor(Math.random()*t.length)];let o=Math.random()*n;console.log("🎲 Spin - Available prizes:",t.length,"Total chance:",n),console.log("   Random value:",o.toFixed(3));let a=null,i=0;for(const s of t){i+=s.chance;const r=s.unlimitedConsolation?" [UNLIMITED]":"";if(console.log(`  ${s.name}: ${(i-s.chance).toFixed(1)} - ${i.toFixed(1)} (${s.chance}% of ${n}) [Qty: ${s.quantity}]${r}`),o<=i&&!a){if(a=s,console.log(`✅ Selected: ${s.name}`),s.unlimitedConsolation)console.log(`♾️ ${s.name} is unlimited - quantity remains at ${s.quantity}`);else{const l={...s,quantity:s.quantity-1};storageManager.updatePrize(l),console.log(`📦 ${s.name} quantity: ${s.quantity} → ${l.quantity}`),l.quantity===0&&console.log(`🚫 ${s.name} is now exhausted and will be removed from future spins!`),this.clearPrizeCache()}break}}return a||(a=t[t.length-1],console.log("⚠️ Fallback selected:",a.name)),a}testProbabilityAccuracy(e=100){console.log(`
🧪 Testing quantity-based probability system with ${e} iterations...`);const t=storageManager.getPrizes(),n={},o={};t.forEach(r=>{n[r.name]=0,o[r.name]=r.quantity}),console.log(`
📦 Starting quantities:`),t.forEach(r=>{const l=r.unlimitedConsolation?" [UNLIMITED ♾️]":"";console.log(`  ${r.name}: ${r.quantity} (${r.chance}%)${l}`)});let a=0;for(let r=0;r<e;r++){const l=storageManager.getPrizes();if(l.filter(h=>h.quantity>0||h.unlimitedConsolation).length===0){console.log(`
🏁 All prizes exhausted after ${r} spins!`);break}const d=this.selectPrizeByProbability(l);d&&(n[d.name]++,a++)}console.log(`
📊 Final Results after `+a+" spins:"),console.log("Prize			Wins	Actual %	Expected %	Original Qty	Remaining	Status"),console.log("─".repeat(95));const i=storageManager.getPrizes();Object.keys(n).forEach(r=>{const l=i.find(y=>y.name===r),m=n[r],d=(m/a*100).toFixed(2),h=l?l.chance.toFixed(2):"0.00",u=o[r],p=l?l.quantity:0,c=l&&l.unlimitedConsolation?"♾️ UNLIMITED":p===0?"❌ EXHAUSTED":"✅ AVAILABLE";console.log(`${r.padEnd(20)}	${m}	${d}%		${h}%		${u}		${p}		${c}`)});const s=Object.values(n).reduce((r,l)=>r+l,0);console.log(`
📈 Summary:`),console.log(`  Total spins completed: ${a} / ${e}`),console.log(`  Total prizes won: ${s}`),console.log(`  Prizes still available: ${i.filter(r=>r.quantity>0||r.unlimitedConsolation).length}`),console.log(`
✅ Test completed. Quantities decreased as prizes were won (except unlimited).`),console.log("💡 Reset the game to restore original quantities.")}logSpin(e){const t={prizeName:e.name,gameMode:"Probability"};storageManager.addLog(t)}}document.addEventListener("DOMContentLoaded",()=>{window.slotMachine=new O,window.testProbability=(f=1e3)=>{window.slotMachine.testProbabilityAccuracy(f)},console.log("🎰 Slot Machine loaded! Test probability with: testProbability(1000)")});class j{constructor(){this.mode=this.getStoredMode()||null,this.listeners=[],this.initialized=!1,this.configs={"high-quality":{name:"High Quality Mode",description:`Full visual effects and smooth animations
(Recommended for PC and modern devices)`,icon:"🚀",settings:{useGSAPAnimations:!0,enableParticleEffects:!0,useAdvancedEasing:!0,enableSoundOverlap:!0,useHighResImages:!0,enableHoverEffects:!0,enableShadowEffects:!0,animationDuration:"normal",enableBackgroundEffects:!0}},performance:{name:"Performance Mode",description:`Optimized for Smart TVs and slower devices
(Reduces lag and improves responsiveness)`,icon:"⚡",settings:{useGSAPAnimations:!1,enableParticleEffects:!1,useAdvancedEasing:!1,enableSoundOverlap:!1,useHighResImages:!1,enableHoverEffects:!1,enableShadowEffects:!1,animationDuration:"fast",enableBackgroundEffects:!1}}}}getStoredMode(){try{return localStorage.getItem("slotMachine_performanceMode")}catch{return console.warn("localStorage not available for performance mode"),null}}setMode(e){if(!this.configs[e])return console.error(`Invalid performance mode: ${e}`),!1;this.mode=e;try{localStorage.setItem("slotMachine_performanceMode",e)}catch{console.warn("Could not save performance mode to localStorage")}return console.log(`🎯 Performance mode set to: ${this.configs[e].name}`),this.notifyListeners(),!0}getMode(){return this.mode}hasUserChosen(){return this.mode!==null}getConfig(e=null){const t=e||this.mode;return t?this.configs[t]:null}getSettings(){const e=this.getConfig();return e?e.settings:{}}getAvailableModes(){return Object.keys(this.configs)}getModeInfo(e){return this.configs[e]||null}isEnabled(e){return this.getSettings()[e]===!0}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notifyListeners(){const e=this.getConfig();this.listeners.forEach(t=>{try{t(this.mode,e)}catch(n){console.error("Error notifying performance mode listener:",n)}})}initialize(){this.initialized||(this.mode&&this.applyPerformanceOptimizations(),this.initialized=!0,console.log("✅ Performance Manager initialized"))}initializeMode(e){this.configs[e]||(console.warn(`Invalid performance mode: ${e}, using default`),e="high-quality"),this.setMode(e),this.initialized||this.initialize(),console.log(`🔄 Performance Manager initialized with mode: ${e}`)}applyPerformanceOptimizations(){const e=this.getSettings(),t=document.body;t.classList.remove("performance-high","performance-low"),t.classList.add(this.mode==="performance"?"performance-low":"performance-high"),this.mode==="performance"&&this.enableGPUAcceleration(),e.enableHoverEffects||this.disableHoverEffects(),console.log(`⚡ Applied optimizations for ${this.getConfig().name}`)}enableGPUAcceleration(){const e=document.createElement("style");e.id="performance-gpu-acceleration",e.textContent=`
            .reel, .reel-strip, .reel-item {
                transform: translateZ(0);
                backface-visibility: hidden;
                will-change: transform;
            }
            
            .slot-machine, .prize-popup, .popup-content {
                transform: translateZ(0);
                backface-visibility: hidden;
            }
        `,document.head.appendChild(e)}disableHoverEffects(){const e=document.createElement("style");e.id="performance-no-hover",e.textContent=`
            * {
                transition: none !important;
            }
            
            .spin-button:hover,
            .prize-item:hover,
            .close-button:hover {
                transform: none !important;
                box-shadow: none !important;
            }
        `,document.head.appendChild(e)}clearPerformanceStyles(){["performance-gpu-acceleration","performance-no-hover"].forEach(t=>{const n=document.getElementById(t);n&&n.remove()})}reset(){try{localStorage.removeItem("slotMachine_performanceMode")}catch{console.warn("Could not clear performance mode from localStorage")}this.mode=null,this.clearPerformanceStyles(),document.body.classList.remove("performance-high","performance-low"),console.log("🔄 Performance mode reset")}getStats(){return{currentMode:this.mode,hasChosen:this.hasUserChosen(),isInitialized:this.initialized,availableModes:this.getAvailableModes(),currentSettings:this.getSettings()}}}const v=new j;typeof window<"u"&&(window.performanceManager=v);class W{constructor(){this.container=null,this.isVisible=!1,this.onSelectionCallback=null}show(e=null){return this.onSelectionCallback=e,new Promise((t,n)=>{this.resolveSelection=t,this.rejectSelection=n,this.createModalHTML(),this.attachEventListeners(),document.body.appendChild(this.container),this.isVisible=!0,setTimeout(()=>{this.container.style.opacity="1"},10)})}hide(){this.container&&(this.container.style.opacity="0",this.isVisible=!1,setTimeout(()=>{this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)},300))}createModalHTML(){this.container=document.createElement("div"),this.container.id="mode-selection-modal";const e=v.getAvailableModes(),t=v.getMode(),n=t?v.getModeInfo(t):null;let o="";n&&(o=`
                <div class="current-mode-indicator">
                    <span class="current-mode-label">Current Mode:</span>
                    <span class="current-mode-value">
                        ${n.icon} ${n.name}
                    </span>
                </div>
            `);const a=e.map(i=>{const s=v.getModeInfo(i),r=i===t;return`
                <div class="mode-option ${r?"current-mode":""}" data-mode="${i}">
                    <div class="mode-icon">${s.icon}</div>
                    <div class="mode-content">
                        <h3 class="mode-title">
                            ${s.name}
                            ${r?'<span class="current-badge">Current</span>':""}
                        </h3>
                        <p class="mode-description">${s.description}</p>
                    </div>
                    <div class="mode-selector">
                        <div class="radio-button">
                            <input type="radio" name="performance-mode" value="${i}" id="mode-${i}" ${r?"checked":""}>
                            <label for="mode-${i}"></label>
                        </div>
                    </div>
                </div>
            `}).join("");this.container.innerHTML=`
            <div class="modal-backdrop">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="header-icon">⚙️</div>
                        <h2>Choose Your Experience</h2>
                        <p class="header-subtitle">Select the performance mode that works best for your device</p>
                        ${o}
                    </div>
                    
                    <div class="mode-options">
                        ${a}
                    </div>
                    
                    <div class="modal-footer">
                        <div class="remember-choice">
                            <input type="checkbox" id="remember-choice" checked>
                            <label for="remember-choice">Remember my choice</label>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="continue-btn" id="continue-btn" disabled>
                                <span>Continue</span>
                                <span class="btn-arrow">→</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="modal-help">
                        <p>💡 You can change this setting anytime from the main screen</p>
                    </div>
                </div>
            </div>
        `,this.addModalStyles()}addModalStyles(){const e=document.createElement("style");e.id="mode-selection-styles",e.textContent=`
            #mode-selection-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                font-family: 'Open Sans', sans-serif;
            }

            .modal-backdrop {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .modal-content {
                background: linear-gradient(145deg, #2c3e50 0%, #34495e 100%);
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 
                    0 20px 60px rgba(0, 0, 0, 0.8),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                border: 2px solid #3498db;
                color: white;
            }

            .modal-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .header-icon {
                font-size: 3em;
                margin-bottom: 15px;
            }

            .modal-header h2 {
                font-family: 'Value Serif', serif;
                font-size: 2.2em;
                font-weight: 700;
                margin: 0 0 10px 0;
                color: #FFD700;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }

            .header-subtitle {
                font-size: 1.1em;
                color: #8EE8D8;
                margin: 0;
                opacity: 0.9;
            }

            .current-mode-indicator {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 15px;
                padding: 10px 15px;
                background: rgba(142, 232, 216, 0.1);
                border: 1px solid rgba(142, 232, 216, 0.3);
                border-radius: 8px;
                font-size: 0.95em;
            }

            .current-mode-label {
                color: #8EE8D8;
                opacity: 0.8;
            }

            .current-mode-value {
                color: #FFD700;
                font-weight: 600;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            }

            .current-badge {
                background: #27AE60;
                color: white;
                font-size: 0.7em;
                padding: 2px 8px;
                border-radius: 12px;
                margin-left: 8px;
                font-weight: 500;
                text-shadow: none;
            }

            .mode-option.current-mode {
                border-color: #27AE60;
                background: rgba(39, 174, 96, 0.1);
            }

            .mode-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-bottom: 30px;
            }

            .mode-option {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 20px;
                background: rgba(52, 73, 94, 0.5);
                border: 2px solid transparent;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }

            .mode-option:hover {
                background: rgba(52, 152, 219, 0.1);
                border-color: #3498db;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
            }

            .mode-option.selected {
                background: rgba(52, 152, 219, 0.2);
                border-color: #3498db;
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.4);
            }

            .mode-icon {
                font-size: 2.5em;
                min-width: 60px;
                text-align: center;
            }

            .mode-content {
                flex: 1;
            }

            .mode-title {
                font-family: 'Value Sans', sans-serif;
                font-size: 1.3em;
                font-weight: 600;
                margin: 0 0 8px 0;
                color: #FFD700;
            }

            .mode-description {
                font-size: 0.95em;
                color: #ecf0f1;
                margin: 0;
                line-height: 1.4;
                white-space: pre-line;
                opacity: 0.9;
            }

            .mode-selector {
                display: flex;
                align-items: center;
            }

            .radio-button {
                position: relative;
            }

            .radio-button input[type="radio"] {
                opacity: 0;
                position: absolute;
                width: 20px;
                height: 20px;
                margin: 0;
            }

            .radio-button label {
                display: block;
                width: 20px;
                height: 20px;
                border: 2px solid #8EE8D8;
                border-radius: 50%;
                background: transparent;
                cursor: pointer;
                position: relative;
                transition: all 0.3s ease;
            }

            .radio-button input[type="radio"]:checked + label {
                border-color: #FFD700;
                background: #FFD700;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }

            .radio-button input[type="radio"]:checked + label::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: #2c3e50;
                border-radius: 50%;
            }

            .modal-footer {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding-top: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }

            .remember-choice {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .remember-choice input[type="checkbox"] {
                width: 18px;
                height: 18px;
                accent-color: #3498db;
            }

            .remember-choice label {
                color: #8EE8D8;
                font-size: 0.95em;
                cursor: pointer;
            }

            .modal-actions {
                display: flex;
                gap: 15px;
            }

            .continue-btn {
                background: linear-gradient(145deg, #27ae60, #2ecc71);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 10px;
                font-size: 1.1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 120px;
                justify-content: center;
            }

            .continue-btn:disabled {
                background: #7f8c8d;
                cursor: not-allowed;
                opacity: 0.6;
            }

            .continue-btn:not(:disabled):hover {
                background: linear-gradient(145deg, #2ecc71, #27ae60);
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(39, 174, 96, 0.4);
            }

            .btn-arrow {
                font-size: 1.2em;
                transition: transform 0.3s ease;
            }

            .continue-btn:not(:disabled):hover .btn-arrow {
                transform: translateX(3px);
            }

            .modal-help {
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .modal-help p {
                color: #8EE8D8;
                font-size: 0.9em;
                margin: 0;
                opacity: 0.8;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .modal-content {
                    padding: 25px;
                    margin: 10px;
                }
                
                .mode-option {
                    flex-direction: column;
                    text-align: center;
                    gap: 15px;
                }
                
                .mode-icon {
                    font-size: 2em;
                }
                
                .modal-footer {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .continue-btn {
                    width: 100%;
                }
            }
        `,document.head.appendChild(e)}attachEventListeners(){const e=this.container.querySelectorAll('input[name="performance-mode"]'),t=this.container.querySelector("#continue-btn"),n=this.container.querySelectorAll(".mode-option"),o=this.container.querySelector('input[name="performance-mode"]:checked');if(o){t.disabled=!1;const a=this.container.querySelector(`[data-mode="${o.value}"]`);a&&a.classList.add("selected")}n.forEach(a=>{a.addEventListener("click",()=>{a.dataset.mode;const i=a.querySelector('input[type="radio"]');i.checked=!0,n.forEach(s=>s.classList.remove("selected")),a.classList.add("selected"),t.disabled=!1})}),e.forEach(a=>{a.addEventListener("change",()=>{t.disabled=!1,n.forEach(s=>s.classList.remove("selected"));const i=this.container.querySelector(`[data-mode="${a.value}"]`);i&&i.classList.add("selected")})}),t.addEventListener("click",()=>{const a=this.container.querySelector('input[name="performance-mode"]:checked'),i=this.container.querySelector("#remember-choice").checked;a&&this.handleModeSelection(a.value,i)}),this.container.addEventListener("keydown",a=>{a.key==="Enter"&&!t.disabled&&t.click()})}handleModeSelection(e,t){console.log(`🎯 User selected: ${e} (remember: ${t})`),t?v.setMode(e):(v.mode=e,v.notifyListeners()),v.initialize(),this.onSelectionCallback&&this.onSelectionCallback(e,t),this.resolveSelection&&this.resolveSelection(e),this.hide()}isShown(){return this.isVisible}destroy(){this.hide();const e=document.getElementById("mode-selection-styles");e&&e.remove()}}const k=new W;typeof window<"u"&&(window.modeSelectionModal=k);window.performanceManager=v;window.modeSelectionModal=k;async function L(){console.log("🎰 Initializing Slot Machine App..."),console.log("🔍 Debug - window.performanceManager:",!!window.performanceManager),console.log("🔍 Debug - window.modeSelectionModal:",!!window.modeSelectionModal),window.performanceManager?(window.performanceManager.initialize(),console.log("⚡ Performance manager initialized")):console.error("❌ Performance manager not found on window object"),z.show(),await q.preloadAssets((f,e,t)=>{z.updateProgress(f,e,t)},f=>{console.log("✅ All assets preloaded, checking performance mode..."),setTimeout(()=>{z.hide();const e=localStorage.getItem("slotMachine_performanceMode");e?(console.log(`🔄 Returning user, using saved mode: ${e}`),window.performanceManager&&window.performanceManager.initializeMode(e),A(f)):(console.log("🎯 First time user, showing mode selection modal"),console.log("🔍 Debug - modeSelectionModal available:",!!window.modeSelectionModal),window.modeSelectionModal?window.modeSelectionModal.show().then(t=>{console.log(`✅ User selected: ${t}`),A(f)}):(console.warn("❌ Mode selection modal not available, using default mode"),A(f)))},300)})}function A(f){console.log("🎰 Showing main application");const e=document.querySelector(".slot-machine-cabinet");if(console.log("🔍 Debug - appContainer found:",!!e),e?(console.log("🔍 Debug - setting opacity to 1"),e.style.opacity="1",e.style.transition="opacity 0.5s ease-in",console.log("🔍 Debug - appContainer opacity set to:",e.style.opacity)):console.error("❌ Could not find .slot-machine-cabinet element!"),window.slotMachine&&window.slotMachine.onAssetsLoaded?(console.log("🎮 Triggering slot machine onAssetsLoaded"),window.slotMachine.onAssetsLoaded(f)):(console.log("🔍 Debug - window.slotMachine:",!!window.slotMachine),console.log("🔍 Debug - window.slotMachine.onAssetsLoaded:",!!(window.slotMachine&&window.slotMachine.onAssetsLoaded))),window.performanceManager){const t=window.performanceManager.getMode();console.log(`🚀 Application initialized in ${t} mode`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",L):L();
