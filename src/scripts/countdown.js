const dayOneDate = new Date('2026-05-02T14:00:00').getTime();
const dayTwoDate = new Date('2026-05-03T14:00:00').getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = dayOneDate - now;

    if (diff <= 0) {
        document.getElementById('dayOneCard').innerHTML =
            '<div class="text-xl font-bold">The event has started 🎉</div>';
        clearInterval(timer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

function updateDayTwoCountdown() {
    const now = Date.now();
    const diff = dayTwoDate - now;

    if (diff <= 0) {
        document.getElementById('dayTwoCard').innerHTML =
            '<div class="text-xl font-bold">The event has started 🎉</div>';
        clearInterval(timer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('daysTwo').textContent = days;
    document.getElementById('hoursTwo').textContent = hours;
    document.getElementById('minutesTwo').textContent = minutes;
    document.getElementById('secondsTwo').textContent = seconds;
}

updateCountdown('dayOneCard');
updateDayTwoCountdown('dayTwoCard');
const timer = setInterval(() => updateCountdown('dayOneCard'), 1000);
const timerTwo = setInterval(() => updateDayTwoCountdown('dayTwoCard'), 1000);
