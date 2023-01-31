// Fonction utilitaire pour récupérer des données dans la page, et en faire une array d'objets
// (similaire aux données reçues du fichier Json)
function getPageElements() {// eslint-disable-line
  const photographArticles = document.querySelectorAll('#main > section.photograph__pics > article');

  // On récupère l'ID du photographe via l'URL
  const params = new URLSearchParams(document.location.search);
  const photographerID = params.get('id');

  // On crée une nouvelle array d'objets avec les éléments disponibles sur la page
  // pour pouvoir recréer la gallerie, en gardant les likes en mémoire
  let photographerMedias = [];
  photographArticles.forEach((article) => {
    const media = {
      id: +article.firstElementChild.id,
      likes: +article.firstElementChild.nextElementSibling
        .lastElementChild.firstElementChild.innerText,
      liked: article.firstElementChild.nextElementSibling
        .lastElementChild.lastElementChild.className.includes('clicked'),
      title: article.firstElementChild.nextElementSibling.firstElementChild.innerText,
      date: article.firstElementChild.dataset.date,
      photographerId: photographerID,
      photographerFirstname: article.firstElementChild.dataset.firstname,
    };
    if (article.firstElementChild.tagName.toLowerCase() === 'img') {
      media.image = article.firstElementChild.src.split('/').pop();
    } else if (article.firstElementChild.tagName.toLowerCase() === 'video') {
      media.video = article.firstElementChild.src.split('/').pop();
    }
    photographerMedias.unshift(media);
  });
  photographerMedias = photographerMedias.reverse();
  return photographerMedias;
}

// Fonction pour "capturer" le focus dans notre modale lorsqu'elle est ouverte
function trapFocus(modal, focusableEls) {// eslint-disable-line
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  modal.addEventListener('keydown', (event) => {
    const isTabPressed = (event.key === 'Tab' || event.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        event.preventDefault();
      }
    } else /* tab */ if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      event.preventDefault();
    }
  });
}

// Fonction qui récupère l'id via l'URL et renvoie le prénom du photographe,
// ainsi qu'une array d'objets de ses médias
function getNameAndMedias(photographers, medias) {// eslint-disable-line
  // On récupère l'ID du photographe via l'URL
  const params = new URLSearchParams(document.location.search);
  const photographID = +params.get('id');

  // On trie les données pour obtenir celles qui correspondent au photographe de la page en question
  // find() renvoie le premier élément
  const photograph = photographers.find(({ id }) => id === photographID);
  // filter renvoie une array
  const photographPics = medias.filter(({ photographerId }) => photographerId === photographID);

  // On récupère le prénom du photographe pour accéder au dossier des photos
  let photographerName = photograph.name;
  photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
  photographerName = photographerName.replace(/-/g, ' ');

  return [photographerName, photograph, photographPics];
}

// Fonction contenant nos EventListeners
function getEventListeners() {// eslint-disable-line
  // DOM Elements
  const form = document.querySelector('#modal__bg > div > form');
  const contactBtn = document.querySelector('#main > div.photograph-header > button');
  const closeBtn = document.querySelector('#modal__bg > div > header > img');
  const photographerPageMedia = document.querySelector('#main > section.photograph__pics');
  const closeLightboxBtn = document.querySelector('#modal__bg > div.lightbox_modal > i.fa-solid.fa-xmark.lightbox_modal-close');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const lightBoxBtn = document.querySelectorAll('#modal__bg > div.lightbox_modal > .lightbox__btn');
  const filterList = document.querySelector('#main > section.dropdown__section > .dropdown__wrapper');
  const modalElements = document.querySelector('.modal, .modal > form, .modal > form > input');

  /// /// EventListeners ///////

  // Formulaire
  contactBtn.addEventListener('click', displayModal);// eslint-disable-line
  closeBtn.addEventListener('click', closeModal);// eslint-disable-line
  modalElements.addEventListener('keydown', closeModal);// eslint-disable-line
  form.addEventListener('submit', validateForm);// eslint-disable-line

  // Lightbox et gestion des likes
  closeLightboxBtn.addEventListener('click', closeLightbox);// eslint-disable-line
  lightbox.addEventListener('keydown', closeLightbox);// eslint-disable-line
  lightBoxBtn.forEach((btn) => btn.addEventListener('click', displayLightboxNext));// eslint-disable-line
  lightbox.addEventListener('keydown', displayLightboxNext);// eslint-disable-line
  photographerPageMedia.addEventListener('click', photographPicsInteractions);// eslint-disable-line
  photographerPageMedia.addEventListener('keydown', photographPicsInteractions);// eslint-disable-line

  // Menu déroulant
  filterList.addEventListener('focusin', openDropDownMenu);// eslint-disable-line
  filterList.addEventListener('focusout', closeDropDownMenu);// eslint-disable-line
  filterList.addEventListener('mouseenter', openDropDownMenu);// eslint-disable-line
  filterList.addEventListener('mouseleave', closeDropDownMenu);// eslint-disable-line
  filterList.addEventListener('click', filters);// eslint-disable-line
  filterList.addEventListener('keydown', filtersNavigation);// eslint-disable-line
}
