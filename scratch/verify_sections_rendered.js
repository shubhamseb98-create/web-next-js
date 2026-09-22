async function checkPage(slug) {
  const url = `http://localhost:3000/services/${slug}`;
  const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
  console.log(`\nTesting ${url} -> Status: ${res.status}`);
  const html = await res.text();
  
  const checks = [
    { label: 'Hero title', test: html.includes('<h1') },
    { label: 'Overview Section', test: html.includes('What is this service?') },
    { label: 'Key Benefits', test: html.includes('Key Benefits') },
    { label: 'Features Grid', test: html.includes('KEY CAPABILITIES') },
    { label: 'Portfolio Section', test: html.includes('OUR PORTFOLIO') },
    { label: 'Process Timeline', test: html.includes('OUR PROCESS') },
    { label: 'Why Choose Us', test: html.includes('WHY WEBTYCOONS') },
    { label: 'FAQs Accordion', test: html.includes('Frequently Asked Questions') },
    { label: 'Tech Stack', test: html.includes('Tech Stack') || html.includes('Modern') },
  ];

  checks.forEach(c => {
    console.log(`  ${c.label}: ${c.test ? '✓ Present' : '✗ Missing'}`);
  });
}

async function run() {
  await checkPage('website-designing');
  await checkPage('e-commerce-website-development');
  await checkPage('logo-designing');
}

run().catch(console.error);
