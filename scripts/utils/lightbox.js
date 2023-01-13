function displayLightbox() {
    const modal = document.getElementById("contact_modal");
    const form = document.querySelector("#contact_modal > div");
    const lightbox = document.querySelector("#contact_modal > div.lightbox_modal");

	  modal.style.display = "block";
    form.style.display = "none";
    lightbox.style.display = "grid";
}

function closeLightbox() {
    const modal = document.getElementById("contact_modal");
    const form = document.querySelector("#contact_modal > div");
    const lightbox = document.querySelector("#contact_modal > div.lightbox_modal");

    modal.style.display = "none";
    form.style.display = "block";
    lightbox.style.display = "none";
}

function createLightboxMedia(photographPics, mediaID, photographerName) {

    const lightboxPic = document.querySelector("#contact_modal > div.lightbox_modal > img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");

    const removeAttributes = (element) => {
        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    };

    for (i = 0; i < photographPics.length; i++) {
        if (photographPics[i].id === mediaID) {
            if (photographPics[i].image) {
                removeAttributes(lightboxVid);
                lightboxPic.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].image}`);
                lightboxPic.setAttribute('id', mediaID);
                lightboxPic.style.display = 'block';
                lightboxVid.style.display = 'none';
                break;
            } else if (photographPics[i].video) {
                removeAttributes(lightboxPic);
                lightboxVid.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].video}`);
                lightboxVid.setAttribute('type', 'video/mp4');
                lightboxVid.setAttribute('id', mediaID);
                lightboxVid.setAttribute('controls', '');
                lightboxVid.setAttribute('autoplay', '');
                lightboxVid.style.display = 'block';
                break;
            }
        }
    }
}

async function displayLightboxMedia(event) {
    const { photographers, medias } = await getPhotographers();
    const mediaID = +event.target.id; // Renvoie l'id en type nombre

    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID);
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");

    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID);
    const lightboxPic = document.querySelector("#contact_modal > div.lightbox_modal > img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");

    const ids = [];
    
    photographPics.forEach((photographPic) => {
        ids.push(photographPic.id);
    });

    createLightboxMedia(photographPics, mediaID, photographerName);
    displayLightbox();
}

async function displayLightboxNextRight() {
    const { photographers, medias } = await getPhotographers();

    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID);
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID);
    const lightboxPic = document.querySelector("#contact_modal > div.lightbox_modal > img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");
    let mediaID = 0;
    if (lightboxPic.getAttribute('id')) {
        mediaID = +lightboxPic.getAttribute('id');
    } else if (lightboxVid.getAttribute('id')) {
        mediaID = +lightboxVid.getAttribute('id');
    }
    
    const picIds = [];
    photographPics.forEach((photographPic) => {
        picIds.push(photographPic.id);
    });

    let nextId = 0;
    for(i=0; i < picIds.length; i++){
        if (picIds[i] === mediaID){
            if (picIds[i+1]){
                nextId = picIds[i+1];
            } else if (!picIds[i+1]) {
                nextId = picIds[0];
            }
            break;
        }
    }
    createLightboxMedia(photographPics, nextId, photographerName);
}

async function displayLightboxNextLeft() {
    const { photographers, medias } = await getPhotographers();

    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID);
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID);
    const lightboxPic = document.querySelector("#contact_modal > div.lightbox_modal > img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");
    let mediaID = 0;
    if (lightboxPic.getAttribute('id')) {
        mediaID = +lightboxPic.getAttribute('id');
    } else if (lightboxVid.getAttribute('id')) {
        mediaID = +lightboxVid.getAttribute('id');
    }
    
    const picIds = [];
    photographPics.forEach((photographPic) => {
        picIds.push(photographPic.id);
    });
    const iterations = picIds.length;
    let nextId = 0;
    for(i=0; i < iterations; i++){
        if (picIds[i] === mediaID){
            if (picIds[i-1]){
                nextId = picIds[i-1];
            } else if (!picIds[i-1]) {
                nextId = picIds[iterations-1];
            }
            break;
        }
    }

    createLightboxMedia(photographPics, nextId, photographerName);
}