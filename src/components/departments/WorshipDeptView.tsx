import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Music,
  CheckCircle2,
  XCircle,
  Plus,
  DollarSign,
  FileText,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  Lock,
  Edit3,
  Trash2
} from 'lucide-react';
import { BudgetLineItem, WorshipRosterMember } from '../../types';

export const WorshipDeptView: React.FC = () => {
  const {
    canEditDepartment,
    worshipRoster,
    toggleRosterConfirm,
    addRosterMember,
    liturgyProcedures,
    updateLiturgyNotes,
    budgets,
    updateBudgetLineItem,
    addBudgetLineItem,
    recordExpenditure,
    programs
  } = useChurch();

  const isEditable = canEditDepartment('worship');
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'liturgy' | 'budget' | 'schedule'>('roster');

  // New member modal state
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<WorshipRosterMember['role']>('Soprano');
  const [newMemberTeam, setNewMemberTeam] = useState<WorshipRosterMember['team']>('Choir');

  // Liturgy editing state
  const [selectedLiturgyId, setSelectedLiturgyId] = useState(liturgyProcedures[0]?.id || '');
  const [isEditingLiturgyNotes, setIsEditingLiturgyNotes] = useState(false);
  const [liturgyNotesText, setLiturgyNotesText] = useState('');

  // Budget expense recording state
  const [expenseItemId, setExpenseItemId] = useState<string | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  // New budget item state
  const [isAddingBudgetItem, setIsAddingBudgetItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCode, setNewItemCode] = useState('WOR-5107');
  const [newItemCategory, setNewItemCategory] = useState('Music Production');
  const [newItemAllocated, setNewItemAllocated] = useState<number>(1000);
  const [newItemNotes, setNewItemNotes] = useState('');

  const worshipBudget = budgets.find(b => b.departmentId === 'worship') || {
    totalAllocation: 28500,
    items: []
  };

  const spentTotal = worshipBudget.items.reduce((s, it) => s + it.spentAmount, 0);
  const committedTotal = worshipBudget.items.reduce((s, it) => s + it.committedAmount, 0);
  const remainingTotal = worshipBudget.totalAllocation - (spentTotal + committedTotal);

  const selectedLiturgy = liturgyProcedures.find(l => l.id === selectedLiturgyId) || liturgyProcedures[0];

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addRosterMember({
      name: newMemberName.trim(),
      role: newMemberRole,
      team: newMemberTeam,
      confirmed: true
    });
    setNewMemberName('');
    setIsAddingMember(false);
  };

  const handleSaveLiturgyNotes = () => {
    if (selectedLiturgy) {
      updateLiturgyNotes(selectedLiturgy.id, liturgyNotesText);
      setIsEditingLiturgyNotes(false);
    }
  };

  const handleRecordExpenseSubmit = (deptId: 'worship', itemId: string) => {
    if (expenseAmount > 0) {
      recordExpenditure(deptId, itemId, expenseAmount);
      setExpenseItemId(null);
      setExpenseAmount(0);
    }
  };

  const handleAddBudgetItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemAllocated <= 0) return;
    addBudgetLineItem('worship', {
      code: newItemCode,
      category: newItemCategory,
      name: newItemName.trim(),
      allocatedAmount: newItemAllocated,
      spentAmount: 0,
      committedAmount: 0,
      notes: newItemNotes,
      pageRef: 'P19'
    });
    setNewItemName('');
    setIsAddingBudgetItem(false);
  };

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <Music className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Pages 17-19
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE: MIN-WOR-2026</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Worship & Liturgy Ministry
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Director: <span className="text-amber-300 font-medium">Rev. David Chen</span> • Choir & Band Rosters, Liturgy Procedures, and $28,500 Allocation
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">ALLOCATED BUDGET</span>
              <span className="text-lg font-bold text-amber-400">${worshipBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">SERVING ROSTER</span>
              <span className="text-lg font-bold text-emerald-400">{worshipRoster.length} Members</span>
            </div>
          </div>
        </div>

        {/* RBAC notice */}
        {!isEditable && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/80">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              You are currently viewing in <strong>Read-Only Mode</strong>. Switch role to <strong>Rev. David Chen</strong> or <strong>Senior Pastor</strong> in the header to modify rosters and budgets.
            </span>
          </div>
        )}
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('roster')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'roster'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Personnel & Rosters (P18)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900 font-mono">
            {worshipRoster.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('liturgy')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'liturgy'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Liturgy & Procedures (P17-18)</span>
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
          <span>Budget & Ledger ($28,500 P19)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-600 text-white font-mono">
            ${worshipBudget.totalAllocation.toLocaleString()}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('schedule')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'schedule'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Weekly Rehearsals (P18)</span>
        </button>
      </div>

      {/* SubTab 1: Rosters */}
      {activeSubTab === 'roster' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ministry Personnel Manager: Worship & Music
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Covers Choir SATB vocalists, 1st Service Ensemble, 2nd Service Contemporary Praise Band, and AV engineers listed on Page 18.
              </p>
            </div>

            {isEditable && (
              <button
                onClick={() => setIsAddingMember(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Roster Member</span>
              </button>
            )}
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Choir Team */}
            <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2.5">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Sanctuary Choir (SATB)
                  </h4>
                  <span className="text-[11px] text-slate-400">Thurs 19:30 Rehearsal (P18)</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold">
                  {worshipRoster.filter(m => m.team === 'Choir').length} Singers
                </span>
              </div>

              <div className="space-y-2">
                {worshipRoster
                  .filter(m => m.team === 'Choir')
                  .map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {member.name}
                        </span>
                        <span className="ml-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {member.role}
                        </span>
                      </div>
                      <button
                        onClick={() => isEditable && toggleRosterConfirm(member.id)}
                        disabled={!isEditable}
                        className={`px-2 py-0.5 rounded flex items-center gap-1 font-medium transition-colors ${
                          member.confirmed
                            ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60'
                            : 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60'
                        } ${isEditable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                      >
                        {member.confirmed ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Pending
                          </>
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Sunday 1st Service Band */}
            <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2.5">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Sunday 1st Service Ensemble
                  </h4>
                  <span className="text-[11px] text-slate-400">Traditional Liturgical (P18)</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold">
                  Sun 09:00
                </span>
              </div>

              <div className="space-y-2">
                {worshipRoster
                  .filter(m => m.team === 'Sunday 1st Praise Band')
                  .map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {member.name}
                        </span>
                        <span className="ml-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {member.role}
                        </span>
                      </div>
                      <button
                        onClick={() => isEditable && toggleRosterConfirm(member.id)}
                        disabled={!isEditable}
                        className={`px-2 py-0.5 rounded flex items-center gap-1 font-medium ${
                          member.confirmed
                            ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60'
                            : 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60'
                        } ${isEditable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                      >
                        <CheckCircle2 className="w-3 h-3" /> Confirmed
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Sunday 2nd Service Praise Band & AV */}
            <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2.5">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    Sunday 2nd Band & AV Tech
                  </h4>
                  <span className="text-[11px] text-slate-400">Contemporary & Broadcast (P18)</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold">
                  Sun 11:00
                </span>
              </div>

              <div className="space-y-2">
                {worshipRoster
                  .filter(m => m.team === 'Sunday 2nd Praise Band' || m.team === 'Audio/Visual')
                  .map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {member.name}
                        </span>
                        <span className="ml-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {member.role} ({member.team === 'Audio/Visual' ? 'A/V' : 'Band'})
                        </span>
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* Add Member Modal */}
          {isAddingMember && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white">
                <h4 className="text-base font-bold mb-4">Add Member to Worship Roster (P18)</h4>
                <form onSubmit={handleAddMember} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Member Name
                    </label>
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={e => setNewMemberName(e.target.value)}
                      placeholder="e.g. Timothy Chen"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Target Sub-Team
                    </label>
                    <select
                      value={newMemberTeam}
                      onChange={e => setNewMemberTeam(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none"
                    >
                      <option value="Choir">Sanctuary Choir</option>
                      <option value="Sunday 1st Praise Band">Sunday 1st Service Ensemble</option>
                      <option value="Sunday 2nd Praise Band">Sunday 2nd Contemporary Band</option>
                      <option value="Audio/Visual">Audio / Visual Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Role / Instrument / Vocal Part
                    </label>
                    <select
                      value={newMemberRole}
                      onChange={e => setNewMemberRole(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none"
                    >
                      <option value="Soprano">Soprano</option>
                      <option value="Alto">Alto</option>
                      <option value="Tenor">Tenor</option>
                      <option value="Bass Vocal">Bass Vocal</option>
                      <option value="Worship Leader">Worship Leader</option>
                      <option value="Keyboard">Keyboard / Piano</option>
                      <option value="Acoustic Guitar">Acoustic Guitar</option>
                      <option value="Electric Guitar">Electric Guitar</option>
                      <option value="Bass">Bass Guitar</option>
                      <option value="Drums">Drums</option>
                      <option value="AV Engineer">AV Engineer</option>
                      <option value="Lighting">Lighting Operator</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingMember(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Liturgy & Procedures */}
      {activeSubTab === 'liturgy' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Liturgy & Sacramental Procedures (P17-18)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Special order of worship, holy communion guidelines, baptismal protocols, and chancel altar setup.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedLiturgyId}
                onChange={e => {
                  setSelectedLiturgyId(e.target.value);
                  setIsEditingLiturgyNotes(false);
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                {liturgyProcedures.map(lit => (
                  <option key={lit.id} value={lit.id}>
                    {lit.title} ({lit.season})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedLiturgy && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Order of Worship Flow */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {selectedLiturgy.season} • {selectedLiturgy.pageRef}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedLiturgy.title}
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold rounded-md border border-indigo-200 dark:border-indigo-800">
                    Target Date: {selectedLiturgy.date}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedLiturgy.orderOfWorship.map(step => (
                    <div
                      key={step.stepNumber}
                      className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white">
                            {step.element}
                          </h5>
                          <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                            {step.description}
                          </p>
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium block mt-1">
                            Presiding Leader: {step.leader}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {step.durationMins} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Markdown Chancel Protocol Notes */}
              <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-500" />
                      Liturgy Documentation (liturgy.md)
                    </h4>
                    {isEditable && !isEditingLiturgyNotes && (
                      <button
                        onClick={() => {
                          setLiturgyNotesText(selectedLiturgy.markdownNotes);
                          setIsEditingLiturgyNotes(true);
                        }}
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    )}
                  </div>

                  {isEditingLiturgyNotes ? (
                    <div className="space-y-3">
                      <textarea
                        value={liturgyNotesText}
                        onChange={e => setLiturgyNotesText(e.target.value)}
                        rows={12}
                        className="w-full text-xs font-mono p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsEditingLiturgyNotes(false)}
                          className="px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveLiturgyNotes}
                          className="px-3 py-1 text-xs rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-900/80 rounded-lg p-4 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-slate-800">
                      {selectedLiturgy.markdownNotes}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  Reflected in Virtual File: <code className="text-amber-500">ministries/worship-ministry/liturgy.md</code>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* SubTab 3: Budget & Expense Ledger */}
      {activeSubTab === 'budget' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Financial Ledger Module: Worship Allocation ($28,500 P19)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking exact ministry line items: CCLI copyright fees, piano tuning, IEM audio equipment, choir music, and communion supplies.
              </p>
            </div>

            {isEditable && (
              <button
                onClick={() => setIsAddingBudgetItem(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Budget Line Item</span>
              </button>
            )}
          </div>

          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">TOTAL ALLOCATION (P19)</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">${worshipBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">DISBURSED / SPENT</span>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${spentTotal.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">COMMITTED / POS</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">${committedTotal.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">AVAILABLE BALANCE</span>
              <span className={`text-xl font-bold ${remainingTotal >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                ${remainingTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Itemized Ministry Ledger
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {worshipBudget.items.length} Registered Line Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Line Item Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3 text-right">Allocated</th>
                    <th className="px-4 py-3 text-right">Spent</th>
                    <th className="px-4 py-3 text-right">Remaining</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    {isEditable && <th className="px-4 py-3 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  {worshipBudget.items.map(item => {
                    const balance = item.allocatedAmount - (item.spentAmount + item.committedAmount);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                        <td className="px-4 py-3 font-mono font-semibold text-slate-900 dark:text-slate-100">
                          {item.code}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {item.name}
                          </div>
                          <span className="text-[11px] text-slate-400 block">{item.notes}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                          {item.category}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          ${item.allocatedAmount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-indigo-600 dark:text-indigo-400">
                          ${item.spentAmount.toLocaleString()}
                        </td>
                        <td className={`px-4 py-3 text-right font-mono font-semibold ${balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                          ${balance.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.spentAmount >= item.allocatedAmount
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          }`}>
                            {item.spentAmount >= item.allocatedAmount ? '100% Executed' : 'Active'}
                          </span>
                        </td>
                        {isEditable && (
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                setExpenseItemId(item.id);
                                setExpenseAmount(100);
                              }}
                              className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold cursor-pointer text-[11px]"
                            >
                              + Log Expense
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Expense Logger Modal */}
          {expenseItemId && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Record Worship Expense</h4>
                <p className="text-slate-500 mb-3">
                  Log purchase invoice or disbursement for line item:
                  <span className="font-semibold block text-slate-900 dark:text-white mt-1">
                    {worshipBudget.items.find(i => i.id === expenseItemId)?.name}
                  </span>
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Disbursement Amount ($ USD)
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
                      onClick={() => handleRecordExpenseSubmit('worship', expenseItemId)}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Confirm Disbursement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Budget Item Modal */}
          {isAddingBudgetItem && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Add Worship Budget Line Item</h4>
                <form onSubmit={handleAddBudgetItem} className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Code</label>
                    <input
                      type="text"
                      value={newItemCode}
                      onChange={e => setNewItemCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Line Item Description</label>
                    <input
                      type="text"
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      placeholder="e.g. Stage Acoustic Treatment"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Category</label>
                    <input
                      type="text"
                      value={newItemCategory}
                      onChange={e => setNewItemCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Allocated Amount ($)</label>
                    <input
                      type="number"
                      value={newItemAllocated}
                      onChange={e => setNewItemAllocated(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Notes / Justification</label>
                    <textarea
                      value={newItemNotes}
                      onChange={e => setNewItemNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingBudgetItem(false)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Save Line Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 4: Recurring Program Schedule */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Worship Program Engine (P18)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connected to the Global Church Calendar and room conflict engine.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programs
              .filter(p => p.departmentId === 'worship')
              .map(prog => (
                <div
                  key={prog.id}
                  className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      {prog.frequency}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{prog.pageRef}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{prog.name}</h4>
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {prog.scheduleText}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-sky-500" />
                      {prog.facilityName}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 pt-1 text-[11px]">
                      Leader: <strong className="text-slate-700 dark:text-slate-200">{prog.leaderName}</strong> ({prog.leaderRole})
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
