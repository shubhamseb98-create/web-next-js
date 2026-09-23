const http = require('http');

async function test(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path: urlPath,
          status: res.statusCode,
          hasPageHeader: data.includes('class="page-header'),
          hasBreadcrumb: data.includes('breadcrumb'),
          length: data.length
        });
      });
    }).on('error', (err) => resolve({ path: urlPath, error: err.message }));
  });
}

async function main() {
  const routes = ['/about', '/products', '/projects', '/contact', '/blog', '/services/website-designing'];
  for (const r of routes) {
    console.log(JSON.stringify(await test(r)));
  }
}

main();
