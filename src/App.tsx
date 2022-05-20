import React from 'react';
import Switch from "react-switch";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './App.css';
import { getArchive } from './endpoints/Archive';
import { getVault } from './endpoints/Vault';
import { useDispatch, useSelector } from './store/store';
import { Password } from './store/vaultSlice';
import './tabs.css';


function App() {

    function sendMessageToContentScript(message: any) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!!, message, function (response) { });
        })
    }

    function insertPassword(password: Password) {
        sendMessageToContentScript({
            payload: "insert",
            password: password.password,
            username: password.username,
            masterToken: masterToken,
            submit: autoSubmit
        });
    }

    function getPasswords(filter: boolean): Password[] {
        return vault.filter(password => !filter || tab.includes(password.website) && password.website.length > 0)
            .concat(archive.filter(password => !filter || tab.includes(password.website) && password.website.length > 0));
    }

    const dispatch = useDispatch();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    const vault = useSelector(state => state.vault);
    const archive = useSelector(state => state.archive);

    const [filter, setFilter] = React.useState(localStorage.getItem("url-filter") === "true");
    const [autoFill, setAutoFill] = React.useState(localStorage.getItem("auto-fill") === "true");
    const [autoSubmit, setAutoSubmit] = React.useState(localStorage.getItem("auto-submit") === "true");

    const [tab, setTab] = React.useState("");

    React.useEffect(() => {
        getArchive(dispatch, mail, token)
        getVault(dispatch, mail, token)

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            setTab(tabs[0].url!!);
        });
    }, [])

    React.useEffect(() => {
        const passwords = getPasswords(filter);

        if (!autoFill || passwords.length != 1) return

        insertPassword(passwords[0]);
    }, [tab])

    const Empty = () => {
        if (getPasswords(filter).length > 0)
            return null;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: '100%',
                height: '100%',
                fontSize: '1.2em',
                color: 'grey'
            }}>
                <i className="bx bx-loader-circle bx-spin bx-rotate-90" style={{
                    fontSize: '50px',
                }} />
                <EmptyText />
            </div>
        )
    }

    const EmptyText = () => {
        if (vault.length > 0 || archive.length > 0)
            return (<>
                <p> No passwords saved for: </p>
                <p style={{
                    color: 'lightgray',
                    marginTop: '-10px'
                }}> {tab.split("/")[2]} </p>
            </>)

        return (<>
            <p> Please visit nura and press F5 <br /> to sync with extension </p>
        </>)
    }

    const OpenNura = () => {
        const left = (window.screen.width - 880) / 2
        const top = (window.screen.height - 520) / 4

        window.open("https://nura.micartey.dev/vault", 'newwin', `height=520px,width=880px,left=${left},top=${top}`)
    }

    return (
        <div className="content">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }} onClick={OpenNura}>
                <img src="/logo.png" width="30px" height="30px" alt="" />
                <h3>Nura Vault</h3>
            </div>

            <div className="pwlist">
                <Empty />
                {getPasswords(filter).map((password, index) => {
                    return (
                        <button className="button" key={index} onClick={() => insertPassword(password)}>
                            <div>
                                {password.identifier} <br />
                                **********
                            </div>
                        </button>
                    )
                })
                }
            </div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Settings</Tab>
                        <Tab>Create</Tab>
                    </TabList>

                    <TabPanel style={{
                        overflowY: 'scroll',
                        maxHeight: '150px'
                    }}>
                        <table>
                            <tr>
                                <td>
                                    <Switch
                                        onChange={state => {
                                            setFilter(state);
                                            localStorage.setItem("url-filter", state.toString());
                                        }}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor={"#7da4d8"}
                                        checked={filter}
                                        height={20}
                                        width={40}
                                    />
                                </td>
                                <td>URL filter</td>
                            </tr>
                            <tr>
                                <td>
                                    <Switch
                                        onChange={state => {
                                            setAutoFill(state);
                                            localStorage.setItem("auto-fill", state.toString());
                                        }}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor={"#7da4d8"}
                                        checked={autoFill}
                                        height={20}
                                        width={40}
                                    />
                                </td>
                                <td>Auto fill</td>
                            </tr>
                            <tr>
                                <td>
                                    <Switch
                                        onChange={state => {
                                            setAutoSubmit(state);
                                            localStorage.setItem("auto-submit", state.toString());
                                        }}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor={"#7da4d8"}
                                        checked={autoSubmit}
                                        height={20}
                                        width={40}
                                    />
                                </td>
                                <td>Auto submit</td>
                            </tr>
                        </table>
                    </TabPanel>

                    <TabPanel>

                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default App;