# 🚀 Premium Developer Portfolio (React + TypeScript + Tailwind + Vite)

<div align="center" style="margin: 30px 0;">
<div style="position: relative; width: 100%; max-width: 760px; padding-bottom: 40px;">
<!-- 🖥️ Desktop Monitor Device Frame -->
<div style="width: 100%; max-width: 680px; margin: 0 auto; background: #121212; border: 10px solid #2d2d2d; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.35); overflow: hidden; display: flex; flex-direction: column;">
<!-- Mock Browser Header -->
<div style="background: #1e1e1e; padding: 8px 12px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #121212;">
<div style="display: flex; gap: 5px;">
<span style="width: 8px; height: 8px; border-radius: 50%; background: #ff5f56; display: inline-block;"></span>
<span style="width: 8px; height: 8px; border-radius: 50%; background: #ffbd2e; display: inline-block;"></span>
<span style="width: 8px; height: 8px; border-radius: 50%; background: #27c93f; display: inline-block;"></span>
</div>
<div style="flex: 1; background: #0c0c0c; border-radius: 4px; font-family: monospace; font-size: 10px; color: #8a8a8a; padding: 4px 8px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
https://abhishek-k-portfolio.vercel.app
</div>
</div>
<!-- Interactive Web Page Viewport -->
<div style="position: relative; width: 100%; height: 350px; background: #fff;">
<iframe src="https://abhishek-k-portfolio.vercel.app" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" scrolling="yes"></iframe>
</div>
</div>
<!-- Monitor Stand & Base -->
<div style="width: 110px; height: 35px; background: #252525; margin: 0 auto; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);"></div>
<div style="width: 180px; height: 4px; background: #1c1c1c; margin: 0 auto; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
<!-- 📱 Mobile Phone Device Frame (Floating Overlapping Preview) -->
<div style="position: absolute; bottom: 10px; right: 0; width: 180px; height: 360px; background: #121212; border: 8px solid #2d2d2d; border-radius: 28px; box-shadow: 0 25px 50px rgba(0,0,0,0.45); overflow: hidden; display: flex; flex-direction: column; z-index: 100;">
<!-- Mock phone notch -->
<div style="background: #2d2d2d; height: 12px; width: 80px; margin: 0 auto; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; position: absolute; top: 0; left: 50%; transform: translateX(-50%); z-index: 150;"></div>
<!-- Interactive Web Page Viewport -->
<div style="flex: 1; width: 100%; height: 100%; position: relative; background: #fff; padding-top: 10px;">
<iframe src="https://abhishek-k-portfolio.vercel.app" style="position: absolute; top: 10px; left: 0; width: 100%; height: 100%; border: none;" scrolling="yes"></iframe>
</div>
<!-- Home Indicator line -->
<div style="background: #121212; padding: 4px 0; display: flex; justify-content: center; align-items: center;">
<span style="width: 60px; height: 3px; border-radius: 10px; background: #555;"></span>
</div>
</div>
</div>
</div>

A modern, highly interactive, and visually stunning developer portfolio tailored for Full-Stack Developers, Python Engineers, and ERPNext/Frappe specialists. It features scroll-spy navigation, a 3D atomic orbits skills display, an interactive work terminal timeline, and live browser mocks for projects.

---

## 💻 Live Screen Section Preview (Mockup Design)

When viewing projects with deployment links, the portfolio embeds a live viewport mockup styled like a modern computer screen/web browser window:

```
 ┌──────────────────────────────────────────────────────────┐
 │ ● ● ●   https://abhishek-k-portfolio.vercel.app     [LIVE]│ ◄── Browser Chrome (Traffic dots & URL)
 ├──────────────────────────────────────────────────────────┤
 │                                                          │
 │                                                          │
 │              [ LIVE DEPLOYED LANDING PAGE ]              │ ◄── Interactive scaled iframe preview
 │                                                          │
 │                                                          │
 └──────────────────────────────────────────────────────────┘
```

- **Responsive Scaling**: The embedded website scales dynamically to fit the card layout using a `ResizeObserver` script.
- **Static Fallback**: Automatically switches to an animated custom gradient card with relevant technology icons if no live link is present.

---

## 🛠️ Technology Stack

This application is built with modern web technologies:

- **Core framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Type-safe components and modular properties)
- **Build tool**: [Vite](https://vite.dev/) (Instant HMR and optimized asset bundling)
- **Styling System**: [Tailwind CSS v4](https://tailwindcss.com/) (Fluid spacing tokens and utility variables)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) (Scroll-linked page transformations, springy interactions, and tab active states)
- **3D Graphics**: [Three.js](https://threejs.org/) (Interactive math-based particle constellation background)
- **Graphics & Vector**: [Lottie React](https://github.com/team-lottie/lottie-react) (Smooth vector vector graphics)
- **Scrolling physics**: [Lenis Scroll](https://lenis.darkroom.engineering/) (Smooth scroll dynamics)

---

## ⚡ Prerequisites

To download, run, and modify this project, you need:

1.  [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
2.  [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/)

---

## 🚀 Quick Start

Follow these steps to run the portfolio on your local machine:

### 1. Clone & Navigate

```bash
git clone <repository-url>
cd Portfolio_2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Local Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to view the portfolio.

### 4. Build for Production

To generate minified, type-checked production bundle files under `/dist`:

```bash
npm run build
```

---

## 🧬 Code Structure & Architecture

```
src/
├── assets/                     # Hashed assets (place your resume.pdf, logos, JSON animations here)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Scroll-spy navigation with Typewriter logo shift fixes
│   │   ├── SideSocialBar.tsx   # Fixed vertical social layout links
│   │   └── Footer.tsx          # Copyright & footer links
│   └── sections/
│       ├── Hero.tsx            # Available badges + responsive natural margins
│       ├── About.tsx           # Lottie vectors + detailed credentials
│       ├── Expertise.tsx       # Tilted 3D atomic orbital skill badges with drag logic
│       ├── Experience.tsx      # Interactive work tab-explorer workspace terminal
│       ├── Education.tsx       # 3D staircase climb scroll tracker (character walking layout)
│       └── Projects.tsx        # Mobile horizontal swipers & desktop cluster layout viewports
├── App.tsx                     # Entry section stack & Lenis config
└── main.tsx                    # React DOM mounting
```

---

## 📂 How to Customize This Portfolio For Yourself

If you want to adopt this design, follow these guidelines to make it yours:

### 1. Change Personal Details & Bio

Open [src/components/sections/About.tsx](file:///c:/Users/abhis/Desktop/Portfolio_2/src/components/sections/About.tsx) and [src/components/sections/Hero.tsx](file:///c:/Users/abhis/Desktop/Portfolio_2/src/components/sections/Hero.tsx) to modify titles, descriptions, and introductory copy text.

### 2. Update the Professional Experience

Open [src/components/sections/Experience.tsx](file:///c:/Users/abhis/Desktop/Portfolio_2/src/components/sections/Experience.tsx). Update the `experiences` array configuration with your titles, durations, tasks, and tech stack badges:

```typescript
const experiences = [
  {
    role: "Your Job Title",
    company: "Company Name",
    location: "City, Country",
    period: "Start — End Date",
    color: "#HexColor", // Associated brand color
    icon: "material_icon", // Symbol identifier
    tech: ["Skill1", "Skill2"],
    bullets: [
      "Key achievement bullet point 1.",
      "Key achievement bullet point 2.",
    ],
  },
];
```

### 3. Add Your Projects

Open [src/components/sections/Projects.tsx](file:///c:/Users/abhis/Desktop/Portfolio_2/src/components/sections/Projects.tsx). Populate the technology-specific data lists (`ReactData`, `JavaScriptData`, etc.) with your projects.

- To enable **live previews**, fill out the `site` property.
- To override live previews with **custom screenshot images**, place a PNG inside the `/public/projects/` folder and set `image: '/projects/your_screenshot.png'`.

### 4. Replace the Resume PDF

Replace the placeholder file in [src/assets/resume.pdf](file:///c:/Users/abhis/Desktop/Portfolio_2/src/assets/resume.pdf) with your own PDF document. The navbar and hero buttons will automatically link to the new file!
