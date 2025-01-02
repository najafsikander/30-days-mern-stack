type Props = {
    message: string;
}
const Message = ({message}:Props) => {
    return (
        <>
         <h3>Message is: {message}</h3>
        </>
    );
}

export default Message;