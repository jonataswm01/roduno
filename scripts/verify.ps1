$ErrorActionPreference = 'Stop'

$errors = @()

if (-not (Test-Path 'build/index.html')) { $errors += 'Falta build/index.html' }
if (-not (Test-Path 'build/styles/main.css')) { $errors += 'Falta build/styles/main.css' }
if (-not (Test-Path 'build/scripts/main.js')) { $errors += 'Falta build/scripts/main.js' }

$index = (Get-Content 'build/index.html' -Raw) 2>$null
if ($index) {
  if ($index -notmatch 'styles/main.css') { $errors += 'index.html não referencia styles/main.css' }
  if ($index -notmatch 'scripts/main.js') { $errors += 'index.html não referencia scripts/main.js' }
}

# A imagem de fundo é opcional em desenvolvimento (há fallback remoto no CSS)

if ($errors.Count -gt 0) {
  Write-Error ("Verificação falhou:`n" + ($errors -join "`n"))
  exit 1
} else {
  Write-Host 'Verificação OK.'
}

