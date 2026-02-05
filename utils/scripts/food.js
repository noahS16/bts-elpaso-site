import { restaurants, categoryPhotos } from './restaurants.js';

const cardsContainer = document.getElementById('cardsContainer');
const categoryButtons = document.querySelectorAll('.category-btn');

function renderCards(category) {
    cardsContainer.innerHTML = `<img src="${categoryPhotos[category]}" class="rounded-full object-cover">`;

    let items = [];
    if (category === 'All') {
        items = Object.values(restaurants).flat();
    } else {
        items = restaurants[category] || [];
    }

    items.forEach((item, index) => {
        const card = document.createElement('div');

        card.className =
            'bg-white/90 backdrop-blur-sm rounded-xl shadow-md px-0 text-center flex flex-col items-center card-animate';

        // stagger delay
        card.style.animationDelay = `${index * 60}ms`;

        card.innerHTML = `
  <img src="${item.image}" alt="${item.name}"
    class="w-full h-36 object-cover rounded-md mb-3">

  <h3 class="font-bold text-2xl mb-1">${item.name}</h3>

  <div class="flex flex-row items-center justify-between w-full px-3">
    ${
      item.miles
        ? `
          <p class="flex items-center gap-1 text-xl text-gray-600 mb-1">
            <img src="../icons/map-pin.svg" alt="" class="w-5 h-5" />
            ${item.miles}mi
          </p>
        `
        : ''
    }

    <a href="${item.link}" class="text-xl text-red-500 font-bold hover:underline">
      View
    </a>
  </div>
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