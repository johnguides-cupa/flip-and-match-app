(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const E="/flip-and-match-app/",v=[{id:"development-evp-shield",name:"Development EVP Shield",filename:"Development-EVP-shield.png",path:`${E}assets/images/prizes/Development-EVP-shield.png`,description:"Development EVP shield logo"},{id:"inclusion-evp-shield",name:"Inclusion EVP Shield",filename:"Inclusion-EVP-shield.png",path:`${E}assets/images/prizes/Inclusion-EVP-shield.png`,description:"Inclusion EVP shield logo"},{id:"innovation-evp-shield",name:"Innovation EVP Shield",filename:"Innovation-EVP-shield.png",path:`${E}assets/images/prizes/Innovation-EVP-shield.png`,description:"Innovation EVP shield logo"}],L={sadCat:{id:"sad-cat",name:"Sad Cat",filename:"Sad_cat.png",path:`${E}assets/images/Sad_cat.png`,description:"Default fallback image for failed loads"},winnerCat:{id:"winner-cat",name:"Winner Cat",filename:"cat_win.png",path:`${E}assets/images/cat_win.png`,description:"Victory celebration image"},logo:{id:"pursuing-potential-header",name:"Pursuing Potential Header Logo",filename:"Pursuing Potential Logo.png",path:`${E}assets/images/Pursuing Potential Logo.png`,description:"Main header logo"},catCrying:{id:"cat-crying",name:"Crying Cat",filename:"cat-crying.gif",path:`${E}assets/images/cat-crying.gif`,description:"Crying cat gif"},dancingCat:{id:"dancing-cat",name:"Dancing Cat",filename:"dancing-cat.gif",path:`${E}assets/images/dancing-cat.gif`,description:"Dancing cat gif"},happyCat:{id:"happy-cat",name:"Happy Cat",filename:"Happy cat.gif",path:`${E}assets/images/Happy cat.gif`,description:"Happy cat gif"}},S=b=>{const e=encodeURIComponent(b);return`${E}assets/images/prizes/${e}`};class q{constructor(){this.loadedCount=0,this.totalAssets=0,this.loadedAssets=new Map,this.onProgressCallback=null,this.onCompleteCallback=null,this.preloadStartTime=null}async preloadAssets(e,t){this.onProgressCallback=e,this.onCompleteCallback=t,this.preloadStartTime=performance.now();const n=this.collectImageUrls();this.totalAssets=n.length,console.log(`🎰 Starting preload of ${this.totalAssets} assets...`);const i=n.map((s,o)=>this.preloadImage(s,o));try{await Promise.allSettled(i);const s=performance.now()-this.preloadStartTime;console.log(`✅ Asset preloading completed in ${Math.round(s)}ms`),console.log(`📊 Successfully loaded: ${this.loadedAssets.size}/${this.totalAssets} assets`),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}catch(s){console.error("❌ Asset preloading error:",s),this.onCompleteCallback&&this.onCompleteCallback(this.loadedAssets)}}collectImageUrls(){const e=new Set;return v.forEach(t=>{e.add(t.path)}),Object.values(L).forEach(t=>{e.add(t.path)}),e.add("./assets/images/Pursuing Potential Logo.png"),e.add("/flip-and-match-app/assets/images/Pursuing%20Potential%20Logo.png"),Array.from(e).filter(t=>t&&t.trim()!=="")}preloadImage(e,t){return new Promise(n=>{const i=new Image;i.loading="eager",i.decoding="async",i.crossOrigin="anonymous";const s=setTimeout(()=>{console.warn(`⏰ Timeout loading image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"timeout"})},1e4);i.onload=()=>{clearTimeout(s),this.handleImageLoad(e,t,!0,i),n({success:!0,url:e})},i.onerror=()=>{clearTimeout(s),console.warn(`⚠️  Failed to load image: ${e}`),this.handleImageLoad(e,t,!1),n({success:!1,url:e,reason:"error"})},i.src=e})}handleImageLoad(e,t,n,i=null){this.loadedCount++,n&&i&&this.loadedAssets.set(e,{url:e,element:i,loaded:!0,index:t});const s=this.loadedCount/this.totalAssets*100;this.onProgressCallback&&this.onProgressCallback(s,this.loadedCount,this.totalAssets)}getPreloadedImage(e){const t=this.loadedAssets.get(e);return t&&t.loaded?t.element:null}isComplete(){return this.loadedCount>=this.totalAssets}getStats(){return{loaded:this.loadedCount,total:this.totalAssets,percentage:this.totalAssets>0?this.loadedCount/this.totalAssets*100:0,loadedUrls:Array.from(this.loadedAssets.keys())}}}const D=new q;class N{constructor(){this.container=null,this.progressBar=null,this.progressText=null,this.statusText=null,this.loadingAnimation=null}show(){this.createLoadingHTML(),this.startLoadingAnimation(),document.body.appendChild(this.container)}updateProgress(e,t,n){if(this.progressBar&&(this.progressBar.style.width=`${e}%`),this.progressText&&(this.progressText.textContent=`${Math.round(e)}%`),this.statusText){let i="";e<25?i=`Loading prize images... ${t}/${n}`:e<50?i=`Loading app assets... ${t}/${n}`:e<75?i=`Preparing slot machine... ${t}/${n}`:e<100?i=`Finalizing setup... ${t}/${n}`:i=`Ready to play! ${t}/${n}`,this.statusText.textContent=i}}hide(){this.loadingAnimation&&clearInterval(this.loadingAnimation),this.container&&(this.container.style.transition="opacity 0.5s ease-out",this.container.style.opacity="0",setTimeout(()=>{this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)},500))}createLoadingHTML(){this.container=document.createElement("div"),this.container.id="asset-loading-screen",this.container.innerHTML=`
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
        `,document.head.appendChild(e)}startLoadingAnimation(){let e=0;this.loadingAnimation=setInterval(()=>{if(this.statusText&&this.statusText.textContent.includes("Loading assets")){e=(e+1)%4;const t=".".repeat(e),n=this.statusText.textContent.split("...")[0].split("..")[0].split(".")[0];this.statusText.textContent=n+t}},500)}}const z=new N;class V{constructor(){this.initializeDefaults()}initializeDefaults(){if(!this.getPrizes().length){const e=[{id:1,name:"Grand Prize",image:v[0].path,quantity:50,chance:1},{id:2,name:"2nd Prize",image:v[1].path,quantity:10,chance:2},{id:3,name:"3rd Prize",image:v[2].path,quantity:5,chance:3},{id:4,name:"Consolation",image:L.sadCat.path,quantity:999,chance:94}];this.setPrizes(e)}}getPrizes(){const e=localStorage.getItem("prizes");return e?JSON.parse(e):[]}setPrizes(e){localStorage.setItem("prizes",JSON.stringify(e))}addPrize(e){const t=this.getPrizes();return e.id=Date.now(),t.push(e),this.setPrizes(t),e}updatePrize(e){const t=this.getPrizes(),n=t.findIndex(i=>i.id===e.id);return n!==-1?(t[n]=e,this.setPrizes(t),!0):!1}deletePrize(e){const t=this.getPrizes(),n=t.filter(i=>i.id!==e);return this.setPrizes(n),n.length!==t.length}getLogs(){const e=localStorage.getItem("spinLogs");return e?JSON.parse(e):[]}addLog(e){const t=this.getLogs();e.timestamp=new Date().toISOString(),t.unshift(e),t.length>100&&t.splice(100),localStorage.setItem("spinLogs",JSON.stringify(t))}clearLogs(){localStorage.removeItem("spinLogs")}resetAll(){localStorage.clear(),this.initializeDefaults()}}window.storageManager=new V;class F{constructor(){this.sounds={},this.audioContext=null,this.isMuted=!1,this.volume=.5,this.isPlayingCustomSound=!1,this.initializeSounds(),this.createVolumeControl()}shouldPlaySound(e){return!this.isMuted}initializeSounds(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.warn("Web Audio API not supported:",e)}this.loadCustomSounds(),this.createProgrammaticSounds()}loadCustomSounds(){this.customSounds={};const e=new Audio("./assets/sounds/Congratulations.mp3");e.volume=this.volume,e.preload="auto",this.customSounds.congratulations=e;const t=new Audio("./assets/sounds/miaw.mp3");t.volume=this.volume,t.preload="auto",this.customSounds.miaw=t;const n=new Audio("./assets/sounds/Happy Happy Happy.mp3");n.volume=this.volume,n.preload="auto",this.customSounds.happy=n,e.addEventListener("error",()=>{console.warn("Could not load congratulations sound")}),t.addEventListener("error",()=>{console.warn("Could not load miaw sound")}),n.addEventListener("error",()=>{console.warn("Could not load happy happy happy sound")}),e.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),t.addEventListener("ended",()=>{this.isPlayingCustomSound=!1}),n.addEventListener("ended",()=>{this.isPlayingCustomSound=!1})}createProgrammaticSounds(){this.sounds={spin:()=>this.createSpinSound(),win:()=>this.createMelody([523,659,784,1047],.3),lose:()=>this.createTone(150,.8,"sine"),click:()=>this.createTone(800,.1,"square"),reelStop:()=>this.createTone(400,.2,"triangle"),jackpot:()=>this.createCelebrationSound(),background:()=>this.createAmbientSound()}}createSpinSound(){if(!this.audioContext||this.isMuted)return;const e=2.5,t=8,n=300,i=this.audioContext.createOscillator(),s=this.audioContext.createGain(),o=this.audioContext.createBiquadFilter();i.connect(o),o.connect(s),s.connect(this.audioContext.destination),i.frequency.setValueAtTime(400,this.audioContext.currentTime),i.frequency.exponentialRampToValueAtTime(200,this.audioContext.currentTime+e),i.type="sawtooth",o.type="lowpass",o.frequency.setValueAtTime(1e3,this.audioContext.currentTime),o.frequency.exponentialRampToValueAtTime(300,this.audioContext.currentTime+e);const a=.4;s.gain.setValueAtTime(0,this.audioContext.currentTime),s.gain.linearRampToValueAtTime(this.volume*a,this.audioContext.currentTime+.1),s.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+e),i.start(this.audioContext.currentTime),i.stop(this.audioContext.currentTime+e);for(let l=0;l<t;l++)setTimeout(()=>{this.createTone(600+Math.random()*200,.05,"square")},l*n)}createTone(e,t,n="sine"){if(!this.audioContext||this.isMuted)return;const i=this.audioContext.createOscillator(),s=this.audioContext.createGain();i.connect(s),s.connect(this.audioContext.destination),i.frequency.setValueAtTime(e,this.audioContext.currentTime),i.type=n,s.gain.setValueAtTime(0,this.audioContext.currentTime),s.gain.linearRampToValueAtTime(this.volume*.3,this.audioContext.currentTime+.01),s.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+t),i.start(this.audioContext.currentTime),i.stop(this.audioContext.currentTime+t)}createMelody(e,t){!this.audioContext||this.isMuted||e.forEach((n,i)=>{setTimeout(()=>{this.createTone(n,t,"sine")},i*t*200)})}createCelebrationSound(){if(!this.audioContext||this.isMuted)return;[261,329,392,523,659,784,1047,1319].forEach((t,n)=>{setTimeout(()=>{this.createTone(t,.4,"sine")},n*100)}),setTimeout(()=>{for(let t=0;t<10;t++)setTimeout(()=>{this.createTone(1e3+Math.random()*1e3,.1,"square")},t*50)},800)}createAmbientSound(){if(!this.audioContext||this.isMuted)return;const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.setValueAtTime(60,this.audioContext.currentTime),e.type="sine",t.gain.setValueAtTime(this.volume*.1,this.audioContext.currentTime),e.start(),setTimeout(()=>{t.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+1),e.stop(this.audioContext.currentTime+1)},5e3)}playSound(e){if(!this.shouldPlaySound(e)||!this.sounds[e]){this.isMuted?console.log(`Sound ${e} muted`):this.sounds[e]||console.warn(`Sound ${e} not found`);return}try{this.audioContext&&this.audioContext.state==="suspended"?this.audioContext.resume().then(()=>{this.sounds[e]()}).catch(t=>{console.warn("Failed to resume audio context:",t)}):this.sounds[e]()}catch(t){console.warn("Error playing sound:",t)}}mute(){this.isMuted=!0,this.updateVolumeButton()}unmute(){this.isMuted=!1,this.updateVolumeButton()}toggleMute(){this.isMuted=!this.isMuted,this.updateVolumeButton()}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.customSounds&&Object.values(this.customSounds).forEach(t=>{t&&(t.volume=this.volume)}),this.updateVolumeSlider()}createVolumeControl(){let e=document.querySelector(".bottom-controls");e||(e=document.createElement("div"),e.className="bottom-controls",document.body.appendChild(e),this.repositionControls(),window.addEventListener("resize",()=>this.repositionControls()),window.addEventListener("orientationchange",()=>{setTimeout(()=>this.repositionControls(),100)}));const t=document.createElement("div");t.className="sound-control",t.innerHTML=`
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
        `,document.head.appendChild(n);const i=document.createElement("button");i.className="admin-button",i.title="Admin Access",i.innerHTML="🤫",i.addEventListener("click",()=>{window.showAdminLogin&&window.showAdminLogin()}),e.appendChild(t),e.appendChild(i),this.updateVolumeSlider(),document.getElementById("muteButton").addEventListener("click",()=>{this.toggleMute(),this.playSound("click")}),document.getElementById("volumeSlider").addEventListener("input",s=>{const o=parseInt(s.target.value)/100;this.setVolume(o),this.playSound("click")}),document.getElementById("testSoundButton").addEventListener("click",()=>{console.log("Testing spin sound..."),this.testSound("spin")})}repositionControls(){const e=document.querySelector(".bottom-controls"),t=document.querySelector(".header-logo");if(!e||!t)return;window.innerWidth>window.innerHeight?e.parentElement!==t&&t.appendChild(e):e.parentElement!==document.body&&document.body.appendChild(e)}updateVolumeButton(){const e=document.getElementById("muteButton");e&&(e.textContent=this.isMuted?"🔇":"🔊",e.classList.toggle("muted",this.isMuted))}updateVolumeSlider(){const e=document.getElementById("volumeSlider"),t=document.querySelector(".volume-label");e&&(e.value=this.volume*100),t&&(t.textContent=Math.round(this.volume*100)+"%")}onSpinStart(){this.playSound("spin")}onReelStop(){this.playSound("reelStop")}onCardFlip(){if(!this.isMuted&&this.audioContext){const e=this.audioContext.currentTime,t=this.audioContext.createOscillator(),n=this.audioContext.createGain();t.connect(n),n.connect(this.audioContext.destination),t.frequency.setValueAtTime(800,e),t.frequency.exponentialRampToValueAtTime(200,e+.1),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.15*this.volume,e+.02),n.gain.exponentialRampToValueAtTime(.01,e+.15),t.start(e),t.stop(e+.15)}}onDrumroll(){if(this.isMuted){console.log("🔇 Drumroll skipped: sound is muted");return}if(this.audioContext){this.audioContext.state==="suspended"&&this.audioContext.resume().then(()=>{console.log("🔊 Audio context resumed for drumroll")}),console.log("✨ Playing cute anticipation sound");const e=this.audioContext.currentTime,t=3.5,n=this.audioContext.createGain();n.connect(this.audioContext.destination),this.drumrollOscillators=[];const i=28;for(let a=0;a<i;a++){const l=a/i,c=e+l*t,r=this.audioContext.createOscillator();r.type="sine";const m=400,p=[0,2,4,5,7,9,11,12],u=p[a%p.length],d=Math.floor(a/p.length)*12,g=m*Math.pow(2,(u+d)/12);r.frequency.setValueAtTime(g,c),r.frequency.linearRampToValueAtTime(g*1.02,c+.05);const h=this.audioContext.createGain(),f=.15+l*.15;h.gain.setValueAtTime(0,c),h.gain.linearRampToValueAtTime(f*this.volume,c+.01),h.gain.exponentialRampToValueAtTime(.001,c+.12),r.connect(h),h.connect(n),r.start(c),r.stop(c+.12),this.drumrollOscillators.push(r)}const s=this.audioContext.createOscillator();s.type="triangle",s.frequency.setValueAtTime(300,e),s.frequency.linearRampToValueAtTime(500,e+t);const o=this.audioContext.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(.08*this.volume,e+.5),o.gain.linearRampToValueAtTime(.12*this.volume,e+t-.3),s.connect(o),o.connect(n),s.start(e),s.stop(e+t),this.drumrollOscillators.push(s),this.drumrollGain=n}else console.warn("⚠️ Audio context not available for drumroll")}stopDrumroll(){if(this.drumrollOscillators&&this.drumrollOscillators.length>0){console.log("🛑 Stopping anticipation sound");const e=this.audioContext.currentTime;this.drumrollOscillators.forEach(t=>{try{t.stop(e+.05)}catch{}}),this.drumrollGain&&(this.drumrollGain.gain.cancelScheduledValues(e),this.drumrollGain.gain.setValueAtTime(this.drumrollGain.gain.value,e),this.drumrollGain.gain.linearRampToValueAtTime(.001,e+.05)),this.drumrollOscillators=[],this.drumrollGain=null}}onWin(e=!1){e?this.playSound("jackpot"):this.playSound("win")}onLose(){this.playSound("lose")}onPopupWin(){this.playCustomSound("congratulations")}onPopupLose(){this.playCustomSound("miaw")}onPopupHappy(){this.playCustomSound("happy")}playCustomSound(e){if(!(this.isMuted||!this.customSounds||!this.customSounds[e]))try{const t=this.customSounds[e];t.preload="auto",this.isPlayingCustomSound=!0,setTimeout(()=>{this.isPlayingCustomSound=!1},2e3),t.currentTime=0,t.volume=this.volume;const n=t.play();n!==void 0&&n.catch(i=>{console.warn(`Could not play ${e} sound:`,i),this.isPlayingCustomSound=!1})}catch(t){console.warn(`Error playing custom sound ${e}:`,t),this.isPlayingCustomSound=!1}}stopCustomSounds(){if(this.customSounds)try{Object.values(this.customSounds).forEach(e=>{e&&!e.paused&&(e.pause(),e.currentTime=0)})}catch(e){console.warn("Error stopping custom sounds:",e)}}onButtonClick(){this.playSound("click")}onBackgroundStart(){this.playSound("background")}testSound(e){console.log(`Testing sound: ${e}`),this.audioContext&&this.audioContext.state==="suspended"?(console.log("Audio context suspended, trying to resume..."),this.audioContext.resume().then(()=>{console.log("Audio context resumed"),this.playSound(e)})):this.playSound(e)}testAllSounds(){["click","spin","reelStop","win","lose","jackpot"].forEach((t,n)=>{setTimeout(()=>{console.log(`Testing ${t}...`),this.testSound(t)},n*1e3)})}}window.soundManager=new F;window.soundManager.loadCustomSounds();class R{constructor(){this.isSpinning=!1,this.reelHeight=null,this.idleTimelines=[]}getAnimationSettings(){return{spinDuration:.12,spinEase:"none",stopDuration:1,stopEase:"power2.out",popupScale:!0,popupDuration:.4,popupEase:"back.out(1.7)",enableConfetti:!0,confettiAmount:7,confettiInterval:200,confettiMultiplier:2,enableIdleAnimations:!0}}createReelItems(e,t=null){const n=[];for(let i=0;i<15;i++)e.forEach(s=>{n.push(this.createReelItem(s))});return n}createReelItem(e){const t=document.createElement("div");return t.className="reel-item",t.innerHTML=`
            <img src="${e.image}" alt="${e.name}" onerror="this.onerror=null; this.style.display='none';">
        `,this.reelHeight||(document.body.appendChild(t),this.reelHeight=t.offsetHeight,document.body.removeChild(t)),t}getImageSrc(e){if(window.slotMachine&&window.slotMachine.preloadedAssets){const t=window.slotMachine.preloadedAssets.get(e);if(t&&t.element)return t.element.src}return e}initializeCards(e){const t=document.querySelectorAll(".card");if(t.length===0){console.warn("No cards found in DOM");return}t.forEach((n,i)=>{n.dataset.position=i,n.classList.remove("flipped");const s=e[Math.floor(Math.random()*e.length)],o=n.querySelector(".card-prize-image");o&&(o.src=this.getImageSrc(s.image),o.alt=s.name)}),this.startCardShuffle()}startCardShuffle(){if(this.stopCardShuffle(),document.querySelectorAll(".card").length!==3)return;this.shuffleTimeline=gsap.timeline({repeat:-1});const t=.4;let n=0;for(let i=0;i<50;i++){const s=.3+Math.random()*.7,o=[[0,1],[1,2],[0,2]],[a,l]=o[Math.floor(Math.random()*o.length)];n+=s,this.shuffleTimeline.call(()=>{this.swapCardPositions(a,l)},[],n),n+=t}}swapCardPositions(e,t){const n=document.querySelector(".cards-area");if(!n)return;const i=Array.from(n.querySelectorAll(".card")),s=i.find(m=>parseInt(m.dataset.position)===e),o=i.find(m=>parseInt(m.dataset.position)===t);if(!s||!o)return;const a={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"},l=.4,c=s.getBoundingClientRect().left-n.getBoundingClientRect().left,r=o.getBoundingClientRect().left-n.getBoundingClientRect().left;gsap.to(s,{left:r,top:-30,duration:l/2,ease:"power1.inOut",onComplete:()=>{gsap.to(s,{top:0,duration:l/2,ease:"power1.inOut",onComplete:()=>{s.dataset.position=t,s.style.left=a[t],s.style.top="0"}})}}),gsap.to(o,{left:c,top:-30,duration:l/2,ease:"power1.inOut",onComplete:()=>{gsap.to(o,{top:0,duration:l/2,ease:"power1.inOut",onComplete:()=>{o.dataset.position=e,o.style.left=a[e],o.style.top="0"}})}})}stopCardShuffle(){this.shuffleTimeline&&(this.shuffleTimeline.kill(),this.shuffleTimeline=null);const e=document.querySelectorAll(".card"),t={0:"calc(50% - 440px)",1:"calc(50% - 140px)",2:"calc(50% + 160px)"};e.forEach(n=>{gsap.killTweensOf(n);const i=parseInt(n.dataset.position);n.style.left=t[i],n.style.top="0"})}async flipCards(e){if(this.isSpinning)return;this.isSpinning=!0,this.stopCardShuffle();const t=document.getElementById("spinButton");t.disabled=!0,t.querySelector(".button-text").textContent="FLIPPING...";const n=Array.from(document.querySelectorAll(".card")).sort((o,a)=>parseInt(o.dataset.position)-parseInt(a.dataset.position));n.forEach((o,a)=>{const l=o.querySelector(".card-prize-image");l&&e[a]&&(l.src=this.getImageSrc(e[a].image),l.alt=e[a].name)}),window.soundManager&&typeof window.soundManager.onDrumroll=="function"&&window.soundManager.onDrumroll();const i=.6,s=.5;for(let o=0;o<n.length;o++){const a=o===0?1e3:0;await new Promise(l=>{setTimeout(()=>{n[o].classList.add("flipped"),window.soundManager&&window.soundManager.onCardFlip(),setTimeout(l,i*1e3)},o*s*1e3+a)})}return await new Promise(o=>setTimeout(o,300)),n}populateReels(e){if(document.querySelectorAll(".card").length>0){this.initializeCards(e);return}document.querySelectorAll(".reel").forEach((i,s)=>{const o=i.querySelector(".reel-strip");o.innerHTML="",this.createReelItems(e).forEach(l=>o.appendChild(l)),gsap.set(o,{y:-this.reelHeight})}),this.startIdleAnimation()}startIdleAnimation(){this.stopIdleAnimation();const e=Array.from(document.querySelectorAll(".reel .reel-strip"));this.idleTimelines=[];const t=[6,7.5,9];e.forEach((n,i)=>{const s=gsap.timeline({repeat:-1}),a=gsap.getProperty(n,"y")-this.reelHeight*10;s.to(n,{y:a,duration:t[i%t.length],ease:"linear"}),this.idleTimelines.push(s)})}stopIdleAnimation(){this.idleTimelines&&this.idleTimelines.length&&this.idleTimelines.forEach(e=>e.kill()),this.idleTimelines=[]}async spinReels(e,t,n){const i=document.querySelectorAll(".card");if(i.length>0){const h=document.getElementById("spinButton");try{await this.flipCards(n),this.showPrizePopup(e)}catch(f){console.error("Error during card flip:",f)}finally{h.disabled=!1,h.querySelector(".button-text").textContent="FLIP!",this.isSpinning=!1}document.getElementById("closePopup").addEventListener("click",()=>{setTimeout(()=>{i.forEach(f=>f.classList.remove("flipped")),this.initializeCards(t)},300)},{once:!0});return}if(this.isSpinning)return;this.isSpinning=!0,this.stopIdleAnimation(),window.soundManager&&window.soundManager.onSpinStart();const s=Array.from(document.querySelectorAll(".reel .reel-strip")),o=document.getElementById("spinButton");if(o.disabled=!0,o.querySelector(".button-text").textContent="SPINNING...",!this.reelHeight){const h=this.createReelItem(t[0]);document.body.appendChild(h),this.reelHeight=h.offsetHeight,document.body.removeChild(h)}const a=30,l=10;s.forEach((h,f)=>{h.innerHTML="";for(let w=0;w<a;w++){const P=t[Math.floor(Math.random()*t.length)];h.appendChild(this.createReelItem(P))}h.appendChild(this.createReelItem(n[f]));for(let w=0;w<l;w++){const P=t[Math.floor(Math.random()*t.length)];h.appendChild(this.createReelItem(P))}const x=Math.floor(h.parentNode.offsetHeight/this.reelHeight),C=this.reelHeight*Math.floor(x/2)-30;gsap.set(h,{y:-(a*this.reelHeight-C)})});const c=s.map((h,f)=>{const x=a,C=Math.floor(h.parentNode.offsetHeight/this.reelHeight),w=this.reelHeight*Math.floor(C/2)-30;return-(x*this.reelHeight-w)}),r=this.getAnimationSettings(),m=r.spinDuration,p=15,u=1.5,d=this.reelHeight*10,g=s.map((h,f)=>new Promise(x=>{const C=gsap.timeline({repeat:-1});C.to(h,{y:`-=${d}`,duration:m,ease:r.spinEase}),setTimeout(()=>{C.kill(),gsap.to(h,{y:c[f],duration:r.stopDuration,ease:r.stopEase,onComplete:()=>{window.soundManager&&window.soundManager.onReelStop(),x()}})},f*u*1e3+p*m*1e3)}));for(let h=0;h<g.length;h++)await g[h];setTimeout(()=>{this.showPrizePopup(e)},100),o.disabled=!1,o.querySelector(".button-text").textContent="SPIN!",this.isSpinning=!1,document.getElementById("closePopup").addEventListener("click",()=>{setTimeout(()=>{this.populateReels(t)},400)},{once:!0})}calculateTargetPositions(e,t){const n=[],i=t.length;for(let s=0;s<3;s++){let o=t.findIndex(m=>m.id===e.id);o===-1&&(o=0);const l=(7+Math.floor(Math.random()*2))*i+o,c=this.reelHeight,r=-(l*this.reelHeight-c);n.push(r)}return n}animateReel(e,t,n){return new Promise(i=>{const s=gsap.timeline();s.to(e,{y:t-this.reelHeight*10,duration:n*.7,ease:"power2.in"}),s.to(e,{y:t,duration:n*.3,ease:"power3.out",onComplete:()=>{i()}})})}determinePrizeType(e,t){if(e.isDefault)return"consolation";const n=t.filter(i=>!i.isDefault);return n.sort((i,s)=>i.chance-s.chance),n.length>0&&e.id===n[0].id?"grandPrize":"mediumPrize"}showPrizePopup(e){window.soundManager&&typeof window.soundManager.stopDrumroll=="function"&&window.soundManager.stopDrumroll();const t=document.getElementById("prizePopup"),n=document.getElementById("wonPrizeImage"),i=document.getElementById("wonPrizeName"),s=document.getElementById("prizePopupTitle"),o=t.querySelector(".prize-shield"),a=window.storageManager?window.storageManager.getPrizes():[],l=this.determinePrizeType(e,a);if(l==="consolation")n.style.display="none",i.textContent=e.name,s&&(s.textContent="Better luck next time!"),o&&(o.style.width="",o.style.height="",o.style.display="",o.style.justifyContent="",o.style.alignItems="",o.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`);else{n.style.display="";const r=new Image;r.onload=()=>{n.src=e.image},r.src=e.image,i.textContent=`You won ${e.name}!`}gsap.set(t,{force3D:!0}),gsap.set(t.querySelector(".popup-content"),{force3D:!0}),l==="consolation"?(s&&(s.textContent="Better luck next time!"),o&&(o.innerHTML=`<img src="/assets/images/cat-crying.gif" alt="Crying Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/cat-crying.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupLose()},100)):l==="grandPrize"?(s&&(s.textContent="Congratulations!"),o&&(o.innerHTML=`<img src="/assets/images/dancing-cat.gif" alt="Dancing Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/dancing-cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupWin()},100)):l==="mediumPrize"&&(s&&(s.textContent="Congratulations!"),o&&(o.innerHTML=`<img src="/assets/images/Happy cat.gif" alt="Happy Cat" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px;" onerror="this.src='/flip-and-match-app/assets/images/Happy cat.gif'">`),setTimeout(()=>{window.soundManager&&window.soundManager.onPopupHappy()},100)),t.classList.remove("hidden");const c=this.getAnimationSettings();c.popupScale?gsap.fromTo(t.querySelector(".popup-content"),{scale:0,rotation:l==="consolation"?10:-10,opacity:0},{scale:1,rotation:0,opacity:1,duration:c.popupDuration,ease:c.popupEase,force3D:!0,onComplete:()=>{l==="consolation"&&gsap.to(t.querySelector(".popup-content"),{scale:1.02,duration:.3,ease:"power2.inOut",yoyo:!0,repeat:1,force3D:!0})}}):gsap.fromTo(t.querySelector(".popup-content"),{opacity:0},{opacity:1,duration:c.popupDuration,ease:c.popupEase,force3D:!0}),l!=="consolation"&&c.enableConfetti?(console.log(`🎊 Triggering confetti - Prize Type: ${l}, Mode: ${this.performanceMode}, EnableConfetti: ${c.enableConfetti}`),setTimeout(()=>{this.triggerConfetti()},200)):console.log(`🚫 Confetti skipped - Prize Type: ${l}, Mode: ${this.performanceMode}, EnableConfetti: ${c.enableConfetti}`)}triggerConfetti(){const e=this.getAnimationSettings();console.log(`🎊 triggerConfetti() called - Mode: ${this.performanceMode}, EnableConfetti: ${e.enableConfetti}`);const t=e.enableConfetti?1500:0,n=Date.now()+t,i={startVelocity:45,spread:420,ticks:90,zIndex:2e3};if(!e.enableConfetti){console.log("⚡ Confetti disabled in performance mode - RETURNING EARLY");return}console.log("🎊 Confetti enabled - proceeding with animation");const s=setInterval(function(){const o=n-Date.now();if(o<=0)return clearInterval(s);const a=e.confettiAmount*(o/t),l=e.confettiMultiplier||1;confetti(Object.assign({},i,{particleCount:a*l,origin:{x:.35,y:.35}})),confetti(Object.assign({},i,{particleCount:a*l,origin:{x:.65,y:.35}})),confetti(Object.assign({},i,{particleCount:a,origin:{x:.35,y:.55}})),confetti(Object.assign({},i,{particleCount:a,origin:{x:.65,y:.55}}))},e.confettiInterval||150)}closePrizePopup(){const e=document.getElementById("prizePopup");window.soundManager&&window.soundManager.stopCustomSounds(),gsap.set(e.querySelector(".popup-content"),{force3D:!0}),gsap.to(e.querySelector(".popup-content"),{scale:0,rotation:10,opacity:0,duration:.25,ease:"back.in(1.4)",force3D:!0,onComplete:()=>{e.classList.add("hidden"),window.slotMachine&&window.slotMachine.updatePrizeDisplay&&window.slotMachine.updatePrizeDisplay()}})}animatePrizeShowcase(){const e=document.querySelectorAll(".prize-item");gsap.fromTo(e,{y:-50,opacity:0},{y:0,opacity:1,duration:.6,stagger:.1,ease:"back.out(1.7)"})}initializeButtonEffects(){const e=document.getElementById("spinButton");e.addEventListener("mouseenter",()=>{e.disabled||gsap.to(e,{scale:1.05,duration:.2})}),e.addEventListener("mouseleave",()=>{e.disabled||gsap.to(e,{scale:1,duration:.2})})}}window.animationManager=new R;function T(b,e,t=0,n=!1,i=null,s=null){const o=document.getElementById(b);if(!o)return null;const a=n?`inline-winChance-${i}`:"winChance",l=`${a}-slider`,c=`${a}-label`,r=document.createElement("div");r.className="win-chance-slider-container",r.innerHTML=`
        <div class="slider-row">
            <span id="${c}" class="chance-value">${t}%</span>
        </div>
        <div class="slider-controls">
            <input type="range" 
                   id="${l}" 
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
    `,o.appendChild(r);const m=document.getElementById(l),p=document.getElementById(c),u=document.getElementById(e),d=h=>{const f=parseFloat(h),x=f%1===0?f.toString():f.toFixed(1);p.textContent=`${x}%`,u&&(u.value=f,u.dispatchEvent(new Event("input",{bubbles:!0}))),s&&typeof s=="function"&&s(f)},g=h=>{const f=Math.max(0,Math.min(100,parseFloat(h)||0)),x=f%1===0?f.toString():f.toFixed(1);m.value=f,p.textContent=`${x}%`,s&&typeof s=="function"&&s(f)};return m.addEventListener("input",h=>{d(h.target.value)}),u&&(u.addEventListener("input",h=>{g(h.target.value)}),u.addEventListener("blur",h=>{g(h.target.value)})),{slider:m,label:p,setValue:h=>{g(h)},getValue:()=>parseFloat(m.value),destroy:()=>{r.remove()}}}function I(){if(document.getElementById("win-chance-slider-styles"))return;const b=document.createElement("style");b.id="win-chance-slider-styles",b.textContent=`
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
    `,document.head.appendChild(b)}const y=()=>window.storageManager;class H{constructor(){this.currentEditingPrize=null,this.initializeEventListeners()}initializeEventListeners(){var e;document.querySelectorAll(".tab-button").forEach(t=>{t.addEventListener("click",()=>this.switchTab(t.dataset.tab))}),document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("prizeName");t&&(t.removeAttribute("pattern"),t.style.userSelect="text",t.style.pointerEvents="auto",t.addEventListener("keydown",n=>{n.keyCode===32&&n.stopPropagation()}))}),document.getElementById("closeAdmin").addEventListener("click",()=>{if(y().getPrizes().reduce((i,s)=>i+s.chance,0)!==100){alert("Total win chance must be exactly 100% before closing the admin panel.");return}this.hide()}),document.getElementById("addPrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.showPrizeEditor()}),document.getElementById("savePrize").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.savePrize()}),(e=document.getElementById("runProbabilityTest"))==null||e.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.runProbabilityTest()}),document.getElementById("cancelEdit").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),this.hidePrizeEditor()}),document.getElementById("resetGame").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),confirm("Are you sure you want to reset the game and clear all logs?")&&this.resetGame()}),document.addEventListener("click",t=>{t.target.classList.contains("quantity-btn")&&(window.soundManager&&window.soundManager.onButtonClick(),this.handleQuantityChange(t.target))})}show(){document.getElementById("adminPanel").classList.remove("hidden"),this.refreshContent(),setTimeout(()=>{const e=document.getElementById("prizeName");e&&(e.removeAttribute("pattern"),e.style.userSelect="text",e.style.pointerEvents="auto",e.addEventListener("keydown",t=>{t.keyCode===32&&t.stopPropagation()}),console.log("Prize name input initialized for spaces"))},100)}hide(){document.getElementById("adminPanel").classList.add("hidden"),this.hidePrizeEditor(),this.refreshSlotMachine()}switchTab(e){switch(document.querySelectorAll(".tab-button").forEach(t=>{t.classList.remove("active")}),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll(".tab-content").forEach(t=>{t.classList.remove("active")}),document.getElementById(`${e}Tab`).classList.add("active"),e){case"prizes":this.refreshPrizesList();break;case"settings":this.refreshSettings();break;case"logs":this.refreshLogs();break}}refreshContent(){this.refreshPrizesList(),this.refreshSettings(),this.refreshLogs()}refreshPrizesList(){const e=document.getElementById("prizesList"),t=y().getPrizes();e.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="prize-card",i.setAttribute("data-prize-id",n.id),i.innerHTML=`
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
            `,e.appendChild(i)})}showPrizeEditor(e=null){const t=document.getElementById("prizeEditor"),n=document.getElementById("editorTitle");function i(u,d){const g=document.getElementById(u);if(g){let h=document.getElementById(u+"-label");h||(h=document.createElement("label"),h.id=u+"-label",h.htmlFor=u,h.textContent=d,h.style.display="block",h.style.fontWeight="bold",h.style.margin="8px 0 2px 0",g.parentNode.insertBefore(h,g))}}i("prizeName","Prize Name"),i("prizeImage","Prize Image URL"),i("prizeQuantity","Quantity"),i("prizeChance","Win Chance (%)");const s=document.getElementById("prizeQuantity");let o=document.getElementById("unlimited-checkbox-container");if(!o){o=document.createElement("div"),o.id="unlimited-checkbox-container",o.style.display="block",o.style.marginTop="12px",o.style.marginBottom="12px",o.style.padding="10px",o.style.backgroundColor="#fff3cd",o.style.borderRadius="4px",o.style.border="1px solid #ffc107",s.nextSibling?s.parentNode.insertBefore(o,s.nextSibling):s.parentNode.appendChild(o);const u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.marginBottom="4px";const d=document.createElement("input");d.type="checkbox",d.id="unlimitedConsolation",d.style.marginRight="8px",d.style.width="18px",d.style.height="18px",d.style.cursor="pointer",d.style.flexShrink="0";const g=document.createElement("label");g.id="unlimitedConsolation-label",g.htmlFor="unlimitedConsolation",g.textContent="Unlimited consolation (quantity never decreases)",g.style.cursor="pointer",g.style.userSelect="none",g.style.margin="0",g.style.fontWeight="bold",g.style.color="#000",u.appendChild(d),u.appendChild(g);const h=document.createElement("div");h.id="unlimited-hint",h.style.fontSize="12px",h.style.color="#856404",h.style.marginTop="4px",h.textContent="Note: Only applies to the prize with the highest win chance (consolation prize)",o.appendChild(u),o.appendChild(h)}const a=y().getPrizes();let l=!1;if(e){const u=[...a].sort((d,g)=>g.chance-d.chance);l=u.length>0&&u[0].id===e.id,console.log("Editing prize:",e.name,"Is highest chance:",l,"Chance:",e.chance)}else l=!1,console.log("Adding new prize, checkbox disabled by default");const c=document.getElementById("unlimitedConsolation"),r=document.getElementById("unlimited-hint");if(c&&(c.disabled=!l,l?(r.textContent="✓ This is the consolation prize (highest win chance)",r.style.color="#155724",o.style.backgroundColor="#d4edda",o.style.borderColor="#28a745"):(r.textContent="ⓘ This option only applies to the prize with the highest win chance",r.style.color="#856404",o.style.backgroundColor="#fff3cd",o.style.borderColor="#ffc107")),o.style.display="block",I(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),d=document.createElement("div");d.id="winChanceSliderContainer",u.parentNode.insertBefore(d,u.nextSibling),this.winChanceSlider=T("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(this.createImageSourceSelector(),I(),!document.getElementById("winChance-slider")){const u=document.getElementById("prizeChance"),d=document.createElement("div");d.id="winChanceSliderContainer",u.parentNode.insertBefore(d,u.nextSibling),this.winChanceSlider=T("winChanceSliderContainer","prizeChance",0,!1,null,()=>this.updateChanceMessage())}if(e){this.currentEditingPrize=e,n.textContent="Edit Prize",document.getElementById("prizeName").value=e.name,document.getElementById("prizeImage").value=e.image||"",document.getElementById("prizeQuantity").value=e.quantity,document.getElementById("prizeChance").value=e.chance;const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!!e.unlimitedConsolation),this.updateImageSourceSelector(e.image)}else{this.currentEditingPrize=null,n.textContent="Add New Prize",document.getElementById("prizeName").value="",document.getElementById("prizeImage").value="",document.getElementById("prizeQuantity").value="",document.getElementById("prizeChance").value="";const u=document.getElementById("unlimitedConsolation");u&&(u.checked=!1),this.updateImageSourceSelector("")}let m=document.getElementById("chanceMessage");m||(m=document.createElement("div"),m.id="chanceMessage",m.style.margin="10px 0",m.style.fontWeight="bold",m.style.color="#e74c3c",t.appendChild(m)),e?(this.winChanceSlider&&this.winChanceSlider.setValue(e.chance),this.updateChanceMessage()):this.winChanceSlider&&this.winChanceSlider.setValue(0),this.updateChanceMessage();const p=document.getElementById("prizeChance");p.hasAttribute("data-listener-added")||(p.addEventListener("input",()=>{this.updateChanceMessage()}),p.setAttribute("data-listener-added","true")),this.updateDefaultPrizeLabel(),t.classList.remove("hidden")}updateDefaultPrizeLabel(){const e=y().getPrizes(),t=document.getElementById("prizeEditor");let n=document.getElementById("defaultPrizeLabel");if(n||(n=document.createElement("div"),n.id="defaultPrizeLabel",n.style.margin="10px 0",n.style.fontWeight="bold",n.style.color="#FFD700",n.style.fontSize="1.1em",t.appendChild(n)),e.length===0)n.textContent="No prizes yet - add your first prize!";else{const i=e.reduce((s,o)=>o.chance>s.chance?o:s);n.textContent=`Default Prize: ${i.name} (${i.chance}%)`}}updateChanceMessage(){const e=document.getElementById("prizeChance"),t=parseFloat(e.value)||0,n=y().getPrizes();let i=0;this.currentEditingPrize?i=n.reduce((o,a)=>o+(a.id===this.currentEditingPrize.id?t:a.chance),0):i=n.reduce((o,a)=>o+a.chance,0)+t;let s=document.getElementById("chanceMessage");if(!s){const o=document.getElementById("prizeEditor");s=document.createElement("div"),s.id="chanceMessage",s.style.margin="10px 0",s.style.fontWeight="bold",s.style.color="#e74c3c",o.appendChild(s)}if(i<100)s.textContent=`Total win chance: ${i.toFixed(1)}%. ${(100-i).toFixed(1)}% left to allocate.`,s.style.color="#e67e22",this.hideAutoAdjustWarning();else if(i>100){const o=i-100;s.textContent=`Total win chance: ${i.toFixed(1)}%. Exceeded by ${o.toFixed(1)}%.`,s.style.color="#e74c3c",this.showAutoAdjustWarning(o)}else s.textContent="Total win chance: 100%. Ready to save!",s.style.color="#27ae60",this.hideAutoAdjustWarning()}showAutoAdjustWarning(e){let t=document.getElementById("autoAdjustWarning");if(!t){t=document.createElement("div"),t.id="autoAdjustWarning",t.style.cssText=`
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
            `;const o=document.getElementById("chanceMessage");o&&o.parentNode?o.parentNode.insertBefore(t,o.nextSibling):document.getElementById("prizeEditor").appendChild(t)}const n=y().getPrizes();let i=null,s=0;for(const o of n)this.currentEditingPrize&&o.id===this.currentEditingPrize.id||o.chance>s&&(s=o.chance,i=o);if(i){const o=Math.max(.1,s-e);t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${e.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${i.name}"</strong> will be reduced from ${s}% to ${o.toFixed(1)}%
            `}else t.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;t.style.display="block",t.style.visibility="visible",t.style.opacity="1"}hideAutoAdjustWarning(){const e=document.getElementById("autoAdjustWarning");e&&(e.style.display="none")}hidePrizeEditor(){document.getElementById("prizeEditor").classList.add("hidden"),this.currentEditingPrize=null}createImageSourceSelector(){if(document.getElementById("imageSourceSelector"))return;const e=document.getElementById("prizeImage"),t=e.parentNode,n=document.createElement("div");n.id="imageSourceSelector",n.className="image-source-selector";const i=document.createElement("label");i.textContent="Image Source",i.style.display="block",i.style.fontWeight="bold",i.style.margin="8px 0 5px 0";const s=document.createElement("div");s.className="image-source-option",s.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="url" checked>
                <span>Use URL</span>
            </label>
        `;const o=document.createElement("div");o.className="image-source-option",o.innerHTML=`
            <label>
                <input type="radio" name="imageSource" value="asset">
                <span>Choose from Assets</span>
            </label>
        `;const a=document.createElement("div");a.id="assetGallery",a.className="asset-gallery hidden",v.filter(r=>r.path&&r.path.includes("/prizes/")).forEach(r=>{const m=document.createElement("div");m.className="asset-item",m.dataset.assetId=r.id,m.dataset.assetPath=r.path;const p=S(r.filename);m.innerHTML=`
                <img src="${p}" alt="${r.name}" title="${r.description}" onerror="this.style.display='none';">
                <span>${r.name}</span>
            `,m.addEventListener("click",()=>{this.selectAsset(r)}),a.appendChild(m)});const l=document.createElement("div");l.id="imagePreview",l.className="image-preview",l.innerHTML=`
            <label>Preview:</label>
            <div class="preview-content">
                <img id="previewImage" src="" alt="No image selected" style="display: none;">
                <span id="previewText">No image selected</span>
            </div>
        `,[s,o].forEach(r=>{const m=r.querySelector('input[type="radio"]');m.addEventListener("change",()=>{this.handleImageSourceChange(m.value)})}),e.addEventListener("input",()=>{this.updateImagePreview(e.value)}),t.insertBefore(i,e),t.insertBefore(n,e),n.appendChild(s),n.appendChild(o),n.appendChild(a),t.insertBefore(l,e.nextSibling)}updateImageSourceSelector(e){const t=document.querySelector('input[name="imageSource"][value="url"]'),n=document.querySelector('input[name="imageSource"][value="asset"]');if(v.some(s=>{const o=S(s.filename);return e===o||e===s.path||e.includes(s.filename)})){n.checked=!0,this.handleImageSourceChange("asset");const s=v.find(o=>{const a=S(o.filename);return e===a||e===o.path||e.includes(o.filename)});s&&this.highlightSelectedAsset(s.id)}else t.checked=!0,this.handleImageSourceChange("url");this.updateImagePreview(e)}handleImageSourceChange(e){const t=document.getElementById("prizeImage"),n=document.getElementById("assetGallery");e==="asset"?(t.style.display="none",n.classList.remove("hidden")):(t.style.display="block",n.classList.add("hidden"),this.clearAssetSelection())}selectAsset(e){const t=document.getElementById("prizeImage"),n=S(e.filename);t.value=n,this.highlightSelectedAsset(e.id),this.updateImagePreview(n)}highlightSelectedAsset(e){document.querySelectorAll(".asset-item").forEach(n=>{n.classList.remove("selected")});const t=document.querySelector(`[data-asset-id="${e}"]`);t&&t.classList.add("selected")}clearAssetSelection(){document.querySelectorAll(".asset-item").forEach(e=>{e.classList.remove("selected")})}updateImagePreview(e){const t=document.getElementById("previewImage"),n=document.getElementById("previewText");e&&e.trim()?(t.src=e,t.style.display="block",n.style.display="none",t.onerror=()=>{t.style.display="none",t.alt="Image not found"}):(t.style.display="none",n.style.display="block",n.textContent="No image selected")}savePrize(){var r;const e=document.getElementById("prizeName").value.trim(),t=document.getElementById("prizeImage").value.trim(),n=parseInt(document.getElementById("prizeQuantity").value),i=parseFloat(document.getElementById("prizeChance").value),s=((r=document.getElementById("unlimitedConsolation"))==null?void 0:r.checked)||!1;let o=document.getElementById("chanceMessage");if(!e||!t||n<0||i<0||i>100){o.textContent="Please fill all fields with valid values.",o.style.color="#e74c3c";return}const a=y().getPrizes();let l=0;if(this.currentEditingPrize?l=a.reduce((m,p)=>m+(p.id===this.currentEditingPrize.id?i:p.chance),0):l=a.reduce((m,p)=>m+p.chance,0)+i,l>100){const m=l-100;let p=null,u=0;for(const d of a)this.currentEditingPrize&&d.id===this.currentEditingPrize.id||d.chance>u&&(u=d.chance,p=d);if(p){const d=Math.max(.1,u-m),g={...p,chance:d};y().updatePrize(g)}}else if(l<100){const m=100-l;let p=null,u=0;for(const d of a)this.currentEditingPrize&&d.id===this.currentEditingPrize.id||d.chance>u&&(u=d.chance,p=d);if(p){const d=Math.min(100,u+m),g={...p,chance:d};y().updatePrize(g)}}o.textContent="Prize saved successfully!",o.style.color="#27ae60";const c={name:e,image:t,quantity:n,chance:i,unlimitedConsolation:s};this.currentEditingPrize?(c.id=this.currentEditingPrize.id,y().updatePrize(c)):y().addPrize(c),this.hideAutoAdjustWarning(),this.updateDefaultPrizeLabel(),this.hidePrizeEditor(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}editPrize(e){this.closeAllInlineEditors();const n=y().getPrizes().find(i=>i.id===e);n&&this.showInlineEditor(n,e)}closeAllInlineEditors(){this.inlineSliders&&(this.inlineSliders.forEach((n,i)=>{n&&n.destroy&&n.destroy()}),this.inlineSliders.clear()),document.querySelectorAll(".inline-prize-editor").forEach(n=>n.remove()),document.querySelectorAll(".prize-card").forEach(n=>n.style.display="flex")}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`);if(t){const n=parseFloat(t.value)||0,i=y().getPrizes(),s=i.find(l=>l.id===parseInt(e));let o=0;s&&(o=i.reduce((l,c)=>l+(c.id===s.id?n:c.chance),0));let a=document.getElementById(`inline-chance-indicator-${e}`);a||(a=document.createElement("span"),a.id=`inline-chance-indicator-${e}`,a.style.cssText=`
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: bold;
                `,t.parentNode.appendChild(a)),o>100?(a.textContent=`⚠️ Total: ${o.toFixed(1)}%`,a.style.color="#e74c3c"):o===100?(a.textContent="✓ Total: 100%",a.style.color="#27ae60"):(a.textContent=`Total: ${o.toFixed(1)}%`,a.style.color="#3498db")}}showInlineEditor(e,t){this.closeAllInlineEditors();const n=document.querySelector(`.prize-card[data-prize-id="${t}"]`);if(!n){console.error("Target card not found for prize ID:",t);return}console.log("Found target card:",n),console.log("Parent node:",n.parentNode),console.log("Next sibling:",n.nextSibling);const i=document.createElement("div");i.className="inline-prize-editor",i.id=`inline-editor-${t}`,i.innerHTML=`
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
        `,console.log("Inserting inline editor after target card"),n.parentNode.insertBefore(i,n.nextSibling),console.log("Inline editor inserted at:",i.offsetTop),this.setupInlineEditorEvents(t,e.image),setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"center"})},100)}generateAssetGalleryHTML(e){return v.map(t=>{const n=S(t.filename);return`
                <div class="asset-item" data-asset-id="${t.id}" data-asset-path="${t.path}" data-prize-id="${e}">
                    <img src="${n}" alt="${t.name}" title="${t.description}">
                    <span>${t.name}</span>
                </div>
            `}).join("")}setupInlineEditorEvents(e,t){I();const n=document.getElementById(`inline-prizeChance-${e}`).value,i=T(`inline-winChanceSliderContainer-${e}`,`inline-prizeChance-${e}`,parseFloat(n)||0,!0,e,()=>this.updateInlineChanceMessage&&this.updateInlineChanceMessage(e));this.inlineSliders||(this.inlineSliders=new Map),this.inlineSliders.set(e,i);const s=document.getElementById(`inline-prizeImage-${e}`);document.getElementById(`inline-previewImage-${e}`),document.getElementById(`inline-previewText-${e}`),s.addEventListener("input",()=>{this.updateInlineImagePreview(e,s.value.trim())}),document.querySelectorAll(`input[name="inline-imageSource-${e}"]`).forEach(g=>{g.addEventListener("change",()=>{this.handleInlineImageSourceChange(e,g.value)})}),document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(g=>{g.addEventListener("click",()=>{const h=g.dataset.assetId,f=v.find(x=>x.id===h);f&&this.selectInlineAsset(e,f)})}),this.updateInlineImageSourceState(e,t);const l=y().getPrizes(),c=[...l].sort((g,h)=>h.chance-g.chance),r=c.length>0&&c[0].id===e,m=document.getElementById(`inline-unlimitedConsolation-${e}`),p=document.getElementById(`inline-unlimited-hint-${e}`),u=document.getElementById(`inline-unlimited-checkbox-container-${e}`);if(m&&p&&u){const g=l.find(h=>h.id===e);m.checked=!!(g&&g.unlimitedConsolation),m.disabled=!r,r?(p.textContent="✓ This is the consolation prize (highest win chance)",p.style.color="#155724",u.style.backgroundColor="#d4edda",u.style.borderColor="#28a745"):(p.textContent="ⓘ This option only applies to the prize with the highest win chance",p.style.color="#856404",u.style.backgroundColor="#fff3cd",u.style.borderColor="#ffc107")}document.getElementById(`inline-prizeChance-${e}`).addEventListener("input",()=>{this.updateInlineChanceMessage(e)}),this.updateInlineChanceMessage(e)}updateInlineChanceMessage(e){const t=document.getElementById(`inline-prizeChance-${e}`),n=parseFloat(t.value)||0,s=y().getPrizes().reduce((a,l)=>a+(l.id===e?n:l.chance),0);let o=document.getElementById(`inline-chanceMessage-${e}`);if(o)if(s<100)o.textContent=`Total win chance: ${s.toFixed(1)}%. ${(100-s).toFixed(1)}% left to allocate.`,o.style.color="#e67e22",this.hideInlineAutoAdjustWarning(e);else if(s>100){const a=s-100;o.textContent=`Total win chance: ${s.toFixed(1)}%. Exceeded by ${a.toFixed(1)}%.`,o.style.color="#e74c3c",this.showInlineAutoAdjustWarning(e,a)}else o.textContent="Total win chance: 100%. Ready to save!",o.style.color="#27ae60",this.hideInlineAutoAdjustWarning(e)}showInlineAutoAdjustWarning(e,t){let n=document.getElementById(`inline-autoAdjustWarning-${e}`);if(!n){n=document.createElement("div"),n.id=`inline-autoAdjustWarning-${e}`,n.style.cssText=`
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
            `;const a=document.getElementById(`inline-chanceMessage-${e}`);a&&a.parentNode&&a.parentNode.insertBefore(n,a.nextSibling)}const i=y().getPrizes();let s=null,o=0;for(const a of i)a.id!==e&&a.chance>o&&(o=a.chance,s=a);if(s){const a=Math.max(.1,o-t);n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                If you save with this percentage, the excess ${t.toFixed(1)}% will be automatically removed from the highest percentage prize:<br>
                <strong>"${s.name}"</strong> will be reduced from ${o}% to ${a.toFixed(1)}%
            `}else n.innerHTML=`
                <strong>⚠️ Auto-Adjustment Warning</strong><br>
                Total percentage exceeds 100%. The excess will be automatically adjusted when saving.
            `;n.style.display="block",n.style.visibility="visible",n.style.opacity="1"}hideInlineAutoAdjustWarning(e){const t=document.getElementById(`inline-autoAdjustWarning-${e}`);t&&(t.style.display="none")}handleInlineImageSourceChange(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),i=document.getElementById(`inline-assetGallery-${e}`);t==="asset"?(n.style.display="none",i.classList.remove("hidden")):(n.style.display="block",i.classList.add("hidden"),this.clearInlineAssetSelection(e))}selectInlineAsset(e,t){const n=document.getElementById(`inline-prizeImage-${e}`),i=S(t.filename);n.value=i,this.highlightInlineSelectedAsset(e,t.id),this.updateInlineImagePreview(e,i)}highlightInlineSelectedAsset(e,t){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(s=>{s.classList.remove("selected")});const i=document.querySelector(`[data-asset-id="${t}"][data-prize-id="${e}"]`);i&&i.classList.add("selected")}clearInlineAssetSelection(e){document.querySelectorAll(`[data-prize-id="${e}"].asset-item`).forEach(n=>{n.classList.remove("selected")})}updateInlineImagePreview(e,t){const n=document.getElementById(`inline-previewImage-${e}`),i=document.getElementById(`inline-previewText-${e}`);t&&t.trim()?(n.src=t,n.style.display="block",i.style.display="none",n.onerror=()=>{n.style.display="none",n.alt="Image not found"}):(n.style.display="none",i.style.display="block")}updateInlineImageSourceState(e,t){const n=document.querySelector(`input[name="inline-imageSource-${e}"][value="url"]`),i=document.querySelector(`input[name="inline-imageSource-${e}"][value="asset"]`);if(v.some(o=>{const a=S(o.filename);return t===a||t===o.path})&&t){i.checked=!0;const o=v.find(a=>{const l=S(a.filename);return t===l||t===a.path});o&&(this.handleInlineImageSourceChange(e,"asset"),this.highlightInlineSelectedAsset(e,o.id))}else n.checked=!0,this.handleInlineImageSourceChange(e,"url")}saveInlineEdit(e){var r;const t=document.getElementById(`inline-prizeName-${e}`).value.trim(),n=document.getElementById(`inline-prizeImage-${e}`).value.trim(),i=parseInt(document.getElementById(`inline-prizeQuantity-${e}`).value),s=parseFloat(document.getElementById(`inline-prizeChance-${e}`).value),o=((r=document.getElementById(`inline-unlimitedConsolation-${e}`))==null?void 0:r.checked)||!1;if(!t){alert("Prize name is required");return}if(isNaN(i)||i<0){alert("Please enter a valid quantity (0 or more)");return}if(isNaN(s)||s<0||s>100){alert("Please enter a valid win chance between 0 and 100");return}const a={id:e,name:t,image:n,quantity:i,chance:s,unlimitedConsolation:o},l=y().getPrizes(),c=l.reduce((m,p)=>m+(p.id===e?s:p.chance),0);if(c!==100){if(c>100){const m=c-100;let p=null,u=0;for(const d of l)d.id!==e&&d.chance>u&&(u=d.chance,p=d);if(p){const d=Math.max(.1,u-m),g={...p,chance:d};y().updatePrize(g)}}else if(c<100){const m=100-c;let p=null,u=0;for(const d of l)d.id!==e&&d.chance>u&&(u=d.chance,p=d);if(p){const d=Math.min(100,u+m),g={...p,chance:d};y().updatePrize(g)}}}y().updatePrize(a);{this.closeAllInlineEditors(),this.refreshPrizesList(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels());const m=document.createElement("div");m.textContent="Prize updated successfully!",m.style.cssText=`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                font-weight: bold;
            `,document.body.appendChild(m),setTimeout(()=>{m.remove()},3e3)}}deletePrize(e){if(confirm("Are you sure you want to delete this prize?")){const n=y().getPrizes().find(o=>o.id===e);if(!n)return;const i=n.chance;y().deletePrize(e);const s=y().getPrizes();if(s.length>0&&i>0){const o=s.reduce((c,r)=>r.chance>c.chance?r:c),a={...o,chance:Math.min(100,o.chance+i)};y().updatePrize(a);const l=document.createElement("div");l.textContent=`Prize deleted. ${i}% redistributed to "${o.name}" (now ${a.chance}%)`,l.style.cssText=`
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
                `,document.body.appendChild(l),setTimeout(()=>{l.remove()},4e3)}this.refreshPrizesList(),this.updateDefaultPrizeLabel(),window.slotMachine&&(window.slotMachine.updatePrizeDisplay(),window.slotMachine.populateReels())}}refreshSettings(){}runProbabilityTest(){const e=parseInt(document.getElementById("testIterations").value)||1e3,t=document.getElementById("probabilityTestResults");t.style.display="block",t.textContent=`⏳ Running ${e} test spins...

Please wait...`,setTimeout(()=>{try{const n=JSON.stringify(y().getPrizes()),i=y().getPrizes(),s={},o={},a=[];i.forEach(d=>{s[d.name]=0,o[d.name]=d.quantity});let l=0;for(let d=0;d<e;d++){const h=y().getPrizes().filter(w=>w.quantity>0||w.unlimitedConsolation);if(h.length===0)break;const f=h.reduce((w,P)=>w+P.chance,0);let x=Math.random()*f;a.push(x);let C=0;for(const w of h)if(C+=w.chance,x<=C){if(s[w.name]++,!w.unlimitedConsolation){const P={...w,quantity:w.quantity-1};y().updatePrize(P)}break}l++}const c=y().getPrizes();let r=`📊 Final Results after ${l} spins:
`;r+=`${"─".repeat(105)}
`,r+=`${"Prize".padEnd(20)} ${"Wins".padStart(8)} ${"Actual %".padStart(12)} ${"Expected %".padStart(14)} ${"Original Qty".padStart(14)} ${"Remaining".padStart(12)} ${"Status".padStart(15)}
`,r+=`${"─".repeat(105)}
`,i.sort((d,g)=>d.chance-g.chance).forEach(d=>{var M;const g=s[d.name]||0,h=(g/l*100).toFixed(2),f=d.chance.toFixed(2),x=((M=c.find(k=>k.id===d.id))==null?void 0:M.quantity)||0,C=o[d.name];let w="";d.unlimitedConsolation?w="♾️  UNLIMITED":x>0?w="✅ AVAILABLE":w="❌ EXHAUSTED";let P=d.name.length>18?d.name.substring(0,18)+"..":d.name;r+=`${P.padEnd(20)} `,r+=`${g.toString().padStart(8)} `,r+=`${(h+"%").padStart(12)} `,r+=`${(f+"%").padStart(14)} `,r+=`${C.toString().padStart(14)} `,r+=`${x.toString().padStart(12)} `,r+=`${w.padStart(15)}
`}),r+=`${"─".repeat(105)}

`;const p=Object.values(s).reduce((d,g)=>d+g,0),u=c.filter(d=>d.quantity>0||d.unlimitedConsolation).length;r+=`� SUMMARY:
`,r+=`   • Total spins completed: ${l} / ${e}
`,r+=`   • Total prizes won: ${p}
`,r+=`   • Prizes still available: ${u}

`,r+=`💡 NOTE: Quantities were modified during this test.
`,r+=`   Use "Reset Game & Clear Logs" to restore original values.
`,t.textContent=r}catch(n){t.textContent=`❌ Error running test:
${n.message}`}t.scrollIntoView({behavior:"smooth",block:"nearest"})},100)}resetGame(){y().resetAll(),this.refreshContent(),window.slotMachine&&window.slotMachine.initialize(),alert("Game has been reset successfully!")}refreshLogs(){const e=document.getElementById("spinLogs"),t=y().getLogs();if(e.innerHTML="",t.length===0){e.innerHTML="<p>No spins recorded yet.</p>";return}t.forEach((n,i)=>{const s=document.createElement("div");s.className="log-entry";const o=new Date(n.timestamp).toLocaleString(),a=t.length-i,l=n.randomValue!==void 0?`<br>Random: ${n.randomValue.toFixed(3)}`:"",c=n.totalChance!==void 0?`<br>Total Chance: ${n.totalChance.toFixed(1)}%`:"";s.innerHTML=`
                <strong>${o}</strong><br>
                Spin #${a}<br>
                Prize: ${n.prizeName}${l}${c}
                ${n.gameMode==="duration"?`<br>Remaining in deck: ${n.remainingInDeck}`:""}
            `,e.appendChild(s)})}refreshSlotMachine(){window.slotMachine&&window.slotMachine.populateReels()}handleQuantityChange(e){const t=e.dataset.target,n=document.getElementById(t);if(!n)return;let i=parseInt(n.value)||0;e.classList.contains("plus-btn")?i++:i=Math.max(0,i-1),n.value=i,n.dispatchEvent(new Event("input",{bubbles:!0}))}}function O(){const b=document.getElementById("adminConfirmModal"),e=document.getElementById("adminConfirmYes"),t=document.getElementById("adminConfirmNo");b.classList.remove("hidden");function n(){b.classList.add("hidden"),adminPanel.show(),s()}function i(){b.classList.add("hidden"),s()}function s(){e.removeEventListener("click",n),t.removeEventListener("click",i)}e.addEventListener("click",n),t.addEventListener("click",i),e.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()}),t.addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick()})}window.showAdminLogin=O;window.adminPanel=new H;class j{constructor(){this.cachedPrizes=null,this.cachedAvailablePrizes=null,this.cachedTotalChance=null,this.lastPrizeUpdate=0,this.preloadedAssets=null,this.initialize(),this.setupEventListeners()}onAssetsLoaded(e){this.preloadedAssets=e,console.log("✅ Slot machine received preloaded assets:",e.size),this.updatePrizeDisplay(),this.populateReels(),this.optimizeImageLoading()}optimizeImageLoading(){document.querySelectorAll("img").forEach(t=>{const n=this.getPreloadedImage(t.src);n&&(t.src=n.src,t.style.opacity="1",t.style.transition="opacity 0.3s ease")})}getPreloadedImage(e){if(!this.preloadedAssets)return null;for(let[t,n]of this.preloadedAssets)if(t===e||t.includes(e)||e.includes(t))return n.element;return null}initialize(){this.updatePrizeDisplay(),this.populateReels(),this.initializeAnimations(),setTimeout(()=>{window.soundManager&&window.soundManager.onBackgroundStart()},2e3)}setupEventListeners(){let e=!1;document.getElementById("spinButton").addEventListener("click",()=>{e||animationManager.isSpinning||(e=!0,setTimeout(()=>e=!1,5500),window.soundManager&&window.soundManager.onButtonClick(),this.spin())}),document.getElementById("closePopup").addEventListener("click",()=>{window.soundManager&&window.soundManager.onButtonClick(),animationManager.closePrizePopup()});let t=!1;document.addEventListener("keydown",n=>{const i=document.getElementById("prizePopup"),s=document.getElementById("spinButton"),o=i&&!i.classList.contains("hidden"),a=s&&s.disabled;(n.key==="Enter"||n.key===" ")&&!t&&!animationManager.isSpinning&&!o&&!a&&(n.preventDefault(),t=!0,setTimeout(()=>t=!1,300),this.spin())})}updatePrizeDisplay(){const e=document.getElementById("prizeList"),t=storageManager.getPrizes(),n=Date.now();if(this.cachedPrizes&&JSON.stringify(this.cachedPrizes)===JSON.stringify(t)&&n-this.lastPrizeUpdate<100)return;this.cachedPrizes=[...t],this.lastPrizeUpdate=n,this.clearPrizeCache();const i=document.createDocumentFragment(),s=t.reduce((o,a)=>a.chance>o.chance?a:o,t[0]||{chance:0});t.filter(o=>o.id!==s.id).forEach(o=>{const a=document.createElement("div");a.className="prize-item",o.quantity===0&&a.classList.add("out-of-stock"),a.innerHTML=`
                <img src="${o.image}" alt="${o.name}" onerror="this.onerror=null; this.style.display='none';">
                <span>${o.name}</span>
                ${o.quantity===0?'<div class="out-of-stock-overlay"><div class="x-mark">X</div></div>':""}
            `,i.appendChild(a)}),e.innerHTML="",e.appendChild(i),setTimeout(()=>{animationManager.animatePrizeShowcase()},100)}clearPrizeCache(){this.cachedAvailablePrizes=null,this.cachedTotalChance=null}getAvailablePrizes(e){return this.cachedAvailablePrizes||(this.cachedAvailablePrizes=e.filter(t=>t.quantity>0||t.unlimitedConsolation),this.cachedTotalChance=this.cachedAvailablePrizes.reduce((t,n)=>t+n.chance,0)),{prizes:this.cachedAvailablePrizes,totalChance:this.cachedTotalChance}}populateReels(){const e=storageManager.getPrizes();animationManager.populateReels(e)}initializeAnimations(){animationManager.initializeButtonEffects()}spin(){if(animationManager.isSpinning)return;this.clearPrizeCache();const e=storageManager.getPrizes();if(e.length===0){alert("No prizes available! Please add some prizes in the admin panel.");return}const{prize:t,randomValue:n}=this.determineWinningPrize(e);if(!t){alert("No more prizes available!");return}this.lastRandomValue=n;let i=[],s=t;const o=e.reduce((a,l)=>l.chance>a.chance?l:a,e[0]||{chance:0});if(t.id===o.id){const a=e.filter(l=>l.id!==o.id);if(a.length===0)i=[o,o,o];else{const l=Math.floor(Math.random()*a.length);let c=Math.floor(Math.random()*a.length),r=Math.floor(Math.random()*a.length);if(Math.random()<.5)c=l;else for(;c===l&&a.length>1;)c=Math.floor(Math.random()*a.length);for(;(r===l||r===c)&&a.length>1;)r=Math.floor(Math.random()*a.length);i=[a[l],a[c],a[r]]}i[0].id===i[1].id&&i[1].id===i[2].id?s=i[0]:s=o}else i=[t,t,t],s=t;s={...s,isDefault:s.id===o.id},this.logSpin(s),animationManager.spinReels(s,e,i)}determineWinningPrize(e){return this.selectPrizeByProbability(e)}selectPrizeByProbability(e){const{prizes:t,totalChance:n}=this.getAvailablePrizes(e);if(this.lastTotalChance=n,t.length===0)return console.log("❌ No prizes available - all quantities exhausted!"),{prize:null,randomValue:0};if(n===0)return{prize:t[Math.floor(Math.random()*t.length)],randomValue:0};let i=Math.random()*n;console.log("🎲 Spin - Available prizes:",t.length,"Total chance:",n),console.log("   Random value:",i.toFixed(3)),console.log("   📋 Prize pool breakdown:");let s=null,o=0;for(const a of t){const l=o;o+=a.chance;const c=o,r=a.unlimitedConsolation?" [UNLIMITED]":"",m=(a.chance/n*100).toFixed(2);if(console.log(`      ${a.name}: Range ${l.toFixed(1)}-${c.toFixed(1)} | Chance: ${a.chance}% of ${n} = ${m}% actual | Qty: ${a.quantity}${r}`),i<=o&&!s){if(s=a,console.log(`   ✅ Selected: ${a.name} (random ${i.toFixed(3)} fell in range ${l.toFixed(1)}-${c.toFixed(1)})`),a.unlimitedConsolation)console.log(`   ♾️ ${a.name} is unlimited - quantity remains at ${a.quantity}`);else{const p={...a,quantity:a.quantity-1};storageManager.updatePrize(p),console.log(`   📦 ${a.name} quantity: ${a.quantity} → ${p.quantity}`),p.quantity===0&&console.log(`   🚫 ${a.name} is now exhausted and will be removed from future spins!`),this.clearPrizeCache()}break}}return s||(s=t[t.length-1],console.log("⚠️ Fallback selected:",s.name)),{prize:s,randomValue:i}}testProbabilityAccuracy(e=100){console.log(`
🧪 Testing quantity-based probability system with ${e} iterations...`);const t=storageManager.getPrizes(),n={},i={};t.forEach(c=>{n[c.name]=0,i[c.name]=c.quantity}),console.log(`
📦 Starting quantities:`),t.forEach(c=>{const r=c.unlimitedConsolation?" [UNLIMITED ♾️]":"";console.log(`  ${c.name}: ${c.quantity} (${c.chance}%)${r}`)});let s=0;for(let c=0;c<e;c++){const r=storageManager.getPrizes();if(r.filter(u=>u.quantity>0||u.unlimitedConsolation).length===0){console.log(`
🏁 All prizes exhausted after ${c} spins!`);break}const{prize:p}=this.selectPrizeByProbability(r);p&&(n[p.name]++,s++)}console.log(`
📊 Final Results after `+s+" spins:"),console.log("Prize			Wins	Actual %	Expected %	Original Qty	Remaining	Status"),console.log("─".repeat(95));const o=storageManager.getPrizes();Object.keys(n).sort((c,r)=>{const m=t.find(u=>u.name===c),p=t.find(u=>u.name===r);return((m==null?void 0:m.chance)||0)-((p==null?void 0:p.chance)||0)}).forEach(c=>{const r=o.find(x=>x.name===c),m=n[c],p=(m/s*100).toFixed(2),u=r?r.chance.toFixed(2):"0.00",d=i[c],g=r?r.quantity:0,f=r&&r.unlimitedConsolation?"♾️ UNLIMITED":g===0?"❌ EXHAUSTED":"✅ AVAILABLE";console.log(`${c.padEnd(20)}	${m}	${p}%		${u}%		${d}		${g}		${f}`)});const l=Object.values(n).reduce((c,r)=>c+r,0);console.log(`
📈 Summary:`),console.log(`  Total spins completed: ${s} / ${e}`),console.log(`  Total prizes won: ${l}`),console.log(`  Prizes still available: ${o.filter(c=>c.quantity>0||c.unlimitedConsolation).length}`),console.log(`
✅ Test completed. Quantities decreased as prizes were won (except unlimited).`),console.log("💡 Reset the game to restore original quantities.")}logSpin(e){const t={prizeName:e.name,gameMode:"Probability",randomValue:this.lastRandomValue||0,totalChance:this.lastTotalChance||0};storageManager.addLog(t)}}document.addEventListener("DOMContentLoaded",()=>{window.slotMachine=new j,window.testProbability=(b=1e3)=>{window.slotMachine.testProbabilityAccuracy(b)},console.log("🎰 Slot Machine loaded! Test probability with: testProbability(1000)")});class A{constructor(){this.isExpanded=!1,this.button=null,this.icon=null}initialize(){var e;this.button=document.getElementById("expandButton"),this.icon=(e=this.button)==null?void 0:e.querySelector(".expand-icon"),this.button&&this.button.addEventListener("click",()=>this.toggleExpand())}toggleExpand(){this.isExpanded=!this.isExpanded,this.isExpanded?(document.body.classList.add("expanded-mode"),this.button.title="Collapse to normal size",this.icon.textContent="⛶"):(document.body.classList.remove("expanded-mode"),this.button.title="Expand to full screen",this.icon.textContent="⛶")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.expandButtonManager=new A,window.expandButtonManager.initialize()}):(window.expandButtonManager=new A,window.expandButtonManager.initialize());class W{constructor(){this.mode="high-quality",this.listeners=[],this.initialized=!1,this.config={name:"High Quality Mode",settings:{useGSAPAnimations:!0,enableParticleEffects:!0,useAdvancedEasing:!0,enableSoundOverlap:!0,enableHoverEffects:!0,enableShadowEffects:!0,animationDuration:"normal",enableBackgroundEffects:!0}}}getMode(){return this.mode}getSettings(){return this.config.settings}isEnabled(e){return this.config.settings[e]===!0}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}initialize(){this.initialized||(this.applyOptimizations(),this.initialized=!0)}initializeMode(e){this.initialized||this.initialize()}applyOptimizations(){document.body.classList.remove("performance-low"),document.body.classList.add("performance-high")}}const B=new W;typeof window<"u"&&(window.performanceManager=B);window.performanceManager=B;async function $(){window.performanceManager.initializeMode("high-quality"),z.show(),await D.preloadAssets((b,e,t)=>{z.updateProgress(b,e,t)},b=>{setTimeout(()=>{z.hide(),U(b)},300)})}function U(b){const e=document.querySelector(".slot-machine-cabinet");e&&(e.style.opacity="1",e.style.transition="opacity 0.5s ease-in"),window.slotMachine&&window.slotMachine.onAssetsLoaded&&window.slotMachine.onAssetsLoaded(b)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$):$();
