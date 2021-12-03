import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getArchive } from './endpoints/Archive';
import { getVault } from './endpoints/Vault';
import { useDispatch, useSelector } from './store/store';
import { Password, } from './store/vaultSlice';
import Switch from "react-switch";

import './tabs.css';
import './App.css';

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
      masterToken: masterToken
    });
  }

  function getPasswords(filter: boolean): Password[] {
    return vault.filter(password => !filter || tab.includes(password.website))
      .concat(archive.filter(password => !filter || tab.includes(password.website)));
  }

  const dispatch = useDispatch();

  const mail = useSelector(state => state.auth.mail);
  const token = useSelector(state => state.auth.accessToken);
  const masterToken = useSelector(state => state.auth.masterToken);

  const vault = useSelector(state => state.vault);
  const archive = useSelector(state => state.archive);

  const [filter, setFilter] = React.useState(localStorage.getItem("url-filter") === "true");
  const [tab, setTab] = React.useState("");

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      getArchive(dispatch, mail, token)
      getVault(dispatch, mail, token)
    });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      setTab(tabs[0].url!!);
    });
  }, [])

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

  return (
    <div className="content">
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
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
            </table>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;