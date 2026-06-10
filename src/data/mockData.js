export const SPECIALTIES = [
  { id: 'cardiology', name: 'Cardiology', icon: 'HeartPulse', description: 'Heart & cardiovascular health' },
  { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles', description: 'Skin, hair & nail disorders' },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', description: 'Infant, child & teen medicine' },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone', description: 'Bone, joint & muscle care' },
  { id: 'neurology', name: 'Neurology', icon: 'Brain', description: 'Brain & nervous system disorders' },
  { id: 'gynecology', name: 'Gynecology', icon: 'Flower', description: 'Women\'s reproductive health' },
  { id: 'general', name: 'General Medicine', icon: 'Stethoscope', description: 'Primary care & diagnostics' },
  { id: 'dentistry', name: 'Dentistry', icon: 'Smile', description: 'Teeth & oral healthcare' }
];

export const LOCATIONS = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Francisco, CA'
];

export const HOSPITALS = [
  'Metro General Hospital',
  'Mount Sinai Medical Center',
  'St. Jude Wellness Clinic',
  'City Cardiology Institute',
  'Mayo Health Pavilion',
  'Johns Hopkins Clinic',
  'Grace Grace Community Hospital'
];

export const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    experience: 14,
    fee: 150,
    rating: 4.9,
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Metro General Hospital',
    location: 'New York, NY',
    shortDescription: 'Senior Cardiologist specializing in interventional cardiology and preventive heart care.',
    about: 'Dr. Sarah Jenkins is a board-certified cardiologist with over 14 years of experience. She completed her residency at Johns Hopkins and specializes in managing complex cardiovascular conditions, including coronary artery disease, heart failure, and hypertension. She is dedicated to combining cutting-edge treatment with compassionate patient care.',
    education: [
      'M.D. in Cardiovascular Medicine - Johns Hopkins University School of Medicine',
      'Residency in Internal Medicine - Harvard Medical School'
    ],
    certifications: [
      'Board Certified in Cardiovascular Disease - American Board of Internal Medicine',
      'Fellow of the American College of Cardiology (FACC)'
    ],
    languages: ['English', 'Spanish'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: {
      'Monday': ['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
      'Wednesday': ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM'],
      'Friday': ['09:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
    },
    reviews: [
      { id: 101, patientName: 'John Doe', rating: 5, date: '2026-05-12', comment: 'Dr. Jenkins was exceptionally thorough and answered all my questions regarding my blood pressure treatment.' },
      { id: 102, patientName: 'Emily Watson', rating: 4.8, date: '2026-05-28', comment: 'Very professional. The clinic staff was great, and the explanation of my ECG was crystal clear.' }
    ]
  },
  {
    id: 2,
    name: 'Dr. Marcus Vance',
    specialty: 'Dermatology',
    experience: 10,
    fee: 120,
    rating: 4.8,
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Mount Sinai Medical Center',
    location: 'Los Angeles, CA',
    shortDescription: 'Consultant Dermatologist focusing on skin oncology, cosmetic treatments, and acne management.',
    about: 'Dr. Marcus Vance is a renowned dermatologist known for his scientific approach to skin wellness. With a decade of experience, he treats clinical conditions like eczema, psoriasis, and skin cancer, as well as providing advanced cosmetic treatments. He believes in creating customized skincare plans tailored to each patient\'s lifestyle.',
    education: [
      'M.D. in Dermatology - Stanford University School of Medicine',
      'Fellowship in Cosmetic Dermatology - UCLA Medical Center'
    ],
    certifications: [
      'Certified by the American Board of Dermatology',
      'Member of the American Academy of Dermatology'
    ],
    languages: ['English', 'French'],
    availableDays: ['Tuesday', 'Thursday'],
    slots: {
      'Tuesday': ['09:30 AM', '11:00 AM', '02:30 PM', '04:30 PM'],
      'Thursday': ['10:00 AM', '11:00 AM', '01:30 PM', '03:00 PM', '05:00 PM']
    },
    reviews: [
      { id: 201, patientName: 'Michael Chang', rating: 5, date: '2026-05-15', comment: 'The treatment he prescribed for my severe eczema showed improvement in just 3 days! Outstanding.' },
      { id: 202, patientName: 'Alice Johnson', rating: 4.5, date: '2026-05-20', comment: 'Very knowledgeable doctor, though there was a slight wait in the clinic. Recommended.' }
    ]
  },
  {
    id: 3,
    name: 'Dr. Elena Rostova',
    specialty: 'Pediatrics',
    experience: 12,
    fee: 95,
    rating: 4.95,
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'St. Jude Wellness Clinic',
    location: 'Chicago, IL',
    shortDescription: 'Dedicated Pediatrician passionate about developmental health, immunizations, and child wellness.',
    about: 'Dr. Elena Rostova brings warmth and clinical excellence to pediatric care. She focuses on pediatric preventative medicine, growth tracking, and early childhood behavior. She understands that clinic visits can be scary for children and works hard to create a fun, relaxing environment.',
    education: [
      'M.D. - Northwestern University Feinberg School of Medicine',
      'Residency in Pediatrics - Ann & Robert H. Lurie Children\'s Hospital'
    ],
    certifications: [
      'Board Certified Pediatrician - American Board of Pediatrics'
    ],
    languages: ['English', 'Russian'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    slots: {
      'Monday': ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
      'Tuesday': ['02:00 PM', '03:00 PM', '04:00 PM'],
      'Thursday': ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
      'Friday': ['08:30 AM', '10:00 AM', '11:30 AM']
    },
    reviews: [
      { id: 301, patientName: 'David Miller', rating: 5, date: '2026-05-10', comment: 'My kids love Dr. Elena! She makes them feel at ease. Her clinical explanations are very helpful too.' },
      { id: 302, patientName: 'Samantha Green', rating: 5, date: '2026-05-24', comment: 'Absolutely wonderful. Helped us navigate our newborn\'s allergies with extreme patience.' }
    ]
  },
  {
    id: 4,
    name: 'Dr. Robert Chen',
    specialty: 'Orthopedics',
    experience: 16,
    fee: 140,
    rating: 4.75,
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Grace Community Hospital',
    location: 'Houston, TX',
    shortDescription: 'Expert Orthopedic Surgeon specializing in sports medicine, joint replacements, and fracture care.',
    about: 'Dr. Robert Chen is a leading expert in orthopedic health and joint replacement surgery. He has worked with collegiate athletes and active individuals, specializing in arthroscopic surgery of the shoulder, knee, and hip. His goal is to restore mobility and help patients return to the activities they love.',
    education: [
      'M.D. - Columbia University Vagelos College of Physicians and Surgeons',
      'Residency in Orthopaedic Surgery - NYU Langone Medical Center'
    ],
    certifications: [
      'Certified by the American Board of Orthopaedic Surgery',
      'Fellow of the American Academy of Orthopaedic Surgeons (AAOS)'
    ],
    languages: ['English', 'Mandarin'],
    availableDays: ['Wednesday', 'Thursday'],
    slots: {
      'Wednesday': ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
      'Thursday': ['11:00 AM', '01:00 PM', '03:00 PM', '04:30 PM']
    },
    reviews: [
      { id: 401, patientName: 'Tyler B.', rating: 4.8, date: '2026-05-02', comment: 'Successful knee surgery and great follow-up care. Dr. Chen is direct, clear, and highly skilled.' },
      { id: 402, patientName: 'Martha Stewart', rating: 4.7, date: '2026-05-18', comment: 'Helped resolve my chronic hip pain. Highly professional doctor.' }
    ]
  },
  {
    id: 5,
    name: 'Dr. Sophia Al-Fayed',
    specialty: 'Neurology',
    experience: 18,
    fee: 180,
    rating: 4.92,
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Johns Hopkins Clinic',
    location: 'San Francisco, CA',
    shortDescription: 'Senior Neurologist expert in migraine therapy, sleep disorders, and stroke prevention.',
    about: 'Dr. Sophia Al-Fayed is an internationally recognized neurologist. Her clinical research focuses on modern therapies for chronic headaches, neuropathic pain, and epilepsy. She takes a holistic approach to neurological health, integrating lifestyle modifications with advanced clinical pharmacology.',
    education: [
      'M.D. - University of California, San Francisco (UCSF)',
      'Fellowship in Neurophysiology - Yale School of Medicine'
    ],
    certifications: [
      'Board Certified in Neurology - American Board of Psychiatry and Neurology'
    ],
    languages: ['English', 'Arabic', 'French'],
    availableDays: ['Tuesday', 'Friday'],
    slots: {
      'Tuesday': ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      'Friday': ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']
    },
    reviews: [
      { id: 501, patientName: 'Kenji Sato', rating: 5, date: '2026-05-11', comment: 'Dr. Al-Fayed resolved my chronic migraines that other doctors couldn\'t fix. Highly recommended!' },
      { id: 502, patientName: 'Sophia Loren', rating: 4.8, date: '2026-05-22', comment: 'Very attentive. Took the time to explain the neurology of my sleep issues.' }
    ]
  },
  {
    id: 6,
    name: 'Dr. James Mitchell',
    specialty: 'General Medicine',
    experience: 8,
    fee: 70,
    rating: 4.7,
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f0471?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Mayo Health Pavilion',
    location: 'Phoenix, AZ',
    shortDescription: 'Friendly Family Physician focusing on preventive care, annual physicals, and wellness counseling.',
    about: 'Dr. James Mitchell specializes in comprehensive healthcare for individuals of all ages. He is a strong advocate for preventative screenings, nutritional counseling, and mental wellness as keys to a healthy lifestyle. He enjoys building long-term partnerships with patients.',
    education: [
      'M.D. - University of Arizona College of Medicine',
      'Residency in Family Medicine - Banner University Medical Center'
    ],
    certifications: [
      'Board Certified in Family Medicine - American Board of Family Medicine'
    ],
    languages: ['English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: {
      'Monday': ['08:00 AM', '11:00 AM', '02:00 PM'],
      'Tuesday': ['09:00 AM', '10:30 AM', '03:00 PM'],
      'Wednesday': ['08:30 AM', '11:30 AM', '04:00 PM'],
      'Thursday': ['09:00 AM', '01:30 PM', '03:30 PM'],
      'Friday': ['08:00 AM', '10:00 AM', '12:00 PM']
    },
    reviews: [
      { id: 601, patientName: 'Luke Cage', rating: 5, date: '2026-05-09', comment: 'Great GP! Excellent bedside manner, explained everything very clearly, and started my wellness plan.' },
      { id: 602, patientName: 'Jessica Jones', rating: 4.4, date: '2026-05-20', comment: 'Friendly and straightforward. Easy to talk to.' }
    ]
  },
  {
    id: 7,
    name: 'Dr. Linda Kovacs',
    specialty: 'Gynecology',
    experience: 15,
    fee: 130,
    rating: 4.88,
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1594824813727-463d1a4993f4?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'Johns Hopkins Clinic',
    location: 'Philadelphia, PA',
    shortDescription: 'Compassionate Gynecologist specialized in prenatal care, minimally invasive surgeries, and menopause.',
    about: 'Dr. Linda Kovacs is dedicated to guiding women through every stage of life. She offers services ranging from routine annual exams and birth control counseling to prenatal management, high-risk pregnancy monitoring, and menopause therapy. She uses minimally invasive surgical techniques.',
    education: [
      'M.D. - University of Pennsylvania School of Medicine',
      'Residency in Obstetrics and Gynecology - Penn Medicine Hospital'
    ],
    certifications: [
      'Board Certified in Obstetrics and Gynecology - American Board of OBGYN'
    ],
    languages: ['English', 'Hungarian'],
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    slots: {
      'Monday': ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
      'Wednesday': ['10:00 AM', '12:00 PM', '01:30 PM', '04:00 PM'],
      'Thursday': ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM']
    },
    reviews: [
      { id: 701, patientName: 'Maria G.', rating: 5, date: '2026-05-18', comment: 'Dr. Kovacs delivered my first baby and was absolutely amazing throughout the pregnancy. Extremely supportive!' },
      { id: 702, patientName: 'Hannah Abbott', rating: 4.7, date: '2026-05-29', comment: 'Kind and professional. Checked all my vitals and took the time to answer all questions.' }
    ]
  },
  {
    id: 8,
    name: 'Dr. Alistair Sterling',
    specialty: 'Dentistry',
    experience: 11,
    fee: 85,
    rating: 4.82,
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    hospital: 'St. Jude Wellness Clinic',
    location: 'Chicago, IL',
    shortDescription: 'Aesthetic and Restorative Dentist focusing on root canals, crowns, and smile designs.',
    about: 'Dr. Alistair Sterling believes that a healthy smile can transform a person\'s confidence. Specializing in advanced cosmetic and reconstructive dentistry, he offers crowns, veneers, root canals, and teeth whitening. He leverages digital dentistry for precise, pain-free treatments.',
    education: [
      'D.D.S. (Doctor of Dental Surgery) - University of Michigan School of Dentistry',
      'Advanced Training in Prosthodontics - Boston University'
    ],
    certifications: [
      'Certified by the American Board of General Dentistry',
      'Member of the American Dental Association'
    ],
    languages: ['English'],
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    slots: {
      'Tuesday': ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
      'Wednesday': ['09:00 AM', '10:00 AM', '01:30 PM', '02:30 PM', '04:00 PM'],
      'Friday': ['08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:00 PM']
    },
    reviews: [
      { id: 801, patientName: 'Richard Mason', rating: 5, date: '2026-05-04', comment: 'Clean office, modern tech, and Dr. Sterling was gentle and fast with my root canal. No pain at all!' },
      { id: 802, patientName: 'Sarah Connor', rating: 4.6, date: '2026-05-19', comment: 'Very careful and thorough cleaning. Good explanations of dental health.' }
    ]
  }
];

export const MOCK_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 019-2834',
  age: 32,
  gender: 'Male',
  bloodGroup: 'O+',
  address: '123 Health Ave, New York, NY 10001',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
  prescriptions: [
    { id: 301, doctorName: 'Dr. Sarah Jenkins', specialty: 'Cardiology', date: '2026-05-12', medicine: 'Ramipril 5mg', dosage: 'Once daily in the morning', duration: '30 Days' },
    { id: 302, doctorName: 'Dr. Marcus Vance', specialty: 'Dermatology', date: '2026-05-15', medicine: 'Hydrocortisone 1% Cream', dosage: 'Apply twice daily to affected area', duration: '14 Days' }
  ],
  appointments: [
    {
      id: 5001,
      doctorId: 1,
      doctorName: 'Dr. Sarah Jenkins',
      doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
      specialty: 'Cardiology',
      date: '2026-06-15',
      time: '10:30 AM',
      hospital: 'Metro General Hospital',
      patientName: 'John Doe',
      patientPhone: '+1 (555) 019-2834',
      patientAge: 32,
      reason: 'Routine cardiac check-up & BP check',
      fee: 150,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-90283419082'
    },
    {
      id: 5002,
      doctorId: 2,
      doctorName: 'Dr. Marcus Vance',
      doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
      specialty: 'Dermatology',
      date: '2026-05-15',
      time: '11:00 AM',
      hospital: 'Mount Sinai Medical Center',
      patientName: 'John Doe',
      patientPhone: '+1 (555) 019-2834',
      patientAge: 32,
      reason: 'Eczema flare up checkup',
      fee: 120,
      status: 'Completed',
      paymentStatus: 'Paid',
      paymentMethod: 'UPI',
      transactionId: 'TXN-10293810928'
    }
  ]
};

export const MOCK_ADMIN = {
  name: 'Admin Director',
  email: 'admin@healthcare.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
};
