import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeMultiply = `function multiply(a, b){
  // Write your code here
};`;

const handlerMultiply = (fn: any) => {
  try {
    const tests = [
      { a: 2, b: 3, expected: 6 },
      { a: 5, b: 4, expected: 20 },
      { a: 0, b: 10, expected: 0 },
    ];
    for (const test of tests) {
      const result = fn(test.a, test.b);
      assertDeepStrictEqual(result, test.expected);
    }
    return true;
  } catch (error: any) {
    console.log("Multiply handler function error");
    throw new Error(error);
  }
};

export const multiply: ProblemElement = {
  id: "multiply",
  slug: "multiply",
  title: "Multiply Two Numbers",
  difficulty: "Easy",
  category: "Math",
  problemStatement: [
    "Write a function that takes two numbers and returns their product (multiplication).",
    "This teaches you the basic multiplication operator in JavaScript."
  ],
  examples: [
    { id: 1, inputText: "2, 3", outputText: "6" },
    { id: 2, inputText: "5, 4", outputText: "20" },
  ],
  constraints: "No constraints.",
  handlerFunction: handlerMultiply,
  starterCode: starterCodeMultiply,
  order: 1,
  starterFunctionName: "function multiply(",
  videoId: "",
  solution: {
    approach: "Use the * operator to multiply two numbers.",
    explanation: "Simply return the product of the two parameters using the * operator.",
    complexity: {
      time: "O(1)",
      space: "O(1)"
    },
    code: `function multiply(a, b){
  return a * b;
}`
  }
};
