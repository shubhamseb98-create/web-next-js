'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../../../css/webtycoons/ClientsSlider.module.css'

import abrigoLogo from '../assets/clients/abrigo.png'
import amsLogo from '../assets/clients/ams.png'
import austroLogo from '../assets/clients/austrolabs.png'
import blsLogo from '../assets/clients/blsworldschool.png'
import catalystLogo from '../assets/clients/catalyst.png'
import chaircraftLogo from '../assets/clients/chaircraft.png'
import digitalLogo from '../assets/clients/digital.png'
import iupjindalLogo from '../assets/clients/iupjindal.png'
import kasturiLogo from '../assets/clients/kasturi.png'
import lapetiteLogo from '../assets/clients/lapetite.png'
import mahavirLogo from '../assets/clients/mahavir.png'
import maipoLogo from '../assets/clients/maipo.png'
import sabkoolLogo from '../assets/clients/sabkool.png'
import thukralLogo from '../assets/clients/thukral.png'

const clients = [
  { name: 'ABRIGO', image: abrigoLogo, hasBg: true },
  { name: 'ARYA MODEL SCHOOL', image: amsLogo, hasBg: false },
  { name: 'AUSTRO Labs', image: austroLogo, hasBg: false },
  { name: 'BLS WORLD SCHOOL', image: blsLogo, hasBg: true },
  { name: 'CATALYST', image: catalystLogo, hasBg: false },
  { name: 'CHAIR CRAFT INDIA', image: chaircraftLogo, hasBg: true },
  { name: 'DIGITAL by Diksha Vohra', image: digitalLogo, hasBg: false },
  { name: 'IUP Jindal', image: iupjindalLogo, hasBg: true },
  { name: 'KASTURI JEWELLERS', image: kasturiLogo, hasBg: false },
  { name: 'La Petite', image: lapetiteLogo, hasBg: false },
  { name: 'MAHAVIR SENIOR MODEL SCHOOL', image: mahavirLogo, hasBg: true },
  { name: 'Maipo', image: maipoLogo, hasBg: true },
  { name: 'SABKOOL', image: sabkoolLogo, hasBg: true },
  { name: 'THUKRAL', image: thukralLogo, hasBg: false },
]

const clientMetadata = {
  abrigo: {
    websiteUrl: 'https://abrigoprotection.com',
    domain: 'abrigoprotection.com',
    category: 'Defense & Armored Vehicles',
    snapshotImage: '/images/clients/snapshots/abrigo.jpg'
  },
  ams: {
    websiteUrl: 'https://aryamodelschool.edu.in',
    domain: 'aryamodelschool.edu.in',
    category: 'Senior Secondary Education',
    snapshotImage: '/images/clients/snapshots/ams.jpg'
  },
  austro: {
    websiteUrl: 'https://austrolabs.com',
    domain: 'austrolabs.com',
    category: 'Pharmaceuticals & Biotech',
    snapshotImage: '/images/clients/snapshots/austrolabs.jpg'
  },
  bls: {
    websiteUrl: 'https://blsworldschool.com',
    domain: 'blsworldschool.com',
    category: 'International World School',
    snapshotImage: '/images/clients/snapshots/blsworldschool.jpg'
  },
  catalyst: {
    websiteUrl: 'https://catalystclinicalservices.com',
    domain: 'catalystclinicalservices.com',
    category: 'Clinical Research & Trials',
    snapshotImage: '/images/clients/snapshots/catalyst.jpg'
  },
  chaircraft: {
    websiteUrl: 'https://chaircraft.in',
    domain: 'chaircraft.in',
    category: 'Ergonomic Commercial Seating',
    snapshotImage: '/images/clients/snapshots/chaircraft.jpg'
  },
  digital: {
    websiteUrl: 'https://dikshavohra.com',
    domain: 'dikshavohra.com',
    category: 'Content Marketing & Strategy',
    snapshotImage: '/images/clients/snapshots/digital.jpg'
  },
  iupjindal: {
    websiteUrl: 'https://iupjindal.com',
    domain: 'iupjindal.com',
    category: 'Precision Stainless Metallurgy',
    snapshotImage: '/images/clients/snapshots/iupjindal.jpg'
  },
  kasturi: {
    websiteUrl: 'https://kasturijewellers.com',
    domain: 'kasturijewellers.com',
    category: 'Haute Joaillerie & Gold',
    snapshotImage: '/images/clients/snapshots/kasturi.jpg'
  },
  lapetite: {
    websiteUrl: 'https://lapetitemontessori.com',
    domain: 'lapetitemontessori.com',
    category: 'Montessori Early Education',
    snapshotImage: '/images/clients/snapshots/lapetite.jpg'
  },
  mahavir: {
    websiteUrl: 'https://msmsdelhi.in',
    domain: 'msmsdelhi.in',
    category: 'Senior Model School, Delhi',
    snapshotImage: '/images/clients/snapshots/mahavir.jpg'
  },
  maipo: {
    websiteUrl: 'https://maipo.in',
    domain: 'maipo.in',
    category: 'Heavy Industrial Machinery',
    snapshotImage: '/images/clients/snapshots/maipo.jpg'
  },
  sabkool: {
    websiteUrl: 'https://sabkool.com',
    domain: 'sabkool.com',
    category: 'Commercial HVAC & Air Cooling',
    snapshotImage: '/images/clients/snapshots/sabkool.jpg'
  },
  thukral: {
    websiteUrl: 'https://thukral.com',
    domain: 'thukral.com',
    category: 'Electric Vehicles & Mobility',
    snapshotImage: '/images/clients/snapshots/thukral.jpg'
  }
};

const getClientMeta = (client) => {
  const nameLower = (client.name || '').toLowerCase();
  const imgLower = (typeof client.image === 'string' ? client.image : client.image?.src || '').toLowerCase();
  
  for (const [key, meta] of Object.entries(clientMetadata)) {
    if (nameLower.includes(key) || imgLower.includes(key)) {
      return {
        websiteUrl: client.websiteUrl || meta.websiteUrl,
        domain: client.domain || meta.domain,
        category: client.category || meta.category,
        snapshotImage: client.snapshotImage || meta.snapshotImage
      };
    }
  }

  return {
    websiteUrl: client.websiteUrl || '#',
    domain: client.domain || (client.websiteUrl ? client.websiteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'thewebtycoons.com'),
    category: client.category || 'Enterprise Client',
    snapshotImage: client.snapshotImage || '/images/clients/snapshots/blsworldschool.jpg'
  };
};

const ClientsSlider = ({ clientsData, homeExtraData }) => {
  const canvasRef = useRef(null);
  const rawList = clientsData?.length > 0 ? clientsData : clients;
  // Ensure enough items for seamless infinite looping
  const displayClients = rawList.length < 8 ? [...rawList, ...rawList, ...rawList] : rawList;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setSize();
    window.addEventListener('resize', setSize);

    const rect = canvas.getBoundingClientRect();
    const w0 = rect.width || 1200;
    const h0 = rect.height || 450;
    const count = 38;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w0,
      y: Math.random() * h0,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.45 + 0.3,
      color: Math.random() > 0.4 ? '#6edb4a' : (Math.random() > 0.5 ? '#22c55e' : '#ffffff')
    }));

    let mouse = { x: null, y: null };
    const parent = canvas.parentElement;

    const onMouseMove = (e) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    if (parent) {
      parent.addEventListener('mousemove', onMouseMove);
      parent.addEventListener('mouseleave', onMouseLeave);
    }

    const render = () => {
      const b = canvas.getBoundingClientRect();
      const w = b.width;
      const h = b.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect nearby floating particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#6edb4a';
            ctx.globalAlpha = (1 - dist / 95) * 0.16;
            ctx.lineWidth = 0.75;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Connect to mouse interaction
        if (mouse.x !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = '#6edb4a';
            ctx.globalAlpha = (1 - mdist / 130) * 0.22;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.section} id="clients">
      {/* ── Interactive Floating Particle Constellation Canvas ── */}
      <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />

      {/* ── Floating Ambient Tech Shapes & Orbs ── */}
      <div className={styles.floatingDecorations} aria-hidden="true">
        <div className={`${styles.floatingOrb} ${styles.orb1}`} />
        <div className={`${styles.floatingOrb} ${styles.orb2}`} />
        <div className={`${styles.floatingRing} ${styles.ring1}`} />
        <div className={`${styles.floatingRing} ${styles.ring2}`} />
      </div>

      <div className="container-fluid" style={{ position: 'relative', zIndex: 1 }}>
        <div className={`${styles.header} text-center mb-5`}>
          <span className="section-label">{homeExtraData?.client_title || 'Our Clients'}</span>
          <h2 className="section-heading mb-4">
            {homeExtraData?.client_subtitle || 'Trusted by Industry Leaders'}
          </h2>
          <p className={styles.subtitle}>
            {homeExtraData?.client_description || 'Some of the customers to whom we have given excellent services, as a Best Website Designing Company in Delhi.'}
          </p>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        {/* Side Fade Gradients */}
        <div className={styles.edgeGradientLeft} />
        <div className={styles.edgeGradientRight} />

          <div className={styles.marqueeTrack}>
            {[...displayClients, ...displayClients].map((client, index) => {
              const meta = getClientMeta(client);
              const clientUrl = meta.websiteUrl;
              const snapshotImg = meta.snapshotImage;
              const clientDomain = meta.domain;
              const clientCategory = meta.category;

              return (
                <div key={index} className={styles.logoCard}>
                  {/* Client Logo Link */}
                  <a
                    href={clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logoLink}
                    title={`Visit ${client.name} official website (${clientDomain})`}
                  >
                    {client.image ? (
                      <div className={styles.logoWrapper}>
                        <Image 
                          src={typeof client.image === 'string' ? client.image : (client.image?.src || client.image)} 
                          alt={client.name || 'Client Logo'}
                          width={320}
                          height={140}
                          className={styles.clientLogo} 
                        />
                      </div>
                    ) : (
                      <div className={styles.placeholderLogo}>{client.name}</div>
                    )}
                  </a>

                  {/* Hover Snapshot Preview Window */}
                  <div className={styles.snapshotTooltip}>
                    <a 
                      href={clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.snapshotCardInner}
                    >
                      {/* Mini Browser Header */}
                      <div className={styles.tooltipBrowserBar}>
                        <div className={styles.tooltipDots}>
                          <span className={`${styles.dot} ${styles.dotRed}`} />
                          <span className={`${styles.dot} ${styles.dotYellow}`} />
                          <span className={`${styles.dot} ${styles.dotGreen}`} />
                        </div>
                        <div className={styles.tooltipUrl}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.lockIcon}>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span className={styles.domainText}>{clientDomain}</span>
                        </div>
                        <span className={styles.liveBadge}>Visit ↗</span>
                      </div>

                      {/* Snapshot Image */}
                      <div className={styles.tooltipImageContainer}>
                        {snapshotImg && (
                          <Image
                            src={snapshotImg}
                            alt={`${client.name} Website Snapshot`}
                            width={320}
                            height={190}
                            className={styles.snapshotImage}
                          />
                        )}
                        <div className={styles.hoverOverlayBadge}>
                          <span>Open Live Website ↗</span>
                        </div>
                      </div>

                      {/* Details Footer */}
                      <div className={styles.tooltipFooter}>
                        <div className={styles.footerText}>
                          <div className={styles.clientTitle}>{client.name}</div>
                          <div className={styles.clientCat}>{clientCategory}</div>
                        </div>
                        <div className={styles.openIconWrapper}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    {/* Tooltip Arrow pointing down to logo */}
                    <div className={styles.tooltipArrow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </section>
  )
}

export default ClientsSlider
