function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const priceElement = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const headerArticle = document.createElement( 'header');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`)
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
    return { name, picture, getUserCardDOM }
}

function photographerPageFactory(data) {
    console.log(data);
    const { name, portrait, city, country, tagline } = data;
    const contactButton = document.querySelector(".contact_button");
    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;

    function getUserPageHeaderDOM() {
        const headerDiv = document.createElement('div');
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const pTagline = document.createElement ( 'p');
        h2.textContent = name;
        h3.textContent = location;
        pTagline.textContent = tagline;
        

        //Crée les éléments du header de la page photographe
        headerDiv.appendChild(h2);
        headerDiv.appendChild(h3);
        headerDiv.appendChild(pTagline);
        return (headerDiv);
    }

    function getUserPageHeaderPortraitDOM() {
        const picDiv = document.createElement( 'div');
        picDiv.setAttribute('class', 'photograph-header_portrait');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`)

        picDiv.appendChild(img);
        return (picDiv);
    }

    return { getUserPageHeaderDOM, getUserPageHeaderPortraitDOM }
}
