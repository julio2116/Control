import { useEffect, useState } from "react";

const Loading = ({ message }) => {
    const loaderMessage = message.split("");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const [letters, setLetters] = useState(loaderMessage);

    useEffect(() => {
        const timerLetter = setInterval(() => {
            for (let j = 0; j < loaderMessage.length; j++) {
                for (let i = 0; i < alphabet.length; i++) {
                    console.log("a");
                    const timer = setInterval(() => {
                        setLetters((prev) => {
                            const arr = [...prev];
                            arr[j] = alphabet[i];
                            return arr
                        });
                    }, 500);
                    if (alphabet[i] === loaderMessage[j]) {
                        clearInterval(timer)
                        break;
                    }
                }
            }
            clearInterval(timerLetter);
        }, 1000);
    }, [letters]);
    return <div>{letters.join("")}</div>;
};

export default Loading;
