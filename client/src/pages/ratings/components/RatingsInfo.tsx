const RatingsInfo: React.FC = () => {

    const imgUrl: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";

    return(
        <>
        <div className="flex flex-row justify-center items-center gap-3">
                    
                    <img src={imgUrl} alt="rating image"  className="w-[10%] border-2 border-slate-500 rounded-md shadow-slate-900 shadow"/>
                    <section>
                        <h1 className="text-2xl font-bold text-slate-700">Food by Chef John Doe.</h1>
                        <p className="text-lg text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatibus.</p>
                    </section>
                </div>
        </>
    );
}

export default RatingsInfo;