type RunMessage = {
	type: "hint" | "error";
	text: string;
};

type EditorFooterProps = {
	handleRun: () => void;
	handleSubmit: () => void;
	handleReset: () => void;
	messages?: RunMessage[];
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleRun, handleSubmit, handleReset, messages = [] }) => {
	return (
		<div className='flex bg-gradient-to-r from-slate-800 to-slate-900 absolute bottom-0 z-10 w-full border-t-2 border-slate-700 shadow-lg'>
			<div className='mx-3 sm:mx-6 my-3 flex justify-between w-full'>
				<div className='ml-auto flex items-center space-x-3 sm:space-x-4'>
					<button
						className='px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold items-center whitespace-nowrap transition-all focus:outline-none inline-flex rounded-lg bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-slate-500/50 hover:scale-105 active:scale-95'
						onClick={handleReset}
						title='Reset code to starter'
					>
						Reset
					</button>
					<button
						className='px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold items-center whitespace-nowrap transition-all focus:outline-none inline-flex rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95'
						onClick={handleRun}
					>
						Run
					</button>
					<button
						className='px-4 sm:px-6 py-2 font-bold items-center transition-all focus:outline-none inline-flex text-xs sm:text-sm rounded-lg bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
