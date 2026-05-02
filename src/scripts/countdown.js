const dayOneDate = new Date('2026-05-02T14:00:00-06:00').getTime();
const dayTwoDate = new Date('2026-05-03T14:00:00-06:00').getTime();

// declare first so functions can reference them
let timer;
let timerTwo;

function launchConfetti(cardId) {
    const card = document.getElementById(cardId);
    const rect = card.getBoundingClientRect();
    confetti({
        particleCount: 120,
        spread: 80,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#a855f7', '#ffffff', '#ef4444', '#fbbf24'],
    });
}

function updateCountdown() {
    const now = Date.now();
    const diff = dayOneDate - now;

    if (diff <= 0) {
        // document.getElementById('dayOneCard').innerHTML =
        //     '<div class="text-2xl font-bold">It\'s time! 🎉</div>';
        launchConfetti('dayOneCard');
        clearInterval(timer); // ← now works, timer is defined
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent    = days;
    document.getElementById('hours').textContent   = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

function updateDayTwoCountdown() {
    const now = Date.now();
    const diff = dayTwoDate - now;

    if (diff <= 0) {
        // document.getElementById('dayTwoCard').innerHTML =
        //     '<div class="text-2xl font-bold">It\'s time! 🎉</div>';
        launchConfetti('dayTwoCard');
        clearInterval(timerTwo); // ← now works, timerTwo is defined
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('daysTwo').textContent    = days;
    document.getElementById('hoursTwo').textContent   = hours;
    document.getElementById('minutesTwo').textContent = minutes;
    document.getElementById('secondsTwo').textContent = seconds;
}

updateCountdown();
updateDayTwoCountdown();

timer    = setInterval(updateCountdown, 1000);
timerTwo = setInterval(updateDayTwoCountdown, 1000);