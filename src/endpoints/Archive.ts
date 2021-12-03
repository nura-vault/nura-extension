import { config } from "../config";
import { archive } from "../store/archiveSlice";
import { Dispatch } from "../store/store";
import CryptoJS from "crypto-js"

export function getArchive(dispatch: Dispatch, mail: string, token: string) {
    fetch(config.host + '/api/archive', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        }
    }).then(result => result.json()).then(data => {
        dispatch(archive.clearPasswords());

        if (data.message) {
            localStorage.removeItem('state');
            return;
        }

        for (let entry of data.vault) {
            dispatch(archive.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    })
}