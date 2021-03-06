import { AES } from "crypto-js";

fetchLocalStorage()

export function fetchLocalStorage() {
    const state = localStorage.getItem("state")

    if (state === null || state === undefined)
        return;

    // Send messages to background
    chrome.runtime.sendMessage({
        payload: "storage",
        state: state
    }, function (response) {
        console.log(response?.payload);
    });
}

// Recive messages from background
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.payload !== "insert")
        return

    insert(message.username, message.password, message.masterToken, message.submit)

    sendResponse({ payload: "received" });
})

function insert(username: string, password: string, masterToken: string, submit: boolean) {
    const encrypted = decryptPassword(password, masterToken);
    const input = document.getElementsByTagName("input");
    let passInput = null;

    for (let i = 0; i < input.length; i++) {
        const element = input[i];

        if (element.type === "password") {
            element.value = encrypted;
            element.dispatchEvent(new Event('input', { bubbles: true }))

            if (i > 0) {
                input[i - 1].value = username;
                input[i - 1].dispatchEvent(new Event('input', { bubbles: true }))
            }

            //element.scrollIntoView();
            passInput = element;
        }
    }

    if (!submit || !passInput) return;


    let parentElement: HTMLElement | null = passInput.parentElement

    for (let i = 0; i < 15; i++) {
        const inputs = parentElement?.getElementsByTagName('input')!!
        const buttons = parentElement?.getElementsByTagName('button')!!

        for (let i = 0; i < inputs?.length; i++) {
            if (inputs[i].type !== 'submit') continue

            console.log(inputs[i])
            inputs[i].click()
            return
        }

        for (let i = 0; i < buttons?.length; i++) {
            if (buttons[i].outerHTML.includes('login') || buttons[i].outerHTML.includes('log-in') || buttons[i].outerHTML.includes('sign-in') || buttons[i].outerHTML.includes('signin')) {
                buttons[i].click()
                return
            }
        }

        parentElement = parentElement ? parentElement.parentElement : null
    }

    passInput.parentElement?.parentElement?.parentElement?.getElementsByTagName('button')[0]?.click()
}

function decryptPassword(password: string, masterToken: string): string {
    var hex = AES.decrypt(password, masterToken).toString();
    var decryted = '';
    for (var n = 0; n < hex.length; n += 2)
        decryted += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    return decryted;
}