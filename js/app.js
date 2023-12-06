if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}

// Dexie Database
// const db = new Dexie("TextareaDB");

// // Table, Version, and Index
// db.version(1).stores({
//   textareaStates: "++id, text, &text", // & denotes an index
// });

// // Function to save or update the textarea state
// async function saveTextareaState(text) {
//   await db.textareaStates.put({ text });
// }

// // Function to retrieve the last saved textarea state
// async function getLastTextareaState() {
//   const latestState = await db.textareaStates.orderBy("id").last();
//   return latestState ? latestState.text : "";
// }

// const textareaElement = document.getElementById("textarea");

// // Save the textarea state when it changes
// textareaElement.addEventListener("input", () => {
//   const newText = textareaElement.value;
//   saveTextareaState(newText);
// });

// // Retrieve and set the last saved textarea state when the page loads
// document.addEventListener("DOMContentLoaded", async () => {
//   const lastTextareaState = await getLastTextareaState();
//   textareaElement.value = lastTextareaState;
// });
