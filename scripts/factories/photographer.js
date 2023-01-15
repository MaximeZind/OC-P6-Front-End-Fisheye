function photographerFactory(data, totalLikes) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const priceElement = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const headerArticle = document.createElement( 'header');
        const img = document.createElement( 'img' );
        img.setAttribute('src', picture)
        img.setAttribute('alt', `${name}`)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const pTagline = document.createElement( 'p' );
        const pPrice = document.createElement( 'p' );
        const a = document.createElement( 'a');
        const div = document.createElement ( 'div' );
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('aria-label', `Cliquer pour accéder à la page de ${name}`)
        pTagline.setAttribute('class', 'card__tagline')
        pPrice.setAttribute('class', 'card__price')
        div.setAttribute('class', 'card__img--wrapper')

        //Set le contenu de chaque élément à créer
        h2.textContent = name;
        h3.textContent = location;
        pTagline.textContent = tagline;
        pPrice.textContent = priceElement;

        //Crée les éléments de la page d'accueil
        article.appendChild(headerArticle);
        headerArticle.appendChild(a);
        a.appendChild(div);
        div.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }

    function getUserPageHeaderDOM() {
        const headerDiv = document.createElement('div');
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const pTagline = document.createElement ( 'p');
        h2.textContent = name;
        h3.textContent = location;
        pTagline.textContent = tagline;
        

        //Crée les éléments du header de la page photographe
        headerDiv.append(h2);
        headerDiv.append(h3);
        headerDiv.append(pTagline);
        return (headerDiv);
    }

    function getUserPageHeaderPortraitDOM() {
        const picDiv = document.createElement( 'div');
        picDiv.setAttribute('class', 'photograph-header_portrait');
        const img = document.createElement( 'img' );
        img.setAttribute('src', picture)
        img.setAttribute('alt', `${name}`)

        picDiv.append(img);
        return (picDiv);
    }

    function getUserPagePriceTagDOM() {

        const div = document.createElement( 'div');
        div.setAttribute('class', 'photograph__priceTag');

        const likesDiv = document.createElement( 'div');
        likesDiv.setAttribute('class', 'photograph__priceTag-likes');

        const p = document.createElement( 'p' );
        p.textContent = totalLikes;

        const heart = document.createElement( 'i' );
        heart.setAttribute('class', "fa-solid fa-heart");

        const pPriceTag = document.createElement( 'p' );
        pPriceTag.textContent = priceElement;

        div.append(likesDiv);
        likesDiv.append(p);
        likesDiv.append(heart);
        div.append(pPriceTag);

        return(div);
    }

    function getUserPageModalName() {
        const h2 = document.createElement( 'h2' );
        h2.innerHTML = `Contactez-moi<br>${name}`;

        return(h2);
    }

    function getUserPageModalLightbox() {
        const div = document.createElement( 'div' );
        div.setAttribute('class', 'lightbox_modal');

        const iLeft = document.createElement( 'i' );
        iLeft.setAttribute('class', 'fa-solid fa-angle-left');

        const img = document.createElement( 'img' );
        img.setAttribute('class', 'lightbox_modal-img');

        const vid = document.createElement( 'video' );
        vid.setAttribute('class', 'lightbox_modal-img');

        const iRight = document.createElement( 'i' );
        iRight.setAttribute('class', 'fa-solid fa-angle-right');

        const pTitle = document.createElement( 'p' );
        pTitle.setAttribute('class', 'lightbox_modal-title');

        const close = document.createElement('i');
        close.setAttribute('class', 'fa-solid fa-xmark lightbox_modal-close');

        div.append(iLeft);
        div.append(img);
        div.append(vid);
        div.append(iRight);
        div.append(close);
        div.append(pTitle);

        return(div);
    }

    
    function getUserPageDropdownMenu() {
        const section = document.createElement( 'section' );
        section.setAttribute('class', 'filters');

        const p = document.createElement( 'p' );
        const filterDiv = document.createElement( 'div' );
        filterDiv.setAttribute('class', 'filters__container');

        const popularityBtn = document.createElement( 'button' );
        popularityBtn.setAttribute('class', 'filter__popularity');
        popularityBtn.setAttribute('id', '1');

        const dateBtn = document.createElement( 'button' );
        dateBtn.setAttribute('class', 'filter__date');
        dateBtn.setAttribute('id', '2');

        const titleBtn = document.createElement( 'button' );
        titleBtn.setAttribute('class', 'filter__title');
        titleBtn.setAttribute('id', '3');

        const span = document.createElement( 'span' );
        const fleche = document.createElement( 'i' );
        fleche.setAttribute('class', 'fa-solid fa-angle-down');

        p.innerText = 'Trier par';
        popularityBtn.innerText = 'Popularité';
        dateBtn.innerText = 'Date';
        titleBtn.innerText = 'Titre';

        section.append(p);
        section.append(filterDiv);
        filterDiv.append(popularityBtn);
        filterDiv.append(dateBtn);
        filterDiv.append(titleBtn);
        filterDiv.append(span);
        span.append(fleche);

        return(section);
    }

    return { name, picture, getUserCardDOM, getUserPageHeaderDOM, getUserPageHeaderPortraitDOM, getUserPagePriceTagDOM, getUserPageModalName, getUserPageModalLightbox, getUserPageDropdownMenu }
}


function photographerPageMainFactory(data, name) {
    const { id, image, video, likes, title } = data;
    const picture = `assets/images/${name}/${image}`;
    const videoMedia = `assets/images/${name}/${video}`;

    function getUserPageMainDOM() {

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'photograph__pics__pic');
        const vid = document.createElement( 'video' );
        const img = document.createElement( 'img' );

        if (image === undefined){
            vid.setAttribute('src', videoMedia);
            vid.setAttribute('id', id);
            vid.setAttribute('class', 'photograph__pics__pic-media');
        } else if (video === undefined) {
            img.setAttribute("src", picture);
            img.setAttribute('id', id);
            img.setAttribute('class', 'photograph__pics__pic-media');
        }

        const divText = document.createElement( 'div' );
        divText.setAttribute('class', 'photograph__pics__pic-text');

        const divLikes = document.createElement( 'div' );
        divLikes.setAttribute('class', 'photograph__pics__pic-text-likes');

        const pTitle = document.createElement( 'p' );
        pTitle.textContent = title;

        const pLikes = document.createElement( 'p' );
        pLikes.textContent = likes;

        const heart = document.createElement( 'i' );
        heart.setAttribute('class', 'fa-solid fa-heart');
        
        //Crée les éléments medias de la page photographe
        
        if (image === undefined){
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

    return { getUserPageMainDOM }
}
