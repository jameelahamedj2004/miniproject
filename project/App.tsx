import React, { useState } from 'react';
import { Newspaper, Shield } from 'lucide-react';
import clsx from 'clsx';
import { TextInput } from './components/TextInput';
import { AnalysisResultDisplay } from './components/AnalysisResult';
import { StatementAnalyzer } from './components/StatementAnalysis';
import { analyzeText, verifyStatement } from './utils/analysisUtils';
import type { AnalysisResult, StatementAnalysis } from './types';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [statements, setStatements] = useState<StatementAnalysis[]>([]);

  const handleAnalyze = () => {
    if (title && content) {
      const analysisResult = analyzeText(title, content);
      setResult(analysisResult);
      setStatements([]);
    }
  };

  const handleAddStatement = (statement: string) => {
    if (content) {
      const analysis = verifyStatement(statement, content);
      setStatements([...statements, analysis]);
    }
  };

  const handleRemoveStatement = (index: number) => {
    setStatements(statements.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Fake News Detection System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Article Analysis</h2>
          </div>

          <TextInput
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
          />

          <button
            onClick={handleAnalyze}
            disabled={!title || !content}
            className={clsx(
              "mt-6 px-6 py-2 rounded-md text-white font-medium",
              "transition-colors duration-200",
              title && content
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            )}
          >
            Analyze Article
          </button>
        </div>

        {result && (
          <>
            <AnalysisResultDisplay result={result} />
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Statement Verification</h2>
              <StatementAnalyzer
                statements={statements}
                onAddStatement={handleAddStatement}
                onRemoveStatement={handleRemoveStatement}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;