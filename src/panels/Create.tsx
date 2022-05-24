import React from "react"
import { Button, Input } from "../components/Formular"
import { generatePassword } from "../endpoints/Password";

const Create: React.FunctionComponent = (props) => {

    const identifier: React.RefObject<HTMLInputElement> = React.createRef();
    const usernameRef: React.RefObject<HTMLInputElement> = React.createRef();
    const passwordRef: React.RefObject<HTMLInputElement> = React.createRef();

    const [username, setUsername] = React.useState<string | undefined>(undefined)
    const [password, setPassword] = React.useState<string | undefined>(undefined)

    const handleGeneratePassword = () => {
        if (!passwordRef.current) return
        passwordRef.current.value = generatePassword(16)
    }

    const handleNextPage = () => {
        if (!passwordRef.current || !usernameRef.current) return
        if (passwordRef.current.value.length < 1 || usernameRef.current.value.length < 1) return

        setUsername(usernameRef.current.value)
        setPassword(passwordRef.current.value)
    }

    return <div style={{
        overflow: 'hidden',
    }}>
        <div style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-arround',
            alignItems: 'center',
            alignContent: 'center',
        }}>
            <i className='bx bxs-user-circle' style={{
                fontSize: "50px",
                padding: "5px"
            }}/>
            <div>
                <Input type="text" placeholder="username" ref={usernameRef} />
                <Input type="password" placeholder="password" ref={passwordRef} /><i className='bx bx-dialpad-alt' style={{
                    fontSize: "20px"
                }} onClick={handleGeneratePassword} />
            </div>
        </div>

        <i className='bx bx-right-arrow-alt' style={{
            fontSize: "30px",
            position: "absolute",
            right: 0,
            bottom: 0
        }} onClick={handleNextPage} />
    </div>
}

export default Create