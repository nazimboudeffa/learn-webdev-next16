'use client'

import React from "react";

type HTMLPreviewProps = {
  html: string;
  css: string;
};

const HTMLPreview: React.FC<HTMLPreviewProps> = ({ html, css }) => {
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Reset some default styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 1rem;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={srcDoc}
      className="w-full h-full bg-white rounded-lg border-2 border-slate-700"
      title="HTML Preview"
      sandbox="allow-scripts"
    />
  );
};

export default HTMLPreview;
