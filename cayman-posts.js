(function (profileBoi) {

    let posts = [
        // {
        // "Image":"",
        // "Title":"",
        // "Name":"",
        // "Date": "",
        // "Post": "",
        // },
     ];


    let collectHTML = '';

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
        collectHTML += collectTemplate;

        //load image
        let image = null;
        loadFile = function(event) {
            image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            image = image.src
            console.log(image);
            return image;
        };

        document.getElementById('collect-user-post').innerHTML = collectHTML;

        //retrieving user input and stuff
        document.getElementById('collect-user-post').addEventListener('submit', function (event) {
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

        // log the answers
        console.log('Title:', titleValue);
        console.log('Author:', authorValue);
        console.log('Date:', dateValue);
        console.log('Post:', postValue);

        // create new post object
        let newPost = {
            "Image": image,
            "Title": titleValue,
            "Author": authorValue,
            "Date": dateValue,
            "Post": postValue,
        };
        posts.push(newPost);
        console.log(posts)

        //reset input values
        titleInput.value = '';
        authorInput.value = '';
        dateInput.value = '';
        postInput.value = '';
        document.getElementById('output').src = '';

        // format new post in html
        let completePost = `
            <div class="post-box">
                <img src=${image} alt="image not available">
                <h1>${posts["Title"]}</h1>
                <p>Author: ${posts["Author"]}</p>
                <p>Date: ${posts["Date"]}</p>
                <p>${posts["Post"]}</p>
            </div>
        <hr>
        `;
        collectHTML += completePost;

        document.getElementById('collect-user-post').innerHTML = collectHTML;

    });

    }

    collectUserPost();

}());
