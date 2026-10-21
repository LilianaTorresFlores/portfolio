(() => {
  const records = window.portfolioPublications || [];
  const dialog = document.getElementById('publication-dialog');
  const grid = document.getElementById('publications-list');
  if (!dialog || !grid) return;
  const preview = document.getElementById('publication-preview');
  let returnFocus;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }

  function externalLink(label, url) {
    const link = element('a', '', label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.append(element('span', 'sr-only', ' (opens in a new tab)'));
    return link;
  }

  function openPublication(record, trigger) {
    if (typeof dialog.showModal !== 'function') {
      window.open(record.document, '_blank', 'noopener');
      return;
    }
    returnFocus = trigger;
    document.getElementById('publication-title').textContent = record.title;
    document.getElementById('publication-meta').textContent = [record.year, record.category].filter(Boolean).join(' · ');
    const authors = document.getElementById('publication-authors');
    authors.textContent = record.authors || '';
    authors.hidden = !record.authors;
    document.getElementById('publication-institution').textContent = record.institution;
    document.getElementById('publication-description').textContent = record.description;
    const facts = document.getElementById('publication-facts');
    facts.replaceChildren();
    for (const [label, value] of [['Advisor', record.advisor], ['DOI', record.doi]]) {
      if (value) facts.append(element('dt', '', label), element('dd', '', value));
    }
    facts.hidden = !facts.childElementCount;
    const links = document.getElementById('publication-links');
    links.replaceChildren();
    const originalLabel = record.preview ? 'Open original document' : 'Open original PDF';
    for (const reference of [...(record.links || []), { label: originalLabel, url: record.document }]) {
      const item = element('li');
      item.append(externalLink(reference.label, reference.url));
      links.append(item);
    }
    preview.replaceChildren();
    if (record.preview?.type === 'iframe') {
      const frame = element('iframe');
      frame.src = record.preview.url;
      frame.title = `Document preview: ${record.title}`;
      frame.addEventListener('error', () => {
        const fallback = element('p', 'publication-preview-fallback', 'Document preview is unavailable. ');
        fallback.append(externalLink('Read the original document', record.document));
        preview.replaceChildren(fallback);
      }, { once: true });
      preview.append(frame);
      dialog.showModal();
      dialog.scrollTop = 0;
      return;
    }
    if (navigator.pdfViewerEnabled === false) {
      const fallback = element('p', 'publication-preview-fallback', 'This browser does not support inline PDFs. ');
      fallback.append(externalLink('Read the original document', record.document));
      preview.append(fallback);
      dialog.showModal();
      dialog.scrollTop = 0;
      return;
    }
    const pdf = element('object');
    pdf.type = 'application/pdf';
    pdf.data = `${record.document}#view=FitH`;
    pdf.setAttribute('aria-label', `PDF: ${record.title}`);
    const fallback = element('p', 'publication-preview-fallback', 'PDF preview is unavailable in this browser. ');
    fallback.append(externalLink('Read the original document', record.document));
    pdf.append(fallback);
    preview.append(pdf);
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  for (const record of records) {
    const card = element('article', 'publication-entry');
    card.id = `publication-${record.id}`;
    card.append(element('p', 'project-year', [record.year, record.category].filter(Boolean).join(' · ')));
    const heading = element('h3', 'project-name');
    // The title remains a working source link before progressive enhancement.
    const control = element('a', 'publication-open', record.title);
    control.href = record.document;
    control.setAttribute('aria-haspopup', 'dialog');
    control.setAttribute('aria-controls', 'publication-dialog');
    control.addEventListener('click', event => { event.preventDefault(); openPublication(record, control); });
    heading.append(control);
    const attribution = element('p', 'publication-attribution', record.authors);
    attribution.hidden = !record.authors;
    card.append(heading, attribution, element('p', 'project-desc', record.description), element('p', 'project-tag', record.institution));
    grid.append(card);

    document.querySelectorAll(`[data-publication-id="${record.id}"]`).forEach(link => {
      link.hidden = false;
      link.href = `#publication-${record.id}`;
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('aria-controls', 'publication-dialog');
      link.addEventListener('click', event => { event.preventDefault(); openPublication(record, link); });
    });
  }
  document.getElementById('publication-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    preview.replaceChildren();
    returnFocus?.focus({ preventScroll: true });
  });
})();
