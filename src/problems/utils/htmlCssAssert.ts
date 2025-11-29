// Utility functions for testing HTML/CSS problems

export interface HTMLCSSTestResult {
  success: boolean;
  error?: string;
}

/**
 * Creates a temporary DOM from HTML and CSS strings
 */
export function createTestDOM(html: string, css: string): Document {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>
  `, 'text/html');
  return doc;
}

/**
 * Checks if an element exists with a specific selector
 */
export function assertElementExists(doc: Document, selector: string): void {
  const element = doc.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
}

/**
 * Checks if an element has specific text content
 */
export function assertElementHasText(doc: Document, selector: string, expectedText: string): void {
  const element = doc.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  const actualText = element.textContent?.trim();
  if (actualText !== expectedText) {
    throw new Error(`Expected text "${expectedText}" but got "${actualText}"`);
  }
}

/**
 * Checks if an element has a specific CSS property with a given value
 */
export function assertElementHasStyle(
  doc: Document, 
  selector: string, 
  property: string, 
  expectedValue: string
): void {
  const element = doc.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  
  // Create a temporary iframe to calculate computed styles
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentDocument;
  if (!iframeDoc) {
    iframe.remove();
    throw new Error('Could not create iframe document');
  }
  
  iframeDoc.open();
  iframeDoc.write(doc.documentElement.outerHTML); // eslint-disable-line deprecation/deprecation
  iframeDoc.close();
  
  const iframeElement = iframeDoc.querySelector(selector);
  if (!iframeElement) {
    iframe.remove();
    throw new Error(`Element with selector "${selector}" not found in iframe`);
  }
  
  const computedStyle = iframe.contentWindow?.getComputedStyle(iframeElement);
  iframe.remove();
  
  if (!computedStyle) {
    throw new Error('Could not compute styles');
  }
  
  const actualValue = computedStyle.getPropertyValue(property);
  if (actualValue !== expectedValue) {
    throw new Error(`Expected ${property} to be "${expectedValue}" but got "${actualValue}"`);
  }
}

/**
 * Checks if an element has a specific attribute
 */
export function assertElementHasAttribute(
  doc: Document, 
  selector: string, 
  attribute: string, 
  expectedValue?: string
): void {
  const element = doc.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  
  if (!element.hasAttribute(attribute)) {
    throw new Error(`Element does not have attribute "${attribute}"`);
  }
  
  if (expectedValue !== undefined) {
    const actualValue = element.getAttribute(attribute);
    if (actualValue !== expectedValue) {
      throw new Error(`Expected ${attribute}="${expectedValue}" but got "${actualValue}"`);
    }
  }
}

/**
 * Counts elements matching a selector
 */
export function assertElementCount(doc: Document, selector: string, expectedCount: number): void {
  const elements = doc.querySelectorAll(selector);
  if (elements.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} elements matching "${selector}" but found ${elements.length}`);
  }
}

/**
 * Checks if element has a specific class
 */
export function assertElementHasClass(doc: Document, selector: string, className: string): void {
  const element = doc.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  
  if (!element.classList.contains(className)) {
    throw new Error(`Element does not have class "${className}"`);
  }
}
