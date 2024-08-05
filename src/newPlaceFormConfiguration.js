import{createAndAddCard} from './cardsActions';
import {smoothClosingPopups} from './smoothClosingPopups';


const popupNewPlace = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms['new-place'];

// добавление карточек 
formNewPlace.addEventListener('submit', function(evt) {
  const inputPlaceName = formNewPlace.elements['place-name'];
  const inputPlaceLink = formNewPlace.elements.link;
  evt.preventDefault();
  const cardData = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };
  
  createAndAddCard(cardData);

  smoothClosingPopups(popupNewPlace);
})

// конфигурация popup "добавление новых карточек" 
function formConfiguration() {
  
  const inputPlaceName = formNewPlace.elements['place-name'];
  inputPlaceName.value = '';

  const inputPlaceLink = formNewPlace.elements.link;
  inputPlaceLink.value = '';
} 

export {formConfiguration};