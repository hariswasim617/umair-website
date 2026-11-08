/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Everything you see on the website lives in this one file.
 *  Edit text, links and images here — no need to touch components.
 * ─────────────────────────────────────────────────────────────
 *
 *  REPLACING IMAGES
 *  1. Put your photo in /public/images (e.g. /public/images/umair.jpg)
 *  2. Change the path below (e.g. profile.image = '/images/umair.jpg')
 *  Project cards show built-in artwork when `image` is null. Set `image`
 *  to a path in /public/images to use your own photograph instead.
 */

export const profile = {
  name: 'Muhammad Umair',
  firstName: 'Umair',
  title: 'Medical Student | Aspiring Doctor',
  location: 'Lahore, Pakistan',
  year: 'First Year MBBS Student',
  college: 'Amna Inayat Medical College',
  status: 'On a Journey of Continuous Learning',
  intro:
    'A medical student passionate about medicine, communication, Quranic recitation, creativity and technology.',
  supporting:
    'I believe in continuous learning, personal development and using knowledge and creativity to make a meaningful impact.',
  philosophy: [
    { lead: 'Medicine', rest: 'is my academic journey.' },
    { lead: 'Learning', rest: 'is my mindset.' },
    { lead: 'Creativity', rest: 'is my expression.' },
  ],
  // Replace with your own photographs (see note at the top of this file).
  image: '/images/profile-placeholder.svg',
  aboutImage: '/images/profile-placeholder.svg',
  imageAlt: 'Portrait of Muhammad Umair',
  // Replace /public/cv/Muhammad-Umair-CV.pdf with your real CV (same file name).
  cv: '/cv/Muhammad-Umair-CV.pdf',
}

export const contact = {
  email: 'umair206@gmail.com',
  whatsappDisplay: '+92 346 4181699',
  whatsappNumber: '923464181699',
  youtubeHandle: '@HidayatulQuran-qari',
  youtubeUrl: 'https://www.youtube.com/@HidayatulQuran-qari',
  instagramName: 'Hidayat ul Quran',
  // Add the exact profile link once known, e.g. 'https://www.instagram.com/your_handle/'.
  // While empty, Instagram buttons open an Instagram search for the page name.
  instagramUrl: '',
}

export const instagramHref =
  contact.instagramUrl ||
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(contact.instagramName)}`

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}`
export const emailHref = `mailto:${contact.email}`

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'interests', label: 'Interests' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  heading: ['More Than Just a', 'Medical Student.'],
  paragraphs: [
    'I am Muhammad Umair, a first-year MBBS student at Amna Inayat Medical College, Pakistan.',
    'Beyond my medical education, I have a strong interest in communication, public speaking, technology and digital content creation.',
    'I have a passion for Urdu speech delivery and Quranic recitation, and I have completed Tajweed studies. I also enjoy working on digital media projects, audio and video editing, and technology-based experiments.',
    'I believe that education is not limited to textbooks. Developing communication skills, exploring new technologies and improving personal abilities are equally important parts of growth.',
    'My goal is to become a knowledgeable and compassionate medical professional while continuing to explore my creative and technological interests.',
  ],
  facts: [
    { icon: 'GraduationCap', label: 'Studying', value: 'MBBS — First Year' },
    { icon: 'Building2', label: 'College', value: 'Amna Inayat Medical College' },
    { icon: 'MapPin', label: 'Based in', value: 'Lahore, Pakistan' },
    { icon: 'BookOpenText', label: 'Tajweed', value: 'Studies completed' },
  ],
}

export const interests = [
  {
    title: 'Medical Sciences',
    icon: 'Stethoscope',
    accent: '#3B82F6',
    items: [
      'Medical education',
      'Anatomy and Physiology',
      'Biochemistry',
      'Continuous academic development',
    ],
  },
  {
    title: 'Quranic Studies',
    icon: 'BookOpen',
    accent: '#10B981',
    items: [
      'Quranic recitation',
      'Tajweed',
      'Quran learning and teaching',
      'Islamic educational content',
    ],
  },
  {
    title: 'Communication & Public Speaking',
    icon: 'MicVocal',
    accent: '#A78BFA',
    items: [
      'Urdu speech delivery',
      'Public speaking',
      'Presentation skills',
      'Effective communication',
    ],
  },
  {
    title: 'Technology & Creativity',
    icon: 'Cpu',
    accent: '#06B6D4',
    items: [
      'Electronics and IoT projects',
      'Digital content creation',
      'Audio and video editing',
      'Exploring new technologies',
    ],
  },
]

export const skills = [
  {
    title: 'Medical & Academic',
    icon: 'Microscope',
    accent: '#3B82F6',
    span: 'lg:col-span-5',
    items: [
      { label: 'Medical studies', icon: 'HeartPulse' },
      { label: 'Academic presentations', icon: 'Presentation' },
      { label: 'Research and independent learning', icon: 'Library' },
    ],
  },
  {
    title: 'Communication',
    icon: 'MicVocal',
    accent: '#A78BFA',
    span: 'lg:col-span-7',
    items: [
      { label: 'Urdu public speaking', icon: 'Languages' },
      { label: 'Speech delivery', icon: 'Mic' },
      { label: 'Quranic recitation', icon: 'BookOpen' },
      { label: 'Tajweed', icon: 'BookOpenText' },
    ],
  },
  {
    title: 'Digital & Technical',
    icon: 'CircuitBoard',
    accent: '#06B6D4',
    span: 'lg:col-span-7',
    items: [
      { label: 'Video editing', icon: 'Clapperboard' },
      { label: 'Audio recording and editing', icon: 'AudioLines' },
      { label: 'Content creation', icon: 'Sparkles' },
      { label: 'Electronics projects', icon: 'Cpu' },
      { label: 'Basic technology and IoT experimentation', icon: 'Wifi' },
      { label: 'Graphic designing', icon: 'Palette' },
      { label: 'Digital marketing', icon: 'Megaphone' },
    ],
  },
  {
    title: 'Personal',
    icon: 'Compass',
    accent: '#F59E0B',
    span: 'lg:col-span-5',
    items: [
      { label: 'Communication', icon: 'MessageCircle' },
      { label: 'Creativity', icon: 'Lightbulb' },
      { label: 'Continuous learning', icon: 'Infinity' },
      { label: 'Teamwork', icon: 'Users' },
      { label: 'Presentation skills', icon: 'Presentation' },
    ],
  },
]

/**
 * `art` selects built-in artwork. Set `image` to '/images/your-photo.jpg'
 * to replace the artwork with your own thumbnail.
 */
export const projects = [
  {
    id: 'hidayat-ul-quran',
    featured: true,
    category: 'Quranic Education',
    title: 'Hidayat ul Quran',
    description:
      'An educational Quranic platform focused on Quran recitation, Tajweed and Islamic learning.',
    involvementTitle: 'My involvement',
    involvement: [
      'Quranic recitation',
      'Audio recording and editing',
      'Digital content creation',
      'Social media management',
      'Developing educational content',
    ],
    tags: ['Recitation', 'Tajweed', 'Audio Editing', 'Content Creation', 'Social Media'],
    art: 'quran',
    image: null,
    accent: '#10B981',
    links: [
      { type: 'youtube', label: 'YouTube', detail: contact.youtubeHandle, href: contact.youtubeUrl },
      { type: 'instagram', label: 'Instagram', detail: contact.instagramName, href: instagramHref },
    ],
  },
  {
    id: 'electronics-iot',
    category: 'Electronics',
    title: 'Electronics & IoT Projects',
    description:
      'Exploring electronics, microcontrollers and smart automation through practical experimentation.',
    involvementTitle: 'Project interests',
    involvement: [
      'ESP8266-based projects',
      'Wi-Fi-controlled appliances',
      'Infrared remote control',
      'Relay-based automation',
    ],
    tags: ['ESP8266', 'Wi-Fi', 'Infrared', 'Relays', 'Automation'],
    art: 'circuit',
    image: null,
    accent: '#06B6D4',
    links: [],
  },
  {
    id: 'academic',
    category: 'Academic',
    title: 'Academic Projects',
    description:
      'Participating in medical academic presentations, scientific learning projects and collaborative educational activities.',
    tags: ['Presentations', 'Medical Science', 'Collaboration', 'Teamwork'],
    art: 'academic',
    image: null,
    accent: '#3B82F6',
    links: [],
  },
  {
    id: 'digital-media',
    category: 'Digital Media',
    title: 'Digital Media Projects',
    description:
      'Creating and exploring digital media through audio recording, video production, editing and social media content.',
    tags: ['Audio Recording', 'Video Production', 'Editing', 'Social Media'],
    art: 'media',
    image: null,
    accent: '#A78BFA',
    links: [{ type: 'youtube', label: 'See it on YouTube', href: contact.youtubeUrl }],
  },
]

export const education = [
  {
    degree: 'MBBS',
    school: 'Amna Inayat Medical College, Pakistan',
    status: 'Currently studying — First Year',
    current: true,
    icon: 'Stethoscope',
  },
  {
    degree: 'Intermediate (FSc)',
    school: 'Cantt Public College for Boys',
    icon: 'FlaskConical',
  },
  {
    degree: 'Matriculation',
    school: 'Crescent Public High School',
    icon: 'School',
  },
]

export const certifications = [
  {
    title: 'Tajweed Studies',
    status: 'Completed',
    description: 'Rules of correct Quranic pronunciation and recitation.',
    icon: 'BookOpenText',
    accent: '#10B981',
  },
  {
    title: 'Graphic Designing',
    description: 'Visual composition, layout and design for digital content.',
    icon: 'Palette',
    accent: '#A78BFA',
  },
  {
    title: 'Digital Marketing',
    description: 'Reaching and engaging audiences through digital platforms.',
    icon: 'Megaphone',
    accent: '#06B6D4',
  },
]

export const vision = {
  heading: ['Learning Today.', 'Healing Tomorrow.'],
  paragraphs: [
    'My vision is to continuously develop myself in medicine, communication, technology and education.',
    'I aspire to become a medical professional who combines knowledge, compassion, discipline and effective communication while contributing positively to society.',
  ],
  values: ['Knowledge', 'Compassion', 'Discipline', 'Communication'],
}
