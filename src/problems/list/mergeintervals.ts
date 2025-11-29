import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeMergeIntervals = `function mergeIntervals(intervals){
  // intervals is an array like [[1,3],[2,6]]
  // Write your code here
};`;

const handlerMergeIntervals = (fn: any) => {
  try {
    const inputs = [
      [[1,3],[2,6],[8,10],[15,18]],
      [[1,4],[4,5]],
    ];
    const outputs = [
      [[1,6],[8,10],[15,18]],
      [[1,5]],
    ];
    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assertDeepStrictEqual(result, outputs[i]);
    }
    return true;
  } catch (error: any) {
    console.log("mergeIntervals handler function error");
    throw new Error(error);
  }
};

export const mergeIntervals: ProblemElement = {
  id: "mergeintervals",
  slug: "mergeintervals",
  title: "Merge Intervals",
  difficulty: "Hard",
  category: "Array",
  problemStatement: [
    "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals."
  ],
  examples: [
    { id: 1, inputText: "[[1,3],[2,6],[8,10],[15,18]]", outputText: "[[1,6],[8,10],[15,18]]" },
    { id: 2, inputText: "[[1,4],[4,5]]", outputText: "[[1,5]]" },
  ],
  constraints: "1 ≤ intervals.length ≤ 10^4, intervals[i].length = 2",
  handlerFunction: handlerMergeIntervals,
  starterCode: starterCodeMergeIntervals,
  order: 15,
  starterFunctionName: "function mergeIntervals(",
  videoId: "",
  solution: {
    approach: "Sort intervals by start time, then merge overlapping ones.",
    explanation: "First sort the intervals by their start values. Then iterate through and merge when the current interval's start is less than or equal to the last merged interval's end.",
    complexity: {
      time: "O(n log n)",
      space: "O(n)"
    },
    code: `function mergeIntervals(intervals){
  intervals.sort((a,b)=>a[0]-b[0]);
  const res = [];
  for (const [s,e] of intervals){
    if (!res.length || res[res.length-1][1] < s) res.push([s,e]);
    else res[res.length-1][1] = Math.max(res[res.length-1][1], e);
  }
  return res;
}`
  }
};
