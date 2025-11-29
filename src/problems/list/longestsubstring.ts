import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeLongestSubstring = `function lengthOfLongestSubstring(s){
  // Write your code here
};`;

const handlerLongestSubstring = (fn: any) => {
  try {
    const inputs = ["abcabcbb", "bbbbb", "pwwkew", ""];
    const outputs = [3, 1, 3, 0];
    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assertDeepStrictEqual(result, outputs[i]);
    }
    return true;
  } catch (error: any) {
    console.log("lengthOfLongestSubstring handler function error");
    throw new Error(error);
  }
};

export const longestSubstring: ProblemElement = {
  id: "longestsubstring",
  slug: "longestsubstring",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Hard",
  category: "String",
  problemStatement: [
    "Given a string s, find the length of the longest substring without repeating characters."
  ],
  examples: [
    { id: 1, inputText: "\"abcabcbb\"", outputText: "3" },
    { id: 2, inputText: "\"bbbbb\"", outputText: "1" },
  ],
  constraints: "0 ≤ length(s) ≤ 10^4",
  handlerFunction: handlerLongestSubstring,
  starterCode: starterCodeLongestSubstring,
  order: 16,
  starterFunctionName: "function lengthOfLongestSubstring(",
  videoId: "",
  solution: {
    approach: "Use sliding window with a hash map tracking last seen positions.",
    explanation: "Maintain a window with two pointers. Store each character's last seen position in a map. When a duplicate is found within the window, move the left pointer past the previous occurrence. Track the maximum window size.",
    complexity: {
      time: "O(n)",
      space: "O(k)"
    },
    code: `function lengthOfLongestSubstring(s){
  const seen = new Map();
  let best = 0, left = 0;
  for (let right = 0; right < s.length; right++){
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) left = seen.get(ch) + 1;
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`
  }
};
