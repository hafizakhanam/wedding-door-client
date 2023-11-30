

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center">
            <p className="text-red-800 mb-2">--- {subHeading} ---</p>
            <h2 className="text-3xl uppercase border-y-2 py-2">{heading}</h2>
        </div>
    );
};

export default SectionTitle;