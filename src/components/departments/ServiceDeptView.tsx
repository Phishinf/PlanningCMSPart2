import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  HeartHandshake,
  Coffee,
  BookOpen,
  Gift,
  DollarSign,
  Users,
  Plus,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { SharingSpaceSlot, TuitionStudent } from '../../types';

export const ServiceDeptView: React.FC = () => {
  const {
    canEditDepartment,
    sharingSpaceSlots,
    addSharingSpaceSlot,
    tuitionStudents,
    addTuitionStudent,
    updateTuitionStudent,
    outreachServices,
    budgets,
    recordExpenditure
  } = useChurch();

  const isEditable = canEditDepartment('service');
  const [activeSubTab, setActiveSubTab] = useState<'tea-fruit' | 'tuition' | 'feasts' | 'budget'>('tea-fruit');

  // Space booking modal state
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [bookRoom, setBookRoom] = useState('Main Community Cafe & Quiet Study Pods');
  const [bookDate, setBookDate] = useState('Thursdays');
  const [bookTime, setBookTime] = useState('14:00 - 17:00');
  const [bookPartner, setBookPartner] = useState('');
  const [bookPurpose, setBookPurpose] = useState('');
  const [bookAttendees, setBookAttendees] = useState(25);

  // New tuition student modal state
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [stuName, setStuName] = useState('');
  const [stuGrade, setStuGrade] = useState('Grade 4');
  const [stuTutor, setStuTutor] = useState('Kevin Zhang');
  const [stuSubjects, setStuSubjects] = useState('Mathematics, Reading');
  const [stuGuardian, setStuGuardian] = useState('');

  // Expense modal
  const [expenseItemId, setExpenseItemId] = useState<string | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const serviceBudget = budgets.find(b => b.departmentId === 'service') || {
    totalAllocation: 217500,
    items: []
  };

  const spentTotal = serviceBudget.items.reduce((s, it) => s + it.spentAmount, 0);
  const committedTotal = serviceBudget.items.reduce((s, it) => s + it.committedAmount, 0);
  const remainingTotal = serviceBudget.totalAllocation - (spentTotal + committedTotal);

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookPartner.trim() || !bookPurpose.trim()) return;
    addSharingSpaceSlot({
      roomName: bookRoom,
      date: bookDate,
      timeSlot: bookTime,
      communityPartner: bookPartner.trim(),
      purpose: bookPurpose.trim(),
      attendeeEstimate: bookAttendees,
      supervisorName: 'Deaconess Sarah Lee',
      status: 'Approved',
      notes: 'Scheduled by Service Ministry'
    });
    setBookPartner('');
    setBookPurpose('');
    setIsAddingBooking(false);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuName.trim()) return;
    addTuitionStudent({
      name: stuName.trim(),
      grade: stuGrade,
      assignedTutor: stuTutor,
      subjects: stuSubjects.split(',').map(s => s.trim()),
      dayTime: 'Wed & Fri 16:30-18:00',
      attendanceRate: 100,
      guardianContact: stuGuardian || 'Not listed',
      subsidized: true
    });
    setStuName('');
    setStuGuardian('');
    setIsAddingStudent(false);
  };

  const handleRecordExpenseSubmit = (deptId: 'service', itemId: string) => {
    if (expenseAmount > 0) {
      recordExpenditure(deptId, itemId, expenseAmount);
      setExpenseItemId(null);
      setExpenseAmount(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-6 border border-rose-900/50 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-400">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-rose-500 text-white uppercase tracking-wider">
                  Pages 27-30
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE: MIN-SRV-2026</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Community Service & Outreach Ministry
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Director: <span className="text-rose-300 font-medium">Deaconess Sarah Lee</span> • Tea Fruit Hill Hub (P29), Children's Tuition (P28), Love Feasts & $217,500 Budget (P30)
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">OUTREACH ALLOCATION</span>
              <span className="text-lg font-bold text-rose-400">${serviceBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">TUITION CHILDREN</span>
              <span className="text-lg font-bold text-emerald-400">{tuitionStudents.length} Students</span>
            </div>
          </div>
        </div>

        {/* RBAC Notice */}
        {!isEditable && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/80">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              You are currently viewing in <strong>Read-Only Mode</strong>. Switch role to <strong>Deaconess Sarah Lee</strong> or <strong>Senior Pastor</strong> in the header to modify center schedules or service budgets.
            </span>
          </div>
        )}
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('tea-fruit')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'tea-fruit'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Coffee className="w-4 h-4" />
          <span>Tea Fruit Hill Center (P29)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-rose-600 text-white font-mono">
            {sharingSpaceSlots.length} Bookings
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('tuition')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'tuition'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Children Tutoring Program (P28)</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-indigo-600 text-white font-mono">
            {tuitionStudents.length} Students
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('feasts')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
            activeSubTab === 'feasts'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Love Feasts & Mother's Day (P27)</span>
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
          <span>Budget & Relief ($217,500 P30)</span>
        </button>
      </div>

      {/* SubTab 1: Tea Fruit Hill Sharing Space Manager (P29) */}
      {activeSubTab === 'tea-fruit' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500 text-white uppercase tracking-wider">
                    Page 29
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Tea Fruit Hill Hub (茶果山社群共享空間)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  No. 48 Shan-Gao Rd (Capacity: 90)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Hours: Tuesday to Saturday 10:00 - 18:00 • On-site Lead: Sister Ruth Yang
                </p>
              </div>

              {isEditable && (
                <button
                  onClick={() => setIsAddingBooking(true)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
                >
                  + Add Community Partner Booking
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {sharingSpaceSlots.map(slot => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {slot.roomName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {slot.status}
                    </span>
                  </div>

                  <div className="text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                      Partner: {slot.communityPartner}
                    </p>
                    <p className="mt-1">{slot.purpose}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {slot.date} ({slot.timeSlot})
                    </span>
                    <span className="font-mono font-medium">~{slot.attendeeEstimate} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Booking Modal */}
          {isAddingBooking && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Schedule Tea Fruit Hill Space Booking (P29)</h4>
                <form onSubmit={handleAddBooking} className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Room / Space Area</label>
                    <select
                      value={bookRoom}
                      onChange={e => setBookRoom(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    >
                      <option value="Main Community Cafe & Quiet Study Pods">Main Community Cafe & Study Pods</option>
                      <option value="Community Counseling Nook (Private Room B)">Community Counseling Nook</option>
                      <option value="Multi-Purpose Workshop Gallery">Multi-Purpose Workshop Gallery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Community Partner Name</label>
                    <input
                      type="text"
                      value={bookPartner}
                      onChange={e => setBookPartner(e.target.value)}
                      placeholder="e.g. Senior Citizens Calligraphy Club"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Purpose & Activities</label>
                    <textarea
                      value={bookPurpose}
                      onChange={e => setBookPurpose(e.target.value)}
                      placeholder="e.g. Weekly calligraphy practice and organic tea appreciation"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Day of Week</label>
                      <input
                        type="text"
                        value={bookDate}
                        onChange={e => setBookDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Time Slot</label>
                      <input
                        type="text"
                        value={bookTime}
                        onChange={e => setBookTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingBooking(false)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Children Tutoring Program (P28) */}
      {activeSubTab === 'tuition' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Children After-School Tuition Program (P28)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                18 neighborhood elementary and junior high students paired with university volunteer tutors for homework mentorship.
              </p>
            </div>

            {isEditable && (
              <button
                onClick={() => setIsAddingStudent(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
              >
                + Enroll Student
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Assigned Volunteer Tutor</th>
                    <th className="px-4 py-3">Focus Subjects</th>
                    <th className="px-4 py-3">Schedule</th>
                    <th className="px-4 py-3">Attendance</th>
                    <th className="px-4 py-3">Guardian Contact</th>
                    {isEditable && <th className="px-4 py-3 text-center">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  {tuitionStudents.map(stu => (
                    <tr key={stu.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {stu.name}
                      </td>
                      <td className="px-4 py-3 font-mono">{stu.grade}</td>
                      <td className="px-4 py-3 font-medium text-indigo-600 dark:text-indigo-400">
                        {stu.assignedTutor}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {stu.subjects.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-medium"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{stu.dayTime}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {stu.attendanceRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[11px]">{stu.guardianContact}</td>
                      {isEditable && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              const newRate = prompt('Update attendance rate percentage (0-100):', String(stu.attendanceRate));
                              if (newRate !== null) {
                                updateTuitionStudent(stu.id, { attendanceRate: Number(newRate) });
                              }
                            }}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Student Modal */}
          {isAddingStudent && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
                <h4 className="text-sm font-bold mb-3">Enroll Tuition Student (P28)</h4>
                <form onSubmit={handleAddStudent} className="space-y-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Student Name</label>
                    <input
                      type="text"
                      value={stuName}
                      onChange={e => setStuName(e.target.value)}
                      placeholder="e.g. Jason Kuo"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Grade Level</label>
                      <input
                        type="text"
                        value={stuGrade}
                        onChange={e => setStuGrade(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Assigned Tutor</label>
                      <input
                        type="text"
                        value={stuTutor}
                        onChange={e => setStuTutor(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Subjects (comma separated)</label>
                    <input
                      type="text"
                      value={stuSubjects}
                      onChange={e => setStuSubjects(e.target.value)}
                      placeholder="Math, English, Science"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Guardian Contact Phone</label>
                    <input
                      type="text"
                      value={stuGuardian}
                      onChange={e => setStuGuardian(e.target.value)}
                      placeholder="e.g. Mrs. Kuo (0911-***-222)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingStudent(false)}
                      className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Enroll
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 3: Love Feasts & Mother's Day Outreach (P27) */}
      {activeSubTab === 'feasts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Outreach Service Scheduling (P27)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quarterly community banquets ("Love Feasts") and seasonal gift distribution for single mothers and seniors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outreachServices.map(service => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      {service.pageRef}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Budget: ${service.budget.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white mt-2">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-xs border border-slate-100 dark:border-slate-800 space-y-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">TARGET AUDIENCE</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{service.targetAudience}</span>
                    </div>
                    <div className="pt-1 flex justify-between">
                      <span className="text-slate-400 text-[10px]">COORDINATOR</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{service.coordinator}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded">
                  Impact: {service.impactMetrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 4: Service Budget ($217,500 P30) */}
      {activeSubTab === 'budget' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Service Ministry Budget ($217,500 P30)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lease and utility operations for Tea Fruit Hill, tutoring program supplies, community banquets, and crisis benevolence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">TOTAL ALLOCATION (P30)</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">${serviceBudget.totalAllocation.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">DISBURSED / SPENT</span>
              <span className="text-xl font-bold text-rose-600 dark:text-rose-400">${spentTotal.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">COMMITTED / LEASES</span>
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
                  <th className="px-4 py-3">Service Line Item</th>
                  <th className="px-4 py-3 text-right">Allocated</th>
                  <th className="px-4 py-3 text-right">Spent</th>
                  <th className="px-4 py-3 text-right">Committed</th>
                  <th className="px-4 py-3 text-right">Remaining</th>
                  {isEditable && <th className="px-4 py-3 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                {serviceBudget.items.map(item => {
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
                      <td className="px-4 py-3 text-right font-mono text-rose-600 dark:text-rose-400">
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
                              setExpenseAmount(500);
                            }}
                            className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-semibold cursor-pointer text-[11px]"
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
                <h4 className="text-sm font-bold mb-3">Record Service Disbursement</h4>
                <p className="text-slate-500 mb-3">
                  Confirm payment for:
                  <span className="font-semibold block text-slate-900 dark:text-white mt-1">
                    {serviceBudget.items.find(i => i.id === expenseItemId)?.name}
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
                      onClick={() => handleRecordExpenseSubmit('service', expenseItemId)}
                      className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold"
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
