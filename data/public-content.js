const profile = {
  name: 'Siddharth Dilip Kalantri',
  shortName: 'Siddharth Kalantri',
  brand: 'FunctionSid',
  location: 'Bhiwandi, Maharashtra, India',
  publicEmail: 'siddharth@kalantri.in',
  phoneDisplay: '+91 89833 30673',
  phoneHref: '+918983330673',
  role: 'Accessibility Engineer, Node.js Developer, Cloud & AI',
  summary: 'Accessibility-focused software engineer building server-rendered web applications, assistive technology tools, AI retrieval systems, and cloud-ready Node.js services.',
  availability: [
    'Remote full-time positions',
    'Remote part-time positions',
    'Freelance website development',
    'Contract-based projects',
    'Startup collaboration',
    'Long-term technical partnerships'
  ],
  proofPoints: [
    '20+ years as an NVDA and JAWS screen reader power user',
    'Self-taught software development journey started around 2022',
    'Portfolio projects across accessibility, AI/RAG, Node.js, Python, and Oracle Cloud'
  ]
};

const projects = [
  {
    slug: 'lawgpt',
    title: 'LawGPT',
    subtitle: 'Accessible RAG Legal Assistant for Indian Law',
    category: 'AI, Accessibility, Legal Documents',
    status: 'Portfolio case study',
    image: '/images/lawgpt-home.png',
    imageAlt: 'LawGPT interface showing a Constitution query with simple English output, inline citations, and source references.',
    secondaryImage: '/images/lawgpt-chat.png',
    secondaryImageAlt: 'LawGPT chat interface showing a Bharatiya Nyaya Sanhita query with cited legal source references.',
    summary: 'An accessible Retrieval-Augmented Generation assistant that explains Indian legal documents in simple English while preserving source transparency through inline citations.',
    overview: 'LawGPT is designed for people who need legal text explained clearly without losing the connection to the original source. It works with the Constitution of India and the Bharatiya Nyaya Sanhita, 2023.',
    problem: 'Legal documents are dense, formal, and difficult to search. Readers often need both a plain-language explanation and a reliable path back to the exact legal text.',
    solution: 'The project combines direct statute lookup, hybrid retrieval, dataset filtering, and cited LLM responses. The interface is keyboard-first and screen-reader friendly.',
    architecture: ['Express and EJS render the interface.', 'A retrieval layer combines regex lookup with hybrid search.', 'Context blocks are passed to the language model with citation labels.', 'The answer links back to source text blocks.'],
    technologies: ['Node.js', 'Express', 'EJS', 'RAG', 'Hybrid Search', 'Ola Krutrim API', 'Embeddings', 'Accessible HTML'],
    accessibility: ['Keyboard shortcuts for query input, sending, chat log, and source references.', 'Screen-reader optimized headings, source lists, and plain text fallback.', 'Inline citations help users verify answers without visual scanning.'],
    challenges: ['Maintaining legal source accuracy while simplifying language.', 'Separating Constitution and BNS datasets reliably.', 'Keeping citations aligned with retrieved context blocks.'],
    outcome: 'The case study demonstrates accessible AI design, retrieval architecture, and practical source transparency for complex legal content.',
    skills: ['RAG pipeline design', 'Node.js backend engineering', 'Accessible interaction design', 'Citation-aware response design'],
    future: ['Improve legal corpus coverage.', 'Add more validation around citation consistency.', 'Expand multilingual legal explanations after review.']
  },
  {
    slug: 'agriquery',
    title: 'AgriQuery',
    subtitle: 'Accessible Agricultural Commodity Price Chatbot',
    category: 'Government Data, Chatbot, Accessibility',
    status: 'Completed',
    image: '/images/agriquery-home-1.png',
    imageAlt: 'AgriQuery homepage showing an accessibility-first chatbot for agricultural commodity prices.',
    secondaryImage: '/images/agriquery-help.png',
    secondaryImageAlt: 'AgriQuery help page explaining how users can ask natural language questions about commodity prices.',
    summary: 'A web chatbot that helps users ask natural-language questions about official agricultural commodity prices from government data sources.',
    overview: 'AgriQuery makes daily mandi price information easier to access for farmers, traders, students, and screen-reader users.',
    problem: 'Government market price data can be difficult to find and interpret. Users may not know the official commodity names or how to search large datasets.',
    solution: 'The application accepts natural-language queries, handles common commodity names and synonyms, fetches official data, and returns relevant price information in a simple interface.',
    architecture: ['Express serves the chatbot interface.', 'Scheduled data import keeps local records current.', 'Natural-language matching maps user input to commodity data.', 'Database queries return market records quickly.'],
    technologies: ['Node.js', 'Express', 'EJS', 'SQLite3', 'Government APIs', 'JavaScript', 'Automation', 'Responsive Web Design'],
    accessibility: ['Semantic HTML and labeled form controls.', 'Keyboard-friendly chatbot workflow.', 'Clear status and error messaging for screen readers.'],
    challenges: ['Handling inconsistent commodity names.', 'Normalizing government API data.', 'Balancing fuzzy matching with reliable results.'],
    outcome: 'AgriQuery shows how public data can become a practical, accessible conversational tool.',
    skills: ['Government API integration', 'Backend development', 'Database design', 'Automation', 'Accessibility engineering'],
    future: ['Add more Indian languages.', 'Add historical price trends.', 'Improve location-aware market suggestions.']
  },
  {
    slug: 'dectalk-nvda-bridge',
    title: 'DECtalk NVDA Bridge',
    subtitle: 'Compatibility Layer for Modern 64-bit NVDA',
    category: 'Assistive Technology, Accessibility Engineering',
    status: 'Completed and maintained for future NVDA releases',
    image: '/images/dectalk-nvda-bridge-project.png',
    imageAlt: 'DECtalk NVDA Bridge infographic showing a compatibility bridge between modern 64-bit NVDA and the legacy 32-bit DECtalk engine.',
    summary: 'A compatibility project that restores the classic DECtalk speech synthesizer for modern 64-bit versions of NVDA.',
    overview: 'DECtalk NVDA Bridge preserves access to a legacy speech synthesizer used by many blind computer users while adapting it for newer NVDA architecture.',
    problem: 'Modern NVDA releases require 64-bit compatibility, while the original DECtalk speech engine is a 32-bit Windows component.',
    solution: 'The bridge keeps the original DECtalk engine untouched and uses NVDA SynthDriverHost32 to connect modern NVDA with the legacy speech component.',
    architecture: ['NVDA 2026.1 runs as the modern 64-bit screen reader.', 'The 64-bit add-on communicates through SynthDriverHost32.', 'The original 32-bit DECtalk engine produces speech output.'],
    technologies: ['Python', 'NVDA Add-on API', 'Windows', 'DECtalk', 'SynthDriverHost32', 'Accessibility Engineering'],
    accessibility: ['Preserves a familiar speech option for blind NVDA users.', 'Supports clean startup, shutdown, and stable speech output.', 'Maintains compatibility without changing the original synthesizer.'],
    challenges: ['Bridging 64-bit and 32-bit components.', 'Understanding NVDA speech driver architecture.', 'Testing across modern NVDA behavior while preserving legacy output.'],
    outcome: 'The project restores DECtalk support on NVDA 2026.1 and demonstrates practical compatibility engineering for assistive technology.',
    skills: ['Accessibility engineering', 'Legacy software modernization', 'Python development', 'Assistive technology testing'],
    future: ['Continue compatibility testing for future NVDA releases.', 'Improve documentation for installation and troubleshooting.']
  },
  {
    slug: 'a11y-insights',
    title: 'A11Y Insights',
    subtitle: 'Educational Platform for Web Accessibility',
    category: 'WCAG, Front-End Development, Education',
    status: 'Completed',
    image: '/images/a11y-insights-home.png',
    imageAlt: 'Homepage of the A11Y Insights website showing the main navigation and accessibility learning platform.',
    secondaryImage: '/images/a11y-insights-accessibility-tools.png',
    secondaryImageAlt: 'A11Y Insights accessibility tools page showing WCAG testing tools and evaluation resources.',
    summary: 'An educational web platform that helps developers and students understand accessibility concepts, WCAG principles, and testing tools.',
    overview: 'A11Y Insights organizes accessibility education into a structured learning experience with practical testing resources.',
    problem: 'Accessibility learning resources are often scattered, making it harder for beginners to understand WCAG concepts and choose useful testing tools.',
    solution: 'The site combines accessibility principles, auditing guidance, browser extensions, case studies, and learning resources in one accessible platform.',
    architecture: ['Static educational sections organize WCAG and testing content.', 'JavaScript supports search and interactive learning areas.', 'Responsive layouts keep content readable across devices.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'Semantic HTML', 'WCAG Guidelines'],
    accessibility: ['Accessibility is the project subject and implementation standard.', 'Content covers perceivable, operable, understandable, and robust design.', 'Screens and resources explain real testing tools.'],
    challenges: ['Organizing a large amount of educational material.', 'Keeping beginner explanations useful without oversimplifying professional accessibility work.'],
    outcome: 'The project demonstrates front-end development, information architecture, accessibility education, and WCAG-centered content design.',
    skills: ['Front-end development', 'Information architecture', 'WCAG education', 'Technical documentation'],
    future: ['Add an interactive accessibility checker.', 'Expand WCAG examples.', 'Improve search and learner progress tracking.']
  },
  {
    slug: 'stream-ripper',
    title: 'Stream-Ripper',
    subtitle: 'NVDA Add-on for Accessible Audio Stream Workflows',
    category: 'NVDA Add-on, Python, Automation',
    status: 'Open source utility',
    image: '/images/stream-ripper-gesture.png',
    imageAlt: 'NVDA Input Gestures dialog showing keyboard shortcuts available for the Stream-Ripper add-on.',
    summary: 'An accessibility-first NVDA add-on that detects supported media URLs, extracts audio streams with yt-dlp, and supports FFmpeg conversion.',
    overview: 'Stream-Ripper gives screen-reader users a keyboard-driven workflow for extracting and converting supported online audio streams.',
    problem: 'Audio extraction workflows often require command-line tools and manual steps that are not designed around screen-reader productivity.',
    solution: 'The add-on monitors supported URLs, manages extraction and conversion tasks, and announces progress through NVDA.',
    architecture: ['NVDA add-on code runs inside the screen reader environment.', 'Clipboard monitoring detects supported media links.', 'yt-dlp extracts audio streams.', 'FFmpeg handles optional conversion and output formats.'],
    technologies: ['Python', 'NVDA Add-on API', 'yt-dlp', 'FFmpeg', 'wxPython', 'JSON Configuration', 'Windows'],
    accessibility: ['Full keyboard navigation.', 'Screen-reader announcements for status and progress.', 'Accessible settings dialog and native NVDA integration.'],
    challenges: ['Managing background conversion tasks.', 'Integrating external tools without making users work in the command line.', 'Keeping progress feedback clear for screen-reader users.'],
    outcome: 'The project demonstrates how accessibility and automation can reduce friction in everyday media workflows.',
    skills: ['Python development', 'NVDA extension development', 'Audio processing', 'Automation', 'Accessible desktop UI'],
    future: ['Add more output profiles.', 'Improve queue reporting.', 'Document supported URL patterns more fully.']
  }
];

const services = [
  {
    title: 'Accessibility Services',
    icon: 'shield-check',
    description: 'Testing and guidance for teams that need accessible, keyboard-friendly, screen-reader compatible web experiences.',
    items: ['Website accessibility testing', 'Web application accessibility testing', 'Android app accessibility testing', 'WCAG 2.2 accessibility audits', 'NVDA and JAWS screen reader testing', 'Keyboard navigation testing', 'Accessibility reports', 'Accessibility consultation', 'Accessibility verification']
  },
  {
    title: 'Website Development',
    icon: 'layout',
    description: 'Accessible websites for individuals, organizations, educational teams, and small businesses.',
    items: ['Portfolio websites', 'Business websites', 'Personal websites', 'NGO websites', 'Educational websites', 'Landing pages', 'Responsive websites', 'Website redesign', 'Website maintenance']
  },
  {
    title: 'Node.js Development',
    icon: 'server',
    description: 'Server-rendered and API-driven Node.js applications built with maintainable Express architecture.',
    items: ['Express.js development', 'REST API development', 'Authentication systems', 'CRUD applications', 'Admin dashboards', 'Contact forms', 'EJS applications']
  },
  {
    title: 'Cloud and Deployment',
    icon: 'cloud',
    description: 'Practical deployment support for documented cloud targets and lightweight production environments.',
    items: ['Oracle Cloud VM deployment', 'Oracle Linux server configuration', 'Microsoft Azure App Service deployment', 'Microsoft Azure virtual machine deployment', 'Node.js production deployment', 'Linux server configuration', 'Nginx configuration', 'PM2 configuration', "SSL certificate setup with Let's Encrypt", 'Domain configuration', 'GitHub deployment', 'Website migration']
  },
  {
    title: 'Database Services',
    icon: 'database',
    description: 'SQL-focused database work aligned with the FunctionSid Oracle architecture and documented project experience.',
    items: ['Oracle Autonomous Database integration', 'Oracle SQL development', 'SQL database design', 'SQL query development']
  },
  {
    title: 'AI Integration',
    icon: 'bot',
    description: 'AI features for websites and tools, with an emphasis on retrieval, clarity, and practical user workflows.',
    items: ['AI chatbot integration', 'OpenAI API integration', 'AI search', 'AI features for websites', 'Prompt engineering']
  },
  {
    title: 'Maintenance and Support',
    icon: 'wrench',
    description: 'Ongoing care for small websites and Node.js applications that need reliability and clear documentation.',
    items: ['Website bug fixes', 'Website performance optimization', 'Security updates', 'Website monitoring', 'Content updates']
  },
  {
    title: 'Technical Documentation',
    icon: 'file-text',
    description: 'Readable technical documentation for projects, APIs, deployment processes, and maintenance handoff.',
    items: ['Project documentation', 'API documentation', 'Deployment documentation', 'Technical documentation', 'README creation']
  }
];

const skills = [
  { title: 'Accessibility', icon: 'shield-check', items: ['WCAG 2.2 AA', 'NVDA testing', 'JAWS testing', 'Keyboard navigation', 'Screen reader auditing', 'Semantic HTML', 'Accessible forms', 'Accessibility reports'] },
  { title: 'Frontend', icon: 'monitor', items: ['HTML5', 'CSS3', 'Bootstrap 5', 'Responsive design', 'Vanilla JavaScript', 'EJS templates', 'Accessible UI components'] },
  { title: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'REST APIs', 'MVC-style routing', 'Middleware', 'Server-rendered applications', 'Nodemailer integration'] },
  { title: 'Cloud', icon: 'cloud', items: ['Oracle Cloud Infrastructure', 'Oracle Linux', 'Microsoft Azure', 'Nginx', 'PM2', 'Certbot', 'GitHub deployment workflows'] },
  { title: 'AI', icon: 'brain', items: ['RAG pipelines', 'AI chatbot integration', 'Vector search', 'Prompt engineering', 'Source citation workflows', 'OpenAI API integration'] },
  { title: 'Databases', icon: 'database', items: ['Oracle Autonomous Database', 'Oracle SQL', 'SQL database design', 'SQLite in project case studies', 'Parameterized queries'] },
  { title: 'DevOps', icon: 'git-branch', items: ['Git', 'GitHub', 'Environment configuration', 'Linux server configuration', 'Application logging', 'Performance-aware deployment'] },
  { title: 'Programming Languages', icon: 'code-2', items: ['JavaScript', 'Python', 'SQL', 'HTML', 'CSS'] },
  { title: 'Tools', icon: 'wrench', items: ['VS Code', 'PowerShell', 'NVDA', 'JAWS', 'WAVE', 'Accessibility Insights', 'FFmpeg', 'yt-dlp'] },
  { title: 'Operating Systems', icon: 'hard-drive', items: ['Windows 11', 'Oracle Linux 9.8', 'Linux server environments'] }
];

const certifications = [
  { category: 'Technical and Accessibility', title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: 'Documented certification', credentialId: 'Not documented', skills: ['Azure fundamentals', 'Cloud concepts', 'Microsoft cloud services'] },
  { category: 'Technical and Accessibility', title: 'Web Development and Accessibility Testing', issuer: 'PBMA / HSBC', date: 'Documented certification', credentialId: 'Grade A, above 80%', skills: ['Web development', 'Accessibility testing', 'WCAG awareness'] },
  { category: 'Technical and Accessibility', title: 'Azure Data Engineering', issuer: 'GiftAbled / Publicis Sapient', date: 'Documented certification', credentialId: '96% average score', skills: ['Azure data concepts', 'Data engineering fundamentals'] },
  { category: 'Technical and Accessibility', title: 'Fundamentals of AI and ML', issuer: 'PBMA / VIT Pune', date: 'Documented certification', credentialId: 'Not documented', skills: ['AI fundamentals', 'Machine learning concepts'] },
  { category: 'Office and Productivity', title: 'Advance Microsoft Excel', issuer: 'EnAble India / Rotary Cochin', date: 'Documented certification', credentialId: 'Completed', skills: ['Spreadsheet workflows', 'Productivity'] },
  { category: 'Office and Productivity', title: 'MS Excel Intensive Training', issuer: 'Vision-Aid Academy', date: 'Documented certification', credentialId: 'Completed', skills: ['Excel operations', 'Accessible productivity'] },
  { category: 'Office and Productivity', title: 'Fundamentals of Outlook for Persons with Vision Impairment', issuer: 'EnAble India / Rotary Cochin', date: 'Documented certification', credentialId: 'Grade: Excellent', skills: ['Email productivity', 'Accessible Outlook workflows'] },
  { category: 'Communication and Soft Skills', title: 'Advanced Communication Course for Persons with Vision Impairment', issuer: 'EnAble India', date: 'Documented certification', credentialId: 'Grade A', skills: ['Communication', 'Professional readiness'] },
  { category: 'Communication and Soft Skills', title: 'Accessible Math with LaTeX', issuer: 'DivyaAbility Foundation', date: '16-hour intensive', credentialId: 'Completed', skills: ['Accessible math', 'LaTeX basics'] }
];

const timeline = [
  { period: 'B.Sc. education', title: 'Chemistry foundation', description: 'Completed a B.Sc. in Drugs and Dyes Chemistry from BNN College, Bhiwandi.' },
  { period: 'Family business and ISMT', title: 'Flour milling and operations exposure', description: 'Worked in the family flour mill business and pursued Flour Milling Technology at ISMT before vision loss changed the path.' },
  { period: 'Vision-loss adaptation', title: 'Assistive technology mastery', description: 'Adapted to complete vision loss by becoming highly proficient with NVDA, JAWS, and keyboard-first computer workflows.' },
  { period: 'Around 2022 onward', title: 'Software development transition', description: 'Started focused self-directed learning in web development, accessibility engineering, AI, databases, and cloud computing.' },
  { period: 'Current focus', title: 'FunctionSid portfolio and public work', description: 'Building accessible applications, AI/RAG tools, NVDA add-ons, and cloud-ready Node.js projects.' }
];

const learningRoadmap = ['Deeper Oracle Autonomous Database integration', 'Production accessibility testing workflows', 'AI retrieval quality and citation validation', 'Azure and OCI deployment practice', 'Maintainable documentation for long-term projects'];

module.exports = { profile, projects, services, skills, certifications, timeline, learningRoadmap };
