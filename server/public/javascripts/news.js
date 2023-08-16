(function () {
    // console.log(news);

    fetch(new Request("/myposts")).then(response => {
        console.log("response:", response);
        //const news = JSON.parse(localStorage.getItem("myPosts") ?? "[]"); dont use this
        return response.json(); // JSON.parse(response); 
    }).then(news => {
        console.log("GET news", news);

        //load posts to news.html
        // document.getElementById('load-posts').addEventListener('click', function (event) {
        // console.log("we getting there! " + news);   
        //render blog post
        function renderBlog(blogBoi) {
            let blogHtml = '';
            blogBoi.sort((a, b) => {
                if (a.created_at < b.created_at) { return 1; }
                if (a.created_at > b.created_at) { return -1; }
                return 0;
            });

            console.log("Preparing to create blog");
            for (let blog of blogBoi) {
                // let blogContent = '';
                // let pig = blog["posts_id"];
                // console.log(pig);
                // console.log("hello  ");

                let img = "";
                if (blog["image"]) {
                    img = `<img src="${blog["image"]}" alt="Image not available" style="width:100%;" />`;
                }

                let blogTemplate = `
                <div class="main-enclose">
                    <div id="${blog["posts_id"]}">
                        <div class="main-card">
                            ${img}
                            <div class="m-container">
                                <h3 class="changed">${blog["title"]}</h3>
                                <h5 class="changed">${blog["author"]}</h4>
                                <h5 class="changed">${blog["date"]}</h5>
                                <div><p>${blog["post"]}</p></div>
                            </div>
                        </div>
                        <!--<div class="bottom-card">
                            <div class="container">
                                <button class="button1 news-show-btn">READ MORE &raquo;</button>
                            </div>
                        </div>-->
                    </div>
                </div>
                `;
                blogHtml += blogTemplate;
            }
            //console.log("created blog:", blogHtml);
            document.getElementById('blog-posts').innerHTML = blogHtml;

            //show and hide news details
            // let btns = document.getElementsByClassName('news-show-btn');
            // for (let btn of btns) {
            //     btn.onclick = function (e) {
            //         //console.log(e);
            //         let node = e.target.parentNode;
            //         let sumry = node.querySelector('.hide-post');
            //         if (sumry) {
            //             //console.log("BEFORE", sumry.style.cdisplay);
            //             if (!sumry.style.display || sumry.style.display === "none") {
            //                 sumry.style.display = "block";
            //             }   
            //             else {
            //                 sumry.style.display = "none";
            //             }
            //             //console.log("AFTER", sumry.style.display);
            //         }
            //     }
            // }

        }

        //  })
        renderBlog(news);

        console.log("blog rendered");
        //console.log(news);
    }).finally(() => {
        console.log("GET /myposts done");

    });

}());
