
/**
 * Project case-study content.
 * Displayed at /projects/:slug.
 *
 * Interactive architecture diagrams are illustrative
 * walkthroughs, not live backend simulations.
 */

export type ProjectDetail = {
  kind: string;
  overview: string;
  role: string;
  challenge: string[];
  decisions: {
    name: string;
    why: string;
  }[];
  metrics: {
    number: string;
    label: string;
  }[];
  stages: string[];
  diagram: string;
  lesson: string;
};

export const projectDetails: Record<string, ProjectDetail> = {

  // ============================================================
  // 01. VOICEDESK AI
  // ============================================================

  "VoiceDesk AI": {
    kind: "VOICE AI / INTELLIGENT SERVICE DESK",

    overview:
      "VoiceDesk AI is a full-stack conversational maintenance assistant that transforms spoken apartment maintenance requests into structured service tickets. It combines speech recognition, LLM reasoning, backend safety checks, and speech synthesis to deliver a natural voice-first experience. The system supports conversational follow-ups, emergency detection, structured ticket generation, and spoken responses.",

    role:
      "Full-Stack Development · AI Integration · Backend Validation",

    challenge: [
      "Understand natural speech, including follow-up questions, corrections, and cancellation requests.",

      "Accurately classify maintenance requests by category and priority while generating structured, actionable service tickets.",

      "Identify urgent situations without relying entirely on probabilistic LLM classifications.",

      "Maintain usable functionality when external AI services are unavailable or return invalid responses.",

      "Minimize end-to-end latency across speech recognition, reasoning, validation, and speech synthesis."
    ],

    decisions: [
      {
        name: "End-to-end voice processing",

        why:
          "ElevenLabs speech-to-text converts recorded audio into text before Groq processes conversation intent, maintenance category, priority, and the next action. The processed result is used to generate a structured ticket and spoken response."
      },
      {
        name: "Structured LLM responses",

        why:
          "Pydantic validation checks model-generated JSON before it is accepted by the backend. This ensures that ticket information follows predictable schemas instead of relying on unstructured model responses."
      },
      {
        name: "Deterministic emergency overrides",

        why:
          "Backend safety rules independently detect critical maintenance situations and enforce emergency handling even when the LLM produces an incorrect classification."
      },
      {
        name: "Fallback handling",

        why:
          "Rule-based triage provides a fallback when the Groq service is unavailable or returns unusable output, allowing the application to handle maintenance requests more reliably."
      },
      {
        name: "Latency observability",

        why:
          "Stage-level timing measurements help identify bottlenecks across transcription, reasoning, and speech generation, making performance issues easier to investigate."
      }
    ],

    metrics: [
      {
        number: "3",
        label: "Core AI processing stages"
      },
      {
        number: "4",
        label: "Maintenance priority levels"
      },
      {
        number: "STT → TTS",
        label: "Voice processing workflow"
      }
    ],

    stages: [
      "Resident voice input",
      "ElevenLabs transcription",
      "Groq intent analysis",
      "Backend safety validation",
      "Ticket and spoken response"
    ],

    diagram: "workflow",

    lesson:
      "Reliable AI applications require more than intelligent model responses. Structured validation, deterministic safety checks, fallback behavior, and observability are essential for building dependable real-world systems."
  },

  // ============================================================
  // 02. MEETPULSE AI
  // ============================================================

  "MeetPulse AI": {
    kind: "REAL-TIME AI / MEETING COPILOT",

    overview:
      "MeetPulse AI is a real-time meeting assistant that captures live audio, transcribes conversations, and generates contextual AI suggestions as discussions progress. Users can select suggestions to receive detailed, streamed responses without interrupting their meeting workflow. The application combines real-time audio processing, contextual prompt engineering, asynchronous APIs, and streaming interfaces.",

    role:
      "Full-Stack Development · Real-Time Audio · LLM Integration",

    challenge: [
      "Capture and process ongoing meeting audio without losing important conversation context.",

      "Generate relevant, actionable suggestions rather than repetitive or generic recommendations.",

      "Maintain responsive interactions while transcription and LLM requests execute asynchronously.",

      "Prevent overlapping suggestion requests and manage updates when new transcript segments arrive.",

      "Stream detailed AI responses incrementally to reduce perceived waiting time."
    ],

    decisions: [
      {
        name: "Browser-based audio processing",

        why:
          "The MediaRecorder API captures audio from the browser, and Groq Whisper processes recorded segments into text. This supports continuous transcription without requiring users to manually upload recordings."
      },
      {
        name: "Context-aware suggestion generation",

        why:
          "Recent transcript segments provide the context for generating three structured suggestions. Prompt design emphasizes relevance, specificity, and actionable responses."
      },
      {
        name: "Suggestion deduplication",

        why:
          "Previous suggestion context helps prevent repeated recommendations, while request guards reduce overlapping asynchronous calls."
      },
      {
        name: "Streaming AI responses",

        why:
          "Server-Sent Events allow detailed answers to appear incrementally instead of waiting for the full model response, improving perceived responsiveness."
      },
      {
        name: "Asynchronous state management",

        why:
          "Frontend request coordination manages recording intervals, transcription updates, and suggestion generation while reducing conflicts between concurrent operations."
      }
    ],

    metrics: [
      {
        number: "3",
        label: "Contextual suggestions per batch"
      },
      {
        number: "~30s",
        label: "Default suggestion interval"
      },
      {
        number: "~200ms",
        label: "Documented first-token latency"
      }
    ],

    stages: [
      "Capture live audio",
      "Whisper transcription",
      "Analyze recent context",
      "Generate AI suggestions",
      "Stream detailed response"
    ],

    diagram: "workflow",

    lesson:
      "Building responsive real-time AI applications requires careful asynchronous coordination, efficient context management, and streaming interactions that keep users engaged while background processing continues."
  },

  // ============================================================
  // 03. DISPATCHFLOW
  // ============================================================

  DispatchFlow: {
    kind: "DISTRIBUTED SYSTEMS / DELIVERY DISPATCH",

    overview:
      "DispatchFlow is a real-time delivery dispatch platform that connects incoming customer orders with available couriers. The system manages courier matching, concurrent assignments, delivery status transitions, and live updates. Its architecture focuses on maintaining correctness under duplicate requests, overlapping transactions, delayed messages, and service interruptions.",

    role:
      "Backend Architecture · Distributed Systems · API Development",

    challenge: [
      "Two incoming orders can simultaneously select the same available courier, resulting in conflicting assignments.",

      "Clients may retry requests after network timeouts, potentially creating duplicate deliveries.",

      "Delayed or out-of-order events can cause delivery statuses to transition incorrectly.",

      "Downstream service interruptions should not corrupt assignment state or permanently block processing.",

      "Customers and merchants need timely updates without tightly coupling notification workflows to the matching process."
    ],

    decisions: [
      {
        name: "Concurrency-safe courier assignment",

        why:
          "PostgreSQL row-level locking serializes competing assignment transactions, preventing simultaneous orders from reserving the same courier."
      },
      {
        name: "Idempotent request handling",

        why:
          "Idempotency keys allow clients to safely retry requests without creating duplicate orders or assignments."
      },
      {
        name: "Asynchronous message processing",

        why:
          "AWS SQS decouples downstream processing from the critical assignment path. Retry-aware consumers help handle temporary failures and delayed message delivery."
      },
      {
        name: "Controlled delivery state transitions",

        why:
          "Explicit transition rules prevent stale events from moving a delivery backward into an earlier state."
      },
      {
        name: "Real-time delivery updates",

        why:
          "WebSocket connections distribute status changes to connected clients, while Redis supports fast access to frequently changing operational state."
      }
    ],

    metrics: [
      {
        number: "1",
        label: "Courier per active assignment"
      },
      {
        number: "4",
        label: "Core reliability safeguards"
      },
      {
        number: "Real-time",
        label: "Delivery status updates"
      }
    ],

    stages: [
      "Customer order received",
      "Find eligible couriers",
      "Lock and assign courier",
      "Publish dispatch event",
      "Update delivery status"
    ],

    diagram: "dispatch",

    lesson:
      "Distributed-system reliability is not only about processing requests quickly. It requires maintaining correct and consistent outcomes when requests overlap, users retry operations, and messages arrive late."
  },

  // ============================================================
  // 04. CUSTOMER EVENT PIPELINE
  // ============================================================

  "Customer Event Pipeline": {
    kind: "DATA ENGINEERING / DISTRIBUTED ANALYTICS",

    overview:
      "Customer Event Pipeline is an end-to-end distributed data engineering system that processes more than 100,000 simulated customer, product, transaction, and clickstream events. It transforms raw, inconsistent records into validated analytical datasets using Python, Apache Spark, Spark SQL, DuckDB, and AWS S3. The pipeline handles deduplication, schema normalization, invalid-record quarantine, partitioned storage, and analytical reporting.",

    role:
      "Data Engineering · ETL Development · Data Quality",

    challenge: [
      "Raw event streams contain duplicate transactions that can inflate revenue, conversion, and engagement metrics.",

      "Missing attributes, inconsistent schemas, and invalid references can break analytical joins and reporting.",

      "Large, unpartitioned datasets increase query execution times and unnecessary data scans.",

      "Invalid records must be separated without silently losing information needed for debugging.",

      "Data transformations should produce consistent and repeatable results across pipeline executions."
    ],

    decisions: [
      {
        name: "Realistic event generation",

        why:
          "A Python event generator creates customer activity including product views, add-to-cart actions, purchases, and transactions, with injected data-quality issues for testing."
      },
      {
        name: "Distributed Spark processing",

        why:
          "Apache Spark processes large event datasets using schema normalization, distributed transformations, and Spark SQL analytical operations."
      },
      {
        name: "Window-based deduplication",

        why:
          "Spark SQL window functions identify repeated event identifiers and retain canonical records before analytical aggregation."
      },
      {
        name: "Data validation and quarantine",

        why:
          "Invalid records are isolated with rejection reasons rather than silently discarded, preventing unreliable data from contaminating downstream metrics."
      },
      {
        name: "Partitioned Parquet storage",

        why:
          "Partitioning and columnar Parquet storage reduce unnecessary scans and improve analytical query efficiency."
      },
      {
        name: "Automated quality verification",

        why:
          "DuckDB and SQL validation checks verify processed datasets and analytical outputs before reporting."
      }
    ],

    metrics: [
      {
        number: "100K+",
        label: "Simulated customer events"
      },
      {
        number: "+42%",
        label: "Pipeline reliability"
      },
      {
        number: "−35%",
        label: "Analytical query time"
      }
    ],

    stages: [
      "Python event generator",
      "Raw data storage",
      "Validation and quarantine",
      "Spark SQL transformations",
      "Partitioned analytics"
    ],

    diagram: "pipeline",

    lesson:
      "Reliable analytics begin with trustworthy data. Data validation, deduplication, observability, and efficient storage must be designed into the pipeline rather than treated as cleanup steps."
  },

  // ============================================================
  // 05. TRIPLY
  // ============================================================

  Triply: {
    kind: "RUST / FULL-STACK EXPENSE PLATFORM",

    overview:
      "Triply is a collaborative trip planning and expense-sharing application built with Rust, Axum, Next.js, and PostgreSQL. It helps groups manage shared expenses, calculate balances, and maintain consistent financial records. The backend emphasizes transactional correctness, idempotent operations, validation, and reliable APIs while the frontend provides interactive expense-management workflows.",

    role:
      "Backend Engineering · Rust Development · Full-Stack APIs",

    challenge: [
      "Repeated expense submissions must not double-count the same transaction.",

      "Multiple group members may create or update expenses concurrently, requiring consistent shared balances.",

      "Different expense-splitting methods must produce accurate allocations and handle rounding correctly.",

      "Invalid user input and partial failures must not leave the database in an inconsistent state.",

      "The application needs responsive APIs for managing trips, participants, expenses, and balances."
    ],

    decisions: [
      {
        name: "Rust and Axum backend",

        why:
          "Rust provides strong type safety and predictable performance, while Axum supports structured asynchronous REST API development."
      },
      {
        name: "Transaction-safe persistence",

        why:
          "PostgreSQL transactions ensure that expense records and corresponding balance changes remain consistent when operations succeed or fail."
      },
      {
        name: "Idempotent expense creation",

        why:
          "Idempotency checks prevent duplicate expenses when clients retry requests after timeouts or temporary connectivity failures."
      },
      {
        name: "Flexible expense splitting",

        why:
          "Four supported splitting approaches allow groups to distribute costs according to different scenarios while enforcing input validation."
      },
      {
        name: "Scenario-based testing",

        why:
          "Automated tests cover expense creation, validation, repeated requests, balance updates, and more than 20 group scenarios."
      },
      {
        name: "Responsive full-stack workflows",

        why:
          "Next.js provides interactive trip and expense interfaces, while API-driven updates keep group financial information consistent with backend state."
      }
    ],

    metrics: [
      {
        number: "500+",
        label: "Seeded expenses"
      },
      {
        number: "40+",
        label: "Automated tests"
      },
      {
        number: "<200ms",
        label: "Median API latency in tests"
      }
    ],

    stages: [
      "Create trip and group",
      "Record shared expense",
      "Validate expense split",
      "Commit transaction",
      "Update group balances"
    ],

    diagram: "ledger",

    lesson:
      "Financial workflows require correctness before optimization. Strong validation, transactional consistency, and idempotency allow full-stack applications to behave predictably even when requests fail or repeat."
  }
};
