import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Process inline styles: bold, italic, inline code
  const applyInlineFormatting = (text: string): React.ReactNode[] => {
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|_([^_]+)_|`[^`]+`)/g;
    const parts = text.split(regex);

    return parts.filter(part => part && part.length > 0).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-gray-200 dark:bg-gray-700 rounded px-1.5 py-1 text-sm font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const elements: React.ReactNode[] = [];
  const lines = content.split('\n');
  
  let inCodeBlock = false;
  let codeBlockContent = '';
  let listType: 'ul' | 'ol' | null = null;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      const listKey = `list-${elements.length}`;
      if (listType === 'ul') {
        elements.push(<ul key={listKey} className="list-disc list-inside my-2 pl-4 space-y-1">{listItems}</ul>);
      } else if (listType === 'ol') {
        elements.push(<ol key={listKey} className="list-decimal list-inside my-2 pl-4 space-y-1">{listItems}</ol>);
      }
      listItems = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      flushList();
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 my-2 overflow-x-auto text-sm">
            <code>{codeBlockContent.trimEnd()}</code>
          </pre>
        );
        codeBlockContent = '';
      }
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      return;
    }
    
    if (line.startsWith('#')) {
      flushList();
      const level = line.match(/^#+/)?.[0].length;
      const text = line.replace(/^#+\s*/, '');
      const content = applyInlineFormatting(text);
      if (level === 1) elements.push(<h1 key={index} className="text-2xl font-bold mt-6 mb-2 pb-1 border-b dark:border-gray-600">{content}</h1>);
      else if (level === 2) elements.push(<h2 key={index} className="text-xl font-bold mt-5 mb-2">{content}</h2>);
      else if (level === 3) elements.push(<h3 key={index} className="text-lg font-bold mt-4 mb-2">{content}</h3>);
      else elements.push(<h4 key={index} className="text-base font-bold mt-3 mb-2">{content}</h4>);
      return;
    }

    const ulMatch = line.match(/^(\s*[-*]\s)(.*)/);
    if (ulMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(<li key={index}>{applyInlineFormatting(ulMatch[2])}</li>);
      return;
    }

    const olMatch = line.match(/^(\s*\d+\.\s)(.*)/);
    if (olMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
// FIX: Corrected typo in function name from applyInlineformatting to applyInlineFormatting.
      listItems.push(<li key={index}>{applyInlineFormatting(olMatch[2])}</li>);
      return;
    }

    flushList();
    
    if (line.trim()) {
      elements.push(<p key={index} className="my-1">{applyInlineFormatting(line)}</p>);
    }
  });

  flushList();
  if (inCodeBlock) {
      elements.push(
        <pre key="code-final" className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 my-2 overflow-x-auto text-sm">
          <code>{codeBlockContent.trimEnd()}</code>
        </pre>
      );
  }

  return (
    <div className="max-w-none whitespace-pre-wrap leading-relaxed text-left">
      {elements}
    </div>
  );
};

export default MarkdownRenderer;
