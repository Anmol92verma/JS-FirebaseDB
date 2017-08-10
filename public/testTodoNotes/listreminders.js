var listReminders = document.getElementById("listReminders");


function fetchMyPosts() {
    var myUserId = firebase.auth().currentUser.uid;
    var userPostsRef = firebase.database().ref('posts');

    userPostsRef.on('child_added', function(data) {
        console.log(" child added " + data.val());
        addReminder(data)
    });

    userPostsRef.on('child_changed', function(data) {
        console.log(" child changed " + data.val());
        reminderChanged(data)
    });

    userPostsRef.on('child_removed', function(data) {
        console.log(" child removed " + data.val());
        reminderRemoved(data)
    });
}

function addReminder(dataObject) {
    var section = document.createElement('div');

    var data = document.createElement('input');
    data.type = 'text';
    data.name = dataObject.val().title
    data.value = dataObject.val().title
    section.appendChild(data);

    document.getElementById('listReminders').appendChild(section);
}


document.addEventListener("DOMContentLoaded", function(event) {
    initFirebase();
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
            fetchMyPosts();
        } else {
            // User is signed out.
            window.location.href = "/index.html"
        }
    }, function(error) {
        console.log(error);
    });
}


function createNew() {
    window.location.href = "/testTodoNotes/createReminder.html"
}