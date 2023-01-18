//Ouverture du dropdown menu
function openDropDownMenu() {
  const dropdownBtns = document.querySelector(".dropdown__buttons");

  dropdownBtns.classList.add('activated');
}

//fermeture du dropdown menu
function closeDropDownMenu() {
  const dropdownBtns = document.querySelector(".dropdown__buttons");

  dropdownBtns.classList.remove('activated');
}

//Tri des photos une fois un bouton du dropdown cliqué
function filters(photographers, medias, event) {

  // Elements du DOM
  const targetClasslist = event.target.classList;
  const targetParentClasslist = event.target.parentNode.classList;
  const photographArticles = document.querySelectorAll('#main > section.photograph__pics > article');

  // On récupère les medias et le nom du photographe
  const nameAndMedias = getNameAndMedias(photographers, medias);
  const photographerName = nameAndMedias[0];



  // Nos 3 boutons du dropdown menu
  const firstBtn = document.getElementById('1');
  const secondBtn = document.getElementById('2');
  const thirdBtn = document.getElementById('3');

  //On crée une nouvelle array d'objets avec les éléments disponibles sur la page
  //pour pouvoir recréer la gallerie, en gardant les likes en mémoire
  let photographerMedias = getPageElements();

  let sortedMedias = {};
  // tri des éléments

  if (targetClasslist.contains('filter__popularity') || (targetParentClasslist.contains('filter__popularity'))) { // POPULARITE
    function compareNumbers(a, b) {
      return b.likes - a.likes;
    }
    const mediasFilteredByPopularity = photographerMedias.sort(compareNumbers);
    sortedMedias = mediasFilteredByPopularity;
  } else if (targetClasslist.contains('filter__date') || (targetParentClasslist.contains('filter__date'))) { //DATE
    const mediasFilteredByDate = photographerMedias.sort((firstItem, secondItem) => new Date(secondItem.date) - new Date(firstItem.date));
    sortedMedias = mediasFilteredByDate;
  } else if (targetClasslist.contains('filter__title') || (targetParentClasslist.contains('filter__title'))) { //TITRE
    const mediasFilteredByTitle = photographerMedias.sort((a, b) => ((a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
    sortedMedias = mediasFilteredByTitle;
  }
  //On réarrange la page avec la nouvelle valeur de sortedMedias
  for (i = 0; i < photographArticles.length; i++) {

    const picModel = photographerPageMainFactory(sortedMedias[i], photographerName);
    const userPageMainDOM = picModel.getUserPageMainDOM();
    photographArticles[i].replaceWith(userPageMainDOM);
    photographArticles[i].firstElementChild.addEventListener('click', (event) => { displayLightboxMedia(photographers, medias, event); });
  }

  // Swap les contenus des boutons du dropdown lorsqu'on clique
  if ((+event.target.id === 2) || (+event.target.parentNode.id === 2)) { // 2e bouton cliqué
    // Swap le texte
    const swapText = firstBtn.firstChild.innerText;
    firstBtn.firstChild.innerText = secondBtn.firstChild.innerText;
    secondBtn.firstChild.innerText = swapText;
    // Swap la classe
    const swapClass = firstBtn.className;
    firstBtn.className = secondBtn.className;
    secondBtn.className = swapClass;
  } else if ((+event.target.id === 3) || (event.target.parentNode.id === 2)) { // 3e bouton cliqué
    // Swap le texte
    const swapText = firstBtn.firstChild.innerText;
    firstBtn.firstChild.innerText = thirdBtn.firstChild.innerText;
    thirdBtn.firstChild.innerText = swapText;
    // Swap la classe
    const swapClass = firstBtn.className;
    firstBtn.className = thirdBtn.className;
    thirdBtn.className = swapClass;
  }
  closeDropDownMenu();
}

function getPageElements() {
  const photographArticles = document.querySelectorAll('#main > section.photograph__pics > article');

  // On récupère l'ID du photographe via l'URL
  const params = new URLSearchParams(document.location.search);
  const photographerID = params.get('id');

  //On crée une nouvelle array d'objets avec les éléments disponibles sur la page
  //pour pouvoir recréer la gallerie, en gardant les likes en mémoire
  let photographerMedias = [];
  photographArticles.forEach((article) => {
    let media = {
      'id': +article.firstElementChild.id,
      'likes': +article.firstElementChild.nextSibling.lastChild.firstChild.innerText,
      'liked': article.firstElementChild.nextSibling.lastChild.lastChild.className.includes('clicked'),
      'title': article.firstElementChild.nextSibling.firstChild.innerText,
      'date': article.firstElementChild.dataset.date,
      'photographerId': photographerID,
      'photographerFirstname': article.firstElementChild.dataset.firstname
    };
    if (article.firstElementChild.tagName.toLowerCase() === 'img') {
      media.image = article.firstElementChild.src.split('/').pop();
    } else if (article.firstElementChild.tagName.toLowerCase() === 'video') {
      media.video = article.firstElementChild.src.split('/').pop();
    }
    photographerMedias.unshift(media);

  });
  photographerMedias = photographerMedias.reverse();
  return photographerMedias
}
