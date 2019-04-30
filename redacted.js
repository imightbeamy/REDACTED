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

textElements.forEach((element) => {
  const { innerText } = element;
  const regex = new RegExp(`(${superlatives.join('|')})`, 'g');
  const replaceContent = innerText.replace(regex, (matched) => {
    return `<span class="highlight">${matched}</span>`
  });

  element.innerHTML = replaceContent;
});
