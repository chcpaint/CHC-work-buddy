#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const documents = [
  // ============ VEHICLE DISASSEMBLY ============
  {
    title: 'Vehicle Disassembly Safety Checklist',
    doc_type: 'checklist',
    tab_slug: 'vehicle-disassembly',
    tags: ['safety', 'ppe', 'checklist', 'procedures'],
    content_text: `VEHICLE DISASSEMBLY SAFETY CHECKLIST

Before beginning any vehicle disassembly work, complete this safety checklist to ensure a safe work environment and protect yourself and your team.

PERSONAL PROTECTIVE EQUIPMENT (PPE)
☐ Safety glasses or face shield fitted properly
☐ Hearing protection (earplugs or earmuffs) - required when using power tools
☐ Nitrile or leather work gloves appropriate for the task
☐ Steel-toed safety boots with slip-resistant soles
☐ Long sleeves and pants (no loose clothing)
☐ Respirator or dust mask when sanding or generating dust
☐ Chemical-resistant gloves when handling solvents or fluids

VEHICLE PREPARATION
☐ Disable airbag system (refer to vehicle service manual for disconnect procedure)
☐ Disconnect negative battery terminal using proper jumper cable removal technique
☐ Wait minimum 15 minutes after battery disconnect before working on electrical systems
☐ Engage parking brake and block wheels with wheel chocks
☐ Lower hood and all doors to neutral position before opening

FLUID AND HAZARDOUS MATERIAL MANAGEMENT
☐ Place drip pans under vehicle before disconnecting any fluid lines
☐ Drain and properly store coolant, oil, and refrigerant
☐ Dispose of all fluids according to local environmental regulations
☐ Label all drained fluids with contents and date
☐ Store flammable materials in approved cabinets away from ignition sources

TOOL SAFETY
☐ Inspect all power tools for damage before use
☐ Ensure extension cords are grounded and rated for outdoor use
☐ Keep power tools dry and away from moisture
☐ Use proper lifting techniques - ask for assistance with heavy components
☐ Store sharp tools in designated holders, never loose on work surface
☐ Disconnect power tools before changing bits or blades

WORK AREA
☐ Ensure adequate lighting in work area
☐ Clear floor of tripping hazards and debris
☐ Position equipment and parts to avoid blocking exit routes
☐ Have first aid kit accessible and emergency contact numbers visible
☐ Establish communication system if multiple people working on vehicle`,
    language: 'en'
  },
  {
    title: 'Front End Disassembly Procedure',
    doc_type: 'procedure',
    tab_slug: 'vehicle-disassembly',
    tags: ['front-end', 'bumper', 'disassembly', 'procedures'],
    content_text: `FRONT END DISASSEMBLY PROCEDURE

This procedure covers the systematic removal of front end components including bumper cover, headlights, fenders, hood, grille, and radiator support access points.

STEP 1: BUMPER COVER REMOVAL
1. Open hood and locate bumper cover fasteners (typically 2-4 clips along top edge beneath hood)
2. Remove fasteners using appropriate screwdriver or trim tool
3. Locate side markers and proceed to step 2 for headlight removal
4. From underneath, locate and unclip or unbolt bumper reinforcement brackets (usually 2 per side)
5. Carefully pull bumper cover away from vehicle, working from top to bottom
6. Disconnect fog light wiring harnesses if equipped (note connector orientation with photo)
7. Place bumper cover on padded surface to prevent damage

STEP 2: HEADLIGHT ASSEMBLY REMOVAL
1. Open hood and access headlight mounting from engine bay
2. Locate headlight assembly fasteners (typically 2-3 bolts per side)
3. Remove fasteners and gently pull headlight assembly forward
4. Disconnect headlight wiring connector from back of assembly
5. Note connector type and take photo of orientation before disconnection
6. Disconnect side marker light if part of assembly or separate connector
7. Place headlights on padded surface, cap connectors to prevent moisture

STEP 3: FENDER REMOVAL
1. For fenders without damage, note gap measurements at door and rocker with measuring tape
2. Open door and locate fender bolts along door aperture (typically 3-4 bolts)
3. Remove bolts securing fender to door jamb area
4. Locate fender bolts at rear wheel opening (typically 2 bolts)
5. Locate fender bolts at top along hood line (typically 3-4 bolts)
6. Disconnect any wiring for side markers or clearance lights
7. With assistant, carefully lift and separate fender from vehicle
8. Transport to storage with protective covering

STEP 4: HOOD REMOVAL
1. Open hood fully and locate hood hinge fasteners on both sides (2 bolts per side typically)
2. Disconnect hood washer fluid hoses if equipped
3. Disconnect hood latch release cable from latch mechanism
4. With assistant supporting hood weight, remove hinge bolts
5. Carefully lift hood away from hinges
6. Inspect hinges for damage and document with photos

STEP 5: GRILLE REMOVAL
1. Remove fasteners holding grille to radiator support (typically 4-6 clips)
2. Carefully pull grille forward, watching for hidden clips
3. If equipped with sensor behind grille, note location and protect with tape
4. Place grille on padded surface

STEP 6: RADIATOR SUPPORT ACCESS
1. With front components removed, inspect radiator support structure for collision damage
2. Check for bent or crushed areas using measuring gauge against known points
3. Locate radiator bolts if radiator removal needed
4. Note location of cooling fan electrical connector
5. Document all damage with photos and measurements`,
    language: 'en'
  },
  {
    title: 'Door and Side Panel Removal Guide',
    doc_type: 'procedure',
    tab_slug: 'vehicle-disassembly',
    tags: ['doors', 'panels', 'disassembly', 'trim'],
    content_text: `DOOR AND SIDE PANEL REMOVAL GUIDE

This guide covers the complete removal of doors, side panels, window regulators, mirrors, and rocker panel access for body shop work.

DOOR TRIM PANEL REMOVAL
1. Locate power window switch panel (driver side door) or manual crank and disconnect or remove
2. Find and remove door handle inner trim piece (usually snaps out or has hidden fasteners)
3. Locate door lock button assembly and disconnect wiring (power windows/locks)
4. Remove armrest by locating fasteners underneath or behind trim pieces
5. Starting at top of door, use plastic trim tool to carefully release clips holding trim panel
6. Work downward around entire door perimeter, unclipping trim panel
7. Disconnect any wiring connectors (power windows, locks, speakers)
8. Lift trim panel away from door and set aside

WINDOW REGULATOR REMOVAL
1. After trim removal, locate window regulator fastening bolts (typically 3-4 bolts)
2. Remove fasteners holding regulator to door frame
3. Lower window completely to access regulator cables or mechanisms
4. Disconnect window regulator motor connector (if power windows)
5. Carefully lower and remove window regulator assembly
6. If window glass requires removal, support glass with tape block before regulator removal

DOOR SKIN REMOVAL (If replacement needed)
1. Inspect door frame for structural damage - if damaged, do not remove skin without measurement
2. Mark door position relative to hinges with tape and marker for reassembly reference
3. Remove hinge bolts connecting door to vehicle body (typically 2 bolts upper hinge, 2 bolts lower hinge)
4. Carefully lift door away and place on padded work surface
5. If removing door skin from frame, locate spot welds and drill them out carefully
6. Do not damage door frame during skin removal

ROCKER PANEL AND SIDE PANEL ACCESS
1. Remove lower door trim pieces to access rocker panel area
2. Locate any trim strips covering rocker panel fasteners
3. If rocker panel damaged, measure with body measuring system from known reference points
4. Note location of any floor pans or frame members attached to rocker
5. Document damage with photos and measurements before proceeding with repair

MIRROR REMOVAL
1. Open door and locate mirror mounting fasteners (typically 3-4 bolts)
2. Disconnect mirror glass actuator wiring connector (power mirrors)
3. Disconnect heating element connector (if heated mirrors)
4. Remove fastening bolts and carefully separate mirror assembly
5. If removing mirror glass separately, remove adjustment nuts on back of mirror
6. Cap all wiring connectors to prevent moisture intrusion
7. Place mirror on padded surface to prevent breakage`,
    language: 'en'
  },
  {
    title: 'Parts Labeling and Storage Best Practices',
    doc_type: 'procedure',
    tab_slug: 'vehicle-disassembly',
    tags: ['organization', 'storage', 'documentation', 'procedures'],
    content_text: `PARTS LABELING AND STORAGE BEST PRACTICES

Proper organization of removed parts and hardware is critical for efficient reassembly and preventing damage or loss of components.

HARDWARE BAGGING SYSTEM
1. For each major component removed, use clear plastic bags or labeled containers
2. Label bags with permanent marker including: component name, vehicle repair order number, date removed
3. Example labels: "Hood Bolts - RO#12345", "Door Hinge Hardware - RO#12345"
4. Group fasteners by location: hood, doors, fenders, trim pieces
5. Keep different bolt sizes separated - use smaller bags within larger bags if needed
6. Store all bags in a designated parts cabinet or shelf, organized by vehicle
7. Count fasteners before bagging and again before reinstallation to verify nothing is lost
8. For small fasteners, use labeled compartment boxes with multiple sections

PHOTO DOCUMENTATION PROTOCOL
1. Before removing any major component, take overview photo showing component's position
2. Take close-up photos of fastener locations and bolt patterns before removal
3. For complex assemblies (door latches, window regulators), take 2-3 photos from different angles
4. Photograph any shims or spacing washers in their original position
5. Create a dated folder in shop computer system with sequential naming: RO12345_vehicle_disassembly_001, 002, etc.
6. For electrical connectors, photograph the connector and wiring location before disconnection
7. Use a printed work order number visible in each photo for reference
8. Back up all photos to cloud storage daily to prevent loss

COMPONENT LABELING SYSTEMS
1. Use color-coded tags on each removed component matching repair order number
2. Attach tags using strong tape or wire, avoiding damage to painted or finished surfaces
3. For doors, fenders, and large panels, label on interior/non-visible surface with permanent marker
4. Create a master parts list in spreadsheet: Component Name, Location, Condition Notes, Return to Stock (Y/N)
5. For parts being sent out (core exchange, rechroming), note receiving date and expected return date
6. Use a hanging board or whiteboard in the work area showing current disassembled vehicles and parts status
7. For glass or fragile components, clearly mark "FRAGILE" with warning tape

STORAGE RACK ORGANIZATION
1. Designate specific storage racks or shelving for each disassembled vehicle
2. Organize shelves by component type: upper shelf = large panels (doors, fenders), lower shelf = smaller parts
3. Use cardboard separators between different vehicles to prevent confusion
4. Store all parts for one vehicle together to minimize retrieval time during reassembly
5. Keep parts off floor to prevent trip hazards and water damage
6. For doors and panels stored vertically, use angled racks or door stands to prevent warping
7. Inspect parts storage daily for signs of damage, rust, or pest intrusion
8. Maintain clear pathways to all stored parts to meet safety regulations
9. Rotate storage so oldest jobs move through workflow first (FIFO principle)`,
    language: 'en'
  },
  {
    title: 'Electrical Disconnect and Harness Handling',
    doc_type: 'procedure',
    tab_slug: 'vehicle-disassembly',
    tags: ['electrical', 'connectors', 'wiring', 'procedures'],
    content_text: `ELECTRICAL DISCONNECT AND HARNESS HANDLING

Proper electrical connector handling ensures vehicle systems function correctly after reassembly and prevents damage to sensors and components.

CONNECTOR TYPES AND SAFE DISCONNECT METHODS
1. Weatherpack connectors (common on GM vehicles): Locate small tab on side of connector, gently press and pull straight out
2. Delphi/Packard connectors (common on Ford): Locate locking bar on top, slide bar backwards and pull connector apart
3. AMP connectors (common on Chrysler): Gently squeeze connector together and pull apart smoothly
4. Multi-pin connectors: Never force - if stuck, check for corrosion and apply penetrating oil, then wait 15 minutes
5. Connector pins: Examine pins for corrosion or damage before reconnection - replace if burned or corroded
6. If connector clips break during removal, note this for repair before reassembly

LABELING WIRES AND HARNESSES
1. Before disconnecting any harness, take photograph showing connector orientation and location
2. Use waterproof electrical tape to label wire bundles: mark with permanent marker including circuit name
3. For multi-pin connectors, create sketch showing pin layout with wire colors and circuit functions
4. Example label: "Engine Bay Harness - Drivers Side" with tape wrapped around main bundle
5. For wire pairs that must stay together, tape them together before removal to prevent tangling
6. Use different colored tape for different harnesses to quickly identify during reassembly
7. Keep all photos and sketches in repair order documentation

PROTECTING SENSORS AND CONNECTORS
1. After connector disconnection, immediately cap connector with protective caps or electrical tape
2. For oxygen sensors, mass airflow sensors, and other critical sensors, cover connectors with plastic bags secured with rubber bands
3. Do not allow connectors to hang loose where they can contact water, dirt, or other contaminants
4. For connector pairs that mate together, cover male pins with electrical tape to prevent corrosion
5. Store disconnected harnesses in a bundle, secured with velcro straps to prevent kinking
6. Protect sensitive wiring from sharp edges - use split loom or electrical tape to cover any rough edges

HARNESS ROUTING AND STORAGE
1. After disconnecting harness, note its routing path through vehicle using photos before removal
2. If harness is removed completely, coil it loosely and secure with velcro straps (never tight plastic ties that can crack insulation)
3. Store harnesses in clean, dry area away from solvents and chemicals
4. Keep harnesses away from heat sources - do not store near spray booth or drying lights
5. When reassembling, route harnesses along same path as original using photos as reference
6. Verify harness clips are intact and replace any damaged clips before routing

BATTERY DISCONNECT PROCEDURE
1. Disconnect negative battery terminal first using appropriate wrench size
2. Remove terminal clamp completely and store with cable for safekeeping
3. Keep positive terminal covered with electrical tape or plastic cap to prevent accidental contact
4. Wait minimum 15 minutes before working on vehicle electrical systems
5. After repair and before reconnection, inspect battery and terminals for corrosion
6. Clean battery terminals with baking soda solution if corrosion present
7. Reconnect negative terminal last after all other electrical work complete
8. Ensure terminal clamps are tight - test by attempting to wiggle clamp`,
    language: 'en'
  },

  // ============ AUTO BODY REPAIRS ============
  {
    title: 'Dent Repair and Metal Finishing Procedures',
    doc_type: 'procedure',
    tab_slug: 'auto-body-repairs',
    tags: ['dent-repair', 'metal-work', 'procedures', 'finishing'],
    content_text: `DENT REPAIR AND METAL FINISHING PROCEDURES

This procedure covers hammer and dolly techniques, stud pulling, shrinking metal, and finishing techniques to bring damaged metal to proper contour.

HAMMER AND DOLLY BASIC TECHNIQUE
1. Inspect dent from multiple angles and identify the deepest point
2. Select appropriate dolly shape matching the panel curvature (general purpose, wedge, or bumping dolly)
3. Position dolly on panel back side directly behind dent
4. Using 2-3 ounce finishing hammer, strike panel directly above dolly with controlled swings
5. Work from deepest point of dent outward toward edges in spiral pattern
6. Use light to medium force - heavy blows can thin metal and cause creasing
7. After each strike sequence, check progress by sight and feel
8. Continue until dent area is brought approximately to original contour

STUD PULLING FOR DEEP DENTS
1. For dents deeper than 1 inch, use stud puller system to begin metal movement
2. Attach bridge or slide hammer base to panel using hot melt glue or mechanical fasteners
3. Install studs in holes on bridge, spacing studs around dent perimeter (typically 4-6 studs)
4. Pull studs progressively - do not pull all at once which can create creases
5. Pull studs in sequence starting from center and working outward
6. Check progress frequently - stop pulling when dent area is approximately level
7. Remove studs and clean adhesive residue before beginning hammer and dolly work

METAL SHRINKING TECHNIQUES
1. Inspect damaged area for areas that show stretching or thinning
2. For stretched metal, use shrinking techniques to restore proper thickness
3. Heat small areas of stretched metal with heat gun to 400-500 degrees Fahrenheit
4. Using shrinking hammer (with faces at right angles), strike heated area in spiral pattern
5. Allow metal to cool between strikes - do not overheat which can cause paint damage on backside
6. Follow shrinking by striking panel with dolly underneath to help compress and compact metal
7. Repeat heating and striking process until stretched area is consolidated
8. Test metal thickness in stretched areas - ensure no thinning below 0.020 inches

METAL FINISHING AND CONTOUR WORK
1. After hammer and dolly work, use body file (surform tool or traditional file) to identify high and low spots
2. Apply layout fluid or chalk to panel and file across entire repair area
3. High spots will show file marks, low spots will show layout fluid color
4. Use finishing hammer with dolly to lower any high spots identified
5. Continue filing and striking until surface is smooth and contour is uniform
6. Use straight edge ruler to check for waviness or distortion
7. For stubborn high spots, position dolly and use controlled hammer strikes with proper technique
8. Final contour should match adjacent panels with no steps, gaps, or misalignment`,
    language: 'en'
  },
  {
    title: 'Body Filler Application Guide',
    doc_type: 'procedure',
    tab_slug: 'auto-body-repairs',
    tags: ['body-filler', 'application', 'mixing', 'procedures'],
    content_text: `BODY FILLER APPLICATION GUIDE

Proper body filler application ensures durable repairs that will not shrink, crack, or fail after paint application.

SURFACE PREPARATION BEFORE FILLER
1. Inspect panel to ensure all significant dents are worked out with hammer and dolly
2. Use body file to verify contour is approximately correct before filler application
3. Sand surface with 80-120 grit sandpaper to remove rust, old paint, and scale
4. Use orbital sander for efficient material removal on large areas
5. Wipe sanded surface with tack cloth to remove all dust
6. For areas with pinholes or small imperfections, apply filler in these spots first
7. Verify surface is clean and dry before opening filler can - moisture will cause filler to fail

MIXING FILLER AND CATALYST RATIO
1. Most body fillers use a standard ratio of 50 to 1 by volume (some 100 to 1 - check product instructions)
2. Pour filler into clean, dry mixing container (plastic or fiberglass)
3. Using catalyst dispenser bottle provided with filler, dispense correct amount of catalyst
4. Mix thoroughly with putty knife or mixing paddle for 30-45 seconds
5. Scrape bottom and sides of container to ensure all filler is thoroughly combined
6. Do not overmix which introduces air bubbles
7. Mixture should have uniform gray color with no white streaks indicating unmixed catalyst
8. Work time is typically 8-12 minutes at room temperature - cold temperatures slow cure, heat speeds cure
9. Do not add extra catalyst to speed up curing - this causes brittleness and cracking

FILLER APPLICATION THICKNESS AND TECHNIQUE
1. Use flexible putty knife or plastic spreader tool appropriate for repair size
2. For large dents, apply filler in layers rather than one thick application
3. First layer should be 3/8 inch thick maximum - thicker applications shrink excessively
4. Apply filler with smooth, firm pressure spreading material evenly
5. For areas larger than 1 foot, divide into sections and apply separately
6. Work filler into any low spots while maintaining overall thickness
7. Slightly overfill repair area (approximately 1/4 inch higher than final contour)
8. Allow cure time per product instructions before sanding - typically 30-60 minutes depending on temperature
9. Temperature affects cure time - cooler conditions require longer wait time

FILLER SHAPING AND BLOCK SANDING SEQUENCE
1. After initial cure, use 80 grit sandpaper and block or orbital sander to shape filler
2. Sand with long, smooth strokes to identify high and low spots
3. Use 80 grit to remove bulk of filler material down to approximate final contour
4. Switch to 120 grit sandpaper and continue shaping until surface is smooth
5. Use long straight edge (4-6 feet) to check for waves or irregularities
6. Any dips in surface indicate areas needing additional filler
7. Sand with 150 grit to prepare surface for any additional filler coats if needed
8. For final shaping, use 220 grit and sand until surface is smooth and contour matches adjacent panels

SANDING PROGRESSION FOR PRIMER APPLICATION
1. After filler shaping is complete, progressively sand with finer grits
2. Sand with 220 grit to ensure uniform surface
3. Follow with 320 grit sandpaper for final surface preparation
4. Wipe with tack cloth between each grit progression to remove dust
5. Final sanded surface should be uniform matte finish with no glossy spots
6. Verify repair area is level with adjacent panels using straight edge`,
    language: 'en'
  },
  {
    title: 'Panel Replacement and Welding Procedures',
    doc_type: 'procedure',
    tab_slug: 'auto-body-repairs',
    tags: ['panel-replacement', 'welding', 'procedures', 'mig'],
    content_text: `PANEL REPLACEMENT AND WELDING PROCEDURES

Complete procedure for removing damaged panels, installing replacement panels, and performing quality welds to ensure structural integrity.

SPOT WELD DRILLING AND REMOVAL
1. Identify all spot weld locations connecting old panel to adjacent structure
2. Use center punch to mark each spot weld location
3. Select drill bit size slightly smaller than spot weld (typically 3/16 to 1/4 inch depending on weld size)
4. Carefully drill through spot weld with moderate pressure - allow drill to cut through weld
5. Do not force drill - excessive pressure can enlarge holes or damage base metal
6. Continue drilling until panel separates from base structure
7. Use pry bar to carefully separate panel and remove any remaining weld material
8. Inspect base metal for damage - if base metal is distorted, straighten using dolly and hammer before welding new panel
9. Clean weld area with wire brush to remove corrosion and loose material

PANEL FIT AND ALIGNMENT
1. Position new panel in opening and verify fit with panel alone (no adhesive or fasteners yet)
2. Check door gaps or panel spacing using gap gauges (typically 2-4mm gaps depending on design)
3. Verify panel contour aligns with adjacent panels - no steps or misalignment
4. For door panels, verify latch operation and window frame alignment
5. Adjust panel position as needed using shims or alignment jigs
6. Once fit is acceptable, mark panel position with tape and marker at several points
7. Remove panel and prepare for welding

PLUG WELDING PROCEDURE
1. Ensure welding equipment is properly set up: MIG welder, shielding gas, proper ground clamp
2. Typical MIG settings for 0.035 wire in auto body: 150-180 amps, 400-500 inches per minute wire feed
3. Check shielding gas (75% argon, 25% CO2 typical for MIG auto body work)
4. Position panel back in place using alignment marks
5. For each spot weld location, use welding stud or clamp to hold panel in position
6. Clean weld area with wire brush immediately before welding to remove oxide
7. Using MIG gun, position gun perpendicular to panel surface
8. Weld for 1-2 seconds using steady trigger pressure - do not jab or dwell
9. Stagger weld locations to prevent panel distortion from heat buildup
10. Apply welds in sequence: top, bottom, middle, then sides to distribute heat evenly

MIG WELDER SETTINGS AND TECHNIQUE
1. Adjust wire feed speed so wire delivers steady arc sound (not crackling or stuttering)
2. If wire feed is too slow, weld will be porous and weak
3. If wire feed is too fast, welds will be too hot and distort panel
4. Hold gun at 90 degree angle to panel surface (perpendicular)
5. Maintain 1/4 to 3/8 inch distance between gun nozzle and panel surface
6. Move gun smoothly along weld line at consistent speed
7. For fillet welds joining overlapping panels, angle gun 45 degrees and use slight weaving motion
8. After welding, allow welds to cool naturally - do not quench with water or solvents

SEAM SEALING AFTER WELDING
1. After all structural welds are complete, inspect welds for voids or cracks
2. Apply seam sealer to all welded joints to prevent corrosion
3. Use aerosol or cartridge seam sealer depending on shop preference
4. Apply sealer in bead pattern along entire weld length
5. Allow sealer to cure per product instructions before painting
6. For edges of replacement panels, apply cavity wax to interior surfaces to prevent corrosion`,
    language: 'en'
  },
  {
    title: 'Structural and Frame Straightening Overview',
    doc_type: 'procedure',
    tab_slug: 'auto-body-repairs',
    tags: ['frame-straightening', 'measuring', 'procedures', 'alignment'],
    content_text: `STRUCTURAL AND FRAME STRAIGHTENING OVERVIEW

Procedure for measuring frame damage, setting up straightening equipment, and applying corrective pulls to restore structural alignment.

MEASURING POINTS AND BASELINE ESTABLISHMENT
1. Obtain vehicle-specific measurement charts from manufacturer or database (Audatex, I-CAR, etc.)
2. Identify key measurement points: core support width, door opening dimensions, wheelbase
3. Using body measuring system (frame rack with measuring arms or 3D laser system), establish baseline measurements
4. Compare damaged vehicle measurements to specification chart
5. Document all out-of-specification measurements with notes on direction of damage
6. Example measurements: front frame rails should be parallel within 1/4 inch over 6 feet
7. Measure door opening dimensions - typically should match within 1/8 inch side to side
8. Measure wheelbase and track (distance between wheels) - deviation indicates bent frame rails

BENCH SETUP AND ANCHOR POINTS
1. Position vehicle on straightening bench with wheels removed
2. Install proper anchor point attachments at designated locations per vehicle specification
3. Anchor points are typically at rocker panel or frame rail locations
4. Ensure vehicle is secure and cannot shift during pulling - verify all anchors are tight
5. Establish direction of pull: most frame damage requires pulling in opposite direction of impact
6. For front end damage, primary pull is typically straight back or at angle slightly toward damaged side
7. For side damage, primary pull is perpendicular to damaged side pulling vehicle back to center

PULL SEQUENCE FOR FRAME ALIGNMENT
1. Begin with primary pull in direction addressing major damage - apply 3000-5000 pounds gradually
2. Hold pull tension and measure frame to verify movement in correct direction
3. Release tension slightly and measure again to determine spring-back
4. Reapply tension and increase gradually to target pull force
5. For multiple damage areas, prioritize straightening: first rails, then core support, then door openings
6. After major pulls, release tension completely and re-measure to see final position after spring-back
7. Apply secondary pulls for areas requiring additional correction
8. Use side pulls to correct off-center damage or twisted frames
9. Typical pull sequence for front-end collision: center line pull, right side pull, left side pull

STRESS RELIEF AND FINAL VERIFICATION
1. After straightening is complete, heat affected areas of frame with heat gun (400-500 degrees Fahrenheit)
2. This stress relief heating prevents paint cracking and allows metal to settle to final position
3. Apply heat gradually over entire repair area - do not localize heat which can cause distortion
4. After cooling (allow 30 minutes minimum), remove vehicle from bench and re-measure
5. Verify all measurements are within specification with less than 1/4 inch variation
6. Check door fit and alignment - doors should close smoothly with even gaps
7. Verify hood and trunk alignment - hood should sit flush with fenders and bumper cover
8. Road test vehicle to check steering and suspension alignment
9. If measurements are still out of specification, identify which area needs additional work and repeat straightening sequence`,
    language: 'en'
  },
  {
    title: 'Corrosion Protection After Repairs',
    doc_type: 'procedure',
    tab_slug: 'auto-body-repairs',
    tags: ['corrosion', 'protection', 'sealers', 'procedures'],
    content_text: `CORROSION PROTECTION AFTER REPAIRS

Comprehensive corrosion protection procedures for welded areas, bare metal surfaces, and cavity areas to ensure long-term durability.

CAVITY WAX APPLICATION
1. Cavity wax provides rust prevention inside door skins, rocker panels, and frame sections
2. Use aerosol cavity wax in application straw, inserting straw into access holes in panel
3. For large cavities, drill temporary access holes (3/8 inch diameter) as needed
4. Apply cavity wax in 2-3 second bursts, moving straw around interior cavity
5. Ensure wax reaches all corners and crevices - apply until wax begins dripping from cavity
6. After application, immediately close access holes with pop rivets and seal with polyester filler
7. For rocker panels, apply cavity wax through door sill area before reassembly
8. Cavity wax provides 5-10 year protection against rust if properly applied

ZINC PRIMERS FOR BARE METAL
1. Zinc-based primers are essential for rust prevention on exposed steel surfaces
2. After sanding bare metal, immediately apply zinc-rich primer (do not leave bare metal exposed to air)
3. Apply primer in thin coat - typically 1.5-2 mils dry film thickness
4. Use 80% zinc content primers for maximum corrosion protection
5. Allow proper flash time between coats per product instructions (typically 10-20 minutes)
6. Zinc primers typically have strong metallic odor - ensure adequate ventilation
7. Apply minimum 2 coats to all bare metal areas including inside frame sections
8. Zinc primers are typically gray or metallic color and will show under clear coat

SEAM SEALERS FOR JOINTS AND WELDS
1. Seam sealer creates waterproof barrier in joints between panels and along welds
2. Apply seam sealer in bead along all welded joints before painting
3. Aerosol seam sealers spray in foam pattern that expands to fill gaps
4. Cartridge seam sealers require application gun - provides more control for precision application
5. For structural welds, apply seam sealer along entire weld length on both sides if accessible
6. Allow seam sealer to skin over (typically 5-10 minutes) before applying primer
7. Seam sealer flexibility allows for metal expansion without cracking

UNDERCOATING AND E-COAT REPAIR
1. Undercoating provides sound deadening and rust protection for vehicle underbody
2. After repairs and before final assembly, inspect undercoating for damage
3. For areas where undercoating is damaged, apply aerosol undercoating to match original coverage
4. Typical undercoating is dark brown or black spray applied to undercarriage
5. For areas where original e-coat (factory corrosion protection) is damaged, apply e-coat alternative product
6. E-coat repair products are typically high-build primers that replicate original factory finish
7. Apply e-coat equivalent to any areas where base metal is exposed on structural areas
8. Allow products to dry per manufacturer instructions before assembly

DOCUMENTATION AND VERIFICATION
1. Create documentation of all corrosion protection work performed
2. Note areas where cavity wax was applied with location information
3. Record types and quantities of primers, sealers, and undercoating used
4. Document any drill holes made for cavity wax application and how they were sealed
5. Include photos showing corrosion protection applications in repair documentation
6. This documentation helps with warranty claims and future service if needed`,
    language: 'en'
  },

  // ============ PAINTING ============
  {
    title: 'Paint Booth Preparation Checklist',
    doc_type: 'checklist',
    tab_slug: 'painting',
    tags: ['paint-booth', 'preparation', 'safety', 'checklist'],
    content_text: `PAINT BOOTH PREPARATION CHECKLIST

Complete this checklist before every painting session to ensure booth is functioning properly and environment is controlled for quality finishes.

BOOTH CLEANING AND DEBRIS REMOVAL
☐ Empty paint booth of all parts and work materials
☐ Sweep and mop floor to remove all dust and debris
☐ Wipe down booth walls with damp cloth, checking for dust accumulation
☐ Inspect corners and seams for dirt or overspray residue
☐ Clean spray gun holder and tool storage areas
☐ Remove any dry overspray buildup from previous painting sessions
☐ Inspect air hoses for damage or debris inside
☐ Clean or replace booth lights if covered with dust or overspray
☐ Verify floor drain is clear and functioning properly

FILTER INSPECTION AND REPLACEMENT
☐ Inspect intake air filters for dust or paint overspray accumulation
☐ If filters appear clogged, schedule replacement before painting
☐ Check exhaust filters for structural damage or holes
☐ Verify filter replacement date - change per booth manufacturer schedule
☐ Ensure filter housing seals are tight and not leaking air around edges
☐ Clean or replace particulate filters depending on booth design
☐ Verify activated carbon filters if equipped for odor control
☐ Document filter inspection and any replacements performed

TEMPERATURE AND HUMIDITY CONTROL
☐ Check booth thermostat setting - maintain 65-75 degrees Fahrenheit
☐ Verify temperature is stable and not fluctuating during preheat period
☐ Measure relative humidity with hygrometer - maintain 40-60% humidity range
☐ If humidity is above 60%, activate dehumidifier and allow 30-45 minutes warm-up
☐ If humidity is below 40%, activate humidifier to prevent excessive evaporation
☐ Record temperature and humidity readings in booth log
☐ Allow 30 minutes for booth to reach stable temperature before painting
☐ Verify heating/cooling system is functioning without unusual sounds

AIR PRESSURE AND VENTILATION VERIFICATION
☐ Check booth pressure gauge - maintain 0.02 to 0.10 inches water column positive pressure
☐ Verify air flow is consistent across booth entrance (use smoke stick to check)
☐ Listen for proper exhaust fan operation - should run continuously during painting
☐ Verify makeup air supply is operating and not producing drafts at work area
☐ Check that all booth doors seal properly and close completely
☐ Ensure ventilation is adequate for painting workload - verify fan speed setting
☐ Document booth pressure readings in maintenance log

LIGHTING INSPECTION
☐ Turn on all booth lights and verify even illumination across work area
☐ Minimum lighting should be 500 foot-candles in paint booth
☐ Check for dark spots or shadows where paint defects could be missed
☐ Clean light covers if dust accumulation reduces brightness
☐ Verify color correction bulbs if equipped (for color matching visibility)
☐ Test UV lights if booth equipped for special effect paint inspection
☐ Ensure all light fixtures are secure and not at risk of falling

SPRAY EQUIPMENT AND SUPPLY VERIFICATION
☐ Test spray gun with water or test fluid - verify trigger, fluid flow, and air delivery
☐ Check spray gun nozzle and air cap for damage or blockage
☐ Verify spray pattern is consistent and even across test surface
☐ Check paint supply containers are properly sealed and labeled
☐ Verify mixing equipment (scales, mixing cups) are clean and functional
☐ Ensure adequate supply of clean rags, wipers, and application materials
☐ Check that stirring sticks, measuring devices, and catalyst bottles are accessible

PERSONAL PROTECTIVE EQUIPMENT STATION
☐ Verify respirator filters are installed and within expiration date
☐ Ensure adequate supply of cloth hood protectors
☐ Check that protective coveralls are clean and available in correct sizes
☐ Verify safety glasses are accessible and lenses are clean
☐ Confirm nitrile gloves supply is stocked
☐ Check first aid kit is accessible and well-stocked
☐ Verify eyewash station is operational if booth equipped with one`,
    language: 'en'
  },
  {
    title: 'Surface Preparation and Masking Guide',
    doc_type: 'procedure',
    tab_slug: 'painting',
    tags: ['surface-prep', 'masking', 'sanding', 'procedures'],
    content_text: `SURFACE PREPARATION AND MASKING GUIDE

Comprehensive procedure for sanding, cleaning, masking, and preparing all surfaces for primer and paint application.

INITIAL SURFACE SANDING SEQUENCE
1. Inspect entire repair area and adjacent panels for surface defects or roughness
2. Start with 320 grit sandpaper for general surface smoothing
3. Sand with orbital sander using long, even strokes in one direction
4. Wipe test surface with tack cloth to identify any remaining rough spots
5. Transition to 400 grit sandpaper to remove 320 grit scratches and further smooth surface
6. Sand entire repair area including 6 inches beyond repair boundaries to create feather edge
7. Use final 600-800 grit sanding to prepare surface for primer
8. Feather edges should gradually blend repaired area into surrounding original paint
9. No scratches from lower grit paper should be visible after final sanding

CLEANING AND SURFACE PREPARATION
1. After final sanding, wipe entire repair area with tack cloth to remove all dust
2. Use air hose (low pressure, 20 psi) to blow out crevices and panel gaps
3. Wipe again with tack cloth if any dust is displaced by air
4. Do not touch sanded surfaces with bare hands - oils will prevent adhesion
5. For areas with contamination (tar, wax, silicone), use appropriate solvent cleaner
6. Apply wax and grease remover with clean cloth and allow to evaporate (5-10 minutes)
7. Verify surface is clean by wiping with dry cloth - no residue should transfer to cloth
8. Surfaces must be clean and dry before primer application - inspect immediately before spraying

MASKING TECHNIQUE FOR PAINT WORK
1. Mask all areas that should not receive primer or paint
2. Start masking from edges that will be visible - ensures clean edge
3. Position masking tape with slight tension, pressing firmly to create seal
4. For edges that will be visible in final finish, mask 1/8 inch away from edge to prevent paint creep
5. Use fine-line masking tape for precision edges - standard tape leaves rougher edge
6. For complex shapes, use masking fluid or removable adhesive for curved masking
7. Paper masking should cover at least 12-18 inches from paint application area
8. Use painter's masking paper sheets secured with tape, not loose plastic
9. Ensure paper seams are sealed with tape to prevent paint seepage underneath
10. Check masking before painting - any gaps or loose edges should be re-sealed

REVERSE MASKING FOR FINAL BLEND AREAS
1. For blend areas where paint will feather into existing color, reverse mask to prevent hard edge
2. First apply painter's tape approximately 4-6 inches from paint application area
3. Spray primer/paint through open area (reverse masked section)
4. Remove tape while paint is still tacky but not wet
5. Carefully peel back tape at shallow angle to prevent damage
6. This creates gradual blend between new and existing paint
7. For multi-stage reverse masking, reapply tape in different position for clearcoat application
8. Reverse masking is critical for undetectable repairs on visible panels

MASKING WINDOWS AND TRIM AREAS
1. For windows, apply painter's tape along interior edge of rubber seal/trim
2. Place tape 1/8 inch away from actual window edge to prevent paint on glass
3. For trim pieces that cannot be removed, carefully mask around edges
4. Use masking fluid for intricate trim shapes - apply with small brush and allow to dry fully
5. After painting, remove masking fluid carefully using eraser tool or plastic scraper
6. For rubber trim and seals, ensure tape does not adhere too strongly to prevent damage
7. Test masking tape adhesion on hidden area before applying to visible areas

INSPECTION BEFORE PRIMER APPLICATION
1. Conduct final walk-around inspection of all masked areas
2. Verify no bare metal or repair areas are exposed outside mask boundaries
3. Check that all edges are sealed and no paint creep is possible
4. Confirm floor and adjacent work areas are protected from overspray
5. Verify equipment is positioned to avoid paint spray in unwanted directions
6. Confirm booth lighting is adequate to see any missed spots or preparation issues`,
    language: 'en'
  },
  {
    title: 'Primer Application Procedures',
    doc_type: 'procedure',
    tab_slug: 'painting',
    tags: ['primer', 'application', 'spray-technique', 'procedures'],
    content_text: `PRIMER APPLICATION PROCEDURES

Complete procedure for applying primer to repair areas with proper coverage, thickness control, and flash times.

EPOXY VS 2K HIGH-BUILD PRIMER SELECTION
1. Epoxy primers provide excellent adhesion and corrosion protection - use on bare metal
2. 2K high-build primers provide dimensional fill and primer strength - use for body work areas
3. For welded seams and bare metal, apply epoxy primer first
4. For areas with body filler or contour issues, use 2K high-build as secondary primer
5. Check compatibility between primer types - most modern primers are compatible
6. For complete coverage, plan to apply epoxy to all bare areas, then high-build to repair area
7. Allow proper flash time between primer types before application

PRIMER MIXING RATIOS
1. Standard epoxy primer mixing ratio is typically 4:1 (resin to hardener by volume)
2. 2K high-build primer typical ratio is 2:1 (primer to hardener)
3. Some products vary - always check product technical data sheet for exact ratio
4. Use mixing scale if available for precise measurements by weight (preferred method)
5. For small quantities, use volume measuring cups and mark lines for consistent ratio
6. Stir both components thoroughly before combining to ensure uniform mixture
7. Combine components and mix for 2-3 minutes with stirring rod
8. Let mixture sit for 5 minutes after mixing to allow air bubbles to escape
9. Do not thin primer unless absolutely necessary - reduces protection and adhesion

SPRAY GUN SETUP FOR PRIMER
1. Select appropriate spray gun tip size for primer viscosity:
   - Standard epoxy primer: 1.4-1.5mm tip
   - High-build primer: 1.5-1.6mm tip
2. Set fluid delivery to provide wet coverage without excess material flowing
3. Adjust air pressure to 25-30 psi at the cap for even atomization
4. Install proper air cap and needle assembly for primer material
5. Clean spray gun thoroughly with appropriate solvent before first use
6. Test spray pattern on test panel - should be even and consistent
7. Verify no dripping or runs in test pattern before applying to actual repair

PRIMER APPLICATION TECHNIQUE
1. Begin spraying with gun 6-8 inches from panel surface
2. Maintain consistent distance throughout application - do not vary distance
3. Move gun smoothly across panel at steady speed (approximately 6-8 inches per second)
4. Spray in straight lines with 50% overlap between passes
5. For even coverage, apply primer in vertical strokes, then horizontal strokes
6. Do not fan gun in arcs - maintain straight, parallel passes
7. For large areas, divide into manageable sections to prevent sagging
8. First coat should show color of substrate through primer
9. Second coat should provide complete opacity and smooth coverage
10. Apply primer in controlled, light passes rather than heavy wet coats

PRIMER FLASH TIME AND CURE
1. Flash time is the time allowed between primer coats before solvent evaporates
2. Standard flash time between primer coats is 10-20 minutes depending on temperature and humidity
3. Higher humidity and cooler temperatures require longer flash time
4. Do not apply second coat too quickly - incomplete flash causes runs and sagging
5. Do not wait too long between coats - surface can become too dry and not bond properly
6. For optimal adhesion, apply second coat while surface is still slightly tacky
7. After final primer coat, allow minimum 30 minutes drying before sanding
8. For epoxy primers, may require 1-2 hours drying in cool conditions
9. Do not begin sanding until primer is fully cured and tack-free

PRIMER SANDING AND GUIDE COAT
1. After primer is fully cured, sand primer with guide coat applied
2. Guide coat is thin coat of contrasting color applied to identify low spots
3. Light spray of black primer or dark paint creates guide coat
4. Sand with 400 grit sandpaper and block sander to identify areas
5. Where guide coat is removed, surface is high; where guide coat remains, areas are low
6. Sand until guide coat is mostly removed and surface appears uniform
7. Use straight edge to check for any remaining surface imperfections
8. Final sand with 600 grit to prepare for paint application
9. Wipe with tack cloth and wax/grease remover before final paint application`,
    language: 'en'
  },
  {
    title: 'Basecoat and Clearcoat Application Guide',
    doc_type: 'procedure',
    tab_slug: 'painting',
    tags: ['basecoat', 'clearcoat', 'application', 'procedures'],
    content_text: `BASECOAT AND CLEARCOAT APPLICATION GUIDE

Complete procedure for applying basecoat color and protective clearcoat to achieve professional factory-quality finish.

PAINT MIXING WITH SCALE METHOD
1. Use digital scale to measure paint and additives by weight (preferred over volume)
2. Standard basecoat mixing ratio is typically 2:1 by weight (paint to hardener)
3. Verify specific ratio from product technical data sheet - ratios vary by manufacturer
4. Place clean mixing cup on scale and tare (zero) the scale
5. Add paint to cup until scale reaches weight specified for paint portion
6. Tare scale again and add hardener until second weight is achieved
7. If needed, add reducer/thinner to achieve desired viscosity (typically 10-20% by weight)
8. Stir thoroughly with mixing rod for 2-3 minutes
9. Let mixture sit for 5-10 minutes to allow air bubbles to escape
10. Strain paint through paint filter into spray cup to remove any particles

BASECOAT SPRAY GUN SETUP
1. For basecoat, use spray gun with 1.3-1.4mm tip for proper atomization
2. Basecoat is typically thinner viscosity than primer - adjust fluid delivery accordingly
3. Set air pressure to 25-30 psi at cap for even color and texture
4. Verify spray pattern is consistent on test surface before painting
5. Clean entire spray gun system after setup to remove any residue
6. For metallic basecoats, verify color dispersion in spray pattern
7. Test gun operation before beginning vehicle application

BASECOAT APPLICATION TECHNIQUE
1. Apply basecoat starting at top of repair area, working downward
2. Maintain 6-8 inches distance between gun and panel throughout application
3. Spray in smooth, overlapping passes with 50% overlap between strokes
4. Move gun at steady pace (approximately 6-8 inches per second)
5. For metallic and pearl colors, change spray direction each coat to ensure even color
6. Do not spray too heavy in first coat - build coverage with lighter coats
7. First coat establishes color base; second coat provides full opacity
8. Typical basecoat application is 2-3 light to medium coats for full opacity
9. Avoid heavy, wet coats which cause runs and thick buildup

BASECOAT FLASH TIME MANAGEMENT
1. Flash time between basecoat coats is typically 10-15 minutes
2. Do not apply second coat until first coat has flashed (solvent content reduces)
3. Basecoat should not be visibly wet when applying second coat
4. In humid conditions, allow slightly longer flash time (15-20 minutes)
5. If working in cool environment, temperature may require extended flash times
6. Do not force dry between coats with heat - this causes paint defects
7. Between final basecoat and clearcoat, allow 15-30 minutes flash time
8. Basecoat must be fully flashed before clearcoat application - if clearcoat applied too soon, causes wrinkling

CLEARCOAT APPLICATION PROCEDURE
1. Allow 15-30 minutes between final basecoat and first clearcoat application
2. If basecoat has cooled excessively, light sand with 600 grit and retack cloth
3. For clearcoat, use spray gun with 1.4-1.5mm tip (slightly larger than basecoat)
4. Mix clearcoat per product instructions - typically 1:1 ratio hardener to clearcoat
5. Clearcoat is thinner than basecoat - do not reduce unless absolutely necessary
6. Set air pressure slightly higher than basecoat (28-32 psi) for proper atomization
7. Apply clearcoat in smooth, even coats with 50% overlap
8. Clearcoat typically requires 2 coats for adequate protection
9. First clearcoat coat should be light to medium - allows second coat to flow out smoothly
10. Second clearcoat coat should be slightly heavier to ensure full coverage and gloss

AVOIDING PAINT DEFECTS
1. To prevent runs and sags: do not apply coats too heavy, maintain consistent gun distance
2. To prevent orange peel: ensure proper spray pressure, temperature, and humidity control
3. To prevent sand scratches showing through: properly sand primer and apply adequate basecoat
4. To prevent shrinkage of body filler through paint: apply adequate primer coats and allow cure time
5. To prevent dust in paint: ensure booth is clean, filters are new, and work quickly
6. After clearcoat application, do not disturb vehicle for 16-24 hours to allow proper cure
7. Do not wash or expose to weather until clearcoat is fully cured (typically 7 days)`,
    language: 'en'
  },
  {
    title: 'Color Matching and Blending Techniques',
    doc_type: 'procedure',
    tab_slug: 'painting',
    tags: ['color-matching', 'blending', 'procedures', 'techniques'],
    content_text: `COLOR MATCHING AND BLENDING TECHNIQUES

Procedures for ensuring paint color accuracy and seamless blending of repaired panels into surrounding original paint.

VARIANCE CHIPS AND COLOR STANDARDS
1. Obtain variance chips from paint supplier - these show acceptable color range for vehicle color
2. Variance chips account for factory paint variations in shade and metallic orientation
3. Light chip shows lighter acceptable shade, dark chip shows darker acceptable shade
4. Metallic variance should also be evaluated - metallic orientation varies with viewing angle
5. Compare mixed paint to variance chips under booth lighting before applying to vehicle
6. If color is outside acceptable variance range, adjust with tinting colorants
7. For pearl colors, evaluate undertone and flip (color change at angle)
8. Never attempt to match color perfectly to single shade - variance range is acceptable

SPRAY-OUT CARDS FOR FINAL VERIFICATION
1. Before painting vehicle, create spray-out card using vehicle base panel or white cardstock
2. Spray paint mixture on card under same conditions as booth painting
3. Allow paint to dry fully (1-2 hours depending on product)
4. Compare dried spray-out card to vehicle under natural daylight
5. Check color accuracy under both outdoor and indoor lighting conditions
6. If color does not match acceptably, make adjustments before proceeding to vehicle
7. Keep spray-out card for documentation of color used for this vehicle

LET-DOWN PANELS AND FEATHERING
1. Let-down panel is area where repair panel blends into adjacent original paint
2. Identify which adjacent panel or edge will be the blend area
3. Avoid blending on highly visible areas when possible - blend on less visible seams
4. For side-facing repairs, blend onto rear quarter panel or rear door when possible
5. Prepare let-down panel with same surface preparation as primary repair (sand to 600 grit)
6. Apply basecoat to primary repair area per standard procedure
7. Extend color application onto let-down panel, fading out color toward existing paint
8. Use reverse masking technique to create feather edge that disappears
9. This creates undetectable transition between new and original paint

BLENDING INTO ADJACENT PANELS
1. For large repairs, color may need to blend onto adjacent panel for undetectable finish
2. Identify the best blending location - typically panel edges or trim lines
3. Sand blend area with 600-800 grit sandpaper to remove gloss
4. Apply basecoat to primary panel and extend onto blend panel
5. Thin basecoat on blend panel, fading completely into existing paint
6. Use spray technique to create gradual color fade rather than abrupt edge
7. For metallic colors, ensure metallic particles are evenly dispersed in blend area
8. Apply clearcoat over entire repair and blend area for uniform protection

TINTING BASICS FOR COLOR ADJUSTMENT
1. If spray-out shows color slightly lighter than standard, add small amount of dark tint
2. If spray-out shows color slightly darker than standard, add small amount of light tint
3. Tinting colorants are concentrated pigments - use sparingly (add small amount at a time)
4. For metallic shift (too much or too little metallic appearance), adjust metallic additive
5. Always remix entire batch with tint adjustment - do not tint small amount then mix
6. Create new spray-out card after tinting to verify correction
7. Document all tinting adjustments for future reference if vehicle needs touch-up

LIGHTING AND COLOR EVALUATION
1. Evaluate paint color under at least two different lighting conditions
2. Factory paint booth lights (typically 5000K color temperature)
3. Natural daylight or showroom lighting (5500-6500K color temperature)
4. Colors often appear different under different lighting - both must be acceptable
5. Metallic colors should be evaluated at multiple angles
6. Note if color appears acceptable from all angles and lighting conditions
7. For pearl colors, verify both light shift and undertone color
8. If color appears questionable under any lighting condition, remake before vehicle application

MULTI-STAGE PAINTING FOR SPECIAL EFFECTS
1. For tri-coat or multi-stage colors, follow specific application sequence
2. Base color (typically opaque color or primer)
3. Specialty stage (typically metallic, pearl, or effect additive)
4. Final clear stage for protection
5. Allow proper flash time between each stage per product instructions
6. For tri-coat colors, intermediate clear coat may be required between stages
7. Consult product technical data sheet for specific application sequence`,
    language: 'en'
  },

  // ============ REASSEMBLY ============
  {
    title: 'Reassembly Sequence and Torque Specifications',
    doc_type: 'procedure',
    tab_slug: 'reassembly',
    tags: ['reassembly', 'torque', 'procedures', 'fasteners'],
    content_text: `REASSEMBLY SEQUENCE AND TORQUE SPECIFICATIONS

Complete procedure for reassembling vehicle components in proper sequence with correct torque specifications.

GENERAL REASSEMBLY ORDER
1. Begin reassembly from bottom to top: structural components first, then trim
2. Install major structural components: door frames, panels, suspension components
3. Install mechanical systems: engine, transmission, cooling, fuel systems
4. Install electrical systems: battery, wiring harnesses, modules
5. Install trim and cosmetic items: interior panels, exterior trim, badges
6. Final step: test all systems before customer handoff
7. This sequence prevents having to remove completed assemblies to access underlying components
8. For complex vehicles, consult service manual for manufacturer-recommended sequence

COMMON TORQUE SPECIFICATIONS
The following are general industry standard torque values. Always consult vehicle service manual for specific requirements:

STRUCTURAL FASTENERS:
- Frame rail bolts (major): 50-70 ft-lbs
- Suspension mounting bolts: 70-100 ft-lbs
- Body panel fasteners: 10-20 ft-lbs
- Door hinge bolts: 15-25 ft-lbs
- Hood hinge bolts: 15-25 ft-lbs

ENGINE AND MECHANICAL:
- Engine mounting bolts: 40-60 ft-lbs
- Transmission mounting: 30-50 ft-lbs
- Radiator bracket bolts: 10-15 ft-lbs
- Water pump bolts: 15-20 ft-lbs
- Fuel filler neck: 15-25 ft-lbs

ELECTRICAL AND ACCESSORIES:
- Battery terminal clamps: 8-12 ft-lbs
- Starter motor bolts: 25-35 ft-lbs
- Alternator bracket: 20-35 ft-lbs
- Light fixture mounting: 5-10 ft-lbs

TORQUE APPLICATION TECHNIQUE
1. Use calibrated torque wrench appropriate for fastener size and required torque value
2. Click-type torque wrenches are most common for body shop use
3. Adjust torque wrench to desired setting using adjustment handle or socket
4. Apply fastener wrench and tighten until torque wrench clicks or reaches set value
5. Do not overtighten after click - this does not tighten fastener further
6. For fasteners requiring specific sequence (like engine heads), obtain sequence diagram from service manual
7. Tighten in diagonal or cross pattern for even load distribution
8. Never guess on torque values - always consult specifications or service manual

THREADLOCKER USAGE
1. Threadlocker is anaerobic adhesive that prevents fasteners from loosening due to vibration
2. For fasteners in vibration-prone areas, apply medium-strength threadlocker (Loctite 243 equivalent)
3. Do not use threadlocker on fasteners that require frequent removal (battery terminals, spark plugs)
4. Apply small drop of threadlocker to fastener threads before installation
5. Do not allow threadlocker on fastener head or under bolt head where it could interfere with clamp
6. Allow threadlocker to cure per product instructions (typically 24 hours for full strength) before vehicle use
7. For high-temperature applications (exhaust, turbo), use high-temp threadlocker
8. Keep threadlocker away from skin and eyes - read product safety data sheet

FASTENER INSPECTION AND REPLACEMENT
1. Inspect all fasteners before reinstallation - replace any that are bent, stripped, or corroded
2. Verify fastener size and type match original - do not substitute different materials
3. For critical safety fasteners (suspension, brakes), always use new fasteners when removing old ones
4. Check threaded holes for damage - if threads are stripped, use larger diameter bolt or threaded insert
5. Verify bolts rotate smoothly with hand before using torque wrench - indicates threads are clean
6. Clean threaded holes with wire brush and compressed air if threads are dirty or corroded
7. Lightly lubricate bolt threads if fastener has corroded or is difficult to install
8. Wipe excess lubricant to prevent over-torquing due to slippery threads`,
    language: 'en'
  },
  {
    title: 'Electrical Reconnection and System Verification',
    doc_type: 'procedure',
    tab_slug: 'reassembly',
    tags: ['electrical', 'reconnection', 'verification', 'procedures'],
    content_text: `ELECTRICAL RECONNECTION AND SYSTEM VERIFICATION

Procedures for reconnecting electrical harnesses, performing module relearns, verifying systems with scan tools, and testing lighting.

RECONNECTING HARNESSES AND CONNECTORS
1. Reference photos taken during disassembly to identify correct harnesses and connector positions
2. Clean connector pins with compressed air before reconnection
3. For connectors with corrosion, gently clean pins with contact cleaner and let dry
4. Align connectors properly - forcing misaligned connectors damages pins
5. Press connector together firmly until click is heard or latch seats fully
6. For connectors with locking tabs, verify tab engages and holds connector together
7. Do not allow harnesses to hang loose - secure with clips and tape to prevent damage
8. Verify no wires are pinched or routed over sharp edges that could cause shorts
9. Route harnesses along same path as original using disassembly photos as reference

MODULE RELEARNS AND SYSTEM RESETS
1. After reconnecting battery, vehicle may have fault codes from disconnection
2. Connect OBD-II scan tool to vehicle diagnostic connector
3. Clear all fault codes from vehicle modules
4. Allow vehicle to idle for 5-10 minutes to allow modules to initialize
5. For vehicles with adaptive transmission, perform transmission relearn if recommended
6. For vehicles with camera or sensor systems, perform system initialization or calibration
7. Consult vehicle service manual for specific relearn procedures - varies by manufacturer
8. Example relearns include: power window position memory, seat position memory, suspension calibration
9. Some relearns must be performed by test drive or specific procedure - follow manufacturer instructions

SCAN TOOL VERIFICATION OF SYSTEMS
1. After vehicle is reassembled, connect OBD-II scan tool to diagnostic connector
2. Retrieve any pending or stored diagnostic trouble codes (DTCs)
3. Verify no codes related to major systems: engine, transmission, antilock brakes, airbags
4. If codes exist, note the codes and investigate root cause before customer delivery
5. Common codes after repair include: battery disconnect codes (cleared after relearn), sensor communication codes
6. Verify no codes related to newly disassembled/reassembled systems
7. Examples: door open switches, window position sensors, door lock solenoids
8. If sensor codes appear, reconnect relevant harnesses and perform relearn cycle
9. Run full system scan to verify no remaining codes after corrections

LIGHTING SYSTEM VERIFICATION
1. Turn ignition to on position and verify all dashboard lights illuminate briefly (bulb check)
2. Test headlights: low beam, high beam - verify both bright evenly
3. Test fog lights if equipped - should illuminate with fog light switch
4. Test turn signals front and rear - should flash at consistent rate
5. Test brake lights - lights should illuminate when brake pedal is pressed
6. Test reverse lights - should illuminate when transmission in reverse
7. Test interior lights: dome light, reading lights, map lights
8. Test parking lights and side markers
9. Verify lights do not remain on when vehicle is off - indicates electrical short
10. If any lights do not function, check bulbs, connectors, and wiring

POWER WINDOW AND LOCK VERIFICATION
1. Test all power window switches from driver and passenger doors
2. Windows should operate smoothly and not bind or make unusual sounds
3. Perform power window relearn if vehicle equipped with one-touch window feature
4. Test power door locks - all doors should lock and unlock from driver controls
5. Test keyless entry system - verify remote unlock and lock functions
6. If power windows or locks do not work, verify harness connections and motor operation
7. For heated mirrors, verify heating function if equipped
8. Test windshield wipers and washer system - verify all speeds and intermittent operation

BATTERY AND CHARGING SYSTEM VERIFICATION
1. Verify battery voltage at idle - should be 13.5-14.5 volts (engine running)
2. Verify battery voltage with lights on - should remain 13.0+ volts
3. Verify no battery drain with vehicle off - place test light on battery and monitor for light (should go off immediately)
4. If battery drain exists, investigate possible short or parasitic draw
5. For hybrid vehicles, verify high voltage battery disconnect and reconnection per service manual
6. Verify alternator light illuminates on startup then goes off when engine starts`,
    language: 'en'
  },
  {
    title: 'Trim and Molding Reinstallation Guide',
    doc_type: 'procedure',
    tab_slug: 'reassembly',
    tags: ['trim', 'molding', 'reinstallation', 'procedures'],
    content_text: `TRIM AND MOLDING REINSTALLATION GUIDE

Complete procedure for reinstalling trim pieces, moldings, and decorative items to match original appearance.

TRIM CLIP TYPES AND REPLACEMENT
1. Common trim clips include: C-clips, barbed clips, snap clips, and adhesive-backed clips
2. C-clips have hook that wraps around trim mounting point - replaced if bent or broken
3. Barbed clips press into panel holes and grip trim with barbs - often lost during removal
4. Snap clips use tension to hold trim - replace if tabs are broken or clip is loose
5. For any broken clips, always replace rather than trying to bend or repair original
6. Keep replacement clip assortments in shop - many clips are inexpensive and commonly needed
7. Measure old clips and verify replacement clips are same type and size
8. Press clips firmly into mounting points with flat tool - clip should snap into place with resistance
9. Test clip by attempting to remove trim piece - should not pull out easily

TRIM ALIGNMENT TECHNIQUES
1. Before securing trim permanently, test fit the entire piece to verify alignment
2. Ensure trim sits flush against panel with no gaps or overhangs
3. For side trim pieces, verify top edge aligns with roofline or header
4. For lower trim pieces, verify alignment with doors and body lines
5. Make small adjustments before fully securing - once clips are fully engaged, adjustment is difficult
6. For trim pieces with multiple attachment points, start at one end and work across
7. Ensure trim is fully seated before declaring installation complete
8. Verify trim alignment matches adjacent panels and appears symmetrical

GAP AND FLUSH STANDARDS
1. Gaps between trim and body panels should be consistent and typically 2-4mm
2. Trim pieces should sit flush with body panels - no raised edges or raised corners
3. Where trim meets body line, transition should be smooth with no step
4. Verify alignment before and after pressing clips fully home
5. If gaps appear uneven, adjust trim position slightly before clips fully engage
6. For moldings running full length of vehicle, verify gaps are consistent from front to back
7. Compare installed trim to opposite side of vehicle - should match symmetry

ADHESIVE TRIM AND MOLDING INSTALLATION
1. For trim pieces using adhesive backing, thoroughly clean panel surface first
2. Use isopropyl alcohol and clean cloth to remove dirt, wax, and oils
3. Allow panel to dry completely - moisture prevents adhesive from bonding
4. Remove adhesive backing from trim piece slowly and apply to panel
5. Press trim firmly onto panel, working from one end to other to eliminate air bubbles
6. For long trim pieces, apply in sections to ensure good adhesion
7. Allow adhesive to cure per manufacturer instructions before vehicle use (typically 24 hours)
8. Do not expose vehicle to water or extreme temperature until adhesive is fully cured

BADGE AND EMBLEM REINSTALLATION
1. For badges and emblems that were removed, verify original position using photos
2. Use trim fastening tool to carefully remove old adhesive from panel
3. Clean panel with isopropyl alcohol and allow to dry completely
4. If reusing same badge, clean old adhesive from badge backing
5. New adhesive-backed badges have foam double-sided tape - remove bottom tape backing carefully
6. Position badge on panel and press firmly for 30 seconds
7. For badges with fasteners, ensure fasteners are same type and tightness as original
8. Allow adhesive to set before washing vehicle (typically 24-48 hours)

DOOR AND PANEL MOLDINGS
1. Verify door moldings (upper, lower, and side moldings) are properly aligned
2. Upper door molding should align with door glass when door is closed
3. Side moldings should sit flush with body without gaps or overhangs
4. Lower door molding should protect lower door edge from road debris
5. Test door operation - door should close smoothly without hitting moldings
6. Verify molding clips are fully engaged and molding is secure
7. Check alignment with rear door moldings to ensure continuity

FINAL INSPECTION OF TRIM AND MOLDING
1. Walk around entire vehicle and verify all trim pieces are installed
2. Check for any missing clips, badges, or trim pieces
3. Verify alignment and flush condition across all trim
4. Ensure no trim pieces are loose or rattling
5. Test operation of any trim pieces with moving parts
6. Verify color and finish match original appearance
7. Document trim installation with photos for repair record`,
    language: 'en'
  },
  {
    title: 'Glass and Weatherstrip Installation',
    doc_type: 'procedure',
    tab_slug: 'reassembly',
    tags: ['glass', 'weatherstrip', 'installation', 'procedures'],
    content_text: `GLASS AND WEATHERSTRIP INSTALLATION

Procedures for installing windows, windshields, rear glass, and weatherstripping to prevent leaks and ensure safe drive-away.

URETHANE APPLICATION FOR BONDING
1. Urethane is adhesive/sealant used to bond glass to vehicle body
2. Modern urethane requires primer on both glass and body for proper adhesion
3. Apply urethane primer to glass edges where urethane will contact glass
4. Apply urethane primer to body pinch weld where urethane will contact body
5. Allow primer to dry per product instructions (typically 5-10 minutes)
6. Apply bead of urethane adhesive around body opening using caulking gun
7. Bead should be continuous with no gaps - use even pressure on caulking gun trigger
8. Bead thickness should be 3-6mm for proper bonding and waterproofing
9. Place glass into opening carefully, pressing firmly to achieve full contact
10. Use suction cups to support glass during installation and pressing

PRIMER FOR BONDING GLASS
1. Glass primer improves adhesion between urethane and glass surface
2. Apply thin coat of primer to all areas where urethane will contact glass
3. Primer drying time varies - typically 5-15 minutes depending on product
4. Do not apply glass without primer - improper cure and eventual glass failure will result
5. Body primer is also required on body pinch weld
6. For dark tinted glass, verify primer is compatible with tint
7. Allow all primers to cure completely before applying urethane

SAFE DRIVE-AWAY TIMES
1. After urethane application and glass installation, allow minimum cure time before road test
2. Most urethane adhesives require 4-8 hours before vehicle can be driven at moderate speeds
3. After 24 hours, vehicle can be driven at highway speeds
4. After 72 hours, vehicle has achieved approximately 85% cure strength
5. Full cure strength is achieved at 7 days (168 hours)
6. Extended cure time is required in cool or humid weather - allow extra time
7. Do not subject vehicle to heavy load or stress on newly bonded glass
8. Never drive vehicle with recently installed windshield at highway speeds without waiting required cure time

WEATHERSTRIP INSPECTION AND REPLACEMENT
1. Weatherstripping seals gaps around doors, windows, and trunk to prevent water and air leaks
2. Inspect all existing weatherstripping for cracks, hardening, or gaps
3. If weatherstripping is no longer sealing (visible light through gaps), replace
4. Remove old weatherstripping by peeling off carefully - use plastic tool to help remove adhesive
5. Clean contact surface with isopropyl alcohol and allow to dry completely
6. New weatherstripping has adhesive backing - remove backing slowly before application
7. Press weatherstripping firmly onto flange, working along entire length to eliminate air bubbles
8. For long weatherstrip runs, apply in sections to prevent bunching
9. Allow adhesive to cure 24 hours before closing doors/windows (if adhesive-backed)
10. For clip-on weatherstrip, ensure clips are fully engaged and weatherstrip is secure

LEAK TESTING
1. After glass and weatherstrip installation, perform water leak test
2. Use low-pressure water source (garden hose on low setting) to spray water around installations
3. Spray water onto windshield seams, door seals, and trunk seals
4. Inside vehicle, check for water leaks dripping from headliner or running down interior panels
5. Allow 2-3 minutes of water spray per area to thoroughly test seals
6. If water appears inside vehicle, identify source and reapply urethane or weatherstrip as needed
7. For minor leaks, allow urethane to cure fully (7 days) before retesting - some weeping is normal during cure
8. Do not deliver vehicle if visible water leaks inside vehicle interior
9. Document leak test results in repair record

GLASS OPERATION VERIFICATION
1. Test all windows to verify smooth operation and proper closure
2. Windows should close completely without binding or grinding
3. Verify windows align properly with weatherstrip and close completely
4. Test door closure - door should close smoothly without excessive force
5. Verify trunk or hatchback closes smoothly and latches completely
6. Check for any wind noise around newly installed glass or doors
7. If wind noise present, recheck weatherstrip installation and seating
8. Take vehicle on short test drive and verify no water leaks or wind noise during drive`,
    language: 'en'
  },
  {
    title: 'Mechanical Component Reinstallation',
    doc_type: 'procedure',
    tab_slug: 'reassembly',
    tags: ['mechanical', 'suspension', 'cooling', 'procedures'],
    content_text: `MECHANICAL COMPONENT REINSTALLATION

Procedures for reinstalling suspension components, cooling system, brake lines, and other mechanical systems.

SUSPENSION COMPONENT REINSTALLATION
1. Reinstall suspension components in reverse order of removal
2. Start with frame-mounted components: control arm bushings, suspension mounting points
3. Install wheel bearings and brake rotors/drums
4. Install shocks/struts and springs
5. Verify suspension geometry by checking ride height and alignment
6. Use jack stands to support vehicle safely - never work under vehicle supported only by jack
7. All suspension fasteners should be torqued per service manual specifications
8. For adjustable suspension components, verify adjustment settings match specification
9. After suspension work, vehicle should undergo alignment check before customer delivery
10. Test suspension by bouncing each corner of vehicle - should return to level position smoothly

COOLING SYSTEM REFILLING
1. After engine and radiator installation, verify all coolant hoses are properly connected
2. Verify heater hoses are connected to heater core
3. Verify radiator is properly mounted and not contacting other components
4. Fill radiator with appropriate coolant type - consult vehicle service manual for type
5. Typical modern coolant types: long-life (orange/pink), conventional (green), diesel-specific
6. Never mix coolant types - drain system completely before switching types
7. Fill radiator to top of radiator neck with coolant
8. Install radiator cap - verify cap is seating properly
9. For vehicles with coolant reservoir, fill to MAX line, not overfull
10. Run engine to operating temperature and verify no coolant leaks
11. Verify cooling fan operation - should activate at approximately 185-195 degrees

AC SYSTEM RECHARGE CONSIDERATIONS
1. After AC work or compressor replacement, system requires evacuation and recharge
2. Use certified AC recovery machine to recover old refrigerant
3. Evacuate system to remove moisture using vacuum pump
4. Recharge with proper refrigerant type and quantity per service manual
5. Common refrigerant: R134A for most vehicles, some newer vehicles use R1234yf
6. Never mix refrigerant types - verify all old refrigerant is removed
7. Use proper measuring scales to charge exact amount specified
8. Overcharging reduces system efficiency and can damage compressor
9. After recharge, verify system cools properly and compressor clutch engages

BRAKE LINE RECONNECTION
1. After suspension or frame work, all brake lines must be reconnected and bled
2. Verify brake lines are routed away from hot components and sharp edges
3. Reconnect brake lines to wheel cylinders or calipers using appropriate wrench
4. Tighten fittings firmly - loose fittings cause brake leaks and brake failure
5. Do not overtighten brake fittings - this can damage threads
6. Perform brake system bleeding to remove air from brake lines
7. Bleeding procedure: open wheel bleeder, press brake pedal, close bleeder, release pedal, repeat
8. Continue bleeding until clear, bubble-free fluid flows from bleeder
9. Bleed wheels in sequence: rear right, rear left, front right, front left
10. Verify brake pedal feels firm after bleeding - soft pedal indicates air still in system
11. Test brake operation before customer delivery - brakes should apply smoothly

FUEL SYSTEM COMPONENT INSTALLATION
1. After fuel tank or fuel pump replacement, verify tank is properly positioned and secured
2. Reconnect fuel supply line from tank to fuel pump/fuel rail
3. Reconnect fuel return line if equipped
4. Verify fuel line connections are tight - loose connections cause fuel leaks
5. Turn ignition to on position (do not start) to pressurize fuel system
6. Inspect fuel lines and connections for leaks
7. Never start engine with fuel leaks present - risk of fire
8. Verify fuel pump operation by listening for pump hum when ignition is on
9. Start engine and verify smooth idle and no fuel smell
10. After starting, recheck connections for leaks

HOSE AND BELT INSTALLATION
1. Verify all hoses (radiator, heater, power steering) are properly routed and connected
2. Hoses should not contact sharp edges or hot components
3. Verify hose clamps are tight - hand-tighten plus 1/4 turn with screwdriver
4. Clamps should not pinch or crush hose - inspect hose for damage
5. Install serpentine belt on proper pulley route per belt diagram (usually under hood)
6. Verify belt tension - typically 1/2 to 1 inch deflection at belt midpoint
7. Belt should not slip on pulleys during startup - indicates loose installation
8. After 24 hours operation, recheck belt tension - new belts stretch slightly`,
    language: 'en'
  },

  // ============ DETAILING & QC ============
  {
    title: 'Final Quality Control Inspection Checklist',
    doc_type: 'checklist',
    tab_slug: 'detailing-qc',
    tags: ['quality-control', 'inspection', 'checklist', 'final'],
    content_text: `FINAL QUALITY CONTROL INSPECTION CHECKLIST

Complete this comprehensive checklist before releasing repaired vehicle to customer. Vehicle must pass all items before delivery.

PAINT QUALITY INSPECTION
☐ Inspect paint surface under bright lighting for color consistency
☐ Verify no paint sags, runs, or drips visible on painted surfaces
☐ Check for orange peel texture - should have uniform appearance
☐ Inspect for dust or debris in paint - none should be visible
☐ Verify paint thickness is uniform using paint depth gauge on repaired areas
☐ Painted panels should match adjacent original paint in color and gloss
☐ Run hand over painted surface - should feel smooth with no scratches or roughness
☐ Check for water spotting or residue from cleaning - all should be clean
☐ Verify all trim lines and edges are clean with sharp transitions between colors
☐ Inspect under high-intensity lights for any imperfections, swirl marks, or overspray

PANEL GAP AND ALIGNMENT INSPECTION
☐ Measure gaps between doors and body - should be consistent (typically 2-4mm)
☐ Verify hood sits flush with fenders - no raised edges or high spots
☐ Check hood and doors close smoothly without binding or sticking
☐ Inspect for misalignment between panels - all surfaces should appear straight
☐ Verify trim strips and moldings are properly aligned and flush
☐ Inspect for any visible seams or step between repaired panel and adjacent panels
☐ Check that all panel gaps match specification within tolerance
☐ Run finger across panel seams - should feel smooth with no steps

HARDWARE AND FASTENER INSPECTION
☐ Verify all bolts and fasteners are tightened - check with wrench for tightness
☐ Inspect for missing fasteners or clips - all mounting points should have fasteners
☐ Check that fasteners are appropriate type and not corroded or damaged
☐ Verify no fastener heads are stripped or damaged
☐ Inspect for loose trim pieces or rattles - all trim should be secure
☐ Check that all fasteners are torqued to specification (verify with torque wrench if critical)
☐ Verify fastener heads are not damaged from over-torquing

ELECTRICAL SYSTEMS VERIFICATION
☐ Test all lights: headlights, fog lights, turn signals, brake lights, reverse lights
☐ Verify interior lights: dome light, reading lights, map lights all function
☐ Test power windows and door locks - all should operate smoothly
☐ Verify power mirrors adjust smoothly if equipped
☐ Test heated seats and heated mirrors if equipped
☐ Check that battery positive and negative terminals are tight
☐ Verify no dashboard warning lights remain illuminated (except brake fluid if low)
☐ Test windshield wipers and washer function at all speeds
☐ Verify no electrical shorts or parasitic draws when vehicle is off

MECHANICAL SYSTEMS VERIFICATION
☐ Check that engine starts smoothly and idles without hesitation
☐ Verify no rough idle or unusual engine noise
☐ Inspect for leaks from engine, transmission, or cooling system
☐ Check coolant level and verify no leakage
☐ Verify brake operation - brakes should apply smoothly and firmly
☐ Test power steering - steering should be smooth with no binding
☐ Verify transmission shifts smoothly through all gears
☐ Check suspension operation - no unusual noises or binding during road test
☐ Verify all fluid levels are at proper marks (coolant, oil, brake fluid, power steering)

ROAD TEST PERFORMANCE
☐ Vehicle accelerates smoothly without hesitation or vibration
☐ Braking is smooth and responsive without pulling or grabbing
☐ Steering feels responsive and vehicle tracks straight
☐ No unusual vibrations felt in steering wheel or vehicle body
☐ No unusual noises from engine, transmission, suspension, or brakes
☐ Verify air conditioning cools properly if equipped
☐ Test heater function and defrost operation
☐ Verify cruise control functions smoothly if equipped
☐ Check that door and window operation is smooth during drive`,
    language: 'en'
  },
  {
    title: 'Paint Correction and Polishing Procedures',
    doc_type: 'procedure',
    tab_slug: 'detailing-qc',
    tags: ['polishing', 'paint-correction', 'procedures', 'buffing'],
    content_text: `PAINT CORRECTION AND POLISHING PROCEDURES

Procedures for removing minor paint defects, polishing painted surfaces, and achieving professional finish on repaired areas.

COMPOUND VS POLISH SELECTION
1. Compound is aggressive abrasive used to remove defects - use for heavy scratches or oxidation
2. Polish is fine abrasive used to refine surface after compound - creates gloss
3. For light scratches and rough texture, compound is appropriate
4. For final finish and gloss enhancement, polish is appropriate
5. Do not skip compound step if defects are present - polish alone will not remove visible defects
6. For minor defects only, polish alone may be sufficient
7. Read product instructions for recommended application sequence
8. Different brands may have different recommendations - follow specific product guidance

DA POLISHER TECHNIQUE AND SETTINGS
1. DA (dual action) polisher is orbital sander with rotational and oscillating motion
2. DA polisher is safer than random orbital polisher as it is less prone to burning paint
3. Set polisher speed to 5000-6000 oscillations per minute for safe operation
4. Lower speeds for delicate paint or soft paint finishes
5. Higher speeds for harder paint or heavy compounding
6. Apply even pressure while operating - do not apply excessive downward force
7. Move polisher in overlapping passes (50% overlap) across repair area
8. Do not dwell in one spot - continuous motion prevents burning through paint
9. For edges and corners, work carefully by hand to avoid aggressive cutting
10. Entire repair area should be worked to ensure uniform finish

PAD TYPES AND MATERIAL SELECTION
1. Cutting pads are most aggressive - use for heavy compounding with coarse compound
2. Polishing pads are medium cut - use for final compounding or with Polish
3. Finishing pads are soft and fine - use for final polishing with gloss enhancer
4. Wool pads are traditional and effective - work well with compound
5. Foam pads are modern alternative - work well with polish or gloss enhancer
6. Select pad type based on product recommendation and desired cutting action
7. Verify pad is firmly attached to polisher before operation
8. Pads should be clean - wash between applications to prevent contamination

REMOVING NIBS AND DUST FROM PAINT
1. Nibs are small dust particles or paint drips that dried in paint finish
2. For isolated nibs, carefully wet sand area with 1000-2000 grit sandpaper
3. Use light pressure to avoid creating large defects while removing nib
4. After nib removal, polish area to restore gloss
5. For dust in paint, da-cut-off machine may have created dust specs
6. Light compounding or polishing will remove most minor dust specs
7. For heavy dust contamination, may require light sanding followed by polishing
8. After removing defects, verify surface is smooth before final polishing

PAINT CORRECTION WITH COMPOUND AND POLISH
1. Begin with compound application using DA polisher with cutting pad
2. Apply compound in thin layer across work area using low-speed passes first
3. Increase polisher speed gradually while monitoring paint response
4. Watch for paint residue accumulation on pad - wipe pad frequently
5. Work area until compound hazing appears across entire section
6. Allow compound residue to dry slightly (5-10 seconds) then wipe away with microfiber towel
7. Follow compound with polish using fine polishing pad
8. Apply polish and polish out area using same technique as compound
9. Finish with gloss enhancer or seal if desired
10. Final appearance should be mirror-like gloss with no scratches or defects visible

FINAL INSPECTION UNDER LIGHTS
1. After polishing, inspect paint under high-intensity work lights
2. Shine light across paint surface at shallow angle to reveal any remaining defects
3. If defects remain visible, repeat polishing sequence
4. Verify gloss is uniform across entire repaired area
5. Compare polished area to adjacent original paint - gloss should match
6. For metallic or pearl finishes, verify color and flip are even
7. Inspect for any swirl marks or scratches introduced during polishing
8. If swirls present, they can be removed with fine polish and light polishing passes
9. Final surface should appear as good or better than original factory finish

EDGE POLISHING AND DETAIL WORK
1. Edges of repair area require special attention to blend properly
2. For door edges and hidden areas, hand-polish with polish pad and compound
3. Use light pressure on edges to avoid removing paint too aggressively
4. Blend polish work into main repair area to create seamless transition
5. Edge work should not show visible line between polished and unpolished areas
6. Use small foam pad for detail work and precise edge blending
7. Final edge appearance should be smooth and gloss-matched to repair area`,
    language: 'en'
  },
  {
    title: 'Interior Detailing After Collision Repair',
    doc_type: 'procedure',
    tab_slug: 'detailing-qc',
    tags: ['interior', 'detailing', 'cleaning', 'procedures'],
    content_text: `INTERIOR DETAILING AFTER COLLISION REPAIR

Procedures for cleaning interior after repair work, removing dust and debris, and restoring vehicle interior to clean condition.

REMOVING DUST AND DEBRIS
1. Use compressed air to blow out air vents and any areas where dust accumulated during work
2. Vacuum entire interior using shop vacuum with upholstery attachment
3. Pay special attention to floor, under seats, and carpet areas
4. Vacuum all seams and crevices where dust can accumulate
5. Remove rubber floor mats and shake out loose dirt before vacuuming
6. For areas with excessive dust, use brush attachment with vacuum to loosen and remove
7. Blow out ventilation ducts with low-pressure air - do not damage vents
8. Clean inside door panels with air and soft brush to remove dust
9. Empty vacuum filter frequently during interior cleaning to maintain suction

UPHOLSTERY CLEANING
1. For cloth seats and interior panels, use upholstery cleaner appropriate for fabric type
2. Test cleaner on inconspicuous area first to verify no color fading or damage
3. For light dust and dirt, brush with soft-bristled brush then vacuum
4. For stains, apply upholstery cleaner per product instructions
5. For leather seats, use leather cleaner and conditioner - avoid excessive moisture
6. Do not saturate upholstery with water - this can cause mold and odors
7. Dry cleaned areas thoroughly with clean towels
8. Allow interior to dry completely before closing windows or sealing vehicle
9. For stubborn stains, professional detailing service may be required

DASHBOARD AND INTERIOR PANEL CARE
1. Dust dashboard and interior panels using soft microfiber cloth
2. For sticky residue or stains, use appropriate cleaner for dashboard material (plastic, vinyl, leather)
3. Do not use harsh solvents on dashboard - can damage plastic and fade paint
4. For leather steering wheel and trim, use leather cleaner and conditioner
5. Wipe all surfaces: door panels, armrests, sun visors, steering wheel
6. Clean interior mirrors and camera lenses with appropriate glass cleaner
7. Wipe down all control buttons and switches with slightly damp cloth
8. Do not spray cleaner directly on electronics - apply to cloth first then wipe
9. Allow all cleaning products to dry completely before operating vehicle

ODOR REMOVAL PROCEDURES
1. Repair shops can create odors through dust, solvents, and welding fumes
2. Ventilate interior thoroughly by opening all windows and doors for 30+ minutes
3. For persistent odors, use odor eliminator products approved for vehicle interiors
4. Activate charcoal odor bags can be left in vehicle overnight to absorb odors
5. For chemical/solvent odors, ensure booth ventilation was adequate and vehicle was not exposed excessively
6. Do not use air fresheners to mask odors - address root cause of odor
7. For musty odors after interior cleaning, ensure vehicle dries completely and ventilation system operates
8. Some odors may take 24-48 hours to dissipate - customer should be informed
9. If odors persist after detailing, may require professional odor removal service

WINDOW AND MIRROR CLEANING
1. Clean all windows inside and outside with glass cleaner and microfiber cloth
2. Do not use harsh abrasive materials that could scratch glass or tint
3. For tinted windows, use appropriate window cleaner for tinted glass
4. Clean side mirrors and rear view mirror
5. For mirrors with defrost elements, wipe gently without excessive pressure
6. Verify all windows are clean and clear of streaks before delivery
7. Dry windows completely to prevent water spots

FINAL INTERIOR INSPECTION
1. Verify all interior surfaces are clean and free of dust or debris
2. Inspect upholstery for remaining stains or spots
3. Verify no strong odors remain in vehicle
4. Check that all interior controls and switches operate smoothly
5. Verify all windows are clear and clean
6. Confirm floor mats are in place or cleaned
7. Inspect for any tools or equipment left inside vehicle during repair
8. Take photos of clean interior for documentation`,
    language: 'en'
  },
  {
    title: 'Pre-Delivery Vehicle Inspection',
    doc_type: 'procedure',
    tab_slug: 'detailing-qc',
    tags: ['pre-delivery', 'inspection', 'procedures', 'final-check'],
    content_text: `PRE-DELIVERY VEHICLE INSPECTION

Final inspection procedure before releasing vehicle to customer ensuring all repairs are complete and vehicle is safe to operate.

FLUID LEVEL VERIFICATION
1. Open hood and verify all fluid levels are at proper fill marks
2. Check engine oil dipstick - level should be between minimum and maximum marks
3. Verify coolant level in radiator (when cold) is at fill line
4. For vehicles with translucent coolant reservoir, fill to MAX line
5. Check brake fluid level - should be at minimum level or higher
6. Verify power steering fluid level if equipped
7. Check transmission fluid with engine running and transmission in neutral/park
8. Verify all fluids are appropriate type and color (no contamination)
9. For vehicles that required fluid top-off, document type and quantity added
10. If any fluid appears low or discolored, investigate and correct before delivery

TIRE PRESSURE AND CONDITION VERIFICATION
1. Check all four tire pressures using tire pressure gauge
2. Tire pressure should match vehicle specification - typically found on driver door jamb label
3. All tires should be within 2 psi of specification
4. Inspect tire tread depth - should be minimum 2/32 inches (no less)
5. Inspect tires for damage, bulges, or abnormal wear
6. Verify tire sidewalls are intact with no splits or damage
7. For new tires installed during repair, verify correct size and type installed
8. Verify spare tire is present and has adequate pressure
9. Verify lug nuts are tight - test with wrench for tightness

ALIGNMENT CHECK
1. After suspension work or frame straightening, vehicle should undergo alignment check
2. At minimum, verify vehicle tracks straight on level surface without pulling left or right
3. For repairs affecting front suspension, front-end alignment is critical
4. Take vehicle on straight section of road and verify steering is centered and stable
5. During road test, verify no pulling to left or right when brakes are applied
6. If vehicle pulls to one side, return for alignment adjustment before customer delivery
7. Ideally, use professional alignment equipment to verify wheel alignment is within specification
8. Document alignment reading for customer record

CUSTOMER WALKTHROUGH PREPARATION
1. Prepare vehicle for customer pickup by ensuring cleanliness and presentation
2. Verify all customer personal items have been removed from vehicle
3. Verify vehicle interior is clean and free of dirt or debris from repair work
4. Verify exterior is clean and free of overspray or shop dirt
5. Verify all damaged items have been addressed or noted (customer should be aware of any items not repaired)
6. Have all repair documentation organized and ready for customer review
7. Prepare brief summary of work performed and any recommendations
8. Ensure all customer contact information is current for follow-up
9. Verify vehicle keys are present and operational before customer arrives
10. Have vehicle parked in safe, visible location for customer walkthrough

SAFETY SYSTEM VERIFICATION
1. Verify brake system is functioning properly - brakes should apply smoothly and firmly
2. Test power steering operation - steering should be responsive and smooth
3. Verify all warning lights on dashboard illuminate at startup then extinguish
4. Test headlights and verify proper illumination at safe distance
5. Verify wipers and washers operate at all speeds
6. Verify horn operates properly
7. Test all seatbelts - should lock and release properly
8. Verify airbag system has no fault codes after repairs
9. Verify all interior and exterior lights function properly
10. For vehicles with safety systems (ABS, stability control), verify warning lights clear after system initialization

FINAL EXTERIOR INSPECTION
1. Inspect entire exterior for paint quality, gaps, and alignment
2. Verify no water stains or cleaning residue on painted surfaces
3. Inspect glass for cleanliness and proper seating (no water intrusion)
4. Verify all trim pieces are properly installed and secure
5. Inspect for any overspray or paint splatters on non-repaired surfaces
6. Verify all body panels are aligned properly with even gaps
7. Inspect rubber seals and weatherstripping for proper seating
8. Verify license plate and holder are properly installed
9. Inspect for any missing parts, badges, or trim pieces
10. Take photos of completed repair for documentation and customer record`,
    language: 'en'
  },
  {
    title: 'Documentation and Photo Standards',
    doc_type: 'procedure',
    tab_slug: 'detailing-qc',
    tags: ['documentation', 'photos', 'records', 'procedures'],
    content_text: `DOCUMENTATION AND PHOTO STANDARDS

Comprehensive procedure for documenting repairs with photos, creating accurate records, and maintaining warranty documentation.

BEFORE AND AFTER PHOTO REQUIREMENTS
1. Capture comprehensive before photos showing all damage areas from multiple angles
2. Take overview photos showing full vehicle and damage extent before repair begins
3. Photograph all major damage areas in close detail to show extent of damage
4. Use consistent lighting and angle for before photos (typically daylight or booth lighting)
5. Include scale or reference object in photos for damage assessment
6. After repairs, photograph same areas from same angles to show completed work
7. Take photos under bright lighting to highlight paint quality and panel alignment
8. For paint repairs, photograph under high-intensity lights to verify quality
9. Maintain consistent photo composition between before and after for comparison
10. Save all photos with organized naming system: RO#_VehicleInfo_Location_Before or After

REPAIR DOCUMENTATION REQUIREMENTS
1. Document all work performed on repair order with detailed descriptions
2. Include specific procedures used: hammer and dolly, stud pulling, body filler, etc.
3. Document all parts replaced: panels, glass, trim pieces, mechanical components
4. Record all labor hours spent on each task
5. Document any supplemental work discovered and approved during repair
6. Include photos in repair order with captions describing work
7. Record any warranty issues or customer concerns addressed
8. Document any rework or corrections required during repair process
9. Verify repair order details match actual work performed before final approval

SUPPLEMENT RECORDS FOR ADDITIONAL WORK
1. If repair reveals additional damage requiring supplemental authorization, document carefully
2. Photograph newly discovered damage before authorization approval
3. Submit supplement to insurance company with photos and detailed description
4. Upon approval, document supplement work with same detail as original repair
5. Include supplement information in final repair documentation
6. Clearly identify supplemental work vs. original estimate on final invoice

WARRANTY PAPERWORK REQUIREMENTS
1. Prepare warranty information for customer review at final walkthrough
2. Explain warranty coverage: paint (typically 12 months), structural repairs (lifetime)
3. Provide customer with written warranty terms and coverage details
4. Document any customer-requested exclusions or modifications to warranty
5. Provide contact information for warranty claims or issues
6. Explain touch-up paint availability for minor damage
7. For paintwork, provide color code and paint supplier information if customer needs touch-up
8. Ensure customer understands warranty does not cover normal wear or secondary damage
9. Provide customer copy of all repair documentation for their records

DIGITAL FILE ORGANIZATION
1. Create consistent folder structure for all repair documentation
2. Organize by repair order number, date, and vehicle information
3. Keep all photos in dedicated folder per repair order
4. Back up all repair documentation to cloud storage daily to prevent loss
5. Maintain legible copies of all repair orders and inspection reports
6. Archive completed repairs for minimum 3-7 years per legal requirements
7. Create searchable database or filing system for easy reference
8. Document any recalls or service bulletins issued for repaired vehicles

CUSTOMER COMMUNICATION DOCUMENTATION
1. Document all customer communications: phone calls, text messages, emails
2. Note dates and times of all customer contact
3. Record customer authorization for supplemental work or changes
4. Document any customer concerns or special requests
5. Take notes during final walkthrough with customer
6. Record customer feedback and satisfaction with repair quality
7. Provide customer with final invoice and repair documentation
8. Create follow-up communication plan for warranty and customer service

LEGAL AND COMPLIANCE DOCUMENTATION
1. Ensure all repair work complies with manufacturer specifications and I-CAR standards
2. Document any deviations from standard procedures with justification
3. Maintain all documentation related to safety-critical repairs (steering, brakes, suspension)
4. Keep records of all tools and equipment calibration for quality assurance
5. Document employee certifications and training credentials involved in repair
6. Maintain insurance and liability documentation for completed repairs
7. Record any incidents or accidents during repair process
8. Maintain compliance with environmental regulations for waste disposal and material handling`,
    language: 'en'
  }
];

// Split text into chunks of ~500 words for RAG
function chunkText(text, maxWords = 500) {
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';
  let wordCount = 0;

  for (const para of paragraphs) {
    const paraWords = para.trim().split(/\s+/).length;
    if (wordCount + paraWords > maxWords && current.trim()) {
      chunks.push(current.trim());
      current = '';
      wordCount = 0;
    }
    current += para + '\n\n';
    wordCount += paraWords;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length ? chunks : [text];
}

async function seedDatabase() {
  try {
    console.log('Starting database seed with body shop procedure documents...');
    console.log(`Total documents to insert: ${documents.length}\n`);

    let successCount = 0;

    for (const doc of documents) {
      const { content_text, ...docFields } = doc;

      // Insert document record
      const { data: inserted, error: docError } = await supabase
        .from('documents')
        .insert({
          title: docFields.title,
          description: content_text.slice(0, 200) + '...',
          doc_type: docFields.doc_type,
          tab_slug: docFields.tab_slug,
          tags: docFields.tags,
          language: docFields.language || 'en',
          is_active: true,
          metadata: { source: 'seed-script', seeded_at: new Date().toISOString() },
        })
        .select('id')
        .single();

      if (docError) {
        console.error(`  ✗ Failed to insert "${docFields.title}":`, docError.message);
        continue;
      }

      // Split content into chunks and insert
      const chunks = chunkText(content_text);
      const chunkRows = chunks.map((chunk, i) => ({
        document_id: inserted.id,
        chunk_index: i,
        content: chunk,
        token_count: Math.ceil(chunk.split(/\s+/).length * 1.3),
        metadata: { title: docFields.title, tab: docFields.tab_slug },
      }));

      const { error: chunkError } = await supabase
        .from('document_chunks')
        .insert(chunkRows);

      if (chunkError) {
        console.error(`  ⚠ Chunks failed for "${docFields.title}":`, chunkError.message);
      } else {
        console.log(`  ✓ ${docFields.title} (${chunks.length} chunks)`);
        successCount++;
      }
    }

    console.log(`\nSeeding complete! ${successCount}/${documents.length} documents inserted.`);
    console.log('Note: Run embeddings separately via the ingest API or a dedicated embedding script.');
    process.exit(0);
  } catch (error) {
    console.error('Unexpected error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
