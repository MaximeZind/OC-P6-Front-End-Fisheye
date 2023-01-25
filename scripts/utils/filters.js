// Ouverture du dropdown menu
function openDropDownMenu() {
  const dropdownBtns = document.querySelector('.dropdown__buttons');

  dropdownBtns.classList.add('activated');
}

// fermeture du dropdown menu
function closeDropDownMenu() {
  const dropdownBtns = document.querySelector('.dropdown__buttons');

  dropdownBtns.classList.remove('activated');
}

// Tri des photos une fois un bouton du dropdown cliqué
function filters(event) {
  if ((+event.target.id === 1) || (+event.target.parentNode.id === 1)) {
    return;
  }

  // Elements du DOM
  const targetClasslist = event.target.classList;
  const targetParentClasslist = event.target.parentNode.classList;
  const photographArticles = document.querySelectorAll('#main > section.photograph__pics > article');

  // Nos 3 boutons du dropdown menu
  const firstBtn = document.getElementById('1');
  const secondBtn = document.getElementById('2');
  const thirdBtn = document.getElementById('3');

  // On crée une nouvelle array d'objets avec les éléments disponibles sur la page
  // pour pouvoir recréer la gallerie, en gardant les likes en mémoire
  const photographerMedias = getPageElements();
  const photographerName = photographerMedias[1].photographerFirstname;

  let sortedMedias = {};
  // tri des éléments

  if (targetClasslist.contains('filter__popularity')
  || (targetParentClasslist.contains('filter__popularity'))) { // POPULARITE
    const mediasFilteredByPopularity = photographerMedias.sort(compareLikes);
    sortedMedias = mediasFilteredByPopularity;
  } else if (targetClasslist.contains('filter__date')
  || (targetParentClasslist.contains('filter__date'))) { // DATE
    const mediasFilteredByDate = photographerMedias
      .sort((firstItem, secondItem) => new Date(secondItem.date) - new Date(firstItem.date));
    sortedMedias = mediasFilteredByDate;
  } else if (targetClasslist.contains('filter__title')
  || (targetParentClasslist.contains('filter__title'))) { // TITRE
    const mediasFilteredByTitle = photographerMedias
      .sort((a, b) => ((a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
    sortedMedias = mediasFilteredByTitle;
  }
  // On réarrange la page avec la nouvelle valeur de sortedMedias
  for (let i = 0; i < photographArticles.length; i++) {
    const picModel = mediaFactory(sortedMedias[i], photographerName);
    const userPageMainDOM = picModel.getUserPageMainDOM();
    photographArticles[i].replaceWith(userPageMainDOM);
  }

  // Swap les contenus des boutons du dropdown lorsqu'on clique
  if ((+event.target.id === 2) || (+event.target.parentNode.id === 2)) { // 2e bouton cliqué
    // Swap le texte
    const swapText = firstBtn.firstElementChild.innerText;
    firstBtn.firstElementChild.innerText = secondBtn.firstElementChild.innerText;
    secondBtn.firstElementChild.innerText = swapText;
    // Swap la classe
    const swapClass = firstBtn.className;
    firstBtn.className = secondBtn.className;
    secondBtn.className = swapClass;
  } else if ((+event.target.id === 3) || (+event.target.parentNode.id === 3)) { // 3e bouton cliqué
    // Swap le texte
    const swapText = firstBtn.firstElementChild.innerText;
    firstBtn.firstElementChild.innerText = thirdBtn.firstElementChild.innerText;
    thirdBtn.firstElementChild.innerText = swapText;
    // Swap la classe
    const swapClass = firstBtn.className;
    firstBtn.className = thirdBtn.className;
    thirdBtn.className = swapClass;
  }
  closeDropDownMenu();
}

// Fonction utilitaire de triage en fonction des likes
function compareLikes(a, b) {
  return b.likes - a.likes;
}
