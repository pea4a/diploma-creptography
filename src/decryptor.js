import React, { useState } from 'react'
import { Box, Button, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';

const Decryptor = () => {
    const [operationNum, setOperationNum] = useState(2)
    const [cryptedText, setCryptedText] = useState([])
    const [handKey, setHandKey] = useState()
    const [isGen, setIsGen] = useState(false)
    const [text, setText] = useState('')
    const [randomKey, setrandomKey] = useState(Math.random)
    const [alphabeting, setAlphabet] = useState([])
    const [mixed, setMixed] = useState([])
    const [finalMessage, setFinalMessage] = useState([])




    const handGenLetters = () => {
        setIsGen(true)
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -_,.абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ1234567890';

        const alphabetObjects = alphabet.split('').map((letter, index) => {
            return { letter, number: (index + 1) * 0.01 * handKey };
        });
        const letterObjects = alphabetObjects;

        setAlphabet(...alphabeting, letterObjects)
        console.log(alphabeting);
        setIsGen(true)
    }


    const handDecrypt = () => {
        let message = []
        let trueCopyMixed = []
        let copyMixed = mixed.split(',')
        copyMixed.map((elem, index) => {
            trueCopyMixed.push(Number(elem))
        })
        trueCopyMixed.map((elem, index) => {
            alphabeting.map((letter, index) => {

                ////testing

                ///////////
                if (elem === letter.number) {

                    message.push(letter.letter)
                }

            })
        })
        console.log(message);
        setFinalMessage(message.join(''))


    }
    return (
        <Box className='decryptBox'>
            <Box className='leftDecryptBox'>
                <Typography>введіть шифротекст</Typography>
                <textarea onChange={event => setMixed(event.target.value)} />
                <Typography>введіть ключ</Typography>
                <textarea className='decryptTextfield' onChange={event => setHandKey(event.target.value)} />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        '&:hover': {
                            backgroundColor: 'darkgreen',
                        },
                    }}
                    variant='contained' disabled={isGen} onClick={handGenLetters}>згенерувати алфавіт</Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        '&:hover': {
                            backgroundColor: 'darkgreen',
                        },
                    }}
                    variant='contained' onClick={handDecrypt}>дешифрувати</Button>
            </Box>

            <textarea value={finalMessage} className='rightdecryptBox' />


        </Box>
    )

}
export default Decryptor