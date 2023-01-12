function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayLightbox(event) {
    const modal = document.getElementById("contact_modal");
    const form = document.querySelector("#contact_modal > div");
    const lightbox = document.querySelector("#contact_modal > div.lightbox_modal");

    const PicSrc = event.target.src;
    const lightboxPic = document.querySelector("#contact_modal > div.lightbox_modal > img");
    const lightboxVid = document.querySelector("#contact_modal > div.lightbox_modal > vid");

    if (PicSrc.includes('.jpg')) {

    lightboxPic.setAttribute('src', PicSrc);
    lightboxPic.style.display = 'block';
    lightboxVid.style.display = 'none';

    } else if (PicSrc.includes('.mp4')) {

    lightboxVid.setAttribute('src', PicSrc);
    lightboxPic.style.display = 'none';
    lightboxVid.style.display = 'block';

    }

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

//// VALIDATION DU FORMULAIRE D'ENVOI DE MESSAGE ////
function validateForm(event) {
    event.preventDefault();

    console.log('validate!');
    const form = document.querySelector("#contact_modal > div > form");
    const firstName = document.getElementById('first'); //champ du prénom
    const lastName = document.getElementById('last'); //champ du nom
    const email = document.getElementById('email'); //champ de l'email
    const message = document.getElementById('message'); // champ du message
    // champs vérifiés par les fonctions
    const validations = [ validateName(firstName, 'prénom'), validateName(lastName, 'nom'), validateEmail(email) ];
   
      // Loop
  let isValid = true;
  let returnValueIsValid = true;

  validations.forEach((validation) => {
    returnValueIsValid = validation;
    isValid = isValid && returnValueIsValid; //Si une itération est false, IsValid sera false

  });

  if (isValid) {
    //Envoie des données dans la console
    console.log('Prénom: ' + firstName.value.trim());
    console.log('Nom: ' + lastName.value.trim());
    console.log('Email: ' + email.value.trim());
    console.log('Message: ' + message.value.trim());

    //Reset du formulaire de message
    form.reset();
    return true;
  } else if (!isValid) {
    return false;
  }

}

function validateName(string, option) {

    nameValue = string.value.trim();
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; //pattern
    
    if (nameValue.length >= 2) { // plus de 2 caractères
      if ((regex.test(nameValue)) && (!nameValue.includes(",,")) && (!nameValue.includes("..")) && (!nameValue.includes("''")) && (!nameValue.includes("--")) && (!nameValue.trim().includes("  "))) {
        string.parentNode.dataset.errorVisible = false;
        return true;
      } else if ((regex.test(nameValue) === false) || (nameValue.includes(",,")) || (nameValue.includes("..")) || (nameValue.includes("''")) || (nameValue.includes("--")) || nameValue.trim().includes("  ")) {
        string.dataset.errorVisible = true;
        string.dataset.error = `Vous devez entrer un ${option} valide.`;
        return false;
      }
    } else if (nameValue.length < 2) {
      string.parentNode.dataset.errorVisible = true;
      string.parentNode.dataset.error = `Veuillez entrer 2 caractères ou plus pour le champ du ${option}`;
      return false;
    }
  }

  function validateEmail(string) {
    emailValue = string.value.trim();
    const regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    if (emailValue.match(regex) && !emailValue.includes(" ")) {
      string.parentNode.dataset.errorVisible = false;
      return true;
    } else if (!emailValue.match(regex) || emailValue.includes(" ")) {
      string.parentNode.dataset.errorVisible = true;
      string.parentNode.dataset.error = 'Veuillez entrer une adresse email valide.';
      return false;
    }
  }
