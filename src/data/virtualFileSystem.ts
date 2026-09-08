export interface VirtualFile {
  path: string;
  name: string;
  type: 'json' | 'markdown' | 'js';
  category: 'departments' | 'shared-modules' | 'models';
  departmentId?: 'worship' | 'mission' | 'training' | 'service';
  description: string;
  pageRef?: string;
  content: string;
}

export const INITIAL_VIRTUAL_FILES: VirtualFile[] = [
  // Worship Dept
  {
    path: 'departments/worship-dept/personnel.json',
    name: 'personnel.json',
    type: 'json',
    category: 'departments',
    departmentId: 'worship',
    description: 'Choir and Worship team rosters (P18)',
    pageRef: 'Pages 17-19',
    content: JSON.stringify({
      department: "Worship & Liturgy",
      head: "Rev. David Chen",
      choir: {
        rehearsal: "Thursday 19:30-21:30 Sanctuary",
        director: "Rev. David Chen",
        accompanist: "Hannah Hsiao",
        members: [
          { name: "Sarah Lin", voice: "Soprano Lead", confirmed: true },
          { name: "Eunice Wang", voice: "Soprano", confirmed: true },
          { name: "Deborah Cheng", voice: "Alto Lead", confirmed: true },
          { name: "Rachel Huang", voice: "Alto", confirmed: true },
          { name: "Daniel Wu", voice: "Tenor Lead", confirmed: true },
          { name: "Paul Chiang", voice: "Tenor", confirmed: false },
          { name: "Dr. Marcus Ting", voice: "Bass", confirmed: true },
          { name: "Andrew Yeh", voice: "Bass", confirmed: true }
        ]
      },
      praiseBands: {
        firstServiceEnsemble: {
          style: "Traditional & Liturgical Hymns",
          rehearsal: "Sunday 07:45 Sanctuary",
          lead: "Hannah Hsiao (Organ/Piano)",
          instruments: ["Pipe Organ", "Kawai Grand Piano", "Acoustic Guitar", "Cello"]
        },
        secondServiceBand: {
          style: "Contemporary Worship & Praise",
          rehearsal: "Saturday 16:00-18:00 Sanctuary",
          lead: "Joshua Kuo (Worship Leader / Acoustic Guitar)",
          electricGuitar: "Jonathan Shen",
          bass: "Caleb Sun",
          drums: "Samuel Chou",
          synth: "Phoebe Lin"
        }
      },
      avTeam: {
        audioEngineer: "Leo Fan",
        lightingAndStream: "Chloe Tseng"
      }
    }, null, 2)
  },
  {
    path: 'departments/worship-dept/liturgy.md',
    name: 'liturgy.md',
    type: 'markdown',
    category: 'departments',
    departmentId: 'worship',
    description: 'Special service procedures & sacramental liturgy protocols (P17-18)',
    pageRef: 'Pages 17-18',
    content: `# Holy Communion & Sacramental Liturgy Protocol (P17-18)
*Church Planning CMS 2026 - Worship Department*

## 1. Theological Framing
The Lord's Supper is celebrated on the first Sunday of each calendar month and on Easter Vigil, Maundy Thursday, and Christmas Eve.

## 2. Order of Service
1. **Prelude**: J.S. Bach Prelude in C Minor (Organ - Hannah Hsiao)
2. **Call to Worship**: Psalm 118:1-4 (Leader & Congregation Responsive)
3. **Choral Introit**: "Crown Him with Many Crowns" (Sanctuary Choir)
4. **Prayer of Confession & Pardon**: Unison recitation of the historic Collect for Purity
5. **The Sacrament of Holy Communion**:
   - Words of Institution (1 Corinthians 11:23-26)
   - Consecration of Elements by Ordained Elders
   - Distribution of Unleavened Wafers & Wine/Grape Juice
6. **Choral Benediction & Seven-Fold Amen**

## 3. Sanctuary Chancel Setup Notes
- Paschal Candle centered on altar table.
- 450 communion cups prepared by Deacons Board on Saturday 16:00.
- Live stream camera preset #3 set to macro focus on communion table.`
  },
  {
    path: 'departments/worship-dept/budget.json',
    name: 'budget.json',
    type: 'json',
    category: 'departments',
    departmentId: 'worship',
    description: '$28,500 Worship allocation and line items (P19)',
    pageRef: 'Page 19',
    content: JSON.stringify({
      department: "Worship Department",
      totalAllocation: 28500,
      pageRef: "P19",
      lineItems: [
        { code: "WOR-5101", name: "CCLI & OneLicense Copyright Streaming Fees", amount: 3200, status: "Fully Paid" },
        { code: "WOR-5102", name: "Grand Piano Semi-Annual Tuning & Drum Maintenance", amount: 4800, status: "Ongoing" },
        { code: "WOR-5103", name: "IEM Transmitters & Wireless Mic Upgrades", amount: 7500, status: "Active PO" },
        { code: "WOR-5104", name: "Choir Sheet Music Folios & Robe Laundering", amount: 3000, status: "Disbursed" },
        { code: "WOR-5105", name: "Guest Instrumentalists & Seasonal Soloists", amount: 5000, status: "Partial Disbursed" },
        { code: "WOR-5106", name: "Sacramental Communion Bread, Wine & Candles", amount: 5000, status: "Committed" }
      ]
    }, null, 2)
  },

  // Mission Dept
  {
    path: 'departments/mission-dept/stm-indonesia.json',
    name: 'stm-indonesia.json',
    type: 'json',
    category: 'departments',
    departmentId: 'mission',
    description: 'Indonesia Short-Term Mission Trip logistics & 10-person capacity roster (P21)',
    pageRef: 'Page 21',
    content: JSON.stringify({
      tripName: "Indonesia Short-Term Mission 2026",
      destination: "Medan & Lake Toba Hinterlands, North Sumatra",
      dates: "July 18 - July 28, 2026 (11 Days)",
      capacity: 10,
      teamLeader: "Pastor Grace Lin",
      allocatedBudget: 18000,
      fundraisedToDate: 16400,
      participants: [
        { name: "Pastor Grace Lin", role: "Team Leader & Local Liaison", status: "Verified" },
        { name: "Dr. Marcus Ting", role: "Medical Clinic Lead", status: "Verified" },
        { name: "Sarah Lin", role: "Children VBS Lead", status: "Confirmed" },
        { name: "Joshua Kuo", role: "Worship & Youth Mentorship", status: "Confirmed" },
        { name: "Benjamin Tsai", role: "Ground Logistics & Finance", status: "Verified" },
        { name: "Chloe Tseng", role: "Art Workshop & Testimony", status: "In Training" },
        { name: "Teacher Esther Chou", role: "Primary School Educator", status: "Confirmed" },
        { name: "Leo Fan", role: "IT & Computer Lab Installation", status: "In Training" },
        { name: "Rachel Huang", role: "First-Aid & Medical Assistant", status: "Applied" },
        { name: "Kevin Zhang", role: "Media & Youth Outreach", status: "Applied" }
      ],
      ministryObjectives: [
        "Conduct 4-day bilingual English & Christian Character VBS for 120 village children",
        "Free basic health screening clinic in partnership with Medan Christian Hospital",
        "Donate and configure 12 refurbished laptops for Lake Toba Christian School"
      ]
    }, null, 2)
  },
  {
    path: 'departments/mission-dept/missionaries.json',
    name: 'missionaries.json',
    type: 'json',
    category: 'departments',
    departmentId: 'mission',
    description: 'Supported missionary units and regional field grants (P22)',
    pageRef: 'Page 22',
    content: JSON.stringify({
      annualBudget: 231000,
      supportedUnits: [
        { name: "Rev. Paul & Mary Tan", field: "Chiang Mai, Thailand", monthlyStipend: 3200, agency: "OMF" },
        { name: "Timothy & Lydia Hsieh", field: "Sendai, Japan", monthlyStipend: 3500, agency: "SEND Int." },
        { name: "Dr. Barnabas & Grace Mwangi", field: "Nairobi, Kenya", monthlyStipend: 2800, agency: "SIM" },
        { name: "Silas & Anna Thapa", field: "Kathmandu, Nepal", monthlyStipend: 2200, agency: "Pioneers" },
        { name: "Deborah Liu", field: "Hualien Indigenous Care, Taiwan", monthlyStipend: 1800, agency: "Home Mission" }
      ],
      theologicalGrants: 35000,
      scriptureTranslationLiterature: 16000
    }, null, 2)
  },
  {
    path: 'departments/mission-dept/budget.json',
    name: 'budget.json',
    type: 'json',
    category: 'departments',
    departmentId: 'mission',
    description: '$231,000 Mission allocation and ledger (P22)',
    pageRef: 'Page 22',
    content: JSON.stringify({
      department: "Mission Department",
      totalAllocation: 231000,
      pageRef: "P22",
      lineItems: [
        { code: "MIS-6101", name: "Field Living & Ministry Stipends (5 Full-time Units)", amount: 162000, notes: "Monthly direct wire transfer" },
        { code: "MIS-6102", name: "Indonesia STM Trip Logistics, Flights & Subsidy", amount: 18000, notes: "July 18-28 trip for 10 people (P21)" },
        { code: "MIS-6103", name: "Southeast Asia Regional Theological Seminary Grants", amount: 35000, notes: "Subsidizing 6 native pastors" },
        { code: "MIS-6104", name: "Scripture Translation & Unreached Peoples Media", amount: 16000, notes: "Wycliffe audio Bible translation" }
      ]
    }, null, 2)
  },

  // Training Dept
  {
    path: 'departments/training-dept/curriculum.json',
    name: 'curriculum.json',
    type: 'json',
    category: 'departments',
    departmentId: 'training',
    description: '4-Tier Sunday School curriculum structure (P23-24)',
    pageRef: 'Pages 23-24',
    content: JSON.stringify({
      department: "Training & Christian Education",
      director: "Elder Timothy Wang",
      framework: "4-Tier Progressive Discipleship Curriculum",
      tiers: [
        {
          tier: 1,
          name: "Beginner Tier",
          course: "Foundations of Faith & Scripture Survey",
          instructor: "Pastor Mark Ho & Sister Alice Chen",
          room: "Room 201",
          enrolled: 36,
          target: "Seekers, new believers, baptism candidates"
        },
        {
          tier: 2,
          name: "Applied Tier",
          course: "Christian Ethics in Marketplace, Marriage & Family",
          instructor: "Elder Joseph Liu & Deaconess Martha Fang",
          room: "Room 202",
          enrolled: 32,
          target: "Workplace professionals, parents, married couples"
        },
        {
          tier: 3,
          name: "Spiritual Reading Tier",
          course: "Classics of Christian Devotion & Spiritual Formation",
          instructor: "Elder Timothy Wang",
          room: "Room 203 Library",
          enrolled: 26,
          target: "Mature disciples reading Augustine, Bonhoeffer, C.S. Lewis"
        },
        {
          tier: 4,
          name: "Research Tier",
          course: "Advanced Biblical Hermeneutics & Systematic Theology",
          instructor: "Rev. Jonathan Edwards, Ph.D.",
          room: "Room 204",
          enrolled: 24,
          target: "Elders, small group leaders, theological students"
        }
      ]
    }, null, 2)
  },
  {
    path: 'departments/training-dept/seminars.json',
    name: 'seminars.json',
    type: 'json',
    category: 'departments',
    departmentId: 'training',
    description: 'Special seminars including AI Bible Study Workshop and retreats (P25-26)',
    pageRef: 'Pages 25-26',
    content: JSON.stringify({
      upcomingSeminars: [
        {
          id: "sem-ai-2026",
          title: "AI Bible Study & Theological Hermeneutics Workshop (P25)",
          date: "2026-09-26",
          speaker: "Prof. Luke Chang (PhD, AI Biblical Research)",
          capacity: 30,
          currentRegistrations: 24,
          topics: [
            "LLMs and Generative AI in Sermon Preparation: Guardrails and Best Practices",
            "Comparative Greek/Hebrew Syntax Prompts with AI Exegesis",
            "Ethical and Pastoral Considerations in the Age of Synthetic Content"
          ]
        },
        {
          id: "sem-retreat-2026",
          title: "Annual Church Leaders Spiritual Retreat & Mentorship Camp",
          date: "2026-10-16 - 2026-10-18",
          location: "Green Hill Mountain Prayer Center",
          capacity: 50,
          currentRegistrations: 48
        }
      ]
    }, null, 2)
  },
  {
    path: 'departments/training-dept/budget.json',
    name: 'budget.json',
    type: 'json',
    category: 'departments',
    departmentId: 'training',
    description: '$23,500 Training allocation (P26)',
    pageRef: 'Page 26',
    content: JSON.stringify({
      department: "Training Department",
      totalAllocation: 23500,
      pageRef: "P26",
      lineItems: [
        { code: "TRN-7101", name: "Curriculum Printing, Workbooks & Student Guides", amount: 8500 },
        { code: "TRN-7102", name: "AI Bible Study Workshop Honorarium & Tool Licenses", amount: 4200 },
        { code: "TRN-7103", name: "Annual Church Leaders Spiritual Retreat & Camp", amount: 7800 },
        { code: "TRN-7104", name: "Pastoral Theological Library Acquisitions & Subscriptions", amount: 3000 }
      ]
    }, null, 2)
  },

  // Service Dept
  {
    path: 'departments/service-dept/community.json',
    name: 'community.json',
    type: 'json',
    category: 'departments',
    departmentId: 'service',
    description: 'Tea Fruit Hill Community Center Sharing Space & Outreach (P29)',
    pageRef: 'Pages 27-29',
    content: JSON.stringify({
      centerName: "Tea Fruit Hill Community Sharing Space (茶果山社群共享空間)",
      address: "No. 48 Shan-Gao Rd, District 3",
      operatingHours: "Tuesday to Saturday 10:00 - 18:00",
      capacity: 90,
      leadDirector: "Deaconess Sarah Lee",
      residentSupervisor: "Sister Ruth Yang",
      amenities: ["Artisan Tea & Espresso Bar", "Quiet Study Desks with Power/Wifi", "Children Story Corner", "Private Counseling Nook"],
      scheduledPartnerships: [
        { partner: "Neighborhood Residents & Students", schedule: "Tue-Fri 10:00-18:00", space: "Cafe & Study Pods" },
        { partner: "Christian Counselors Association", schedule: "Wed & Sat 14:00-17:00", space: "Counseling Room B" },
        { partner: "Shan-Gao Senior Citizens Association", schedule: "Thu 14:00-16:30", space: "Multi-Purpose Gallery" },
        { partner: "Parenting Guild", schedule: "Fri 19:00-21:00", space: "Multi-Purpose Gallery" }
      ],
      specialOutreachServices: [
        { name: "Love Feasts (愛筵)", frequency: "Quarterly", budget: 28000, target: "150+ neighborhood seniors and low-income residents" },
        { name: "Mother's Day Care Hampers (母親節關懷)", date: "May 2026", budget: 12000, target: "120 single-parent & elderly households" }
      ]
    }, null, 2)
  },
  {
    path: 'departments/service-dept/tuition-prog.json',
    name: 'tuition-prog.json',
    type: 'json',
    category: 'departments',
    departmentId: 'service',
    description: 'Children After-School Tuition Service roster and schedules (P28)',
    pageRef: 'Page 28',
    content: JSON.stringify({
      programName: "Children After-School Tuition Program (弱勢學童課後陪讀班)",
      coordinator: "Teacher Esther Chou",
      schedule: "Wednesday & Friday 16:00 - 18:30",
      locations: ["Tea Fruit Hill Center Study Pods", "Church Room 203"],
      annualBudget: 32500,
      currentEnrollment: 18,
      tutors: [
        { name: "Kevin Zhang", subject: "Mathematics & Science", students: ["Ethan Chen", "Daniel Chang"] },
        { name: "Chloe Tseng", subject: "English & Reading", students: ["Mia Lin"] },
        { name: "Leo Fan", subject: "Math & Coding Logic", students: ["Lucas Wang"] },
        { name: "Rachel Huang", subject: "Chinese & Homework Care", students: ["Sophie Tsai"] },
        { name: "Benjamin Tsai", subject: "Junior High Algebra", students: ["Daniel Chang"] },
        { name: "Teacher Esther Chou", subject: "General Coaching & Character Stories", students: ["Zoe Yeh"] }
      ]
    }, null, 2)
  },
  {
    path: 'departments/service-dept/budget.json',
    name: 'budget.json',
    type: 'json',
    category: 'departments',
    departmentId: 'service',
    description: '$217,500 Service Dept allocation (P30)',
    pageRef: 'Page 30',
    content: JSON.stringify({
      department: "Service & Community Outreach",
      totalAllocation: 217500,
      pageRef: "P30",
      lineItems: [
        { code: "SRV-8101", name: "Tea Fruit Hill Community Center Lease & Utilities", amount: 120000 },
        { code: "SRV-8102", name: "Children After-School Tuition Program Stipends & Books", amount: 32500 },
        { code: "SRV-8103", name: "Love Feasts Quarterly Community Dinners & Banquets", amount: 28000 },
        { code: "SRV-8104", name: "Mother's Day Care Parcels & Single-Parent Blessing", amount: 12000 },
        { code: "SRV-8105", name: "Community Emergency Medical Relief & Crisis Aid", amount: 25000 }
      ]
    }, null, 2)
  },

  // Shared Modules
  {
    path: 'shared-modules/finance/global-aggregation.json',
    name: 'global-aggregation.json',
    type: 'json',
    category: 'shared-modules',
    description: 'Aggregated church budget ($500,500 total) across all 4 departments',
    pageRef: 'Pages 19, 22, 26, 30',
    content: JSON.stringify({
      fiscalYear: 2026,
      grandTotalAllocation: 500500,
      breakdownByDepartment: {
        "Worship Department": { allocation: 28500, sharePercent: "5.7%", pageRef: "P19" },
        "Mission Department": { allocation: 231000, sharePercent: "46.1%", pageRef: "P22" },
        "Training Department": { allocation: 23500, sharePercent: "4.7%", pageRef: "P26" },
        "Service Department": { allocation: 217500, sharePercent: "43.5%", pageRef: "P30" }
      },
      auditStatus: "Certified by Treasurer Sister Rebecca Wu",
      varianceAlertThresholdPercent: 10
    }, null, 2)
  },
  {
    path: 'shared-modules/scheduling/conflict-rules.json',
    name: 'conflict-rules.json',
    type: 'json',
    category: 'shared-modules',
    description: 'Conflict detection logic and facility rules for Master Church Calendar',
    pageRef: 'Integration Layer',
    content: JSON.stringify({
      monitoredVenues: [
        "Main Sanctuary (Capacity 450)",
        "Fellowship Hall & Dining (Capacity 220)",
        "Room 201 - Room 204 Education Wing (Capacities 25-45)",
        "Tea Fruit Hill Community Center (Capacity 90)"
      ],
      turnaroundBufferMinutes: 30,
      priorityPolicy: [
        "1. Sunday General Congregational Worship Services take precedence over rehearsals",
        "2. Sacramental Liturgies (Easter, Christmas, Baptism) override regular classes",
        "3. Bookings require Department Head approval before committing to Global Calendar"
      ]
    }, null, 2)
  },
  {
    path: 'shared-modules/volunteer-pool/master-roster.json',
    name: 'master-roster.json',
    type: 'json',
    category: 'shared-modules',
    description: 'Master list of all serving members with cross-ministry health check',
    pageRef: 'Shared Core',
    content: JSON.stringify({
      totalActiveVolunteers: 32,
      burnoutThresholdMinistries: 3,
      volunteersAtRisk: ["Joshua Kuo (Worship + STM + Sunday School)"],
      activeDepartments: ["worship", "mission", "training", "service"]
    }, null, 2)
  },

  // Models
  {
    path: 'models/Department.js',
    name: 'Department.js',
    type: 'js',
    category: 'models',
    description: 'Departmental Modular Domain Model',
    content: `/**
 * Department Domain Model
 * Implements RBAC and Departmental separation of concerns
 */
export class Department {
  constructor({ id, name, head, budgetAllocation, pageRef }) {
    this.id = id;
    this.name = name;
    this.head = head;
    this.budgetAllocation = budgetAllocation;
    this.pageRef = pageRef;
    this.programs = [];
    this.budgetItems = [];
  }

  canUserEdit(user) {
    if (user.role === 'senior_pastor' || user.role === 'treasurer') return true;
    return user.departmentId === this.id;
  }
}`
  },
  {
    path: 'models/Program.js',
    name: 'Program.js',
    type: 'js',
    category: 'models',
    description: 'Generic schema for any recurring or special church activity',
    content: `/**
 * Generic Program Schema for Church Activities
 * Used by Worship rehearsals, Sunday School, STM, Community spaces
 */
export class Program {
  constructor({ id, departmentId, name, frequency, facilityId, capacity, leaderName, pageRef }) {
    this.id = id;
    this.departmentId = departmentId;
    this.name = name;
    this.frequency = frequency; // Weekly, Monthly, Annual, One-off
    this.facilityId = facilityId;
    this.capacity = capacity;
    this.leaderName = leaderName;
    this.pageRef = pageRef;
  }
}`
  },
  {
    path: 'models/Course.js',
    name: 'Course.js',
    type: 'js',
    category: 'models',
    description: 'Specific schema for Training Department 4-Tier Sunday School',
    content: `/**
 * Course Schema for Training Department
 * Represents the 4-Tier Sunday School system (P23-24)
 */
export class Course {
  constructor({ id, tier, tierNumber, title, instructor, classroom, enrolledCount, capacity }) {
    this.id = id;
    this.tier = tier; // Beginner | Applied | Spiritual Reading | Research
    this.tierNumber = tierNumber; // 1 | 2 | 3 | 4
    this.title = title;
    this.instructor = instructor;
    this.classroom = classroom;
    this.enrolledCount = enrolledCount;
    this.capacity = capacity;
  }
}`
  },
  {
    path: 'models/BudgetLineItem.js',
    name: 'BudgetLineItem.js',
    type: 'js',
    category: 'models',
    description: 'Specialized database schema for departmental financial ledger',
    content: `/**
 * Financial Ledger Line Item Schema
 * Tracks exact budget lines (e.g. Worship $28,500 vs Mission $231,000)
 */
export class BudgetLineItem {
  constructor({ id, code, category, name, allocatedAmount, spentAmount = 0, committedAmount = 0, pageRef }) {
    this.id = id;
    this.code = code;
    this.category = category;
    this.name = name;
    this.allocatedAmount = allocatedAmount;
    this.spentAmount = spentAmount;
    this.committedAmount = committedAmount;
    this.pageRef = pageRef;
  }

  get remainingBalance() {
    return this.allocatedAmount - (this.spentAmount + this.committedAmount);
  }

  get burnRatePercent() {
    return ((this.spentAmount + this.committedAmount) / this.allocatedAmount) * 100;
  }
}`
  }
];
