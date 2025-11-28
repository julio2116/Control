import { useEffect, useState } from "react";

const Loading = ({ message }) => {
    const loaderMessage = message.split("");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const [letters, setLetters] = useState(loaderMessage);

    useEffect(() => {
        const timerLetter = setInterval(() => {
            for (let j = 0; j < loaderMessage.length; j++) {
                let i = 0
                console.log(letters);
                const a = setInterval(() => {
                    setLetters((prev) => {
                        const arr = [...prev];
                        arr[j] = alphabet[i];
                        return arr;
                    }, 500);
                    i++;
                    clearInterval(a);
                });
            }
            clearInterval(timerLetter);
        }, 5000);
    }, []);
    return <div>{letters.join("")}</div>;
};

export default Loading;
