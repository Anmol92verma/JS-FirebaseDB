document.addEventListener("DOMContentLoaded", function(event) {
    initFirebase();
    configFirebase();
    authListener();
});


function initFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBw7q_cYlbtxA0Fnmq9v8fb_5kpjv1XDl8",
        authDomain: "deardiary-c32bb.firebaseapp.com",
        databaseURL: "https://deardiary-c32bb.firebaseio.com",
        projectId: "deardiary-c32bb",
        storageBucket: "deardiary-c32bb.appspot.com",
        messagingSenderId: "608743003776"
    };
    firebase.initializeApp(config);
}

function authListener() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var firebaseDiv = window.document.getElementById("firebaseui-auth-container")
            firebaseDiv.style.visibility = "hidden"

            var mainContent = window.document.getElementById("mainContent")
            mainContent.style.visibility = "visible"
        } else {
            // User is signed out.
            if (window.location.pathname == "/calc/calc.html") {
                window.location.href = "/index.html"
            } else if (window.location.pathname == "/todolist/todolist.html") {
                window.location.href = "/index.html"
            } else {
                var firebaseDiv = window.document.getElementById("firebaseui-auth-container")
                firebaseDiv.style.visibility = "visible"

                var mainContent = window.document.getElementById("mainContent")
                mainContent.style.visibility = "hidden"

                startFirebaseUiAuthContainer()
            }

        }
    }, function(error) {
        console.log(error);
    });
}

function startFirebaseUiAuthContainer() {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}

function logout() {
    firebase.auth().signOut();
    window.location.href = "/index.html"
}

function configFirebase() {
    // FirebaseUI config.
    uiConfig = {
        signInSuccessUrl: 'index.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };
}

function onClick(id) {
    switch (id) {
        case "calc":
            window.location.href = "calc/calc.html"
            break;
        case "todolist":
            window.location.href = "todolist/todolist.html"
            break;
        case "testTodoist":
            window.location.href = "testTodoNotes/remindersList.html"
            break;
        case "logout":
            logout();
            break;
    }
}