// функция присвоения классов для плавного закрытия popup
  function smoothClosingPopups(block) {
    block.classList.add('popup_is-animated');
    block.classList.remove('popup_is-opened');
  }

  export {smoothClosingPopups};