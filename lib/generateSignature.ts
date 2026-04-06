export interface SignatureValues {
  firstName: string;
  lastName: string;
  position: string;
  tel: string;
  email: string;
}

export function generateSignatureHtml(values: SignatureValues): string {
  const fullName =
    `${values.firstName} ${values.lastName}`.trim() || "Vorname Nachname";
  const position = values.position || "Position";
  const tel = values.tel || "+49 209 389489 0";
  const email = values.email || "info@eratec-germany.com";
  const telHref = "tel:" + tel.replace(/[^+\d]/g, "");

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background:transparent;">

<table cellpadding="0" cellspacing="0" border="0"
  style="font-family:Arial,Helvetica,sans-serif;width:560px;border-collapse:collapse;background-color:#ffffff;">

  <!-- Red accent bar -->
  <tr>
    <td style="height:2px;background-color:#e30613;font-size:0;line-height:0;">&nbsp;</td>
  </tr>

  <tr>
    <td style="padding:26px 30px 22px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">

        <!-- Name + Logo -->
        <tr>
          <td style="padding-bottom:18px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#1d1d1b;letter-spacing:-0.5px;display:block;margin-bottom:7px;line-height:1;">${fullName}</span>
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:5px;height:5px;background-color:#e30613;border-radius:3px;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</td>
                      <td style="padding-left:7px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e30613;vertical-align:middle;">${position}</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:middle;text-align:right;width:160px;">
                  <img src="https://cdn.shopify.com/s/files/1/0971/8959/3463/files/logo_eratec_germany.svg"
                    alt="ERATEC-GERMANY GmbH" height="80" border="0"
                    style="display:block;height:80px;width:auto;margin-left:auto;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding-bottom:18px;">
            <div style="height:1px;background-color:#ebebeb;font-size:0;line-height:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Contact + Address -->
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>

                <!-- Left: contact rows as table for perfect alignment -->
                <td style="vertical-align:top;width:48%;padding-right:20px;">
                  <table cellpadding="0" cellspacing="0" border="0">

                    <!-- Tel -->
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e30613;white-space:nowrap;width:44px;padding-bottom:9px;vertical-align:middle;">Tel</td>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;padding-bottom:9px;vertical-align:middle;"><a href="${telHref}" style="color:#1d1d1b;text-decoration:none;">${tel}</a></td>
                    </tr>

                    <!-- Mail -->
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e30613;white-space:nowrap;width:44px;padding-bottom:9px;vertical-align:middle;">Mail</td>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;padding-bottom:9px;vertical-align:middle;">
                        <a href="mailto:${email}" style="color:#1d1d1b;text-decoration:none;">${email}</a>
                      </td>
                    </tr>

                    <!-- Web -->
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e30613;white-space:nowrap;width:44px;padding-bottom:9px;vertical-align:middle;">Web</td>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;padding-bottom:9px;vertical-align:middle;">
                        <a href="https://www.eratec-germany.com" style="color:#1d1d1b;text-decoration:none;">www.eratec-germany.com</a>
                      </td>
                    </tr>

                    <!-- Social -->
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e30613;white-space:nowrap;width:44px;vertical-align:middle;">Social</td>
                      <td style="vertical-align:middle;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>

                            <!-- LinkedIn -->
                            <td style="padding-right:7px;">
                              <a href="https://www.linkedin.com/company/era-tec-gmbh/" style="display:block;text-decoration:none;opacity:1;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d1d1b" xmlns="http://www.w3.org/2000/svg"><path d="M6.94 5a2 2 0 11-4-.002A2 2 0 016.94 5zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>
                              </a>
                            </td>

                            <!-- Instagram -->
                            <td style="padding-right:7px;">
                              <a href="https://www.instagram.com/eratec.de/" style="display:block;text-decoration:none;opacity:1;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d1d1b" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                              </a>
                            </td>

                            <!-- Facebook -->
                            <td style="padding-right:7px;">
                              <a href="https://www.facebook.com/era.tec.3/" style="display:block;text-decoration:none;opacity:1;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d1d1b" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                              </a>
                            </td>

                            <!-- YouTube -->
                            <td style="padding-right:7px;">
                              <a href="https://www.youtube.com/@eratecgermany" style="display:block;text-decoration:none;opacity:1;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d1d1b" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                              </a>
                            </td>

                            <!-- TikTok -->
                            <td>
                              <a href="https://www.tiktok.com/@eratec.de" style="display:block;text-decoration:none;opacity:1;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d1d1b" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>
                              </a>
                            </td>

                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                </td>

                <!-- Vertical separator -->
                <td style="width:1px;min-width:1px;max-width:1px;background-color:#ebebeb;padding:0;font-size:0;line-height:0;"></td>

                <!-- Right: address -->
                <td style="vertical-align:top;padding-left:20px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#e30613;margin-bottom:7px;">Standort</div>
                  <a href="https://maps.app.goo.gl/9FVfzdj12rETzkLa8" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#1d1d1b;line-height:1.75;text-decoration:none;display:block;">
                    Magdeburger Str. 16B<br>
                    45881 Gelsenkirchen<br>
                    Deutschland
                  </a>
                </td>

              </tr>
            </table>
          </td>
        </tr>

        <!-- Legal -->
        <tr>
          <td style="padding-top:14px;border-top:1px solid #ebebeb;margin-top:16px;">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;color:#cccccc;line-height:2;display:block;letter-spacing:0.15px;">
              ERATEC-GERMANY GmbH &nbsp;&middot;&nbsp;
              Registergericht: Amtsgericht Gelsenkirchen, HRB 18703 &nbsp;&middot;&nbsp;
              Gesch&auml;ftsf&uuml;hrerin: Burcu &Ouml;zer<br>
              USt-IdNr.: DE450199949 &nbsp;&middot;&nbsp;
              WEEE-Reg.-Nr.: DE 55476635
            </span>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}
