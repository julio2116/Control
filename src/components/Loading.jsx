import Letter from "./Letter";

const Loading = ({ message = "IEL" }) => {
    const letters = [];

    for (let i = 0; i < message.length; i++) {
        letters.push(
            <Letter letter={message[i]} index={i + 1} letterSize={48} />
        );
    }

    return <>{letters}</>;
};

export default Loading;
