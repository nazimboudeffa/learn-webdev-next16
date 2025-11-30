import { ProblemElement } from "../types/problem";
import { 
  createTestDOM, 
  assertElementExists
} from "@/problems/utils/htmlCssAssert";

const starterCodeHTMLCenterDiv = `<div class="container">
  <div class="box">
    Center Me!
  </div>
</div>`;

const starterCodeCSSCenterDiv = `.container {
  /* Add your CSS here */
}

.box {
  width: 200px;
  height: 200px;
  background-color: #6366f1;
  color: white;
}`;

function checkElementExists(doc: Document, selector: string, messages: { type: "hint" | "error"; text: string }[]): boolean {
  try {
    assertElementExists(doc, selector);
    messages.push({ type: "hint", text: `Found ${selector} element.` });
    return true;
  } catch (e: any) {
    messages.push({ type: "error", text: e.message });
    return false;
  }
}

function checkContainerCSSRules(containerRules: string, messages: { type: "hint" | "error"; text: string }[]): boolean {
  let hasError = false;
  if (!containerRules.includes('display') || !containerRules.includes('flex')) {
    messages.push({ type: "error", text: 'Container should use display: flex' });
    hasError = true;
  } else {
    messages.push({ type: "hint", text: 'Container uses display: flex.' });
  }
  if (!containerRules.includes('justify-content') || !containerRules.includes('center')) {
    messages.push({ type: "error", text: 'Container should use justify-content: center' });
    hasError = true;
  } else {
    messages.push({ type: "hint", text: 'Container uses justify-content: center.' });
  }
  if (!containerRules.includes('align-items') || !containerRules.includes('center')) {
    messages.push({ type: "error", text: 'Container should use align-items: center' });
    hasError = true;
  } else {
    messages.push({ type: "hint", text: 'Container uses align-items: center.' });
  }
  if (containerRules.includes('min-height')) {
    messages.push({ type: "hint", text: 'Container has min-height.' });
  } else {
    messages.push({ type: "error", text: 'Container should have a min-height (e.g., 100vh)' });
    hasError = true;
  }
  return hasError;
}

const handlerCenterDiv = ({ html, css }: { html: string; css: string }) => {
  const messages: { type: "hint" | "error"; text: string }[] = [];
  let hasError = false;
  try {
    const doc = createTestDOM(html, css);

    // Check if container exists
    if (!checkElementExists(doc, ".container", messages)) {
      hasError = true;
    }

    // Check if box exists
    if (!checkElementExists(doc, ".box", messages)) {
      hasError = true;
    }

    // Check CSS rules directly instead of computed styles
    const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
    // Check for .container rules
    const containerRegex = /\.container\s*\{([^}]+)\}/;
    const containerMatch = containerRegex.exec(cssLower);
    if (containerMatch) {
      const containerRules = containerMatch[1];
      if (checkContainerCSSRules(containerRules, messages)) {
        hasError = true;
      }
    } else {
      messages.push({ type: "error", text: 'Container CSS rules not found' });
      hasError = true;
    }
  } catch (error: any) {
    messages.push({ type: "error", text: error.message });
    hasError = true;
  }
  if (!hasError) {
    messages.push({ type: "hint", text: 'Congrats! All tests passed' });
  }
  return messages;
};

export const centerDiv: ProblemElement = {
  id: "centerdiv",
  slug: "centerdiv",
  title: "Center a Div",
  difficulty: "Easy",
  category: "Layout",
  type: "html-css",
  language: "HTML/CSS",
  problemStatement: [
    "Center the box div both horizontally and vertically within the container using Flexbox.",
    "The container should take up the full viewport height."
  ],
  examples: [
    { 
      id: 1, 
      inputText: "A container with a box inside", 
      outputText: "The box is perfectly centered in the viewport",
      explanation: "Use flexbox properties on the container to center the box"
    },
  ],
  constraints: "You must use Flexbox (display: flex) for centering. The container should have a minimum height to demonstrate centering.",
  handlerFunction: handlerCenterDiv,
  starterCode: "", // Not used for HTML/CSS
  starterCodeHTML: starterCodeHTMLCenterDiv,
  starterCodeCSS: starterCodeCSSCenterDiv,
  order: 100,
  starterFunctionName: "",
  videoId: "",
  solution: {
    approach: "Use Flexbox to center elements both horizontally and vertically.",
    explanation: [
      "Set display: flex on the container",
      "Use justify-content: center to center horizontally",
      "Use align-items: center to center vertically",
      "Set min-height: 100vh to make the container full viewport height"
    ],
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #6366f1;
  color: white;
}`
  }
};
