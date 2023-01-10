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
    // Elément de la page dans lesquels on va afficher nos données
    const photographHeader = document.querySelector(".photograph-header");
    const photographPicSection = document.querySelector(".photograph__pics");
    // On récupère l'ID du photographe via l'URL
    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");

    //On trie les données pour obtenir celles qui correspondent au photographe de la page en question
    const photograph = photographers.find(({ id }) => id == photographID); // find() renvoie le premier élément
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID) //filter renvoie une array 
    
    //On récupère le prénom du photographe pour accéder au dossier des photos
    let photographerName = photograph.name; 
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");
    
    console.log(photographerName);
    console.log(photograph);
    console.log(photographPics);

    const photographerModel = photographerPageFactory(photograph);
    const UserPageHeaderDOM = photographerModel.getUserPageHeaderDOM();
    const UserPageHeaderPortraitDom = photographerModel.getUserPageHeaderPortraitDOM();

    photographHeader.prepend(UserPageHeaderDOM);
    photographHeader.append(UserPageHeaderPortraitDom);
    photographPics.forEach((photographPic) => {
        console.log(photographPic);
        const picModel = photographerPageMainFactory(photographPic, photographerName);
        const userPageMainDOM = picModel.getUserPageMainDOM();
        photographPicSection.append(userPageMainDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);
};

init();