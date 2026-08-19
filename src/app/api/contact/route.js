import { connectDB } from '../../lib/config';
import { sendNewEnquiryEmail } from '../../../lib/email';

export const dynamic = 'force-dynamic';

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const clientData = rateLimitMap.get(ip) || { count: 0, firstRequest: now };
    if (now - clientData.firstRequest > RATE_LIMIT_WINDOW_MS) {
      clientData.count = 1;
      clientData.firstRequest = now;
    } else {
      clientData.count++;
      if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
        return Response.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, clientData);

    const data = await request.json();

    // Validate required fields
    const { name, email, phone, service, message } = data;
    if (!name || !email || !message) {
      return Response.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Connect and save to DB (we repurpose Enquiry model with WebTycoons fields)
    await connectDB();
    
    // Dynamically import to avoid circular deps
    const { default: Enquiry } = await import('../../models/Enquiry.js');
    
    // Map WebTycoons form fields to Enquiry model fields
    const enquiry = await Enquiry.create({
      contactPerson: name,
      companyName: data.company || 'N/A',
      email,
      contactNo: phone || 'N/A',
      endUse: service || '',
      specialRequirements: message,
      status: 'new',
    });

    // Send notification email
    try {
      await sendNewEnquiryEmail({
        companyName: data.company || name,
        contactPerson: name,
        email,
        contactNo: phone || 'N/A',
        endUse: service || '',
        specialRequirements: message,
        _id: enquiry._id,
      });
    } catch (emailError) {
      console.error('[contact] Email send failed (non-fatal):', emailError);
    }

    return Response.json({
      success: true,
      message: "Thank you! We've received your message and will get back to you shortly.",
    });
  } catch (error) {
    console.error('[api/contact POST]', error);
    return Response.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}