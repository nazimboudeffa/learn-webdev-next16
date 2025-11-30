export type Problem = {
	id: string;
	slug: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	videoId?: string;
	language?: string;
};

export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type ProblemElement = {
	id: string;
	slug: string;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	category: string;
	problemStatement: string | string[]; // Plain text or array of paragraphs
	examples: Example[];
	constraints: string | string[]; // Plain text or array of constraints
	order: number;
	videoId?: string;
	solution?: {
		approach?: string;
		explanation?: string | string[];
		complexity?: {
			time?: string;
			space?: string;
		};
		code?: string;
	};
	starterCode: string;
	handlerFunction: ((args: any) => { type: "hint" | "error"; text: string }[]) | string;
	starterFunctionName: string;
	type?: "javascript" | "html-css" | "react"; // Type of problem
	starterCodeHTML?: string; // For HTML/CSS problems
	starterCodeCSS?: string; // For HTML/CSS problems
	starterCodeReact?: string; // For React problems (JSX component code)
	language?: string; // Programming/markup language
};

export type DBProblem = {
	handlerFunction?: any;
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes?: number;
	dislikes?: number;
	order: number;
	videoId?: string;
	link?: string;
};
