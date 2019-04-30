const superlatives = [
  'best', 'worst', 'most', 'awesome', 'sickest', 'nicest', 'coolest','angriest','biggest',
  'blackest','blandest','bluest','boldest','bossiest','bravest','briefest',
  'brightest','broadest','busiest','calmest','cheapest','chewiest','chubbiest',
  'classiest','cleanest','cleverest','closest','cloudiest','clumsiest','coarsest',
  'coldest','coolest','craziest','creamiest','creepiest','crispiest','crunchiest',
  'curliest','curviest','cutest','dampest','darkest','deadliest','deepest',
  'densest','dirtiest','driest','dullest','dumbest','dustiest','earliest',
  'easiest','most evil','faintest','fairest','fanciest','farthest','fastest',
  'fattest','fewest','fiercest','filthiest','finest','firmest','fittest',
  'flakiest','flattest','freshest','friendliest','fullest','funniest','gentlest',
  'gloomiest','greasiest','greatest','greediest','grossest','hairiest','handiest',
  'happiest','hardest','harshest','healthiest','heaviest','highest','hippest',
  'hottest','humblest','hungriest','iciest','itchiest','juiciest','kindest',
  'largest','latest','laziest','lightest','likeliest','littlest','liveliest',
  'longest','loudest','loveliest','lowest','maddest','meanest','messiest',
  'mildest','moistest','narrowest','nastiest','naughtiest','nearest','neatest',
  'neediest','most nervous','newest','nicest','noisiest','oddest','oiliest',
  'oldest/eldest','plainest','politest','poorest','prettiest','proudest','purest',
  'quickest','quietest','rarest','rawest','richest','ripest','riskiest','roomiest',
  'roughest','rudest','rustiest','saddest','safest','saltiest','sanest','scariest',
  'shallowest','sharpest','shiniest','shortest','shyest','silliest','simplest',
  'sincerest','skinniest','sleepiest','slimmest','slimiest','slowest','smallest',
  'smartest','smelliest','smokiest','smoothest','softest','soonest','sorest',
  'sorriest','sourest','spiciest','steepest','stingiest','strangest','strictest',
  'strongest','sunniest','sweatiest','sweetest','tallest','tannest','tastiest',
  'thickest','thinnest','thirstiest','tiniest','toughest','truest','ugliest',
  'warmest','weakest','wealthiest','weirdest','wettest','widest','wildest',
  'windiest','wisest','worldliest','worthiest','youngest'
];

// kinda hack, but this is a hack day 🤷🏻‍♂️
Element.prototype.documentOffsetTop = function () {
  return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
};

const textElements = [
  ...document.getElementsByTagName('h1'),
  ...document.getElementsByTagName('h2'),
  ...document.getElementsByTagName('h3'),
  ...document.getElementsByTagName('h4'),
  ...document.getElementsByTagName('h5'),
  ...document.getElementsByTagName('h6'),
  ...document.getElementsByTagName('p'),
  ...document.getElementsByTagName('span'),
];

const button = document.createElement('button');
button.className = 'testButton';
button.innerText = 'Test it';

button.addEventListener('click', (e) => {
  const highlightElements = [...document.querySelectorAll('.highlight')];
  const currentActiveElementIndex = highlightElements.findIndex((el) => {
    return el.className.indexOf('active') !== -1;
  });

  const currentActiveElement = highlightElements[currentActiveElementIndex];

  if (currentActiveElement) {
    currentActiveElement.classList.remove('active');
  }

  const nextActiveElementIndex = (currentActiveElementIndex + 1) % highlightElements.length;
  const nextActiveElement = highlightElements[nextActiveElementIndex];

  if (nextActiveElement) {
    const top = nextActiveElement.documentOffsetTop() - ( window.innerHeight / 2 );

    window.scrollTo(0, top);

    nextActiveElement.classList.add('active');
  }
});

document.body.appendChild(button);

textElements.forEach((element) => {
  const { innerText } = element;
  const regex = new RegExp(`(${superlatives.join('|')})`, 'g');
  const replaceContent = innerText.replace(regex, (matched) => {
    return `<span class="highlight">${matched}</span>`
  });

  element.innerHTML = replaceContent;
});

// Sometimes storage isn't loaded yet
setTimeout(() => chrome.storage.local.get('disabled', storage => {
  console.log(`REDACTED is ${storage.disabled ? 'disabled' : 'enabled'}`);
  if (!storage.disabled) {
    document.getElementsByTagName('body')[0].classList.add("redacted");
    // Init here
  }
  chrome.storage.onChanged.addListener(() => window.location.reload())
}), 10);
