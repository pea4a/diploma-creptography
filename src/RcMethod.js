import { useState } from "react";
import { Box, Button, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';

const RcMethod = () => {
    const [plaintext, setplaintext] = useState('')
    const [key, setKey] = useState('')
    const [result, setResult] = useState()
    function rc4(key, str) {
        var s = new Array(262144);
        var k = new Array(262144);
        var res = '';
        var temp;

        for (var i = 0; i < 262144; i++) {
            s[i] = i;
            k[i] = key.charCodeAt(i % key.length);
        }

        var j = 0;
        for (var i = 0; i < 262144; i++) {
            j = (j + s[i] + k[i]) % 262144;
            temp = s[i];
            s[i] = s[j];
            s[j] = temp;
        }

        i = 0;
        j = 0;
        for (var x = 0; x < str.length; x++) {
            i = (i + 1) % 262144;
            j = (j + s[i]) % 262144;
            temp = s[i];
            s[i] = s[j];
            s[j] = temp;
            var t = (s[i] + s[j]) % 262144;
            res += String.fromCharCode(str.charCodeAt(x) ^ s[t]);
        }

        return res;
    }

    const runer = () => {
        var ciphertext = rc4(key, plaintext);
        setResult(ciphertext); // Outputs ciphertext
        console.log(rc4(key, ciphertext)); // Outputs plaintext
    }

    return (
        <Box>
            <div>
                <p>Введіть текст, який треба змінити</p>
                <textarea onChange={event => setplaintext(event.target.value)} />
            </div>
            <div>
                <p>введіть ключ</p>
                <textarea onChange={event => setKey(event.target.value)} />
            </div>
            <div><Button onClick={runer}>згенерувати</Button>
                <textarea value={result} /></div>

        </Box>
    )
}


export default RcMethod;