import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeFirstLetter = `function firstLetter(s){
  // Write your code here
};`;

const handlerFirstLetter = (fn: any) => {
  try {
    const tests = [
      { s: "hello", expected: "h" },
      { s: "JavaScript", expected: "J" },
      { s: "a", expected: "a" },
    ];
    for (const test of tests) {
      const result = fn(test.s);
      assertDeepStrictEqual(result, test.expected);
    }
    return true;
  } catch (error: any) {
    console.log("firstLetter handler function error");
    throw new Error(error);
  }
};

export const firstLetter: ProblemElement = {
  id: "firstletter",
  slug: "firstletter",
  title: "Get First Letter",
  difficulty: "Easy",
  category: "String",
  problemStatement: [
    "Write a function that returns the first character of a string.",
    "This teaches you string indexing and character access."
  ],
  examples: [
    { id: 1, inputText: "\"hello\"", outputText: "\"h\"" },
    { id: 2, inputText: "\"JavaScript\"", outputText: "\"J\"" },
  ],
  constraints: "String will always have at least one character.",
  handlerFunction: handlerFirstLetter,
  starterCode: starterCodeFirstLetter,
  order: 3,
  starterFunctionName: "function firstLetter(",
  videoId: "",
  solution: {
    approach: "Use bracket notation to access the first character.",
    explanation: "In JavaScript, strings are zero-indexed arrays of characters. Access the first character using s[0].",
    complexity: {
      time: "O(1)",
      space: "O(1)"
    },
    code: `function firstLetter(s){
  return s[0];
}`
  }
};
