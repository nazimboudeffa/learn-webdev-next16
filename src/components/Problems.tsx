'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { problemsList } from "@/problems/list";
import { Problem } from "@/problems/types/problem";

interface ProblemsProps {
  difficulty?: string | null;
  language?: string | null;
}

const Problems: React.FC<ProblemsProps> = ({ difficulty, language }) => {
  const [solvedSlugs] = useSolvedSlugs();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const problemsPerPage = 10;
  
  let filteredProblems = difficulty 
    ? problemsList.filter(p => p.difficulty === difficulty)
    : problemsList;

  // Initialize language filter from query param (e.g., "HTML/CSS")
  useEffect(() => {
    if (language && language !== 'all') {
      setFilterLanguage(language);
    }
  }, [language]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterDifficulty, filterLanguage, filterCategory, filterStatus, difficulty]);

  // Apply filters
  if (filterDifficulty !== 'all') {
    filteredProblems = filteredProblems.filter(p => p.difficulty === filterDifficulty);
  }
  if (filterLanguage !== 'all') {
    const lang = filterLanguage === 'JavaScript' ? undefined : filterLanguage;
    filteredProblems = filteredProblems.filter(p => (p.language || 'JavaScript') === (lang || 'JavaScript'));
  }
  if (filterCategory !== 'all') {
    filteredProblems = filteredProblems.filter(p => p.category === filterCategory);
  }
  if (filterStatus !== 'all') {
    if (filterStatus === 'solved') {
      filteredProblems = filteredProblems.filter(p => solvedSlugs.has(p.slug));
    } else if (filterStatus === 'unsolved') {
      filteredProblems = filteredProblems.filter(p => !solvedSlugs.has(p.slug));
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  // Get unique values for filters
  const difficulties = ['all', ...Array.from(new Set(problemsList.map(p => p.difficulty)))];
  const languages = ['all', ...Array.from(new Set(problemsList.map(p => p.language || 'JavaScript')))];
  const categories = ['all', ...Array.from(new Set(problemsList.map(p => p.category)))];
  
  return (
      <div className='w-full overflow-x-auto'>
                {!difficulty && (
                  <div className="mb-5 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Coding Problems
                    </h1>
                    <p className="text-slate-400 text-lg">
                      Master your skills with {problemsList.length} challenges
                    </p>
                  </div>
                )}
        {difficulty && (
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{difficulty} Problems</h2>
            <p className="text-slate-400">Showing {filteredProblems.length} {difficulty.toLowerCase()} level problems</p>
          </div>
        )}
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-6 px-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm font-medium">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 hover:border-slate-600 transition-colors"
              aria-label="Filter by status"
            >
              <option value="all">All</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm font-medium">Difficulty:</span>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 hover:border-slate-600 transition-colors"
              aria-label="Filter by difficulty"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All' : diff}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm font-medium">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 hover:border-slate-600 transition-colors"
              aria-label="Filter by category"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm font-medium">Langs&Techs:</span>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 hover:border-slate-600 transition-colors"
              aria-label="Filter by language"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All' : lang}
                </option>
              ))}
            </select>
          </div>

          {(filterDifficulty !== 'all' || filterLanguage !== 'all' || filterCategory !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setFilterDifficulty('all');
                setFilterLanguage('all');
                setFilterCategory('all');
                setFilterStatus('all');
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="text-center mb-4">
          <p className="text-slate-400 text-sm">
            Showing {indexOfFirstProblem + 1}-{Math.min(indexOfLastProblem, filteredProblems.length)} of {filteredProblems.length} problems
          </p>
        </div>

        <table className='text-sm text-left sm:w-9/12 w-full min-w-[600px] mx-auto bg-slate-800/50 rounded-xl shadow-xl border border-slate-700'>
          <thead className='text-xs text-slate-300 uppercase border-b border-slate-700'>
            <tr className='bg-gradient-to-r from-indigo-600/20 to-purple-600/20'>
              <th scope='col' className='px-1 py-3 w-[50px] font-medium'>Status</th>
              <th scope='col' className='px-3 sm:px-6 py-3 font-medium'>Title</th>
              <th scope='col' className='px-3 sm:px-6 py-3 w-[100px] font-medium'>Difficulty</th>
              <th scope='col' className='px-3 sm:px-6 py-3 w-[100px] font-medium hidden sm:table-cell'>Category</th>
              <th scope='col' className='px-3 sm:px-6 py-3 w-[90px] font-medium hidden md:table-cell'>Langs&Techs</th>
              <th scope='col' className='px-3 sm:px-6 py-3 w-[90px] font-medium'>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {currentProblems.map((problem: Problem, idx: number) => {
              let difficultyColor = "text-red-400";
              if (problem.difficulty === "Easy") difficultyColor = "text-green-400";
              else if (problem.difficulty === "Medium") difficultyColor = "text-yellow-400";
              const isSolved = solvedSlugs.has(problem.slug);
              return (
                <tr className={`${idx % 2 == 1 ? "bg-slate-800/30" : ""} border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors`} key={problem.id}>
                  <td className='px-2 py-4 font-medium whitespace-nowrap text-green-400 text-center'>
                    {isSolved ? (<BsCheckCircle fontSize={"18"} width='18' />) : (<BsCircle fontSize={"18"} width='18' />)}
                  </td>
                  <td className='px-3 sm:px-6 py-4 text-slate-200'>
                    <Link className='hover:text-indigo-400 cursor-pointer transition-colors' href={`/problems/${problem.slug}`}>
                      {problem.title}
                    </Link>
                  </td>
                  <td className={`px-3 sm:px-6 py-4 ${difficultyColor} font-semibold`}>{problem.difficulty}</td>
                  <td className={'px-3 sm:px-6 py-4 hidden sm:table-cell text-slate-400'}>{problem.category}</td>
                  <td className={'px-3 sm:px-6 py-4 hidden md:table-cell text-slate-400'}>
                    {(() => {
                      if (problem.language === 'React') {
                        return (
                          <span className='text-xs bg-pink-600/20 text-pink-300 px-2 py-1 rounded-md font-medium'>
                            React
                          </span>
                        );
                      } else if (problem.language) {
                        return (
                          <span className='text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-md font-medium'>
                            {problem.language}
                          </span>
                        );
                      } else {
                        return (
                          <span className='text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-md font-medium'>
                            JavaScript
                          </span>
                        );
                      }
                    })()}
                  </td>
                  <td className={'px-3 sm:px-6 py-4'}>
                    <Link className='hover:text-purple-400 cursor-pointer text-xs sm:text-sm text-slate-300 transition-colors font-medium' href={`/problems/${problem.slug}/explanation`}>
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {getPageNumbers().map((page, idx) => (
              page === '...' ? (
                <span key={`ellipsis-${page}-${idx}`} className="px-2 text-slate-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              )
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
  );
};
export default Problems;

const useSolvedSlugs = (): [Set<string>, React.Dispatch<React.SetStateAction<Set<string>>>] => {
  const [setSolved, setSetSolved] = useState<Set<string>>(new Set());
  useEffect(() => {
    const next = new Set<string>();
    for (const p of problemsList) {
      const val = localStorage.getItem(`solved-${p.slug}`);
      if (val !== null) next.add(p.slug);
    }
    setSetSolved(next);
  }, []);
  return [setSolved, setSetSolved];
};