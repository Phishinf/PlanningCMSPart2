import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Filter,
  Trash2,
  Lock,
  Building2,
  Users,
  Info
} from 'lucide-react';
import { DepartmentId, CalendarScheduleItem } from '../types';

export const CalendarView: React.FC = () => {
  const {
    calendarItems,
    addCalendarItem,
    removeCalendarItem,
    conflicts,
    currentUser,
    departments
  } = useChurch();

  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [facilityFilter, setFacilityFilter] = useState<string>('all');
  const [onlyConflicts, setOnlyConflicts] = useState(false);

  // New Event Modal
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDept, setEventDept] = useState<DepartmentId>('worship');
  const [eventFacilityId, setEventFacilityId] = useState('fac-sanctuary');
  const [eventFacilityName, setEventFacilityName] = useState('Main Sanctuary (Level 2)');
  const [eventDay, setEventDay] = useState('Thursday');
  const [eventStart, setEventStart] = useState('19:30');
  const [eventEnd, setEventEnd] = useState('21:30');
  const [eventLeader, setEventLeader] = useState('Rev. David Chen');
  const [eventRecurrence, setEventRecurrence] = useState<'Weekly' | 'Bi-Weekly' | 'Monthly' | 'One-Time'>('Weekly');
  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);

  const facilities = [
    { id: 'fac-sanctuary', name: 'Main Sanctuary (Level 2)' },
    { id: 'fac-chapel', name: 'Fellowship Chapel (Level 1)' },
    { id: 'fac-room201', name: 'Room 201 Education Wing' },
    { id: 'fac-room202', name: 'Room 202 Education Wing' },
    { id: 'fac-hub-main', name: 'Tea Fruit Hill Community Hub' },
    { id: 'fac-hub-counsel', name: 'Tea Fruit Hill Counseling Room' }
  ];

  const handleFacilityChange = (facId: string) => {
    setEventFacilityId(facId);
    const found = facilities.find(f => f.id === facId);
    if (found) setEventFacilityName(found.name);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    // Pre-check for conflict
    const potentialConflict = calendarItems.find(
      it =>
        it.facilityId === eventFacilityId &&
        it.dayOfWeek === eventDay &&
        it.startTime < eventEnd &&
        it.endTime > eventStart
    );

    if (potentialConflict) {
      if (!confirm(`Warning: This booking conflicts with "${potentialConflict.title}" (${potentialConflict.departmentName}) in ${eventFacilityName} at ${potentialConflict.startTime}-${potentialConflict.endTime}. Do you want to proceed and flag this conflict?`)) {
        return;
      }
    }

    addCalendarItem({
      departmentId: eventDept,
      departmentName: departments.find(d => d.id === eventDept)?.name || 'Ministry',
      title: eventTitle.trim(),
      facilityId: eventFacilityId,
      facilityName: eventFacilityName,
      dayOfWeek: eventDay,
      startTime: eventStart,
      endTime: eventEnd,
      leader: eventLeader,
      recurrence: eventRecurrence,
      sourceModule: 'Calendar Integration Engine'
    });

    setEventTitle('');
    setIsAddingEvent(false);
  };

  // Filter items
  const filteredItems = calendarItems.filter(item => {
    if (onlyConflicts && !item.hasConflict) return false;
    if (deptFilter !== 'all' && item.departmentId !== deptFilter) return false;
    if (facilityFilter !== 'all' && item.facilityId !== facilityFilter) return false;
    return true;
  });

  const deptPills: Record<DepartmentId, string> = {
    worship: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    mission: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    training: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    service: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-indigo-500 text-white uppercase tracking-wider">
                  Phase 1 + 2 Integration
                </span>
                <span className="text-xs text-slate-400 font-mono">GLOBAL CROSS-MINISTRY ENGINE</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Global Church Master Calendar & Facility Manager
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Harmonizing weekly practices, courses, community reservations, and liturgical assemblies with real-time room conflict detection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingEvent(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Book Facility Space</span>
            </button>
          </div>
        </div>

        {/* Conflict Alert Banner */}
        {conflicts.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>{conflicts.length} Room Collision Conflict Detected!</strong> Multiple ministries have scheduled events in the same facility at overlapping time slots.
              </span>
            </div>
            <button
              onClick={() => setOnlyConflicts(prev => !prev)}
              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] cursor-pointer"
            >
              {onlyConflicts ? 'Show All Bookings' : 'Filter Conflicts Only'}
            </button>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-500">Ministry:</span>
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Ministries</option>
              <option value="worship">Worship</option>
              <option value="mission">Mission</option>
              <option value="training">Training</option>
              <option value="service">Service</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Facility:</span>
            <select
              value={facilityFilter}
              onChange={e => setFacilityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Facilities</option>
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyConflicts}
              onChange={e => setOnlyConflicts(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>Show Room Collisions Only ({conflicts.length})</span>
          </label>
        </div>
      </div>

      {/* Schedule Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border shadow-xs transition-all space-y-3 flex flex-col justify-between ${
              item.hasConflict
                ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-400 dark:border-rose-800 ring-1 ring-rose-400'
                : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deptPills[item.departmentId]}`}>
                  {item.departmentName}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {item.recurrence}
                </span>
              </div>

              {item.hasConflict && (
                <div className="mt-2.5 p-2 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 text-[11px] font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Room Overlap: {item.conflictWithTitle}</span>
                </div>
              )}

              <h4 className="font-bold text-slate-900 dark:text-white text-base mt-2">
                {item.title}
              </h4>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 mt-2">
                <p className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.dayOfWeek}s at {item.startTime} - {item.endTime}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.facilityName}</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Coordinator: {item.leader}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{item.sourceModule}</span>
              <button
                onClick={() => removeCalendarItem(item.id)}
                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Booking Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
            <h4 className="text-sm font-bold mb-3">Book Global Church Facility Space</h4>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Event / Activity Name</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  placeholder="e.g. Special Easter Rehearsal"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Booking Ministry</label>
                  <select
                    value={eventDept}
                    onChange={e => setEventDept(e.target.value as DepartmentId)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                  >
                    <option value="worship">Worship</option>
                    <option value="mission">Mission</option>
                    <option value="training">Training</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Recurrence</label>
                  <select
                    value={eventRecurrence}
                    onChange={e => setEventRecurrence(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Facility Room</label>
                <select
                  value={eventFacilityId}
                  onChange={e => handleFacilityChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Day</label>
                  <select
                    value={eventDay}
                    onChange={e => setEventDay(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    value={eventStart}
                    onChange={e => setEventStart(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    value={eventEnd}
                    onChange={e => setEventEnd(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Leader / Person in Charge</label>
                <input
                  type="text"
                  value={eventLeader}
                  onChange={e => setEventLeader(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
                  className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
