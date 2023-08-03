(function () {
    const news = JSON.parse(localStorage.getItem("myPosts") ?? []);

    function renderRecentNews (postBoi) {
        let rPostHTML = '';
        for (let recent = 0; recent < news.length-1; recent++) {
            let blogContent = '';

            let rPostTemplate = `
                <div class="side-card">
                    <ul class="p-posts">                        
                        <li><a href="news.html"><img src="${recent["Image"]}" alt="Dad's Birthday Cake" width="50px" align="middle">${recent["Title"]}</a></li>
                    </ul>
                </div>
                `;
            rPostHTML += rPostTemplate;   
            console.log("created side content (news)");
        }       
        document.getElementById('recent-news').innerHTML = rPostHTML;  
    }

    renderRecentPosts(news);

}());