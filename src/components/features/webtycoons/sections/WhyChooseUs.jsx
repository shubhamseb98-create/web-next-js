import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from '../../../../css/webtycoons/WhyChooseUs.module.css'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    number: '01',
    title: 'Unmatched Expertise',
    desc: 'Our team comprises industry veterans with decades of collective experience in delivering mission-critical digital transformations.',
  },
  {
    number: '02',
    title: 'Innovative Methodology',
    desc: 'We utilize agile, design-thinking methodologies to ensure rapid prototyping, continuous delivery, and scalable outcomes.',
  },
  {
    number: '03',
    title: 'Commitment to Excellence',
    desc: 'We partner closely with you, acting as an extension of your team to ensure every solution aligns perfectly with your vision.',
  }
]

const WhyChooseUs = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Title animation
    gsap.fromTo(".heading-anim", 
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    )

    // Staggered list items animation
    gsap.fromTo(".list-item-anim", 
      {
        x: -50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".list-container-anim",
          start: "top 85%",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    )
  }, { scope: containerRef })

  return (
    <section className={`section-py-sm ${styles.section}`} ref={containerRef}>
      <div className="container-fluid-px">
        <div className="row mb-5">
          <div className="col-12 col-lg-8 heading-anim">
            <span className="section-label">Why Partner With Us</span>
            <h2 className="section-heading">
              The WebTycoons Advantage
            </h2>
          </div>
        </div>

        <div className={`${styles.listContainer} list-container-anim`}>
          {reasons.map((reason, index) => (
            <div key={index} className={`${styles.listItem} list-item-anim`}>
              <div className={styles.itemNumber}>{reason.number}</div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{reason.title}</h3>
                <p className={styles.itemDesc}>{reason.desc}</p>
              </div>
              <div className={styles.itemArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
