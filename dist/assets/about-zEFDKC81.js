import"./menu-6ByEY3Xw.js";import"./scroll-ClpmlOO1.js";const s=[{question:"Is El Paso safe for visitors?",answer:"Yes! El Paso is consistently ranked as one of the safest large cities in the United States. Downtown and tourist areas are very visitor-friendly."},{question:"What is the weather like in May?",answer:"Expect warm, sunny days with average highs around 85–90°F (29–32°C). Evenings can be breezy, so a light jacket is recommended."},{question:"What time should I arrive to the concert?",answer:"We suggest arriving 2-3 hours before the concert starts. This gives you time to hang out with other ARMY, take freebies, and photos."},{question:"How is traffic?",answer:"Traffic will definitely get heavy around the start and end of the show."},{question:"Where can I park?",answer:"Parking is available around UTEP/Sun Bowl but will fill up fast. Paid lots and garages are close, and there is free street and campus parking further away (a few blocks to a mile). We suggest ride share and arriving early if you plan to drive."}],n=document.getElementById("faqContainer");n.innerHTML=s.map((e,a)=>`
    <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
      <button
        class="faq-toggle w-full flex justify-between items-center px-4 py-4 text-left font-bold text-xl"
        aria-expanded="false"
        data-index="${a}"
      >
        <span>${e.question}</span>
        <span class="transition-transform duration-300">▾</span>
      </button>

      <div class="faq-answer max-h-0 overflow-hidden transition-all duration-300 px-4">
        <p class="pb-4 text-lg font-normal text-gray-700">
          ${e.answer}
        </p>
      </div>
    </div>
  `).join("");const r=document.querySelectorAll(".faq-toggle");r.forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("aria-expanded")==="true";if(document.querySelectorAll(".faq-toggle").forEach(t=>{t.setAttribute("aria-expanded","false"),t.nextElementSibling.style.maxHeight=null,t.querySelector("span:last-child").style.transform="rotate(0deg)"}),!a){e.setAttribute("aria-expanded","true");const t=e.nextElementSibling;t.style.maxHeight=t.scrollHeight+"px",e.querySelector("span:last-child").style.transform="rotate(180deg)"}})});
