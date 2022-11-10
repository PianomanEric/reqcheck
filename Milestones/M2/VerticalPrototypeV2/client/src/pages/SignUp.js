import { AppBar, Box, IconButton, Link, MenuItem, Select, TextField, InputBase, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

export default function SignUP(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickSubmit = async() => {
        try{
            const response = await axios.post('http://localhost:6000/register', {
                data: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            })
            if(response) {
                setFirstName('');
                setEmail('');
                setLastName('');
                setPassword('');    
            }    
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <>
            SignUp page
            <TextField placeholder={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{
          width: "200px",
          //bgcolor: "common.white",
          //padding: 1,
          //border: "1px solid #aaa",
        }}/>
         <TextField placeholder={"Last Name"}
         value={lastName}
         onChange={(e) => setLastName(e.target.value)}
         sx={{
          width: "200px",
          //bgcolor: "common.white",
          //padding: 1,
          //border: "1px solid #aaa",
        }}/>
         <TextField placeholder={"Email"}
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         sx={{
          width: "200px",
          //bgcolor: "common.white",
          //padding: 1,
          //border: "1px solid #aaa",
        }}/>
        <TextField placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        sx={{
          width: "200px",
          //bgcolor: "common.white",
          //padding: 1,
          //border: "1px solid #aaa",
        }}/>
        <Button
            onClick={() => onClickSubmit()}
            sx={{
                width: "200px",
                bgcolor: "blue",
                //padding: 1,
                //border: "1px solid #aaa",
              }}
        >
            Submit
        </Button>
        </>
    )
}