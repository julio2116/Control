import { useEffect, useState } from "react";

const fonts = [
  "Bungee Shade",
  "Faster One",
  "Fredericka the Great",
  "Grenze Gotisch",
  "Libertinus Keyboard",
  "Nabla",
  "Protest Revolution",
  "Rampart One",
  "Rye",
  "Shrikhand"
];

const Letter = ({ letter = "i", index = 1, letterSize = 48 }) => {
    const [move, setMove] = useState(letterSize * 1.5);
    const [font, setFont] = useState(fonts[0])

    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const indexLetter = alphabet.split("").indexOf(letter);

    const newAlphabet =
        alphabet.slice(indexLetter + 1) + alphabet.slice(0, indexLetter + 1);

    let result = [];
    for (let i = 0; i < newAlphabet.length; i++) {
        result.push(
            <li
                key={i}
                className={`font-rye m-0 text-[white] text-center shadow-none [text-shadow:.5px_.5px_.5px_black,0_0_0.1em_#2563eb,0_0_0.15em_#2563eb]`}
                style={{ fontSize: `${letterSize}px`, fontFamily: `${font}`}}
            >
                {newAlphabet[i]}
            </li>
        );
    }

    useEffect(() => {
        let mounted = true;

        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        (async function () {
            await sleep(50 + index * 250);

            for (let i = 0; i < newAlphabet.length; i++) {
                if (!mounted) return;
                if (newAlphabet[i + 1] == letter) {
                    setFont(fonts[9])
                    break;
                }
                setMove((prev) => {
                    return prev + letterSize * 1.5;
                });
                setFont(()=>{
                    const selected = Math.floor(Math.random() * 12)
                    return fonts[selected]
                })
                await sleep(100);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [index, letterSize, letter]);

    return (
        <>
            <div
                className={`overflow-hidden`}
                style={{ height: `${letterSize * 1.5}px` }}
            >
                <ul
                    style={{ transform: `translateY(-${move}px)` }}
                    className="flex flex-col transition-transform duration-200 ease-in-out"
                >
                    {result}
                </ul>
            </div>
        </>
    );
};

export default Letter;
