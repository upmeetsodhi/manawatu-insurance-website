# Manawatu Insurance website launch checklist

This repository currently builds a **preview**. The preview is marked `noindex` and its enquiry form does not send or save details. Do not point the live domain at it.

## Prepared

- Static pages at `/`, `/about/`, `/services/`, `/contact/`, `/disclosure/`, and `/sitemap/`.
- Individual page titles, descriptions, canonical URLs, structured data, sitemap, and robots file.
- Existing topical coverage carried into the services page; adviser statements and joint statement linked from the site.
- Mobile layouts checked at 390 px width; no horizontal overflow in the five key pages.
- Preview build check runs in GitHub Actions after the repository is created.

## Before a live-domain build

1. Connect the enquiry form to a business-owned Microsoft 365 workflow. Deliver to `admin@manawatuinsurance.co.nz`. Protect the endpoint against spam and abuse, display a truthful success/error result, and record the enquiry in the agreed business location.
2. Submit test enquiries from desktop and mobile. Read back receipt in the admin mailbox, including the subject, sender reply address, all fields, and delivery time. Test the failure state as well.
3. Obtain Manawatu Insurance approval of disclosure, privacy, adviser contact details, linked statements, and all final copy.
4. Remove the concept banner, demo wording, and old-site link. Keep the live build blocked until the preceding checks pass.
5. Create the business-controlled GitHub repository and hosting target. A later repository transfer is possible, but business ownership from launch is preferable.
6. Verify GitHub-hosted pages, HTTPS, custom domain, redirects from old paths, and the form on the staging URL before the DNS cutover. Preserve Microsoft 365 mail DNS records.
7. Recheck titles, metadata, canonical URLs, sitemap, robots rules, analytics, and Search Console. Submit the sitemap after launch and monitor crawl/indexing and enquiries.
8. Keep the old WebCanny site and DNS rollback details available during the launch window.

The build is intentionally blocked when `MANAWATU_LIVE_DOMAIN=1` unless `MANAWATU_ENQUIRIES_VERIFIED=1` is also supplied. That variable is a guard, not proof: use it only after the checks above are recorded.
