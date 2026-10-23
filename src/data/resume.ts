export interface Publication {
  title: string;
  venue: string;
  publisher: string;
  date: string;
  year: number;
  kind: string;
  authors: string[];
  pages: string;
  doi: string;
  url: string;
  pdf?: string;
  abstract: string;
  stamp: string;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const resumeData = {
  basics: {
    name: "Aayushi Waghela",
    summary: [
    "I'm a software engineer passionate about building impactful, end-to-end solutions. My interests span full-stack development, distributed systems, and AI/ML, with a focus on creating scalable, reliable, and user-centered applications."
    ],
    location: "Seattle, WA",
    email: "aayushiwaghela3@gmail.com",
    links: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/aayushiwaghela" },
      { name: "GitHub", url: "https://github.com/Awaghela" }
    ]
  },
  
  experience: [
    {
      company: "Prepify",
      role: "Software Development Engineer",
      dates: "Jun 2026 — Present",
      location: "",
      current: true,
      stack: [
        "React Native", "TypeScript", "Node.js",
        "Express.js", "PostgreSQL", "Claude API"
      ],
      bullets: [
        "Develop an AI-powered meal planning platform using React Native, TypeScript, Node.js, Express.js, PostgreSQL, and Claude API.",
        "Build full-stack experiences for customers, nutritionists, and administrators, including personalized 7-, 14-, and 30-day meal plans.",
        "Implement recipe management and automated shopping lists, connecting user workflows with AI-generated recommendations.",
        "Design REST APIs, relational data models, and validation workflows to support reliable application functionality."
      ]
    },
    {
      company: "Running Up for Air",
      role: "Software Development Engineer Intern",
      dates: "Aug 2025 — Apr 2026",
      location: "Boulder, CO",
      current: false,
      stack: [
        "React", "TypeScript", "Python",
        "PostgreSQL", "REST APIs"
      ],
      bullets: [
        "Developed full-stack features for a trail-running application using React, TypeScript, Python, PostgreSQL, and REST APIs.",
        "Implemented route tracking, checkpoint ETA calculations, and reporting workflows despite unreliable GPS data and connectivity.",
        "Improved workflow reliability by approximately 40% across 20+ route files through input validation, duplicate-event handling, and SQL consistency checks.",
        "Collaborated with an external project sponsor to translate requirements into functional features."
      ]
    },
    {
      company: "University of Colorado Boulder",
      role: "Course Manager",
      dates: "Aug 2024 — May 2026",
      location: "Boulder, CO",
      current: false,
      stack: ["SQL", "Database Systems", "Teaching", "Canvas"],
      bullets: [
        "Supported Database Systems courses by helping students understand assignments, SQL concepts, and relational database design.",
        "Prepared learning materials and provided constructive feedback on coursework and technical submissions.",
        "Coordinated grading and course workflows to keep assessments consistent and timely."
      ]
    },
    {
      company: "Amazon Web Services (AWS)",
      role: "Software Development Engineer Intern",
      dates: "May 2025 — Aug 2025",
      location: "Seattle, WA",
      current: false,
      stack: ["C++", "Python", "gRPC", "FFmpeg", "Docker"],
      bullets: [
        "Engineered a standalone media decoder microservice in C++ and Python to process multiple audio formats for real-time transcription workflows.",
        "Built high-performance gRPC service interfaces and integrated FFmpeg-based codec handling for low-latency backend media processing.",
        "Developed and debugged in-memory audio-byte streaming, format decoding, and PCM conversion workflows.",
        "Containerized and deployed the service with Docker, resolving runtime, dependency, and compatibility issues across environments."
      ]
    },
    {
      company: "BinaryDots Technologies",
      role: "UI/UX Intern, Frontend Developer",
      dates: "Jul 2022 — Sep 2022",
      location: "Mumbai, India",
      current: false,
      stack: ["React", "JavaScript", "HTML", "CSS"],
      bullets: [
        "Developed 12+ responsive application screens using React, JavaScript, HTML, and CSS.",
        "Built reusable UI components and interactive workflows, using mocked API data to test independently of backend development.",
        "Reduced recurring UI defects by approximately 25% through debugging, cross-browser testing, and interface improvements."
      ]
    }
  ],
  
projects: [
  {
    tag: "Full-Stack AI",
    tagClass: "tag-a",
    title: "VoiceDesk AI",
    desc: "Voice-first AI service desk that transcribes maintenance requests, reasons over intent and urgency, and generates structured tickets with spoken responses.",
    stack: ["React", "TypeScript", "FastAPI", "Python", "Groq", "ElevenLabs"],
    url: "https://voicedeskai-production.up.railway.app/",
    status: "View repository",
    metric: "STT → LLM → TTS",
    problem: "Residents need a natural way to report maintenance issues while the system accurately detects emergencies, handles follow-up conversations, and produces actionable tickets.",
    approach: "Built a speech-to-text, LLM reasoning, and text-to-speech pipeline with Pydantic validation, deterministic safety overrides, fallback rules, and latency monitoring.",
    flow: [
      "Voice input",
      "Speech transcription",
      "LLM reasoning",
      "Safety validation",
      "Ticket and voice response"
    ]
  },
  {
    tag: "Real-Time AI",
    tagClass: "tag-b",
    title: "MeetPulse AI",
    desc: "AI meeting copilot that transcribes live audio, generates context-aware suggestions, and streams detailed answers during conversations.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Groq", "Whisper", "SSE"],
    url: "https://aayushiwmeetpulse-ai.vercel.app/",
    status: "View repository",
    metric: "3 suggestions every ~30s",
    problem: "During live conversations, users need relevant suggestions quickly without losing context or receiving repetitive, generic responses.",
    approach: "Implemented browser-based audio capture, Groq Whisper transcription, contextual prompt engineering, suggestion deduplication, and token-streamed responses.",
    flow: [
      "Live audio",
      "Transcription",
      "Context extraction",
      "AI suggestions",
      "Streaming responses"
    ]
  },
  {
    tag: "Distributed Systems",
    tagClass: "tag-c",
    title: "DispatchFlow",
    desc: "Real-time delivery dispatch platform with concurrency-safe courier assignment, idempotent requests, and live delivery status updates.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "AWS SQS", "WebSockets"],
    url: "https://github.com/Awaghela/DispatchFlow",
    status: "View repository",
    metric: "Concurrency-safe matching",
    problem: "Concurrent orders can accidentally assign the same courier, while retries and delayed events can create duplicate assignments or inconsistent delivery states.",
    approach: "Designed atomic courier reservations using PostgreSQL row-level locking, idempotency keys, controlled status transitions, asynchronous messaging, and retry handling.",
    flow: [
      "Customer order",
      "Courier matching",
      "Atomic assignment",
      "Event processing",
      "Live updates"
    ]
  },
  {
    tag: "Data Engineering",
    tagClass: "tag-b",
    title: "Customer Event Pipeline",
    desc: "Distributed ETL pipeline processing 100K+ simulated customer events into validated analytical datasets and optimized reporting tables.",
    stack: ["Python", "Apache Spark", "Spark SQL", "DuckDB", "AWS S3"],
    url: "https://github.com/Awaghela/CustomerEventPipeline",
    status: "View repository",
    metric: "100K+ events · 35% faster queries",
    problem: "Duplicate records, inconsistent schemas, and invalid customer events can compromise business analytics and increase query execution times.",
    approach: "Built schema normalization, Spark SQL deduplication, validation and quarantine workflows, partitioned Parquet storage, and optimized analytical queries.",
    flow: [
      "Event generation",
      "Data validation",
      "Spark processing",
      "Parquet storage",
      "Business analytics"
    ]
  },
  {
    tag: "Rust & Full-Stack",
    tagClass: "tag-a",
    title: "Triply",
    desc: "Collaborative trip planning and expense-sharing platform with transactional APIs, flexible expense splitting, and real-time balance updates.",
    stack: ["Rust", "Axum", "Next.js", "PostgreSQL", "WebSockets", "Docker"],
    url: "https://triply-gamma-nine.vercel.app/",
    status: "View repository",
    metric: "500+ expenses · 20 trips",
    problem: "Collaborative expense tracking requires consistent balances when multiple users submit expenses, retry requests, or update shared transactions.",
    approach: "Implemented transactional persistence, idempotency keys, four expense-splitting modes, real-time WebSocket updates, and a tamper-evident activity log.",
    flow: [
      "Create trip",
      "Record expense",
      "Validate split",
      "Commit transaction",
      "Update balances"
    ]
  }
],
  /* RESEARCH — published works (sources: Springer Nature, IJSRCSEIT) */
  publications: [
    {
      title: "Crop Yield Prediction in India: A Comparative Analysis of Ensemble Techniques",
      venue: "Deep Learning and Visual Artificial Intelligence (ICDLAI 2024)",
      publisher: "Springer Nature",
      date: "18 September 2024",
      year: 2024,
      kind: "Conference paper · Book chapter",
      authors: ["Aayushi Waghela", "Dev Makadia", "Pusti Sheth", "Monika Mangla", "Divyansh Sharma"],
      pages: "367–380",
      doi: "10.1007/978-981-97-4533-3_28",
      url: "https://link.springer.com/chapter/10.1007/978-981-97-4533-3_28",
      abstract:
        "Compares ensemble-learning techniques for agricultural yield prediction in India. The study evaluates methods including random forests, AdaBoost and stacking, bringing data preprocessing and predictive modelling to agricultural decision-making.",
      stamp: "Agriculture / ML"
    },
    {
      title: "Predictive Analysis of Oil and Gas Using Well Log Data",
      venue: "Intelligent IT Solutions for Sustainability in Industry 5.0 Paradigm (ICEIL 2023)",
      publisher: "Springer Nature",
      date: "5 July 2024",
      year: 2024,
      kind: "Conference paper · Book chapter",
      authors: ["Rujuta Joshi", "Vraj Desai", "Aayushi Waghela", "Prachi Tawde"],
      pages: "387–397",
      doi: "10.1007/978-981-97-1682-1_32",
      url: "https://link.springer.com/chapter/10.1007/978-981-97-1682-1_32",
      abstract:
        "Investigates predictive modelling for oil and gas well-log data using automated machine-learning classification. Compares candidate classifiers including AdaBoost, bagging, XGBoost, random forest and decision trees.",
      stamp: "Energy / AutoML"
    },
    {
      title: "Utilizing Machine Learning and Big Data Analysis for Risk Mitigation and Fraud Detection in Finance",
      venue: "International Journal of Scientific Research in Computer Science, Engineering and Information Technology (IJSRCSEIT)",
      publisher: "IJSRCSEIT",
      date: "6 October 2023",
      year: 2023,
      kind: "Journal article · Vol. 9, Issue 5",
      authors: ["Aayushi Waghela", "Dev Makadia", "Monika Mangla"],
      pages: "236–243",
      doi: "10.32628/CSEIT2390529",
      url: "https://doi.org/10.32628/CSEIT2390529",
      pdf: "https://ijsrcseit.com/paper/CSEIT2390529.pdf",
      abstract:
        "Explores how machine learning and large-scale data analysis can identify suspicious financial patterns and support approaches to fraud detection and risk mitigation.",
      stamp: "Finance / Fraud"
    }
  ] as Publication[],
  
skills: [
  {
    category: "Languages",
    items: [
      "Python", "C++", "Go", "Rust",
      "JavaScript", "TypeScript", "SQL", "Java"
    ]
  },
  {
    category: "Frontend",
    items: [
      "React", "Next.js", "React Native",
      "HTML", "CSS", "Tailwind CSS"
    ]
  },
  {
    category: "Backend & APIs",
    items: [
      "Node.js", "Express.js", "FastAPI", "Flask",
      "Django", "REST APIs", "GraphQL",
      "gRPC", "WebSockets"
    ]
  },
  {
    category: "Databases & Cloud",
    items: [
      "PostgreSQL", "MySQL", "Redis", "MongoDB",
      "AWS", "GCP", "Docker", "Kubernetes",
      "Terraform"
    ]
  },
  {
    category: "AI & Data Engineering",
    items: [
      "LLM APIs", "LangGraph", "RAG",
      "Prompt Engineering", "Apache Spark",
      "PySpark", "Spark SQL", "ETL Pipelines"
    ]
  },
  {
    category: "Developer Tools & Testing",
    items: [
      "Git", "Linux", "CI/CD",
      "Pytest", "Unit Testing", "Integration Testing",
      "Prometheus", "Grafana", "Claude Code",
      "Cursor", "Codex"
    ]
  }
],

  education: [
    {
      institution: "University of Colorado Boulder",
      degree: "Master's degree, Computer Science",
      dates: "Aug 2024 — May 2026",
      gpa: "3.8",
      coursework: ["Datacenter Scale Computing",
      "Big Data Architecture",
      "Neural Networks & Deep Learning",
      "Natural Language Processing",
      "Design & Analysis of Algorithms",
      "Data Mining"]
    },
    {
      institution: "Dwarkadas J. Sanghvi College of Engineering",
      degree: "Bachelor's degree, Information Technology",
      dates: "Aug 2020 — June 2024",
      gpa: "3.6",
      coursework: ["Data Structures & Algorithms",
      "Parallel & Distributed Computing",
      "Software Engineering",
      "Advanced Machine Learning",
      "MLOps",
      "DevOps"]
    }
  ]
};

export type Project = (typeof resumeData.projects)[number];
export type ExperienceItem = (typeof resumeData.experience)[number];
export type SkillGroup = (typeof resumeData.skills)[number];
export type EducationItem = (typeof resumeData.education)[number];
