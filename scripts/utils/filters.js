function filters(photographers, medias, event){

    const photographArticles = document.querySelectorAll("#main > section.photograph__pics > article");

    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    const photograph = photographers.find(({ id }) => id == photographID);
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID)
    const photographPicSection = document.querySelector(".photograph__pics");

    const mediasFilteredByPopularity = photographPics.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes);
    const mediasFilteredByDate = photographPics.sort(function(firstItem, secondItem){
        return new Date(secondItem.date) - new Date(firstItem.date);
      });
    const mediasFilteredByTitle = photographPics.sort((firstItem, secondItem) => firstItem.title.localeCompare(secondItem.title));
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");

    if (event.target.classList.contains('filter__popularity')){

        mediasFilteredByPopularity.forEach((mediaFilteredByPopularity) => { //contenu de la page (images, vidéos, titres, likes)
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByPopularity, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
        });
        
    } else if (event.target.classList.contains('filter__date')){

        mediasFilteredByDate.forEach((mediaFilteredByDate) => {
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByDate, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
            console.log(mediaFilteredByDate.date);
        });

    } else if (event.target.classList.contains('filter__title')){

        mediasFilteredByTitle.forEach((mediaFilteredByTitle) => {
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByTitle, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
            console.log(mediaFilteredByTitle.title);
        });
    }
}