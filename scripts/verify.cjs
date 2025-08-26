/* Cross-platform verify for build output */
const fs = require('fs');
const path = require('path');

function exists(p){ try { return fs.existsSync(p); } catch { return false; } }
function read(p){ try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }

const buildIndex = path.join('build', 'index.html');
const css = path.join('build', 'styles', 'main.css');
const js = path.join('build', 'scripts', 'main.js');

const errors = [];
if (!exists(buildIndex)) errors.push('Falta build/index.html');
if (!exists(css)) errors.push('Falta build/styles/main.css');
if (!exists(js)) errors.push('Falta build/scripts/main.js');

const indexContent = read(buildIndex);
if (indexContent) {
  if (!/styles\/main\.css/.test(indexContent)) errors.push('index.html não referencia styles/main.css');
  if (!/scripts\/main\.js/.test(indexContent)) errors.push('index.html não referencia scripts/main.js');
}

if (errors.length) {
  console.error('Verificação falhou:\n' + errors.join('\n'));
  process.exit(1);
} else {
  console.log('Verificação OK.');
}


