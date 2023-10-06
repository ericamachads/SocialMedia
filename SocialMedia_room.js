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
// Get user name from local storage
user_name = localStorage.getItem("user_name");

// Display user name on the page
document.getElementById("user_name").innerHTML = "Welcome, " + user_name + "!";

// Function to add a room
function addRoom() {
  // Get room name from the input field
  room_name = document.getElementById("room_name").value;
  
  // Redirect to the room page
  window.location = "SocialMedia_page.html";
  
  // Update the database with the new room
  firebase.database().ref("/").child(room_name).update({
    purpose: "add room"
  });
  
  // Store the room name in local storage
  localStorage.setItem("room_name", room_name);
}

// Function to get room data
function getData() {
  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}

// Call the function to get room data
getData();

// Function to redirect to a room by its name
function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "SocialMedia_page.html";
}

// Function to log out
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}