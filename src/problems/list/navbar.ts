import { ProblemElement } from "../types/problem";
import { 
  createTestDOM, 
  assertElementExists
} from "@/problems/utils/htmlCssAssert";

const starterCodeHTMLNavbar = `<nav class="navbar">
  <!-- Add your navigation items here -->
</nav>`;

const starterCodeCSSNavbar = `.navbar {
  /* Add your CSS here */
}`;

const handlerNavbar = ({ html, css }: { html: string; css: string }) => {
  try {
    const doc = createTestDOM(html, css);
    
    // Check if navbar exists
    assertElementExists(doc, ".navbar");
    
    // Check if navbar has a logo or brand name
    const logo = doc.querySelector('.navbar .logo, .navbar .brand, .navbar h1');
    if (!logo) {
      throw new Error('Navbar should contain a logo or brand name (.logo, .brand, or h1)');
    }
    
    // Check if navbar has navigation links
    const navLinks = doc.querySelectorAll('.navbar a, .navbar .nav-link');
    if (navLinks.length < 3) {
      throw new Error('Navbar should contain at least 3 navigation links');
    }
    
    // Check CSS rules directly instead of computed styles
    const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
    
    // Check for .navbar rules
    const navbarRegex = /\.navbar\s*\{([^}]+)\}/;
    const navbarMatch = navbarRegex.exec(cssLower);
    if (!navbarMatch) {
      throw new Error('Navbar CSS rules not found');
    }
    
    const navbarRules = navbarMatch[1];
    
    if (!navbarRules.includes('display') || !navbarRules.includes('flex')) {
      throw new Error('Navbar should use display: flex');
    }
    
    if (!navbarRules.includes('justify-content') || !navbarRules.includes('space-between')) {
      throw new Error('Navbar should use justify-content: space-between');
    }
    
    if (!navbarRules.includes('align-items') || !navbarRules.includes('center')) {
      throw new Error('Navbar should use align-items: center');
    }
    
    if (!navbarRules.includes('padding')) {
      throw new Error('Navbar should have padding');
    }
    
    if (!navbarRules.includes('background-color') && !navbarRules.includes('background:')) {
      throw new Error('Navbar should have a background-color');
    }
    
    return true;
  } catch (error: any) {
    console.log("navbar handler function error");
    throw new Error(error);
  }
};

export const navbar: ProblemElement = {
  id: "navbar",
  slug: "navbar",
  title: "Create a Navbar",
  difficulty: "Medium",
  category: "Components",
  type: "html-css",
  language: "HTML/CSS",
  problemStatement: [
    "Create a responsive navigation bar with a logo/brand name on the left and navigation links on the right.",
    "Use Flexbox to layout the navbar items horizontally with proper spacing."
  ],
  examples: [
    { 
      id: 1, 
      inputText: "A navbar element", 
      outputText: "A horizontal navbar with logo on left and links on right",
      explanation: "Use Flexbox with space-between to push logo left and links right"
    },
  ],
  constraints: [
    "Navbar must contain a logo/brand (.logo, .brand, or h1) and at least 3 navigation links",
    "Must use display: flex, justify-content: space-between, and align-items: center",
    "Must have padding and a background color"
  ],
  handlerFunction: handlerNavbar,
  starterCode: "",
  starterCodeHTML: starterCodeHTMLNavbar,
  starterCodeCSS: starterCodeCSSNavbar,
  order: 102,
  starterFunctionName: "",
  videoId: "",
  solution: {
    approach: "Use Flexbox to create a horizontal navigation bar with proper alignment.",
    explanation: [
      "Use display: flex on the navbar",
      "Use justify-content: space-between to separate logo and links",
      "Use align-items: center for vertical centering",
      "Add padding and background color for styling",
      "Style links to remove default underlines"
    ],
    code: `<!-- HTML -->
<nav class="navbar">
  <div class="logo">MyBrand</div>
  <div class="nav-links">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

/* CSS */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1f2937;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #6366f1;
}`
  }
};
