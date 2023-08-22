(async function () {
    fetch(new Request("/login")).then(response => {
        console.log("login", response);
        if (response.status == 401) {
            window.alert("Not logged in");
            location.replace("/index.html")
        } else if (response.status == 500) {
            window.alert("Too many failed log in attempts. Try again later");
            location.replace("/index.html")
        }
    }).finally(() => {
        console.log("we be in boyzzzz");

    });
}());
