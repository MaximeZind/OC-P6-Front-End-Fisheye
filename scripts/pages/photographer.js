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
    const photographMain = document.getElementById("main");
    const photographModalTitle = document.querySelector("#contact_modal > div > header > h2");

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

    let totalLikes = 0;
    photographPics.forEach((photographPic) => { //contenu de la page (images, vidéos, titres, likes)
        totalLikes = totalLikes + photographPic.likes; //Calcul du total des likes
        const picModel = photographerPageMainFactory(photographPic, photographerName);
        const userPageMainDOM = picModel.getUserPageMainDOM();
        photographPicSection.append(userPageMainDOM);
    });

    //fonction globale pour la factory utilisant la data photographer (et totalLikes)
    const photographerModel = photographerFactory(photograph, totalLikes); 

    //fonctions spécifique se trouvant dans photographerFactory()
    const userPageHeaderDOM = photographerModel.getUserPageHeaderDOM();
    const userPageHeaderPortraitDom = photographerModel.getUserPageHeaderPortraitDOM();
    const userPagePriceTagDOM = photographerModel.getUserPagePriceTagDOM();
    const userPageModalName = photographerModel.getUserPageModalName();
    
    photographHeader.prepend(userPageHeaderDOM); // Nom, localisation et tagline du header
    photographHeader.append(userPageHeaderPortraitDom); // Portrait du header
    photographMain.append(userPagePriceTagDOM); // pricetag dans la partie main
    photographModalTitle.parentNode.replaceChild(userPageModalName, photographModalTitle);
  
};

async function init() {
    // Récupère les datas des photographes
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);

    // DOM Elements
    const form = document.querySelector("#contact_modal > div > form");
    form.addEventListener("submit", validateForm);
};

init();