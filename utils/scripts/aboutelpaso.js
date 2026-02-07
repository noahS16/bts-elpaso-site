import { faqs } from './faq.js';

const faqContainer = document.getElementById("faqContainer");


faqContainer.innerHTML = faqs
    .map(
        (faq, index) => `
    <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
      <button
        class="faq-toggle w-full flex justify-between items-center px-4 py-4 text-left font-bold text-xl"
        aria-expanded="false"
        data-index="${index}"
      >
        <span>${faq.question}</span>
        <span class="transition-transform duration-300">▾</span>
      </button>

      <div class="faq-answer max-h-0 overflow-hidden transition-all duration-300 px-4">
        <p class="pb-4 text-lg font-normal text-gray-700">
          ${faq.answer}
        </p>
      </div>
    </div>
  `
    )
    .join("");

const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    // Close all
    document.querySelectorAll(".faq-toggle").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling.style.maxHeight = null;
      btn.querySelector("span:last-child").style.transform = "rotate(0deg)";
    });

    // Open selected
    if (!isOpen) {
      toggle.setAttribute("aria-expanded", "true");
      const answer = toggle.nextElementSibling;
      answer.style.maxHeight = answer.scrollHeight + "px";
      toggle.querySelector("span:last-child").style.transform = "rotate(180deg)";
    }
  });
});