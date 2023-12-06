if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}



// Create a new Database to hold text
let db = new Dexie("TextDatabase");

// Declare the schema for your new database table named "text"
db.version(1).stores({
  text: "++id, content, timestamp"
});

// Textarea element
const textarea = document.querySelector("#textarea");

// Listen for the play button click event

playButton.addEventListener("click", saveTextToDatabase);

// Function to save text to the Dexie.js database
function saveTextToDatabase() {
  let text = textarea.value.trim();

  // Check if the textarea has content
  if (text !== "") {
    // Add text to the Dexie.js database with a timestamp
    db.text.add({
      content: text,
      timestamp: new Date()
    });

    // Show a notification or perform any other action if needed
    console.log("Text saved to the database");
  }
}

// Function to retrieve and display the latest text from the database
async function displayLatestText() {
  // Retrieve the latest text from the database
  let latestText = await db.text.orderBy('timestamp').last();

  // Update the textarea with the latest text
  textarea.value = latestText ? latestText.content : "";
}

// Call the function to display the latest text on page load
displayLatestText();
