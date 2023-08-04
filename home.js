(function () {
    let images = ["aunt-evie.jpg", "turtle.jpg", "mary-lawrence.jpg",];

    home_image = images[getRndInteger(0, images.length)]
    console.log(home_image);

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    //render image
    function renderHomeImage () {
        let imageHtml = '';

        let imageTemplate = `
            <img src="${home_image}" style="width:100%">
            <hr>
                `;
        imageHtml += imageTemplate;         
        document.getElementById('home-image').innerHTML = imageHtml;  
    }
    renderHomeImage();


}());