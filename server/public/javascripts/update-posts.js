(function () {
    // console.log(news);

    fetch(new Request("/myposts")).then(response => {
        console.log("response:", response);
        //const news = JSON.parse(localStorage.getItem("myPosts") ?? "[]"); dont use this
        return response.json(); // JSON.parse(response); 
    }).then(news => {
        console.log("GET news", news);

        function renderPosts(blogBoi) {
            let blogHtml = '';
            blogBoi.sort((a, b) => {
                if (a.created_at < b.created_at) { return 1; }
                if (a.created_at > b.created_at) { return -1; }
                return 0;
            });

            let counter = news.length;
            for (let blog of blogBoi) {
                // let blogContent = '';                 
                counter -= 1;             

                let blogTemplate = `
                <div class="enclose-samples">   
                    <div class="circle">${counter}</div>       
                    <h3 class="changed">${blog["title"]}</h3>
                    <h5 class="changed">By ${blog["author"]}</h5>
                    <h5 class="changed">${blog["date"]}</h5>
                    <div>${blog["post"]}</div>
                    <!--<div class="center">
                        <button class="button3 summary-show-btn">SUMMARY</button>
                    </div>  -->                      
                </div>
                `;
                blogHtml += blogTemplate;
            }
            console.log("loaded previous posts", news);
            document.getElementById('previous-posts').innerHTML = blogHtml;
        }

        renderPosts(news);

        console.log("blog rendered");
        //console.log(news);
    }).finally(() => {
        console.log("GET /myposts done");

    });

}());
