function openCards() {
  const card = document.querySelector('.card');

  card.addEventListener('click', function(evt) {
    card.style.display = "flex";
  })
}

export { openCards };