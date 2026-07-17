import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Project = {
  title: string;
  description: string;
  tech: string[];
  gitlink: string;
  site: string;
  category: string;
  /** Optional: path to a screenshot e.g. '/projects/lumos.png' (put file in /public/projects/) */
  image?: string | null;
};

// ─── Project Data ──────────────────────────────────────────────────────────────
const ReactData: Project[] = [
  {
    title: "Lumos-Learning-App",
    description: "A learning app designed for CP students to learn the English alphabet interactively.",
    tech: ["TypeScript", "TailwindCss", "React.js", "Vercel", "HTML5"],
    gitlink: "//github.com/abhishekalangad/Lumos-learning-app",
    site: "//lumos-learning-app-tau.vercel.app",
    category: "React",
    image: null,
  },
  {
    title: "Palakkad_Chatbot",
    description: "A specialized chatbot for discovering historical and scenic spots in Palakkad.",
    tech: ["React.js", "TypeScript", "TailwindCss", "HTML", "CSS", "Vite"],
    gitlink: "//github.com/abhishekalangad/Palakkad_chatbot",
    site: "//palakkad-chatbot.vercel.app",
    category: "React",
    image: null,
  },
  {
    title: "Portfolio",
    description: "A modern, highly visual, and dynamic portfolio showcasing my engineering skills and projects.",
    tech: ["React.js", "HTML", "CSS", "JavaScript", "FramerMotion", "Netlify"],
    gitlink: "//github.com/abhishekalangad/My_portfolio",
    site: "//abhishek-k-portfolio.vercel.app",
    category: "React",
    image: null,
  },
];

const PHPData: Project[] = [
  {
    title: "Car2Go",
    description: "An innovative car rental platform connecting renters with vehicles via a streamlined web flow.",
    tech: ["PHP", "HTML5", "CSS", "MySql", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/Car2Go",
    site: "",
    category: "PHP",
    image: "/assets/Car2Go.png",
  },
];

const PythonData: Project[] = [
  {
    title: "ShutterBug",
    description: "A professional photography networking hub where users discover photographers and models across categories.",
    tech: ["HTML", "CSS", "SCSS", "Bootstrap", "JavaScript", "Python", "Django"],
    gitlink: "",
    site: "",
    category: "Python",
    image: "/assets/ShutterBug.png",
  },
];

const JavaScriptData: Project[] = [
  {
    title: "AcadMate",
    description: "A collaborative study material hub providing notes, resources, and syllabi for MCA and MBA students.",
    tech: ["HTML", "CSS", "SCSS", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/AcadMate",
    site: "//acadmate-eight.vercel.app/",
    category: "JavaScript",
    image: null,
  },
  {
    title: "Shoe_Store",
    description: "A responsive online footwear storefront featuring smooth catalog displays and modern cart interactions.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/Shoe_Store_Ecommerce_WebSite",
    site: "//shoe-store-ecommerce-web-site.vercel.app",
    category: "JavaScript",
    image: null,
  },
];

const FlutterData: Project[] = [
  {
    title: "IncubateX",
    description: "A growth metrics tracking app helping startups monitor key performance metrics, milestones, and reports.",
    tech: ["HTML", "CSS", "Dart"],
    gitlink: "//github.com/abhishekalangad/IncubateX",
    site: "",
    category: "Flutter",
    image: "/assets/incubateX.png",
  },
];

const allProjects: Project[] = [...ReactData, ...JavaScriptData, ...PHPData, ...PythonData, ...FlutterData];
const categories = ["All", "React", "JavaScript", "PHP", "Python", "Flutter"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const formatUrl = (url: string): string => {
  if (!url) return '#';
  return url.startsWith('//') ? `https:${url}` : url;
};

const getProjectVisuals = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('lumos'))     return { gradient: 'from-purple-600 to-indigo-900',  icon: 'school' };
  if (t.includes('chatbot'))   return { gradient: 'from-emerald-600 to-teal-900',   icon: 'forum' };
  if (t.includes('portfolio')) return { gradient: 'from-zinc-700 to-zinc-950',      icon: 'terminal' };
  if (t.includes('car'))       return { gradient: 'from-cyan-600 to-blue-900',      icon: 'directions_car' };
  if (t.includes('shutter'))   return { gradient: 'from-rose-600 to-pink-900',      icon: 'photo_camera' };
  if (t.includes('acad'))      return { gradient: 'from-blue-600 to-indigo-900',    icon: 'menu_book' };
  if (t.includes('shoe'))      return { gradient: 'from-orange-600 to-red-900',     icon: 'shopping_bag' };
  if (t.includes('incubate'))  return { gradient: 'from-violet-600 to-fuchsia-950', icon: 'rocket_launch' };
  return { gradient: 'from-secondary to-primary', icon: 'deployed_code' };
};

// ─── IframeThumbnail ───────────────────────────────────────────────────────────
const IframeThumbnail: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1440);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex flex-col" ref={wrapperRef}>
      {/* Mini browser chrome */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border-b border-white/10 shrink-0">
        <div className="flex gap-1 shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white/10 rounded px-2 py-0.5 text-[9px] text-white/50 font-mono truncate min-w-0">
          {url.replace('https://', '')}
        </div>
        <div className="flex items-center gap-1 text-[9px] text-green-400 font-bold shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </div>
      </div>
      {/* Scaled iframe */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <iframe
          src={url}
          title={title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: '1440px',
            height: '900px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            border: 'none',
            display: 'block',
          }}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-neutral-400">Loading preview…</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── GradientThumbnail ─────────────────────────────────────────────────────────
const GradientThumbnail: React.FC<{ project: Project }> = ({ project }) => {
  const { gradient, icon } = getProjectVisuals(project.title);
  return (
    <div className={`w-full h-full bg-linear-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <span className="material-symbols-outlined text-white text-6xl opacity-85 drop-shadow-lg relative z-10">
        {icon}
      </span>
      <div className="absolute bottom-2 right-2 bg-black/30 text-white/60 text-[9px] px-2 py-0.5 rounded-full font-medium z-10">
        No live demo
      </div>
    </div>
  );
};

// ─── ProjectCard ───────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  scrollYProgress: any;
  colsCount: number;
  rowsCount: number;
  isDesktop: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project, index, scrollYProgress, colsCount, rowsCount, isDesktop,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasImage    = !!project.image && !imageError;
  const hasLiveSite = !!project.site;

  const col            = index % colsCount;
  const row            = Math.floor(index / colsCount);
  const centerCol      = (colsCount - 1) / 2;
  const centerRow      = (rowsCount - 1) / 2;
  const xOffsetFactor  = centerCol - col;
  const yOffsetFactor  = centerRow - row;
  const startX         = isDesktop ? `${xOffsetFactor * 110}%` : `${xOffsetFactor * 30}px`;
  const startY         = isDesktop ? `${yOffsetFactor * 110}%` : `${yOffsetFactor * 30}px`;
  const initialRotate  = xOffsetFactor * 6 + (row % 2 === 0 ? -2 : 2);
  const initialScale   = 0.65;
  const initialOpacity = 0.15;

  const desktopRange: [number, number] = [0.15, 0.75];
  const mobileRange:  [number, number] = [0.02, 0.28];
  const activeRange = isDesktop ? desktopRange : mobileRange;

  const x = isDesktop
    ? useTransform(scrollYProgress, (p: number) => {
        const [s, e] = activeRange;
        if (p <= s) return startX;
        if (p >= e) return '0%';
        return `${xOffsetFactor * 110 * (1 - (p - s) / (e - s))}%`;
      })
    : '0%';

  const y = isDesktop
    ? useTransform(scrollYProgress, (p: number) => {
        const [s, e] = activeRange;
        if (p <= s) return startY;
        if (p >= e) return '0%';
        return `${yOffsetFactor * 110 * (1 - (p - s) / (e - s))}%`;
      })
    : '0%';

  const scale = isDesktop
    ? useTransform(scrollYProgress, (p: number) => {
        const [s, e] = activeRange;
        if (p <= s) return initialScale;
        if (p >= e) return 1;
        return initialScale + (1 - initialScale) * ((p - s) / (e - s));
      })
    : 1;

  const opacity = isDesktop
    ? useTransform(scrollYProgress, (p: number) => {
        const [s, e] = [0.1, 0.65] as [number, number];
        if (p <= s) return initialOpacity;
        if (p >= e) return 1;
        return initialOpacity + (1 - initialOpacity) * ((p - s) / (e - s));
      })
    : 1;

  const rotate = isDesktop
    ? useTransform(scrollYProgress, (p: number) => {
        const [s, e] = activeRange;
        if (p <= s) return initialRotate;
        if (p >= e) return 0;
        return initialRotate * (1 - (p - s) / (e - s));
      })
    : 0;

  const distanceFromCenter = Math.abs(xOffsetFactor) + Math.abs(yOffsetFactor);
  const zIndex = Math.max(10, 50 - Math.round(distanceFromCenter * 10));
  const isMobileSwiper = scrollYProgress === null;

  return (
    <motion.div
      style={isDesktop ? { x, y, scale, opacity, rotate, zIndex } : { zIndex }}
      initial={(!isDesktop && !isMobileSwiper) ? { x: startX, y: startY, scale: 0.85, opacity: 0, rotate: initialRotate } : undefined}
      whileInView={(!isDesktop && !isMobileSwiper) ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 } : undefined}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer w-full h-full"
      onClick={() => {
        if (project.site)         window.open(formatUrl(project.site),    '_blank');
        else if (project.gitlink) window.open(formatUrl(project.gitlink), '_blank');
      }}
    >
      <div className="group-hover:scale-[1.02] transition-transform duration-500 bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl">

        {/* ── Thumbnail ── */}
        <div className="h-44 relative overflow-hidden">
          {hasImage ? (
            <img
              src={project.image!}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              onError={() => setImageError(true)}
            />
          ) : hasLiveSite ? (
            <IframeThumbnail url={formatUrl(project.site)} title={project.title} />
          ) : (
            <GradientThumbnail project={project} />
          )}

          {/* Hover action overlay */}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
            {hasLiveSite && (
              <button
                className="bg-white text-neutral-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-transform shadow-md"
                onClick={(e) => { e.stopPropagation(); window.open(formatUrl(project.site), '_blank'); }}
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                View Live
              </button>
            )}
            {project.gitlink && (
              <button
                className="bg-white/15 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-transform backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); window.open(formatUrl(project.gitlink), '_blank'); }}
              >
                <span className="material-symbols-outlined text-sm">code</span>
                GitHub
              </button>
            )}
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-primary text-sm mb-1 flex items-center justify-between gap-2">
              {project.title.replace(/[_-]/g, ' ')}
              <span className="material-symbols-outlined text-primary/40 group-hover:translate-x-1 transition-transform text-base shrink-0">
                arrow_forward
              </span>
            </h3>
            <p className="text-on-surface-variant text-xs leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Projects Section ──────────────────────────────────────────────────────────
export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const [isMobileScreen, setIsMobileScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const colsCount = isDesktop
    ? 4
    : (typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1);
  const rowsCount = Math.ceil(filteredProjects.length / colsCount);

  const rawGridY = useTransform(scrollYProgress, [0, 0.68, 1], [0, 0, -340]);
  const gridY    = useSpring(rawGridY, { stiffness: 60, damping: 18, mass: 0.8 });

  // On desktop, scroll back to start of Work section so the cluster animation
  // replays cleanly whenever the user switches category filters.
  // On mobile, reset the slider index.
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setMobileIndex(0);
    if (isDesktop && containerRef.current) {
      window.scrollTo({ top: containerRef.current.offsetTop, behavior: 'smooth' });
    }
  };

  // ── Shared category tab strip ────────────────────────────────────────────────
  const CategoryTabs = () => (
    <div className="flex flex-wrap justify-start md:justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={`relative px-5 py-2 rounded-full font-label-md transition-colors cursor-pointer text-xs font-semibold ${
            activeCategory === cat
              ? 'text-white'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute inset-0 bg-primary rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          {cat}
        </button>
      ))}
    </div>
  );

  // ── Desktop Layout ───────────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div
        ref={containerRef}
        id="work"
        className="relative bg-surface"
        style={{ height: '300vh', zIndex: 2 }}
      >
        <div
          className="sticky top-16 flex flex-col pt-6 pb-4 bg-surface overflow-hidden"
          style={{ zIndex: 10, height: 'calc(100vh - 4rem)' }}
        >
          <section className="px-margin-desktop lg:pl-32 lg:pr-margin-desktop max-w-container-max mx-auto w-full flex flex-col h-full">

            {/* Heading — shrink-0 so it never collapses */}
            <div className="relative z-100 bg-surface flex flex-col md:flex-row md:items-end justify-between mb-3 gap-4 pb-1 shrink-0">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-1">Projects</h2>
                <p className="text-on-surface-variant text-sm">
                  Quality-driven solutions for complex problems.
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-outline-variant opacity-30" />
            </div>

            {/* Category tabs — shrink-0 */}
            <div className="relative z-100 bg-surface border-b border-outline-variant/10 pb-3 mb-4 shrink-0">
              <CategoryTabs />
            </div>

            {/* Grid viewport — overflow-hidden clips cards so they never bleed up into the heading */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div style={{ y: gridY }} className="grid grid-cols-4 gap-6 pt-1">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={`${activeCategory}-${project.title}`}
                      project={project}
                      index={index}
                      scrollYProgress={scrollYProgress}
                      colsCount={colsCount}
                      rowsCount={rowsCount}
                      isDesktop={true}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ── Mobile Swipeable Carousel Layout (<768px) ────────────────────────────────
  if (isMobileScreen) {
    return (
      <section
        id="work"
        className="px-margin-mobile py-12 w-full relative bg-surface overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col mb-4 gap-1">
          <h2 className="font-headline-lg text-headline-lg text-primary">Selected Projects</h2>
          <p className="text-on-surface-variant text-xs">Quality-driven solutions for complex problems.</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 border-b border-outline-variant/10 pb-3">
          <CategoryTabs />
        </div>

        {/* Swipe instruction */}
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant/60 font-semibold mb-3 px-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">swipe</span> Swipe to explore
          </span>
          <span>{mobileIndex + 1} / {filteredProjects.length}</span>
        </div>

        {/* Swipe Carousel viewport */}
        <div className="relative overflow-visible w-full min-h-[380px]">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const threshold = 40;
              if (info.offset.x < -threshold && mobileIndex < filteredProjects.length - 1) {
                setMobileIndex(prev => prev + 1);
              } else if (info.offset.x > threshold && mobileIndex > 0) {
                setMobileIndex(prev => prev - 1);
              }
            }}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            animate={{ x: `calc(-${mobileIndex * 85}% - ${mobileIndex * 16}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: "100%" }}
          >
            {filteredProjects.map((project, idx) => {
              const isActive = idx === mobileIndex;
              return (
                <motion.div
                  key={`${activeCategory}-${project.title}`}
                  className="shrink-0 relative"
                  style={{ width: "85%" }}
                  animate={{ 
                    scale: isActive ? 1.0 : 0.93,
                    opacity: isActive ? 1.0 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard
                    project={project}
                    index={idx}
                    scrollYProgress={null}
                    colsCount={1}
                    rowsCount={filteredProjects.length}
                    isDesktop={false}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Controls (chevrons + page dots) */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => mobileIndex > 0 && setMobileIndex(prev => prev - 1)}
            disabled={mobileIndex === 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center border border-outline-variant/30 text-primary transition-all bg-surface-container-lowest shadow-sm ${
              mobileIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>

          <div className="flex gap-1.5 items-center">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === mobileIndex 
                    ? "w-5 bg-primary" 
                    : "w-2 bg-outline-variant/50 hover:bg-outline-variant"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => mobileIndex < filteredProjects.length - 1 && setMobileIndex(prev => prev + 1)}
            disabled={mobileIndex === filteredProjects.length - 1}
            className={`w-9 h-9 rounded-full flex items-center justify-center border border-outline-variant/30 text-primary transition-all bg-surface-container-lowest shadow-sm ${
              mobileIndex === filteredProjects.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </section>
    );
  }

  // ── Tablet Layout (>=768px, <1024px) ─────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      id="work"
      className="px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto w-full relative"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Selected Projects</h2>
          <p className="text-on-surface-variant">Quality-driven solutions for complex problems.</p>
        </div>
        <div className="hidden md:block h-px flex-1 mx-12 bg-outline-variant opacity-30" />
      </div>

      <div className="mb-10 border-b border-outline-variant/10 pb-4">
        <CategoryTabs />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${activeCategory}-${project.title}`}
              project={project}
              index={index}
              scrollYProgress={mobileScrollProgress}
              colsCount={colsCount}
              rowsCount={rowsCount}
              isDesktop={false}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
