import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeRepeatString = `function repeatString(s, n){
  // Write your code here
};`;

const handlerRepeatString = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const tests = [
    { s: "a", n: 3, expected: "aaa" },
    { s: "hi", n: 2, expected: "hihi" },
    { s: "x", n: 0, expected: "" },
  ];
  for (const test of tests) {
    let passed = true;
    try {
      const result = fn(test.s, test.n);
      assertDeepStrictEqual(result, test.expected);
    } catch {
      passed = false;
    }
    if (passed) {
      results.push({ type: 'hint', text: `✅ Passed: repeatString('${test.s}', ${test.n}) === '${test.expected}'` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: repeatString('${test.s}', ${test.n}) — expected '${test.expected}'` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const repeatString: ProblemElement = {
  id: "repeatstring",
  slug: "repeatstring",
  title: "Repeat String N Times",
  difficulty: "Easy",
  category: "String",
  problemStatement: [
    "Write a function that repeats a given string s exactly n times.",
    "This teaches you loops and string concatenation."
  ],
  examples: [
    { id: 1, inputText: "\"a\", 3", outputText: "\"aaa\"" },
    { id: 2, inputText: "\"hi\", 2", outputText: "\"hihi\"" },
    { id: 3, inputText: "\"x\", 0", outputText: "\"\"" },
  ],
  constraints: "n ≥ 0",
  handlerFunction: handlerRepeatString,
  starterCode: starterCodeRepeatString,
  order: 7,
  starterFunctionName: "function repeatString(",
  videoId: "",
  solution: {
    approach: "Use a loop to concatenate the string n times.",
    explanation: "Initialize an empty result string, then loop n times and concatenate the input string. Alternatively, use the built-in s.repeat(n) method.",
    complexity: {
      time: "O(n)",
      space: "O(n)"
    },
    code: `function repeatString(s, n){
  let result = '';
  for (let i = 0; i < n; i++) {
    result += s;
  }
  return result;
}`
  }
};
