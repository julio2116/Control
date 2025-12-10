import Letter from "./Letter";

const Loading = ({ message = "IEL" }) => {
    const letters = [];

    for (let i = 0; i < message.length; i++) {
        letters.push(
            <Letter key={i} letter={message[i]} index={i} letterSize={130} />
        );
    }

    return <div className="flex w-full h-screen justify-center items-center top-0 backdrop-blur-xs fixed">{letters}</div>;
};

export default Loading;
