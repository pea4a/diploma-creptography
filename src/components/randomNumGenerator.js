import { Typography } from "@mui/material";
import React, { useState } from "react";
import CryptoJS from "crypto-js";

function QuantumRandomNumberGenerator() {
    const [number, setNumber] = useState("0.0000000000000000");
    const [seed, setSeed] = useState("");
    const [seed1, setSeed1] = useState("");
    const [seed2, setSeed2] = useState("");
    const [signature, setSignature] = useState("");
    const [salt, setSalt] = useState("");

    const combineSeeds = () => {
        setSeed(`${seed1}---${seed2}`);
    };

    const splitSeeds = () => {
        const [newSeed1, newSeed2] = seed.split("---");
        setSeed1(newSeed1);
        setSeed2(newSeed2);
    };

    const generateNumber = () => {
        const saltBytes = new Uint8Array(16);
        window.crypto.getRandomValues(saltBytes);
        const salt = CryptoJS.enc.Hex.stringify(saltBytes);
        setSalt(salt);

        let seed = seed1 + signature + seed2 + salt;
        let hash = CryptoJS.SHA512(seed).toString();
        let num = parseInt(hash.slice(0, 16), 16) / parseInt("ffffffffffffffff", 16);
        let formattedNum = num.toFixed(16);

        setNumber(formattedNum);
    };

    const handleSeedChange = (event) => {
        setSeed(event.target.value);
    };

    const handleSeed1Change = (event) => {
        setSeed1(event.target.value);
    };

    const handleSeed2Change = (event) => {
        setSeed2(event.target.value);
    };

    const handleSignatureChange = (event) => {
        setSignature(event.target.value);
    };

    const handleSeedPaste = (event) => {
        event.preventDefault();
        const pastedSeed = event.clipboardData.getData("text/plain");
        if (pastedSeed.includes("---")) {
            setSeed(pastedSeed.trim());
        }
    };

    React.useEffect(() => {
        if (seed) {
            splitSeeds();
        }
    }, [seed]);
    return (
        <div>
            <Typography htmlFor="seed">загальний сід:</Typography>
            <input type="text" id="seed" value={seed} onChange={handleSeedChange} onPaste={handleSeedPaste} />
            <br />
            <Typography htmlFor="signature">Підпис:</Typography>
            <input type="text" id="signature" value={signature} onChange={handleSignatureChange} />
            <br />
            <button onClick={combineSeeds}>комбінувати сід</button>
            <button onClick={splitSeeds}>роз'єднати сід</button>
            <br />
            <Typography htmlFor="seed1">сід 1:</Typography>
            <input type="text" id="seed1" value={seed1} onChange={handleSeed1Change} />
            <br />
            <Typography htmlFor="seed2">сід 2:</Typography>
            <input type="text" id="seed2" value={seed2} onChange={handleSeed2Change} />
            <br />
            <button onClick={generateNumber}>згенерувати число</button>
            <br />
            <Typography htmlFor="number">Ваше випадкове число:</Typography>
            <input type="text" id="number" value={number} readOnly />
        </div>
    );
}

export default QuantumRandomNumberGenerator;
