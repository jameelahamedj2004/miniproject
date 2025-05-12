export interface Article {
  id: string;
  title: string;
  content: string;
  source?: string;
  date?: string;
  credibilityScore?: number;
}

export interface AnalysisResult {
  credibilityScore: number;
  factors: {
    clickbait: boolean;
    emotionalLanguage: boolean;
    sourceCitation: boolean;
    datePresent: boolean;
  };
  suggestions: string[];
  statements?: StatementAnalysis[];
}

export interface StatementAnalysis {
  statement: string;
  isTrue: boolean | null;
  confidence: number;
  explanation: string;
}