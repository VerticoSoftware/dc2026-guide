# DC2026 Nanjing · attendee guide

Unofficial attendee guide for RILEM Digital Concrete 2026 (Nanjing, 18–21 Oct 2026): https://verticosoftware.github.io/dc2026-guide/

One self-contained page (`index.html`): what's on now, the programme, people, Chinese phrases and practical info. Nothing loads from the internet, so it keeps working offline once opened. Stars, notes and contact details stay in the browser on your own phone.

Built from the trip repo: `tools/build_conf.py` writes `share/dc2026-web/`, and this repo serves that folder as it is. It holds `index.html` with a `noindex` tag so search engines leave it out, `sw.js` for offline reloads, and a manifest and icons for Add to Home screen.

## Do not share this address's storage

Every GitHub Pages site of the VerticoSoftware organisation is served from the same origin, `https://verticosoftware.github.io`, and every page there can read, overwrite and clear the browser storage of every other one. People's stars, notes and contact details for this guide live in that storage (keys starting `dc26:`). Until the guide is retired:

- publish no other GitHub Pages site in the VerticoSoftware organisation (or give it a custom domain), and
- never call `localStorage.clear()` on any page under `verticosoftware.github.io`.

To give the guide an origin of its own, add a DNS `CNAME` record `dc2026.vertico.com` → `verticosoftware.github.io` first, then set the custom domain under Settings → Pages. People bring their data across with Info → Send my notes → Save as file, then Restore from file on the new address.
