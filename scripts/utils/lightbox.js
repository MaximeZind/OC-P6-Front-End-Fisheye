// Fonction appelée par plusieurs EventListeners, qui ouvre la Lightbox
function displayLightbox() {
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');
  const focusableEls = document.querySelectorAll('.lightbox__btn, .lightbox_modal-close');
  const firstFocus = document.querySelector('#modal__bg > div.lightbox_modal > .fa-solid.fa-angle-left.lightbox__btn');
  const body = document.querySelector('body');

  // Display le background modal et la lightbox, et cacher le formulaire de contact
  body.style.overflow = 'hidden'; // Empêche le scrolling dans le background
  modal.style.display = 'block';
  form.style.display = 'none';
  lightbox.style.display = 'grid';
  firstFocus.focus();
  lightbox.setAttribute('aria-hidden', 'false');
  header.setAttribute('aria-hidden', 'true');
  trapFocus(lightbox, focusableEls);// eslint-disable-line
}

// Fonction appelée par plusieurs EventListeners, qui ferme la Lightbox
function closeLightbox(event) {// eslint-disable-line
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');
  const body = document.querySelector('body');

  // Cache le background modal et la lightbox, et prépare le formulaire de contact
  function closing() {
    body.style.overflow = 'auto';
    modal.style.display = 'none';
    form.style.display = 'block';
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'false');
  }

  if ((event.target.className.includes('lightbox_modal-close') && (event.type === 'keydown') && (event.keyCode === (13 || 32)))) {
    closing(); // Spacebar ou entrée sur la croix de fermeture de la modale
  } else if ((event.target.className.includes('lightbox_modal-close')) && (event.type === 'click')) {
    closing(); // Simple "click" sur la croix de fermeture de la modale
  } else if ((lightbox.ariaHidden === 'false') && (event.type === 'keydown') && (event.keyCode === 27)) {
    closing(); // Escape lorsque la modale est ouverte
  }
}

// Fonction qui met en place le media (photo ou video) de la lightbox
function createLightboxMedia(mediaID) {
  const photographerMedias = getPageElements();// eslint-disable-line
  const ids = [];

  photographerMedias.forEach((media) => {
    ids.push(media.id);
  });

  const lightboxPic = document.querySelector('#modal__bg > div.lightbox_modal > img');
  const lightboxVid = document.querySelector('#modal__bg > div.lightbox_modal > video');
  const lightboxTitle = document.querySelector('#modal__bg > div.lightbox_modal > p');

  const removeAttributes = (element) => {
    while (element.attributes.length > 0) {
      element.removeAttribute(element.attributes[0].name);
    }
  };

  photographerMedias.forEach((media) => {
    if (media.id === mediaID) {
      if (media.image) {
        removeAttributes(lightboxVid);
        lightboxPic.setAttribute('src', `assets/images/${media.photographerFirstname}/${media.image}`);
        lightboxPic.setAttribute('id', mediaID);
        lightboxPic.setAttribute('aria-label', `${media.title}`);
        lightboxPic.setAttribute('tabindex', '0');
        lightboxPic.setAttribute('data-date', `${media.date}`);
        lightboxTitle.innerText = media.title;
        lightboxPic.style.display = 'block';
        lightboxVid.style.display = 'none';
      } else if (media.video) {
        removeAttributes(lightboxPic);
        lightboxVid.setAttribute('src', `assets/images/${media.photographerFirstname}/${media.video}`);
        lightboxVid.setAttribute('type', 'video/mp4');
        lightboxVid.setAttribute('id', mediaID);
        lightboxVid.setAttribute('aria-label', `${media.title}`);
        lightboxVid.setAttribute('tabindex', '0');
        lightboxVid.setAttribute('data-date', `${media.date}`);
        lightboxTitle.innerText = media.title;
        lightboxVid.setAttribute('controls', '');
        lightboxVid.style.display = 'block';
      }
    }
  });
}

// Fonction qui est appelée par des EventListeners,
// et qui gère les flèches de la Lightbox et la naviguation
// d'un média à l'autre
function displayLightboxNext(event) {// eslint-disable-line
  if (event.target.className.includes('lightbox__btn')) { // Sélectionne un des boutons
    if (event.type === 'keydown') {
      // Pour filtrer les key qui ne sont pas entrée / spacebar / flèches
      if ((event.keyCode !== 13) && (event.keyCode !== 32)
      && (event.keyCode !== 39) && (event.keyCode !== 37)) {
        return;
      }
    }
  } else if (!event.target.className.includes('lightbox__btn')) {
    if (event.type === 'keydown') {
      if ((event.keyCode !== 39) && (event.keyCode !== 37)) {
        return;
      }
    }
  }
  const photographerMedias = getPageElements();// eslint-disable-line
  const lightboxPic = document.querySelector('#modal__bg > div.lightbox_modal > img');
  const lightboxVid = document.querySelector('#modal__bg > div.lightbox_modal > video');
  let mediaID = 0;
  if (lightboxPic.getAttribute('id')) {
    mediaID = +lightboxPic.getAttribute('id');
  } else if (lightboxVid.getAttribute('id')) {
    mediaID = +lightboxVid.getAttribute('id');
  }

  const picIds = [];
  photographerMedias.forEach((media) => {
    picIds.push(media.id);
  });

  let nextId = 0;
  const iterations = picIds.length;
  // clique sur la flèche droite ou touche clavier droite
  if ((event.target.className.includes('right') && (+event.keyCode !== 37)) || (+event.keyCode === 39)) {
    for (let i = 0; i < picIds.length; i += 1) {
      if (picIds[i] === mediaID) {
        if (picIds[i + 1]) {
          nextId = picIds[i + 1];
        } else if (!picIds[i + 1]) {
          nextId = picIds[0];// eslint-disable-line
        }
        break;
      }
    }
  // clique sur la flèche gauche ou touche clavier gauche
  } else if ((event.target.className.includes('left') && (+event.keyCode !== 39)) || (+event.keyCode === 37)) {
    for (let i = 0; i < iterations; i += 1) {
      if (picIds[i] === mediaID) {
        if (picIds[i - 1]) {
          nextId = picIds[i - 1];
        } else if (!picIds[i - 1]) {
          nextId = picIds[iterations - 1];
        }
        break;
      }
    }
  }
  createLightboxMedia(nextId);
}

// fonction qui va identifier la target de l'event (click ou keydown), et appeler
// une fonction en conséquence (Lightbox ou likes)
function photographPicsInteractions(event) {// eslint-disable-line
  if (event.type === 'click') {
    if (event.target.parentNode.className.includes('hearts__icons')) { // Click prend en compte l'élément enfant, mais nous avons besoin du parent
      addLike(event);// eslint-disable-line
    } else if (event.target.className.includes('hearts__icons')) { // NVDA compte les keyevents (entrée) comme des click events
      addLike(event);// eslint-disable-line
    } else if (event.target.className.includes('photograph__pics__pic-media')) {
      createLightboxMedia(+event.target.id);
      displayLightbox();
    }
  } else if ((event.type === 'keydown') && (event.keyCode === (13 || 32))) { // Navgiation clavier hors NVDA
    if (event.target.className.includes('hearts__icon')) {
      addLike(event);// eslint-disable-line
    } else if (event.target.className.includes('photograph__pics__pic-media')) {
      createLightboxMedia(+event.target.id);
      displayLightbox();
    }
  }
}
