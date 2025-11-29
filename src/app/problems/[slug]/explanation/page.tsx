import { use } from "react";
import Navbar from "@/components/Navbar";
import { problems } from "@/problems/list";

export default function ProblemExplanationPage(context: any) {
  const params: { slug: string } = use(context.params);
  const slug = params.slug;
  const problem = problems[slug];
  if (!problem) {
    return (
      <main className="min-h-screen p-8">
        <Navbar />
        <div className="mx-auto max-w-3xl py-10">
          <h1 className="text-xl font-semibold">Not found</h1>
          <p className="mt-2 text-sm text-gray-600">No problem found for slug: {slug}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#0d1117] min-h-screen">
        <div className="mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{problem.title}</h1>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {problem.category}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Complete explanation and walkthrough for this problem</p>
          </div>

          {/* Video Section */}
          {problem.videoId ? (
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎥</span>
                Video Explanation
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-700">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${problem.videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 shadow-xl mb-8">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🎬</span>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Video Coming Soon</h3>
                <p className="text-sm text-slate-500">We&apos;re working on creating a video explanation for this problem.</p>
              </div>
            </div>
          )}

          {/* Problem Description Section */}
          <div className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Problem Statement
            </h2>
            <div className="text-slate-300 leading-relaxed">
              {problem.problemStatement}
            </div>
            
            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Examples:</h3>
                {problem.examples.map((example, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-xl p-4 mb-3 border border-slate-700/50">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-indigo-400">Input:</span>
                      <code className="ml-2 text-sm text-slate-300 bg-slate-950 px-2 py-1 rounded">{example.inputText}</code>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-green-400">Output:</span>
                      <code className="ml-2 text-sm text-slate-300 bg-slate-950 px-2 py-1 rounded">{example.outputText}</code>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-sm font-semibold text-slate-400">Explanation:</span>
                        <p className="text-sm text-slate-500 mt-1">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Starter Code Section */}
          <div className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Starter Code
            </h2>
            <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-700">
              <code className="text-sm text-slate-300 font-mono">{problem.starterCode}</code>
            </pre>
          </div>

					{/* Solution Section */}
					<div className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl mb-8">
						<h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
							<span className="text-2xl">💡</span>
							Solution & Approach
						</h2>
						{problem.solution ? (
              <div className="space-y-6">
								{problem.solution.approach && (
									<div>
										<h3 className="text-lg font-semibold text-indigo-400 mb-2">Approach:</h3>
										<p className="text-slate-300">{problem.solution.approach}</p>
									</div>
								)}
								{problem.solution.explanation && (
									<div>
										<h3 className="text-lg font-semibold text-indigo-400 mb-2">Explanation:</h3>
										<div className="text-slate-300 space-y-2">
											{Array.isArray(problem.solution.explanation) ? (
												problem.solution.explanation.map((para, idx) => <p key={idx}>{para}</p>)
											) : (
												<p>{problem.solution.explanation}</p>
											)}
										</div>
									</div>
								)}
								{problem.solution.complexity && (
									<div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
										<h3 className="text-lg font-semibold text-amber-400 mb-3">Complexity Analysis:</h3>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											{problem.solution.complexity.time && (
												<div>
													<span className="text-sm font-semibold text-cyan-400">Time Complexity:</span>
													<code className="ml-2 text-slate-300 bg-slate-950 px-2 py-1 rounded">{problem.solution.complexity.time}</code>
												</div>
											)}
											{problem.solution.complexity.space && (
												<div>
													<span className="text-sm font-semibold text-purple-400">Space Complexity:</span>
													<code className="ml-2 text-slate-300 bg-slate-950 px-2 py-1 rounded">{problem.solution.complexity.space}</code>
												</div>
											)}
										</div>
									</div>
								)}
								{problem.solution.code && (
									<div>
										<h3 className="text-lg font-semibold text-green-400 mb-2">Solution Code:</h3>
										<pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-700">
											<code className="text-sm text-slate-300 font-mono">{problem.solution.code}</code>
										</pre>
                    <div className="mt-4">
                      <a
                        href={`/problems/${slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg"
                      >
                        <span>Try it yourself</span>
                        <span>→</span>
                      </a>
                    </div>
									</div>
								)}
							</div>
						) : (
							<div className="text-center py-8">
								<span className="text-5xl mb-4 block">📚</span>
								<p className="text-slate-400">No written explanation provided yet.</p>
								<p className="text-sm text-slate-500 mt-2">Check back soon or watch the video above!</p>
							</div>
						)}
					</div>
        </div>
      </main>
    </>
  );
}