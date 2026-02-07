import { activities } from './activities.js';

const container = document.getElementById('gridCardsContainer');

activities.forEach(activity => {
    const card = renderCard(activity);
    container.appendChild(card);
});

function renderCard(activity) {
    const card = document.createElement('div');
    card.className = `
    bg-white rounded-xl shadow-md overflow-hidden
    transition-transform duration-200 hover:-translate-y-1
  `;

    card.innerHTML = `
    <img
      src="${activity.image}"
      alt="${activity.name}"
      class="w-full h-44 object-cover"
    />

    <div class="p-4 flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between">
            <h3 class="text-3xl font-bold">
                ${activity.name}
            </h3>
            <div class="flex flex-row gap-2">
        ${activity.mapLink ? `
          <a
            href="${activity.mapLink}"
            target="_blank"
            class="category-btn bg-red-500 text-white px-4 py-2 rounded-full font-bold"
          >
            View map
          </a>
        ` : ''}

        ${activity.siteLink ? `
          <a
            href="${activity.siteLink}"
            target="_blank"
            class="category-btn bg-purple-500 text-white px-4 py-2 rounded-full font-bold"
          >
            Website
          </a>
        ` : ''}
      </div>
        </div>
      

      <p class=" leading-snug">
        ${activity.description}
      </p>

    </div>
  `;

    return card;
}