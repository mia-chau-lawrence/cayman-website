(function () {
    let images = ["images/shells.jpeg", "images/beach.jpg", "images/beach2.jpg"];

    home_image = images[getRndInteger(0, images.length)];

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //render image
    function renderHomeImage() {
        let imageHtml = '';

        let imageTemplate = `
            <img src="${home_image}" class="home-image">
                `;
        imageHtml += imageTemplate;
        document.getElementById('home-image').innerHTML = imageHtml;
    }
    renderHomeImage();


}());