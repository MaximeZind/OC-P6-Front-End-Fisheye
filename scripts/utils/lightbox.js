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

    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID);
    const lightboxPic = document.querySelector(".lightbox_modal-img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > video");
    console.log(photographPics);

    const ids = [];
    
    photographPics.forEach((photographPic) => {
        ids.push(photographPic.id);
    });

    console.log(ids);
    console.log(ids[0]);

    for (i = 0; i < photographPics.length; i++) {
        if (photographPics[i].id == MediaID) {
            console.log(photographPics[i].id);
            if (photographPics[i].image) {
                lightboxPic.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].image}`);
                lightboxPic.setAttribute('id', MediaID);
                lightboxPic.style.display = 'block';
                lightboxVid.style.display = 'none';
                return
            } else if (photographPics[i].video) {
                lightboxVid.setAttribute('src', `assets/images/${photographerName}/${photographPics[i].video}`);
                lightboxVid.setAttribute('type', 'video/mp4');
                lightboxVid.setAttribute('id', MediaID);
                lightboxVid.setAttribute('controls', '');
                lightboxVid.setAttribute('autoplay', '');
                lightboxPic.style.display = 'none';
                lightboxVid.style.display = 'block';
                return
            }
        }
    }
}
