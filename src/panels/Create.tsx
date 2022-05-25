import React from "react";
import { NextPage, UserProfile } from "../components/BoxIcons";
import { Container, Input } from "../components/Formular";
import { generatePassword } from "../endpoints/Password";
import { addPasswordToVault } from "../endpoints/Vault";
import { Password } from "../store/vaultSlice";

interface Props {
    dispatch: any
    mail: string
    token: string
    masterToken: string
    tab: string
}

const Create: React.FunctionComponent<Props> = (props) => {


    const identifierRef: React.RefObject<HTMLInputElement> = React.createRef();
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

    const addPassword = () => {
        if (!identifierRef.current || identifierRef.current.value.length < 1) return
        if (!username || !password) return

        const pass: Password = {
            identifier: identifierRef.current.value,
            website: props.tab,
            username: username,
            password: password
        }

        addPasswordToVault(
            props.dispatch,
            props.mail,
            props.token,
            props.masterToken,
            pass
        )

        setUsername(undefined)
        setPassword(undefined)
    }

    return <div style={{
        overflow: 'hidden',
    }}>
        {!username && !password ? (<>
            <Container>
                <UserProfile className='bx bxs-user-circle' />
                <div>
                    <Input type="text" placeholder="username" ref={usernameRef} />
                    <Input type="password" placeholder="password" ref={passwordRef} /><i className='bx bx-dialpad-alt' style={{
                        fontSize: "20px"
                    }} onClick={handleGeneratePassword} />
                </div>
            </Container>

            <NextPage className='bx bx-right-arrow-alt' onClick={handleNextPage} />
        </>) : (<>
            <Container style={{ justifyContent: 'space-around' }}>
                <UserProfile className='bx bxs-id-card' />
                <div>
                    <Input type="text" placeholder="identifier" ref={identifierRef} />
                </div>
            </Container>

            <NextPage className='bx bx-check' onClick={addPassword} />
        </>)}
    </div>
}

export default Create