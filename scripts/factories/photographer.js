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
        const strong = document.createElement( 'strong');
        const p = document.createElement( 'p');
        const a = document.createElement( 'a');
        a.setAttribute('href', 'photographer.html');

        //Set le contenu de chaque élément à créer
        h2.textContent = name;
        h3.textContent = location;
        strong.textContent = tagline;
        p.textContent = priceElement;

        //Crée les éléments de la page d'accueil
        article.appendChild(headerArticle);
        headerArticle.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(strong);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}