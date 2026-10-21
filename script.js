const menu = document.getElementById('hamburger');
const links = document.getElementById('navLinks');
function closeMenu() { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; links.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.querySelector('.nav-name').addEventListener('click', closeMenu);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && links.classList.contains('open')) { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const dialog = document.getElementById('credential-dialog');
let trigger;
function safeUrl(value) { if (!value) return null; try { const url = new URL(value, document.baseURI); return ['https:', 'http:'].includes(url.protocol) ? url : null; } catch { return null; } }
for (const record of window.portfolioCredentials || []) {
  const entry = document.querySelector(`[data-credential-id="${record.id}"]`);
  const documentUrl = safeUrl(record.document);
  const verification = safeUrl(record.verificationUrl);
  if (!entry || (!documentUrl && !verification)) continue;
  const control = document.createElement(documentUrl ? 'button' : 'a');
  control.className = 'credential-link'; control.textContent = 'View credential';
  control.setAttribute('aria-label', `View credential: ${record.programTitle}`);
  if (!documentUrl) { control.href = verification.href; control.target = '_blank'; control.rel = 'noopener'; }
  else {
    control.type = 'button';
    control.addEventListener('click', () => {
      if (typeof dialog.showModal !== 'function') { window.open(documentUrl.href, '_blank', 'noopener'); return; }
      trigger = control;
      document.getElementById('credential-title').textContent = record.programTitle;
      document.getElementById('credential-original').href = documentUrl.href;
      const preview = document.getElementById('credential-preview'); preview.replaceChildren();
      if (/\.pdf$/i.test(documentUrl.pathname)) { const object = document.createElement('object'); object.type = 'application/pdf'; object.data = documentUrl.href; object.setAttribute('aria-label', `${record.programTitle} credential PDF`); const fallback = document.createElement('p'); fallback.textContent = 'Preview unavailable. Use the original document link above.'; object.append(fallback); preview.append(object); }
      else if (/\.(png|jpe?g|webp)$/i.test(documentUrl.pathname)) { const image = document.createElement('img'); image.src = documentUrl.href; image.alt = `${record.programTitle} certificate awarded to Liliana Torres Flores by ${record.institution}`; image.className = 'credential-image'; preview.append(image); }
      else { const message = document.createElement('p'); message.textContent = 'Use the original document link above to view this credential.'; preview.append(message); }
      if (verification) { const link = document.createElement('a'); link.href = verification.href; link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Verify credential on issuer platform (opens in a new tab)'; preview.append(link); }
      dialog.showModal();
    });
  }
  entry.append(control);
}
document.getElementById('credential-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.getElementById('credential-preview').replaceChildren(); trigger?.focus(); });
