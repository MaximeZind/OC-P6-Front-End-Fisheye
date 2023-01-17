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
  const photographArticles = document.querySelectorAll('#main > section.photograph__pics > article');

  // On récupère les medias et le nom du photographe
  const nameAndMedias = getNameAndMedias(photographers, medias);
  const photographerName = nameAndMedias[0];
  let photographPics = nameAndMedias[2];

  // Nos 3 boutons du dropdown menu
  const firstBtn = document.getElementById('1');
  const secondBtn = document.getElementById('2');
  const thirdBtn = document.getElementById('3');

  for (i=0; i < photographArticles.length; i++){
    let clickedState = photographArticles[i].firstElementChild.nextSibling.lastChild.lastChild.className.includes('clicked');

    photographPics[i].liked = clickedState;
    photographPics[i].likes++;

  }

  // tri des éléments
  if (targetClasslist.contains('filter__popularity')) { // POPULARITE
    function compareNumbers(a, b) {
      return b.likes - a.likes;
    }

    let mediasFilteredByPopularity = photographPics.sort(compareNumbers);

    for (i = 0; i < photographArticles.length; i++) {

      const picModel = photographerPageMainFactory(mediasFilteredByPopularity[i], photographerName);
      const userPageMainDOM = picModel.getUserPageMainDOM();
      photographArticles[i].replaceWith(userPageMainDOM);
      photographArticles[i].firstElementChild.addEventListener('click', (event) => { displayLightboxMedia(photographers, medias, event); });
    }
  } else if (targetClasslist.contains('filter__date')) { // DATE
    let mediasFilteredByDate = photographPics.sort((firstItem, secondItem) => new Date(secondItem.date) - new Date(firstItem.date));

    for (i = 0; i < photographArticles.length; i++) {

      const picModel = photographerPageMainFactory(mediasFilteredByDate[i], photographerName);
      const userPageMainDOM = picModel.getUserPageMainDOM();
      photographArticles[i].replaceWith(userPageMainDOM);
      photographArticles[i].firstElementChild.addEventListener('click', (event) => { displayLightboxMedia(photographers, medias, event); });
    }
  } else if (targetClasslist.contains('filter__title')) { //TITRE

    let mediasFilteredByTitle = photographPics.sort((a, b) => ((a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));

    for (i = 0; i < photographArticles.length; i++) {

      const picModel = photographerPageMainFactory(mediasFilteredByTitle[i], photographerName);
      const userPageMainDOM = picModel.getUserPageMainDOM();
      photographArticles[i].replaceWith(userPageMainDOM);
      photographArticles[i].firstElementChild.addEventListener('click', (event) => { displayLightboxMedia(photographers, medias, event); });
    }
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
