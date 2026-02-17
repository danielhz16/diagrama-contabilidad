import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Presentation, FileText, Loader2 } from 'lucide-react';
import logoUm from '../assets/umg.png';

export interface InfoMenuHandle {
    close: () => void;
}

export interface InfoMenuProps {
    onExport: () => void;
    onExportPDF: () => void;
    isDarkMode: boolean;
}

const InfoMenu = forwardRef<InfoMenuHandle, InfoMenuProps>(({ onExport, onExportPDF, isDarkMode }, ref) => {
    const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isExportingPPT, setIsExportingPPT] = useState(false);
    const [isExportingPDF, setIsExportingPDF] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useImperativeHandle(ref, () => ({
        close: () => setIsExpanded(false),
    }));

    const handlePPTExport = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isExportingPPT || isExportingPDF) return;
        setIsExportingPPT(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            await (onExport as any)();
        } finally {
            setIsExportingPPT(false);
        }
    };

    const handlePDFExport = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isExportingPPT || isExportingPDF) return;
        setIsExportingPDF(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            await (onExportPDF as any)();
        } finally {
            setIsExportingPDF(false);
        }
    };

    return (
        <motion.div
            initial={false}
            animate={{
                width: isExpanded ? (isMobile ? 'calc(100% - 40px)' : '320px') : '60px',
                height: isExpanded && isMobile ? 'calc(100% - 40px)' : 'auto',
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                right: isExpanded && isMobile ? '20px' : 'auto',
                bottom: isExpanded && isMobile ? '20px' : 'auto',
                zIndex: 100,
                background: isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                userSelect: 'none',
                transition: 'background 0.3s ease, border 0.3s ease'
            }}
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isExpanded ? 'space-between' : 'center',
                    gap: '12px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: isExpanded ? '180px' : '0' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex'
                    }}>
                        <BookOpen size={18} color="white" />
                    </div>
                    {isExpanded && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: isDarkMode ? '#f8fafc' : '#1e293b', fontWeight: 'bold' }}
                        >
                            PRINCIPIOS DE CGA
                        </motion.span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronUp size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
                ) : (
                    <ChevronDown size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
                )}
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            overflowX: 'hidden',
                            overflowY: isMobile ? 'auto' : 'hidden',
                            maxHeight: isMobile ? 'calc(100vh - 100px)' : 'none'
                        }}
                    >
                        <div style={{ padding: '0 16px 20px 16px', display: 'flex', flexDirection: 'column' }}>
                            <h1 style={{
                                margin: 0,
                                color: isDarkMode ? '#f8fafc' : '#1e293b',
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                lineHeight: '1.2'
                            }}>
                                Principios de CGA
                            </h1>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? '#e2e8f0' : '#475569', fontSize: '0.85rem' }}>
                                    <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '4px' }}>
                                        <BookOpen size={14} color={isDarkMode ? "#94a3b8" : "#64748b"} />
                                    </div>
                                    <span>UNIVERSIDAD MARIANO GÁLVEZ</span>
                                </div>
                                <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', paddingLeft: '30px', marginTop: '-8px' }}>
                                    CAMPUS HUEHUETENANGO
                                </div>

                                <div style={{ borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? '#e2e8f0' : '#475569', fontSize: '0.85rem' }}>
                                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '4px', borderRadius: '4px' }}>
                                            <FileText size={14} color="#3b82f6" />
                                        </div>
                                        <span>CARRERA</span>
                                    </div>
                                    <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '0.75rem', paddingLeft: '30px', marginTop: '4px', lineHeight: '1.4' }}>
                                        INGENIERIA EN SISTEMAS DE LA INFORMACIÓN Y CIENCIAS DE LA COMPUTACIÓN 
                                         <br />
                                          <span>CICLO I</span>
                                    </div>
                                </div>

                                <div style={{ borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? '#e2e8f0' : '#475569', fontSize: '0.85rem' }}>
                                        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '4px', borderRadius: '4px' }}>
                                            <Presentation size={14} color="#8b5cf6" />
                                        </div>
                                        <span>ACADÉMICO</span>
                                    </div>
                                    <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', paddingLeft: '30px', marginTop: '4px' }}>
                                        CONTABILIDAD - SECCION A
                                    </div>
                                    <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem', paddingLeft: '30px', marginTop: '4px', fontWeight: 'bold' }}>
                                        LIC. DANY MIRANDA HERNÁNDEZ
                                    </div>
                                </div>

                                <div style={{ borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? '#e2e8f0' : '#475569', fontSize: '0.85rem' }}>
                                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '4px', borderRadius: '4px' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1.5px solid #10b981' }} />
                                        </div>
                                        <span>ESTUDIANTE</span>
                                    </div>
                                    <div style={{ color: isDarkMode ? '#f8fafc' : '#1e293b', fontSize: '0.85rem', paddingLeft: '30px', marginTop: '4px', fontWeight: '600' }}>
                                        JOSUÉ DANIEL HERNÁNDEZ GÓMEZ
                                    </div>
                                    <div style={{ color: isDarkMode ? '#64748b' : '#94a3b8', fontSize: '0.8rem', paddingLeft: '30px', marginTop: '2px' }}>
                                        0904 - 26 - 10239
                                    </div>
                                </div>
                            </div>
                            <strong style={{
                                marginTop: '16px',
                                padding: '12px',
                                background: 'rgba(248, 244, 15, 0.43)',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                justifyContent: 'center',
                                color: isDarkMode ? '#ffffff' : '#000000' ,
                                border: isDarkMode ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)'
                            }}>
                                💡 Arrastra los nodos para organizar. <br />
                                 💡 Click en nodo para ver detalles. <br />
                            </strong>

                            <button
                                onClick={handlePPTExport}
                                disabled={isExportingPPT || isExportingPDF}
                                style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    background: isExportingPPT ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.2)',
                                    border: '1px solid rgba(249, 115, 22, 0.4)',
                                    borderRadius: '12px',
                                    color: isExportingPPT ? '#ffffff' : '#fb923c',
                                    cursor: isExportingPPT ? 'not-allowed' : 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    opacity: isExportingPPT ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (isExportingPPT) return;
                                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.3)';
                                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    if (isExportingPPT) return;
                                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {isExportingPPT ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        style={{ display: 'flex' }}
                                    >
                                        <Loader2 size={16} />
                                    </motion.div>
                                ) : (
                                    <Presentation size={16} />
                                )}
                                {isExportingPPT ? 'Exportando...' : 'Exportar a PowerPoint'}
                            </button>

                            <button
                                onClick={handlePDFExport}
                                disabled={isExportingPPT || isExportingPDF}
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    background: isExportingPDF ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid rgba(239, 68, 68, 0.4)',
                                    borderRadius: '12px',
                                    color: isExportingPDF ? '#ffffff' : '#ef4444',
                                    cursor: isExportingPDF ? 'not-allowed' : 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    opacity: isExportingPDF ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (isExportingPDF) return;
                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    if (isExportingPDF) return;
                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {isExportingPDF ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        style={{ display: 'flex' }}
                                    >
                                        <Loader2 size={16} />
                                    </motion.div>
                                ) : (
                                    <FileText size={16} />
                                )}
                                {isExportingPDF ? 'Exportando...' : 'Exportar a PDF'}
                            </button>

                            <img
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    marginTop: '16px',
                                    borderRadius: '8px',
                                    margin: '2rem auto',
                                    filter: isDarkMode ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                                }}
                                src={logoUm} alt="" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

InfoMenu.displayName = 'InfoMenu';

export default InfoMenu;
