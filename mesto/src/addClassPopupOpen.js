// функция добавления класса "popup_is-animated" для плавного открытия popup в дальнейшем
function addClassPopupOpen() {
  const popups = [
    document.querySelector(".popup_type_edit"),
    document.querySelector(".popup_type_new-card"),
    document.querySelector(".popup_type_image"),
  ];
  popups.forEach(function (popup) {
    popup.classList.add("popup_is-animated");
  });
}

export { addClassPopupOpen };