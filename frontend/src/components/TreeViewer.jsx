import React, { useState } from 'react';
import { Folder, FolderOpen, File, AlertTriangle, ChevronRight, ChevronDown } from 'lucide-react';

const TreeNode = ({ nodeName, childrenObj, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = Object.keys(childrenObj).length > 0;

    return (
        <div className="ml-5 mt-3">
            <div 
                className={`flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-[#2a2a2a] transition-all duration-200 ${hasChildren ? 'cursor-pointer' : ''}`}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                {hasChildren ? (
                    isOpen ? <ChevronDown size={18} className="text-accent transition-transform duration-200" /> : <ChevronRight size={18} className="text-accent transition-transform duration-200" />
                ) : (
                    <span className="w-4"></span>
                )}
                
                {hasChildren ? (
                    isOpen ? <FolderOpen size={20} className="text-primary transition-transform hover:scale-110" /> : <Folder size={20} className="text-primary transition-transform hover:scale-110" />
                ) : (
                    <File size={20} className="text-gray-500" />
                )}
                
                <span className="font-semibold text-lg text-gray-200">{nodeName}</span>
            </div>
            
            <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    {hasChildren && (
                        <div className="border-l-2 border-darkborder ml-4 pl-3">
                            {Object.entries(childrenObj).map(([childName, grandChildren]) => (
                                <TreeNode key={childName} nodeName={childName} childrenObj={grandChildren} level={level + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TreeViewer = ({ hierarchy }) => {
    const isCycle = hierarchy.has_cycle;

    if (isCycle) {
        return (
            <div className="bold-panel border-l-4 border-l-red-600 bg-[#1a1515]">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="text-red-500" size={28} />
                    <h3 className="text-xl font-heading font-bold text-red-500">Cycle Detected</h3>
                </div>
                <div className="flex items-center gap-3 mt-4 ml-1">
                    <span className="px-4 py-1.5 bg-red-950/40 text-red-400 rounded-xl text-base font-bold border border-red-900/50">
                        Root: {hierarchy.root}
                    </span>
                    <span className="text-base text-red-500/70 italic font-medium">Children omitted</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bold-panel border-l-4 border-l-[#3a3a3a] hover:border-l-primary transition-colors">
            <div className="flex justify-between items-center border-b border-darkborder pb-4 mb-5">
                <h3 className="text-xl font-heading font-bold flex items-center gap-3 text-white">
                    <Folder className="text-primary" size={24} /> 
                    Tree: {hierarchy.root}
                </h3>
                <span className="px-4 py-1.5 bg-[#2a2a2a] text-accent rounded-xl text-sm font-bold border border-darkborder">
                    Depth: {hierarchy.depth}
                </span>
            </div>
            
            <div className="overflow-x-auto pb-3">
                {Object.entries(hierarchy.tree).map(([rootKey, children]) => (
                    <TreeNode key={rootKey} nodeName={rootKey} childrenObj={children} />
                ))}
            </div>
        </div>
    );
};

export default TreeViewer;
