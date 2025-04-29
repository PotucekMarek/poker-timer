(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function w(){const e=document.getElementById("rounds-container");if(e){e.innerHTML="";for(let t=1;t<=15;t++)v(t),(t===6||t===12)&&E()}}function v(e){const t=document.getElementById("rounds-container");if(!t)return;const n=document.createElement("div");n.className="round-row mb-4";const l=e*100,o=l*2,s=10;n.innerHTML=`
    <div class="round-column">
      <label class="form-label">Round ${e} – Small Blind</label>
      <div class="input-group">
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('small${e}', -100)">-100</button>
        <input type="number" class="form-control text-center" id="small${e}" step="100" min="0" value="${l}" />
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('small${e}', 100)">+100</button>
      </div>
    </div>
    <div class="round-column">
      <label class="form-label">Big Blind</label>
      <div class="input-group">
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('big${e}', -100)">-100</button>
        <input type="number" class="form-control text-center" id="big${e}" step="100" min="0" value="${o}" />
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('big${e}', 100)">+100</button>
      </div>
    </div>
    <div class="round-column">
      <label class="form-label">Čas (minuty)</label>
      <div class="input-group">
        <input type="number" class="form-control text-center" id="time${e}" min="1" value="${s}" />
        <button type="button" class="btn btn-outline-danger ms-2" onclick="this.closest('.round-row')?.remove(); reindexRounds();">
          🗑️
        </button>
      </div>
    </div>
  `,t.appendChild(n)}function E(){const e=document.getElementById("rounds-container");if(!e)return;const t=document.createElement("div");t.className="round-row mb-4",t.setAttribute("data-pause","true");const n=`pause${Date.now()}`;t.innerHTML=`
    <div class="round-column">
      <label class="form-label">Pause</label>
    </div>
    <div class="round-column"></div>
    <div class="round-column">
      <label class="form-label">Čas (minuty)</label>
      <div class="input-group">
        <input type="number" class="form-control text-center" id="${n}" min="1" value="10" />
        <button type="button" class="btn btn-outline-danger ms-2" onclick="this.closest('.round-row')?.remove(); reindexRounds();">
          🗑️
        </button>
      </div>
    </div>
  `,e.appendChild(t)}function h(){const e=document.querySelectorAll("#rounds-container .round-row").length;v(e+1),f()}function I(){E(),f()}function $(){const e=document.getElementById("globalTimeInput");if(!e)return;const t=Number(e.value);document.querySelectorAll("#rounds-container input[id^=time]").forEach(l=>{l.value=t.toString()})}function f(){const e=document.querySelectorAll("#rounds-container .round-row");let t=1;e.forEach(n=>{if(!n.hasAttribute("data-pause")){const o=n.querySelector(".round-column label");o&&(o.textContent=`Round ${t} – Small Blind`,t++)}})}function g(e){const n=document.querySelectorAll("#rounds-container .round-row")[e];if(!n)return;const l=n.hasAttribute("data-pause"),o=document.getElementById("blinds-combined"),s=document.getElementById("ante");let i=600;if(l){o&&(o.textContent="Pause"),s&&(s.textContent="");const c=n.querySelector("input[type=number]");i=(Number(c==null?void 0:c.value)||10)*60}else{const c=n.querySelector("input[id^='small']"),r=n.querySelector("input[id^='big']"),d=n.querySelector("input[id^='time']");c&&r&&o&&(o.textContent=`${c.value} / ${r.value}`),s&&r&&(s.textContent=`Ante: ${r.value}`),i=(Number(d==null?void 0:d.value)||10)*60}L(i)}let B,a=0,u=600,b=600,p=!1;function x(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function C(){const e=document.getElementById("progressBar");if(!e||b<=0)return;const t=Math.max(0,u/b*100);e.style.width=`${t}%`,e.classList.remove("bg-success","bg-warning","bg-danger"),t>66?e.classList.add("bg-success"):t>33?e.classList.add("bg-warning"):e.classList.add("bg-danger")}function R(){const e=document.getElementById("clock"),t=document.getElementById("playPauseToggle");p=!0,t==null||t.classList.replace("bi-play-circle-fill","bi-pause-circle-fill"),t==null||t.setAttribute("title","Pozastavit (mezerník)"),B=window.setInterval(()=>{if(u<=0){T();return}u--,e&&(e.textContent=x(u)),C()},1e3)}function S(){const e=document.getElementById("playPauseToggle");p=!1,clearInterval(B),e==null||e.classList.replace("bi-pause-circle-fill","bi-play-circle-fill"),e==null||e.setAttribute("title","Spustit (mezerník)");const t=document.getElementById("progressBar");t&&(t.classList.remove("bg-success","bg-warning","bg-danger"),t.classList.add("bg-primary"))}function y(){p?S():(u<=0&&g(a),R())}function T(){const e=document.querySelectorAll("#rounds-container .round-row");if(a>=e.length){S(),console.log("Konec kol.");return}a++,g(a)}function L(e){u=e,b=e}function k(){const e=document.getElementById("blindForm");e&&new bootstrap.Modal(e).show()}function q(){var c;const e=document.querySelectorAll("#rounds-container .round-row");if(e.length===0)return;g(0);const t=e[0];if(!t)return;const n=document.getElementById("blinds-combined"),l=document.getElementById("ante"),o=document.getElementById("clock");let s=600;if(t.hasAttribute("data-pause")){n&&(n.textContent="Pause"),l&&(l.textContent="");const r=t.querySelector("input[type=number]");s=(Number(r==null?void 0:r.value)||10)*60}else{const r=t.querySelector("input[id^='small']"),d=t.querySelector("input[id^='big']"),m=t.querySelector("input[id^='time']");r&&d&&n&&(n.textContent=`${r.value} / ${d.value}`),l&&d&&(l.textContent=`Ante: ${d.value}`),s=(Number(m==null?void 0:m.value)||10)*60}L(s),o&&(o.textContent=N(s)),A();const i=document.getElementById("blindForm");i&&((c=bootstrap.Modal.getInstance(i))==null||c.hide())}function A(){const e=document.getElementById("saveMessage");e&&(e.classList.remove("d-none"),e.style.opacity="1",setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.classList.add("d-none"),300)},3e3))}function N(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function M(){window.addEventListener("load",()=>{setTimeout(()=>{document.body.classList.add("loaded")},500)})}M();window.addEventListener("DOMContentLoaded",()=>{w();const e=document.getElementById("openForm"),t=document.getElementById("saveBlinds"),n=document.getElementById("applyGlobalTimeBtn"),l=document.getElementById("playPauseToggle"),o=document.getElementById("addRoundBtn"),s=document.getElementById("addPauseBtn"),i=document.getElementById("blindForm"),c=document.getElementById("bottom-controls");e==null||e.addEventListener("click",k),t==null||t.addEventListener("click",q),n==null||n.addEventListener("click",$),l==null||l.addEventListener("click",y),o==null||o.addEventListener("click",h),s==null||s.addEventListener("click",I),i&&c&&(i.addEventListener("show.bs.modal",()=>{c.classList.remove("d-none")}),i.addEventListener("hide.bs.modal",()=>{c.classList.add("d-none")})),document.addEventListener("keydown",d=>{d.code==="Space"&&(d.preventDefault(),y())});const r=document.getElementById("clock");r&&(r.textContent="10:00")});window.adjustBlind=(e,t)=>{const n=document.getElementById(e);if(n){const l=Number(n.value)||0;n.value=Math.max(0,l+t).toString()}};window.reindexRounds=f;
