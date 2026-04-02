import { activities, localEvents } from '/src/data/activities.js';
import { getCurrentLang, onLangChange } from '/services/languages';

const placesCardsContainer = document.getElementById('placesCardsContainer');
const localEventsCardsContainer = document.getElementById('localEventsCardsContainer');

renderAll();
onLangChange(()=>renderAll());

function renderAll() {
  placesCardsContainer.innerHTML = '';
  localEventsCardsContainer.innerHTML = '';

  activities.forEach(activity => {
    const card = renderPlaceCard(activity);
    placesCardsContainer.appendChild(card);
  });

  localEvents.forEach(event => {
    const card = renderLocalEventCard(event);
    localEventsCardsContainer.appendChild(card);
  });
}


function renderPlaceCard(activity) {
  const card = document.createElement('div');
  card.className = `
    bg-white rounded-xl shadow-md overflow-hidden
    transition-transform duration-200 hover:-translate-y-1
  `;
  const lang = getCurrentLang();
  const description = lang === 'es' && activity.descriptionEs
    ? activity.descriptionEs
    : activity.description;

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
            target=target="_blank" rel="noopener noreferrer"
            class="category-btn bg-red-500 text-white p-2 px-3 rounded-xl font-bold whitespace-nowrap"
          >
            ${lang == 'en' ? "View map" : "Mapa"}
          </a>
        ` : ''}

        ${activity.siteLink ? `
          <a
            href="${activity.siteLink}"
            target=target="_blank" rel="noopener noreferrer"
            class="category-btn bg-purple-400 text-white p-2 px-3 rounded-xl font-bold"
          >
            ${lang == 'en' ? "Website" : "Sitio Web"}
          </a>
        ` : ''}
      </div>
        </div>
      

      <p class=" leading-snug">
        ${description}
      </p>

    </div>
  `;

  return card;
}

function renderLocalEventCard(localEvent) {
  const card = document.createElement('div');
  const lang = getCurrentLang();
  const description = lang == 'es' ? localEvent.descriptionEs : localEvent.description;
  card.className = 'bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1';
  card.innerHTML = `<img src="${localEvent.image}" alt="${localEvent.name}" class="w-full h-55">
                        <div class="p-3 flex flex-col gap-2">
                            <div class="flex flex-row justify-between items-center">
                                <div>
                                    <h3 class="text-3xl font-semibold">${localEvent.name}</h3>
                                    <span class="font-bold text-2xl text-red-500">${localEvent.date}</span>
                                </div>
                                
                                <div>
                                    <a href="${localEvent.siteLink}" target="_blank" rel="noopener noreferrer" class="category-btn bg-purple-400 text-white p-3 rounded-xl font-bold">
                                        ${lang == 'en' ? "More Info" : "Más Info"}
                                    </a>
                                </div>
                            </div>

                            <div>
                                <span>${description}</span>
                            </div>
                        </div>`;
  return card;
}