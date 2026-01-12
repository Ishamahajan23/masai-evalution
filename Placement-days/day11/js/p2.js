const sections = [
  { title: 'Section 1', content: 'Content for section 1. This is some detailed information.' },
  { title: 'Section 2', content: 'Content for section 2. This is some detailed information.' },
  { title: 'Section 3', content: 'Content for section 3. This is some detailed information.' }
];

// onces at a time open or collapse

const accordionContainer = document.getElementById('accordion');

sections.forEach((section, index) => {
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'section';

  const header = document.createElement('h3');
  header.textContent = section.title;
  header.style.cursor = 'pointer';

  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = section.content;
  content.style.maxHeight = '0px';
  content.style.overflow = 'hidden';
  content.style.transition = 'max-height 0.3s ease-out';

  header.addEventListener('click', () => {
    const openContent = document.querySelector('.content.open');
    if (openContent && openContent !== content) {
      openContent.style.maxHeight = '0px';
      openContent.classList.remove('open');
    }

    if (content.classList.contains('open')) {
      content.style.maxHeight = '0px';
      content.classList.remove('open');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.classList.add('open');
    }
  });

  sectionDiv.appendChild(header);
  sectionDiv.appendChild(content);
  accordionContainer.appendChild(sectionDiv);
});