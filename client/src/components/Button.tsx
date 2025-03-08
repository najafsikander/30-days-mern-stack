type Props = {
    label:string;
    type?: "button" | "submit" | "reset";
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button:React.FC<Props> = ({label, onClick}) => {
    return (<>
        <button className="bg-slate-800 text-white text-lg rounded-sm px-6 py-2 cursor-pointer hover:bg-white hover:text-slate-800 hover:border-2 hover:border-slate-800 w-full" onClick={onClick}>{label}</button>
    </>);
}

export default Button;