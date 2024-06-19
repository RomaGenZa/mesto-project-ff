// импорт карточек из cards.js
import { initialCards } from '../scripts/cards.js';

// импорт главного файла стилей
import '../pages/index.css'; 

// импорт popup 
import { configureProfileEditPopup } from './configureProfileEditPopup';
configureProfileEditPopup();

// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const cloneTemplate = template.cloneNode(true);
  cloneTemplate.querySelector('.card__image').src = cardData.link;
  cloneTemplate.querySelector('.card__image').alt = cardData.name;
  cloneTemplate.querySelector('.card__title').textContent = cardData.name;
  const cardElement = cloneTemplate.querySelector('.places__item');
  const basket = cloneTemplate.querySelector('.card__delete-button');
  basket.addEventListener('click', function() {
    deleteCardCallback(cardElement);
  })
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) { 
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
}); 

// const pictures = [
//   {name: 'icon', link: '../images/add-icon.svg'},
//   {name: 'avatar', link: '../images/avatar.jpg'},
//   {name: 'card_1', link: '../images/card_1.jpg'},
//   {name: 'card_2', link: '../images/card_2.jpg'},
//   {name: 'card_3', link: '../images/card_3.jpg'},
//   {name: 'close', link: '../images/close.svg'},
//   {name: 'delete', link: '../images/delete-icon.svg'},
//   {name: 'edit', link: '../images/edit-icon.svg'},
//   {name: 'active', link: '../images/like-active.svg'},
//   {name: 'inactive', link: '../images/like-inactive.svg'},
//   {name: 'logo', link: '../images/logo.svg'},
// ];

import icon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import card_1 from '../images/card_1.jpg';
import card_2 from '../images/card_2.jpg';
import card_3 from '../images/card_3.jpg';
import close from '../images/close.svg';
import del from '../images/delete-icon.svg';
import edit from '../images/edit-icon.svg';
import active from '../images/like-active.svg';
import inactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg';


const pictures = [
  {name: 'icon', link: icon},
  {name: 'avatar', link: avatar},
  {name: 'card_1', link: card_1},
  {name: 'card_2', link: card_2},
  {name: 'card_3', link: card_3},
  {name: 'close', link: close},
  {name: 'delete', link: del},
  {name: 'edit', link: edit},
  {name: 'active', link: active},
  {name: 'inactive', link: inactive},
  {name: 'logo', link: logo},
];

