import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface Props {
  result: AnalysisResult;
}

export const AnalysisResultDisplay: React.FC<Props> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 40) return <Info className="w-6 h-6 text-yellow-600" />;
    return <AlertTriangle className="w-6 h-6 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center gap-4 mb-4">
        {getScoreIcon(result.credibilityScore)}
        <h2 className="text-2xl font-bold">
          Credibility Score:{' '}
          <span className={getScoreColor(result.credibilityScore)}>
            {result.credibilityScore}%
          </span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Analysis Factors:</h3>
          <ul className="space-y-2">
            {Object.entries(result.factors).map(([factor, value]) => (
              <li key={factor} className="flex items-center gap-2">
                {value ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                <span className="capitalize">
                  {factor.replace(/([A-Z])/g, ' $1').trim()}: {value ? 'Detected' : 'Not Detected'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {result.suggestions.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Suggestions for Improvement:</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};