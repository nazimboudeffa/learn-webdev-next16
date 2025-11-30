import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeFilterPositive = `function filterPositive(arr){
  // Write your code here
};`;

const handlerFilterPositive = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const tests = [
    { arr: [1, -2, 3, -4, 5], expected: [1, 3, 5] },
    { arr: [-1, -2, -3], expected: [] },
    { arr: [10, 20], expected: [10, 20] },
  ];
  for (const test of tests) {
    try {
      const result = fn(test.arr);
      assertDeepStrictEqual(result, test.expected);
      results.push({ type: 'hint', text: `✅ Passed: filterPositive([${test.arr}]) === [${test.expected}]` });
    } catch (error: any) {
      results.push({ type: 'error', text: `❌ Failed: filterPositive([${test.arr}]) — expected [${test.expected}], got ${error?.actual ?? 'error'}` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const filterPositive: ProblemElement = {
  id: "filterpositive",
  slug: "filterpositive",
  title: "Filter Positive Numbers",
  difficulty: "Easy",
  category: "Array",
  problemStatement: [
    "Write a function that returns a new array containing only the positive numbers from the input array.",
    "This teaches you array filtering and conditional logic."
  ],
  examples: [
    { id: 1, inputText: "[1, -2, 3, -4, 5]", outputText: "[1, 3, 5]" },
    { id: 2, inputText: "[-1, -2, -3]", outputText: "[]" },
    { id: 3, inputText: "[10, 20]", outputText: "[10, 20]" },
  ],
  constraints: "No constraints.",
  handlerFunction: handlerFilterPositive,
  starterCode: starterCodeFilterPositive,
  order: 6,
  starterFunctionName: "function filterPositive(",
  videoId: "",
  solution: {
    approach: "Iterate through the array and collect positive numbers.",
    explanation: "Create an empty result array, loop through the input, and add numbers greater than 0 to the result. Alternatively, use arr.filter(x => x > 0).",
    complexity: {
      time: "O(n)",
      space: "O(n)"
    },
    code: `function filterPositive(arr){
  const result = [];
  for (const num of arr) {
    if (num > 0) result.push(num);
  }
  return result;
}`
  }
};
