# Quality Engineer — Schneider Electric, Benalla (Plant AU30)

Technical interview question bank and model answers, tailored to an MV/LV
engineer-to-order switchgear plant and to my own background (Supply Quality
Engineer at Gepps Cross, Oct 2021 – Feb 2023; Demand Planner at AU30 since
Feb 2023; ASQ Lean Six Sigma Green Belt; CPIM Part 1).

> Standards references are indicative and current to general practice. Confirm
> exact revisions and site-specific procedures against plant documentation
> before quoting clause detail.

---

## 1. Quality fundamentals & the system

### Q01 — What does a Quality Engineer own day to day in a plant like this?

Three loops at different speeds:

- **Prevention (before build):** PFMEA, control plan, Inspection & Test Plan
  with hold and witness points, drawing/BOM verification, first-article
  inspection on new or changed configurations.
- **Detection (during build):** in-process checks, routine electrical tests,
  calibration control of test gear, first-off approval.
- **Reaction (after a defect):** NCR → containment → MRB disposition → root
  cause → corrective action → effectiveness verification → read-across.

ETO twist: every job is close to a first article, so the leverage is in
standardising what repeats — the process, the test regime, the checklists —
even when the product doesn't.

### Q02 — Control plan vs ITP vs work instruction

- **Control plan** — process level. Per step: characteristic, spec,
  measurement method, sample size/frequency, control method, reaction plan.
- **ITP** — product/order level. Sequence of inspections and tests for the job,
  with hold points (work stops until signed) and witness points (customer or
  third party may attend), and the record produced at each.
- **Work instruction** — operator level. How to do the step, with tooling,
  torque values, photos.

Control plan = what must be controlled and why. ITP = when it's verified and by
whom. Work instruction = how to do it right first time.

### Q03 — What does ISO 9001 actually require that people get wrong?

- **Risk-based thinking (6.1)** — must show risks to conformity were identified
  and acted on, not just registered.
- **Externally provided processes (8.4)** — supplier controls proportionate to
  risk, re-evaluated on performance.
- **Corrective action (10.2)** — must evaluate whether *similar nonconformities
  exist elsewhere* and check the action worked. Most CAPAs fail on those two.

A system that only lives for the surveillance audit is a cost. The version that
works changes what an operator does on Tuesday morning.

### Q04 — PFMEA, and how you prioritise

Maps each process step to failure modes, effects, causes, current controls,
rated on Severity / Occurrence / Detection (1–10).

The AIAG-VDA revision replaced blunt RPN ranking with an **Action Priority (AP)
table** (High/Medium/Low), because RPN let a severity-10 safety failure hide
behind a low product. Severity never comes down without a design or process
change — you can only attack occurrence and detection. Prevention controls beat
detection controls.

**Trap:** don't say "we action anything over RPN 100."

### Q05 — MSA / Gauge R&R

Confirms variation is in the product, not the measurement. Splits into
repeatability (same operator) and reproducibility (operator to operator).

- `%GRR < 10%` acceptable; `10–30%` conditional on criticality/cost; `>30%` not
  acceptable.
- `ndc ≥ 5` distinct categories.
- For pass/fail checks, use attribute agreement analysis (kappa).

Run before trusting SPC data, before accepting supplier data, or when two people
measure the same joint and disagree.

### Q06 — Cp vs Cpk

Cp compares spec width to process spread (capability if perfectly centred). Cpk
accounts for where the process actually sits. **Good Cp + poor Cpk = off-centre**
— usually setup, tooling offset or datum, and it's the cheap fix. Poor Cp is
expensive: you must reduce variation. `Cpk ≥ 1.33` capable; `1.67` for
safety-critical.

### Q07 — Would you use SPC in a low-volume ETO plant?

Classic X̄-R charts need volume ETO doesn't have. What transfers:

- Chart the **process parameters that repeat across jobs** even when the product
  doesn't — torque, crimp force, paint thickness, PD levels, busbar contact
  resistance.
- Use I-MR (individuals & moving range) rather than subgroups.
- For defects: attribute tracking by category, Pareto over time, first-pass
  yield per work centre.

The real ETO lever is error-proofing and verification design, not statistical
control of a one-off.

---

## 2. Problem solving & root cause

### Q08 — Walk through 8D

| Step | What actually happens |
|------|----------------------|
| D0 | Emergency response — is anyone at risk, is product still shipping? |
| D1 | Team with the right functions (production, engineering, methods, supplier) |
| D2 | Problem description — is/is-not, 5W2H, quantified |
| D3 | Containment — WIP, stock, in-transit, installed base; verify it works |
| D4 | Root cause in three branches: why it occurred, why it escaped, why the system allowed it |
| D5 | Choose permanent corrective actions; prove they'd have caught it |
| D6 | Implement and verify with data |
| D7 | Prevent recurrence — update PFMEA, control plan, work instruction; read across |
| D8 | Close out and recognise the team |

**Differentiator:** almost everyone forgets the escape branch at D4. Occurrence
root cause and detection root cause are separate, with different owners.

### Q09 — QRQC vs raising an 8D

QRQC (Quick Response Quality Control) is the **daily rhythm** that decides which
problems become 8Ds:

- Held at the place, with the real part, on real data (genba, genbutsu,
  genjitsu) — not in a meeting room with a spreadsheet.
- Tiered escalation: line → workshop/plant → business unit, each with fixed
  timing and an escalation threshold.
- Bias to containment within hours, root cause on a clock.

QRQC is the cadence and escalation; 8D is the method applied to what qualifies.

### Q10 — Scenario: switchboard fails routine dielectric test the day before dispatch

1. **Safety first** — isolate, discharge, earth, lockout before anyone opens a
   panel. Say this out loud.
2. **Don't retest to make it pass.** Raise the NCR, quarantine the unit and its
   test record.
3. **Confirm the measurement** before chasing the product — test set in
   calibration, correct voltage and duration, connections and earthing, ambient
   humidity, auxiliaries disconnected/bypassed per procedure.
4. **Localise** — section the circuit: phase, compartment, CT/VT, cable gland,
   surface contamination.
5. **Fix and re-verify**, repeating the full routine sequence, not just the
   failed test.
6. **Disposition and communicate** — MRB decision; tell planning/PM early so the
   customer date is managed honestly.
7. **Root cause and read-across** — check other boards from that batch and build
   cell.

**Deal-breaker:** never suggest shipping on a verbal OK or "it passed second go."

### Q11 — Is Five Whys too simplistic?

It's a drilling tool, not a discovery tool — use it after Ishikawa or is/is-not
has narrowed the branch. Failure modes: single-thread (run parallel chains);
drifting to "operator error" and stopping (that's a symptom — keep going to a
controllable system factor); unverified links (each why must be a fact you can
show). Test a chain by reversing it with "therefore."

### Q12 — How do you know a corrective action worked?

- Define the **effectiveness criterion when raising the action**, not at
  closure: which metric, what target, over what window.
- Prefer evidence of changed behaviour (audit the process, look at records) over
  absence of complaints.
- Rank actions by strength: elimination/design change > error-proofing >
  automated detection > procedure and training > "remind the team." If the
  permanent action is training, it usually isn't permanent.
- Set a review date and re-check after attention fades; keep the NCR open.

### Q13 — 40 open defects, one of you. Prioritise.

- **Risk first, always** — safety, regulatory, or anything already at a customer
  site jumps the queue regardless of frequency.
- **Then cost and frequency** — Pareto weighted by CoPQ, not defect count.
- **Batch the tail** — group the long tail into themes and fix the common cause
  once rather than closing 30 tickets individually.

### Q14 — A utility customer rejects a delivered unit. First 24 hours.

- Acknowledge fast, own the communication line — one named contact, a committed
  update time.
- Get facts and evidence: photos, serial number, test certificate, as-built
  records, site conditions. Ask for the part or to attend site.
- Contain both ends — what else shipped with the same configuration or batch;
  hold anything about to leave.
- Interim containment so the customer isn't stuck while root cause runs.
- Open the 8D; deliver D3 containment inside the promised window even if D4 is
  days away.

A utility judges you on how predictable you are *after* the failure.

---

## 3. Product knowledge & standards

### Q15 — Type test vs routine test

- **Type tests (design verification)** validate the design once on a
  representative sample, usually destructive/extreme: short-time withstand
  current, temperature rise, internal arc classification, IP rating, mechanical
  endurance, impulse withstand. Not repeated per unit.
- **Routine tests** run on every unit before dispatch to prove workmanship and
  materials match the verified design: power-frequency withstand voltage on the
  main circuit, voltage test on auxiliary/control circuits, main-circuit
  resistance measurement, mechanical operation test, design and visual checks.
  Partial discharge measurement where the product standard or customer requires.

One-liner: **type test proves the design is safe; routine test proves this unit
was built to it.**

### Q16 — Which standards apply here

| Standard | Covers |
|----------|--------|
| IEC 62271-1 | Common clauses for HV (>1 kV) switchgear — including the routine test list |
| IEC 62271-200 | AC metal-enclosed switchgear above 1 kV to 52 kV; LSC categories, partition class, internal arc classification (IAC) |
| IEC / AS NZS 61439-1 & -2 | LV switchgear and controlgear assemblies (replaced the AS/NZS 3439 series) |
| IEC 60529 / IEC 62262 | IP (ingress) and IK (impact) ratings |
| ISO 9001 / 14001 / 45001 | Quality, environmental, OH&S management systems |
| RCM + AS/NZS framework | Australian regulatory compliance marking and electrical equipment safety |

Add: Australian network utilities publish their own technical specifications
above the IEC baseline — extra tests, specific materials, documentation and
labelling, witnessed FAT. Name the AU30 customers: Ausgrid, SA Power Networks,
TasNetworks, Ergon, Essential Energy.

### Q17 — What people misunderstand about IEC 61439 design verification

61439 replaced "type-tested / partially type-tested" with **design verification
by three routes**: testing, comparison with a tested reference design
(calculation), or assessment of design rules. That's what lets an ETO plant
build a one-off and still demonstrate conformity — you build *within a verified
system*.

Quality consequence: it only holds if the build stays inside the original
manufacturer's verified envelope (approved components, spacings, busbar
arrangements, temperature-rise assumptions). **Configuration control and
substitution control are the compliance control.** An unapproved component swap
can invalidate the verification.

### Q18 — Partial discharge

A localised breakdown that only partially bridges the insulation — in a void, at
a contamination point, or at a sharp edge where field concentrates. It doesn't
fail the unit today but erodes insulation progressively, so it predicts
in-service failure. Measured in picocoulombs against a limit at a specified test
voltage. It catches what a pass/fail dielectric test misses: unfilled voids in
resin-cast parts, burrs, moisture, handling contamination. Practically: PD
problems are usually workmanship, not design.

### Q19 — Calibration control

- Register of all equipment affecting conformity: unique ID, interval, due date,
  status label.
- Calibration traceable to national standards via an accredited lab;
  certificates retained; uncertainty reviewed against the tolerance measured.
- Interval set by risk and stability, shortened if drift appears.
- Includes torque wrenches, micro-ohmmeters, insulation testers and gauges — not
  just the HV test set.

**The follow-up — "a gauge is found out of calibration, now what?"** Quarantine
the gauge, then **assess the validity of every measurement taken since the last
known-good calibration**, including shipped product, and act on affected
product. That backward assessment is the part people forget.

### Q20 — Customer-witnessed FAT, and your role

FAT is the customer verifying, before dispatch, that the assembly meets contract
spec against an agreed ITP with witness and hold points: visual and dimensional
check against approved drawings, wiring and functional checks, protection and
interlock operation, routine electrical tests, labelling and nameplate,
documentation pack.

Your role is that **nothing is a surprise on the day** — full internal pre-FAT to
the same protocol, punch list closed beforehand, calibration certificates and
test records ready, known deviations declared with an approved concession. On
the day you own the record; anything raised goes onto the punch list with an
owner and a date before the room empties.

### Q21 — Concession/deviation, and when you refuse

A concession accepts non-conforming product as-is; a deviation permits departure
from spec before manufacture. Both need documented technical justification, the
right approval authority (engineering, and the customer where it's their spec),
defined scope and quantity, and traceability on the unit and in the records.

Refuse anything touching safety, dielectric integrity, protective earthing,
interlocking or regulatory conformity. Also refuse the **rolling concession** —
the same deviation approved repeatedly is a design or process problem being
laundered as paperwork.

> "I'll always look for a route that keeps the customer's date. I won't sign one
> that moves risk to a substation crew."

---

## 4. Supplier & incoming quality

### Q22 — Tell me how you handled a nonconforming supplier part (STAR)

- **Situation/Task:** at Gepps Cross, reviewed nonconforming incoming material
  and owned RCA and corrective action with suppliers.
- **Action:** quarantine and segregate on receipt; quantify the defect (how
  many, which lots, since when); MRB disposition; protect production with sort or
  interim inspection; raise a supplier corrective action request with a required
  response time; verify the supplier's root cause rather than accepting the first
  submission.
- **Result:** improved inbound process reliability and streamlined inbound checks
  in line with Lean Six Sigma.

Bring one honest number if it can be reconstructed (defect rate before/after,
PPM, inbound checks removed once the supplier stabilised). Never invent one.

### Q23 — Deciding the level of incoming inspection

Drive it from **risk × supplier capability**, and let the level move:

- **Risk** — safety/dielectric/functional/cosmetic consequence. Safety-critical
  characteristics get 100% verification or a per-unit supplier test record, not
  sampling.
- **Capability** — demonstrated PPM, process controls, audit result, history.
  Strong performers move to skip-lot or ship-to-stock; poor performers to
  tightened or sorted-at-source.
- **Sampling** uses an AQL plan (ISO 2859-1 style) with switching rules between
  normal / tightened / reduced. The switching is the point, and it's what people
  skip.

Caveat worth saying: sampling verifies a stable process, it doesn't create
quality. Where risk is high, buy the control at the supplier, not at your dock.

### Q24 — A supplier's 8D comes back weak

Reject with specifics:

- Root cause is "operator error" → which control should have prevented it, and
  why didn't it?
- No escape analysis → why did outgoing inspection pass the part?
- Corrective action is training or added inspection → ask for prevention; treat
  added inspection as containment only.
- No read-across → which other parts and lines share the process?
- No effectiveness evidence → require data over a defined window before closure.

Escalate through supplier quality/procurement if it stalls, keep containment in
place until closed, consider an on-site process audit for repeat offenders.

### Q25 — Measuring supplier quality performance

- Defect **PPM** by supplier and part family, trended.
- Lot acceptance rate / incoming rejection rate.
- Response performance: containment within the window, 8D on-time closure,
  recurrence rate.
- **CoPQ attributable to the supplier** — sort labour, rework, line stoppage,
  delivery impact. The number that gets procurement's attention.

Score the trend and recurrence, not raw count. A supplier with more defects but
a falling curve and clean read-across beats one with fewer that keep repeating.

### Q26 — Qualifying a new part or supplier

1. Agree specification and acceptance criteria first — drawings, standards,
   critical characteristics, required test evidence.
2. Capability assessment: process audit, quality system, sub-tier control.
3. First article inspection — full dimensional and functional report, material
   and test certificates.
4. Initial production run under tightened inspection, with capability data on
   critical characteristics.
5. Control plan agreed and locked, with a change-notification obligation.

The sleeper: most "sudden" supplier failures are an unannounced change.

---

## 5. Shop floor & ETO manufacturing

### Q27 — What makes quality harder in ETO than series production?

- **No learning curve per product** — every job carries first-article risk.
- **The spec moves** — late engineering changes, customer variations, drawing
  revisions. Configuration control is the top defect source.
- **Statistical tools are weak at n=1** — prevention must come from standard
  process and error-proofing.
- **Schedule pressure lands at final test**, when quality decisions are most
  expensive and most tempting to compromise.

Conclusion: in ETO you attack quality upstream — at drawing release, BOM accuracy
and kitting — because a defect found at final test has already consumed the whole
build cost. (Direct link to my Planning BOM and SIOP work.)

### Q28 — Poka-yoke examples here

Hierarchy first: prevention beats detection. Make the wrong action impossible;
if not, make it immediately obvious; only then inspect.

- Asymmetric mounting / keyed connectors so a part can't fit the wrong way.
- Kitting to the job with shadow boards — missing or leftover parts visible
  before the panel closes.
- Torque tools that latch and mark, so an untorqued bolt is visible not
  remembered.
- Barcode-scanned component verification against the BOM at build.
- Test sequences that won't print a certificate until every step passes.

### Q29 — An operator says the work instruction is wrong

Go and watch it done, both ways, with the actual part. Then:

- If the operator's method is better and safe — capture it, validate it, update
  the instruction, give them the credit.
- If the instruction is right — find out *why* the drift happened. Usually the
  standard is slower, harder or unclear.
- Either way, the undocumented gap between written standard and actual practice
  is the finding, and it's never on only one job.

**Trap:** "I'd remind them to follow the procedure" marks you as someone who
won't be told the truth again.

### Q30 — Rework vs repair vs use-as-is

- **Rework** — restores full conformity. Re-inspect and re-test after.
- **Repair** — acceptable for use but not fully conforming. Needs a concession
  and documented approval; the record follows the unit.
- **Use-as-is** — accepted with the nonconformity, by concession with technical
  justification and the right authority (the customer's, where it's their spec).
- **Scrap / return to supplier** — with controls so scrap can't re-enter flow.

All are MRB decisions with traceability, and reworked product must be re-verified
against the original acceptance criteria.

### Q31 — Engineering change mid-build

- **Effectivity first** — which serial numbers, from when, and what happens to
  units in build, in stock and shipped.
- **Impact assessment** across drawing, BOM, routing, work instruction, ITP, test
  parameters, and whether design verification or type-test validity is affected.
- **Controlled release** — new revision issued, old revision withdrawn from the
  floor.
- **First article on the changed configuration**; check the change didn't create
  a new failure mode; update the PFMEA.
- **Traceability** — the as-built record shows which revision that unit was built
  to.

Killer detail: superseded documents left on the floor. Name that as the thing
you'd physically go and check.

### Q32 — Running an internal process audit

- **Plan against risk** — audit where defects, changes and complaints point.
- **Prepare** the checklist from the actual control plan, procedure and previous
  findings.
- **Audit the trail both ways** — pick a unit and trace forward to its records,
  then pick a record and trace back to the unit. Gaps show in the second
  direction.
- **Evidence, not opinion** — every finding cites requirement and objective
  evidence.
- **Close the loop** — findings get root cause, corrective action, an
  effectiveness check and a follow-up audit.

Audit the process for whether it sets people up to succeed. The process gets the
finding, not the auditee.

---

## 6. Data, metrics & the internal-move questions

### Q33 — Metrics for the plant leadership team

- **CoPQ as % of sales**, split internal (scrap, rework, retest, delay) vs
  external (warranty, site rectification, claims).
- **First-pass yield** at final/routine test.
- **Customer complaint / escape rate**, normalised.
- **Defect Pareto by category and work centre**, trended, so you can see whether
  last quarter's fix held.
- **8D on-time closure and recurrence rate** — health of the problem-solving
  system itself.

Framing: report the trend and the decision you need, not the number. I already
build the AU30 monthly leadership pack against an 8-KPI framework, so quality
metrics plug into an existing rhythm rather than creating a competing report.

### Q34 — Cost of Poor Quality, and how to calculate it

Four buckets: prevention, appraisal, internal failure, external failure. CoPQ is
the failure halves plus the appraisal you only do because prevention is weak.

In practice: rework hours × loaded labour rate, scrap at material cost, retest
time, expedited freight, delay cost or liquidated damages, site rectification —
pulled from NCR records and the production system, with estimates flagged as
estimates.

The insight: the visible cost is the small part. The bigger loss is capacity
consumed by rework in a supply-constrained plant — a rework hour in a bottleneck
cell is a lost delivery. In a market where lead time wins orders, that's the
number leadership should see.

### Q35 — Using data and automation to improve quality

- Get NCR data into a **structured, codified form** — defect category, work
  centre, product family, detection point, cost. Free-text NCRs can't be
  analysed, and most plants have exactly that problem.
- Build the **quality view in Power BI** alongside existing operational
  dashboards, so quality isn't a separate monthly deck.
- **Automate assembly of the recurring pack** so time goes into RCA on the floor
  rather than collating spreadsheets — already done for SIOP reporting.
- Watch **leading indicators**: BOM/drawing revision churn, kit shortages, late
  engineering releases, supplier lateness. They predict defects days before final
  test does.

### Q36 — You're a Demand Planner. Why move into quality?

Three legs, framed as a return rather than an escape:

- **It's a return.** Supply Quality Engineer at Gepps Cross for over a year —
  RCA, supplier corrective action, Lean Six Sigma. Going back with more context.
- **Planning taught me where quality actually breaks.** Running SIOP and control
  tower diagnostics means years of looking at why orders slip — much of it
  rework, late engineering changes and supplier defects. I've been measuring the
  downstream cost and want to fix the cause.
- **The blend is rare.** Few people know AU30's order flow, SAP, the ETO
  configuration problem and the utility customers *and* have supplier quality
  experience. That shortens ramp-up to weeks.

**Do not say** anything that sounds like planning is frustrating. Every reason
pulls toward quality, not away from the current role.

### Q37 — It's been two years since you did quality. What's rusty?

- **Faded:** hands-on with the MV/LV routine test regime and current standards
  revisions; day-to-day Minitab; the detail of this site's NCR and MRB workflow.
- **Sharp:** structured RCA, data analysis, cross-functional escalation, running
  a governance rhythm with senior stakeholders — that last one is most of a QE's
  influence.
- **How I close it:** shadow routine test and FAT, read twelve months of NCRs and
  complaints to build my own Pareto, sit in QRQC daily, walk the top three
  suppliers by defect cost, refresh IEC 62271-200 and AS/NZS 61439 in week one.

> "The tools I'd need a fortnight on. The plant, the products, the customers and
> the people I already know — and that's usually the part that takes six months."

### Q38 — Production says ship it, you say hold

- **Separate the categories.** Safety, dielectric integrity or regulatory
  conformity isn't a negotiation — say so calmly, once.
- **If it isn't that**, get facts fast: what exactly is non-conforming, the
  technical risk, what a concession would require, the real delivery impact.
  Quality makes risk visible; it isn't the department of no.
- **Offer options with consequences attached** — hold and rework at X days, ship
  under concession with customer approval, partial ship. Give the decision to the
  right authority with the evidence.
- **Document the decision** either way, and escalate through the quality line
  rather than arguing on the floor.

Build the relationship before the argument. If the first time production hears
from you is when you stop a shipment, you've already lost.

### Q39 — Getting people to act without authority over them

From SIOP: a cycle across six functions where I own no one. The mechanism —

- A single agreed set of numbers nobody argues about, so meetings are about
  decisions rather than data.
- Findings packaged as **decision asks** with a named owner — exactly what the
  control tower diagnostics did with date misalignment and dead-dated orders for
  PM, Tendering and Planning.
- A rhythm with fixed cadence and visible follow-up, so actions don't quietly
  die.
- Credibility from being on the floor and being right about what you claim.

### Q40 — Your first 90 days

- **Days 1–30 — see the truth.** Walk every process step. Sit in QRQC daily. Read
  twelve months of NCRs and complaints; build a Pareto by cost, not count. Shadow
  routine test and a FAT end to end. Meet the top defect-cost suppliers.
- **Days 31–60 — fix one visible thing.** Drive the top CoPQ theme through a full
  8D to closure, publicly. In parallel, clean the defect coding so the data
  becomes analysable.
- **Days 61–90 — make it stick.** Update the control plans and ITPs the RCA
  exposed, stand the quality view up in the existing leadership rhythm, propose
  the next three targets with expected CoPQ reduction.

Close honestly: "That plan survives contact with the first month's data — the
sequence is fixed, the targets aren't."

---

## 7. Closing kit

### Four stories to rehearse

1. **A defect I root-caused** — supplier nonconformance at Gepps Cross, full RCA
   through to corrective action.
2. **An analysis that changed a decision** — the Planning BOM built from a decade
   of history, improving lead time and supplier forecast accuracy across the 40%
   of the business that is ETO.
3. **A hard cross-functional call** — control tower diagnostics packaged as
   decision asks for PM, Tendering and Planning.
4. **A failure and what I changed** — a real one. Refusing to name one costs more
   than the story does.

### Questions to ask them

- What's the biggest CoPQ driver on site right now — internal rework or customer
  escapes?
- Where do most defects get detected: in-process, at routine test, or at FAT?
- How does QRQC run here, and where does it escalate?
- How much of the defect load traces to late engineering changes versus build
  execution?
- What does success in this role look like at twelve months?

### Night-before refresh

- Type test vs routine test — the one-liner (Q15)
- The routine test list for MV switchgear (Q15)
- 8D with the escape branch at D4 (Q08)
- Cp vs Cpk, %GRR thresholds, Cpk ≥ 1.33 (Q05, Q06)
- The "why quality" answer, said out loud twice (Q36)
