import { Problem, ProblemElement } from "@/problems/types/problem";
import { sum } from "./sum";
import { fizzBuzz } from "./fizzbuzz";
import { highAndLow } from "./highandlow";
import { reverseString } from "./reversestring";
import { palindrome } from "./palindrome";
import { twoSum } from "./twosum";
import { isAnagram } from "./isanagram";
import { mergeIntervals } from "./mergeintervals";
import { longestSubstring } from "./longestsubstring";
import { multiply } from "./multiply";
import { isEven } from "./iseven";
import { countVowels } from "./countvowels";
import { maxNumber } from "./maxnumber";
import { repeatString } from "./repeatstring";
import { sumArray } from "./sumarray";
import { filterPositive } from "./filterpositive";
import { firstLetter } from "./firstletter";
import { centerDiv } from "./centerdiv";
import { card } from "./card";
import { navbar } from "./navbar";

interface ProblemMap {
	[key: string]: ProblemElement;
}

export const problems: ProblemMap = {
    "sum": sum,
    "multiply": multiply,
    "iseven": isEven,
    "firstletter": firstLetter,
    "sumarray": sumArray,
    "maxnumber": maxNumber,
    "filterpositive": filterPositive,
    "repeatstring": repeatString,
    "reversestring": reverseString,
    "countvowels": countVowels,
    "palindrome": palindrome,
    "fizzbuzz": fizzBuzz,
    "highandlow": highAndLow,
    "twosum": twoSum,
    "isanagram": isAnagram,
    "mergeintervals": mergeIntervals,
    "longestsubstring": longestSubstring,
    "centerdiv": centerDiv,
    "card": card,
    "navbar": navbar,
};// Derived flat list for tables and listings
export const problemsList: Problem[] = Object.values(problems)
	.map((p) => ({
		id: p.id,
		slug: p.slug,
		title: p.title,
		difficulty: p.difficulty,
		category: p.category,
		order: p.order,
		videoId: p.videoId,
		language: p.language,
	}))
	.sort((a, b) => a.order - b.order);
