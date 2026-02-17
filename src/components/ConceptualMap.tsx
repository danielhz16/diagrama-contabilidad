import {
    ReactFlow,
    Controls,
    Background,
    ReactFlowProvider,
    type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import InfoMenu from './InfoMenu';
import DetailModal from './DetailModal';
import { RotateCcw, ChevronUp, ChevronDown, Sun, Moon } from 'lucide-react';
import { useMap } from '../hooks/useMap';

const nodeTypes: NodeTypes = {
    accounting: CustomNode,
};

function Flow() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onReconnect,
        onReconnectStart,
        onReconnectEnd,
        onNodeClick,
        resetNodes,
        scrollToTop,
        scrollToBottom,
        handleInteraction,
        selectedPrinciple,
        setSelectedPrinciple,
        isDarkMode,
        toggleDarkMode,
        menuRef,
        exportToPPTX,
        exportToPDF,
        isMobile,
    } = useMap();

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onNodeClick={onNodeClick}
            deleteKeyCode={["Backspace", "Delete"]}
            nodeTypes={nodeTypes}
            onMoveStart={handleInteraction}
            onNodeDragStart={handleInteraction}
            fitView
            fitViewOptions={isMobile ? {
                nodes: [{ id: 'main' }],
                padding: 0.5,
                duration: 800
            } : {
                padding: 0.2
            }}
            proOptions={{ hideAttribution: true }}
            style={{
                width: '100vw',
                height: '100vh',
                background: isDarkMode ? '#0f172a' : '#f8fafc',
                position: 'relative',
                transition: 'background 0.3s ease',
            }}
        >
            <Background color={isDarkMode ? "#334155" : "#cbd5e1"} gap={20} />
            <Controls showInteractive={false} />

            <InfoMenu
                ref={menuRef}
                onExport={exportToPPTX}
                onExportPDF={exportToPDF}
                isDarkMode={isDarkMode}
            />

            <DetailModal
                principle={selectedPrinciple}
                onClose={() => setSelectedPrinciple(null)}
                isDarkMode={isDarkMode}
            />

            {isMobile && (
                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    right: '25px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <button
                        onClick={scrollToTop}
                        style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '14px',
                            color: '#f8fafc',
                            cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <ChevronUp size={24} />
                    </button>
                    <button
                        onClick={scrollToBottom}
                        style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '14px',
                            color: '#f8fafc',
                            cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <ChevronDown size={24} />
                    </button>
                </div>
            )}

            <div style={{
                position: 'absolute',
                top: isMobile ? '80px' : '20px',
                right: isMobile ? '20px' : '30px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        resetNodes();
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'rgba(30, 41, 59, 0.7)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <RotateCcw size={18} />
                    Reiniciar Posiciones
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDarkMode();
                    }}
                    title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                    style={{
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isDarkMode
                            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                            : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: isDarkMode ? '#fbbf24' : '#fff',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: 0
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 15px 20px -5px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    {isDarkMode ? (
                        <Sun size={28} strokeWidth={2.5} fill="currentColor" fillOpacity={0.4} />
                    ) : (
                        <Moon size={28} strokeWidth={2.5} fill="#fff" fillOpacity={0.4} />
                    )}
                </button>
            </div>
        </ReactFlow>
    );
}

export default function App() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}
