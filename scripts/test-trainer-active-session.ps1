$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$trainerPath = Join-Path $repoRoot "src/js/trainer/trainer-active-session.js"
$scramblePath = Join-Path $repoRoot "src/js/scramble/scramble_333_edit.js"

function Assert-True {
	param(
		[bool]$Condition,
		[string]$Message
	)

	if (-not $Condition) {
		throw $Message
	}
}

function Convert-PllLabelToCaseId {
	param([string]$Label)
	return "PLL-$Label"
}

$trainerSource = Get-Content -Path $trainerPath -Raw
$scrambleSource = Get-Content -Path $scramblePath -Raw

$pllBlock = [regex]::Match($scrambleSource, 'var pll_map = \[(.*?)\];', [System.Text.RegularExpressions.RegexOptions]::Singleline)
Assert-True $pllBlock.Success "Unable to locate csTimer PLL map in scramble_333_edit.js."

$pllEntries = [regex]::Matches($pllBlock.Groups[1].Value, "\[\s*0x[0-9a-f]+,\s*0x[0-9a-f]+,\s*\d+,\s*'([^']+)'\s*\]", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Assert-True ($pllEntries.Count -eq 21) "Expected 21 PLL entries in csTimer's native PLL map."

$expectedMap = @{}
for ($i = 0; $i -lt $pllEntries.Count; $i++) {
	$expectedMap[(Convert-PllLabelToCaseId $pllEntries[$i].Groups[1].Value)] = $i
}

$trainerMapBlock = [regex]::Match($trainerSource, 'var _pllCaseIndexMap = \{(.*?)\};', [System.Text.RegularExpressions.RegexOptions]::Singleline)
Assert-True $trainerMapBlock.Success "Unable to locate trainer PLL case index map."

$trainerMapEntries = [regex]::Matches($trainerMapBlock.Groups[1].Value, '"([^"]+)":\s*(\d+)')
$actualMap = @{}
foreach ($entry in $trainerMapEntries) {
	$actualMap[$entry.Groups[1].Value] = [int]$entry.Groups[2].Value
}

Assert-True ($actualMap.Count -eq $expectedMap.Count) "Trainer PLL index map does not cover the full native PLL case set."

foreach ($caseId in $expectedMap.Keys) {
	Assert-True ($actualMap.ContainsKey($caseId)) "Trainer PLL index map is missing $caseId."
	Assert-True ($actualMap[$caseId] -eq $expectedMap[$caseId]) "Trainer PLL index for $caseId does not match csTimer's native PLL ordering."
}

$ollOffsetPattern = 'return \{ type: "oll", caseIndex: Math\.max\(1, parseInt\(ollMatch\[1\], 10\)\) \};'
Assert-True ($trainerSource -match $ollOffsetPattern) "OLL case mapping should use csTimer's native 1-based OLL indices."

$keyboardAdvancePattern = 'if \(_timerRunning\) \{\s*_handleNextCase\(\);\s*\} else \{\s*_startTimer\(\);\s*\}'
Assert-True ([regex]::IsMatch($trainerSource, $keyboardAdvancePattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)) "Spacebar flow should finish the current attempt when the timer is already running."

Write-Host "trainer active-session mapping tests passed"
