export interface SignatureValues {
  firstName: string;
  lastName: string;
  position: string;
  tel: string;
  email: string;
}

// Base URL for hosted icon assets — update if domain changes
const ICON_BASE = "https://signatur-vert.vercel.app/icons";

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
                              <a href="https://www.linkedin.com/company/era-tec-gmbh/" style="display:block;text-decoration:none;">
                                <img src="${ICON_BASE}/linkedin.png" width="16" height="16" alt="LinkedIn" style="display:block;border:0;" />
                              </a>
                            </td>

                            <!-- Instagram -->
                            <td style="padding-right:7px;">
                              <a href="https://www.instagram.com/eratec.de/" style="display:block;text-decoration:none;">
                                <img src="${ICON_BASE}/instagram.png" width="16" height="16" alt="Instagram" style="display:block;border:0;" />
                              </a>
                            </td>

                            <!-- Facebook -->
                            <td style="padding-right:7px;">
                              <a href="https://www.facebook.com/era.tec.3/" style="display:block;text-decoration:none;">
                                <img src="${ICON_BASE}/facebook.png" width="16" height="16" alt="Facebook" style="display:block;border:0;" />
                              </a>
                            </td>

                            <!-- YouTube -->
                            <td style="padding-right:7px;">
                              <a href="https://www.youtube.com/@eratecgermany" style="display:block;text-decoration:none;">
                                <img src="${ICON_BASE}/youtube.png" width="16" height="16" alt="YouTube" style="display:block;border:0;" />
                              </a>
                            </td>

                            <!-- TikTok -->
                            <td>
                              <a href="https://www.tiktok.com/@eratec.de" style="display:block;text-decoration:none;">
                                <img src="${ICON_BASE}/tiktok.png" width="16" height="16" alt="TikTok" style="display:block;border:0;" />
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
