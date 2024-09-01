import { deletePost, likeCard, disLikeCard } from "./api";
import { cardsContainer } from "./index";

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания и закрытие карточки
function createCard(
  cardData,
  profileData,
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
  if (cardData.owner._id !== profileData._id) {
    basket.style.visibility = "hidden";
  } else {
    basket.addEventListener("click", function () {
      deletePost(cardData._id).then(() => {
        deleteCardCallback(cardElement);
      })
    });
  }

  const btnLike = cloneTemplate.querySelector(".card__like-button");
  const likeCounter = btnLike.querySelector('.number_of_likes');

  let isLiked = cardData.likes.map((p) => p._id).includes(profileData._id)
  likeCardCallback(cardElement, isLiked)
  btnLike.addEventListener("click", function () { 
    if (isLiked) {
      disLikeCard(cardData._id).then ((cardData) => {
        isLiked = cardData.likes.map((p) => p._id).includes(profileData._id)
        likeCardCallback(cardElement, isLiked)
        likeCounter.textContent = cardData.likes.length;
      })
    } else {
      likeCard(cardData._id).then((cardData) => {
        isLiked = cardData.likes.map((p) => p._id).includes(profileData._id)
        likeCardCallback(cardElement, isLiked)
        likeCounter.textContent = cardData.likes.length;
      })
    }
  });

  likeCounter.textContent = cardData.likes.length;

  cardImg.addEventListener("click", function (evt) {
    openCardPopapCallback(cardData);
  });
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// создание и добавление в начало
export function createAndAddCard(cardData, profileData, openCardPopapCallback) {
  const card = createCard(
    cardData,
    profileData,
    deleteCard,
    callingLike,
    openCardPopapCallback
  );
  cardsContainer.prepend(card);
}

// создание и добавление в конец
export function createAndAddCardEnd(cardData, profileData, openCardPopapCallback) {
  const card = createCard(
    cardData,
    profileData,
    deleteCard,
    callingLike,
    openCardPopapCallback
  );
  cardsContainer.append(card);
}

// функция лайка
function callingLike(element, isLiked) {
  const btnLike = element.querySelector(".card__like-button");

  if (isLiked) {
    btnLike.classList.add("card__like-button_is-active");
  } else {
    btnLike.classList.remove("card__like-button_is-active");
  }
}

export { callingLike };
