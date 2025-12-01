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
        <script>
          // Expose a global print function for test/evaluation messages
          window.print = function(msg) {
            window.parent.postMessage({ source: 'react-preview', type: 'hint', text: String(msg) }, '*');
          };
        </script>
        <script>
          // Expose React hooks as globals for user code
          window.useState = React.useState;
          window.useEffect = React.useEffect;
          window.useRef = React.useRef;
          window.useContext = React.useContext;
          window.useReducer = React.useReducer;
          window.useCallback = React.useCallback;
          window.useMemo = React.useMemo;
          window.useLayoutEffect = React.useLayoutEffect;
          window.useImperativeHandle = React.useImperativeHandle;
          window.useDebugValue = React.useDebugValue;
          window.useId = React.useId;
          window.useTransition = React.useTransition;
          window.useDeferredValue = React.useDeferredValue;
        </script>
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
          // Send logs/errors to parent
          (function() {
            function sendToParent(type, text) {
              window.parent.postMessage({ source: 'react-preview', type, text }, '*');
            }
            const origLog = console.log;
            const origError = console.error;
            console.log = function(...args) {
              sendToParent('hint', args.map(String).join(' '));
              origLog.apply(console, args);
            };
            console.error = function(...args) {
              sendToParent('error', args.map(String).join(' '));
              origError.apply(console, args);
            };
          })();
          // Error Boundary implementation
          class ErrorBoundary extends React.Component {
            constructor(props) {
              super(props);
              this.state = { hasError: false, error: null };
            }
            static getDerivedStateFromError(error) {
              return { hasError: true, error };
            }
            componentDidCatch(error, info) {
              window.parent.postMessage({ source: 'react-preview', type: 'error', text: error && error.toString ? error.toString() : String(error) }, '*');
            }
            render() {
              if (this.state.hasError) {
                return React.createElement('div', { style: { color: 'red', fontSize: '16px', padding: '1rem' } },
                  'An error occurred in your component:',
                  React.createElement('pre', null, this.state.error && this.state.error.toString())
                );
              }
              return this.props.children;
            }
          }
          window.addEventListener("load", () => {
            try {
              let userCode = ${JSON.stringify(code)};
              // Detect component if no export
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
              // Replace all 'export default ...' with 'module.exports.default = ...'
              transformed = transformed.replace(/export default ([^;]+);?/g, 'module.exports.default = $1;');
              // CommonJS compat
              const exports = {};
              const module = { exports };
              // Evaluate the module
              new Function("React", "exports", "module", transformed)(
                React,
                exports,
                module
              );
              const Component = module.exports.default;
              if (!Component) throw new Error("Component not found");
              // Render React with ErrorBoundary
              ReactDOM.createRoot(document.getElementById("root"))
                .render(
                  React.createElement(ErrorBoundary, null, React.createElement(Component))
                );
            } catch (err) {
              document.body.innerHTML =
                '<pre style="color:red;font-size:14px;padding:1rem">' +
                err.toString() +
                "</pre>";
              window.parent.postMessage({ source: 'react-preview', type: 'error', text: err.toString() }, '*');
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