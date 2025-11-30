import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeTwoSum = `function twoSum(nums, target){
  // Write your code here
};`;

const handlerTwoSum = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const inputs = [
    { nums: [2,7,11,15], target: 9 },
    { nums: [3,2,4], target: 6 },
    { nums: [3,3], target: 6 },
  ];
  const outputs = [
    [0,1],
    [1,2],
    [0,1],
  ];
  for (let i = 0; i < inputs.length; i++) {
    let passed = true;
    try {
      const result = fn(inputs[i].nums, inputs[i].target);
      assertDeepStrictEqual(result, outputs[i]);
    } catch {
      passed = false;
    }
    if (passed) {
      results.push({ type: 'hint', text: `✅ Passed: twoSum([${inputs[i].nums}], ${inputs[i].target}) === [${outputs[i]}]` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: twoSum([${inputs[i].nums}], ${inputs[i].target}) — expected [${outputs[i]}]` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const twoSum: ProblemElement = {
  id: "twosum",
  slug: "twosum",
  title: "Two Sum",
  difficulty: "Medium",
  category: "Array",
  problemStatement: [
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  ],
  examples: [
    { id: 1, inputText: "[2,7,11,15], 9", outputText: "[0,1]" },
    { id: 2, inputText: "[3,2,4], 6", outputText: "[1,2]" },
  ],
  constraints: "Exactly one solution exists; you may not use the same element twice.",
  handlerFunction: handlerTwoSum,
  starterCode: starterCodeTwoSum,
  order: 13,
  starterFunctionName: "function twoSum(",
  videoId: "",
  solution: {
    approach: "Use a hash map to store value-to-index mappings.",
    explanation: "Iterate through the array. For each element x, check if (target - x) exists in the hash map. If it does, return the indices. Otherwise, store x with its index in the map.",
    complexity: {
      time: "O(n)",
      space: "O(n)"
    },
    code: `function twoSum(nums, target){
  const idx = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (idx.has(need)) return [idx.get(need), i];
    idx.set(nums[i], i);
  }
}`
  }
};
