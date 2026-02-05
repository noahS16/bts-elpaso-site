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
    document.getElementById('furthestArmy').textContent = stats.furthestArmy;
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
    //console.log('Search results:', data);

    resultsList.innerHTML = '';
    resultsList.classList.remove('hidden');

    data.forEach(place => {
        const li = document.createElement('li');
        li.className =
            'px-4 py-3 hover:bg-gray-100 cursor-pointer text-lg';

        li.textContent = place.display_name;

        li.onclick = async () => {
            //if (localStorage.getItem('cityAdded')) { console.log("You have already added a city this session."); showCityExistsModal(); }
            if (true) {
                searchInput.value = place.display_name;
                await addCity(place);
                localStorage.setItem('cityAdded', 'true');
                await updateArmyDataDisplay()
                pinCity(place);
            }

        };

        resultsList.appendChild(li);
    });
}));

// Pin to map
function pinCity(place) {
    const{city, state, country, population, lat, lon} = place;
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
        className: 'army-leaflet-popup'
      }
    );


    // UI cleanup
    
    resultsList.classList.add('hidden');
}

function cityPopupCard(data) {
    return `
    <div class="army-popup">
      <h3 class="text-lg font-bold">${data.city}</h3>
      <p class="text-sm opacity-80">${data.state}, ${data.country}</p>

      <div class="mt-2 text-sm">
        <p><strong>ARMY count:</strong> ${data.population}</p>
      </div>
    </div>
  `;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#citySearch')) {
        resultsList.classList.add('hidden');
    }
});