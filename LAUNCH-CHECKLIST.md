# Manawatu Insurance website launch checklist

This repository currently builds a **preview**. The preview is marked `noindex` and its enquiry form does not send or save details. Do not point the live domain at it.

## Prepared

- Static pages at `/`, `/about/`, `/services/`, `/contact/`, `/disclosure/`, and `/sitemap/`.
- Individual page titles, descriptions, canonical URLs, structured data, sitemap, and robots file.
- Existing topical coverage carried into the services page; adviser statements and joint statement linked from the site.
- Mobile layouts checked at 390 px width; no horizontal overflow in the five key pages.
- Preview build check runs in GitHub Actions after the repository is created.

## Before a live-domain build

1. Activate the FormSubmit endpoint from the activation message sent to `admin@manawatuinsurance.co.nz`. It will deliver messages to that Microsoft 365 mailbox; FormSubmit processes and retains submissions for 30 days.
2. Submit a fresh test enquiry from desktop and mobile. Read back receipt in the admin mailbox, including the subject, sender reply address, all fields, and delivery time. Test the failure state as well. The local form handles both confirmed success and failed delivery, but mailbox receipt remains outstanding.
3. John has approved the disclosure copy. Recheck the linked adviser and joint statements anonymously, and confirm the newly added FormSubmit privacy wording before launch.
4. Remove the concept banner, demo wording, and old-site link. Keep the live build blocked until the preceding checks pass.
5. The GitHub repository and preview are in Upmeet's account for now. Arrange transfer to business control later if desired.
6. Verify GitHub-hosted pages, HTTPS, custom domain, redirects from old paths, and the form on the staging URL before the DNS cutover. Preserve Microsoft 365 mail DNS records.
7. Recheck titles, metadata, canonical URLs, sitemap, robots rules, analytics, and Search Console. Submit the sitemap after launch and monitor crawl/indexing and enquiries.
8. Keep the old WebCanny site and DNS rollback details available during the launch window.

The build is intentionally blocked when `MANAWATU_LIVE_DOMAIN=1` unless `VITE_MANAWATU_LIVE=1`, `VITE_ENQUIRY_PROVIDER=formsubmit`, and `MANAWATU_ENQUIRIES_VERIFIED=1` are supplied. The final variable is a guard, not proof: use it only after the checks above are recorded. The preview workflow deliberately continues to publish `noindex` demo pages.
