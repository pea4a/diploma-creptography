import { useState } from "react";
import { Box, Button, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import Cryptor from "./cryptor";
import Decryptor from "./decryptor";
import RcMethod from "./RcMethod";
import './App.css';
import QuantumRandomNumberGenerator from "./components/randomNumGenerator";
const App = () => {
    const [whatToDo, setWhatToDo] = useState(6)


    return (

        <Box >
            <Box className="box">
                <p >Що будемо робити?</p>
                <br />
                <Select onChange={event => setWhatToDo(event.target.value)}>
                    <MenuItem value={1}>Зашифрувати</MenuItem>

                    <MenuItem value={2}>Дешифрувати</MenuItem>
                </Select>

            </Box>
            {
                whatToDo === 1 ?
                    <Box className="boxCrypt"> <Cryptor /></Box>
                    :
                    whatToDo === 2 ?
                        <Box className="boxDecrypt"> <Decryptor /></Box>
                        : ''
            }
        </Box >
    )
}


export default App;
