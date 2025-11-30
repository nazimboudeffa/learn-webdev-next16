import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeSumArray = `function sumArray(arr){
  // Write your code here
};`;

const handlerSumArray = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const tests = [
    { arr: [1, 2, 3], expected: 6 },
    { arr: [10, -5, 5], expected: 10 },
    { arr: [], expected: 0 },
  ];
  for (const test of tests) {
    let passed = true;
    try {
      const result = fn(test.arr);
      assertDeepStrictEqual(result, test.expected);
    } catch {
      passed = false;
    }
    if (passed) {
      results.push({ type: 'hint', text: `✅ Passed: sumArray([${test.arr}]) === ${test.expected}` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: sumArray([${test.arr}]) — expected ${test.expected}` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const sumArray: ProblemElement = {
  id: "sumarray",
  slug: "sumarray",
  title: "Sum All Numbers in Array",
  difficulty: "Easy",
  category: "Array",
  problemStatement: [
    "Write a function that returns the sum of all numbers in an array.",
    "This teaches you array iteration and accumulation."
  ],
  examples: [
    { id: 1, inputText: "[1, 2, 3]", outputText: "6" },
    { id: 2, inputText: "[10, -5, 5]", outputText: "10" },
    { id: 3, inputText: "[]", outputText: "0" },
  ],
  constraints: "No constraints.",
  handlerFunction: handlerSumArray,
  starterCode: starterCodeSumArray,
  order: 4,
  starterFunctionName: "function sumArray(",
  videoId: "",
  solution: {
    approach: "Initialize a sum variable and iterate through the array.",
    explanation: "Start with sum = 0, then loop through each element in the array and add it to the sum.",
    complexity: {
      time: "O(n)",
      space: "O(1)"
    },
    code: `function sumArray(arr){
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}`
  }
};
