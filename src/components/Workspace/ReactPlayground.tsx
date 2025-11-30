import { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { ProblemElement } from "@/problems/types/problem";
import EditorFooter from "./EditorFooter";
import ReactPreview from "./ReactPreview";
import Console from "./Console";
import { toast } from "react-toastify";
import ToastProvider from "./ToastProvider";

interface PlaygroundReactProps {
  problem: ProblemElement;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const PlaygroundReact: React.FC<PlaygroundReactProps> = ({ problem, setSuccess, setSolved }) => {
  const initialCode = problem.starterCodeReact || problem.starterCode || "";
  const [userCode, setUserCode] = useState<string>(initialCode);
  const [settings, setSettings] = useState<ISettings>({
    fontSize: globalThis.window !== undefined && globalThis.window.innerWidth < 768 ? "12px" : "14px",
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });
  const [runMessages, setRunMessages] = useState<{ type: "hint" | "error"; text: string }[]>([]);
  const [activePanel, setActivePanel] = useState<"tests" | "preview" | "console">("tests");
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

  const handleRun = async () => {
    // Optionally, you can add code validation or linting here
    setRunMessages([{ type: "hint", text: "Preview updated." }]);
  };

  const handleReset = () => {
    const resetCode = problem.starterCodeReact || problem.starterCode || "";
    setUserCode(resetCode);
    localStorage.removeItem(`code-react-${problem.id}`);
    localStorage.removeItem(`solved-${problem.slug}`);
    setSolved(false);
    setRunMessages([]);
    toast.info("Code reset to starter", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-react-${problem.id}`);
    setUserCode(code ? JSON.parse(code) : (problem.starterCodeReact || problem.starterCode || ""));
  }, [problem.id, problem.starterCodeReact, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-react-${problem.id}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-[#0d1117] relative overflow-x-hidden h-full">
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <div className="flex-1 flex flex-col min-h-0">
        <Split className="h-full" direction="vertical" sizes={[50, 50]} minSize={60}>
          <div className="w-full overflow-auto border-b-2 border-indigo-200 bg-[#0d1117]">
            <CodeMirror
              value={userCode}
              theme={githubDark}
              onChange={onChange}
              extensions={[javascript()]}
              style={{ fontSize: settings.fontSize }}
            />
          </div>
          <div className="w-full overflow-auto bg-[#0d1117] flex flex-col h-full min-h-0">
            <div className="flex h-12 items-end border-b-2 border-slate-700 px-4 sm:px-6 bg-[#0d1117]">
              <button
                className={`relative text-xs sm:text-sm font-bold px-4 py-2 focus:outline-none transition-colors
                  ${activePanel === "tests"
                    ? "text-indigo-400 border-b-4 border-indigo-500"
                    : "text-slate-400 hover:text-indigo-300 border-b-4 border-transparent"}
                `}
                style={{ background: 'none', borderRadius: 0 }}
                onClick={() => setActivePanel("tests")}
              >
                📋 Test Cases
              </button>
              <button
                className={`relative text-xs sm:text-sm font-bold px-4 py-2 focus:outline-none transition-colors
                  ${activePanel === "preview"
                    ? "text-indigo-400 border-b-4 border-indigo-500"
                    : "text-slate-400 hover:text-indigo-300 border-b-4 border-transparent"}
                `}
                style={{ background: 'none', borderRadius: 0 }}
                onClick={() => setActivePanel("preview")}
              >
                ⚛️ Preview
              </button>
              <button
                className={`relative text-xs sm:text-sm font-bold px-4 py-2 focus:outline-none transition-colors
                  ${activePanel === "console"
                    ? "text-indigo-400 border-b-4 border-indigo-500"
                    : "text-slate-400 hover:text-indigo-300 border-b-4 border-transparent"}
                `}
                style={{ background: 'none', borderRadius: 0 }}
                onClick={() => setActivePanel("console")}
              >
                🖥️ Console
              </button>
            </div>
            {activePanel === "tests" && problem.examples && (
              <div className="w-full px-4 sm:px-6 pb-20">
                <div className="flex flex-wrap gap-2 py-4">
                  {problem.examples.map((example, index) => (
                    <button
                      type="button"
                      className="items-start"
                      key={example.id}
                      onClick={() => setActiveTestCaseId(index)}
                      aria-pressed={activeTestCaseId === index}
                    >
                      <div className="flex flex-wrap items-center gap-y-4">
                        <div
                          className={`text-xs sm:text-sm font-semibold items-center transition-all focus:outline-none inline-flex relative rounded-lg px-4 sm:px-5 py-2 cursor-pointer whitespace-nowrap shadow-sm border-2
                          ${activeTestCaseId === index 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/50 scale-105' 
                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:border-indigo-400 hover:shadow-md'}
                          `}
                        >
                          Case {index + 1}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="font-semibold my-4 space-y-4 pb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold mb-2 text-slate-300 flex items-center gap-2">
                      <span className="text-lg">📥</span> Input:
                    </p>
                    <div className="w-full cursor-text rounded-lg border-2 px-3 sm:px-4 py-3 bg-slate-900 border-slate-700 hover:border-indigo-500 transition-colors text-xs sm:text-sm overflow-x-auto font-mono shadow-sm text-emerald-400">
                      {problem.examples[activeTestCaseId].inputText}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold mb-2 text-slate-300 flex items-center gap-2">
                      <span className="text-lg">📤</span> Output:
                    </p>
                    <div className="w-full cursor-text rounded-lg border-2 px-3 sm:px-4 py-3 bg-slate-900 border-slate-700 hover:border-indigo-500 transition-colors text-xs sm:text-sm overflow-x-auto font-mono shadow-sm text-cyan-400">
                      {problem.examples[activeTestCaseId].outputText}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activePanel === "preview" && (
              <div className='px-4 py-4 pb-20 h-[calc(100%-3rem)]'>
                <ReactPreview code={userCode} />
              </div>
            )}
            {activePanel === "console" && <Console messages={runMessages} />}
          </div>
        </Split>
      </div>
      <ToastProvider />
      <EditorFooter handleRun={handleRun} handleSubmit={handleRun} handleReset={handleReset} messages={runMessages} />
    </div>
  );
};

export default PlaygroundReact;
