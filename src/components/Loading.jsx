import { useEffect, useState } from "react";

const Loading = ({ message = "IEL" }) => {
    const loaderMessage = message.split("");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const [letters, setLetters] = useState(loaderMessage);

    useEffect(() => {
        let mounted = true;

        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        async function teste(index) {
            await sleep(100 + (index * 100))
            for (let i = 0; i < alphabet.length; i++) {
                if (!mounted) return;
                setLetters((prev) => {
                    const copy = [...prev];
                    copy[index] = alphabet[i];
                    return copy;
                });
                if(alphabet[i] == loaderMessage[index]) break
                await sleep(100);
            }
        }

        (async () => {
            while (mounted) {
                for(let i = 0; i < 2; i++){
                    await Promise.all(loaderMessage.forEach((item) => {
                        teste(loaderMessage.indexOf(item))
                    }));
                    await sleep(500)
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);
    console.log(letters);
    return <div>{letters.join("")}</div>;
};

export default Loading;
