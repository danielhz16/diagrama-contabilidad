import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export type CustomNodeData = {
    title: string;
    content: string;
    color: string;
};

export type AccountingNode = Node<CustomNodeData, 'accounting'>;

const CustomNode = ({ data, selected }: NodeProps<AccountingNode>) => {
    const { isDarkMode } = useTheme();
    const isLightMode = !isDarkMode;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            style={{
                background: isLightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: selected ? `2px solid ${data.color}` : (isLightMode ? `1px solid ${data.color}44` : `1px solid ${data.color}22`),
                padding: '1px',
                boxShadow: isLightMode
                    ? `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
                    : `0 8px 32px 0 ${data.color}22`,
                minWidth: '220px',
                maxWidth: '280px',
                color: isLightMode ? '#1e293b' : '#fff',
                overflow: 'hidden',
                position: 'relative',
                transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease'
            }}
        >
            <div
                style={{
                    background: `linear-gradient(135deg, ${data.color}, ${data.color}dd)`,
                    padding: '12px 16px',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                {data.title}
            </div>

            <div style={{
                padding: '16px',
                fontSize: '1.3rem',
                lineHeight: '1.5',
                color: isLightMode ? '#475569' : 'rgba(255,255,255,0.9)',
                fontWeight: isLightMode ? '500' : 'normal',
            }}>
                {data.content}
            </div>

            <Handle
                type="target"
                position={Position.Top}
                style={{ background: data.color, border: 'none', width: '8px', height: '8px' }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: data.color, border: 'none', width: '8px', height: '8px' }}
            />
        </motion.div>
    );
};

export default React.memo(CustomNode);
