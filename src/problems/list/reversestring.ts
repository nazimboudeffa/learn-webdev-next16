import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeReverseString = `function reverseString(s){
  // Write your code here
};`;

const handlerReverseString = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const inputs = ["hello", "", "abcde", "racecar"];
  const outputs = ["olleh", "", "edcba", "racecar"];
  for (let i = 0; i < inputs.length; i++) {
    let passed = true;
    try {
      const result = fn(inputs[i]);
      assertDeepStrictEqual(result, outputs[i]);
    } catch {
      passed = false;
    }
    if (passed) {
      results.push({ type: 'hint', text: `✅ Passed: reverseString('${inputs[i]}') === '${outputs[i]}'` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: reverseString('${inputs[i]}') — expected '${outputs[i]}'` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
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
