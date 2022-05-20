import CryptoJS, { AES } from "crypto-js";
import { config } from "../config";
import { Dispatch } from "../store/store";
import { Password, vault } from "../store/vaultSlice";

export function getVault(dispatch: Dispatch, mail: string, token: string) {
    fetch(config.host + '/api/vault', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        }
    }).then(result => result.json()).then(data => {
        dispatch(vault.clearPasswords());

        if (data.message) {
            localStorage.removeItem('state');
            return;
        }

        for (let entry of data.vault) {
            dispatch(vault.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    })
}

export function addPasswordToVault(dispatch: Dispatch, mail: string, token: string, masterToken: string, password: Password) {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        },
        body: JSON.stringify({
            'identifier': password.identifier,
            'website': password.website,
            'username': password.username,
            'password': AES.encrypt(password.password, masterToken).toString()
        })
    }

    fetch(config.host + '/api/vault', requestData).then(result => result.json()).then(data => {
        dispatch(vault.clearPasswords());

        if (data.message) {
            localStorage.removeItem('state');
            return;
        }

        for (let entry of data.vault) {
            dispatch(vault.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    })
}