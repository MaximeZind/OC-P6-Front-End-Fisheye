async function getPhotographers() {

    const response = await fetch('data/photographers.json');
    const data = await response.json();

    let photographers = data.photographers;
    let medias = data.media;

    return ({
        photographers, medias
    })
}

async function displayData(photographers, medias) {
    // Elément de la page dans lesquels on va afficher nos données
    const photographHeader = document.querySelector(".photograph-header");
    const photographPicSection = document.querySelector(".photograph__pics");
    const photographMain = document.getElementById("main");
    const photographModalTitle = document.querySelector("#modal__bg > div > header > h2");
    const modal = document.querySelector("#modal__bg");

    // On récupère les medias et le nom du photographe
    let nameAndMedias = getNameAndMedias(photographers, medias);
    const photographerName = nameAndMedias[0];
    const photograph = nameAndMedias[1];
    const photographPics = nameAndMedias[2];

    let totalLikes = 0;
     //contenu de la page (images, vidéos, titres, likes)
    photographPics.forEach((photographPic) => {
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
    const userPageDropdownMenu = photographerModel.getUserPageDropdownMenu();

    photographHeader.prepend(userPageHeaderDOM); // Nom, localisation et tagline du header
    photographHeader.append(userPageHeaderPortraitDom); // Portrait du header
    photographHeader.after(userPageDropdownMenu); //dropdown menu filtres
    photographMain.append(userPagePriceTagDOM); // pricetag dans la partie main
    photographModalTitle.parentNode.replaceChild(userPageModalName, photographModalTitle); // ajouter le nom du photographe au titre de la modale  
    modal.append(userPageModalLightbox); //Lightbox modale

};

//Fonction qui récupère l'id via l'URL et renvoie le prénom du photographe, ainsi qu'une array d'objets de ses médias
function getNameAndMedias (photographers, medias) {

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

        return [photographerName, photograph, photographPics];
}

//Fonction qui rajoute un like à la photo et au total des likes
function addLike(event) {
    let picLikes = +event.target.previousSibling.innerText;
    let totalLikes = +document.querySelector("#main > div.photograph__priceTag > div > p").innerText;
    heart = event.target;

    if (heart.className.includes('clicked')) {
        heart.classList.remove('clicked');
        picLikes--;
        totalLikes--;
    } else if (!heart.className.includes('clicked')) {
        heart.classList.add('clicked');
        picLikes++;
        totalLikes++;
    }

    event.target.previousSibling.innerText = picLikes;
    document.querySelector("#main > div.photograph__priceTag > div > p").innerText = totalLikes;
}

function getEventListeners(photographers, medias) {
    // DOM Elements
    const form = document.querySelector("#modal__bg > div > form");
    const contactBtn = document.querySelector("#main > div.photograph-header > button");
    const closeBtn = document.querySelector("#modal__bg > div > header > img");
    const photographerPageMedia = document.querySelector("#main > section.photograph__pics");
    const closeLightboxBtn = document.querySelector("#modal__bg > div.lightbox_modal > i.fa-solid.fa-xmark.lightbox_modal-close");
    const lightBoxBtn = document.querySelectorAll("#modal__bg > div.lightbox_modal > .lightbox__btn");
    const filterList = document.querySelector("#main > section.dropdown__section > .dropdown__wrapper");

    //EventListeners

    //Formulaire
    contactBtn.addEventListener("click", displayModal);
    closeBtn.addEventListener("click", closeModal);
    form.addEventListener("submit", validateForm);

    //Lightbox
    closeLightboxBtn.addEventListener("click", closeLightbox);
    lightBoxBtn.forEach((btn) => btn.addEventListener("click", (event) => { displayLightboxNext(photographers, medias, event); }) );
    photographerPageMedia.addEventListener("click", (event) => { photographPicsInteractions(photographers, medias, event)});
    photographerPageMedia.addEventListener("keydown", (event) => { photographPicsInteractions(photographers, medias, event)});

    //Menu déroulant
    filterList.addEventListener("focusin", openDropDownMenu);
    filterList.addEventListener("focusout", closeDropDownMenu);
    filterList.addEventListener("mouseenter", openDropDownMenu);
    filterList.addEventListener("mouseleave", closeDropDownMenu);
    filterList.addEventListener("click", (event) => { filters(photographers, medias, event) });

   
}


async function init() {
    // Récupère les datas des photographes
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);
    getEventListeners(photographers, medias);
};

init();
