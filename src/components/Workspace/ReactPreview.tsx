import React, { useEffect, useRef } from "react";

const ReactPreview = ({ code }: { code: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
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
        </style>
      </head>
      <body>
        <div id="root"></div>

        <script>
          window.addEventListener("load", () => {
            try {
              let userCode = ${JSON.stringify(code)};

              // Détecter composant si pas d'export
              const hasExport = /export\\s+default/.test(userCode);
              if (!hasExport) {
                const funcMatch = /function\\s+(\\w+)/.exec(userCode);
                const constMatch = /const\\s+(\\w+)\\s*=/.exec(userCode);

                if (funcMatch) {
                  userCode += "\\nexport default " + funcMatch[1];
                } else if (constMatch) {
                  userCode += "\\nexport default " + constMatch[1];
                } else {
                  userCode = "const Preview = () => (" + userCode + "); export default Preview;";
                }
              }


              // --- TRANSPILATION BABEL (JSX + ES modules) ---
              let transformed = Babel.transform(userCode, {
                presets: ["react"]
              }).code;
              // Remplacer tout 'export default ...' par 'module.exports.default = ...'
              transformed = transformed.replace(/export default ([^;]+);?/g, 'module.exports.default = $1;');

              // Compat CommonJS
              const exports = {};
              const module = { exports };

              // Évaluer le module
              new Function("React", "exports", "module", transformed)(
                React,
                exports,
                module
              );

              const Component = module.exports.default;
              if (!Component) throw new Error("Component not found");

              // Rendu React
              ReactDOM.createRoot(document.getElementById("root"))
                .render(React.createElement(Component));

            } catch (err) {
              document.body.innerHTML =
                '<pre style="color:red;font-size:14px;padding:1rem">' +
                err.toString() +
                "</pre>";
            }
          });
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full bg-white rounded-lg border-2 border-slate-700"
      title="React code preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default ReactPreview;