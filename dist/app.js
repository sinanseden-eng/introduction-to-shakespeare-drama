const chapters = [
  { name: 'Iambic Pentameter', icon: '♫', color: '#f2a474', summary: 'Hear the five soft–STRONG pairs in familiar sentences.', pages: [
    { title: 'The five-beat line', file: 'iambic_pentameter_1.webp', alt: 'Iambic pentameter examples: a phone on the couch and ordering pizza, with five pairs of syllables marked in each sentence.' },
    { title: 'Five beats in daily speech', file: 'iambic_pentameter_2.webp', alt: 'Iambic pentameter examples about a subway ride and coffee, with five numbered weak–strong pairs.' }
  ]},
  { name: 'Wrenching, Enjambment & Caesura', icon: '↝', color: '#f0c36f', summary: 'Follow stress, line breaks and pauses through one short poem.', pages: [
    { title: 'Wrenching', file: 'Poetry Techniques_1.webp', alt: 'Wrenching: two examples of a forced stress in fabricated and educate from the classroom poem.' },
    { title: 'Enjambment', file: 'Poetry Techniques_2.webp', alt: 'Enjambment: the full five-line poem with three lines where the thought runs onto the next line.' },
    { title: 'Caesura', file: 'Poetry Techniques_3.webp', alt: 'Caesura: two within-line pauses in the poem, one after school and one after rubbish.' }
  ]},
  { name: 'Shakespeare’s Language', icon: '✒', color: '#7bc8bb', summary: 'Translate 33 older words, then see each used in a sentence.', pages: [
    { title: 'Words A–H', file: 'Shakespeares_words_1.webp', alt: 'Shakespearean language poster one: alas through hadst, modern meanings and one example for each.' },
    { title: 'Words H–T', file: 'Shakespeares_words_2.webp', alt: 'Shakespearean language poster two: hath through thee, modern meanings and one example for each.' },
    { title: 'Words T–W', file: 'Shakespeares_words_3.webp', alt: 'Shakespearean language poster three: thence through withal, modern meanings and one example for each.' }
  ]},
  { name: 'Literary Devices', icon: '✧', color: '#b49ce5', summary: 'Explore ten devices with a Romeo and Juliet example and examples from today.', pages: [
    { title: 'Foreshadowing and contrast', file: '3.webp', alt: 'Definitions and Romeo and Juliet and modern examples of foreshadowing and contrast.' },
    { title: 'Dramatic irony and ethical dilemma', file: '4.webp', alt: 'Definitions and Romeo and Juliet and modern examples of dramatic irony and ethical dilemma.' },
    { title: 'Paradox and irony', file: '5.webp', alt: 'Definitions and Romeo and Juliet and modern examples of paradox and irony.' },
    { title: 'Ambiguity and symbolism', file: '6.webp', alt: 'Definitions and Romeo and Juliet and modern examples of ambiguity and symbolism.' },
    { title: 'Metaphor and juxtaposition', file: '7.webp', alt: 'Definitions and Romeo and Juliet and modern examples of metaphor and juxtaposition.' }
  ]}
];

const pages = chapters.flatMap((chapter, chapterIndex) => chapter.pages.map((page, localIndex) => ({...page, chapterIndex, localIndex})));
const $ = id => document.getElementById(id);
const chapterNav = $('chapterNav');
const pageList = $('pageList');
const dialog = $('imageDialog');
let current = 0;

function asset(file) { return `assets/${encodeURIComponent(file)}`; }
function firstPage(chapterIndex) { return chapters.slice(0, chapterIndex).reduce((sum, chapter) => sum + chapter.pages.length, 0); }
function fromHash() { const match = /^#page-(\d+)$/.exec(location.hash); return match ? Math.min(pages.length - 1, Math.max(0, Number(match[1]) - 1)) : 0; }
function setPage(index) { const clamped = Math.max(0, Math.min(pages.length - 1, index)); if (location.hash === `#page-${clamped + 1}`) render(clamped); else location.hash = `page-${clamped + 1}`; }

function render(index) {
  current = index;
  const page = pages[index];
  const chapter = chapters[page.chapterIndex];
  chapterNav.replaceChildren();
  chapters.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'chapter-button'; button.style.setProperty('--chip', item.color);
    button.setAttribute('aria-current', String(i === page.chapterIndex));
    button.innerHTML = `<span class="chapter-num">${String(i+1).padStart(2,'0')}</span><span class="chapter-icon" aria-hidden="true">${item.icon}</span><span class="chapter-label">${item.name}</span>`;
    button.addEventListener('click', () => setPage(firstPage(i)));
    chapterNav.append(button);
  });
  $('chapterNumber').textContent = String(page.chapterIndex + 1).padStart(2, '0');
  $('chapterTitle').textContent = chapter.name;
  $('chapterSummary').textContent = chapter.summary;
  pageList.replaceChildren();
  chapter.pages.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'page-link'; button.textContent = `${i + 1}. ${item.title}`;
    if (i === page.localIndex) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => setPage(firstPage(page.chapterIndex) + i));
    pageList.append(button);
  });
  $('plateChapter').textContent = chapter.name;
  $('plateIndex').textContent = `CHAPTER ${String(page.chapterIndex + 1).padStart(2,'0')} / ${String(chapter.pages.length).padStart(2,'0')} PAGES`;
  $('plateTitle').textContent = page.title;
  $('plateType').textContent = 'ILLUSTRATED STUDY PAGE';
  $('plateCaption').textContent = `Page ${page.localIndex + 1} of ${chapter.pages.length} in this chapter`;
  $('pageCorner').textContent = String(index + 1).padStart(2, '0');
  const image = $('plateImage');
  image.src = asset(page.file); image.alt = page.alt;
  $('imageButton').classList.remove('turning'); void $('imageButton').offsetWidth; $('imageButton').classList.add('turning');
  $('readerStatus').textContent = `Page ${index + 1} of ${pages.length}`;
  $('progressFill').style.width = `${(index + 1) / pages.length * 100}%`;
  $('prevButton').disabled = index === 0; $('nextButton').disabled = index === pages.length - 1;
}
function enlarge() {
  const page = pages[current];
  $('dialogTitle').textContent = `${chapters[page.chapterIndex].name} · ${page.title}`;
  $('dialogImage').src = asset(page.file); $('dialogImage').alt = page.alt;
  dialog.showModal();
}

$('prevButton').addEventListener('click', () => setPage(current - 1));
$('nextButton').addEventListener('click', () => setPage(current + 1));
$('imageButton').addEventListener('click', enlarge);
$('expandButton').addEventListener('click', enlarge);
$('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
window.addEventListener('hashchange', () => render(fromHash()));
window.addEventListener('keydown', event => {
  if (dialog.open || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); setPage(current + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); setPage(current - 1); }
});
let touchX = 0;
document.querySelector('.illustration-page').addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, {passive:true});
document.querySelector('.illustration-page').addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - touchX;
  if (Math.abs(distance) > 65) setPage(current + (distance < 0 ? 1 : -1));
}, {passive:true});
render(fromHash());
