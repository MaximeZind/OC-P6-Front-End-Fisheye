function filters(photographers, medias, event){

    const targetClasslist = event.target.classList;
    const photographArticles = document.querySelectorAll("#main > section.photograph__pics > article");
    const photographPicSection = document.querySelector(".photograph__pics");
    
    
    let params = new URLSearchParams(document.location.search);
    let photographID = params.get("id");
    //On trie les données pour obtenir celles qui correspondent au photographe de la page en question
    const photograph = photographers.find(({ id }) => id == photographID); // find() renvoie le premier élément
    const photographPics = medias.filter(({ photographerId }) => photographerId == photographID); //filter renvoie une array 


    const mediasFilteredByPopularity = photographPics.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes);
    const mediasFilteredByDate = photographPics.sort(function(firstItem, secondItem){
        return new Date(secondItem.date) - new Date(firstItem.date);
      });
    const mediasFilteredByTitle = photographPics.sort((firstItem, secondItem) => firstItem.title.localeCompare(secondItem.title));
    let photographerName = photograph.name;
    photographerName = photographerName.substring(0, photographerName.lastIndexOf(' '));
    photographerName = photographerName.replace(/-/g, " ");

    const firstBtn = document.getElementById('1');
    const secondBtn = document.getElementById('2');
    const thirdBtn = document.getElementById('3');

    if (targetClasslist.contains('filter__popularity')){
        mediasFilteredByPopularity.forEach((mediaFilteredByPopularity) => { //contenu de la page (images, vidéos, titres, likes)
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByPopularity, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
            console.log(medias);
            console.log(mediaFilteredByPopularity.likes);
        });
        return
    } else if (targetClasslist.contains('filter__date')){

        console.log('date');
        mediasFilteredByDate.forEach((mediaFilteredByDate) => {
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByDate, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
            console.log(mediaFilteredByDate.date);
        });
        return
    } else if (targetClasslist.contains('filter__title')){
        
        console.log('titre');
        mediasFilteredByTitle.forEach((mediaFilteredByTitle) => {
            photographArticles.forEach((photographArticle) => {
                photographArticle.remove();
            });
            const picModel = photographerPageMainFactory(mediaFilteredByTitle, photographerName);
            const userPageMainDOM = picModel.getUserPageMainDOM();
            photographPicSection.append(userPageMainDOM);
            console.log(mediaFilteredByTitle.title);
        });

        getEventListeners(photographers, medias);

        if (+event.target.id === 2) {
            let swapText = firstBtn.innerText;
            firstBtn.innerText = secondBtn.innerText;
            secondBtn.innerText = swapText;
    
            let swapClass = firstBtn.className;
            firstBtn.className = secondBtn.className;
            secondBtn.className = swapClass;
        } else if (+event.target.id === 3) {
            let swapText = firstBtn.innerText;
            firstBtn.innerText = thirdBtn.innerText;
            thirdBtn.innerText = swapText;
    
            let swapClass = firstBtn.className;
            firstBtn.className = thirdBtn.className;
            thirdBtn.className = swapClass;
        }

        return
    }
}