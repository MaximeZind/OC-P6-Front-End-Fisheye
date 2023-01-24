// Fonction factory, qui va utiliser les données reçues de notre fichier Json
// Pour créer notre page photographe
function mediaFactory(data, name) {
  const {
    id, image, video, likes, title, liked, date
  } = data;
  const picture = `assets/images/${name}/${image}`;
  const videoMedia = `assets/images/${name}/${video}`;

  //Fonction factory pour créer la gallerie médias
  function getUserPageMainDOM() {
    const article = document.createElement('article');
    article.setAttribute('class', 'photograph__pics__pic');
    const vid = document.createElement('video');
    const img = document.createElement('img');

    if (image === undefined) {
      vid.setAttribute('src', videoMedia);
      vid.setAttribute('id', id);
      vid.setAttribute('class', 'photograph__pics__pic-media');
      vid.setAttribute('aria-label', `${title}`);
      vid.setAttribute('tabindex', '0');
      vid.setAttribute('data-date', `${date}`);
      vid.setAttribute('data-firstname', `${name}`);
    } else if (video === undefined) {
      img.setAttribute('src', picture);
      img.setAttribute('id', id);
      img.setAttribute('class', 'photograph__pics__pic-media');
      img.setAttribute('aria-label', `${title}`);
      img.setAttribute('tabindex', '0');
      img.setAttribute('data-date', `${date}`);
      img.setAttribute('data-firstname', `${name}`);
    }

    const divText = document.createElement('div');
    divText.setAttribute('class', 'photograph__pics__pic-text');

    const divLikes = document.createElement('div');
    divLikes.setAttribute('class', 'photograph__pics__pic-text-likes');
    const pTitle = document.createElement('p');
    pTitle.setAttribute('lang', 'en');
    pTitle.textContent = title;

    const pLikes = document.createElement('p');
    pLikes.textContent = likes;

    const heartDiv = document.createElement('div');
    heartDiv.setAttribute('tabindex', '0');
    
    if (liked){
      heartDiv.setAttribute('class', 'hearts__icons clicked');
      heartDiv.setAttribute('aria-label', `unlike ${title}`)
    } else if (!liked){
      heartDiv.setAttribute('class', 'hearts__icons');
      heartDiv.setAttribute('aria-label', `like ${title}`);
    }

    const heartEmpty = document.createElement('i');
    heartEmpty.setAttribute('class', 'fa-solid fa-heart heart__icon-full');

    const heartFull = document.createElement('i');
    heartFull.setAttribute('class', 'fa-regular fa-heart heart__icon-empty');

    const heartCracked = document.createElement('i');
    heartCracked.setAttribute('class', 'fa-solid fa-heart-crack heart__icon-cracked');


    // Crée les éléments medias de la page photographe

    if (image === undefined) {
      article.append(vid);
    } else if (video === undefined) {
      article.append(img);
    }
    article.append(divText);
    divText.append(pTitle);
    divText.append(divLikes);
    divLikes.append(pLikes);
    divLikes.append(heartDiv);
    heartDiv.append(heartEmpty);
    heartDiv.append(heartFull);
    heartDiv.append(heartCracked);
    return (article);
  }

  return { getUserPageMainDOM };
}
