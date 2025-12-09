import { useEffect, useState } from "react";

const Letter = ({letter= "i", index= 1, letterSize=48}) => {
    const [move, setMove] = useState(letterSize * 1.5);

    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const indexLetter = alphabet.split("").indexOf(letter)

    const newAlphabet = alphabet.slice(indexLetter + 1) + alphabet.slice(0, indexLetter + 1)

    let result = [];
    for (let i = 0; i < newAlphabet.length; i++) {
        result.push(<li key={i} className="m-0" style={{fontSize: `${letterSize}px`}}>{newAlphabet[i]}</li>);
    }

    useEffect(() => {
        let mounted = true;

        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        (async function () {
            await sleep(50 + index * 250);

            for (let i = 0; i < newAlphabet.length; i++) {
                if (!mounted) return;
                if (newAlphabet[i + 1] == letter) break;
                setMove((prev) => { return (prev + letterSize * 1.5) });
                await sleep(100);
            }
        })()

        return () => {
            mounted = false;
        };
    }, [index, letterSize, letter]);
    // console.log(move)

    return (
        <>
            <div className={`overflow-hidden`} style={{height: `${letterSize * 1.5}px`}}>
                <ul
                    style={{ transform: `translateY(-${move}px)`}}
                    className="flex flex-col transition-transform duration-200 ease-in-out"
                >
                    {result}
                </ul>
            </div>
        </>
    );
};

export default Letter;
