type Props = {
    message?: string;
}
const Message:React.FC<Props> = ({message="Hello World!"}) => {
    return (
        <>
         <h3>Message is: {message}</h3>
        </>
    );
}

export default Message;