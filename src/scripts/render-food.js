import { restaurants, categoryPhotos } from '../data/restaurants.js';

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
        <div class="food-card-img">
            <img src="${item.image || '/utils/images/placeholder.jpg'}" 
                 alt="${item.name}" loading="lazy" />
            <span class="food-card-category">${item.category}</span>
            ${item.multipleLocations ? `
                <div class="food-card-multi">
                    <img src="/utils/icons/multiple-loc.svg" class="w-2 h-2 p-1" alt="Multiple locations" />
                </div>` : ''}
        </div>
        <div class="food-card-body">
            <p class="food-card-name">${item.name}</p>
            <div class="food-card-meta">
                ${item.miles ? `
                    <span class="food-card-miles">
                        <img src="/utils/icons/map-pin.svg" class="w-4 h-4" alt="" />
                        ${item.miles} mi
                    </span>` : '<span></span>'}
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" 
                   class="food-card-link">GO ↗</a>
            </div>
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