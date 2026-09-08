import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  Download,
  Copy,
  Check,
  HardDrive,
  ChevronRight,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { INITIAL_VIRTUAL_FILES, VirtualFile } from '../data/virtualFileSystem';

interface FolderGroup {
  folderPath: string;
  folderName: string;
  files: VirtualFile[];
}

export const VirtualFileSystemView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<VirtualFile>(INITIAL_VIRTUAL_FILES[0]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'ministries/worship-ministry': true,
    'ministries/mission-ministry': true,
    'ministries/training-ministry': true,
    'ministries/service-ministry': true,
    'shared-modules': true,
    'models': true
  });
  const [copied, setCopied] = useState(false);

  // Group files by folder directory
  const folders: FolderGroup[] = [
    {
      folderPath: 'ministries/worship-ministry',
      folderName: 'ministries/worship-ministry/ (P17-19)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('ministries/worship-ministry/'))
    },
    {
      folderPath: 'ministries/mission-ministry',
      folderName: 'ministries/mission-ministry/ (P20-22)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('ministries/mission-ministry/'))
    },
    {
      folderPath: 'ministries/training-ministry',
      folderName: 'ministries/training-ministry/ (P23-26)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('ministries/training-ministry/'))
    },
    {
      folderPath: 'ministries/service-ministry',
      folderName: 'ministries/service-ministry/ (P27-30)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('ministries/service-ministry/'))
    },
    {
      folderPath: 'shared-modules',
      folderName: 'shared-modules/ (Core Services)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('shared-modules/'))
    },
    {
      folderPath: 'models',
      folderName: 'models/ (Ledger & Engine Schemas)',
      files: INITIAL_VIRTUAL_FILES.filter(f => f.path.startsWith('models/'))
    }
  ];

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleCopyContent = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'json':
        return <FileCode className="w-4 h-4 text-amber-500" />;
      case 'js':
        return <FileCode className="w-4 h-4 text-emerald-500" />;
      case 'markdown':
      default:
        return <FileText className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <HardDrive className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-indigo-500 text-white uppercase tracking-wider">
                  Virtual Repository Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">MINISTRY MODULAR CMS</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Virtual Ministry File System
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Structured repository reflecting ministry folders: Worship, Mission, Training, Service, Shared Modules, and Financial Schemas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* File Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Tree Explorer (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-indigo-500" />
              Repository Root (/2026-church-manual)
            </span>
            <span className="text-[10px] font-mono text-slate-400">{INITIAL_VIRTUAL_FILES.length} Files</span>
          </div>

          <div className="space-y-1 text-xs">
            {folders.map(group => {
              const isExpanded = !!expandedFolders[group.folderPath];
              return (
                <div key={group.folderPath} className="space-y-0.5">
                  <button
                    onClick={() => toggleFolder(group.folderPath)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-medium text-left cursor-pointer transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">{group.folderName}</span>
                  </button>

                  {isExpanded && (
                    <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-700 space-y-0.5">
                      {group.files.map(file => {
                        const isSelected = selectedFile?.path === file.path;
                        return (
                          <button
                            key={file.path}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {getFileIcon(file.type)}
                              <span className="truncate">{file.name}</span>
                            </div>
                            {file.pageRef && (
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                {file.pageRef}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
          {selectedFile ? (
            <>
              {/* File Header */}
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/40">
                <div className="flex items-center gap-2.5">
                  {getFileIcon(selectedFile.type)}
                  <div>
                    <h3 className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                      {selectedFile.path}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{selectedFile.description}</span>
                      {selectedFile.pageRef && <span>• {selectedFile.pageRef}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyContent}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownloadFile}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Content Viewer with Line Numbers */}
              <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="pr-4 border-r border-slate-800 text-slate-600 select-none text-right font-mono">
                    {selectedFile.content.split('\n').map((_, idx) => (
                      <div key={idx}>{idx + 1}</div>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="pl-4 whitespace-pre font-mono text-slate-200 w-full">
                    {selectedFile.content}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Select a file in the tree to view its content.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
