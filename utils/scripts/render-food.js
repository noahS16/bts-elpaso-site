import { restaurants, categoryPhotos } from './data/restaurants.js';

const cardsContainer = document.getElementById('cardsContainer');
const categoryButtons = document.querySelectorAll('.category-btn');

function renderCards(category) {
    //cardsContainer.innerHTML = `<div class="flex items-center justify-center"><img src="${categoryPhotos[category]}" class="rounded-full "></div>`;
    cardsContainer.innerHTML = '';

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

  <div class="flex flex-row items-center justify-center gap-x-1">
    <h3 class="font-bold text-lg mb-0">${item.name}</h3>
    ${item.multipleLocations ? '<img src="../icons/multiple-loc.svg" class="w-4 h-4"/>' : ''}
  </div>

  <div class="flex flex-row items-center justify-between w-full px-3">
    ${
      item.miles
        ? `
          <p class="flex items-center gap-1 text-xl text-gray-600 mb-1">
            <img src="../icons/map-pin.svg" alt="" class="w-4 h-4" />
            ${item.miles}
          </p>
        `
        : ''
    }
    ${
      item.favorite
        ? `<img src="../icons/purple-heart.svg" alt="" class="w-4 h-4" />`: ''
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

    categoryButtons.forEach(b => {
      b.classList.remove('border-black', 'ring-2', 'ring-black');
      b.classList.add('border-transparent');
    });

    btn.classList.remove('border-transparent');
    btn.classList.add('border-black', 'ring-2', 'ring-black');
  });
});