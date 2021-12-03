import CryptoJS from "crypto-js";
import { config } from "../config";
import { Dispatch } from "../store/store";
import { vault } from "../store/vaultSlice";

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