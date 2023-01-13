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
    const modal = document.querySelector("#contact_modal");

    // On récupère l'ID du photographe via l'URL
    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");

    //On trie les données pour obtenir celles qui correspondent au photographe de la page en question
    const photograph = photographers.find(({ id }) => id == photographID); // find() renvoie le premier élément
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID); //filter renvoie une array 

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
    const userPageModalLightbox = photographerModel.getUserPageModalLightbox();

    photographHeader.prepend(userPageHeaderDOM); // Nom, localisation et tagline du header
    photographHeader.append(userPageHeaderPortraitDom); // Portrait du header
    photographMain.append(userPagePriceTagDOM); // pricetag dans la partie main
    photographModalTitle.parentNode.replaceChild(userPageModalName, photographModalTitle); // ajouter le nom du photographe au titre de la modale  
    modal.append(userPageModalLightbox); //Lightbox modale

};

async function displayLightboxMedia(event) {
    displayLightbox();
    const { photographers, medias } = await getPhotographers();
    const MediaID = event.target.id;

    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID);
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");

    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID)
    // console.log(medias);
    // console.log(photograph);
    // console.log(photographID);
    // console.log(photographPics);

    const lightboxPic = document.querySelector(".lightbox_modal-img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");

    for (i = 0; i < photographPics.length; i++) {
        if (photographPics[i].id == MediaID) {
            console.log(photographPics[i].id);
            if (photographPics[i].image) {
                lightboxPic.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].image}`);
                lightboxPic.style.display = 'block';
                lightboxVid.style.display = 'none';
                return
            } else if (photographPics[i].video) {
                lightboxVid.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].video}`);
                lightboxVid.setAttribute('type', 'video/mp4');
                lightboxVid.setAttribute('controls', '');
                lightboxVid.setAttribute('autoplay', '');
                lightboxPic.style.display = 'none';
                lightboxVid.style.display = 'block';
                return
            }
        }
    }
}



async function init() {
    // Récupère les datas des photographes
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);

    // DOM Elements
    const form = document.querySelector("#contact_modal > div > form");
    const contactBtn = document.querySelector("#main > div.photograph-header > button");
    const closeBtn = document.querySelector("#contact_modal > div > header > img");
    const photographerPageMedia = document.querySelectorAll("#main > section > article > img, #main > section > article > video");
    const closeLightboxBtn = document.querySelector("#contact_modal > div.lightbox_modal > i.fa-solid.fa-xmark.lightbox_modal-close")


    //EventListeners
    contactBtn.addEventListener("click", displayModal);
    closeBtn.addEventListener("click", closeModal);
    form.addEventListener("submit", validateForm);
    closeLightboxBtn.addEventListener("click", closeLightbox);
    photographerPageMedia.forEach((media) => {
        media.addEventListener("click", displayLightboxMedia);
    });

};

init();