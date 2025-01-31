type Props = {
    header: string;
    children:React.ReactNode;
}
const SectionCard: React.FC<Props> = ({header, children}) => {
    return (
        <section className="w-full bg-white p-2 my-5 rounded-sm">
          <h1 className="text-2xl">{header}</h1>

            {children}
        </section>
    );
}

export default SectionCard;