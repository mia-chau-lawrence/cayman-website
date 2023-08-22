(async function () {
    fetch(new Request("/login")).then(response => {
        console.log("login", response);
        if (response.status == 401) {
            window.alert("Not logged in");
            location.replace("/index.html")
        }
    }).finally(() => {
        console.log("we be in boyzzzz");

    });
}());
