(function () {
    const news = JSON.parse(localStorage.getItem("myPosts"));
    //load posts to news.html
    // document.getElementById('load-posts').addEventListener('click', function (event) {
    // console.log("we getting there! " + news);   
    //render blog post
    function renderBlog (blogBoi) {
        let blogHtml = '';
        // blogBoi.sort((a,b) => {
        //     if (a.Date_value < b.Date_value) { return 1; }
        //     if (a.Date_value > b.Date_value) { return -1; }
        //     return 0;
        // });
        
        console.log("Preparing to create blog");
        for (let blog of blogBoi) {
            let blogContent = '';

            let blogTemplate = `
                <div class="main-enclose">
                    <div class="main-card">
                        <img src="${blog["Image"]}" alt="Image not available" style="width:100%;">
                        <div class="m-container">
                            <h3>${blog["Title"]}</h3>
                            <h5>${blog["Date"]}</span></h5>
                            <p>${blog["Post"]}</p>
                        </div>
                    </div>
                    <div class="bottom-card">
                        <div class="container">
                            <button class="button1">READ MORE &raquo;</button>
                        </div>
                    </div>
                </div>
                `;
            blogHtml += blogTemplate;   
            console.log("created blog");
        }       
        document.getElementById('blog-post').innerHTML = blogHtml;  
    }
    //  })
    renderBlog(news);
    
    console.log("blog rendered");
    console.log(news);


}());
    