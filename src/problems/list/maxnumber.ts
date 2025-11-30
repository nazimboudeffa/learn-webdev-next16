import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeMaxNumber = `function maxNumber(arr){
  // Write your code here
};`;

const handlerMaxNumber = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const tests = [
    { arr: [1, 5, 3, 9, 2], expected: 9 },
    { arr: [10], expected: 10 },
    { arr: [-5, -1, -10], expected: -1 },
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
      results.push({ type: 'hint', text: `✅ Passed: maxNumber([${test.arr}]) === ${test.expected}` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: maxNumber([${test.arr}]) — expected ${test.expected}` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const maxNumber: ProblemElement = {
  id: "maxnumber",
  slug: "maxnumber",
  title: "Find Maximum in Array",
  difficulty: "Easy",
  category: "Array",
  problemStatement: [
    "Write a function that finds and returns the maximum number in an array.",
    "This teaches you how to work with arrays and comparison operators."
  ],
  examples: [
    { id: 1, inputText: "[1, 5, 3, 9, 2]", outputText: "9" },
    { id: 2, inputText: "[10]", outputText: "10" },
    { id: 3, inputText: "[-5, -1, -10]", outputText: "-1" },
  ],
  constraints: "Array will always have at least one element.",
  handlerFunction: handlerMaxNumber,
  starterCode: starterCodeMaxNumber,
  order: 5,
  starterFunctionName: "function maxNumber(",
  videoId: "",
  solution: {
    approach: "Track the maximum value while iterating through the array.",
    explanation: "Initialize max with the first element, then loop through the array and update max whenever you find a larger value. Alternatively, use Math.max(...arr).",
    complexity: {
      time: "O(n)",
      space: "O(1)"
    },
    code: `function maxNumber(arr){
  let max = arr[0];
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max;
}`
  }
};
