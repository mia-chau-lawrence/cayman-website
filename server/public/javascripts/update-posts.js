(function () {
    fetch(new Request("/myposts"))
        .then(response => response.json())
        .then(news => {
            renderPosts(news);



            function renderPosts(blogBoi) {
                let blogHtml = '';

                blogBoi.sort((a, b) => {
                    if (a.created_at < b.created_at) { return 1; }
                    if (a.created_at > b.created_at) { return -1; }
                    return 0;
                });

                for (let blog of blogBoi) {
                    let blogTemplate = `
                        <div class="enclose-samples">   
                            <button class="delPostBtn exit" posts_id="${blog.id}">x</button>   
                            <br>    
                            <h3 class="changed">${blog.title}</h3>
                            <h5 class="changed">By ${blog.author}</h5>
                            <h5 class="changed">${blog.date}</h5>
                            <div>${blog.post}</div>
                        </div>
                    `;
                    blogHtml += blogTemplate;
                }

                document.getElementById('previous-posts').innerHTML = blogHtml;
                console.log("posts rendered", news)

                //add event listener to all of the buttons
                const deleteButtons = document.querySelectorAll(".delPostBtn");
                deleteButtons.forEach(button => {
                    button.addEventListener("click", function () {
                        const postId = this.getAttribute("posts_id");
                        confirmDelPost(postId);
                    });
                });
            }

            function confirmDelPost(postId) {
                if (confirm("Are you sure you want to delete this post?")) {
                    fetch(`/mypost/${postId}`, {
                        method: "DELETE"
                    })
                        .then(response => {
                            if (response.ok) {
                                const postElement = document.querySelector(`[posts_id="${postId}"]`).closest('.enclose-samples');
                                if (postElement) {
                                    postElement.remove();
                                }
                            } else {
                                console.error("Delete request failed");
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);

                        }).finally(() => {
                            console.log("DEL /myposts done");
                        });
                }
            }

        }).finally(() => {
            console.log("GET /myposts done");
        });

})();
