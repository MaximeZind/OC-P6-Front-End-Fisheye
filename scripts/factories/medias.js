// Fonction factory, qui va utiliser les données reçues de notre fichier Json
// Pour créer notre page photographe
function mediaFactory(data, name) {// eslint-disable-line
  const {
    id, image, video, likes, title, liked, date,
  } = data;
  const picture = `assets/images/${name}/${image}`;
  const videoMedia = `assets/images/${name}/${video}`;

  // Fonction factory pour créer la gallerie médias
  function getUserPageMainDOM() {
    const article = document.createElement('article');
    article.setAttribute('class', 'photograph__pics__pic');
    let media = '';
    if (image === undefined) {
      media = `
      <video src="${videoMedia}" id="${id}" class="photograph__pics__pic-media" aria-label="${title}" tabindex="0" data-date="${date}" data-firstname="${name}"></video>
      `;
    } else if (video === undefined) {
      media = `
      <img src="${picture}" id="${id}" class="photograph__pics__pic-media" aria-label="${title}" tabindex="0" data-date="${date}" data-firstname="${name}">
      `;
    }
    let heartClass = '';
    let heartAriaLabel = '';
    if (liked) {
      heartClass = 'hearts__icons clicked';
      heartAriaLabel = `unlike ${title}`;
    } else if (!liked) {
      heartClass = 'hearts__icons';
      heartAriaLabel = `like ${title}`;
    }
    article.innerHTML = `${media}
    <div class="photograph__pics__pic-text">
      <p lang="en">${title}</p>
      <div class="photograph__pics__pic-text-likes">
        <p>${likes}</p>
        <div tabindex="0" class="${heartClass}" aria-label="${heartAriaLabel}" role="button">
          <i class="fa-solid fa-heart heart__icon-full"></i>
          <i class="fa-regular fa-heart heart__icon-empty"></i>
          <i class="fa-solid fa-heart-crack heart__icon-cracked"></i>
        </div>
      </div>
    </div>`;

    return (article);
  }

  return { getUserPageMainDOM };
}
