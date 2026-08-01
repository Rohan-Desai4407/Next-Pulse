import { createContext, useContext, useState, ReactNode } from 'react';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  source: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  tags: string[];
  aiSummary: string;
  whyItMatters: string;
  trending: boolean;
  breaking: boolean;
  editorsPick: boolean;
  likes: number;
  country: string;
  language: string;
};

export type Opportunity = {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'hackathon' | 'scholarship';
  company: string;
  location: string;
  deadline: string;
  tags: string[];
  description: string;
  url: string;
  category: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'breaking' | 'recommended' | 'opportunity' | 'digest';
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  time: string;
};

export const ALL_CATEGORIES = [
  'Technology', 'AI', 'Business', 'Finance', 'Economy', 'Education', 'Sports',
  'Entertainment', 'Movies', 'Health', 'Science', 'Environment', 'Politics',
  'World', 'Local', 'Lifestyle', 'Travel', 'Food', 'Gaming', 'Automobiles',
  'Space', 'Startups',
];

export const ONBOARDING_INTERESTS = [
  'Technology', 'AI', 'Business', 'Finance', 'Startups', 'Education', 'Sports',
  'Entertainment', 'Politics', 'Science', 'Health', 'Environment', 'Travel',
  'Lifestyle', 'Government', 'World News', 'Local News', 'Automobiles',
  'Gaming', 'Space', 'Food', 'Fashion',
];

export const ONBOARDING_ROLES = [
  'Student', 'Professional', 'Entrepreneur', 'Researcher', 'Teacher',
  'Freelancer', 'Job Seeker', 'Investor', 'General Reader',
];

export const ONBOARDING_NOTIFS = [
  'Breaking News', 'Daily Digest', 'Weekly Summary', 'Opportunity Alerts', 'Personalized Recommendations',
];

const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const articles: Article[] = [
  {
    id: '1', title: 'OpenAI Unveils GPT-5 with Real-Time Multimodal Reasoning',
    excerpt: 'The new model processes text, audio, and video simultaneously, marking a leap in AI capabilities.',
    content: [
      'OpenAI today announced GPT-5, a significant advancement in artificial intelligence that brings real-time multimodal reasoning to the forefront. The model can simultaneously process text, audio, and video inputs, enabling more natural and comprehensive human-AI interactions.',
      'The release represents years of research and development, with improvements in reasoning speed, accuracy, and contextual understanding. Early benchmarks show a 40% improvement over GPT-4 in complex reasoning tasks.',
      'Industry experts are calling this a watershed moment for AI development, with implications spanning healthcare, education, software development, and creative industries.',
      'The model will be available through OpenAI API and ChatGPT Plus subscriptions starting next month, with tiered pricing based on usage and capabilities.',
    ],
    category: 'AI', source: 'TechCrunch', author: 'Sarah Chen', publishedAt: '2 hours ago', readTime: 5,
    image: img('8386440'), tags: ['AI', 'OpenAI', 'GPT-5', 'Machine Learning'],
    aiSummary: 'OpenAI released GPT-5 featuring real-time multimodal reasoning across text, audio, and video. Benchmarks show 40% improvement in complex reasoning. Available via API and ChatGPT Plus next month.',
    whyItMatters: 'GPT-5 multimodal capability means AI can now understand context the way humans do combining sight, sound, and text. This could transform everything from accessibility tools to real-time translation and creative collaboration.',
    trending: true, breaking: true, editorsPick: true, likes: 1240, country: 'USA', language: 'English',
  },
  {
    id: '2', title: 'Quantum Computing Breakthrough: IBM Achieves 1000-Qubit Milestone',
    excerpt: 'IBM announces a major quantum processor that could revolutionize cryptography and drug discovery.',
    content: [
      'IBM has reached a historic milestone in quantum computing with the announcement of their 1000-qubit processor, codenamed Condor.',
      'This achievement represents a significant step toward practical quantum advantage, where quantum computers can solve problems that classical computers cannot.',
      'The processor maintains coherence times significantly longer than previous generations, addressing one of the field biggest challenges.',
    ],
    category: 'Science', source: 'Wired', author: 'Marcus Johnson', publishedAt: '4 hours ago', readTime: 7,
    image: img('8438922'), tags: ['Quantum', 'IBM', 'Computing', 'Research'],
    aiSummary: 'IBM achieved a 1000-qubit quantum processor milestone, a major step toward practical quantum advantage with improved coherence times.',
    whyItMatters: 'Quantum computing at this scale could crack today encryption, revolutionize drug discovery, and solve optimization problems that are impossible for classical computers.',
    trending: true, breaking: false, editorsPick: false, likes: 890, country: 'USA', language: 'English',
  },
  {
    id: '3', title: 'Tesla Reveals Next-Gen Autopilot with Neural Path Planning',
    excerpt: 'The new system promises safer navigation through complex urban environments.',
    content: [
      'Tesla has unveiled its next-generation autopilot system, leveraging neural path planning for unprecedented navigation accuracy.',
      'The system uses advanced AI models to predict and respond to complex traffic scenarios in real-time.',
      'Early testing shows a 60% reduction in disengagement events compared to the previous version.',
    ],
    category: 'Automobiles', source: 'The Verge', author: 'David Park', publishedAt: '6 hours ago', readTime: 6,
    image: img('376361'), tags: ['Tesla', 'Autopilot', 'AI', 'Automotive'],
    aiSummary: 'Tesla next-gen autopilot uses neural path planning for safer urban navigation. Testing shows 60% fewer disengagement events.',
    whyItMatters: 'Safer autonomous driving could reduce traffic accidents dramatically and reshape urban planning, insurance, and car ownership models.',
    trending: false, breaking: false, editorsPick: true, likes: 670, country: 'USA', language: 'English',
  },
  {
    id: '4', title: 'SpaceX Starship Completes First Orbital Flight Successfully',
    excerpt: 'The worlds most powerful rocket achieves orbital velocity on its latest test flight.',
    content: [
      'SpaceX Starship has successfully completed its first orbital flight, marking a new era in space exploration.',
      'The massive rocket, standing nearly 400 feet tall, reached orbital velocity and demonstrated controlled reentry.',
      'This success paves the way for future lunar missions and eventually Mars colonization plans.',
    ],
    category: 'Space', source: 'Space.com', author: 'Emma Rodriguez', publishedAt: '8 hours ago', readTime: 8,
    image: img('73830'), tags: ['SpaceX', 'Starship', 'Space', 'Rocket'],
    aiSummary: 'SpaceX Starship completed its first successful orbital flight, reaching orbital velocity and demonstrating controlled reentry for future lunar and Mars missions.',
    whyItMatters: 'Reusable orbital rockets could slash the cost of space access by 99%, opening space tourism, satellite networks, and eventually Mars colonization.',
    trending: true, breaking: false, editorsPick: false, likes: 1520, country: 'USA', language: 'English',
  },
  {
    id: '5', title: 'Apple Announces M4 Ultra Chip with 40-Core Neural Engine',
    excerpt: 'The new chip doubles AI performance, targeting professional workflows and on-device ML.',
    content: [
      'Apple has announced the M4 Ultra chip, featuring a 40-core neural engine that doubles AI performance over the M3 Ultra.',
      'The chip is designed for professional workflows including video editing, 3D rendering, and on-device machine learning.',
      'The M4 Ultra will power the next Mac Studio and Mac Pro, with availability expected in Q2.',
    ],
    category: 'Technology', source: '9to5Mac', author: 'Jennifer Lee', publishedAt: '12 hours ago', readTime: 4,
    image: img('1294886'), tags: ['Apple', 'M4', 'Chips', 'AI'],
    aiSummary: 'Apple M4 Ultra chip features a 40-core neural engine doubling AI performance, targeting professional workflows and on-device ML in upcoming Mac Studio and Pro.',
    whyItMatters: 'On-device AI at this performance level means privacy-first ML applications can run without cloud dependency, a major shift for enterprise and creative tools.',
    trending: false, breaking: false, editorsPick: false, likes: 540, country: 'USA', language: 'English',
  },
  {
    id: '6', title: 'Google DeepMind AI Solves Protein Folding for 200M Structures',
    excerpt: 'AlphaFold database expands to cover nearly all known proteins, transforming biology research.',
    content: [
      'Google DeepMind has expanded its AlphaFold database to include 200 million protein structures, covering nearly all known proteins.',
      'This achievement is being hailed as one of the most significant contributions to biology in history.',
      'Researchers worldwide are using the database to accelerate drug discovery and understand diseases.',
    ],
    category: 'AI', source: 'Nature', author: 'Robert Kim', publishedAt: '1 day ago', readTime: 9,
    image: img('3825582'), tags: ['Google', 'DeepMind', 'AlphaFold', 'Biology'],
    aiSummary: 'Google DeepMind AlphaFold database now covers 200M protein structures, nearly all known proteins, accelerating drug discovery and disease research worldwide.',
    whyItMatters: 'Understanding protein structures is the key to curing diseases. This database is already accelerating drug discovery for cancer, Alzheimer, and rare diseases.',
    trending: false, breaking: false, editorsPick: true, likes: 980, country: 'UK', language: 'English',
  },
  {
    id: '7', title: 'Nvidia Becomes Worlds Most Valuable Company Amid AI Boom',
    excerpt: 'The GPU manufacturer surpasses 3.4 trillion valuation as AI demand soars.',
    content: [
      'Nvidia has officially become the worlds most valuable company, with a market capitalization exceeding 3.4 trillion.',
      'The company GPUs are the backbone of the AI revolution, powering everything from ChatGPT to autonomous vehicles.',
      'Analysts predict continued growth as AI adoption accelerates across industries.',
    ],
    category: 'Business', source: 'Bloomberg', author: 'Lisa Wang', publishedAt: '1 day ago', readTime: 5,
    image: img('756757'), tags: ['Nvidia', 'AI', 'Stocks', 'Business'],
    aiSummary: 'Nvidia became the worlds most valuable company at 3.4T valuation, driven by GPU demand for AI applications across industries.',
    whyItMatters: 'Nvidia dominance reveals where the real money in AI flows not to the apps, but to the infrastructure powering them. This shapes the entire tech investment landscape.',
    trending: true, breaking: false, editorsPick: false, likes: 1100, country: 'USA', language: 'English',
  },
  {
    id: '8', title: 'MIT Researchers Create Self-Healing Robot Skin',
    excerpt: 'A new material can repair cuts and abrasions autonomously, mimicking biological healing.',
    content: [
      'MIT researchers have developed a self-healing material for robot skin that can repair cuts and abrasions autonomously.',
      'The material uses a network of microfluidic channels filled with healing agents that activate upon damage.',
      'This breakthrough could lead to more durable robots for hazardous environments.',
    ],
    category: 'Science', source: 'MIT News', author: 'Alex Thompson', publishedAt: '2 days ago', readTime: 6,
    image: img('8961065'), tags: ['MIT', 'Robotics', 'Materials', 'Research'],
    aiSummary: 'MIT created self-healing robot skin using microfluidic channels with healing agents, enabling autonomous repair of cuts for more durable robots.',
    whyItMatters: 'Self-healing materials could extend the lifespan of robots in extreme environments like deep sea, space, and disaster zones, reducing maintenance costs dramatically.',
    trending: false, breaking: false, editorsPick: false, likes: 430, country: 'USA', language: 'English',
  },
  {
    id: '9', title: 'Federal Reserve Cuts Interest Rates Amid Cooling Inflation',
    excerpt: 'The first rate cut in two years signals confidence in the economic recovery.',
    content: [
      'The Federal Reserve announced a 0.5% interest rate cut, the first reduction in two years, citing cooling inflation data.',
      'Markets responded positively with the Dow jumping 400 points on the news.',
      'Economists are divided on whether this signals a soft landing or underlying economic concerns.',
    ],
    category: 'Finance', source: 'Reuters', author: 'Michael Brown', publishedAt: '3 hours ago', readTime: 5,
    image: img('534216'), tags: ['Fed', 'Interest Rates', 'Economy', 'Inflation'],
    aiSummary: 'The Fed cut interest rates by 0.5%, the first cut in two years, as inflation cools. Markets surged 400 points on the news.',
    whyItMatters: 'Lower interest rates make borrowing cheaper for homes, cars, and businesses. This affects your mortgage, savings rates, and investment portfolio directly.',
    trending: true, breaking: true, editorsPick: false, likes: 760, country: 'USA', language: 'English',
  },
  {
    id: '10', title: 'New Climate Report: Global CO2 Emissions Peak May Be Near',
    excerpt: 'IEA data suggests emissions could plateau by 2026 thanks to clean energy growth.',
    content: [
      'The International Energy Agency latest report suggests global CO2 emissions may peak by 2026, earlier than previously expected.',
      'Renewable energy capacity grew by 50% in 2025, driven by massive solar and wind installations.',
      'However, experts warn that peaking is not enough and rapid decline is needed to meet climate targets.',
    ],
    category: 'Environment', source: 'The Guardian', author: 'Sophia Martinez', publishedAt: '5 hours ago', readTime: 7,
    image: img('247647'), tags: ['Climate', 'CO2', 'Renewable Energy', 'IEA'],
    aiSummary: 'IEA reports global CO2 emissions may peak by 2026 as renewable energy capacity grew 50% in 2025, though rapid decline is still needed.',
    whyItMatters: 'A peak in emissions would be a historic turning point, but the rate of decline matters more for avoiding the worst climate impacts in the coming decades.',
    trending: false, breaking: false, editorsPick: true, likes: 620, country: 'Global', language: 'English',
  },
  {
    id: '11', title: 'Champions League Final: Real Madrid Stuns Liverpool in Last-Minute Win',
    excerpt: 'A 94th-minute goal secures Real Madrid their 16th European title.',
    content: [
      'Real Madrid claimed their 16th Champions League title with a stunning 94th-minute winner against Liverpool.',
      'The match was tied 1-1 until Vinicius Jr slotted home a rebound in stoppage time.',
      'The victory marks another chapter in Real Madrid storied European history.',
    ],
    category: 'Sports', source: 'ESPN', author: 'Carlos Silva', publishedAt: '1 hour ago', readTime: 4,
    image: img('46798'), tags: ['Football', 'Champions League', 'Real Madrid', 'Liverpool'],
    aiSummary: 'Real Madrid won their 16th Champions League with a 94th-minute goal by Vinicius Jr, beating Liverpool 2-1 in a dramatic final.',
    whyItMatters: 'Real Madrid continues to cement its legacy as the most successful club in European football history, with implications for player transfers and sponsorship deals.',
    trending: true, breaking: true, editorsPick: false, likes: 3200, country: 'Spain', language: 'English',
  },
  {
    id: '12', title: 'Netflix Announces AI-Generated Content Studio',
    excerpt: 'The streaming giant invests 500M in AI tools for scriptwriting and visual effects.',
    content: [
      'Netflix has announced a new AI content studio with a 500M investment in AI tools for scriptwriting, visual effects, and personalization.',
      'The studio will develop tools that assist creators rather than replace them, the company emphasized.',
      'The move has sparked debate in Hollywood about the future of creative work.',
    ],
    category: 'Entertainment', source: 'Variety', author: 'Rachel Adams', publishedAt: '6 hours ago', readTime: 5,
    image: img('705476'), tags: ['Netflix', 'AI', 'Streaming', 'Hollywood'],
    aiSummary: 'Netflix is investing 500M in an AI content studio for scriptwriting and VFX tools, sparking debate about AI role in creative industries.',
    whyItMatters: 'AI in entertainment could democratize content creation but also raises questions about job displacement, copyright, and the value of human creativity.',
    trending: false, breaking: false, editorsPick: false, likes: 890, country: 'USA', language: 'English',
  },
  {
    id: '13', title: 'New Study Links Mediterranean Diet to Longer Lifespan',
    excerpt: 'A 20-year study of 25,000 people shows significant longevity benefits.',
    content: [
      'A landmark 20-year study published in the New England Journal of Medicine links the Mediterranean diet to a 25% reduction in mortality.',
      'The study tracked 25,000 participants across 12 countries and controlled for exercise, smoking, and other factors.',
      'Olive oil, nuts, fish, and vegetables were the key contributors to the longevity effect.',
    ],
    category: 'Health', source: 'BBC Health', author: 'Dr. Anita Patel', publishedAt: '10 hours ago', readTime: 6,
    image: img('1640777'), tags: ['Health', 'Diet', 'Longevity', 'Research'],
    aiSummary: 'A 20-year study of 25,000 people found the Mediterranean diet reduces mortality by 25%, with olive oil, nuts, fish, and vegetables as key contributors.',
    whyItMatters: 'Simple dietary changes could add years to your life. This study adds to growing evidence that food is medicine, with implications for public health policy.',
    trending: false, breaking: false, editorsPick: false, likes: 1450, country: 'Global', language: 'English',
  },
  {
    id: '14', title: 'Startup Raises 200M to Build AI-Powered Education Platform',
    excerpt: 'EduAI aims to deliver personalized learning to 1 billion students globally.',
    content: [
      'EduAI, an edtech startup, has raised 200M in Series C funding to scale its AI-powered personalized learning platform.',
      'The platform adapts to each student learning style and pace, providing real-time feedback and tutoring.',
      'The company aims to reach 1 billion students, particularly in underserved regions.',
    ],
    category: 'Startups', source: 'TechCrunch', author: 'Kevin Lee', publishedAt: '8 hours ago', readTime: 5,
    image: img('5212348'), tags: ['EdTech', 'AI', 'Education', 'Funding'],
    aiSummary: 'EduAI raised 200M Series C to scale its AI personalized learning platform, aiming to reach 1 billion students globally including underserved regions.',
    whyItMatters: 'Personalized education at scale could close the global education gap, giving students in developing regions access to quality tutoring previously available only to the wealthy.',
    trending: false, breaking: false, editorsPick: true, likes: 560, country: 'USA', language: 'English',
  },
  {
    id: '15', title: 'Global Summit Reaches Historic Biodiversity Agreement',
    excerpt: '196 nations pledge to protect 30% of land and sea by 2030.',
    content: [
      'A historic biodiversity agreement was reached at the global summit, with 196 nations pledging to protect 30% of land and sea by 2030.',
      'The agreement includes funding mechanisms for developing nations and indigenous communities.',
      'Environmental groups welcomed the deal but emphasized that implementation is key.',
    ],
    category: 'Politics', source: 'AP News', author: 'Thomas Wright', publishedAt: '12 hours ago', readTime: 8,
    image: img('2422259'), tags: ['Biodiversity', 'Climate', 'Policy', 'UN'],
    aiSummary: '196 nations agreed to protect 30% of land and sea by 2030 in a historic biodiversity pact, with funding for developing nations and indigenous communities.',
    whyItMatters: 'Protecting 30% of Earth ecosystems is the minimum scientists say is needed to prevent mass extinction. This agreement could be the Paris Accord for biodiversity.',
    trending: false, breaking: false, editorsPick: false, likes: 720, country: 'Global', language: 'English',
  },
  {
    id: '16', title: 'Japan Unveils Worlds First Commercial Flying Car',
    excerpt: 'SkyDrive begins pre-orders for its electric VTOL vehicle priced at 300K.',
    content: [
      'Japanese startup SkyDrive has unveiled the world first commercial flying car, an electric vertical takeoff and landing vehicle.',
      'The vehicle has a range of 50km and a top speed of 100km/h, with pre-orders starting at 300K.',
      'Deliveries are expected to begin in 2028, pending regulatory approval.',
    ],
    category: 'Automobiles', source: 'Nikkei Asia', author: 'Yuki Tanaka', publishedAt: '1 day ago', readTime: 5,
    image: img('3782194'), tags: ['Flying Car', 'VTOL', 'Japan', 'EV'],
    aiSummary: 'Japan SkyDrive unveiled the first commercial flying car, an electric VTOL with 50km range at 300K, with deliveries expected by 2028.',
    whyItMatters: 'Flying cars could transform urban mobility, reducing commute times and reshaping city design, but infrastructure and regulation remain massive hurdles.',
    trending: true, breaking: false, editorsPick: false, likes: 2100, country: 'Japan', language: 'English',
  },
  {
    id: '17', title: 'New Film Festival Spotlights AI-Generated Cinema',
    excerpt: 'The AI Film Festival in Sundance showcases 50 films made with AI tools.',
    content: [
      'The first AI Film Festival, held alongside Sundance, showcased 50 films created using AI tools for scriptwriting, animation, and editing.',
      'Filmmakers emphasized that AI is a tool for creativity, not a replacement for human vision.',
      'The festival sparked conversations about authorship, copyright, and the future of cinema.',
    ],
    category: 'Movies', source: 'IndieWire', author: 'Olivia Green', publishedAt: '1 day ago', readTime: 6,
    image: img('6536868'), tags: ['AI Film', 'Sundance', 'Cinema', 'Festival'],
    aiSummary: 'The first AI Film Festival at Sundance showcased 50 AI-assisted films, sparking debate about authorship, copyright, and the future of cinema.',
    whyItMatters: 'AI cinema challenges our definition of art and authorship. The legal and cultural frameworks established now will shape creative industries for decades.',
    trending: false, breaking: false, editorsPick: false, likes: 480, country: 'USA', language: 'English',
  },
  {
    id: '18', title: 'World Cup 2026: Host Cities Announced Across Three Nations',
    excerpt: '48 teams will compete across 16 cities in the USA, Canada, and Mexico.',
    content: [
      'FIFA has confirmed the 16 host cities for the 2026 World Cup, spread across the USA, Canada, and Mexico.',
      'The tournament will feature an expanded 48-team format for the first time.',
      'Ticket sales are expected to break records, with over 5 million requests already registered.',
    ],
    category: 'Sports', source: 'BBC Sport', author: 'James Wilson', publishedAt: '2 days ago', readTime: 5,
    image: img('274506'), tags: ['World Cup', 'FIFA', 'Football', '2026'],
    aiSummary: 'FIFA confirmed 16 host cities for the 2026 World Cup across USA, Canada, and Mexico, with an expanded 48-team format and record ticket demand.',
    whyItMatters: 'The first 48-team World Cup across three nations will be the largest sporting event in history, with massive economic and cultural impact across North America.',
    trending: false, breaking: false, editorsPick: false, likes: 1800, country: 'Global', language: 'English',
  },
];

const opportunities: Opportunity[] = [
  { id: 'o1', title: 'Software Engineering Intern', type: 'internship', company: 'Google', location: 'Mountain View, CA', deadline: 'Aug 15, 2026', tags: ['React', 'Python', 'Cloud'], description: 'Join Google Cloud team to build scalable infrastructure.', url: '#', category: 'Technology' },
  { id: 'o2', title: 'AI Research Internship', type: 'internship', company: 'OpenAI', location: 'San Francisco, CA', deadline: 'Aug 20, 2026', tags: ['ML', 'PyTorch', 'Research'], description: 'Research next-gen language models with the GPT team.', url: '#', category: 'AI' },
  { id: 'o3', title: 'Global AI Hackathon 2026', type: 'hackathon', company: 'NextPulse', location: 'Virtual', deadline: 'Sep 5, 2026', tags: ['AI', '48hrs', 'Prizes'], description: 'Build AI solutions for real-world problems. $50K prize pool.', url: '#', category: 'AI' },
  { id: 'o4', title: 'Senior Frontend Engineer', type: 'job', company: 'Stripe', location: 'Remote', deadline: 'Aug 30, 2026', tags: ['React', 'TypeScript', 'Design'], description: 'Build the future of online payments.', url: '#', category: 'Technology' },
  { id: 'o5', title: 'Quantum Computing Scholarship', type: 'scholarship', company: 'IBM', location: 'Worldwide', deadline: 'Sep 1, 2026', tags: ['Quantum', 'Funding', 'Research'], description: 'Full scholarship for quantum computing research.', url: '#', category: 'Science' },
  { id: 'o6', title: 'Full-Stack Developer', type: 'job', company: 'Linear', location: 'Remote', deadline: 'Aug 25, 2026', tags: ['Node.js', 'React', 'GraphQL'], description: 'Help build the best issue tracking tool.', url: '#', category: 'Technology' },
  { id: 'o7', title: 'ML Engineer Intern', type: 'internship', company: 'Nvidia', location: 'Santa Clara, CA', deadline: 'Aug 18, 2026', tags: ['CUDA', 'Python', 'Deep Learning'], description: 'Work on GPU-accelerated ML frameworks.', url: '#', category: 'AI' },
  { id: 'o8', title: 'Hack the North', type: 'hackathon', company: 'University of Waterloo', location: 'Waterloo, Canada', deadline: 'Sep 15, 2026', tags: ['Hackathon', '36hrs', 'Networking'], description: 'Canadas largest hackathon. 1000+ hackers.', url: '#', category: 'Technology' },
  { id: 'o9', title: 'Climate Tech Startup Grant', type: 'scholarship', company: 'Breakthrough Energy', location: 'Worldwide', deadline: 'Sep 10, 2026', tags: ['Climate', 'Startup', 'Funding'], description: '100K grant for climate tech startups.', url: '#', category: 'Environment' },
  { id: 'o10', title: 'Financial Analyst Intern', type: 'internship', company: 'Goldman Sachs', location: 'New York, NY', deadline: 'Aug 22, 2026', tags: ['Finance', 'Analysis', 'Excel'], description: 'Analyze market trends and support investment decisions.', url: '#', category: 'Finance' },
  { id: 'o11', title: 'Data Science Intern', type: 'internship', company: 'Netflix', location: 'Los Gatos, CA', deadline: 'Aug 28, 2026', tags: ['Python', 'SQL', 'ML'], description: 'Build recommendation algorithms for 260M subscribers.', url: '#', category: 'Entertainment' },
  { id: 'o12', title: 'Biotech Research Scholarship', type: 'scholarship', company: 'Moderna', location: 'Worldwide', deadline: 'Sep 8, 2026', tags: ['Biotech', 'Research', 'Funding'], description: 'Fund research in mRNA technology and therapeutics.', url: '#', category: 'Health' },
];

const notifications: Notification[] = [
  { id: 'n1', title: 'Breaking News', message: 'OpenAI unveils GPT-5 with real-time multimodal reasoning', time: '2m ago', read: false, type: 'breaking' },
  { id: 'n2', title: 'Opportunity Alert', message: 'Google Software Engineering Intern application deadline approaching', time: '1h ago', read: false, type: 'opportunity' },
  { id: 'n3', title: 'AI Recommendation', message: 'Your reading suggests interest in Quantum Computing. See recommendations.', time: '3h ago', read: false, type: 'recommended' },
  { id: 'n4', title: 'Breaking News', message: 'Nvidia becomes worlds most valuable company', time: '5h ago', read: true, type: 'breaking' },
  { id: 'n5', title: 'Opportunity Alert', message: 'Global AI Hackathon 2026 registration closes in 5 days', time: '8h ago', read: true, type: 'opportunity' },
  { id: 'n6', title: 'Daily Digest', message: 'Your daily brief is ready: 8 new stories matched your interests today', time: '12h ago', read: true, type: 'digest' },
  { id: 'n7', title: 'AI Recommendation', message: 'New article about Mediterranean diet matches your Health interest', time: '1d ago', read: true, type: 'recommended' },
  { id: 'n8', title: 'Daily Digest', message: 'Yesterday digest: 5 trending stories in Technology and Business', time: '2d ago', read: true, type: 'digest' },
];

export const testimonials = [
  { name: 'Sarah Chen', role: 'CS Student, MIT', avatar: 'S', text: 'NextPulse changed how I consume news. The AI summaries save me hours every week, and the opportunity hub landed me an internship at Google.', rating: 5 },
  { name: 'Marcus Johnson', role: 'Software Engineer, Stripe', avatar: 'M', text: 'The personalized feed is scary good. It knows exactly what I care about. The dark mode and clean design make reading a pleasure.', rating: 5 },
  { name: 'Emma Rodriguez', role: 'Researcher, SpaceX', avatar: 'E', text: 'As a researcher, I need to stay current across multiple fields. NextPulse AI recommendations surface papers and news I would have missed.', rating: 5 },
  { name: 'David Park', role: 'Founder, TechFlow', avatar: 'D', text: 'The opportunity center is a goldmine. I found 3 hackathons and a grant for my startup. The AI assistant is like having a research analyst on call.', rating: 5 },
  { name: 'Lisa Wang', role: 'Investor, Bloomberg', avatar: 'L', text: 'The market snapshot and business news widgets keep me informed in seconds. The interface is cleaner than any financial terminal Ie used.', rating: 5 },
  { name: 'Alex Morgan', role: 'Freelance Designer', avatar: 'A', text: 'I not a tech person, but NextPulse makes news accessible. The categories cover everything from food to fashion to space. It news for everyone.', rating: 5 },
];

export const faqs = [
  { q: 'Is NextPulse free to use?', a: 'Yes! NextPulse is completely free for all users. Premium features like advanced AI analysis and unlimited bookmarks are available on our Pro plan.' },
  { q: 'How does the AI personalization work?', a: 'Our AI analyzes your reading patterns, saved articles, and selected interests to curate a feed that matches your unique preferences. It learns and improves over time.' },
  { q: 'Can I get news outside of technology?', a: 'Absolutely. NextPulse covers 22 categories including Business, Sports, Entertainment, Health, Politics, Food, Travel, and more. Tech is just one slice.' },
  { q: 'What types of opportunities are available?', a: 'We track internships, full-time jobs, hackathons, scholarships, and startup grants across all industries. New opportunities are added daily.' },
  { q: 'How often is the news updated?', a: 'Our feed updates in real-time with breaking news alerts. The daily digest is delivered every morning, and the weekly summary every Sunday.' },
  { q: 'Is my data private and secure?', a: 'Yes. We use bank-grade encryption and never sell your data. Your reading history and preferences are yours to control in Settings.' },
];

const trendingTopics = [
  { topic: '#GPT5', count: '125K posts', trend: 'up' as const },
  { topic: '#QuantumComputing', count: '89K posts', trend: 'up' as const },
  { topic: '#TeslaAutopilot', count: '67K posts', trend: 'down' as const },
  { topic: '#SpaceX', count: '54K posts', trend: 'up' as const },
  { topic: '#AppleM4', count: '43K posts', trend: 'up' as const },
  { topic: '#AlphaFold', count: '32K posts', trend: 'down' as const },
  { topic: '#WorldCup2026', count: '28K posts', trend: 'up' as const },
  { topic: '#ClimateDeal', count: '21K posts', trend: 'up' as const },
];

const categories = ALL_CATEGORIES;

const weather = { temp: 72, condition: 'Partly Cloudy', location: 'San Francisco', high: 75, low: 60 };

const market = [
  { symbol: 'NVDA', name: 'Nvidia', price: 1284.32, change: 4.21, trend: 'up' as const },
  { symbol: 'AAPL', name: 'Apple', price: 234.56, change: 1.23, trend: 'up' as const },
  { symbol: 'MSFT', name: 'Microsoft', price: 456.78, change: -0.87, trend: 'down' as const },
  { symbol: 'GOOGL', name: 'Alphabet', price: 189.45, change: 2.34, trend: 'up' as const },
  { symbol: 'TSLA', name: 'Tesla', price: 312.78, change: -1.45, trend: 'down' as const },
];

const calendarEvents = [
  { date: 'Aug 03', title: 'Apple Q3 Earnings', type: 'event' as const },
  { date: 'Aug 05', title: 'Google Cloud Next', type: 'conference' as const },
  { date: 'Aug 15', title: 'Google Intern Deadline', type: 'deadline' as const },
  { date: 'Aug 20', title: 'OpenAI Intern Deadline', type: 'deadline' as const },
  { date: 'Sep 05', title: 'AI Hackathon', type: 'event' as const },
];

const aiRecommendations = [
  { title: 'Why GPT-5 Changes Everything', reason: 'Based on your interest in AI', category: 'AI' },
  { title: 'Quantum Computing: A Primer', reason: 'Trending in your network', category: 'Science' },
  { title: 'The Future of Autonomous Driving', reason: 'You read about Tesla', category: 'Automobiles' },
  { title: 'Mediterranean Diet Research', reason: 'Matches your Health interest', category: 'Health' },
];

const learningResources = [
  { title: 'Introduction to Quantum Computing', provider: 'MIT OpenCourseWare', type: 'Course', duration: '12 weeks' },
  { title: 'Machine Learning Specialization', provider: 'Stanford', type: 'Course', duration: '8 weeks' },
  { title: 'Climate Tech Startup Guide', provider: 'Y Combinator', type: 'Guide', duration: '2 hours' },
  { title: 'Financial Markets Overview', provider: 'Yale', type: 'Course', duration: '6 weeks' },
];

const todaysBrief = 'Today top stories: OpenAI launches GPT-5 with multimodal reasoning, IBM hits 1000-qubit milestone, Nvidia becomes the most valuable company globally, and the Fed cuts interest rates for the first time in two years. In opportunities, Google and OpenAI internships close this month.';

type DataCtx = {
  articles: Article[];
  opportunities: Opportunity[];
  notifications: Notification[];
  trendingTopics: typeof trendingTopics;
  categories: string[];
  weather: typeof weather;
  market: typeof market;
  calendarEvents: typeof calendarEvents;
  aiRecommendations: typeof aiRecommendations;
  learningResources: typeof learningResources;
  todaysBrief: string;
  savedIds: string[];
  likedIds: string[];
  toggleSave: (id: string) => void;
  toggleLike: (id: string) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  userInterests: string[];
  setUserInterests: (v: string[]) => void;
  userRole: string;
  setUserRole: (v: string) => void;
};

const Dctx = createContext<DataCtx>({} as DataCtx);

export function DataProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(['3', '6']);
  const [likedIds, setLikedIds] = useState<string[]>(['1', '7']);
  const [notifList, setNotifList] = useState(notifications);
  const [userInterests, setUserInterests] = useState<string[]>(['AI', 'Technology', 'Space', 'Business']);
  const [userRole, setUserRole] = useState('Professional');

  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleLike = (id: string) =>
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const markAllRead = () => setNotifList((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <Dctx.Provider
      value={{
        articles, opportunities, notifications: notifList, trendingTopics, categories,
        weather, market, calendarEvents, aiRecommendations, learningResources, todaysBrief,
        savedIds, likedIds, toggleSave, toggleLike, markAllRead, markRead,
        userInterests, setUserInterests, userRole, setUserRole,
      }}
    >
      {children}
    </Dctx.Provider>
  );
}

export const useData = () => useContext(Dctx);
