import React from 'react';

import { nodeConfigs } from './nodeConfig';

import BaseNode from './baseNode';


export const createNodeComponent = (configKey) => {
    


   
  const config = nodeConfigs[configKey];


  if (!config) {
    console.error(`Config not found for node type: ${configKey}`);
    return () => (
      <div style={{ padding: 10, background: '#ffebee', border: '2px dashed #f44336', borderRadius: 5 }}>
        <strong>Error: Node type "{configKey}" not found</strong>
      </div>
    );
  }

  const validateConfig = (config, configKey) => {
    if (!config.label) console.warn(`${configKey}: Missing label`);
    if (!config.content) console.warn(`${configKey}: Missing content component`);
    if (!config.inputs && !config.outputs) console.warn(`${configKey}: No inputs or outputs defined`);
  };
  validateConfig(config, configKey)


  const NodeComponent = React.memo((props) => {
    const currentConfig = nodeConfigs[configKey];
    return <BaseNode {...props} config={currentConfig} type={configKey} />;
  });
   

  return NodeComponent;
};
//  helper function  


export const createAllNodeComponents = () => {
  const components = {};
  Object.keys(nodeConfigs).forEach(configKey => {
   
    components[configKey] = createNodeComponent(configKey);
  });
  console.log(components)
  return components;
};
export const nodeComponents = createAllNodeComponents();
console.log('🎁 Final nodeComponents:', nodeComponents);

