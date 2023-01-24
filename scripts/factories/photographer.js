//Fonction Factory qui comprend toutes les fonctions qui vont créer nos éléments avec
//nos datas Json
function photographerFactory(data, totalLikes) {
  const {
    name, portrait, city, country, tagline, price, id,
  } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const priceElement = `${price}€/jour`;

  // Cartes de la page d'accueil
  function getUserCardDOM() {
    const article = document.createElement('article');
    article.innerHTML = `
  <header>
    <a href="photographer.html?id=${id}" aria-label="Cliquer pour accéder à la page de ${name}">
      <div class="card__img--wrapper">
        <img src="${picture}" alt="${name}">
      </div>
      <h2>${name}</h2>
    </a>
  </header>
  <h3>${location}</h3>
  <p class="card__tagline">${tagline}</p>
  <p class="card__price">${priceElement}</p>
    `;
    return (article);
  }

  // Header de la page photographe
  function getUserPageHeaderDOM() {
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = `
    <h2>${name}</h2>
    <h3>${location}</h3>
    <p>${tagline}</p>
    `;

    return headerDiv
  }

  // Portrait de la page photographe
  function getUserPageHeaderPortraitDOM() {
    const picDiv = document.createElement('div');
    picDiv.setAttribute('class', 'photograph-header_portrait');
    picDiv.innerHTML = `
    <img src="${picture}" alt ="${name}">
    `;
    return (picDiv);
  }

  // Onglet décompte des likes et prix
  function getUserPagePriceTagDOM() {
    const div = document.createElement('div');
    div.setAttribute('class', 'photograph__priceTag');

    div.innerHTML = `
    <div class="photograph__priceTag-likes">
      <p>${totalLikes}</p>
      <i class="fa-solid fa-heart"></i>
    </div>
    <p>${priceElement}</p>
    `;

    return (div);
  }

  // Titre du formulaire
  function getUserPageModalName() {
    const h2 = document.createElement('h2');
    h2.innerHTML = `Contactez-moi<br>${name}`;

    return (h2);
  }

  // Lightbox
  function getUserPageModalLightbox() {
    const div = document.createElement('div');
    div.setAttribute('class', 'lightbox_modal');
    div.setAttribute('aria-hidden', 'true');

    div.innerHTML = `
      <i class="fa-solid fa-angle-left lightbox__btn" tabindex="0" aria-label="média précédent"></i>
      <img class="lightbox_modal-img">
      <video class="lightbox_modal-img"></video>
      <i class="fa-solid fa-angle-right lightbox__btn" tabindex="0" aria-label="média suivant"></i>
      <i class="fa-solid fa-xmark lightbox_modal-close" tabindex="0" aria-label="fermer lightbox"></i>
      <p class="lightbox_modal-title"></p>
    `;

    return (div);
  }

  return {
    name, picture, getUserCardDOM, getUserPageHeaderDOM, getUserPageHeaderPortraitDOM, 
    getUserPagePriceTagDOM, getUserPageModalName, getUserPageModalLightbox
  };
}

