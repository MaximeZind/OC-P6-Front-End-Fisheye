// Fonction asynchrone qui fetche les données de notre fichier Json
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();

  const { photographers } = data;

  // et bien retourner le tableau photographers seulement une fois récupéré
  return ({
    photographers,
  });
}
// Fonction qui reçoit les données envoyées par init()
// et appelle notre factory pour créer les cartes photographes de la page index.html
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer); // eslint-disable-line
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction qui récupère les données fetchées par getPhotographers()
// et les renvoie à la fonction displayData
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
