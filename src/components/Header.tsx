import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Download,
  RotateCcw,
  AlertTriangle,
  Lock,
  Unlock,
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const {
    currentUser,
    availableUsers,
    setCurrentUser,
    canEditDepartment,
    canEditFinance,
    conflicts,
    budgets,
    resetAllData,
    exportDataJSON
  } = useChurch();

  const totalAllocation = budgets.reduce((acc, b) => acc + b.totalAllocation, 0);
  const totalSpent = budgets.reduce(
    (acc, b) => acc + b.items.reduce((s, it) => s + it.spentAmount, 0),
    0
  );

  const getPermissionDesc = () => {
    switch (currentUser.role) {
      case 'senior_pastor':
        return 'Full Read / Write Access across all 4 Ministries, Master Calendar, and Global Finance.';
      case 'worship_head':
        return 'Write Access to Worship Ministry (P17-19) & $28,500 Budget. Read-only for other ministries.';
      case 'mission_head':
        return 'Write Access to Mission Ministry (P20-22), Indonesia STM, and $231,000 Budget.';
      case 'training_head':
        return 'Write Access to Training Ministry (P23-26), 4-Tier Sunday School, AI Workshop, and $23,500 Budget.';
      case 'service_head':
        return 'Write Access to Service Ministry (P27-30), Tea Fruit Hill Space, Tuition, and $217,500 Budget.';
      case 'treasurer':
        return 'Write Access to all Financial Ledgers and Budget Lines. Read-only for ministry rosters.';
      case 'church_member':
        return 'Read-only Access across all church operations.';
    }
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Church Planning CMS
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2026 Master System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Holistic Architecture: Phase 1 (Staff & Calendar) + Phase 2 (Ministry Modular Operations P17-30)
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Global Budget Counter */}
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">TOTAL 2026 BUDGET</span>
                <span className="font-semibold text-emerald-300">
                  ${totalSpent.toLocaleString()} / ${totalAllocation.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Conflict Alert Counter */}
            <button
              onClick={() => setActiveTab('scheduling')}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-colors ${
                conflicts.length > 0
                  ? 'bg-rose-950/40 border-rose-600/60 text-rose-300 hover:bg-rose-900/40'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
              title="Click to inspect facility calendar"
            >
              <AlertTriangle className={`w-4 h-4 ${conflicts.length > 0 ? 'text-rose-400' : 'text-slate-400'}`} />
              <div>
                <span className="block text-[10px]">FACILITY CONFLICTS</span>
                <span className="font-semibold">
                  {conflicts.length === 0 ? '0 Collisions' : `${conflicts.length} Alert${conflicts.length > 1 ? 's' : ''}`}
                </span>
              </div>
            </button>

            {/* Export & Reset */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={exportDataJSON}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download full JSON snapshot"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Reset Church Planning CMS to initial official 2026 data?')) {
                    resetAllData();
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset local changes"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* RBAC Service Layer Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-indigo-500/20 text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-300">RBAC Service Layer:</span>
            
            {/* Interactive User/Role Selector */}
            <select
              value={currentUser.id}
              onChange={e => {
                const found = availableUsers.find(u => u.id === e.target.value);
                if (found) setCurrentUser(found);
              }}
              className="text-xs bg-slate-800 text-amber-300 border border-slate-700 rounded-md px-2.5 py-1 font-medium focus:ring-1 focus:ring-amber-400 focus:outline-none"
            >
              {availableUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.title})
                </option>
              ))}
            </select>
          </div>

          {/* Role Permission Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {currentUser.role === 'senior_pastor' ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
                <Unlock className="w-3 h-3" /> Full Administrator
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
                <Lock className="w-3 h-3" /> Scoped Ministry Head
              </span>
            )}
            <span className="hidden lg:inline text-slate-400 truncate max-w-md">
              {getPermissionDesc()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
