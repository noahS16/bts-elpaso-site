import { bars } from './bars.js';

const container = document.getElementById('nightlifeCardsContainer');
let openVenues = null;
let openButton = null;

bars.forEach(category => {
  console.log('Rendering category:', category)
  const card = renderCard(category);
  container.appendChild(card);
});

function renderCard(category) {
  const card = document.createElement('div');
  card.className = `
    bg-white rounded-xl shadow-md overflow-hidden
    transition-transform duration-200 hover:-translate-y-1
  `;

  card.innerHTML = `
  <img
    src="${category.image}"
    alt="${category.name}"
    class="w-full h-44 object-cover"
  />

  <div class="px-2 mt-2 flex flex-col gap-3">
    <!-- Header row -->
    <div class="flex justify-between items-center">
      <h3 class="text-3xl font-bold">${category.name}</h3>

      ${category.mapLink ? `
        
      ` : ''}
      <button
      class="text-2xl toggle-btn font-bold text-purple-400 self-center"
      aria-expanded="false"
    >
      View spots ▾
    </button>
    </div>

    <!-- Toggle -->
    

    <!-- Dropdown -->
    <div class="venues overflow-hidden transition-all duration-300 max-h-0 flex flex-col gap-3">

      <!-- Category description (now inside dropdown) -->
      <p class="text-gray-600 leading-snug px-1">
        ${category.description}
      </p>

      <!-- Venue list -->
      <div class="flex flex-col gap-2 overflow-auto max-h-64 py-1">
        ${category.venues.map(venue => `
          <a
            href="${venue.mapLink || '#'}"
            target="_blank"
            class="block px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <!-- Header row -->
            <div class="flex items-center justify-between">
              <span class="font-medium">${venue.name}</span>
              <span class="text-gray-500 flex items-center h-full">Map →</span>
            </div>

            <!-- Description -->
            ${venue.description ? `
              <p class="text-gray-600 mt-1 leading-snug">
                ${venue.description}
              </p>
            ` : ''}
          </a>
        `).join('')}
      </div>

    </div>
  </div>
`;

  const toggleBtn = card.querySelector('.toggle-btn');
  const venues = card.querySelector('.venues');

  toggleBtn.addEventListener('click', () => {
    const isOpen = venues.classList.contains('max-h-96');

    // Close previously open card
    if (openVenues && openVenues !== venues) {
      openVenues.classList.remove('max-h-96');
      openVenues.classList.add('max-h-0');
      openButton.textContent = 'View spots ▾';
      openButton.setAttribute('aria-expanded', 'false');
    }

    // Toggle current card
    if (!isOpen) {
      venues.classList.remove('max-h-0');
      venues.classList.add('max-h-96');
      toggleBtn.textContent = 'Hide spots ▴';
      toggleBtn.setAttribute('aria-expanded', 'true');

      openVenues = venues;
      openButton = toggleBtn;
    } else {
      venues.classList.add('max-h-0');
      venues.classList.remove('max-h-96');
      toggleBtn.textContent = 'View spots ▾';
      toggleBtn.setAttribute('aria-expanded', 'false');

      openVenues = null;
      openButton = null;
    }
  });

  return card;
}