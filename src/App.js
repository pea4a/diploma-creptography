import { useState } from "react";
import { Box, Button, ButtonGroup, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import Cryptor from "./cryptor";
import Decryptor from "./decryptor";
import './App.css';
const App = () => {
    const [whatToDo, setWhatToDo] = useState(6)


    return (

        <Box >
            <Box

                className="box">
                <p >Що будемо робити?</p>
                <br />
                <ButtonGroup
                    disableElevation
                    variant="none"
                    size="large"
                    aria-label="large button group"
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        onClick={event => setWhatToDo(1)}>Зашифрувати</Button>
                    <Button
                        variant="contained"
                        sx={{
                            height: '50px',
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        onClick={event => setWhatToDo(2)}>Дешифрувати</Button>
                </ButtonGroup>
                {/* <Select onChange={event => setWhatToDo(event.target.value)}>
                    <MenuItem value={1}>Зашифрувати</MenuItem>

                    <MenuItem value={2}>Дешифрувати</MenuItem>
                </Select> */}

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
