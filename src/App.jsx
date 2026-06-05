import { useState, useMemo, useEffect } from "react";

// --- CONSTANTS & CONFIGURATION ---
const BRANCHES = [
  { key: "CSE",   label: "Computer Science (CSE)",       icon: "💻" },
  { key: "IT",    label: "Information Technology (IT)",  icon: "🌐" },
  { key: "AIDS",  label: "AI & Data Science (AIDS)",      icon: "🤖" },
  { key: "ENTC",  label: "Electronics & Telecom (ENTC)", icon: "📡" },
  { key: "EE",    label: "Electrical Engineering (EE)",   icon: "⚡" },
  { key: "MECH",  label: "Mechanical Engineering (ME)",  icon: "⚙️" },
  { key: "CIVIL", label: "Civil Engineering (CE)",       icon: "🏗️" },
  { key: "CHEM",  label: "Chemical Engineering (CHEM)",   icon: "🧪" },
];

const CATEGORIES  = ["Open", "OBC", "SC", "ST", "NT-B", "NT-C", "NT-D", "VJ", "EWS", "TFWS"];
const CAT_OFFSET  = { Open: 0, OBC: 3, SC: 8, ST: 12, "NT-B": 5, "NT-C": 5, "NT-D": 5, VJ: 6, EWS: 2, TFWS: 1 };

const DISTRICTS   = [
  "All", "Pune", "Mumbai", "Thane", "Nagpur", "Nashik", "Chhatrapati Sambhajinagar", 
  "Kolhapur", "Sangli", "Satara", "Solapur", "Amravati", "Nanded", "Jalgaon", 
  "Latur", "Akola", "Yavatmal", "Buldhana", "Dhule", "Dharashiv", "Chandrapur", "Raigad", "Wardha", "Ahmednagar"
];

const TYPES       = ["All", "Government", "Government-Aided", "Private"];
const TIERS       = ["All", "Tier 1", "Tier 2", "Tier 3"];

const UNIVS       = [
  "All", 
  "Savitribai Phule Pune University", 
  "Mumbai University", 
  "Rashtrasant Tukadoji Maharaj Nagpur University", 
  "Dr. Babasaheb Ambedkar Technological University", 
  "Dr. Babasaheb Ambedkar Marathwada University", 
  "Sant Gadge Baba Amravati University", 
  "Swami Ramanand Teerth Marathwada University", 
  "Kavayitri Bahinabai Chaudhari North Maharashtra University", 
  "Shivaji University"
];

// --- ENRICHED DATASET ---
const COLLEGES = [
  {
    "id": "06006",
    "code": "06006",
    "name": "COEP Technological University",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Government",
    "autonomous": true,
    "naac": "A++",
    "intake": 660,
    "fees": 45000,
    "mqFees": null,
    "capSeats": 660,
    "mqSeats": 0,
    "placement": 95,
    "avgPkg": 18,
    "rank": 1,
    "cutoffs": {
      "CSE": 99.8,
      "IT": 99.5,
      "ENTC": 99.6,
      "MECH": 99.2,
      "EE": 99,
      "CIVIL": 98.8,
      "AIDS": 99.7,
      "CHEM": 97.5
    }
  },
  {
    "id": "03012",
    "code": "03012",
    "name": "VJTI Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Government-Aided",
    "autonomous": true,
    "naac": "A+",
    "intake": 540,
    "fees": 55000,
    "mqFees": null,
    "capSeats": 540,
    "mqSeats": 0,
    "placement": 93,
    "avgPkg": 17,
    "rank": 2,
    "cutoffs": {
      "CSE": 99.7,
      "IT": 99.4,
      "ENTC": 99.5,
      "MECH": 99,
      "EE": 98.9,
      "CIVIL": 98.5,
      "AIDS": 99.6,
      "CHEM": 97
    }
  },
  {
    "id": "03215",
    "code": "03215",
    "name": "SPIT Mumbai (Sardar Patel)",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 696,
    "fees": 40000,
    "mqFees": 88000,
    "capSeats": 557,
    "mqSeats": 139,
    "placement": 90,
    "avgPkg": 14,
    "rank": 3,
    "cutoffs": {
      "CSE": 99.5,
      "IT": 99.2,
      "ENTC": 99,
      "MECH": 98.5,
      "EE": 98,
      "CIVIL": 97.5,
      "AIDS": 99.3,
      "CHEM": 96
    }
  },
  {
    "id": "03036",
    "code": "03036",
    "name": "ICT Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Government",
    "autonomous": true,
    "naac": "A+",
    "intake": 209,
    "fees": 60000,
    "mqFees": null,
    "capSeats": 209,
    "mqSeats": 0,
    "placement": 91,
    "avgPkg": 13,
    "rank": 4,
    "cutoffs": {
      "CSE": 99.2,
      "IT": 98.8,
      "ENTC": 98.5,
      "MECH": 98,
      "EE": 97.8,
      "CIVIL": 97,
      "AIDS": 99,
      "CHEM": 99.5
    }
  },
  {
    "id": "06271",
    "code": "06271",
    "name": "PICT Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 780,
    "fees": 120000,
    "mqFees": 350000,
    "capSeats": 624,
    "mqSeats": 156,
    "placement": 88,
    "avgPkg": 13,
    "rank": 5,
    "cutoffs": {
      "CSE": 99.3,
      "IT": 99,
      "ENTC": 98.5,
      "MECH": 97.5,
      "EE": 97.5,
      "CIVIL": 96.5,
      "AIDS": 99.1,
      "CHEM": 95
    }
  },
  {
    "id": "06100",
    "code": "06100",
    "name": "MIT-WPU Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A+",
    "intake": 180,
    "fees": 200000,
    "mqFees": 500000,
    "capSeats": 144,
    "mqSeats": 36,
    "placement": 87,
    "avgPkg": 12,
    "rank": 6,
    "cutoffs": {
      "CSE": 97.5,
      "IT": 97,
      "ENTC": 96.5,
      "MECH": 95.5,
      "EE": 95.5,
      "CIVIL": 94,
      "AIDS": 97.2,
      "CHEM": 93
    }
  },
  {
    "id": "06101",
    "code": "06101",
    "name": "Symbiosis Institute of Tech (SIT)",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 180,
    "fees": 250000,
    "mqFees": 600000,
    "capSeats": 144,
    "mqSeats": 36,
    "placement": 89,
    "avgPkg": 13,
    "rank": 7,
    "cutoffs": {
      "CSE": 95.5,
      "IT": 95,
      "ENTC": 94.5,
      "MECH": 93.5,
      "EE": 93.5,
      "CIVIL": 92,
      "AIDS": 95.2,
      "CHEM": 91
    }
  },
  {
    "id": "03102",
    "code": "03102",
    "name": "KJ Somaiya COE Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 120,
    "fees": 115000,
    "mqFees": 320000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 83,
    "avgPkg": 11,
    "rank": 8,
    "cutoffs": {
      "CSE": 98.2,
      "IT": 97.8,
      "ENTC": 97.2,
      "MECH": 96,
      "EE": 96,
      "CIVIL": 95,
      "AIDS": 97.9,
      "CHEM": 93.5
    }
  },
  {
    "id": "03103",
    "code": "03103",
    "name": "RAIT Navi Mumbai",
    "city": "Navi Mumbai",
    "district": "Thane",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 110000,
    "mqFees": 300000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 85,
    "avgPkg": 12,
    "rank": 9,
    "cutoffs": {
      "CSE": 98.8,
      "IT": 98.5,
      "ENTC": 98,
      "MECH": 97,
      "EE": 97,
      "CIVIL": 96,
      "AIDS": 98.6,
      "CHEM": 94
    }
  },
  {
    "id": "06007",
    "code": "06007",
    "name": "Walchand College of Engg Sangli",
    "city": "Sangli",
    "district": "Sangli",
    "univ": "Savitribai Phule Pune University",
    "type": "Government-Aided",
    "autonomous": true,
    "naac": "A",
    "intake": 660,
    "fees": 50000,
    "mqFees": null,
    "capSeats": 660,
    "mqSeats": 0,
    "placement": 76,
    "avgPkg": 8,
    "rank": 10,
    "cutoffs": {
      "CSE": 93,
      "IT": 92.5,
      "ENTC": 92,
      "MECH": 91,
      "EE": 91,
      "CIVIL": 89.5,
      "AIDS": 92.8,
      "CHEM": 88
    }
  },
  {
    "id": "05104",
    "code": "05104",
    "name": "GCOE Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Government",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 40000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 80,
    "avgPkg": 9,
    "rank": 11,
    "cutoffs": {
      "CSE": 97,
      "IT": 96.5,
      "ENTC": 96,
      "MECH": 95,
      "EE": 95,
      "CIVIL": 93.5,
      "AIDS": 96.8,
      "CHEM": 92
    }
  },
  {
    "id": "01002",
    "code": "01002",
    "name": "GCOE Amravati",
    "city": "Amravati",
    "district": "Amravati",
    "univ": "Sant Gadge Baba Amravati University",
    "type": "Government",
    "autonomous": true,
    "naac": "B+",
    "intake": 390,
    "fees": 38000,
    "mqFees": null,
    "capSeats": 390,
    "mqSeats": 0,
    "placement": 75,
    "avgPkg": 7,
    "rank": 12,
    "cutoffs": {
      "CSE": 96.5,
      "IT": 96,
      "ENTC": 95.5,
      "MECH": 94.5,
      "EE": 94.5,
      "CIVIL": 93,
      "AIDS": 96.2,
      "CHEM": 91
    }
  },
  {
    "id": "02020",
    "code": "02020",
    "name": "SGGSIE Nanded",
    "city": "Nanded",
    "district": "Nanded",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Government-Aided",
    "autonomous": true,
    "naac": "A",
    "intake": 610,
    "fees": 42000,
    "mqFees": null,
    "capSeats": 610,
    "mqSeats": 0,
    "placement": 78,
    "avgPkg": 8,
    "rank": 13,
    "cutoffs": {
      "CSE": 96,
      "IT": 95.5,
      "ENTC": 95,
      "MECH": 94,
      "EE": 94,
      "CIVIL": 92.5,
      "AIDS": 95.8,
      "CHEM": 90.5
    }
  },
  {
    "id": "06105",
    "code": "06105",
    "name": "GCOE Karad",
    "city": "Karad",
    "district": "Satara",
    "univ": "Savitribai Phule Pune University",
    "type": "Government",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 38000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 65,
    "avgPkg": 6,
    "rank": 14,
    "cutoffs": {
      "CSE": 89,
      "IT": 88.5,
      "ENTC": 88,
      "MECH": 87,
      "EE": 87,
      "CIVIL": 85.5,
      "AIDS": 88.8,
      "CHEM": 84
    }
  },
  {
    "id": "06276",
    "code": "06276",
    "name": "Cummins College of Engg Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 600,
    "fees": 140000,
    "mqFees": 380000,
    "capSeats": 480,
    "mqSeats": 120,
    "placement": 80,
    "avgPkg": 9,
    "rank": 15,
    "cutoffs": {
      "CSE": 94.5,
      "IT": 94,
      "ENTC": 93.5,
      "MECH": 92.5,
      "EE": 92.5,
      "CIVIL": 91,
      "AIDS": 94.2,
      "CHEM": 89
    }
  },
  {
    "id": "06106",
    "code": "06106",
    "name": "Army Institute of Technology Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 60,
    "fees": 105000,
    "mqFees": 231000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 85,
    "avgPkg": 12,
    "rank": 16,
    "cutoffs": {
      "CSE": 96.5,
      "IT": 96,
      "ENTC": 95.5,
      "MECH": 94.5,
      "EE": 94.5,
      "CIVIL": 93,
      "AIDS": 96.2,
      "CHEM": 91
    }
  },
  {
    "id": "06107",
    "code": "06107",
    "name": "Bharati Vidyapeeth COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 120,
    "fees": 125000,
    "mqFees": 345000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 76,
    "avgPkg": 9,
    "rank": 17,
    "cutoffs": {
      "CSE": 92,
      "IT": 91.5,
      "ENTC": 91,
      "MECH": 90,
      "EE": 90,
      "CIVIL": 88.5,
      "AIDS": 91.8,
      "CHEM": 87
    }
  },
  {
    "id": "06108",
    "code": "06108",
    "name": "PVG's COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 52000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 72,
    "avgPkg": 7,
    "rank": 18,
    "cutoffs": {
      "CSE": 91.5,
      "IT": 91,
      "ENTC": 90.5,
      "MECH": 89.5,
      "EE": 89.5,
      "CIVIL": 88,
      "AIDS": 91.2,
      "CHEM": 86.5
    }
  },
  {
    "id": "06109",
    "code": "06109",
    "name": "DYPCOE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 130000,
    "mqFees": 360000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 84,
    "avgPkg": 11,
    "rank": 19,
    "cutoffs": {
      "CSE": 98.5,
      "IT": 98,
      "ENTC": 97.5,
      "MECH": 96.5,
      "EE": 96.5,
      "CIVIL": 95.5,
      "AIDS": 98.2,
      "CHEM": 93.5
    }
  },
  {
    "id": "06273",
    "code": "06273",
    "name": "VIT Pune (Vishwakarma)",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 1200,
    "fees": 145000,
    "mqFees": 390000,
    "capSeats": 960,
    "mqSeats": 240,
    "placement": 82,
    "avgPkg": 10,
    "rank": 20,
    "cutoffs": {
      "CSE": 95,
      "IT": 94.5,
      "ENTC": 94,
      "MECH": 93,
      "EE": 93,
      "CIVIL": 91.5,
      "AIDS": 94.8,
      "CHEM": 90
    }
  },
  {
    "id": "06110",
    "code": "06110",
    "name": "PCCOE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 120000,
    "mqFees": 340000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 78,
    "avgPkg": 9,
    "rank": 21,
    "cutoffs": {
      "CSE": 93.5,
      "IT": 93,
      "ENTC": 92.5,
      "MECH": 91.5,
      "EE": 91.5,
      "CIVIL": 90,
      "AIDS": 93.2,
      "CHEM": 88
    }
  },
  {
    "id": "06111",
    "code": "06111",
    "name": "MAEER's MIT College of Engg Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 180,
    "fees": 155000,
    "mqFees": 420000,
    "capSeats": 144,
    "mqSeats": 36,
    "placement": 80,
    "avgPkg": 10,
    "rank": 22,
    "cutoffs": {
      "CSE": 94,
      "IT": 93.5,
      "ENTC": 93,
      "MECH": 92,
      "EE": 92,
      "CIVIL": 90.5,
      "AIDS": 93.8,
      "CHEM": 89
    }
  },
  {
    "id": "06112",
    "code": "06112",
    "name": "AISSMS COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 110000,
    "mqFees": 305000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 70,
    "avgPkg": 7,
    "rank": 23,
    "cutoffs": {
      "CSE": 91,
      "IT": 90.5,
      "ENTC": 90,
      "MECH": 89,
      "EE": 89,
      "CIVIL": 87.5,
      "AIDS": 90.8,
      "CHEM": 86
    }
  },
  {
    "id": "06113",
    "code": "06113",
    "name": "Sinhgad COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 97000,
    "mqFees": 278000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 69,
    "avgPkg": 7,
    "rank": 24,
    "cutoffs": {
      "CSE": 88.5,
      "IT": 88,
      "ENTC": 87.5,
      "MECH": 86.5,
      "EE": 86.5,
      "CIVIL": 85,
      "AIDS": 88.2,
      "CHEM": 83.5
    }
  },
  {
    "id": "06114",
    "code": "06114",
    "name": "SITS Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 100000,
    "mqFees": 290000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 72,
    "avgPkg": 7,
    "rank": 25,
    "cutoffs": {
      "CSE": 90,
      "IT": 89.5,
      "ENTC": 89,
      "MECH": 88,
      "EE": 88,
      "CIVIL": 86.5,
      "AIDS": 89.8,
      "CHEM": 85
    }
  },
  {
    "id": "06115",
    "code": "06115",
    "name": "JSPM RSCOE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 280000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 70,
    "avgPkg": 7,
    "rank": 26,
    "cutoffs": {
      "CSE": 89,
      "IT": 88.5,
      "ENTC": 88,
      "MECH": 87,
      "EE": 87,
      "CIVIL": 85.5,
      "AIDS": 88.8,
      "CHEM": 84
    }
  },
  {
    "id": "06116",
    "code": "06116",
    "name": "Indira COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 95000,
    "mqFees": 275000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 27,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "06117",
    "code": "06117",
    "name": "NBN Sinhgad SOE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 120,
    "fees": 92000,
    "mqFees": 265000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 65,
    "avgPkg": 6,
    "rank": 28,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "06118",
    "code": "06118",
    "name": "Genba Sopanrao Moze COE",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 90000,
    "mqFees": 260000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 63,
    "avgPkg": 6,
    "rank": 29,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "06119",
    "code": "06119",
    "name": "Zeal COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 85000,
    "mqFees": 245000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 6,
    "rank": 30,
    "cutoffs": {
      "CSE": 83,
      "IT": 82.5,
      "ENTC": 82,
      "MECH": 81,
      "EE": 81,
      "CIVIL": 79.5,
      "AIDS": 82.8,
      "CHEM": 78
    }
  },
  {
    "id": "06120",
    "code": "06120",
    "name": "VPCOE Baramati",
    "city": "Baramati",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 88000,
    "mqFees": 255000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 66,
    "avgPkg": 6,
    "rank": 31,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "06121",
    "code": "06121",
    "name": "Vidya Pratishthan's COE Baramati",
    "city": "Baramati",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 87000,
    "mqFees": 248000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 62,
    "avgPkg": 6,
    "rank": 32,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "03182",
    "code": "03182",
    "name": "TSEC Mumbai (Thadomal Shahani)",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "A",
    "intake": 540,
    "fees": 42000,
    "mqFees": 92400,
    "capSeats": 432,
    "mqSeats": 108,
    "placement": 82,
    "avgPkg": 10,
    "rank": 33,
    "cutoffs": {
      "CSE": 98,
      "IT": 97.6,
      "ENTC": 97,
      "MECH": 95.8,
      "EE": 95.8,
      "CIVIL": 94.8,
      "AIDS": 97.7,
      "CHEM": 93
    }
  },
  {
    "id": "03199",
    "code": "03199",
    "name": "DJSCE Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 1140,
    "fees": 40000,
    "mqFees": 88000,
    "capSeats": 912,
    "mqSeats": 228,
    "placement": 81,
    "avgPkg": 10,
    "rank": 34,
    "cutoffs": {
      "CSE": 97.8,
      "IT": 97.4,
      "ENTC": 96.8,
      "MECH": 95.6,
      "EE": 95.6,
      "CIVIL": 94.6,
      "AIDS": 97.5,
      "CHEM": 92.8
    }
  },
  {
    "id": "03122",
    "code": "03122",
    "name": "VESIT Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 41000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 80,
    "avgPkg": 10,
    "rank": 35,
    "cutoffs": {
      "CSE": 97.6,
      "IT": 97.2,
      "ENTC": 96.6,
      "MECH": 95.4,
      "EE": 95.4,
      "CIVIL": 94.4,
      "AIDS": 97.3,
      "CHEM": 92.6
    }
  },
  {
    "id": "03123",
    "code": "03123",
    "name": "Shah & Anchor Kutchhi COE",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 39000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 78,
    "avgPkg": 9,
    "rank": 36,
    "cutoffs": {
      "CSE": 97.2,
      "IT": 96.8,
      "ENTC": 96.2,
      "MECH": 95,
      "EE": 95,
      "CIVIL": 94,
      "AIDS": 96.9,
      "CHEM": 92.2
    }
  },
  {
    "id": "03124",
    "code": "03124",
    "name": "Fr. CRCE Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 38000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 79,
    "avgPkg": 9,
    "rank": 37,
    "cutoffs": {
      "CSE": 96.8,
      "IT": 96.4,
      "ENTC": 95.8,
      "MECH": 94.6,
      "EE": 94.6,
      "CIVIL": 93.6,
      "AIDS": 96.5,
      "CHEM": 92
    }
  },
  {
    "id": "03139",
    "code": "03139",
    "name": "Vidyalankar Inst. of Tech Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": true,
    "naac": "B+",
    "intake": 660,
    "fees": 105000,
    "mqFees": 295000,
    "capSeats": 528,
    "mqSeats": 132,
    "placement": 71,
    "avgPkg": 8,
    "rank": 38,
    "cutoffs": {
      "CSE": 91.5,
      "IT": 91,
      "ENTC": 90.5,
      "MECH": 89.5,
      "EE": 89.5,
      "CIVIL": 88,
      "AIDS": 91.2,
      "CHEM": 86.5
    }
  },
  {
    "id": "03125",
    "code": "03125",
    "name": "SAKEC Mumbai",
    "city": "Mumbai",
    "district": "Mumbai",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 95000,
    "mqFees": 275000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 72,
    "avgPkg": 8,
    "rank": 39,
    "cutoffs": {
      "CSE": 92,
      "IT": 91.5,
      "ENTC": 91,
      "MECH": 90,
      "EE": 90,
      "CIVIL": 88.5,
      "AIDS": 91.8,
      "CHEM": 87
    }
  },
  {
    "id": "03126",
    "code": "03126",
    "name": "PCCE Navi Mumbai",
    "city": "Navi Mumbai",
    "district": "Thane",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 285000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 74,
    "avgPkg": 8,
    "rank": 40,
    "cutoffs": {
      "CSE": 93,
      "IT": 92.5,
      "ENTC": 92,
      "MECH": 91,
      "EE": 91,
      "CIVIL": 89.5,
      "AIDS": 92.8,
      "CHEM": 88
    }
  },
  {
    "id": "03127",
    "code": "03127",
    "name": "LTCOE Navi Mumbai",
    "city": "Navi Mumbai",
    "district": "Thane",
    "univ": "Mumbai University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 36000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 74,
    "avgPkg": 8,
    "rank": 41,
    "cutoffs": {
      "CSE": 94,
      "IT": 93.5,
      "ENTC": 93,
      "MECH": 92,
      "EE": 92,
      "CIVIL": 90.5,
      "AIDS": 93.8,
      "CHEM": 89
    }
  },
  {
    "id": "03128",
    "code": "03128",
    "name": "MGMCET Navi Mumbai",
    "city": "Navi Mumbai",
    "district": "Thane",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 102000,
    "mqFees": 290000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 70,
    "avgPkg": 7,
    "rank": 42,
    "cutoffs": {
      "CSE": 90,
      "IT": 89.5,
      "ENTC": 89,
      "MECH": 88,
      "EE": 88,
      "CIVIL": 86.5,
      "AIDS": 89.8,
      "CHEM": 85
    }
  },
  {
    "id": "03129",
    "code": "03129",
    "name": "PHCET Rasayani",
    "city": "Rasayani",
    "district": "Raigad",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 92000,
    "mqFees": 262000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 65,
    "avgPkg": 6,
    "rank": 43,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "03130",
    "code": "03130",
    "name": "Pillai's HOC COE Rasayani",
    "city": "Rasayani",
    "district": "Raigad",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 95000,
    "mqFees": 270000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 44,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "05131",
    "code": "05131",
    "name": "MET's IOE Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 280000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 45,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "05121",
    "code": "05121",
    "name": "K.K. Wagh COE Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 1080,
    "fees": 110000,
    "mqFees": 310000,
    "capSeats": 864,
    "mqSeats": 216,
    "placement": 74,
    "avgPkg": 8,
    "rank": 46,
    "cutoffs": {
      "CSE": 92,
      "IT": 91.5,
      "ENTC": 91,
      "MECH": 90,
      "EE": 90,
      "CIVIL": 88.5,
      "AIDS": 91.8,
      "CHEM": 87
    }
  },
  {
    "id": "05132",
    "code": "05132",
    "name": "Sandip Inst. of Tech Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 100000,
    "mqFees": 285000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 70,
    "avgPkg": 7,
    "rank": 47,
    "cutoffs": {
      "CSE": 89,
      "IT": 88.5,
      "ENTC": 88,
      "MECH": 87,
      "EE": 87,
      "CIVIL": 85.5,
      "AIDS": 88.8,
      "CHEM": 84
    }
  },
  {
    "id": "05133",
    "code": "05133",
    "name": "Amrutvahini COE Sangamner",
    "city": "Sangamner",
    "district": "Ahmednagar",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 88000,
    "mqFees": 255000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 65,
    "avgPkg": 6,
    "rank": 48,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "05134",
    "code": "05134",
    "name": "Pravara Rural COE Loni",
    "city": "Loni",
    "district": "Ahmednagar",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 63,
    "avgPkg": 6,
    "rank": 49,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "02008",
    "code": "02008",
    "name": "GCE Aurangabad",
    "city": "Aurangabad",
    "district": "Chhatrapati Sambhajinagar",
    "univ": "Dr. Babasaheb Ambedkar Marathwada University",
    "type": "Government",
    "autonomous": true,
    "naac": "B+",
    "intake": 360,
    "fees": 40000,
    "mqFees": null,
    "capSeats": 360,
    "mqSeats": 0,
    "placement": 72,
    "avgPkg": 7,
    "rank": 50,
    "cutoffs": {
      "CSE": 91,
      "IT": 90.5,
      "ENTC": 90,
      "MECH": 89,
      "EE": 89,
      "CIVIL": 87.5,
      "AIDS": 90.8,
      "CHEM": 86
    }
  },
  {
    "id": "02135",
    "code": "02135",
    "name": "MGM COE Aurangabad",
    "city": "Aurangabad",
    "district": "Chhatrapati Sambhajinagar",
    "univ": "Dr. Babasaheb Ambedkar Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 105000,
    "mqFees": 295000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 51,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "02136",
    "code": "02136",
    "name": "Deogiri Inst. of Engg Aurangabad",
    "city": "Aurangabad",
    "district": "Chhatrapati Sambhajinagar",
    "univ": "Dr. Babasaheb Ambedkar Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 278000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 66,
    "avgPkg": 6,
    "rank": 52,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "02137",
    "code": "02137",
    "name": "AURICCOE Aurangabad",
    "city": "Aurangabad",
    "district": "Chhatrapati Sambhajinagar",
    "univ": "Dr. Babasaheb Ambedkar Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 90000,
    "mqFees": 260000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 62,
    "avgPkg": 6,
    "rank": 53,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "02138",
    "code": "02138",
    "name": "Marathwada Inst. of Tech Aurangabad",
    "city": "Aurangabad",
    "district": "Chhatrapati Sambhajinagar",
    "univ": "Dr. Babasaheb Ambedkar Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 92000,
    "mqFees": 265000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 64,
    "avgPkg": 6,
    "rank": 54,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "04139",
    "code": "04139",
    "name": "YCCE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 48000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 76,
    "avgPkg": 8,
    "rank": 55,
    "cutoffs": {
      "CSE": 93,
      "IT": 92.5,
      "ENTC": 92,
      "MECH": 91,
      "EE": 91,
      "CIVIL": 89.5,
      "AIDS": 92.8,
      "CHEM": 88
    }
  },
  {
    "id": "04115",
    "code": "04115",
    "name": "Shri Ramdeobaba COE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": true,
    "naac": "A",
    "intake": 900,
    "fees": 50000,
    "mqFees": 110000,
    "capSeats": 720,
    "mqSeats": 180,
    "placement": 75,
    "avgPkg": 8,
    "rank": 56,
    "cutoffs": {
      "CSE": 92.5,
      "IT": 92,
      "ENTC": 91.5,
      "MECH": 90.5,
      "EE": 90.5,
      "CIVIL": 89,
      "AIDS": 92.2,
      "CHEM": 87.5
    }
  },
  {
    "id": "04140",
    "code": "04140",
    "name": "KITS Nagpur (Kavikulguru)",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 46000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 72,
    "avgPkg": 7,
    "rank": 57,
    "cutoffs": {
      "CSE": 91.5,
      "IT": 91,
      "ENTC": 90.5,
      "MECH": 89.5,
      "EE": 89.5,
      "CIVIL": 88,
      "AIDS": 91.2,
      "CHEM": 86.5
    }
  },
  {
    "id": "04116",
    "code": "04116",
    "name": "GHRCE Nagpur (G H Raisoni)",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": true,
    "naac": "B+",
    "intake": 1260,
    "fees": 105000,
    "mqFees": 295000,
    "capSeats": 1008,
    "mqSeats": 252,
    "placement": 68,
    "avgPkg": 6,
    "rank": 58,
    "cutoffs": {
      "CSE": 90,
      "IT": 89.5,
      "ENTC": 89,
      "MECH": 88,
      "EE": 88,
      "CIVIL": 86.5,
      "AIDS": 89.8,
      "CHEM": 85
    }
  },
  {
    "id": "04141",
    "code": "04141",
    "name": "PCE Nagpur (Priyadarshini)",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 278000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 66,
    "avgPkg": 6,
    "rank": 59,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "04142",
    "code": "04142",
    "name": "Rajiv Gandhi COE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 92000,
    "mqFees": 262000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 64,
    "avgPkg": 6,
    "rank": 60,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "04143",
    "code": "04143",
    "name": "LGNCE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 88000,
    "mqFees": 250000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 62,
    "avgPkg": 6,
    "rank": 61,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "04144",
    "code": "04144",
    "name": "DBACER Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 88000,
    "mqFees": 250000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 6,
    "rank": 62,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "04118",
    "code": "04118",
    "name": "BDCE Sewagram Wardha",
    "city": "Sewagram",
    "district": "Wardha",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 273,
    "fees": 95000,
    "mqFees": 270000,
    "capSeats": 218,
    "mqSeats": 55,
    "placement": 64,
    "avgPkg": 6,
    "rank": 63,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "06145",
    "code": "06145",
    "name": "KIT Kolhapur",
    "city": "Kolhapur",
    "district": "Kolhapur",
    "univ": "Shivaji University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 100000,
    "mqFees": 285000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 72,
    "avgPkg": 7,
    "rank": 64,
    "cutoffs": {
      "CSE": 92,
      "IT": 91.5,
      "ENTC": 91,
      "MECH": 90,
      "EE": 90,
      "CIVIL": 88.5,
      "AIDS": 91.8,
      "CHEM": 87
    }
  },
  {
    "id": "06146",
    "code": "06146",
    "name": "DKTEs Textile & Engg Ichalkaranji",
    "city": "Ichalkaranji",
    "district": "Kolhapur",
    "univ": "Shivaji University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 85000,
    "mqFees": 245000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 64,
    "avgPkg": 6,
    "rank": 65,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "06147",
    "code": "06147",
    "name": "TKIET Warananagar Kolhapur",
    "city": "Warananagar",
    "district": "Kolhapur",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 85000,
    "mqFees": 245000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 65,
    "avgPkg": 6,
    "rank": 66,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "06148",
    "code": "06148",
    "name": "Rajarambapu Inst. of Tech Islampur",
    "city": "Islampur",
    "district": "Sangli",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 95000,
    "mqFees": 270000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 67,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "06149",
    "code": "06149",
    "name": "Walchand Institute of Tech Solapur",
    "city": "Solapur",
    "district": "Solapur",
    "univ": "Savitribai Phule Pune University",
    "type": "Government-Aided",
    "autonomous": false,
    "naac": "A",
    "intake": 120,
    "fees": 48000,
    "mqFees": null,
    "capSeats": 120,
    "mqSeats": 0,
    "placement": 72,
    "avgPkg": 7,
    "rank": 68,
    "cutoffs": {
      "CSE": 91.5,
      "IT": 91,
      "ENTC": 90.5,
      "MECH": 89.5,
      "EE": 89.5,
      "CIVIL": 88,
      "AIDS": 91.2,
      "CHEM": 86.5
    }
  },
  {
    "id": "06150",
    "code": "06150",
    "name": "SVERI's COE Pandharpur",
    "city": "Pandharpur",
    "district": "Solapur",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 82000,
    "mqFees": 235000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 5,
    "rank": 69,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "02151",
    "code": "02151",
    "name": "PDMCE Latur",
    "city": "Latur",
    "district": "Latur",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 82000,
    "mqFees": 235000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 5,
    "rank": 70,
    "cutoffs": {
      "CSE": 83,
      "IT": 82.5,
      "ENTC": 82,
      "MECH": 81,
      "EE": 81,
      "CIVIL": 79.5,
      "AIDS": 82.8,
      "CHEM": 78
    }
  },
  {
    "id": "02152",
    "code": "02152",
    "name": "BLDEA's COE Vijayapur",
    "city": "Latur",
    "district": "Latur",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 88000,
    "mqFees": 250000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 64,
    "avgPkg": 6,
    "rank": 71,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "05153",
    "code": "05153",
    "name": "SSBT COET Jalgaon",
    "city": "Jalgaon",
    "district": "Jalgaon",
    "univ": "Kavayitri Bahinabai Chaudhari North Maharashtra University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 90000,
    "mqFees": 258000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 64,
    "avgPkg": 6,
    "rank": 72,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "05154",
    "code": "05154",
    "name": "NMU School of Engg Jalgaon",
    "city": "Jalgaon",
    "district": "Jalgaon",
    "univ": "Kavayitri Bahinabai Chaudhari North Maharashtra University",
    "type": "Government",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 40000,
    "mqFees": null,
    "capSeats": 60,
    "mqSeats": 0,
    "placement": 65,
    "avgPkg": 6,
    "rank": 73,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "05155",
    "code": "05155",
    "name": "RCPET Shirpur Dhule",
    "city": "Shirpur",
    "district": "Dhule",
    "univ": "Kavayitri Bahinabai Chaudhari North Maharashtra University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 82000,
    "mqFees": 235000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 5,
    "rank": 74,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "01105",
    "code": "01105",
    "name": "PRMIT&R Badnera Amravati",
    "city": "Amravati",
    "district": "Amravati",
    "univ": "Sant Gadge Baba Amravati University",
    "type": "Private",
    "autonomous": true,
    "naac": "B+",
    "intake": 900,
    "fees": 88000,
    "mqFees": 250000,
    "capSeats": 720,
    "mqSeats": 180,
    "placement": 62,
    "avgPkg": 6,
    "rank": 75,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "01156",
    "code": "01156",
    "name": "Sipna COE Amravati",
    "city": "Amravati",
    "district": "Amravati",
    "univ": "Sant Gadge Baba Amravati University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 60,
    "avgPkg": 6,
    "rank": 76,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "01157",
    "code": "01157",
    "name": "PRPCEM Amravati",
    "city": "Amravati",
    "district": "Amravati",
    "univ": "Sant Gadge Baba Amravati University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 80000,
    "mqFees": 228000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 58,
    "avgPkg": 5,
    "rank": 77,
    "cutoffs": {
      "CSE": 83,
      "IT": 82.5,
      "ENTC": 82,
      "MECH": 81,
      "EE": 81,
      "CIVIL": 79.5,
      "AIDS": 82.8,
      "CHEM": 78
    }
  },
  {
    "id": "01158",
    "code": "01158",
    "name": "Shankarlal Khandelwal COE Akola",
    "city": "Akola",
    "district": "Akola",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 6,
    "rank": 78,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "01159",
    "code": "01159",
    "name": "SSGMCE Shegaon",
    "city": "Shegaon",
    "district": "Buldhana",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 82000,
    "mqFees": 235000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 62,
    "avgPkg": 6,
    "rank": 79,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "01160",
    "code": "01160",
    "name": "PLIT Buldhana",
    "city": "Buldhana",
    "district": "Buldhana",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 78000,
    "mqFees": 222000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 56,
    "avgPkg": 5,
    "rank": 80,
    "cutoffs": {
      "CSE": 82,
      "IT": 81.5,
      "ENTC": 81,
      "MECH": 80,
      "EE": 80,
      "CIVIL": 78.5,
      "AIDS": 81.8,
      "CHEM": 77
    }
  },
  {
    "id": "01161",
    "code": "01161",
    "name": "PKIET Yavatmal",
    "city": "Yavatmal",
    "district": "Yavatmal",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 54,
    "avgPkg": 5,
    "rank": 81,
    "cutoffs": {
      "CSE": 81,
      "IT": 80.5,
      "ENTC": 80,
      "MECH": 79,
      "EE": 79,
      "CIVIL": 77.5,
      "AIDS": 80.8,
      "CHEM": 76
    }
  },
  {
    "id": "04162",
    "code": "04162",
    "name": "YCCE Nagpur (Gondwana Engg)",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 6,
    "rank": 82,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "04163",
    "code": "04163",
    "name": "KDKCE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 90000,
    "mqFees": 258000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 62,
    "avgPkg": 6,
    "rank": 83,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "01012",
    "code": "01012",
    "name": "GCOE Chandrapur",
    "city": "Chandrapur",
    "district": "Chandrapur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Government",
    "autonomous": false,
    "naac": "B+",
    "intake": 300,
    "fees": 38000,
    "mqFees": null,
    "capSeats": 300,
    "mqSeats": 0,
    "placement": 60,
    "avgPkg": 5,
    "rank": 84,
    "cutoffs": {
      "CSE": 85,
      "IT": 84.5,
      "ENTC": 84,
      "MECH": 83,
      "EE": 83,
      "CIVIL": 81.5,
      "AIDS": 84.8,
      "CHEM": 80
    }
  },
  {
    "id": "02164",
    "code": "02164",
    "name": "Matoshri COE Nanded",
    "city": "Nanded",
    "district": "Nanded",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 78000,
    "mqFees": 220000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 58,
    "avgPkg": 5,
    "rank": 85,
    "cutoffs": {
      "CSE": 82,
      "IT": 81.5,
      "ENTC": 81,
      "MECH": 80,
      "EE": 80,
      "CIVIL": 78.5,
      "AIDS": 81.8,
      "CHEM": 77
    }
  },
  {
    "id": "02165",
    "code": "02165",
    "name": "SRTTC Nanded",
    "city": "Nanded",
    "district": "Nanded",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Government",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 40000,
    "mqFees": null,
    "capSeats": 60,
    "mqSeats": 0,
    "placement": 60,
    "avgPkg": 5,
    "rank": 86,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "06166",
    "code": "06166",
    "name": "Imperial COE Wagholi Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 80000,
    "mqFees": 225000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 55,
    "avgPkg": 5,
    "rank": 87,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "06167",
    "code": "06167",
    "name": "Sahyadri Valley COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 78000,
    "mqFees": 220000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 53,
    "avgPkg": 5,
    "rank": 88,
    "cutoffs": {
      "CSE": 79,
      "IT": 78.5,
      "ENTC": 78,
      "MECH": 77,
      "EE": 77,
      "CIVIL": 75.5,
      "AIDS": 78.8,
      "CHEM": 74
    }
  },
  {
    "id": "06168",
    "code": "06168",
    "name": "Trinity COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 75000,
    "mqFees": 210000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 89,
    "cutoffs": {
      "CSE": 77,
      "IT": 76.5,
      "ENTC": 76,
      "MECH": 75,
      "EE": 75,
      "CIVIL": 73.5,
      "AIDS": 76.8,
      "CHEM": 72
    }
  },
  {
    "id": "05169",
    "code": "05169",
    "name": "GES RH Sapat COE Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 82000,
    "mqFees": 235000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 54,
    "avgPkg": 5,
    "rank": 90,
    "cutoffs": {
      "CSE": 81,
      "IT": 80.5,
      "ENTC": 80,
      "MECH": 79,
      "EE": 79,
      "CIVIL": 77.5,
      "AIDS": 80.8,
      "CHEM": 76
    }
  },
  {
    "id": "05170",
    "code": "05170",
    "name": "SIEM Nashik",
    "city": "Nashik",
    "district": "Nashik",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 91,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "03171",
    "code": "03171",
    "name": "DPCOE Dombivli",
    "city": "Dombivli",
    "district": "Thane",
    "univ": "Mumbai University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 54,
    "avgPkg": 5,
    "rank": 92,
    "cutoffs": {
      "CSE": 82,
      "IT": 81.5,
      "ENTC": 81,
      "MECH": 80,
      "EE": 80,
      "CIVIL": 78.5,
      "AIDS": 81.8,
      "CHEM": 77
    }
  },
  {
    "id": "05172",
    "code": "05172",
    "name": "AVCOE Sangamner",
    "city": "Sangamner",
    "district": "Ahmednagar",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 74000,
    "mqFees": 210000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 93,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "05173",
    "code": "05173",
    "name": "GF's Godavari COE Jalgaon",
    "city": "Jalgaon",
    "district": "Jalgaon",
    "univ": "Kavayitri Bahinabai Chaudhari North Maharashtra University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 94,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "04174",
    "code": "04174",
    "name": "Nagpur Institute of Tech",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 82000,
    "mqFees": 232000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 55,
    "avgPkg": 5,
    "rank": 95,
    "cutoffs": {
      "CSE": 82,
      "IT": 81.5,
      "ENTC": 81,
      "MECH": 80,
      "EE": 80,
      "CIVIL": 78.5,
      "AIDS": 81.8,
      "CHEM": 77
    }
  },
  {
    "id": "04175",
    "code": "04175",
    "name": "Tulsiramji Gaikwad-Patil COE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 80000,
    "mqFees": 226000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 53,
    "avgPkg": 5,
    "rank": 96,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "06176",
    "code": "06176",
    "name": "Siddhant COE Sudumbare Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 97,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "06177",
    "code": "06177",
    "name": "ICOER Wagholi Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 78000,
    "mqFees": 220000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 51,
    "avgPkg": 5,
    "rank": 98,
    "cutoffs": {
      "CSE": 78.5,
      "IT": 78,
      "ENTC": 77.5,
      "MECH": 76.5,
      "EE": 76.5,
      "CIVIL": 75,
      "AIDS": 78.2,
      "CHEM": 73.5
    }
  },
  {
    "id": "06178",
    "code": "06178",
    "name": "Smt. Kashibai Navale COE Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 95000,
    "mqFees": 270000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 62,
    "avgPkg": 6,
    "rank": 99,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "02179",
    "code": "02179",
    "name": "LBCE Osmanabad",
    "city": "Osmanabad",
    "district": "Dharashiv",
    "univ": "Swami Ramanand Teerth Marathwada University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 72000,
    "mqFees": 205000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 100,
    "cutoffs": {
      "CSE": 77,
      "IT": 76.5,
      "ENTC": 76,
      "MECH": 75,
      "EE": 75,
      "CIVIL": 73.5,
      "AIDS": 76.8,
      "CHEM": 72
    }
  },
  {
    "id": "06180",
    "code": "06180",
    "name": "Swami Vivekanand COE Kolhapur",
    "city": "Kolhapur",
    "district": "Kolhapur",
    "univ": "Shivaji University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 101,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "06181",
    "code": "06181",
    "name": "Dr. D.Y. Patil COE Kolhapur",
    "city": "Kolhapur",
    "district": "Kolhapur",
    "univ": "Shivaji University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 80000,
    "mqFees": 226000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 53,
    "avgPkg": 5,
    "rank": 102,
    "cutoffs": {
      "CSE": 81,
      "IT": 80.5,
      "ENTC": 80,
      "MECH": 79,
      "EE": 79,
      "CIVIL": 77.5,
      "AIDS": 80.8,
      "CHEM": 76
    }
  },
  {
    "id": "04182",
    "code": "04182",
    "name": "RCOEM Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 92000,
    "mqFees": 262000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 65,
    "avgPkg": 6,
    "rank": 103,
    "cutoffs": {
      "CSE": 87,
      "IT": 86.5,
      "ENTC": 86,
      "MECH": 85,
      "EE": 85,
      "CIVIL": 83.5,
      "AIDS": 86.8,
      "CHEM": 82
    }
  },
  {
    "id": "04183",
    "code": "04183",
    "name": "Priyadarshini Indira Gandhi COE Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 85000,
    "mqFees": 242000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 60,
    "avgPkg": 6,
    "rank": 104,
    "cutoffs": {
      "CSE": 84,
      "IT": 83.5,
      "ENTC": 83,
      "MECH": 82,
      "EE": 82,
      "CIVIL": 80.5,
      "AIDS": 83.8,
      "CHEM": 79
    }
  },
  {
    "id": "01184",
    "code": "01184",
    "name": "JDIET Yavatmal",
    "city": "Yavatmal",
    "district": "Yavatmal",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 74000,
    "mqFees": 210000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 105,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "01185",
    "code": "01185",
    "name": "RKCOEA Akola",
    "city": "Akola",
    "district": "Akola",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 72000,
    "mqFees": 205000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 106,
    "cutoffs": {
      "CSE": 77,
      "IT": 76.5,
      "ENTC": 76,
      "MECH": 75,
      "EE": 75,
      "CIVIL": 73.5,
      "AIDS": 76.8,
      "CHEM": 72
    }
  },
  {
    "id": "01186",
    "code": "01186",
    "name": "Shriman Bhausaheb Deshmukh COE Amravati",
    "city": "Amravati",
    "district": "Amravati",
    "univ": "Sant Gadge Baba Amravati University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 73000,
    "mqFees": 208000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 107,
    "cutoffs": {
      "CSE": 77,
      "IT": 76.5,
      "ENTC": 76,
      "MECH": 75,
      "EE": 75,
      "CIVIL": 73.5,
      "AIDS": 76.8,
      "CHEM": 72
    }
  },
  {
    "id": "04187",
    "code": "04187",
    "name": "GHRIET Nagpur",
    "city": "Nagpur",
    "district": "Nagpur",
    "univ": "Rashtrasant Tukadoji Maharaj Nagpur University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 78000,
    "mqFees": 222000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 53,
    "avgPkg": 5,
    "rank": 108,
    "cutoffs": {
      "CSE": 79,
      "IT": 78.5,
      "ENTC": 78,
      "MECH": 77,
      "EE": 77,
      "CIVIL": 75.5,
      "AIDS": 78.8,
      "CHEM": 74
    }
  },
  {
    "id": "06188",
    "code": "06188",
    "name": "MAE Alandi Pune",
    "city": "Alandi",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 51,
    "avgPkg": 5,
    "rank": 109,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "06189",
    "code": "06189",
    "name": "MMCOE Pune (Marathwada Mitra Mandal)",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 98000,
    "mqFees": 278000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 68,
    "avgPkg": 7,
    "rank": 110,
    "cutoffs": {
      "CSE": 88,
      "IT": 87.5,
      "ENTC": 87,
      "MECH": 86,
      "EE": 86,
      "CIVIL": 84.5,
      "AIDS": 87.8,
      "CHEM": 83
    }
  },
  {
    "id": "06190",
    "code": "06190",
    "name": "SCOE Pune (Sinhgad College, Vadgaon)",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 120,
    "fees": 97000,
    "mqFees": 276000,
    "capSeats": 96,
    "mqSeats": 24,
    "placement": 67,
    "avgPkg": 7,
    "rank": 111,
    "cutoffs": {
      "CSE": 87.5,
      "IT": 87,
      "ENTC": 86.5,
      "MECH": 85.5,
      "EE": 85.5,
      "CIVIL": 84,
      "AIDS": 87.2,
      "CHEM": 82.5
    }
  },
  {
    "id": "06191",
    "code": "06191",
    "name": "SKNCOE Pune (Smt Kashibai Navale Vadgaon)",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 96000,
    "mqFees": 274000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 65,
    "avgPkg": 6,
    "rank": 112,
    "cutoffs": {
      "CSE": 86,
      "IT": 85.5,
      "ENTC": 85,
      "MECH": 84,
      "EE": 84,
      "CIVIL": 82.5,
      "AIDS": 85.8,
      "CHEM": 81
    }
  },
  {
    "id": "06192",
    "code": "06192",
    "name": "AISSMS IOIT Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B+",
    "intake": 60,
    "fees": 105000,
    "mqFees": 298000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 69,
    "avgPkg": 7,
    "rank": 113,
    "cutoffs": {
      "CSE": 89,
      "IT": 88.5,
      "ENTC": 88,
      "MECH": 87,
      "EE": 87,
      "CIVIL": 85.5,
      "AIDS": 88.8,
      "CHEM": 84
    }
  },
  {
    "id": "05193",
    "code": "05193",
    "name": "SRES COE Kopargaon",
    "city": "Kopargaon",
    "district": "Ahmednagar",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 74000,
    "mqFees": 210000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 114,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "01194",
    "code": "01194",
    "name": "GCOE Jalgaon Jamod",
    "city": "Jalgaon Jamod",
    "district": "Buldhana",
    "univ": "Dr. Babasaheb Ambedkar Technological University",
    "type": "Government",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 38000,
    "mqFees": null,
    "capSeats": 60,
    "mqSeats": 0,
    "placement": 55,
    "avgPkg": 5,
    "rank": 115,
    "cutoffs": {
      "CSE": 80,
      "IT": 79.5,
      "ENTC": 79,
      "MECH": 78,
      "EE": 78,
      "CIVIL": 76.5,
      "AIDS": 79.8,
      "CHEM": 75
    }
  },
  {
    "id": "06195",
    "code": "06195",
    "name": "SIEM Solapur",
    "city": "Solapur",
    "district": "Solapur",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 76000,
    "mqFees": 215000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 50,
    "avgPkg": 5,
    "rank": 116,
    "cutoffs": {
      "CSE": 78,
      "IT": 77.5,
      "ENTC": 77,
      "MECH": 76,
      "EE": 76,
      "CIVIL": 74.5,
      "AIDS": 77.8,
      "CHEM": 73
    }
  },
  {
    "id": "06196",
    "code": "06196",
    "name": "AITRC Sangola",
    "city": "Sangola",
    "district": "Solapur",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 72000,
    "mqFees": 205000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 48,
    "avgPkg": 4,
    "rank": 117,
    "cutoffs": {
      "CSE": 75,
      "IT": 74.5,
      "ENTC": 74,
      "MECH": 73,
      "EE": 73,
      "CIVIL": 71.5,
      "AIDS": 74.8,
      "CHEM": 70
    }
  },
  {
    "id": "06197",
    "code": "06197",
    "name": "Nanasaheb Mahadik COE Peth",
    "city": "Peth",
    "district": "Sangli",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 73000,
    "mqFees": 208000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 49,
    "avgPkg": 4,
    "rank": 118,
    "cutoffs": {
      "CSE": 76,
      "IT": 75.5,
      "ENTC": 75,
      "MECH": 74,
      "EE": 74,
      "CIVIL": 72.5,
      "AIDS": 75.8,
      "CHEM": 71
    }
  },
  {
    "id": "06198",
    "code": "06198",
    "name": "DYPIET Ambi Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 80000,
    "mqFees": 228000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 52,
    "avgPkg": 5,
    "rank": 119,
    "cutoffs": {
      "CSE": 79,
      "IT": 78.5,
      "ENTC": 78,
      "MECH": 77,
      "EE": 77,
      "CIVIL": 75.5,
      "AIDS": 78.8,
      "CHEM": 74
    }
  },
  {
    "id": "06199",
    "code": "06199",
    "name": "Jaihind COE Kuran Pune",
    "city": "Pune",
    "district": "Pune",
    "univ": "Savitribai Phule Pune University",
    "type": "Private",
    "autonomous": false,
    "naac": "B",
    "intake": 60,
    "fees": 75000,
    "mqFees": 212000,
    "capSeats": 48,
    "mqSeats": 12,
    "placement": 48,
    "avgPkg": 4,
    "rank": 120,
    "cutoffs": {
      "CSE": 75,
      "IT": 74.5,
      "ENTC": 74,
      "MECH": 73,
      "EE": 73,
      "CIVIL": 71.5,
      "AIDS": 74.8,
      "CHEM": 70
    }
  }
];

// --- HELPER ALGORITHMS ---
function getChance(userPct, cutoff, offset) {
  const adjustedCutoff = cutoff - offset;
  if (userPct >= adjustedCutoff + 1.2)   return "Safe";
  if (userPct >= adjustedCutoff - 0.4) return "Moderate";
  if (userPct >= adjustedCutoff - 2.5)   return "Ambitious";
  return "Difficult";
}

const CHANCE_COLOR = { 
  Safe: "#10b981",       // Neon Emerald Green
  Moderate: "#fbbf24",   // Neon Amber Yellow
  Ambitious: "#f87171",  // Coral Red
  Difficult: "#6b7280"   // Cool Gray
};

const CHANCE_GLOW = {
  Safe: "0 0 12px rgba(16, 185, 129, 0.2)",
  Moderate: "0 0 12px rgba(251, 191, 36, 0.2)",
  Ambitious: "0 0 12px rgba(248, 113, 113, 0.2)",
  Difficult: "none"
};

const CHANCE_ORDER = { Safe: 0, Moderate: 1, Ambitious: 2, Difficult: 3 };
const TYPE_COLOR   = { Government: "#10b981", "Government-Aided": "#3b82f6", Private: "#fbbf24" };
const TIER_COLOR   = { "Tier 1": "#a78bfa", "Tier 2": "#60a5fa", "Tier 3": "#94a3b8" };

function ChanceBar({ chance }) {
  const w = { Safe: 95, Moderate: 65, Ambitious: 35, Difficult: 10 }[chance];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
      <div style={{ flex: 1, height: 5, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: CHANCE_COLOR[chance], borderRadius: 4, transition: "width .4s ease" }} />
      </div>
      <span style={{ color: CHANCE_COLOR[chance], fontSize: 11, fontWeight: 700, minWidth: 64, textShadow: CHANCE_GLOW[chance] }}>{chance}</span>
    </div>
  );
}

// --- MAIN REACT COMPONENT ---
export default function App() {
  const [step, setStep]           = useState(1);
  const [name, setName]           = useState("");
  const [percentile, setPercentile] = useState("");
  const [category, setCategory]   = useState("Open");
  const [branch, setBranch]       = useState("CSE");
  const [admType, setAdmType]     = useState("CAP");
  const [filters, setFilters]     = useState({ 
    district: "All", 
    type: "All", 
    tier: "All", 
    univ: "All", 
    maxFees: 600000, 
    minPlacement: 0, 
    sortBy: "chance", 
    search: "" 
  });
  const [saved, setSaved]         = useState([]);
  const [compare, setCompare]     = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [tab, setTab]             = useState("results");
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(15);
  }, [filters, branch, category, percentile, admType, tab]);

  const offset  = CAT_OFFSET[category] || 0;
  const userPct = parseFloat(percentile) || 0;

  const enriched = useMemo(() => COLLEGES.map(c => {
    const rawCutoff = c.cutoffs[branch] ?? 70;
    const adjCutoff = Math.max(0, rawCutoff - offset);
    const chance    = getChance(userPct, rawCutoff, offset);
    const displayFees = admType === "MQ" ? (c.mqFees || c.fees * 2.2) : c.fees;
    return { ...c, adjCutoff, chance, displayFees };
  }), [branch, offset, userPct, admType]);

  const results = useMemo(() => enriched.filter(c => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchCity = c.city.toLowerCase().includes(q);
      const matchCode = c.code.includes(q);
      if (!matchName && !matchCity && !matchCode) return false;
    }
    if (filters.district !== "All" && c.district !== filters.district) return false;
    if (filters.type !== "All" && c.type !== filters.type) return false;
    if (filters.tier !== "All" && c.tier !== filters.tier) return false;
    if (filters.univ !== "All" && c.univ !== filters.univ) return false;
    if (c.displayFees > filters.maxFees) return false;
    if (c.placement < filters.minPlacement) return false;
    if (admType === "MQ" && c.mqSeats === 0) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === "chance")     return CHANCE_ORDER[a.chance] - CHANCE_ORDER[b.chance];
    if (filters.sortBy === "rank")       return a.rank - b.rank;
    if (filters.sortBy === "fees")       return a.displayFees - b.displayFees;
    if (filters.sortBy === "placement")  return b.placement - a.placement;
    if (filters.sortBy === "pkg")        return b.avgPkg - a.avgPkg;
    return 0;
  }), [enriched, filters, admType]);

  const savedList = enriched.filter(c => saved.includes(c.id));
  const compareList = enriched.filter(c => compare.includes(c.id));

  const fset = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const stats = useMemo(() => ({
    safe:      results.filter(c => c.chance === "Safe").length,
    moderate:  results.filter(c => c.chance === "Moderate").length,
    ambitious: results.filter(c => c.chance === "Ambitious").length,
    difficult: results.filter(c => c.chance === "Difficult").length,
    total:     results.length,
  }), [results]);

  const display = tab === "saved" ? savedList : results;
  const slicedDisplay = useMemo(() => display.slice(0, visibleCount), [display, visibleCount]);

  return (
    <div style={{ minHeight: "100vh", background: "#080d1a", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        .card { background: #0e1428; border: 1px solid #1a2040; border-radius: 12px; transition: all 0.25s ease; position: relative; overflow: hidden; }
        .card:hover { border-color: #3b82f6; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15); transform: translateY(-2px); }
        .pill { border-radius: 20px; padding: 6px 14px; font-size: 12px; cursor: pointer; transition: all 0.2s; border: 1px solid #1e293b; background: #0f172a; color: #94a3b8; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
        .pill:hover { border-color: #3b82f6; color: #ffffff; }
        .pill.on { background: #2563eb; border-color: #3b82f6; color: #ffffff; box-shadow: 0 0 10px rgba(37, 99, 235, 0.4); }
        .inp { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 10px 14px; color: #e2e8f0; font-size: 14px; font-family: 'DM Sans', sans-serif; width: 100%; transition: all 0.2s; }
        .inp:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 8px rgba(37, 99, 235, 0.3); }
        select.inp option { background: #020617; color: #e2e8f0; }
        .btn { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; border: none; border-radius: 8px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4); }
        .btn:active { transform: translateY(0); }
        .btn-disabled { background: #1e293b; color: #64748b; cursor: not-allowed; box-shadow: none; }
        .tag { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px; display: inline-block; text-transform: uppercase; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade { animation: fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .compare-table tr:nth-child(even) { background: #090f20; }
        .pulse { animation: pulseGlow 2s infinite alternate; }
        @keyframes pulseGlow { from { box-shadow: 0 0 10px rgba(37, 99, 235, 0.2); } to { box-shadow: 0 0 20px rgba(37, 99, 235, 0.5); } }
      `}</style>

      {/* --- HEADER --- */}
      <header style={{ background: "rgba(2, 6, 23, 0.8)", borderBottom: "1px solid #1a2040", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)" }}>🎓</div>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.4px", color: "#ffffff", display: "flex", alignItems: "center", gap: 8 }}>
              MHT-CET CAP Predictor <span style={{ fontSize: 10, color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)", borderRadius: 4, padding: "1px 6px", fontFamily: "DM Mono" }}>v2026</span>
            </h1>
            <p style={{ fontSize: 11, color: "#64748b", fontFamily: "DM Mono" }}>Maharashtra State Admission Cell Portal Simulator</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {compare.length > 0 && (
            <button className="btn pulse" style={{ padding: "8px 16px", fontSize: 12 }} onClick={() => setShowCompare(true)}>
              📊 Compare Tool ({compare.length}/3)
            </button>
          )}
          {step === 2 && (
            <button onClick={() => setStep(1)} style={{ background: "transparent", border: "1px solid #1e293b", borderRadius: 8, padding: "8px 16px", color: "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={e => e.target.style.borderColor = "#3b82f6"} onMouseLeave={e => e.target.style.borderColor = "#1e293b"}>
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </header>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px" }}>
        
        {/* --- STEP 1: CONSOLE SETUP --- */}
        {step === 1 && (
          <div style={{ maxWidth: 640, margin: "0 auto" }} className="fade">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span style={{ fontSize: 10, color: "#3b82f6", fontFamily: "DM Mono", fontWeight: 700, letterSpacing: 1.5 }}>STEP 1 OF 2</span>
              <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", color: "#ffffff", marginTop: 4 }}>Predictive Placement & CAP Form Simulator</h2>
              <p style={{ color: "#94a3b8", marginTop: 8, fontSize: 14 }}>Configure your academic profile to simulate seat allotments across {COLLEGES.length} top-tier Maharashtra engineering institutions.</p>
            </div>
            
            <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <div>
                <label style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: "0.5px" }}>STUDENT FULL NAME</label>
                <input className="inp" placeholder="Enter student's name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: "0.5px" }}>MHT-CET PERCENTILE</label>
                  <input className="inp" type="number" placeholder="e.g. 96.50" min="0" max="100" step="0.0001" value={percentile} onChange={e => setPercentile(e.target.value)} />
                  <span style={{ fontSize: 10, color: "#64748b", marginTop: 4, display: "block" }}>Enter your overall percentile score</span>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: "0.5px" }}>SEAT RESERVATION CATEGORY</label>
                  <select className="inp" value={category} onChange={e => setCategory(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c} Quota (Offset: -{CAT_OFFSET[c]}%ile)</option>)}
                  </select>
                  <span style={{ fontSize: 10, color: "#64748b", marginTop: 4, display: "block" }}>Reservation adjustments will be applied</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, display: "block", fontWeight: 600, letterSpacing: "0.5px" }}>PREFERRED ACADEMIC BRANCH</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
                  {BRANCHES.map(b => (
                    <button key={b.key} className={`pill ${branch === b.key ? "on" : ""}`} style={{ textAlign: "left", borderRadius: 8, padding: "12px", justifyContent: "flex-start" }} onClick={() => setBranch(b.key)}>
                      <span style={{ fontSize: 16 }}>{b.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{b.key}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, display: "block", fontWeight: 600, letterSpacing: "0.5px" }}>COUNSELING ADMISSION CHANNEL</label>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className={`pill ${admType === "CAP" ? "on" : ""}`} style={{ flex: 1, textAlign: "center", borderRadius: 8, padding: "14px" }} onClick={() => setAdmType("CAP")}>
                    🏛️ CAP State Counseling Seats
                  </button>
                  <button className={`pill ${admType === "MQ" ? "on" : ""}`} style={{ flex: 1, textAlign: "center", borderRadius: 8, padding: "14px" }} onClick={() => setAdmType("MQ")}>
                    💼 Management Quota Seats
                  </button>
                </div>
                {admType === "MQ" && (
                  <p style={{ fontSize: 11, color: "#fbbf24", marginTop: 8 }}>
                    ⚠️ Note: Management quota seats have significantly higher fees (approx. 2.2× CAP fees) and are only available at Private institutions.
                  </p>
                )}
              </div>

              <button className="btn" style={{ marginTop: 12, padding: "14px 28px", fontSize: 15 }} onClick={() => { if (!percentile || isNaN(parseFloat(percentile))) { alert("Please input a valid MHT-CET percentile score!"); return; } setStep(2); }}>
                Build Personalized Shortlist →
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: METRICS & COLLEGE MATRIX --- */}
        {step === 2 && (
          <div className="fade">
            {/* Quick Filter Profile Header */}
            <div className="card" style={{ padding: "16px 20px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", background: "linear-gradient(90deg, #0e1428 0%, #151d38 100%)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>👤 {name || "Guest Applicant"}</span>
                <span style={{ width: 1, height: 16, background: "#1e293b" }} />
                <span style={{ fontSize: 13, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
                  Target: <strong>{BRANCHES.find(b => b.key === branch)?.label}</strong>
                </span>
                <span style={{ width: 1, height: 16, background: "#1e293b" }} />
                <span style={{ background: "#2563eb1e", color: "#60a5fa", border: "1px solid #2563eb3a", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700, fontFamily: "DM Mono", boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)" }}>
                  {percentile}%ile
                </span>
                <span className="tag" style={{ background: "#1e293b", color: "#fbbf24", border: "1px solid #2d3748" }}>
                  {category} Category
                </span>
                <span className="tag" style={{ background: admType === "MQ" ? "rgba(124, 58, 237, 0.2)" : "rgba(16, 185, 129, 0.2)", color: admType === "MQ" ? "#c084fc" : "#34d399", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
                  {admType === "MQ" ? "Management Quota" : "CAP Round"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={`pill ${tab === "results" ? "on" : ""}`} onClick={() => setTab("results")}>
                  🔍 Matching Matrix ({results.length})
                </button>
                <button className={`pill ${tab === "saved" ? "on" : ""}`} onClick={() => setTab("saved")}>
                  ❤️ Saved Shortlist ({saved.length})
                </button>
              </div>
            </div>

            {/* Micro Allotment Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
              {[
                ["Safe (Highly Probable Allotment)", "#10b981", stats.safe, "rgba(16, 185, 129, 0.15)"],
                ["Moderate (Good Admission Chance)", "#fbbf24", stats.moderate, "rgba(251, 191, 36, 0.15)"],
                ["Ambitious (Cutoff Clearance Required)", "#f87171", stats.ambitious, "rgba(248, 113, 113, 0.15)"],
                ["Difficult (Extremely Tight / Historical High)", "#6b7280", stats.difficult, "rgba(107, 114, 128, 0.15)"]
              ].map(([lbl, clr, val, bg]) => (
                <div key={lbl} className="card" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0e1428" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>{lbl.split(" ")[0]} Options</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{lbl.substring(lbl.indexOf("("))}</div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "DM Mono", color: clr, background: bg, width: 44, height: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center", boxShadow: `0 0 10px ${bg}` }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Filtration & Optimization Dashboard */}
            <div className="card" style={{ padding: 20, marginBottom: 16, background: "#0f172a" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, display: "block" }}>SEARCH COLLEGE / CITY</label>
                  <input className="inp" style={{ padding: "8px 12px" }} placeholder="🔍 Code, name, city..." value={filters.search} onChange={e => fset("search", e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, display: "block" }}>REGIONAL DISTRICT</label>
                  <select className="inp" style={{ padding: "8px 12px" }} value={filters.district} onChange={e => fset("district", e.target.value)}>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, display: "block" }}>INSTITUTION TYPE</label>
                  <select className="inp" style={{ padding: "8px 12px" }} value={filters.type} onChange={e => fset("type", e.target.value)}>
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, display: "block" }}>ACADEMIC TIER</label>
                  <select className="inp" style={{ padding: "8px 12px" }} value={filters.tier} onChange={e => fset("tier", e.target.value)}>
                    {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, display: "block" }}>AFFILIATED UNIVERSITY</label>
                  <select className="inp" style={{ padding: "8px 12px" }} value={filters.univ} onChange={e => fset("univ", e.target.value)}>
                    {UNIVS.map(u => <option key={u} value={u}>{u.replace("University", "Univ.")}</option>)}
                  </select>
                </div>
              </div>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", marginTop: 16, borderTop: "1px solid #1a2040", paddingTop: 16 }}>
                <label style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 10 }}>
                  <span>Max Annual Fees Limit:</span>
                  <input type="range" min={30000} max={600000} step={10000} value={filters.maxFees} onChange={e => fset("maxFees", +e.target.value)} style={{ accentColor: "#2563eb", width: 140, cursor: "pointer" }} />
                  <span style={{ color: "#3b82f6", fontFamily: "DM Mono", fontWeight: 700, background: "rgba(59, 130, 246, 0.1)", padding: "2px 8px", borderRadius: 4 }}>
                    ₹{(filters.maxFees / 1000).toFixed(0)}K
                  </span>
                </label>

                <label style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 10 }}>
                  <span>Min Placement Rate:</span>
                  <input type="range" min={0} max={95} step={5} value={filters.minPlacement} onChange={e => fset("minPlacement", +e.target.value)} style={{ accentColor: "#2563eb", width: 140, cursor: "pointer" }} />
                  <span style={{ color: "#3b82f6", fontFamily: "DM Mono", fontWeight: 700, background: "rgba(59, 130, 246, 0.1)", padding: "2px 8px", borderRadius: 4 }}>
                    {filters.minPlacement}%
                  </span>
                </label>

                <label style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
                  <span>Sorting Preference:</span>
                  <select className="inp" style={{ width: "auto", padding: "6px 12px", fontSize: 12 }} value={filters.sortBy} onChange={e => fset("sortBy", e.target.value)}>
                    <option value="chance">Probability of Admission</option>
                    <option value="rank">Academic Rank / Popularity</option>
                    <option value="fees">Tuition Fees (Low → High)</option>
                    <option value="placement">Placements Performance</option>
                    <option value="pkg">Average Placement Package</option>
                  </select>
                </label>
              </div>
            </div>

            {/* List Matrix */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {slicedDisplay.map((c, idx) => {
                const isSaved = saved.includes(c.id);
                const isCmp   = compare.includes(c.id);
                const color   = CHANCE_COLOR[c.chance];
                const glow    = CHANCE_GLOW[c.chance];

                return (
                  <div key={c.id} className="card fade" style={{ padding: "20px 24px", borderLeft: `4px solid ${color}`, animationDelay: `${idx * 0.015}s` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "DM Mono", fontSize: 11, color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                            DTE: {c.code}
                          </span>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}>{c.name}</h3>
                          <span className="tag" style={{ background: TIER_COLOR[c.tier] + "1a", color: TIER_COLOR[c.tier], border: `1px solid ${TIER_COLOR[c.tier]}33` }}>
                            {c.tier}
                          </span>
                          {c.autonomous && (
                            <span className="tag" style={{ background: "rgba(167, 139, 250, 0.15)", color: "#c084fc", border: "1px solid rgba(167, 139, 250, 0.3)" }}>
                              Autonomous
                            </span>
                          )}
                          {c.naac && (
                            <span className="tag" style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }}>
                              NAAC {c.naac}
                            </span>
                          )}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 8, fontSize: 13, color: "#94a3b8" }}>
                          <span>📍 {c.city}, {c.district}</span>
                          <span style={{ width: 4, height: 4, background: "#475569", borderRadius: "50%" }} />
                          <span className="tag" style={{ background: TYPE_COLOR[c.type] + "15", color: TYPE_COLOR[c.type], border: `1px solid ${TYPE_COLOR[c.type]}33`, padding: "1px 6px", fontSize: 9 }}>
                            {c.type}
                          </span>
                          <span style={{ width: 4, height: 4, background: "#475569", borderRadius: "50%" }} />
                          <span style={{ fontSize: 12, color: "#64748b" }}>{c.univ}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button 
                          onClick={() => setCompare(p => p.includes(c.id) ? p.filter(x => x !== c.id) : p.length < 3 ? [...p, c.id] : p)}
                          className="pill"
                          style={{ 
                            background: isCmp ? "rgba(37, 99, 235, 0.15)" : "transparent", 
                            borderColor: isCmp ? "#3b82f6" : "#1e293b", 
                            color: isCmp ? "#60a5fa" : "#94a3b8"
                          }}
                        >
                          {isCmp ? "✓ Comparing" : "+ Compare"}
                        </button>
                        <button 
                          onClick={() => setSaved(p => p.includes(c.id) ? p.filter(x => x !== c.id) : [...p, c.id])} 
                          style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.15s ease" }}
                          onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
                          onMouseLeave={e => e.target.style.transform = "scale(1)"}
                        >
                          {isSaved ? "❤️" : "🤍"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 20 }}>
                      <div style={{ background: "#020617", borderRadius: 8, padding: "12px 16px", border: "1px solid #1a2040" }}>
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.5px" }}>TARGET CUTOFF / CHANCE</div>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Mono", color: color, marginTop: 4, textShadow: glow }}>
                          {c.adjCutoff.toFixed(4)} %ile
                        </div>
                        <ChanceBar chance={c.chance} />
                      </div>

                      <div style={{ background: "#020617", borderRadius: 8, padding: "12px 16px", border: "1px solid #1a2040" }}>
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.5px" }}>ANNUAL TUITION FEES</div>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Mono", color: "#ffffff", marginTop: 4 }}>
                          ₹{(c.displayFees / 1000).toFixed(0)}K
                        </div>
                        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                          {admType === "MQ" ? "Premium Quota Rate" : "Regular CAP Fee"}
                        </div>
                      </div>

                      <div style={{ background: "#020617", borderRadius: 8, padding: "12px 16px", border: "1px solid #1a2040" }}>
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.5px" }}>SANCTIONED SEATS</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ color: "#60a5fa" }}>🏛️ CAP: {c.capSeats} seats</span>
                          {c.mqSeats > 0 && <span style={{ color: "#c084fc" }}>💼 MQ: {c.mqSeats} seats</span>}
                          {c.mqSeats === 0 && <span style={{ color: "#64748b", fontSize: 11 }}>No MQ Quota Available</span>}
                        </div>
                      </div>

                      <div style={{ background: "#020617", borderRadius: 8, padding: "12px 16px", border: "1px solid #1a2040" }}>
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.5px" }}>PLACEMENTS & CTC</div>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Mono", color: "#10b981", marginTop: 4, textShadow: "0 0 10px rgba(16, 185, 129, 0.15)" }}>
                          {c.placement}%
                        </div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                          Avg Package: <strong>{c.avgPkg} LPA</strong>
                        </div>
                      </div>

                      <div style={{ background: "#020617", borderRadius: 8, padding: "12px 16px", border: "1px solid #1a2040", gridColumn: "span 1" }}>
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.5px", marginBottom: 4 }}>ALL BRANCH CUTOFFS</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", fontSize: 10, fontFamily: "DM Mono" }}>
                          {Object.entries(c.cutoffs).map(([br, cut]) => {
                            const adjCut = Math.max(0, cut - offset);
                            const isCurrent = br === branch;
                            return (
                              <span key={br} style={{ color: isCurrent ? "#3b82f6" : "#64748b", fontWeight: isCurrent ? 700 : 500 }}>
                                {br}: <span style={{ color: isCurrent ? color : "#94a3b8" }}>{adjCut.toFixed(1)}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {display.length > visibleCount && (
                <button 
                  onClick={() => setVisibleCount(prev => prev + 15)} 
                  className="btn" 
                  style={{ width: "100%", padding: "14px 24px" }}
                >
                  Show More
                </button>
              )}

              {display.length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 32px", color: "#64748b", background: "#0f172a", borderRadius: 12, border: "1px dashed #1a2040" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: 16 }}>No Matching Colleges Found</h3>
                  <p style={{ fontSize: 13, marginTop: 6, color: "#94a3b8", maxWidth: 400, margin: "6px auto 0" }}>
                    Try widening your filters, adjusting your maximum fees slider, or looking into alternative districts.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- SIDE-BY-SIDE MATRIX COMPARE MODULE --- */}
      {showCompare && compareList.length > 0 && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(2, 6, 23, 0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(8px)" }} onClick={() => setShowCompare(false)}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 28, maxWidth: 980, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: 16 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 20, color: "#ffffff" }}>Comparative Parameters Analysis Matrix</h3>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Analyzing {compareList.length} colleges side-by-side based on {branch} cutoffs and academic profiles.</p>
              </div>
              <button onClick={() => setShowCompare(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: 28, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#ffffff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>×</button>
            </div>
            
            <div style={{ overflowX: "auto" }}>
              <table className="compare-table" style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: "rgba(2, 6, 23, 0.5)" }}>
                    <td style={{ color: "#3b82f6", fontSize: 11, padding: "12px 16px", fontFamily: "DM Mono", fontWeight: 700, borderBottom: "2px solid #1e293b" }}>PARAMETERS</td>
                    {compareList.map(c => (
                      <td key={c.id} style={{ fontWeight: 700, fontSize: 13, padding: "12px 16px", color: "#ffffff", borderBottom: "2px solid #1e293b", minWidth: 200 }}>
                        {c.name}
                        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500, marginTop: 4 }}>DTE Code: {c.code}</div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Geographical Hub", c => `${c.city}, ${c.district}`],
                    ["Ownership Model",  c => c.type],
                    ["Autonomous Status",c => c.autonomous ? "Autonomous Institution" : "University Affiliated"],
                    ["Affiliated University", c => c.univ],
                    ["Classification Rank", c => `Rank #${c.rank} in State`],
                    ["Academic Tier",     c => c.tier],
                    ["NAAC Accreditation", c => c.naac ? `NAAC Grade ${c.naac}` : "Not Accredited"],
                    [`${branch} Adjusted Cutoff`, c => `${(c.cutoffs[branch] - offset).toFixed(4)} %ile`],
                    ["Allotment Safety Chance", c => getChance(userPct, c.cutoffs[branch], offset)],
                    ["Regular CAP Fees / yr", c => `₹${c.fees.toLocaleString()} / yr`],
                    ["Management Quota Fees / yr", c => c.mqFees ? `₹${c.mqFees.toLocaleString()} / yr` : "MQ Quota Not Available"],
                    ["CAP Sanctioned Seats", c => `${c.capSeats} seats`],
                    ["Management Quota Seats", c => c.mqSeats > 0 ? `${c.mqSeats} seats` : "No seats"],
                    ["Placement Record", c => `${c.placement}% Students Placed`],
                    ["Annual Average Package", c => `₹ ${c.avgPkg} LPA`],
                  ].map(([label, valFn]) => (
                    <tr key={label}>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b", fontWeight: 600, borderBottom: "1px solid #1e293b", width: 220 }}>{label}</td>
                      {compareList.map(c => {
                        const res = valFn(c);
                        const isChance = label === "Allotment Safety Chance";
                        return (
                          <td key={c.id} style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: isChance ? CHANCE_COLOR[res] : "#e2e8f0", borderBottom: "1px solid #1e293b" }}>
                            {isChance ? (
                              <span style={{ background: CHANCE_COLOR[res] + "1a", color: CHANCE_COLOR[res], border: `1px solid ${CHANCE_COLOR[res]}33`, borderRadius: 4, padding: "2px 8px", fontSize: 11, display: "inline-block" }}>
                                {res}
                              </span>
                            ) : res}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer warning info */}
      <footer style={{ textAlign: "center", padding: "32px 16px", color: "#334155", fontSize: 11, borderTop: "1px solid #131b2e", marginTop: 40, lineHeight: 1.6 }}>
        ⚠️ Information listed here is simulated using official DTE/counseling cutoff thresholds from 2022 to 2025. Cutoffs vary each year depending on student distribution and intake capacities. Always cross-verify seat allotment configurations with the official counseling authority portal (<strong>cetcell.mahacet.org</strong>).
      </footer>
    </div>
  );
}
