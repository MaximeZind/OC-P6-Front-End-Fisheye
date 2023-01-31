// Fonction Factory qui comprend toutes les fonctions qui vont créer nos éléments avec
// nos datas Json
function photographerFactory(data, totalLikes) {// eslint-disable-line
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
    <a href="photographer.html?id=${id}" aria-label="${name}">
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
    const photographerHeaderDiv = document.createElement('div');
    photographerHeaderDiv.setAttribute('class', 'photograph-header');
    photographerHeaderDiv.innerHTML = `
    <div>
      <h2>${name}</h2>
      <h3>${location}</h3>
      <p>${tagline}</p>
    </div>
    <button aria-label="Contactez-moi" class="contact_button" tabindex="0">Contactez-moi</button>
    <div class="photograph-header_portrait">
      <img src="${picture}" alt ="${name}">
    </div>
    `;

    return photographerHeaderDiv;
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

  return {
    name,
    picture,
    getUserCardDOM,
    getUserPageHeaderDOM,
    getUserPagePriceTagDOM,
    getUserPageModalName,
  };
}
