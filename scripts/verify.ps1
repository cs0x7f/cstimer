$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$gitBash = 'C:\Program Files\Git\bin\bash.exe'

if (!(Test-Path $gitBash)) {
	throw "Git Bash not found at $gitBash"
}

Write-Host 'Running Closure compile check via Git Bash...'
& $gitBash -lc "cd '/c/CreativeOS/01_Projects/Code/Personal_Stuff/2026-04-02_cstimer-trainer' && make check"

