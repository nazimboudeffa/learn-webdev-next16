import { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { ProblemElement } from "@/problems/types/problem";
import EditorFooter from "./EditorFooter";
import { problems } from "@/problems/list";
import { toast } from "react-toastify";
import ToastProvider from "./ToastProvider";

type PlaygroundProps = {
	problem: ProblemElement;
	setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [settings, setSettings] = useState<ISettings>({
		fontSize: globalThis.window !== undefined && globalThis.window.innerWidth < 768 ? "12px" : "14px",
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const handleSubmit = async () => {
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[problem.slug].handlerFunction;
			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					if (setSuccess) {
						setSuccess(true);
						setTimeout(() => {
							setSuccess(false);
						}, 4000);
					}
					setSolved(true);
					localStorage.setItem(`solved-${problem.slug}`, "true");
				}
			}
		} catch (error: any) {
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	}

	const handleRun = async () => {
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			console.log(cb);
			const handler = problems[problem.slug].handlerFunction;
			console.log(handler);
			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("It works! Try to submit", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
				}
			}
		} catch (error: any) {
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	}

	const handleReset = () => {
		setUserCode(problem.starterCode);
		localStorage.removeItem(`code-${problem.id}`);
		localStorage.removeItem(`solved-${problem.slug}`);
		setSolved(false);
		toast.info('Code reset to starter', {
			position: "top-center",
			autoClose: 2000,
			theme: "dark",
		});
	}

	useEffect(() => {
		const code = localStorage.getItem(`code-${problem.id}`);
		setUserCode(code ? JSON.parse(code) : problem.starterCode)
	}, [problem.id, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value)
		localStorage.setItem(`code-${problem.id}`, JSON.stringify(value))
	}

	return (
		<div className='flex flex-col bg-[#0d1117] relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[50, 50]} minSize={60}>
				<div className='w-full overflow-auto border-b-2 border-indigo-200 bg-[#0d1117]'>
					<CodeMirror
						value={userCode}
						theme={githubDark}
						onChange={onChange}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className='w-full px-4 sm:px-6 pb-20 overflow-auto bg-[#0d1117]'>
					{/* testcase heading */}
					<div className='flex h-12 items-center space-x-4 sm:space-x-6 border-b-2 border-slate-700'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer group'>
							<div className='text-sm sm:text-base font-bold leading-5 text-slate-200 group-hover:text-indigo-400 transition-colors'>
								📋 Test Cases
							</div>
							<hr className='absolute bottom-0 h-1 w-full rounded-full border-none bg-gradient-to-r from-indigo-600 to-purple-600' />
						</div>
					</div>

					<div className='flex flex-wrap gap-2 py-4'>
						{problem.examples.map((example, index) => (
							<button
								type='button'
								className='items-start'
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
								aria-pressed={activeTestCaseId === index}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`text-xs sm:text-sm font-semibold items-center transition-all focus:outline-none inline-flex relative rounded-lg px-4 sm:px-5 py-2 cursor-pointer whitespace-nowrap shadow-sm border-2
										${activeTestCaseId === index 
											? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/50 scale-105" 
											: "bg-slate-800 text-slate-300 border-slate-600 hover:border-indigo-400 hover:shadow-md"}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</button>
						))}
					</div>

					<div className='font-semibold my-4 space-y-4 pb-4'>
						<div>
							<p className='text-xs sm:text-sm font-bold mb-2 text-slate-300 flex items-center gap-2'>
								<span className='text-lg'>📥</span> Input:
							</p>
							<div className='w-full cursor-text rounded-lg border-2 px-3 sm:px-4 py-3 bg-slate-900 border-slate-700 hover:border-indigo-500 transition-colors text-xs sm:text-sm overflow-x-auto font-mono shadow-sm text-emerald-400'>
								{problem.examples[activeTestCaseId].inputText}
							</div>
						</div>
						<div>
							<p className='text-xs sm:text-sm font-bold mb-2 text-slate-300 flex items-center gap-2'>
								<span className='text-lg'>📤</span> Output:
							</p>
							<div className='w-full cursor-text rounded-lg border-2 px-3 sm:px-4 py-3 bg-slate-900 border-slate-700 hover:border-indigo-500 transition-colors text-xs sm:text-sm overflow-x-auto font-mono shadow-sm text-cyan-400'>
								{problem.examples[activeTestCaseId].outputText}
							</div>
						</div>
					</div>
			</div>
		</Split>
		<ToastProvider />
		<EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} handleReset={handleReset} />
	</div>
	);
};
export default Playground;