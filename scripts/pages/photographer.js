async function getPhotographers() {

    const response = await fetch('data/photographers.json');
    const data = await response.json();

    let photographers = data.photographers;
    let medias = data.media;

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers, medias
    })
}

async function displayData(photographers, medias) {
    const photographHeader = document.querySelector(".photograph-header");
    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID); // find() renvoie le premier élément
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID) //filter renvoie une array 
    console.log(photograph);
    console.log(photographPics);
    const photographerModel = photographerPageFactory(photograph);
    const UserPageHeaderDOM = photographerModel.getUserPageHeaderDOM();
    const USerPageHeaderPortraitDom = photographerModel.getUserPageHeaderPortraitDOM();
    photographHeader.prepend(UserPageHeaderDOM);
    photographHeader.appendChild(USerPageHeaderPortraitDom);
};

async function init() {
    // Récupère les datas des photographes
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);
};

init();