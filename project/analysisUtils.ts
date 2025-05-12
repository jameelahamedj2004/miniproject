export const analyzeText = (title: string, content: string): AnalysisResult => {
  const clickbaitPatterns = [
    /you won't believe/i,
    /shocking/i,
    /amazing/i,
    /mind-blowing/i,
    /\?\?\?/,
    /!!!/
  ];

  const emotionalWords = [
    /outrage/i,
    /scandal/i,
    /unbelievable/i,
    /incredible/i,
    /shocking/i
  ];

  const hasClickbait = clickbaitPatterns.some(pattern => 
    pattern.test(title) || pattern.test(content)
  );

  const hasEmotionalLanguage = emotionalWords.some(pattern =>
    pattern.test(content)
  );

  const hasSourceCitation = /\b(according to|sources say|reported by)\b/i.test(content);
  const hasDate = /\b\d{4}\b/.test(content) || /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(content);

  let credibilityScore = 100;
  const suggestions: string[] = [];

  if (hasClickbait) {
    credibilityScore -= 25;
    suggestions.push("The title appears to use clickbait tactics");
  }

  if (hasEmotionalLanguage) {
    credibilityScore -= 15;
    suggestions.push("The content contains emotional or sensational language");
  }

  if (!hasSourceCitation) {
    credibilityScore -= 30;
    suggestions.push("No clear source citations found");
  }

  if (!hasDate) {
    credibilityScore -= 10;
    suggestions.push("No clear date reference found");
  }

  return {
    credibilityScore: Math.max(0, credibilityScore),
    factors: {
      clickbait: hasClickbait,
      emotionalLanguage: hasEmotionalLanguage,
      sourceCitation: hasSourceCitation,
      datePresent: hasDate
    },
    suggestions,
    statements: []
  };
};

export const verifyStatement = (statement: string, content: string): StatementAnalysis => {
  // Simple keyword matching for demonstration
  const statementWords = statement.toLowerCase().split(/\W+/).filter(Boolean);
  const contentWords = content.toLowerCase().split(/\W+/).filter(Boolean);
  
  const matchingWords = statementWords.filter(word => contentWords.includes(word));
  const confidence = (matchingWords.length / statementWords.length) * 100;
  
  // For demonstration purposes, we'll consider a statement true if it has >70% word match
  const isTrue = confidence > 70;
  
  return {
    statement,
    isTrue,
    confidence: Math.round(confidence),
    explanation: isTrue
      ? "This statement appears to be supported by the content."
      : "This statement may not be accurately represented in the content."
  };
};