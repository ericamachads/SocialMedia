// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3V7G1Uzxg6zBq-IWjiL6a2kPSd6W0xO8",
  authDomain: "redesocial-24c0b.firebaseapp.com",
  databaseURL: "https://redesocial-24c0b-default-rtdb.firebaseio.com",
  projectId: "redesocial-24c0b",
  storageBucket: "redesocial-24c0b.appspot.com",
  messagingSenderId: "896697338804",
  appId: "1:896697338804:web:d1b421e7a9543a384580e1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get user name and room name from localStorage
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

// Function to send a message
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

// Function to logout
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}

// Function to get data from Firebase
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='assets/tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(\"" + firebase_message_id + "\")'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}

// Function to update like
function updateLike(message_id) {
  console.log("Clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(button_id).update({
    like: updated_likes
  });
}

// Call the getData function to load messages
getData();
