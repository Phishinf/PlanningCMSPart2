import {
  CurrentUser,
  DepartmentBudget,
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
  DepartmentHealthMetric
} from '../types';

export const INITIAL_CURRENT_USER: CurrentUser = {
  id: 'usr-admin',
  name: 'Rev. Jonathan Edwards',
  title: 'Senior Pastor & Council Chair',
  role: 'senior_pastor',
  avatarInitials: 'JE'
};

export const AVAILABLE_USERS: CurrentUser[] = [
  {
    id: 'usr-admin',
    name: 'Rev. Jonathan Edwards',
    title: 'Senior Pastor & Council Chair (Universal Access)',
    role: 'senior_pastor',
    avatarInitials: 'JE'
  },
  {
    id: 'usr-worship',
    name: 'Rev. David Chen',
    title: 'Worship & Liturgy Director (P17-19)',
    role: 'worship_head',
    departmentId: 'worship',
    avatarInitials: 'DC'
  },
  {
    id: 'usr-mission',
    name: 'Pastor Grace Lin',
    title: 'Global Mission & STM Director (P20-22)',
    role: 'mission_head',
    departmentId: 'mission',
    avatarInitials: 'GL'
  },
  {
    id: 'usr-training',
    name: 'Elder Timothy Wang',
    title: 'Christian Education & Training Director (P23-26)',
    role: 'training_head',
    departmentId: 'training',
    avatarInitials: 'TW'
  },
  {
    id: 'usr-service',
    name: 'Deaconess Sarah Lee',
    title: 'Community Service & Outreach Director (P27-30)',
    role: 'service_head',
    departmentId: 'service',
    avatarInitials: 'SL'
  },
  {
    id: 'usr-treasurer',
    name: 'Sister Rebecca Wu',
    title: 'Church Financial Treasurer & Auditor',
    role: 'treasurer',
    avatarInitials: 'RW'
  },
  {
    id: 'usr-member',
    name: 'Kevin Zhang',
    title: 'Ministry Volunteer / Member View',
    role: 'church_member',
    avatarInitials: 'KZ'
  }
];

export const INITIAL_FACILITIES: ChurchFacility[] = [
  {
    id: 'fac-sanctuary',
    name: 'Main Sanctuary',
    capacity: 450,
    equipment: ['Grand Piano', 'Full Drum Enclosure', 'Soundcraft Digital Mixer', 'Dual Projectors', 'Choir Chancel'],
    location: 'Main Building 1F'
  },
  {
    id: 'fac-fellowship',
    name: 'Fellowship Hall & Dining',
    capacity: 220,
    equipment: ['Commercial Kitchen', 'PA System', 'Folding Tables', 'A/V Screen'],
    location: 'Main Building B1'
  },
  {
    id: 'fac-r201',
    name: 'Seminar Room 201',
    capacity: 45,
    equipment: ['Smart Board', 'Conference Audio', 'Hybrid Zoom Cam'],
    location: 'Education Wing 2F'
  },
  {
    id: 'fac-r202',
    name: 'Classroom 202 (Tiered Study)',
    capacity: 35,
    equipment: ['Whiteboards', 'Moveable Desks', 'Overhead Projector'],
    location: 'Education Wing 2F'
  },
  {
    id: 'fac-r203',
    name: 'Seminar Room 203',
    capacity: 30,
    equipment: ['Library Corner', 'Group Pods', 'Display Screen'],
    location: 'Education Wing 2F'
  },
  {
    id: 'fac-teafruit',
    name: 'Tea Fruit Hill Community Center',
    capacity: 90,
    equipment: ['Espresso & Tea Bar', 'Study Cubicles', 'Community Art Wall', 'Counseling Room'],
    location: 'Off-site Outreach Hub (No. 48 Shan-Gao Rd)'
  }
];

// Department Budgets (Total $500,500)
export const INITIAL_DEPARTMENT_BUDGETS: DepartmentBudget[] = [
  {
    departmentId: 'worship',
    departmentName: 'Worship Ministry',
    totalAllocation: 28500,
    pageRef: 'Page 19',
    items: [
      {
        id: 'w-01',
        code: 'WOR-5101',
        category: 'Licensing & Copyright',
        name: 'CCLI & OneLicense Annual Streaming/Copyright Fees',
        allocatedAmount: 3200,
        spentAmount: 3200,
        committedAmount: 0,
        notes: 'Mandatory annual copyright coverage for live streams and hymn projection (P19)',
        pageRef: 'P19'
      },
      {
        id: 'w-02',
        code: 'WOR-5102',
        category: 'Instruments & Maintenance',
        name: 'Grand Piano Semi-Annual Tuning & Drum Head Replacement',
        allocatedAmount: 4800,
        spentAmount: 2400,
        committedAmount: 1200,
        notes: 'Kawai grand piano acoustic regulating & condenser mics maintenance',
        pageRef: 'P19'
      },
      {
        id: 'w-03',
        code: 'WOR-5103',
        category: 'Audio/Visual Hardware',
        name: 'In-Ear Monitor (IEM) Transmitters & Wireless Lapel Upgrades',
        allocatedAmount: 7500,
        spentAmount: 6800,
        committedAmount: 500,
        notes: 'Replacing 4 UHF channels to avoid 5G frequency interference',
        pageRef: 'P19'
      },
      {
        id: 'w-04',
        code: 'WOR-5104',
        category: 'Choir & Music Scores',
        name: 'Choral Folios, Orchestral Scores & Vestment Cleaning',
        allocatedAmount: 3000,
        spentAmount: 1450,
        committedAmount: 600,
        notes: 'Easter and Christmas seasonal cantata sheet music sets',
        pageRef: 'P19'
      },
      {
        id: 'w-05',
        code: 'WOR-5105',
        category: 'Guest Honorariums',
        name: 'Guest Organist, Cello Solos & Special Festival Musicians',
        allocatedAmount: 5000,
        spentAmount: 2200,
        committedAmount: 1800,
        notes: 'Honorariums for seasonal high holidays and combined services',
        pageRef: 'P19'
      },
      {
        id: 'w-06',
        code: 'WOR-5106',
        category: 'Sacramental Elements',
        name: 'Communion Bread, Unleavened Cups, & Liturgical Candles',
        allocatedAmount: 5000,
        spentAmount: 2900,
        committedAmount: 900,
        notes: 'Monthly Lord Supper supplies, baptism candles, and holy oils',
        pageRef: 'P19'
      }
    ]
  },
  {
    departmentId: 'mission',
    departmentName: 'Mission Ministry',
    totalAllocation: 231000,
    pageRef: 'Page 22',
    items: [
      {
        id: 'm-01',
        code: 'MIS-6101',
        category: 'Supported Missionaries',
        name: 'Field Living & Ministry Stipends (5 Full-time Units)',
        allocatedAmount: 162000,
        spentAmount: 108000,
        committedAmount: 54000,
        notes: 'Monthly wire transfers to Sendai, Chiang Mai, Nairobi, Kathmandu, and Hualien (P22)',
        pageRef: 'P22'
      },
      {
        id: 'm-02',
        code: 'MIS-6102',
        category: 'Short-Term Mission (STM)',
        name: 'Indonesia STM Trip Logistics, Flights & School Subsidy',
        allocatedAmount: 18000,
        spentAmount: 9500,
        committedAmount: 7200,
        notes: 'July 18-28 trip for 10 team members to Medan & Lake Toba village school (P21)',
        pageRef: 'P21-22'
      },
      {
        id: 'm-03',
        code: 'MIS-6103',
        category: 'Theological Partner Grants',
        name: 'Southeast Asia Regional Seminary Scholarships',
        allocatedAmount: 35000,
        spentAmount: 17500,
        committedAmount: 17500,
        notes: 'Subsidizing 6 native pastors in Myanmar & Indonesia for M.Div studies',
        pageRef: 'P22'
      },
      {
        id: 'm-04',
        code: 'MIS-6104',
        category: 'Literature & Bible Translation',
        name: 'Scripture Translation & Unreached Peoples Media Outreach',
        allocatedAmount: 16000,
        spentAmount: 8200,
        committedAmount: 4800,
        notes: 'Partnering with Wycliffe for audio New Testament translations in Sumatra dialects',
        pageRef: 'P22'
      }
    ]
  },
  {
    departmentId: 'training',
    departmentName: 'Training Ministry',
    totalAllocation: 23500,
    pageRef: 'Page 26',
    items: [
      {
        id: 't-01',
        code: 'TRN-7101',
        category: '4-Tier Sunday School',
        name: 'Curriculum Printing, Course Workbooks & Study Guides',
        allocatedAmount: 8500,
        spentAmount: 4800,
        committedAmount: 2200,
        notes: '4-tier syllabus: Beginner, Applied, Spiritual Reading, and Research tiers (P23-24)',
        pageRef: 'P23-26'
      },
      {
        id: 't-02',
        code: 'TRN-7102',
        category: 'Seminars & Workshops',
        name: 'AI Bible Study Workshop Honorarium & Tool Software Licenses',
        allocatedAmount: 4200,
        spentAmount: 3850,
        committedAmount: 350,
        notes: 'P25 seminar on LLMs for hermeneutics, sermon preparation, and ethical usage',
        pageRef: 'P25-26'
      },
      {
        id: 't-03',
        code: 'TRN-7103',
        category: 'Leadership Development',
        name: 'Annual Church Leaders Spiritual Retreat & Mentorship Camp',
        allocatedAmount: 7800,
        spentAmount: 5100,
        committedAmount: 2400,
        notes: 'Deacon and cell group leader overnight retreat at Green Hill Center',
        pageRef: 'P26'
      },
      {
        id: 't-04',
        code: 'TRN-7104',
        category: 'Pastoral Theological Library',
        name: 'Commentary Sets, Digital Journal Subscriptions & Monographs',
        allocatedAmount: 3000,
        spentAmount: 1620,
        committedAmount: 800,
        notes: 'Logos theological digital licenses and hardbound research books in R203 library',
        pageRef: 'P26'
      }
    ]
  },
  {
    departmentId: 'service',
    departmentName: 'Service Ministry',
    totalAllocation: 217500,
    pageRef: 'Page 30',
    items: [
      {
        id: 's-01',
        code: 'SRV-8101',
        category: 'Sharing Space Hub',
        name: 'Tea Fruit Hill Community Center Lease, Utilities & Maintenance',
        allocatedAmount: 120000,
        spentAmount: 80000,
        committedAmount: 40000,
        notes: 'Lease and operating overhead for the 90-capacity outreach center on Shan-Gao Rd (P29)',
        pageRef: 'P29-30'
      },
      {
        id: 's-02',
        code: 'SRV-8102',
        category: 'Children Tutoring Program',
        name: 'After-School Tuition Program Stipends, Books & Healthy Snacks',
        allocatedAmount: 32500,
        spentAmount: 21400,
        committedAmount: 8600,
        notes: 'Tuition assistance for 18 local underprivileged elementary/middle schoolers (P28)',
        pageRef: 'P28-30'
      },
      {
        id: 's-03',
        code: 'SRV-8103',
        category: 'Community Feasts',
        name: 'Love Feasts Quarterly Community Dinners & Senior Banquets',
        allocatedAmount: 28000,
        spentAmount: 14200,
        committedAmount: 9800,
        notes: 'Community banquets serving 150+ neighborhood elderly and low-income families (P27)',
        pageRef: 'P27-30'
      },
      {
        id: 's-04',
        code: 'SRV-8104',
        category: 'Special Seasonal Care',
        name: 'Mother Day Care Parcels & Single-Parent Blessing Hampers',
        allocatedAmount: 12000,
        spentAmount: 11800,
        committedAmount: 200,
        notes: 'Custom curated care packages delivered to neighborhood families (P27)',
        pageRef: 'P27-30'
      },
      {
        id: 's-05',
        code: 'SRV-8105',
        category: 'Emergency Benevolence',
        name: 'Community Emergency Medical Relief & Crisis Housing Aid',
        allocatedAmount: 25000,
        spentAmount: 13500,
        committedAmount: 6500,
        notes: 'Deacon board discretionary relief fund for immediate hardship emergencies',
        pageRef: 'P30'
      }
    ]
  }
];

// Programs (Generic Activity Engine)
export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prg-choir-practice',
    departmentId: 'worship',
    name: 'Sanctuary Choir Rehearsal',
    frequency: 'Weekly',
    scheduleText: 'Every Thursday 19:30 - 21:30',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    capacity: 45,
    currentAttendance: 38,
    leaderName: 'Rev. David Chen',
    leaderRole: 'Choir Conductor',
    pageRef: 'Page 18',
    description: 'Weekly choir preparation for Sunday hymns, anthem singing, and seasonal liturgical cantatas.',
    status: 'Active'
  },
  {
    id: 'prg-band-1st',
    departmentId: 'worship',
    name: 'Sunday 1st Traditional Service Ensemble',
    frequency: 'Weekly',
    scheduleText: 'Every Sunday 07:45 - 08:45 (Rehearsal) & 09:00 (Service)',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    capacity: 12,
    currentAttendance: 10,
    leaderName: 'Hannah Hsiao',
    leaderRole: 'Organist & Band Lead',
    pageRef: 'Page 18',
    description: 'Acoustic instruments and organ accompanying liturgical hymns and responsive canticles.',
    status: 'Active'
  },
  {
    id: 'prg-band-2nd',
    departmentId: 'worship',
    name: 'Sunday 2nd Contemporary Praise Band',
    frequency: 'Weekly',
    scheduleText: 'Every Saturday 16:00 - 18:00 (Rehearsal) & Sunday 11:00 (Service)',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    capacity: 15,
    currentAttendance: 14,
    leaderName: 'Joshua Kuo',
    leaderRole: 'Worship Leader',
    pageRef: 'Page 18',
    description: 'Contemporary praise band with electric rhythm section, synth, and multi-vocal team.',
    status: 'Active'
  },
  {
    id: 'prg-stm-indonesia',
    departmentId: 'mission',
    name: 'Indonesia STM Trip 2026',
    frequency: 'Annual',
    scheduleText: 'July 18 - July 28, 2026 (11 Days)',
    facilityId: 'fac-r201',
    facilityName: 'Seminar Room 201 (Briefing)',
    capacity: 10,
    currentAttendance: 10,
    leaderName: 'Pastor Grace Lin',
    leaderRole: 'Field Director',
    pageRef: 'Page 21',
    description: 'Children ministry, village teacher training, medical camp, and bilingual VBS in North Sumatra.',
    status: 'Planning'
  },
  {
    id: 'prg-mission-prayer',
    departmentId: 'mission',
    name: 'Monthly Global Mission Prayer Vigil',
    frequency: 'Monthly',
    scheduleText: 'First Tuesday of Month 19:30 - 21:00',
    facilityId: 'fac-r202',
    facilityName: 'Classroom 202 (Tiered Study)',
    capacity: 35,
    currentAttendance: 28,
    leaderName: 'Elder Joseph Liu',
    leaderRole: 'Mission Committee Chair',
    pageRef: 'Page 20',
    description: 'Intercessory prayer for 5 supported missionary families and unreached diaspora groups.',
    status: 'Active'
  },
  {
    id: 'prg-sunday-school-tiers',
    departmentId: 'training',
    name: '4-Tier Sunday School System',
    frequency: 'Weekly',
    scheduleText: 'Every Sunday 10:30 - 11:45',
    facilityId: 'fac-r201',
    facilityName: 'Education Wing (R201 - R204)',
    capacity: 140,
    currentAttendance: 118,
    leaderName: 'Elder Timothy Wang',
    leaderRole: 'Dean of Sunday School',
    pageRef: 'Page 23-24',
    description: 'Structured 4-tier discipleship: Tier 1 Beginner, Tier 2 Applied, Tier 3 Spiritual Reading, Tier 4 Research.',
    status: 'Active'
  },
  {
    id: 'prg-ai-seminar',
    departmentId: 'training',
    name: 'AI Bible Study & Hermeneutics Workshop',
    frequency: 'One-off',
    scheduleText: 'Saturday Sept 26, 2026 (09:30 - 16:30)',
    facilityId: 'fac-r201',
    facilityName: 'Seminar Room 201',
    capacity: 30,
    currentAttendance: 24,
    leaderName: 'Prof. Luke Chang & Elder Timothy',
    leaderRole: 'Workshop Convenor',
    pageRef: 'Page 25',
    description: 'Practical exploration of AI tools for exegesis, scripture mapping, and responsible church ministry.',
    status: 'Active'
  },
  {
    id: 'prg-tea-fruit-space',
    departmentId: 'service',
    name: 'Tea Fruit Hill Community Sharing Space',
    frequency: 'Weekly',
    scheduleText: 'Tuesday - Saturday 10:00 - 18:00',
    facilityId: 'fac-teafruit',
    facilityName: 'Tea Fruit Hill Community Center',
    capacity: 90,
    currentAttendance: 65,
    leaderName: 'Deaconess Sarah Lee',
    leaderRole: 'Center Director',
    pageRef: 'Page 29',
    description: 'Neighborhood hospitality hub providing quiet workspaces, free artisan teas, parenting talks, and art display.',
    status: 'Active'
  },
  {
    id: 'prg-children-tuition',
    departmentId: 'service',
    name: 'Children After-School Tuition Program',
    frequency: 'Weekly',
    scheduleText: 'Every Wednesday & Friday 16:00 - 18:30',
    facilityId: 'fac-teafruit',
    facilityName: 'Tea Fruit Hill Center & R203',
    capacity: 20,
    currentAttendance: 18,
    leaderName: 'Teacher Esther Chou',
    leaderRole: 'Tuition Program Lead',
    pageRef: 'Page 28',
    description: 'Volunteer university tutors providing individualized academic mentoring and life coaching.',
    status: 'Active'
  },
  {
    id: 'prg-love-feasts',
    departmentId: 'service',
    name: 'Neighborhood Love Feasts (Community Banquets)',
    frequency: 'Quarterly',
    scheduleText: 'Quarterly Saturdays 11:30 - 14:00',
    facilityId: 'fac-fellowship',
    facilityName: 'Fellowship Hall & Dining',
    capacity: 180,
    currentAttendance: 165,
    leaderName: 'Chef Matthew Ko & Deaconess Sarah',
    leaderRole: 'Hospitality Team',
    pageRef: 'Page 27',
    description: 'Warm cooked communal meal connecting neighborhood seniors, lonely residents, and church volunteers.',
    status: 'Active'
  }
];

// Worship Department Data (P17-19)
export const INITIAL_WORSHIP_ROSTER: WorshipRosterMember[] = [
  { id: 'w-roster-1', name: 'Sarah Lin', role: 'Soprano', team: 'Choir', confirmed: true },
  { id: 'w-roster-2', name: 'Eunice Wang', role: 'Soprano', team: 'Choir', confirmed: true },
  { id: 'w-roster-3', name: 'Deborah Cheng', role: 'Alto', team: 'Choir', confirmed: true },
  { id: 'w-roster-4', name: 'Rachel Huang', role: 'Alto', team: 'Choir', confirmed: true },
  { id: 'w-roster-5', name: 'Daniel Wu', role: 'Tenor', team: 'Choir', confirmed: true },
  { id: 'w-roster-6', name: 'Paul Chiang', role: 'Tenor', team: 'Choir', confirmed: false },
  { id: 'w-roster-7', name: 'Marcus Ting', role: 'Bass Vocal', team: 'Choir', confirmed: true },
  { id: 'w-roster-8', name: 'Andrew Yeh', role: 'Bass Vocal', team: 'Choir', confirmed: true },
  { id: 'w-roster-9', name: 'Hannah Hsiao', role: 'Keyboard', team: 'Sunday 1st Praise Band', confirmed: true },
  { id: 'w-roster-10', name: 'Benjamin Tsai', role: 'Acoustic Guitar', team: 'Sunday 1st Praise Band', confirmed: true },
  { id: 'w-roster-11', name: 'Joshua Kuo', role: 'Worship Leader', team: 'Sunday 2nd Praise Band', confirmed: true },
  { id: 'w-roster-12', name: 'Jonathan Shen', role: 'Electric Guitar', team: 'Sunday 2nd Praise Band', confirmed: true },
  { id: 'w-roster-13', name: 'Caleb Sun', role: 'Bass', team: 'Sunday 2nd Praise Band', confirmed: true },
  { id: 'w-roster-14', name: 'Samuel Chou', role: 'Drums', team: 'Sunday 2nd Praise Band', confirmed: true },
  { id: 'w-roster-15', name: 'Leo Fan', role: 'AV Engineer', team: 'Audio/Visual', confirmed: true },
  { id: 'w-roster-16', name: 'Chloe Tseng', role: 'Lighting', team: 'Audio/Visual', confirmed: true }
];

export const INITIAL_LITURGY_PROCEDURES: LiturgyProcedure[] = [
  {
    id: 'lit-easter-communion',
    title: 'Holy Communion & Easter Feast Liturgy',
    season: 'Resurrection Season / Easter',
    date: '2026-04-05',
    orderOfWorship: [
      { stepNumber: 1, element: 'Prelude & Bell Tolling', description: 'Organ: Christ the Lord Is Risen Today (J.S. Bach)', leader: 'Hannah Hsiao', durationMins: 5 },
      { stepNumber: 2, element: 'Call to Worship & Invocation', description: 'Psalm 118:24 - "The stone the builders rejected has become the cornerstone"', leader: 'Rev. David Chen', durationMins: 5 },
      { stepNumber: 3, element: 'Hymn of Praise', description: 'Sanctuary Choir & Congregation: Crown Him with Many Crowns', leader: 'Choir & Ensemble', durationMins: 10 },
      { stepNumber: 4, element: 'Sacrament of the Lord Supper', description: 'Words of Institution (1 Cor 11:23-26), Distribution of Bread & Cup', leader: 'Rev. Jonathan Edwards', durationMins: 20 },
      { stepNumber: 5, element: 'Benediction & Choral Amen', description: 'Triune Blessing and 7-fold Choral Postlude', leader: 'Pastoral Team', durationMins: 5 }
    ],
    markdownNotes: `# Easter Sunday Liturgy Protocol (P17-18)
## Sanctuary Setup:
1. **Chancel Altar**: White liturgical paraments with gold embroidery.
2. **Candles**: Paschal candle lit at center, two communion side candelabras.
3. **Communion Elements**: 450 individual unleavened wafers and purificators inspected by Deacon Board on Saturday 16:00.
4. **AV Stream**: Live camera switch to high-angle chancel during distribution.`,
    pageRef: 'Page 17-18'
  },
  {
    id: 'lit-baptism-confirmation',
    title: 'Holy Baptism & Membership Confirmation Service',
    season: 'Pentecost Season',
    date: '2026-05-24',
    orderOfWorship: [
      { stepNumber: 1, element: 'Gathering Processional', description: 'Candidate procession with family sponsors', leader: 'Deacons', durationMins: 6 },
      { stepNumber: 2, element: 'Confession of Faith', description: 'Recitation of Apostles Creed by 8 candidates', leader: 'Candidates & Pastor', durationMins: 10 },
      { stepNumber: 3, element: 'Administration of Baptism', description: 'Trinitarian baptism in sanctuary pool / water pouring', leader: 'Senior Pastor', durationMins: 25 },
      { stepNumber: 4, element: 'Laying on of Hands', description: 'Pastoral prayer for the Holy Spirit gifts and church covenant', leader: 'Elder Board', durationMins: 15 }
    ],
    markdownNotes: `# Baptismal Service Protocol (P18)
- White robes prepared in changing rooms 1 & 2.
- Individual baptismal certificates stamped by Church Clerk.
- Gift Bibles presented by Sunday School leadership.`,
    pageRef: 'Page 18'
  }
];

// Mission Department Data (P20-22)
export const INITIAL_STM_TRIP: ShortTermMission = {
  id: 'stm-indo-2026',
  destination: 'Medan & Lake Toba Hinterlands',
  country: 'Indonesia',
  dates: 'July 18 - July 28, 2026 (11 Days)',
  targetFocus: 'Children VBS, Village School Computer Lab, Medical Clinic Support',
  totalCapacity: 10,
  allocatedBudget: 18000,
  fundraisedAmount: 16400,
  teamLeader: 'Pastor Grace Lin',
  participants: [
    { id: 'p1', name: 'Pastor Grace Lin', role: 'Leader', status: 'Passport/Visa Verified', vaccineCompleted: true, depositPaid: true, notes: 'Trip Director & Local Liaison' },
    { id: 'p2', name: 'Dr. Marcus Ting', role: 'Medical/Care', status: 'Passport/Visa Verified', vaccineCompleted: true, depositPaid: true, notes: 'General practitioner clinic oversight' },
    { id: 'p3', name: 'Sarah Lin', role: 'Children Ministry', status: 'Confirmed', vaccineCompleted: true, depositPaid: true, notes: 'Bilingual VBS curriculum lead' },
    { id: 'p4', name: 'Joshua Kuo', role: 'Worship', status: 'Confirmed', vaccineCompleted: true, depositPaid: true, notes: 'Acoustic guitar & youth music workshops' },
    { id: 'p5', name: 'Benjamin Tsai', role: 'Logistics', status: 'Passport/Visa Verified', vaccineCompleted: true, depositPaid: true, notes: 'Flight ticketing, local ground transport van' },
    { id: 'p6', name: 'Chloe Tseng', role: 'Testimony', status: 'Training', vaccineCompleted: true, depositPaid: true, notes: 'Youth outreach and craft workshop' },
    { id: 'p7', name: 'Teacher Esther Chou', role: 'Children Ministry', status: 'Confirmed', vaccineCompleted: true, depositPaid: true, notes: 'Elementary reading classes' },
    { id: 'p8', name: 'Leo Fan', role: 'Logistics', status: 'Training', vaccineCompleted: true, depositPaid: true, notes: 'IT hardware setup for village school' },
    { id: 'p9', name: 'Rachel Huang', role: 'Medical/Care', status: 'Applied', vaccineCompleted: false, depositPaid: true, notes: 'First-aid & triage support assistant' },
    { id: 'p10', name: 'Kevin Zhang', role: 'Logistics', status: 'Applied', vaccineCompleted: true, depositPaid: false, notes: 'General assistant and media documentation' }
  ],
  logisticsChecklist: [
    { item: 'Airline group ticket booking (Taipei -> Medan round trip)', completed: true, dueDate: '2026-04-30' },
    { item: 'Indonesia Electronic Visa on Arrival (e-VOA) submission', completed: true, dueDate: '2026-06-01' },
    { item: 'Typhoid, Hepatitis A & Tetanus vaccine boosters confirmed', completed: false, dueDate: '2026-06-15' },
    { item: '4-Week cross-cultural language & ministry simulations', completed: true, dueDate: '2026-06-30' },
    { item: 'Medical supplies & children stationery crates packaging', completed: false, dueDate: '2026-07-10' }
  ],
  pageRef: 'Page 21'
};

export const INITIAL_MISSIONARIES: SupportedMissionary[] = [
  {
    id: 'ms-1',
    name: 'Rev. Paul & Mary Tan',
    field: 'Chiang Mai & Northern Tribal Villages, Thailand',
    agency: 'OMF International',
    monthlySupport: 3200,
    annualSupport: 38400,
    termStart: '2018',
    prayerRequests: [
      'Discipleship training for 12 Lahu tribal evangelists',
      'Completion of village water purification filtration system',
      'Children educational scholarship needs'
    ],
    recentUpdate: 'Successfully completed the summer youth biblical retreat with 84 tribal youth in attendance. 14 gave their lives to Christ.',
    status: 'Active',
    pageRef: 'Page 22'
  },
  {
    id: 'ms-2',
    name: 'Timothy & Lydia Hsieh',
    field: 'Sendai, Tohoku Region, Japan',
    agency: 'SEND International',
    monthlySupport: 3500,
    annualSupport: 42000,
    termStart: '2020',
    prayerRequests: [
      'Heart softening among university students in Sendai',
      'Community English conversation and Gospel cafe outreach',
      'Visa extension approval from Japanese immigration'
    ],
    recentUpdate: 'Began weekly lunchtime student gathering near Tohoku University. 8 regular non-Christian seekers are reading Gospel of Mark.',
    status: 'Active',
    pageRef: 'Page 22'
  },
  {
    id: 'ms-3',
    name: 'Dr. Barnabas & Grace Mwangi',
    field: 'Nairobi Slums & Theological College, Kenya',
    agency: 'SIM International',
    monthlySupport: 2800,
    annualSupport: 33600,
    termStart: '2016',
    prayerRequests: [
      'Health safety amidst seasonal cholera outbreak in Kibera',
      'Sponsorship for 30 orphan vocational training graduates',
      'Pastor training seminars in Kisumu'
    ],
    recentUpdate: 'Graduated 22 students from the Community Computer Training initiative; 18 secured employment in local retail logistics.',
    status: 'Active',
    pageRef: 'Page 22'
  },
  {
    id: 'ms-4',
    name: 'Silas & Anna Thapa',
    field: 'Kathmandu Valley & Himalayan foothills, Nepal',
    agency: 'Pioneers',
    monthlySupport: 2200,
    annualSupport: 26400,
    termStart: '2021',
    prayerRequests: [
      'Religious freedom and protection from anti-conversion scrutiny',
      'Winter warm jacket distribution in mountain settlements',
      'Translation of discipleship booklets into regional dialect'
    ],
    recentUpdate: 'Established 2 new house fellowships in Dhading district with 35 baptized believers holding regular Sunday worship.',
    status: 'Active',
    pageRef: 'Page 22'
  },
  {
    id: 'ms-5',
    name: 'Deborah Liu',
    field: 'Hualien Indigenous Care & Youth Mentorship, Taiwan',
    agency: 'Local Church Home Mission Board',
    monthlySupport: 1800,
    annualSupport: 21600,
    termStart: '2023',
    prayerRequests: [
      'Addiction recovery counseling for indigenous youth',
      'Partnership with tribal primary schools for after-school reading',
      'Physical stamina for traveling rugged mountain roads'
    ],
    recentUpdate: 'Conducted weekly after-school music and scripture reading sessions for 28 Taroko aboriginal children.',
    status: 'Active',
    pageRef: 'Page 22'
  }
];

// Training Department Data (P23-26)
export const INITIAL_SUNDAY_SCHOOL_COURSES: SundaySchoolCourse[] = [
  {
    id: 'ssc-tier1',
    tier: 'Beginner',
    tierNumber: 1,
    title: 'Foundations of Christian Faith & Scripture Survey',
    instructor: 'Pastor Mark Ho & Sister Alice Chen',
    term: 'Fall Term (12 Weeks)',
    schedule: 'Sundays 10:30 - 11:45 AM',
    classroom: 'Room 201 (Education Wing)',
    enrolledCount: 36,
    capacity: 40,
    prerequisites: 'None - Open to seekers, new converts, and baptism candidates',
    curriculumSummary: 'Systematic exploration of God, Creation, Fall, Redemption, the Trinity, and Old/New Testament overview.',
    syllabusWeeks: [
      { week: 1, topic: 'Who is God? The Divine Attributes and Revelation', reading: 'Genesis 1-3, Psalm 19' },
      { week: 2, topic: 'The Canon: How We Got the Bible', reading: '2 Timothy 3:14-17, 2 Peter 1:19-21' },
      { week: 3, topic: 'The Old Testament Covenant: Abraham to David', reading: 'Genesis 12, 2 Samuel 7' },
      { week: 4, topic: 'The Four Gospels & The Incarnate Word', reading: 'Gospel of Mark' }
    ],
    pageRef: 'Page 23'
  },
  {
    id: 'ssc-tier2',
    tier: 'Applied',
    tierNumber: 2,
    title: 'Christian Ethics in Marketplace, Marriage & Family',
    instructor: 'Elder Joseph Liu & Deaconess Martha Fang',
    term: 'Fall Term (12 Weeks)',
    schedule: 'Sundays 10:30 - 11:45 AM',
    classroom: 'Room 202 (Education Wing)',
    enrolledCount: 32,
    capacity: 35,
    prerequisites: 'Completion of Tier 1 or Church Baptism',
    curriculumSummary: 'Living out Christian convictions in career choices, corporate ethics, wealth stewardship, and biblical family relationships.',
    syllabusWeeks: [
      { week: 1, topic: 'The Sacredness of Work: Vocation and Creation Mandate', reading: 'Colossians 3:22-24, Tim Keller "Every Good Endeavor"' },
      { week: 2, topic: 'Integrity in Business, Finance & Intellectual Property', reading: 'Proverbs 11, Luke 16:1-13' },
      { week: 3, topic: 'Covenant Marriage & Conflict Resolution', reading: 'Ephesians 5:21-33' },
      { week: 4, topic: 'Parenting in a Digital & Pluralistic Culture', reading: 'Deuteronomy 6:4-9' }
    ],
    pageRef: 'Page 23-24'
  },
  {
    id: 'ssc-tier3',
    tier: 'Spiritual Reading',
    tierNumber: 3,
    title: 'Classics of Christian Devotion & Spiritual Formation',
    instructor: 'Elder Timothy Wang',
    term: 'Fall Term (12 Weeks)',
    schedule: 'Sundays 10:30 - 11:45 AM',
    classroom: 'Room 203 (Library)',
    enrolledCount: 26,
    capacity: 30,
    prerequisites: 'Completion of Tier 2 or 3+ years baptized church member',
    curriculumSummary: 'Reading deeply with the historical saints: Augustine Confessions, Brother Lawrence Practice of the Presence of God, Bonhoeffer Cost of Discipleship, and C.S. Lewis.',
    syllabusWeeks: [
      { week: 1, topic: 'Augustine of Hippo: The Restless Heart and Grace', reading: 'Confessions Books I & VIII' },
      { week: 2, topic: 'The Desert Fathers & Contemplative Prayer', reading: 'Selected Sayings of the Desert Fathers' },
      { week: 3, topic: 'Brother Lawrence: Cultivating Unbroken Communion', reading: 'The Practice of the Presence of God' },
      { week: 4, topic: 'Dietrich Bonhoeffer: Costly Grace vs Cheap Grace', reading: 'The Cost of Discipleship Ch. 1-3' }
    ],
    pageRef: 'Page 24'
  },
  {
    id: 'ssc-tier4',
    tier: 'Research',
    tierNumber: 4,
    title: 'Advanced Biblical Hermeneutics & Systematic Theology',
    instructor: 'Rev. Jonathan Edwards, Ph.D.',
    term: 'Fall Term (12 Weeks)',
    schedule: 'Sundays 10:30 - 11:45 AM',
    classroom: 'Room 204 (Seminar Lab)',
    enrolledCount: 24,
    capacity: 25,
    prerequisites: 'Prior pastoral recommendation or theological degree background',
    curriculumSummary: 'Exegesis in Greek/Hebrew syntax, historical-grammatical interpretation, covenantal theology, and contemporary apologetics.',
    syllabusWeeks: [
      { week: 1, topic: 'Epistemology & Divine Revelation: General and Special', reading: 'Bavinck, Reformed Dogmatics Vol. 1' },
      { week: 2, topic: 'Biblical Typology & Christocentric Hermeneutics', reading: 'Vos, Biblical Theology' },
      { week: 3, topic: 'Eschatology: Millennial Views and New Creation', reading: 'Romans 8:18-25, Revelation 21-22' },
      { week: 4, topic: 'Apologetic Engagement with Postmodern Naturalism', reading: 'Alvin Plantinga "Where the Conflict Really Lies"' }
    ],
    pageRef: 'Page 24'
  }
];

export const INITIAL_AI_SEMINAR: SeminarEvent = {
  id: 'sem-ai-2026',
  title: 'AI Bible Study & Theological Hermeneutics Workshop',
  speaker: 'Prof. Luke Chang (PhD in Biblical Studies & AI Research Associate)',
  date: 'Saturday, September 26, 2026',
  time: '09:30 AM - 16:30 PM (Lunch provided)',
  location: 'Seminar Room 201 & Hybrid Online Stream',
  capacity: 30,
  budgetAllocation: 4200,
  overview: 'Equipping pastors, teachers, and small group leaders with critical AI literacy. Covers prompt engineering for comparative scripture mapping, original language syntax analysis, sermon illustration ideation, and theological guardrails against algorithmic hallucinations.',
  registeredAttendees: [
    { id: 'att-1', name: 'Rev. David Chen', email: 'david.chen@church2026.org', ministryRole: 'Worship Director', registeredAt: '2026-08-12', attended: true },
    { id: 'att-2', name: 'Pastor Grace Lin', email: 'grace.lin@church2026.org', ministryRole: 'Mission Director', registeredAt: '2026-08-14', attended: true },
    { id: 'att-3', name: 'Hannah Hsiao', email: 'hannah.h@gmail.com', ministryRole: 'Sunday School Tier 1 Teacher', registeredAt: '2026-08-15', attended: true },
    { id: 'att-4', name: 'Joshua Kuo', email: 'joshua.k@church2026.org', ministryRole: 'Youth Pastor & Worship Lead', registeredAt: '2026-08-18', attended: true },
    { id: 'att-5', name: 'Teacher Esther Chou', email: 'esther.c@gmail.com', ministryRole: 'Children Ministry Lead', registeredAt: '2026-08-19', attended: true },
    { id: 'att-6', name: 'Leo Fan', email: 'leo.fan@techcorp.com', ministryRole: 'AV Team & IT Deacon', registeredAt: '2026-08-20', attended: true },
    { id: 'att-7', name: 'Marcus Ting', email: 'marcus.ting@med.org', ministryRole: 'Mission Medical Lead', registeredAt: '2026-08-21', attended: true },
    { id: 'att-8', name: 'Sister Alice Chen', email: 'alice.c@church2026.org', ministryRole: 'Tier 1 Co-Instructor', registeredAt: '2026-08-22', attended: true },
    { id: 'att-9', name: 'Elder Joseph Liu', email: 'joseph.liu@biznet.com', ministryRole: 'Tier 2 Instructor', registeredAt: '2026-08-24', attended: true },
    { id: 'att-10', name: 'Deaconess Martha Fang', email: 'martha.f@gmail.com', ministryRole: 'Tier 2 Co-Instructor', registeredAt: '2026-08-25', attended: true },
    { id: 'att-11', name: 'Kevin Zhang', email: 'kevin.z@univ.edu', ministryRole: 'University Fellowship Leader', registeredAt: '2026-08-26', attended: true },
    { id: 'att-12', name: 'Chloe Tseng', email: 'chloe.t@design.com', ministryRole: 'Youth Small Group Counselor', registeredAt: '2026-08-28', attended: true }
  ],
  pageRef: 'Page 25'
};

// Service Department Data (P27-30)
export const INITIAL_SHARING_SPACE_SLOTS: SharingSpaceSlot[] = [
  {
    id: 'sp-1',
    roomName: 'Main Community Cafe & Quiet Study Pods',
    date: 'Every Tuesday - Friday',
    timeSlot: '10:00 - 18:00',
    communityPartner: 'Open Neighborhood Residents & High Schoolers',
    purpose: 'Free high-speed wifi, fair-trade drip coffee, quiet academic study and co-working',
    attendeeEstimate: 45,
    supervisorName: 'Sister Ruth Yang',
    status: 'Approved',
    notes: 'Volunteers refill artisan tea and maintain quiet environment'
  },
  {
    id: 'sp-2',
    roomName: 'Community Counseling Nook (Private Room B)',
    date: 'Wednesdays & Saturdays',
    timeSlot: '14:00 - 17:00',
    communityPartner: 'Christian Counselors Association',
    purpose: 'Pro-bono marriage counseling, grief support, and adolescent emotional guidance',
    attendeeEstimate: 4,
    supervisorName: 'Dr. Evelyn Kuo',
    status: 'Approved',
    notes: 'Confidential soundproof room with separate exterior entrance'
  },
  {
    id: 'sp-3',
    roomName: 'Multi-Purpose Workshop Gallery',
    date: 'Thursdays',
    timeSlot: '14:00 - 16:30',
    communityPartner: 'Shan-Gao Senior Citizens Association',
    purpose: 'Chinese Calligraphy, Horticultural Herb Tea Brewing & Gentle Stretching',
    attendeeEstimate: 28,
    supervisorName: 'Deaconess Sarah Lee',
    status: 'Approved',
    notes: 'Free herbal tea and healthy snacks provided by Service Dept budget'
  },
  {
    id: 'sp-4',
    roomName: 'Multi-Purpose Workshop Gallery',
    date: 'Friday Evenings',
    timeSlot: '19:00 - 21:00',
    communityPartner: 'Parenting & Marriage Growth Guild',
    purpose: 'Positive Parenting Seminar & Child Psychology Q&A',
    attendeeEstimate: 32,
    supervisorName: 'Deaconess Martha Fang',
    status: 'Approved',
    notes: 'Child-care volunteer team provided in adjoining room'
  }
];

export const INITIAL_TUITION_STUDENTS: TuitionStudent[] = [
  { id: 'tu-1', name: 'Ethan Chen', grade: 'Grade 5', assignedTutor: 'Kevin Zhang', subjects: ['Mathematics', 'Science'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 94, guardianContact: 'Mrs. Chen (0921-***-112)', subsidized: true },
  { id: 'tu-2', name: 'Mia Lin', grade: 'Grade 4', assignedTutor: 'Chloe Tseng', subjects: ['English', 'Reading'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 100, guardianContact: 'Mr. Lin (0933-***-543)', subsidized: true },
  { id: 'tu-3', name: 'Lucas Wang', grade: 'Grade 6', assignedTutor: 'Leo Fan', subjects: ['Math', 'Basic Scratch Coding'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 88, guardianContact: 'Grandmother Wang (0910-***-899)', subsidized: true },
  { id: 'tu-4', name: 'Sophie Tsai', grade: 'Grade 3', assignedTutor: 'Rachel Huang', subjects: ['Chinese Reading', 'Homework Care'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 96, guardianContact: 'Ms. Tsai (0955-***-772)', subsidized: true },
  { id: 'tu-5', name: 'Daniel Chang', grade: 'Grade 7', assignedTutor: 'Benjamin Tsai', subjects: ['Algebra', 'English Grammar'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 92, guardianContact: 'Mrs. Chang (0988-***-301)', subsidized: true },
  { id: 'tu-6', name: 'Zoe Yeh', grade: 'Grade 5', assignedTutor: 'Teacher Esther Chou', subjects: ['Science', 'General Homework'], dayTime: 'Wed & Fri 16:30-18:00', attendanceRate: 95, guardianContact: 'Mr. Yeh (0972-***-441)', subsidized: true }
];

export const INITIAL_OUTREACH_SERVICES: OutreachService[] = [
  {
    id: 'out-1',
    title: 'Quarterly Neighborhood Love Feasts (愛筵)',
    targetAudience: 'Community elderly living alone, low-income single parents, sanitation workers',
    budget: 28000,
    date: 'Quarterly (Next: Nov 14, 2026)',
    coordinator: 'Chef Matthew Ko & Deaconess Sarah Lee',
    volunteerCount: 24,
    description: 'Freshly prepared 6-course nutritious banquet in Fellowship Hall with live musical accompaniment and warm hospitality.',
    impactMetrics: '165 neighborhood participants fed; 42 registered for ongoing community care calls.',
    pageRef: 'Page 27'
  },
  {
    id: 'out-2',
    title: 'Mother Day Gratitude Care Hampers (母親節溫馨關懷)',
    targetAudience: 'Neighborhood single mothers and elderly grandmothers in public housing',
    budget: 12000,
    date: 'May 8 - 10, 2026',
    coordinator: 'Sister Ruth Yang & Service Team',
    volunteerCount: 18,
    description: 'Hand-assembled gift baskets containing organic nutrition soup packs, handmade natural soaps, carnations, and blessings cards.',
    impactMetrics: '120 households personally visited across 4 municipal districts.',
    pageRef: 'Page 27'
  },
  {
    id: 'out-3',
    title: 'Children After-School Academic Tutoring & Character Mentorship',
    targetAudience: 'Elementary & junior high students from vulnerable families',
    budget: 32500,
    date: 'Wednesdays & Fridays throughout semester',
    coordinator: 'Teacher Esther Chou',
    volunteerCount: 8,
    description: 'Providing safe haven, healthy snacks, one-on-one homework help, and Christian character story hours.',
    impactMetrics: '18 students enrolled; average academic grade improvement of 1.4 letter grades.',
    pageRef: 'Page 28'
  }
];

// Master Volunteer Pool & Personnel (Shared Core)
export const INITIAL_VOLUNTEER_POOL: VolunteerMember[] = [
  {
    id: 'vol-1',
    name: 'Sarah Lin',
    chineseName: '林雅慧',
    email: 'sarah.lin@gmail.com',
    phone: '0912-345-678',
    primaryDepartment: 'worship',
    roles: [
      { departmentId: 'worship', roleName: 'Choir Soprano Lead', subGroup: 'Sanctuary Choir' },
      { departmentId: 'mission', roleName: 'STM VBS Curriculum Lead', subGroup: 'Indonesia STM 2026' }
    ],
    qualifications: ['Vocal Grade 8', 'First Aid Certified', 'Bilingual English/Mandarin'],
    servingFrequency: 'Weekly + Seasonal STM',
    status: 'Active',
    pageRef: 'Page 18, 21'
  },
  {
    id: 'vol-2',
    name: 'Joshua Kuo',
    chineseName: '郭承恩',
    email: 'joshua.k@church2026.org',
    phone: '0922-888-999',
    primaryDepartment: 'worship',
    roles: [
      { departmentId: 'worship', roleName: 'Contemporary Worship Leader', subGroup: 'Sunday 2nd Band' },
      { departmentId: 'mission', roleName: 'STM Youth Music Lead', subGroup: 'Indonesia STM 2026' },
      { departmentId: 'training', roleName: 'Youth Small Group Mentor', subGroup: 'Tier 1 Mentors' }
    ],
    qualifications: ['Acoustic Guitar', 'Youth Ministry Certificate', 'Child Protection Clearance'],
    servingFrequency: 'Heavy (3 Ministries) - High Fatigue Risk',
    status: 'Active',
    pageRef: 'Page 18, 21, 23'
  },
  {
    id: 'vol-3',
    name: 'Teacher Esther Chou',
    chineseName: '周逸芬',
    email: 'esther.c@gmail.com',
    phone: '0935-123-987',
    primaryDepartment: 'service',
    roles: [
      { departmentId: 'service', roleName: 'Tuition Program Coordinator', subGroup: 'Tea Fruit Hill' },
      { departmentId: 'training', roleName: 'Sunday School Elementary Lead', subGroup: 'Children Dept' },
      { departmentId: 'mission', roleName: 'STM Children Ministry', subGroup: 'Indonesia STM 2026' }
    ],
    qualifications: ['Certified Primary Educator', 'Child Counseling', '10+ Years Experience'],
    servingFrequency: 'Weekly (Tuition Wed/Fri + Sun School)',
    status: 'Active',
    pageRef: 'Page 21, 24, 28'
  },
  {
    id: 'vol-4',
    name: 'Leo Fan',
    chineseName: '范立歐',
    email: 'leo.fan@techcorp.com',
    phone: '0988-555-111',
    primaryDepartment: 'worship',
    roles: [
      { departmentId: 'worship', roleName: 'Chief AV & Live-stream Engineer', subGroup: 'AV Team' },
      { departmentId: 'mission', roleName: 'STM IT/Logistics', subGroup: 'Indonesia STM 2026' },
      { departmentId: 'service', roleName: 'Tuition Coding Tutor', subGroup: 'After-school Tuition' }
    ],
    qualifications: ['Dante Level 2 Audio Certified', 'Network Admin', 'Drone Videography'],
    servingFrequency: 'Weekly (Sunday AV + Wed Coding)',
    status: 'Active',
    pageRef: 'Page 18, 21, 28'
  },
  {
    id: 'vol-5',
    name: 'Dr. Marcus Ting',
    chineseName: '丁冠宇',
    email: 'marcus.ting@med.org',
    phone: '0919-444-222',
    primaryDepartment: 'mission',
    roles: [
      { departmentId: 'mission', roleName: 'Medical Team Lead', subGroup: 'Indonesia STM 2026' },
      { departmentId: 'worship', roleName: 'Choir Bass Section', subGroup: 'Sanctuary Choir' }
    ],
    qualifications: ['M.D. Family Medicine', 'Advanced Life Support (ACLS)', 'Cross-Cultural Missions'],
    servingFrequency: 'Weekly (Choir Thursday/Sunday)',
    status: 'Active',
    pageRef: 'Page 18, 21'
  },
  {
    id: 'vol-6',
    name: 'Hannah Hsiao',
    chineseName: '蕭詠心',
    email: 'hannah.h@gmail.com',
    phone: '0970-111-333',
    primaryDepartment: 'worship',
    roles: [
      { departmentId: 'worship', roleName: 'Chief Organist & Ensemble Lead', subGroup: 'Sunday 1st Band' },
      { departmentId: 'training', roleName: 'Sunday School Tier 1 Instructor', subGroup: 'Foundations' }
    ],
    qualifications: ['M.Mus Organ Performance', 'Theological Studies Dip.', 'Choir Direction'],
    servingFrequency: 'Weekly (Sunday Morning Full Roster)',
    status: 'Active',
    pageRef: 'Page 18, 23'
  },
  {
    id: 'vol-7',
    name: 'Benjamin Tsai',
    chineseName: '蔡秉憲',
    email: 'ben.tsai@consulting.com',
    phone: '0966-222-777',
    primaryDepartment: 'mission',
    roles: [
      { departmentId: 'mission', roleName: 'STM Logistics Manager', subGroup: 'Indonesia STM 2026' },
      { departmentId: 'service', roleName: 'Tuition Math Mentor', subGroup: 'After-school Tuition' }
    ],
    qualifications: ['PMP Certified', 'Acoustic Guitar', 'Indonesian Language Level 1'],
    servingFrequency: 'Bi-weekly',
    status: 'Active',
    pageRef: 'Page 21, 28'
  },
  {
    id: 'vol-8',
    name: 'Chloe Tseng',
    chineseName: '曾巧安',
    email: 'chloe.t@design.com',
    phone: '0952-777-888',
    primaryDepartment: 'worship',
    roles: [
      { departmentId: 'worship', roleName: 'Stage Lighting & Visual Arts', subGroup: 'AV Team' },
      { departmentId: 'service', roleName: 'Tuition English Tutor', subGroup: 'After-school Tuition' }
    ],
    qualifications: ['UI/UX Designer', 'Youth Mentorship', 'Children Arts'],
    servingFrequency: 'Weekly',
    status: 'Active',
    pageRef: 'Page 18, 28'
  },
  {
    id: 'vol-9',
    name: 'Chef Matthew Ko',
    chineseName: '柯銘德',
    email: 'chef.ko@dining.tw',
    phone: '0932-999-000',
    primaryDepartment: 'service',
    roles: [
      { departmentId: 'service', roleName: 'Love Feasts Head Chef', subGroup: 'Fellowship Hall Kitchen' }
    ],
    qualifications: ['Executive Chef Class A License', 'HACCP Food Safety Certified'],
    servingFrequency: 'Quarterly + Major Holidays',
    status: 'Active',
    pageRef: 'Page 27'
  },
  {
    id: 'vol-10',
    name: 'Sister Ruth Yang',
    chineseName: '楊淑惠',
    email: 'ruth.yang@gmail.com',
    phone: '0918-666-444',
    primaryDepartment: 'service',
    roles: [
      { departmentId: 'service', roleName: 'Tea Fruit Hill Hospitality Lead', subGroup: 'Outreach Center' }
    ],
    qualifications: ['Senior Caregiver Certified', 'Tea Master Level 2'],
    servingFrequency: '3 Days a Week (Tue/Thu/Sat)',
    status: 'Active',
    pageRef: 'Page 29'
  }
];

// Master Calendar Events with Conflict Checker (Phase 1 Integration)
export const INITIAL_CALENDAR_SCHEDULE: CalendarScheduleItem[] = [
  {
    id: 'cal-1',
    title: 'Sanctuary Choir Rehearsal',
    departmentId: 'worship',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    dayOfWeek: 'Thursday',
    startTime: '19:30',
    endTime: '21:30',
    recurring: true,
    leadPerson: 'Rev. David Chen',
    pageRef: 'Page 18'
  },
  {
    id: 'cal-2',
    title: 'Sunday 1st Traditional Service & Rehearsal',
    departmentId: 'worship',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    dayOfWeek: 'Sunday',
    startTime: '07:45',
    endTime: '10:15',
    recurring: true,
    leadPerson: 'Hannah Hsiao',
    pageRef: 'Page 18'
  },
  {
    id: 'cal-3',
    title: 'Sunday 2nd Contemporary Service',
    departmentId: 'worship',
    facilityId: 'fac-sanctuary',
    facilityName: 'Main Sanctuary',
    dayOfWeek: 'Sunday',
    startTime: '10:45',
    endTime: '12:30',
    recurring: true,
    leadPerson: 'Joshua Kuo',
    pageRef: 'Page 18'
  },
  {
    id: 'cal-4',
    title: 'Sunday School Tier 1 & Tier 2',
    departmentId: 'training',
    facilityId: 'fac-r201',
    facilityName: 'Seminar Room 201',
    dayOfWeek: 'Sunday',
    startTime: '10:30',
    endTime: '11:45',
    recurring: true,
    leadPerson: 'Pastor Mark Ho',
    pageRef: 'Page 23'
  },
  {
    id: 'cal-5',
    title: 'Sunday School Tier 3 Spiritual Reading',
    departmentId: 'training',
    facilityId: 'fac-r203',
    facilityName: 'Seminar Room 203',
    dayOfWeek: 'Sunday',
    startTime: '10:30',
    endTime: '11:45',
    recurring: true,
    leadPerson: 'Elder Timothy Wang',
    pageRef: 'Page 24'
  },
  {
    id: 'cal-6',
    title: 'Sunday School Tier 4 Research Seminar',
    departmentId: 'training',
    facilityId: 'fac-r202',
    facilityName: 'Classroom 202 (Tiered Study)',
    dayOfWeek: 'Sunday',
    startTime: '10:30',
    endTime: '11:45',
    recurring: true,
    leadPerson: 'Rev. Jonathan Edwards',
    pageRef: 'Page 24'
  },
  {
    id: 'cal-7',
    title: 'Monthly Global Mission Prayer Vigil',
    departmentId: 'mission',
    facilityId: 'fac-r202',
    facilityName: 'Classroom 202 (Tiered Study)',
    dayOfWeek: 'Tuesday',
    startTime: '19:30',
    endTime: '21:00',
    recurring: true,
    leadPerson: 'Elder Joseph Liu',
    pageRef: 'Page 20'
  },
  {
    id: 'cal-8',
    title: 'Tea Fruit Hill Community Cafe Public Hours',
    departmentId: 'service',
    facilityId: 'fac-teafruit',
    facilityName: 'Tea Fruit Hill Community Center',
    dayOfWeek: 'Wednesday',
    startTime: '10:00',
    endTime: '18:00',
    recurring: true,
    leadPerson: 'Sister Ruth Yang',
    pageRef: 'Page 29'
  },
  {
    id: 'cal-9',
    title: 'Children Tutoring Clinic (After-School)',
    departmentId: 'service',
    facilityId: 'fac-teafruit',
    facilityName: 'Tea Fruit Hill Community Center',
    dayOfWeek: 'Wednesday',
    startTime: '16:00',
    endTime: '18:30',
    recurring: true,
    leadPerson: 'Teacher Esther Chou',
    pageRef: 'Page 28'
  },
  {
    id: 'cal-10',
    title: 'Quarterly Neighborhood Love Feast Banquet',
    departmentId: 'service',
    facilityId: 'fac-fellowship',
    facilityName: 'Fellowship Hall & Dining',
    dayOfWeek: 'Saturday',
    startTime: '11:00',
    endTime: '14:30',
    recurring: false,
    date: '2026-11-14',
    leadPerson: 'Deaconess Sarah Lee',
    pageRef: 'Page 27'
  },
  {
    id: 'cal-11',
    title: 'AI Bible Study & Hermeneutics Workshop (Special)',
    departmentId: 'training',
    facilityId: 'fac-r201',
    facilityName: 'Seminar Room 201',
    dayOfWeek: 'Saturday',
    startTime: '09:30',
    endTime: '16:30',
    recurring: false,
    date: '2026-09-26',
    leadPerson: 'Prof. Luke Chang',
    pageRef: 'Page 25'
  }
];

// Ministry Health Report (Summary of Enhancement P17-30)
export const INITIAL_HEALTH_REPORTS: DepartmentHealthMetric[] = [
  {
    departmentId: 'worship',
    departmentName: 'Worship Ministry',
    pageRef: 'Pages 17-19',
    director: 'Rev. David Chen',
    overallScore: 94,
    grade: 'A',
    objectivesTotal: 8,
    objectivesMet: 8,
    budgetAllocated: 28500,
    budgetSpent: 18950,
    budgetCommitted: 5000,
    budgetBurnRate: 84.0,
    volunteerRequirement: 25,
    volunteerActive: 28,
    eventExecutionRate: 98,
    strengths: [
      'Choir and two distinct worship bands operating on seamless weekly schedule (P18)',
      'All live-stream copyright licensing (CCLI & OneLicense) fully compliant and up to date',
      'Sacramental communion protocols meticulously documented and executed'
    ],
    keyRisks: [
      'Key worship leaders (e.g. Joshua Kuo) serving in multiple cross-ministries, risk of fatigue',
      'UHF wireless frequency spectrum updates needed before next municipal band audit'
    ],
    recommendation: 'Expand vocal apprentice training in Tier 1 Sunday School to groom younger backup worship leaders.'
  },
  {
    departmentId: 'mission',
    departmentName: 'Mission Ministry',
    pageRef: 'Pages 20-22',
    director: 'Pastor Grace Lin',
    overallScore: 91,
    grade: 'A',
    objectivesTotal: 6,
    objectivesMet: 5,
    budgetAllocated: 231000,
    budgetSpent: 143200,
    budgetCommitted: 83500,
    budgetBurnRate: 98.1,
    volunteerRequirement: 18,
    volunteerActive: 16,
    eventExecutionRate: 92,
    strengths: [
      '5 full-time missionary family units stably sustained with zero wire transfer delays (P22)',
      'Indonesia STM 10-person team fully recruited with 91% fundraising target reached (P21)',
      'Himalayan & Sendai seeker contact rates showing notable growth'
    ],
    keyRisks: [
      'Indonesia visa approval timeline tight for 2 last-minute medical team applicants',
      'Foreign exchange fluctuation impact on Japan & Kenya living allowances'
    ],
    recommendation: 'Finalize international medical insurance policies and complete pre-field vaccine verification.'
  },
  {
    departmentId: 'training',
    departmentName: 'Training Ministry',
    pageRef: 'Pages 23-26',
    director: 'Elder Timothy Wang',
    overallScore: 95,
    grade: 'A+',
    objectivesTotal: 7,
    objectivesMet: 7,
    budgetAllocated: 23500,
    budgetSpent: 15370,
    budgetCommitted: 5750,
    budgetBurnRate: 89.9,
    volunteerRequirement: 16,
    volunteerActive: 18,
    eventExecutionRate: 96,
    strengths: [
      '4-Tier Sunday School curriculum running with 118 active adult & youth students (P23-24)',
      'High enrollment (24/30) in innovative "AI Bible Study Workshop" (P25)',
      'Leadership retreat registration achieved 100% capacity in advance'
    ],
    keyRisks: [
      'Tier 4 Advanced Research requires more theological reference monographs',
      'Classroom 202 acoustics require minor sound panel dampening'
    ],
    recommendation: 'Digitize Tier 1 & Tier 2 student workbooks for mobile access to reduce paper printing costs.'
  },
  {
    departmentId: 'service',
    departmentName: 'Service Ministry',
    pageRef: 'Pages 27-30',
    director: 'Deaconess Sarah Lee',
    overallScore: 93,
    grade: 'A',
    objectivesTotal: 9,
    objectivesMet: 8,
    budgetAllocated: 217500,
    budgetSpent: 146900,
    budgetCommitted: 65100,
    budgetBurnRate: 97.5,
    volunteerRequirement: 40,
    volunteerActive: 38,
    eventExecutionRate: 95,
    strengths: [
      'Tea Fruit Hill Community Center successfully serving 350+ neighborhood visits monthly (P29)',
      'Children After-School Tuition tutoring 18 students with documented grade improvements (P28)',
      'Quarterly Love Feasts building genuine trust with municipal village wardens'
    ],
    keyRisks: [
      'Commercial lease renewal for Tea Fruit Hill in 2027 requires early negotiation',
      'High demand for volunteer tutors during university mid-term exam seasons'
    ],
    recommendation: 'Partner with local Christian university student fellowships to recruit auxiliary weekday tutors.'
  }
];
