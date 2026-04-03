$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$gitBash = 'C:\Program Files\Git\bin\bash.exe'

if (!(Test-Path $gitBash)) {
	throw "Git Bash not found at $gitBash"
}

Push-Location $repoRoot
try {
	Write-Host 'Building local preview bundle via Git Bash...'
	& $gitBash -lc "cd '/c/CreativeOS/01_Projects/Code/Personal_Stuff/2026-04-02_cstimer-trainer' && make local"
	if ($LASTEXITCODE -ne 0) {
		throw "make local failed with exit code $LASTEXITCODE"
	}

	$indexPath = Join-Path $repoRoot 'dist\local\index.html'
	if (!(Test-Path $indexPath)) {
		throw "Expected preview output not found at $indexPath"
	}

	Write-Host "Local preview generated at $indexPath"
}
finally {
	Pop-Location
}
