(() => {
  const gallery = document.getElementById('project-dialog');
  const closeButton = document.getElementById('project-close');
  const image = document.getElementById('project-gallery-image');
  const stage = gallery.querySelector('.project-image-stage');
  const error = document.getElementById('project-image-error');
  const status = document.getElementById('project-media-status');
  const frame = gallery.querySelector('.project-image-frame');
  const controls = gallery.querySelector('.project-gallery-controls');
  const resources = document.getElementById('project-resource-links');
  const adaptive = document.getElementById('project-adaptive-evidence');
  let activeProject = null;
  let activeIndex = 0;
  let returnFocus = null;
  let videoResizeObserver = null;

  function text(id, value) { document.getElementById(id).textContent = value || ''; }
  function externalLink(label, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = label;
    const hint = document.createElement('span');
    hint.className = 'sr-only';
    hint.textContent = ' (opens in a new tab)';
    link.append(hint);
    return link;
  }

  image.addEventListener('load', () => {
    stage.setAttribute('aria-busy', 'false');
    frame.hidden = false;
    image.hidden = false;
    image.style.visibility = 'visible';
    error.hidden = true;
  });
  image.addEventListener('error', () => {
    stage.setAttribute('aria-busy', 'false');
    image.hidden = true;
    frame.hidden = true;
    error.hidden = false;
  });

  function renderSlide() {
    const slide = activeProject.images[activeIndex];
    stage.setAttribute('aria-busy', 'true');
    frame.hidden = false;
    image.hidden = false;
    image.style.visibility = 'hidden';
    error.hidden = true;
    image.alt = slide.alt;
    image.width = slide.width;
    image.height = slide.height;
    image.src = slide.src;
    document.getElementById('project-image-original').href = slide.src;
    document.getElementById('project-image-fallback').href = slide.src;
    const multiple = activeProject.images.length > 1;
    status.textContent = multiple ? `Media ${activeIndex + 1} of ${activeProject.images.length}` : '';
    controls.hidden = !multiple;
    frame.tabIndex = multiple ? 0 : -1;
  }

  function changeSlide(offset) {
    if (!activeProject || activeProject.video || activeProject.images.length < 2) return;
    activeIndex = (activeIndex + offset + activeProject.images.length) % activeProject.images.length;
    renderSlide();
  }

  function renderFacebookVideo(project) {
    const wrapper = document.createElement('div');
    wrapper.className = 'project-video-frame';
    wrapper.style.aspectRatio = `${project.video.width} / ${project.video.height}`;
    const player = document.createElement('iframe');
    player.title = project.video.title;
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    const notice = document.createElement('p');
    notice.className = 'project-video-error';
    notice.hidden = true;
    notice.setAttribute('role', 'status');
    notice.textContent = 'Facebook could not load the video here. The link beside the description opens the original video.';
    player.addEventListener('error', () => { notice.hidden = false; });
    wrapper.append(player);
    adaptive.append(wrapper, notice);
    let lastWidth = 0;
    function resizePlayer() {
      const width = Math.max(220, Math.floor(wrapper.clientWidth));
      if (width === lastWidth) return;
      lastWidth = width;
      const height = Math.round(width * project.video.height / project.video.width);
      const embed = new URL('https://www.facebook.com/plugins/video.php');
      embed.search = new URLSearchParams({ href: project.video.url, show_text: 'false', width: String(width), height: String(height), autoplay: 'false' }).toString();
      player.width = width;
      player.height = height;
      player.src = embed.href;
    }
    resizePlayer();
    videoResizeObserver = new ResizeObserver(resizePlayer);
    videoResizeObserver.observe(wrapper);
  }

  function renderContext(project, card) {
    text('project-dialog-title', card.querySelector('.project-name').textContent.trim());
    text('project-meta', [card.querySelector('.project-year').textContent.trim(), project.channel].filter(Boolean).join(' \u00b7 '));
    text('project-dialog-description', card.querySelector('.project-desc').textContent.trim().replace(/\s+/g, ' '));
    const facts = document.getElementById('project-context-facts');
    facts.replaceChildren();
    if (project.role) {
      const term = document.createElement('dt');
      term.textContent = 'Role';
      const detail = document.createElement('dd');
      detail.textContent = project.role;
      facts.append(term, detail);
    }
    text('project-contribution', project.contribution);
    gallery.querySelector('.project-contribution-block').hidden = !project.contribution;
    resources.replaceChildren();
    for (const resource of project.links || []) {
      const item = document.createElement('li');
      const link = externalLink(resource.publisher || resource.label, resource.url);
      link.setAttribute('aria-label', `${resource.label} (opens in a new tab)`);
      item.append(link);
      resources.append(item);
    }
    text('project-reference-label', project.video ? 'If playback is unavailable' : 'Press');
    document.getElementById('project-references').hidden = !resources.childElementCount;
  }

  function openProject(project, card, button) {
    if (typeof gallery.showModal !== 'function') {
      window.open(project.video?.url || project.images[0].src, '_blank', 'noopener');
      return;
    }
    returnFocus = button;
    activeProject = project;
    activeIndex = 0;
    gallery.dataset.presentation = project.presentation;
    renderContext(project, card);
    adaptive.replaceChildren();
    adaptive.hidden = !project.video;
    document.getElementById('project-slide-viewer').hidden = Boolean(project.video);
    if (!project.video) renderSlide();
    gallery.showModal();
    if (project.video) renderFacebookVideo(project);
    gallery.scrollTop = 0;
    closeButton.focus({ preventScroll: true });
  }

  for (const project of window.portfolioProjects || []) {
    if (!project.video && !project.images?.length) continue;
    const card = document.querySelector(`[data-project-id="${project.id}"]`);
    if (!card) continue;
    const heading = card.querySelector('.project-name');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-open';
    button.textContent = heading.textContent;
    button.setAttribute('aria-label', `View project: ${heading.textContent.trim()}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', gallery.id);
    button.addEventListener('click', () => openProject(project, card, button));
    heading.replaceChildren(button);

  }

  document.getElementById('project-previous').addEventListener('click', () => changeSlide(-1));
  document.getElementById('project-next').addEventListener('click', () => changeSlide(1));
  closeButton.addEventListener('click', () => gallery.close());
  gallery.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !frame.contains(document.activeElement)) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      changeSlide(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  gallery.addEventListener('close', () => {
    activeProject = null;
    videoResizeObserver?.disconnect();
    videoResizeObserver = null;
    image.removeAttribute('src');
    image.hidden = true;
    adaptive.replaceChildren();
    returnFocus?.focus({ preventScroll: true });
  });
})();
