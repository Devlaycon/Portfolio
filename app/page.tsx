"use client";

import { useState } from "react";
import images from "@/lib/images";

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
        <div className="eyebrow">Graphic Designer &amp; Content Creator</div>
        <h1>
          <span className="l1">Oshioke David</span>
          <span className="l2">Oyarekhua</span>
        </h1>
        <p className="lede">
          I design <b>bold, scroll-stopping visuals</b>: posters, social
          content, merch and full brand systems for student clubs, brands and
          creators. Currently studying Computer Science (Honours) at UTS.
        </p>
        <div className="hero-cta">
          <a href="#work" className="btn btn-primary">
            View Work
          </a>
          <a
            href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au"
            className="btn btn-ghost"
          >
            Get in Touch
          </a>
        </div>
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
            <div className="sec-num">01 · SELECTED WORK</div>
            <h2 className="sec-title">A look at what I make</h2>
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
        <div className="grid">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="card"
              style={{ ["--card-color" as string]: p.color }}
              onClick={() => setLbProject(p)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="plus">&#43;</div>
              <div className="meta">
                <h4>{p.title}</h4>
                <p>{p.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec wrap" id="about">
        <div className="sec-head">
          <div>
            <div className="sec-num">02 · ABOUT</div>
            <h2 className="sec-title">Designer who ships</h2>
          </div>
        </div>
        <div className="about-grid">
          <div>
            <p>
              I&apos;m a graphic designer and content creator, and a second-year{" "}
              <b>Computer Science (Honours)</b> student at UTS. I lead creative
              and marketing work across several student organisations, including
              the <b>Engineering Society</b>, the{" "}
              <b>Student Representative Group</b>, and{" "}
              <b>Google Developer Group on Campus</b>.
            </p>
            <p>
              My work spans <b>full brand identities</b>, event posters, social
              campaigns, Instagram reels and <b>merch lines</b>. I care about
              clarity, consistency, and making things people actually want to
              look at: work that&apos;s on-brand and built to connect with
              student audiences.
            </p>
            <p>
              As a former <b>Peer Mentor</b> and current{" "}
              <b>Student Board Director</b>, I also understand the people behind
              the screen: what students respond to and how good communication
              keeps a community alive.
            </p>
          </div>
          <div className="skills">
            <h5>What I work with</h5>
            <div className="skill-tags">
              {[
                "Photoshop", "Illustrator", "Canva", "Adobe Express", "CapCut",
                "Figma", "Instagram", "Discord", "Copywriting", "Brand Identity", "Reels / Short-form",
              ].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap">
          <div className="sec-num">03 · LET&apos;S WORK TOGETHER</div>
          <h2>
            <a href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au">
              GET IN TOUCH
            </a>
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "24px auto 0", fontSize: "1.05rem" }}>
            Open to design roles, freelance projects and creative collaborations.
            The quickest look at what I&apos;m building is on Instagram, or reach
            me directly below.
          </p>
          <div className="socials">
            <a
              href="https://www.instagram.com/designer_laycon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram &#8599;
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn &#8599;
            </a>
            <a href="mailto:Oshioke.d.oyarekhua@student.uts.edu.au">
              Email &#8599;
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          &copy; {new Date().getFullYear()} Oshioke David Oyarekhua. Designed
          &amp; built by Dev.Dave.
        </div>
      </footer>

      {/* Lightbox */}
      {lbProject && (
        <div
          className="lb open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLbProject(null);
          }}
        >
          <button
            className="lb-close"
            aria-label="Close"
            onClick={() => setLbProject(null)}
          >
            &times;
          </button>
          <div className="lb-inner">
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
          </div>
        </div>
      )}
    </>
  );
}
