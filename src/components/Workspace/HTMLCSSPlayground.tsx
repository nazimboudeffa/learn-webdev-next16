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
import Console from "./Console";

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
	const [activePanel, setActivePanel] = useState<"preview" | "console">("preview");
	const [runMessages, setRunMessages] = useState<{ type: "hint" | "error"; text: string }[]>([]);

	const addToast = (type: "success" | "error", message: string) => {
		const toastFn = type === "success" ? toast.success : toast.error;
		toastFn(message, {
			position: "top-center",
			autoClose: 3000,
			theme: "dark",
		});
	};

	const handleSuccess = () => {
		addToast("success", "Congrats! All tests passed");
		if (setSuccess) {
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 4000);
		}
		setSolved(true);
		localStorage.setItem(`solved-${problem.slug}`, "true");
	};

	const handleError = (newMessages: { type: "hint" | "error"; text: string }[], error?: any) => {
		if (error) {
			newMessages.push({ type: "error", text: error.message || "An error occurred" });
		}
		addToast("error", "Check the Console tab to fix the errors.");
	};

	const processHandlerResult = (
		result: any,
		newMessages: { type: "hint" | "error"; text: string }[]
	): { hasError: boolean; hasHint: boolean } => {
		let hasError = false;
		let hasHint = false;
		if (Array.isArray(result)) {
			for (const msg of result) {
				if (msg?.type && msg?.text) newMessages.push(msg);
				if (msg?.type === "error") hasError = true;
				if (msg?.type === "hint") hasHint = true;
			}
		} else if (result === true) {
			newMessages.push({ type: "hint", text: "Congrats! All tests passed" });
			hasHint = true;
		}
		return { hasError, hasHint };
	};

	const handleSubmit = async () => {
		const newMessages: { type: "hint" | "error"; text: string }[] = [];
		try {
			const handler = problems[problem.slug].handlerFunction;
			if (typeof handler !== "function") return;
			const result = handler({ html: userHTML, css: userCSS });
			if (typeof result === "boolean" && result === true) {
				newMessages.push({ type: "hint", text: "Congrats! All tests passed" });
				handleSuccess();
			} else {
				const { hasError, hasHint } = processHandlerResult(result, newMessages);
				if (!hasError && hasHint) {
					handleSuccess();
				} else if (hasError) {
					handleError(newMessages);
				}
			}
		} catch (error: any) {
			handleError(newMessages, error);
		}
		setRunMessages(newMessages);
	}

	const processRunResult = (
		result: any,
		newMessages: { type: "hint" | "error"; text: string }[]
	): { hasError: boolean; hasHint: boolean } => {
		let hasError = false;
		let hasHint = false;
		if (Array.isArray(result)) {
			for (const msg of result) {
				if (msg?.type && msg?.text) newMessages.push(msg);
				if (msg?.type === "error") hasError = true;
				if (msg?.type === "hint") hasHint = true;
			}
		} else if (result === true) {
			newMessages.push({ type: "hint", text: "It works! Try to submit." });
			hasHint = true;
		}
		return { hasError, hasHint };
	};

	const showRunSuccessToast = () => {
		toast.success("It works! Try to submit", {
			position: "top-center",
			autoClose: 3000,
			theme: "dark",
		});
	};

	const showRunErrorToast = () => {
		toast.error("Check the Console tab to fix the errors.", {
			position: "top-center",
			autoClose: 3000,
			theme: "dark",
		});
	};

	const handleRunSuccess = () => {
		showRunSuccessToast();
	};

	const handleRunError = () => {
		showRunErrorToast();
	};

	const showRunError = () => {
		handleRunError();
	};

	const showRunHint = () => {
		handleRunSuccess();
	};

	const handleRun = async () => {
		const newMessages: { type: "hint" | "error"; text: string }[] = [];
		try {
			const handler = problems[problem.slug].handlerFunction;
			if (typeof handler === "function") {
				const result = handler({ html: userHTML, css: userCSS });
				const { hasError, hasHint } = processRunResult(result, newMessages);
				if (hasError) {
					showRunError();
				} else if (hasHint) {
					showRunHint();
				}
			}
		} catch (error: any) {
			newMessages.push({ type: "error", text: error.message || "An error occurred" });
			toast.error("Check the Console tab to fix the errors.", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		}
		setRunMessages(newMessages);
	}

	const handleReset = () => {
		setUserHTML(problem.starterCodeHTML || "");
		setUserCSS(problem.starterCodeCSS || "");
		localStorage.removeItem(`code-html-${problem.id}`);
		localStorage.removeItem(`code-css-${problem.id}`);
		localStorage.removeItem(`solved-${problem.slug}`);
		setSolved(false);
		setRunMessages([]);
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

				<div className='w-full overflow-auto bg-[#0d1117]'>
					{/* tab header - modern underline/tab-bar style */}
					<div className='flex h-12 items-end border-b-2 border-slate-700 px-4 sm:px-6 bg-[#0d1117]'>
						<button
							className={`relative text-xs sm:text-sm font-bold px-4 py-2 focus:outline-none transition-colors
							  ${activePanel === 'preview'
							    ? 'text-indigo-400 border-b-4 border-indigo-500'
							    : 'text-slate-400 hover:text-indigo-300 border-b-4 border-transparent'}
							`}
							style={{ background: 'none', borderRadius: 0 }}
							onClick={() => setActivePanel('preview')}
						>
							👁️ Preview
						</button>
						<button
							className={`relative text-xs sm:text-sm font-bold px-4 py-2 focus:outline-none transition-colors
							  ${activePanel === 'console'
							    ? 'text-indigo-400 border-b-4 border-indigo-500'
							    : 'text-slate-400 hover:text-indigo-300 border-b-4 border-transparent'}
							`}
							style={{ background: 'none', borderRadius: 0 }}
							onClick={() => setActivePanel('console')}
						>
							🖥️ Console
						</button>
					</div>

					{activePanel === 'preview' ? (
						<div className='px-4 py-4 pb-20 h-[calc(100%-3rem)]'>
							<HTMLPreview html={userHTML} css={userCSS} />
						</div>
					) : (
						<Console messages={runMessages} />
					)}
				</div>
		</Split>
		<ToastProvider />
		<EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} handleReset={handleReset} />
	</div>
	);
};
export default HTMLCSSPlayground;