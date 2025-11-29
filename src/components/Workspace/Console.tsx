import { BsChevronUp } from "react-icons/bs"

const Console = () => {
    return (
        <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
            <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-zinc-400 text-sm rounded-lg pl-3 pr-2'>
                Console
                <div className='ml-1 transform transition flex items-center'>
                    <BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
                </div>
            </button>
        </div>
    )
}

export default Console