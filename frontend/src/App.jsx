import React, { useState } from 'react';
import { processGraphData } from './utils/api';
import TreeViewer from './components/TreeViewer';
import { Loader2, Play, AlertCircle, CheckCircle2, User, Mail, GraduationCap, FolderOpen, Trash2, Code, Copy, Check } from 'lucide-react';

function App() {
  const [inputVal, setInputVal] = useState('[\n  "A->B",\n  "A->C",\n  "B->D"\n]');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    setInputVal('');
    setError(null);
    setResult(null);
    setShowRawJson(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleProcess = async () => {
    setError(null);
    setResult(null);
    setShowRawJson(false);

    if (!inputVal.trim()) {
      setError("Input cannot be empty. Please enter a valid JSON array.");
      return;
    }

    let parsedArray;
    try {
      parsedArray = JSON.parse(inputVal);
      if (!Array.isArray(parsedArray)) {
        throw new Error("Input must be a JSON array of strings.");
      }
    } catch (e) {
      setError("Invalid JSON format. Please ensure it is a valid array of strings. Example: [\"A->B\"]");
      return;
    }

    setLoading(true);
    try {
      const data = await processGraphData(parsedArray);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-darkborder">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transform -rotate-6">
              <span className="text-black font-heading font-bold text-2xl tracking-tighter">B</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
              Bajaj Finserv
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bold-panel flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Play size={24} className="text-primary" />
                <h2 className="text-2xl font-semibold">Input Data</h2>
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  className="dark-input h-72 resize-none leading-relaxed"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="[\n  &quot;A-&gt;B&quot;,\n  &quot;A-&gt;C&quot;,\n  &quot;B-&gt;D&quot;\n]"
                  spellCheck="false"
                />
                <p className="text-base font-medium text-gray-500 mt-1">
                  Enter array of node relationships in format X-&gt;Y
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-950/40 border border-red-900 rounded-xl flex gap-3 items-start text-red-400 text-base">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-4 mt-2">
                <button
                  onClick={handleProcess}
                  disabled={loading}
                  className="primary-btn text-lg"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle2 size={24} />}
                  {loading ? "Processing..." : "Process Graph"}
                </button>
                <button
                  onClick={handleClear}
                  disabled={loading}
                  className="secondary-btn text-lg"
                >
                  <Trash2 size={22} />
                  Clear Input
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8">
            {!result ? (
              <div className="h-full min-h-[500px] bold-panel flex flex-col items-center justify-center text-center text-gray-600 border-dashed border-2 border-darkborder bg-transparent hover:translate-y-0 hover:shadow-none">
                <FolderOpen size={64} className="mb-6 opacity-40 text-gray-500" />
                <h3 className="text-2xl font-medium text-gray-400">No Data Processed</h3>
                <p className="mt-3 text-lg max-w-md text-gray-500">Provide a JSON array of directed edges and hit Process Graph to generate the hierarchy.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">

                {/* Results Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl font-heading font-bold text-white">Analysis Results</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowRawJson(!showRawJson)}
                      className="action-btn text-base"
                    >
                      <Code size={18} className={showRawJson ? "text-primary" : "text-gray-400"} />
                      {showRawJson ? "View UI" : "View Raw JSON"}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="action-btn text-base"
                    >
                      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-accent" />}
                      {copied ? "Copied!" : "Copy Output"}
                    </button>
                  </div>
                </div>

                {showRawJson ? (
                  <div className="bold-panel overflow-x-auto bg-[#161616]">
                    <pre className="text-lg font-mono text-gray-300 leading-relaxed">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Identity & Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="bold-panel border-l-4 border-l-primary">
                        <h3 className="text-sm tracking-widest font-heading font-bold text-gray-500 uppercase mb-5">Identity Card</h3>
                        <div className="space-y-4 text-lg">
                          <p className="flex items-center gap-3"><User size={20} className="text-primary" /> <span className="font-semibold text-white">{result.user_id}</span></p>
                          <p className="flex items-center gap-3"><Mail size={20} className="text-accent" /> <span className="text-gray-300">{result.email_id}</span></p>
                          <p className="flex items-center gap-3"><GraduationCap size={20} className="text-white" /> <span className="text-gray-300">Roll: {result.college_roll_number}</span></p>
                        </div>
                      </div>

                      <div className="bold-panel border-l-4 border-l-accent">
                        <h3 className="text-sm tracking-widest font-heading font-bold text-gray-500 uppercase mb-5">Summary Stats</h3>
                        <div className="grid grid-cols-3 gap-4 text-center mt-2">
                          <div className="bg-[#161616] rounded-xl p-4 transition-transform hover:scale-105 border border-darkborder hover:border-accent/50">
                            <p className="text-3xl font-bold text-accent">{result.summary?.total_trees || 0}</p>
                            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mt-2">Trees</p>
                          </div>
                          <div className="bg-[#161616] rounded-xl p-4 transition-transform hover:scale-105 border border-darkborder hover:border-accent/50">
                            <p className="text-3xl font-bold text-accent">{result.summary?.total_cycles || 0}</p>
                            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mt-2">Cycles</p>
                          </div>
                          <div className="bg-[#161616] rounded-xl p-4 transition-transform hover:scale-105 border border-darkborder hover:border-primary/50">
                            <p className="text-2xl font-bold text-primary flex items-center justify-center h-9">{result.summary?.largest_tree_root || '-'}</p>
                            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mt-2">Max Root</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edge Cases */}
                    {(result.invalid_entries?.length > 0 || result.duplicate_edges?.length > 0) && (
                      <div className="bold-panel space-y-6">
                        {result.invalid_entries?.length > 0 && (
                          <div>
                            <h4 className="text-lg font-heading font-semibold mb-3 text-gray-400">Invalid Entries</h4>
                            <div className="flex flex-wrap gap-3">
                              {result.invalid_entries.map((entry, i) => (
                                <span key={`inv-${i}`} className="px-4 py-2 bg-red-950/50 text-red-400 text-base font-mono rounded-xl border border-red-900/50 shadow-sm">
                                  {entry}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.duplicate_edges?.length > 0 && (
                          <div>
                            <h4 className="text-lg font-heading font-semibold mb-3 text-gray-400">Duplicate Edges</h4>
                            <div className="flex flex-wrap gap-3">
                              {result.duplicate_edges.map((entry, i) => (
                                <span key={`dup-${i}`} className="px-4 py-2 bg-yellow-950/40 text-accent text-base font-mono rounded-xl border border-yellow-900/50 shadow-sm">
                                  {entry}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hierarchies */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                        Graph Hierarchies
                      </h3>
                      {(!result.hierarchies || result.hierarchies.length === 0) ? (
                        <p className="text-gray-500 italic text-lg">No hierarchies generated.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {result.hierarchies.map((hierarchy, idx) => (
                            <TreeViewer key={`tree-${idx}`} hierarchy={hierarchy} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
