import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  GraduationCap,
  BookOpen,
  Bot,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  Lock,
  Layers,
  Sparkles,
  Calendar
} from 'lucide-react';
import { SundaySchoolTier } from '../../types';

export const TrainingDeptView: React.FC = () => {
  const {
    canEditDepartment,
    courses,
    updateCourseEnrollment,
    aiSeminar,
    registerAttendeeAISeminar,
    toggleAttendeeAttended,
    budgets,
    recordExpenditure
  } = useChurch();

  const isEditable = canEditDepartment('training');
  const [activeSubTab, setActiveSubTab] = useState<'curriculum' | 'ai-seminar' | 'budget'>('curriculum');

  // AI Seminar Registration Form state
  const [isRegistering, setIsRegistering] = useState(false);
  const [attName, setAttName] = useState('');
  const [attEmail, setAttEmail] = useState('');
  const [attRole, setAttRole] = useState('Small Group Leader');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // Course Enrollment Edit Modal
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newEnrollmentCount, setNewEnrollmentCount] = useState<number>(0);

  // Expense modal
  const [expenseItemId, setExpenseItemId] = useState<string | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const trainingBudget = budgets.find(b => b.departmentId === 'training') || {
    totalAllocation: 23500,
    items: []
  };

  const spentTotal = trainingBudget.items.reduce((s, it) => s + it.spentAmount, 0);
  const committedTotal = trainingBudget.items.reduce((s, it) => s + it.committedAmount, 0);
  const remainingTotal = trainingBudget.totalAllocation - (spentTotal + committedTotal);

  const totalStudents = courses.reduce((acc, c) => acc + c.enrolledCount, 0);

  const handleRegisterAISeminar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attName.trim() || !attEmail.trim()) return;
    const ok = registerAttendeeAISeminar(attName.trim(), attEmail.trim(), attRole);
    if (ok) {
      setRegSuccessMsg(`Successfully registered ${attName} for the AI Bible Study Workshop!`);
      setAttName('');
      setAttEmail('');
      setIsRegistering(false);
      setTimeout(() => setRegSuccessMsg(''), 4000);
    } else {
      alert('Workshop is currently at full capacity (30 seats).');
    }
  };

  const handleSaveEnrollment = () => {
    if (editingCourseId) {
      updateCourseEnrollment(editingCourseId, newEnrollmentCount);
      setEditingCourseId(null);
    }
  };

  const handleRecordExpenseSubmit = (deptId: 'training', itemId: string) => {
    if (expenseAmount > 0) {
      recordExpenditure(deptId, itemId, expenseAmount);
      setExpenseItemId(null);
      setExpenseAmount(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-indigo-900/50 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-indigo-500 text-white uppercase tracking-wider">
                  Pages 23-26
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE: MIN-TRN-2026</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Christian Education & Training Ministry
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Director: <span className="text-indigo-300 font-medium">Elder Timothy Wang</span> • 4-Tier Sunday School, AI Workshop (P25), and $23,500 Budget
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">TOTAL STUDENTS</span>
              <span className="text-lg font-bold text-indigo-400">{totalStudents} Active</span>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">AI WORKSHOP (P25)</span>
              <span className="text-lg font-bold text-emerald-400">
                {aiSeminar.registeredAttendees.length} / {aiSeminar.capacity} Seats
              </span>
            </div>
          </div>
        </div>

        {/* RBAC Notice */}
        {!isEditable && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/80">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              You are currently viewing in <strong>Read-Only Mode</strong>. Switch role to <strong>Elder Timothy Wang</strong> or <strong>Senior Pastor</strong> in the header to modify course curriculums or training budgets.
            </span>
          </div>
        )}
      </div>

      {regSuccessMsg && (
        <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{regSuccessMsg}</span>
        </div>
      )}

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('curriculum')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'curriculum'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4-Tier Sunday School (P23-24)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-indigo-600 text-white font-mono">
            4 Tiers
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('ai-seminar')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'ai-seminar'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Bible Study Workshop (P25)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-amber-500 text-slate-950 font-bold font-mono">
            {aiSeminar.registeredAttendees.length}/{aiSeminar.capacity}
          </span>
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
          <span>Training Budget ($23,500 P26)</span>
        </button>
      </div>

      {/* SubTab 1: 4-Tier Sunday School System */}
      {activeSubTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Progressive 4-Tier Sunday School Curriculum Engine (P23-24)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Systematic discipleship framework: Beginner, Applied, Spiritual Reading, and Advanced Research tiers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => {
              const tierBadgeColor = {
                1: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
                2: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800',
                3: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
                4: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
              }[course.tierNumber];

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${tierBadgeColor}`}>
                        Tier {course.tierNumber}: {course.tier}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{course.pageRef}</span>
                    </div>

                    {/* Enrollment count & capacity */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {course.enrolledCount} / {course.capacity} Enrolled
                      </span>
                      {isEditable && (
                        <button
                          onClick={() => {
                            setEditingCourseId(course.id);
                            setNewEnrollmentCount(course.enrolledCount);
                          }}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {course.curriculumSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">INSTRUCTOR (P23)</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{course.instructor}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">VENUE & TIME</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{course.classroom}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">PREREQUISITE</span>
                      <span className="text-slate-600 dark:text-slate-300 text-[11px]">{course.prerequisites}</span>
                    </div>
                  </div>

                  {/* Sample syllabus modules */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Sample Course Modules:
                    </span>
                    <div className="space-y-1 text-xs">
                      {course.syllabusWeeks.map(wk => (
                        <div
                          key={wk.week}
                          className="flex items-start justify-between gap-2 p-1.5 rounded bg-slate-50 dark:bg-slate-900/40 text-[11px]"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            Wk {wk.week}: {wk.topic}
                          </span>
                          <span className="text-slate-400 italic text-[10px] shrink-0">
                            {wk.reading}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Edit Enrollment Modal */}
          {editingCourseId && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-xs w-full p-5 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="font-bold text-sm mb-3">Update Sunday School Enrollment</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Active Attendees Count
                    </label>
                    <input
                      type="number"
                      value={newEnrollmentCount}
                      onChange={e => setNewEnrollmentCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 font-mono"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingCourseId(null)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEnrollment}
                      className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Save Count
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: AI Bible Study Workshop (P25) */}
      {activeSubTab === 'ai-seminar' && (
        <div className="space-y-6">
          {/* Seminar Overview Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500 text-slate-950 uppercase tracking-wider">
                    {aiSeminar.pageRef}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Special Seminar Engine</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {aiSeminar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Keynote Speaker: <strong className="text-slate-800 dark:text-slate-200">{aiSeminar.speaker}</strong> • {aiSeminar.date} ({aiSeminar.time})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">ATTENDEE REGISTRATION</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {aiSeminar.registeredAttendees.length} / {aiSeminar.capacity} Filled
                  </span>
                </div>
                {aiSeminar.registeredAttendees.length < aiSeminar.capacity && (
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
                  >
                    + Register Attendee
                  </button>
                )}
              </div>
            </div>

            <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                Workshop Syllabus & Objectives (P25):
              </span>
              {aiSeminar.overview}
            </div>
          </div>

          {/* Registered Attendees Roster */}
          <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Workshop Enrollment Roster (P25)
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                Capacity: 30 Seats • Budget Allocation: ${aiSeminar.budgetAllocation.toLocaleString()}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Attendee Name</th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Ministry Role</th>
                    <th className="px-4 py-3">Registered Date</th>
                    <th className="px-4 py-3 text-center">Attendance Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  {aiSeminar.registeredAttendees.map((att, idx) => (
                    <tr key={att.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-mono font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {att.name}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono">
                        {att.email}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          {att.ministryRole}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono">
                        {att.registeredAt}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          disabled={!isEditable}
                          onClick={() => isEditable && toggleAttendeeAttended(att.id)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 mx-auto ${
                            att.attended
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          } ${isEditable ? 'cursor-pointer hover:opacity-80' : ''}`}
                        >
                          {att.attended ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {att.attended ? 'Present' : 'Not Marked'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Register Modal */}
          {isRegistering && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Register for AI Bible Study Workshop (P25)</h4>
                <form onSubmit={handleRegisterAISeminar} className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={attName}
                      onChange={e => setAttName(e.target.value)}
                      placeholder="e.g. Deacon Mark Wu"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={attEmail}
                      onChange={e => setAttEmail(e.target.value)}
                      placeholder="e.g. mark.wu@church2026.org"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Ministry Role</label>
                    <input
                      type="text"
                      value={attRole}
                      onChange={e => setAttRole(e.target.value)}
                      placeholder="e.g. Sunday School Teacher"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Confirm Registration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 3: Training Budget & Ledger ($23,500 P26) */}
      {activeSubTab === 'budget' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Training Ministry Budget ($23,500 P26)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curriculum printing, AI Workshop honorariums, leader retreats, and theological library acquisitions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">TOTAL ALLOCATION (P26)</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">${trainingBudget.totalAllocation.toLocaleString()}</span>
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
                  <th className="px-4 py-3">Line Item Name</th>
                  <th className="px-4 py-3 text-right">Allocated</th>
                  <th className="px-4 py-3 text-right">Spent</th>
                  <th className="px-4 py-3 text-right">Committed</th>
                  <th className="px-4 py-3 text-right">Remaining</th>
                  {isEditable && <th className="px-4 py-3 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                {trainingBudget.items.map(item => {
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
                      <td className="px-4 py-3 text-right font-mono text-indigo-600 dark:text-indigo-400">
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
                              setExpenseAmount(250);
                            }}
                            className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-semibold cursor-pointer text-[11px]"
                          >
                            + Disburse
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
                <h4 className="text-sm font-bold mb-3">Record Training Expense</h4>
                <p className="text-slate-500 mb-3">
                  Log disbursement for:
                  <span className="font-semibold block text-slate-900 dark:text-white mt-1">
                    {trainingBudget.items.find(i => i.id === expenseItemId)?.name}
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
                      onClick={() => handleRecordExpenseSubmit('training', expenseItemId)}
                      className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Confirm Disbursement
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
