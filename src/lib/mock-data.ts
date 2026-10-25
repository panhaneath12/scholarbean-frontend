import { MetaResponse, ScholarshipCard, ScholarshipDetail } from '@/types/scholarship';

export const MOCK_SCHOLARSHIPS: ScholarshipDetail[] = [
  {
    id: 'chevening-2026',
    slug: 'chevening-2026',
    name: 'Chevening Scholarship 2026',
    provider: 'UK Foreign, Commonwealth & Development Office',
    country: 'United Kingdom',
    flag: '🇬🇧',
    logo: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    level: ['masters'],
    field: ['Social Sciences', 'Economics & Business', 'Public Policy', 'STEM'],
    funding: 'full',
    amount: 'Full tuition + £1,236/month living allowance + flights',
    duration: '1 year (full-time Master)',
    start_date: 'September 2027',
    deadline: '2026-11-05T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'Myanmar', 'Laos', 'all'],
    eligible_countries: ['ASEAN countries', 'Global partner nations'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['UK', 'Leadership', 'Fully Funded', 'ASEAN Priority'],
    short_description: 'The UK government global scholarship program aimed at future leaders, influencers, and decision-makers.',
    description: `### About Chevening Scholarships

Chevening is the UK government's international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office (FCDO) and partner organisations, Chevening offers a unique opportunity for future leaders, influencers, and decision-makers from all over the world to develop professionally and academically, network extensively, experience UK culture, and build lasting positive relationships with the UK.

A Chevening Scholarship offers full financial support for individuals to study for any eligible master's degree at any UK university whilst also gaining access to a wide range of exclusive academic, professional, and cultural experiences.

#### Why Choose Chevening?
- **World-Class Education:** Study at prestigious UK institutions including Oxford, Cambridge, LSE, and Imperial College.
- **Global Alumni Network:** Join a prestigious community of over 55,000 alumni worldwide.
- **Comprehensive Coverage:** Focus entirely on your studies and leadership growth without financial burden.`,
    benefits: [
      'Full university tuition fees paid directly to the institution',
      'Monthly living allowance (£1,236 outside London, £1,534 inside London)',
      'Return economy class flights from home country to the UK',
      'Arrival allowance to assist with settling-in costs',
      'Cost of one visa application and transit fees',
      'Departure allowance upon completion of studies'
    ],
    requirements: [
      'Citizen of a Chevening-eligible country or territory (ASEAN citizens eligible)',
      'Undergraduate degree equivalent to an upper second-class 2:1 honours degree',
      'At least two years (equivalent to 2,800 hours) of work experience',
      'Commitment to return to country of citizenship for a minimum of two years post-study',
      'Apply to three different eligible UK university courses and receive an unconditional offer'
    ],
    documents_required: [
      'Valid international passport with at least 1-year validity',
      'Official undergraduate degree certificate and official academic transcripts',
      'Two professional or academic recommendation reference letters',
      'Four personal statement essays (Leadership, Networking, Study in the UK, Career Plan)',
      'Unconditional offer letter from at least one eligible UK university'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Check Eligibility & Course Selection',
        description: 'Ensure you meet nationality, work experience, and degree requirements. Choose 3 UK university master courses.'
      },
      {
        step: 2,
        title: 'Prepare Your Four Application Essays',
        description: 'Draft essays focusing on leadership influence, networking capability, why the UK, and 2, 5, 10-year career goals.'
      },
      {
        step: 3,
        title: 'Submit Online via Chevening Portal',
        description: 'Register and submit your application at chevening.org/apply before the early November deadline.'
      },
      {
        step: 4,
        title: 'Independent University Applications',
        description: 'Apply separately to your 3 selected UK universities to secure at least one unconditional offer.'
      },
      {
        step: 5,
        title: 'Interview & Final Award Notification',
        description: 'Shortlisted candidates attend interviews at British Embassies / High Commissions between February and April.'
      }
    ],
    official_link: 'https://www.chevening.org/apply/',
    source_url: 'https://www.chevening.org',
    related_scholarships: [
      {
        id: 'fulbright-2026',
        name: 'Fulbright Foreign Student Program 2026',
        country: 'USA',
        flag: '🇺🇸',
        funding: 'full',
        deadline: '2026-10-15T23:59:00Z'
      },
      {
        id: 'daad-epos-2026',
        name: 'DAAD EPOS Postgraduate Scholarship 2026',
        country: 'Germany',
        flag: '🇩🇪',
        funding: 'full',
        deadline: '2026-10-31T23:59:00Z'
      }
    ],
    view_count: 24190,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-09-20T00:00:00Z'
  },
  {
    id: 'mext-2026',
    slug: 'mext-2026',
    name: 'MEXT Japanese Government Scholarship 2026',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (Japan)',
    country: 'Japan',
    flag: '🇯🇵',
    logo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    level: ['undergraduate', 'masters', 'phd'],
    field: ['STEM', 'Economics & Business', 'Social Sciences', 'Humanities', 'Agriculture'],
    funding: 'full',
    amount: 'Full tuition + ¥117,000–¥145,000/month stipend + flight tickets',
    duration: '4-5 years (UG) / 2-3 years (Grad)',
    start_date: 'April or October 2027',
    deadline: '2026-05-20T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'all'],
    eligible_countries: ['Countries with diplomatic relations with Japan'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['Japan', 'Government', 'Fully Funded', 'Undergraduate & Graduate'],
    short_description: 'Prestigious scholarship awarded by the Japanese government covering 100% tuition, monthly allowance, and travel.',
    description: `### MEXT (Monbukagakusho) Scholarship

The Japanese Ministry of Education, Culture, Sports, Science, and Technology (MEXT) offers scholarships to international students who wish to study at Japanese universities as Research Students, Undergraduate Students, College of Technology Students, or Specialized Training College Students under the Japanese Government (MEXT) Scholarship Program.

Candidates can apply through either **Embassy Recommendation** (via the Japanese embassy in their home country) or **University Recommendation** directly through designated Japanese institutions.

#### Key Highlights
- No prior Japanese language knowledge required for many English-taught degree tracks.
- Includes 6 months to 1 year of intensive Japanese language preparation.
- Complete exemption from matriculation, examination, and university tuition fees.`,
    benefits: [
      'Exemption from university entrance examination and full tuition fees',
      'Monthly allowance of ¥117,000 (Undergraduate) or ¥143,000–¥145,000 (Research/Master/PhD)',
      'Round-trip economy flight ticket between home country and Japan',
      '6-month to 1-year preparatory Japanese language education',
      'Subsidized university housing / National Health Insurance support'
    ],
    requirements: [
      'Nationality of a country that has diplomatic relations with Japan',
      'Age criteria: Under 25 for Undergraduate; Under 35 for Research/Master/PhD',
      'Academic record with minimum GPA of 3.0 / 4.0 or equivalent',
      'Willingness to learn Japanese and adapt to Japanese culture',
      'Certified good health physically and mentally'
    ],
    documents_required: [
      'Application Form and Placement Preference Application Form',
      'Academic Transcripts for all school/university years attended',
      'Graduation certificate or degree diploma (certified copies)',
      'Recommendation letter from principal/dean or academic advisor',
      'Certificate of Health completed by an authorized medical practitioner',
      'Field of Study and Research Plan (for Graduate applicants)'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Review Embassy Announcement in Your Country',
        description: 'Check the Japanese Embassy website in your home country (typically published in April/May).'
      },
      {
        step: 2,
        title: 'Submit Initial Document Package',
        description: 'Submit certified copies of school records, application forms, and research proposal before the deadline.'
      },
      {
        step: 3,
        title: 'Written Examinations & Embassy Interview',
        description: 'Shortlisted candidates take math, English, and Japanese tests, followed by an in-person interview.'
      },
      {
        step: 4,
        title: 'Obtain Letter of Acceptance from Universities',
        description: 'Candidates who pass primary screening contact Japanese professors to secure provisional acceptance.'
      },
      {
        step: 5,
        title: 'Final Selection by MEXT Tokyo',
        description: 'MEXT conducts the secondary screening and confirms university placement and visa dispatch.'
      }
    ],
    official_link: 'https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarships/',
    source_url: 'https://www.studyinjapan.go.jp',
    related_scholarships: [
      {
        id: 'kgsp-gks-2026',
        name: 'Global Korea Scholarship (GKS/KGSP) 2026',
        country: 'South Korea',
        flag: '🇰🇷',
        funding: 'full',
        deadline: '2026-09-30T23:59:00Z'
      },
      {
        id: 'singapore-asean-2026',
        name: 'Singapore MOE ASEAN Undergraduate Scholarship',
        country: 'Singapore',
        flag: '🇸🇬',
        funding: 'full',
        deadline: '2026-06-15T23:59:00Z'
      }
    ],
    view_count: 31200,
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-09-18T00:00:00Z'
  },
  {
    id: 'fulbright-2026',
    slug: 'fulbright-2026',
    name: 'Fulbright Foreign Student Program 2026',
    provider: 'U.S. Department of State & Fulbright Commissions',
    country: 'USA',
    flag: '🇺🇸',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    level: ['masters', 'phd'],
    field: ['STEM', 'Social Sciences', 'Economics & Business', 'Humanities', 'Agriculture'],
    funding: 'full',
    amount: 'Full tuition, monthly living stipend, health insurance & round-trip airfare',
    duration: '1–2 years (Master) / up to 4 years (PhD)',
    start_date: 'August 2027',
    deadline: '2026-10-15T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'all'],
    eligible_countries: ['Over 160 eligible countries'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['USA', 'Government', 'Fully Funded', 'Ivy League & Tier 1'],
    short_description: 'The flagship international educational exchange program sponsored by the U.S. government for graduate students.',
    description: `### Fulbright Foreign Student Program

The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government and is designed to increase mutual understanding between the people of the United States and the people of other countries.

The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States at U.S. universities or other academic institutions.

#### Highlights:
- Over 4,000 foreign students receive Fulbright scholarships each year.
- Coordinated through bi-national Fulbright Commissions/Foundations or U.S. Embassies.
- Complete placement assistance handled by the Institute of International Education (IIE).`,
    benefits: [
      'Full tuition and mandatory university fees coverage',
      'Living stipend calibrated to the local cost of living in the U.S. study city',
      'Accident and sickness insurance (ASPE policy)',
      'Round-trip international airfare directly to the United States',
      'Pre-academic English language and orientation training programs in the USA'
    ],
    requirements: [
      'Citizen of an eligible country with completed 4-year bachelor degree',
      'Demonstrated high academic standing and leadership potential',
      'English proficiency (TOEFL iBT 80+ or IELTS 6.5+)',
      'Commitment to return home for at least 2 years following the J-1 exchange visa rule'
    ],
    documents_required: [
      'Certified university diplomas and academic transcripts in original language and English',
      'Three letters of recommendation from professors or professional supervisors',
      'Study/Research Objective essay (detailed statement of goals)',
      'Personal Statement essay describing intellectual and personal development',
      'Curriculum Vitae / Resume'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Check Local U.S. Embassy / Fulbright Commission',
        description: 'Requirements and timelines vary by country. Check the U.S. Embassy website in your capital.'
      },
      {
        step: 2,
        title: 'Complete the Slate Online Portal Application',
        description: 'Complete all sections including personal essays, transcripts, and referee contacts.'
      },
      {
        step: 3,
        title: 'Interview with Binational Committee',
        description: 'Semi-finalists are invited for an interview evaluating academic fit and cultural ambassador qualities.'
      },
      {
        step: 4,
        title: 'University Placement via IIE',
        description: 'Selected candidates work with IIE advisors to apply to up to 4 matched U.S. universities.'
      }
    ],
    official_link: 'https://foreign.fulbrightonline.org/',
    source_url: 'https://foreign.fulbrightonline.org',
    related_scholarships: [
      {
        id: 'chevening-2026',
        name: 'Chevening Scholarship 2026',
        country: 'United Kingdom',
        flag: '🇬🇧',
        funding: 'full',
        deadline: '2026-11-05T23:59:00Z'
      },
      {
        id: 'australia-awards-2026',
        name: 'Australia Awards Scholarships 2026',
        country: 'Australia',
        flag: '🇦🇺',
        funding: 'full',
        deadline: '2026-04-30T23:59:00Z'
      }
    ],
    view_count: 28400,
    created_at: '2026-01-12T00:00:00Z',
    updated_at: '2026-09-12T00:00:00Z'
  },
  {
    id: 'daad-epos-2026',
    slug: 'daad-epos-2026',
    name: 'DAAD EPOS Postgraduate Scholarship 2026',
    provider: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    flag: '🇩🇪',
    logo: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&auto=format&fit=crop&q=80',
    level: ['masters', 'phd'],
    field: ['STEM', 'Economics & Business', 'Agriculture', 'Public Policy', 'Environmental Science'],
    funding: 'full',
    amount: 'Full tuition waiver + €934–€1,300/month + health & travel allowance',
    duration: '12 to 24 months (Master) / 36 months (PhD)',
    start_date: 'October 2027',
    deadline: '2026-10-31T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'Myanmar', 'Laos', 'all'],
    eligible_countries: ['DAC list developing countries'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['Germany', 'No Tuition Fees', 'Fully Funded', 'Research & Development'],
    short_description: 'Scholarships for development-related postgraduate courses at leading German universities.',
    description: `### DAAD EPOS Scholarships

The German Academic Exchange Service (DAAD) supports excellent graduates from developing countries with scholarships for development-related postgraduate courses (EPOS) at state-recognized German higher education institutions.

The scholarships offer foreign graduates the opportunity to take a postgraduate or Master's degree at a state or state-recognized German university, and in exceptional cases to take a doctoral degree, and to obtain a university qualification (Master's/PhD) in Germany.`,
    benefits: [
      'Tuition-free higher education at world-class German institutions',
      'Monthly scholarship payments of €934 for Master candidates or €1,300 for doctoral candidates',
      'Health, accident, and personal liability insurance coverage',
      'Travel allowance for flights to and from Germany',
      'Monthly rent subsidy and allowance for accompanying family members if eligible',
      'Preparatory German language course in Germany (up to 6 months)'
    ],
    requirements: [
      'Bachelor’s degree completed within the last 6 years with above-average results',
      'At least 2 years of professional work experience in a relevant field after Bachelor',
      'Citizen of a developing or newly industrialized country (Southeast Asia eligible)',
      'Language certificate: English (IELTS 6.0+ / TOEFL 80+) or German (DSH 2 / TestDaF 4)'
    ],
    documents_required: [
      'Signed DAAD Application form with current date',
      'Hand-signed Europass CV with detailed career history',
      'Hand-signed Letter of Motivation (max 2 pages) with current date',
      'Academic letter of recommendation from current university / professor',
      'Professional letter of recommendation from employer with official letterhead',
      'Certified copies of awarded academic degrees and transcripts'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Choose an EPOS Eligible Master Course',
        description: 'Select up to 3 courses from the official DAAD EPOS brochure.'
      },
      {
        step: 2,
        title: 'Apply Directly to the German Universities',
        description: 'Send your full application package directly to the respective university master program portal.'
      },
      {
        step: 3,
        title: 'University Selection Committee Review',
        description: 'A selection committee proposes potential candidates to DAAD.'
      },
      {
        step: 4,
        title: 'DAAD Portal Award Confirmation',
        description: 'Nominated candidates upload their documents to the DAAD portal for official scholarship letters.'
      }
    ],
    official_link: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    source_url: 'https://www.daad.de',
    related_scholarships: [
      {
        id: 'chevening-2026',
        name: 'Chevening Scholarship 2026',
        country: 'United Kingdom',
        flag: '🇬🇧',
        funding: 'full',
        deadline: '2026-11-05T23:59:00Z'
      },
      {
        id: 'swiss-excellence-2026',
        name: 'Swiss Government Excellence Scholarships 2026',
        country: 'Switzerland',
        flag: '🇨🇭',
        funding: 'full',
        deadline: '2026-11-15T23:59:00Z'
      }
    ],
    view_count: 19800,
    created_at: '2026-01-18T00:00:00Z',
    updated_at: '2026-09-14T00:00:00Z'
  },
  {
    id: 'kgsp-gks-2026',
    slug: 'kgsp-gks-2026',
    name: 'Global Korea Scholarship (GKS/KGSP) 2026',
    provider: 'National Institute for International Education (NIIED), South Korea',
    country: 'South Korea',
    flag: '🇰🇷',
    logo: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&auto=format&fit=crop&q=80',
    level: ['undergraduate', 'masters', 'phd'],
    field: ['STEM', 'Economics & Business', 'Social Sciences', 'Humanities', 'Arts & Design'],
    funding: 'full',
    amount: 'Full tuition + 1,000,000 KRW/month stipend + flight tickets + Korean course',
    duration: '4-5 years (UG) / 2-3 years (Grad)',
    start_date: 'March or September 2027',
    deadline: '2026-09-30T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'all'],
    eligible_countries: ['Target partner countries worldwide'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['South Korea', 'K-Culture', 'Fully Funded', 'Language Training Included'],
    short_description: 'South Korean government scholarship inviting international talents for degrees with 1 year Korean language training.',
    description: `### Global Korea Scholarship (GKS)

The Global Korea Scholarship (formerly KGSP) is designed to provide international students with opportunities to pursue higher education at academic institutions in the Republic of Korea, enhancing international education exchange and deepening mutual friendship.

All scholarship recipients undergo a mandatory 1-year Korean language training course at assigned language institutes across South Korea before starting their degree programs.`,
    benefits: [
      '100% full tuition fees covered for entire degree program',
      'Monthly allowance of 1,000,000 KRW (Master/PhD) or 900,000 KRW (Undergraduate)',
      '1-year intensive Korean language training fees fully sponsored',
      'Round-trip economy flight ticket between Seoul and home country',
      'Settlement allowance (200,000 KRW) upon arrival and completion grant (100,000 KRW)',
      'National Health Insurance premium reimbursement'
    ],
    requirements: [
      'Applicant and applicant’s parents must not hold South Korean citizenship',
      'Under 25 years old for Undergraduate; under 40 years old for Graduate',
      'Cumulative Grade Point Average (CGPA) higher than 80% or top 20% of class rank',
      'Demonstrated physical and mental health to withstand intensive study abroad'
    ],
    documents_required: [
      'GKS Applicant Form, Personal Statement, and Statement of Purpose',
      'Official Graduation Certificate or Degree Certificate (Apostilled/Consular authenticated)',
      'Official Academic Transcripts (Apostilled/Consular authenticated)',
      'Two letters of recommendation from teachers or academic mentors',
      'Proof of citizenship (birth certificates and parents passport copies)',
      'Optional valid TOPIK or English proficiency score reports'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Choose Embassy Track or University Track',
        description: 'Embassy track permits applying to 3 universities; University track applies to 1 institution directly.'
      },
      {
        step: 2,
        title: 'Gather and Authenticate Documents',
        description: 'Get school transcripts and certificates consular-authenticated or apostilled.'
      },
      {
        step: 3,
        title: 'Submit Package to Embassy or Korean University',
        description: 'Submit prior to the country deadline (September for UG, February/March for Graduate).'
      },
      {
        step: 4,
        title: 'Interview & NIIED Central Review',
        description: 'Embassy conducts interviews, forwards nominees to NIIED in Seoul for final approval.'
      }
    ],
    official_link: 'https://www.studyinkorea.go.kr/en/scholarship/gks_introduce.do',
    source_url: 'https://www.studyinkorea.go.kr',
    related_scholarships: [
      {
        id: 'mext-2026',
        name: 'MEXT Scholarship 2026',
        country: 'Japan',
        flag: '🇯🇵',
        funding: 'full',
        deadline: '2026-05-20T23:59:00Z'
      },
      {
        id: 'singapore-asean-2026',
        name: 'Singapore MOE ASEAN Undergraduate Scholarship',
        country: 'Singapore',
        flag: '🇸🇬',
        funding: 'full',
        deadline: '2026-06-15T23:59:00Z'
      }
    ],
    view_count: 22100,
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-09-22T00:00:00Z'
  },
  {
    id: 'singapore-asean-2026',
    slug: 'singapore-asean-2026',
    name: 'Singapore MOE ASEAN Undergraduate Scholarship 2026',
    provider: 'Singapore Ministry of Education (MOE)',
    country: 'Singapore',
    flag: '🇸🇬',
    logo: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80',
    level: ['undergraduate'],
    field: ['STEM', 'Economics & Business', 'Social Sciences', 'Humanities', 'Computer Science'],
    funding: 'full',
    amount: 'Full tuition fees + S$5,800/year living allowance + accommodation subsidy',
    duration: '3–4 years (Undergraduate degree)',
    start_date: 'August 2027',
    deadline: '2026-06-15T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'Myanmar', 'Laos', 'Brunei'],
    eligible_countries: ['ASEAN Member Countries'],
    is_featured: true,
    is_asean_friendly: true,
    tags: ['Singapore', 'ASEAN Exclusive', 'NUS / NTU / SMU', 'Undergraduate'],
    short_description: 'Exclusive undergraduate scholarship for top students from ASEAN member countries studying in Singapore.',
    description: `### Singapore ASEAN Undergraduate Scholarship

The ASEAN Undergraduate Scholarship (AUS) is offered by the Government of Singapore to outstanding students from ASEAN member countries (excluding Singapore) to pursue full-time undergraduate studies at Singapore's world-leading autonomous universities:
- National University of Singapore (NUS)
- Nanyang Technological University (NTU)
- Singapore Management University (SMU)
- Singapore University of Technology and Design (SUTD)

Recipients have no tuition obligation other than the 3-year standard Singapore Tuition Grant employment bond requiring graduates to work in a Singapore-registered entity.`,
    benefits: [
      'Subsidized tuition fees after MOE Tuition Grant waiver',
      'Annual living allowance of S$5,800',
      'Annual accommodation allowance based on the cheapest double room on campus',
      'One-time settling-in allowance of S$200 upon arrival',
      'Return economy class airfare from home country to Singapore'
    ],
    requirements: [
      'Citizen of an ASEAN member country (excluding Singapore citizens and permanent residents)',
      'Outstanding high school academic credentials or Cambridge A-Levels / IB equivalent',
      'Demonstrated active leadership, community participation, and co-curricular achievements',
      'Apply concurrently for admission to NUS, NTU, SMU, or SUTD'
    ],
    documents_required: [
      'High school examination results / national exam transcripts',
      'Co-curricular activities records and awards portfolio',
      'Personal essay on leadership and community vision',
      'Referee evaluation letters submitted directly by high school principals or teachers'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Submit Undergraduate Admission Application',
        description: 'Submit an online application for direct admission to NUS, NTU, SMU, or SUTD.'
      },
      {
        step: 2,
        title: 'Tick ASEAN Scholarship in the Portal',
        description: 'Indicate interest in scholarship consideration on the university admissions form.'
      },
      {
        step: 3,
        title: 'Shortlisting & Selection Interview',
        description: 'Shortlisted applicants are invited to interview in their home capital or online.'
      }
    ],
    official_link: 'https://www.moe.gov.sg/financial-matters/awards-scholarships/asean-scholarships',
    source_url: 'https://www.moe.gov.sg',
    related_scholarships: [
      {
        id: 'mext-2026',
        name: 'MEXT Scholarship 2026',
        country: 'Japan',
        flag: '🇯🇵',
        funding: 'full',
        deadline: '2026-05-20T23:59:00Z'
      },
      {
        id: 'chulalongkorn-asean-2026',
        name: 'Chulalongkorn ASEAN Scholarship 2026',
        country: 'Thailand',
        flag: '🇹🇭',
        funding: 'full',
        deadline: '2026-06-30T23:59:00Z'
      }
    ],
    view_count: 29500,
    created_at: '2026-01-25T00:00:00Z',
    updated_at: '2026-09-25T00:00:00Z'
  },
  {
    id: 'australia-awards-2026',
    slug: 'australia-awards-2026',
    name: 'Australia Awards Scholarships 2026',
    provider: 'Department of Foreign Affairs and Trade (DFAT), Australia',
    country: 'Australia',
    flag: '🇦🇺',
    logo: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80',
    level: ['masters', 'phd'],
    field: ['Agriculture', 'Economics & Business', 'STEM', 'Social Sciences', 'Healthcare'],
    funding: 'full',
    amount: 'Full tuition fees + return air travel + contribution to living expenses (CLE)',
    duration: '2 years (Master) / 4 years (PhD)',
    start_date: 'February 2027',
    deadline: '2026-04-30T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Indonesia', 'Philippines', 'Vietnam', 'Laos', 'Myanmar', 'all'],
    eligible_countries: ['Indo-Pacific partner nations'],
    is_featured: false,
    is_asean_friendly: true,
    tags: ['Australia', 'DFAT', 'Fully Funded', 'Development Focused'],
    short_description: 'Long-term awards administered by the Australian Government offering study, research, and professional development.',
    description: `### Australia Awards Scholarships

Australia Awards Scholarships are prestigious international awards offered by the Australian Government to the next generation of global leaders for development. Through study and research, recipients develop the skills and knowledge to drive change and help build enduring people-to-people links with Australia.

Applicants are assessed on their professional and personal qualities, academic competence and, most importantly, their potential to impact development challenges in eligible countries across the Indo-Pacific.`,
    benefits: [
      'Full tuition fees paid directly to the Australian university',
      'Return economy class air travel to and from Australia',
      'Establishment allowance of AUD $5,000 to assist with accommodation and textbooks',
      'Contribution to Living Expenses (CLE) paid on a fortnightly basis',
      'Overseas Student Health Cover (OSHC) for the duration of the scholarship',
      'Pre-course English language training where deemed appropriate'
    ],
    requirements: [
      'Minimum 18 years of age at the time of commencing the scholarship',
      'Citizen of an eligible participating country (Cambodia, Indonesia, Vietnam, etc.)',
      'Not currently serving military personnel',
      'Minimum IELTS score of 6.5 with no band less than 6.0 (or TOEFL / PTE equivalent)',
      'Commitment to leave Australia for a minimum of 2 years post-award'
    ],
    documents_required: [
      'Certified copies of academic transcripts and degree certificates',
      'Official proof of citizenship (valid passport or national ID)',
      'Curriculum Vitae detailing relevant work history and community contributions',
      'Referee reports (academic and employment references on official letterhead)',
      'Development Impact Plan outlining how studies will be applied at home'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Review Country Specific Eligibility',
        description: 'Read the Australia Awards policy handbook and priority development sectors for your country.'
      },
      {
        step: 2,
        title: 'Register on OASIS Portal',
        description: 'Create an account on the Online Australia Awards Scholarships Information System (OASIS).'
      },
      {
        step: 3,
        title: 'Submit Completed Application & Referees',
        description: 'Submit before the April deadline with all certified English translations.'
      }
    ],
    official_link: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    source_url: 'https://www.dfat.gov.au',
    related_scholarships: [
      {
        id: 'chevening-2026',
        name: 'Chevening Scholarship 2026',
        country: 'United Kingdom',
        flag: '🇬🇧',
        funding: 'full',
        deadline: '2026-11-05T23:59:00Z'
      }
    ],
    view_count: 16500,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-09-10T00:00:00Z'
  },
  {
    id: 'chulalongkorn-asean-2026',
    slug: 'chulalongkorn-asean-2026',
    name: 'Chulalongkorn University ASEAN Scholarship 2026',
    provider: 'Chulalongkorn University, Thailand',
    country: 'Thailand',
    flag: '🇹🇭',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80',
    level: ['masters', 'phd'],
    field: ['STEM', 'Economics & Business', 'Social Sciences', 'Humanities', 'Public Health'],
    funding: 'full',
    amount: 'Full tuition + 16,000 THB/month stipend + round-trip economy airfare',
    duration: '2 years (Master) / 3 years (PhD)',
    start_date: 'August 2027',
    deadline: '2026-06-30T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Laos', 'Myanmar', 'Vietnam', 'Indonesia', 'Philippines', 'Malaysia', 'Singapore', 'Brunei'],
    eligible_countries: ['ASEAN Member Countries'],
    is_featured: false,
    is_asean_friendly: true,
    tags: ['Thailand', 'ASEAN Focus', 'Fully Funded', 'Top 1 in Thailand'],
    short_description: 'Full graduate scholarship for citizens of ASEAN countries to study at Thailand’s top-ranked institution.',
    description: `### Chulalongkorn University ASEAN Scholarship

Chulalongkorn University, known as the pillar of the kingdom and ranked #1 in Thailand, offers scholarships to international students from ASEAN and Non-ASEAN countries to study in its wide spectrum of international graduate degree programs.

Studying in Bangkok places scholars at the cultural and economic heart of Southeast Asia with affordable living and high research impact.`,
    benefits: [
      'Full tuition and academic fees waiver',
      'Monthly living stipend of 16,000 Thai Baht',
      'On-campus accommodation or accommodation allowance',
      'Round-trip economy flight ticket from home capital to Bangkok'
    ],
    requirements: [
      'Citizen of an ASEAN or Non-ASEAN developing nation',
      'Under 35 years old with minimum GPA of 3.25 / 4.0 in previous studies',
      'English proficiency: TOEFL iBT 79+ or IELTS 6.0+ or CU-TEP 75+',
      'Certified good health with no contagious diseases'
    ],
    documents_required: [
      'Completed Chulalongkorn Scholarship Application Form with photo',
      'Official university diploma and transcripts',
      'Statement of Purpose and Research Proposal',
      'Two letters of recommendation from academic deans or advisors',
      'Copy of passport and medical certificate'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Apply to Selected International Program',
        description: 'Submit an application directly to the chosen Chulalongkorn graduate program.'
      },
      {
        step: 2,
        title: 'Faculty Nomination',
        description: 'The faculty evaluates the academic merit and nominates the candidate for the university scholarship.'
      }
    ],
    official_link: 'http://www.academic.chula.ac.th/scholarship.html',
    source_url: 'http://www.academic.chula.ac.th',
    related_scholarships: [
      {
        id: 'singapore-asean-2026',
        name: 'Singapore MOE ASEAN Undergraduate Scholarship',
        country: 'Singapore',
        flag: '🇸🇬',
        funding: 'full',
        deadline: '2026-06-15T23:59:00Z'
      }
    ],
    view_count: 14200,
    created_at: '2026-02-10T00:00:00Z',
    updated_at: '2026-09-08T00:00:00Z'
  },
  {
    id: 'erasmus-mundus-2026',
    slug: 'erasmus-mundus-2026',
    name: 'Erasmus Mundus Joint Masters Scholarship 2026',
    provider: 'European Commission',
    country: 'European Union',
    flag: '🇪🇺',
    logo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=120&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=800&auto=format&fit=crop&q=80',
    level: ['masters'],
    field: ['STEM', 'Economics & Business', 'Social Sciences', 'Humanities', 'Agriculture'],
    funding: 'full',
    amount: 'Full tuition + €1,400/month stipend + travel & installation costs',
    duration: '1–2 years across 2–4 European countries',
    start_date: 'September 2027',
    deadline: '2026-01-15T23:59:00Z',
    eligible_nationalities: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'all'],
    eligible_countries: ['Worldwide applicants from Partner & Programme Countries'],
    is_featured: false,
    is_asean_friendly: true,
    tags: ['Europe', 'Multi-Country Degree', 'Fully Funded', 'Dual/Joint Degree'],
    short_description: 'High-level integrated master study programs delivered by international consortiums across multiple European nations.',
    description: `### Erasmus Mundus Joint Masters (EMJM)

Erasmus Mundus Joint Masters are high-level integrated study programmes at master level. The programmes are designed and delivered by an international partnership of higher education institutions from different countries worldwide.

As an Erasmus scholar, you will study in at least two different European countries, graduating with either a joint degree (i.e. one single degree certificate issued on behalf of at least two higher education institutions) or multiple degrees.`,
    benefits: [
      'Full participation costs including tuition, library access, and laboratory fees',
      'Monthly living allowance of €1,400 for up to 24 months',
      'Full worldwide medical and travel insurance policy',
      'Joint or double Master degree recognised throughout Europe and globally'
    ],
    requirements: [
      'First higher education degree (Bachelor) or equivalent level of learning',
      'Excellent academic track record and relevant prerequisite coursework',
      'Proficiency in the language of instruction (primarily English IELTS 6.5+)',
      'Adherence to the Erasmus Mundus 12-month residency rule'
    ],
    documents_required: [
      'Detailed curriculum vitae (Europass format recommended)',
      'Certified transcripts of higher education studies and degree diploma',
      'Letter of Motivation tailored to the specific consortium consortium curriculum',
      'Two academic recommendation letters'
    ],
    how_to_apply: [
      {
        step: 1,
        title: 'Consult the EMJM Catalogue',
        description: 'Search the online Erasmus Mundus catalogue of over 150 active master programmes.'
      },
      {
        step: 2,
        title: 'Apply Directly to Programme Consortium',
        description: 'Select up to 3 different Erasmus programmes and apply through their respective websites.'
      }
    ],
    official_link: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters',
    source_url: 'https://erasmus-plus.ec.europa.eu',
    related_scholarships: [
      {
        id: 'chevening-2026',
        name: 'Chevening Scholarship 2026',
        country: 'United Kingdom',
        flag: '🇬🇧',
        funding: 'full',
        deadline: '2026-11-05T23:59:00Z'
      },
      {
        id: 'daad-epos-2026',
        name: 'DAAD EPOS Postgraduate Scholarship 2026',
        country: 'Germany',
        flag: '🇩🇪',
        funding: 'full',
        deadline: '2026-10-31T23:59:00Z'
      }
    ],
    view_count: 18700,
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-09-05T00:00:00Z'
  }
];

export const MOCK_META: MetaResponse = {
  total_scholarships: 342,
  total_countries: 45,
  categories: [
    { name: 'Fully Funded', count: 128, icon: '🏆' },
    { name: 'ASEAN Eligible', count: 210, icon: '🌏' },
    { name: 'STEM', count: 95, icon: '🔬' },
    { name: 'Economics & Business', count: 72, icon: '📊' },
    { name: 'Social Sciences', count: 67, icon: '⚖️' },
    { name: 'Undergraduate', count: 89, icon: '📚' },
    { name: 'Masters', count: 156, icon: '🎓' },
    { name: 'PhD', count: 97, icon: '🔬' }
  ],
  popular_countries: [
    { name: 'Japan', flag: '🇯🇵', count: 34 },
    { name: 'United Kingdom', flag: '🇬🇧', count: 28 },
    { name: 'USA', flag: '🇺🇸', count: 25 },
    { name: 'Germany', flag: '🇩🇪', count: 22 },
    { name: 'South Korea', flag: '🇰🇷', count: 19 },
    { name: 'Singapore', flag: '🇸🇬', count: 17 },
    { name: 'Australia', flag: '🇦🇺', count: 15 },
    { name: 'Thailand', flag: '🇹🇭', count: 12 }
  ]
};
