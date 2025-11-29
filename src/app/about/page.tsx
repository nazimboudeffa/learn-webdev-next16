import Navbar from "@/components/Navbar";

const More = () => {
    return (
        <>
        <Navbar />
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">À propos</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Code 101 est une initiative indépendante qui a commencé par des stream sur LivecodingTV puis petit à petit nous avons créé une chaine YouTube, maintenant nous mettons à disposition un éditeur et des problèmes à résoudre pour permettre à chacun de travailler à son rythme sans stress</p>
                    <br/>
                    <p className="font-normal text-base leading-6 text-gray-600 "><u>Cette page est volontairement écrite en français</u> car nous souhaitons proposer des solutions dans cette langue tout en posant les problèmes en anglais</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="nubelson-fernandes-gTs2w7bu3Qo-unsplash.jpg" alt="A coder" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="pankaj-patel-_SgRNwAVNKw-unsplash.jpg" alt="Code on computer" />
                </div>
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Ressources</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Ce site est entièrement open source, vous pouvez retrouver le code sur <a href="https://github.com/nazimboudeffa/learntocode-nextjs">https://github.com/nazimboudeffa/learntocode-nextjs</a></p>
                    <br/>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Nous avons comme objectif de proposer 100 problèmes classiques à résoudre que chacun trouvera disponible et pourra y revenir quand il veut</p>
                    <br/>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Le principe de ce site est de proposer des problèmes de référence</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default More;