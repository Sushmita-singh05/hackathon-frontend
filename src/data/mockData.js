// Mock data for MedBloom dashboard pages

export const mockPatients = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 34,
    condition: 'Hypertension',
    phone: '+91 98765 43210',
    lastVisit: '2026-05-15',
    adherence: 92,
    avatar: 'PS',
    status: 'active',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    age: 45,
    condition: 'Type 2 Diabetes',
    phone: '+91 87654 32109',
    lastVisit: '2026-05-14',
    adherence: 78,
    avatar: 'RV',
    status: 'active',
  },
  {
    id: 3,
    name: 'Anita Desai',
    age: 28,
    condition: 'Thyroid',
    phone: '+91 76543 21098',
    lastVisit: '2026-05-12',
    adherence: 95,
    avatar: 'AD',
    status: 'active',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    age: 52,
    condition: 'Post-Surgery Recovery',
    phone: '+91 65432 10987',
    lastVisit: '2026-05-10',
    adherence: 64,
    avatar: 'VS',
    status: 'attention',
  },
  {
    id: 5,
    name: 'Meera Patel',
    age: 41,
    condition: 'Asthma',
    phone: '+91 54321 09876',
    lastVisit: '2026-05-08',
    adherence: 88,
    avatar: 'MP',
    status: 'active',
  },
  {
    id: 6,
    name: 'Arjun Nair',
    age: 38,
    condition: 'Migraine',
    phone: '+91 43210 98765',
    lastVisit: '2026-05-06',
    adherence: 71,
    avatar: 'AN',
    status: 'attention',
  },
];

export const mockMedicines = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    time: '8:00 AM',
    period: 'Morning',
    taken: false,
    description: '1 tablet after breakfast',
  },
  {
    id: 2,
    name: 'Ibuprofen 200mg',
    time: '2:00 PM',
    period: 'Afternoon',
    taken: false,
    description: '1 tablet after lunch',
  },
  {
    id: 3,
    name: 'Paracetamol 650mg',
    time: '6:00 PM',
    period: 'Evening',
    taken: false,
    description: '1 tablet if needed',
  },
  {
    id: 4,
    name: 'Vitamin D3 1000IU',
    time: '9:00 PM',
    period: 'Night',
    taken: false,
    description: '1 capsule after dinner',
  },
];

export const mockReminders = [
  { id: 1, patient: 'Priya Sharma', medicine: 'Metformin 500mg', time: '9:00 AM', status: 'sent' },
  { id: 2, patient: 'Rahul Verma', medicine: 'Insulin', time: '10:00 AM', status: 'pending' },
  { id: 3, patient: 'Vikram Singh', medicine: 'Ciprofloxacin', time: '11:30 AM', status: 'pending' },
  { id: 4, patient: 'Meera Patel', medicine: 'Salbutamol', time: '1:00 PM', status: 'pending' },
  { id: 5, patient: 'Anita Desai', medicine: 'Levothyroxine', time: '2:00 PM', status: 'sent' },
];

export const mockPrescriptions = [
  {
    id: 1,
    patient: 'Priya Sharma',
    date: '2026-05-15',
    medicines: ['Amlodipine 5mg', 'Aspirin 75mg'],
    duration: '30 days',
    status: 'active',
  },
  {
    id: 2,
    patient: 'Rahul Verma',
    date: '2026-05-14',
    medicines: ['Metformin 500mg', 'Glimepiride 2mg'],
    duration: '60 days',
    status: 'active',
  },
  {
    id: 3,
    patient: 'Vikram Singh',
    date: '2026-05-10',
    medicines: ['Ciprofloxacin 500mg', 'Pantoprazole 40mg', 'Paracetamol 650mg'],
    duration: '14 days',
    status: 'active',
  },
];

export const mockTreatmentHistory = [
  {
    id: 1,
    doctor: 'Dr. Anil Kumar',
    date: '2026-05-01',
    condition: 'Upper Respiratory Infection',
    medicines: ['Amoxicillin 500mg', 'Cetirizine 10mg'],
    completed: true,
    adherence: 95,
  },
  {
    id: 2,
    doctor: 'Dr. Anil Kumar',
    date: '2026-04-15',
    condition: 'Vitamin Deficiency',
    medicines: ['Vitamin D3 1000IU', 'Calcium 500mg'],
    completed: true,
    adherence: 88,
  },
  {
    id: 3,
    doctor: 'Dr. Sunita Rao',
    date: '2026-03-20',
    condition: 'Seasonal Allergy',
    medicines: ['Montelukast 10mg', 'Fexofenadine 120mg'],
    completed: true,
    adherence: 100,
  },
];

export const mockAdherenceData = [
  { day: 'Mon', value: 85 },
  { day: 'Tue', value: 92 },
  { day: 'Wed', value: 78 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 88 },
  { day: 'Sat', value: 70 },
  { day: 'Sun', value: 90 },
];

export const doctorStats = {
  totalPatients: 156,
  activePrescriptions: 43,
  remindersSent: 892,
  adherenceRate: 84,
};

export const userStats = {
  streakDays: 7,
  totalDosesTaken: 42,
  completionRate: 88,
  rewardsEarned: 5,
};
