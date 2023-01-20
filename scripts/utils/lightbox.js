// Fonction appelée par plusieurs EventListeners, qui ouvre la Lightbox
function displayLightbox() {
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');
  const focusableEls = document.querySelectorAll('.lightbox__btn, .lightbox_modal-close');
  const firstFocus = document.querySelector("#modal__bg > div.lightbox_modal > i.fa-solid.fa-angle-left.lightbox__btn")

  // Display le background modal et la lightbox, et cacher le formulaire de contact
  modal.style.display = 'block';
  form.style.display = 'none';
  lightbox.style.display = 'grid';
  firstFocus.focus();
  lightbox.setAttribute('aria-hidden', 'false');
  header.setAttribute('aria-hidden', 'true');
  trapFocus(lightbox, focusableEls);
}

// Fonction appelée par plusieurs EventListeners, qui ferme la Lightbox
function closeLightbox(event) {
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');

  // Cache le background modal et la lightbox, et prépare le formulaire de contact
  function closing() {
    modal.style.display = 'none';
    form.style.display = 'block';
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'false');
  }

  if ((event.target.className.includes('lightbox_modal-close') && (event.type === 'keydown') && (event.keyCode === (13 || 32)))) {
    closing(); //Spacebar ou entrée sur la croix de fermeture de la modale
  } else if ((event.target.className.includes('lightbox_modal-close')) && (event.type === 'click')) {
    closing(); // Simple "click" sur la croix de fermeture de la modale
  } else if ((lightbox.ariaHidden === 'false') && (event.type === 'keydown') && (event.keyCode === 27)) {
    closing(); // Escape lorsque la modale est ouverte
  }
}

function createLightboxMedia(mediaID) {
  const photographerMedias = getPageElements();
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
  for (i = 0; i < photographerMedias.length; i++) {
    if (photographerMedias[i].id === mediaID) {
      if (photographerMedias[i].image) {
        removeAttributes(lightboxVid);
        lightboxPic.setAttribute('src', `assets/images/${photographerMedias[i].photographerFirstname}/${photographerMedias[i].image}`);
        lightboxPic.setAttribute('id', mediaID);
        lightboxPic.setAttribute('aria-label', `${photographerMedias[i].title}`);
        lightboxPic.setAttribute('tabindex', '0');
        lightboxPic.setAttribute('data-date', `${photographerMedias[i].date}`);
        lightboxTitle.innerText = photographerMedias[i].title;
        lightboxPic.style.display = 'block';
        lightboxVid.style.display = 'none';
        break;
      } else if (photographerMedias[i].video) {
        removeAttributes(lightboxPic);
        lightboxVid.setAttribute('src', `assets/images/${photographerMedias[i].photographerFirstname}/${photographerMedias[i].video}`);
        lightboxVid.setAttribute('type', 'video/mp4');
        lightboxVid.setAttribute('id', mediaID);
        lightboxVid.setAttribute('aria-label', `${photographerMedias[i].title}`);
        lightboxVid.setAttribute('tabindex', '0');
        lightboxVid.setAttribute('data-date', `${photographerMedias[i].date}`);
        lightboxTitle.innerText = photographerMedias[i].title;
        lightboxVid.setAttribute('controls', '');
        lightboxVid.style.display = 'block';
        break;
      }
    }
  }
}

//Fonction qui est appelée par des EventListeners, et qui gère les flèches de la Lightbox et la naviguation
//d'un média à l'autre
function displayLightboxNext(event) {
  if (event.target.className.includes('lightbox__btn')) { // Sélectionne un des boutons
    if (event.type === 'keydown') { // Pour filtrer les key qui ne sont pas entrée / spacebar / flèches
      if ((event.keyCode !== 13) && (event.keyCode !== 32) && (event.keyCode !== 39) && (event.keyCode !== 37)){
      return
      }
    }
  } else if (!event.target.className.includes('lightbox__btn')) {
    if (event.type === 'keydown') {
      if ((event.keyCode !== 39) && (event.keyCode !== 37)){
        return
      }
    }
  }
  const photographerMedias = getPageElements();
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
  if (event.target.className.includes('right') && (+event.keyCode !== 37) || (+event.keyCode === 39)) {
    for (i = 0; i < picIds.length; i++) {
      if (picIds[i] === mediaID) {
        if (picIds[i + 1]) {
          nextId = picIds[i + 1];
        } else if (!picIds[i + 1]) {
          nextId = picIds[0];
        }
        break;
      }
    }
  } else if (event.target.className.includes('left') && (+event.keyCode !== 39) || (+event.keyCode === 37)) {
    for (i = 0; i < iterations; i++) {
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


//fonction qui va identifier la target de l'event (click ou keydown), et appeler
//une fonction en conséquence
function photographPicsInteractions(event) {
      console.log(event);
  if (event.type === 'click') {
    if (event.target.parentNode.className.includes('hearts__icons')) {
      addLike(event.target.parentNode);
    } else if (event.target.className.includes('hearts__icons')){
      addLike(event.target);
    } else if (event.target.className.includes('photograph__pics__pic-media')) {
      createLightboxMedia(+event.target.id);
      displayLightbox();
    }
  } else if ((event.type === 'keydown') && (event.keyCode === (13 || 32))) {
    if (event.target.className.includes('hearts__icon')) {
      addLike(event.target);
    } else if (event.target.className.includes('photograph__pics__pic-media')) {
      createLightboxMedia(+event.target.id);
      displayLightbox();
    }
  }
}
