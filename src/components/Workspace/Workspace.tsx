'use client'

import Split from "react-split"
import ProblemDescription from "./ProblemDescription"
import Playground from "./Playground"
import PlaygroundReact from "./ReactPlayground"
import HTMLCSSPlayground from "./HTMLCSSPlayground"
import { ProblemElement } from "@/problems/types/problem"
import { useState, useEffect } from "react"
import Confetti from "./Confetti"

type WorkspaceProps = {
	problem: ProblemElement
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
	const [solved, setSolved] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	
	const isHTMLCSS = problem.type === "html-css";
	const isReact = problem.type === "react";

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	let playgroundComponent;
	if (isHTMLCSS) {
		playgroundComponent = <HTMLCSSPlayground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />;
	} else if (isReact) {
		playgroundComponent = <PlaygroundReact problem={problem} setSuccess={setSuccess} setSolved={setSolved} />;
	} else {
		playgroundComponent = <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />;
	}

	return (
		<>
		{isMobile ? (
			<div className='flex flex-col'>
				<div className='h-[50vh] overflow-y-auto'>
					<ProblemDescription problem={problem} _solved={solved} />
				</div>
				<div className='h-[50vh]'>
					{playgroundComponent}
				</div>
			</div>
		) : (
			<div className="flex flex-col h-[calc(100vh-50px)]">
				<Split className="split flex-1 min-h-0" minSize={0}>
					<div className="h-full min-h-0">
						<ProblemDescription problem={problem} _solved={solved} />
					</div>
					<div className="h-full min-h-0">
						{playgroundComponent}
					</div>
				</Split>
			</div>
		)}
		<Confetti active={success} />
		</>
	)
}
export default Workspace
