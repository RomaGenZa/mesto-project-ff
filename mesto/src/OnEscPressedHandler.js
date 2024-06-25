export {OnEscPressedHandler};

function OnEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popups = [
      document.querySelector('.popup_type_edit'),
      document.querySelector('.popup_type_new-card'),
      document.querySelector('.popup_type_image')
    ];
    
    popups.forEach(function (popup) {
      popup.style.display = "none";
    })
    
    document.removeEventListener("keydown", OnEscPressedHandler);
  }
}