'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Mail, Play, Pause, X, Video, LayoutGrid, Film, TrendingUp, Clock, Users, Sparkles } from 'lucide-react'

type Project = {
  id: string
  number: string
  title: string
  caption: string
  type: string
  year: string
  studio: string
  clips: { src: string; poster: string; label: string }[]
  accent: string
}

const FADE_OUT = 'fade-out'
const FADE_IN = 'fade-in'
const FADE_IN_DELAY = 'fade-in-delay'
const FADE_IN_DELAY2 = 'fade-in-delay2'

const projects: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'After the Rain',
    caption: 'Brand film · Edit',
    type: 'Brand film / Edit',
    year: '2024',
    studio: 'LAGOS / NDOKA',
    clips: [
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80', label: '00:12' },
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80', label: '00:36' },
    ],
    accent: 'bg-[#dfe8dd]',
  },
  {
    id: '02',
    number: '02',
    title: 'Soft Focus',
    caption: 'Social campaign · Edit',
    type: 'Social campaign / Edit',
    year: '2024',
    studio: 'LAGOS / IBADAN',
    clips: [
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80', label: '00:09' },
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80', label: '01:14' },
    ],
    accent: 'bg-[#f0dfd2]',
  },
  {
    id: '03',
    number: '03',
    title: 'Made in Motion',
    caption: 'Commercial · Direction',
    type: 'Commercial / Direction',
    year: '2023',
    studio: 'LAGOS / PORT-HARCOURT',
    clips: [
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80', label: '00:24' },
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80', label: '00:47' },
    ],
    accent: 'bg-[#e4e1ed]',
  },
  {
    id: '04',
    number: '04',
    title: 'The Long Way Home',
    caption: 'Documentary · Edit',
    type: 'Documentary / Edit',
    year: '2023',
    studio: 'LAGOS / OWERRI',
    clips: [
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', label: '00:18' },
      { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', label: '01:02' },
    ],
    accent: 'bg-[#e7e5d9]',
  },
]

const portfolioClips = [
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85', label: '00:12' },
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1600&q=85', label: '00:41' },
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85', label: '01:09' },
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85', label: '01:31' },
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85', label: '01:58' },
  { src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', poster: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1600&q=85', label: '02:14' },
]

const yearRange = (projects: Project[]) => {
  const years = projects.map((p) => parseInt(p.year, 10))
  return { min: Math.min(...years), max: Math.max(...years) }
}

function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(' ')
}

export default function Page() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeClip, setActiveClip] = useState(0)
  const [clipPlaying, setClipPlaying] = useState(false)
  const [range, setRange] = useState(0)

  const { scrollY } = useScroll()
  const opacity = useSpring(useTransform(scrollY, [0, 120], [1, 0.97]), { stiffness: 120, damping: 30, mass: 0.8 })
  const y = useSpring(useTransform(scrollY, [0, 140], [0, 18]), { stiffness: 100, damping: 30 })

  const playClip = (i: number, video: HTMLVideoElement) => {
    setActiveClip(i)
    setClipPlaying(true)
    video.play().catch(() => {})
  }

  const stopClip = (video: HTMLVideoElement) => {
    setClipPlaying(false)
    video.pause()
    video.currentTime = 0
  }

  const stepClip = (dir: 1 | -1) => {
    const count = portfolioClips.length
    setActiveClip((prev) => (prev + dir + count) % count)
    setClipPlaying(true)
  }

  const toRange = (target: number) => {
    setRange(target)
    setClipPlaying(true)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f5f1] text-[#171817]">
      <div style={{ position: 'relative' }}>
        <nav className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <a href="#top" className="text-sm font-semibold tracking-[-0.03em] text-[#171817]">
            OLUWALEKE / VISUALS
          </a>
          <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.16em] text-[#62635d] md:flex">
            <a href="#work" className="transition-colors hover:text-[#c85f3f]">Selected work</a>
            <a href="#about" className="transition-colors hover:text-[#c85f3f]">About</a>
            <a href="#contact" className="transition-colors hover:text-[#c85f3f]">Contact</a>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[#171817]/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[#171817] transition hover:bg-[#171817]/5 md:hidden"
          >
            <span className={menuOpen ? 'block' : 'hidden'}>Close</span>
            <span className={menuOpen ? 'hidden' : 'block'}>Menu</span>
          </button>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-5 flex flex-col gap-3 border-t border-[#171817]/15 pt-5 text-sm md:hidden"
          >
            {['#work', '#about', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-[#171817] transition hover:bg-[#171817]/5"
              >
                {href === '#work' ? 'Selected work' : href === '#about' ? 'About' : 'Contact'}
              </a>
            ))}
          </motion.div>
        )}

        <div className="pointer-events-none fixed inset-x-0 bottom-0 h-14 md:h-20" />

        <motion.section
          id="top"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className
