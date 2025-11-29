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

const handlerCenterDiv = ({ html, css }: { html: string; css: string }) => {
  try {
    const doc = createTestDOM(html, css);
    
    // Check if container exists
    assertElementExists(doc, ".container");
    
    // Check if box exists
    assertElementExists(doc, ".box");
    
    // Check CSS rules directly instead of computed styles
    const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
    
    // Check for .container rules
    const containerRegex = /\.container\s*\{([^}]+)\}/;
    const containerMatch = containerRegex.exec(cssLower);
    if (!containerMatch) {
      throw new Error('Container CSS rules not found');
    }
    
    const containerRules = containerMatch[1];
    
    if (!containerRules.includes('display') || !containerRules.includes('flex')) {
      throw new Error('Container should use display: flex');
    }
    
    if (!containerRules.includes('justify-content') || !containerRules.includes('center')) {
      throw new Error('Container should use justify-content: center');
    }
    
    if (!containerRules.includes('align-items') || !containerRules.includes('center')) {
      throw new Error('Container should use align-items: center');
    }
    
    if (!containerRules.includes('min-height')) {
      throw new Error('Container should have a min-height (e.g., 100vh)');
    }
    
    return true;
  } catch (error: any) {
    console.log("centerDiv handler function error");
    throw new Error(error);
  }
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
