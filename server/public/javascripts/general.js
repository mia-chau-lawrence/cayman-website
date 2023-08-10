(function () {

    fetch(new Request("/myposts")).then(response => {
        console.log("response:", response);
        //const news = JSON.parse(localStorage.getItem("myPosts") ?? "[]");
        return response.json(); // JSON.parse(response);
    }).then(news => {
        console.log("news", news);

        function renderRecentNews (news) {
            let blogHtml = '';
            
            for (let article of news) {
                let blogContent = '';
    
                let img = "";
                if (article.image) {
                    img = `<img src="${article["image"]}" alt="" width="50px" align="middle" />`;
                }

                let blogTemplate = `
                    <div class="side-card">
                        <ul class="p-posts">                        
                            <li><a href="news.html">
                            ${img} ${article["title"]}</a></li>
                        </ul>
                    </div>
                        `;
                blogHtml += blogTemplate;   
            }       
            document.getElementById('blog-post').innerHTML = blogHtml;  
        }
    
    
        renderRecentNews(news);
    
    });


}());