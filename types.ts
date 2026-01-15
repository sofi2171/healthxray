// Added React import to resolve React namespace in TypeScript
import React from 'react';

export interface HealthTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

export interface Article {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface AISymptomResult {
  analysis: string;
  suggestions: string[];
  disclaimer: string;
}