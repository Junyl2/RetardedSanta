'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { project } from '../config/project';

const phrases = ['SANTA CAME EARLY', 'ZERO CHILL', 'PURE MEME ENERGY', 'COAL FOR THE BEARS', 'CHRISTMAS CHAOS', 'THE NAUGHTY LIST IS FULL'];
const entries = ['TOO MUCH CHILL', 'BEAR DETECTED', 'COAL DELIVERY', 'CERTIFIED DEGEN'];
function Social({ platform, children, className = '' }: { platform: 'telegram' | 'x'; children: React.ReactNode; className?: string }) {
  const url = platform === 'telegram' ? project.telegramUrl : project.xUrl;
  if (!url) return <span className={`button unavailable ${className}`} aria-label={`${children} — official link coming soon`} title="Official link coming soon">{children}<small>COMING SOON</small></span>;
  return <a className={`button ${className}`} href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function artwork(name: string) { return [640, 1280, 1920].map(width => `/images/${name}-${width}.webp ${width}w`).join(', '); }
function Brand() { return <a className="brand" href="#home" aria-label="Retard Santa home"><span className="brand-face"><img src="/images/santa-portrait-640.webp" width="640" height="385" alt="" /></span><span>RETARD<br/><b>SANTA<span className="brand-star">✳</span></b></span></a>; }
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const menuDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = menuDialog.current;
    if (!dialog) return;
    if (menu && !dialog.open) dialog.showModal();
    if (!menu && dialog.open) dialog.close();
  }, [menu]);
  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menu]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 951px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenu(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  const [stamped, setStamped] = useState<string[]>([]);
  const [name, setName] = useState('');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('has-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => { observer.disconnect(); document.documentElement.classList.remove('has-reveal'); };
  }, []);
  function moveHero(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 16}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 16}px`);
  }
  function resetHero(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--pointer-x', '0px');
    event.currentTarget.style.setProperty('--pointer-y', '0px');
  }
  function downloadCertificate() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#f6efd9'; ctx.fillRect(0, 0, 1200, 800);
    ctx.strokeStyle = '#101c31'; ctx.lineWidth = 12; ctx.strokeRect(30, 30, 1140, 740);
    ctx.strokeStyle = '#df281e'; ctx.lineWidth = 4; ctx.strokeRect(48, 48, 1104, 704);
    const drawStar = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      for (let point = 0; point < 16; point++) {
        const angle = (point * Math.PI / 8) - Math.PI / 2;
        const size = point % 2 === 0 ? radius : radius * 0.38;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    };
    const drawCenteredRow = (left: string, right: string, baseline: number) => {
      const gap = 16;
      const radius = 12;
      const leftWidth = ctx.measureText(left).width;
      const rightWidth = ctx.measureText(right).width;
      const rowWidth = leftWidth + rightWidth + 2 * gap + 2 * radius;
      const start = (canvas.width - rowWidth) / 2;
      ctx.textAlign = 'left';
      ctx.fillText(left, start, baseline);
      drawStar(start + leftWidth + gap + radius, baseline - 10, radius);
      ctx.fillText(right, start + leftWidth + 2 * gap + 2 * radius, baseline);
    };
    ctx.fillStyle = '#df281e'; ctx.font = 'bold 28px sans-serif';
    drawCenteredRow('OFFICIAL NORTH POLE DOCUMENT', 'RETARD SANTA', 120);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#101c31'; ctx.font = 'bold 82px sans-serif'; ctx.fillText('NAUGHTY LIST', 600, 240);
    ctx.font = 'bold 38px sans-serif'; ctx.fillText('THIS CERTIFIES THAT', 600, 330);
    ctx.fillStyle = '#df281e'; ctx.font = 'bold 64px sans-serif';
    ctx.fillText((name.trim() || 'YOU').slice(0, 32).toUpperCase(), 600, 425, 1000);
    ctx.fillStyle = '#101c31'; ctx.font = 'bold 30px sans-serif'; ctx.fillText('IS OFFICIALLY ON THE LIST', 600, 500);
    ctx.font = '24px sans-serif'; ctx.fillText(stamped.join('  •  ') || 'CERTIFIED CHRISTMAS CHAOS', 600, 575, 1000);
    ctx.fillStyle = '#df281e'; ctx.font = 'bold 26px sans-serif';
    drawCenteredRow('SANTA APPROVED', 'STAY MERRY. STAY WEIRD.', 690);
    const link = document.createElement('a'); link.download = 'naughty-list-certificate.png'; link.href = canvas.toDataURL('image/png'); link.click();
  }
  function toggle(item: string) { setStamped(previous => previous.includes(item) ? previous.filter(x => x !== item) : [...previous, item]); }
  return <main id="home">
    <header className={scrolled ? "header scrolled" : "header"}><div className="nav-wrap"><Brand/>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" aria-label="Open navigation" onClick={() => setMenu(true)}><span>MENU</span><span className="menu-lines" aria-hidden="true"><i></i><i></i></span></button>
      <nav className="nav desktop-nav" aria-label="Main navigation"><a href="#home">HOME</a><a href="#story">THE STORY</a><a href="#chaos">THE CHAOS</a><a href="#join">HOW TO JOIN</a><div className="nav-social"><Social platform="telegram" className="button-small">TELEGRAM</Social><Social platform="x" className="button-small outline">X / TWITTER</Social></div></nav>
    </div></header>
    <dialog id="mobile-menu" ref={menuDialog} className="mobile-drawer" aria-label="Mobile navigation" onClose={() => setMenu(false)} onClick={event => { if (event.target === event.currentTarget) setMenu(false); }}>
      <div className="drawer-top"><span>RETARD SANTA <b>✳</b></span><button className="drawer-close" type="button" aria-label="Close navigation" onClick={() => setMenu(false)}>×</button></div>
      <p className="drawer-kicker">A LITTLE CHRISTMAS CHAOS</p>
      <nav className="drawer-links" aria-label="Mobile navigation links"><a href="#home" onClick={() => setMenu(false)}>HOME <span>✳</span></a><a href="#story" onClick={() => setMenu(false)}>THE STORY <span>✳</span></a><a href="#chaos" onClick={() => setMenu(false)}>THE CHAOS <span>✳</span></a><a href="#join" onClick={() => setMenu(false)}>HOW TO JOIN <span>✳</span></a></nav>
      <div className="drawer-community"><span>FIND THE CHAOS</span><Social platform="telegram">JOIN TELEGRAM</Social><Social platform="x" className="outline light">FOLLOW ON X</Social></div>
      <p className="drawer-footer">STAY MERRY. STAY WEIRD. ✳</p>
    </dialog>
    <section className="hero"><div className="snow" aria-hidden="true"><i>✦</i><i>✳</i><i>✦</i><i>✳</i><i>✦</i><i>✳</i></div><div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><svg className="eyebrow-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 14.2 8.2 20.5 4.7 17 11 23 12 17 13 20.5 19.3 14.2 15.8 12 22.5 9.8 15.8 3.5 19.3 7 13 1 12 7 11 3.5 4.7 9.8 8.2Z" /></svg><span>A VERY DIFFERENT KIND OF CHRISTMAS</span><svg className="eyebrow-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 14.2 8.2 20.5 4.7 17 11 23 12 17 13 20.5 19.3 14.2 15.8 12 22.5 9.8 15.8 3.5 19.3 7 13 1 12 7 11 3.5 4.7 9.8 8.2Z" /></svg></div><h1>CHRISTMAS<br/>JUST GOT<br/><em>RETARDED.</em></h1><p className="hero-sub">SANTA CAME EARLY.<br/>CHAOS CAME FIRST.</p><p className="hero-description">Forget the nice list. This Santa is here for pure meme energy, wild Christmas chaos, and a community that doesn&apos;t wait until December 25th.</p><div className="button-row"><Social platform="telegram">JOIN THE CHAOS</Social><Social platform="x" className="outline light">FOLLOW THE MADNESS</Social></div>{(!project.telegramUrl || !project.xUrl) && <p className="link-note">SOME OFFICIAL COMMUNITY LINKS COMING SOON</p>}</div><div className="hero-art" onPointerMove={moveHero} onPointerLeave={resetHero}><div className="hero-halo"></div><span className="hero-orbit" aria-hidden="true">NORTH POLE EXPRESS ✳ NO NICE LIST REQUIRED ✳</span><div className="hero-image"><img src="/images/santa-portrait-1280.webp" srcSet={artwork('santa-portrait')} sizes="(max-width: 700px) 85vw, 45vw" width="1280" height="770" fetchPriority="high" alt="Retard Santa with wide eyes, a white mustache, and a red Santa suit" /></div><span className="art-stamp">100%<br/><strong>ZERO</strong><br/>CHILL</span><svg className="hero-doodle doodle-star" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 5 L58 39 L92 27 L66 51 L94 68 L60 64 L50 96 L41 64 L7 70 L35 51 L9 27 L42 39 Z" /></svg><svg className="hero-doodle doodle-coal" viewBox="0 0 100 100" aria-hidden="true"><path d="M15 64 L23 29 L50 15 L77 23 L90 54 L72 83 L39 88 Z"/><path d="M34 42 L48 30 M61 58 L74 46"/></svg><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span><span className="art-caption">THE MAN. THE MEME. THE MERRY MADNESS.</span></div></div><div className="hero-bottom"><span>SCROLL FOR THE CHAOS ↓</span><span>MADE FOR THE NAUGHTY LIST ✳</span></div></section>
    <div className="marquee" aria-label={phrases.join(' · ')}><div className="marquee-track" aria-hidden="true">{[0,1].map(n => <div className="marquee-group" key={n}>{phrases.map(p => <span key={p}>{p} <b>✳</b></span>)}</div>)}</div></div>
    <section className="intro section" id="story"><div className="intro-title reveal"><span className="section-kicker">MEET THE BIG GUY <span>✳</span></span><h2>NOT YOUR<br/><em>AVERAGE</em><br/>SANTA<span className="period">.</span></h2><p>Elongated face. Wild eyes. Mustache on max. Absolutely zero chill.</p><span className="scribble">yeah, that&apos;s him <svg className="scribble-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg></span></div><div className="portrait-stage reveal"><div className="portrait-frame"><img src="/images/retard-santa-1280.webp" srcSet={artwork('retard-santa')} sizes="(max-width: 700px) 90vw, 50vw" width="1280" height="590" loading="lazy" alt="Retard Santa in a snowy Christmas scene with a tree and Solana coins" /></div><span className="tag tag-eyes">WILD EYES ✦</span><span className="tag tag-stache">MAXIMUM MUSTACHE</span><span className="tag tag-chill">ZERO CHILL ✳</span><span className="tag tag-chaos">CHAOS LEVEL: CHRISTMAS</span></div><div className="intro-aside"><span>✳</span><p>HE&apos;S MAKING A LIST.<br/>HE&apos;S NOT CHECKING IT TWICE.</p></div></section>
    <section className="story" id="chaos"><div className="story-image reveal"><img src="/images/santa-sleigh-1280.webp" srcSet={artwork('santa-sleigh')} sizes="(max-width: 700px) 100vw, 50vw" width="1280" height="770" loading="lazy" alt="Retard Santa flies his sleigh across a moonlit Christmas sky"/><span className="image-caption">SPECIAL DELIVERY / STRAIGHT FROM THE NORTH POLE*</span></div><div className="story-copy reveal"><span className="section-kicker">THE CHRISTMAS CHAOS STORY ✳</span><h2>HE DOESN&apos;T<br/>WAIT FOR<br/><em>DECEMBER 25.</em></h2><p>Other Santas wait for Christmas Eve.<br/><strong>This one already packed his bags.</strong></p><p>He&apos;s early, he&apos;s unpredictable, and he&apos;s bringing coal for the bears. No ordinary Christmas. No ordinary Santa.</p><p className="story-punch">JUST PURE MEME ENERGY<br/>AND COMMUNITY CHAOS.</p><span className="story-footnote">* NORTH POLE DEPARTURE TIMES MAY VARY.</span></div></section>
    <section className="naughty section"><div className="naughty-heading reveal"><div><span className="section-kicker">CHECK IT TWICE. OR DON&apos;T. ✳</span><h2>YOU MADE THE<br/><em>NAUGHTY LIST.</em></h2></div><p>Santa&apos;s got your name on it.<br/>Tap a label to make it official.</p></div><div className="list-sheet reveal"><div className="sheet-top"><span>OFFICIAL NORTH POLE DOCUMENT</span><span>TOP SECRET (ISH)</span></div><div className="list-grid">{entries.map((entry, i) => <button key={entry} onClick={() => toggle(entry)} aria-pressed={stamped.includes(entry)} className={stamped.includes(entry) ? 'list-item stamped' : 'list-item'}><span className="list-number">0{i + 1} /</span><span>{entry}</span><span className="list-action">{stamped.includes(entry) ? 'STAMPED ✓' : 'STAMP IT +'}</span>{stamped.includes(entry) && <span className="stamp-mark" aria-hidden="true">SANTA<br/>APPROVED</span>}</button>)}</div><div className="certificate-maker"><div><label htmlFor="naughty-name">MAKE IT OFFICIAL <span>— YOUR NAME, YOUR LIST</span></label><p>Pick your charges above, add a name, and take home the evidence.</p></div><div className="certificate-controls"><input id="naughty-name" maxLength={32} value={name} onChange={event => setName(event.target.value)} placeholder="Your name (optional)" /><button type="button" className="button certificate-button" onClick={downloadCertificate}>DOWNLOAD CERTIFICATE</button></div></div><div className="sheet-bottom"><span>NO NICE LISTS WERE HARMED IN THE MAKING OF THIS MEME.</span><span className="seal">SANTA<br/>APPROVED<br/>✳</span></div></div></section>
    <section className="join section" id="join"><div className="join-heading reveal"><span className="section-kicker">EVERYONE&apos;S INVITED ✳</span><h2>YOUR TICKET TO<br/><em>CHRISTMAS CHAOS.</em></h2><p>No secret handshake. Just good memes and questionable Christmas spirit.</p></div><div className="steps reveal"><article><span className="step-number">01</span><span className="step-icon">✳</span><h3>MEET SANTA</h3><p>Discover the story behind the chaotic Christmas meme.</p></article><article><span className="step-number">02</span><span className="step-icon">✦</span><h3>JOIN THE COMMUNITY</h3><p>Enter the official Telegram community and follow the project on X.</p></article><article><span className="step-number">03</span><span className="step-icon">✹</span><h3>SPREAD THE CHAOS</h3><p>Share the memes, join conversations, and participate in community activities.</p></article></div></section>
    <section className="finale"><img src="/images/santa-rocket-1280.webp" srcSet={artwork('santa-rocket')} sizes="100vw" width="1280" height="770" loading="lazy" alt="Retard Santa beneath a candy-striped rocket and a mountain of presents"/><div className="finale-shade"></div><div className="finale-content reveal"><span className="section-kicker">THE NAUGHTY LIST IS WAITING ✳</span><h2>GET IN<br/><em>OR GET COAL.</em></h2><p>Santa&apos;s already here. The chaos has started.<br/>The naughty list is waiting.</p><div className="button-row"><Social platform="telegram">JOIN TELEGRAM</Social><Social platform="x" className="outline light">FOLLOW ON X</Social></div>{(!project.telegramUrl || !project.xUrl) && <p className="link-note">SOME OFFICIAL COMMUNITY LINKS COMING SOON</p>}</div></section>
    <footer><div className="footer-main"><div><Brand/><p>CHRISTMAS ISN&apos;T READY FOR THIS.</p></div><div className="footer-links"><span>FIND THE CHAOS</span><Social platform="telegram" className="footer-social">TELEGRAM</Social><Social platform="x" className="footer-social">X / TWITTER</Social></div><div className="footer-note"><span>BUILT FOR THE SOLANA COMMUNITY ✳</span><p>Retard Santa is a community-driven meme project. Cryptocurrency involves substantial risk. Nothing on this website constitutes financial advice.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RETARD SANTA</span><span>STAY MERRY. STAY WEIRD. ✳</span></div></footer>
  </main>;
}
