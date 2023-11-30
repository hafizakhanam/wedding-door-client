import { Parallax } from 'react-parallax';

const Cover = ({bgImg, title}) => {
    return (
        <Parallax
            blur={{ min: -100, max: 100 }}
            bgImage={bgImg}
            bgImageAlt="the Menu"
            strength={-200}
        >
            <div className="flex items-center justify-center h-[400px]">
                <h1 className="text-white text-6xl bg-green-600 p-4 font-bold uppercase">{title}</h1>
            </div>
        </Parallax>
        
    );
};

export default Cover;