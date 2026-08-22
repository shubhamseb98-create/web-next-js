import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  try {
    const { connectDB } = await import('./src/app/lib/config.js');
    const Service = (await import('./src/app/models/Service.js')).default;
    await connectDB();

    const growthVerticals = [
      {
        id: 'gtm',
        title: 'Project Launch GTM Strategy',
        tag: 'For Builders & Developers',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
        desc: 'Complete digital launch playbooks to build intense pre-launch FOMO, drive initial bookings, and accelerate inventory absorption in under 60 days.',
        features: [
          'Pre-launch teaser & digital hype funnels',
          '3D architectural renders & virtual walkthroughs',
          'High-converting project landing page ecosystems',
          'Omnichannel buyer acquisition (Meta, Google, YouTube)'
        ],
        yield: 'Result: 70%+ Inventory Absorption'
      },
      {
        id: 'agency',
        title: 'Real Estate Agency & Broker Scaling',
        tag: 'For Agencies & Channel Partners',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        desc: 'Turn your real estate agency into an automated inbound lead powerhouse. We build localized acquisition funnels that keep your agents closing high-ticket deals.',
        features: [
          'Inbound buyer & seller lead generation',
          'Instant 60-second automated WhatsApp connect',
          'Automated site-visit booking & calendar reminders',
          'Lead qualification playbooks for sales reps'
        ],
        yield: 'Result: 3x Monthly Site Visits'
      },
      {
        id: 'cp',
        title: 'Channel Partner (CP) Network Systems',
        tag: 'Broker Network Automation',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop',
        desc: 'Build, manage, and scale a massive channel partner network with custom CP portals, automated commission trackers, and exclusive broker event marketing.',
        features: [
          'Custom Channel Partner login & asset portals',
          'Real-time lead mapping & transparent attribution',
          'Automated commission & slab milestone tracking',
          'CP engagement & broker meet event campaigns'
        ],
        yield: 'Result: 500+ Active Brokers Onboarded'
      },
      {
        id: 'nri',
        title: 'High-Ticket NRI Investor Funnels',
        tag: 'Global NRI Acquisition',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        desc: 'Target affluent overseas Indians in Dubai, US, UK, Singapore, and Canada with virtual 3D tour experiences and trust-building digital collateral.',
        features: [
          'High-intent international geo-targeting',
          'Virtual 3D immersive property tours & video walkthroughs',
          'NRI legal & repatriation objection-handling content',
          'High-converting WhatsApp Cloud API nurture'
        ],
        yield: 'Result: 14.8x Average ROAS'
      },
      {
        id: 'proptech',
        title: 'PropTech Web Portals & 3D Tech',
        tag: 'Custom Digital Infrastructure',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
        desc: 'Bespoke Next.js real estate web platforms with interactive master plans, unit availability selectors, and lightning-fast mobile performance.',
        features: [
          'Interactive 3D unit selector & floorplan viewer',
          'Integrated mortgage & EMI calculators',
          'Direct WhatsApp & CRM lead capture hooks',
          'Sub-second page load speeds for maximum ad conversions'
        ],
        yield: 'Result: 68% Higher Conversion Rate'
      },
      {
        id: 'seo',
        title: 'Local Territory Dominance SEO',
        tag: 'Organic Buyer Pipeline',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        desc: 'Dominate Google search results for micro-market keywords, project comparisons, and builder reviews in your target geographical territory.',
        features: [
          'Rank #1 for high-intent property buyer searches',
          'Google Business Profile & local map pack domination',
          'Project review & comparison pillar content',
          'Zero ongoing ad spend for organic buyer leads'
        ],
        yield: 'Result: Zero-CAC Organic Pipeline'
      }
    ];

    const scalingProcess = [
      {
        num: '01',
        title: 'Business & Funnel Audit',
        desc: 'We analyze your current lead costs, sales conversion bottlenecks, broker network, and digital assets to identify growth leakages.'
      },
      {
        num: '02',
        title: 'PropTech & Web Infrastructure',
        desc: 'We build high-speed project discovery portals, 3D interactive unit viewers, and frictionless lead capture pages.'
      },
      {
        num: '03',
        title: 'High-Ticket Lead Generation',
        desc: 'We launch precision-targeted Meta, Google, and YouTube ad campaigns targeting verified homebuyers and high-net-worth investors.'
      },
      {
        num: '04',
        title: 'Sales Automation & WhatsApp CRM',
        desc: 'We implement 60-second automated WhatsApp response bots, instant calling triggers, and automated site-visit reminder cadences.'
      },
      {
        num: '05',
        title: 'Channel Partner & Revenue Scale',
        desc: 'We scale your monthly booking volume, optimize marketing CPA, and expand your active channel partner reach.'
      }
    ];

    const comparisonData = [
      {
        feature: 'Industry Specialization',
        advisor: '100% Real Estate Domain Specialists: We understand project launches, RERA, CPs, and buyer psychology.',
        broker: 'Generic Marketing Agencies: Handle restaurants, dentists, and e-commerce with zero real estate domain insight.'
      },
      {
        feature: 'Lead Quality & Verification',
        advisor: 'Multi-step qualification funnels filtering out casual clickers, delivering verified site-visit ready buyers.',
        broker: 'Sends cheap, unqualified leads with invalid phone numbers that waste your sales team’s time.'
      },
      {
        feature: 'Sales Automation & Nurturing',
        advisor: 'Instant WhatsApp Cloud API integration, 60-second response triggers, and automated calendar scheduling.',
        broker: 'Dumps raw spreadsheet leads that get cold after 4 hours of delay.'
      },
      {
        feature: 'Channel Partner (CP) Strategy',
        advisor: 'Dedicated broker portals, automated commission trackers, and CP incentive program marketing.',
        broker: 'No channel partner systems or broker network capabilities.'
      },
      {
        feature: 'PropTech Engineering',
        advisor: 'Custom 3D virtual tour integrations, interactive unit selectors, and sub-second Next.js web portals.',
        broker: 'Slow, bloated generic WordPress templates that leak 50%+ of paid ad traffic.'
      }
    ];

    const faqs = [
      {
        q: 'Do you sell properties or act as real estate brokers?',
        a: 'No, we are NOT property brokers and we do not sell properties directly. We are a specialized Real Estate Business Growth Advisory & PropTech firm. We advise builders, developers, real estate agencies, and channel partners on how to build digital systems, generate high-quality leads, automate their sales funnels, and scale their real estate business revenue.'
      },
      {
        q: 'How do you help real estate developers sell project inventory faster?',
        a: 'We design complete Go-To-Market (GTM) launch strategies, build high-converting 3D project web portals, run hyper-targeted digital ad campaigns (Meta, Google, YouTube), and implement automated WhatsApp/CRM follow-up systems that turn cold inquiries into verified on-site visits and bookings.'
      },
      {
        q: 'Can you help real estate agencies and brokers scale their lead generation?',
        a: 'Yes! We help property agencies and channel partners build automated inbound lead funnels, setup localized SEO to rank #1 in their target territory, and automate lead qualification so agents only spend time closing high-ticket buyers.'
      },
      {
        q: 'How quickly can we see an increase in qualified real estate leads?',
        a: 'Once your PropTech landing infrastructure and performance campaigns are launched (typically within 7 to 14 days), qualified inbound inquiries and site-visit requests begin generating immediately.'
      },
      {
        q: 'How do you prevent lead leakage in our sales team?',
        a: 'We integrate automated CRM and WhatsApp Cloud API pipelines that connect with your leads within 60 seconds of form submission. Our automated nurture cadences, reminder sequences, and call routing ensure no buyer falls through the cracks.'
      },
      {
        q: 'How do we get started with a business growth audit?',
        a: 'Simply request a growth consultation below. Our senior real estate growth strategists will analyze your current sales funnels, CPA, and inventory targets to deliver a customized scaling roadmap.'
      }
    ];

    const realEstateDoc = {
      title: 'Real Estate Business Growth & Scaling Advisory',
      slug: 'real-estate-advisory',
      shortDesc: 'We do NOT sell properties or act as brokers. We advise real estate builders, developers, agencies, and channel partners on how to generate 10x high-ticket buyer leads, automate sales funnels, and scale business revenue.',
      description: 'Strategic Real Estate Business Growth Advisory & PropTech Engineering firm helping builders and agencies generate high-ticket leads and automate sales funnels.',
      breadcrumbImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
      overviewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      isFeatured: true,
      status: 'active',
      sort: 0,
      metaTitle: 'Real Estate Business Growth & Scaling Advisory | WebTycoons',
      metaDescription: 'Scale your real estate enterprise with B2B business growth advisory, high-ticket buyer funnels, PropTech 3D portals, and automated WhatsApp CRM.',
      canonicalUrl: 'https://thewebtycoons.com/services/real-estate-advisory',
      faq: faqs.map(f => ({ question: f.q, answer: f.a })),
      realEstateData: {
        hero: {
          badge: 'Real Estate Growth & Scaling Advisory',
          title: 'Scale Your Real Estate Business with Strategic Growth & PropTech',
          subtitle: 'We do NOT sell properties or act as brokers. We advise real estate builders, developers, agencies, and channel partners on how to generate 10x high-ticket buyer leads, automate sales funnels, and scale business revenue.',
          primaryBtnText: 'Request Growth Blueprint',
          secondaryBtnText: 'Explore Services',
          calcBtnText: 'Growth Calculator',
          bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
        },
        overview: {
          label: 'OUR SCALING STRATEGY',
          title: 'How We Scale Real Estate Enterprises',
          desc: 'Real estate growth requires more than random social media posts — it demands hyper-targeted buyer funnels, rapid lead follow-up automation, and world-class PropTech presentations.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
          floatingBadgeTitle: 'We Scale Real Estate Companies',
          floatingBadgeText: 'From project launch campaigns and PropTech web portals to automated WhatsApp CRMs — we build predictable digital sales engines for builders and agencies.',
          pillars: [
            {
              icon: 'FaChartLine',
              title: 'High-Ticket Buyer & Investor Lead Generation',
              desc: 'We design high-converting Meta, Google Search, and YouTube ad campaigns targeting affluent homebuyers, NRI investors, and commercial buyers with verified purchasing power.'
            },
            {
              icon: 'FaDesktop',
              title: 'High-Converting PropTech Web Portals & 3D Tech',
              desc: 'We build lightning-fast project landing pages, 3D interactive unit selectors, and virtual tour platforms that convert cold visitors into booked site visits.'
            },
            {
              icon: 'FaCogs',
              title: 'Automated WhatsApp & Sales CRM Funnels',
              desc: 'Eliminate lead leakage with automated 60-second WhatsApp responses, instant sales executive call connects, and automated site-visit reminder cadences.'
            }
          ]
        },
        verticals: {
          label: 'GROWTH SERVICES',
          title: 'Tailored Solutions to Grow Your Real Estate Business',
          desc: 'Whether you are a developer launching a ₹200Cr+ township, a real estate agency scaling broker closings, or expanding a channel partner network — we have the proven blueprint.',
          items: growthVerticals
        },
        stats: [
          { value: '150+', label: 'Real Estate Businesses Scaled' },
          { value: '10x', label: 'Average Lead Volume Growth' },
          { value: '₹2,500Cr+', label: 'Project Sales Marketed' },
          { value: '45%', label: 'Lower Cost Per Acquisition' }
        ],
        process: {
          label: 'OUR BLUEPRINT',
          title: 'The 5-Stage Business Scaling Framework',
          desc: 'Our battle-tested roadmap for real estate builders and agencies to achieve rapid inventory sales, lower acquisition costs, and predictable business scale.',
          items: scalingProcess
        },
        comparison: {
          label: 'WHY BUILDERS & AGENCIES CHOOSE US',
          title: 'Real Estate Specialists vs. Generic Agencies',
          desc: 'Why standard digital marketing agencies fail in real estate, and how our domain-specific growth systems deliver exponential ROI.',
          items: comparisonData
        },
        contact: {
          label: 'GROWTH AUDIT',
          title: 'Ready to Scale Your Real Estate Business?',
          desc: 'Book a strategic discovery call with our senior real estate growth strategists to audit your lead costs, PropTech funnels, and inventory targets.',
          phone: '+91 8527458950',
          email: 'info@thewebtycoons.com',
          location: '123, Digital Hub, Sector 18, Noida, UP — 201301',
          territories: 'Delhi NCR, Mumbai, Bangalore, Dubai & Global NRIs',
          formTitle: 'Request Real Estate Growth Audit',
          formSubtitle: 'Fill out the form below and we will prepare a tailored scaling blueprint for your firm.'
        },
        faqs: {
          label: 'CLEAR ANSWERS',
          title: 'Frequently Asked Questions',
          desc: 'Understand how our growth advisory, PropTech digital infrastructure, and lead generation funnels work for real estate firms.',
          items: faqs
        }
      }
    };

    await Service.deleteOne({ slug: 'real-estate-advisory' });
    const created = await Service.create(realEstateDoc);
    console.log('Successfully created Service document in MongoDB with ID:', created._id, 'and slug:', created.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error inserting real estate service:', err);
    process.exit(1);
  }
}

seed();
