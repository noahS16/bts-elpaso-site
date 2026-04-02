document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton')
  const dropdownMenu = document.getElementById('dropdownMenu')
  const overlay = document.getElementById('overlay')

  if (!menuButton || !dropdownMenu || !overlay) return

  menuButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('translate-x-full')
    overlay.classList.toggle('hidden')
  })

  overlay.addEventListener('click', () => {
    dropdownMenu.classList.add('translate-x-full')
    overlay.classList.add('hidden')
  })
})

document.querySelectorAll('#dropdownMenu a').forEach(link => {
    link.addEventListener('touchstart', () => {
        link.classList.add('underline','decoration-red-500', 'decoration-4');
    }, { passive: true });

    link.addEventListener('touchend', () => {
        setTimeout(() => link.classList.remove('underline','decoration-red-500', 'decoration-4'), 250);
    }, { passive: true });
});

const currentPath = window.location.pathname;

document.querySelectorAll('#dropdownMenu a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || currentPath.startsWith(linkPath) && linkPath !== '/') {
        link.classList.add('underline','decoration-red-500', 'decoration-4');
    }
});