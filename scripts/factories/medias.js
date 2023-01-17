function photographerPageMainFactory(data, name) {
  const {
    id, image, video, likes, title,
  } = data;
  const picture = `assets/images/${name}/${image}`;
  const videoMedia = `assets/images/${name}/${video}`;

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
    } else if (video === undefined) {
      img.setAttribute('src', picture);
      img.setAttribute('id', id);
      img.setAttribute('class', 'photograph__pics__pic-media');
      img.setAttribute('aria-label', `${title}`);
      img.setAttribute('tabindex', '0');
    }

    const divText = document.createElement('div');
    divText.setAttribute('class', 'photograph__pics__pic-text');

    const divLikes = document.createElement('div');
    divLikes.setAttribute('class', 'photograph__pics__pic-text-likes');

    const pTitle = document.createElement('p');
    pTitle.textContent = title;

    const pLikes = document.createElement('p');
    pLikes.textContent = likes;

    const heart = document.createElement('i');
    heart.setAttribute('class', 'fa-solid fa-heart');
    heart.setAttribute('aria-label', 'likes');
    heart.setAttribute('tabindex', '0');

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
    divLikes.append(heart);
    return (article);
  }

  return { getUserPageMainDOM };
}
