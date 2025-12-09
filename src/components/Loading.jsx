import Letter from "./Letter";

const Loading = ({ message = "IEL" }) => {
    const letters = [];

    for (let i = 0; i < message.length; i++) {
        letters.push(
            <Letter key={i} letter={message[i]} index={i} letterSize={200} />
        );
    }

    return <div className="flex justify-center mt-12 absolute top-0">{letters}</div>;
};

export default Loading;
