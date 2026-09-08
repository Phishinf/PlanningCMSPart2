export type UserRole = 
  | 'senior_pastor'
  | 'worship_head'
  | 'mission_head'
  | 'training_head'
  | 'service_head'
  | 'treasurer'
  | 'church_member';

export interface CurrentUser {
  id: string;
  name: string;
  title: string;
  role: UserRole;
  departmentId?: string;
  avatarInitials: string;
}

export type DepartmentId = 'worship' | 'mission' | 'training' | 'service';

export interface BudgetLineItem {
  id: string;
  code: string;
  category: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  committedAmount: number;
  notes: string;
  pageRef: string;
}

export interface DepartmentBudget {
  departmentId: DepartmentId;
  departmentName: string;
  totalAllocation: number;
  pageRef: string;
  items: BudgetLineItem[];
}

// Program schema for any church activity
export interface Program {
  id: string;
  departmentId: DepartmentId;
  name: string;
  frequency: 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Quarterly' | 'Annual' | 'One-off';
  scheduleText: string;
  facilityId: string;
  facilityName: string;
  capacity?: number;
  currentAttendance?: number;
  leaderName: string;
  leaderRole: string;
  pageRef: string;
  description: string;
  status: 'Active' | 'Planning' | 'Completed';
}

// Personnel & Volunteer Pool
export interface VolunteerMember {
  id: string;
  name: string;
  chineseName?: string;
  email: string;
  phone: string;
  primaryDepartment: DepartmentId;
  roles: {
    departmentId: DepartmentId;
    roleName: string;
    subGroup?: string;
  }[];
  qualifications: string[];
  servingFrequency: string;
  status: 'Active' | 'On Leave' | 'In Training';
  pageRef: string;
}

// Worship Dept specific types
export interface WorshipRosterMember {
  id: string;
  name: string;
  role: 'Worship Leader' | 'Keyboard' | 'Acoustic Guitar' | 'Electric Guitar' | 'Bass' | 'Drums' | 'Soprano' | 'Alto' | 'Tenor' | 'Bass Vocal' | 'AV Engineer' | 'Lighting';
  team: 'Choir' | 'Sunday 1st Praise Band' | 'Sunday 2nd Praise Band' | 'Audio/Visual';
  confirmed: boolean;
}

export interface LiturgyProcedure {
  id: string;
  title: string;
  season: string;
  date: string;
  orderOfWorship: {
    stepNumber: number;
    element: string;
    description: string;
    leader: string;
    durationMins: number;
  }[];
  markdownNotes: string;
  pageRef: string;
}

// Mission Dept specific types
export interface STMParticipant {
  id: string;
  name: string;
  role: 'Leader' | 'Children Ministry' | 'Medical/Care' | 'Worship' | 'Logistics' | 'Testimony';
  status: 'Confirmed' | 'Applied' | 'Training' | 'Passport/Visa Verified';
  vaccineCompleted: boolean;
  depositPaid: boolean;
  notes: string;
}

export interface ShortTermMission {
  id: string;
  destination: string;
  country: string;
  dates: string;
  targetFocus: string;
  totalCapacity: number;
  allocatedBudget: number;
  fundraisedAmount: number;
  teamLeader: string;
  participants: STMParticipant[];
  logisticsChecklist: {
    item: string;
    completed: boolean;
    dueDate: string;
  }[];
  pageRef: string;
}

export interface SupportedMissionary {
  id: string;
  name: string;
  field: string;
  agency: string;
  monthlySupport: number;
  annualSupport: number;
  termStart: string;
  prayerRequests: string[];
  recentUpdate: string;
  status: 'Active' | 'Furlough' | 'Transition';
  pageRef: string;
}

// Training Dept specific types
export type SundaySchoolTier = 'Beginner' | 'Applied' | 'Spiritual Reading' | 'Research';

export interface SundaySchoolCourse {
  id: string;
  tier: SundaySchoolTier;
  tierNumber: 1 | 2 | 3 | 4;
  title: string;
  instructor: string;
  term: string;
  schedule: string;
  classroom: string;
  enrolledCount: number;
  capacity: number;
  prerequisites: string;
  curriculumSummary: string;
  syllabusWeeks: { week: number; topic: string; reading: string }[];
  pageRef: string;
}

export interface SeminarEvent {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  budgetAllocation: number;
  overview: string;
  registeredAttendees: {
    id: string;
    name: string;
    email: string;
    ministryRole: string;
    registeredAt: string;
    attended: boolean;
  }[];
  pageRef: string;
}

// Service Dept specific types
export interface SharingSpaceSlot {
  id: string;
  roomName: string;
  date: string;
  timeSlot: string;
  communityPartner: string;
  purpose: string;
  attendeeEstimate: number;
  supervisorName: string;
  status: 'Approved' | 'Pending' | 'Completed';
  notes: string;
}

export interface TuitionStudent {
  id: string;
  name: string;
  grade: string;
  assignedTutor: string;
  subjects: string[];
  dayTime: string;
  attendanceRate: number;
  guardianContact: string;
  subsidized: boolean;
}

export interface OutreachService {
  id: string;
  title: string;
  targetAudience: string;
  budget: number;
  date: string;
  coordinator: string;
  volunteerCount: number;
  description: string;
  impactMetrics: string;
  pageRef: string;
}

// Shared Facility & Scheduling
export interface ChurchFacility {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  location: string;
}

export interface CalendarScheduleItem {
  id: string;
  title: string;
  departmentId: DepartmentId;
  facilityId: string;
  facilityName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  date?: string;
  leadPerson: string;
  pageRef?: string;
}

export interface SchedulingConflict {
  facilityId: string;
  facilityName: string;
  conflictTime: string;
  eventA: string;
  deptA: DepartmentId;
  eventB: string;
  deptB: DepartmentId;
  severity: 'Collision' | 'Tight Turnaround';
}

// Departmental Health Report
export interface DepartmentHealthMetric {
  departmentId: DepartmentId;
  departmentName: string;
  pageRef: string;
  director: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'Needs Review';
  objectivesTotal: number;
  objectivesMet: number;
  budgetAllocated: number;
  budgetSpent: number;
  budgetCommitted: number;
  budgetBurnRate: number; // percentage
  volunteerRequirement: number;
  volunteerActive: number;
  eventExecutionRate: number; // percentage
  strengths: string[];
  keyRisks: string[];
  recommendation: string;
}
