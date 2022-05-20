import { Password } from "../store/vaultSlice";

receive()

export function receive() {
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (!message.payload)
            return;

        if (message.payload !== "storage")
            return;

        localStorage.setItem('state', message.state)
        console.log("Received data from content-script")
        sendResponse({ payload: "received" })
    })

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (!message.payload)
            return;

        if (message.payload !== "loading")
            return;

        if (!localStorage.getItem('state'))
            return;

    })
}