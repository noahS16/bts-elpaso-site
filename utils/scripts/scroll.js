const header = document.getElementById('magicHeader');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // scrolling down → hide header
      header.classList.add('-translate-y-full');
    } else {
      // scrolling up → show header
      header.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
  });