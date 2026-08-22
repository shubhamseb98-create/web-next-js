'use client';
import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRocket } from 'react-icons/fa';
import styles from './RealEstateCalculator.module.css';
import { fadeUp } from '../../../../animations/variants';

const BUSINESS_TYPES = {
  builder: {
    id: 'builder',
    name: 'Builder / Developer',
    sub: 'Project Launches & Inventory Sale',
    avgTicketCr: 1.25,
    cplRate: 450, // Cost per verified lead in INR
    siteVisitRatio: 0.22,
    closingRatio: 0.04,
    insight: 'By deploying automated 3D PropTech landing funnels and WhatsApp instant nurture, developers reduce cost-per-site-visit by 42%.'
  },
  agency: {
    id: 'agency',
    name: 'Real Estate Agency / CP',
    sub: 'Buyer Inbound & Broker Closings',
    avgTicketCr: 0.85,
    cplRate: 380,
    siteVisitRatio: 0.25,
    closingRatio: 0.045,
    insight: 'Agencies with automated 60-second lead connect workflows convert 3.2x more cold Facebook/Google clicks into physically attended site visits.'
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial & Pre-Leased',
    sub: 'High-Ticket Investor Inquiries',
    avgTicketCr: 3.5,
    cplRate: 750,
    siteVisitRatio: 0.18,
    closingRatio: 0.035,
    insight: 'Targeting corporate decision-makers and high-yield investors with micro-market yield dossiers generates 5x higher deal-closing velocity.'
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury Villas & Penthouses',
    sub: 'Ultra-HNI & NRI Buyer Funnels',
    avgTicketCr: 6.0,
    cplRate: 1100,
    siteVisitRatio: 0.15,
    closingRatio: 0.03,
    insight: 'Luxury buyers require virtual 3D immersion and private video walkthroughs, yielding 12x higher trust from NRI buyers.'
  }
};

const TIMELINES = [
  { value: 3, label: '3 Months', sub: 'Immediate Surge' },
  { value: 6, label: '6 Months', sub: 'Predictable Scale' },
  { value: 12, label: '12 Months', sub: 'Market Domination' }
];

export default function RealEstateCalculator({ stats: customStats, calcHeader }) {
  const [monthlyBudgetK, setMonthlyBudgetK] = useState(150); // ₹1.5 Lakh/month ad spend
  const [selectedType, setSelectedType] = useState('builder');
  const [timeline, setTimeline] = useState(6);
  const budgetSliderId = useId();

  const business = BUSINESS_TYPES[selectedType];

  const defaultStats = [
    { value: '150+', label: 'Real Estate Businesses Scaled' },
    { value: '10x', label: 'Average Lead Volume Growth' },
    { value: '₹2,500Cr+', label: 'Project Sales Marketed' },
    { value: '45%', label: 'Lower Cost Per Acquisition' }
  ];

  const statsList = customStats && customStats.length > 0 ? customStats : defaultStats;

  // Helper formatting for Indian Currency
  const formatINR = (val) => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (val >= 100000) {
      const lakh = val / 100000;
      return `₹${lakh.toFixed(1).replace(/\.0$/, '')} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Monthly Calculations
  const monthlySpendINR = monthlyBudgetK * 1000;

  // With WebTycoons Optimized Funnel (2.8x efficiency vs standard agency)
  const estMonthlyLeads = Math.round(monthlySpendINR / business.cplRate);
  const totalLeads = estMonthlyLeads * timeline;
  const totalSiteVisits = Math.round(totalLeads * business.siteVisitRatio);
  const totalClosings = Math.max(1, Math.round(totalLeads * business.closingRatio));
  const totalSalesVolumeINR = totalClosings * (business.avgTicketCr * 10000000);
  const estimatedGrossRevenueINR = totalSalesVolumeINR; // Total gross property sales generated

  return (
    <section className={`section-py ${styles.calculatorSection}`} id="roi-calculator">
      <div className={styles.glowOrb} />
      
      <div className="container-fluid-px">
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>
            <FaRocket /> {calcHeader?.badge || 'Real Estate Scaling Simulator'}
          </div>
          <h2 className={styles.calcTitle}>
            {calcHeader?.title || (
              <>Real Estate Business <span className={styles.titleHighlight}>Growth &amp; Revenue Calculator</span></>
            )}
          </h2>
          <p className={styles.calcSubtitle}>
            {calcHeader?.subtitle || 'Simulate how our PropTech digital funnels, performance marketing, and automated WhatsApp CRM can scale your monthly leads, site visits, and gross booking volume.'}
          </p>
        </div>

        <motion.div 
          className={styles.calculatorContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className={styles.calcGrid}>
            
            {/* Left: Input Controls */}
            <div className={styles.controlsColumn}>
              
              {/* 1. Monthly Marketing Budget Slider */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <label htmlFor={budgetSliderId} className={styles.controlLabel}>Monthly Growth &amp; Ad Budget</label>
                  <span className={styles.controlValue}>{formatINR(monthlySpendINR)}/mo</span>
                </div>
                <input 
                  id={budgetSliderId}
                  type="range" 
                  min="50" 
                  max="1500" 
                  step="25"
                  value={monthlyBudgetK} 
                  onChange={(e) => setMonthlyBudgetK(Number(e.target.value))}
                  className={styles.slider}
                  aria-label="Monthly Growth and Ad Budget"
                />
                <div className={styles.sliderTicks}>
                  <span>₹50K/mo</span>
                  <span>₹3 Lakh/mo</span>
                  <span>₹8 Lakh/mo</span>
                  <span>₹15 Lakh+/mo</span>
                </div>
              </div>

              {/* 2. Business Type Selector */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlLabel}>Your Real Estate Business Model</span>
                </div>
                <div className={styles.pillButtons}>
                  {Object.values(BUSINESS_TYPES).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.pillBtn} ${selectedType === item.id ? styles.pillBtnActive : ''}`}
                      onClick={() => setSelectedType(item.id)}
                    >
                      <span className={styles.pillTitle}>{item.name}</span>
                      <span className={styles.pillSub}>{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Scaling Timeline */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlLabel}>Scaling Horizon</span>
                </div>
                <div className="d-flex gap-2">
                  {TIMELINES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`${styles.pillBtn} flex-fill text-center ${timeline === t.value ? styles.pillBtnActive : ''}`}
                      onClick={() => setTimeline(t.value)}
                    >
                      <span className={styles.pillTitle}>{t.label}</span>
                      <span className={styles.pillSub}>{t.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Projected Results Display */}
            <div className={styles.resultsColumn}>
              <div>
                <div className={styles.resultsHeader}>
                  <div className={styles.resultsTitle}>Projected Business Growth ({timeline} Months)</div>
                  <div className={styles.resultsTag}>Targeted Scaling Model</div>
                </div>

                {/* Big Metrics Grid */}
                <div className={styles.bigMetricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Verified Inbound Leads</div>
                    <div className={`${styles.metricValue} ${styles.metricValuePrimary}`}>
                      ~{totalLeads.toLocaleString('en-IN')}
                    </div>
                    <div className={styles.metricFootnote}>
                      ~{estMonthlyLeads} high-intent leads/month
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Estimated Site Visits</div>
                    <div className={`${styles.metricValue} ${styles.metricValueAccent}`}>
                      ~{totalSiteVisits.toLocaleString('en-IN')}
                    </div>
                    <div className={styles.metricFootnote}>
                      Qualified with instant WhatsApp CRM
                    </div>
                  </div>
                </div>

                {/* Gross Sales Volume Unlocked */}
                <div className={styles.portfolioTotalBox}>
                  <div className={styles.totalLabel}>Projected Gross Inventory Value Sold</div>
                  <div className={styles.totalValue}>{formatINR(estimatedGrossRevenueINR)}</div>
                  <div className={styles.totalSub}>
                    ~ {totalClosings} High-Ticket Property Closings Expected
                  </div>
                </div>

                {/* Growth Strategist Insight */}
                <div className={styles.insightsBox}>
                  <strong>Growth Strategist Insight:</strong> {business.insight}
                </div>
              </div>

              {/* Action Button */}
              <a href="#consultation" className={styles.dossierBtn}>
                Get Custom Scaling Blueprint for Your Business <FaArrowRight />
              </a>

            </div>

          </div>
        </motion.div>

        {/* ── 4-Column Track Record Metrics Bar (Dynamic) ── */}
        <motion.div 
          className={styles.calculatorStatsBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          {statsList.map((st, i) => (
            <div key={i} className={styles.statItem}>
              <div className={`${styles.statValue} ${i % 2 === 0 ? styles.statValueAccent : ''}`}>
                {st.value}
              </div>
              <div className={styles.statLabel}>{st.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
