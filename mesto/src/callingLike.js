
function callingLike(element) {
  const btnLike = element.querySelector(".card__like-button");
  if (btnLike.classList.contains('card__like-button_is-active')) {
    btnLike.classList.remove('card__like-button_is-active');
  } else {
    btnLike.classList.add('card__like-button_is-active');
  }
}

export {callingLike};