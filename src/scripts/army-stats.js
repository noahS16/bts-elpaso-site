import { getAllStats } from '../../services/army-map-client.js';
import { getCurrentLang, onLangChange} from '/services/languages.js';


updateArmyDataDisplay();

onLangChange(()=>updateArmyDataDisplay());

export async function updateArmyDataDisplay() {
    const stats = await getAllStats();
    //console.log('Army Stats:', stats);
    document.getElementById('totalArmy').textContent = stats.totalArmy.toLocaleString();
    document.getElementById('totalCountries').textContent = stats.totalCountries.toLocaleString();
    document.getElementById('furthestCityName').textContent = stats.furthestArmy.city;
    document.getElementById('furthestCityMiles').textContent = stats.furthestArmy.distance_miles.toLocaleString(undefined, { maximumFractionDigits: 0 }).concat(" ", "miles");
    document.getElementById('highestPopulation').textContent = stats.highestPopulation.toLocaleString();
    document.getElementById('totalCities').textContent = stats.totalCities.toLocaleString();
    document.getElementById('recentCity').textContent = stats.recentCity.city;
    document.getElementById('recentCountry').textContent = stats.recentCity.country;
    console.log(stats.topCities, stats.recentCity);
    renderLeaderboard(stats.topCities.slice(0, 5));
}

function getFlagEmoji(countryCode) {
    if (!countryCode) return '';
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(0x1F1E6 - 65 + char.charCodeAt(0)))
        .join('');
}

function renderLeaderboard(topCities) {
    const container = document.getElementById('leaderboard');
    const lang = getCurrentLang();
    console.log(topCities, recentCity)

    container.innerHTML = `
        <div class="stat-card mt-3 pb-2">
            <span class="stat-sublabel text-2xl border-b border-gray-200">${lang=='es' ? "Las ciudades con más ARMY" : "Cities With the Most ARMY"}</span>
            <ol class="mt-2 flex flex-col gap-2 bg-red">
                ${topCities.map((city, i) => `
                    <li class="flex justify-between items-center text-sm  bg-purple-200 rounded-md py-2 px-3">
                        <span>
                            <span class="font-black text-xl mr-2 bg-white rounded-full p-1">${getFlagEmoji(city.country_code)}</span>
                            <span class="text-xl font-semibold text-gray-600">${city.city}</span>
                        </span>
                        <span class="font-bold text-2xl text-purple-500">${city.population }</span>
                    </li>
                `).join('')}
            </ol>
        </div>

        
    `;
}