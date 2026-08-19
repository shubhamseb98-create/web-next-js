// For [id] routes
const fs = require('fs');
const idRoutes = [
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/portfolio/[id]/route.js',
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/services/[id]/route.js',
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/testimonials/[id]/route.js'
];

idRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ connectDB \} from '.*';/, "import { connectDB } from '../../../lib/config';");
  content = content.replace(/import (.*?) from '.*models\/(.*?)';/, "import $1 from '../../../models/$2';");
  content = content.replace(/import \{ requireAuth \} from '.*lib\/auth';/, "import { requireAuth } from '../../../lib/auth';");
  fs.writeFileSync(file, content);
});

const baseRoutes = [
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/portfolio/route.js',
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/services/route.js',
  'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/testimonials/route.js'
];

baseRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ connectDB \} from '.*';/, "import { connectDB } from '../../lib/config';");
  content = content.replace(/import (.*?) from '.*models\/(.*?)';/, "import $1 from '../../models/$2';");
  content = content.replace(/import \{ requireAuth \} from '.*lib\/auth';/, "import { requireAuth } from '../../lib/auth';");
  fs.writeFileSync(file, content);
});

const contactRoute = 'd:/santosh/try react/webtycoons-react/next-dash/src/app/api/contact/route.js';
let contactContent = fs.readFileSync(contactRoute, 'utf8');
contactContent = contactContent.replace(/import \{ connectDB \} from '.*lib\/config';/, "import { connectDB } from '../../lib/config';");
contactContent = contactContent.replace(/import \{ sendNewEnquiryEmail \} from '.*lib\/email';/, "import { sendNewEnquiryEmail } from '../../../lib/email';");
contactContent = contactContent.replace(/await import\('.*models\/Enquiry\.js'\)/, "await import('../../models/Enquiry.js')");
fs.writeFileSync(contactRoute, contactContent);

console.log('Done!');