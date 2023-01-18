function displayLightbox() {
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');

  // Display le background modal et la lightbox, et cacher le formulaire de contact
  modal.style.display = 'block';
  form.style.display = 'none';
  lightbox.style.display = 'grid';
  lightbox.setAttribute('aria-hidden', 'false');
  header.setAttribute('aria-hidden', 'true');
}

function closeLightbox() {
  const modal = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const lightbox = document.querySelector('#modal__bg > div.lightbox_modal');
  const header = document.querySelector('body > header');

  // Cache le background modal et la lightbox, et prépare le formulaire de contact
  modal.style.display = 'none';
  form.style.display = 'block';
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
  header.setAttribute('aria-hidden', 'false');
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

function displayLightboxNext(event) {
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
  if (event.target.className.includes('right')) {
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
  } else if (event.target.className.includes('left')) {
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
  if (event.type === 'click') {
    if (event.target.parentNode.className.includes('hearts__icons')) {
      addLike(event.target.parentNode);
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
