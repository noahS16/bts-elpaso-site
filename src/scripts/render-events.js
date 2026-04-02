import {events} from '/src/data/events.js';
import { getCurrentLang, onLangChange } from '/services/languages';

const container = document.getElementById('eventCardsContainer');

renderAllEvents();
onLangChange(()=>renderAllEvents());
function renderAllEvents() {
    container.innerHTML = '';
    container.innerHTML = events.map(renderCard).join('');
}

function renderDates(event_dates){
    if(!event_dates || event_dates.length === 0) return '';

    return event_dates.map(({date, time}, i)=>
        `<div class="flex flex-row items-center gap-1">
            <img src="/utils/icons/calendar.svg" alt="" class="w-4 h-4 flex-shrink-0">
            <span class="font-bold">${date}</span>
            <span class="text-gray-500">· ${time}</span>
        </div>`
    ).join('');
}

function renderDescription(description){
    return `
        <ul class="flex overflow-auto justify-around gap-1 font-bold text-lg">
            ${description.map(tag => `
                <li class="whitespace-nowrap text-red-500 bg-red-200 rounded-full px-2 py-1">${tag}</li>
            `).join('')}
        </ul>
    `;
}

function renderCard(event){
    const lang = getCurrentLang();
    const {
        poster,
        event_name,
        host_name,
        event_dates,
        location,
        location_link,
        description,
        link
    } = event;
    const translation = lang == 'es' ? event.descriptionEs : description;

    return `
        <div
                class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                <img src="${poster}" alt="" class="w-full object-cover h-63">
                <div class="px-3 py-3 flex flex-col gap-0">
                    <div>
                        <h3 class="text-3xl/6 font-bold">${event_name}</h3>
                        <span class="text-lg">${lang == 'es' ? "Organizado por - " : "Hosted by - "}<span class="font-bold text-gray-500">${host_name}</span></span>

                    </div>
                    <div class="flex justify-between items-end">
                        <div>
                            <div class="flex flex-col gap-0 mt-2 text-lg/6">
                                ${renderDates(event_dates)}
                            </div>
                            <div class="flex flex-row items-center gap-1 text-lg">
                                <img src="/utils/icons/map-pin.svg" alt="" class="w-4 h-4">
                                <a class="text-purple-500 font-semibold underline underline-offset-2" href="${location_link}">"${location}"</a>
                            </div>
                        </div>
                        <a href="${link}"
                            class="flex items-center justify-center bg-purple-400 text-white font-bold rounded-xl p-2">${lang=='es' ? "Más Info →" : "MORE INFO →"}</a>

                    </div>

                    <hr class="text-gray-300 my-2">
                    <div>
                        ${renderDescription(translation)}
                    </div>

                </div>
            </div>
    `;
}

