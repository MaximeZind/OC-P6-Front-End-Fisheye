// Fonction asynchrone qui va fetch nos données du fichier .json
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();

  const { photographers } = data;
  const medias = data.media;

  return ({
    photographers, medias,
  });
}

// fonction asynchrone qui récupère les données Json via init(),
// et les envoie vers nos fonctions factory
async function displayData(photographers, medias) {
  // Elément de la page dans lesquels on va afficher nos données
  const photographHeader = document.querySelector('.photograph-header');
  const photographPicSection = document.querySelector('.photograph__pics');
  const photographMain = document.getElementById('main');
  const photographModalTitle = document.querySelector('#modal__bg > div > header > h2');
  const modal = document.querySelector('#modal__bg');

  // Vérification que l'id correspond à un photographe...
  const params = new URLSearchParams(document.location.search);
  const photographID = params.get('id');
  let idVerificator = 0;
  photographers.forEach((photographer) => {
    if (+photographer.id === +photographID) {
      idVerificator += 1;
    }
  });
  // ... Sinon, renvoie vers index.html
  if (idVerificator === 0) {
    window.location.replace('index.html');
  }

  // On récupère les medias et le nom du photographe
  const nameAndMedias = getNameAndMedias(photographers, medias);
  const photographerName = nameAndMedias[0];
  const photograph = nameAndMedias[1];
  const photographPics = nameAndMedias[2];

  const mediasSortedByLikes = photographPics.sort(compareLikes);
  let totalLikes = 0;
  // contenu de la page (images, vidéos, titres, likes)
  mediasSortedByLikes.forEach((media) => {
    totalLikes += media.likes; // Calcul du total des likes
    const picModel = mediaFactory(media, photographerName);
    const userPageMainDOM = picModel.getUserPageMainDOM();
    photographPicSection.append(userPageMainDOM);
  });

  // fonction globale pour la factory utilisant la data photographer (et totalLikes)
  const photographerModel = photographerFactory(photograph, totalLikes);

  // fonctions spécifique se trouvant dans photographerFactory()
  const userPageHeaderDOM = photographerModel.getUserPageHeaderDOM();
  const userPageHeaderPortraitDom = photographerModel.getUserPageHeaderPortraitDOM();
  const userPagePriceTagDOM = photographerModel.getUserPagePriceTagDOM();
  const userPageModalName = photographerModel.getUserPageModalName();
  const userPageModalLightbox = photographerModel.getUserPageModalLightbox();

  photographHeader.prepend(userPageHeaderDOM); // Nom, localisation et tagline du header
  photographHeader.append(userPageHeaderPortraitDom); // Portrait du header
  photographMain.append(userPagePriceTagDOM); // pricetag dans la partie main
  // ajouter le nom du photographe au titre de la modale
  photographModalTitle.parentNode.replaceChild(userPageModalName, photographModalTitle);
  modal.append(userPageModalLightbox); // Lightbox modale
}

// Fonction qui rajoute un like à la photo et au total des likes
// Appelée par un event listener
function addLike(heart) {
  let picLikes = heart.previousSibling.innerText;
  let totalLikes = +document.querySelector('#main > div.photograph__priceTag > div > p').innerText;
  const title = heart.parentNode.parentNode.firstChild.innerText;

  if (heart.className.includes('clicked')) {
    heart.classList.remove('clicked');
    heart.ariaLabel = `like ${title}`;
    picLikes -= 1;
    totalLikes -= 1;
  } else if (!heart.className.includes('clicked')) {
    heart.classList.add('clicked');
    heart.ariaLabel = `unlike ${title}`;
    picLikes += 1;
    totalLikes += 1;
  }

  heart.previousSibling.innerText = picLikes;
  document.querySelector('#main > div.photograph__priceTag > div > p').innerText = totalLikes;
}

// Fonction initiale qui renvoie les infos vers la fonction displayData,
// et qui appelle la fonction getEventListeners
async function init() {
  // Récupère les datas des photographes
  const { photographers, medias } = await getPhotographers();
  displayData(photographers, medias);
  getEventListeners(photographers, medias);
}

init();
