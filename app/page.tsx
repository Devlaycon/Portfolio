"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "@/lib/images";
import {
  fadeUp,
  blurFade,
  heroRise,
  staggerContainer,
  cardFadeUp,
  skillTag,
  VIEWPORT,
} from "@/lib/animations";

type Category = "all" | "branding" | "posters" | "social" | "merch" | "sports";

interface Project {
  title: string;
  cat: string;
  color: string;
  brief: string;
  role: string;
  img: string;
}

const PROJECTS: Project[] = [
  { title: "Become A King", cat: "posters", color: "#f2b01e", brief: "A moody, cinematic poster concept exploring power and self-made success, a photo-manipulation study built around dramatic red lighting, a fire-crown composite and rich gold type.", role: "Concept, design & compositing", img: images.king },
  { title: "ZENO: Web3 Brand", cat: "branding", color: "#7c4dff", brief: "Brand identity and landing page for ZENO, a real-time Web3 market-intelligence product: logo, type system, 3D brand visuals and a dark, futuristic interface.", role: "Brand identity & web design", img: images.zenodark },
  { title: "Night Wolf: Trenches", cat: "posters", color: "#28b9b0", brief: "Fashion editorial campaign for 'Night Wolf', a trench-coat collection concept blending portrait photography, graffiti texture and refined brand copy.", role: "Concept & art direction", img: images.nightwolf },
  { title: "Quantum Pulse: Identity", cat: "branding", color: "#4f46e5", brief: "Full brand identity for Quantum Pulse, an edtech initiative empowering young minds: logo, stationery, signage and a consistent indigo system.", role: "Brand identity design", img: images.qcards },
  { title: "EngSoc Exec Reveal", cat: "social", color: "#ff3b40", brief: "Exec-team announcement for the UTS Engineering Society, a playful 'Visual Productions Director' reveal styled like a music player.", role: "Social content, UTS EngSoc", img: images.david },
  { title: "ZERO: Movie Poster", cat: "posters", color: "#2da8ff", brief: "A cinematic poster concept: a surreal photo-manipulation placing bioluminescent jellyfish in a starlit sky above a lone figure in a red boat.", role: "Concept & compositing", img: images.zero },
  { title: "Nwabali: Road to AFCON", cat: "sports", color: "#36e036", brief: "Sports edit celebrating goalkeeper Stanley Nwabali's AFCON run, with the map of Nigeria as a glowing portal, with a 'narrow path' rubble motif.", role: "Concept & design", img: images.nwabali },
  { title: "Quantum Pulse: Campaign", cat: "branding", color: "#4f46e5", brief: "Out-of-home campaign for Quantum Pulse ('Education for All'), pairing the brand's geometric system with a custom character illustration.", role: "Campaign design", img: images.qboard },
  { title: "EngSoc Hoodie", cat: "merch", color: "#e2241f", brief: "Merchandise design for the UTS Engineering Society 2026 range: a red hoodie with bold ENGSOC lettering and a graffiti back print.", role: "Merch design, UTS EngSoc", img: images.hoodie },
  { title: "ZENO: Landing Page", cat: "branding", color: "#a64dff", brief: "Landing page for ZENO balancing a clean light layout with the brand's 3D token visuals and condensed display type.", role: "Web / UI design", img: images.zenolight },
  { title: "EngSoc Recruitment", cat: "social", color: "#ff3b40", brief: "Recruitment campaign for the EngSoc general committee: a bold 'Join Our Team' graphic with an illustrated sneaker hero.", role: "Social campaign, UTS EngSoc", img: images.gencom },
  { title: "Enjoy Your Day", cat: "social", color: "#28c2e0", brief: "A feel-good lifestyle composite: a relaxed scene built from multiple elements with floating leaves, light particles and a neon script headline.", role: "Photo-manipulation & design", img: images.enjoy },
  { title: "GDG UTS: Apparel", cat: "merch", color: "#34A853", brief: "Apparel print for the Google Developer Group on Campus, UTS, built on Google's brand language with 'Learn. Build. Connect' code-block type.", role: "Merch design, GDG UTS", img: images.gdg2 },
  { title: "Quantum Pulse: Banner", cat: "branding", color: "#4f46e5", brief: "Event banner for Quantum Pulse using the brand's grid system, portrait photography and the running-character illustration.", role: "Brand collateral", img: images.qbanner },
  { title: "EngSoc Crewneck", cat: "merch", color: "#e23b35", brief: "Crewneck design for the UTS Engineering Society: bubble 'ENG SOC' lettering with graffiti accents on red.", role: "Merch design, UTS EngSoc", img: images.sweater },
  { title: "ZENO: Brand System", cat: "branding", color: "#8b4dff", brief: "Brand showcase board presenting ZENO's logo, usage, UI and 3D visuals together as one cohesive system.", role: "Brand identity design", img: images.zenomock },
  { title: "End of Semester Party", cat: "posters", color: "#ff4d2e", brief: "Event poster for the UTS EngSoc x BSoc end-of-semester party: a high-energy Wild West theme with collage textures and bold type.", role: "Event design, UTS EngSoc", img: images.eos2 },
  { title: "Quantum Pulse: Logo", cat: "branding", color: "#3b2fd6", brief: "Primary logo lockup for Quantum Pulse on a deep indigo marble texture: a pixel-built 'Q' mark with a clean wordmark.", role: "Logo design", img: images.qlogo },
  { title: "EngSoc Bucket Hat", cat: "merch", color: "#cf3a2e", brief: "Bucket hat design for the EngSoc 2026 merch range with an embroidered graffiti-style ENGSOC tag.", role: "Merch design, UTS EngSoc", img: images.buckethat },
  { title: "EOS Party: Story", cat: "posters", color: "#ffae00", brief: "Instagram-story version of the end-of-semester party poster, optimised for vertical with the key event details.", role: "Event design, UTS EngSoc", img: images.eosstory },
  { title: "GDG UTS: Logo", cat: "merch", color: "#4285F4", brief: "Brand / apparel design featuring the Google Developer Group on Campus, UTS logo.", role: "Design, GDG UTS", img: images.gdg1 },
  { title: "Quantum Pulse: Logo Grid", cat: "branding", color: "#4f46e5", brief: "Logo construction grid showing the geometry behind the Quantum Pulse mark: process work that signals a considered identity.", role: "Logo design", img: images.qgrid },
];

const CATS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Branding", value: "branding" },
  { label: "Posters", value: "posters" },
  { label: "Social", value: "social" },
  { label: "Merch", value: "merch" },
  { label: "Sports", value: "sports" },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState<Category>("all");
  const [lbProject, setLbProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter(
    (p) => activeCat === "all" || p.cat === activeCat
  );

  return (
    <>
      <nav>
        <div className="nav-inner wrap">
          <div className="logo">
            DO<span>.</span>
          </div>
          <div className="nav-links">
            <a
              href="https://www.instagram.com/designer_laycon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Work
            </a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="wrap">
        <motion.div
          className="eyebrow"
          variants={heroRise}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Graphic Designer &amp; Content Creator
        </motion.div>
        <h1>
          <motion.span
            className="l1"
            variants={heroRise}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Oshioke David
          </motion.span>
          <motion.span
            className="l2"
            variants={heroRise}
            initial="hidden"
            animate="visible"
            custom={0.34}
          >
            Oyarekhua
          </motion.span>
        </h1>
        <motion.p
          className="lede"
          variants={heroRise}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          I design <b>bold, scroll-stopping visuals</b>: posters, social
          content, merch and full brand systems for student clubs, brands and
          creators. Currently studying Computer Science (Honours) at UTS.
        </motion.p>
        <motion.div
          className="hero-cta"
          variants={heroRise}
          initial="hidden"
          animate="visible"
          custom={0.64}
        >
          <a href="#work" className="btn btn-primary">
            View Work
          </a>
          <a
            href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au"
            className="btn btn-ghost"
          >
            Get in Touch
          </a>
        </motion.div>
      </header>

      <div className="strip">
        <div className="strip-track">
          <span>Brand Identity <b>&#10022;</b></span>
          <span>Poster Design <b>&#10022;</b></span>
          <span>Social Media <b>&#10022;</b></span>
          <span>Merch &amp; Apparel <b>&#10022;</b></span>
          <span>Reels &amp; Video <b>&#10022;</b></span>
          <span>Campaigns <b>&#10022;</b></span>
          <span>Brand Identity <b>&#10022;</b></span>
          <span>Poster Design <b>&#10022;</b></span>
          <span>Social Media <b>&#10022;</b></span>
          <span>Merch &amp; Apparel <b>&#10022;</b></span>
          <span>Reels &amp; Video <b>&#10022;</b></span>
          <span>Campaigns <b>&#10022;</b></span>
        </div>
      </div>

      <section className="sec wrap" id="work">
        <div className="sec-head">
          <div>
            <motion.div
              className="sec-num"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              01 · SELECTED WORK
            </motion.div>
            <motion.h2
              className="sec-title"
              variants={blurFade}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              A look at what I make
            </motion.h2>
          </div>
          <div className="filters">
            {CATS.map((c) => (
              <button
                key={c.value}
                className={`filter${activeCat === c.value ? " active" : ""}`}
                onClick={() => setActiveCat(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <p style={{ color: "var(--muted)", margin: "-26px 0 30px", fontSize: ".95rem" }}>
          Tap any piece for the brief and full image.
        </p>
        <motion.div
          className="grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                className="card"
                style={{ ["--card-color" as string]: p.color }}
                onClick={() => setLbProject(p)}
                variants={cardFadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className="plus">&#43;</div>
                <div className="meta">
                  <h4>{p.title}</h4>
                  <p>{p.cat}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="sec wrap" id="about">
        <div className="sec-head">
          <div>
            <motion.div
              className="sec-num"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              02 · ABOUT
            </motion.div>
            <motion.h2
              className="sec-title"
              variants={blurFade}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              Designer who ships
            </motion.h2>
          </div>
        </div>
        <div className="about-grid">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.p variants={fadeUp}>
              I&apos;m a graphic designer and content creator, and a second-year{" "}
              <b>Computer Science (Honours)</b> student at UTS. I lead creative
              and marketing work across several student organisations, including
              the <b>Engineering Society</b>, the{" "}
              <b>Student Representative Group</b>, and{" "}
              <b>Google Developer Group on Campus</b>.
            </motion.p>
            <motion.p variants={fadeUp}>
              My work spans <b>full brand identities</b>, event posters, social
              campaigns, Instagram reels and <b>merch lines</b>. I care about
              clarity, consistency, and making things people actually want to
              look at: work that&apos;s on-brand and built to connect with
              student audiences.
            </motion.p>
            <motion.p variants={fadeUp}>
              As a former <b>Peer Mentor</b> and current{" "}
              <b>Student Board Director</b>, I also understand the people behind
              the screen: what students respond to and how good communication
              keeps a community alive.
            </motion.p>
          </motion.div>
          <div className="skills">
            <h5>What I work with</h5>
            <motion.div
              className="skill-tags"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {[
                "Photoshop", "Illustrator", "Canva", "Adobe Express", "CapCut",
                "Figma", "Instagram", "Discord", "Copywriting", "Brand Identity", "Reels / Short-form",
              ].map((s) => (
                <motion.span key={s} variants={skillTag}>{s}</motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap">
          <motion.div
            className="sec-num"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            03 · LET&apos;S WORK TOGETHER
          </motion.div>
          <motion.h2
            variants={blurFade}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <a href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au">
              GET IN TOUCH
            </a>
          </motion.h2>
          <motion.p
            style={{ color: "var(--muted)", maxWidth: 520, margin: "24px auto 0", fontSize: "1.05rem" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            Open to design roles, freelance projects and creative collaborations.
            The quickest look at what I&apos;m building is on Instagram, or reach
            me directly below.
          </motion.p>
          <motion.div
            className="socials"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.a
              variants={fadeUp}
              href="https://www.instagram.com/designer_laycon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram &#8599;
            </motion.a>
            <motion.a variants={fadeUp} href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn &#8599;
            </motion.a>
            <motion.a variants={fadeUp} href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au">
              Email &#8599;
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          &copy; {new Date().getFullYear()} Oshioke David Oyarekhua. Designed
          &amp; built by Dev.Dave.
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lbProject && (
          <motion.div
            className="lb open"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLbProject(null);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              className="lb-close"
              aria-label="Close"
              onClick={() => setLbProject(null)}
            >
              &times;
            </button>
            <motion.div
              className="lb-inner"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="lb-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lbProject.img} alt={lbProject.title} />
              </div>
              <div className="lb-info">
                <span
                  className="lb-cat"
                  style={{ background: lbProject.color }}
                >
                  {lbProject.cat}
                </span>
                <h3>{lbProject.title}</h3>
                <p className="brief">{lbProject.brief}</p>
                <div className="lb-role">Role</div>
                <div className="lb-role">
                  <b>{lbProject.role}</b>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
