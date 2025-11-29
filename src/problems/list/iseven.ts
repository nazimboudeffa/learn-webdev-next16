import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeIsEven = `function isEven(n){
  // Write your code here
};`;

const handlerIsEven = (fn: any) => {
  try {
    const tests = [
      { n: 2, expected: true },
      { n: 3, expected: false },
      { n: 0, expected: true },
      { n: 17, expected: false },
    ];
    for (const test of tests) {
      const result = fn(test.n);
      assertDeepStrictEqual(result, test.expected);
    }
    return true;
  } catch (error: any) {
    console.log("isEven handler function error");
    throw new Error(error);
  }
};

export const isEven: ProblemElement = {
  id: "iseven",
  slug: "iseven",
  title: "Check if Number is Even",
  difficulty: "Easy",
  category: "Math",
  problemStatement: [
    "Write a function that returns true if a number is even, and false if it's odd.",
    "This teaches you the modulo operator % and boolean logic."
  ],
  examples: [
    { id: 1, inputText: "2", outputText: "true" },
    { id: 2, inputText: "3", outputText: "false" },
    { id: 3, inputText: "0", outputText: "true" },
  ],
  constraints: "n is an integer.",
  handlerFunction: handlerIsEven,
  starterCode: starterCodeIsEven,
  order: 2,
  starterFunctionName: "function isEven(",
  videoId: "",
  solution: {
    approach: "Use the modulo operator to check divisibility by 2.",
    explanation: "A number is even if dividing by 2 leaves no remainder. Use n % 2 === 0 to check this.",
    complexity: {
      time: "O(1)",
      space: "O(1)"
    },
    code: `function isEven(n){
  return n % 2 === 0;
}`
  }
};
