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