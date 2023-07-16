export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
export const imageTemplate =
  document.querySelector('#card-template').content;
export const page = document.querySelector('.page');
export const profilePopup = page.querySelector('.profile-popup');
export const cardPopup = page.querySelector('.card-popup');
export const imageAddButton = page.querySelector(
  '.profile__add-button'
);
export const profileEditButton = page.querySelector(
  '.profile__edit-button'
);
export const popupOverlays = page.querySelectorAll('.popup__content');
export const popupOverlay = '.popup__content';
export const closeButtons =
  document.querySelectorAll('.popup__close');
export const closeButton = '.popup__close';
export const profileName = page.querySelector('.profile__name');
export const profileSubtitle = page.querySelector(
  '.profile__subtitle'
);
export const popupPlaceName = 'popup-place-name';
export const popupPlaceUrl = 'popup-place-url';
export const profileNamePopup = document.querySelector(
  '.popup__input_type_name'
);
export const profileSubtitlePopup = document.querySelector(
  '.popup__input_type_subtitle'
);
export const placeName = document.querySelector(
  '.popup__input_type_place-name'
);
export const placeUrl = document.querySelector(
  '.popup__input_type_place-url'
);
export const profileForm = document.forms['profile-form'];
export const cardForm = document.forms['card-form'];
export const avatarForm = document.forms['avatar-form'];
export const cardsContainer = page.querySelector('.cards');
export const cardContainer = '.cards';
export const imagePopup = page.querySelector('.image-popup');
export const popupFullImage = '.popup__full-image';
export const popupFullText = '.popup__image-text';
export const popup = '.popup';
export const cardImage = '.card__image';
export const cardItem = '.cards__item';
export const cardTrash = '.card__trash';
export const cardLike = '.card__like';
export const cardCaption = '.card__caption';
export const popupForm = '.popup__form';
export const popupButton = '.popup__button';
export const popupInput = '.popup__input';
export const popupName = 'popup-name';
export const poppupSubtitle = 'popup-subtitle';
export const popupConfirmSelector =
  page.querySelector('.confirm-popup');
export const avatarEditButton = page.querySelector('.profile__edit');
export const avatarPopup = page.querySelector('.avatar-popup');
export const avatarUrl = 'popup-avatar-url';
export const profileAvatarImage = page.querySelector('.profile__avatar')
