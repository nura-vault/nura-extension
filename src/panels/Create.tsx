import React from "react"
import { Button, Input } from "../components/Formular"

const Create: React.FunctionComponent = (props) => {

    const identifier: React.RefObject<HTMLInputElement> = React.createRef();
    const username: React.RefObject<HTMLInputElement> = React.createRef();
    const password: React.RefObject<HTMLInputElement> = React.createRef();

    return <div style={{
        overflow: 'hidden'
    }}>
        <Input type="text" placeholder="identifier" ref={identifier} />
        <Input type="text" placeholder="username" ref={username} />
        <Input type="password" placeholder="password" ref={password} />

        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        }}>
            <Button>Create</Button>
            <Button><i className='bx bx-dialpad-alt' /></Button>
        </div>
    </div>
}

export default Create