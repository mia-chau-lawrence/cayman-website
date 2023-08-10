(async function () {
    let posts = [];
    // localStorage.clear();

    let collectHtml = '';

    async function collectUserPost() {
        let collectTemplate = `
            <form action="/mypost" method="post"  enctype="multipart/form-data">
                <p><label for="file" style="cursor: pointer;">Upload Image: </label>
                <!-- <input type="file" accept="image/*" name="image" id="file"  onchange="loadFile(event)">
                -->
                <input type="file" accept="image/*" name="blogimage" id="file">
                </p>
                <p><img id="output" width="200" /></p>

                <label for="title">Title: </title>
                <input type="text" name="title" id="title"><br><br>
                <label for="author">Author: </label>
                <input type="text" name="author" id="author"><br><br>
                <!--<label for="date">Date: </label>
                <input type="date" name="date" id="date"><br><br>-->
                <label for="post">Post: </label>
                <input type="text" name="post" id="post"><br><br>
                <input type="submit">
            </form>
        `;
        collectHtml += collectTemplate;

        //load image
        // let image = null;
        // loadFile = function(event) {
        //     image = document.getElementById('output');
        //     image.src = URL.createObjectURL(event.target.files[0]);
        //     image = image.src        
        //     return image;
        // };

        //retrieving user input and stuff

        // document.getElementById('collect-post-info').addEventListener('submit', function (event) {
        //     event.preventDefault(); // Prevent the form from submitting normally (page reload)

        //     // Get the form elements by their names
        //     let titleInput = document.getElementById('title');
        //     let authorInput = document.getElementById('author');
        //     let postInput = document.getElementById('post');

        //     //date 
        //     let date = new Date();
        //     let year = date.getFullYear();
        //     let month = date.getMonth();
        //     let day = date.getDay();
        //     let hour = date.getHours();
        //     let minute = date.getMinutes();

        //     let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        //     // get values from user
        //     let titleValue = titleInput.value;
        //     let authorValue = authorInput.value;
        //     let dateValue =  `${monthArray[month]} ${day}, ${year}`;
        //     let postValue = postInput.value;

        //     //create new post object
        //     let newPost = {
        //         "Image": image,
        //         "Title": titleValue,
        //         "Author": authorValue,
        //         "Date_Value": date,
        //         "Date": dateValue,
        //         "Post": postValue,
        //     };
        //     posts.push(newPost);    

        //     // reset input values
        //     titleInput.value = '';
        //     authorInput.value = '';
        //     // dateInput.value = '';
        //     postInput.value = '';
        //     document.getElementById('output').src = '';
            
        //     // format new post in html
        //     postHtml = '';

        //     let completePost = `

        //     <div class="main-enclose">
        //         <div class="main-card">
        //             <img src="${posts[posts.length - 1]["Image"] ?? ''}" alt="Image not available" style="width:100%;">
        //             <div class="m-container">
        //                 <h3>${posts[posts.length - 1]["Author"]}</h3>
        //                 <h5>${posts[posts.length - 1]["Date"]}</h5>
        //                 <p>${posts[posts.length - 1]["Post"]}</p>
        //             </div>
        //         </div>  
        //     </div>
            
        //     `;

        //     postHtml += completePost;
        //     console.log("post loaded");

        //     document.getElementById('new-post').innerHTML = postHtml;
            
        //     //save posts to local storage
        //     //let myPosts = localStorage.getItem("myPosts");
        //     //let news = JSON.parse(myPosts ?? "[]");
        //     //localStorage.setItem("myPosts", JSON.stringify(news.concat(posts)));
            
        //     console.log("newPost", newPost);

        //     fetch(new Request("/mypost"), { 
        //         "method": "POST",
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',
        //             'Content-Type': 'application/json'
        //           }, 
        //         "body": JSON.stringify(newPost) }).then(response => {
        //         console.log(response.status, response.statusText);
        //     });

        // });   

        //console.log(posts);  
        document.getElementById('collect-post-info').innerHTML = collectHtml;
    }

    collectUserPost(); //collect user post

}());
