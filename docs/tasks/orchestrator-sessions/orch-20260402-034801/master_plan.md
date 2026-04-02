# Orchestrator Session Master Plan

**Session ID:** `orch-20260402-034801`  
**Mode:** Takomi `mode-orchestrator`  
**Project:** csTimer Trainer

## Purpose

Turn `00_Notes/Idea.md` into a reviewable orchestration bundle that you can approve and then delegate to separate agents later.

## Session Outputs

- PRD
- coding guidelines
- feature blueprint
- FR issue files
- design and mockup plan
- source registry
- delegable task packets with dependencies and review gates

## Dependency Map

`Idea Review -> PRD/FRs -> Coding Rules -> Design Planning -> Architecture/Persistence/Taxonomy -> Source Packets -> Planner Logic -> UI Build Packets -> Regression Review -> Final Synthesis`

## Task Registry

| ID | Task | Depends On | Workflow | Review Gate |
| :--- | :--- | :--- | :--- | :--- |
| T00 | Repo coordination brief | none | `mode-orchestrator` | approve fork/upstream workflow |
| T01 | Vision brief and MUS split | none | `vibe-genesis` | approve project framing |
| T02 | PRD and FR issue set | T01 | `vibe-genesis` | approve scope and FR wording |
| T03 | Coding guidelines and builder prompt | T02 | `vibe-genesis` | approve implementation law |
| T04 | UI design system and mockup planning | T02 | `vibe-design` | approve UI directions before coding |
| T05 | Architecture and domain boundaries | T02 | architect under orchestrator | approve domain contracts |
| T06 | Persistence and export plan | T05 | architect under orchestrator | approve local-first data plan |
| T07 | Case taxonomy and provenance schema | T02 | architect/content task | approve catalog structure |
| T08 | Source intake packet | T07 | orchestrator packet | approve fetch list |
| T09 | Planner logic specification | T05,T07 | architect task | approve weighting/session logic |
| T10 | UI implementation packets | T04,T05,T09 | build-prep task | approve mockup-linked briefs |
| T11 | Regression review packet | T05,T06,T09 | review task | approve verification matrix |
| T12 | Final orchestration synthesis | T03-T11 | `mode-orchestrator` | approve delegation bundle |

## Repo Strategy

- `origin` = your fork
- `upstream` = original csTimer repo, to be added by a later setup task
- fork-first delivery, upstream-aware modular slicing later
