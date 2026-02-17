import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { AccountingPrinciple } from '../data/accountingData';

interface DetailModalProps {
    principle: AccountingPrinciple | null;
    onClose: () => void;
    isDarkMode: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ principle, onClose, isDarkMode }) => {
    if (!principle) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2000,
                    background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        background: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '24px',
                        border: isDarkMode ? `2px solid ${principle.color}44` : `2px solid ${principle.color}22`,
                        boxShadow: isDarkMode ? `0 0 40px ${principle.color}22` : `0 20px 25px -5px rgba(0, 0, 0, 0.1)`,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: isDarkMode ? '#94a3b8' : '#64748b',
                            zIndex: 100
                        }}
                    >
                        <X size={24} />
                    </button>

                    <div style={{ display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                        {principle.image && (
                            <div style={{
                                flex: 1,
                                background: isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px'
                            }}>
                                <img
                                    src={principle.image}
                                    alt={principle.title}
                                    style={{
                                        width: '100%',
                                        maxWidth: '300px',
                                        borderRadius: '16px',
                                        boxShadow: isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </div>
                        )}
                        <div style={{ flex: 1, padding: '40px' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                background: `${principle.color}22`,
                                color: principle.color,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '16px'
                            }}>
                                Principio Contable
                            </div>
                            <h2 style={{
                                margin: '0 0 16px 0',
                                color: isDarkMode ? '#f8fafc' : '#1e293b',
                                fontSize: '2rem',
                                fontWeight: '800'
                            }}>
                                {principle.title}
                            </h2>
                            <p style={{
                                color: isDarkMode ? '#cbd5e1' : '#475569',
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                {principle.content}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DetailModal;
