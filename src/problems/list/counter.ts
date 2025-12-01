import { ProblemElement } from "../types/problem";

const starterCodeCounter = `function Counter() {
  // Your code here
  // Create a counter that starts at 0
  // Add buttons to increment and decrement
  
  return (
    <div>
      <h1>Count: 0</h1>
      <button>Increment</button>
      <button>Decrement</button>
    </div>
  );
}`;

const handlerCounter = (Component: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const code = Component; // Now a string
  // Check if function is declared
  if (!/function\s+Counter\s*\(/.test(code)) {
    results.push({ type: 'error', text: 'You must declare a function named Counter.' });
    return results;
  }
  // Check for useState usage
  if (!/useState\s*\(/.test(code)) {
    results.push({ type: 'error', text: 'You must use the useState hook.' });
  }
  // Check for count display in h1
  if (!/<h1>\s*Count:\s*\{?\s*count\s*}?\s*<\/h1>/.test(code.replace(/\n/g, ''))) {
    results.push({ type: 'error', text: 'You must display the count in an h1 element.' });
  }
  // Check for increment and decrement buttons
  if (!/Increment/.test(code) || !/Decrement/.test(code)) {
    results.push({ type: 'error', text: 'You must have Increment and Decrement buttons.' });
  }
  if (results.length === 0) {
    results.push({ type: 'hint', text: 'Looks like a valid React function component!' });
  }
  return results;
};

export const counter: ProblemElement = {
  id: "counter",
  slug: "counter",
  title: "Simple Counter",
  difficulty: "Easy",
  category: "Basics",
  type: "react",
  language: "React",
  problemStatement: [
    "Create a counter component that displays a count and has buttons to increment and decrement the value.",
    "The counter should start at 0.",
    "Use the useState hook to manage the counter state."
  ],
  examples: [
    {
      id: 1,
      inputText: "Initial render",
      outputText: "Count: 0 with Increment and Decrement buttons",
      explanation: "The component displays the initial count of 0"
    },
    {
      id: 2,
      inputText: "Click Increment button",
      outputText: "Count: 1",
      explanation: "The count increases by 1"
    },
    {
      id: 3,
      inputText: "Click Decrement button",
      outputText: "Count: -1",
      explanation: "The count decreases by 1"
    }
  ],
  constraints: [
    "Must use React hooks (useState)",
    "The count must be displayed in an h1 element",
    "Must have two buttons: one for increment, one for decrement"
  ],
  handlerFunction: handlerCounter,
  starterCode: "",
  starterCodeReact: starterCodeCounter,
  order: 200,
  starterFunctionName: "Counter",
  videoId: "",
  solution: {
    approach: "Use useState to manage counter state, and update it with button click handlers.",
    explanation: [
      "Import useState from React",
      "Initialize state with useState(0)",
      "Create increment handler that calls setCount(count + 1)",
      "Create decrement handler that calls setCount(count - 1)",
      "Display the count and attach handlers to buttons"
    ],
    code: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}`
  }
};
