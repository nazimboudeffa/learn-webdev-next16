import { assertDeepStrictEqual } from "@/problems/utils/assert";
import { ProblemElement } from "../types/problem";

const starterCodeSum = `function add(a, b){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerSum = (fn: any) => {
	// fn is the callback that user's code is passed into
	try {
		const a = 1;
		const b = 2;
		const answer = 3;
		const result = fn(a, b);
		assertDeepStrictEqual(result, answer);
		return true;
	} catch (error: any) {
		console.log("Simple Sum handler function error");
		throw new Error(error);
	}
};

export const sum: ProblemElement = {
    id: "sum",
	slug: "sum",
	title: "A Simple Sum",
	difficulty: "Easy",
	category: "Integer",
	problemStatement: [
		"In this problem, you will be asked to write a function that adds two numbers together.",
		"After that just click the \"Run\" button to see how this works."
	],
	examples: [
		{
			id: 1,
			inputText: "1,2",
			outputText: "3",
			explanation: "1+2=3",
		}
	],
	constraints: "No constraints.",
	handlerFunction: handlerSum,
	starterCode: starterCodeSum,
	order: 0,
	starterFunctionName: "function add(",
    videoId: "KxcwwWNx5aA",
	solution: {
		approach: "Addition is straightforward in JavaScript.",
		explanation: "Simply return the sum of the two parameters using the + operator.",
		complexity: {
			time: "O(1)",
			space: "O(1)"
		},
		code: `function add(a, b) {
  return a + b;
}`
	}
};