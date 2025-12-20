// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
           <DraggableNode type='inputNode' label='Input' />
                <DraggableNode type='llmNode' label='LLM' />
                <DraggableNode type='outputNode' label='Output' />
                <DraggableNode type='textNode' label='Text' />
                <DraggableNode type='delayNode' label='Delay' />
                <DraggableNode type='filterNode' label='Filter' />
                <DraggableNode type='mergeNode' label='Merge' />
                <DraggableNode type='splitNode' label='Split' />
                <DraggableNode type='transformNode' label='Transform' />
            </div>
        </div>
    );
};
