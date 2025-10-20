(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const S="/flip-and-match-app/",C=[{id:"development-evp-shield",name:"Development EVP Shield",filename:"Development-EVP-shield.png",path:`${S}assets/images/prizes/Development-EVP-shield.png`,description:"Development EVP shield logo"},{id:"inclusion-evp-shield",name:"Inclusion EVP Shield",filename:"Inclusion-EVP-shield.png",path:`${S}assets/images/prizes/Inclusion-EVP-shield.png`,description:"Inclusion EVP shield logo"},{id:"innovation-evp-shield",name:"Innovation EVP Shield",filename:"Innovation-EVP-shield.png",path:`${S}assets/images/prizes/Innovation-EVP-shield.png`,description:"Innovation EVP shield logo"}],B={sadCat:{id:"sad-cat",name:"Sad Cat",filename:"Sad_cat.png",path:`${S}assets/images/Sad_cat.png`,description:"Default fallback image for failed loads"},winnerCat:{id:"winner-cat",name:"Winner Cat",filename:"cat_win.png",path:`${S}assets/images/cat_win.png`,description:"Victory celebration image"},logo:{id:"pursuing-potential-header",name:"Pursuing Potential Header Logo",filename:"Pursuing Potential Logo.png",path:`${S}assets/images/Pursuing Potential Logo.png`,description:"Main header logo"},catCrying:{id:"cat-crying",name:"Crying Cat",filename:"cat-crying.gif",path:`${S}assets/images/cat-crying.gif`,description:"Crying cat gif"},dancingCat:{id:"dancing-cat",name:"Dancing Cat",filename:"dancing-cat.gif",path:`${S}assets/images/dancing-cat.gif`,description:"Dancing cat gif"},happyCat:{id:"happy-cat",name:"Happy Cat",filename:"Happy cat.gif",path:`${S}assets/images/Happy cat.gif`,description:"Happy cat gif"}},M=f=>{const e=encodeURIComponent(f);return`${S}assets/images/prizes/${e}`};class F{constructor(){this.loadedCount=0,this.totalAssets=0,this.loadedAssets=new Map,this.onProgressCallback=null,this.onCompleteCallback=null,this.preloadStartTime=null}async preloadAssets(e,t){this.onProgressCallback=e,this.onCompleteCallback=t,this.preloadStartTime=performance.now();const n=this.collectImageUrls();this.totalAssets=n.length,console.log(`🎰 Starting preload of ${this.totalAssets} assets...`);const i=n.map((o,a)=>this.preloadImage(o,a));try{await Promise.allSettled(i);const o=performance.now()-this.preloadStartTime;console.log(`✅ Asset preloading completed in ${Math.round(o)}ms`),console.log(`📊 Successfully loaded: ${this.loadedAssets.size}/${this.totalAssets} assets`),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}catch(o){console.error("❌ Asset preloading error:",o),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}}collectImageUrls(){const e=new Set;return C.forEach(t=>{e.add(t.path)}),Object.values(B).forEach(t=>{e.add(t.path)}),e.add("./assets/images/Pursuing Potential Logo.png"),e.add("/flip-and-match-app/assets/images/Pursuing%20Potential%20Logo.png"),Array.from(e).filter(t=>t&&t.trim()!=="")}preloadImage(e,t){return new Promise(n=>{const i=new Image;i.loading="eager",i.decoding="async",i.crossOrigin="anonymous";const o=setTimeout(()=>{console.warn(`⏰ Timeout loading image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"timeout"})},1e4);i.onload=()=>{clearTimeout(o),this.handleImageLoad(e,t,!0,i),n({success:!0,url:e})},i.onerror=()=>{clearTimeout(o),console.warn(`⚠️  Failed to load image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"error"})},i.src=e})}handleImageLoad(e,t,n,i=null){this.loadedCount++,n&&i&&this.loadedAssets.set(e,{url:e,element:i,loaded:!0,index:t});const o=this.loadedCount/this.totalAssets*100;this.onProgressCallback&&this.onProgressCallback(o,this.loadedCount,this.totalAssets)}getPreloadedImage(e){const t=this.loadedAssets.get(e);return t&&t.loaded?t.element:null}isComplete(){return this.loadedCount>=this.totalAssets}getStats(){return{loaded:this.loadedCount,total:this.totalAssets,percentage:this.totalAssets>0?this.loadedCount/this.totalAssets*100:0,loadedUrls:Array.from(this.loadedAssets.keys())}}}const H=new F;class V{constructor(){this.container=null,this.progressBar=null,this.progressText=null,this.statusText=null,this.loadingAnimation=null}show(){this.createLoadingHTML(),this.startLoadingAnimation(),document.body.appendChild(this.container)}updateProgress(e,t,n){if(this.progressBar&&(this.progressBar.style.width=`${e}%`),this.progressText&&(this.progressText.textContent=`${Math.round(e)}%`),this.statusText){let i="";e<25?i=`Loading prize images... ${t}/${n}`:e<50?i=`Loading app assets... ${t}/${n}`:e<75?i=`Preparing slot machine... ${t}/${n}`:e<100?i=`Finalizing setup... ${t}/${n}`:i=`Ready to play! ${t}/${n}`,this.statusText.textContent=i}}hide(){this.loadingAnimation&&clearInterval(this.loadingAnimation),this.container&&(this.container.style.transition="opacity 0.5s ease-out",this.container.style.opacity="0",setTimeout(()=>{this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)},500))}createLoadingHTML(){this.container=document.createElement("div"),this.container.id="asset-loading-screen",this.container.innerHTML=`
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="slot-spinner">
                        <div class="spinner-reel">🎰</div>
                        <div class="spinner-reel">🎯</div>
                        <div class="spinner-reel">⭐</div>
                    </div>
                </div>
                
                <h1 class="loading-title">Pursuing Potential</h1>
                
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
        `,document.head.appendChild(e)}startLoadingAnimation(){let e=0;this.loadingAnimation=setInterval(()=>{if(this.statusText&&this.statusText.textContent.includes("Loading assets")){e=(e+1)%4;const t=".".repeat(e),n=this.statusText.textContent.split("...")[0].split("..")[0].split(".")[0];this.statusText.textContent=n+t}},500)}}const z=new V;class N{constructor(){this.initializeDefaults()}initializeDefaults(){if(!this.getPrizes().length){const e=[{id:1,name:"Grand Prize",image:C[0].path,quantity:50,chance:1},{id:2,name:"2nd Prize",image:C[1].path,quantity:10,chance:2},{id:3,name:"3rd Prize",image:C[2].path,quantity:5,chance:3},{id:4,name:"Consolation",image:B.sadCat.path,quantity:999,chance:94}];this.setPrizes(e)}}getPrizes(){const e=localStorage.getItem("prizes");return e?JSON.parse(e):[]}setPrizes(e){localStorage.setItem("prizes",JSON.stringify(e))}addPrize(e){const t=this.getPrizes();return e.id=Date.now(),t.push(e),this.setPrizes(t),e}updatePrize(e){const t=this.getPrizes(),n=t.findIndex(i=>i.id===e.id);return n!==-1?(t[n]=e,this.setPrizes(t),!0):!1}deletePrize(e){const t=this.getPrizes(),n=t.filter(i=>i.id!==e);return this.setPrizes(n),n.length!==t.length}getLogs(){const e=localStorage.getItem("spinLogs");return e?JSON.parse(e):[]}addLog(e){const t=this.getLogs();e.timestamp=new Date().toISOString(),t.unshift(e),t.length>100&&t.splice(100),localStorage.setItem("spinLogs",JSON.stringify(t))}clearLogs(){localStorage.removeItem("spinLogs")}resetAll(){localStorage.clear(),this.initializeDefaults()}}window.storageManager=new N;class R{constructor(){this.sounds={},this.audioContext=null,this.isMuted=!1,this.volume=.5,this.performanceMode="high-quality",this.audioQueue=[],this.isPlayingCustomSound=!1,this.initializeSounds(),this.createVolumeControl(),this.setupPerformanceModeListener()}setupPerformanceModeListener(){const e=()=>window.performanceManager&&window.performanceManager.addListener?(console.log("🔗 Registering performance mode listener for sound manager"),window.performanceManager.addListener((t,n)=>{console.log(`🔊 Sound manager received mode change: ${t}`),this.onPerformanceModeChange(t,n)}),!0):!1;e()||(console.log("⏳ Performance manager not ready, will retry..."),setTimeout(()=>{e()||setTimeout(()=>{e()||setTimeout(()=>{e()||console.warn("❌ Could not register performance mode listener after multiple attempts")},3e3)},1e3)},100))}onPerformanceModeChange(e,t){this.performanceMode=e,console.log(`🔊 Sound system switched to: ${e}`),e==="performance"?this.enablePerformanceOptimizations():this.disablePerformanceOptimizations(),this.updatePerformanceModeLabel()}enablePerformanceOptimizations(){this.stopBackgroundAmbience(),this.audioQueue=[],this.preloadEssentialSounds()}disablePerformanceOptimizations(){}preloadEssentialSounds(){const e=["congratulations","miaw","happy"];Object.keys(this.customSounds).forEach(t=>{if(!e.includes(t)){const n=this.customSounds[t];n&&(n.pause(),n.currentTime=0)}})}shouldPlaySound(e){return!(this.isMuted||this.performanceMode==="performance"&&(e==="background"||e==="ambience"||this.isPlayingCustomSound&&(e==="congratulations"||e==="miaw"||e==="happy")))}initializeSounds(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.warn("Web Audio API not supported:",e)}this.loadCustomSounds(),this.createProgrammaticSounds()}loadCustomSounds(){this.customSounds={};const e=new Audio("./assets/sounds/Congratulations.mp3");e.volume=this.volume,this.performanceMode==="performance"?e.preload="metadata":e.preload="auto",this.customSounds.congratulations=e;const t=new Audio("./assets/sounds/miaw.mp3");t.volume=this.volume,this.performanceMode==="performance"?t.preload="metadata":t.preload="auto",this.customSounds.miaw=t;const n=new Audio("./assets/sounds/Happy Happy Happy.mp3");n.volume=this.volume,this.performanceMode==="performance"?n.preload="metadata":n.preload="auto",this.customSounds.happy=n,e.addEventListener("error",()=>{console.warn("Could not load congratulations sound")}),t.addEventListener("error",()=>{console.warn("Could not load miaw sound")}),n.addEventListener("error",()=>{console.warn("Could not load happy happy happy sound")}),e.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),t.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),n.addEventListener("ended",()=>{this.isPlayingCustomSound=!1})}createProgrammaticSounds(){this.sounds={spin:()=>this.createSpinSound(),win:()=>this.createMelody([523,659,784,1047],.3),lose:()=>this.createTone(150,.8,"sine"),click:()=>this.createTone(800,.1,"square"),reelStop:()=>this.createTone(400,.2,"triangle"),jackpot:()=>this.createCelebrationSound(),background:()=>this.createAmbientSound()}}createSpinSound(){if(!this.audioContext||this.isMuted)return;const e=this.performanceMode==="performance"?1.5:2.5,t=this.performanceMode==="performance"?4:8,n=this.performanceMode==="performance"?200:300,i=this.audioContext.createOscillator(),o=this.audioContext.createGain(),a=this.audioContext.createBiquadFilter();i.connect(a),a.connect(o),o.connect(this.audioContext.destination),i.frequency.setValueAtTime(400,this.audioContext.currentTime),i.frequency.exponentialRampToValueAtTime(200,this.audioContext.currentTime+e),i.type="sawtooth",a.type="lowpass",a.frequency.setValueAtTime(1e3,this.audioContext.currentTime),a.frequency.exponentialRampToValueAtTime(300,this.audioContext.currentTime+e);const s=this.performanceMode==="performance"?.3:.4;o.gain.setValueAtTime(0,this.audioContext.currentTime),o.gain.linearRampToValueAtTime(this.volume*s,this.audioContext.currentTime+.1),o.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+e),i.start(this.audioContext.currentTime),i.stop(this.audioContext.currentTime+e);for(let r=0;r<t;r++)setTimeout(()=>{this.createTone(600+Math.random()*200,.05,"square")},r*n)}createTone(e,t,n="sine"){if(!this.audioContext||this.isMuted)return;const i=this.audioContext.createOscillator(),o=this.audioContext.createGain();i.connect(o),o.connect(this.audioContext.destination),i.frequency.setValueAtTime(e,this.audioContext.currentTime),i.type=n,o.gain.setValueAtTime(0,this.audioContext.currentTime),o.gain.linearRampToValueAtTime(this.volume*.3,this.audioContext.currentTime+.01),o.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+t),i.start(this.audioContext.currentTime),i.stop(this.audioContext.currentTime+t)}createMelody(e,t){!this.audioContext||this.isMuted||e.forEach((n,i)=>{setTimeout(()=>{this.createTone(n,t,"sine")},i*t*200)})}createCelebrationSound(){if(!this.audioContext||this.isMuted)return;[261,329,392,523,659,784,1047,1319].forEach((t,n)=>{setTimeout(()=>{this.createTone(t,.4,"sine")},n*100)}),setTimeout(()=>{for(let t=0;t<10;t++)setTimeout(()=>{this.createTone(1e3+Math.random()*1e3,.1,"square")},t*50)},800)}createAmbientSound(){if(!this.audioContext||this.isMuted)return;if(this.performanceMode==="performance"){console.log("🔊 Ambient sound skipped in performance mode");return}const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.setValueAtTime(60,this.audioContext.currentTime),e.type="sine",t.gain.setValueAtTime(this.volume*.1,this.audioContext.currentTime),e.start(),setTimeout(()=>{t.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+1),e.stop(this.audioContext.currentTime+1)},5e3)}playSound(e){if(!this.shouldPlaySound(e)||!this.sounds[e]){this.isMuted?console.log(`Sound ${e} muted`):this.sounds[e]||console.warn(`Sound ${e} not found`);return}try{if(this.performanceMode==="performance"){if(e==="background"||e==="ambient")return;this.audioContext&&this.audioContext.state==="suspended"?this.audioContext.resume().then(()=>{this.sounds[e]()}).catch(t=>{console.warn("Failed to resume audio context:",t)}):this.sounds[e]()}else this.audioContext&&this.audioContext.state==="suspended"?this.audioContext.resume().then(()=>{this.sounds[e]()}).catch(t=>{console.warn("Failed to resume audio context:",t)}):this.sounds[e]()}catch(t){console.warn("Error playing sound:",t)}}mute(){this.isMuted=!0,this.updateVolumeButton()}unmute(){this.isMuted=!1,this.updateVolumeButton()}toggleMute(){this.isMuted=!this.isMuted,this.updateVolumeButton()}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.customSounds&&Object.values(this.customSounds).forEach(t=>{t&&(t.volume=this.volume)}),this.updateVolumeSlider()}createVolumeControl(){let e=document.querySelector(".bottom-controls");e||(e=document.createElement("div"),e.className="bottom-controls",document.body.appendChild(e),this.repositionControls(),window.addEventListener("resize",()=>this.repositionControls()),window.addEventListener("orientationchange",()=>{setTimeout(()=>this.repositionControls(),100)}));const t=document.createElement("div");t.className="sound-control",t.innerHTML=`
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
        `,document.head.appendChild(n);const i=document.createElement("button");i.className="admin-button",i.title="Admin Access",i.innerHTML="🤫",i.addEventListener("click",()=>{window.showAdminLogin&&window.showAdminLogin()});const o=document.createElement("button");o.className="performance-button",o.title="Performance Settings",o.innerHTML="⚡";const a=document.createElement("span");a.className="performance-label",a.id="performance-mode-label";const s=document.createElement("div");s.className="performance-control",s.appendChild(o),s.appendChild(a),console.log("🔧 Creating performance button..."),o.addEventListener("click",()=>{console.log("🔧 Performance button clicked!"),console.log("🔍 Debug - modeSelectionModal available:",!!window.modeSelectionModal),(()=>{window.modeSelectionModal?(console.log("📋 Showing mode selection modal..."),window.modeSelectionModal.show().then(c=>{console.log(`✅ Modal resolved with mode: ${c}`),setTimeout(()=>{this.updatePerformanceModeLabel()},500)}).catch(c=>{console.error("❌ Modal promise rejected:",c)})):(console.warn("⏳ Modal not ready yet, waiting..."),setTimeout(()=>{window.modeSelectionModal?(console.log("📋 Modal now available, showing..."),window.modeSelectionModal.show().then(c=>{console.log(`✅ Modal resolved with mode: ${c}`),setTimeout(()=>{this.updatePerformanceModeLabel()},500)})):(console.error("❌ Mode selection modal still not found after waiting!"),alert("Performance settings not available yet. Please try again in a moment."))},100))})()}),e.appendChild(t),e.appendChild(i),e.appendChild(s),console.log("🔧 Performance button added to DOM"),this.updatePerformanceModeLabel(),setTimeout(()=>{this.updatePerformanceModeLabel()},1e3),setTimeout(()=>{this.updatePerformanceModeLabel()},3e3),document.getElementById("muteButton").addEventListener("click",()=>{this.toggleMute(),this.playSound("click")}),document.getElementById("volumeSlider").addEventListener("input",r=>{const c=parseInt(r.target.value)/100;this.setVolume(c),this.playSound("click")}),document.getElementById("testSoundButton").addEventListener("click",()=>{console.log("Testing spin sound..."),this.testSound("spin")})}repositionControls(){const e=document.querySelector(".bottom-controls"),t=document.querySelector(".header-logo");if(!e||!t)return;window.innerWidth>window.innerHeight?e.parentElement!==t&&t.appendChild(e):e.parentElement!==document.body&&document.body.appendChild(e)}updateVolumeButton(){const e=document.getElementById("muteButton");e&&(e.textContent=this.isMuted?"🔇":"🔊",e.classList.toggle("muted",this.isMuted))}updateVolumeSlider(){const e=document.getElementById("volumeSlider"),t=document.querySelector(".volume-label");e&&(e.value=this.volume*100),t&&(t.textContent=Math.round(this.volume*100)+"%")}onSpinStart(){this.playSound("spin")}onReelStop(){this.playSound("reelStop")}onCardFlip(){if(!this.isMuted&&this.audioContext){const e=this.audioContext.currentTime,t=this.audioContext.createOscillator(),n=this.audioContext.createGain();t.connect(n),n.connect(this.audioContext.destination),t.frequency.setValueAtTime(800,e),t.frequency.exponentialRampToValueAtTime(200,e+.1),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.15*this.volume,e+.02),n.gain.exponentialRampToValueAtTime(.01,e+.15),t.start(e),t.stop(e+.15)}}onDrumroll(){if(this.isMuted){console.log("🔇 Drumroll skipped: sound is muted");return}if(this.audioContext){this.audioContext.state==="suspended"&&this.audioContext.resume().then(()=>{console.log("🔊 Audio context resumed for drumroll")}),console.log("✨ Playing cute anticipation sound");const e=this.audioContext.currentTime,t=3.5,n=this.audioContext.createGain();n.connect(this.audioContext.destination),this.drumrollOscillators=[];const i=28;for(let s=0;s<i;s++){const r=s/i,c=e+r*t,l=this.audioContext.createOscillator();l.type="sine";const p=400,h=[0,2,4,5,7,9,11,12],u=h[s%h.length],d=Math.floor(s/h.length)*12,g=p*Math.pow(2,(u+d)/12);l.frequency.setValueAtTime(g,c),l.frequency.linearRampToValueAtTime(g*1.02,c+.05);const m=this.audioContext.createGain(),y=.15+r*.15;m.gain.setValueAtTime(0,c),m.gain.linearRampToValueAtTime(y*this.volume,c+.01),m.gain.exponentialRampToValueAtTime(.001,c+.12),l.connect(m),m.connect(n),l.start(c),l.stop(c+.12),this.drumrollOscillators.push(l)}const o=this.audioContext.createOscillator();o.type="triangle",o.frequency.setValueAtTime(300,e),o.frequency.linearRampToValueAtTime(500,e+t);const a=this.audioContext.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(.08*this.volume,e+.5),a.gain.linearRampToValueAtTime(.12*this.volume,e+t-.3),o.connect(a),a.connect(n),o.start(e),o.stop(e+t),this.drumrollOscillators.push(o),this.drumrollGain=n}else console.warn("⚠️ Audio context not available for drumroll")}stopDrumroll(){if(this.drumrollOscillators&&this.drumrollOscillators.length>0){console.log("🛑 Stopping anticipation sound");const e=this.audioContext.currentTime;this.drumrollOscillators.forEach(t=>{try{t.stop(e+.05)}catch{}}),this.drumrollGain&&(this.drumrollGain.gain.cancelScheduledValues(e),this.drumrollGain.gain.setValueAtTime(this.drumrollGain.gain.value,e),this.drumrollGain.gain.linearRampToValueAtTime(.001,e+.05)),this.drumrollOscillators=[],this.drumrollGain=null}}onWin(e=!1){e?this.playSound("jackpot"):this.playSound("win")}onLose(){this.playSound("lose")}onPopupWin(){this.playCustomSound("congratulations")}onPopupLose(){this.playCustomSound("miaw")}onPopupHappy(){this.playCustomSound("happy")}playCustomSound(e){if(!(this.isMuted||!this.customSounds||!this.customSounds[e])&&this.shouldPlaySound(e))try{const t=this.customSounds[e];if(this.performanceMode==="performance"?(this.isPlayingCustomSound=!0,setTimeout(()=>{this.isPlayingCustomSound=!1},500),t.preload="metadata"):(t.preload="auto",this.isPlayingCustomSound=!0,setTimeout(()=>{this.isPlayingCustomSound=!1},2e3)),t.currentTime=0,t.volume=this.volume,this.performanceMode==="performance")t.play().catch(n=>{console.warn(`Could not play ${e} sound:`,n),this.isPlayingCustomSound=!1});else{const n=t.play();n!==void 0&&n.catch(i=>{console.warn(`Could not play ${e} sound:`,i),this.isPlayingCustomSound=!1})}}catch(t){console.warn(`Error playing custom sound ${e}:`,t),this.isPlayingCustomSound=!1}}stopCustomSounds(){if(this.customSounds)try{Object.values(this.customSounds).forEach(e=>{e&&!e.paused&&(e.pause(),e.currentTime=0)})}catch(e){console.warn("Error stopping custom sounds:",e)}}updatePerformanceModeLabel(){const e=document.getElementById("performance-mode-label");if(console.log("🏷️ Updating performance label, element found:",!!e),!e){console.warn("❌ Performance label element not found");return}let t="high-quality",n="🚀 High Quality";if(window.performanceManager&&window.performanceManager.getMode){const i=window.performanceManager.getMode();console.log("🔍 Performance manager mode:",i),i==="performance"?(t="performance",n="⚡ Performance"):i==="high-quality"&&(t="high-quality",n="🚀 High Quality")}else console.warn("❌ Performance manager not available for label update");e.textContent=n,e.className=`performance-label ${t}`,console.log(`✅ Performance label updated: ${n} (class: ${e.className})`)}onButtonClick(){this.playSound("click")}onBackgroundStart(){this.playSound("background")}testSound(e){console.log(`Testing sound: ${e}`),this.audioContext&&this.audioContext.state==="suspended"?(console.log("Audio context suspended, trying to resume..."),this.audioContext.resume().then(()=>{console.log("Audio context resumed"),this.playSound(e)})):this.playSound(e)}testAllSounds(){["click","spin","reelStop","win","lose","jackpot"].forEach((t,n)=>{setTimeout(()=>{console.log(`Testing ${t}...`),this.testSound(t)},n*1e3)})}}window.soundManager=new R;window.soundManager.loadCustomSounds();class O{constructor(){this.isSpinning=!1,this.reelHeight=null,this.idleTimelines=[],this.performanceMode="high-quality",this.setupPerformanceModeListener()}setupPerformanceModeListener(){if(window.performanceManager)console.log("🎬 Setting up performance mode listener immediately"),window.performanceManager.addListener((e,t)=>{this.onPerformanceModeChange(e,t)}),this.performanceMode=window.performanceManager.getMode();else{console.log("🎬 Performance manager not ready, setting up retry...");const e=setInterval(()=>{window.performanceManager&&(console.log("🎬 Performance manager found, setting up listener"),window.performanceManager.addListener((t,n)=>{this.onPerformanceModeChange(t,n)}),this.performanceMode=window.performanceManager.getMode(),clearInterval(e))},500)}}onPerformanceModeChange(e,t){this.performanceMode=e,console.log(`🎬 Animation system switched to: ${e}`),e==="performance"?this.enablePerformanceOptimizations():this.disablePerformanceOptimizations()}enablePerformanceOptimizations(){document.querySelectorAll(".reel, .reel-strip, .reel-item, .prize-popup, .popup-content").forEach(t=>{t.style.transform="translateZ(0)",t.style.willChange="transform",t.style.backfaceVisibility="hidden"})}disablePerformanceOptimizations(){document.querySelectorAll(".reel, .reel-strip, .reel-item, .prize-popup, .popup-content").forEach(t=>{t.style.transform="",t.style.willChange="",t.style.backfaceVisibility=""})}getAnimationSettings(){window.performanceManager&&(this.performanceMode=window.performanceManager.getMode());const e=this.performanceMode==="performance";return console.log(`🎬 Getting animation settings - Mode: ${this.performanceMode}, IsPerformanceMode: ${e}`),{spinDuration:e?.08:.12,spinEase:"none",stopDuration:e?.6:1,stopEase:"power2.out",popupScale:!0,popupDuration:e?.3:.4,popupEase:e?"back.out(1.2)":"back.out(1.7)",enableConfetti:!e,confettiAmount:7,confettiInterval:200,confettiMultiplier:2,enableIdleAnimations:!e,enableGPUAcceleration:e,reduceAnimationComplexity:e}}createReelItems(e,t=null){const n=[];for(let i=0;i<15;i++)e.forEach(o=>{n.push(this.createReelItem(o))});return n}createReelItem(e){const t=document.createElement("div");return t.className="reel-item",t.innerHTML=`
            <img src="${e.image}" alt="${e.name}" onerror="this.onerror=null; this.style.display='none';">
        `,this.reelHeight||(document.body.appendChild(t),this.reelHeight=t.offsetHeight,document.body.removeChild(t)),t}initializeCards(e){const t=document.querySelectorAll(".card");if(t.length===0){console.warn("No cards found in DOM");return}t.forEach((n,i)=>{n.dataset.position=i,n.classList.remove("flipped");const o=e[Math.floor(Math.random()*e.length)],a=n.querySelector(".card-prize-image");a&&(a.src=o.image,a.alt=o.name)}),this.startCardShuffle()}startCardShuffle(){if(this.stopCardShuffle(),document.querySelectorAll(".card").length!==3)return;this.shuffleTimeline=gsap.timeline({repeat:-1});const t=this.performanceMode==="performance"?.3:.4;let n=0;for(let i=0;i<50;i++){const o=.3+Math.random()*.7,a=[[0,1],[1,2],[0,2]],[s,r]=a[Math.floor(Math.random()*a.length)];n+=o,this.shuffleTimeline.call(()=>{this.swapCardPositions(s,r)},[],n),n+=t}}swapCardPositions(e,t){const n=document.querySelector(".cards-area");if(!n)return;const i=Array.from(n.querySelectorAll(".card")),o=i.find(p=>parseInt(p.dataset.position)===e),a=i.find(p=>parseInt(p.dataset.position)===t);if(!o||!a)return;const s={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"},r=this.performanceMode==="performance"?.3:.4,c=o.getBoundingClientRect().left-n.getBoundingClientRect().left,l=a.getBoundingClientRect().left-n.getBoundingClientRect().left;gsap.to(o,{left:l,top:-30,duration:r/2,ease:"power1.inOut",onComplete:()=>{gsap.to(o,{top:0,duration:r/2,ease:"power1.inOut",onComplete:()=>{o.dataset.position=t,o.style.left=s[t],o.style.top="0"}})}}),gsap.to(a,{left:c,top:-30,duration:r/2,ease:"power1.inOut",onComplete:()=>{gsap.to(a,{top:0,duration:r/2,ease:"power1.inOut",onComplete:()=>{a.dataset.position=e,a.style.left=s[e],a.style.top="0"}})}})}stopCardShuffle(){this.shuffleTimeline&&(this.shuffleTimeline.kill(),this.shuffleTimeline=null);const e=document.querySelectorAll(".card"),t={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"};e.forEach(n=>{gsap.killTweensOf(n);const i=parseInt(n.dataset.position);n.style.left=t[i],n.style.top="0"})}async flipCards(e){if(this.isSpinning)return;this.isSpinning=!0,this.stopCardShuffle();const t=document.getElementById("spinButton");t.disabled=!0,t.querySelector(".button-text").textContent="FLIPPING...";const n=Array.from(document.querySelectorAll(".card")).sort((a,s)=>parseInt(a.dataset.position)-parseInt(s.dataset.position));n.forEach((a,s)=>{const r=a.querySelector(".card-prize-image");r&&e[s]&&(r.src=e[s].image,r.alt=e[s].name)}),window.soundManager&&typeof window.soundManager.onDrumroll=="function"&&window.soundManager.onDrumroll();const i=this.performanceMode==="performance"?.4:.6,o=this.performanceMode==="performance"?.3:.5;for(let a=0;a<n.length;a++){const s=a===0?1e3:0;await new Promise(r=>{setTimeout(()=>{n[a].classList.add("flipped"),window.soundManager&&window.soundManager.onCardFlip(),setTimeout(r,i*1e3)},a*o*1e3+s)})}return await new Promise(a=>setTimeout(a,300)),n}populateReels(e){if(document.querySelectorAll(".card").length>0){this.initializeCards(e);return}document.querySelectorAll(".reel").forEach((i,o)=>{const a=i.querySelector(".reel-strip");a.innerHTML="",this.createReelItems(e).forEach(r=>a.appendChild(r)),gsap.set(a,{y:-this.reelHeight})}),this.startIdleAnimation()}startIdleAnimation(){this.stopIdleAnimation();const e=Array.from(document.querySelectorAll(".reel .reel-strip"));this.idleTimelines=[];const t=[6,7.5,9];e.forEach((n,i)=>{const o=gsap.timeline({repeat:-1}),s=gsap.getProperty(n,"y")-this.reelHeight*10;o.to(n,{y:s,duration:t[i%t.length],ease:"linear"}),this.idleTimelines.push(o)})}stopIdleAnimation(){this.idleTimelines&&this.idleTimelines.length&&this.idleTimelines.forEach(e=>e.kill()),this.idleTimelines=[]}async spinReels(e,t,n){const i=document.querySelectorAll(".card");if(i.length>0){await this.flipCards(n),this.showPrizePopup(e);const m=document.getElementById("spinButton");m.disabled=!1,m.querySelector(".button-text").textContent="FLIP!",this.isSpinning=!1;const y=document.getElementById("closePopup"),x=()=>{setTimeout(()=>{i.forEach(v=>v.classList.remove("flipped")),this.initializeCards(t)},300),y.removeEventListener("click",x)};y.addEventListener("click",x);return}if(this.isSpinning)return;this.isSpinning=!0,this.stopIdleAnimation(),window.soundManager&&window.soundManager.onSpinStart();const o=Array.from(document.querySelectorAll(".reel .reel-strip")),a=document.getElementById("spinButton");if(a.disabled=!0,a.querySelector(".button-text").textContent="SPINNING...",!this.reelHeight){const m=this.createReelItem(t[0]);document.body.appendChild(m),this.reelHeight=m.offsetHeight,document.body.removeChild(m)}const s=30,r=10;o.forEach((m,y)=>{m.innerHTML="";for(let w=0;w<s;w++){const P=t[Math.floor(Math.random()*t.length)];m.appendChild(this.createReelItem(P))}m.appendChild(this.createReelItem(n[y]));for(let w=0;w<r;w++){const P=t[Math.floor(Math.random()*t.length)];m.appendChild(this.createReelItem(P))}const x=Math.floor(m.parentNode.offsetHeight/this.reelHeight),v=this.reelHeight*Math.floor(x/2)-30;gsap.set(m,{y:-(s*this.reelHeight-v)})});const c=o.map((m,y)=>{const x=s,v=Math.floor(m.parentNode.offsetHeight/this.reelHeight),w=this.reelHeight*Math.floor(v/2)-30;return-(x*this.reelHeight-w)}),l=this.getAnimationSettings(),p=l.spinDuration,h=this.performanceMode==="performance"?10:15,u=this.performanceMode==="performance"?1:1.5,d=this.reelHeight*(this.performanceMode==="performance"?6:10),g=o.map((m,y)=>new Promise(x=>{const v=gsap.timeline({repeat:-1});v.to(m,{y:`-=${d}`,duration:p,ease:l.spinEase}),setTimeout(()=>{v.kill(),gsap.to(m,{y:c[y],duration:l.stopDuration,ease:l.stopEase,onComplete:()=>{window.soundManager&&window.soundManager.onReelStop(),x()}})},y*u*1e3+h*p*1e3)}));for(let m=0;m<g.length;m++)await g[m];setTimeout(()=>{this.showPrizePopup(e)},100),a.disabled=!1,a.querySelector(".button-text").textContent="SPIN!",this.isSpinning=!1,document.getElementById("closePopup").addEventListener("click",()=>{setTimeout(()=>{this.populateReels(t)},400)},{once:!0})}calculateTargetPositions(e,t){const n=[],i=t.length;for(let o=0;o<3;o++){let a=t.findIndex(p=>p.id===e.id);a===-1&&(a=0);const r=(7+Math.floor(Math.random()*2))*i+a,c=this.reelHeight,l=-(r*this.reelHeight-c);n.push(l)}return n}animateReel(e,t,n){return new Promise(i=>{const o=gsap.timeline();o.to(e,{y:t-this.reelHeight*10,duration:n*.7,ease:"power2.in"}),o.to(e,{y:t,duration:n*.3,ease:"power3.out",onComplete:()=>{i()}})})}determinePrizeType(e,t){if(e.isDefault)return"consolation";const n=t.filter(i=>!i.isDefault);return n.sort((i,o)=>i.chance-o.chance),n.length>0&&e.id===n[0].id?"grandPrize":"mediumPrize"}showPrizePopup(e){window.soundManager&&typeof window.soundManager.stopDrumroll=="function"&&window.soundManager.stopDrumroll();const t=document.getElementById("prizePopup"),n=document.getElementById("wonPrizeImage"),i=document.getElementById("wonPrizeName"),o=document.getElementById("prizePopupTitle"),a=t.querySelector(".prize-shield"),s=window.storageManager?window.storageManager.getPrizes():[],r=this.determinePrizeType(e,s);if(r==="consolation")n.style.display="none",i.textContent=e.name,o&&(o.textContent="Better luck next time!"),a&&(a.style.width="",a.style.height="",a.style.display="",a.style.justifyContent="",a.style.alignItems="",a.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`);else{n.style.display="";const l=new Image;l.onload=()=>{n.src=e.image},l.src=e.image,i.textContent=`You won ${e.name}!`}gsap.set(t,{force3D:!0}),gsap.set(t.querySelector(".popup-content"),{force3D:!0}),r==="consolation"?(o&&(o.textContent="Better luck next time!"),a&&(a.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupLose()},100)):r==="grandPrize"?(a&&(a.innerHTML=`<img src="/assets/images/dancing-cat.gif" alt="Dancing Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/dancing-cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupWin()},100)):r==="mediumPrize"&&(o&&(o.textContent="Congratulations!"),a&&(a.innerHTML=`<img src="/assets/images/Happy cat.gif" alt="Happy Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/Happy cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupHappy()},100)),t.classList.remove("hidden");const c=this.getAnimationSettings();c.popupScale?gsap.fromTo(t.querySelector(".popup-content"),{scale:0,rotation:r==="consolation"?10:-10,opacity:0},{scale:1,rotation:0,opacity:1,duration:c.popupDuration,ease:c.popupEase,force3D:!0,onComplete:()=>{r==="consolation"&&this.performanceMode==="high-quality"&&gsap.to(t.querySelector(".popup-content"),{scale:1.02,duration:.3,ease:"power2.inOut",yoyo:!0,repeat:1,force3D:!0})}}):gsap.fromTo(t.querySelector(".popup-content"),{opacity:0},{opacity:1,duration:c.popupDuration,ease:c.popupEase,force3D:!0}),r!=="consolation"&&c.enableConfetti?(console.log(`🎊 Triggering confetti - Prize Type: ${r}, Mode: ${this.performanceMode}, EnableConfetti: ${c.enableConfetti}`),setTimeout(()=>{this.triggerConfetti()},200)):console.log(`🚫 Confetti skipped - Prize Type: ${r}, Mode: ${this.performanceMode}, EnableConfetti: ${c.enableConfetti}`)}triggerConfetti(){const e=this.getAnimationSettings();console.log(`🎊 triggerConfetti() called - Mode: ${this.performanceMode}, EnableConfetti: ${e.enableConfetti}`);const t=e.enableConfetti?1500:0,n=Date.now()+t,i={startVelocity:45,spread:420,ticks:90,zIndex:2e3};if(!e.enableConfetti){console.log("⚡ Confetti disabled in performance mode - RETURNING EARLY");return}console.log("🎊 Confetti enabled - proceeding with animation");const o=setInterval(function(){const a=n-Date.now();if(a<=0)return clearInterval(o);const s=e.confettiAmount*(a/t),r=e.confettiMultiplier||1;confetti(Object.assign({},i,{particleCount:s*r,origin:{x:.35,y:.35}})),confetti(Object.assign({},i,{particleCount:s*r,origin:{x:.65,y:.35}})),confetti(Object.assign({},i,{particleCount:s,origin:{x:.35,y:.55}})),confetti(Object.assign({},i,{particleCount:s,origin:{x:.65,y:.55}}))},e.confettiInterval||150)}closePrizePopup(){const e=document.getElementById("prizePopup");window.soundManager&&window.soundManager.stopCustomSounds(),gsap.set(e.querySelector(".popup-content"),{force3D:!0}),gsap.to(e.querySelector(".popup-content"),{scale:0,rotation:10,opacity:0,duration:.25,ease:"back.in(1.4)",force3D:!0,onComplete:()=>{e.classList.add("hidden"),window.slotMachine&&window.slotMachine.updatePrizeDisplay&&window.slotMachine.updatePrizeDisplay()}})}animatePrizeShowcase(){const e=document.querySelectorAll(".prize-item");gsap.fromTo(e,{y:-50,opacity:0},{y:0,opacity:1,duration:.6,stagger:.1,ease:"back.out(1.7)"})}initializeButtonEffects(){const e=document.getElementById("spinButton");e.addEventListener("mouseenter",()=>{e.disabled||gsap.to(e,{scale:1.05,duration:.2})}),e.addEventListener("mouseleave",()=>{e.disabled||gsap.to(e,{scale:1,duration:.2})})}}window.animationManager=new O;function I(f,e,t=0,n=!1,i=null,o=null){const a=document.getElementById(f);if(!a)return null;const s=n?`inline-winChance-${i}`:"winChance",r=`${s}-slider`,c=`${s}-label`,l=document.createElement("div");l.className="win-chance-slider-container",l.innerHTML=`
        <div class="slider-row">
            <span id="${c}" class="chance-value">${t}%</span>
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
    `,a.appendChild(l);const p=document.getElementById(r),h=document.getElementById(c),u=document.getElementById(e),d=m=>{const y=parseFloat(m),x=y%1===0?y.toString():y.toFixed(1);h.textContent=`${x}%`,u&&(u.value=y,u.dispatchEvent(new Event("input",{bubbles:!0}))),o&&typeof o=="function"&&o(y)},g=m=>{const y=Math.max(0,Math.min(100,parseFloat(m)||0)),x=y%1===0?y.toString():y.toFixed(1);p.value=y,h.textContent=`${x}%`,o&&typeof o=="function"&&o(y)};return p.addEventListener("input",m=>{d(m.target.value)}),u&&(u.addEventListener("input",m=>{g(m.target.value)}),u.addEventListener("blur",m=>{g(m.target.value)})),{slider:p,label:h,setValue:m=>{g(m)},getValue:()=>parseFloat(p.value),destroy:()=>{l.remove()}}}function T(){if(document.getElementById("win-chance-slider-styles"))return;const f=document.createElement("style");f.id="win-chance-slider-styles",f.textContent=`
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
    `,document.head.appendChild(f)}const b=()=>window.storageManager;class j{constructor(){this.currentEditingPrize=null,this.initializeEventListeners()}initializeEventListeners(){var e;document.querySelectorAll(".tab-button").forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))}),document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("prizeName");t&&(t.removeAttribute("pattern"),t.style.userSelect="text",t.style.pointerEvents="auto",t.addEventListener("keydown",n=>{n.keyCode===32&&n.stopPropagation()}))}),document.getElementById("closeAdmin").addEventListener("click",()=>{if(b().getPrizes().reduce((i,o)=>i+o.chance,0)!==100){alert("Total win chance must be exactly 100% before closing the admin panel.");return}this.hide()}),document.getElementById("addPrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.showPrizeEditor()}),document.getElementById("savePrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.savePrize()}),(e=document.getElementById("runProbabilityTest"))==null||e.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.runProbabilityTest()}),document.getElementById("cancelEdit").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.hidePrizeEditor()}),document.getElementById("resetGame").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),confirm("Are you sure you want to reset the game and clear all logs?")&&this.resetGame()}),document.addEventListener("click",t=>{t.target.classList.contains("quantity-btn")&&(window.soundManager&&window.soundManager.onButtonClick(),this.handleQuantityChange(t.target))})}show(){document.getElementById("adminPanel").classList.remove("hidden"),this.refreshContent(),setTimeout(()=>{const e=document.getElementById("prizeName");e&&(e.removeAttribute("pattern"),e.style.userSelect="text",e.style.pointerEvents="auto",e.addEventListener("keydown",t=>{t.keyCode===32&&t.stopPropagation()}),console.log("Prize name input initialized for spaces"))},100)}hide(){document.getElementById("adminPanel").classList.add("hidden"),this.hidePrizeEditor(),this.refreshSlotMachine()}switchTab(e){switch(document.querySelectorAll(".tab-button").forEach(t=>{t.classList.remove("active")}),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll(".tab-content").forEach(t=>{t.classList.remove("active")}),document.getElementById(`${e}Tab`).classList.add("active"),e){case"prizes":this.refreshPrizesList();break;case"settings":this.refreshSettings();break;case"logs":this.refreshLogs();break}}refreshContent(){this.refreshPrizesList(),this.refreshSettings(),this.refreshLogs()}refreshPrizesList(){const e=document.getElementById("prizesList"),t=b().getPrizes();e.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="prize-card",i.setAttribute("data-prize-id",n.id),i.innerHTML=`
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
            `,e.appendChild(i)})}showPrizeEditor(e=null){const t=document.getElementById("prizeEditor"),n=document.getElementById("editorTitle");function i(u,d){const g=document.getElementById(u);if(g){let m=document.getElementById(u+"-label");m||(m=document.createElement("label"),m.id=u+"-label",m.htmlFor=u,m.textContent=d,m.style.display="block",m.style.fontWeight="bold",m.style.margin="8px 0 2px 0",g.parentNode.insertBefore(m,g))}}i("prizeName","Prize Name"),i("prizeImage","Prize Image URL"),i("prizeQuantity","Quantity"),i("prizeChance","Win Chance (%)");const o=document.getElementById("prizeQuantity");let a=document.getElementById("unlimited-checkbox-container");if(!a){a=document.createElement("div"),a.id="unlimited-checkbox-container",a.style.display="block",a.style.marginTop="12px",a.style.marginBottom="12px",a.style.padding="10px",a.style.backgroundColor="#fff3cd",a.style.borderRadius="4px",a.style.border="1px solid #ffc107",o.nextSibling?o.parentNode.insertBefore(a,o.nextSibling):o.parentNode.appendChild(a);const u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.marginBottom="4px";const d=document.createElement("input");d.type="checkbox",d.id="unlimitedConsolation",d.style.marginRight="8px",d.style.width="18px",d.style.height="18px",d.style.cursor="pointer",d.style.flexShrink="0";const g=document.createElement("label");g.id="unlimitedConsolation-label",g.htmlFor="unlimitedConsolation",g.textContent="Unlimited consolation (quantity never decreases)",g.style.cursor="pointer",g.style.userSelect="none",g.style.margin="0",g.style.fontWeight="bold",g.style.color="#000",u.appendChild(d),u.appendChild(g);const m=document.createElement("div");m.id="unlimited-hint",m.style.fontSize="12px",m.style.color="#856404",m.style.marginTop="4px",m.textContent="Note: Only applies to the prize with the highest win chance (consolation prize)",a.appendChild(u),a.appendChild(m)}const s=b().getPrizes();let r=!1;if(e){const u=[...s].sort((d,g)=>g.chance-d.chance);r=u.length>0&&u[0].id===e.id,console.log("Editing prize:",e.name,"Is highest chance:",r,"Chance:",e.chance)}else r=!1,console.log("Adding new prize, checkbox disabled by default");const c=document.getElementById("unlimitedConsolation"),l=document.getElementById("unlimited-hint");if(c&&(c.disabled=!r,r?(l.textContent="✓ This is the consolation prize (highest win chance)",l.style.color="#155724",a.style.backgroundColor="#d4edda",a.style.borderColor="#28a745"):(l.textContent="ⓘ This option only applies to the prize with the highest win chance",l.style.color="#856404",a.style.backgroundColor="#fff3cd",a.style.borderColor="#ffc107")),a.style.display="block",T(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),d=document.createElement("div");d.id="winChanceSliderContainer",u.parentNode.insertBefore(d,u.nextSibling),this.winChanceSlider=I("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(this.createImageSourceSelector(),T(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),d=document.createElement("div");d.id="winChanceSliderContainer",u.parentNode.insertBefore(d,u.nextSibling),this.winChanceSlider=I("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(e){this.currentEditingPrize=e,n.textContent="Edit Prize",document.getElementById("prizeName").value=e.name,document.getElementById("prizeImage").value=e.image||"",document.getElementById("prizeQuantity").value=e.quantity,document.getElementById("prizeChance").value=e.chance;const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!!e.unlimitedConsolation),this.updateImageSourceSelector(e.image)}else{this.currentEditingPrize=null,n.textContent="Add New Prize",document.getElementById("prizeName").value="",document.getElementById("prizeImage").value="",document.getElementById("prizeQuantity").value="",document.getElementById("prizeChance").value="";const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!1),this.updateImageSourceSelector("")}let p=document.getElementById("chanceMessage");p||(p=document.createElement("div"),p.id="chanceMessage",p.style.margin="10px 0",p.style.fontWeight="bold",p.style.color="#e74c3c",t.appendChild(p)),e?(this.winChanceSlider&&this.winChanceSlider.setValue(e.chance),this.updateChanceMessage()):this.winChanceSlider&&this.winChanceSlider.setValue(0),this.updateChanceMessage();const h=document.getElementById("prizeChance");h.hasAttribute("data-listener-added")||(h.addEventListener("input",()=>{this.updateChanceMessage()}),h.setAttribute("data-listener-added","true")),this.updateDefaultPrizeLabel(),t.classList.remove("hidden")}updateDefaultPrizeLabel(){const e=b().getPrizes(),t=document.getElementById("prizeEditor");let n=document.getElementById("defaultPrizeLabel");if(n||(n=document.createElement("div"),n.id="defaultPrizeLabel",n.style.margin="10px 0",n.style.fontWeight="bold",n.style.color="#FFD700",n.style.fontSize="1.1em",t.appendChild(n)),e.length===0)n.textContent="No prizes yet - add your first prize!";else{const i=e.reduce((o,a)=>a.chance>o.chance?a:o);n.textContent=`Default Prize: ${i.name} (${i.chance}%)`}}updateChanceMessage(){const e=document.getElementById("prizeChance"),t=parseFloat(e.value)||0,n=b().getPrizes();let i=0;this.currentEditingPrize?i=n.reduce((a,s)=>a+(s.id===this.currentEditingPrize.id?t:s.chance),0):i=n.reduce((a,s)=>a+s.chance,0)+t;let o=document.getElementById("chanceMessage");if(!o){const a=document.getElementById("prizeEditor");o=document.createElement("div"),o.id="chanceMessage",o.style.margin="10px 0",o.style.fontWeight="bold",o.style.color="#e74c3c",a.appendChild(o)}if(i<100)o.textContent=`Total win chance: ${i.toFixed(1)}%. ${(100-i).toFixed(1)}% left to allocate.`,o.style.color="#e67e22",this.hideAutoAdjustWarning();else if(i>100){const a=i-100;o.textContent=`Total win chance: ${i.toFixed(1)}%. Exceeded by ${a.toFixed(1)}%.`,o.style.color="#e74c3c",this.showAutoAdjustWarning(a)}else o.textContent="Total win chance: 100%. Ready to save!",o.style.color="#27ae60",this.hideAutoAdjustWarning()}showAutoAdjustWarning(e){let t=document.getElementById("autoAdjustWarning");if(!t){t=document.createElement("div"),t.id="autoAdjustWarning",t.style.cssText=`
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
            `;const a=document.getElementById("chanceMessage");a&&a.parentNode?a.parentNode.insertBefore(t,a.nextSibling):document.getElementById("prizeEditor").appendChild(t)}const n=b().getPrizes();let i=null,o=0;for(const a of n)this.currentEditingPrize&&a.id===this.currentEditingPrize.id||a.chance>o&&(o=a.chance,i=a);if(i){const a=Math.max(.1,o-e);t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${e.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${i.name}"</strong> will be reduced from ${o}% to ${a.toFixed(1)}%
            `}else t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;t.style.display="block",t.style.visibility="visible",t.style.opacity="1"}hideAutoAdjustWarning(){const e=document.getElementById("autoAdjustWarning");e&&(e.style.display="none")}hidePrizeEditor(){document.getElementById("prizeEditor").classList.add("hidden"),this.currentEditingPrize=null}createImageSourceSelector(){if(document.getElementById("imageSourceSelector"))return;const e=document.getElementById("prizeImage"),t=e.parentNode,n=document.createElement("div");n.id="imageSourceSelector",n.className="image-source-selector";const i=document.createElement("label");i.textContent="Image Source",i.style.display="block",i.style.fontWeight="bold",i.style.margin="8px 0 5px 0";const o=document.createElement("div");o.className="image-source-option",o.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="url" checked>
                <span>Use URL</span>
            </label>
        `;const a=document.createElement("div");a.className="image-source-option",a.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="asset">
                <span>Choose from Assets</span>
            </label>
        `;const s=document.createElement("div");s.id="assetGallery",s.className="asset-gallery hidden",C.filter(l=>l.path&&l.path.includes("/prizes/")).forEach(l=>{const p=document.createElement("div");p.className="asset-item",p.dataset.assetId=l.id,p.dataset.assetPath=l.path;const h=M(l.filename);p.innerHTML=`
                <img src="${h}" alt="${l.name}" title="${l.description}" onerror="this.style.display='none';">
                <span>${l.name}</span>
            `,p.addEventListener("click",()=>{this.selectAsset(l)}),s.appendChild(p)});const r=document.createElement("div");r.id="imagePreview",r.className="image-preview",r.innerHTML=`
            <label>Preview:</label>
            <div class="preview-content">
                <img id="previewImage" src="" alt="No image selected" style="display: none;">
                <span id="previewText">No image selected</span>
            </div>
        `,[o,a].forEach(l=>{const p=l.querySelector('input[type="radio"]');p.addEventListener("change",()=>{this.handleImageSourceChange(p.value)})}),e.addEventListener("input",()=>{this.updateImagePreview(e.value)}),t.insertBefore(i,e),t.insertBefore(n,e),n.appendChild(o),n.appendChild(a),n.appendChild(s),t.insertBefore(r,e.nextSibling)}updateImageSourceSelector(e){const t=document.querySelector('input[name="imageSource"][value="url"]'),n=document.querySelector('input[name="imageSource"][value="asset"]');if(C.some(o=>{const a=M(o.filename);return e===a||e===o.path||e.includes(o.filename)})){n.checked=!0,this.handleImageSourceChange("asset");const o=C.find(a=>{const s=M(a.filename);return e===s||e===a.path||e.includes(a.filename)});o&&this.highlightSelectedAsset(o.id)}else t.checked=!0,this.handleImageSourceChange("url");this.updateImagePreview(e)}handleImageSourceChange(e){const t=document.getElementById("prizeImage"),n=document.getElementById("assetGallery");e==="asset"?(t.style.display="none",n.classList.remove("hidden")):(t.style.display="block",n.classList.add("hidden"),this.clearAssetSelection())}selectAsset(e){const t=document.getElementById("prizeImage"),n=M(e.filename);t.value=n,this.highlightSelectedAsset(e.id),this.updateImagePreview(n)}highlightSelectedAsset(e){document.querySelectorAll(".asset-item").forEach(n=>{n.classList.remove("selected")});const t=document.querySelector(`[data-asset-id="${e}"]`);t&&t.classList.add("selected")}clearAssetSelection(){document.querySelectorAll(".asset-item").forEach(e=>{e.classList.remove("selected")})}updateImagePreview(e){const t=document.getElementById("previewImage"),n=document.getElementById("previewText");e&&e.trim()?(t.src=e,t.style.display="block",n.style.display="none",t.onerror=()=>{t.style.display="none",t.alt="Image not found"}):(t.style.display="none",n.style.display="block",n.textContent="No image selected")}savePrize(){var l;const e=document.getElementById("prizeName").value.trim(),t=document.getElementById("prizeImage").value.trim(),n=parseInt(document.getElementById("prizeQuantity").value),i=parseFloat(document.getElementById("prizeChance").value),o=((l=document.getElementById("unlimitedConsolation"))==null?void 0:l.checked)||!1;let a=document.getElementById("chanceMessage");if(!e||!t||n<0||i<0||i>100){a.textContent="Please fill all fields with valid values.",a.style.color="#e74c3c";return}const s=b().getPrizes();let r=0;if(this.currentEditingPrize?r=s.reduce((p,h)=>p+(h.id===this.currentEditingPrize.id?i:h.chance),0):r=s.reduce((p,h)=>p+h.chance,0)+i,r>100){const p=r-100;let h=null,u=0;for(const d of s)this.currentEditingPrize&&d.id===this.currentEditingPrize.id||d.chance>u&&(u=d.chance,h=d);if(h){const d=Math.max(.1,u-p),g={...h,chance:d};b().updatePrize(g)}}else if(r<100){const p=100-r;let h=null,u=0;for(const d of s)this.currentEditingPrize&&d.id===this.currentEditingPrize.id||d.chance>u&&(u=d.chance,h=d);if(h){const d=Math.min(100,u+p),g={...h,chance:d};b().updatePrize(g)}}a.textContent="Prize saved successfully!",a.style.color="#27ae60";const c={name:e,image:t,quantity:n,chance:i,unlimitedConsolation:o};this.currentEditingPrize?(c.id=this.currentEditingPrize.id,b().updatePrize(c)):b().addPrize(c),this.hideAutoAdjustWarning(),this.updateDefaultPrizeLabel(),this.hidePrizeEditor(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}editPrize(e){this.closeAllInlineEditors();const n=b().getPrizes().find(i=>i.id===e);n&&this.showInlineEditor(n,e)}closeAllInlineEditors(){this.inlineSliders&&(this.inlineSliders.forEach((n,i)=>{n&&n.destroy&&n.destroy()}),this.inlineSliders.clear()),document.querySelectorAll(".inline-prize-editor").forEach(n=>n.remove()),document.querySelectorAll(".prize-card").forEach(n=>n.style.display="flex")}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`);if(t){const n=parseFloat(t.value)||0,i=b().getPrizes(),o=i.find(r=>r.id===parseInt(e));let a=0;o&&(a=i.reduce((r,c)=>r+(c.id===o.id?n:c.chance),0));let s=document.getElementById(`inline-chance-indicator-${e}`);s||(s=document.createElement("span"),s.id=`inline-chance-indicator-${e}`,s.style.cssText=`
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: bold;
                `,t.parentNode.appendChild(s)),a>100?(s.textContent=`⚠️ Total: ${a.toFixed(1)}%`,s.style.color="#e74c3c"):a===100?(s.textContent="✓ Total: 100%",s.style.color="#27ae60"):(s.textContent=`Total: ${a.toFixed(1)}%`,s.style.color="#3498db")}}showInlineEditor(e,t){this.closeAllInlineEditors();const n=document.querySelector(`.prize-card[data-prize-id="${t}"]`);if(!n){console.error("Target card not found for prize ID:",t);return}console.log("Found target card:",n),console.log("Parent node:",n.parentNode),console.log("Next sibling:",n.nextSibling);const i=document.createElement("div");i.className="inline-prize-editor",i.id=`inline-editor-${t}`,i.innerHTML=`
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
        `,console.log("Inserting inline editor after target card"),n.parentNode.insertBefore(i,n.nextSibling),console.log("Inline editor inserted at:",i.offsetTop),this.setupInlineEditorEvents(t,e.image),setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"center"})},100)}generateAssetGalleryHTML(e){return C.map(t=>{const n=M(t.filename);return`
                <div class="asset-item" data-asset-id="${t.id}" data-asset-path="${t.path}" data-prize-id="${e}">
                    <img src="${n}" alt="${t.name}" title="${t.description}">
                    <span>${t.name}</span>
                </div>
            `}).join("")}setupInlineEditorEvents(e,t){T();const n=document.getElementById(`inline-prizeChance-${e}`).value,i=I(`inline-winChanceSliderContainer-${e}`,`inline-prizeChance-${e}`,parseFloat(n)||0,!0,e,()=>this.updateInlineChanceMessage&&this.updateInlineChanceMessage(e));this.inlineSliders||(this.inlineSliders=new Map),this.inlineSliders.set(e,i);const o=document.getElementById(`inline-prizeImage-${e}`);document.getElementById(`inline-previewImage-${e}`),document.getElementById(`inline-previewText-${e}`),o.addEventListener("input",()=>{this.updateInlineImagePreview(e,o.value.trim())}),document.querySelectorAll(`input[name="inline-imageSource-${e}"]`).forEach(g=>{g.addEventListener("change",()=>{this.handleInlineImageSourceChange(e,g.value)})}),document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(g=>{g.addEventListener("click",()=>{const m=g.dataset.assetId,y=C.find(x=>x.id===m);y&&this.selectInlineAsset(e,y)})}),this.updateInlineImageSourceState(e,t);const r=b().getPrizes(),c=[...r].sort((g,m)=>m.chance-g.chance),l=c.length>0&&c[0].id===e,p=document.getElementById(`inline-unlimitedConsolation-${e}`),h=document.getElementById(`inline-unlimited-hint-${e}`),u=document.getElementById(`inline-unlimited-checkbox-container-${e}`);if(p&&h&&u){const g=r.find(m=>m.id===e);p.checked=!!(g&&g.unlimitedConsolation),p.disabled=!l,l?(h.textContent="✓ This is the consolation prize (highest win chance)",h.style.color="#155724",u.style.backgroundColor="#d4edda",u.style.borderColor="#28a745"):(h.textContent="ⓘ This option only applies to the prize with the highest win chance",h.style.color="#856404",u.style.backgroundColor="#fff3cd",u.style.borderColor="#ffc107")}document.getElementById(`inline-prizeChance-${e}`).addEventListener("input",()=>{this.updateInlineChanceMessage(e)}),this.updateInlineChanceMessage(e)}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`),n=parseFloat(t.value)||0,o=b().getPrizes().reduce((s,r)=>s+(r.id===e?n:r.chance),0);let a=document.getElementById(`inline-chanceMessage-${e}`);if(a)if(o<100)a.textContent=`Total win chance: ${o.toFixed(1)}%. ${(100-o).toFixed(1)}% left to allocate.`,a.style.color="#e67e22",this.hideInlineAutoAdjustWarning(e);else if(o>100){const s=o-100;a.textContent=`Total win chance: ${o.toFixed(1)}%. Exceeded by ${s.toFixed(1)}%.`,a.style.color="#e74c3c",this.showInlineAutoAdjustWarning(e,s)}else a.textContent="Total win chance: 100%. Ready to save!",a.style.color="#27ae60",this.hideInlineAutoAdjustWarning(e)}showInlineAutoAdjustWarning(e,t){let n=document.getElementById(`inline-autoAdjustWarning-${e}`);if(!n){n=document.createElement("div"),n.id=`inline-autoAdjustWarning-${e}`,n.style.cssText=`
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
            `;const s=document.getElementById(`inline-chanceMessage-${e}`);s&&s.parentNode&&s.parentNode.insertBefore(n,s.nextSibling)}const i=b().getPrizes();let o=null,a=0;for(const s of i)s.id!==e&&s.chance>a&&(a=s.chance,o=s);if(o){const s=Math.max(.1,a-t);n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${t.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${o.name}"</strong> will be reduced from ${a}% to ${s.toFixed(1)}%
            `}else n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;n.style.display="block",n.style.visibility="visible",n.style.opacity="1"}hideInlineAutoAdjustWarning(e){const t=document.getElementById(`inline-autoAdjustWarning-${e}`);t&&(t.style.display="none")}handleInlineImageSourceChange(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),i=document.getElementById(`inline-assetGallery-${e}`);t==="asset"?(n.style.display="none",i.classList.remove("hidden")):(n.style.display="block",i.classList.add("hidden"),this.clearInlineAssetSelection(e))}selectInlineAsset(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),i=M(t.filename);n.value=i,this.highlightInlineSelectedAsset(e,t.id),this.updateInlineImagePreview(e,i)}highlightInlineSelectedAsset(e,t){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(o=>{o.classList.remove("selected")});const i=document.querySelector(`[data-asset-id="${t}"][data-prize-id="${e}"]`);i&&i.classList.add("selected")}clearInlineAssetSelection(e){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(n=>{n.classList.remove("selected")})}updateInlineImagePreview(e,t){const n=document.getElementById(`inline-previewImage-${e}`),i=document.getElementById(`inline-previewText-${e}`);t&&t.trim()?(n.src=t,n.style.display="block",i.style.display="none",n.onerror=()=>{n.style.display="none",n.alt="Image not found"}):(n.style.display="none",i.style.display="block")}updateInlineImageSourceState(e,t){const n=document.querySelector(`input[name="inline-imageSource-${e}"][value="url"]`),i=document.querySelector(`input[name="inline-imageSource-${e}"][value="asset"]`);if(C.some(a=>{const s=M(a.filename);return t===s||t===a.path})&&t){i.checked=!0;const a=C.find(s=>{const r=M(s.filename);return t===r||t===s.path});a&&(this.handleInlineImageSourceChange(e,"asset"),this.highlightInlineSelectedAsset(e,a.id))}else n.checked=!0,this.handleInlineImageSourceChange(e,"url")}saveInlineEdit(e){var l;const t=document.getElementById(`inline-prizeName-${e}`).value.trim(),n=document.getElementById(`inline-prizeImage-${e}`).value.trim(),i=parseInt(document.getElementById(`inline-prizeQuantity-${e}`).value),o=parseFloat(document.getElementById(`inline-prizeChance-${e}`).value),a=((l=document.getElementById(`inline-unlimitedConsolation-${e}`))==null?void 0:l.checked)||!1;if(!t){alert("Prize name is required");return}if(isNaN(i)||i<0){alert("Please enter a valid quantity (0 or more)");return}if(isNaN(o)||o<0||o>100){alert("Please enter a valid win chance between 0 and 100");return}const s={id:e,name:t,image:n,quantity:i,chance:o,unlimitedConsolation:a},r=b().getPrizes(),c=r.reduce((p,h)=>p+(h.id===e?o:h.chance),0);if(c!==100){if(c>100){const p=c-100;let h=null,u=0;for(const d of r)d.id!==e&&d.chance>u&&(u=d.chance,h=d);if(h){const d=Math.max(.1,u-p),g={...h,chance:d};b().updatePrize(g)}}else if(c<100){const p=100-c;let h=null,u=0;for(const d of r)d.id!==e&&d.chance>u&&(u=d.chance,h=d);if(h){const d=Math.min(100,u+p),g={...h,chance:d};b().updatePrize(g)}}}b().updatePrize(s);{this.closeAllInlineEditors(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels());const p=document.createElement("div");p.textContent="Prize updated successfully!",p.style.cssText=`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                font-weight: bold;
            `,document.body.appendChild(p),setTimeout(()=>{p.remove()},3e3)}}deletePrize(e){if(confirm("Are you sure you want to delete this prize?")){const n=b().getPrizes().find(a=>a.id===e);if(!n)return;const i=n.chance;b().deletePrize(e);const o=b().getPrizes();if(o.length>0&&i>0){const a=o.reduce((c,l)=>l.chance>c.chance?l:c),s={...a,chance:Math.min(100,a.chance+i)};b().updatePrize(s);const r=document.createElement("div");r.textContent=`Prize deleted. ${i}% redistributed to "${a.name}" (now ${s.chance}%)`,r.style.cssText=`
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
                `,document.body.appendChild(r),setTimeout(()=>{r.remove()},4e3)}this.refreshPrizesList(),this.updateDefaultPrizeLabel(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}}refreshSettings(){}runProbabilityTest(){const e=parseInt(document.getElementById("testIterations").value)||1e3,t=document.getElementById("probabilityTestResults");t.style.display="block",t.textContent=`⏳ Running ${e} test spins...

Please wait...`,setTimeout(()=>{try{const n=JSON.stringify(b().getPrizes()),i=b().getPrizes(),o={},a={},s=[];i.forEach(d=>{o[d.name]=0,a[d.name]=d.quantity});let r=0;for(let d=0;d<e;d++){const m=b().getPrizes().filter(w=>w.quantity>0||w.unlimitedConsolation);if(m.length===0)break;const y=m.reduce((w,P)=>w+P.chance,0);let x=Math.random()*y;s.push(x);let v=0;for(const w of m)if(v+=w.chance,x<=v){if(o[w.name]++,!w.unlimitedConsolation){const P={...w,quantity:w.quantity-1};b().updatePrize(P)}break}r++}const c=b().getPrizes();let l=`📊 Final Results after ${r} spins:
`;l+=`${"─".repeat(105)}
`,l+=`${"Prize".padEnd(20)} ${"Wins".padStart(8)} ${"Actual %".padStart(12)} ${"Expected %".padStart(14)} ${"Original Qty".padStart(14)} ${"Remaining".padStart(12)} ${"Status".padStart(15)}
`,l+=`${"─".repeat(105)}
`,i.sort((d,g)=>d.chance-g.chance).forEach(d=>{var A;const g=o[d.name]||0,m=(g/r*100).toFixed(2),y=d.chance.toFixed(2),x=((A=c.find(D=>D.id===d.id))==null?void 0:A.quantity)||0,v=a[d.name];let w="";d.unlimitedConsolation?w="♾️  UNLIMITED":x>0?w="✅ AVAILABLE":w="❌ EXHAUSTED";let P=d.name.length>18?d.name.substring(0,18)+"..":d.name;l+=`${P.padEnd(20)} `,l+=`${g.toString().padStart(8)} `,l+=`${(m+"%").padStart(12)} `,l+=`${(y+"%").padStart(14)} `,l+=`${v.toString().padStart(14)} `,l+=`${x.toString().padStart(12)} `,l+=`${w.padStart(15)}
`}),l+=`${"─".repeat(105)}

`;const h=Object.values(o).reduce((d,g)=>d+g,0),u=c.filter(d=>d.quantity>0||d.unlimitedConsolation).length;l+=`� SUMMARY:
`,l+=`   • Total spins completed: ${r} / ${e}
`,l+=`   • Total prizes won: ${h}
`,l+=`   • Prizes still available: ${u}

`,l+=`💡 NOTE: Quantities were modified during this test.
`,l+=`   Use "Reset Game & Clear Logs" to restore original values.
`,t.textContent=l}catch(n){t.textContent=`❌ Error running test:
${n.message}`}t.scrollIntoView({behavior:"smooth",block:"nearest"})},100)}resetGame(){b().resetAll(),this.refreshContent(),window.slotMachine&&window.slotMachine.initialize(),alert("Game has been reset successfully!")}refreshLogs(){const e=document.getElementById("spinLogs"),t=b().getLogs();if(e.innerHTML="",t.length===0){e.innerHTML="<p>No spins recorded yet.</p>";return}t.forEach((n,i)=>{const o=document.createElement("div");o.className="log-entry";const a=new Date(n.timestamp).toLocaleString(),s=t.length-i,r=n.randomValue!==void 0?`<br>Random: ${n.randomValue.toFixed(3)}`:"",c=n.totalChance!==void 0?`<br>Total Chance: ${n.totalChance.toFixed(1)}%`:"";o.innerHTML=`
                <strong>${a}</strong><br>
                Spin #${s}<br>
                Prize: ${n.prizeName}${r}${c}
                ${n.gameMode==="duration"?`<br>Remaining in deck: ${n.remainingInDeck}`:""}
            `,e.appendChild(o)})}refreshSlotMachine(){window.slotMachine&&window.slotMachine.populateReels()}handleQuantityChange(e){const t=e.dataset.target,n=document.getElementById(t);if(!n)return;let i=parseInt(n.value)||0;e.classList.contains("plus-btn")?i++:i=Math.max(0,i-1),n.value=i,n.dispatchEvent(new Event("input",{bubbles:!0}))}}function U(){const f=document.getElementById("adminConfirmModal"),e=document.getElementById("adminConfirmYes"),t=document.getElementById("adminConfirmNo");f.classList.remove("hidden");function n(){f.classList.add("hidden"),adminPanel.show(),o()}function i(){f.classList.add("hidden"),o()}function o(){e.removeEventListener("click",n),t.removeEventListener("click",i)}e.addEventListener("click",n),t.addEventListener("click",i),e.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()}),t.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()})}window.showAdminLogin=U;window.adminPanel=new j;class W{constructor(){this.cachedPrizes=null,this.cachedAvailablePrizes=null,this.cachedTotalChance=null,this.lastPrizeUpdate=0,this.preloadedAssets=null,this.initialize(),this.setupEventListeners()}onAssetsLoaded(e){this.preloadedAssets=e,console.log("✅ Slot machine received preloaded assets:",e.size),this.updatePrizeDisplay(),this.populateReels(),this.optimizeImageLoading()}optimizeImageLoading(){document.querySelectorAll("img").forEach(t=>{const n=this.getPreloadedImage(t.src);n&&(t.src=n.src,t.style.opacity="1",t.style.transition="opacity 0.3s ease")})}getPreloadedImage(e){if(!this.preloadedAssets)return null;for(let[t,n]of this.preloadedAssets)if(t===e||t.includes(e)||e.includes(t))return n.element;return null}initialize(){this.updatePrizeDisplay(),this.populateReels(),this.initializeAnimations(),setTimeout(()=>{window.soundManager&&window.soundManager.onBackgroundStart()},2e3)}setupEventListeners(){let e=!1;document.getElementById("spinButton").addEventListener("click",()=>{e||animationManager.isSpinning||(e=!0,setTimeout(()=>e=!1,300),window.soundManager&&window.soundManager.onButtonClick(),this.spin())}),document.getElementById("closePopup").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),animationManager.closePrizePopup()});let t=!1;document.addEventListener("keydown",n=>{const i=document.getElementById("prizePopup"),o=document.getElementById("spinButton"),a=i&&!i.classList.contains("hidden"),s=o&&o.disabled;(n.key==="Enter"||n.key===" ")&&!t&&!animationManager.isSpinning&&!a&&!s&&(n.preventDefault(),t=!0,setTimeout(()=>t=!1,300),this.spin())})}updatePrizeDisplay(){const e=document.getElementById("prizeList"),t=storageManager.getPrizes(),n=Date.now();if(this.cachedPrizes&&JSON.stringify(this.cachedPrizes)===JSON.stringify(t)&&n-this.lastPrizeUpdate<100)return;this.cachedPrizes=[...t],this.lastPrizeUpdate=n,this.clearPrizeCache();const i=document.createDocumentFragment(),o=t.reduce((a,s)=>s.chance>a.chance?s:a,t[0]||{chance:0});t.filter(a=>a.id!==o.id).forEach(a=>{const s=document.createElement("div");s.className="prize-item",a.quantity===0&&s.classList.add("out-of-stock"),s.innerHTML=`
                <img src="${a.image}" alt="${a.name}" onerror="this.onerror=null; this.style.display='none';">
                <span>${a.name}</span>
                ${a.quantity===0?'<div class="out-of-stock-overlay"><div class="x-mark">X</div></div>':""}
            `,i.appendChild(s)}),e.innerHTML="",e.appendChild(i),setTimeout(()=>{animationManager.animatePrizeShowcase()},100)}clearPrizeCache(){this.cachedAvailablePrizes=null,this.cachedTotalChance=null}getAvailablePrizes(e){return this.cachedAvailablePrizes||(this.cachedAvailablePrizes=e.filter(t=>t.quantity>0||t.unlimitedConsolation),this.cachedTotalChance=this.cachedAvailablePrizes.reduce((t,n)=>t+n.chance,0)),{prizes:this.cachedAvailablePrizes,totalChance:this.cachedTotalChance}}populateReels(){const e=storageManager.getPrizes();animationManager.populateReels(e)}initializeAnimations(){animationManager.initializeButtonEffects()}spin(){if(animationManager.isSpinning)return;this.clearPrizeCache();const e=storageManager.getPrizes();if(e.length===0){alert("No prizes available! Please add some prizes in the admin panel.");return}const{prize:t,randomValue:n}=this.determineWinningPrize(e);if(!t){alert("No more prizes available!");return}this.lastRandomValue=n;let i=[],o=t;const a=e.reduce((s,r)=>r.chance>s.chance?r:s,e[0]||{chance:0});if(t.id===a.id){const s=e.filter(r=>r.id!==a.id);if(s.length===0)i=[a,a,a];else{const r=Math.floor(Math.random()*s.length);let c=Math.floor(Math.random()*s.length),l=Math.floor(Math.random()*s.length);if(Math.random()<.5)c=r;else for(;c===r&&s.length>1;)c=Math.floor(Math.random()*s.length);for(;(l===r||l===c)&&s.length>1;)l=Math.floor(Math.random()*s.length);i=[s[r],s[c],s[l]]}i[0].id===i[1].id&&i[1].id===i[2].id?o=i[0]:o=a}else i=[t,t,t],o=t;o={...o,isDefault:o.id===a.id},this.logSpin(o),animationManager.spinReels(o,e,i)}determineWinningPrize(e){return this.selectPrizeByProbability(e)}selectPrizeByProbability(e){const{prizes:t,totalChance:n}=this.getAvailablePrizes(e);if(this.lastTotalChance=n,t.length===0)return console.log("❌ No prizes available - all quantities exhausted!"),{prize:null,randomValue:0};if(n===0)return{prize:t[Math.floor(Math.random()*t.length)],randomValue:0};let i=Math.random()*n;console.log("🎲 Spin - Available prizes:",t.length,"Total chance:",n),console.log("   Random value:",i.toFixed(3)),console.log("   📋 Prize pool breakdown:");let o=null,a=0;for(const s of t){const r=a;a+=s.chance;const c=a,l=s.unlimitedConsolation?" [UNLIMITED]":"",p=(s.chance/n*100).toFixed(2);if(console.log(`      ${s.name}: Range ${r.toFixed(1)}-${c.toFixed(1)} | Chance: ${s.chance}% of ${n} = ${p}% actual | Qty: ${s.quantity}${l}`),i<=a&&!o){if(o=s,console.log(`   ✅ Selected: ${s.name} (random ${i.toFixed(3)} fell in range ${r.toFixed(1)}-${c.toFixed(1)})`),s.unlimitedConsolation)console.log(`   ♾️ ${s.name} is unlimited - quantity remains at ${s.quantity}`);else{const h={...s,quantity:s.quantity-1};storageManager.updatePrize(h),console.log(`   📦 ${s.name} quantity: ${s.quantity} → ${h.quantity}`),h.quantity===0&&console.log(`   🚫 ${s.name} is now exhausted and will be removed from future spins!`),this.clearPrizeCache()}break}}return o||(o=t[t.length-1],console.log("⚠️ Fallback selected:",o.name)),{prize:o,randomValue:i}}testProbabilityAccuracy(e=100){console.log(`
🧪 Testing quantity-based probability system with ${e} iterations...`);const t=storageManager.getPrizes(),n={},i={};t.forEach(c=>{n[c.name]=0,i[c.name]=c.quantity}),console.log(`
📦 Starting quantities:`),t.forEach(c=>{const l=c.unlimitedConsolation?" [UNLIMITED ♾️]":"";console.log(`  ${c.name}: ${c.quantity} (${c.chance}%)${l}`)});let o=0;for(let c=0;c<e;c++){const l=storageManager.getPrizes();if(l.filter(u=>u.quantity>0||u.unlimitedConsolation).length===0){console.log(`
🏁 All prizes exhausted after ${c} spins!`);break}const{prize:h}=this.selectPrizeByProbability(l);h&&(n[h.name]++,o++)}console.log(`
📊 Final Results after `+o+" spins:"),console.log("Prize			Wins	Actual %	Expected %	Original Qty	Remaining	Status"),console.log("─".repeat(95));const a=storageManager.getPrizes();Object.keys(n).sort((c,l)=>{const p=t.find(u=>u.name===c),h=t.find(u=>u.name===l);return((p==null?void 0:p.chance)||0)-((h==null?void 0:h.chance)||0)}).forEach(c=>{const l=a.find(x=>x.name===c),p=n[c],h=(p/o*100).toFixed(2),u=l?l.chance.toFixed(2):"0.00",d=i[c],g=l?l.quantity:0,y=l&&l.unlimitedConsolation?"♾️ UNLIMITED":g===0?"❌ EXHAUSTED":"✅ AVAILABLE";console.log(`${c.padEnd(20)}	${p}	${h}%		${u}%		${d}		${g}		${y}`)});const r=Object.values(n).reduce((c,l)=>c+l,0);console.log(`
📈 Summary:`),console.log(`  Total spins completed: ${o} / ${e}`),console.log(`  Total prizes won: ${r}`),console.log(`  Prizes still available: ${a.filter(c=>c.quantity>0||c.unlimitedConsolation).length}`),console.log(`
✅ Test completed. Quantities decreased as prizes were won (except unlimited).`),console.log("💡 Reset the game to restore original quantities.")}logSpin(e){const t={prizeName:e.name,gameMode:"Probability",randomValue:this.lastRandomValue||0,totalChance:this.lastTotalChance||0};storageManager.addLog(t)}}document.addEventListener("DOMContentLoaded",()=>{window.slotMachine=new W,window.testProbability=(f=1e3)=>{window.slotMachine.testProbabilityAccuracy(f)},console.log("🎰 Slot Machine loaded! Test probability with: testProbability(1000)")});class L{constructor(){this.isExpanded=!1,this.button=null,this.icon=null}initialize(){var e;this.button=document.getElementById("expandButton"),this.icon=(e=this.button)==null?void 0:e.querySelector(".expand-icon"),this.button&&this.button.addEventListener("click",()=>this.toggleExpand())}toggleExpand(){this.isExpanded=!this.isExpanded,this.isExpanded?(document.body.classList.add("expanded-mode"),this.button.title="Collapse to normal size",this.icon.textContent="⛶"):(document.body.classList.remove("expanded-mode"),this.button.title="Expand to full screen",this.icon.textContent="⛶")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.expandButtonManager=new L,window.expandButtonManager.initialize()}):(window.expandButtonManager=new L,window.expandButtonManager.initialize());class G{constructor(){this.mode=this.getStoredMode()||null,this.listeners=[],this.initialized=!1,this.configs={"high-quality":{name:"High Quality Mode",description:`Full visual effects and smooth animations
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
        `,document.head.appendChild(e)}clearPerformanceStyles(){["performance-gpu-acceleration","performance-no-hover"].forEach(t=>{const n=document.getElementById(t);n&&n.remove()})}reset(){try{localStorage.removeItem("slotMachine_performanceMode")}catch{console.warn("Could not clear performance mode from localStorage")}this.mode=null,this.clearPerformanceStyles(),document.body.classList.remove("performance-high","performance-low"),console.log("🔄 Performance mode reset")}getStats(){return{currentMode:this.mode,hasChosen:this.hasUserChosen(),isInitialized:this.initialized,availableModes:this.getAvailableModes(),currentSettings:this.getSettings()}}}const E=new G;typeof window<"u"&&(window.performanceManager=E);class Q{constructor(){this.container=null,this.isVisible=!1,this.onSelectionCallback=null}show(e=null){return this.onSelectionCallback=e,new Promise((t,n)=>{this.resolveSelection=t,this.rejectSelection=n,this.createModalHTML(),this.attachEventListeners(),document.body.appendChild(this.container),this.isVisible=!0,setTimeout(()=>{this.container.style.opacity="1"},10)})}hide(){this.container&&(this.container.style.opacity="0",this.isVisible=!1,setTimeout(()=>{this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)},300))}createModalHTML(){this.container=document.createElement("div"),this.container.id="mode-selection-modal";const e=E.getAvailableModes(),t=E.getMode(),n=t?E.getModeInfo(t):null;let i="";n&&(i=`
                <div class="current-mode-indicator">
                    <span class="current-mode-label">Current Mode:</span>
                    <span class="current-mode-value">
                        ${n.icon} ${n.name}
                    </span>
                </div>
            `);const o=e.map(a=>{const s=E.getModeInfo(a),r=a===t;return`
                <div class="mode-option ${r?"current-mode":""}" data-mode="${a}">
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
                            <input type="radio" name="performance-mode" value="${a}" id="mode-${a}" ${r?"checked":""}>
                            <label for="mode-${a}"></label>
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
                        ${i}
                    </div>
                    
                    <div class="mode-options">
                        ${o}
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
        `,document.head.appendChild(e)}attachEventListeners(){const e=this.container.querySelectorAll('input[name="performance-mode"]'),t=this.container.querySelector("#continue-btn"),n=this.container.querySelectorAll(".mode-option"),i=this.container.querySelector('input[name="performance-mode"]:checked');if(i){t.disabled=!1;const o=this.container.querySelector(`[data-mode="${i.value}"]`);o&&o.classList.add("selected")}n.forEach(o=>{o.addEventListener("click",()=>{o.dataset.mode;const a=o.querySelector('input[type="radio"]');a.checked=!0,n.forEach(s=>s.classList.remove("selected")),o.classList.add("selected"),t.disabled=!1})}),e.forEach(o=>{o.addEventListener("change",()=>{t.disabled=!1,n.forEach(s=>s.classList.remove("selected"));const a=this.container.querySelector(`[data-mode="${o.value}"]`);a&&a.classList.add("selected")})}),t.addEventListener("click",()=>{const o=this.container.querySelector('input[name="performance-mode"]:checked'),a=this.container.querySelector("#remember-choice").checked;o&&this.handleModeSelection(o.value,a)}),this.container.addEventListener("keydown",o=>{o.key==="Enter"&&!t.disabled&&t.click()})}handleModeSelection(e,t){console.log(`🎯 User selected: ${e} (remember: ${t})`),t?E.setMode(e):(E.mode=e,E.notifyListeners()),E.initialize(),this.onSelectionCallback&&this.onSelectionCallback(e,t),this.resolveSelection&&this.resolveSelection(e),this.hide()}isShown(){return this.isVisible}destroy(){this.hide();const e=document.getElementById("mode-selection-styles");e&&e.remove()}}const q=new Q;typeof window<"u"&&(window.modeSelectionModal=q);window.performanceManager=E;window.modeSelectionModal=q;async function k(){console.log("🎰 Initializing Slot Machine App..."),console.log("🔍 Debug - window.performanceManager:",!!window.performanceManager),console.log("🔍 Debug - window.modeSelectionModal:",!!window.modeSelectionModal),window.performanceManager?(window.performanceManager.initialize(),console.log("⚡ Performance manager initialized")):console.error("❌ Performance manager not found on window object"),z.show(),await H.preloadAssets((f,e,t)=>{z.updateProgress(f,e,t)},f=>{console.log("✅ All assets preloaded, checking performance mode..."),setTimeout(()=>{z.hide();const e=localStorage.getItem("slotMachine_performanceMode");e?(console.log(`🔄 Returning user, using saved mode: ${e}`),window.performanceManager&&window.performanceManager.initializeMode(e),$(f)):(console.log("🎯 First time user, showing mode selection modal"),console.log("🔍 Debug - modeSelectionModal available:",!!window.modeSelectionModal),window.modeSelectionModal?window.modeSelectionModal.show().then(t=>{console.log(`✅ User selected: ${t}`),$(f)}):(console.warn("❌ Mode selection modal not available, using default mode"),$(f)))},300)})}function $(f){console.log("🎰 Showing main application");const e=document.querySelector(".slot-machine-cabinet");if(console.log("🔍 Debug - appContainer found:",!!e),e?(console.log("🔍 Debug - setting opacity to 1"),e.style.opacity="1",e.style.transition="opacity 0.5s ease-in",console.log("🔍 Debug - appContainer opacity set to:",e.style.opacity)):console.error("❌ Could not find .slot-machine-cabinet element!"),window.slotMachine&&window.slotMachine.onAssetsLoaded?(console.log("🎮 Triggering slot machine onAssetsLoaded"),window.slotMachine.onAssetsLoaded(f)):(console.log("🔍 Debug - window.slotMachine:",!!window.slotMachine),console.log("🔍 Debug - window.slotMachine.onAssetsLoaded:",!!(window.slotMachine&&window.slotMachine.onAssetsLoaded))),window.performanceManager){const t=window.performanceManager.getMode();console.log(`🚀 Application initialized in ${t} mode`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",k):k();
