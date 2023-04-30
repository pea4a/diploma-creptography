import React, { useState } from 'react'
import { Box, Button, MenuItem, Modal, Radio, Select, Slider, TextField, Typography } from '@mui/material';
import QuantumRandomNumberGenerator from './components/randomNumGenerator';

const Cryptor = () => {
    const [showLaters, setShowLeters] = useState(false)
    const [isGen, setIsGen] = useState(false)
    const [text, setText] = useState('')
    const [randomKey, setrandomKey] = useState()
    const [alphabeting, setAlphabet] = useState([])
    const [mixed, setMixed] = useState([])
    const [finalMessage, setFinalMessage] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const BLOCK_SIZE = 100


    ///////////
    /// genLetters - створює алфавіт з значеннями на які впливає випадкове число randomKey
    const genLetters = () => {
        setIsGen(true)
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -_,.абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ1234567890';

        const alphabetObjects = alphabet.split('').map((letter, index) => {
            return { letter, number: (index + 1) * 0.01 * randomKey };
        });
        const letterObjects = alphabetObjects;
        console.log(letterObjects)
        setAlphabet(...alphabeting, letterObjects)
        console.log(alphabeting);
    }

    /// cryptor перевод введенного слова в масив  цифр що згенеровані алфавітом
    const cryptor = () => {
        const copyText = text.split('');
        const encryptedBlocks = [];

        for (let i = 0; i < copyText.length; i += BLOCK_SIZE) {
            const block = copyText.slice(i, i + BLOCK_SIZE);
            const blockNumbers = [];

            block.forEach((elem) => {
                alphabeting.forEach((letter) => {
                    if (elem === letter.letter) {
                        blockNumbers.push(letter.number);
                    }
                });
            });

            const noise = new Array(BLOCK_SIZE).fill(null).map(() => Math.random());

            const shuffledArray = [];
            while (blockNumbers.length > 0 || noise.length > 0) {
                if (Math.random() < 0.1) {
                    if (blockNumbers.length > 0) {
                        shuffledArray.push(blockNumbers.shift());
                    }
                } else {
                    if (noise.length > 0) {
                        shuffledArray.push(noise.shift());
                    }
                }
            }

            encryptedBlocks.push(shuffledArray);
        }

        const finalMixed = encryptedBlocks.flat();
        setMixed(finalMixed);
    };


    // ///decryptor перебирає масив shuffledArray
    // const decryptor = () => {
    //     let message = []
    //     mixed.map((elem, index) => {
    //         alphabeting.map((letter, index) => {
    //             if (elem === letter.number) {
    //                 message.push(letter.letter)
    //                 console.log(letter.letter)

    //             }
    //         })

    //     })
    //     setFinalMessage(message)
    //     console.log(message);
    // }
    return (
        <Box>

            <Box className='leftCryptBox'>
                <div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        variant='contained' onClick={handleOpen}>Створити випадкове число</Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        disabled={isGen} variant='contained' onClick={genLetters}>Створити словник шифруваня</Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        variant='contained' onClick={cryptor}>зашифрувати текст</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='modalStyle' >
                            <QuantumRandomNumberGenerator />
                        </Box>
                    </Modal>
                </div>

            </Box>

            <Box className='middleCryptBox'>
                <Typography>Введіть ваше повідомлення:</Typography>
                <TextField className='texter' onChange={event => setText(event.target.value)} />
                <br />
                <Typography><i>Ваш секретний ключ:</i></Typography>

                <input onChange={event => setrandomKey(Number(event.target.value))} />
                <br />


            </Box>
            <Box className='rightCryptBox'>
                <textarea style={{ width: '100%', height: '100%' }} value={mixed.map((elem) => { return (elem) })} />
                <br />
            </Box>



        </Box>
    )
}
export default Cryptor