const modal = document.getElementById('cityModal');
const backdrop = document.getElementById('cityModalBackdrop');
const closeBtn = document.getElementById('closeCityModal');

export function showCityExistsModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

backdrop.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);