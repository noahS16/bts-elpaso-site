import { restaurants } from './restaurants.js';

const cardsContainer = document.getElementById('cardsContainer');
const categoryButtons = document.querySelectorAll('.category-btn');

function renderCards(category) {
    cardsContainer.innerHTML = ''; // clear existing cards

    let items = [];
    if (category === 'All') {
        // flatten all categories
        items = Object.values(restaurants).flat();
    } else {
        items = restaurants[category] || [];
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white/90 backdrop-blur-sm rounded-xl shadow-md  p-4 text-center flex flex-col items-center';
        card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-full h-36 object-cover rounded-md mb-3">
      <h3 class="font-bold text-xl mb-1">${item.name}</h3>
      ${item.miles ? `<p class="text-gray-600 mb-2">${item.miles} miles from venue</p>` : ''}
      <a href="${item.link}" class="text-red-500 font-bold hover:underline">View</a>
    `;
        cardsContainer.appendChild(card);
    });
}

// Initial render
renderCards('All');

// Add click handlers
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        renderCards(cat);

        // Update active button style
        categoryButtons.forEach(b => b.classList.remove('bg-red-600'));
        btn.classList.add('bg-red-600');
    });
});