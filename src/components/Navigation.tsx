import React from 'react';
import {
  Music,
  Globe2,
  GraduationCap,
  HeartHandshake,
  DollarSign,
  CalendarDays,
  Users,
  Activity,
  FolderTree,
  AlertCircle
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { canEditDepartment, conflicts } = useChurch();

  const deptItems = [
    {
      id: 'worship',
      label: 'Worship Ministry',
      page: 'P17-19',
      budget: '$28,500',
      icon: Music,
      desc: 'Rosters, Liturgy, Sound'
    },
    {
      id: 'mission',
      label: 'Mission Ministry',
      page: 'P20-22',
      budget: '$231,000',
      icon: Globe2,
      desc: 'Indonesia STM, Missionaries'
    },
    {
      id: 'training',
      label: 'Training Ministry',
      page: 'P23-26',
      budget: '$23,500',
      icon: GraduationCap,
      desc: '4-Tier Sunday School, AI Workshop'
    },
    {
      id: 'service',
      label: 'Service Ministry',
      page: 'P27-30',
      budget: '$217,500',
      icon: HeartHandshake,
      desc: 'Tea Fruit Hill, Tuition, Love Feasts'
    }
  ];

  const sharedItems = [
    {
      id: 'finance',
      label: 'Global Financial Ledger',
      subtitle: '$500,500 Total Core',
      icon: DollarSign,
      badge: null
    },
    {
      id: 'scheduling',
      label: 'Master Calendar & Conflicts',
      subtitle: 'Facility Conflict Checker',
      icon: CalendarDays,
      badge: conflicts.length > 0 ? `${conflicts.length} alert` : null
    },
    {
      id: 'volunteers',
      label: 'Ministry Personnel Pool',
      subtitle: 'Shared Volunteer Pool',
      icon: Users,
      badge: null
    }
  ];

  const executiveItems = [
    {
      id: 'health',
      label: 'Ministry Health Report',
      subtitle: 'Operations & KPI Evaluation',
      icon: Activity
    },
    {
      id: 'files',
      label: 'Virtual File System',
      subtitle: 'church-cms-2026/ Tree',
      icon: FolderTree
    }
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2 gap-2">
          
          {/* Department Navigation Group */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 select-none">
              Ministries
            </span>
            {deptItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isEditable = canEditDepartment(item.id as any);

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span>{item.label}</span>
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                          isActive
                            ? 'bg-amber-600 text-amber-50'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.page}
                      </span>
                    </div>
                  </div>
                  {isEditable && (
                    <span
                      title="You have edit rights for this ministry"
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Shared Modules & Health Report */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none border-t md:border-t-0 border-slate-800 pt-1 md:pt-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 select-none hidden lg:inline">
              Core
            </span>
            {sharedItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] bg-rose-500 text-white font-bold rounded-full animate-bounce">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

            {/* Health & Files */}
            {executiveItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
};
