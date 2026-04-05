param(
	[int]$Port = 5432,
	[switch]$NoOpenBrowser
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$phpExe = (Get-Command php -ErrorAction Stop).Source
$gitBash = 'C:\Program Files\Git\bin\bash.exe'
$hostName = '127.0.0.1'
$previewRoot = Join-Path $repoRoot 'dist\local'
$previewIndex = Join-Path $previewRoot 'index.html'
$serverUrl = "http://${hostName}:$Port/"

if (!(Test-Path $gitBash)) {
	throw "Git Bash not found at $gitBash"
}

$existingListener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($existingListener) {
	$pids = ($existingListener | Select-Object -ExpandProperty OwningProcess -Unique) -join ', '
	throw "Port $Port is already in use by process id(s): $pids"
}

Push-Location $repoRoot
try {
	Write-Host 'Building local preview bundle via Git Bash...'
	& $gitBash -lc "cd '/c/CreativeOS/01_Projects/Code/Personal_Stuff/2026-04-02_cstimer-trainer' && make local"
	if ($LASTEXITCODE -ne 0) {
		throw "make local failed with exit code $LASTEXITCODE"
	}

	if (!(Test-Path $previewIndex)) {
		throw "Expected preview output not found at $previewIndex"
	}

	if (-not $NoOpenBrowser) {
		Start-Process $serverUrl | Out-Null
	}

	Write-Host "Serving local preview at $serverUrl"
	Write-Host 'Press Ctrl+C to stop the server.'

	& $phpExe -S "${hostName}:$Port" -t $previewRoot
	if ($LASTEXITCODE -ne 0) {
		throw "php server exited with code $LASTEXITCODE"
	}
}
finally {
	Pop-Location
}
