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
                <input type="file" accept="image/*" name="blogimage" id="file" onchange="loadFile(event)">
                </p>
                <p><img id="output" width="200" /></p>

                <label for="title">Title: </label>
                <input type="text" name="title" id="title" class="post-info"><br><br>
                <label for="author">Author: </label>
                <input type="text" name="author" id="author" class="post-info"><br><br>
                <!--<label for="date">Date: </label>
                <input type="date" name="date" id="date"><br><br>-->
                <label for="post">Post: </label>
                <textarea name="post" id="post" class="post"></textarea><br><br>
                <input type="submit">
            </form>
        `;
        collectHtml += collectTemplate;

        // preview image
        let image = null;
        loadFile = function(event) {
            image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            image = image.src        
            return image;
        };

        //console.log(posts);  
        document.getElementById('collect-post-info').innerHTML = collectHtml;
    }

    collectUserPost(); //collect user post

}());
