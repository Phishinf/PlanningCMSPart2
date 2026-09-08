import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Users,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HealthReportView: React.FC = () => {
  const {
    departmentHealthReports,
    conflicts,
    budgets,
    worshipRoster,
    stmTrip,
    courses,
    tuitionStudents,
    setActiveTab
  } = useChurch();

  const totalAllocated = budgets.reduce((acc, b) => acc + b.totalAllocation, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.items.reduce((s, it) => s + it.spentAmount, 0), 0);
  const totalCommitted = budgets.reduce((acc, b) => acc + b.items.reduce((s, it) => s + it.committedAmount, 0), 0);
  const overallBurnRate = Math.round(((totalSpent + totalCommitted) / totalAllocated) * 100);

  const getStatusBadge = (status: 'Optimal' | 'Good' | 'Attention Needed') => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
          </span>
        );
      case 'Good':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> On Track
          </span>
        );
      case 'Attention Needed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Attention Needed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-500 text-slate-950 uppercase tracking-wider">
                  Executive Dashboard
                </span>
                <span className="text-xs text-slate-400 font-mono">2026 CHURCH METRICS</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Ministry Health & Readiness Audit
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Automated diagnostics cross-referencing volunteer readiness, budget burn rates, enrollment capacity, and facility conflicts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">FACILITY COLLISIONS</span>
              <span className={`text-lg font-bold ${conflicts.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {conflicts.length} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Overall Budget Burn</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{overallBurnRate}%</span>
            <span className="text-xs font-mono text-slate-400">${(totalSpent + totalCommitted).toLocaleString()} spent</span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallBurnRate}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Worship Volunteer Rate</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round((worshipRoster.filter(w => w.confirmed).length / worshipRoster.length) * 100)}%
            </span>
            <span className="text-xs font-mono text-slate-400">
              {worshipRoster.filter(w => w.confirmed).length}/{worshipRoster.length} Confirmed
            </span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${(worshipRoster.filter(w => w.confirmed).length / worshipRoster.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Indonesia STM Fill Rate</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round((stmTrip.participants.length / stmTrip.totalCapacity) * 100)}%
            </span>
            <span className="text-xs font-mono text-slate-400">{stmTrip.participants.length}/{stmTrip.totalCapacity} Pax</span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(stmTrip.participants.length / stmTrip.totalCapacity) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Community Tutoring</span>
            <Building2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {tuitionStudents.length} Students
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">95% Avg Attendance</span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: '95%' }} />
          </div>
        </div>
      </div>

      {/* 4 Ministry Deep Health Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Ministry Diagnostic Cards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentHealthReports.map(report => (
            <div
              key={report.departmentId}
              className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                    {report.departmentId.toUpperCase()} MINISTRY
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {report.departmentName}
                  </h4>
                </div>
                {getStatusBadge(report.status)}
              </div>

              {/* Progress Gauges */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                    <span>Volunteer Confirmation & Staffing:</span>
                    <span className="font-mono font-bold">{report.volunteerReadiness}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${report.volunteerReadiness}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                    <span>Budget Execution & Disbursements:</span>
                    <span className="font-mono font-bold">{report.budgetExecution}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${report.budgetExecution}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                    <span>Program Enrollment / Participant Capacity:</span>
                    <span className="font-mono font-bold">{report.programEnrollmentRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${report.programEnrollmentRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action items / warnings */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Recommendations & Alerts:
                </span>
                {report.actionItems.map((item, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab(report.departmentId)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open {report.departmentName} Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
