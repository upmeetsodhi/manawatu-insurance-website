# Manawatu Insurance domain handoff — draft, do not apply yet

This is a website-only change plan. It is **not** an instruction to change DNS until the live enquiry has been received in the admin mailbox, the linked statements have been checked anonymously, and the custom domain is configured in GitHub Pages.

## Current public DNS snapshot (24 November 2026, NZ time)

| Host | Type | Current answer |
| --- | --- | --- |
| `manawatuinsurance.co.nz` | A | `174.138.191.36` |
| `www.manawatuinsurance.co.nz` | A | `174.138.191.36` |
| `manawatuinsurance.co.nz` | MX | `manawatuinsurance-co-nz.mail.protection.outlook.com` |

The current MX, SPF, DKIM, DMARC, Microsoft verification and other mail-related records must remain untouched. Do not change name servers.

## Proposed website records at cutover

1. In the GitHub repository's **Settings → Pages**, add `www.manawatuinsurance.co.nz` as its custom domain before DNS changes.
2. Replace the four root-domain (`@`) website A answers with GitHub Pages A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Replace the `www` website A record with a CNAME to `upmeetsodhi.github.io` (without the repository name).
4. Enable HTTPS in GitHub Pages once its DNS and certificate checks pass. Confirm root redirects to `www` and both versions serve the new site.

GitHub documents these record values and recommends adding the custom domain in Pages before changing DNS: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Cutover checks

- Confirm `/`, `/about/`, `/services/`, `/contact/`, `/disclosure/`, `/sitemap/`, `/robots.txt`, and `/sitemap.xml` over HTTPS.
- Confirm the former `/about`, `/services`, `/contact`, and `/sitemap` paths redirect to their slash-suffixed pages.
- Confirm the live build has indexable search settings, page-specific canonical URLs and metadata, structured data, and the existing analytics ID.
- Submit an actual enquiry from mobile and desktop; verify receipt in `admin@manawatuinsurance.co.nz` before and after DNS cutover.
- Check that Microsoft 365 mail remains usable and that its DNS records have not changed.
- Keep the former WebCanny answer `174.138.191.36` and its hosting account available for rollback during the launch window.

## Current hold

FormSubmit sent a first-use activation message to the admin mailbox. The form correctly shows a failure until activation. A second successful submission and mailbox receipt are still required. The public GitHub preview remains `noindex` and its form remains a demo.
