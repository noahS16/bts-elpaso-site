import { addCity, getAllStats, getUniquePlaces } from '../../services/army-map-client.js';
import { showCityExistsModal } from '../scripts/modal.js';
// Render map
const map = L.map('map', {
    scrollWheelZoom: true,
    minZoom: 2,
    maxZoom: 18,
}).setView([31.7619, -106.4850], 3);
const bounds = L.latLngBounds(
    L.latLng(-85, -180),
    L.latLng(85, 180)
);
map.on('drag', () => {
    map.panInsideBounds(bounds, { animate: false });
});
map.setMaxBounds(bounds);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);
setTimeout(() => map.invalidateSize(), 200);

// Display army data
async function updateArmyDataDisplay() {
    const stats = await getAllStats();
    //console.log('Army Stats:', stats);
    document.getElementById('totalArmy').textContent = stats.totalArmy.toLocaleString();
    document.getElementById('totalCountries').textContent = stats.totalCountries.toLocaleString();
    document.getElementById('highestPopulation').textContent = stats.highestPopulation;
    document.getElementById('furthestCityName').textContent = stats.furthestArmy.city;
    document.getElementById('furthestCityMiles').textContent = stats.furthestArmy.distance_miles.toFixed(1).concat(" ", "miles");
}

async function populateMapMarkers() {
    const places = await getUniquePlaces();
    places.forEach(place => {
        pinCity(place);
    });
}

updateArmyDataDisplay();
populateMapMarkers();


// Search functionality
const searchInput = document.getElementById('citySearch');
const resultsList = document.getElementById('results');
let marker;
let typingTimer;
const TYPING_DELAY = 300; // milliseconds



function debounce(fn, delay = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

searchInput.addEventListener('input', debounce(async () => {
    const query = searchInput.value.trim();
    //console.log('Searching for:', query);
    if (query.length < 3) {
        resultsList.classList.add('hidden');
        return;
    }

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&city=${query}&limit=15&addressdetails=1`
    );

    const data = await res.json();
    console.log('Search results:', data);

    resultsList.innerHTML = '';
    resultsList.classList.remove('hidden');

    data.forEach(place => {
        const li = document.createElement('li');
        li.className =
            'px-4 py-3 hover:bg-gray-100 cursor-pointer text-lg';

        li.textContent = getPlaceLabel(place);

        li.onclick = async () => {
            if (localStorage.getItem('cityAdded')) { console.log("You have already added a city this session."); showCityExistsModal(); }
            else {
                searchInput.value = getPlaceLabel(place);
                await addCity(place);
                localStorage.setItem('cityAdded', 'true');
                await updateArmyDataDisplay()
                pinCity(place);
            }

        };

        resultsList.appendChild(li);
    });
}));

function getPlaceLabel(place) {
    const addr = place.address || {};

  const locality =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    addr.hamlet ||
    addr.county ||
    '';

  const parts = [
    locality,
    addr.state,
    addr.country
  ].filter(Boolean);

  return parts.join(', ');
}

// Pin to map
function pinCity(place) {
    const { city, state, country, population, lat, lon } = place;
    const armySvgIcon = L.divIcon({
        className: 'army-marker', // prevent default styles
        html: `
    <svg width="36" height="36" viewBox="0 0 24 24"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C7.6 2 4 5.6 4 10c0 5.3 8 12 8 12s8-6.7 8-12c0-4.4-3.6-8-8-8z"
        fill="#7C3AED"/>
      <circle cx="12" cy="10" r="3" fill="white"/>
    </svg>
  `,
        iconSize: [36, 36],
        iconAnchor: [18, 36], // bottom center
    });

    // Center map
    map.setView([lat, lon], 6);

    // Add marker
    const marker = L.marker([lat, lon], { icon: armySvgIcon })
        .addTo(map)
        .bindPopup(
            cityPopupCard({ city, state, country, population }),
            {
                closeButton: false,
                offset: [0, -36],
                className: 'font-solano p-0 m-0'
            }
        );


    // UI cleanup

    resultsList.classList.add('hidden');
}

function cityPopupCard(data) {
  return `
    <div class="flex flex-row w-full items-center justify-between min-w-[200px] m-0">
        <div class="flex flex-col gap-0.5">
            <h3 class="text-2xl font-bold text-purple-600 m-0">${data.city}</h3>
            <span class="text-base">${data.country}</span>
        </div>
        <span class="text-end font-bold text-4xl text-red-500">${data.population}</span>
    </div>
  `;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#citySearch')) {
        resultsList.classList.add('hidden');
    }
});