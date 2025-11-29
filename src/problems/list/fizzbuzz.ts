import { assertDeepStrictEqual } from "@/problems/utils/assert";
import { ProblemElement } from "../types/problem";

const starterCodeFizzBuzz = `function fizzbuzz(n){
	// Write your code here
  };`;
  
// checks if the user has the correct code
const handlerFizzBuzz = (fn: any) => {
	  // fn is the callback that user's code is passed into
	  try {
		  const nums = [3,5,15];
		  const answers = [
			  [1, 2,'Fizz'],
			  [1, 2,'Fizz',4,'Buzz'],
			  [1, 2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz']
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

export const fizzBuzz: ProblemElement = {
	id: "fizzbuzz",
	slug: "fizzbuzz",
	title: "Fizz Buzz",
	difficulty: "Easy",
	category: "Integer",
	problemStatement: [
		"This is the very known Fizz Buzz problem.",
		"Return an array containing the numbers from 1 to N, where N is the parametered value.",
		"But for multiples of three use 'Fizz' instead of the number and for the multiples of five use 'Buzz'.",
		"For numbers which are multiples of both three and five use 'FizzBuzz'.",
		"For example, if you pass in 15, the output should be: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']",
		"After that just click the 'Run' button to see how this works."
	],
	examples: [
		{
			id: 1,
			inputText: "[1,2,3]",
			outputText: "[1,2,'Fizz']",
			explanation: "3 is Fizz",
		},
		{
			id: 2,
			inputText: "[1,2,3,4,5]",
			outputText: "[1,2,'Fizz',4,'Buzz']",
			explanation: "3 is Fizz and 5 is Buzz",
		},
		{
			id: 3,
			inputText: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]",
			outputText: "[1,2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz']",
			explanation: "multiples of 3 is Fizz and multiples of 5 is Buzz, so 15 is multiple of 3 and 5 is FizzBuzz",
		}
	],
	constraints: "N will never be less than 1.",
	handlerFunction: handlerFizzBuzz,
	starterCode: starterCodeFizzBuzz,
	order: 11,
	starterFunctionName: "function fizzbuzz(",
	solution: {
		approach: "Iterate from 1 to N and apply conditional logic for each number.",
		explanation: "Loop through numbers 1 to N. For each number: if divisible by both 3 and 5, add 'FizzBuzz'; else if divisible by 3, add 'Fizz'; else if divisible by 5, add 'Buzz'; otherwise add the number itself.",
		complexity: {
			time: "O(N)",
			space: "O(N)"
		},
		code: `function fizzbuzz(n) {
  const out = [];
  for (let i=1;i<=n;i++) {
    const by3 = i%3===0, by5 = i%5===0;
    if (by3 && by5) out.push('FizzBuzz');
    else if (by3) out.push('Fizz');
    else if (by5) out.push('Buzz');
    else out.push(i);
  }
  return out;
}`
	},
	videoId: "",
};