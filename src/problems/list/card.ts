import { ProblemElement } from "../types/problem";
import { createTestDOM, assertElementExists } from "@/problems/utils/htmlCssAssert";

const starterCodeHTMLCard = `<div class="card">
  <img src="https://picsum.photos/300/200" alt="Card image">
  <h2>Card Title</h2>
  <p>This is a description of the card content.</p>
  <button>Read More</button>
</div>`;

const starterCodeCSSCard = `.card {
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
}`;

function checkElement(
  doc: Document,
  selector: string,
  successMsg: string,
  errorMsg: string,
  messages: { type: "hint" | "error"; text: string }[]
): boolean {
  if (doc.querySelector(selector)) {
    messages.push({ type: "hint", text: successMsg });
    return false;
  } else {
    messages.push({ type: "error", text: errorMsg });
    return true;
  }
}

function checkCardCSS(
  css: string,
  messages: { type: "hint" | "error"; text: string }[]
): boolean {
  let hasError = false;
  const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
  const cardRegex = /\.card\s*\{([^}]+)\}/;
  const cardMatch = cardRegex.exec(cssLower);
  if (cardMatch) {
    const cardRules = cardMatch[1];
    if (cardRules.includes('border-radius')) {
      messages.push({ type: "hint", text: 'Card has rounded corners.' });
    } else {
      messages.push({ type: "error", text: 'Card should have rounded corners (border-radius)' });
      hasError = true;
    }
    if (cardRules.includes('box-shadow')) {
      messages.push({ type: "hint", text: 'Card has a shadow.' });
    } else {
      messages.push({ type: "error", text: 'Card should have a shadow (box-shadow)' });
      hasError = true;
    }
    if (cardRules.includes('padding')) {
      messages.push({ type: "hint", text: 'Card has padding.' });
    } else {
      messages.push({ type: "error", text: 'Card should have padding' });
      hasError = true;
    }
  } else {
    messages.push({ type: "error", text: 'Card CSS rules not found' });
    hasError = true;
  }
  return hasError;
}

const handlerCard = ({ html, css }: { html: string; css: string }) => {
  const messages: { type: "hint" | "error"; text: string }[] = [];
  let hasError = false;
  try {
    const doc = createTestDOM(html, css);

    // Check if card exists
    try {
      assertElementExists(doc, ".card");
      messages.push({ type: "hint", text: 'Found .card element.' });
    } catch (e: any) {
      messages.push({ type: "error", text: e.message });
      hasError = true;
    }

    hasError = checkElement(
      doc,
      '.card img',
      'Card contains an image.',
      'Card should contain an image',
      messages
    ) || hasError;

    hasError = checkElement(
      doc,
      '.card h2, .card h3, .card .card-title',
      'Card contains a title.',
      'Card should contain a title (h2, h3, or .card-title)',
      messages
    ) || hasError;

    hasError = checkElement(
      doc,
      '.card p, .card .card-text',
      'Card contains description text.',
      'Card should contain description text (p or .card-text)',
      messages
    ) || hasError;

    hasError = checkElement(
      doc,
      '.card button, .card a.button, .card .card-button',
      'Card contains a button or link.',
      'Card should contain a button or link',
      messages
    ) || hasError;

    hasError = checkCardCSS(css, messages) || hasError;
  } catch (error: any) {
    messages.push({ type: "error", text: error.message });
    hasError = true;
  }
  if (!hasError) {
    messages.push({ type: "hint", text: 'Congrats! All tests passed' });
  }
  return messages;
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
