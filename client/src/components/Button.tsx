type Props = {
    label:string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button:React.FC<Props> = ({label, onClick}) => {
    return (<>
        <button onClick={onClick}>{label}</button>
    </>);
}

export default Button;