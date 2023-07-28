let posts = [
    // {
    // "Image":"mary-lawrence.jpg",
    // "Title":"Mary",
    // "Name":"Mia",
    // "Date": "today",
    // "Post": "How are yall?",
    // },
];

(function () {

    let collectHtml = '';

    function collectUserPost() {
        let collectTemplate = `
            <form>
                <p><label for="file" style="cursor: pointer;">Upload Image: </label>
                <input type="file"  accept="image/*" name="image" id="file"  onchange="loadFile(event)"></p>
                <p><img id="output" width="200" /></p>

                <label for="title">Title: </title>
                <input type="text" name="title" id="title"><br><br>
                <label for="author">Author: </label>
                <input type="text" name="author" id="author"><br><br>
                <label for="date">Date: </label>
                <input type="date" name="date" id="date"><br><br>
                <label for="post">Post: </label>
                <input type="text" name="post" id="post"><br><br>
                <input type="submit">
            </form>
        `;
        collectHtml += collectTemplate;

        //load image
        let image = null;
        loadFile = function(event) {
            image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            image = image.src
            console.log(image);
            return image;
        };

        //retrieving user input and stuff
        document.getElementById('collect-post-info').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting normally (page reload)

            // Get the form elements by their names
            let titleInput = document.getElementById('title');
            let authorInput = document.getElementById('author');
            let dateInput = document.getElementById('date');
            let postInput = document.getElementById('post');

            // get values from user
            let titleValue = titleInput.value;
            let authorValue = authorInput.value;
            let dateValue = dateInput.value;
            let postValue = postInput.value;

            //create new post object
            let newPost = {
                "Image": image,
                "Title": titleValue,
                "Author": authorValue,
                "Date": dateValue,
                "Post": postValue,
            };
            posts.push(newPost);

            // reset input values
            titleInput.value = '';
            authorInput.value = '';
            dateInput.value = '';
            postInput.value = '';
            document.getElementById('output').src = '';

            console.log("loading post...");
            // format new post in html
            postHtml = '';

            let completePost = `

            <div class="main-enclose">
                <div class="main-card">
                    <img src="${posts[posts.length - 1]["Image"]}" alt="Image not available" style="width:100%;">
                    <div class="m-container">
                        <h3>${posts[posts.length - 1]["Author"]}</h3>
                        <h5>${posts[posts.length - 1]["Date"]}</h5>
                        <p>${posts[posts.length - 1]["Post"]}</p>
                    </div>
                </div>
            </div>
            
            `;
            postHtml += completePost;
            console.log("post loaded");

            document.getElementById('new-post').innerHTML = postHtml;
            localStorage.setItem("myPosts", posts);
        });   

        console.log(posts);  
        document.getElementById('collect-post-info').innerHTML = collectHtml;
    }
    const news = localStorage.getItem("myPosts");
    collectUserPost(); //collect user post

    //load posts to news.html
    // document.getElementById('load-posts').addEventListener('click', function (event) {
        console.log("we getting there! " + news);   
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
        

}());
