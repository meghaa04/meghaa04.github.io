export type SectionId = 'ai' | 'build' | 'design' | 'journey' | 'knowledge' | 'about'

export type View = SectionId | 'skills' | 'signal'

export interface FocusPoint {
  x: number
  y: number
}

export interface Metric {
  label: string
  value: string
}

export type PipelineKind = 'vision' | 'tabular' | 'fusion' | 'output'

export interface PipelineStep {
  id: string
  label: string
  sub: string
  detail: string
  kind: PipelineKind
}

export interface Project {
  id: string
  title: string
  category: string
  summary: string
  problem?: string
  idea?: string
  role?: string
  tech: string[]
  result?: string
  metrics?: Metric[]
  pipeline?: PipelineStep[]
  status: string
  statusNote?: string
  featured?: boolean
}

export interface SkillStar {
  name: string
  blurb: string
}

export interface ConstellationGroup {
  id: string
  title: string
  accent: string
  note: string
  stars: SkillStar[]
}

export const contact = {
  email: 'meghaa.sunil@perficient.com',
  github: '',
  linkedin: '',
  resumeUrl: '/resume.pdf',
  availability: 'Open to AI/ML, frontend and AI product roles.',
}

export const name = 'Meghaa Sunil'
export const tagline = 'AI • SOFTWARE • DESIGN'
export const quote =
  'Exploring the intersection of intelligent systems and beautiful interfaces.'

export const aboutFacts = [
  {
    q: 'WHO AM I?',
    a: 'A computer science graduate who builds with AI and cares about how systems feel.',
  },
  {
    q: 'I LIKE BUILDING',
    a: 'AI-powered applications with a human face on them.',
  },
  {
    q: 'I CARE ABOUT',
    a: 'Useful, intuitive interfaces — not just working ones.',
  },
  {
    q: 'CURRENTLY EXPLORING',
    a: 'AI × Product × Design.',
  },
]

export interface Checkpoint {
  period: string
  title: string
  org: string
  detail?: string
  kind: 'degree' | 'school' | 'intern' | 'now'
}

export const journey: Checkpoint[] = [
  {
    period: 'Earlier',
    title: 'Schooling',
    org: 'Our Own English High School, Sharjah',
    detail: 'Senior Secondary 93.4% · Secondary 89%',
    kind: 'school',
  },
  {
    period: '2022 → 2026',
    title: 'B.Tech Computer Science & Engineering',
    org: 'Amrita School of Engineering · Amrita Vishwa Vidyapeetham, Coimbatore',
    detail: 'CGPA 8.04',
    kind: 'degree',
  },
  {
    period: '2026 →',
    title: 'IT / Frontend Intern',
    org: 'Art of Living',
    detail: 'Frontend development — an event admin/review panel and a showcase website.',
    kind: 'intern',
  },
  {
    period: 'Now',
    title: 'Exploring the edges',
    org: 'Azure · AI engineering · frontend engineering · UI/UX',
    detail: 'Learning in public, building quiet experiments.',
    kind: 'now',
  },
]

export const certifications = [
  {
    name: 'Machine Learning with Python',
    provider: 'IBM',
    topic: 'Supervised & unsupervised learning with scikit-learn',
  },
  {
    name: 'Introduction to Deep Learning & Neural Networks with Keras',
    provider: 'IBM',
    topic: 'Neural networks and deep learning with Keras',
  },
  {
    name: 'NLP with Classification and Vector Spaces',
    provider: 'DeepLearning.AI × Coursera',
    topic: 'Text classification, bag of words and word vectors',
  },
]

export const learningInterests = [
  'Azure',
  'AI engineering',
  'Cloud technologies',
  'Frontend engineering',
  'UI/UX',
]

export const skinPipeline: PipelineStep[] = [
  {
    id: 'image',
    kind: 'vision',
    label: 'IMAGE',
    sub: 'YOLO → IMAGE FEATURES',
    detail: 'YOLO extracts visual features from skin lesion images.',
  },
  {
    id: 'clinical',
    kind: 'tabular',
    label: 'CLINICAL DATA',
    sub: 'MLP → CLINICAL FEATURES',
    detail:
      'An MLP encodes structured clinical information into clinical features.',
  },
  {
    id: 'fusion',
    kind: 'fusion',
    label: 'MULTIMODAL FUSION',
    sub: 'image + clinical',
    detail:
      'Both streams fuse, so the decision uses image and clinical evidence together.',
  },
  {
    id: 'predict',
    kind: 'output',
    label: 'PREDICTION',
    sub: 'classification',
    detail: 'A fused classifier produces the final skin disease prediction.',
  },
  {
    id: 'explain',
    kind: 'output',
    label: 'EXPLAINABILITY',
    sub: 'Grad-CAM · SHAP · LIME',
    detail:
      'The decision is made inspectable — Grad-CAM highlights image regions, SHAP/LIME explain feature influence.',
  },
]

export const projects: Project[] = [
  {
    id: 'skin-xai',
    title: 'Multimodal Skin Disease Detection using XAI',
    category: 'AI / ML · Computer Vision',
    summary: 'Classifies skin disease from image and clinical evidence together — then explains every prediction.',
    problem:
      'Image-only models ignore the clinical context doctors rely on — and a black-box prediction is hard to trust in a clinical setting.',
    idea:
      'YOLO extracts image features, an MLP processes clinical data, and a fusion layer makes the final call — opened up by an explainability layer.',
    role:
      'Built the multimodal architecture — YOLO image branch, MLP clinical branch, fusion layer — and evaluated the explainability outputs.',
    tech: ['Python', 'TensorFlow', 'Keras', 'YOLO', 'FastAPI', 'React', 'SHAP', 'LIME'],
    metrics: [
      { label: 'Accuracy', value: '85.65%' },
      { label: 'Weighted F1', value: '87.11%' },
    ],
    pipeline: skinPipeline,
    result:
      'Evaluated to 85.65% accuracy and 87.11% weighted F1, with explanations on both image and clinical evidence.',
    status: 'private',
    statusNote: 'Source not public — IP / patent considerations.',
    featured: true,
  },
  {
    id: 'explain-features',
    title: 'Explainable Feature Importance Analysis',
    category: 'AI / ML · Tabular',
    summary:
      'A skin disease classifier built around one question — which clinical features actually drive predictions.',
    problem:
      'A clinical classifier is only useful if clinicians can see which features drove the answer.',
    idea: 'An MLP over clinical features, opened with SHAP for global importance and LIME for local explanations.',
    role: 'Trained and evaluated the MLP classifier; produced the SHAP and LIME analyses.',
    tech: ['Python', 'Machine Learning', 'MLP', 'SHAP', 'LIME'],
    result: 'SHAP surfaced which clinical features most strongly influence predictions.',
    status: 'unlisted',
    statusNote: 'Unpublished — happy to discuss.',
  },
  {
    id: 'drug-anomaly',
    title: 'Anomaly Detection in Drug Manufacturing',
    category: 'Computer Vision',
    summary:
      'A ResNet18-based vision pipeline that flags anomalies in pharmaceutical manufacturing and packaging.',
    problem:
      'Quality deviations in pharma manufacturing need to be caught reliably — on vision evidence.',
    idea: 'A ResNet18 vision pipeline flags anomalies from manufacturing-line imagery.',
    role: 'Built and evaluated the ResNet18 vision pipeline.',
    tech: ['Python', 'Deep Learning', 'ResNet18'],
    metrics: [{ label: 'Accuracy', value: '96.0%' }],
    result: 'Evaluated to 96.0% detection accuracy on the anomaly set.',
    status: 'unlisted',
    statusNote: 'Unpublished — happy to discuss.',
  },
]

export const buildProjects = [
  {
    id: 'aol-showcase',
    title: 'Event Showcase Website',
    category: 'Frontend · Product',
    summary: 'A showcase website presenting an Art of Living event to the public.',
    problem: 'A large event packs in a lot of information — visitors need to find it easily.',
    idea: 'A public showcase site that organises event information clearly.',
    role: 'Frontend — responsive layouts, clean interactions, well-organised event content.',
    tech: ['React', 'HTML', 'CSS', 'JavaScript'],
    status: 'internship',
    statusNote: 'Internal project — not publicly available.',
  },
  {
    id: 'aol-panel',
    title: 'Event Admin / Review Panel',
    category: 'Frontend · Internal tools',
    summary: 'An internal panel for reviewing event applications.',
    problem: 'Organisers needed an efficient way to review a flood of event applications.',
    idea: 'A calm, organised review interface for the organising team.',
    role: 'Frontend — helped build the review panel interface.',
    tech: ['React', 'HTML', 'CSS', 'JavaScript'],
    status: 'internship',
    statusNote: 'Internal project — not publicly available.',
  },
]

export const designAreas = [
  {
    id: 'interfaces',
    title: 'Interface design',
    summary:
      'Layout, hierarchy and visual rhythm that make complex products feel effortless to read and use.',
  },
  {
    id: 'interactions',
    title: 'Frontend interactions',
    summary: 'The hover states, transitions and micro-moments that make interfaces feel alive.',
  },
  {
    id: 'responsive',
    title: 'Responsive environments',
    summary:
      'Designing one experience that adapts thoughtfully across phones, tablets and desktops — not just shrinks.',
  },
  {
    id: 'visual',
    title: 'Visual systems',
    summary:
      'Type, colour and spacing used with restraint — a quieter palette, and a deliberate hierarchy.',
  },
]

export const constellationGroups: ConstellationGroup[] = [
  {
    id: 'ai',
    title: 'AI Constellation',
    accent: '#7aa2ff',
    note: 'Machine learning, deep learning and computer vision — from raw data to explained predictions.',
    stars: [
      {
        name: 'Python',
        blurb: 'The language behind my ML pipelines.',
      },
      {
        name: 'Machine Learning',
        blurb: 'Classifiers over clinical data — evaluated and explained.',
      },
      {
        name: 'Deep Learning',
        blurb: 'Multimodal networks — CNN and MLP branches in one model.',
      },
      {
        name: 'TensorFlow',
        blurb: 'Backend for the deep learning models.',
      },
      {
        name: 'Keras',
        blurb: 'The API used to train the multimodal networks.',
      },
      {
        name: 'YOLO',
        blurb: 'Image feature extraction in the skin disease system.',
      },
      {
        name: 'Computer Vision',
        blurb: 'Image pipelines — skin lesion imaging and manufacturing anomaly detection.',
      },
      {
        name: 'NLP',
        blurb: 'Certified in text classification and vector spaces via DeepLearning.AI.',
      },
      {
        name: 'SHAP',
        blurb: 'Global feature importance on clinical models — which features drive predictions.',
      },
      {
        name: 'LIME',
        blurb: 'Local explanations for individual predictions.',
      },
    ],
  },
  {
    id: 'dev',
    title: 'Development Constellation',
    accent: '#7ad7c4',
    note: 'Building user-facing software — from structure to polished interaction.',
    stars: [
      {
        name: 'JavaScript',
        blurb: 'Scripting for interactive interfaces and event frontends.',
      },
      {
        name: 'React',
        blurb: 'Component-based interfaces — internship products and project frontends.',
      },
      {
        name: 'HTML',
        blurb: 'Semantic, structured markup as the foundation.',
      },
      {
        name: 'CSS',
        blurb: 'Responsive, accessible styling — layouts built to adapt.',
      },
      {
        name: 'FastAPI',
        blurb: 'Python API layer between the model and the interface.',
      },
      {
        name: 'Git',
        blurb: 'Version control across academic and internship projects.',
      },
      {
        name: 'GitHub',
        blurb: 'Repositories, collaboration and version history.',
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Constellation',
    accent: '#c8a1ff',
    note: 'The horizon — learning where AI goes once it leaves the laptop.',
    stars: [
      {
        name: 'Azure',
        blurb: 'Exploring cloud fundamentals and AI services on Azure.',
      },
      {
        name: 'Cloud',
        blurb: 'Learning to design, deploy and run systems beyond a single machine.',
      },
    ],
  },
  {
    id: 'design',
    title: 'Design Constellation',
    accent: '#e8c98a',
    note: 'How products look, feel and behave — the interface layer.',
    stars: [
      {
        name: 'UI/UX',
        blurb: 'Designing for usefulness — intuitive products, considered at every layer.',
      },
      {
        name: 'Responsive Design',
        blurb: 'One experience, adapted across mobile, tablet and desktop.',
      },
      {
        name: 'Prototyping',
        blurb: 'Fast iteration on layouts and interactions before building in code.',
      },
      {
        name: 'Visual Design',
        blurb: 'Typography, spacing, hierarchy and tasteful restraint.',
      },
    ],
  },
]

export const navItems: { id: SectionId | 'signal'; label: string }[] = [
  { id: 'ai', label: 'AI' },
  { id: 'build', label: 'BUILD' },
  { id: 'design', label: 'DESIGN' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'knowledge', label: 'KNOWLEDGE' },
  { id: 'about', label: 'ABOUT' },
  { id: 'signal', label: 'SIGNAL' },
]

export interface PlanetMeta {
  id: SectionId
  name: string
  short: string
  orbit: number
  angle: number
  speed: number
  size: number
  hue: 'violet' | 'blue' | 'gold' | 'teal' | 'iris' | 'rose'
}

export const planets: PlanetMeta[] = [
  {
    id: 'ai',
    name: 'AI LAB',
    short: 'Neural worlds — machine learning, computer vision & XAI.',
    orbit: 165,
    angle: 15,
    speed: 72,
    size: 34,
    hue: 'blue',
  },
  {
    id: 'build',
    name: 'BUILD',
    short: 'Software & frontend — the things I ship.',
    orbit: 205,
    angle: 95,
    speed: 58,
    size: 30,
    hue: 'teal',
  },
  {
    id: 'design',
    name: 'DESIGN',
    short: 'UI/UX & interface craft — how things look and feel.',
    orbit: 240,
    angle: 175,
    speed: 50,
    size: 27,
    hue: 'gold',
  },
  {
    id: 'journey',
    name: 'JOURNEY',
    short: 'Education & experience — checkpoints along the way.',
    orbit: 275,
    angle: 250,
    speed: 42,
    size: 30,
    hue: 'rose',
  },
  {
    id: 'knowledge',
    name: 'KNOWLEDGE',
    short: 'Certifications & continuous learning.',
    orbit: 308,
    angle: 318,
    speed: 36,
    size: 24,
    hue: 'iris',
  },
  {
    id: 'about',
    name: 'ABOUT',
    short: 'The person in the center of it all.',
    orbit: 338,
    angle: 55,
    speed: 30,
    size: 26,
    hue: 'violet',
  },
]