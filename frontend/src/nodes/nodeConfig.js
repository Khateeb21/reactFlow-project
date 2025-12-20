
import  { useState, useEffect, useRef } from 'react';
// Content Components (unique logic for each node)
const InputContent = ({ id, data, onChange }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange({ text: e.target.value });
    }
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Input Text:
      </label>
      <input
        type="text"
        value={data?.text || ''}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px'
        }}
      />
    </div>
  );
};

const TextContent = ({ id, data, onChange }) => {
  const [text, setText] = useState(data?.text || '');
  const textareaRef = useRef(null);

  // Extract variables from text using {{ variable }} pattern
  const extractVariables = (text) => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    
    while ((match = variablePattern.exec(text)) !== null) {
      variables.add(match[1].trim());
    }
    
    return Array.from(variables);
  };

  // Auto-resize textarea
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      
      // Also adjust width based on content
      textarea.style.width = 'auto';
      const newWidth = Math.max(200, Math.min(600, textarea.scrollWidth + 20));
      textarea.style.width = `${newWidth}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Extract variables and create dynamic input handles
    const variables = extractVariables(newText);
    const dynamicInputs = variables.map(varName => ({
      id: varName,
      label: varName
    }));
    
    // Update node data with text and dynamic inputs
    onChange({
      text: newText,
      dynamicInputs: dynamicInputs
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text... Use {{ variableName }} for inputs"
        style={{
          width: '200px',
          minHeight: '60px',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '13px',
          fontFamily: 'monospace',
          resize: 'none',
          overflow: 'hidden',
          lineHeight: '1.5',
          marginTop:"20px"
        }}
      />
      
      {/* Show detected variables */}
      {extractVariables(text).length > 0 && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '10px', 
          color: '#666',
          background: '#f5f5f5',
          padding: '4px 6px',
          borderRadius: '3px'
        }}>
          Variables: {extractVariables(text).join(', ')}
        </div>
      )}
    </div>
  );
};

// Add 5 new nodes as requested:
const TransformContent = ({ data, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Operation:
      </label>
      <select
        value={data?.operation || 'uppercase'}
        onChange={(e) => onChange?.({ operation: e.target.value })}
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px'
        }}
      >
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="reverse">Reverse</option>
        <option value="capitalize">Capitalize</option>
      </select>
    </div>
  );
};

const FilterContent = ({ data, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Filter Type:
      </label>
      <select
        value={data?.filterType || 'contains'}
        onChange={(e) => onChange?.({ filterType: e.target.value })}
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          marginBottom: '8px'
        }}
      >
        <option value="contains">Contains</option>
        <option value="startsWith">Starts With</option>
        <option value="endsWith">Ends With</option>
        <option value="regex">Regex</option>
      </select>
      <input
        type="text"
        value={data?.filterValue || ''}
        onChange={(e) => onChange?.({ filterValue: e.target.value })}
        placeholder="Filter value"
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px'
        }}
      />
    </div>
  );
};

const DelayContent = ({ data, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Delay (ms): {data?.delay || 1000}
      </label>
      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        value={data?.delay || 1000}
        onChange={(e) => onChange?.({ delay: parseInt(e.target.value) })}
        style={{
          width: '100%'
        }}
      />
      <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
        Adds processing delay
      </div>
    </div>
  );
};

const SplitContent = ({ data, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Split By:
      </label>
      <input
        type="text"
        value={data?.delimiter || ','}
        onChange={(e) => onChange?.({ delimiter: e.target.value })}
        placeholder="Delimiter"
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          marginBottom: '8px'
        }}
      />
      <div style={{ fontSize: '11px', color: '#666' }}>
        Splits input into multiple outputs
      </div>
    </div>
  );
};

const MergeContent = ({ data, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
        Merge Strategy:
      </label>
      <select
        value={data?.strategy || 'concat'}
        onChange={(e) => onChange?.({ strategy: e.target.value })}
        style={{
          width: '100%',
          padding: '6px',
          border: '1px solid #ddd',
          borderRadius: '3px'
        }}
      >
        <option value="concat">Concatenate</option>
        <option value="sum">Sum</option>
        <option value="average">Average</option>
        <option value="join">Join with delimiter</option>
      </select>
    </div>
  );
};

// Node Configurations
export const nodeConfigs = {
  inputNode: {
    label: 'Input',
    icon: '📥',
    inputs: [],
    outputs: [{ id: 'output', label: 'Output' }],
    content: InputContent,
    style: {
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
    }
  },

textNode: {
    label: 'Text',
    icon: '📝',
    inputs: [],  // ✅ Start with NO inputs - they're created dynamically
    outputs: [{ id: 'output', label: 'Output' }],
    content: TextContent,
    style: {
      background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)'
    }
},

  llmNode: {
    label: 'LLM',
    icon: '🤖',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' }
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    content: ({ data, onChange }) => (
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
          Model:
        </label>
        <select
          value={data?.model || 'GPT-3.5'}
          onChange={(e) => onChange?.({ model: e.target.value })}
          style={{
            width: '100%',
            padding: '6px',
            border: '1px solid #ddd',
            borderRadius: '3px'
          }}
        >
          <option value="GPT-3.5">GPT-3.5</option>
          <option value="GPT-4">GPT-4</option>
          <option value="Claude">Claude</option>
          <option value="Gemini">Gemini</option>
        </select>
      </div>
    ),
    style: {
      background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)'
    }
  },

  outputNode: {
    label: 'Output',
    icon: '📤',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [],
    content: ({ data }) => (
      <div style={{ 
        padding: '8px', 
        background: '#f5f5f5', 
        borderRadius: '3px',
        fontSize: '12px',
        color: '#666',
        minHeight: '40px'
      }}>
        {data?.value ? `Output: ${data.value}` : 'No output yet'}
      </div>
    ),
    style: {
      background: 'linear-gradient(135deg, #fff3e0, #ffcc80)'
    }
  },

  // New nodes (5 total including transform)
  transformNode: {
    label: 'Transform',
    icon: '🔄',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [{ id: 'output', label: 'Output' }],
    content: TransformContent,
    style: {
      background: 'linear-gradient(135deg, #fce4ec, #f8bbd9)'
    }
  },

  filterNode: {
    label: 'Filter',
    icon: '🔎',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [
      { id: 'matched', label: 'Matched' },
      { id: 'unmatched', label: 'Unmatched' }
    ],
    content: FilterContent,
    style: {
      background: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)'
    }
  },

  delayNode: {
    label: 'Delay',
    icon: '⏳',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [{ id: 'output', label: 'Output' }],
    content: DelayContent,
    style: {
      background: 'linear-gradient(135deg, #fff8e1, #ffecb3)'
    }
  },

  splitNode: {
    label: 'Split',
    icon: '↔️',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [
      { id: 'output1', label: 'Part 1' },
      { id: 'output2', label: 'Part 2' },
      { id: 'output3', label: 'Part 3' }
    ],
    content: SplitContent,
    style: {
      background: 'linear-gradient(135deg, #f1f8e9, #dcedc8)'
    }
  },

  mergeNode: {
    label: 'Merge',
    icon: '🔄',
    inputs: [
      { id: 'input1', label: 'Input 1' },
      { id: 'input2', label: 'Input 2' },
      { id: 'input3', label: 'Input 3' }
    ],
    outputs: [{ id: 'output', label: 'Output' }],
    content: MergeContent,
    style: {
      background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)'
    }
  }
};