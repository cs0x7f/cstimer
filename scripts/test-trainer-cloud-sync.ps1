$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$exportPath = Join-Path $repoRoot "src/js/export.js"
$source = Get-Content -Path $exportPath -Raw

function Assert-True {
	param(
		[bool]$Condition,
		[string]$Message
	)

	if (-not $Condition) {
		throw $Message
	}
}

$serverMergePattern = 'return \(typeof trainerExport !== ''undefined''\) \? trainerExport\.mergeExportObj\(baseObj\) : baseObj;'
Assert-True ([regex]::IsMatch($source, $serverMergePattern)) "Server-sync slice export should merge the trainer block into the uploaded meta object."

$confirmPattern = 'IMPORT_FINAL_CONFIRM[\s\S]*\+ trainerSummary'
Assert-True ([regex]::IsMatch($source, $confirmPattern)) "Import confirmation should append the trainer summary."

$summaryPatterns = @(
	'Trainer data will stay unchanged \(no trainer block in this import\)\.',
	'Trainer data will be reset to clean defaults\.',
	'Trainer data block is invalid and will be ignored\.',
	'Trainer data will be overwritten: profile '
)

foreach ($pattern in $summaryPatterns) {
	Assert-True ([regex]::IsMatch($source, $pattern)) "Missing expected trainer import summary branch: $pattern"
}

$googleUploadPattern = 'return \(typeof trainerExport !== ''undefined''\) \? trainerExport\.mergeExportObj\(exportObj\) : exportObj;'
Assert-True ([regex]::IsMatch($source, $googleUploadPattern)) "Google/file export flow should continue merging trainer data into expString."

Write-Host "trainer cloud-sync regression checks passed"
