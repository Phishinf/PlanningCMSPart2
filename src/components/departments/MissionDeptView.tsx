import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Globe2,
  Plane,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  Heart,
  Calendar,
  AlertCircle,
  FileCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import { STMParticipant } from '../../types';

export const MissionDeptView: React.FC = () => {
  const {
    canEditDepartment,
    stmTrip,
    updateParticipantStatus,
    toggleSTMChecklist,
    missionaries,
    budgets,
    recordExpenditure
  } = useChurch();

  const isEditable = canEditDepartment('mission');
  const [activeSubTab, setActiveSubTab] = useState<'stm' | 'missionaries' | 'budget'>('stm');

  // New applicant modal state
  const [isAddingApplicant, setIsAddingApplicant] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantRole, setApplicantRole] = useState<STMParticipant['role']>('Children Ministry');
  const [applicantNotes, setApplicantNotes] = useState('');

  // Selected missionary modal/card
  const [selectedMissionaryId, setSelectedMissionaryId] = useState<string>(missionaries[0]?.id || '');

  // Expense modal
  const [expenseItemId, setExpenseItemId] = useState<string | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const missionBudget = budgets.find(b => b.departmentId === 'mission') || {
    totalAllocation: 231000,
    items: []
  };

  const spentTotal = missionBudget.items.reduce((s, it) => s + it.spentAmount, 0);
  const committedTotal = missionBudget.items.reduce((s, it) => s + it.committedAmount, 0);
  const remainingTotal = missionBudget.totalAllocation - (spentTotal + committedTotal);

  const handleAddApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) return;
    if (stmTrip.participants.length >= stmTrip.totalCapacity) {
      alert(`The Indonesia STM trip is strictly capped at ${stmTrip.totalCapacity} people (P21).`);
      return;
    }
    const newP: STMParticipant = {
      id: `p-${Date.now()}`,
      name: applicantName.trim(),
      role: applicantRole,
      status: 'Applied',
      vaccineCompleted: false,
      depositPaid: false,
      notes: applicantNotes
    };
    stmTrip.participants.push(newP);
    setApplicantName('');
    setApplicantNotes('');
    setIsAddingApplicant(false);
  };

  const handleRecordExpenseSubmit = (deptId: 'mission', itemId: string) => {
    if (expenseAmount > 0) {
      recordExpenditure(deptId, itemId, expenseAmount);
      setExpenseItemId(null);
      setExpenseAmount(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 border border-emerald-900/50 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <Globe2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-500 text-slate-950 uppercase tracking-wider">
                  Pages 20-22
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE: MIN-MIS-2026</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Global Mission & Cross-Cultural Ministry
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Director: <span className="text-emerald-300 font-medium">Pastor Grace Lin</span> • Indonesia STM Logistics (10 Pax), 5 Supported Units & $231,000 Allocation
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">ANNUAL ALLOCATION</span>
              <span className="text-lg font-bold text-emerald-400">${missionBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">INDONESIA STM SEATS</span>
              <span className="text-lg font-bold text-amber-400">
                {stmTrip.participants.length} / {stmTrip.totalCapacity} Filled
              </span>
            </div>
          </div>
        </div>

        {/* RBAC Notice */}
        {!isEditable && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/80">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              You are currently viewing in <strong>Read-Only Mode</strong>. Switch role to <strong>Pastor Grace Lin</strong> or <strong>Senior Pastor</strong> in the header to modify STM participants or missionary allocations.
            </span>
          </div>
        )}
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('stm')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'stm'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Indonesia STM Portal (10 Pax, P21)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-600 text-white font-mono">
            {stmTrip.participants.length}/10
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('missionaries')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'missionaries'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Supported Missionaries (5 Units, P22)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('budget')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'budget'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Budget & Grants ($231,000 P22)</span>
        </button>
      </div>

      {/* SubTab 1: STM Indonesia Portal */}
      {activeSubTab === 'stm' && (
        <div className="space-y-6">
          {/* Trip Summary Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {stmTrip.pageRef}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{stmTrip.dates}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {stmTrip.destination}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Focus: {stmTrip.targetFocus} • Leader: <strong className="text-slate-800 dark:text-slate-200">{stmTrip.teamLeader}</strong>
                </p>
              </div>

              {/* Capacity Progress */}
              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">TEAM CAPACITY (P21)</span>
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {stmTrip.participants.length} of {stmTrip.totalCapacity} Members
                  </span>
                </div>
                <div className="w-24 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(stmTrip.participants.length / stmTrip.totalCapacity) * 100}%` }}
                  />
                </div>
                {isEditable && stmTrip.participants.length < stmTrip.totalCapacity && (
                  <button
                    onClick={() => setIsAddingApplicant(true)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                  >
                    + Add Participant
                  </button>
                )}
              </div>
            </div>

            {/* Checklist items */}
            <div className="mt-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Mandatory Logistics & Field Readiness Checklist (P21)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {stmTrip.logisticsChecklist.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={!isEditable}
                    onClick={() => isEditable && toggleSTMChecklist(idx)}
                    className={`p-2.5 rounded-lg border text-left flex items-start justify-between gap-2 transition-colors ${
                      item.completed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    } ${isEditable ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div>
                      <span className="font-medium block leading-tight">{item.item}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Due: {item.dueDate}</span>
                    </div>
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 10-Person Roster Table */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Indonesia STM 10-Person Team Roster (P21)
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                Allocated Budget: ${stmTrip.allocatedBudget.toLocaleString()} • Fundraised: ${stmTrip.fundraisedAmount.toLocaleString()} (91%)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Participant</th>
                    <th className="px-4 py-3">Trip Role</th>
                    <th className="px-4 py-3">Vaccines</th>
                    <th className="px-4 py-3">Deposit ($500)</th>
                    <th className="px-4 py-3">Vetting Status</th>
                    <th className="px-4 py-3">Field Assignment / Notes</th>
                    {isEditable && <th className="px-4 py-3 text-center">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  {stmTrip.participants.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-mono font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
                          {p.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          disabled={!isEditable}
                          onClick={() => isEditable && updateParticipantStatus(p.id, { vaccineCompleted: !p.vaccineCompleted })}
                          className={`font-semibold flex items-center gap-1 ${p.vaccineCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} ${isEditable ? 'cursor-pointer' : ''}`}
                        >
                          {p.vaccineCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {p.vaccineCompleted ? 'Verified' : 'Pending'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          disabled={!isEditable}
                          onClick={() => isEditable && updateParticipantStatus(p.id, { depositPaid: !p.depositPaid })}
                          className={`font-semibold flex items-center gap-1 ${p.depositPaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'} ${isEditable ? 'cursor-pointer' : ''}`}
                        >
                          {p.depositPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {p.depositPaid ? 'Paid' : 'Unpaid'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Passport/Visa Verified'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : p.status === 'Confirmed'
                            ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {p.notes}
                      </td>
                      {isEditable && (
                        <td className="px-4 py-3 text-center">
                          <select
                            value={p.status}
                            onChange={e => updateParticipantStatus(p.id, { status: e.target.value as any })}
                            className="text-[11px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 font-medium"
                          >
                            <option value="Passport/Visa Verified">Verified</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Training">Training</option>
                            <option value="Applied">Applied</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Applicant Modal */}
          {isAddingApplicant && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Add Indonesia STM Applicant (P21)</h4>
                <form onSubmit={handleAddApplicant} className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={e => setApplicantName(e.target.value)}
                      placeholder="e.g. Rachel Huang"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Ministry Assignment</label>
                    <select
                      value={applicantRole}
                      onChange={e => setApplicantRole(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    >
                      <option value="Children Ministry">Children Ministry</option>
                      <option value="Medical/Care">Medical/Care Clinic</option>
                      <option value="Worship">Worship & Music</option>
                      <option value="Logistics">Logistics & Tech</option>
                      <option value="Testimony">Testimony & Sharing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Notes</label>
                    <textarea
                      value={applicantNotes}
                      onChange={e => setApplicantNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingApplicant(false)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Add to Roster
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Supported Missionaries */}
      {activeSubTab === 'missionaries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Long-Term Supported Missionaries Directory (P22)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                5 full-time missionary family units across Southeast Asia, East Asia, Africa, and Taiwan indigenous fields.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {missionaries.map(m => (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {m.agency} • Since {m.termStart}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {m.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white mt-2">
                    {m.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {m.field}
                  </p>

                  <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-xs border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-500">Monthly Support:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">${m.monthlySupport}/mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Annual Pledge (P22):</span>
                      <span className="font-mono">${m.annualSupport.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Current Prayer Points:
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 list-disc list-inside space-y-0.5">
                      {m.prayerRequests.map((req, rIdx) => (
                        <li key={rIdx} className="leading-tight">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 italic">
                  "{m.recentUpdate}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Budget & Grants */}
      {activeSubTab === 'budget' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Mission Ministry Budget ($231,000 P22)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed allocation covering missionary units, Indonesia STM trip, Southeast Asia theological grants, and Bible translation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">TOTAL ALLOCATION (P22)</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">${missionBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">DISBURSED / TRANSFERRED</span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${spentTotal.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">COMMITTED SCHEDULED</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">${committedTotal.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">UNCOMMITTED BALANCE</span>
              <span className={`text-xl font-bold ${remainingTotal >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ${remainingTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Mission Line Item</th>
                  <th className="px-4 py-3 text-right">Allocated</th>
                  <th className="px-4 py-3 text-right">Transferred</th>
                  <th className="px-4 py-3 text-right">Committed</th>
                  <th className="px-4 py-3 text-right">Remaining</th>
                  {isEditable && <th className="px-4 py-3 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                {missionBudget.items.map(item => {
                  const rem = item.allocatedAmount - (item.spentAmount + item.committedAmount);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-900 dark:text-white">
                        {item.code}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-900 dark:text-white block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.notes}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                        ${item.allocatedAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                        ${item.spentAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-amber-600 dark:text-amber-400">
                        ${item.committedAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900 dark:text-white">
                        ${rem.toLocaleString()}
                      </td>
                      {isEditable && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              setExpenseItemId(item.id);
                              setExpenseAmount(1000);
                            }}
                            className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-semibold cursor-pointer text-[11px]"
                          >
                            + Disburse Wire
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Expense Logger Modal */}
          {expenseItemId && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Record Mission Disbursement</h4>
                <p className="text-slate-500 mb-3">
                  Confirm wire transfer for:
                  <span className="font-semibold block text-slate-900 dark:text-white mt-1">
                    {missionBudget.items.find(i => i.id === expenseItemId)?.name}
                  </span>
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Wire Transfer Amount ($ USD)
                    </label>
                    <input
                      type="number"
                      value={expenseAmount}
                      onChange={e => setExpenseAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 font-mono text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setExpenseItemId(null)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRecordExpenseSubmit('mission', expenseItemId)}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
