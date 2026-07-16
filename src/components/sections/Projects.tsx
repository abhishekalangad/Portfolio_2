import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// User's project data categorized by technology
const ReactData = [
  {
    title: "Lumos-Learning-App",
    description: "A learning app designed for CP students to learn the English alphabet interactively.",
    tech: ["TypeScript", "TailwindCss", "React.js", "Vercel", "HTML5"],
    gitlink: "//github.com/abhishekalangad/Lumos-learning-app",
    site: "//lumos-learning-app-tau.vercel.app",
    category: "React"
  },
  {
    title: "Palakkad_Chatbot",
    description: "A specialized chatbot designed for discovering historical and scenic spots in Palakkad.",
    tech: ["React.js", "TypeScript", "TailwindCss", "HTML", "CSS", "Vite"],
    gitlink: "//github.com/abhishekalangad/Palakkad_chatbot",
    site: "//palakkad-chatbot.vercel.app",
    category: "React"
  },
  {
    title: "Portfolio",
    description: "A modern, highly visual, and dynamic portfolio showcasing my engineering skills and projects.",
    tech: ["React.js", "HTML", "CSS", "JavaScript", "FramerMotion", "Netlify"],
    gitlink: "//github.com/abhishekalangad/My_portfolio",
    site: "//abhishek-k-portfolio.vercel.app",
    category: "React"
  }
];

const PHP = [
  {
    title: "Car2Go",
    description: "An innovative car rental platform connecting renters with vehicles via a streamlined web flow.",
    tech: ["PHP", "HTML5", "CSS", "MySql", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/Car2Go",
    site: "",
    category: "PHP"
  }
];

const Python = [
  {
    title: "ShutterBug",
    description: "A professional photography networking hub where users discover photographers and models across categories.",
    tech: ["HTML", "CSS", "SCSS", "Bootstrap", "JavaScript", "Python", "Django"],
    gitlink: "",
    site: "",
    category: "Python"
  }
];

const javascript = [
  {
    title: "AcadMate",
    description: "A collaborative study material hub providing notes, resources, and syllabi for MCA and MBA students.",
    tech: ["HTML", "CSS", "SCSS", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/AcadMate",
    site: "//acadmate-eight.vercel.app/",
    category: "JavaScript"
  },
  {
    title: "Shoe_Store",
    description: "A responsive online footwear storefront featuring smooth catalog displays and modern cart interactions.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    gitlink: "//github.com/abhishekalangad/Shoe_Store_Ecommerce_WebSite",
    site: "//shoe-store-ecommerce-web-site.vercel.app",
    category: "JavaScript"
  }
];

const Flutter = [
  {
    title: "IncubateX",
    description: "A growth metrics tracking app helping startups monitor key performance metrics, milestones, and reports.",
    tech: ["HTML", "CSS", "Dart"],
    gitlink: "//github.com/abhishekalangad/IncubateX",
    site: "",
    category: "Flutter"
  }
];

const allProjects = [...ReactData, ...javascript, ...PHP, ...Python, ...Flutter];
const categories = ["All", "React", "JavaScript", "PHP", "Python", "Flutter"];

// Helper to determine the visual styling of card banners based on project title
const getProjectVisuals = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("lumos")) {
    return {
      gradient: "from-purple-600 to-indigo-900",
      icon: "school",
      bgElements: ["A", "B", "C", "Edu"]
    };
  }
  if (lowerTitle.includes("chatbot")) {
    return {
      gradient: "from-emerald-600 to-teal-900",
      icon: "forum",
      bgElements: ["Chat", "AI", "Bot"]
    };
  }
  if (lowerTitle.includes("portfolio")) {
    return {
      gradient: "from-zinc-800 to-zinc-950",
      icon: "terminal",
      bgElements: ["</>", "Code", "Web"]
    };
  }
  if (lowerTitle.includes("car2go") || lowerTitle.includes("car")) {
    return {
      gradient: "from-cyan-600 to-blue-900",
      icon: "directions_car",
      bgElements: ["Rent", "Go", "Drive"]
    };
  }
  if (lowerTitle.includes("shutter")) {
    return {
      gradient: "from-rose-600 to-pink-900",
      icon: "photo_camera",
      bgElements: ["Cam", "Focus", "Lens"]
    };
  }
  if (lowerTitle.includes("acad")) {
    return {
      gradient: "from-blue-600 to-indigo-900",
      icon: "menu_book",
      bgElements: ["Study", "MCA", "MBA"]
    };
  }
  if (lowerTitle.includes("shoe")) {
    return {
      gradient: "from-orange-600 to-red-900",
      icon: "shopping_bag",
      bgElements: ["Shop", "Shoe", "Cart"]
    };
  }
  if (lowerTitle.includes("incubate")) {
    return {
      gradient: "from-violet-600 to-fuchsia-950",
      icon: "rocket_launch",
      bgElements: ["Grow", "Metric", "X"]
    };
  }
  return {
    gradient: "from-secondary to-primary",
    icon: "deployed_code",
    bgElements: ["App", "Dev"]
  };
};

const formatUrl = (url: string) => {
  if (!url) return "#";
  return url.startsWith("//") ? `https:${url}` : url;
};

interface ProjectCardProps {
  project: any;
  index: number;
  scrollYProgress: any;
  colsCount: number;
  rowsCount: number;
  isDesktop: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  scrollYProgress,
  colsCount,
  rowsCount,
  isDesktop
}) => {
  const col = index % colsCount;
  const row = Math.floor(index / colsCount);
  
  const centerCol = (colsCount - 1) / 2;
  const centerRow = (rowsCount - 1) / 2;
  
  const xOffsetFactor = centerCol - col;
  const yOffsetFactor = centerRow - row;
  
  // Calculate start offsets for the cluster effect ("coming from inside")
  const startX = `${xOffsetFactor * 110}%`;
  const startY = `${yOffsetFactor * 110}%`;
  
  // Outer stack rotations and scale factors
  const initialRotate = xOffsetFactor * 6 + (row % 2 === 0 ? -2 : 2);
  const initialScale = 0.65;
  const initialOpacity = 0.15;
  
  // Scroll transformations mapping (progressive range on desktop, snappy range on mobile/tablet)
  const desktopRange: [number, number] = [0.15, 0.75];
  const mobileRange: [number, number] = [0.02, 0.28];
  const activeRange = isDesktop ? desktopRange : mobileRange;

  const x = useTransform(scrollYProgress, (progress: number) => {
    const [start, end] = activeRange;
    if (progress <= start) return startX;
    if (progress >= end) return "0%";
    const p = (progress - start) / (end - start);
    return `${xOffsetFactor * 110 * (1 - p)}%`;
  });

  const y = useTransform(scrollYProgress, (progress: number) => {
    const [start, end] = activeRange;
    if (progress <= start) return startY;
    if (progress >= end) return "0%";
    const p = (progress - start) / (end - start);
    return `${yOffsetFactor * 110 * (1 - p)}%`;
  });

  const scale = useTransform(scrollYProgress, (progress: number) => {
    const [start, end] = activeRange;
    if (progress <= start) return initialScale;
    if (progress >= end) return 1;
    const p = (progress - start) / (end - start);
    return initialScale + (1 - initialScale) * p;
  });

  const opacity = useTransform(scrollYProgress, (progress: number) => {
    const [start, end] = isDesktop ? [0.1, 0.65] : [0.01, 0.24];
    if (progress <= start) return initialOpacity;
    if (progress >= end) return 1;
    const p = (progress - start) / (end - start);
    return initialOpacity + (1 - initialOpacity) * p;
  });

  const rotate = useTransform(scrollYProgress, (progress: number) => {
    const [start, end] = activeRange;
    if (progress <= start) return initialRotate;
    if (progress >= end) return 0;
    const p = (progress - start) / (end - start);
    return initialRotate * (1 - p);
  });
  
  // Stack layers so center cards reside on top initially
  const distanceFromCenter = Math.abs(xOffsetFactor) + Math.abs(yOffsetFactor);
  const zIndex = Math.max(10, 50 - Math.round(distanceFromCenter * 10));

  const visuals = getProjectVisuals(project.title);

  const handleCardClick = () => {
    if (project.site) {
      window.open(formatUrl(project.site), "_blank");
    } else if (project.gitlink) {
      window.open(formatUrl(project.gitlink), "_blank");
    }
  };

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate, zIndex }}
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="group-hover:scale-[1.03] transition-all duration-500 bg-surface border border-outline-variant/20 rounded-3xl overflow-hidden organic-shadow flex flex-col h-full">
        {/* Visual Gradient Header - aspect-[2/1] on desktop, aspect-4/3 on mobile */}
        <div className={`aspect-4/3 ${isDesktop ? 'lg:aspect-3/1' : ''} bg-linear-to-br ${visuals.gradient} relative overflow-hidden flex items-center justify-center`}>
          {/* Collage background tags */}
          {visuals.bgElements.map((el, i) => (
            <span
              key={i}
              className="absolute font-display-lg font-bold text-white/5 text-[3.5rem] select-none pointer-events-none uppercase tracking-widest"
              style={{
                top: `${(i * 30) % 70 + 5}%`,
                left: `${(i * 35) % 65 + 5}%`,
                transform: `rotate(${(i * 15) - 30}deg)`,
              }}
            >
              {el}
            </span>
          ))}

          {/* Centralized Icon */}
          <span className="material-symbols-outlined text-white text-6xl opacity-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
            {visuals.icon}
          </span>
          
          {/* Interactive Tag Hover Overlay */}
          <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <span className="bg-surface text-primary px-5 py-2.5 rounded-full font-label-md shadow-lg flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-sm">visibility</span> View Project
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-primary mb-1 flex items-center justify-between gap-2 text-base">
              {project.title.replace(/-/g, " ")}
              <span className="material-symbols-outlined text-primary/40 group-hover:translate-x-1.5 transition-transform text-lg">
                arrow_forward
              </span>
            </h3>
            <p className="text-on-surface-variant text-xs leading-relaxed mb-2 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div>
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tech.map((t: string, idx: number) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>


          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  const colsCount = isDesktop ? 4 : (window.innerWidth >= 768 ? 2 : 1);
  const rowsCount = Math.ceil(filteredProjects.length / colsCount);

  // Grid vertical pan: after cards land (progress > 0.70), pan up to reveal row 2.
  // Maps [0.70 → 1.0] scroll range to [0px → -320px] grid shift.
  const rawGridY = useTransform(scrollYProgress, [0, 0.68, 1], [0, 0, -340]);
  const gridY = useSpring(rawGridY, { stiffness: 60, damping: 18, mass: 0.8 });




  if (isDesktop) {
    return (
      <div 
        ref={containerRef} 
        className="relative transition-all duration-300 bg-surface" 
        style={{ height: "300vh", zIndex: 2 }}
        id="work"
      >
        <div className="sticky top-16 flex flex-col justify-start overflow-hidden pt-6 pb-4 bg-surface" style={{ zIndex: 10, height: 'calc(100vh - 4rem)' }}>
          <section className="px-margin-desktop lg:pl-32 lg:pr-margin-desktop max-w-container-max mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-1">Projects</h2>
                <p className="text-on-surface-variant text-sm">Quality-driven solutions for complex problems.</p>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-outline-variant opacity-30"></div>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap justify-start md:justify-center gap-2 mb-4 border-b border-outline-variant/10 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 rounded-full font-label-md transition-colors cursor-pointer text-xs font-semibold ${
                    activeCategory === cat ? "text-white" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Layout Container — pans upward on scroll to reveal row 2 */}
            <motion.div
              style={{ y: gridY }}
              className="grid grid-cols-4 gap-6 relative"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={`${activeCategory}-${project.title}-${index}`}
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
          </section>





        </div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto w-full transition-all duration-300 relative"
      id="work"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Selected Projects</h2>
          <p className="text-on-surface-variant">Quality-driven solutions for complex problems.</p>
        </div>
        <div className="hidden md:block h-px flex-1 mx-12 bg-outline-variant opacity-30"></div>
      </div>

      {/* Category Switcher Tabs */}
      <div className="flex flex-wrap justify-start md:justify-center gap-2 mb-10 border-b border-outline-variant/10 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-5 py-2 rounded-full font-label-md transition-colors cursor-pointer text-xs font-semibold ${
              activeCategory === cat ? "text-white" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${activeCategory}-${project.title}-${index}`}
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


