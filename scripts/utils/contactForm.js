// Fonction appelée par plusieurs EventListeners, qui ouvre la modale de contact
function displayModal() {
  const modalbg = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const header = document.querySelector('body > header');
  const main = document.querySelector('#main');
  const modal = document.querySelector('.modal');
  const firstFocus = document.getElementById('first');
  const body = document.querySelector('body');

  body.style.overflow = 'hidden';
  modalbg.style.display = 'block';
  firstFocus.focus();
  form.setAttribute('aria-hidden', 'false');
  header.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'true');

  const focusableEls = modal.querySelectorAll('.modal__close, #first, #last, #email, #message, .contact_button');
  trapFocus(modal, focusableEls);
}

// Fonction qui close la modale et réajuste les attributs aria-hidden
function closing() {
  const modalbg = document.getElementById('modal__bg');
  const form = document.querySelector('#modal__bg > div');
  const header = document.querySelector('body > header');
  const main = document.querySelector('#main');
  const body = document.querySelector('body');

  body.style.overflow = 'auto';
  modalbg.style.display = 'none'; // Le conteneur de la modale
  form.setAttribute('aria-hidden', 'true');
  header.setAttribute('aria-hidden', 'false');
  main.setAttribute('aria-hidden', 'false');
}

// Fonction appelée par plusieurs EventListeners, qui ferme la modale de contact
function closeModal(event) {
  const modal = document.querySelector('.modal');

  if ((event.target.className.includes('modal__close') && (event.type === 'keydown') && (event.keyCode === (13 || 32)))) {
    closing(); // Spacebar ou entrée sur la croix de fermeture de la modale
  } else if ((event.target.className.includes('modal__close')) && (event.type === 'click')) {
    closing(); // Simple "click" sur la croix de fermeture de la modale
  } else if ((modal.ariaHidden === 'false') && (event.type === 'keydown') && (event.keyCode === 27)) {
    closing(); // Escape lorsque la modale est ouverte
  }
}

// Fonction de test et validation de l'input prénom ou nom
function validateName(string, option) {
  const nameValue = string.value.trim();
  const inputFieldDataset = string.parentNode.dataset;
  const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; // pattern

  if (nameValue.length >= 2) { // plus de 2 caractères
    if ((regex.test(nameValue)) && (!nameValue.includes(',,')) && (!nameValue.includes('..')) && (!nameValue.includes("''")) && (!nameValue.includes('--')) && (!nameValue.trim().includes('  '))) {
      inputFieldDataset.errorVisible = false;
      return true;
    } if ((regex.test(nameValue) === false) || (nameValue.includes(',,')) || (nameValue.includes('..')) || (nameValue.includes("''")) || (nameValue.includes('--')) || nameValue.trim().includes('  ')) {
      inputFieldDataset.errorVisible = true;
      inputFieldDataset.error = `Vous devez entrer un ${option} valide.`;
      return false;
    }
  } else if (nameValue.length < 2) {
    inputFieldDataset.errorVisible = true;
    inputFieldDataset.error = `Veuillez entrer 2 caractères ou plus pour le champ du ${option}`;
    return false;
  }
  return true;
}
// Fonction de validation de l'input email
function validateEmail(string) {
  const emailValue = string.value.trim();
  const inputFieldDataset = string.parentNode.dataset;
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (emailValue.match(regex) && !emailValue.includes(' ')) {
    inputFieldDataset.errorVisible = false;
    return true;
  } if (!emailValue.match(regex) || emailValue.includes(' ')) {
    inputFieldDataset.errorVisible = true;
    inputFieldDataset.error = 'Veuillez entrer une adresse email valide.';
    return false;
  }
  return true;
}
// Fonction de validation du message (minimum de 25 caractères)
function validateMessage(string) {
  const messageValue = string.value.trim();
  const inputFieldDataset = string.parentNode.dataset;

  if (messageValue.length >= 25) { // plus de 25 caractères
    inputFieldDataset.errorVisible = false;
    return true;
  } if (messageValue.length < 25) { // moins de 25 caractères
    inputFieldDataset.errorVisible = true;
    inputFieldDataset.error = 'Veuillez entrer plus de 25 caractères dans ce champ';
    return false;
  }
  return true;
}

/// / VALIDATION DU FORMULAIRE D'ENVOI DE MESSAGE ////
function validateForm(event) {
  event.preventDefault();

  const form = document.querySelector('#modal__bg > div > form');
  const firstName = document.getElementById('first'); // champ du prénom
  const lastName = document.getElementById('last'); // champ du nom
  const email = document.getElementById('email'); // champ de l'email
  const message = document.getElementById('message'); // champ du message
  // champs vérifiés par les fonctions
  const validations = [validateName(firstName, 'prénom'), validateName(lastName, 'nom'), validateEmail(email), validateMessage(message)];

  // Loop
  let isValid = true;
  let returnValueIsValid = true;

  validations.forEach((validation) => {
    returnValueIsValid = validation;
    isValid = isValid && returnValueIsValid; // Si une itération est false, IsValid sera false
  });

  if (isValid) {
    // Envoie des données dans la console
    console.log(`Prénom: ${firstName.value.trim()}`);
    console.log(`Nom: ${lastName.value.trim()}`);
    console.log(`Email: ${email.value.trim()}`);
    console.log(`Message: ${message.value.trim()}`);

    // Reset du formulaire de message
    form.reset();
    closing();
  } if (!isValid) {
    return false;
  }
  return true;
}
