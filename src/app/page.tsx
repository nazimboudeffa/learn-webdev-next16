import Navbar from "@/components/Navbar"
import { problemsList } from "@/problems/list"

const Home = () => {
    const totalProblems = problemsList.length;
    
    return (
      <>
      <Navbar/>
      <main className="bg-[#0d1117] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 md:pt-8 lg:pt-12 pb-6 sm:pb-12 md:pb-16 lg:pb-24">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-4 py-12 sm:px-8 md:px-12 lg:px-16 md:py-20 lg:py-28 shadow-2xl rounded-2xl sm:rounded-3xl border border-slate-700">
            
            {/* Content */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs sm:text-sm">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 animate-pulse"></span>
                <span className="text-green-300 font-medium">Free Forever • Tip Us Instead 😊</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 px-2">
                Master Web Dev{' '}
                <span className="block mt-1 sm:mt-2 pb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Through Practice
                </span>
              </h1>
              
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-8 text-slate-300 max-w-2xl mx-auto px-4">
                Learn to code with interactive challenges, real-time feedback, and a supportive community.
                Practice both JavaScript and HTML/CSS to build solid front-end fundamentals.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                <a
                  href="/problems"
                  className="w-full sm:w-auto text-center rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl hover:shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95"
                >
                  Start Learning Free →
                </a>
                <a 
                  href="https://nazimboudeffa.gumroad.com" 
                  target="_blank"
                  className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-300 hover:text-white transition-colors border border-slate-600 rounded-lg sm:rounded-xl hover:border-indigo-500 hover:bg-slate-800/50"
                >
                  Read the Books First
                </a>
              </div>
              
              {/* Stats */}
              <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-700/50 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xl mx-auto px-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{totalProblems}</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">Levels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">100%</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">Free</div>
                </div>
              </div>
            </div>
          </div>

            {/* Levels Overview Section */}
            <div className="mt-20 sm:mt-28">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Levels for Every Learner
                </h2>
                <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                  Progress through three levels of challenges, each designed to help you grow from the basics to advanced mastery. Choose your starting point or work your way up!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Beginner */}
                <div className="bg-gradient-to-br from-green-900/60 to-slate-900 rounded-xl p-6 border border-green-700 shadow-lg text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl mb-2">🌱</div>
                    <h3 className="text-xl font-bold text-green-300">Beginner</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">Start with the fundamentals: variables, functions, loops, and simple layouts. Perfect for those new to coding or web development.</p>
                </div>
                {/* Intermediate */}
                <div className="bg-gradient-to-br from-yellow-900/60 to-slate-900 rounded-xl p-6 border border-yellow-700 shadow-lg text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl mb-2">🚀</div>
                    <h3 className="text-xl font-bold text-yellow-300">Intermediate</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">Build on your basics: arrays, strings, objects, and more complex layouts. Tackle real-world problems and interactive UIs.</p>
                </div>
                {/* Advanced */}
                <div className="bg-gradient-to-br from-pink-900/60 to-slate-900 rounded-xl p-6 border border-pink-700 shadow-lg text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl mb-2">🏆</div>
                    <h3 className="text-xl font-bold text-pink-300">Advanced</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">Take on the toughest challenges: algorithms, optimization, and interview prep. Push your skills to the next level and master web development.</p>
                </div>
              </div>
            </div>

            {/* Learning Path Section */}
            <div className="mt-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Choose Your Learning Path
                </h2>
                <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Pick a path to start mastering web development. Each path is designed to help you build real skills through hands-on challenges.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-slate-800/80 rounded-xl p-5 min-w-[260px] max-w-xs shadow-lg border border-yellow-700">
                <h2 className="text-xl font-bold text-purple-300 mb-2">JavaScript Path</h2>
                <p className="text-slate-400 text-sm mb-2">Solve logic, algorithms, and data structure problems using JavaScript.</p>
                <a href="/problems?language=JavaScript" className="text-purple-300 hover:underline text-sm font-semibold">Explore JavaScript</a>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-5 min-w-[260px] max-w-xs shadow-lg border border-indigo-700">
                <h2 className="text-xl font-bold text-indigo-300 mb-2">HTML/CSS Path</h2>
                <p className="text-slate-400 text-sm mb-2">Build and style web pages from scratch. Practice layout, flexbox, ...</p>
                <a href="/problems?language=HTML/CSS" className="text-indigo-400 hover:underline text-sm font-semibold">Explore HTML/CSS</a>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-5 min-w-[260px] max-w-xs shadow-lg border border-pink-700">
                <h2 className="text-xl font-bold text-pink-300 mb-2">React Path</h2>
                <p className="text-slate-400 text-sm mb-2">Practice building interactive UIs and components with React.</p>
                <a href="/problems?language=React" className="text-pink-400 hover:underline text-sm font-semibold">Explore React</a>
              </div>
            </div>
          </div>

                  {/* JavaScript Path Section */}
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                JavaScript Path
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                Build strong JavaScript fundamentals with hands-on challenges
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Core Concepts Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg ring-2 ring-slate-700">
                <h3 className="text-lg font-bold text-white mb-2 text-center">Core Concepts</h3>
                <p className="text-slate-300 text-sm mb-3 text-center">
                  Master variables, data types, functions, loops, and control flow—the building blocks of JavaScript.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">variables</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">functions</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">loops</span>
                </div>
              </div>
              {/* Algorithms & Problem Solving Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg ring-2 ring-slate-700">
                <h3 className="text-lg font-bold text-white mb-2 text-center">Algorithms & Problem Solving</h3>
                <p className="text-slate-300 text-sm mb-3 text-center">
                  Sharpen your skills with array, string, object manipulation, and classic algorithms.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">arrays</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">strings</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">recursion</span>
                </div>
              </div>
              {/* Real-World Skills Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg ring-2 ring-slate-700">
                <h3 className="text-lg font-bold text-white mb-2 text-center">Real-World Skills</h3>
                <p className="text-slate-300 text-sm mb-3 text-center">
                  Apply JavaScript to solve practical problems, debug code, and prepare for interviews.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">debugging</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">interview prep</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">real projects</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <a href="/problems?language=JavaScript" className="text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 text-sm font-bold text-white shadow-xl hover:shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95">
                Explore All JavaScript Challenges →
              </a>
            </div>
          </div>

          {/* HTML/CSS Path Section */}
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                HTML & CSS Path
              </h2>
              <p className="mt-4 text-slate-400">Master core front-end topics</p>
            </div>

            {/* Topic overview tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Layout</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Flexbox and Grid for modern layouts.
                  <br />
                  Alignment and common UI patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">flex</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">grid</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">alignment</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Styling</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Typography, color, shadows, and borders.
                  <br />
                  Consistent spacing and visual rhythm.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">spacing</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">shadows</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">radius</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Components</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Cards, navbars, buttons, and forms.
                  <br />
                  Reusable, accessible UI building blocks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">cards</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">navbars</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">forms</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center">
              <a href="/problems?language=HTML%2FCSS" className="text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 text-sm font-bold text-white shadow-xl hover:shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95">
                Explore All HTML/CSS Challenges →
              </a>
            </div>
          </div>

          {/* React Path Section */}
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                React Path
              </h2>
              <p className="mt-4 text-slate-400">Build interactive components with React</p>
            </div>

            {/* Topic overview tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Components & Props</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Function components and prop passing.
                  <br />
                  Building reusable UI elements.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">props</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">JSX</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">composition</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">State & Events</h3>
                <p className="text-slate-300 text-sm mb-3">
                  useState hook for managing component state.
                  <br />
                  Handling user interactions and events.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">useState</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">events</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">forms</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Lists & Rendering</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Mapping arrays to components with keys.
                  <br />
                  Conditional rendering patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">map</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">keys</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">conditional</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center">
              <a href="/problems?language=React" className="text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 text-sm font-bold text-white shadow-xl hover:shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95">
                Explore All React Challenges →
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#0b0f14] border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-center">
          <a
            href="https://codewithadu.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-400 transition-colors text-sm sm:text-base"
          >
            Back to codewithadu.de →
          </a>
        </div>
      </footer>
      </>
    )
}

export default Home
