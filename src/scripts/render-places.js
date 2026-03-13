import {activities, localEvents} from '/src/data/activities.js';

const placesCardsContainer = document.getElementById('placesCardsContainer');
const localEventsCardsContainer = document.getElementById('localEventsCardsContainer');


activities.forEach(activity => {
    const card = renderPlaceCard(activity);
    placesCardsContainer.appendChild(card);
});

localEvents.forEach(event => {
  const card = renderLocalEventCard(event);
  localEventsCardsContainer.appendChild(card);
});

function renderPlaceCard(activity) {
    const card = document.createElement('div');
    card.className = `
    bg-white rounded-xl shadow-md overflow-hidden
    transition-transform duration-200 hover:-translate-y-1
  `;

    card.innerHTML = `
    <img
      src="${activity.image}"
      alt="${activity.name}"
      class="w-full h-55 object-cover"
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
            class="category-btn bg-red-500 text-white px-4 py-2 rounded-full font-bold whitespace-nowrap"
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

function renderLocalEventCard(localEvent){
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1';
  card.innerHTML = `<img src="${localEvent.image}" alt="${localEvent.name}" class="w-full h-55">
                        <div class="p-3 flex flex-col gap-2">
                            <div class="flex flex-row justify-between items-center">
                                <div>
                                    <h3 class="text-3xl font-semibold">${localEvent.name}</h3>
                                    <span class="font-bold text-2xl text-red-500">${localEvent.date}</span>
                                </div>
                                
                                <div>
                                    <a href="${localEvent.siteLink}" target="_blank" class="category-btn bg-purple-500 text-white px-4 py-2 rounded-full font-bold">
                                        More Info
                                    </a>
                                </div>
                            </div>

                            <div>
                                <span>${localEvent.description}</span>
                            </div>
                        </div>`;
  return card;
}