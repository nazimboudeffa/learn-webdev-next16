import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeReverseString = `function reverseString(s){
  // Write your code here
};`;

const handlerReverseString = (fn: any) => {
  try {
    const inputs = ["hello", "", "abcde", "racecar"];
    const outputs = ["olleh", "", "edcba", "racecar"];
    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assertDeepStrictEqual(result, outputs[i]);
    }
    return true;
  } catch (error: any) {
    console.log("reverseString handler function error");
    throw new Error(error);
  }
};

export const reverseString: ProblemElement = {
  id: "reversestring",
  slug: "reversestring",
  title: "Reverse String",
  difficulty: "Easy",
  category: "String",
  problemStatement: [
    "Given a string s, return the string reversed."
  ],
  examples: [
    { id: 1, inputText: "\"hello\"", outputText: "\"olleh\"" },
    { id: 2, inputText: "\"racecar\"", outputText: "\"racecar\"", explanation: "Palindrome stays the same" },
  ],
  constraints: "0 ≤ length(s) ≤ 10^4",
  handlerFunction: handlerReverseString,
  starterCode: starterCodeReverseString,
  order: 8,
  starterFunctionName: "function reverseString(",
  videoId: "",
  solution: {
    approach: "Use split-reverse-join or iterate from end to start.",
    explanation: "Convert the string to an array using split(''), reverse the array, and join it back into a string. Alternatively, iterate from the end to the beginning building a new string.",
    complexity: {
      time: "O(n)",
      space: "O(n)"
    },
    code: `function reverseString(s){
  return s.split('').reverse().join('');
}`
  }
};
