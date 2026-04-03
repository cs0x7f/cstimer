"use strict";

var trainerCatalogData = execMain(function() {

	var CATALOG_VERSION = "v1.1.0";
	var CATALOG_BUILD_DATE = "2026-04-03T00:00:00.000Z";

	var PROVENANCE = {
		"speedcubedb-pdf-pll": {
			sourceRef: "speedcubedb-pdf-pll",
			sourceName: "SpeedCubeDB Algorithm Sheet - PLL",
			sourceUrl: "https://speedcubedb.com/pdfalgsheet/431/PLL",
			sourceType: "page",
			confidence: "medium",
			contributedAt: CATALOG_BUILD_DATE,
			lastVerifiedAt: CATALOG_BUILD_DATE,
			notes: "Primary PLL algorithm sheet used for the v1 catalog foundation."
		},
		"speedcubedb-pdf-oll": {
			sourceRef: "speedcubedb-pdf-oll",
			sourceName: "Shawn Boucke's Algorithm Sheet - OLL",
			sourceUrl: "https://speedcubedb.com/pdfalgsheet/481/OLL",
			sourceType: "page",
			confidence: "medium",
			contributedAt: CATALOG_BUILD_DATE,
			lastVerifiedAt: CATALOG_BUILD_DATE,
			notes: "Primary OLL algorithm sheet used for the v1 catalog foundation."
		},
		"trainer-cross-taxonomy": {
			sourceRef: "trainer-cross-taxonomy",
			sourceName: "csTimer Trainer Cross Taxonomy",
			sourceUrl: "docs/architecture/case-taxonomy.md",
			sourceType: "page",
			confidence: "high",
			contributedAt: CATALOG_BUILD_DATE,
			lastVerifiedAt: CATALOG_BUILD_DATE,
			notes: "Internal product taxonomy defining cross drill modes as scramble-generated drill descriptors."
		}
	};

	var CASES = [
		{ caseId: "PLL-Ua", category: "PLL", name: "U-perm (a)", groupTags: ["PLL-EDGE"], difficultyTier: 1, notes: "Edge 3-cycle, counterclockwise", algorithms: [{ notation: "y2 R U' R U R U R U' R' U' R2", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Ub", category: "PLL", name: "U-perm (b)", groupTags: ["PLL-EDGE"], difficultyTier: 1, notes: "Edge 3-cycle, clockwise", algorithms: [{ notation: "y2 R2 U R U R' U' R' U' R' U R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Z", category: "PLL", name: "Z-perm", groupTags: ["PLL-EDGE"], difficultyTier: 2, notes: "Opposite edge swap", algorithms: [{ notation: "y M2 U' M2 U' M' U2 M2 U2 M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-H", category: "PLL", name: "H-perm", groupTags: ["PLL-EDGE"], difficultyTier: 2, notes: "Opposite edge swap (symmetric)", algorithms: [{ notation: "M2 U' M2 U2 M2 U' M2", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Aa", category: "PLL", name: "A-perm (a)", groupTags: ["PLL-CORNER-ONLY"], difficultyTier: 2, notes: "Corner 3-cycle, clockwise", algorithms: [{ notation: "y x' R2 D2 R' U' R D2 R' U R' x", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Ab", category: "PLL", name: "A-perm (b)", groupTags: ["PLL-CORNER-ONLY"], difficultyTier: 2, notes: "Corner 3-cycle, counterclockwise", algorithms: [{ notation: "y x' R U' R D2 R' U R D2 R2 x", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-E", category: "PLL", name: "E-perm", groupTags: ["PLL-CORNER-ONLY"], difficultyTier: 3, notes: "Opposite corner swap (X pattern)", algorithms: [{ notation: "z U2 R2 F R U R' U' R U R' U' R U R' U' F' R2 U2 z'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-T", category: "PLL", name: "T-perm", groupTags: ["PLL-DIAG"], difficultyTier: 3, notes: "Adjacent corner + adjacent edge swap", algorithms: [{ notation: "R U R' U' R' F R2 U' R' U' R U R' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Y", category: "PLL", name: "Y-perm", groupTags: ["PLL-DIAG"], difficultyTier: 3, notes: "Diagonal corner swap + edge swap", algorithms: [{ notation: "F R U' R' U' R U R' F' R U R' U' R' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-F", category: "PLL", name: "F-perm", groupTags: ["PLL-DIAG"], difficultyTier: 5, notes: "T-perm variant with extra setup", algorithms: [{ notation: "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-V", category: "PLL", name: "V-perm", groupTags: ["PLL-DIAG"], difficultyTier: 5, notes: "Diagonal corner swap + edge 3-cycle", algorithms: [{ notation: "y2 R U' L' U R' U' R U' L U R' U2 L' U2 L", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Na", category: "PLL", name: "N-perm (a)", groupTags: ["PLL-ADJ"], difficultyTier: 4, notes: "Adjacent corner swap, heavy", algorithms: [{ notation: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Nb", category: "PLL", name: "N-perm (b)", groupTags: ["PLL-ADJ"], difficultyTier: 4, notes: "Adjacent corner swap, heavy mirror", algorithms: [{ notation: "L' U' L U R' U2 R U R' z R2 U R' D R U' R' U' R U z'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Ja", category: "PLL", name: "J-perm (a)", groupTags: ["PLL-ADJ"], difficultyTier: 3, notes: "Adjacent corner + adjacent edge, short", algorithms: [{ notation: "y2 R' U2 R U R' z R2 U R' D R U' z'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Jb", category: "PLL", name: "J-perm (b)", groupTags: ["PLL-ADJ"], difficultyTier: 3, notes: "Adjacent corner + adjacent edge, short mirror", algorithms: [{ notation: "R U R' F' R U R' U' R' F R2 U' R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Ra", category: "PLL", name: "R-perm (a)", groupTags: ["PLL-ADJ"], difficultyTier: 3, notes: "Adjacent corner swap + edge 3-cycle", algorithms: [{ notation: "y R U R' F' R U2 R' U2 R' F R U R U2 R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Rb", category: "PLL", name: "R-perm (b)", groupTags: ["PLL-ADJ"], difficultyTier: 3, notes: "Adjacent corner swap + edge 3-cycle (mirror)", algorithms: [{ notation: "R' U2 R U2 R' F R U R' U' R' F' R2", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Ga", category: "PLL", name: "G-perm (a)", groupTags: ["PLL-G"], difficultyTier: 4, notes: "Adjacent corner + edge, clockwise", algorithms: [{ notation: "R2 u R' U R' U' R u' R2 F' U F", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Gb", category: "PLL", name: "G-perm (b)", groupTags: ["PLL-G"], difficultyTier: 4, notes: "Adjacent corner + edge, counterclockwise", algorithms: [{ notation: "y F' U' F R2 u R' U R U' R u' R2", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Gc", category: "PLL", name: "G-perm (c)", groupTags: ["PLL-G"], difficultyTier: 4, notes: "Adjacent corner + edge, clockwise variant", algorithms: [{ notation: "R2 u' R U' R U R' u R2 B U' B'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },
		{ caseId: "PLL-Gd", category: "PLL", name: "G-perm (d)", groupTags: ["PLL-G"], difficultyTier: 4, notes: "Adjacent corner + edge, counterclockwise variant", algorithms: [{ notation: "R U R' y' R2 u' R U' R' U R' u R2", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-pll"] }] },

		{ caseId: "OLL-01", category: "OLL", name: "OLL 1", groupTags: ["OLL-DOT"], twoLookPhase: "dot-resolve", difficultyTier: 3, notes: "Dot case", algorithms: [{ notation: "R U2 R2 F R F' U2 R' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-02", category: "OLL", name: "OLL 2", groupTags: ["OLL-DOT"], twoLookPhase: "dot-resolve", difficultyTier: 3, notes: "Dot case", algorithms: [{ notation: "y l' U' l U2 L' U2 L U2 l' U l", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-03", category: "OLL", name: "OLL 3", groupTags: ["OLL-DOT"], twoLookPhase: "dot-resolve", difficultyTier: 3, notes: "Dot case", algorithms: [{ notation: "y F U R U' R' F' U F R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-04", category: "OLL", name: "OLL 4", groupTags: ["OLL-DOT"], twoLookPhase: "dot-resolve", difficultyTier: 3, notes: "Dot case", algorithms: [{ notation: "y F U R U' R' F' U' F R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-05", category: "OLL", name: "OLL 5", groupTags: ["OLL-SQUARE"], difficultyTier: 2, notes: "Square case", algorithms: [{ notation: "y2 l' U2 L U L' U l", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-06", category: "OLL", name: "OLL 6", groupTags: ["OLL-SQUARE"], difficultyTier: 2, notes: "Square case", algorithms: [{ notation: "r U2 R' U' R U' r'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-07", category: "OLL", name: "OLL 7", groupTags: ["OLL-SMALL-L"], difficultyTier: 2, notes: "Small L shape", algorithms: [{ notation: "y2 l U L' U L U2 l'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-08", category: "OLL", name: "OLL 8", groupTags: ["OLL-SMALL-L"], difficultyTier: 2, notes: "Small L shape", algorithms: [{ notation: "y2 r' U' R U' R' U2 r", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-09", category: "OLL", name: "OLL 9", groupTags: ["OLL-SMALL-L"], difficultyTier: 2, notes: "Small L shape", algorithms: [{ notation: "y R U R' U' R' F R2 U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-10", category: "OLL", name: "OLL 10", groupTags: ["OLL-SMALL-L"], difficultyTier: 2, notes: "Small L shape", algorithms: [{ notation: "y2 L' U' L U L F' L2 U' L U F", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-11", category: "OLL", name: "OLL 11", groupTags: ["OLL-FISHTAIL"], difficultyTier: 3, notes: "Fishtail small L variant", algorithms: [{ notation: "M R U R' U R U2 R' U M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-12", category: "OLL", name: "OLL 12", groupTags: ["OLL-FISHTAIL"], difficultyTier: 3, notes: "Fishtail small L variant", algorithms: [{ notation: "y M L' U' L U' L' U2 L U' M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-13", category: "OLL", name: "OLL 13", groupTags: ["OLL-P"], difficultyTier: 2, notes: "P shape", algorithms: [{ notation: "r U' r' U' r U r' y L' U L", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-14", category: "OLL", name: "OLL 14", groupTags: ["OLL-P"], difficultyTier: 2, notes: "P shape", algorithms: [{ notation: "l' U l U l' U' l F U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-15", category: "OLL", name: "OLL 15", groupTags: ["OLL-P"], difficultyTier: 2, notes: "P shape", algorithms: [{ notation: "r' U' r R' U' R U r' U r", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-16", category: "OLL", name: "OLL 16", groupTags: ["OLL-P"], difficultyTier: 2, notes: "P shape", algorithms: [{ notation: "y2 l U l' L U L' U' l U' l'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-17", category: "OLL", name: "OLL 17", groupTags: ["OLL-I"], difficultyTier: 3, notes: "I shape", algorithms: [{ notation: "R U R' U R' F R F' U2 R' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-18", category: "OLL", name: "OLL 18", groupTags: ["OLL-I"], difficultyTier: 3, notes: "I shape", algorithms: [{ notation: "F R' F' R U R U' R' U F R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-19", category: "OLL", name: "OLL 19", groupTags: ["OLL-I"], difficultyTier: 3, notes: "I shape", algorithms: [{ notation: "y2 F R' F' R U R U' R' U' F R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-20", category: "OLL", name: "OLL 20", groupTags: [], difficultyTier: 1, notes: "Full cross / degenerate taxonomy case; keep enumerated for completeness but do not drill in v1 planner flows.", algorithms: [{ notation: "M' U2 M U2 M' U M U2 M' U2 M", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-21", category: "OLL", name: "OLL 21", groupTags: ["OLL-CROSS-LINE"], twoLookPhase: "corners", difficultyTier: 1, notes: "Line / OCLL case", algorithms: [{ notation: "R U R' U R U' R' U R U2 R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-22", category: "OLL", name: "OLL 22", groupTags: ["OLL-CROSS-LINE"], twoLookPhase: "edges", difficultyTier: 1, notes: "Line / OCLL case", algorithms: [{ notation: "R U2 R2 U' R2 U' R2 U2 R", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-23", category: "OLL", name: "OLL 23", groupTags: ["OLL-CROSS-LINE"], twoLookPhase: "edges", difficultyTier: 1, notes: "Line / OCLL case", algorithms: [{ notation: "R2 D R' U2 R D' R' U2 R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-24", category: "OLL", name: "OLL 24", groupTags: ["OLL-CROSS-LINE"], twoLookPhase: "edges", difficultyTier: 1, notes: "Line / OCLL case", algorithms: [{ notation: "r U R' U' r' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-25", category: "OLL", name: "OLL 25", groupTags: ["OLL-BIG-L"], twoLookPhase: "edges", difficultyTier: 2, notes: "Large L / OCLL case", algorithms: [{ notation: "R' F R B' R' F' R B", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-26", category: "OLL", name: "OLL 26", groupTags: ["OLL-BIG-L"], twoLookPhase: "edges", difficultyTier: 2, notes: "Large L / OCLL case", algorithms: [{ notation: "y2 L' U' L U' L' U2 L", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-27", category: "OLL", name: "OLL 27", groupTags: ["OLL-BIG-L"], twoLookPhase: "edges", difficultyTier: 2, notes: "Large L / OCLL case", algorithms: [{ notation: "R U R' U R U2 R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-28", category: "OLL", name: "OLL 28", groupTags: ["OLL-C"], difficultyTier: 2, notes: "C-shaped pattern", algorithms: [{ notation: "y2 M' U M U2 M' U M", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-29", category: "OLL", name: "OLL 29", groupTags: ["OLL-C"], difficultyTier: 4, notes: "C-shaped pattern", algorithms: [{ notation: "M U R U R' U' R' F R F' M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-30", category: "OLL", name: "OLL 30", groupTags: ["OLL-C"], difficultyTier: 4, notes: "C-shaped pattern", algorithms: [{ notation: "M U' L' U' L U L F' L' F M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-31", category: "OLL", name: "OLL 31", groupTags: ["OLL-CORNER-L"], difficultyTier: 2, notes: "Corner + small L", algorithms: [{ notation: "R' U' F U R U' R' F' R", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-32", category: "OLL", name: "OLL 32", groupTags: ["OLL-CORNER-L"], difficultyTier: 2, notes: "Corner + small L", algorithms: [{ notation: "y2 L U F' U' L' U L F L'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-33", category: "OLL", name: "OLL 33", groupTags: ["OLL-CORNER-L"], difficultyTier: 2, notes: "Corner + small L", algorithms: [{ notation: "R U R' U' R' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-34", category: "OLL", name: "OLL 34", groupTags: ["OLL-CORNER-L"], difficultyTier: 2, notes: "Corner + small L", algorithms: [{ notation: "y2 R U R' U' B' R' F R F' B", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-35", category: "OLL", name: "OLL 35", groupTags: ["OLL-T"], difficultyTier: 2, notes: "T-shaped pattern", algorithms: [{ notation: "R U2 R2 F R F' R U2 R'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-36", category: "OLL", name: "OLL 36", groupTags: ["OLL-T"], difficultyTier: 3, notes: "T-shaped pattern", algorithms: [{ notation: "y2 L' U' L U' L' U L U L F' L' F", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-37", category: "OLL", name: "OLL 37", groupTags: ["OLL-T"], difficultyTier: 2, notes: "T-shaped pattern", algorithms: [{ notation: "F R U' R' U' R U R' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-38", category: "OLL", name: "OLL 38", groupTags: ["OLL-W"], difficultyTier: 3, notes: "W-shaped pattern", algorithms: [{ notation: "R U R' U R U' R' U' R' F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-39", category: "OLL", name: "OLL 39", groupTags: ["OLL-W"], difficultyTier: 3, notes: "W-shaped pattern", algorithms: [{ notation: "y L F' L' U' L U F U' L'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-40", category: "OLL", name: "OLL 40", groupTags: ["OLL-W"], difficultyTier: 3, notes: "W-shaped pattern", algorithms: [{ notation: "y R' F R U R' U' F' U R", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-41", category: "OLL", name: "OLL 41", groupTags: ["OLL-Z"], difficultyTier: 4, notes: "Z-shaped pattern", algorithms: [{ notation: "M U' F' L' U' L U F M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-42", category: "OLL", name: "OLL 42", groupTags: ["OLL-Z"], difficultyTier: 4, notes: "Z-shaped pattern", algorithms: [{ notation: "M U F R U R' U' F' M'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-43", category: "OLL", name: "OLL 43", groupTags: ["OLL-LIGHTNING"], difficultyTier: 2, notes: "Lightning bolt variant", algorithms: [{ notation: "y2 F' U' L' U L F", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-44", category: "OLL", name: "OLL 44", groupTags: ["OLL-LIGHTNING"], difficultyTier: 2, notes: "Lightning bolt variant", algorithms: [{ notation: "y2 F U R U' R' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-45", category: "OLL", name: "OLL 45", groupTags: ["OLL-LIGHTNING"], difficultyTier: 2, notes: "Lightning bolt variant", algorithms: [{ notation: "F R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-46", category: "OLL", name: "OLL 46", groupTags: ["OLL-LIGHTNING"], difficultyTier: 2, notes: "Lightning bolt variant", algorithms: [{ notation: "R' U' R' F R F' U R", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-47", category: "OLL", name: "OLL 47", groupTags: ["OLL-FISH"], difficultyTier: 2, notes: "Fish shape", algorithms: [{ notation: "F' L' U' L U L' U' L U F", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-48", category: "OLL", name: "OLL 48", groupTags: ["OLL-FISH"], difficultyTier: 2, notes: "Fish shape", algorithms: [{ notation: "F R U R' U' R U R' U' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-49", category: "OLL", name: "OLL 49", groupTags: ["OLL-KNIGHT"], difficultyTier: 3, notes: "Knight move pattern", algorithms: [{ notation: "l U' l2 U l2 U l2 U' l", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-50", category: "OLL", name: "OLL 50", groupTags: ["OLL-KNIGHT"], difficultyTier: 3, notes: "Knight move pattern", algorithms: [{ notation: "r' U r2 U' r2 U' r2 U r'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-51", category: "OLL", name: "OLL 51", groupTags: ["OLL-KNIGHT"], difficultyTier: 3, notes: "Knight move pattern", algorithms: [{ notation: "y2 F U R U' R' U R U' R' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-52", category: "OLL", name: "OLL 52", groupTags: ["OLL-KNIGHT"], difficultyTier: 3, notes: "Knight move pattern", algorithms: [{ notation: "R U R' U R d' R U' R' F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-53", category: "OLL", name: "OLL 53", groupTags: ["OLL-AWKWARD"], difficultyTier: 4, notes: "Awkward / hard-to-name", algorithms: [{ notation: "y r' U' r R' U' R U R' U' R U r' U r", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-54", category: "OLL", name: "OLL 54", groupTags: ["OLL-AWKWARD"], difficultyTier: 4, notes: "Awkward / hard-to-name", algorithms: [{ notation: "y l U l' L U L' U' L U L' U' l U' l'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-55", category: "OLL", name: "OLL 55", groupTags: ["OLL-AWKWARD"], difficultyTier: 4, notes: "Awkward / hard-to-name", algorithms: [{ notation: "R U2 R2 U' R U' R' U2 F R F'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-56", category: "OLL", name: "OLL 56", groupTags: ["OLL-AWKWARD"], difficultyTier: 4, notes: "Awkward / hard-to-name", algorithms: [{ notation: "r U r' U R U' R' U R U' R' r U' r'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },
		{ caseId: "OLL-57", category: "OLL", name: "OLL 57", groupTags: ["OLL-H"], twoLookPhase: "edges", difficultyTier: 3, notes: "All corners oriented / pure edge flip", algorithms: [{ notation: "R U R' U' M' U R U' r'", variantLabel: "standard", handedness: "neutral", sourceRefs: ["speedcubedb-pdf-oll"] }] },

		{ caseId: "CROSS-WHITE", category: "cross", name: "White cross", groupTags: [], difficultyTier: 1, notes: "Standard white-face cross practice. This entry is a scramble-generated drill descriptor, not a solve algorithm.", algorithms: [{ notation: "(scramble-generated)", variantLabel: "white-cross", handedness: "neutral", sourceRefs: ["trainer-cross-taxonomy"] }] },
		{ caseId: "CROSS-YELLOW", category: "cross", name: "Yellow cross", groupTags: [], difficultyTier: 1, notes: "Yellow-face cross practice. This entry is a scramble-generated drill descriptor, not a solve algorithm.", algorithms: [{ notation: "(scramble-generated)", variantLabel: "yellow-cross", handedness: "neutral", sourceRefs: ["trainer-cross-taxonomy"] }] },
		{ caseId: "CROSS-CN", category: "cross", name: "Color-neutral cross", groupTags: [], difficultyTier: 2, notes: "Random color cross assignment. This entry is a scramble-generated drill descriptor, not a solve algorithm.", algorithms: [{ notation: "(scramble-generated)", variantLabel: "color-neutral", handedness: "neutral", sourceRefs: ["trainer-cross-taxonomy"] }] },
		{ caseId: "CROSS-PLAN", category: "cross", name: "Cross planning", groupTags: [], difficultyTier: 1, notes: "Scramble-to-plan practice with no execution. This entry is a scramble-generated drill descriptor, not a solve algorithm.", algorithms: [{ notation: "(scramble-generated)", variantLabel: "plan-only", handedness: "neutral", sourceRefs: ["trainer-cross-taxonomy"] }] },
		{ caseId: "CROSS-EXEC", category: "cross", name: "Cross execution", groupTags: [], difficultyTier: 2, notes: "Plan plus execute drill. This entry is a scramble-generated drill descriptor, not a solve algorithm.", algorithms: [{ notation: "(scramble-generated)", variantLabel: "execution", handedness: "neutral", sourceRefs: ["trainer-cross-taxonomy"] }] }
	];

	return {
		CATALOG_VERSION: CATALOG_VERSION,
		CATALOG_BUILD_DATE: CATALOG_BUILD_DATE,
		PROVENANCE: PROVENANCE,
		CASES: CASES
	};
});
