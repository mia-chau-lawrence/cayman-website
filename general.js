(function () {
    const news = JSON.parse(localStorage.getItem("myPosts") ?? []);
    console.log(news);
    console.log(news.length);

    function renderRecentNews (newies) {
        let blogHtml = '';
        
        console.log("Preparing to create blog");
        for (let article of newies) {
            let blogContent = '';

            let blogTemplate = `
                <div class="side-card">
                    <ul class="p-posts">                        
                        <li><a href="news.html"><img src="${article["Image"]}" alt="" width="50px" align="middle"> ${article["Title"]}</a></li>
                    </ul>
                </div>
                    `;
            blogHtml += blogTemplate;   
            console.log("created blog");
        }       
        document.getElementById('blog-post').innerHTML = blogHtml;  
    }
    renderRecentNews(news);

}());