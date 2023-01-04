function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const priceElement = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const headerArticle = document.createElement( 'header');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Portrait de ${name}`)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const pTagline = document.createElement( 'p' );
        const pPrice = document.createElement( 'p' );
        const a = document.createElement( 'a');
        const div = document.createElement ( 'div' );
        a.setAttribute('href', 'photographer.html')
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