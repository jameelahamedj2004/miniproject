import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { StatementAnalysis } from '../types';

interface Props {
  statements: StatementAnalysis[];
  onAddStatement: (statement: string) => void;
  onRemoveStatement: (index: number) => void;
}

export const StatementAnalyzer: React.FC<Props> = ({
  statements,
  onAddStatement,
  onRemoveStatement,
}) => {
  const [newStatement, setNewStatement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStatement.trim()) {
      onAddStatement(newStatement.trim());
      setNewStatement('');
    }
  };

  const getVerificationIcon = (isTrue: boolean | null) => {
    if (isTrue === null) return <HelpCircle className="w-5 h-5 text-gray-400" />;
    return isTrue ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newStatement}
          onChange={(e) => setNewStatement(e.target.value)}
          placeholder="Enter a statement to verify..."
          className={clsx(
            "flex-1 px-4 py-2 border rounded-md",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "placeholder:text-gray-400"
          )}
        />
        <button
          type="submit"
          disabled={!newStatement.trim()}
          className={clsx(
            "px-4 py-2 rounded-md",
            "flex items-center gap-2",
            newStatement.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      {statements.length > 0 && (
        <div className="space-y-4">
          {statements.map((statement, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {getVerificationIcon(statement.isTrue)}
                  <span className="font-medium">{statement.statement}</span>
                </div>
                <button
                  onClick={() => onRemoveStatement(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {statement.isTrue !== null && (
                <div className="ml-8 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Confidence: </span>
                    <span className="font-medium">{statement.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{statement.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};