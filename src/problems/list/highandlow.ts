import { assertDeepStrictEqual } from "@/problems/utils/assert";
import { ProblemElement } from "../types/problem";

const starterCodeHighAndLow = `function highAndLow(numbers){
	// Write your code here
	return "";
  };`;
  
// checks if the user has the correct code
const handlerHighAndLow= (fn: any) => {
	  // fn is the callback that user's code is passed into
	  try {
		  const nums = ["1 2 3 4 5","1 2 -3 4 5","1 9 3 4 -5","42"];
		  const answers = [
			  "5 1",
			  "5 -3",
			  "9 -5",
			  "42 42"
		  ];
		  for (let i = 0; i < nums.length; i++) {
			  const result = fn(nums[i]);
			  assertDeepStrictEqual(result, answers[i]);
		  }
		  return true;
	  } catch (error: any) {
		  console.log("Fizz Buzz handler function error");
		  throw new Error(error);
	  }
};

export const highAndLow: ProblemElement = {
	id: "highandlow",
	slug: "highandlow",
	title: "High and Low",
	difficulty: "Easy",
	category: "Integer",
	problemStatement: [
		"In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.",
		"Found on solers.io"
	],
	examples: [
		{
			id: 1,
			inputText: "1 2 3 4 5",
			outputText: "5 1",
			explanation: "5 is the highest number and 1 is the lowest number",
		},
		{
			id: 2,
			inputText: "1 2 -3 4 5",
			outputText: "5 -3",
			explanation: "5 is the highest number and -3 is the lowest number",
		},
		{
			id: 3,
			inputText: "1 9 3 4 -5",
			outputText: "9 -5",
			explanation: "9 is the highest number and -5 is the lowest number",
		}
	],
	constraints: [
		"All numbers are valid Int32, no need to validate them.",
		"It will never be null or undefined.",
		"There will always be at least one number in the input string."
	],
	handlerFunction: handlerHighAndLow,
	starterCode: starterCodeHighAndLow,
	order: 12,
	starterFunctionName: "function highAndLow(",
	videoId: "",
	solution: {
		approach: "Parse the string and track minimum and maximum values.",
		explanation: "Split the input string by spaces, convert each element to a number, then iterate through to find the min and max values. Return them as 'max min'.",
		complexity: {
			time: "O(n)",
			space: "O(1)"
		},
		code: `function highAndLow(numbers){
	const arr = numbers.split(' ').map(Number);
	let min = arr[0], max = arr[0];
	for (const x of arr) {
		if (x < min) min = x;
		if (x > max) max = x;
	}
	return max + ' ' + min;
}`
	}
};