import React, { useState } from "react";

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="relative bg-gray-900 text-white p-4 rounded-lg shadow-lg w-full h-96">
      {/* Header with Copy Button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-purple-400">Text Editor</h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 text-sm font-medium rounded-md shadow-md transition-all ${
            isCopied
              ? "bg-green-500 text-white"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Text Editor Area */}
      <textarea
        className="w-full h-full bg-gray-800 text-gray-200 p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit your document here..."
      ></textarea>
    </div>
  );
};
