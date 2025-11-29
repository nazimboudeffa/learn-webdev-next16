import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeIsAnagram = `function isAnagram(s, t){
  // Write your code here
};`;

const handlerIsAnagram = (fn: any) => {
  try {
    const inputs = [
      { s: "anagram", t: "nagaram" },
      { s: "rat", t: "car" },
      { s: "a", t: "ab" },
    ];
    const outputs = [true, false, false];
    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i].s, inputs[i].t);
      assertDeepStrictEqual(result, outputs[i]);
    }
    return true;
  } catch (error: any) {
    console.log("isAnagram handler function error");
    throw new Error(error);
  }
};

export const isAnagram: ProblemElement = {
  id: "isanagram",
  slug: "isanagram",
  title: "Valid Anagram",
  difficulty: "Medium",
  category: "String",
  problemStatement: [
    "Given two strings s and t, return true if t is an anagram of s, otherwise false."
  ],
  examples: [
    { id: 1, inputText: "\"anagram\", \"nagaram\"", outputText: "true" },
    { id: 2, inputText: "\"rat\", \"car\"", outputText: "false" },
  ],
  constraints: "Only lowercase English letters.",
  handlerFunction: handlerIsAnagram,
  starterCode: starterCodeIsAnagram,
  order: 14,
  starterFunctionName: "function isAnagram(",
  videoId: "",
  solution: {
    approach: "Count character frequencies using a hash map.",
    explanation: "First check if lengths differ. Then count character frequencies in the first string. Finally, decrement counts using the second string. If any count goes negative, it's not an anagram.",
    complexity: {
      time: "O(n)",
      space: "O(1)"
    },
    code: `function isAnagram(s, t){
  if (s.length !== t.length) return false;
  const cnt = new Map();
  for (const ch of s) cnt.set(ch, (cnt.get(ch)||0)+1);
  for (const ch of t){
    const v = (cnt.get(ch)||0) - 1;
    if (v < 0) return false;
    cnt.set(ch, v);
  }
  return true;
}`
  }
};
