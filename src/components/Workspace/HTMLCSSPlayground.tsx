import { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { ProblemElement } from "@/problems/types/problem";
import EditorFooter from "./EditorFooter";
import { problems } from "@/problems/list";
import { toast } from "react-toastify";
import ToastProvider from "./ToastProvider";
import HTMLPreview from "./HTMLPreview";

type HTMLCSSPlaygroundProps = {
	problem: ProblemElement;
	setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const HTMLCSSPlayground: React.FC<HTMLCSSPlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [userHTML, setUserHTML] = useState<string>(problem.starterCodeHTML || "");
	const [userCSS, setUserCSS] = useState<string>(problem.starterCodeCSS || "");
	const [activeTab, setActiveTab] = useState<"html" | "css">("html");
	const [settings, setSettings] = useState<ISettings>({
		fontSize: globalThis.window !== undefined && globalThis.window.innerWidth < 768 ? "12px" : "14px",
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const handleSubmit = async () => {
		try {
			const handler = problems[problem.slug].handlerFunction;
			if (typeof handler === "function") {
				const success = handler({ html: userHTML, css: userCSS });
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
			toast.error(error.message || "An error occurred", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		}
	}

	const handleRun = async () => {
		try {
			const handler = problems[problem.slug].handlerFunction;
			if (typeof handler === "function") {
				const success = handler({ html: userHTML, css: userCSS });
				if (success) {
					toast.success("It works! Try to submit", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
				}
			}
		} catch (error: any) {
			toast.error(error.message || "An error occurred", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		}
	}

	const handleReset = () => {
		setUserHTML(problem.starterCodeHTML || "");
		setUserCSS(problem.starterCodeCSS || "");
		localStorage.removeItem(`code-html-${problem.id}`);
		localStorage.removeItem(`code-css-${problem.id}`);
		localStorage.removeItem(`solved-${problem.slug}`);
		setSolved(false);
		toast.info('Code reset to starter', {
			position: "top-center",
			autoClose: 2000,
			theme: "dark",
		});
	}

	useEffect(() => {
		const htmlCode = localStorage.getItem(`code-html-${problem.id}`);
		const cssCode = localStorage.getItem(`code-css-${problem.id}`);
		setUserHTML(htmlCode ? JSON.parse(htmlCode) : problem.starterCodeHTML || "");
		setUserCSS(cssCode ? JSON.parse(cssCode) : problem.starterCodeCSS || "");
	}, [problem.id, problem.starterCodeHTML, problem.starterCodeCSS]);

	const onHTMLChange = (value: string) => {
		setUserHTML(value);
		localStorage.setItem(`code-html-${problem.id}`, JSON.stringify(value));
	}

	const onCSSChange = (value: string) => {
		setUserCSS(value);
		localStorage.setItem(`code-css-${problem.id}`, JSON.stringify(value));
	}

	return (
		<div className='flex flex-col bg-[#0d1117] relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[50, 50]} minSize={60}>
				<div className='w-full overflow-auto'>
					{/* Tab Navigation */}
					<div className='flex border-b-2 border-slate-700 bg-[#0d1117]'>
						<button
							onClick={() => setActiveTab("html")}
							className={`px-6 py-3 text-sm font-semibold transition-colors ${
								activeTab === "html"
									? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
									: "text-slate-300 hover:bg-slate-800"
							}`}
						>
							HTML
						</button>
						<button
							onClick={() => setActiveTab("css")}
							className={`px-6 py-3 text-sm font-semibold transition-colors ${
								activeTab === "css"
									? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
									: "text-slate-300 hover:bg-slate-800"
							}`}
						>
							CSS
						</button>
					</div>

					{/* Editor */}
					<div className='h-[calc(100%-49px)] bg-[#0d1117]'>
						{activeTab === "html" ? (
							<CodeMirror
								value={userHTML}
								theme={githubDark}
								onChange={onHTMLChange}
								extensions={[htmlLang()]}
								style={{ fontSize: settings.fontSize }}
								className='h-full'
							/>
						) : (
							<CodeMirror
								value={userCSS}
								theme={githubDark}
								onChange={onCSSChange}
								extensions={[cssLang()]}
								style={{ fontSize: settings.fontSize }}
								className='h-full'
							/>
						)}
					</div>
				</div>

				<div className='w-full px-4 sm:px-6 pb-20 overflow-auto bg-[#0d1117]'>
					{/* Preview heading */}
					<div className='flex h-12 items-center space-x-4 sm:space-x-6 border-b-2 border-slate-700'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer group'>
							<div className='text-sm sm:text-base font-bold leading-5 text-slate-200 group-hover:text-indigo-400 transition-colors'>
								👁️ Preview
							</div>
							<hr className='absolute bottom-0 h-1 w-full rounded-full border-none bg-gradient-to-r from-indigo-600 to-purple-600' />
						</div>
					</div>

					{/* Preview */}
					<div className='py-4 h-[calc(100%-3rem)]'>
						<HTMLPreview html={userHTML} css={userCSS} />
					</div>
			</div>
		</Split>
		<ToastProvider />
		<EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} handleReset={handleReset} />
	</div>
	);
};
export default HTMLCSSPlayground;