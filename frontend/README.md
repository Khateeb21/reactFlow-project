# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



INITIAL CODE RIGHT 


BASENODE.JS 

import React from 'react';
import { Handle, Position } from 'reactflow';

console.log('🚀 BaseNode.js FILE IS LOADING!');

const BaseNode = ({ id, data, selected, type, config, ...rest }) => {
   console.log('🎨 BaseNode RENDERING:', { id, type, config, hasConfig: !!config });
  // Extract from config
  const {
    label,
    icon,
    inputs = [],
    outputs = [],
    content: Content,
    style
  } = config;

  console.log(config);

  // Node styling
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
    ...style // Override with config style
  };

  // Get onChange from props
  const handleDataChange = (newData) => {
    if (rest.onChange) {
      rest.onChange({
        id,
        type,
        data: { ...data, ...newData }
      });
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

  
      {inputs.map((input, index) => {
        const handleId =
          typeof input === 'string' ? input : input.id;

        const handleLabel =
          typeof input === 'string'
            ? input
            : input.label || handleId;

        return (
          <div key={`input-${handleId}`} style={{ position: 'relative' }}>
            <Handle
              type="target"
              position={Position.Left}
              id={handleId}
              style={{
                top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
                background: '#666',
                width: '8px',
                height: '8px',
                ...config.handleStyle?.input
              }}
            />

            <span
              style={{
                position: 'absolute',
                left: '25px',
                top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: '11px',
                color: '#666'
              }}
            >
              {handleLabel}
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
      {outputs.map((output, index) => {
        const handleId =
          typeof output === 'string' ? output : output.id;

        const handleLabel =
          typeof output === 'string'
            ? output
            : output.label || handleId;

        return (
          <div key={`output-${handleId}`} style={{ position: 'relative' }}>
            <Handle
              type="source"
              position={Position.Right}
              id={handleId}
              style={{
                top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
                background: '#666',
                width: '8px',
                height: '8px',
                ...config.handleStyle?.output
              }}
            />

            <span
              style={{
                position: 'absolute',
                right: '25px',
                top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: '11px',
                color: '#666',
                textAlign: 'right'
              }}
            >
              {handleLabel}
            </span>
          </div>
        );
      })}

      {/* Node ID badge (optional) */}
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