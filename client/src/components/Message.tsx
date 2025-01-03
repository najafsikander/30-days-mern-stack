type Props = {
    message: string;
}
const Message:React.FC<Props> = ({message}) => {
    return (
        <>
         <h3>Message is: {message}</h3>
        </>
    );
}

export default Message;