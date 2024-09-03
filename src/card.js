import { deletePost, likeCard, disLikeCard, handleError } from "./api";

// @todo: DOM узлы
export const cardsContainer = document.querySelector(".places__list");

// @todo: Темплейт карточки
export const template = document.querySelector("#card-template").content;

// @todo: Функция создания и закрытие карточки
export function createCard(
  cardData,
  profileId,
  deleteCardCallback,
  likeCardCallback,
  openCardPopapCallback
) {
  const cloneTemplate = template.cloneNode(true);
  const cardImg = cloneTemplate.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cloneTemplate.querySelector(".card__title").textContent = cardData.name;
  const cardElement = cloneTemplate.querySelector(".places__item");
  const basket = cloneTemplate.querySelector(".card__delete-button");
  if (cardData.owner._id !== profileId) {
    basket.style.visibility = "hidden";
  } else {
    basket.addEventListener("click", function () {
      deletePost(cardData._id)
        .then(() => {
          deleteCardCallback(cardElement);
        })
        .catch((err) => console.log(err));
    });
  }

  const btnLike = cloneTemplate.querySelector(".card__like-button");
  const likeCounter = btnLike.querySelector(".number_of_likes");

  let isLiked = cardData.likes.map((p) => p._id).includes(profileId);
  likeCardCallback(cardElement, isLiked);
  btnLike.addEventListener("click", function () {
    if (isLiked) {
      disLikeCard(cardData._id)
        .then((newCardData) => {
          isLiked = false;
          likeCardCallback(cardElement, isLiked);
          likeCounter.textContent = newCardData.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      likeCard(cardData._id)
        .then((newCardData) => {
          isLiked = true;
          likeCardCallback(cardElement, isLiked);
          likeCounter.textContent = newCardData.likes.length;
        })
        .catch((err) => console.log(err));
    }
  });

  likeCounter.textContent = cardData.likes.length;

  cardImg.addEventListener("click", function () {
    openCardPopapCallback(cardData);
  });
  return cloneTemplate;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// функция лайка
export function callingLike(element, isLiked) {
  const btnLike = element.querySelector(".card__like-button");

  if (isLiked) {
    btnLike.classList.add("card__like-button_is-active");
  } else {
    btnLike.classList.remove("card__like-button_is-active");
  }
}
