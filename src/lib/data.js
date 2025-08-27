export const projects = [
  {
    slug: "smart-result-locator",
    title: "Smart Result Locator System",
    tagline: "Raspberry Pi + Flask + Servo control",
    short:
      "Automated dispensing of printed results by matric number & faculty selection.",
    description:
      "A hardware‑integrated Flask app running on Raspberry Pi controlling servo motors to dispense printed statement of results. Includes search by matric number, faculty selection, and secure access.",
    image: "/project-placeholders/hardware.svg",
    stack: ["Flask", "Python", "Raspberry Pi", "Bootstrap"],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "welFake-detector",
    title: "Fake News Detection (WELFake)",
    tagline: "NLP classification with TF/Keras",
    short:
      "Classifies news articles as real or fake using the WELFake dataset (~72k articles).",
    description:
      "Built a text classification pipeline (cleaning, tokenization, LSTM/BERT variants) to detect fake news. Includes an explainable dashboard.",
    image: "/project-placeholders/nlp.svg",
    stack: ["TensorFlow", "Keras", "Python", "Streamlit"],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "hausa-speech-emotion",
    title: "Hausa Speech Emotion Recognition",
    tagline: "LSTM + MFCC features (Librosa)",
    short: "Detects emotions from Hausa speech audio using MFCCs and LSTM.",
    description:
      "A custom dataset and LSTM model trained on MFCC features to classify emotions in Hausa speech. Includes an interactive demo to upload audio and get predictions.",
    image: "/project-placeholders/audio.svg",
    stack: ["Python", "Librosa", "TensorFlow", "Streamlit"],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "intelligent-email-scraper",
    title: "Intelligent Email Scraper",
    tagline: "Next.js crawler + validation",
    short:
      "Ethical web crawler that extracts and validates emails from public pages.",
    description:
      "A focused crawler with pattern recognition and basic NLP to extract likely email addresses while reducing false positives. Includes validation routines and export to CSV.",
    image: "/project-placeholders/crawler.svg",
    stack: ["Next.js", "Node.js", "Bootstrap"],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "code-sharing-platform",
    title: "Code Sharing Platform",
    tagline: "Next.js 14 + MongoDB",
    short:
      "Simple full‑stack code sharing with auth, posts, likes, and comments.",
    description:
      "A lightweight platform where users can share snippets, like, and discuss. Clean UI, responsive, with dark/light toggle planned.",
    image: "/project-placeholders/code.svg",
    stack: ["Next.js", "MongoDB", "Bootstrap"],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "soybean-disease-recognition",
    title: "Soybean Disease Recognition",
    tagline: "Image classification (Keras)",
    short:
      "Recognizes soybean leaf diseases using a curated dataset (~770 images).",
    description:
      "Built and evaluated CNN models to classify plant diseases; includes Grad‑CAM visualizations to explain predictions.",
    image: "/project-placeholders/vision.svg",
    stack: ["TensorFlow", "Keras", "Python"],
    links: { repo: "#", demo: "#" },
  },
];

export const services = [
  {
    title: "Full‑Stack Web Apps",
    emoji: "🧩",
    description:
      "From idea to deploy — responsive, fast, and reliable applications.",
    highlights: [
      "Next.js 14 + REST/JSON",
      "Auth, CRUD, dashboards",
      "SEO + performance best practices",
    ],
  },
  {
    title: "Data & ML Prototypes",
    emoji: "🧠",
    description:
      "Turn data into insight with quick, clear prototypes and dashboards.",
    highlights: [
      "TensorFlow/Keras & scikit-learn",
      "Streamlit demos",
      "Clean notebooks & reports",
    ],
  },
  {
    title: "APIs & Integrations",
    emoji: "🔌",
    description:
      "Robust REST APIs and third‑party integrations that just work.",
    highlights: [
      "Node/Flask backends",
      "Email/Payments integration",
      "Docs & tests included",
    ],
  },
];

export const teams = [
  {
    name: "Bala Jimmy Yakubu",
    role: "Full-Stack Developer",
    img: "/teams/jimi.jpg",
    desc: "Expert in AI, ML, and turning data into actionable insights.",
    email: "mailto:jimiyaks@gmail.com",
    contact: "2347010228016",
    facebook: "https://facebook.com/Jih Mih",
  },
  {
    name: "Abdullahi Ashiru",
    role: "Senior Software Engineer",
    img: "/teams/ashiru.jpg",
    desc: "CEO at Cloudsoft Consulting Limited. Expert in Building Team Members.",
    email: "mailto:cloudsoftconsultingltd@gmail.com",
    contact: "2349065306495",
    facebook: "https://facebook.com/",
  },

  {
    name: "Enoch Micah",
    role: "Web Developer",
    img: "/teams/micah.jpg",
    desc: "Building intelligent and scalable software solutions",
    email: "mailto:enochmicah3@gmail.com",
    contact: "44123456789",
    facebook: "https://facebook.com/",
  },
  {
    name: "Idris Hassan",
    role: "Full-Stack Web Developer",
    img: "/teams/hassan.jpg",
    desc: "Designs sleek and user-friendly interfaces with attention to detail.",
    email: "mailto:abbahassan312@gmail.com",
    contact: "2349068866503",
    facebook: "https://facebook.com/",
  },
 
  {
    name: "Auwal Yusuf Muhammad",
    role: "Full-Stack Web Developer",
    img: "/teams/yusuf.jpg",
    desc: "Pioneer in computer science and backend system architecture.",
    email: "mailto:yusufmuhammadauwal884@gmail.com",
    contact: "2348130586073",
    facebook: "https://facebook.com/",
  },
  {
    name: "Victor Mebusaiye",
    role: "Web & Mobile App Developer ",
    img: "/teams/victor.jpg",
    desc: "Automates deployments and ensures high system reliability.",
    email: "mailto:vp4208479@gmail.com",
    contact: "2348086018133",
    facebook: "https://facebook.com/",
  },
  {
    name: "Bello Adbullahi",
    role: "Software Engineer",
    img: "/teams/abdullahi.jpg",
    desc: "Transforms complex equations into elegant solutions.",
    email: "mailto:abdullahibello8944@gmail.com",
    contact: "2347060608944",
    facebook: "https://facebook.com/",
  },
];
