$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$gitBash = 'C:\Program Files\Git\bin\bash.exe'

function Update-LocalPreviewAssetUrls {
	param(
		[string]$IndexPath
	)

	$stamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
	$content = Get-Content -Path $IndexPath -Raw
	$content = $content.Replace('css/style.css', "css/style.css?v=$stamp")
	$content = $content.Replace('js/jquery.min.js', "js/jquery.min.js?v=$stamp")
	$content = $content.Replace('js/cstimer.js', "js/cstimer.js?v=$stamp")
	$content = $content.Replace('js/twisty.js', "js/twisty.js?v=$stamp")
	Set-Content -Path $IndexPath -Value $content -Encoding UTF8
}

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

	Update-LocalPreviewAssetUrls -IndexPath $indexPath

	Write-Host "Local preview generated at $indexPath"
}
finally {
	Pop-Location
}
