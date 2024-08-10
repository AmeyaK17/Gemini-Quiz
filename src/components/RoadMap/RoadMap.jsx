import React, { useContext, useCallback, useState, useEffect } from 'react'
import { GeminiContext } from '../GeminiContext/GeminiContext'
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
  } from '@xyflow/react';
import './RoadMap.css'
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const RoadMap = () => {
    const {setUploadedImage, uploadedImageForRoadmap, roadmapData, topicForRoadMap} = useContext(GeminiContext)

    const { nodes, edges } = roadmapData;

    const [newNodes, setNodes] = useState(nodes || []);
    const [newEdges, setEdges] = useState(edges || []);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const handleFileChange = (event) => {
        setUploadedImage(event.target.files[0])
    }

    const handleUpload = async () => {
        await uploadedImageForRoadmap()
    }

    const handleDoubleClick = (topic) => {
        topicForRoadMap(topic)
    }
    

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, edges]);

    const nodeTypes = {
        custom: (props) => <CustomNode {...props} onDoubleClick={handleDoubleClick} />
    };

  return (
    <div className='roadmap-home'>
        <div className='roadmap-action-bar'>
            <h2>Upload photo of your topics: </h2>
            <input className='file-input-wrapper' type="file" onChange={handleFileChange} accept="image/*" />
            <button className='upload-button' onClick={handleUpload}>Upload</button>

            <p>Double Click on a topic to get a more in-depth roadmap!</p>
        </div>

        <div className='roadmap-graph-wrapper'>
            <div className='roadmap-graph-container'>
                <ReactFlow 
                    nodes={newNodes} 
                    onNodesChange={onNodesChange}
                    edges={newEdges}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    </div>
  )
}

export default RoadMap
