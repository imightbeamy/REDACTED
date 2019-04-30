const superlatives = [
  'best',
  'awesome',
  'sickest',
  'nicest',
  'coolest',
];

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
    nextActiveElement.scrollIntoView();
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
