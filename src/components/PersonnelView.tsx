import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Building2,
  Globe2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Mail,
  Phone
} from 'lucide-react';
import { DepartmentId } from '../types';

interface UnifiedServant {
  id: string;
  name: string;
  departmentId: DepartmentId;
  departmentName: string;
  role: string;
  subTeam: string;
  status: 'Active' | 'Confirmed' | 'Pending';
  pageRef: string;
  email?: string;
  phone?: string;
}

export const PersonnelView: React.FC = () => {
  const {
    worshipRoster,
    stmTrip,
    courses,
    tuitionStudents,
    departments,
    currentUser
  } = useChurch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  // Build unified servant list from church ministries
  const servants: UnifiedServant[] = [
    // Worship servants
    ...worshipRoster.map(w => ({
      id: `wor-${w.id}`,
      name: w.name,
      departmentId: 'worship' as DepartmentId,
      departmentName: 'Worship Ministry',
      role: w.role,
      subTeam: w.team,
      status: (w.confirmed ? 'Confirmed' : 'Pending') as 'Confirmed' | 'Pending',
      pageRef: 'P18',
      email: `${w.name.toLowerCase().replace(/\s+/g, '.')}@church2026.org`
    })),
    // Mission STM servants
    ...stmTrip.participants.map(p => ({
      id: `stm-${p.id}`,
      name: p.name,
      departmentId: 'mission' as DepartmentId,
      departmentName: 'Mission Ministry',
      role: p.role,
      subTeam: 'Indonesia STM 2026',
      status: (p.depositPaid ? 'Confirmed' : 'Pending') as 'Confirmed' | 'Pending',
      pageRef: 'P21',
      email: `${p.name.toLowerCase().replace(/\s+/g, '.')}@church2026.org`
    })),
    // Training instructors
    ...courses.map(c => ({
      id: `trn-${c.id}`,
      name: c.instructor,
      departmentId: 'training' as DepartmentId,
      departmentName: 'Training Ministry',
      role: 'Sunday School Instructor',
      subTeam: `Tier ${c.tierNumber}: ${c.tier}`,
      status: 'Active' as const,
      pageRef: 'P23',
      email: `${c.instructor.toLowerCase().replace(/\s+/g, '.')}@church2026.org`
    })),
    // Tuition Tutors & Outreach
    {
      id: 'srv-tutor-1',
      name: 'Kevin Zhang',
      departmentId: 'service' as DepartmentId,
      departmentName: 'Service Ministry',
      role: 'Senior Math Tutor & Mentor',
      subTeam: 'Children Tutoring Program',
      status: 'Active' as const,
      pageRef: 'P28',
      email: 'kevin.zhang@ntu.edu.tw'
    },
    {
      id: 'srv-tutor-2',
      name: 'Emily Chen',
      departmentId: 'service' as DepartmentId,
      departmentName: 'Service Ministry',
      role: 'English Literacy Mentor',
      subTeam: 'Children Tutoring Program',
      status: 'Active' as const,
      pageRef: 'P28',
      email: 'emily.chen@ntu.edu.tw'
    },
    {
      id: 'srv-hub-1',
      name: 'Sister Ruth Yang',
      departmentId: 'service' as DepartmentId,
      departmentName: 'Service Ministry',
      role: 'Center Host & Facilities Coordinator',
      subTeam: 'Tea Fruit Hill Space',
      status: 'Active' as const,
      pageRef: 'P29',
      email: 'ruth.yang@church2026.org'
    }
  ];

  const filteredServants = servants.filter(s => {
    const matchesDept = selectedDeptFilter === 'all' || s.departmentId === selectedDeptFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subTeam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const deptPills: Record<DepartmentId, string> = {
    worship: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    mission: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    training: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    service: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Pages 18, 21, 24, 28
                </span>
                <span className="text-xs text-slate-400 font-mono">CONSOLIDATED ROSTERS</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Ministry Personnel & Volunteer Directory
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Centralized registry connecting church members to ministry service tracks, training credentials, and confirmations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
              <span className="text-[11px] text-slate-400 block font-medium">ACTIVE SERVANTS</span>
              <span className="text-lg font-bold text-amber-400">{servants.length} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedDeptFilter}
            onChange={e => setSelectedDeptFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
          >
            <option value="all">All Ministries ({servants.length})</option>
            <option value="worship">Worship Ministry (P18)</option>
            <option value="mission">Mission Ministry (P21)</option>
            <option value="training">Training Ministry (P23)</option>
            <option value="service">Service Ministry (P28-29)</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search member name, role, or team..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Servants Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Registered Ministry Workers ({filteredServants.length})
          </h4>
          <span className="text-xs text-slate-400">
            Source: Ministry Personnel Sections (P1-30)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Member Name</th>
                <th className="px-4 py-3">Ministry</th>
                <th className="px-4 py-3">Assigned Role</th>
                <th className="px-4 py-3">Ministry Unit / Team</th>
                <th className="px-4 py-3">Contact Email</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Doc Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              {filteredServants.map(servant => (
                <tr key={servant.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                    {servant.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deptPills[servant.departmentId]}`}>
                      {servant.departmentName}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    {servant.role}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {servant.subTeam}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {servant.email}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                      servant.status === 'Active' || servant.status === 'Confirmed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                    }`}>
                      {servant.status === 'Active' || servant.status === 'Confirmed' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {servant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-slate-400 font-semibold">
                    {servant.pageRef}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
