import React from 'react';
import { Handle } from '@xyflow/react';
import './CustomNode.css'

const CustomNode = ({ data, onDoubleClick}) => {
    return (
        <div 
            onDoubleClick={() => onDoubleClick(data.label)}
            className='custom-node'
        >
            {data.label}
            <Handle type="source" position="bottom" id="source" />
            <Handle type="target" position="bottom" id="target" />
        </div>
    );
};

export default CustomNode;