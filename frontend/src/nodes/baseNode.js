import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, data, selected, type, config, ...rest }) => {
  const {
    label,
    icon,
    inputs = [],
    outputs = [],
    content: Content,
    style
  } = config;

  // Allow content component to override handles dynamically
  console.log('BaseNode dynamicInputs:', data?.dynamicInputs);
  const dynamicInputs = data?.dynamicInputs || inputs;
  const dynamicOutputs = data?.dynamicOutputs || outputs;

 
  console.log(dynamicInputs)

  const nodeStyle = {
    border: selected ? '2px solid #0066ff' : '1px solid #ccc',
    padding: '12px',
    borderRadius: '8px',
    background: 'white',
    minWidth: '200px',
    boxShadow: selected
      ? '0 0 10px rgba(0,102,255,0.2)'
      : '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    ...style
  };

 const handleDataChange = (newData) => {

    if (data?.onChange) {
      data.onChange(newData); 
    }
  };

  return (
    <div className="base-node" style={nodeStyle}>
      {/* Header with icon and label */}
      <div
        className="node-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid #eee'
        }}
      >
        {icon && (
          <span style={{ marginRight: '8px', fontSize: '16px' }}>
            {icon}
          </span>
        )}
        <span
          style={{
            fontWeight: '600',
            fontSize: '14px',
            color: '#333'
          }}
        >
          {label}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '10px',
            color: '#999',
            background: '#f5f5f5',
            padding: '2px 6px',
            borderRadius: '10px'
          }}
        >
          {id.substring(0, 4)}
        </span>
      </div>

      {/* Input Handles - Use dynamic inputs */}
      {dynamicInputs.map(({id,label},index) => {
        const length = Object.keys(dynamicInputs).length;
        console.log(length)
        console.log(index)
        // const handleId = typeof input === 'string' ? input : input.id;
        // const handleLabel = typeof input === 'string' ? input : input.label || handleId;
  const top = `${((index+3  ) / (length +2)) * 100}%`;
        return (
          <div key={`input-${id}`} style={{ position: 'relative',   }}>
            <Handle
              type="target"
              position={Position.Left}
              id={id}
              style={{
                position:"absolute",
                top,
                background: '#666',
                width: '8px',
                height: '8px',
              
                ...config.handleStyle?.input
              }}
            />
            <span
              style={{
                position: 'relative',
                left: '10px',
                top,
                transform: 'translateY(-50%)',
                fontSize: '11px',
                color: '#666',
                background: 'white',
                padding: '0 4px',
                borderRadius: '2px',
            
             
              }}
            >
              {label}
            </span>
          </div>
        );
      })}

      {/* Node Content Area */}
      <div className="node-content" style={{ margin: '12px 0' }}>
        {Content && (
          <Content
            id={id}
            data={data || {}}
            onChange={handleDataChange}
            selected={selected}
          />
        )}
      </div>

      {/* Output Handles */}
      {dynamicOutputs.map((output, index) => {
        const handleId = typeof output === 'string' ? output : output.id;
        const handleLabel = typeof output === 'string' ? output : output.label || handleId;

        return (
          <div key={`output-${handleId}`} style={{ position: 'relative' }}>
            <Handle
              type="source"
              position={Position.Right}
              id={handleId}
              style={{
                top: `${((index + 1) / (dynamicOutputs.length + 1)) * 100}%`,
                background: '#666',
                width: '8px',
                height: '8px',
                ...config.handleStyle?.output
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '15px',
                top: `${((index + 1) / (dynamicOutputs.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: '11px',
                color: '#666',
                textAlign: 'right',
                background: 'white',
                padding: '0 4px',
                borderRadius: '2px'
              }}
            >
              {handleLabel}
            </span>
          </div>
        );
      })}

      {selected && (
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '9px',
            color: '#999',
            whiteSpace: 'nowrap'
          }}
        >
          {type}
        </div>
      )}
    </div>
  );
};

export default React.memo(BaseNode);