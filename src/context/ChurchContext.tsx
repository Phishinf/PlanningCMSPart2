import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CurrentUser,
  DepartmentId,
  DepartmentBudget,
  BudgetLineItem,
  Program,
  VolunteerMember,
  WorshipRosterMember,
  LiturgyProcedure,
  ShortTermMission,
  SupportedMissionary,
  SundaySchoolCourse,
  SeminarEvent,
  SharingSpaceSlot,
  TuitionStudent,
  OutreachService,
  ChurchFacility,
  CalendarScheduleItem,
  SchedulingConflict,
  DepartmentHealthMetric
} from '../types';
import {
  INITIAL_CURRENT_USER,
  AVAILABLE_USERS,
  INITIAL_FACILITIES,
  INITIAL_DEPARTMENT_BUDGETS,
  INITIAL_PROGRAMS,
  INITIAL_WORSHIP_ROSTER,
  INITIAL_LITURGY_PROCEDURES,
  INITIAL_STM_TRIP,
  INITIAL_MISSIONARIES,
  INITIAL_SUNDAY_SCHOOL_COURSES,
  INITIAL_AI_SEMINAR,
  INITIAL_SHARING_SPACE_SLOTS,
  INITIAL_TUITION_STUDENTS,
  INITIAL_OUTREACH_SERVICES,
  INITIAL_VOLUNTEER_POOL,
  INITIAL_CALENDAR_SCHEDULE,
  INITIAL_HEALTH_REPORTS
} from '../data/initialData';
import { INITIAL_VIRTUAL_FILES, VirtualFile } from '../data/virtualFileSystem';

interface ChurchContextType {
  currentUser: CurrentUser;
  availableUsers: CurrentUser[];
  setCurrentUser: (user: CurrentUser) => void;
  canEditDepartment: (deptId: DepartmentId) => boolean;
  canEditFinance: () => boolean;
  facilities: ChurchFacility[];
  budgets: DepartmentBudget[];
  programs: Program[];
  worshipRoster: WorshipRosterMember[];
  liturgyProcedures: LiturgyProcedure[];
  stmTrip: ShortTermMission;
  missionaries: SupportedMissionary[];
  courses: SundaySchoolCourse[];
  aiSeminar: SeminarEvent;
  sharingSpaceSlots: SharingSpaceSlot[];
  tuitionStudents: TuitionStudent[];
  outreachServices: OutreachService[];
  volunteers: VolunteerMember[];
  calendarSchedule: CalendarScheduleItem[];
  conflicts: SchedulingConflict[];
  healthReports: DepartmentHealthMetric[];
  virtualFiles: VirtualFile[];

  // Mutations
  updateBudgetLineItem: (deptId: DepartmentId, itemId: string, updates: Partial<BudgetLineItem>) => void;
  addBudgetLineItem: (deptId: DepartmentId, item: Omit<BudgetLineItem, 'id'>) => void;
  recordExpenditure: (deptId: DepartmentId, itemId: string, amount: number) => void;
  addProgram: (program: Omit<Program, 'id'>) => void;
  updateProgram: (programId: string, updates: Partial<Program>) => void;
  deleteProgram: (programId: string) => void;
  toggleRosterConfirm: (rosterId: string) => void;
  addRosterMember: (member: Omit<WorshipRosterMember, 'id'>) => void;
  updateLiturgyNotes: (id: string, markdownNotes: string) => void;
  updateParticipantStatus: (participantId: string, updates: Partial<ShortTermMission['participants'][0]>) => void;
  toggleSTMChecklist: (index: number) => void;
  updateCourseEnrollment: (courseId: string, count: number) => void;
  registerAttendeeAISeminar: (name: string, email: string, ministryRole: string) => boolean;
  toggleAttendeeAttended: (attendeeId: string) => void;
  addSharingSpaceSlot: (slot: Omit<SharingSpaceSlot, 'id'>) => void;
  addTuitionStudent: (student: Omit<TuitionStudent, 'id'>) => void;
  updateTuitionStudent: (id: string, updates: Partial<TuitionStudent>) => void;
  addVolunteer: (volunteer: Omit<VolunteerMember, 'id'>) => void;
  addCalendarEvent: (event: Omit<CalendarScheduleItem, 'id'>) => boolean;
  updateVirtualFileContent: (path: string, newContent: string) => void;
  resetAllData: () => void;
  exportDataJSON: () => void;
}

const STORAGE_KEY = 'church_cms_2026_data_v1';

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER);
  const [facilities] = useState<ChurchFacility[]>(INITIAL_FACILITIES);
  const [budgets, setBudgets] = useState<DepartmentBudget[]>(INITIAL_DEPARTMENT_BUDGETS);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [worshipRoster, setWorshipRoster] = useState<WorshipRosterMember[]>(INITIAL_WORSHIP_ROSTER);
  const [liturgyProcedures, setLiturgyProcedures] = useState<LiturgyProcedure[]>(INITIAL_LITURGY_PROCEDURES);
  const [stmTrip, setStmTrip] = useState<ShortTermMission>(INITIAL_STM_TRIP);
  const [missionaries, setMissionaries] = useState<SupportedMissionary[]>(INITIAL_MISSIONARIES);
  const [courses, setCourses] = useState<SundaySchoolCourse[]>(INITIAL_SUNDAY_SCHOOL_COURSES);
  const [aiSeminar, setAiSeminar] = useState<SeminarEvent>(INITIAL_AI_SEMINAR);
  const [sharingSpaceSlots, setSharingSpaceSlots] = useState<SharingSpaceSlot[]>(INITIAL_SHARING_SPACE_SLOTS);
  const [tuitionStudents, setTuitionStudents] = useState<TuitionStudent[]>(INITIAL_TUITION_STUDENTS);
  const [outreachServices, setOutreachServices] = useState<OutreachService[]>(INITIAL_OUTREACH_SERVICES);
  const [volunteers, setVolunteers] = useState<VolunteerMember[]>(INITIAL_VOLUNTEER_POOL);
  const [calendarSchedule, setCalendarSchedule] = useState<CalendarScheduleItem[]>(INITIAL_CALENDAR_SCHEDULE);
  const [virtualFiles, setVirtualFiles] = useState<VirtualFile[]>(INITIAL_VIRTUAL_FILES);

  // Load from local storage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.budgets) setBudgets(parsed.budgets);
        if (parsed.programs) setPrograms(parsed.programs);
        if (parsed.worshipRoster) setWorshipRoster(parsed.worshipRoster);
        if (parsed.liturgyProcedures) setLiturgyProcedures(parsed.liturgyProcedures);
        if (parsed.stmTrip) setStmTrip(parsed.stmTrip);
        if (parsed.missionaries) setMissionaries(parsed.missionaries);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.aiSeminar) setAiSeminar(parsed.aiSeminar);
        if (parsed.sharingSpaceSlots) setSharingSpaceSlots(parsed.sharingSpaceSlots);
        if (parsed.tuitionStudents) setTuitionStudents(parsed.tuitionStudents);
        if (parsed.volunteers) setVolunteers(parsed.volunteers);
        if (parsed.calendarSchedule) setCalendarSchedule(parsed.calendarSchedule);
        if (parsed.virtualFiles) setVirtualFiles(parsed.virtualFiles);
      }
    } catch (e) {
      console.warn('Could not parse saved Church CMS state', e);
    }
  }, []);

  // Sync to local storage
  const persist = (data: Record<string, any>) => {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      const parsed = current ? JSON.parse(current) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, ...data }));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  // RBAC Permission Checks
  const canEditDepartment = (deptId: DepartmentId): boolean => {
    if (currentUser.role === 'senior_pastor') return true;
    if (currentUser.role === 'treasurer') return false; // Treasurer edits financial ledger only
    if (currentUser.role === 'church_member') return false;
    return currentUser.departmentId === deptId;
  };

  const canEditFinance = (): boolean => {
    return currentUser.role === 'senior_pastor' || currentUser.role === 'treasurer';
  };

  // Conflict Checker Engine
  const detectConflicts = (items: CalendarScheduleItem[]): SchedulingConflict[] => {
    const foundConflicts: SchedulingConflict[] = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        if (a.facilityId === b.facilityId) {
          // Check day overlap
          const sameDay = a.dayOfWeek === b.dayOfWeek || (a.date && b.date && a.date === b.date);
          if (sameDay) {
            // Check time overlap: a.startTime < b.endTime && a.endTime > b.startTime
            const overlap = a.startTime < b.endTime && a.endTime > b.startTime;
            if (overlap) {
              foundConflicts.push({
                facilityId: a.facilityId,
                facilityName: a.facilityName,
                conflictTime: `${a.dayOfWeek} ${a.startTime}-${a.endTime} vs ${b.startTime}-${b.endTime}`,
                eventA: a.title,
                deptA: a.departmentId,
                eventB: b.title,
                deptB: b.departmentId,
                severity: 'Collision'
              });
            }
          }
        }
      }
    }
    return foundConflicts;
  };

  const conflicts = detectConflicts(calendarSchedule);

  // Dynamic Departmental Health calculation
  const healthReports: DepartmentHealthMetric[] = INITIAL_HEALTH_REPORTS.map(base => {
    const deptBudget = budgets.find(b => b.departmentId === base.departmentId);
    const deptPrograms = programs.filter(p => p.departmentId === base.departmentId);
    const allocated = deptBudget ? deptBudget.totalAllocation : base.budgetAllocated;
    const spent = deptBudget
      ? deptBudget.items.reduce((acc, item) => acc + item.spentAmount, 0)
      : base.budgetSpent;
    const committed = deptBudget
      ? deptBudget.items.reduce((acc, item) => acc + item.committedAmount, 0)
      : base.budgetCommitted;
    const burnRate = allocated > 0 ? Number((((spent + committed) / allocated) * 100).toFixed(1)) : 0;
    
    // Dynamic score penalty if over budget
    let score = base.overallScore;
    if (burnRate > 105) score = Math.max(70, score - 15);
    else if (burnRate > 98) score = Math.max(85, score - 5);

    return {
      ...base,
      budgetAllocated: allocated,
      budgetSpent: spent,
      budgetCommitted: committed,
      budgetBurnRate: burnRate,
      overallScore: score,
      objectivesTotal: deptPrograms.length > 0 ? deptPrograms.length + 3 : base.objectivesTotal
    };
  });

  // Budget Actions
  const updateBudgetLineItem = (deptId: DepartmentId, itemId: string, updates: Partial<BudgetLineItem>) => {
    setBudgets(prev => {
      const next = prev.map(dept => {
        if (dept.departmentId !== deptId) return dept;
        const updatedItems = dept.items.map(it => (it.id === itemId ? { ...it, ...updates } : it));
        const totalAlloc = updatedItems.reduce((acc, it) => acc + it.allocatedAmount, 0);
        return { ...dept, items: updatedItems, totalAllocation: totalAlloc };
      });
      persist({ budgets: next });
      return next;
    });
  };

  const addBudgetLineItem = (deptId: DepartmentId, item: Omit<BudgetLineItem, 'id'>) => {
    const newItem: BudgetLineItem = {
      ...item,
      id: `${deptId.charAt(0)}-${Date.now()}`
    };
    setBudgets(prev => {
      const next = prev.map(dept => {
        if (dept.departmentId !== deptId) return dept;
        const items = [...dept.items, newItem];
        const totalAllocation = items.reduce((sum, it) => sum + it.allocatedAmount, 0);
        return { ...dept, items, totalAllocation };
      });
      persist({ budgets: next });
      return next;
    });
  };

  const recordExpenditure = (deptId: DepartmentId, itemId: string, amount: number) => {
    setBudgets(prev => {
      const next = prev.map(dept => {
        if (dept.departmentId !== deptId) return dept;
        const items = dept.items.map(it => {
          if (it.id !== itemId) return it;
          return { ...it, spentAmount: it.spentAmount + amount };
        });
        return { ...dept, items };
      });
      persist({ budgets: next });
      return next;
    });
  };

  // Program Actions
  const addProgram = (prog: Omit<Program, 'id'>) => {
    const newProg: Program = {
      ...prog,
      id: `prg-${Date.now()}`
    };
    setPrograms(prev => {
      const next = [newProg, ...prev];
      persist({ programs: next });
      return next;
    });
  };

  const updateProgram = (programId: string, updates: Partial<Program>) => {
    setPrograms(prev => {
      const next = prev.map(p => (p.id === programId ? { ...p, ...updates } : p));
      persist({ programs: next });
      return next;
    });
  };

  const deleteProgram = (programId: string) => {
    setPrograms(prev => {
      const next = prev.filter(p => p.id !== programId);
      persist({ programs: next });
      return next;
    });
  };

  // Worship Actions
  const toggleRosterConfirm = (rosterId: string) => {
    setWorshipRoster(prev => {
      const next = prev.map(r => (r.id === rosterId ? { ...r, confirmed: !r.confirmed } : r));
      persist({ worshipRoster: next });
      return next;
    });
  };

  const addRosterMember = (member: Omit<WorshipRosterMember, 'id'>) => {
    const newRoster: WorshipRosterMember = {
      ...member,
      id: `w-roster-${Date.now()}`
    };
    setWorshipRoster(prev => {
      const next = [...prev, newRoster];
      persist({ worshipRoster: next });
      return next;
    });
  };

  const updateLiturgyNotes = (id: string, markdownNotes: string) => {
    setLiturgyProcedures(prev => {
      const next = prev.map(l => (l.id === id ? { ...l, markdownNotes } : l));
      persist({ liturgyProcedures: next });
      return next;
    });
  };

  // STM Actions
  const updateParticipantStatus = (participantId: string, updates: Partial<ShortTermMission['participants'][0]>) => {
    setStmTrip(prev => {
      const nextParticipants = prev.participants.map(p => (p.id === participantId ? { ...p, ...updates } : p));
      const next = { ...prev, participants: nextParticipants };
      persist({ stmTrip: next });
      return next;
    });
  };

  const toggleSTMChecklist = (index: number) => {
    setStmTrip(prev => {
      const checklist = [...prev.logisticsChecklist];
      checklist[index] = { ...checklist[index], completed: !checklist[index].completed };
      const next = { ...prev, logisticsChecklist: checklist };
      persist({ stmTrip: next });
      return next;
    });
  };

  // Training Actions
  const updateCourseEnrollment = (courseId: string, count: number) => {
    setCourses(prev => {
      const next = prev.map(c => (c.id === courseId ? { ...c, enrolledCount: count } : c));
      persist({ courses: next });
      return next;
    });
  };

  const registerAttendeeAISeminar = (name: string, email: string, ministryRole: string): boolean => {
    if (aiSeminar.registeredAttendees.length >= aiSeminar.capacity) return false;
    const newAttendee = {
      id: `att-${Date.now()}`,
      name,
      email,
      ministryRole,
      registeredAt: new Date().toISOString().split('T')[0],
      attended: false
    };
    const nextSeminar = {
      ...aiSeminar,
      registeredAttendees: [...aiSeminar.registeredAttendees, newAttendee]
    };
    setAiSeminar(nextSeminar);
    persist({ aiSeminar: nextSeminar });
    return true;
  };

  const toggleAttendeeAttended = (attendeeId: string) => {
    setAiSeminar(prev => {
      const attendees = prev.registeredAttendees.map(a =>
        a.id === attendeeId ? { ...a, attended: !a.attended } : a
      );
      const next = { ...prev, registeredAttendees: attendees };
      persist({ aiSeminar: next });
      return next;
    });
  };

  // Service Actions
  const addSharingSpaceSlot = (slot: Omit<SharingSpaceSlot, 'id'>) => {
    const newSlot: SharingSpaceSlot = {
      ...slot,
      id: `sp-${Date.now()}`
    };
    setSharingSpaceSlots(prev => {
      const next = [newSlot, ...prev];
      persist({ sharingSpaceSlots: next });
      return next;
    });
  };

  const addTuitionStudent = (student: Omit<TuitionStudent, 'id'>) => {
    const newStu: TuitionStudent = {
      ...student,
      id: `tu-${Date.now()}`
    };
    setTuitionStudents(prev => {
      const next = [...prev, newStu];
      persist({ tuitionStudents: next });
      return next;
    });
  };

  const updateTuitionStudent = (id: string, updates: Partial<TuitionStudent>) => {
    setTuitionStudents(prev => {
      const next = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      persist({ tuitionStudents: next });
      return next;
    });
  };

  // Volunteers Actions
  const addVolunteer = (volunteer: Omit<VolunteerMember, 'id'>) => {
    const newVol: VolunteerMember = {
      ...volunteer,
      id: `vol-${Date.now()}`
    };
    setVolunteers(prev => {
      const next = [newVol, ...prev];
      persist({ volunteers: next });
      return next;
    });
  };

  // Calendar Event Actions
  const addCalendarEvent = (event: Omit<CalendarScheduleItem, 'id'>): boolean => {
    const newEvt: CalendarScheduleItem = {
      ...event,
      id: `cal-${Date.now()}`
    };
    setCalendarSchedule(prev => {
      const next = [...prev, newEvt];
      persist({ calendarSchedule: next });
      return next;
    });
    return true;
  };

  // Virtual File System edit
  const updateVirtualFileContent = (path: string, newContent: string) => {
    setVirtualFiles(prev => {
      const next = prev.map(f => (f.path === path ? { ...f, content: newContent } : f));
      persist({ virtualFiles: next });
      return next;
    });
  };

  // Reset Data
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBudgets(INITIAL_DEPARTMENT_BUDGETS);
    setPrograms(INITIAL_PROGRAMS);
    setWorshipRoster(INITIAL_WORSHIP_ROSTER);
    setLiturgyProcedures(INITIAL_LITURGY_PROCEDURES);
    setStmTrip(INITIAL_STM_TRIP);
    setMissionaries(INITIAL_MISSIONARIES);
    setCourses(INITIAL_SUNDAY_SCHOOL_COURSES);
    setAiSeminar(INITIAL_AI_SEMINAR);
    setSharingSpaceSlots(INITIAL_SHARING_SPACE_SLOTS);
    setTuitionStudents(INITIAL_TUITION_STUDENTS);
    setOutreachServices(INITIAL_OUTREACH_SERVICES);
    setVolunteers(INITIAL_VOLUNTEER_POOL);
    setCalendarSchedule(INITIAL_CALENDAR_SCHEDULE);
    setVirtualFiles(INITIAL_VIRTUAL_FILES);
    setCurrentUser(INITIAL_CURRENT_USER);
  };

  // Export Data JSON
  const exportDataJSON = () => {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      churchCmsPhase: 'Phase 2: Ministry Modular Operations & Budgets (P17-30)',
      budgets,
      programs,
      worshipRoster,
      liturgyProcedures,
      stmTrip,
      missionaries,
      courses,
      aiSeminar,
      sharingSpaceSlots,
      tuitionStudents,
      volunteers,
      calendarSchedule
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `church-cms-2026-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ChurchContext.Provider
      value={{
        currentUser,
        availableUsers: AVAILABLE_USERS,
        setCurrentUser,
        canEditDepartment,
        canEditFinance,
        facilities,
        budgets,
        programs,
        worshipRoster,
        liturgyProcedures,
        stmTrip,
        missionaries,
        courses,
        aiSeminar,
        sharingSpaceSlots,
        tuitionStudents,
        outreachServices,
        volunteers,
        calendarSchedule,
        conflicts,
        healthReports,
        virtualFiles,
        updateBudgetLineItem,
        addBudgetLineItem,
        recordExpenditure,
        addProgram,
        updateProgram,
        deleteProgram,
        toggleRosterConfirm,
        addRosterMember,
        updateLiturgyNotes,
        updateParticipantStatus,
        toggleSTMChecklist,
        updateCourseEnrollment,
        registerAttendeeAISeminar,
        toggleAttendeeAttended,
        addSharingSpaceSlot,
        addTuitionStudent,
        updateTuitionStudent,
        addVolunteer,
        addCalendarEvent,
        updateVirtualFileContent,
        resetAllData,
        exportDataJSON
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
