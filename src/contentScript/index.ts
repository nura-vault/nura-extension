import { AES } from "crypto-js";

fetchLocalStorage()

export function fetchLocalStorage() {
  console.log("fetching...")

  const state = localStorage.getItem("state")

  if (state === null || state === undefined)
    return;

  // Send messages to background
  chrome.runtime.sendMessage({
    payload: "storage",
    state: state
  }, function (response) {
    console.log(response.payload);
  });
}

// Recive messages from background
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if (message.payload === "insert")
    insert(message.username, message.password, message.masterToken)

  sendResponse({ "payload": "received" });
})

function insert(username: string, password: string, masterToken: string) {
  const encrypted = decryptPassword(password, masterToken);
  const input = document.getElementsByTagName("input");

  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    if (element.type === "password") {
      element.value = encrypted;
      element.dispatchEvent(new Event('input', { bubbles: true }))

      if (i > 0) {
        input[i - 1].value = username;
        input[i - 1].dispatchEvent(new Event('input', { bubbles: true }))
      }

      element.scrollIntoView();
    }
  }
}

function decryptPassword(password: string, masterToken: string): string {
  var hex = AES.decrypt(password, masterToken).toString();
  var decryted = '';
  for (var n = 0; n < hex.length; n += 2)
    decryted += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  return decryted;
}