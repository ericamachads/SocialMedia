function addUser() {
  // Get the user name from the input field
  user_name = document.getElementById("user_name").value;

  // Store the user name in local storage
  localStorage.setItem("user_name", user_name);

  // Redirect to the SocialMedia room page
  window.location = "SocialMedia_room.html";
}
