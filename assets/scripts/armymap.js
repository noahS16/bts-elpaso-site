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
    console.log('Searching for:', query);
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

        li.textContent = place.display_name;

        li.onclick = () => {
            selectCity(place);
        };

        resultsList.appendChild(li);
    });
}));

// Pin to map
function selectCity(place) {
    const lat = place.lat;
    const lon = place.lon;

    // Center map
    map.setView([lat, lon], 6);

    // Remove previous marker
    //if (marker) map.removeLayer(marker);

    // Add marker
    marker = L.marker([lat, lon]).addTo(map);

    // UI cleanup
    searchInput.value = place.display_name;
    resultsList.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#citySearch')) {
    resultsList.classList.add('hidden');
  }
});