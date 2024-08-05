import {smoothClosingPopups} from './smoothClosingPopups'

//закрытие popup клавишей Escape 
function OnEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popups = [
      document.querySelector('.popup_type_edit'),
      document.querySelector('.popup_type_new-card'),
      document.querySelector('.popup_type_image')
    ];
    
    popups.forEach(function (popup) {
      smoothClosingPopups(popup);
    })
    
    document.removeEventListener("keydown", OnEscPressedHandler);
  }
}

export {OnEscPressedHandler};