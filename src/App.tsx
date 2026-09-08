import React from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { WorshipDeptView } from './components/departments/WorshipDeptView';
import { MissionDeptView } from './components/departments/MissionDeptView';
import { TrainingDeptView } from './components/departments/TrainingDeptView';
import { ServiceDeptView } from './components/departments/ServiceDeptView';
import { FinanceView } from './components/FinanceView';
import { CalendarView } from './components/CalendarView';
import { PersonnelView } from './components/PersonnelView';
import { VirtualFileSystemView } from './components/VirtualFileSystemView';
import { HealthReportView } from './components/HealthReportView';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useChurch();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'worship':
        return <WorshipDeptView />;
      case 'mission':
        return <MissionDeptView />;
      case 'training':
        return <TrainingDeptView />;
      case 'service':
        return <ServiceDeptView />;
      case 'finance':
        return <FinanceView />;
      case 'calendar':
        return <CalendarView />;
      case 'personnel':
        return <PersonnelView />;
      case 'files':
        return <VirtualFileSystemView />;
      case 'health':
        return <HealthReportView />;
      default:
        return <WorshipDeptView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              <strong>Church Planning CMS Part 2</strong> • Operational Manual (Pages 1-30) Integrated with Phase 1 Governance
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Role-Based Access Control (RBAC) Active
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              2026 Ministry Budget: $500,500
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ChurchProvider>
      <MainContent />
    </ChurchProvider>
  );
}
