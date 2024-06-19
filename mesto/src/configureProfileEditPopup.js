function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");
  const buttonNewCards = document.querySelector('.profile__add-button');
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const buttonCloseP = popupNewCard.querySelector(".popup__close");

  buttonProfile.addEventListener("click", function (evt) {
    console.log('Ай');
    evt.preventDefault();
    console.log('Ый');
    popupProfile.style.display = "flex";
  });

  buttonClosePopup.addEventListener("click", function (evt) {
    popupProfile.style.display = "none";
  });

  const popcontent = document.querySelector('.popup__content');
  popupProfile.addEventListener('click', function(evt) {
    console.log('Ой');
    // const outside = evt.composedPath().includes(popupProfile);
    console.log('Эй');
    console.log(evt);
    // if (!outside) {
      
    // };
    if (!popcontent.contains(evt.target)){
      popupProfile.style.display = "none";
      // Clicked in box
    } 
      
      // Clicked outside the box
    
  });
  
  buttonNewCards.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewCard.style.display = "flex";
  });

  buttonCloseP.addEventListener("click", function (evt) {
    popupNewCard.style.display = "none";
  });
}



export {configureProfileEditPopup};