import {useState} from "react";


export default function JwtExample () {

    const [jwtToken, setJwtToken] = useState(null)

    const [valid, setValid] = useState(false)

    const echoValid = () => {
        if (valid) return ' valid'
        return 'invalid'
    }

    const getJwtToken = () => {
        fetch('http://localhost:3559')
            .then(res => res.text())
            .then(token => {
                setJwtToken(token)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const verifyJwtToken = () => {
        fetch('http://localhost:3034', {
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        })
            .then(res => res.json())
            .then(data => {
                setValid(data.valid)
                console.log(data)
            })
    }

    return(
        <>
            <h1>Jwt Example</h1>
            <div>{jwtToken}</div>
            <div>
                <button onClick={getJwtToken}> Create (Get) Token</button>
            </div>
            <div> Token valid: {echoValid()}</div>
            <div>
                <button onClick={verifyJwtToken}> Verify Token</button>
            </div>
        </>
    )
};