import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.EMAIL_SEND_FROM || 'onboarding@resend.dev';
const toEmail = process.env.EMAIL_SEND_TO || 'hello@example.com';

const getEmailWrapper = (title, content, badgeText = 'Website Lead') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    table {
      border-collapse: separate;
    }
    a {
      text-decoration: none;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
      }
      .content-padding {
        padding: 24px 18px !important;
      }
      .header-padding {
        padding: 28px 18px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 28px 0; background-color: #f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 0 12px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Modern Brand Header -->
          <tr>
            <td class="header-padding" style="background: linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%); padding: 34px 36px 30px; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <!-- Brand Pill Badge -->
                    <div style="display: inline-block; padding: 5px 14px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 30px; margin-bottom: 12px;">
                      <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;">
                        THE WEB<span style="color: #38bdf8;">TYCOONS</span>
                      </span>
                    </div>

                    <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #94a3b8; text-transform: uppercase; margin-bottom: 14px;">
                      Digital Solutions & Web Agency
                    </div>

                    ${badgeText ? `
                    <div style="display: inline-block; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 10px; border-radius: 9999px; margin-bottom: 10px;">
                      ${badgeText}
                    </div>
                    ` : ''}

                    <h1 style="color: #ffffff; margin: 0; font-size: 23px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.25;">
                      ${title}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="content-padding" style="padding: 32px 36px 28px; background-color: #ffffff;">
              ${content}
            </td>
          </tr>

          <!-- Professional Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 22px 36px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; line-height: 1.5;">
                This is an automated notification from <strong style="color: #0f172a;">The WebTycoons</strong> website.
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} The WebTycoons. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const sendNewEnquiryEmail = async (data) => {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Skipping email dispatch.");
    return;
  }

  const {
    companyName, contactPerson, name, email, contactNo, phone, address,
    service, endUse, budget, message, specialRequirements,
    standard, grade, thicknessMin, thicknessMax, widthMin, widthMax,
    qty, surfaceFinish, hardness, selectOne, uts, ys, elongation
  } = data;

  const clientName = (contactPerson || name || '').trim() || 'Website Visitor';
  const clientEmail = (email || '').trim();
  const clientPhone = (contactNo || phone || '').trim();
  
  // Clean company name: avoid repeating person name or dummy strings
  let cleanCompany = (companyName || '').trim();
  if (
    !cleanCompany ||
    cleanCompany.toLowerCase() === clientName.toLowerCase() ||
    cleanCompany.toLowerCase() === 'n/a' ||
    cleanCompany.toLowerCase() === 'individual' ||
    cleanCompany === '-'
  ) {
    cleanCompany = '';
  }

  const clientAddress = (address && address.trim() !== '-' && address.trim().toLowerCase() !== 'n/a') ? address.trim() : '';
  const selectedService = (service || endUse || '').trim();
  const selectedBudget = (budget || '').trim();
  const clientMessage = (message || specialRequirements || '').trim();

  // Check if any technical metallurgy / material specs are provided
  const hasTechSpecs = Boolean(
    (standard && standard !== '-') ||
    (grade && grade !== '-') ||
    (thicknessMin && thicknessMin !== '-') ||
    (thicknessMax && thicknessMax !== '-') ||
    (widthMin && widthMin !== '-') ||
    (widthMax && widthMax !== '-') ||
    (qty && qty !== '-') ||
    (surfaceFinish && surfaceFinish !== '-') ||
    (hardness && hardness !== '-') ||
    (selectOne && selectOne !== '-') ||
    (uts && uts !== '-') ||
    (ys && ys !== '-') ||
    (elongation && elongation !== '-')
  );

  const formattedDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const content = `
    <!-- Lead Timestamp Banner -->
    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size: 13px; color: #166534; font-weight: 600;">
            ⚡ New inquiry submitted from website contact form
          </td>
          <td align="right" style="font-size: 12px; color: #15803d; white-space: nowrap;">
            ${formattedDate}
          </td>
        </tr>
      </table>
    </div>

    <!-- Contact Information Card -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569;">
          👤 Client Contact Information
        </span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 14px 18px;">
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Contact Person</td>
          <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 600;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Email Address</td>
          <td style="padding: 6px 0; font-size: 14px;">
            <a href="mailto:${clientEmail}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${clientEmail || '—'}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Phone / Contact No</td>
          <td style="padding: 6px 0; font-size: 14px;">
            ${clientPhone ? `<a href="tel:${clientPhone}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${clientPhone}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
          </td>
        </tr>
        ${cleanCompany ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Company Name</td>
          <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${cleanCompany}</td>
        </tr>
        ` : ''}
        ${clientAddress ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Address</td>
          <td style="padding: 6px 0; font-size: 14px; color: #334155;">${clientAddress}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Project & Service Requirements Card -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569;">
          🎯 Service & Project Scope
        </span>
      </div>
      <div style="padding: 18px;">
        ${selectedService ? `
        <div style="margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
            Service Interested In
          </div>
          <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 14px; font-weight: 700; padding: 6px 14px; border-radius: 6px;">
            ${selectedService}
          </span>
        </div>
        ` : ''}

        ${selectedBudget ? `
        <div style="margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
            Estimated Budget
          </div>
          <span style="display: inline-block; background-color: #fef3c7; border: 1px solid #fde68a; color: #92400e; font-size: 14px; font-weight: 700; padding: 5px 12px; border-radius: 6px;">
            ${selectedBudget}
          </span>
        </div>
        ` : ''}

        <div>
          <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            Message / Requirements
          </div>
          <div style="background-color: #f8fafc; border-left: 4px solid #0f172a; border-radius: 0 6px 6px 0; padding: 14px 18px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
            ${clientMessage || '<em style="color: #94a3b8;">No additional message was provided.</em>'}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Action CTA Buttons -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${clientEmail ? `
              <td style="border-radius: 8px; background-color: #0f172a; text-align: center;">
                <a href="mailto:${clientEmail}?subject=Re:%20Inquiry%20regarding%20${encodeURIComponent(selectedService || 'your project')}" style="display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">
                  ✉️ Reply via Email
                </a>
              </td>
              ` : ''}
              ${clientPhone ? `
              <td style="width: 12px;"></td>
              <td style="border-radius: 8px; border: 1px solid #cbd5e1; background-color: #ffffff; text-align: center;">
                <a href="tel:${clientPhone}" style="display: inline-block; padding: 11px 20px; font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; border-radius: 8px;">
                  📞 Call Client
                </a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Conditional Technical Specifications (Rendered ONLY if relevant fields exist) -->
    ${hasTechSpecs ? `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-top: 24px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569;">
          ⚙️ Technical Specifications
        </span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 12px 18px;">
        ${standard && standard !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Standard</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${standard}</td></tr>` : ''}
        ${grade && grade !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Grade</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${grade}</td></tr>` : ''}
        ${((thicknessMin && thicknessMin !== '-') || (thicknessMax && thicknessMax !== '-')) ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Thickness</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${thicknessMin || '—'} mm to ${thicknessMax || '—'} mm</td></tr>` : ''}
        ${((widthMin && widthMin !== '-') || (widthMax && widthMax !== '-')) ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Width</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${widthMin || '—'} mm to ${widthMax || '—'} mm</td></tr>` : ''}
        ${qty && qty !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Quantity</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${qty} Kg</td></tr>` : ''}
        ${surfaceFinish && surfaceFinish !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Surface Finish</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${surfaceFinish}</td></tr>` : ''}
        ${hardness && hardness !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Hardness</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${hardness}</td></tr>` : ''}
        ${selectOne && selectOne !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Option</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${selectOne}</td></tr>` : ''}
        ${uts && uts !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">UTS</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${uts} N/mm²</td></tr>` : ''}
        ${ys && ys !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">YS</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${ys} N/mm²</td></tr>` : ''}
        ${elongation && elongation !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Elongation</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${elongation} %</td></tr>` : ''}
      </table>
    </div>
    ` : ''}
  `;

  const html = getEmailWrapper("New Website Inquiry", content, "New Lead");

  const subjectLabel = selectedService ? `${selectedService} — ${clientName}` : `${clientName}${cleanCompany ? ` (${cleanCompany})` : ''}`;

  try {
    const response = await resend.emails.send({
      from: `The WebTycoons <${fromEmail}>`,
      to: [toEmail],
      subject: `New Website Inquiry: ${subjectLabel}`,
      html: html,
      replyTo: clientEmail || undefined,
    });
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export const sendUpdatedEnquiryEmail = async (data) => {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Skipping email dispatch.");
    return;
  }

  const {
    companyName, contactPerson, name, email, contactNo, phone,
    service, endUse, message, specialRequirements,
    standard, grade, thicknessMin, thicknessMax, widthMin, widthMax,
    qty, surfaceFinish, hardness, selectOne, uts, ys, elongation
  } = data;

  const clientName = (contactPerson || name || '').trim() || 'Client';
  const clientEmail = (email || '').trim();
  const clientPhone = (contactNo || phone || '').trim();

  let cleanCompany = (companyName || '').trim();
  if (
    !cleanCompany ||
    cleanCompany.toLowerCase() === clientName.toLowerCase() ||
    cleanCompany.toLowerCase() === 'n/a' ||
    cleanCompany.toLowerCase() === 'individual' ||
    cleanCompany === '-'
  ) {
    cleanCompany = '';
  }

  const clientMessage = (message || specialRequirements || '').trim();
  const selectedService = (service || endUse || '').trim();

  const formattedDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const content = `
    <!-- Update Banner -->
    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size: 13px; color: #1e40af; font-weight: 600;">
            ℹ️ Additional specifications submitted for this inquiry
          </td>
          <td align="right" style="font-size: 12px; color: #2563eb; white-space: nowrap;">
            ${formattedDate}
          </td>
        </tr>
      </table>
    </div>

    <!-- Contact Info Summary -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569;">
          👤 Client Details
        </span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 14px 18px;">
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Contact Person</td>
          <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 600;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Email Address</td>
          <td style="padding: 6px 0; font-size: 14px;">
            <a href="mailto:${clientEmail}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${clientEmail || '—'}</a>
          </td>
        </tr>
        ${clientPhone ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Phone No</td>
          <td style="padding: 6px 0; font-size: 14px;">
            <a href="tel:${clientPhone}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${clientPhone}</a>
          </td>
        </tr>
        ` : ''}
        ${cleanCompany ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 130px; font-weight: 500;">Company</td>
          <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${cleanCompany}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Technical Specifications Card -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569;">
          ⚙️ Specifications & Requirements
        </span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 12px 18px;">
        ${selectedService ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Service</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${selectedService}</td></tr>` : ''}
        ${standard && standard !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Standard</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${standard}</td></tr>` : ''}
        ${grade && grade !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Grade</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${grade}</td></tr>` : ''}
        ${((thicknessMin && thicknessMin !== '-') || (thicknessMax && thicknessMax !== '-')) ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Thickness</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${thicknessMin || '—'} mm to ${thicknessMax || '—'} mm</td></tr>` : ''}
        ${((widthMin && widthMin !== '-') || (widthMax && widthMax !== '-')) ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Width</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${widthMin || '—'} mm to ${widthMax || '—'} mm</td></tr>` : ''}
        ${qty && qty !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Quantity</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${qty} Kg</td></tr>` : ''}
        ${surfaceFinish && surfaceFinish !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Surface Finish</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${surfaceFinish}</td></tr>` : ''}
        ${hardness && hardness !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Hardness</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${hardness}</td></tr>` : ''}
        ${selectOne && selectOne !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Option</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${selectOne}</td></tr>` : ''}
        ${uts && uts !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">UTS</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${uts} N/mm²</td></tr>` : ''}
        ${ys && ys !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">YS</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${ys} N/mm²</td></tr>` : ''}
        ${elongation && elongation !== '-' ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%; font-weight: 500;">Elongation</td><td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${elongation} %</td></tr>` : ''}
      </table>
      ${clientMessage ? `
      <div style="padding: 14px 18px; border-top: 1px solid #f1f5f9; background-color: #f8fafc;">
        <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Notes / Requirements</div>
        <div style="font-size: 14px; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">${clientMessage}</div>
      </div>
      ` : ''}
    </div>

    <!-- Quick Reply CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${clientEmail ? `
              <td style="border-radius: 8px; background-color: #0f172a; text-align: center;">
                <a href="mailto:${clientEmail}?subject=Re:%20Inquiry%20Update%20—%20The%20WebTycoons" style="display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">
                  ✉️ Reply to ${clientName}
                </a>
              </td>
              ` : ''}
              ${clientPhone ? `
              <td style="width: 12px;"></td>
              <td style="border-radius: 8px; border: 1px solid #cbd5e1; background-color: #ffffff; text-align: center;">
                <a href="tel:${clientPhone}" style="display: inline-block; padding: 11px 20px; font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; border-radius: 8px;">
                  📞 Call Client
                </a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const html = getEmailWrapper("Technical Details Provided", content, "Lead Update");

  try {
    const response = await resend.emails.send({
      from: `The WebTycoons <${fromEmail}>`,
      to: [toEmail],
      subject: `Technical Details Added by ${clientName}${cleanCompany ? ` (${cleanCompany})` : ''}`,
      html: html,
      replyTo: clientEmail || undefined,
    });
    console.log("Updated Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send updated email:", error);
    throw error;
  }
};

export const sendTestEmail = async (testToEmail, subject, htmlContent) => {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  // Replace common variables with dummy data for the test
  let processedHtml = htmlContent || '';
  processedHtml = processedHtml.replace(/\{\{userName\}\}/g, 'John Doe (Test)');
  processedHtml = processedHtml.replace(/\{\{companyName\}\}/g, 'The WebTycoons Client');
  processedHtml = processedHtml.replace(/\{\{resetLink\}\}/g, 'https://thewebtycoons.com/reset');
  processedHtml = processedHtml.replace(/\{\{contactEmail\}\}/g, 'support@thewebtycoons.com');
  processedHtml = processedHtml.replace(/\{\{supportPhone\}\}/g, '+91 93235 82341');

  // If the user's custom template does not include a full HTML document, wrap it in our brand wrapper
  const finalHtml = processedHtml.includes('<html') ? processedHtml : getEmailWrapper(subject || "Template Preview", processedHtml, "Preview");

  try {
    const response = await resend.emails.send({
      from: `The WebTycoons Admin <${fromEmail}>`,
      to: [testToEmail],
      subject: `[TEST] ${subject || "Template Preview"}`,
      html: finalHtml,
    });
    console.log("Test Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send test email:", error);
    throw error;
  }
};


