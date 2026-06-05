import { useState, useMemo } from "react";

const BRANCHES = [
  { key: "CSE",   label: "Computer Science (CSE)",       icon: "💻" },
  { key: "IT",    label: "Information Technology (IT)",  icon: "🌐" },
  { key: "ENTC",  label: "Electronics & Telecom (ENTC)", icon: "📡" },
  { key: "MECH",  label: "Mechanical Engineering",       icon: "⚙️" },
  { key: "EE",    label: "Electrical Engineering",       icon: "⚡" },
  { key: "CIVIL", label: "Civil Engineering",            icon: "🏗️" },
  { key: "AIDS",  label: "AI & Data Science",            icon: "🤖" },
  { key: "CHEM",  label: "Chemical Engineering",         icon: "🧪" },
];

const CATEGORIES  = ["Open","OBC","SC","ST","NT-B","NT-C","NT-D","VJ","EWS","TFWS"];
const CAT_OFFSET  = { Open:0,OBC:3,SC:8,ST:10,"NT-B":5,"NT-C":5,"NT-D":5,VJ:6,EWS:2,TFWS:1 };
const DISTRICTS   = ["All","Pune","Mumbai","Thane","Nagpur","Nashik","Aurangabad","Kolhapur","Sangli","Satara","Solapur","Amravati","Nanded","Jalgaon","Latur","Akola","Wardha","Raigad","Ahmednagar","Dhule","Osmanabad","Chandrapur","Buldhana","Yavatmal"];
const TYPES       = ["All","Government","Government-Aided","Autonomous","Private"];
const TIERS       = ["All","Tier 1","Tier 2","Tier 3"];
const UNIVS       = ["All","SPPU (Pune)","Mumbai University","RTMNU (Nagpur)","DBATU (Lonere)","BATU (Aurangabad)","KBC NMU (Jalgaon)","SUK (Kolhapur)","SRTMNU (Nanded)"];

const C = (cse,it,entc,mech,ee,civil,aids,chem) => ({CSE:cse,IT:it,ENTC:entc,MECH:mech,EE:ee,CIVIL:civil,AIDS:aids,CHEM:chem});

const COLLEGES = [
  // ════ TIER 1 ════
  {id:1,  name:"COEP Technological University",          city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Government",       tier:"Tier 1",naac:"A++",fees:45000, mqFees:null,   capSeats:120,mqSeats:0, placement:95,avgPkg:18,rank:1,  cutoffs:C(99.80,99.50,99.60,99.20,99.00,98.80,99.70,97.50)},
  {id:2,  name:"VJTI Mumbai",                            city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government",       tier:"Tier 1",naac:"A+", fees:55000, mqFees:null,   capSeats:120,mqSeats:0, placement:93,avgPkg:17,rank:2,  cutoffs:C(99.70,99.40,99.50,99.00,98.90,98.50,99.60,97.00)},
  {id:3,  name:"SPIT Mumbai (Sardar Patel)",             city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 1",naac:"A",  fees:40000, mqFees:null,   capSeats:120,mqSeats:0, placement:90,avgPkg:14,rank:3,  cutoffs:C(99.50,99.20,99.00,98.50,98.00,97.50,99.30,96.00)},
  {id:4,  name:"ICT Mumbai",                             city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government",       tier:"Tier 1",naac:"A+", fees:60000, mqFees:null,   capSeats:60, mqSeats:0, placement:91,avgPkg:13,rank:4,  cutoffs:C(99.20,98.80,98.50,98.00,97.80,97.00,99.00,99.50)},
  {id:5,  name:"PICT Pune",                              city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:120000,mqFees:350000, capSeats:120,mqSeats:24,placement:88,avgPkg:13,rank:5,  cutoffs:C(99.30,99.00,98.50,97.50,97.50,96.50,99.10,95.00)},
  {id:6,  name:"MIT-WPU Pune",                           city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A+", fees:200000,mqFees:500000, capSeats:120,mqSeats:60,placement:87,avgPkg:12,rank:6,  cutoffs:C(97.50,97.00,96.50,95.50,95.50,94.00,97.20,93.00)},
  {id:7,  name:"Symbiosis Institute of Tech (SIT)",      city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:250000,mqFees:600000, capSeats:120,mqSeats:60,placement:89,avgPkg:13,rank:7,  cutoffs:C(95.50,95.00,94.50,93.50,93.50,92.00,95.20,91.00)},
  {id:8,  name:"KJ Somaiya COE Mumbai",                  city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:115000,mqFees:320000, capSeats:120,mqSeats:30,placement:83,avgPkg:11,rank:8,  cutoffs:C(98.20,97.80,97.20,96.00,96.00,95.00,97.90,93.50)},
  {id:9,  name:"RAIT Navi Mumbai",                       city:"Navi Mumbai",  district:"Thane",      univ:"Mumbai University",  type:"Private",          tier:"Tier 1",naac:"A",  fees:110000,mqFees:300000, capSeats:120,mqSeats:30,placement:85,avgPkg:12,rank:9,  cutoffs:C(98.80,98.50,98.00,97.00,97.00,96.00,98.60,94.00)},
  {id:10, name:"Walchand College of Engg Sangli",        city:"Sangli",       district:"Sangli",     univ:"SPPU (Pune)",        type:"Government-Aided", tier:"Tier 1",naac:"A",  fees:50000, mqFees:null,   capSeats:120,mqSeats:0, placement:76,avgPkg:8, rank:10, cutoffs:C(93.00,92.50,92.00,91.00,91.00,89.50,92.80,88.00)},
  {id:11, name:"GCOE Nashik",                            city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Government",       tier:"Tier 1",naac:"A",  fees:40000, mqFees:null,   capSeats:120,mqSeats:0, placement:80,avgPkg:9, rank:11, cutoffs:C(97.00,96.50,96.00,95.00,95.00,93.50,96.80,92.00)},
  {id:12, name:"GCOE Amravati",                          city:"Amravati",     district:"Amravati",   univ:"DBATU (Lonere)",     type:"Government",       tier:"Tier 1",naac:"B+", fees:38000, mqFees:null,   capSeats:120,mqSeats:0, placement:75,avgPkg:7, rank:12, cutoffs:C(96.50,96.00,95.50,94.50,94.50,93.00,96.20,91.00)},
  {id:13, name:"SGGSIE Nanded",                          city:"Nanded",       district:"Nanded",     univ:"SRTMNU (Nanded)",   type:"Government",       tier:"Tier 1",naac:"A",  fees:42000, mqFees:null,   capSeats:120,mqSeats:0, placement:78,avgPkg:8, rank:13, cutoffs:C(96.00,95.50,95.00,94.00,94.00,92.50,95.80,90.50)},
  {id:14, name:"GCOE Karad",                             city:"Karad",        district:"Satara",     univ:"SPPU (Pune)",        type:"Government",       tier:"Tier 1",naac:"B+", fees:38000, mqFees:null,   capSeats:120,mqSeats:0, placement:65,avgPkg:6, rank:14, cutoffs:C(89.00,88.50,88.00,87.00,87.00,85.50,88.80,84.00)},
  {id:15, name:"Cummins College of Engg Pune",           city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:140000,mqFees:380000, capSeats:120,mqSeats:30,placement:80,avgPkg:9, rank:15, cutoffs:C(94.50,94.00,93.50,92.50,92.50,91.00,94.20,89.00)},
  {id:16, name:"Army Institute of Technology Pune",      city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:105000,mqFees:null,   capSeats:60, mqSeats:0, placement:85,avgPkg:12,rank:16, cutoffs:C(96.50,96.00,95.50,94.50,94.50,93.00,96.20,91.00)},
  {id:17, name:"Bharati Vidyapeeth COE Pune",            city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 1",naac:"A",  fees:125000,mqFees:345000, capSeats:120,mqSeats:30,placement:76,avgPkg:9, rank:17, cutoffs:C(92.00,91.50,91.00,90.00,90.00,88.50,91.80,87.00)},
  {id:18, name:"PVG's COE Pune",                         city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Government-Aided", tier:"Tier 1",naac:"B+", fees:52000, mqFees:null,   capSeats:120,mqSeats:0, placement:72,avgPkg:7, rank:18, cutoffs:C(91.50,91.00,90.50,89.50,89.50,88.00,91.20,86.50)},

  // ════ TIER 2 – PUNE ════
  {id:19, name:"DYPCOE Pune",                            city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"A",  fees:130000,mqFees:360000, capSeats:120,mqSeats:30,placement:84,avgPkg:11,rank:19, cutoffs:C(98.50,98.00,97.50,96.50,96.50,95.50,98.20,93.50)},
  {id:20, name:"VIT Pune (Vishwakarma)",                 city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 2",naac:"A",  fees:145000,mqFees:390000, capSeats:120,mqSeats:30,placement:82,avgPkg:10,rank:20, cutoffs:C(95.00,94.50,94.00,93.00,93.00,91.50,94.80,90.00)},
  {id:21, name:"PCCOE Pune",                             city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"A",  fees:120000,mqFees:340000, capSeats:120,mqSeats:30,placement:78,avgPkg:9, rank:21, cutoffs:C(93.50,93.00,92.50,91.50,91.50,90.00,93.20,88.00)},
  {id:22, name:"MAEER's MIT College of Engg Pune",       city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Autonomous",       tier:"Tier 2",naac:"A",  fees:155000,mqFees:420000, capSeats:120,mqSeats:36,placement:80,avgPkg:10,rank:22, cutoffs:C(94.00,93.50,93.00,92.00,92.00,90.50,93.80,89.00)},
  {id:23, name:"AISSMS COE Pune",                        city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:110000,mqFees:305000, capSeats:120,mqSeats:24,placement:70,avgPkg:7, rank:23, cutoffs:C(91.00,90.50,90.00,89.00,89.00,87.50,90.80,86.00)},
  {id:24, name:"Sinhgad COE Pune",                       city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:97000, mqFees:278000, capSeats:120,mqSeats:24,placement:69,avgPkg:7, rank:24, cutoffs:C(88.50,88.00,87.50,86.50,86.50,85.00,88.20,83.50)},
  {id:25, name:"SITS Pune",                              city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:100000,mqFees:290000, capSeats:120,mqSeats:24,placement:72,avgPkg:7, rank:25, cutoffs:C(90.00,89.50,89.00,88.00,88.00,86.50,89.80,85.00)},
  {id:26, name:"JSPM RSCOE Pune",                        city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:280000, capSeats:120,mqSeats:24,placement:70,avgPkg:7, rank:26, cutoffs:C(89.00,88.50,88.00,87.00,87.00,85.50,88.80,84.00)},
  {id:27, name:"Indira COE Pune",                        city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:95000, mqFees:275000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:27, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:28, name:"NBN Sinhgad SOE Pune",                   city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B",  fees:92000, mqFees:265000, capSeats:120,mqSeats:24,placement:65,avgPkg:6, rank:28, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:29, name:"Genba Sopanrao Moze COE",                city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:90000, mqFees:260000, capSeats:60, mqSeats:12,placement:63,avgPkg:6, rank:29, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:30, name:"Zeal COE Pune",                          city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B",  fees:85000, mqFees:245000, capSeats:60, mqSeats:12,placement:60,avgPkg:6, rank:30, cutoffs:C(83.00,82.50,82.00,81.00,81.00,79.50,82.80,78.00)},
  {id:31, name:"VPCOE Baramati",                         city:"Baramati",     district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:88000, mqFees:255000, capSeats:120,mqSeats:24,placement:66,avgPkg:6, rank:31, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:32, name:"Vidya Pratishthan's COE Baramati",       city:"Baramati",     district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:87000, mqFees:248000, capSeats:60, mqSeats:12,placement:62,avgPkg:6, rank:32, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},

  // ════ TIER 2 – MUMBAI ════
  {id:33, name:"TSEC Mumbai (Thadomal Shahani)",         city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:42000, mqFees:null,   capSeats:120,mqSeats:0, placement:82,avgPkg:10,rank:33, cutoffs:C(98.00,97.60,97.00,95.80,95.80,94.80,97.70,93.00)},
  {id:34, name:"DJSCE Mumbai",                           city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:40000, mqFees:null,   capSeats:120,mqSeats:0, placement:81,avgPkg:10,rank:34, cutoffs:C(97.80,97.40,96.80,95.60,95.60,94.60,97.50,92.80)},
  {id:35, name:"VESIT Mumbai",                           city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:41000, mqFees:null,   capSeats:120,mqSeats:0, placement:80,avgPkg:10,rank:35, cutoffs:C(97.60,97.20,96.60,95.40,95.40,94.40,97.30,92.60)},
  {id:36, name:"Shah & Anchor Kutchhi COE",              city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:39000, mqFees:null,   capSeats:120,mqSeats:0, placement:78,avgPkg:9, rank:36, cutoffs:C(97.20,96.80,96.20,95.00,95.00,94.00,96.90,92.20)},
  {id:37, name:"Fr. CRCE Mumbai",                        city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:38000, mqFees:null,   capSeats:120,mqSeats:0, placement:79,avgPkg:9, rank:37, cutoffs:C(96.80,96.40,95.80,94.60,94.60,93.60,96.50,92.00)},
  {id:38, name:"Vidyalankar Inst. of Tech Mumbai",       city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:105000,mqFees:295000, capSeats:120,mqSeats:24,placement:71,avgPkg:8, rank:38, cutoffs:C(91.50,91.00,90.50,89.50,89.50,88.00,91.20,86.50)},
  {id:39, name:"SAKEC Mumbai",                           city:"Mumbai",       district:"Mumbai",     univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:95000, mqFees:275000, capSeats:120,mqSeats:24,placement:72,avgPkg:8, rank:39, cutoffs:C(92.00,91.50,91.00,90.00,90.00,88.50,91.80,87.00)},
  {id:40, name:"PCCE Navi Mumbai",                       city:"Navi Mumbai",  district:"Thane",      univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:285000, capSeats:120,mqSeats:24,placement:74,avgPkg:8, rank:40, cutoffs:C(93.00,92.50,92.00,91.00,91.00,89.50,92.80,88.00)},
  {id:41, name:"LTCOE Navi Mumbai",                      city:"Navi Mumbai",  district:"Thane",      univ:"Mumbai University",  type:"Government-Aided", tier:"Tier 2",naac:"B+", fees:36000, mqFees:null,   capSeats:120,mqSeats:0, placement:74,avgPkg:8, rank:41, cutoffs:C(94.00,93.50,93.00,92.00,92.00,90.50,93.80,89.00)},
  {id:42, name:"MGMCET Navi Mumbai",                     city:"Navi Mumbai",  district:"Thane",      univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:102000,mqFees:290000, capSeats:120,mqSeats:24,placement:70,avgPkg:7, rank:42, cutoffs:C(90.00,89.50,89.00,88.00,88.00,86.50,89.80,85.00)},
  {id:43, name:"PHCET Rasayani",                         city:"Rasayani",     district:"Raigad",     univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:92000, mqFees:262000, capSeats:60, mqSeats:12,placement:65,avgPkg:6, rank:43, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:44, name:"Pillai's HOC COE Rasayani",              city:"Rasayani",     district:"Raigad",     univ:"Mumbai University",  type:"Private",          tier:"Tier 2",naac:"B+", fees:95000, mqFees:270000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:44, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:45, name:"MET's IOE Nashik",                       city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:280000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:45, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},

  // ════ TIER 2 – NASHIK / AHMEDNAGAR ════
  {id:46, name:"K.K. Wagh COE Nashik",                   city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"A",  fees:110000,mqFees:310000, capSeats:120,mqSeats:30,placement:74,avgPkg:8, rank:46, cutoffs:C(92.00,91.50,91.00,90.00,90.00,88.50,91.80,87.00)},
  {id:47, name:"Sandip Inst. of Tech Nashik",            city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:100000,mqFees:285000, capSeats:120,mqSeats:24,placement:70,avgPkg:7, rank:47, cutoffs:C(89.00,88.50,88.00,87.00,87.00,85.50,88.80,84.00)},
  {id:48, name:"Amrutvahini COE Sangamner",               city:"Sangamner",    district:"Ahmednagar", univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:88000, mqFees:255000, capSeats:120,mqSeats:24,placement:65,avgPkg:6, rank:48, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:49, name:"Pravara Rural COE Loni",                  city:"Loni",         district:"Ahmednagar", univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:85000, mqFees:242000, capSeats:120,mqSeats:24,placement:63,avgPkg:6, rank:49, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},

  // ════ TIER 2 – AURANGABAD ════
  {id:50, name:"GCE Aurangabad",                         city:"Aurangabad",   district:"Aurangabad", univ:"BATU (Aurangabad)",  type:"Government",       tier:"Tier 2",naac:"B+", fees:40000, mqFees:null,   capSeats:120,mqSeats:0, placement:72,avgPkg:7, rank:50, cutoffs:C(91.00,90.50,90.00,89.00,89.00,87.50,90.80,86.00)},
  {id:51, name:"MGM COE Aurangabad",                     city:"Aurangabad",   district:"Aurangabad", univ:"BATU (Aurangabad)",  type:"Private",          tier:"Tier 2",naac:"B+", fees:105000,mqFees:295000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:51, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:52, name:"Deogiri Inst. of Engg Aurangabad",       city:"Aurangabad",   district:"Aurangabad", univ:"BATU (Aurangabad)",  type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:278000, capSeats:120,mqSeats:24,placement:66,avgPkg:6, rank:52, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:53, name:"AURICCOE Aurangabad",                    city:"Aurangabad",   district:"Aurangabad", univ:"BATU (Aurangabad)",  type:"Private",          tier:"Tier 2",naac:"B",  fees:90000, mqFees:260000, capSeats:60, mqSeats:12,placement:62,avgPkg:6, rank:53, cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},
  {id:54, name:"Marathwada Inst. of Tech Aurangabad",    city:"Aurangabad",   district:"Aurangabad", univ:"BATU (Aurangabad)",  type:"Private",          tier:"Tier 2",naac:"B+", fees:92000, mqFees:265000, capSeats:120,mqSeats:24,placement:64,avgPkg:6, rank:54, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},

  // ════ TIER 2 – NAGPUR ════
  {id:55, name:"YCCE Nagpur",                            city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:48000, mqFees:null,   capSeats:120,mqSeats:0, placement:76,avgPkg:8, rank:55, cutoffs:C(93.00,92.50,92.00,91.00,91.00,89.50,92.80,88.00)},
  {id:56, name:"Shri Ramdeobaba COE Nagpur",             city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:50000, mqFees:null,   capSeats:120,mqSeats:0, placement:75,avgPkg:8, rank:56, cutoffs:C(92.50,92.00,91.50,90.50,90.50,89.00,92.20,87.50)},
  {id:57, name:"KITS Nagpur (Kavikulguru)",              city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Government-Aided", tier:"Tier 2",naac:"B+", fees:46000, mqFees:null,   capSeats:120,mqSeats:0, placement:72,avgPkg:7, rank:57, cutoffs:C(91.50,91.00,90.50,89.50,89.50,88.00,91.20,86.50)},
  {id:58, name:"GHRCE Nagpur (G H Raisoni)",             city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:105000,mqFees:295000, capSeats:120,mqSeats:24,placement:68,avgPkg:6, rank:58, cutoffs:C(90.00,89.50,89.00,88.00,88.00,86.50,89.80,85.00)},
  {id:59, name:"PCE Nagpur (Priyadarshini)",             city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:278000, capSeats:120,mqSeats:24,placement:66,avgPkg:6, rank:59, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:60, name:"Rajiv Gandhi COE Nagpur",                city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:92000, mqFees:262000, capSeats:120,mqSeats:24,placement:64,avgPkg:6, rank:60, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:61, name:"LGNCE Nagpur",                           city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B",  fees:88000, mqFees:250000, capSeats:60, mqSeats:12,placement:62,avgPkg:6, rank:61, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:62, name:"DBACER Nagpur",                          city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B",  fees:88000, mqFees:250000, capSeats:60, mqSeats:12,placement:60,avgPkg:6, rank:62, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:63, name:"BDCE Sewagram Wardha",                   city:"Sewagram",     district:"Wardha",     univ:"RTMNU (Nagpur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:95000, mqFees:270000, capSeats:120,mqSeats:24,placement:64,avgPkg:6, rank:63, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},

  // ════ TIER 2 – KOLHAPUR / SANGLI ════
  {id:64, name:"KIT Kolhapur",                           city:"Kolhapur",     district:"Kolhapur",   univ:"SUK (Kolhapur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:100000,mqFees:285000, capSeats:120,mqSeats:24,placement:72,avgPkg:7, rank:64, cutoffs:C(92.00,91.50,91.00,90.00,90.00,88.50,91.80,87.00)},
  {id:65, name:"DKTEs Textile & Engg Ichalkaranji",      city:"Ichalkaranji", district:"Kolhapur",   univ:"SUK (Kolhapur)",     type:"Private",          tier:"Tier 2",naac:"B+", fees:85000, mqFees:245000, capSeats:60, mqSeats:12,placement:64,avgPkg:6, rank:65, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:66, name:"TKIET Warananagar Kolhapur",             city:"Warananagar",  district:"Kolhapur",   univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:85000, mqFees:245000, capSeats:120,mqSeats:24,placement:65,avgPkg:6, rank:66, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:67, name:"Rajarambapu Inst. of Tech Islampur",     city:"Islampur",     district:"Sangli",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:95000, mqFees:270000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:67, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},

  // ════ TIER 2 – SOLAPUR / LATUR ════
  {id:68, name:"Walchand Institute of Tech Solapur",     city:"Solapur",      district:"Solapur",    univ:"SPPU (Pune)",        type:"Government-Aided", tier:"Tier 2",naac:"A",  fees:48000, mqFees:null,   capSeats:120,mqSeats:0, placement:72,avgPkg:7, rank:68, cutoffs:C(91.50,91.00,90.50,89.50,89.50,88.00,91.20,86.50)},
  {id:69, name:"SVERI's COE Pandharpur",                 city:"Pandharpur",   district:"Solapur",    univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 2",naac:"B+", fees:82000, mqFees:235000, capSeats:60, mqSeats:12,placement:60,avgPkg:5, rank:69, cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},
  {id:70, name:"PDMCE Latur",                            city:"Latur",        district:"Latur",      univ:"SRTMNU (Nanded)",   type:"Private",          tier:"Tier 2",naac:"B",  fees:82000, mqFees:235000, capSeats:60, mqSeats:12,placement:60,avgPkg:5, rank:70, cutoffs:C(83.00,82.50,82.00,81.00,81.00,79.50,82.80,78.00)},
  {id:71, name:"BLDEA's COE Vijayapur",                  city:"Latur",        district:"Latur",      univ:"SRTMNU (Nanded)",   type:"Private",          tier:"Tier 2",naac:"B+", fees:88000, mqFees:250000, capSeats:120,mqSeats:24,placement:64,avgPkg:6, rank:71, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},

  // ════ TIER 2 – JALGAON / DHULE ════
  {id:72, name:"SSBT COET Jalgaon",                      city:"Jalgaon",      district:"Jalgaon",    univ:"KBC NMU (Jalgaon)", type:"Private",          tier:"Tier 2",naac:"B+", fees:90000, mqFees:258000, capSeats:120,mqSeats:24,placement:64,avgPkg:6, rank:72, cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:73, name:"NMU School of Engg Jalgaon",             city:"Jalgaon",      district:"Jalgaon",    univ:"KBC NMU (Jalgaon)", type:"Government",       tier:"Tier 2",naac:"B+", fees:40000, mqFees:null,   capSeats:60, mqSeats:0, placement:65,avgPkg:6, rank:73, cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:74, name:"RCPET Shirpur Dhule",                    city:"Shirpur",      district:"Dhule",      univ:"KBC NMU (Jalgaon)", type:"Private",          tier:"Tier 2",naac:"B+", fees:82000, mqFees:235000, capSeats:60, mqSeats:12,placement:60,avgPkg:5, rank:74, cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},

  // ════ TIER 2 – AMRAVATI / AKOLA / YAVATMAL ════
  {id:75, name:"PRMIT&R Badnera Amravati",               city:"Amravati",     district:"Amravati",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:88000, mqFees:250000, capSeats:120,mqSeats:24,placement:62,avgPkg:6, rank:75, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:76, name:"Sipna COE Amravati",                     city:"Amravati",     district:"Amravati",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:85000, mqFees:242000, capSeats:120,mqSeats:24,placement:60,avgPkg:6, rank:76, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:77, name:"PRPCEM Amravati",                        city:"Amravati",     district:"Amravati",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B",  fees:80000, mqFees:228000, capSeats:60, mqSeats:12,placement:58,avgPkg:5, rank:77, cutoffs:C(83.00,82.50,82.00,81.00,81.00,79.50,82.80,78.00)},
  {id:78, name:"Shankarlal Khandelwal COE Akola",        city:"Akola",        district:"Akola",      univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:85000, mqFees:242000, capSeats:60, mqSeats:12,placement:60,avgPkg:6, rank:78, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:79, name:"SSGMCE Shegaon",                         city:"Shegaon",      district:"Buldhana",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:82000, mqFees:235000, capSeats:120,mqSeats:24,placement:62,avgPkg:6, rank:79, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},
  {id:80, name:"PLIT Buldhana",                          city:"Buldhana",     district:"Buldhana",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B",  fees:78000, mqFees:222000, capSeats:60, mqSeats:12,placement:56,avgPkg:5, rank:80, cutoffs:C(82.00,81.50,81.00,80.00,80.00,78.50,81.80,77.00)},
  {id:81, name:"PKIET Yavatmal",                         city:"Yavatmal",     district:"Yavatmal",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 2",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:54,avgPkg:5, rank:81, cutoffs:C(81.00,80.50,80.00,79.00,79.00,77.50,80.80,76.00)},

  // ════ TIER 2 – CHANDRAPUR / GADCHIROLI ════
  {id:82, name:"YCCE Nagpur (Gondwana Engg)",            city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 2",naac:"B",  fees:85000, mqFees:242000, capSeats:60, mqSeats:12,placement:60,avgPkg:6, rank:82, cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},
  {id:83, name:"KDKCE Nagpur",                           city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:90000, mqFees:258000, capSeats:120,mqSeats:24,placement:62,avgPkg:6, rank:83, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:84, name:"GCOE Chandrapur",                        city:"Chandrapur",   district:"Chandrapur", univ:"RTMNU (Nagpur)",    type:"Government",       tier:"Tier 2",naac:"B+", fees:38000, mqFees:null,   capSeats:60, mqSeats:0, placement:60,avgPkg:5, rank:84, cutoffs:C(85.00,84.50,84.00,83.00,83.00,81.50,84.80,80.00)},

  // ════ TIER 2 – NANDED / OSMANABAD ════
  {id:85, name:"Matoshri COE Nanded",                    city:"Nanded",       district:"Nanded",     univ:"SRTMNU (Nanded)",   type:"Private",          tier:"Tier 2",naac:"B+", fees:78000, mqFees:220000, capSeats:60, mqSeats:12,placement:58,avgPkg:5, rank:85, cutoffs:C(82.00,81.50,81.00,80.00,80.00,78.50,81.80,77.00)},
  {id:86, name:"SRTTC Nanded",                           city:"Nanded",       district:"Nanded",     univ:"SRTMNU (Nanded)",   type:"Government",       tier:"Tier 2",naac:"B+", fees:40000, mqFees:null,   capSeats:60, mqSeats:0, placement:60,avgPkg:5, rank:86, cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},

  // ════ TIER 3 ════
  {id:87, name:"Imperial COE Wagholi Pune",              city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:80000, mqFees:225000, capSeats:60, mqSeats:12,placement:55,avgPkg:5, rank:87, cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:88, name:"Sahyadri Valley COE Pune",               city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:78000, mqFees:220000, capSeats:60, mqSeats:12,placement:53,avgPkg:5, rank:88, cutoffs:C(79.00,78.50,78.00,77.00,77.00,75.50,78.80,74.00)},
  {id:89, name:"Trinity COE Pune",                       city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:75000, mqFees:210000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:89, cutoffs:C(77.00,76.50,76.00,75.00,75.00,73.50,76.80,72.00)},
  {id:90, name:"GES RH Sapat COE Nashik",                city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:82000, mqFees:235000, capSeats:60, mqSeats:12,placement:54,avgPkg:5, rank:90, cutoffs:C(81.00,80.50,80.00,79.00,79.00,77.50,80.80,76.00)},
  {id:91, name:"SIEM Nashik",                            city:"Nashik",       district:"Nashik",     univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:91, cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:92, name:"DPCOE Dombivli",                         city:"Dombivli",     district:"Thane",      univ:"Mumbai University",  type:"Private",          tier:"Tier 3",naac:"B",  fees:85000, mqFees:242000, capSeats:60, mqSeats:12,placement:54,avgPkg:5, rank:92, cutoffs:C(82.00,81.50,81.00,80.00,80.00,78.50,81.80,77.00)},
  {id:93, name:"AVCOE Sangamner",                        city:"Sangamner",    district:"Ahmednagar", univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:74000, mqFees:210000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:93, cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:94, name:"GF's Godavari COE Jalgaon",              city:"Jalgaon",      district:"Jalgaon",    univ:"KBC NMU (Jalgaon)", type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:94, cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:95, name:"Nagpur Institute of Tech",               city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:82000, mqFees:232000, capSeats:60, mqSeats:12,placement:55,avgPkg:5, rank:95, cutoffs:C(82.00,81.50,81.00,80.00,80.00,78.50,81.80,77.00)},
  {id:96, name:"Tulsiramji Gaikwad-Patil COE Nagpur",    city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:80000, mqFees:226000, capSeats:60, mqSeats:12,placement:53,avgPkg:5, rank:96, cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:97, name:"Siddhant COE Sudumbare Pune",            city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:97, cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:98, name:"ICOER Wagholi Pune",                     city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B",  fees:78000, mqFees:220000, capSeats:60, mqSeats:12,placement:51,avgPkg:5, rank:98, cutoffs:C(78.50,78.00,77.50,76.50,76.50,75.00,78.20,73.50)},
  {id:99, name:"Smt. Kashibai Navale COE Pune",          city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",        type:"Private",          tier:"Tier 3",naac:"B+", fees:95000, mqFees:270000, capSeats:60, mqSeats:12,placement:62,avgPkg:6, rank:99, cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:100,name:"LBCE Osmanabad",                         city:"Osmanabad",    district:"Osmanabad",  univ:"SRTMNU (Nanded)",   type:"Private",          tier:"Tier 3",naac:"B",  fees:72000, mqFees:205000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:100,cutoffs:C(77.00,76.50,76.00,75.00,75.00,73.50,76.80,72.00)},
  {id:101,name:"Swami Vivekanand COE Kolhapur",          city:"Kolhapur",     district:"Kolhapur",   univ:"SUK (Kolhapur)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:101,cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:102,name:"Dr. D.Y. Patil COE Kolhapur",            city:"Kolhapur",     district:"Kolhapur",   univ:"SUK (Kolhapur)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:80000, mqFees:226000, capSeats:60, mqSeats:12,placement:53,avgPkg:5, rank:102,cutoffs:C(81.00,80.50,80.00,79.00,79.00,77.50,80.80,76.00)},
  {id:103,name:"RCOEM Nagpur",                           city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 2",naac:"B+", fees:92000, mqFees:262000, capSeats:120,mqSeats:24,placement:65,avgPkg:6, rank:103,cutoffs:C(87.00,86.50,86.00,85.00,85.00,83.50,86.80,82.00)},
  {id:104,name:"Priyadarshini Indira Gandhi COE Nagpur", city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 2",naac:"B",  fees:85000, mqFees:242000, capSeats:60, mqSeats:12,placement:60,avgPkg:6, rank:104,cutoffs:C(84.00,83.50,83.00,82.00,82.00,80.50,83.80,79.00)},
  {id:105,name:"JDIET Yavatmal",                         city:"Yavatmal",     district:"Yavatmal",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:74000, mqFees:210000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:105,cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:106,name:"RKCOEA Akola",                           city:"Akola",        district:"Akola",      univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:72000, mqFees:205000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:106,cutoffs:C(77.00,76.50,76.00,75.00,75.00,73.50,76.80,72.00)},
  {id:107,name:"Shriman Bhausaheb Deshmukh COE Amravati",city:"Amravati",    district:"Amravati",   univ:"DBATU (Lonere)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:73000, mqFees:208000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:107,cutoffs:C(77.00,76.50,76.00,75.00,75.00,73.50,76.80,72.00)},
  {id:108,name:"GHRIET Nagpur",                          city:"Nagpur",       district:"Nagpur",     univ:"RTMNU (Nagpur)",    type:"Private",          tier:"Tier 3",naac:"B",  fees:78000, mqFees:222000, capSeats:60, mqSeats:12,placement:53,avgPkg:5, rank:108,cutoffs:C(79.00,78.50,78.00,77.00,77.00,75.50,78.80,74.00)},
  {id:109,name:"MAE Alandi Pune",                        city:"Alandi",       district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:51,avgPkg:5, rank:109,cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:110,name:"MMCOE Pune (Marathwada Mitra Mandal)",   city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 2",naac:"B+", fees:98000, mqFees:278000, capSeats:120,mqSeats:24,placement:68,avgPkg:7, rank:110,cutoffs:C(88.00,87.50,87.00,86.00,86.00,84.50,87.80,83.00)},
  {id:111,name:"SCOE Pune (Sinhgad College, Vadgaon)",   city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 2",naac:"B+", fees:97000, mqFees:276000, capSeats:120,mqSeats:24,placement:67,avgPkg:7, rank:111,cutoffs:C(87.50,87.00,86.50,85.50,85.50,84.00,87.20,82.50)},
  {id:112,name:"SKNCOE Pune (Smt Kashibai Navale Vadgaon)",city:"Pune",      district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 2",naac:"B+", fees:96000, mqFees:274000, capSeats:60, mqSeats:12,placement:65,avgPkg:6, rank:112,cutoffs:C(86.00,85.50,85.00,84.00,84.00,82.50,85.80,81.00)},
  {id:113,name:"AISSMS IOIT Pune",                       city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 2",naac:"B+", fees:105000,mqFees:298000, capSeats:60, mqSeats:12,placement:69,avgPkg:7, rank:113,cutoffs:C(89.00,88.50,88.00,87.00,87.00,85.50,88.80,84.00)},
  {id:114,name:"SRES COE Kopargaon",                     city:"Kopargaon",    district:"Ahmednagar", univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:74000, mqFees:210000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:114,cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:115,name:"GCOE Jalgaon Jamod",                     city:"Jalgaon Jamod",district:"Buldhana",   univ:"DBATU (Lonere)",    type:"Government",       tier:"Tier 3",naac:"B",  fees:38000, mqFees:null,   capSeats:60, mqSeats:0, placement:55,avgPkg:5, rank:115,cutoffs:C(80.00,79.50,79.00,78.00,78.00,76.50,79.80,75.00)},
  {id:116,name:"SIEM Solapur",                           city:"Solapur",      district:"Solapur",    univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:76000, mqFees:215000, capSeats:60, mqSeats:12,placement:50,avgPkg:5, rank:116,cutoffs:C(78.00,77.50,77.00,76.00,76.00,74.50,77.80,73.00)},
  {id:117,name:"AITRC Sangola",                          city:"Sangola",      district:"Solapur",    univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:72000, mqFees:205000, capSeats:60, mqSeats:12,placement:48,avgPkg:4, rank:117,cutoffs:C(75.00,74.50,74.00,73.00,73.00,71.50,74.80,70.00)},
  {id:118,name:"Nanasaheb Mahadik COE Peth",             city:"Peth",         district:"Sangli",     univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:73000, mqFees:208000, capSeats:60, mqSeats:12,placement:49,avgPkg:4, rank:118,cutoffs:C(76.00,75.50,75.00,74.00,74.00,72.50,75.80,71.00)},
  {id:119,name:"DYPIET Ambi Pune",                       city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:80000, mqFees:228000, capSeats:60, mqSeats:12,placement:52,avgPkg:5, rank:119,cutoffs:C(79.00,78.50,78.00,77.00,77.00,75.50,78.80,74.00)},
  {id:120,name:"Jaihind COE Kuran Pune",                 city:"Pune",         district:"Pune",       univ:"SPPU (Pune)",       type:"Private",          tier:"Tier 3",naac:"B",  fees:75000, mqFees:212000, capSeats:60, mqSeats:12,placement:48,avgPkg:4, rank:120,cutoffs:C(75.00,74.50,74.00,73.00,73.00,71.50,74.80,70.00)},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getChance(userPct, cutoff, offset) {
  const adj = cutoff - offset;
  if (userPct >= adj + 1)   return "Safe";
  if (userPct >= adj - 0.5) return "Moderate";
  if (userPct >= adj - 2)   return "Ambitious";
  return "Difficult";
}
const CHANCE_COLOR = { Safe:"#00e676", Moderate:"#ffd740", Ambitious:"#ff9800", Difficult:"#f44336" };
const CHANCE_ORDER = { Safe:0, Moderate:1, Ambitious:2, Difficult:3 };
const TYPE_COLOR   = { Government:"#00e676","Government-Aided":"#29b6f6",Autonomous:"#ce93d8",Private:"#ffb74d" };
const TIER_COLOR   = { "Tier 1":"#ffd740","Tier 2":"#29b6f6","Tier 3":"#9e9e9e" };

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function ChanceBar({ chance }) {
  const w = { Safe:90, Moderate:65, Ambitious:40, Difficult:15 }[chance];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ flex:1, height:5, background:"#ffffff18", borderRadius:3, overflow:"hidden" }}>
        <div style={{ width:`${w}%`, height:"100%", background:CHANCE_COLOR[chance], borderRadius:3, transition:"width .4s" }} />
      </div>
      <span style={{ color:CHANCE_COLOR[chance], fontSize:11, fontWeight:700, minWidth:64 }}>{chance}</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]           = useState(1);
  const [name, setName]           = useState("");
  const [percentile, setPercentile] = useState("");
  const [category, setCategory]   = useState("Open");
  const [branch, setBranch]       = useState("CSE");
  const [admType, setAdmType]     = useState("CAP"); // CAP | MQ
  const [filters, setFilters]     = useState({ district:"All", type:"All", tier:"All", univ:"All", maxFees:600000, minPlacement:0, sortBy:"chance", search:"" });
  const [saved, setSaved]         = useState([]);
  const [compare, setCompare]     = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [tab, setTab]             = useState("results"); // results | saved

  const offset     = CAT_OFFSET[category] || 0;
  const userPct    = parseFloat(percentile) || 0;

  const enriched = useMemo(() => COLLEGES.map(c => {
    const rawCutoff = c.cutoffs[branch] ?? 75;
    const adjCutoff = Math.max(0, rawCutoff - offset);
    const chance    = getChance(userPct, rawCutoff, offset);
    const displayFees = admType === "MQ" ? (c.mqFees || c.fees * 3) : c.fees;
    return { ...c, adjCutoff, chance, displayFees };
  }), [branch, offset, userPct, admType]);

  const results = useMemo(() => enriched.filter(c => {
    if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase()) && !c.city.toLowerCase().includes(filters.search.toLowerCase())) return false;
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
  const compareList = COLLEGES.filter(c => compare.includes(c.id));

  const fset = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const stats = useMemo(() => ({
    safe:      results.filter(c=>c.chance==="Safe").length,
    moderate:  results.filter(c=>c.chance==="Moderate").length,
    ambitious: results.filter(c=>c.chance==="Ambitious").length,
    total:     results.length,
  }), [results]);

  const display = tab === "saved" ? savedList : results;

  return (
    <div style={{ minHeight:"100vh", background:"#080d1a", color:"#e4e8f5", fontFamily:"'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#1e2640;border-radius:3px}
        .card{background:#0e1428;border:1px solid #1a2040;border-radius:14px;transition:border-color .2s}
        .card:hover{border-color:#2a3460}
        .pill{border-radius:20px;padding:5px 13px;font-size:12px;cursor:pointer;transition:all .15s;border:1px solid #1e2640;background:#0e1428;color:#8892b0}
        .pill.on{background:#1e3a8a;border-color:#3b5fd6;color:#93c5fd}
        .inp{background:#0b1020;border:1px solid #1a2040;border-radius:9px;padding:9px 13px;color:#e4e8f5;font-size:14px;font-family:'DM Sans',sans-serif;width:100%;transition:border-color .2s}
        .inp:focus{outline:none;border-color:#3b5fd6}
        select.inp option{background:#0b1020}
        .btn{background:linear-gradient(135deg,#1e3a8a,#1d4ed8);color:#fff;border:none;border-radius:9px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:opacity .2s,transform .1s}
        .btn:hover{opacity:.9;transform:translateY(-1px)}
        .tag{font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:.3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .3s ease both}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background:"#080d1a", borderBottom:"1px solid #1a2040", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, background:"linear-gradient(135deg,#1e3a8a,#1d4ed8)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🎓</div>
          <div>
            <div style={{ fontWeight:700, fontSize:16 }}>MHT-CET College Finder</div>
            <div style={{ fontSize:10, color:"#4a6fa5", fontFamily:"DM Mono" }}>Maharashtra • {COLLEGES.length} Colleges Listed</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {compare.length > 0 && <button className="btn" style={{ padding:"7px 14px", fontSize:12 }} onClick={()=>setShowCompare(true)}>Compare ({compare.length})</button>}
          {step === 2 && <button onClick={()=>setStep(1)} style={{ background:"none", border:"1px solid #1a2040", borderRadius:8, padding:"7px 14px", color:"#8892b0", cursor:"pointer", fontSize:12 }}>✏️ Edit</button>}
        </div>
      </div>

      <div style={{ maxWidth:1020, margin:"0 auto", padding:"20px 14px" }}>

        {/* ══════ STEP 1 ══════ */}
        {step === 1 && (
          <div style={{ maxWidth:560, margin:"0 auto" }} className="fade">
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ fontSize:11, color:"#3b5fd6", fontFamily:"DM Mono", marginBottom:6, letterSpacing:1 }}>STEP 1 OF 2</div>
              <h1 style={{ fontSize:26, fontWeight:700, letterSpacing:"-.4px" }}>Your Admission Profile</h1>
              <p style={{ color:"#8892b0", marginTop:6, fontSize:13 }}>Fill your details to get personalised college list from {COLLEGES.length}+ Maharashtra colleges</p>
            </div>
            <div className="card" style={{ padding:26, display:"flex", flexDirection:"column", gap:18 }}>
              <div>
                <label style={{ fontSize:12, color:"#8892b0", marginBottom:5, display:"block" }}>Your Name</label>
                <input className="inp" placeholder="e.g. Rohan Patil" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
              <div>
                <label style={{ fontSize:12, color:"#8892b0", marginBottom:5, display:"block" }}>MHT-CET Percentile</label>
                <input className="inp" type="number" placeholder="e.g. 97.50" min="0" max="100" step="0.01" value={percentile} onChange={e=>setPercentile(e.target.value)}/>
                <div style={{ fontSize:11, color:"#3b5fd6", marginTop:3 }}>Enter exact percentile (0–100)</div>
              </div>
              <div>
                <label style={{ fontSize:12, color:"#8892b0", marginBottom:8, display:"block" }}>Caste Category</label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {CATEGORIES.map(c=><button key={c} className={`pill ${category===c?"on":""}`} onClick={()=>setCategory(c)}>{c}</button>)}
                </div>
              </div>
              <div>
                <label style={{ fontSize:12, color:"#8892b0", marginBottom:8, display:"block" }}>Preferred Branch</label>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {BRANCHES.map(b=>(
                    <button key={b.key} className={`pill ${branch===b.key?"on":""}`} style={{ textAlign:"left", borderRadius:9, padding:"9px 13px" }} onClick={()=>setBranch(b.key)}>
                      <span style={{ marginRight:8 }}>{b.icon}</span>{b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize:12, color:"#8892b0", marginBottom:8, display:"block" }}>Admission Type</label>
                <div style={{ display:"flex", gap:8 }}>
                  {["CAP","MQ"].map(t=>(
                    <button key={t} className={`pill ${admType===t?"on":""}`} style={{ flex:1, textAlign:"center", borderRadius:9, padding:"10px" }} onClick={()=>setAdmType(t)}>
                      {t === "CAP" ? "🏛️ CAP Round" : "💼 Management Quota"}
                    </button>
                  ))}
                </div>
                {admType === "MQ" && <div style={{ fontSize:11, color:"#f59e0b", marginTop:5 }}>⚠️ Management quota fees are approx 2–3× higher. Seats are limited.</div>}
              </div>
              <button className="btn" style={{ marginTop:4, width:"100%" }} onClick={()=>{ if(!percentile){ alert("Please enter your MHT-CET percentile!"); return; } setStep(2); }}>
                Find My Colleges ({COLLEGES.length}+) →
              </button>
            </div>
          </div>
        )}

        {/* ══════ STEP 2 ══════ */}
        {step === 2 && (
          <div className="fade">
            {/* Profile bar */}
            <div className="card" style={{ padding:"12px 16px", marginBottom:14, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
                {name && <span style={{ fontWeight:600, fontSize:14 }}>Hi {name}!</span>}
                <span style={{ fontSize:13, color:"#8892b0" }}>{BRANCHES.find(b=>b.key===branch)?.icon} {BRANCHES.find(b=>b.key===branch)?.label}</span>
                <span style={{ background:`${userPct>=98?"#00e676":userPct>=95?"#3b82f6":userPct>=90?"#ffd740":"#f59e0b"}22`, color:userPct>=98?"#00e676":userPct>=95?"#60a5fa":userPct>=90?"#ffd740":"#f59e0b", border:`1px solid ${userPct>=98?"#00e67655":userPct>=95?"#3b82f655":userPct>=90?"#ffd74055":"#f59e0b55"}`, borderRadius:5, padding:"2px 8px", fontSize:12, fontWeight:700 }}>{percentile}%ile</span>
                <span className="tag" style={{ background:"#1e3a8a33", color:"#60a5fa", border:"1px solid #1e3a8a66" }}>{category}</span>
                <span className="tag" style={{ background: admType==="MQ"?"#7c3aed33":"#064e3b33", color:admType==="MQ"?"#c4b5fd":"#34d399", border:`1px solid ${admType==="MQ"?"#7c3aed55":"#064e3b55"}` }}>{admType==="MQ"?"💼 Management Quota":"🏛️ CAP Round"}</span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button className={`pill ${tab==="results"?"on":""}`} onClick={()=>setTab("results")}>All ({results.length})</button>
                <button className={`pill ${tab==="saved"?"on":""}`} onClick={()=>setTab("saved")}>❤️ Saved ({saved.length})</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
              {[["Safe","#00e676",stats.safe],["Moderate","#ffd740",stats.moderate],["Ambitious","#ff9800",stats.ambitious],["Total","#60a5fa",stats.total]].map(([l,c,n])=>(
                <div key={l} className="card" style={{ padding:"10px 14px", textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:700, fontFamily:"DM Mono", color:c }}>{n}</div>
                  <div style={{ fontSize:11, color:"#8892b0" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="card" style={{ padding:"12px 16px", marginBottom:12 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
                <input className="inp" style={{ maxWidth:220 }} placeholder="🔍 Search college or city..." value={filters.search} onChange={e=>fset("search",e.target.value)}/>
                <select className="inp" style={{ width:"auto", fontSize:13, padding:"8px 10px" }} value={filters.district} onChange={e=>fset("district",e.target.value)}>
                  {DISTRICTS.map(d=><option key={d}>{d}</option>)}
                </select>
                <select className="inp" style={{ width:"auto", fontSize:13, padding:"8px 10px" }} value={filters.type} onChange={e=>fset("type",e.target.value)}>
                  {TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
                <select className="inp" style={{ width:"auto", fontSize:13, padding:"8px 10px" }} value={filters.tier} onChange={e=>fset("tier",e.target.value)}>
                  {TIERS.map(t=><option key={t}>{t}</option>)}
                </select>
                <select className="inp" style={{ width:"auto", fontSize:13, padding:"8px 10px" }} value={filters.univ} onChange={e=>fset("univ",e.target.value)}>
                  {UNIVS.map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", marginTop:10 }}>
                <label style={{ fontSize:12, color:"#8892b0", display:"flex", alignItems:"center", gap:6 }}>
                  Max Fees:
                  <input type="range" min={30000} max={600000} step={10000} value={filters.maxFees} onChange={e=>fset("maxFees",+e.target.value)} style={{ accentColor:"#3b5fd6", width:100 }}/>
                  <span style={{ color:"#60a5fa", fontFamily:"DM Mono", fontSize:12 }}>₹{(filters.maxFees/1000).toFixed(0)}K</span>
                </label>
                <label style={{ fontSize:12, color:"#8892b0", display:"flex", alignItems:"center", gap:6 }}>
                  Min Placement:
                  <input type="range" min={0} max={95} step={5} value={filters.minPlacement} onChange={e=>fset("minPlacement",+e.target.value)} style={{ accentColor:"#3b5fd6", width:100 }}/>
                  <span style={{ color:"#60a5fa", fontFamily:"DM Mono", fontSize:12 }}>{filters.minPlacement}%</span>
                </label>
                <label style={{ fontSize:12, color:"#8892b0", display:"flex", alignItems:"center", gap:6 }}>
                  Sort:
                  <select className="inp" style={{ width:"auto", padding:"5px 9px", fontSize:12 }} value={filters.sortBy} onChange={e=>fset("sortBy",e.target.value)}>
                    <option value="chance">Best Chance</option>
                    <option value="rank">Rank</option>
                    <option value="fees">Fees ↑</option>
                    <option value="placement">Placement ↓</option>
                    <option value="pkg">Package ↓</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display:"flex", gap:14, marginBottom:10, flexWrap:"wrap" }}>
              {Object.entries(CHANCE_COLOR).map(([l,c])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#8892b0" }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:c, display:"inline-block" }}/>{l}
                </div>
              ))}
              <span style={{ fontSize:11, color:"#4a6fa5", marginLeft:"auto" }}>Showing {display.length} colleges</span>
            </div>

            {/* College cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {display.map((c,i) => {
                const isSaved   = saved.includes(c.id);
                const isCmp     = compare.includes(c.id);
                const chClr     = CHANCE_COLOR[c.chance];
                const hasMQ     = c.mqSeats > 0;

                return (
                  <div key={c.id} className="card fade" style={{ padding:"16px 18px", borderLeft:`3px solid ${chClr}44`, animationDelay:`${i*0.02}s` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                      <div style={{ flex:1, minWidth:220 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                          <span style={{ fontFamily:"DM Mono", fontSize:11, color:"#3b5fd6" }}>#{c.rank}</span>
                          <span style={{ fontWeight:700, fontSize:14 }}>{c.name}</span>
                          <span className="tag" style={{ background:TIER_COLOR[c.tier]+"22", color:TIER_COLOR[c.tier], border:`1px solid ${TIER_COLOR[c.tier]}44` }}>{c.tier}</span>
                          {c.naac && <span className="tag" style={{ background:"#1a2040", color:"#8892b0" }}>NAAC {c.naac}</span>}
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
                          <span style={{ fontSize:12, color:"#8892b0" }}>📍 {c.city}, {c.district}</span>
                          <span className="tag" style={{ background:TYPE_COLOR[c.type]+"22", color:TYPE_COLOR[c.type], border:`1px solid ${TYPE_COLOR[c.type]}44` }}>{c.type}</span>
                          <span style={{ fontSize:11, color:"#4a6fa5" }}>{c.univ}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                        <button onClick={()=>setCompare(p=>p.includes(c.id)?p.filter(x=>x!==c.id):p.length<3?[...p,c.id]:p)}
                          style={{ background:isCmp?"#1e3a8a33":"none", border:`1px solid ${isCmp?"#3b5fd6":"#1a2040"}`, borderRadius:7, padding:"5px 10px", color:isCmp?"#60a5fa":"#4a6fa5", cursor:"pointer", fontSize:11 }}>
                          {isCmp?"✓ Cmp":"+ Cmp"}
                        </button>
                        <button onClick={()=>setSaved(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}
                          style={{ background:"none", border:"none", fontSize:16, cursor:"pointer", filter:isSaved?"none":"grayscale(1)" }}>
                          {isSaved?"❤️":"🤍"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:8, marginTop:12 }}>
                      {/* Cutoff */}
                      <div style={{ background:"#080d1a", borderRadius:9, padding:"9px 11px" }}>
                        <div style={{ fontSize:10, color:"#3b5fd6", marginBottom:3 }}>CUTOFF ({category})</div>
                        <div style={{ fontSize:17, fontWeight:700, fontFamily:"DM Mono", color:chClr }}>{c.adjCutoff.toFixed(1)}</div>
                        <ChanceBar chance={c.chance}/>
                      </div>
                      {/* Fees */}
                      <div style={{ background:"#080d1a", borderRadius:9, padding:"9px 11px" }}>
                        <div style={{ fontSize:10, color:"#3b5fd6", marginBottom:3 }}>{admType==="MQ"?"MQ FEES/YR":"CAP FEES/YR"}</div>
                        <div style={{ fontSize:17, fontWeight:700, fontFamily:"DM Mono" }}>₹{(c.displayFees/1000).toFixed(0)}K</div>
                        {hasMQ && admType==="CAP" && <div style={{ fontSize:10, color:"#f59e0b" }}>MQ: ₹{(c.mqFees/1000).toFixed(0)}K</div>}
                        {!hasMQ && admType==="CAP" && <div style={{ fontSize:10, color:"#4a6fa5" }}>No MQ seats</div>}
                      </div>
                      {/* Seats */}
                      <div style={{ background:"#080d1a", borderRadius:9, padding:"9px 11px" }}>
                        <div style={{ fontSize:10, color:"#3b5fd6", marginBottom:3 }}>SEATS</div>
                        <div style={{ fontSize:13, fontWeight:600 }}>
                          <span style={{ color:"#60a5fa" }}>CAP: {c.capSeats}</span>
                          {hasMQ && <><br/><span style={{ color:"#c4b5fd", fontSize:12 }}>MQ: {c.mqSeats}</span></>}
                        </div>
                      </div>
                      {/* Placement */}
                      <div style={{ background:"#080d1a", borderRadius:9, padding:"9px 11px" }}>
                        <div style={{ fontSize:10, color:"#3b5fd6", marginBottom:3 }}>PLACEMENT</div>
                        <div style={{ fontSize:17, fontWeight:700, fontFamily:"DM Mono", color:c.placement>=85?"#00e676":c.placement>=70?"#ffd740":"#ff9800" }}>{c.placement}%</div>
                        <div style={{ fontSize:10, color:"#8892b0" }}>Avg ₹{c.avgPkg}L/yr</div>
                      </div>
                      {/* Other branches */}
                      <div style={{ background:"#080d1a", borderRadius:9, padding:"9px 11px" }}>
                        <div style={{ fontSize:10, color:"#3b5fd6", marginBottom:3 }}>ALL BRANCH CUTOFFS</div>
                        <div style={{ fontSize:10, color:"#8892b0", lineHeight:1.7 }}>
                          {Object.entries(c.cutoffs).map(([k,v])=>(
                            <span key={k} style={{ display:"inline-block", marginRight:6, color: k===branch?"#60a5fa":"#8892b0" }}>
                              {k}: <span style={{ fontFamily:"DM Mono", color:k===branch?"#60a5fa":"#6b7280" }}>{(v-offset).toFixed(0)}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {display.length === 0 && (
                <div style={{ textAlign:"center", padding:48, color:"#4a6fa5" }}>
                  <div style={{ fontSize:38, marginBottom:10 }}>🔍</div>
                  <div style={{ fontWeight:600, fontSize:15 }}>No colleges match your filters</div>
                  <div style={{ fontSize:13, marginTop:5 }}>Try relaxing filters or changing district</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ══ COMPARE MODAL ══ */}
      {showCompare && compareList.length > 0 && (
        <div style={{ position:"fixed", inset:0, background:"#000000dd", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:12 }} onClick={()=>setShowCompare(false)}>
          <div style={{ background:"#0e1428", border:"1px solid #1a2040", borderRadius:16, padding:24, maxWidth:920, width:"100%", maxHeight:"88vh", overflow:"auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18, alignItems:"center" }}>
              <h2 style={{ fontWeight:700, fontSize:18 }}>Compare Colleges</h2>
              <button onClick={()=>setShowCompare(false)} style={{ background:"none", border:"none", color:"#8892b0", fontSize:22, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 6px" }}>
                <thead>
                  <tr>
                    <td style={{ color:"#3b5fd6", fontSize:11, padding:"4px 10px", fontFamily:"DM Mono" }}>CRITERIA</td>
                    {compareList.map(c=>(
                      <td key={c.id} style={{ fontWeight:700, fontSize:13, padding:"4px 10px" }}>{c.name}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["City/District",    c=>`${c.city}, ${c.district}`],
                    ["Type",             c=>c.type],
                    ["University",       c=>c.univ],
                    ["Tier",             c=>c.tier],
                    ["NAAC",             c=>c.naac||"—"],
                    [`${branch} Cutoff (${category})`, c=>`${(c.cutoffs[branch]-offset).toFixed(1)}%ile`],
                    ["Your Chance",      c=>getChance(userPct,c.cutoffs[branch],offset)],
                    ["CAP Fees/yr",      c=>`₹${(c.fees/1000).toFixed(0)}K`],
                    ["MQ Fees/yr",       c=>c.mqFees?`₹${(c.mqFees/1000).toFixed(0)}K`:"N/A"],
                    ["CAP Seats",        c=>c.capSeats],
                    ["MQ Seats",         c=>c.mqSeats||"—"],
                    ["Placement %",      c=>`${c.placement}%`],
                    ["Avg Package",      c=>`₹${c.avgPkg}L/yr`],
                  ].map(([label,fn])=>(
                    <tr key={label} style={{ background:"#080d1a" }}>
                      <td style={{ padding:"9px 10px", fontSize:12, color:"#8892b0", borderRadius:"7px 0 0 7px", whiteSpace:"nowrap" }}>{label}</td>
                      {compareList.map(c=>{
                        const val = fn(c);
                        const isChance = label==="Your Chance";
                        return (
                          <td key={c.id} style={{ padding:"9px 10px", fontSize:13, fontWeight:600, color:isChance?CHANCE_COLOR[val]:"#e4e8f5" }}>
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop:14, fontSize:11, color:"#4a6fa5", textAlign:"center" }}>Select up to 3 colleges to compare. Click outside to close.</div>
          </div>
        </div>
      )}

      <div style={{ textAlign:"center", padding:"28px 14px 16px", fontSize:11, color:"#1e2640", lineHeight:1.7 }}>
        ⚠️ Data is based on historical CAP round trends (2022–2024) and is approximate. Always verify on{" "}
        <span style={{ color:"#3b5fd6" }}>cetcell.mahacet.org</span> before applying.
        Management quota cutoffs/fees vary — contact college directly.
      </div>
    </div>
  );
}
