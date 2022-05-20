import React from 'react';
import Switch from "react-switch";
import { defaultSettings, Setting } from '../entities/Setting';

const Settings: React.FunctionComponent = (props) => {

    const [settings, setSettings] = React.useState<Setting>(defaultSettings)

    React.useEffect(() => {
        if (!localStorage.getItem('settings'))
            return

        const settings: Setting = JSON.parse(localStorage.getItem('settings')!!) as Setting
        setSettings(settings)
    }, [])

    React.useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings))
    }, [settings])

    return <table>
        <tr>
            <td>
                <Switch
                    onChange={state => {
                        const setting: Setting = {...settings, urlFilter: state}
                        setSettings(setting)
                    }}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={"#7da4d8"}
                    checked={settings.urlFilter}
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
                        const setting: Setting = {...settings, autoFill: state}
                        setSettings(setting)
                    }}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={"#7da4d8"}
                    checked={settings.autoFill}
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
                        const setting: Setting = {...settings, autoSubmit: state}
                        setSettings(setting)
                    }}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={"#7da4d8"}
                    checked={settings.autoSubmit}
                    height={20}
                    width={40}
                />
            </td>
            <td>Auto submit</td>
        </tr>
    </table>
}

export default Settings