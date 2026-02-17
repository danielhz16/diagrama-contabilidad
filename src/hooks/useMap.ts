import { useCallback, useRef, useEffect, useState } from 'react';
import {
    useNodesState,
    useEdgesState,
    addEdge,
    reconnectEdge,
    useReactFlow,
    type Edge,
    type Connection
} from '@xyflow/react';
import { accountingPrinciples, type AccountingPrinciple } from '../data/accountingData';
import { usePowerPoint } from './usePowerPoint';
import { usePDF } from './usePDF';
import { type InfoMenuHandle } from '../components/InfoMenu';
import { type AccountingNode } from '../components/CustomNode';
import { useTheme } from '../context/ThemeContext';

const getInitialNodes = (isMobile: boolean): AccountingNode[] => {
    return accountingPrinciples.map((principle) => {
        if (principle.id === 'main') {
            return {
                id: principle.id,
                type: 'accounting',
                position: isMobile ? { x: 30, y: -100 } : { x: 525, y: -140 },
                data: {
                    title: principle.title,
                    content: principle.content,
                    color: principle.color,
                },
            };
        }

        const pIndex = accountingPrinciples.filter(p => p.id !== 'main').indexOf(principle);

        return {
            id: principle.id,
            type: 'accounting',
            position: isMobile ? {
                x: 30,
                y: (pIndex + 1) * 350
            } : {
                x: (pIndex % 4) * 350,
                y: Math.floor(pIndex / 4) * 280 + 280
            },
            data: {
                title: principle.title,
                content: principle.content,
                color: principle.color,
            },
        };
    });
};

const initialEdges: Edge[] = accountingPrinciples.flatMap((principle) => {
    if (!principle.connectTo) return [];
    return principle.connectTo.map((targetId) => ({
        id: `e${principle.id}-${targetId}`,
        source: principle.id,
        target: targetId,
        animated: true,
        style: { stroke: principle.color },
    }));
});

export const useMap = () => {
    const isMobile = window.innerWidth <= 768;
    const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes(isMobile));
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedPrinciple, setSelectedPrinciple] = useState<AccountingPrinciple | null>(null);
    const { isDarkMode, toggleDarkMode } = useTheme();
    const menuRef = useRef<InfoMenuHandle>(null);
    const edgeReconnectSuccessful = useRef(true);
    const { exportToPPTX } = usePowerPoint();
    const { exportToPDF } = usePDF();
    const isInitialized = useRef(false);

    const { fitView } = useReactFlow();

    useEffect(() => {
        const timer = setTimeout(() => {
            isInitialized.current = true;
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    }, [setEdges]);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, [setEdges]);

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
    }, [setEdges]);

    const onNodeClick = useCallback((_: any, node: any) => {
        const principle = accountingPrinciples.find(p => p.id === node.id);
        if (principle) {
            setSelectedPrinciple(principle);
        }
    }, []);

    const resetNodes = useCallback(() => {
        const mobile = window.innerWidth <= 768;
        setNodes(getInitialNodes(mobile));
        setEdges(initialEdges);

        setTimeout(() => {
            fitView({
                nodes: mobile ? [{ id: 'main' }] : undefined,
                duration: 800,
                padding: mobile ? 0.5 : 0.2
            });
        }, 50);
    }, [setNodes, setEdges, fitView]);

    const scrollToTop = useCallback(() => {
        fitView({ nodes: [{ id: 'main' }], duration: 800, padding: 0.5 });
    }, [fitView]);

    const scrollToBottom = useCallback(() => {
        const lastNodeId = accountingPrinciples[accountingPrinciples.length - 1].id;
        fitView({ nodes: [{ id: lastNodeId }], duration: 800, padding: 0.5 });
    }, [fitView]);

    const handleInteraction = useCallback(() => {
        if (isInitialized.current) {
            menuRef.current?.close();
        }
    }, [isInitialized]);

    return {
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
    };
};
