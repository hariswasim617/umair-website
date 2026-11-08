import {
  AudioLines, BookOpen, BookOpenText, Building2, CircuitBoard, Clapperboard, Compass, Cpu,
  FlaskConical, GraduationCap, HeartPulse, Infinity as InfinityIcon, Languages, Library,
  Lightbulb, MapPin, Megaphone, MessageCircle, Mic, MicVocal, Microscope, Palette,
  Presentation, School, Sparkles, Stethoscope, Users, Wifi,
} from 'lucide-react'

const icons = {
  AudioLines, BookOpen, BookOpenText, Building2, CircuitBoard, Clapperboard, Compass, Cpu,
  FlaskConical, GraduationCap, HeartPulse, Infinity: InfinityIcon, Languages, Library,
  Lightbulb, MapPin, Megaphone, MessageCircle, Mic, MicVocal, Microscope, Palette,
  Presentation, School, Sparkles, Stethoscope, Users, Wifi,
}

/** Renders a Lucide icon from a string name used in src/data/content.js */
export default function Icon({ name, ...props }) {
  const Cmp = icons[name] ?? Sparkles
  return <Cmp aria-hidden="true" {...props} />
}
