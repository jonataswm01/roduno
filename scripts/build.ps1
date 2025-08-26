$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'build')) {
  New-Item -ItemType Directory build | Out-Null
}

Get-ChildItem build -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

Copy-Item -Path src\* -Destination build -Recurse -Force

Write-Host 'Build: src -> build concluído.'

