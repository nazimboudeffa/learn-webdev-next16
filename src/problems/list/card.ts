import { ProblemElement } from "../types/problem";
import { 
  createTestDOM, 
  assertElementExists
} from "@/problems/utils/htmlCssAssert";

const starterCodeHTMLCard = `<div class="card">
  <!-- Add your HTML here -->
</div>`;

const starterCodeCSSCard = `.card {
  /* Add your CSS here */
}`;

const handlerCard = ({ html, css }: { html: string; css: string }) => {
  try {
    const doc = createTestDOM(html, css);
    
    // Check if card exists
    assertElementExists(doc, ".card");
    
    // Check if card has an image
    const cardImg = doc.querySelector('.card img');
    if (!cardImg) {
      throw new Error('Card should contain an image');
    }
    
    // Check if card has a title
    const cardTitle = doc.querySelector('.card h2, .card h3, .card .card-title');
    if (!cardTitle) {
      throw new Error('Card should contain a title (h2, h3, or .card-title)');
    }
    
    // Check if card has description text
    const cardText = doc.querySelector('.card p, .card .card-text');
    if (!cardText) {
      throw new Error('Card should contain description text (p or .card-text)');
    }
    
    // Check if card has a button
    const cardButton = doc.querySelector('.card button, .card a.button, .card .card-button');
    if (!cardButton) {
      throw new Error('Card should contain a button or link');
    }
    
    // Check CSS rules directly instead of computed styles
    const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
    
    // Check for .card rules
    const cardRegex = /\.card\s*\{([^}]+)\}/;
    const cardMatch = cardRegex.exec(cssLower);
    if (!cardMatch) {
      throw new Error('Card CSS rules not found');
    }
    
    const cardRules = cardMatch[1];
    
    if (!cardRules.includes('border-radius')) {
      throw new Error('Card should have rounded corners (border-radius)');
    }
    
    if (!cardRules.includes('box-shadow')) {
      throw new Error('Card should have a shadow (box-shadow)');
    }
    
    if (!cardRules.includes('padding')) {
      throw new Error('Card should have padding');
    }
    
    return true;
  } catch (error: any) {
    console.log("card handler function error");
    throw new Error(error);
  }
};

export const card: ProblemElement = {
  id: "card",
  slug: "card",
  title: "Create a Card Component",
  difficulty: "Easy",
  category: "Components",
  type: "html-css",
  language: "HTML/CSS",
  problemStatement: [
    "Create a card component that includes an image, a title, description text, and a button.",
    "Style the card with rounded corners, a shadow, and appropriate spacing."
  ],
  examples: [
    { 
      id: 1, 
      inputText: "A card div", 
      outputText: "A styled card with image, title, text, and button",
      explanation: "The card should be visually appealing with proper spacing and styling"
    },
  ],
  constraints: [
    "Card must contain: an image, a heading (h2/h3 or .card-title), text (p or .card-text), and a button/link",
    "Card must have border-radius, box-shadow, and padding",
    "Use semantic HTML where appropriate"
  ],
  handlerFunction: handlerCard,
  starterCode: "",
  starterCodeHTML: starterCodeHTMLCard,
  starterCodeCSS: starterCodeCSSCard,
  order: 101,
  starterFunctionName: "",
  videoId: "",
  solution: {
    approach: "Build a semantic card structure with proper styling.",
    explanation: [
      "Use semantic HTML elements (img, h2/h3, p, button)",
      "Apply border-radius for rounded corners",
      "Add box-shadow for depth",
      "Use padding for internal spacing",
      "Style the button to be visually distinct"
    ],
    code: `<!-- HTML -->
<div class="card">
  <img src="https://picsum.photos/300/200" alt="Card image">
  <h2>Card Title</h2>
  <p>This is a description of the card content.</p>
  <button>Read More</button>
</div>

/* CSS */
.card {
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: white;
}

.card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card h2 {
  margin-bottom: 12px;
  font-size: 1.5rem;
}

.card p {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

.card button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}`
  }
};
