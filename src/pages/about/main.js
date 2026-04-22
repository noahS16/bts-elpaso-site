import '../../scripts/menu.js';
import '../../scripts/scroll.js';
import '../../scripts/about-faq.js';
import '/services/languages.js';
import { getCurrentLang, onLangChange } from '/services/languages.js';

const concertLinks = {
    en: {
        parking:   'https://www.instagram.com/p/DXH42ytCZg8/?igsh=dGIxcHcwc3V1aDZr',
        fanGuide1: 'https://www.instagram.com/p/DXaZWjAlr_0/?igsh=MXRwYzNvcW5teDNhdQ==',
        fanGuide2: 'https://www.instagram.com/p/DXaaDWrj6by/?igsh=MW1lZ3g2dHJxbTdqeA==',
    },
    es: {
        parking:   'https://www.instagram.com/p/DXH42ytCZg8/?igsh=dGIxcHcwc3V1aDZr',
        fanGuide1: 'https://www.instagram.com/p/DXcwsIyEgTP/?igsh=MTlhc3hrM2VrejE4eA==',
        fanGuide2: 'https://www.instagram.com/p/DXcxIQ7gRiw/?igsh=MTQ3M2MxbWM2ZHpvYg==',
    }
};

const concertImages = {
    en: {
        generalInfo: '/utils/images/general_info.png',
        fanPlaza:    '/utils/images/fan_plaza.png',
        eventParking: '/utils/images/event_parking.png',
        timeline:    '/utils/images/timeline.png',
    },
    es: {
        generalInfo: '/utils/images/general_info_es.png',
        fanPlaza:    '/utils/images/fan_plaza_es.png',
        eventParking: '/utils/images/event_parking_es.png',
        timeline:    '/utils/images/timeline_es.png',
    }
};
const credit ={
    en: {
        name: "@utep_ose",
        link: "https://www.instagram.com/utep_ose?igsh=Mjl3MzBxaXVuNTll",
    },
    es: {
        name: "@btsarmysinfronteras",
        link: "https://www.instagram.com/btsarmysinfronteras?igsh=ZHdpc3RodXh3dGJr"
    }
}

function updateConcertSection() {
    const lang = getCurrentLang();

    // update links
    document.getElementById('parkingLink').href   = concertLinks[lang].parking;
    document.getElementById('fanGuideOneLink').href = concertLinks[lang].fanGuide1;
    document.getElementById('fanGuideTwoLink').href = concertLinks[lang].fanGuide2;

    // update images
    document.getElementById('generalInfoImg').src = concertImages[lang].generalInfo;
    document.getElementById('fanPlazaImg').src    = concertImages[lang].fanPlaza;
    document.getElementById('eventParkingImg').src    = concertImages[lang].eventParking;
    document.getElementById('timelineImg').src    = concertImages[lang].timeline;

    document.getElementById('imgCredit').href = credit[lang].link;
    document.getElementById('imgCredit').innerText = credit[lang].name;

}

updateConcertSection();
onLangChange(() => updateConcertSection());