function formatFileName() {
  let name = document.getElementById('fileBaseName').value;
  let ext = document.getElementById('fileExtension').value;
  let style = document.getElementById('formatStyle').value;

  // Clean: allow only letters, numbers, spaces
  let cleaned = name
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove symbols like &, #, @, etc.
    .trim()
    .replace(/\s+/g, ' '); // normalize multiple spaces

  let words = cleaned.split(' ').map(w => w.toLowerCase());

  let formattedName = '';
  switch (style) {
    case 'camelCase':
      formattedName = words[0] + words.slice(1).map(capitalize).join('');
      break;
    case 'PascalCase':
      formattedName = words.map(capitalize).join('');
      break;
    case 'snake_case':
      formattedName = words.join('_');
      break;
    case 'kebab-case':
      formattedName = words.join('-');
      break;
    default:
      formattedName = words.join('_');
  }

  let formattedExt = ext.toLowerCase().replace(/[^a-z0-9]/g, ''); // clean extension
  let formattedFile = formattedName + (formattedExt ? '.' + formattedExt : '');

  document.getElementById('fileOutput').textContent = formattedFile;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function copyOutput() {
  const output = document.getElementById("fileOutput").textContent;
  if (!output) return;

  navigator.clipboard.writeText(output).then(() => {
    let btn = document.getElementById("copyBtn");
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1500);
  });
}
