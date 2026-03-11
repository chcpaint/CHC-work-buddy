-- SQL Seed File for Body Shop Wiz - PPG Documents Batch 2
-- Generated automatically from extracted PDF text
-- Documents categorized by repair process sections
-- Total documents: 72

-- Document: 200806 X-Factor Special
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    '200806 X-Factor Special',
    'X-Factor special color formula for custom and specialty applications.',
    'tech_sheet',
    'painting',
    ARRAY['unique_finishes'],
    '{"process_section": "unique-finishes", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Bulletin 576 June 2008
Special Announcement – Please read!
(cid:1)(cid:1)(cid:1)(cid:1)(cid:2)(cid:2)(cid:2)(cid:2)(cid:3)(cid:3)(cid:3)(cid:3)(cid:4)(cid:4)(cid:4)(cid:4)(cid:5)(cid:5)(cid:5)(cid:5)(cid:6)(cid:6)(cid:6)(cid:6)(cid:7)(cid:7)(cid:7)(cid:7)(cid:8)(cid:8)(cid:8)(cid:8)(cid:6)(cid:6)(cid:6)(cid:6)(cid:9)(cid:9)(cid:9)(cid:9)(cid:10)(cid:10)(cid:10)(cid:10)(cid:4)(cid:4)(cid:4)(cid:4)(cid:11)(cid:11)(cid:11)(cid:11)(cid:4)(cid:4)(cid:4)(cid:4)(cid:5)(cid:5)(cid:5)(cid:5)(cid:9)(cid:9)(cid:9)(cid:9)(cid:12)(cid:12)(cid:12)(cid:12)(cid:13)(cid:13)(cid:13)(cid:13)(cid:6)(cid:6)(cid:6)(cid:6)(cid:5)(cid:5)(cid:5)(cid:5)(cid:14)(cid:14)(cid:14)(cid:14)(cid:13)(cid:13)(cid:13)(cid:13)(cid:15)(cid:15)(cid:15)(cid:15)(cid:7)(cid:7)(cid:7)(cid:7)(cid:11)(cid:11)(cid:11)(cid:11)(cid:9)(cid:9)(cid:9)(cid:9)(cid:16)(cid:16)(cid:16)(cid:16)(cid:8)(cid:8)(cid:8)(cid:8)(cid:17)(cid:17)(cid:17)(cid:17)(cid:7)(cid:7)(cid:7)(cid:7)(cid:8)(cid:8)(cid:8)(cid:8)(cid:18)(cid:18)(cid:18)(cid:18)(cid:13)(cid:13)(cid:13)(cid:13)(cid:2)(cid:2)(cid:2)(cid:2)(cid:13)(cid:13)(cid:13)(cid:13)(cid:8)(cid:8)(cid:8)(cid:8)(cid:6)(cid:6)(cid:6)(cid:6)(cid:9)(cid:9)(cid:9)(cid:9)
Model and Year information for Specials
We are pleased to bring you a new enhancement for Specials which is available on all our color
retrieval modules beginning June 2008. Including:
Online Color Formulations
e-Fiche Color Retrieval Software
TouchMix® Basic Mixing
TouchMix® Paint Manager™
Specials are custom colors formulated to collision vehicles in the field. As requested, we will begin
to display the Model and Year information along with the formula revision date.
We will continue to add model and year information as new formulas are created. This new
information will assist the painter in making the best choice for the collision repair.
The “X” Factor
An “X” plus a number has been added to help distinguish between the formulas with the same
variant description. The following codes are examples of this change in our applications.
Chrysler PBJ Atlantic Blue
Brand Code with X factor Formula Revision Date Model / Year
BC 5819 L (X3) Lighter 01/07/2003
BC 5819 L (X12) Lighter 02/27/2004
BC 5819 L (X20) Lighter 02/03/2005 Durango 2004
Ford CX Dark Shadow Grey
2K 7AMGB (K) (X9) Coarser 11/14/2006
2K 7DVWB (K) (X10) Coarser 01/25/2007
2K 7YTNB (K) (X12) Coarser 09/10/2007 Focus 2007
Should a Special formula be identified as a popular match, the “X” factor will stay on the formula
when it is promoted to a Variant. This will help to identify the formula should it move out of the
Specials list and into the standard Variant list.
Important: New Paint System Selection Screen!
The formula selection screen has a new look. The paint system selection is now available as a
drop down list. This was done to make room for the display of more variant and special formulas.
Please review this change on the June CDs for e-Fiche, TouchMix Basic Mixing and Paint
Manager.
Enclosed are Special flyers to help you communicate this change to your customers. To receive more flyers,
part # ARFY105 can be ordered Online or go to the Color Tools section of www.PPGRefinish.com.
PPG Color Marketing
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Application Conditions
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Application Conditions',
    'Environmental and application conditions for optimal paint application.',
    'tech_sheet',
    'painting',
    ARRAY['pre_paint_considerations'],
    '{"process_section": "pre-paint-considerations", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'ENVIROBASE® HP basecoat
Application Conditions
Air movement, temperature and relative humidity are all factors that
directly impact the performance of waterborne technology. Having control
over these parameters will improve performance.
When flashing Envirobase HP basecoat the air movement over the panel
or panels should be between 200 and 350 cfm
Temperature Relative Humidity
35˚c 100%
Too hot
Poor conditions
28˚c
70%
27˚c
Ideal
22˚c
65%
21˚c
Good conditions
Good
17˚c 25%
16˚c
Too cold
12˚c
20%
Poor conditions
5%
')
) AS chunks(chunk_idx, chunk_content);


-- Document: CPCPB418 CRE-X21 Primers
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'CPCPB418 CRE-X21 Primers',
    'Application procedures and specifications for CRE-X21 primer series.',
    'other',
    'painting',
    ARRAY['primer_application', 'primer'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'CPCPB418
2.1 VOC Corrosion Resistant Epoxy Primers
CRE-121 White Epoxy Primer
CRE-X21 Series Primers
CRE-321 Gray Epoxy Primer
CRE-921 Black Epoxy Primer
CRE-2xx Tintable*
The CRE-X21 Series Primers provide a range of Features and Benefits:
performance features that include excellent adhesion ·
Capable of high film build
·
and chemical resistance and outstanding corrosion Provide excellent adhesion
·
Provide strong corrosion and chemical resistance
protection when applied over properly prepared steel ·
Are plural component capable
and aluminum. · CRE standard primers can be intermixed
·
*Tintable version is tinted with 7 ounces of H series tints
At 2.1 lbs/gal VOC as blended or when further
to create custom colors.
·
reduced with exempt solvents, this series is lead and May be used over ZNP Series zinc rich primers
chrome-free and offers high build properties. Its Associated Products:
excellent sag resistance and fill properties make this ·
CRE-121 2.1 VOC White Epoxy Primer
·
primer well suited for application over a sandblasted CRE-321 2.1 VOC Gray Epoxy Primer
·
CRE-921 2.1 VOC Black Epoxy Primer
profile. ·
CRE-2xx 2.1 VOC Tintable Epoxy Primer
·
Note: For acceptable compatibility between this primer and CRE-211H Catalyst for CRE-X21 Primers
·
Exempt Solvent: Q30 - Acetone
CPC topcoats please see the CPC Primer/Topcoat compatibility ·
Non-Exempt Solvents*: Q50 - Aromatic 100, Q60 - MEK,
chart (CPCTB01).
Q70 - MAK, Q80 - Xylene, Q160 - Aromatic 150
* Addition results in VOC greater than 2.1 lbs/gal
Physical Constants: All values are theoretical, depend on color and are Ready-to-Spray. Actual values could vary slightly due to manufacturing variability.
CRE-X21 or CRE-2xx
CRE-X21 or CRE-X21 or CRE-2xx CRE-X21 or CRE-2xx w/tint : CRE-211H : Q50,
CRE-2xx w/tint w/tint : CRE-211H w/tint : CRE-211H : Q30 Q60, Q70, Q80, Q160
Percent solids (by weight) 66.6 – 70.0 70.2 – 72.6 63.5 – 66.0 62.8 – 65.9
Percent solids (by volume) 53.4 – 56.5 60.7 – 62.8 52.0 – 53.8 52.0 – 53.8
HAPs (lbs/gallon of product) ≤ 1.1 ≤ 1.0 ≤ 1.0 ≤ 1.9
Photo-chemically reactive Yes Yes Yes Yes
CRE-X21 (Package) or CRE-X21 or CRE-2xx CRE-X21 or CRE-2xx CRE-X21 or CRE-2xx
RTS Combinations: CRE-2xx w/tint w/tint : CRE-211H w/tint : CRE-211H : Q30 w/tint : CRE-211H : Q60
Volume Ratio: As is 2 : 1 2 : 1 : 1/2 2 : 1 : 1/2
Applicable Use Category Primer Primer Primer Primer
VOC Actual 194 – 222 g/L 197 – 216 g/L 169 – 185 g/L 284 – 312 g/L
1.62 – 1.85 lbs/gal 1.65 – 1.80 lbs/gal 1.42 – 1.55 lbs/gal 2.38 – 2.61 lbs/gal
VOC Regulatory 244 – 277 g/L 229 – 249 g/L 229 – 249 g/L 321 – 352 g/L
(less water less exempt) 2.04 – 2.31 1.91 – 2.08 1.91 – 2.08 2.68 – 2.94
Density 1372 – 1461 g/L 1255 – 1315 g/L 1188 – 1239 g/L 1190 – 1253 g/L
11.45 - 12.19 lbs/gal 10.47 – 10.97 lbs/gal 9.91 – 10.34 lbs/gal 9.93 – 10.46 lbs/gal
Volatiles wt. % 30.0 – 33.4 27.4 – 29.8 34.0 – 36.4 34.1 – 37.2
Water wt. % 0.3 – 0.8 0.2 – 0.6 0.2 – 0.6 0.2 – 0.6
Exempt wt. % 15.4 – 17.8 11.4 – 13.0 19.5 – 21.1 10.2 – 11.8
Water vol. % 0.4 – 1.2 0.3 – 0.8 0.3 – 0.7 0.2 – 0.7
Exempt vol. % 17.3 – 20.8 11.5 – 13.8 24.1 – 26.1 9.9 – 11.9
Flashpoint: CRE-121 = 65°F (18°C) CRE-2xx = 65°F (18°C) Q30 = 4°F (-6°C) Q50 = 106°F (41°C)
CRE-321 = 65°F (18°C) CRE-211H = 59°F (15°C) Q60 = 21°F (6°C) Q70 = 102°F (39°C)
CRE-921 = 65°F (18°C) Q80 = 81°F (27°C) Q160 = 145°F (63°C)
Product Information Effective 04/2017
CPCPB418 Technical Data Sheet CRE-X21 Series Primers
Always check for an updated copy at www.ppgcommercialcoatings.com
CRE-X21 Series Primers
Directions for Use
Substrate Preparation:
The surface to be coated must be abraded or sandblasted and free of all contamination (including dust, dirt, oil, grease and oxidation). A chemical
treatment (or conversion coating) will improve adhesion and performance properties of the finished coat. Variability can occur with substrates, preparation,
application method or environment. We recommend that adhesion and system compatibility be checked prior to full application.
Substrate Direct to Substrate Substrate Direct to Substrate
Cold Rolled Steel Excellent Galvanized Excellent
Hot Rolled Steel Excellent A luminum Excellent
Stainless Steel Excellent Plastic / Fiberglass Surface should be free of all contamination. Because
Galvaneal Excellent of the variability of plastic/fiberglass substrates,
coating performance should be confirmed on the
actual plastic/fiberglass substrate being used.
* It is recommended that the substrate be cleaned with SSPC-SPC2 Hand Tool or SSPC-SPC3 Power Tool clean Minimum.
For best performance, a minimum blast of SSPC-SP6 (NACE#3), Commercial Blast Cleaning is recommended.
Mix Directions: Mix Directions: Thoroughly agitate component A on mechanical shaker prior to mixing.
Stir thoroughly before and occasionally during use.
Thinning: To maintain 2.1 VOC, Q30 (Acetone) or other exempt solvents may be used.
To achieve 2.8 VOC, ½ part of Non-Exempt Solvent may be used. When
applying with airless equipment reduction may not be necessary.
Blend Ratio: CRE-X21 : CRE-211H : Optional Regular or Exempt Solvent
2 : 1 : ½
Pot Life @ 77°F (25°C): 2 hours when reduced with any approved exempt or non-exempt solvent
Spray Viscosity Range: #3 Zahn = 10 – 20 seconds
Shelf Life: (each CRE-X21- 4 years in gallon containers, 2 years in 5-gallon containers
component unopened) CRE-211H Catalyst - 2 years
Application Equipment: Conventional (with or
without pressure pot): 1.4 – 1.8 mm needle/nozzle with 50 – 70 psi at the gun
HVLP (with or without
pressure pot): 1.3 – 1.6 mm needle/nozzle with 10 psi at cap or per manufacturer
Airless: 0.013 – 0.017 tip with a fluid pressure of 2000 – 2400 psi
Air-Assisted Airless: 0.013 – 0.017 tip with a fluid pressure of 1520 – 1800 psi with 25 – 30 psi air pressure
Brush or Roll: Apply blended CRE-2XX and CRE-X21 using a high quality natural bristle brush or
with a 3/8 solvent resistant nap roller, rolling in one direction. CRE may be reduced
10 – 15% with the slower evaporating Q-code solvents for ease of leveling and flow.
* Use of these solvents will result in a blended VOC greater than 2.1 lbs/gal.
Electrostatic: Minimum 1.5 mm tip with recommended reduction ratio using Q30, Q60 or Q70 solvent.
Application: Apply: 1 – 2 wet coats with a 10 – 15 minute flash between coats.
Apply only when air, product and surface temperatures are above 60°F (16°C)
and when surface temperature is at least 5°F (3°C) above the dew point.
CRE-X21 : CRE-211H CRE-X21 : CRE-211H : Exempt Solvent
Recommended Total
Wet Film Build: 3 – 13 mils 4 – 15 mils
Recommended Total
Dry Film Build: 2 – 8 mils 2 – 8 mils
Square Foot Coverage
@ 1mil no loss: 973 – 1007 sq. ft. 834 – 863 sq. ft.
(dependent on color) (dependent on color)
Dry Times: Air Dry @ 77°F (25°C) 50% RH*:
To Touch: 90 – 120 minutes
To Handle: 2 – 3 hours*
To Recoat: 1 hour – 4 days. After 4 days the primer must be sanded before recoating.
To Topcoat: 1 hour – 4 days. Medium to full wet coats should be applied.
After 4 days, the primer must be sanded before topcoating.
This CRE primer may be recoated with itself up to 2 weeks after initial
application without sanding as long as the primer remains free of contaminants.
Primed surface may be cleaned with an appropriate CFX cleaner if necessary
before topcoating.
Force Dry @ 140°F (60°C): 40 minutes at 140°F (60°C) after 15 minute flash at 77°F (25°C)
* Paint film is not fully cured for 7 days. Drying time varies, depending upon film
build, color selection, temperature, humidity and degree of air movement.
Page 2
CPCPB418 CRE-X21
CRE-X21 Series Primers
Technical Data*
Performance Properties: Complete paint system, including appropriate topcoat, dry temperature limit = 300°F (149°C).
In Service Temperature Limit If the in-service part has primer only, the color of the primer will change as you approach 300°F.
Primer integrity will be maintained up to 300°F. If the primed part has been exposed to
elevated temperatures for any extended period of time, the part must be cleaned and sanded prior
to topcoating.
Technical Properties:
BONDERITE® 1000 Test ASTM Method Results
CRE-321 Pencil Hardness D3363 F
No Topcoat Adhesion D3359 5B
Chip Resistance D3170 6
Chemical Resistance:
Chemical ASTM Method Result
Bonderite 1000 Toluene D1308 Very Slight Ring
CRE-321 10% NaOH (Sodium Hydroxide) D1308 Pass
No Topcoat 10% HCl (Hydrochloric acid) D1308 Slight gloss loss
10% HSO (Sulphuric acid) D1308 Moderate gloss loss
2 4
Gasoline D1308 Pass
Isopropanol D1308 Pass
Water** D1308 Pass
** Although resistant to intermittent exposure, this product is not recommended for immersion.
Weather Resistance:
ASTM Method Result
Salt Spray System: Salt Spray – 1000 hours B117
Blasted Hot Rolled Steel Corrosion Creep*** D1654 9A
CRE-321
Scribe Blisters D714 4F
AUE-300 Urethane
Face Blisters D714 None
*** Results based upon 4 – 5 mils DFT.
Humidity System: Humidity – 100 hours D2247
Bonderite 1000 5 Minute Recovery Adhesion D3359 5B
CRE-321 1 Hour Recovery Adhesion D3359 5B
AUE-300 Urethane
24 Hour Recovery Adhesion D3359 5B
All tests results assume proper cure and preparation of test substrates. Unless otherwise stated, all results were
obtained spraying product direct to metal on Bonderite 1000.
* The application and performance property data above are believed to be reliable based on laboratory findings.
It is for the buyer to satisfy itself on the suitability of the product for its particular use. Variation in environment,
procedures of use, or extrapolation of data may cause unsatisfactory results.
Page 3
CPCPB418 CRE-X21
CRE-X21 Series Primers
2.1 VOC Corrosion
Resistant Epoxy Primers
Safety:
These materials are designed for application only by professional, trained personnel, using proper equipment under
controlled conditions and are not intended for sale to the general public.
Safe application of paints and coatings requires knowledge of equipment, materials and individual training. Directions
and precautionary information on both equipment and products should be carefully read and strictly observed for
personal safety and property protection. Consideration must be given to eliminate conditions, which may generate
hazardous atmospheres during spray application or subject operators or bystanders to injury or illness.
Special precautions must be taken when utilizing spray equipment, particularly airless equipment. High-pressure injection
of coatings into the skin by airless equipment may cause serious injury requiring immediate medical attention at a
hospital. Treatment advice may also be obtained from Poison Centers.
Air quality should be maintained with adequate ventilation; applicators can achieve additional protection by wearing
respirators and other protective garments such as gloves and overalls. In all cases, wear protective eye equipment. During
the application of all coatings materials, all flames, welding and smoking must be prohibited. Explosion proof equipment
must be used when coating these materials in confined areas.
PRECAUTIONARY INFORMATION
Before using the products listed herein, carefully read each product label and follow directions for its use. Please read
and observe all warnings and precautionary information on all product labels. Prevent all contact with skin and eyes and
breathing of vapors and spray mist. Repeated inhalation of high vapor concentrations may cause a series of progressive
effects including irritation of the respiratory system, permanent brain and nervous system damage and possible
unconsciousness and death in poorly ventilated areas. Eye watering, headaches, nausea, dizziness and loss of coordination
are indications that solvent levels are too high. Intentional misuse by deliberately concentrating and inhaling the contents
can be harmful or fatal.
KEEP OUT OF THE REACH OF CHILDREN
MEDICAL RESPONSE
Emergency Medical or Spill Control Information (412) 434-4515; CANADA (514) 645-1320
and in MEXICO 01-800-00-21-400. Have label information available.
Safety Data Sheets (SDS) for the PPG products mentioned in this publication are available through
www.ppgcommercialcoatings.com (Safety, SDS Search) or your PPG Distributor.
For additional information regarding this product, see the SDS and LABEL information.
PPG Industries
Commercial Coatings PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
1-800-647-6050 1-888-310-4762
© 2017 PPG Industries www.ppgcommercialcoatings.com Part No. CPCPB418 04/2017
The PPG Logo is a registered trademark of PPG Industries Ohio, Inc.
Bonderite is a registered trademark of Henkel AG & Co., LGaA.
')
) AS chunks(chunk_idx, chunk_content);


-- Document: DOX440 Waterborne Gun Chart
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'DOX440 Waterborne Gun Chart',
    'Spray gun specifications and recommendations for waterborne systems.',
    'other',
    'painting',
    ARRAY['equipment_and_tools', 'waterborne', 'equipment'],
    '{"process_section": "equipment-and-tools", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Waterborne Gun Chart
Spray Gun Model Nozzle Set Coverage Coat Control Coat
(Fluid Tip Size) Pressure Pressure
Standard Condi(cid:415)ons: 68˚‐90⁰F (20⁰‐32⁰C) / 60% R.H. or less
SUPERNOVA ENTECH LS‐400‐05/1.2ETS ‐ 1.3ETS 22‐26 PSI 17‐19 PSI
LPH400‐LVX Extreme (orange cap)/1.3 16 PSI 14 PSI
W400‐LV W400LV/1.3 20 PSI 12‐14 PSI
LPH80 LPH‐80‐E4/1.2 14 PSI 10‐12 PSI
Standard to High Temp / High Humidity*: 68˚F (20⁰C) and above / 60% R.H. and above
SUPERNOVA ENTECH LS‐400‐05/1.2ET‐1.2ETS 22‐26 PSI 17‐19 PSI
LPH400‐LVX Extreme (orange cap)/1.2 16 PSI 14 PSI
W400‐LV W400LV/1.3 20 PSI 12‐14 PSI
LPH80 LPH‐80‐E4/1.2 14 PSI 10‐12 PSI
High Temp / Low Humidity*: 90⁰F (32⁰C) and Above / 30% R.H. and below
SUPERNOVA ENTECH LS‐400‐05/1.3ETS 22‐26 PSI 17‐19 PSI
LPH400‐LVX Extreme (orange cap)/1.3 16 PSI 14 PSI
W400‐LV W400LV/1.3 20 PSI 12‐14 PSI
LPH80 LPH‐80‐E4/1.2 14 PSI 10‐12 PSI
 *Refer to technical bulle(cid:415)n EHPTT for more informa(cid:415)on regarding Applica(cid:415)on in Extreme Condi(cid:415)ons.
 These recommenda(cid:415)ons are only a general reference and should be used solely as a star(cid:415)ng point.
Your par(cid:415)cular spray equipment and applica(cid:415)on technique may require slight adjustments due to
environment and size of repair.
 Spray Viscosity: 23 ‐ 28 seconds, DIN4
 All equipment was tested using “full trigger” during applica(cid:415)on with regulators approved by each gun
manufacturer.
 To meet regula(cid:415)ons in Compliant areas and EPA 6H requirements, all spray equipment should use
regulators approved by the spray gun manufacturer.
 PPG Industries does NOT endorse any par(cid:415)cular type or brand of applica(cid:415)on equipment.
The PPG logo and Envirobase are registered trademarks of PPG Industries Ohio, Inc.
Trademarks of other companies used in this document are the property of their respective owners Part # DOX440-09232016
Waterborne Gun Chart
Spray Gun Model Nozzle Set Coverage Coat Control Coat
(Fluid Tip Size) Pressure Pressure
Standard Condi(cid:415)ons: 68˚‐90⁰F (20⁰‐32⁰C) / 60% R.H. or less
Tekna® Basecoat HV20/1.2‐1.3 14‐18 PSI 14‐16 PSI
Tekna® 7E7/1.2‐1.3 18‐22 PSI 14‐16 PSI
Tekna® Pro or ProLite TE10 or TE20/1.2‐1.3 22‐26 PSI 16‐18 PSI
Tekna® Pro or ProLite HV30/1.2‐1.3 20‐24 PSI 14‐16 PSI
SRI Pro (Compliant) Trans‐Tech TS1/1.0 26‐29 PSI 16‐18 PSI
SRI Pro (HVLP) VLP‐HS1/1.0 26‐29 PSI 16‐18 PSI
Standard to High Temp / High Humidity*: 68˚F (20⁰C) and above / 60% R.H. and above
Tekna® Basecoat HV20/1.1 18‐24PSI 16‐18 PSI
Tekna® 7E7/1.2 ‐ 1.3 18‐22 PSI 14‐16 PSI
Tekna® Pro or ProLite TE20/1.2 22‐26 PSI 16‐18 PSI
Tekna® Pro or ProLite HV30/1.2 ‐ 1.3 20‐24 PSI 14‐16 PSI
SRI Pro (Compliant) Trans‐Tech TS1/1.0 26‐29 PSI 16‐18 PSI
SRI Pro (HVLP) HVLP‐HS1/1.0 26‐29 PSI 16‐18 PSI
High Temp / Low Humidity*: 90⁰F (32⁰C) and Above / 30% R.H. and below
Tekna® Basecoat HV20/1.3 14‐18 PSI 14‐16 PSI
Tekna® 7E7/1.3 18‐22 PSI 14‐16 PSI
Tekna® 909/1.3 20‐24 PSI 14‐16 PSI
Tekna® Pro or ProLite TE10 or TE20/1.3 22‐26 PSI 16‐18 PSI
SRI Pro (Compliant) Trans‐Tech TS1/1.0 26‐29 PSI 16‐18 PSI
 *Refer to technical bulle(cid:415)n EHPTT for more informa(cid:415)on regarding Applica(cid:415)on in Extreme Condi(cid:415)ons.
 These recommenda(cid:415)ons are only a general reference and should be used solely as a star(cid:415)ng point.
Your par(cid:415)cular spray equipment and applica(cid:415)on technique may require slight adjustments due to
environment and size of repair.
 Spray Viscosity: 23 ‐ 28 seconds, DIN4
 All equipment was tested using “full trigger” during applica(cid:415)on with regulators approved by each gun
manufacturer.
 To meet regula(cid:415)ons in Compliant areas and EPA 6H requirements, all spray equipment should use
regulators approved by the spray gun manufacturer.
 PPG Industries does NOT endorse any par(cid:415)cular type or brand of applica(cid:415)on equipment.
The PPG logo and Envirobase are registered trademarks of PPG Industries Ohio, Inc.
Trademarks of other companies used in this document are the property of their respective owners Part # DOX440-09232016
Waterborne Gun Chart
Spray Gun Model Nozzle Set Coverage Coat Control Coat
(Fluid Tip Size) Pressure Pressure
Standard Condi(cid:415)ons: 68˚‐90⁰F (20⁰‐32⁰C) / 60% R.H. or less
5000 HVLP WSB 22‐26 psi 16‐18 psi
4000 HVLP WSB 24‐29 psi 16‐18 psi
5000 RP 1.2W 22‐28 psi 16‐18 psi
4000 RP 1.1 / 1.2 26‐32 psi 17 psi
4400B HVLP 1.2SR 26‐29 psi 18‐22 psi
4400B RP 1.2SR 26‐29 psi 18‐22 psi
Standard to High Temp / High Humidity*: 68˚F (20⁰C) and above / 60% R.H. and above
5000 HVLP WSB 22‐26 psi 16‐18 psi
4000 HVLP WSB 24‐29 psi 16‐18 psi
4000 RP 1.1 26‐32 psi 17 psi
4400B HVLP 1.0SR 26‐29 psi 18‐22 psi
4400B RP 1.0SR 26‐29 psi 18‐22 psi
High Temp / Low Humidity*: 90⁰F (32⁰C) and Above / 30% R.H. and below
5000 HVLP WSB /1.3 26‐29 psi 16‐18 psi
4000 HVLP 1.3 22‐26 psi 16‐18 psi
4000 RP 1.2 26‐32 psi 17 psi
4400B HVLP 1.2SR 26‐29 psi 18‐22 psi
4400B RP 1.2SR 26‐29 psi 18‐22 psi
 *Refer to technical bulle(cid:415)n EHPTT for more informa(cid:415)on regarding Applica(cid:415)on in Extreme Condi(cid:415)ons.
 These recommenda(cid:415)ons are only a general reference and should be used solely as a star(cid:415)ng point.
Your par(cid:415)cular spray equipment and applica(cid:415)on technique may require slight adjustments due to
environment and size of repair.
 Spray Viscosity: 23 ‐ 28 seconds, DIN4
 All equipment was tested using “full trigger” during applica(cid:415)on with regulators approved by each gun
manufacturer.
 To meet regula(cid:415)ons in Compliant areas and EPA 6H requirements, all spray equipment should use
regulators approved by the spray gun manufacturer.
 PPG Industries does NOT endorse any par(cid:415)cular type or brand of applica(cid:415)on equipment.
The PPG logo and Envirobase are registered trademarks of PPG Industries Ohio, Inc.
Trademarks of other companies used in this document are the property of their respective owners Part # DOX440-09232016
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-115 EPW115 Speed Prime
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-115 EPW115 Speed Prime',
    '1K waterborne speed prime application guide and technical data.',
    'other',
    'painting',
    ARRAY['primer_application', 'eb-115'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
EPW115 Waterborne Speed Prime
Product Description
EPW115 Waterborne Speed Prime is a gray primer-surfacer based on the latest 1K waterborne
technology for spot and panel repair, which has been optimized for use under ENVIROBASE®
High Performance waterborne basecoat. EPW115 can be applied direct to metal without the
need for a pretreatment or etch primer and delivers an alternative to traditional urethane
primer-surfacers for collision centers that wish to be on the cutting edge of the latest refinish
technology as well as reducing VOC emissions. The simple application, along with the air dry
speed of EPW115 Waterborne Speed Prime allows sanding in as little as thirty minutes
producing a high speed, quality repair.
Preparation of Substrate:
(cid:120) Wash the area to be painted with soap and water, then clean with appropriate
PPG cleaner such as DX330, SXA330 or SWX350.
(cid:120) Sand the bare metal areas completely with 180 - 320 grit abrasive and clean.
(cid:120) Sand old finishes with 320 - 400 grit dry by hand or machine and clean.
(cid:120) Glass reinforced plastic (GRP), fiberglass and body filler 180 - 320 grit
abrasives and clean.
(cid:120) Aluminum substrates must be primed within 8 hours of sanding and cleaning.
(cid:120) Carbon steel, Galvanized and Galvaneal must be primed immediately after
sanding and cleaning.
(cid:120) EPW115 may be applied to properly prepared and cleaned bare metal.
(cid:120) For bare plastics, an appropriate PPG plastic adhesion promoter must be
applied prior to the application of EPW115. When using the ONECHOICE®
Plastic Prep system, Do Not use SU4902 Adhesion Wipe prior to applying
SU4903 or SUA4903 Advance Plastic Bond.
© 2013 PPG Industries EB-115 4/13
Application Guide:
Mixing Ratio for EPW115 Waterborne Speed Prime
EPW115 Waterborne Speed Prime 1
T494 Thinner 10% by weight (13% by volume)
(cid:120) EPW115 Waterborne Speed Prime should be thoroughly hand shaken prior to use.
Note: T492 Adjuster and T595 High Temp/Low Humidity thinner are not recommended for use with EPW115.
Note: EPW115 is reduced with T494 Thinner at 10% by weight or 13% by volume. Reduction accuracy is important,
therefore it is recommended to reduce by weight using a mixing scale. Reducing by weight is not the same as reducing
by volume. See mix table below or refer to PAINTMANAGER® for additional mixing volumes.
Pot life @ 68(cid:113)F / 20(cid:113)C 24 hours
Cumulative Mix by Weight in Parts (Grams) for EPW115 Waterborne Speed Prime
Product 4 oz. / ¼ Pint 8 oz. / ½ Pint 16 oz. / 1 Pint 32 oz. / 1 Quart 64 oz. / 2 Quart
EPW115 154.5 (137.0) 309.0 (274.0) 618.0 (548.0) 1235.9 (1095.9) 2471.8 (2191.8)
T494 170.0 (150.7) 340.0 (301.4) 679.9 (602.9) 1359.7 (1205.7) 2719.5 (2411.4)
Additives: None
Note: When used on plastic parts, EPW115 Waterborne Speed Prime does not require the use of a flexible additive.
Spray pressure:
HVLP: 10 psi at the cap
Compliant: 25 - 35 psi at the gun
Fluid Tip: 1.6 -1.9 mm
Note: For best overall results, refer to the spray gun manufacturers recommendations for optimum inlet air pressures.
Application:
Apply: 3 - 5 wet coats
Film Build: 0.8 - 1.0 mils per coat.
Apply: 3 - 5 coats
Film Build: 0.8 - 1.0 mils per coat.
When roll priming EPW115 Waterborne Speed Prime, reverse priming with a foam roller is recommended for
the smoothest application. Adjusting the thinner levels may be required to achieve best application.Just as with
spraying, drying between coats is required when rolling. This application may require additional coats to maintain
minimal film build after sanding.
Note: For optimal performance for either spray or roll application, the minimum dry film build must be 2.5 mils or
more after sanding. For film builds less than 2.5 mils, SX1071 Etch Prime must be used.
Flash off at 68ºF/20ºC:
Between Coats: Use air drying equipment, approximately 3 - 5 minutes or until dried to a matte finish.
Note: Do not use a spray gun as an air drier.
Drying Times:
Dry To Handle Immediately after flashoff once the surfacebecomesuniformly mattein appearance.
68(cid:113)F /20(cid:113)C
Dry to Sand Approximately 30 minutes after flash off of the final coat. High humidity and low
68(cid:113)F /20(cid:113)C temperature may adversely affect dry times.
Note: After sanding, EPW115 may be top coated. If the sanded primer has been allowed to stand
for more than 24 hours, it must be cleaned, lightly scuff sanded, re-cleaned prior to top coating.
IR (Infrared) Not to exceed 100°F / 38°C metal temperature
Page 2 EB-115
Compatible Topcoats:
Once sanded, EPW115 Waterborne Speed Prime may be over coated with:
ECS2x Series A Chromatic LV Sealer
ECS6x Series A Chromatic LV Sealer
ENVIROBASE® High Performance Waterborne Basecoat
DELTRON® DBC or GLOBAL REFINISH SYSTEMS® BC basecoats must be applied over an appropriate 2K urethane
sealer.
Storage and EPW115 Waterborne Speed Prime should be stored in a cool, dry place away from sources of heat.
During storage and transportation, temperature must be maintained at a minimum of 41°F or +5°C and
Handling a maximum of 120ºF or 49ºC. Avoid exposure to frost or freezing conditions.
Equipment Mixed material may be stored in an approved sealed plastic container for up to 24hrs. All spray
Cleaning: equipment should be cleaned after each use with SWX100 Waterborne Gun Cleaner.
VOC Data
RTS Combinations: EPW115 : T494
Weight Ratio: 1 : 10%
Applicable Use Category Primer
VOC Actual (g/L) 36
VOC Actual (lbs./gal) 0.30
VOC Regulatory (less water less exempt) (g/L) 86
VOC Regulatory (less water less exempt) (lbs./gal) 0.72
Density (g/L) 1283
Density (lbs./gal) 10.71
Volatiles wt. % 48.7
Water wt. % 45.9
Exempt wt. % 0.0
Water vol. % 59.1
Exempt vol. % 0.0
RTS Solids vol. % 36.05
Sq. Ft. Coverage @ 1 mil.@ 100% transfer efficiency 578
Health and Safety
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
(cid:120) The contents of this package may have to be blended with other components before the product can be
used. Before opening the packages, be sure you understand the warning messages on the labels and
MSDS’s of all the components, since the mixture will have the hazards of all its parts.
(cid:120) Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or
lack of proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
(cid:120) Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
(cid:120) Provide adequate ventilation for health and fire hazard control.
(cid:120) Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection
and proper use of respiratory protection. Be sure employees are adequately trained on the safe use of
respirators per company and regulatory requirements.
(cid:120) Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on
MSDS.
(cid:120) Always observe all applicable precautions and follow good safety and hygiene practices.
Page 3 EB-115
Emergency Medical or Spill Control Information (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale
to the general public. Products mentioned may be hazardous and should only be used according to directions, while observing
precautions and warning statements listed on label. Statements and methods described are based upon the best information and
practices known to PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as
representations or warranties as to performance, results, or fitness for any intended use, nor does PPG Industries warrant freedom from
patent infringement in the use of any formula or process set forth herein.
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor DriveUnit#6 This document was
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5 p p r o i s n t t - e c d o n u s s u in m g e 1 r 0 % 10%
1-800-647-6050 1-888-310-4762 recycled paper.
Envirobase,OneChoice,Detlron,PaintManager, Global Refinish SystemandBringing Innovation to the surface are trademarks of PPG
Industries of Ohio, Inc.
Page 4 EB-115
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-143 Envirobase HP Basecoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-143 Envirobase HP Basecoat',
    'High-performance waterborne basecoat specifications and application.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats', 'eb-143', 'basecoat'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
®
ENVIROBASE High Performance Waterborne Basecoat
Product Description
Envirobase High Performance is a premium waterborne color system for use in repair and repainting of motor
vehicles. Industry leading color capability is easily achieved when applied as part of a two or three-stage basecoat/
clearcoat paint process. Mixed Envirobase High Performance color reproduces the original OEM solid, metallic,
mica, or XIRALLIC® paint finish of virtually all OEM manufacturer''''s worldwide.
Envirobase High Performance products are engineered to reduce volatile organic compounds (VOC) and will
exceed all of today’s legislative VOC restrictions throughout the United States and Canada.
Envirobase High Performance waterborne color system is also capable of producing internal colors for under the
hood as well as interior color repair. For additional information, see Envirobase product bulletins EB145 for
internal color and EB511 for interior color.
Preparation of Substrate
Starting with original OE finishes or over recommended undercoats on new parts.
In all cases, wash all surfaces to be painted with soap and water. Final clean with an appropriate
waterborne cleaner. Ensure that the substrate is thoroughly cleaned and dried before starting
repair.
Apply Envirobase High Performance after sanding with European P800-P1200 / US 500-600
grade paper or dry sand with European P600-800 / US 500-600 grade paper.
Wash off residue and dry thoroughly before re-cleaning with appropriate waterborne substrate
cleaner. The use of a tack rag is recommended.
 Before mixing, gently hand shake bottles of the Envirobase High Performance toners for a few seconds before
use. Do not place toners or mixed color on shaker or mechanically agitate.
 Mixed Envirobase High Performance color should be thoroughly hand-stirred before application. If not used
immediately it should be hand-stirred again before use.
 Use nylon 125 micron paint filters specially designed for use with waterborne paint materials.
© 2018 PPG Industries EB-143 2/18
APPLICATION GUIDE:
Mixing Ratio: Envirobase High Performance Color 1 Part basecoat
T494/T595* Thinner 10% by volume for solid color
20% by volume for metallic / pearl color
30% by volume for tinted mid-coat color
OR
Envirobase High Performance Color 1 Part solid color
T492 Adjuster† 10% by volume of mixed color
T493 Modifier‡ (optional) 5% by volume of mixed color
Envirobase High Performance Metallic / Pearl Color 1 Part metallic / pearl color
T492 Adjuster† 10% by volume of mixed color
T493 Modifier‡ (optional) 5% by volume of mixed color
T494/T595* Thinner +10% by volume of mixed color
Envirobase High Performance Tinted Mid-Coat Color 1 Part mid-coat color
T492 Adjuster† 10% by volume of mixed color
T493 Modifier‡(optional) 5% by volume of mixed color
T494/T595* Thinner +20% by volume of mixed color
* T595 is for use in high heat, low humidity conditions only. See thinner selection guide on page 8 for additional information.
†T492 Adjuster enhances the EHP basecoat system for leading edge parts such as bumpers and fascias. It will not affect color or potlife.
DO NOT add more than 10%.
‡T493 Modifier provides EHP basecoat with the highest level of film integrity. It is recommended for vehicles that experience rough
road conditions such as sustained driving off paved roads. It will not affect color however potlife is reduced to about 1 hour. Always use
in conjunction with T492 and DO NOT exceed 5%. Reduce with T494 as needed to obtain 23-28 seconds DIN4.
Pot Life: Un-activated, 90 days stored in sealed plastic containers.
Activated, pot life is 1 hour at 70°F (21°C).
Hand stir well before using. Do Not mechanically shake.
Always strain before use (nylon 125 micron is recommended).
Additives: Reduce with T494 as needed to obtain 23-28 seconds DIN4 cup.
Spraygun Setup: Fluid Tip: 1.2 - 1.4 mm or equivalent
Spray Viscosity: 23 - 28 seconds, DIN4 at 70°F (21°C)
Spray Pressure: Color Coat Control Coat
HVLP at the air cap § §
Compliant at the spray gun § §
§Spray gun pressure will vary by manufacturer. Refer to DOX440 Waterborne Gun Setup Chart on ppgrefinish.com Envirobase /
Technical Bulletins & Product Index tab for manufacturer’s setup information.
Application: All repairs: 2 - 3 coverage coats plus control coat¶
Horizontal surfaces may benefit from two control coats. Vertical surfaces may only require one control coat.
Check vertical surfaces after first control coat and decide if a second control coat is needed.
¶A control coat is not required for solid colors.
Flash Off: Between Coats: 2 - 4 minutes with air dryers to achieve a matt finish
70°F (21°C)
Final Flash off: After control coat, allow basecoat to dry naturally. Force drying
of the control coat is not necessary.
Note: Use recommended air drying equipment, hand held blowers or wall mounted units. Do not use spray
gun for dehydrating basecoats.
Note: Temperature, humidity, air movement and film build affect dry times. The best results are achieved
with increased temperature and air movement with minimal film builds.
© 2018 PPG Industries 2 EB-143 2/18
APPLICATION GUIDE (cont’d):
Drying Times:
Dust-Free Each coat approximately 2 - 4 minutes
70°F (21°C)
Dry to Handle Approximately 15 - 20 minutes
70°F (21°C)
Dry to De-Nib: Approximately 15 - 20 minutes
70°F (21°C)
Tape Time 10 - 15 minutes
70°F (21°C)
Dry to Clear 15 minutes minimum
70°F (21°C)
IR enhanced curing is a process that requires 2 - 4 minutes of IR on basecoat prior to clearcoat being applied.
Refer to clearcoat P-Sheet for specific IR recommendations.
Overcoat/Recoat:
Overcoat with any premium compatible clearcoat. Flash off for 15 minutes or until the entire surface has a
uniform matt appearance .
Denibbing: Dry sand to remove minor dirt nibs with US 800 grit or finer
Recoat After 24 hours, an additional coat of Envirobase High
Performance basecoat must be applied prior to the clearcoat
application. The maximum recoat time is 48 hours.
BLENDING / WET BED
Mixing Ratio:
T490 Tinted Clear Additive 4 Parts
T494 / T595* Thinner 1 Part
For use as a blending additive: Add up to 1 equal part of the T490 mixture to 1 part of ready to spray
color and fade into the prepared blend panel.
For use as a wet bed: Apply 1 medium light coat of the T490 mixture to the blend panel and or the
entire repair panel and allow to dry. Wet bed will appear blue when wet but dries translucent. Once dry,
apply color.
* T595 is for use in high heat, low humidity conditions only. See thinner selection guide on page 6 for additional information.
3 STAGE PEARL PROCESS
Mixing Ratio: Ground Coat Pearl Coat
Mixed color 1 part Mixed Color 1 part
T492 (optional)† 10% T492 (optional)† 10%
T494/T595* Thinner 10%** T494/T595* Thinner 20%**
T493 Modifier‡(optional) 5% T493 Modifier‡(optional) 5%
†T492 Adjuster enhances the EHP basecoat system for leading edge parts such as bumpers and fascias. It will not affect color or potlife.
DO NOT add more than 10%.
* T595 is for use in high heat, low humidity conditions only. See thinner selection guide on page 8 for additional information.
**Note: Percentage by volume. If using T492 Adjuster, see page 2 for proper use.
‡T493 Modifier provides EHP basecoat with the highest level of film integrity. It is recommended for vehicles that experience rough
road conditions such as sustained driving off paved roads. It will not affect color however potlife is reduced to about 1 hour. Always use
in conjunction with T492 and DO NOT exceed 5%. Reduce with T494 as needed to obtain 23-28 seconds DIN4.
Pot Life: Un-activated, 90 days stored in sealed plastic containers.
Activated, pot life is 1 hour at 70°F (21°C).
Hand stir well before using. Do Not mechanically shake.
Always strain before use (nylon 125 micron is recommended).
© 2018 PPG Industries 3 EB-143 2/18
3 STAGE PEARL PROCESS (cont’d):
Spraygun Setup: Fluid Tip: 1.2 - 1.4 mm or equivalent
Spray Viscosity: 23 - 28 seconds DIN4 at 70°F (21°C)
Spray Pressure: Color Coat Control Coat
HVLP at the air cap § §
Compliant at the spray gun § §
§Spray gun pressure will vary by manufacturer. Refer to DOX440 Waterborne Gun Setup Chart on ppgrefinish.com Envirobase /
Technical Bulletins & Product Index tab for manufacturer’s setup information.
Application: Ground Coat Pearl Coat
 Apply single coats until opacity is achieved.  Reduce Pearl Coat to 30% with prior
 Flash off thoroughly between coats. recommended options
 Avoid heavy application and excessive film  Determine number of coats based on color check
builds. panel
 Use air movement equipment to dehydrate  Apply single light coats
basecoat as necessary.  Flash off thoroughly between coats.
 A control coat is not required for ground coat  Apply control coat and allow it to dry
 The pearl color layer is not designed to achieve
opacity.
Flash Off: Flash off until uniformly matt in appearance.
70°F (21°C)
Note: Use recommended air drying equipment, hand held blowers or wall mounted units. Do not use spray
gun for dehydrating basecoats.
Drying Time: Wait until ground coat is uniformly dry before Wait until pearl coat is uniformly dry before applying
applying pearl coat clearcoat, approximately 15 minutes.
Force drying of the control coat is not necessary
3 STAGE TINTED MID COAT PROCESS
Mixing Ratio: Ground Coat Tinted Mid Coat
Color 1 part Color 1 part
T492 (optional)† 10% T492 (optional)† 10%
T494/T595* Thinner 20%** T494/T595 Thinner 30%**
T493 Modifier‡(optional) 5% T493 Modifier‡(optional) 5%
†T492 Adjuster enhances the EHP basecoat system for leading edge parts such as bumpers and fascias. It will not affect color or potlife.
DO NOT add more than 10%.
* T595 is for use in high heat, low humidity conditions only. See thinner selection guide on page 8 for additional information.
**Note: Percentage by volume. If using T492 Adjuster, see page 2 for proper use.
‡T493 Modifier provides EHP basecoat with the highest level of film integrity. It is recommended for vehicles that experience rough
road conditions such as sustained driving off paved roads. It will not affect color however potlife is reduced to about 1 hour. Always use
in conjunction with T492 and DO NOT exceed 5%. Reduce with T494 as needed to obtain 23-28 seconds DIN4.
Pot Life: Un-activated, 90 days stored in sealed plastic containers.
Activated, pot life is 1 hour at 70°F (21°C).
Hand stir well before using. Do Not mechanically shake.
Always strain before use (nylon 125 micron is recommended).
Spraygun Setup: Fluid Tip: 1.2 - 1.4 mm or equivalent
Spray Viscosity: 23 - 28 seconds DIN4 at 70°F (21°C)
Spray Pressure: Color Coat Control Coat
HVLP at the air cap § §
Compliant at the spray gun § §
§Spray gun pressure will vary by manufacturer. Refer to DOX440 Waterborne Gun Setup Chart on ppgrefinish.com Envirobase /
Technical Bulletins & Product Index tab for manufacturer’s setup information.
© 2018 PPG Industries 4 EB-143 2/18
3 STAGE TINTED MID COAT PROCESS (cont’d):
Application: Ground Coat Tinted Mid Coat
 Apply single coats until opacity is achieved.  Apply single light coats based on color check
 Flash off thoroughly between coats. panels.
 Avoid heavy application and excessive film  Flash off thoroughly between coats.
builds.  The mid coat layer is not designed to give
 Use air movement equipment to dehydrate opacity.
basecoat as necessary.  Flash off the mid coat until it is uniformly dry
 A control coat is not required for ground coat before applying clearcoat, approximately 15
minutes.
 A control coat is not required for the tinted
midcoat layer.
Minor Repair Guidelines
Dirt nibs or other defects in the Envirobase High Performance paint film may be repaired as follows:
1. Allow the surface to completely flash-off.
2. Dry sand the defect with P1500/US 800 grade paper or finer or with a fine abrasive pad or in combination with a small amount of SXA330 Wax and Grease
Remover as a sanding lubricant.
3. Remove sanding dust from the surface by strong air blowing with a clean air supply
4. Tack off surface with SX1070 tack rag.
5. Re-coat the surface with Envirobase High Performance as normal.
Compatibility
Low VOC Markets National Rule Markets
Envirobase High Performance Envirobase High Performance
EPW115 Waterborne Speed Prime EPW115 Waterborne Speed Prime
ECP1x A-Chromatic Surfacer1 ECP1x A-Chromatic Surfacer1
ECS2x A-Chromatic LV Sealer ECS2x A-Chromatic LV Sealer
EC520 En-V® High Production Clearcoat ECS6x A-Chromatic Sealer
EC530 En-V Performance Clearcoat EC520 En-V High Production Clearcoat
EC550 En-V Ultra Gloss Clearcoat EC530 En-V Performance Clearcoat
EC700 Series Clearcoats EC550 En-V Ultra Gloss Clearcoat
EC800 Series Clearcoats EC700 Series Clearcoats
EC800 Series Clearcoats
ONECHOICE® OneChoice
SXA103 Aerosol MULTI-PREP™ SX103 Multi-Prep
SXA1031 Aerosol Etch Prime - Gray1 (cut throughs only) SXA1031 Aerosol Etch Prime1 (cut throughs only)
SXA1050 Aerosol Plastic Adhesion Promoter1 SX1050 Plastic Adhesion Promoter1
SX1071 ECOBASE™ 5.5 Etch Prime1 SWX350 HO-So-Clean Waterborne Pre Cleaner
2
SWX350 HO-SO-CLEAN® Waterborne Pre Cleaner Plastic Prep System2 (SU4901, SU4902, SU4903, SUA4903)
2
Plastic Prep System2 (SU4901, SUA4903) SU470LV 1K Compliant Adhesion Promoter2
SU470LV 1K Compliant Adhesion Promoter SX1056 Flexible 2K Sealer
SUA470LV 1K Compliant Adhesion Promoter (Aerosol) SX1057 Flexible 2K Surfacer
SX1060 Rollable 2K Primer Surfacer
GLOBAL REFINISH SYSTEM® Global Refinish System
D8188 Glamour LV Clearcoat D800x1 D8150 D893
D8126 CERAMICLEAR® D8115 D8126 D894
D8117 D8152
DELTRON® Deltron
DPLV Low VOC Epoxy Primer DPS305x1 K36 DC4125
NCP2801 Low VOC Primer Surfacer DPS3105 DPX8012 DCU2002
DC4010 Velocity Premium Clear LV DPLV Epoxy DC2000 DCU2021
DC4125 CeramiClear DPLF1 DC4000 DCU2042
1 For optimum performance a 2K primer and sealer must be used.
2 Must be primed or sealed.
© 2018 PPG Industries 5 EB-143 2/18
TECHNICAL DATA
Theoretical coverage (RTS), giving 12.7μm (0.5 mils) dry film thickness, 324-786 4sq. ft. per US gallon.
Percent solids by volume RTS 10.1 - 24.5%
RTS Combinations Color Color : T494/T595 Color : T494/T595 Color : T494/T595
Applicable Use Category Color Coating Color Coating Color Coating Color Coating
Ratio Packaged 1 : 10% 1 : 20% 1 : 30%
VOC Actual (g/L) 53-125 49-114 47-107 46-99
VOC Actual (lbs./ US gal.) 0.44-1.03 0.41-0.95 0.39-0.89 0.38-0.83
VOC Regulatory (g/L) 257-395 253-399 261-405 266-419
VOC Regulatory (lbs./US gal.) 2.11-3.30 2.15-3.33 2.18-3.38 2.22-3.50
Density (g/L) 993-1231 993-1209 993-1191 993-1177
Density (lbs./US gal.) 8.29-10.27 8.29-10.09 8.29-9.94 8.29-9.82
Volatiles wt. % 58.5-86.2 61.5-87.5 64.3-88.5 66.6-89.40
Water wt. % 50.7-81.0 54.2-82.5 57.3-83.8 59.9-84.9
Exempt wt. % 0.0 0.0 0.0 0.0
Water vol. % 62.5-81.1 65.7-82.6 68.4-83.9 70.6-85.0
Exempt vol. % 0.0 0.0 0.0 0.0
RTS Solids vol. % 13.1-27.0 11.9-24.5 10.9-22.5 10.1-20.8
RTS Solids wt. % 13.8-41.5 12.5-38.5 11.5-35.7 10.6-33.4
Color : T492 : Color : T492 :
RTS Combinations')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-145 Internal Repair System
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-145 Internal Repair System',
    'Internal repair system basecoat for complete color matching.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats', 'eb-145'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
Internal Repair System
PRODUCT DESCRIPTION
Envirobase High Performance Internal Repair System is designed to provide a simple repair process
where there is a specific underhood color, or where the internal area is a low gloss version of the
external color. Dedicated internal color formulas are provided as part of the PPG color retrieval system.
They are designed to match the OE finish on internal unexposed body parts.
Once converted, activated and thinned, Engine Bay Color is capable of providing an accurately
matched finish for engine bay and other unexposed areas.
PREPARATION OF SUBSTRATE
Before and after any sanding operation, the substrate must be thoroughly degreased.
Use an appropriate waterborne pre-cleaner.
Engine Bay color may be applied over e-coated panels after cleaning with a scuff pad
and waterborne Pre-Cleaner, factory finishes or PPG recommended primers after
cleaning and wet sanding with P600 - P800 grade paper or dry sanding with P360 -
P400. If there are rub throughs to bare metal, then SXA1031 Aerosol Etch Primer
should be used, followed by a light de-nibbing if needed and then tacking off before
applying.
© 2010 PPG Industries EB-145 4/10
Making Ready to Spray by weight:
Engine Bay Color 100 parts
Stir before activating and thinning
T581 Activator 1 5 parts
T494 Thinner 1 5 - 20 parts for solid colors,
2 0 parts for Aluminums / Pearls
Sprayable viscosity should be between 18-21 seconds, Din 4 cup. If necessary, a small amount of
additional thinner ( less than 5% ) may be added to improve sprayability.
Making EHP Ready To Spray From Pre Mixed EHP
.
EHP Color 70 parts/grams
T510 Converter 30 parts/grams
Stir before activating and thinning
Making Ready to Spray
Activate and thin EHP with T581 @ 15% by weight and reduce with T494 @ 20% by weight.
EHP Engine Bay Color 100 parts/grams
T581 Activator 15 parts/grams (15% by wt)
T494 Thinner 20 parts/grams (20% by wt)
The parts are CUMULATIVE.
DO NOT TARE / ZERO OUT THE SCALE BETWEEN ADDITIONS.
EHP T510 T581 T494 Approx.
Mixed Color Converter Activator Thinner Ready
to Spray
Volume
Parts Parts Parts Parts Oz.
140 200 230 270 8
280 400 460 540 16
420 600 690 810 24
560 800 920 1080 32
700 1000 1150 1350 40
840 1200 1380 1620 48
980 1400 1610 1890 56
1120 1600
© 2010 PPG Industries 2 EB-145 4/10
STIR
WELL
MIXING - Engine Bay Color ( Formulas Containing T510 Converter )
MIXING – Un-Thinned Pre Mixed EHP Color
( Formulas Not Containing T510 Converter)
1840 2160 64
Sprayable viscosity should be between 18-21 seconds, Din 4 cup. If necessary, a small amount of
additional thinner ( less than 5% ) may be added to improve sprayability.
MIXED PRODUCT DETAILS
Potlife: 1 hour at 70°F / 20°C
Spray viscosity: 18 - 21 secs DIN4 70°F / 21°C
APPLICATION:
HVLP Spraygun: 1.2 - 1.4 mm
Spray pressure: Refer to manufacturers recommendation for inlet air pressure.
Application: Apply one double coat or 2 single coats to give a dry film
thickness of 0.5 - 1.0 mils
FLASH OFF:
Between coats, blow dry for the optimum process times.
Allow 15 - 20 minutes @ 70 °F / 21° C before handling.
TECHNICAL DATA:
RTS Combinations Internal Repair Internal Repair Color: Internal Repair Color:
Color T581 : T494 T581 : T494
Applicable Use
Underbody Coating Underbody Coating Underbod y Coating
Category
Wt. Ratio: Packaged 100 : 15 : 15 100 : 15 : 20
Density (g/L) 996 - 1134 1003 - 1106 1002 - 1103
Density (lbs/gal) 8.31 – 9.46 8.37 - 9.23 8.36 - 9.20
VOC Actual (g/L) 91 - 111 113 - 128 109 - 125
VOC Actual (lbs/gal) 0.76 - .93 0.94 – 1.07 0.91 – 1.04
VOC Regulatory (g/L) 290 - 395 315 – 3.69 316 - 370
VOC Regulatory
(lbs/gal) 2.42 - 3.07 2.63 - 3.08 2.64 - 3.09
Volatiles wt.% 64.83 – 81.38 65.34 - 78.07 66.62 – 78.88
Water wt.% 55.29 – 71.83 53.84 – 66.56 55.47 – 67.73
Exempt wt.% 0 0 0
Water vol.% 62.77 – 72.30 59.68 – 67.31 61.23 – 68.46
Exempt vol. % 0 0 0
© 2010 PPG Industries 3 EB-145 4/10
Health and Safety:
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the
product can be used. Before opening the packages, be sure you understand the warning
messages on the labels and MSDS of all the components, since the mixture will have the
hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering
controls and/or lack of proper Personal Protective Equipment (PPE), may result in hazardous
conditions or injury.
• Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product MSDS and respirator manufacturer’s recommendations for
selection and proper use of respiratory protection. Be sure employees are adequately trained
on the safe use of respirators per company and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid
procedures on MSDS.
• Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information (412)434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using PPG Industries
proper equipment and are not intended for sale to the general public. Products mentioned
19699 Progress Drive
may be hazardous and should only be used according to directions, while observing
precautions and warning statements listed on label. Statements and methods described Strongsville, OH 44149
are based upon the best information and practices known to PPG Industries. Procedures
for applications mentioned are suggestions only and are not to be construed as PPG Canada Inc.
representations or warranties as to performance, results, or fitness for any intended use,
2301 Royal Windsor Drive Unit # 6
nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein. Mississauga, Ontario L5J 1K5
© 2010 PPG Industries 4 EB-145 4/10
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-200 ECS21/ECS27 A-Chromatic Sealer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-200 ECS21/ECS27 A-Chromatic Sealer',
    'A-chromatic sealer specifications and application guide.',
    'other',
    'painting',
    ARRAY['sealer_application', 'eb-200', 'sealer'],
    '{"process_section": "sealer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
ECS21 White, ECS27 Black A-Chromatic LV Sealer
SPECIAL
Product Description
A-Chromatic LV Sealers ECS21 and ECS27 are premium quality, wet on wet sealers specifically for use under
ENVIROBASE® High Performance Waterborne Basecoat.
This special product information sheet is designed to provide directions for creating A-Chromatic shades G3, G5
and G6 using only the ECS21 White and ECS27 Black sealers along with appropriate hardener and reducer.
This fast drying A-Chromatic LV sealer has superior flow properties and excellent topcoat holdout. The sealers can
be applied over un-sanded OEM e-coat, sanded original finishes and/or properly prepared and treated bare steel,
aluminum, fiberglass and plastic.
Preparation of Substrate
In all cases wash all surfaces to be painted with soap and water, then apply the appropriate
ONECHOICE® cleaner. Ensure that the substrate is thoroughly cleaned and dried both before
and after preparation work.
Original Paintwork should be sanded using European P400 / US 360 grit discs (dry) or European
P600 / US 400 grade paper (wet). Exposed metal should be spot-primed with a suitable bare
metal primer (see below).
Aluminum, Bare Steel, and Galvanized Steel must be clean, rust-free and abraded thoroughly
using European P180 / US 180 to European P280 / US 240 grit paper (wet). These substrates
must be primed with an etch primer. Additional film build over etch primers is strongly
recommended, a minimum of 1.5 mils of the A-Chromatic LV Sealer must be applied in two
coats.
Electrodeposition Primer must be thoroughly cleaned and may then be directly overcoated with
the A-Chromatic LV Sealer as a Wet-on-Wet Sealer without abrading.
Polyester Body Fillers should be dry sanded using European P280 / US 240 grit paper.
Gel Coated Fiber Glass and SMC should be dry sanded using European P280 / US 240 grit
paper.
Plastic should be dry sanded with European P600 / US 400 (use a finer grit for softer plastics)
and prime first with a Plastic Adhesion Promoter.
SPEC EB-200 11/19
APPLICATION GUIDE
Mixing Ratio
ECS2x LV Sealer: 4 Vols.
EH391 Hardener: 1 Vol.
DT1855 Reducer: 1 Vol.
Hardener Reducer
EH391 Standard Undercoat Hardener DT1855 Compliant Reducer Slow
Pot Life
1 hour at 70°F (21°C)
Additives
SLV814 Universal Flexibilizer:
Ready to Spray ECS2x LV Sealer: 10 Vols.
SLV814: 1 Vol.
Spraygun set up
Fluid Tip: 1.4 - 1.6 mm or equivalent
Spray Viscosity: 20 - 25 seconds #2 Zahn at 70°F (21°C)
Spray Pressure
HVLP at the air cap 10 psi
Compliant at the spray gun 29 - 40 psi
Note: For best overall results, refer to the spray gun manufacturer’s recommendations for optimum inlet air pressures.
Number of Coats
1 - 2 coats
Film build per wet coat: 2.5 mils
Dried film build per coat: 1.0 mils
Flash Off
70°F (21°C) Between Coats: 5 - 10 minutes
Before Baking: 5 - 10 minutes
Before topcoating: 15 minutes at 70°F (21°C) for 1 coat
30 minutes at 70°F (21°C) for 2 coats
After 72 hours, sealer must be sanded. If sanded film is below 1 mil, sealer must be reapplied.
Drying Times
Dust-Free 10 minutes
70°F (21°C)
Dry to handle 1 hour
70°F (21°C)
Tape Time 1½ hours
70°F (21°C)
IR (Infrared) 10 minutes Medium Wave
5 minutes Short Wave
Overcoat/Recoat
Envirobase High Performance 15 minutes at 70°F (21°C) for 1 coat
30 minutes at 70°F (21°C) for 2 coats
Note: After 72 hours, sealer must be sanded. If sanded film is below 1
mil, sealer must be reapplied.
Grade wet: P1000 / US 500 grade paper
Grade dry: P1000 / US 500 grade paper
2 SPEC EB-200 11/19
APPLICATION GUIDE (cont’d):
Performance Guidelines
 The use of HVLP spray equipment can give an increase in transfer efficiency of around 25% depending upon the make and
model of the equipment used.
 For all substrates except un-sanded electrodeposition primer, ensure that the surface is thoroughly sanded to the panel edge or to
a distance several centimeters beyond the damaged area, whoever is the smaller.
 Do not attempt spot repair on original or refinish thermoplastic applications, lacquer or 1K finishes.
 Partially used cans of hardener must be carefully closed.
Technical Data
Total Dry Film Build:
Minimum 25μ / 1.0 mils
Maximum 37μ / 1.5 mils
Film build per wet coat 62.5μ / 2.5 mils
Dried film build per coat 25μ / 1.0 mils
% solids by volume RTS 34.5%
Theoretical coverage* 550 sq. ft. per US gallon
*Theoretical coverage in sq. ft./ US gallon ready-to-spray (RTS), 1.0 mil dry film thickness
AChromatic Gray Mixing Chart AChromatic LV Sealer
This chart can be used to mix the A-Chromatic LV Sealer.
The G3-G6 ratios will help to achieve better hiding when used as a guide for mixing the A-Chromatic LV Sealer.
Mix Ratio By Cumulative Weight
Mix Ratio By Volume
Parts/Grams
Mix Ratio 4 oz. 6 oz. 8 oz. 12 oz. 16 oz. 20 oz. 24 oz. 32 oz.
G3
ECS21 White 120.2 180.3 240.4 360.6 480.8 601.0 721.2 961.5
ECS27 Black 133.4 200 266.7 400.1 533.5 666.8 800.2 1066.9
EH391 Undercoat Hardener 161.4 242.1 322.8 484.3 645.7 800.6 968.5 1291.3
DT1855 Compliant Reducer 191.3 286.9 382.6 573.9 765.1 948.8 1147.7 1530.3
G5
ECS21 White 96.2 144.2 192.3 288.5 384.6 480.4 576.9 769.2
ECS27 Black 133.0 199.6 266.1 399.1 532.2 665.2 798.2 1064.3
EH391 Undercoat Hardener 161.1 241.6 322.2 483.3 644.4 799.0 966.6 1288.7
DT1855 Compliant Reducer 191.0 286.4 381.9 572.9 763.8 947.2 1145.8 1527.7
G6
ECS21 White 37.4 56.1 74.8 112.2 149.9 187 224.4 299.1
ECS27 Black 132.2 198.4 264.5 396.7 529.0 661.2 793.4 1057.9
EH391 Undercoat Hardener 160.3 240.4 320.6 480.9 641.2 795.1 961.8 1282.4
DT1855Compliant Reducer 190.2 285.2 380.3 570.5 760.6 943.2 1141 1521.3
3 SPEC EB-200 11/19
Technical Data
ECS2x : EH391 : DT1855 +
ECS2x : EH391 : DT1855
SLV814
RTS Combinations 4 : 1 : 1 4 : 1 : 1+10%
Applicable Use Category Primer Primer
VOC Actual (g/L) 95 90
VOC Actual (lbs./ US gal.) 0.80 0.75
VOC Regulatory (g/L) (less water less exempt) 218 210
VOC Regulatory (lbs./ US gal.) (less water less exempt) 1.82 1.75
Density (g/L) 1372 - 1431 1359 - 1412
Density (lbs./ US gal.) 11.45 - 11.94 11.34 - 11.78
Volatiles wt. % 57.4 - 59.4 58.7 - 60.5
Water wt. % 0.0 0.0
Exempt wt. % 50.5 - 52.7 52.1 - 54.1
Water vol. % 0.0 0.0
Exempt vol. % 56.6 57.3
HEALTH AND SAFETY
See Safety Data Sheet and Labels for additional safety information and handling instructions.
 The contents of this package may have to be blended with other components before the product can be
used. Before opening the packages, be sure you understand the warning messages on the labels and
SDS of all the components, since the mixture will have the hazards of all its parts.
 Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or
lack of proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
 Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
 Provide adequate ventilation for health and fire hazard control.
 Follow company policy, product SDS and respirator manufacturer’s recommendations for selection
and proper use of respiratory protection. Be sure employees are adequately trained on the safe use of
respirators per company and regulatory requirements.
 Store waterborne and solvent borne waste separately. A competent agent with appropriate certification
must handle all waterborne wastes. Wastes must be disposed in accordance with all Federal, State,
Provincial and local laws and regulations.
 Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures
on SDS.
 Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general public.
Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements listed on label.
Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for applications mentioned are suggestions
only and are not to be construed as representations or warranties as to performance, result, or fitness for any intended use, nor does PPG Industries warrant freedom
from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
© 2019 PPG Industries, Inc. All rights reserved
The PPG Logo, Envirobase and OneChoice are registered trademarks and We protect and beautify the world is a trademark of PPG Industries Ohio, Inc.
4 SPEC EB-200 11/19
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-300 ECP35 High Production Surfacer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-300 ECP35 High Production Surfacer',
    'High-production waterborne surfacer specifications and application guide.',
    'other',
    'painting',
    ARRAY['surfacer_application', 'eb-300', 'surfacer'],
    '{"process_section": "surfacer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
ECP35 2.1 VOC High Production Surfacer
Product Description
2.1 VOC high production surfacer is a premium quality, high build, low VOC primer surfacer specifically
designed for use under ENVIROBASE® High Performance waterborne basecoat.
The ECP35 high production primer surfacer offers excellent adhesion, film build, surface leveling and gloss
holdout over a wide range of substrates. The product will be offered in medium gray. This versatile, quick
drying, easy to apply and sand primer will be applied as a primer surfacer.
Preparation of Substrate
In all cases wash all surfaces to be painted with soap and water, then apply the appropriate
ONECHOICE® cleaner. Ensure that the substrate is thoroughly cleaned and dried both
before and after preparation work.
Original Paintwork should be sanded using European P280 / US 240 grit discs (dry) or
European P360 / US320 grade paper (wet). Exposed bare metal should be spot-primed with
a suitable bare metal primer (see below).
Electrodeposition Primer must be thoroughly cleaned as outlined above. When using this
primer surfacer, abrade the electrodeposition primer as recommended in the “original
paintwork” section.
Aluminum, Bare Steel, and Galvanized Steel must be clean, rust-free and abraded
thoroughly using European P180 / US 180 to European P280 / US 240 grit paper and
primed with SX1071 OneChoice Etch Primer after sanding.
Polyester Body Fillers should be dry sanded with European P180 / US 180 followed by
European P280 / US 240 grit paper.
Gel Coated fiber glass and SMC should be dry sanded using European P280 / US 240 grit
paper.
Plastic should be dry sanded with European P600 / US 400 (use a finer grit for softer
plastics) and prime first with a Plastic Adhesion Promoter.
EB-300 03/22
APPLICATION GUIDE:
Mix Ratio:
ECP35: 4 parts
EH39x: 1 part
ECR65/ECR75/ECR85: 1 part
*Do not use ECR98
Thinner Selection Hardener Selection
ECR65: up to 29ºC (85ºF) EH391: Standard Undercoat Hardener
ECR75: 26-35ºC (80-95ºF) EH392: Slow Undercoat Hardener
ECR85: 32ºC (90ºF +)
Pot Life
45 minutes at 70°F (21°C)
Additives Flexible Parts
10% Ready to Spray ECP35 10 Vols
Universal Flexibilizer SLV814 1 Vol
Spray gun setup
4:1:1 Primer Surfacer 1.4mm or equivalent
Spray Pressure
HVLP at the air cap 10 psi
Compliant at the spray gun 29-40 psi
Note: For best overall results, refer to the spray gun manufacturer’s recommendations for optimum inlet air pressures.
Application
Apply: 2-3 wet coats
Film build per wet coat 3.5 mils
Dried film build per coat 1.5 -2.0 mils
Flash Off
70°F (21°C) Between Coats 2-3 minutes
Force Dry 10 minutes
Drying Times Primer Surfacer
Dust-free 15 minutes
70°F (21°C)
Dry to Handle 60 minutes
70°F (21°C)
Dry to Sand
Air Dry 70°F (21°C) 60 minutes
Force Dry 140°F (60°C)* 15 minutes
IR (Infrared)
Short Wave 10 minutes
Medium Wave 20 minutes
*Force dry times are quoted for metal temperature. Additional time should be allowed in the force-
drying schedule to allow metal to reach recommended temperature.
2 EB-300 03/22
APPLICATION GUIDE (cont’d):
Overcoat/Recoat Primer Surfacer
Dry to Topcoat
70°F (21°C) Immediately after sanding
140°F (60°C) 15 minutes after sanding
Grade wet European P600 / US 400 followed by European P1200 / US 600
Grade dry European P360 / US 320 followed by European P1000 / US 500
Overcoat with Envirobase High Performance basecoat
Performance Guidelines
The use of HVLP spray equipment can give an increase in transfer efficiency of around 25% depending upon the make
and model of the equipment used.
When using a primer surfacer in a spot repair, adopt the following procedures:
• Thoroughly sand the surface to the edge of the panel or to a distance several centimeters beyond the damaged area,
whichever is smaller.
• After applying the material and allowing it to dry as recommended, be careful to thoroughly level the repair edge
when sanding.
• Do not attempt spot repair on original or refinish thermoplastic applications, lacquer or 1K finishes.
Also, primer surfacer and its ancillaries are sensitive to moisture, so all equipment must be perfectly dry. Partially used
cans of hardener must be carefully closed.
Technical Data
4:1:1 Primer Surfacer
Total Dry Film Build:
Minimum after sanding 50μ / 2.0 mils
Maximum after sanding 150μ / 6.0 mils
Film build per wet coat 100μ / 4.0 mils
Dried film build per coat 37μ / 1.5 mils
*Theoretical coverage in sq. ft./ US gallon ready-to-spray (RTS), 1.0 mil dry film thickness
RTS Information
Primer Surfacer Flexible Primer Surfacer
ECP35 :
ECP35 : EH391/EH392 :
EH391/EH392 : ECR65/75/85
ECR65/75/85 +
SLV814
RTS Combinations 4 : 1 : 1 4 : 1 : 1+10%
Applicable Use Category Primer Primer (Specialty)
VOC Actual (g/L) 108-111 102-104
VOC Actual (lbs./ US gal.) 0.90-0.93 0.85-0.87
VOC Regulatory (g/L) (less water less
205-211 200-205
exempt)
VOC Regulatory (lbs./ US gal.) (less
1.71-1.76 1.67-1.71
water less exempt)
Density (g/L) 1472-1479 1450-1456
Density (lbs./ US gal.) 12.28-12.34 12.10-12.15
Volatiles wt. % 46.0-46.2 48.1-48.2
Water wt. % 0.0 0.0
Exempt wt. % 38.5-38.6 41.0-41.1
Water vol. % 0.0 0.0
Exempt vol. % 47.2-47.4 48.7-48.9
Solids vol.% 39.7 38.9
Solids wt.% 53.9-54.0 51.8-51.9
Sq. Ft. Coverage at 1 mil. at 100%
637 624
transfer efficiency
3 EB-300 03/22
HEALTH AND SAFETY
See Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the
product can be used. Before opening the packages, be sure you understand the warning
messages on the labels and SDS of all the components, since the mixture will have the
hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering
controls and/or lack of proper Personal Protective Equipment (PPE), may result in hazardous
conditions or injury.
• Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product SDS and respirator manufacturer’s recommendations for
selection and proper use of respiratory protection. Be sure employees are adequately trained
on the safe use of respirators per company and regulatory requirements.
• Store waterborne and solvent borne waste separately. A competent agent with appropriate
certification must handle all waterborne wastes. Wastes must be disposed in accordance with
all Federal, State, Provincial and local laws and regulations.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid
procedures on SDS.
• Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general
public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements
listed on label. Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for
applications mentioned are suggestions only and are not to be construed as representations or warranties as to performance, result, or fitness for any
intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG automotive refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
The PPG Logo, Envirobase, OneChoice and We protect and beautify the world are registered trademarks, and the Multiple Cubes Geometric Design is a trademark of PPG
Industries Ohio, Inc. © 2021 PPG Industries, Inc. All rights reserved.
4 EB-300 03/22
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-511 Interior Color Repair
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-511 Interior Color Repair',
    'Interior repair system for spot and panel repair applications.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats', 'eb-511'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
Interior Color Repair System
PRODUCT DESCRIPTION
Envirobase High Performance Interior Color System is designed to provide a simple refinishing process
for interior plastics. Dedicated interior colors are provided as part of the PPG Paint Manager® formula
retrieval system or by accessing the PPG On-line Color system.
Envirobase High Performance Interior Color System colors are formulated with the same mixing tinters
used for external basecoat colors. Once converted, activated and thinned, Envirobase High Performance
Interior color is capable of providing an accurately matched finish to the OE finish on interior plastic body
parts.
PREPARATION OF SUBSTRATE
Before and after any sanding operation, the substrate must be thoroughly cleaned and
degreased by using SWX350 H O-So-Clean™ Waterborne Pre-Cleaner. Apply liberally
2
with a clean cloth and wipe dry with another. Be sure to wipe the cleaner off completely
and do not let it dry on the surface
Envirobase High Performance Interior color may be applied over most automotive
interior plastics after cleaning with SWX350 and lightly abrading with a fine gray scuff
pad followed by a final cleaning with SWX350.
© 2010 PPG Industries EB-511 3/10
Making Ready to Spray by weight:
EHP Interior Color 100 parts
Stir before activating and thinning
T584 Interior Activator 1 5 p a r t s
T494 Thinner 1 5 - 20 parts
Sprayable viscosity should be between 18-21 seconds, Din 4 cup. If necessary, a small amount of
additional thinner ( less than 5% ) may be added to improve sprayability.
Making EHP Ready To Spray From Pre Mixed EHP Basecoat Color
.
EHP Basecoat Color 70 parts/grams
T511 Converter 30 parts/grams
Stir before activating and thinning
Making Ready to Spray
Activate and thin EHP with T584 @ 15% by weight and reduce with T494 @ 20% by weight.
Converted EHP Interior Color 100 parts/grams
T584 Interior Activator 15 parts/grams (15% by wt)
T494 Thinner 20 parts/grams (20% by wt)
The parts are CUMULATIVE.
DO NOT TARE / ZERO OUT THE SCALE BETWEEN ADDITIONS.
EHP T511 T584 T494 Approx.
Mixed Color Converter Activator Thinner Ready
to Spray
Volume
Parts Parts Parts Parts oz.
70 100 115 135 4 oz.
140 200 230 270 8 oz.
280 400 460 540 16 oz
420 600 690 810 24 oz
560 800 920 1080 32 oz
700 1000 1150 1350 40 oz
840 1200
© 2010 PPG Industries 2 EB-511 3/10
STIR
WELL
MIXING – EHP Interior Color ( Formulas Containing T511 Interior
Converter )
MIXING – Un-Thinned Pre Mixed EHP Color
( Formulas Not Containing T511 Interior Converter)
1380 1620 48 oz
Sprayable viscosity should be between 18-21 seconds, Din 4 cup. If necessary, a small amount of
additional thinner ( less than 5% ) may be added to improve sprayability.
MIXED PRODUCT DETAILS
Potlife: 1 hour at 70°F / 20°C
Spray viscosity: 18 - 21 secs DIN4 70°F / 21°C
APPLICATION:
HVLP Spraygun: 1.2 - 1.4 mm
Spray pressure: Refer to manufacturers recommendation for inlet air pressure.
Application: Apply two to three single light coats to give a dry film
thickness of 0.5 - 1.0 mils
FLASH OFF:
Blow dry between coats for optimum process times. After the final
coat, allow 15 - 20 minutes @ 70 °F / 21° C before handling.
TECHNICAL DATA:
RTS Combinations Interior Color Interior Color: Interior Color:
T584 : T494 T584 : T494
Applicable Use
Single Stage Coating Single Stage Coating Single Stag e Coating
Category
Wt. Ratio: Packaged 100 : 15 : 15 100 : 15 : 20
Density (g/L) 997 - 1153 1005 - 1124 1006 - 1120
Density (lbs/gal) 8.31 – 9.61 8.38 - 9.37 8.38 - 9.33
VOC Actual (g/L) 84 - 101 100 - 113 96 – 109
VOC Actual (lbs/gal) 0.70 - .84 0.83 – .94 0.80 – .91
VOC Regulatory (g/L) 265 - 346 281 – 335 282 – 336
VOC Regulatory
(lbs/gal) 2.21 – 2.88 2.34 – 2.79 2.35 – 2.80
Volatiles wt.% 63.57 – 82.30 63.61 - 78.05 64.96 – 78.86
Water wt.% 55.20 – 73.93 53.77 – 68.17 55.41 – 69.20
Exempt wt.% 0 0 0
Water vol.% 63.68 – 73.73 60.47 – 68.62 62.02 – 69.64
Exempt vol. % 0 0 0
© 2010 PPG Industries 3 EB-511 3/10
Health and Safety:
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the
product can be used. Before opening the packages, be sure you understand the warning
messages on the labels and MSDS of all the components, since the mixture will have the
hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering
controls and/or lack of proper Personal Protective Equipment (PPE), may result in hazardous
conditions or injury.
• Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product MSDS and respirator manufacturer’s recommendations for
selection and proper use of respiratory protection. Be sure employees are adequately trained
on the safe use of respirators per company and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid
procedures on MSDS.
• Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information (412)434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using PPG Industries
proper equipment and are not intended for sale to the general public. Products mentioned
19699 Progress Drive
may be hazardous and should only be used according to directions, while observing
precautions and warning statements listed on label. Statements and methods described Strongsville, OH 44149
are based upon the best information and practices known to PPG Industries. Procedures
for applications mentioned are suggestions only and are not to be construed as PPG Canada Inc.
representations or warranties as to performance, results, or fitness for any intended use,
2301 Royal Windsor Drive Unit # 6
nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein. Mississauga, Ontario L5J 1K5
© 2010 PPG Industries 4 EB-511 3/10
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-520 EC520 High Production Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-520 EC520 High Production Clearcoat',
    'High-production clearcoat specifications and application guide.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'eb-520', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
®
EC520 En-V High Production Clearcoat
Product Description
EC520 En-V High Production Clearcoat is engineered specifically for use with ENVIROBASE®
High Performance Waterborne Basecoat and available for use in any market throughout North America.
This clearcoat utilizes the En-V Resin technology to meet the throughput demands of any shop while
delivering a premium appearance and excellent gloss retention. EC520 is ideal for 1-4 panel repairs with
ease of application built into the design, consistent with the characteristics of every En-V clearcoat.
Preparation of Substrate
 Wash all surfaces to be painted with soap and water, then apply the appropriate
ONECHOICE®, GLOBAL REFINISH SYSTEM® or DELTRON® cleaner. Ensure
that the substrate is thoroughly cleaned and dried both before and after application
work.
 Wet sand with US 500 - 600 / European P800 - P1200 grade paper or dry sanding
with US 400 - 500 / European P600 - P800 grade paper.
 Wash off residue and dry thoroughly before re-cleaning with appropriate cleaner.
The use of a SX1070 OneChoice tack rag is recommended.
© 2017 PPG Industries EB-520 08/17
APPLICATION GUIDE:
Mixing Ratio for EC520 En-V High Production Clearcoat
EC520: 3 parts
ECH5075: 1 part
ECRxx: 1 part
Usable Pot Life at 70°F (21°C): 45 minutes
Hardener: Reducer:
ECH5075 Standard Hardener ECR75 Mid Temp Reducer
ECR85 High Temp Reducer
ECR98 Hot and Humid Ultra High Temp Reducer
See reducer selection guide on page 4 for additional information
Optional Additives:
SLV814 Universal Flexibilizer: add 10% to RTS volume
SL93LV Accelerator add 2% to RTS volume
SLV73 Fisheye Eliminator: add 1 oz. to RTS quart
SLV814 Universal Flexibilizer is recommended not required for plastic parts
Spray Gun Set-up and Pressure:
Fluid Tip: 1.2 - 1.4 mm
Spray Viscosity: 14 - 15 secs DIN4 at 70°F (21°C)
HVLP: 10 maximum psi at the cap
Compliant: 29 - 40 psi at the gun
Note: Refer to the spray gun manufacturer’s recommendations for optimum inlet air pressures. Spray Gun setups
recommendations are also listed in DOX440, available in PAINTMANAGER® program or at ppgrefinish.com
Application:
Apply: 2 medium wet coats.
Film Build:
Minimum dry film build: 2.0 mils
Maximum dry film build: 3.5 mils
Recommended wet film build per coat: 2.0 - 2.5 mils
Recommended dry film build per coat: 1.0 - 1.5 mils
Flash Off at 70°F (21°C):
Flash: 5 minutes between coats
Drying Times:
Dust-free:
70°F (21°C) 30 - 35 minutes
Air Dry to Re-assemble*:
70°F (21°C) 1.5 - 2 hours
Force Dry:*
120°F (49°C) 20 minutes
140°F (60°C) 15 minutes - minimize metal temperatures exceeding 140°F (60°C)
Tape Time: 3 - 4 hours 70°F (21°C)
IR (Infrared): NA
2
© 2017 PPG Industries EB-520 08/17
Overcoat / Recoat / Polishing:
Overcoat/Recoat Time: 2 - 4 hours at 70°F (21°C) air dry or after force dry for 20 minutes at 120°F (49°C) metal
temperature and cool down for one hour. EC520 must be sanded before recoating with
primer, color or clear.
Grade wet: US 500-600 / European P800-P1200
Grade dry: US 400-500 / European P600-P800
Overcoat with: Envirobase High Performance primer, color or clear
Polishing: Polishing is not normally required. However, to remove minor dirt nibs, sand with P1500
or finer and follow normal polishing procedures. After 2 hours air dry or after force dry
and cool down cycle.
Performance Guidelines:
Allow basecoat to thoroughly dry before applying EC520 En-V High Production Clearcoat. If allowed to dry longer than 24 hours, additional
basecoat must be applied before clearcoating. The timing will depend on film thickness, temperature and humidity.
Technical Data:
EC520: ECH5075 :
EC520 : ECH5075 : EC520 : ECH5075 :
EC520 : ECH5075 : ECRxx + SLV73
RTS Combinations ECRxx + SLV814 ECRxx + SL93LV
ECRxx Fisheye
Flex Additive Accelerator
Eliminator
Clear Coating
Applicable Use Category Clear Coating Clear Coating Clear Coating
(Flexed)
Weight Ratio: 3 : 1 : 1 3 : 1 : 1 +10% 3 : 1 : 1 +2% 3: 1 : 1 + 1 oz. RTS qt.
VOC Actual (g/L) 151 - 153 144 - 145 149 - 152 147 - 150
VOC Actual (lbs./ US gal.) 1.26 - 1.28 1.20 - 1.21 1.24 - 1.27 1.23 - 1.25
VOC Regulatory (less water, less exempt (g/L) 243 - 248 238 - 242 244 - 249 243 - 248
VOC Regulatory (less water, less exempt (lbs./
2.03 - 2.07 1.99 - 2.02 2.04 - 2.08 2.03 - 2.07
US gal.)
Density (g/L) 1,117 - 1,122 1,125 - 1,129 1,121 - 1,126 1,119 - 1,123
Density (lbs./ US gal) 9.32 - 9.36 9.39 - 9.42 9.36 - 9.40 9.34 - 9.37
Volatiles wt.% 56.0 - 56.1 57.4 - 57.5 57.0 - 57.2 57.1 - 57.2
Water wt.% 0.0 0.0 0.0 0
Exempt wt.% 42.2 - 42.4 44.6 - 44.7 43.4 - 43.7 43.8 - 43.9
Water vol.% 0.0 0.0 0.0 0
Exempt vol.% 38.0 - 38.1 39.9 - 40.1 38.8 - 39.1 39.4 - 39.6
RTS Solids vol.% 43.9 43.0 43.2 - 43.3 42.9
RTS Solids wt.% 43.9 - 44.0 42.5 - 42.6 42.8 - 43.1 42.8 - 43.0
Sq. Ft. Coverage at 1 mil. at 100% transfer
704 690 693 - 695 688
efficiency
3
© 2017 PPG Industries EB-520 08/17
EC520 En-V High Production Clearcoat Reducer Selection Guide
Higher Air Movement
Temperature and Humidity
(Larger)
Average Air Flow & Humidity
12,000-24,000 CFM - 30%-90% RH
Lower Air Movement
Temperature and Humidity
(Smaller)
For Repairs greater than 3 panels consider using the next higher temperature reducer
Temperature, Air Flow, Humidity and Size of the Repair will affect Reducer selection
HEALTH AND SAFETY
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
 The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and MSDS of all the
components, since the mixture will have the hazards of all its parts.
 Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
 Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
 Provide adequate ventilation for health and fire hazard control.
 Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per company
and regulatory requirements.
 Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on MSDS.
 Store waterborne and solvent borne waste separately. A competent agent with appropriate certification must
handle all waterborne wastes. Wastes must be disposed in accordance with all Federal, State, Provincial and local
laws and regulations.
 Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general public. Products mentioned may be
hazardous and should only be used according to directions, while observing precautions and warning statements listed on label. Statements and methods described are based upon the best
information and practices known to PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to
performance, result, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
The PPG Logo, We protect and beautify the world, Envirobase, En-V, Deltron, OneChoice, Global Refinish System and PaintManager are trademarks of PPG
Industries Ohio, Inc.
4
© 2017 PPG Industries EB-520 08/17
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-530 EC530 Performance Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-530 EC530 Performance Clearcoat',
    'Performance clearcoat with enhanced durability and gloss.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'eb-530', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
™
EC530 EN-V Performance Clearcoat
Product Description
EC530 is a high gloss 2.1 VOC performance clearcoat designed specifically for use with
ENVIROBASE® High Performance Waterborne Basecoat. This clearcoat reduces cycle times while
maintaining the quality and appearance required by high production shops. From an environmental
standpoint, the low 2.1 VOC of EC530 clearcoat along with the high solids resin also decreases clearcoat
material usage and therefore greatly reduces the overall VOC emissions and is compliant in all refinish
markets.
Preparation of Substrate:
In all cases, wash all surfaces to be painted with soap and water, then use the appropriate
ONECHOICE®, GLOBAL REFINISH SYSTEM® or DELTRON® cleaner. Ensure that the
substrate is thoroughly cleaned and dried both before and after application work.
Wet sand with U.S. 500 - 600 / European P800 - 1200 grade paper or dry sanding with
U.S. 400-500 / European P600-800 grade paper.
Wash off residue and dry thoroughly before re-cleaning with appropriate OneChoice,
Global Refinish System or Deltron cleaner. The use of a SX1070 OneChoice Tack Rag
is recommended.
© 2014 PPG Industries EB-530 8/14
1
APPPLICATION GGUIDE:
Mixxing Ratio
EC530 3 PParts
ECHH5075 1 PPart
ECRRxx 1 PPart
Sprrayable Pot life 2 hhours @ 70°F / 211°C
Harrdener Reeducer
ECHH5075 Standard Haardener ECCR65 Low Temp RReducer ( 65 - 75°°F / 18 - 24°C )
ECCR75 Mid Temp RReducer ( 70 - 80°FF / 21 - 26°C )
ECCR85 High Temp RReducer ( 80 - 95°°F / 27 - 35°C )
ECCR95 Ultra High TTemp Reducer ( 90°F+ / 32°C+ )
Seee reducer selectionn guide on page 44 for additional innformation.
Opttional Addittives:
SLV8144
EC530 ECH5075 ECRxx SLV814
3 1 1 + ¼ up to ½ part to RTS qt.
SLV73
EC530 ECH5075 ECRxx SLV73
3 1 1 + 11 oz. to RTS qt.
SLV898
EC530 ECH5075 ECRxx SLV898
3 1 1 + 5% to RTS qt.
When EEC530 is used on pplastic parts, the adddition of SLV8144 Universal flexibllizer is not requireed. For very flexibble or leading edgee parts, the
additionn of SLV814 will iimprove overall fllexibility.
Sprray gun set-uup:
Fluid TTip 11.3 - 1.5
Spray VViscosity 116 secs, DIN 4 @ 770°F / 21°C
Sprray pressure:
HVLP 110 psi at the cap
Compliiant 229 - 40 psi at the guun*
*Refer to the manufactureer’s gun recommenndations for inlet aair pressures
Nummber of coatts:
Apply 22 medium wet coaats
Filmm build:
Minimuum Dry 2.0 mils
Maximuum Dry 3.5 mils
Recommmended film buildd per coat wet 2.0 - 2.5 mills
Recommmended film buildd per coat dry 1.0 - 1.5 mills
Flassh off at 70ºFF/21ºC:
3 - 5 miinutes between coaats
Dryying Times:
Dust-free
330 - 40 minutes
70°F / 221°C
Air Dryy to Re-assemble*
33 - 4 hour
70°F / 221°C
Force DDry* 225 minutes @ 140ººF / 60ºC
Tape Tiime
33 - 4 hours
70°F / 221°C
IR (Infrrared) NN/A
*For in-Service deliverry at low temperatuures (below 60°F // 16°C) or inclemeent weather condittions, allow EC5300 a minimum of 4 hours air dry at shhop
tempperature (above 600°F / 16°C or abovve) or bake for 25 minutes @ 140°F / 60°C metal temmperature and cool for one hour priorr to putting into seervice.
2
Overcoat / Recoat / Polishing
6 - 8 hours at 70°F / 21°C air dry or after force dry for 25 minutes
Overcoat / Recoat time @ 140°F / 60°C metal temperature and cool down for one hour.
EC530 must be sanded before recoating with primer, color or clear.
Grade wet U.S. 500 - 600 / European P800 - 1200
Grade dry U.S. 400 - 500 / European P600 - 800
Overcoat with Envirobase High Performance Basecoat, primer, sealer or clear.
Air dry: 4 - 5 hours Polishing is not normally required. If, however, polishing is required to remove minor dirt
Force cure: After cool down nibs, sand with P1500 or finer and follow normal polishing procedures.
Performance Guidelines
Allow basecoat to thoroughly dry before applying EC530 clearcoat. If allowed to dry longer than 24 hours, additional basecoat must be applied before
clearcoating. The timing will depend on film thickness, temperature and humidity.
Fading Out EC530
After spot repairing, Use OneChoice SLV840 or SXA840 Uniform Finish Blender and apply starting from the outside of the repair moving towards the center of
the repaired area to lose the clearcoat blend edge.
Technical Data
EC530 : ECH5075 : ECRxx EC530 : ECH5075 : ECRxx + EC530 : ECH5075 :
RTS Combinations: SLV898 ECRxx + SLV814
Volume Ratio: 3 : 1 : 1 3 : 1 : 1 + 5 % 3 : 1 : 1 + up to 1/2
Clear Coating
Applicable Use Category Clear Coating Clear Coating
(flexed)
VOC Actual (g/L) 132 - 137 126 - 128 125 - 128
VOC Actual (lbs/gal) 1.10 - 1.14 1.05 - 1.07 1.04 - 1.07
VOC Regulatory (less water less exempt) (g/l) 225 - 232 225 - 230 219 - 226
VOC Regulatory (less water less exempt) (lbs/gal) 1.88 - 1.94 1.88 - 1.92 1.83 - 1.89
Density (g/L) 1154 - 1158 1162 - 1166 1160 - 1165
Density (lbs/gal) 9.63 - 9.66 9.70 - 9.73 9.68 - 9.72
Volatiles wt.% 57.7 - 58.3 60.3 - 60.5 59.2 - 59.8
Water wt. % 0.0 0.0 0.0
Exempt wt. % 46.0 - 46.7 49.4 - 49.6 48.3 - 48.9
Water vol. % 0.0 0.0 0.0
Exempt vol. % 40.9 - 41.6 44.0 - 44.3 43.0 - 43.7
Solids vol. % 42.8 - 43.1 40.7 - 41.0 41.7 - 42.0
Sq. Ft. Coverage / U.S.gal. 1 mil. @ 100% transfer efficiency 687 - 691 653 - 658 669 - 674
Health and Safety
See Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and SDS’s of all the
components, since the mixture will have the hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
• Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product SDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per
company and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on SDS.
• Always observe all applicable precautions and follow good safety and hygiene practices.
3
HHealth and Saafety (cont.)
EEmergency Meedical or Spill Control Informmation (412) 434-4515; In Caanada (514) 6445-1320
MMaterials described are designed for aapplication by proffessional, trained ppersonnel using prrooper equipment annd are not intendedd for sale to the geeneral public.
Prroducts mentionedd may be hazardouss and should only be used accordingg to directions, whiile observing precaautions and warninng statements listeed on label.
Sttatements and methhods described aree based upon the best information annd practices knownn to PPG Industriees. Procedures for applications menttioned are
suuggestions only andd are not to be connstrued as represenntations or warrantties as to performaance, results, or fitnness for any intendded use, nor does PPPG
Inndustries warrant frreedom from patennt infringement in the use of any formmula or process seet forth herein.
PPPG Auutomotivve Refinnish
PPPG Industriess PPG Canadda Inc.
119699 Progresss Drive 2301 Royall Windsor Drivee Unit #6
SStrongsville, OHH 44149 Mississauga, Ontario L5J 1K5
11-800-647-60500 1-888-310-44762
PPPG logo, Bringing innovation to the surface, Envirobbase, Global Refinnish System, Delttron, OneChoice aand are trademarkks of PPG Industrries Ohio, Inc.
4
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-550 EC550 Ultra Gloss Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-550 EC550 Ultra Gloss Clearcoat',
    'Ultra gloss clearcoat for premium appearance and protection.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'eb-550', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
- ®
EC550 En V Ultra Gloss Clearcoat
Product Description
The EC550 is a high gloss overall clearcoat designed specifically for use with ENVIROBASE® High
Performance Waterborne Basecoat. EC550 has outstanding appearance and gloss retention and is ideal for
high temperature and/or large job application. This premium clearcoat continues the easy to apply
characteristics of the En-V clearcoat platform and provides a robust application window under extreme
conditions.
Preparation of Substrate
• Wash all surfaces to be painted with soap and water, then apply the appropriate
ONECHOICE®, GLOBAL REFINISH SYSTEM™ or DELTRON® cleaner. Ensure
that the substrate is thoroughly cleaned and dried both before and after application
work.
• Wet sand with US 500-600 / European P800-P1200 grade paper or dry sanding with
US 400-500 / European P600-P800 grade paper.
• Wash off residue and dry thoroughly before re-cleaning with appropriate
OneChoice, Global Refinish System or Deltron substrate cleaner. The use of a
SX1070 OneChoice tack rag is recommended.
© 2016 PPG Industries EB-550 06/16
APPLICATION GUIDE:
Mixing Ratio for EC550
EC550: 3 parts
ECH5075: 1 part
ECRxx: 1 part
Usable Pot Life at 70°F (21°C): 2 hours
Hardener: Reducer:
ECH5075 Standard Hardener ECR65 Low Temp Reducer 65-75°F (18-24°C)
ECR75 Mid Temp Reducer 70-80°F (21-26°C)
ECR85 High Temp Reducer 80-95°F (27-35°C)
ECR98 Hot and Humid Ultra High Temp Reducer 90°F (32°C) and above
See reducer selection guide on page 4 for additional information
Optional Additives:
SLV814 Universal Flexibilizer: add 10% to RTS volume
SLV73 Fisheye Eliminator: add 1 oz. to RTS quart
SLV898 Low VOC Retarder: add 5% to RTS quart
EA10 Compliant Accelerator add 5% to RTS quart
When EC550 is used on plastic parts, the addition of SLV814 Universal Flexibilizer is recommended, not required.
Spraygun Set-up and Pressure:
Fluid Tip: 1.3-1.5 mm
Spray Viscosity: 15 secs DIN4 at 70°F (21°C)
HVLP: 10 maximum psi at the cap
Compliant: Refer to spray gun manufacturer recommendations
Note: For best overall results, refer to the spray gun manufacturer’s recommendations for optimum inlet air
pressures.
Application:
Apply: 2 medium wet coats
Film Build:
Minimum Dry Film Build: 2.0 mils
Maximum Dry Film Build: 3.5 mils
Recommended film build per coat wet: 2.0-2.5 mils
Recommended film build per coat dry: 1.0-1.5 mils
Drying Times:
Flash: 10-15 minutes between coats
70°F (21°C)
Air Dry to Re-assemble*: Overnight
70°F (21°C)
Purge Time: 10-15 minutes
Force Dry:* 35 minutes
140°F (60°C)
Tape Time: Overnight
70°F (21°C)
IR (Infrared): N/A
*For in-service delivery at low temperatures (below 60°F/16°C) or inclement weather conditions, bake for 35 minutes at 140°F/60°C
metal temperature and cool for one hour prior to putting into service.
© 2016 PPG Industries 2 EB-550 06/16
Overcoat / Recoat / Polishing:
Overcoat/Recoat Time: After force dry for 35 minutes at 140°F (60°C) metal temperature and cool down for one
hour. EC550 must be sanded before recoating with primer, color or clear.
After 4 hours: US 1000 (European P2000) damp, 1500 (European P2500) wet, 3000 Trizac™
After 24 hours: US 1000 (European P2000) dry, 1500 (European P2500) damp, 3000 Trizac™
Overcoat with: Envirobase High Performance primer, color or clear
Polishing: Polishing is not normally required. However, to remove minor dirt nibs, sand with P1500
or finer and follow normal polishing procedures. After force dry and cool down cycle.
Performance Guidelines:
Allow basecoat to thoroughly dry before applying EC550 En-V Ultra Gloss Clearcoat. If allowed to dry longer than 24 hours, additional basecoat
must be applied before clearcoating. The timing will depend on film thickness, temperature and humidity.
Fading Out EC550
Use OneChoice SLV840 or SXA840 Uniform Finish Blender to apply from the outside of the repair and moving towards the center of the repaired
area to lose the clearcoat blend edge.
Technical Data:
EC550 : ECH5075 : EC550 : ECH5075 : EC550 : ECH5075 : EC550 : ECH5075 :
RTS Combinations
ECRxx ECRxx + EA10 ECRxx + SLV898 ECRxx + SLV814
Clear Coating
Applicable Use Category Clear Coating Clear Coating Clear Coating
(Flexed)
Volume Ratio: 3 : 1 : 1 3: 1 : 1 +5% 3 : 1 : 1 +5% 3 : 1 : 1 +10%
VOC Actual (g/L) 137-140 134-137 131-133 128-131
VOC Actual (lbs./ US gal.) 1.14-1.17 1.12-1.14 1.09-1.11 1.07-1.09
VOC Regulatory (less water, less exempt
236-241 234-238 236-241 230-234
(g/L)
VOC Regulatory (less water, less exempt
1.97-2.01 1.95-1.99 1.97-2.01 1.92-1.95
(lbs./ US gal.)
Density (g/L) 1148-1153 1146-1150 1158-1161 1155-1159
Density (lbs./ US gal) 9.58-9.62 9.56-9.60 9.66-9.69 9.64-9.67
Volatiles wt.% 59.1-59.3 59.4-59.6 61.3-61.5 60.5-60.7
Water wt.% 0.0 0.0 0.0 0.0
Exempt wt.% 47.0-47.2 47.5-47.7 49.8-50.1 49.2-49.4
Water vol.% 0.0 0.0 0.0 0.0
Exempt vol.% 41.9-42.2 42.6-42.9 44.6-44.9 43.9-44.2
Solids vol.% 41.8 41.5 40.0 41.0
Solids wt.% 40.7-40.9 40.4-40.6 38.5-38.7 39.3-39.5
Sq. Ft. Coverage at 1 mil. at 100% transfer efficiency 670 666 642 658
© 2016 PPG Industries 3 EB-550 06/16
EC550 En-V Ultra Gloss Clearcoat Reducer Selection Guide
Higher Air Movement
Temperature and Humidity
(Larger)
Average Air Flow & Humidity
12,000-24,000 CFM - 30%-90% RH
Lower Air Movement
Temperature and Humidity
(Smaller)
Temperature, Air Flow, Humidity and Size of the Repair will affect Reducer selection
HEALTH AND SAFETY
See Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and SDS of all the
components, since the mixture will have the hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
• Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product SDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per company
and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on SDS.
• Store waterborne and solvent borne waste separately. A competent agent with appropriate certification must
handle all waterborne wastes. Wastes must be disposed in accordance with all Federal, State, Provincial and local
laws and regulations.
• Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general public. Products mentioned may be
hazardous and should only be used according to directions, while observing precautions and warning statements listed on label. Statements and methods described are based upon the best
information and practices known to PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to
performance, result, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
The PPG Logo, We protect and beautify the world, Envirobase, En-V, Deltron, OneChoice, and Global Refinish System are trademarks of PPG Industries Ohio, Inc.
© 2016 PPG Industries 4 EB-550 06/16
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-700 EC700 One-Visit Production Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-700 EC700 One-Visit Production Clearcoat',
    'Fast-drying one-visit production clearcoat system.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'eb-700', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
EC700 ONE-VISIT™ Production Clearcoat
Product Description
EC700 ONE-VISIT Production Clearcoat is a high gloss, high solids productivity clearcoat
designed specifically for use with Envirobase High Performance. The OneVisit clearcoat,
with its short bake times and zero flash time, reduces cycle times while maintaining the
quality and appearance required by high production shops. From an environmental
standpoint, the low 2.1 VOC of EC700 ONE-VISIT Production Clearcoat along with the high
solids resin also decreases clearcoat material usage and therefore greatly reduces the overall
VOC emissions.
Preparation of Substrate:
In all cases, wash all surfaces to be painted with soap and water, then apply the
appropriate Global or OneChoice cleaner. Ensure that the substrate is thoroughly
cleaned and dried both before and after application work.
Wet sand with U.S. 500-600 / European P800-1200 grade paper or dry sanding with
U.S. 400-500 / European P600-800 grade paper.
Wash off residue and dry thoroughly before re-cleaning with appropriate Global or
OneChoice substrate cleaner. The use of a tack rag is recommended.
.
© 2010 PPG Industries EB-700CAN 7/10
APPLICATION GUIDE:
Mixing Ratio Standard
EC700 4 vols
ECH70XX 1 vol
D8767 vol*
Accelerated
EC700 4 vols
ECH70XX 1 vol
EA10 5%
D8767 *vol
Pot life* @ 68F / 20C Standard 1 – 1.5 hours
Accelerated 1 – 1.5 hours
*Note: For the standard two coat application method, ½ part of D8767 thinner may be added to improve flow if needed.
Use the tables to determine the proper hardener needed for the application.
Hardener Selection Thinner Accelerator
Fast Hardener
ECH7070 D8767 EA10 Accelerator
55 - 75F (13º - 24ºC)
Medium Hardener
ECH7080
75 - 95F (24º - 35ºC)
Slow Hardener
ECH7090
95F and above (35C)
Hardener selection may be dependent on the size of repair.
Optional Additive:
SLV814 Universal flexiblizer may be used to flex EC700
EC700 : 4 vols
ECH70XX: 1 vol
SLV814 : 10%
When used on plastic parts, EC700 does not require the use of SLV814Universal flexiblizer. However, for very flexible or leading
edge parts such as bumper covers and fascias, the addition of SLV814 will improve overall flexibility.
Spraygun set-up:
Fluid Tip 1.2 - 1.4
Spray Viscosity 17-19 secs DIN 4 @ 20C / 68F
Spray pressure:
HVLP at air cap Max. 10 psi
Refer to the manufacturers gun recommendations for air pressure
Number of coats:
OneVisit : Apply 1 light to medium flowing coat immediately followed by a second medium coat to give 2 mils dry film thickness.
or
Standard 2-Coat : Apply 2 single medium wet coats allowing 5 to 10 minutes flash time between each coat, to provide for 2 - 2.5 mils
dry film thickness.
Flash off at 68ºF/20ºC:
OneVisit : Allow 1 minute of flash time between the 1st and 2nd coats. For 2 or more panels, no flash time between coats is required.
or
Standard 2-Coat : Allow 5 to 10 minutes between coats depending on your spray booth conditions and / or hardener choice.
Drying Times: Standard With EA10 Accelerator
Dust-free
68F / 20C 20 - 40 minutes 20 - 30 minutes
Dry to handle
68F / 20C 3 -5 hours 2 -3 hours
Air Dry
68F / 20C 5 -7 hours 3 - 5 hours
When using ECH7070 - 15 minutes When using ECH7070 - 10 minutes
Force Dry
When using ECH7080 - 20 minutes When using ECH7080 - 15 minutes
140ºF / 60ºC Metal Temperature*
When using ECH7090 - 20 minutes When using ECH7090 - 20 minutes
Tape Time
68F / 20C 3 - 5 hours 2 -3 hours
IR (Infrared) 8 -15 minutes 8 -15 minutes
*All force dry times are quoted for metal temperature. Additional time must be allowed during force dry to allow metal to reach recommended
temperature.
Page 2 EB-700CAN
Cumulative Parts Mix by Weight Activation Chart for EC700 ONE-VISIT Production Clearcoat 4:1 or 4:1:5%
4 Parts 1 Part
5% EA10
Clearcoat Required EC700 Clearcoat ECH70XX Hardener 0r
¼ Pint / 4 oz. 126.3 154.8 162
½ Pint / 8 oz. 252.5 309.5 324
¾ Pint / 12 oz. 378.8 464.3 486
1 Pint / 16 oz. 505.0 619.0 648
1.5 Pints / 20 oz. 631.3 773.8 810
1.75 Pints / 28 oz. 883.8 1083.3 1134
1 Quart / 32 oz. 1010.1 1238.1 1295
1.5 Quarts / 40 oz. 1263.0 1547.0 1619
2 Quarts / 64 oz. 2020.1 2476.1 2591
APPLICATION GUIDE:
Overcoat/Recoat
12-16 hours at 68F / 20C air dry or after force dry cool down. EC700 must be
Overcoat/Recoat Time
sanded before recoating with primer, color or clear.
Grade wet U.S. 500 – 600 / European P800 - 1200
Grade dry U.S. 400 – 500 / European P600 - 800
Overcoat with Envirobase High Performance Basecoat
Polishing is not normally required. If, however, polishing is
Polishing required to remove minor dirt nibs, wet sand with P1500 wet
and follow normal polishing procedures.
Performance Guidelines
Allow the Envirobase HP Waterborne Basecoat to flash off for 15 minutes (but no longer than 24 hours) before applying EC700. If basecoat
dries longer than 24 hours, additional basecoat must be applied before clearcoating. The timing will depend on thickness and temperature.
Recoating times will be extended at lower temperatures. EC700 may be sanded with 1200 grit paper or finer and polished when hard, to rectify
minor imperfections.
Fading Out EC700
After spot repairing, Use OneChoice SXA840 blending solvent and apply starting from the outside of the repair moving towards the center of the
repaired area to lose the clearcoat blend edge.
Technical Data
Total dry film build:
Minimum 2.0 mils
Maximum 3.0 mils
Recommended film build per wet coat 2.0 - 2.5 mils
Recommended dried film build per coat 1.0 - 1.5 mils
EC700 : EC700 : EC700 : ECH70XX : EC700 : ECH70XX :
ECH70XX ECH70XX : EA10 : D8767 SLV814
RTS Combinations: D8767
Volume Ratio: 4 : 1 4 : 1 : 0.5 4 : 1 : 5% : 0.5 4 : 1 : 10%
Applicable Use Category Clear Coating Clear Coating Clear Coating Clear Coating (flexed)
VOC Actual (g/L) 155 146 142 145
VOC Actual (lbs/gal) 1.29 1.22 1.18 1.21
VOC Regulatory (less water less exempt) (g/l) 250 249 249 243
VOC Regulatory (less water less exempt) (lbs/gal) 2.09 2.08 2.08 2.03
Density (g/L) 1164 1171 1165 1168
Density (lbs/gal) 9.71 9.77 9.72 9.75
Volatiles wt. % 57.1 59.5 60.4 58.7
Water wt. % 0.0 0.0 0.0 0.0
Exempt wt. % 43.7 47.0 48.1 46.2
Water vol. % 0.0 0.0 0.0 0.0
Exempt vol. % 37.9 41.3 42.9 40.3
Solids vol. % 44.4 42.0 40.9 43.2
Sq Ft. Coverage / U.S.gal. 1 mil. @ 100% transfer 712 674 656 693
efficiency
Page 3 EB-700CAN
Health and Safety
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
 The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and MSDS’s of all the
components, since the mixture will have the hazards of all its parts.
 Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
 Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
 Provide adequate ventilation for health and fire hazard control.
 Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per
company and regulatory requirements.
 Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on MSDS.
 Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the
general public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning
statements listed on label. Statements and methods described are based upon the best information and practices known to PPG Industries.
Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to performance, results,
or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth
herein.
PPG Automotive Refinish
World Leaders in Automotive Finishes
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
1-800-647-6050 1-888-310-4762
Page 4 EB-700CAN
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-750 EC750 One-Visit Appearance Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-750 EC750 One-Visit Appearance Clearcoat',
    'One-visit appearance clearcoat for rapid turnaround repairs.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'eb-750', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
EC750 One-Visit™ Appearance Clearcoat
Product Description
EC750 is a high gloss, high solids appearance clearcoat designed specifically for use with
Envirobase High Performance. The OneVisit Appearance Clearcoat, with zero flash time,
reduces cycle times while maintaining the quality and appearance required by high production
shops. From an environmental standpoint, the low 2.1 VOC of EC750 along with the high
solids resin also decreases clearcoat material usage and therefore greatly reduces the overall
VOC emissions.
Preparation of Substrate:
In all cases, wash all surfaces to be painted with soap and water, then apply the
appropriate Global or OneChoice cleaner. Ensure that the substrate is thoroughly
cleaned and dried both before and after application work.
Wet sand with U.S. 500-600 / European P800-1200 grade paper or dry sanding with
U.S. 400-500 / European P600-800 grade paper.
Wash off residue and dry thoroughly before re-cleaning with appropriate Global or
OneChoice substrate cleaner. The use of a tack rag is recommended.
.
© 2010 PPG Industries EB-750CAN 07/10
APPLICATION GUIDE:
Mixing Ratio:
EC750 4 vols
ECH70XX 1 vol
D8767 *vol
Pot life* @ 68F / 20C 2.5 - 3 hours
*Note: Pot life will be shortened with increased temperatures.
*Note: For the standard two coat application method, ½ part of D8767 thinner may be added to the mix to improve flow if needed.
Use the tables to determine the proper hardener needed for the application.
Hardener Selection: Thinner
Fast Hardener D8767
ECH7070 :
55 - 75F (13º - 24ºC)
Medium Hardener
ECH7080 :
75 - 95F (24º - 35ºC)
Slow Hardener
ECH7090 :
95F and above (35C)
Hardener selection may be dependent on the size of repair.
Optional Additive:
SLV814 Universal flexiblizer may be used to flex EC750
EC750: 4 vols
ECH70XX: 1 vol
SLV814 : 10%
When used on plastic parts, EC750 does not require the use of SLV814 Universal flexiblizer. However, for very flexible or leading
edge parts such as bumper covers and fascias, the addition of SLV814 will improve overall flexibility.
Spraygun set-up:
Fluid Tip 1.2 - 1.4
Spray Viscosity 17-19 secs DIN 4 @ 20C / 68F
Spray pressure:
HVLP at air cap Max. 10 psi
Refer to the manufacturers gun recommendations for air pressure
Number of coats:
OneVisit : Apply 1 light to medium flowing coat immediately followed by a second medium coat to give 2 mils dry film thickness.
or
Standard 2-Coat : Apply 2 single medium wet coats allowing a 5 -10 minute flash time between each coat, to provide for 2 to 2.5
mils dry film thickness.
Flash off at 68ºF/20ºC:
OneVisit : Allow 1 minute of flash time between the 1st and 2nd coats. For 2 or more panels, no flash time between coats is required.
or
Standard 2-Coat : Allow 5 -10 minute flash off between coats depending on your spray booth conditions and / or hardener choice.
Drying Times:
Dust-free
68F / 20C 50 - 60 minutes
Dry to handle
68F / 20C Over night
Air Dry
68F / 20C Over night
Force Dry
140ºF / 60ºC Metal 30 minutes
Temperature*
Tape Time
68F / 20C Over night
IR (Infrared) 8 -15 minutes
*All force dry times are quoted for metal temperature. Additional time must be allowed during force dry to allow metal to reach recommended
temperature.
Page 2 EB-750CAN
Cumulative Parts Mix by Weight Activation Chart for EC750 One-Visit Appearance Clearcoat 4:1
Clearcoat Required EC750 Clearcoat Parts ECH70XX Hardener Parts
¼ Pint / 4 oz. 126.3 154.8
½ Pint / 8 oz. 252.5 309.5
¾ Pint / 12 oz. 378.8 464.3
1 Pint / 16 oz. 505.0 619.0
1.5 Pints / 20 oz. 631.3 773.8
1.75 Pints / 28 oz. 883.8 1083.3
1 Quart / 32 oz. 1010.1 1238.1
1.5 Quarts / 40 oz. 1262.6 1547.6
2 Quarts / 64 oz. 2020.2 2476.2
APPLICATION GUIDE:
Overcoat/Recoat
12-16 hours at 68F / 20C air dry or after force dry cool down. EC750 must be sanded
Overcoat/Recoat Time
before recoating with primer, color or clear.
Grade wet U.S. 500 – 600 / European P800 - 1200
Grade dry U.S. 400 – 500 / European P600 - 800
Overcoat with Envirobase High Performance Basecoat
Polishing is not normally required. If, however, polishing is
Polishing required to remove minor dirt nibs, wet sand with P1500 wet
and follow normal polishing procedures.
Performance Guidelines
Allow the Envirobase High Performance Waterborne Basecoat to flash off for 15 minutes (but no longer than 24 hours) before
applying EC750. If basecoat dries longer than 24 hours, additional basecoat must be applied before clearcoating. The timing will
depend on thickness and temperature.
Recoating times will be extended at lower temperatures. EC750 may be sanded with 1200 grit paper or finer and polished when
hard, to rectify minor imperfections.
Fading Out EC750
After spot repairing, Use OneChoice SXA840 blending solvent and apply starting from the outside of the repair moving towards
the center of the repaired area to lose the clearcoat blend edge.
Technical Data
Total dry film build:
Minimum 2.0 mils
Maximum 3.0 mils
Recommended film build per wet coat 2.0 - 2.5 mils
Recommended dried film build per coat 1.0 - 1.5 mils
EC750 : ECH70XX EC750 : ECH70XX : EC750 : ECH70XX :
RTS Combinations: D8767 SLV814
Volume Ratio: 4 : 1 4 : 1 : 0.5 4 : 1 : 10%
Applicable Use Category Clear Coating Clear Coating Clear Coating (flexed)
VOC Actual (g/L) 155 146 145
VOC Actual (lbs/gal) 1.29 1.22 1.21
VOC Regulatory (less water less exempt) (g/l) 250 249 243
VOC Regulatory (less water less exempt) (lbs/gal) 2.09 2.08 2.03
Density (g/L) 1164 1171 1168
Density (lbs/gal) 9.71 9.77 9.75
Volatiles wt. % 57.1 59.5 58.7
Water wt. % 0.0 0.0 0.0
Exempt wt. % 43.7 47.0 46.2
Water vol. % 0.0 0.0 0.0
Exempt vol. % 37.9 41.3 40.3
Solids vol. % 44.4 42.0 43.2
Sq Ft. Coverage / U.S.gal. 1 mil. @ 100% transfer efficiency 712 674 693
Page 3 EB-750CAN
Health and Safety
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
 The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and MSDS’s of all the
components, since the mixture will have the hazards of all its parts.
 Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
 Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
 Provide adequate ventilation for health and fire hazard control.
 Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per
company and regulatory requirements.
 Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on MSDS.
 Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the
general public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning
statements listed on label. Statements and methods described are based upon the best information and practices known to PPG Industries.
Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to performance, results,
or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth
herein.
PPG Automotive Refinish
World Leaders in Automotive Finishes
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
1-800-647-6050 1-888-310-4762
Page 4 EB-750CAN
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EB-815 ECS81/ECS85/ECS87 A-Chromatic LV Sealer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EB-815 ECS81/ECS85/ECS87 A-Chromatic LV Sealer',
    'Low-VOC a-chromatic sealer application and technical specifications.',
    'other',
    'painting',
    ARRAY['sealer_application', 'eb-815', 'sealer'],
    '{"process_section": "sealer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
ECS81 White, ECS85 Gray, ECS87 Dark Gray A-Chromatic Sealers
Product Description
A-Chromatic Sealers ECS81White, ECS85 Gray and ECS87 Dark Gray are premium quality sealers designed
specifically for use under ENVIROBASE® High Performance Waterborne Basecoat.
For use under Envirobase High Performance basecoat, these A-Chromatic Sealers are ready to top coat in 15 minute and
have the best leveling and blend edge properties available today . All 3 sealer colors were selected to match
A-Chromatic shades G1, G5 and G7 and with a simple mix ratio, G3 and G6 can easily be achieved. The sealer can be
applied over unsanded OEM e-coat, sanded original finishes and/or properly prepared and treated bare steel, aluminum,
fiberglass and plastic.
Preparation of Substrate
In all cases wash all surfaces to be painted with soap and water, then apply the appropriate
ONECHOICE® cleaner. Ensure that the substrate is thoroughly cleaned and dried both before
and after preparation work.
Original Paintwork should be sanded using P400 grit discs (dry) or P600 grade paper (wet).
Exposed bare metal should be spot-primed with a suitable bare metal primer (see below).
Aluminum, Bare Steel, and Galvanized Steel must be clean, rust-free and abraded thoroughly
using P280 - P320 grit paper. These substrates must be primed with SX1071 Etch Primer.
Electrodeposition Primer must be thoroughly cleaned and can be directly overcoated with the A-
Chromatic Sealer without abrading.
Polyester Body Fillers should be dry sanded and finished with P320-P400 grit paper.
Gel Coated Fiber Glass and SMC should be dry sanded using P320-400 grit paper.
Plastic should be dry sanded with P600 (use a finer grit for softer plastics) and prepared first
with a Plastic Adhesion Promoter before sealing.
EB-815 7/19
APPLICATION GUIDE:
Mixing Ratio for ECS8X Sealers Compliant
ECS8x Sealer: 4 Vols.
EH391/EH392 Hardener: 1 Vol.
ECRxx/D87xx/DT18xx Thinner: 1 Vol.
Pot Life at 70°F (21°C): 1 hour
Hardener:
EH391: Standard Undercoat Hardener
EH392: Slow Undercoat Hardener
Recommended Reducer: Thinner/Reducer Thinner/Reducer
ECR65 Low Temp Reducer D8764 Fast Compliant Thinner DT1845 Compliant Reducer Normal
ECR75 Mid Temp Reducer D8774 Medium Compliant Thinner DT1850 Compliant Reducer Medium
ECR85 High Temp Reducer D8767 Slow Compliant Thinner DT1855 Compliant Reducer Slow
Optional Additives:
None
Spraygun Set-up and Pressure:
Fluid Tip: 1.4 - 1.6 mm or equivalent
Spray Viscosity: 15 - 17 seconds DIN4 @70°F (21°C)
Application:
HVLP at the air cap: 10 psi
Compliant at the spray gun: 29 - 40 psi
Note: For best overall results, refer to the spray gun manufacturer’s recommendations for optimum inlet air pressures.
Number of Coats:
1 coat
Dry film build: 0.7 - 1.0 mils
Flash Off 70°F (21°C):
Before topcoating: 15 minutes
70°F (21°C)
After 72 hours, sealer must be sanded. If sanded film is below 0.7 mil, sealer must be reapplied.
Drying Times:
Dust-Free 10 minutes
70°F (21°C)
Dry to handle 20 - 30 minutes
70°F (21°C)
Tape Time 1 hour
70°F (21°C)
IR (Infrared) 10 minutes Medium Wave
5 minutes Short Wave
2 EB-815 7/19
APPLICATION GUIDE (cont’d):
Overcoat/Recoat
Envirobase High Performance 15 minutes at 70°F (21°C)
Note: After 72 hours, sealer must be sanded. If sanded film is below 0.7 mil, sealer must be reapplied.
Grade wet: P1000 / US 500 grade paper
Grade dry: P1000 / US 500 grade paper
Performance Guidelines:
 The use of HVLP spray equipment can give an increase in transfer efficiency of around 25% depending upon the make and
model of the equipment used.
 For all substrates except unsanded electrodeposition primer, ensure that the surface is thoroughly sanded to the panel edge or to
a distance several centimeters beyond the damaged area, whichever is smaller.
 Do not apply over thermoplastic finishes such as lacquer.
 Partially used cans of hardener must be kept closed to prevent moisture contamination.
Technical Data:
ECS8x : EH391/EH392 :
RTS Combinations
ECRxx/D87xx/DT18xx
Ratio 4 : 1 : 1
Applicable Use Category Primer Surfacer
VOC Actual (g/L) 49 - 133
VOC Actual (lbs./ US gal.) 0.41 - 1.11
VOC Regulatory (less water, less exempt (g/L) 114 - 248
VOC Regulatory (less water, less exempt (lbs./ US gal.) 0.95 - 2.07
Density (g/L) 1421- 1493
Density (lbs./ US gal) 11.86 - 12.46
Volatiles wt.% 50.9 - 54.3
Water wt.% 0.0
Exempt wt.% 41.6 - 51
Water vol.% 0.0
Exempt vol.% 46.2 - 57.4
RTS Solids vol.% 37.1 - 38.5
RTS Solids wt.% 45.7 - 49.1
Sq. Ft. Coverage at 1 mil. at 100% transfer efficiency 595 - 616
3 EB-815 7/19
A-Chromatic Gray Mixing Chart A-Chromatic Sealer
This chart can be used to mix the A-Chromatic Sealer
The G1-G7 ratios will help to achieve proper color match when used as a guide for mixing the A-Chromatic Sealer
Mix Ratio By Cumulative Weight
Mix Ratio By Volume
Grams Parts
Mix Ratio ¼ Pint ½ Pint Pint Quart ¼ Pint ½ Pint Pint Quart
G1 ECS81 4 125 250 499 999 141 282 564 1127
EH39x 1 150 300 598 1197 169 338 675 1350
Reducer/Thinner 1 170 341 681 1361 192 384 768 1536
G3
ECS81 2.67 83 166 333 666 94 188 376 752
ECS85 1.33 125 250 500 1000 141 282 564 1129
EH39x 1 150 299 599 1198 169 338 676 1352
Reducer/Thinner 1 170 341 681 1362 192 384 769 1537
G5
ECS85 4 125 251 501 1002 141 283 566 1131
EH39x 1 150 300 600 1200 169 339 677 1354
Reducer/Thinner 1 171 341 682 1364 193 385 770 1540
G6
ECS85 2.22 70 139 278 557 79 157 314 628
ECS87 1.78 125 250 500 999 141 172 564 1128
EH39x 1 150 299 598 1197 169 228 675 1351
Reducer/Thinner 1 170 340 681 1361 192 274 768 1537
G7
ECS87 4 124 249 498 995 140 281 562 1123
EH39x 1 149 298 597 1193 168 337 673 1347
Reducer/Thinner 1 170 339 679 1358 192 383 766 1532
4 EB-815 7/19
HEALTH AND SAFETY
See Safety Data Sheet and Labels for additional safety information and handling instructions.
 The contents of this package may have to be blended with other components before the product can be
used. Before opening the packages, be sure you understand the warning messages on the labels and
SDS of all the components, since the mixture will have the hazards of all its parts.
 Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or
lack of proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
 Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
 Provide adequate ventilation for health and fire hazard control.
 Follow company policy, product SDS and respirator manufacturer’s recommendations for selection
and proper use of respiratory protection. Be sure employees are adequately trained on the safe use of
respirators per company and regulatory requirements.
 Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures
on SDS.
 Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general public.
Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements listed on label.
Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for applications mentioned are suggestions
only and are not to be construed as representations or warranties as to performance, result, or fitness for any intended use, nor does PPG Industries warrant freedom
from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
© 2019 PPG Industries, Inc. All rights reserved
The PPG Logo Envirobase Plus, and OneChoice are registered trademarks and We protect and beautify the world is a trademark of PPG Industries
Ohio, Inc.
5 EB-815 7/19
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EC-800 Ultra Fast Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EC-800 Ultra Fast Clearcoat',
    'Ultra-fast drying clearcoat system for efficiency.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
EC800 Ultra Fast 2.1 Clearcoat
Product Description
ENVIROBASE® High Performance EC800 is an ultra fast, high gloss 2.1 VOC highly productive
clearcoat designed specifically for use with Envirobase High Performance basecoats. This clearcoat, with
its no bake requirement and zero flash between coats, dramatically reduces cycle times while maintaining
the quality and appearance required by high production shops. From an environmental standpoint, the low
2.1 VOC of EC800 Clearcoat along with the high solids resin also decreases clearcoat material usage and
therefore greatly reduces the overall VOC emissions.
Preparation of Substrate
• In all cases, wash all surfaces to be painted with soap and water, then apply the
appropriate GLOBAL REFINISH SYSTEM™ or ONECHOICE® cleaner. Ensure
that the substrate is thoroughly cleaned and dried both before and after application
work.
• Wet sand with US 500-600 / European P800-P1200 grade paper or dry sanding with
US 400-500 / European P600-P800 grade paper.
• Wash off residue and dry thoroughly before re-cleaning with appropriate Global
Refinish System or OneChoice substrate cleaner. The use of a tack rag is
recommended.
© 2015 PPG Industries EB-800 08/15
APPLICATION GUIDE:
Mixing Ratio for EC800
EC800: 4 vols
ECH8075/ECH8095: 1 vol
ECA8x/D8767/DT1855/SLV898: 1 vol
Refer to PAINTMANAGER™ formula software for exact mix by weight volumes.
Pot Life at 70°F (21°C): with ECA8x Reducers 1-1.5 hours
with D8767/DT1855/SLV898 Reducers: 2 hours
Hardener: Accelerated Reducer: Thinner:
ECH8075 Clearcoat Hardener ECA81 Fast 65-75°F (18-24°C) D8767 Fast Compliant Thinner 77-95°F (25-35°C)
ECH8095 Clearcoat Hardener - Slow ECA83 Normal 70-85°F (21-29°C) DT1855 Compliant Reducer Slow 77-95°F (25-35°C)
SLV898 Low VOC Retarder*
* Thinner selection may be dependent on temperature and or size of repair. For use in extreme temperatures +95°F/+35°C, SLV898 may be used as a replacement up
to one full part for D8767 or DT1855 thinners. For VOC data and additional information, see OneChoice product bulletin OC-17.
Optional Additives:
SLV814 Universal Flexibilizer: add 10% to RTS volume
SLV73 Fisheye Eliminator: add 1 oz. to RTS quart
When used on plastic parts, EC800 does not require the use of SLV814 Universal Flexibilizer. However, for very
flexible or leading edge parts such as bumper covers and fascias, the addition of SLV814 will improve overall
flexibility.
Note: For flattening recommendations, see OneChoice bulleting OC-7.
Spraygun Set-up and Pressure:
HVLP: 10 maximum psi at the cap
Fluid Tip: 1.3-1.5 mm
Spray Viscosity: 12-14 seconds DIN 4 at 70°F (21°C)
Note: For best overall results, refer to the spray gun manufacturer’s recommendations for optimum inlet air
pressures.
Application:
Apply: 2 medium wet coats.
Film Build:
Minimum Dry: 2.0 mils
Maximum Dry: 3.0 mils
Recommended film build per coat wet: 2.0-2.5 mils
Recommended film build per coat dry: 1.0-1.5 mils
Flash Off at 70°F (21°C):
No flash required
Drying Times:
Dust-free:
70°F (21°C) 10-15 minutes
Air Dry to Re-assemble:
70°F (21°C) 1 hour
Force Dry:*
140°F (60°C) N/A
Tape Time:
70°F (21°C) 1 hour
IR (Infrared): N/A
*For in-service delivery at low temperatures (below 60°F/16°C) or inclement weather conditions, allow EC800 a minimum of 4 hours
air dry at shop temperature (above 60°F/16°C) or bake for 10 minutes at 120°F/49°C metal temperature and cool for one hour prior to
putting into service.
© 2015 PPG Industries 2 EB-800 08/15
Overcoat / Recoat / Polishing:
Overcoat/Recoat Time: 2-3 hours at 70°F (21°C) air dry or after force dry for 10 minutes at 120°F (49°C) metal
temperature and cool down for one hour. EC80 must be sanded before recoating with
primer, color or clear.
Grade wet: US 500-600 / European P800-P1200
Grade dry: US 400-500 / European P600-P800
Overcoat with: Envirobase High Performance Basecoat, primer, color or clear
Polishing: 30-45 minutes. Polishing is not normally required. If, however, polishing is required to
remove minor dirt nibs, wet sand with P1500 wet and follow normal polishing
procedures.
Performance Guidelines:
• Allow basecoat to flash off for 15 minutes (but no longer than 24 hours) before applying EC800, If the basecoat dries longer than 24 hours,
additional basecoat must be applied before clearcoating. The timing will depend on thickness and temperature.
Fading Out EC800
After spot repairing. Use OneChoice SXA840 blending solvent and apply starting from the outside of the repair moving towards the center of the
repaired are to lose the clearcoat blend edge.
Technical Data:
Use of recommended products in ready to spray mixes will be compliant under a Clear Coating VOC limit of 2.1 lbs./gal. (250 g/L) in Canada and
the US except parts of California. EA81 contains the solvent TBAc. For facilities that are required to track TBAc emissions: ECA81 contains TBAc
at 2.7 lbs./gal., a 4:1:1 blend using ECA81 contains TBAc at 0.5 lbs./gal. and a 4:1:1+10% blend using ECA81 contains TBAc at 0.4 lbs./gal.
Due to unique California air district VOC regulations, EA81 is not allowed for compliant use within that state (only).
EC800 : EC800 : EC800 :
EC800 :
RTS Combinations ECH80xx : D8767 / DCH80xx : ECA8x ECH80xx : D8767/
ECH80xx : ECA8x
DT1855 +SLV814 DT1855 + SLV814
Clear Coating Clear Coating
Applicable Use Category Clear Coating Clear Coating
(Flexed) (Flexed)
Weight Ratio: 4 : 1 : 1 4 : 1 : 1 4 : 1 : 1 +10% 4 : 1 : 1 +10%
VOC Actual (g/L) 118 104-105 111 98-101
VOC Actual (lbs./ US gal.) 0.99 0.87-0.88 0.93 0.82-0.84
VOC Regulatory (less water, less exempt (g/L) 230-250 212-228 223-241 206-219
VOC Regulatory (less water, less exempt (lbs./ US gal.) 1.92-2.09 1.77-1.90 1.86-2.01 1.72-1.83
Density (g/L) 1059-1093 1073-1119 1074-1105 1087-1129
Density (lbs./ US gal) 8.84-9.12 8.95-9.34 8.96-9.22 9.07-9.42
Volatiles wt.% 61.5-65.2 62.5-66.1 62.8-66.1 63.6-65.5
Water wt.% 0.1 0.1 0.1 0.1
Exempt wt.% 50.4-54.4 52.8-56.8 52.4-56.0 54.6-58.1
Water vol.% 0.1 0.1 0.1 0.1
Exempt vol.% 48.6-52.9 50.0-54.4 50.0-53.9 51.3-55.3
RTS Solids vol.% 33.6-37.5 33.5-37.4 33.4-36.9 33.3-36.9
Sq. Ft. Coverage at 1 mil. at 100% transfer efficiency 539-602 538-600 535-592 534-592
© 2015 PPG Industries 3 EB-800 08/15
HEALTH AND SAFETY
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the product can be used.
Before opening the packages, be sure you understand the warning messages on the labels and MSDS of all the
components, since the mixture will have the hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering controls and/or lack of
proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
• Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection and proper
use of respiratory protection. Be sure employees are adequately trained on the safe use of respirators per company
and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid procedures on MSDS.
• Store waterborne and solvent borne waste separately. A competent agent with appropriate certification must
handle all waterborne wastes. Wastes must be disposed in accordance with all Federal, State, Provincial and local
laws and regulations.
• Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information: (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general public. Products mentioned may be
hazardous and should only be used according to directions, while observing precautions and warning systems listed on label. Statements and methods described are based upon the best
information and practices known to PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to
performance, result, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive, Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
800.647.6050 888.310.4762
Follow us online:
www.ppgrefinish.com
The PPG Logo, Bringing innovation to the surface, One Visit, Envirobase, PaintManager, OneChoice, and Global Refinish System are trademarks of
PPG Industries Ohio, Inc.
© 2015 PPG Industries 4 EB-800 08/15
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EHP Viscosity Check SOP
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EHP Viscosity Check SOP',
    'Standard operating procedure for checking paint viscosity with EHP systems.',
    'sop',
    'painting',
    ARRAY['equipment_and_tools', 'viscosity'],
    '{"process_section": "equipment-and-tools", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'EHP viscosity check SOP
Viscosity measures thickness of the paint, adjusting color to recommended viscosity improves
paint performance, handling and drying characteristics. Inadequate base coat reduction can
lead to soft paint film, slow flash time, die back, application difficulties when spraying and
blending metallic colors.
*Will need a DIN4 viscosity cup (DEX640) and stopwatch
1. Reduce the color based on the color you mixed (10%, 20% or 30%)
2. Fully submerge viscosity cup below the surface of the reduced paint.
3. Lift the cup and start the stopwatch.
4. Watch the stream of the paint and stop the timer at the first clean break in the stream
of the paint.
5. Compare your time to the desired range of 23 to 28 seconds. Try to target lower end
of range meaning 23-24 seconds.
6. If the time is higher than the recommended range this means the paint is too thick, to
correct thickness add more T494 reducer.
7. After stirring, recheck the viscosity using same process.
8. Once the color viscosity is within desired range, the color is ready to spray.
*An additional 5% of reducer will lower viscosity by three seconds.
4-08-2017
')
) AS chunks(chunk_idx, chunk_content);


-- Document: ETB004 Textured Finish
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'ETB004 Textured Finish',
    'Textured finish application for specialty waterborne finishes.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Technical Information
ETB004
Textured Finish Repair System
PRODUCT DESCRIPTION
Envirobase High Performance textured finish is designed to provide a simple refinishing process
for textured plastics. The textured finish system is a combination of components from the Vibrance
Collection™ along with internal repair / engine bay ancillaries products. Once mixed, Envirobase
High Performance textured finish is capable of providing an accurately matched finish on textured
plastic body parts.
PREPARATION OF SUBSTRATE
Before and after any sanding operation, the substrate must be thoroughly cleaned
-So-Clean
and degreased by using SWX350 H O ™ Waterborne Pre-Cleaner. Apply
2
liberally with a clean cloth and wipe dry with another. Be sure to wipe the cleaner
off completely and do not let it dry on the surface. If it dries prior to removal, re-
wet the surface again and dry off completely.
Textured Envirobase High Performance system may be applied over most
automotive plastics after proper preparation and cleaning. Bare plastics must be
cleaned with the OneChoice™ Plastic Prep system and primed or sealed before
application of the Textured Envirobase High Performance. Painted surfaces must
be lightly abraded with a fine gray scuff pad followed by a final cleaning with
SWX350.
© 2012 PPG Industries 1 ETB004 5/12
Making Textured System Ready to Spray
.
VWM5556 Waterborne Mid Coat 70 % by weight
T510 Convertor 30 % by weight
DX1999 Texture Additive 10 % by weight
Stir Well Before Activating and Thinning
T581 Activator 15 % by weight
T494 Thinner 10 % by weight
Stir Well After Activating and Thinning
Mix Table for Textured System
The Parts (Grams) are CUMULATIVE.
DO NOT TARE / ZERO OUT THE SCALE BETWEEN ADDITIONS.
VWM5556 T510 DX1999
Waterborne Convertor Texture
Mid Coat Additive
2
STIR
WELL
MIXING – EHP Textured System
T581 T494 Approximate
Activator Thinner Ready
to Spray
Parts (Grams) Parts (Grams) Parts (Grams) Parts (Grams) Parts (Grams) oz.
70 (62) 100 (88) 110 (96) 125 (110) 135 (118) 4 oz.
140 (124) 200 (176) 220 (192) 250 (220) 270 (236) 8 oz.
210 (186) 300 (264) 330 (288) 375 (330) 405 (354) 12 oz
280 (248) 400 (352) 440 (384) 500 (440) 540 (472) 16 oz
420 (372) 600 (528) 660 (576) 750 (660) 810 (708) 24 oz
560 (496) 800 (704) 880 (768) 1000 (880) 1080 (944) 32 oz
Note: Do Not strain the textured mixture before application. If using disposable paint cup
systems, be sure to remove all strainers.
POTLIFE AND VISCOSITY
Potlife: 1 hour at 70°F / 20°C
Spray viscosity: 24 - 30 seconds, DIN4 70°F / 21°C
APPLICATION:
HVLP/ Compliant Spraygun: 1.2 - 1.4 mm
Spray pressure: Refer to manufacturer’s recommendation for inlet air pressure.
Application: Apply two to three single light coats to achieve the desired
appearance. Total film thickness of 0.5 - 1.0 mils
FLASH OFF:
For optimum process times, blow dry between coats.
RECOAT:
After the final coat of textured finish has been applied and flashed off, apply the un-textured
waterborne basecoat color and clear coat to complete the repair.
TECHNICAL DATA:
VWM5556 : T510 : DX1999 : T581 :
RTS Combinations
T494
Applicable Use Category Other
Wt. Ratio: 70 : 30: 10 : 15 : 10
Density (g/L) 997
Density (lbs/gal) 8.32
VOC Actual (g/L) 85
VOC Actual (lbs/gal) 0.70
VOC Regulatory (g/L) 228
VOC Regulatory (lbs/gal) 1.90
Volatiles wt.% 72.5
Water wt.% 63.4
Exempt wt.% 0.0
Water vol.% 63.3
Exempt vol. % 0.0
Volume solids %
27.5
Sq. Ft. Coverage 100% Transfer Efficiency @ 1 mil 441
Health and Safety:
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
• The contents of this package may have to be blended with other components before the
product can be used. Before opening the packages, be sure you understand the warning
messages on the labels and MSDS of all the components, since the mixture will have the
hazards of all its parts.
• Improper handling and use, for example, poor spray technique, inadequate engineering
controls and/or lack of proper Personal Protective Equipment (PPE), may result in
hazardous conditions or injury.
• Follow spray equipment manufacturer''''s instructions to prevent personal injury or fire.
• Provide adequate ventilation for health and fire hazard control.
• Follow company policy, product MSDS and respirator manufacturer’s recommendations
for selection and proper use of respiratory protection. Be sure employees are adequately
trained on the safe use of respirators per company and regulatory requirements.
• Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid
procedures on MSDS.
• Always observe all applicable precautions and follow good safety and hygiene practices.
3
Emergency Medical or Spill Control Information (412)434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using PPG Industries
proper equipment and are not intended for sale to the general public. Products mentioned 19699 Progress Drive
may be hazardous and should only be used according to directions, while observing
Strongsville, OH 44149
precautions and warning statements listed on label. Statements and methods described
are based upon the best information and practices known to PPG Industries. Procedures
for applications mentioned are suggestions only and are not to be construed as PPG Canada Inc.
representations or warranties as to performance, results, or fitness for any intended use,
2301 Royal Windsor Drive Unit # 6
nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein. Mississauga, Ontario L5J 1K5
4
')
) AS chunks(chunk_idx, chunk_content);


-- Document: ETB005 Mercedes Alubeam
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'ETB005 Mercedes Alubeam',
    'Specialized application process for Mercedes Alubeam metallic finish.',
    'other',
    'painting',
    ARRAY['unique_finishes'],
    '{"process_section": "unique-finishes", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Technical Information
T4700 Liquid Metal used in repair process of Mercedes Benz 047 Alubeam ETB005
The following process outlining the repair of Mercedes Benz 047 Alubeam paint schemes has been
approved by PPG Industries. When repairing Mercedes Benz vehicles finished in this paint scheme, you
should contact your PPG representative for full documentation on the approved product systems and
processes.
DESCRIPTION:
• Mercedes Alubeam 047 is a special effect silver color which gives the paint a “Liquid Metal”
appearance. Unlike a traditional metallic or pearlescence this finish appears more like “Molten
Metal” that wraps the entire vehicle. Because of the minute particle size of this special
pigmentation, light is reflected differently thus making this a very unique finish.
• The OEM process utilizes a specialized 4 coat system made up of a dark undercoat, followed by
a sanded clearcoat, to which the tinted liquid metal is applied and then overcoated by another
clearcoat layer. See the following illustration;
Final Scratch Resistent Clearcoat Layer
Tinted Liquid Metal Layer
Sanded Clearcoat
Dark Undercoat
OEM Substrate / Primer
The repair outlined in this document duplicates the OEM process as closely as possible utilizing products
similar to those used at the factory.
@ 2012 PPG Industries www.ppgrefinish.com ETB005 10/12
PREPARATION OF SUBSTRATE:
• The damaged body work of the vehicle should be repaired using the Mercedes Benz approved
PPG repair and undercoating system for the substrate of the body panels being repaired
(Aluminum, Steel, and Plastic etc).
• Finishing the repair with A-Chromatic G7, ECP17 Surfacer (product bulletin EB-100) is
recommended as the ground coat.
PREPARATION OF COLOR CHECK PANEL
NOTE: Due to the possible variation in color on a particular vehicle as well as application technique, it is
essential that a color check panel be prepared to align the color before applying any basecoat color to the
vehicle. The color check panel should be prepared as follows:
• Mix and apply a G7 sealer to the entire color check panel insuring full coverage. Allow suitable
flash times between coats. Allow the sealer to completely dry then sand with P600 or finer before
applying the sandable clearcoat layer.
• Mix and apply clearcoat to the entire color check panel. 2 coats should be applied so that enough
film build is present to allow for sanding. The use of the following Mercedes approved PPG
clearcoats are recommended;
o D8188, Glamour LV Clearcoat, product bulletin EU147
o EC700, One-Visit™ Production Clearcoat, product bulletin EB700
o EC750, One-Visit™ Appearance Clearcoat, product bulletin EB750
• Once the clearcoat has fully dried, remove any orange peel or texture with P1200 dry
then further refine the surface with P1000 Trizact wet to minimize any final scratches.
NOTE: This sanding of the clearcoat step is critical due to the leafing nature of the Liquid Metal
material. Any imperfection (dirt or sand scratches) will telegraph through to the final finish.
• Mix the Envirobase High Performance Basecoat formula for Mercedes Alubeam 047 (PPG code
930381). The formula can be found on PaintManager® or On-line Color.
• Reduce basecoat 50% (2 : 1 ratio) with T494 Waterborne Thinner.
• Spray gun set up used is a 1.2mm - 1.3mm HVLP or Compliant. This process is to be sprayed
exactly as you will be spraying the vehicle to insure accurate color alignment.
• Apply 1st double cross coat @ full legal pressure at the cap with fluid set at 1 ¼ - 1 ½ turns open
and flash off until matt (using air blower).
• Apply 2nd double cross coat as you did the 1st and flash off until matt (using air blower).
• If opacity or full coverage has been achieved, proceed to the next step, otherwise apply a 3rd
double cross coat and flash off until matt (using air blower).
• Apply one double or triple mist coat @ full legal pressure at the cap with fluid set at ¾ turns open
and flash off until matt (using air blower).
• Care should be taken to apply this final basecoat layer very dry and even without any “wetting up”
of the basecoat.
• Allow the basecoat to flash for 20 - 30 minutes before clear coating.
• Mix and apply Global™ D8126 Mar and Scratch Resistant Clearcoat (product bulletin EU-142) to
the entire panel.
@ 2012 PPG Industries www.ppgrefinish.com ETB005 10/12
CHECK THE COLOR:
• Use the completed color check panel to evaluate the color on the car.
• If the color achieved on the color check panel is considered to be “blendable” to the car proceed
to the section “GROUNDCOAT PREPARATION AND SANDABLE CLEAR APPLICATION”.
• If tinting of the color is nessary, tint utilizing toners within the original formula and prepare an
additional color check panel and re-check. Continue in this fashion until a blendable match is
achieved.
GROUNDCOAT PREPARATION AND SANDABLE CLEAR APPLICATION:
NOTE: It is important to achieve full coverage or opacity when repairing this Mercedes Benz 047 color.
The use of G7, ECP17 A-Chromatic Surfacer will provide the best reference as to when full coverage has
been achieved.
• Sand the G7, A-Chromatic ECP17 Surfacer (ground coat) with P600 grit or finer before applying
the sandable clearcoat layer.
• Mix and apply clearcoat to the entire repaired panel. Blending of this clearcoat layer is not
recommended. Apply clear “edge to edge”. 2 coats should be applied so that enough film build
is present to allow for sanding. The use of the following Mercedes approved PPG clearcoats are
recommended;
o D8188, Glamour LV Clearcoat, product bulletin EU147
o EC700, One-Visit™ Production Clearcoat, product bulletin EB700
o EC750, One-Visit™ Appearance Clearcoat, product bulletin EB750
• Once the clearcoat has completely dried, remove any orange peel or texture with P1200 dry then
further refine the surface with P1000 Trizact wet to minimize any final scratches.
NOTE: This sanding of the clearcoat step is critical due to the leafing nature of the Liquid Metal
material. Any imperfection (dirt or sand scratches) will telegraph through to the final finish.
• Where blending of the basecoat occurs as part of the repair, the area of the panel from the
basecoat blend to the edge of the panel should be finished with P3000, wet.
ENVIROBASE HIGH PERFORMANCE CODE 047 APPLICATION:
• Mix the Envirobase High Performance Basecoat formula for Mercedes Alubeam 047 (PPG code
930381). The formula can be found on PaintManager® or On-line Color.
• Reduce basecoat 50% (2 : 1 ratio) with T494
• Spray gun set up used is a 1.2mm - 1.3mm HVLP or Compliant. This process is to be sprayed
exactly as you sprayed the color check panel to insure accurate color alignment.
• Apply 1st double cross coat @ full legal pressure at the cap with fluid set at 1 ¼ - 1 ½ turns open
and flash off until matt (using air blower).
• Apply 2nd double cross coat as you did the 1st and flash off until matt (using air blower).
• If opacity or full coverage has been achieved, proceed to the next step, otherwise apply a 3rd
double cross coat and flash off until matt (using air blower).
• Apply one double or triple mist coat @ full legal pressure at the cap with fluid set at ¾ turns open
and flash off until matt (using air blower). Care should be taken to apply this final basecoat layer
very dry and even without any “wetting up” of the basecoat.
@ 2012 PPG Industries www.ppgrefinish.com ETB005 10/12
NOTE: If blending of the basecoat is required, apply the first double cross coat to
the primed area, then extend each subsequent coat a little further into the panel
using normal blending techniques. As with full panel application, care should be
taken to not “overwet” the final basecoat blended edge. The final mist coat
should be applied very dry and even without “wetting up” the basecoat color.
• Flash off the basecoat for 20 - 30 minutes before clear coating.
FINAL CLEARCOAT APPLICATION:
• Mix and apply Global D8126 CeramiClear Mar and Scratch Resistant Clearcoat to the entire
panel.
o Apply the first coat of clear as a light coat. Avoid overwetting as movement of the liquid
metal material may occur resulting in blotchiness.
o Allow the first coat of clear to flash 10 – 15 minutes
o Apply a second full coat of clear.
o A third full coat may be applied if necessary.
o Bake at 140°F (metal temp) for 30 minutes.
• If necessary and to achieve the smoothest possible final finish, sand with P1200 or finer (dry) and
then re-apply the Mar and Scratch Resistant Clearcoat.
@ 2012 PPG Industries www.ppgrefinish.com ETB005 10/12
')
) AS chunks(chunk_idx, chunk_content);


-- Document: EU142 D8126 CeramiClear Mar & Scratch
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'EU142 D8126 CeramiClear Mar & Scratch',
    'Ceramic clearcoat with enhanced mar and scratch resistance.',
    'other',
    'painting',
    ARRAY['clearcoat_application'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Product Information
D8126 CeramiClear™ Mar and Scratch Resistant Clearcoat
Product Description
D8126 CeramiClearTM is a new nano-technology, mar and scratch resistant, high solid clearcoat. This new clear is
especially designed for the repair of Mercedes-Benz cars that have an OE finish using PPG CeramiClearTM. D8126’s
excellent surface properties also minimizes the visible marring caused by car washing and polishing.
D8126 CeramiClearTM was formulated to meet all current VOC limits and is suitable for use in Southern California
Districts. D8126 was designed for use over Envirobase® Basecoat color and BC Global Basecoat Color.
Preparation of Substrate
Wash all surfaces to be painted with soap and water, then apply the appropriate Global cleaner.
See EU-134 Global Cleaners for selection and usage instructions. Ensure that the substrate is
thoroughly cleaned and dried both before and after application work.
Wet sand with European U.S. 500 – 600 / European P800 – 1200 grade paper or dry sanding with
U.S. 400 – 500 / European P600 – 800 grade paper.
Wash off residue and dry thoroughly before re-cleaning with appropriate Global substrate cleaner.
The use of a tack rag is recommended.
Apply Global BC Color or Envirobase Color over original baked finishes or over recommended
Global Primers. See Data Sheet EU-02 for Global Basecoat Color or EU-130 Envirobase Color for
application details.
Product Information Effective 7/08 EU-142
APPLICATION GUIDE:
Mix Ratio:
D8126 CeramiClear™: 2 vols
D8226 Hardener: 1 vol
Potlife @ 68°F /20°F: 1 hour
Additives:
None
Spraygun set-up:
Fluid Tip 1.3 – 1.5 mm or equivalent
Spray Viscosity 19 – 21 seconds #2 ZAHN @ 68°F / 20°C
Spray pressure:
HVLP at air cap 10 PSI
Conventional at spray gun 45 – 55 PSI
Number of coats:
Apply: 1 medium coat, then 1 full coat (2 coats)
Film build per wet coat 2.1 – 3.1 mils
Dried film build per coat 1.0 – 1.5 mils
Flash off at 68°F / 20°C:
Between coats 5 minutes
Before baking 0 – 5 minutes
Drying times:
Dust-free
68°F / 20°C 30 minutes
Dry to handle
68°F / 20°C 4 hours minimum
140°F / 60°C 30 minutes*
Tape Time
68°F / 20°C 5 – 6 hours
140°F / 60°C 30 minutes + cool down*
Through Dry
68°F / 20°C 8 hours
140°F / 60°C 30 minutes + 2 hours @ room temperature*
IR (Infrared)
Medium Wave 15 minutes
Short Wave 8 minutes
page 2 EU-142
APPLICATION GUIDE
Drying times continued:
Polishing After 24 hours @ 68°F (20°C) D8126 Ceramiclear can be
lightly de-nibbed with 2000 grit sandpaper and compounded.
Use a foam pad with a minor cutting compound to remove
any minor imperfections.
* All force dry times are quoted for metal temperature. Additional time must be allowed during
force dry to allow metal to reach recommended temperature.
Note: For best results, D8126 should be used for full panel repairs.
Overcoat/Recoat:
Overcoat/Recoat Time 10 hours at 68°F / 20°C or after force dry/cool down +
2 hours.
Grade wet U.S. 500 – 600 / European P800 – 1200
Grade dry U.S. 400 – 500 / European P600 – 800
Overcoat with Any compliant Global topcoat system
Blending:
The blend technique used for D8126 Ceramiclear is a “reverse blend process”.
Follow the below instructions for best results:
1. Standard prep - Use 1000 grit on a DA and 1200 grit wet.
2. After finishing color repair, apply 1 wet coat of D8753 Blend-Ease out to the edge of the area
intended for the clear blend. (See note)
3. Mix 1 part of ready-to-spray clear to 1 part of D8753 and apply this mixture on the blend area
where D8753 was applied in step 2.
4. Starting from the blend area and working back into the panel, apply two single coats of the
ready-to-spray clear to the remainder of the refinished panel.
5. Bake or air dry and polish blend area with a fine compound to complete the repair.
Note: For best results, D8126 should be used for full panel repairs.
page 3 EU-142
Technical Data:
Total dry film build
Minimum 2.0 mils
Maximum 2.5 mils
Recommended film build per wet coat 2.1 – 3.1 mils
Recommended dried film build per coat 1.0 – 1.5 mils
RTS Combinations: D8126 : D8226
Volume Ratio: 2 : 1
Applicable Use Category Clear Coating
VOC Actual 168 (g/L)
1.40 (lbs/gal)
VOC Regulatory (less water less exempt) 240 (g/L)
2.00 (lbs/gal)
Density 1074 (g/L)
47.9 (lbs/gal)
Volatiles wt. % 8.96
Water wt. % 0.0
Exempt wt. % 32.3
Water vol. % 0.0
Exempt vol. % 30.4
Solids vol. % 49.8
Sq Ft. Coverage / U.S.gal.
799
(1 mil. @ 100% transfer efficiency)
Health and Safety:
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
·
The contents of this package may have to be blended with other components before the product can
be used. Before opening the packages, be sure you understand the warning messages on the labels and
MSDS’s of all the components, since the mixture will have the hazards of all its parts.
·
Improper handling and use, for example, poor spray technique, inadequate engineering controls and/
or lack of proper Personal Protective Equipment (PPE), may result in hazardous conditions or injury.
·
Follow spray equipment manufacturer’s instructions to prevent personal injury or fire.
·
Provide adequate ventilation for health and fire hazard control.
·
Follow company policy, product MSDS and respirator manufacturer’s recommendations for selection
and proper use of respiratory protection. Be sure employees are adequately trained on the safe use of
respirators per company and regulatory requirements.
·
Wear appropriate PPE such as eye and skin protection. In the event of injury, see first aid
procedures on MSDS.
·
Always observe all applicable precautions and follow good safety and hygiene practices.
Emergency Medical or Spill Control Information (412) 434-4515; In Canada (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general
public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements listed
on label. Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for applications
mentioned are suggestions only and are not to be construed as representations or warranties as to performance, results, or fitness for any intended use, nor
does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
World Leaders In Automotive Finishes
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive
Mississauga, Ontario L5J 1K5
1-888-310-4762
© 2008 PPG Industries www.ppgrefinish.com Part No. EU-142 7/08
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Envirobase HP Toner Characteristics Guide
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Envirobase HP Toner Characteristics Guide',
    'Guide to toner characteristics and color adjustment techniques.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Mixing Base Characteristics
For use in
Code Description Characteristic Solids Mica / Met
T400 White Clean, high strength white. If less than 5% use T402. X (X)
Micronized white used both as a flop adjuster as well as a tool to match
certain OE frost effects in mica/metallic colors. Yellow shade white. Gives a
T401 Ultra Fine White blue shade flop X X
T402 Trace White Clean, weak white. Weak version of T400. X (X)
T403 Micro White Micronized fine white particle with a yellow face and a blue flop. X
T404 Trace Blue Black Weak, blue shade black. Weak version of T406. X X
T405 Graphite Black Gives a smokey / silky aspect. X X
T406 Blue Black High strength blue shade black. If less than 1% use T404. X X
High strength black recommended for use when deep, rich flops are required
T407 Jet Black in both solid and mica/metallic colors. X X
Deep yellow shade black used in both solid and mica/metallic colors. More
T409 Deep Black bluish in tint than T407. X X
T411 Blue Clean red shade blue. X X
T412 Transparent Blue High transparency blue. Gives green shade flop. If less than 1% use T415. X X
T413 Bright Blue Green shade blue with red shade flop. X X
T414 Rich Blue Extreme red shade blue. X X
T415 Trace Blue Weak blue. Gives green shade flop. Weak version of T412. X X
T420 High Strength Blue Neutral tone blue with a greenish flop. X X
Greenish yellow used primarily in metallics. Can be used in solid colors but
T421 Olive not as a primary colorant. (X) X
Non transparent yellow oxide for solid colors. Used in some metallics for flop
T422 Yellow Oxide adjustment. If less than 1% use T423. X (X)
For use in
Code Description Characteristic Solids Mica / Met
T423 Trace Yellow Oxide Weak version of T422. X (X)
T425 Permanent Yellow Green shade yellow, redder than T421. X (X)
T426 Warm Yellow Red shade yellow used primarily in metallic colors. Gives green shade flop. (X) (X)
Bright red shade yellow for solid colors. Used in some metallics for flip tone.
T427 Yellow Lead free. X (X)
Bright green shade yellow for solid colors. Used in some metallics for green
T428 Verdant Yellow shade flop. Lead free. X X
Transparent Golden
T429 Yellow Weak, dirty yellow. Used in mica/metallic colors. (X) X
T430 Transparent Green Yellow shade green for solid and metallic colors. X X
High Strength Phthalo
T431 Green Blue shade green for solid and metallic colors. X X
Transparent iron oxide used to create the red-gold tint appearance primarily in
T432 Transparent Red beige mica/metallic colors. (X) X
Bright orange for solid colors. Used in some metallics for flop adjustment.
T433 Brilliant Orange Lead Free. X (X)
T435 Salmon Red Yellow shade red. (X) X
Opaque red oxide. Used in some metallics for flop adjustment. If less than 1%
T436 Red Oxide use T440. X (X)
Magenta color that offers a blue shade red used in mica/metallic colors, not
T438 Rose normally used in solids. X X
T440 Trace Red Oxide Weak red oxide. Weak version of T436. X (X)
T441 Carmine Bright red used in metallic colors. Rarely used in solids. X X
T442 Brown Dark and yellow shade flop. Used in metallic colors. (X) X
T443 Violet Transparent violet for solid colors and metallics. X X
T444 Bordeaux Semi transparent blue shade red. X X
Cleaner, more transparent magenta that offers a bluer, richer flop than T438.
T445 Transparent Magenta Used in mica/metallic colors. (X) X
T447 Bright Red Yellow shade red for solid colors. Used in metallics to adjust flop. X (X)
T448 Russet Dirty blue shade perylene maroon used in both solid and mica/metallic colors. X X
For use in
Code Description Characteristic Solids Mica / Met
T451 Extra Fine White Pearl White face, travels very light on the flop. X
T452 Fine White Pearl Cleaner than T451, travels lighter than T453 on the flop. X
T453 White Pearl Cleaner than T452, travels darker than T452 on the flop. X
T454 Bright Red Pearl Bright red face, travels darker than T462 on the flop. X
Blue face, travels to neutral tone, slightly yellowish, lighter than T456 on the
T455 Fine Blue Pearl flop. X
T456 Blue Pearl Blue face, travels to neutral tone, slightly yellowish on the flop. X
T457 Green Pearl Green face, travels to neutral tone, slightly reddish on the flop. X
T458 Blue Green Pearl Blue green face, travels to yellowish shade on the flop. X
T459 Copper Pearl Copper face, travels to dark shade copper on the flop. X
T460 Yellow Pearl Yellow face, travels to neutral, slightly bluish tone on the flop. X
T461 Golden Yellow Pearl Gold yellow face, travels to reddish tone on the flop. X
T462 Fine Red Pearl Red face, travels to light red tone on the flop. X
T465 Red Pearl Red magenta face, travels to neutral, slightly greenish tone on the flop. X
T466 Orange Pearl Orange face, travels to neutral tone, slightly yellowish on the flop. X
T468 Violet Pearl Violet face, travels to neutral tone, slightly yellowish on the flop X
T471 Extra Fine Metallic Extra fine gray metallic with a light flop. X
T472 Fine Lenticular Metallic Fine bright metallic with a darker flop than T471. X
T473 Medium Metallic Medium gray metallic with a light flop. X
T474 Fine Metallic Fine gray metallic with a light flop. X
Medium Lenticular
T475 Metallic Medium bright metallic with a darker flop than T473. X
For use in
Code Description Characteristic Solids Mica / Met
Coarse Lenticular
T476 Metallic Coarse lenticular metallic with a darker flop than T477. X
T477 Extra Coarse Metallic Extra coarse metallic with a dark flop. X
Coarse Silver Dollar
T479 Metallic Very bright medium coarse metallic with a dark flop. X
T489 Medium Metallic Gold Medium gold aluminum flake. X
T491 Matting Base Dulls the face. Lightens ½ and full angle. Gives a more coarse appearance. X
T4000 Crystal Silver Sparkle bright white effect, color similar to T453. X
T4001 Sunbeam Gold Sparkle bright gold effect, color similar to T460. X
T4002 Radiant Red Sparkle bright red effect, color similar to T454. X
T4003 Galaxy Blue Sparkle bright blue effect, color similar to T456. X
T4004 Stellar Green Sparkle bright green effect, color similar to T457. X
T4005 Solaris Red Sparkle bright magenta red effect, color similar to T465. X
T4006 Fireside Copper Sparkle bright copper effect. X
T4007 Cosmic Turquoise Sparkle bright unique marine blue flake pigment X
T4008 Amethyst Dream Sparkle bright violet effect, color similar to T468. X
T4031 Autumn Mystery Travels from red to gold to bronze to green X
T4032 Viola Fantasy Travels from lilac to silver to green to blue X
T4033 Arctic Fire Travels from subtle turquoise through brilliant silver to metallic red X
T4034 Tropic Turquoise Travels from green to silver to reddish orange X
T4040 Orange Flash Deep reddish gold aluminum flake, more intense than T489 X
Bright green shade yellow for solid colors. Used in some metallics for green
T4281 Solid Yellow shade flop. Lead free. X X
T4311 Green Blue Green shade face with angle greener than 8916 and 8911 (X) V.Limited Use X
T4321 Yellow Golden yellow tone face with angle deeper than T429 X
T4341 Trans Oxide Red Golden red tone face with angle deeper than T432 X
T4342 Magenta Blue tone face withangle deeper than T445 and T438 (X) V.Limited Use X
T4343 Organic Red Yellowish face with angle deeper than T448 X
X = acceptable use
(X) = acceptable use, trace tinting only
Envirobase is a trademark of PPG Industries Ohio, Inc. EHPCT101 6/13
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Gun Recommendations for Clear
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Gun Recommendations for Clear',
    'Optimal spray gun selection and setup for clearcoat application.',
    'other',
    'painting',
    ARRAY['equipment_and_tools', 'equipment'],
    '{"process_section": "equipment-and-tools", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Clearcoat gun
recommendations
Model Tip/ PSI EC800/DC4010 EC700/EC750 D8126/DC4125
Cap
Tekna 1.2/TE20 24-26 N/R Recommended Recommended
Pro- Lite
Tekna 1.3/TE20 24-26 Recommended Recommended Recommended
DeVilbiss
Pro-lite
Tekna 1.4/TE20 24-26 Recommended N/R N/R
Pro-Lite
Tekna 1.2/7E7 26-30 N/R Recommended Recommended
Tekna 1.3/7E7 24-30 Recommended Recommended Recommended
Tekna 1.4/7E7 24-26 Recommended N/R N/R
*N/R = Not Recommended
Model Tip/ PSI EC800/DC4010 EC700/EC750 D8126/DC4125
Cap
4000RP 1.2/1.2W 28-32 N/R Recommended Recommended
4000RP 1.3 28-32 Recommended Recommended Recommended
4000RP 1.4 24-26 Recommended N/R N/R
4000HVLP 1.2 28.29 N/R Acceptable Acceptable
4000HVLP 1.3 28-29 Acceptable Recommended Recommended
SATA
4000HVLP 1.4 24-26 Recommended Acceptable Acceptable
3000RP 1.2 32-35 N/R Recommended Recommended
3000RP 1.3 32-35 Recommended Recommended Recommended
3000RP 1.4 24-26 Recommended N/R N/R
3000HVLP 1.2 32-35 N/R Recommended Recommended
3000HVLP 1.3 32-35 Recommended Recommended Recommended
3000HVLP 1.4 24-26 Recommended N/R N/R
*N/R = Not Recommended
Model Buse/ PSI EC800/DC4010 EC700/EC750 D8126/DC4125
Chapeau
Anest LPH400LV 1.3 26-28 N/R Recommended Recommended
LPH400LV 1.4 24-26 Recommended N/R N/R
Iwata W400LV 1.3 26-28 N/R Recommended Recommended
W400LV 1.4 24-26 Recommended Acceptable N/R
WS400 1.3 22-26 Acceptable Acceptable Acceptable
WS400 1.4 22-26 Recommended Recommended Recommended
*N/R = Not Recommended
NOTE: PPG Industries does NOT endorse any particular type or brand of application equipment. The
above recommendations are only a general reference and should be used solely as a starting point. Your
particular spray environment and application technique may require slight adjustments. All equipment was
tested using “full trigger” during application with regulators approved by each gun manufacturer.
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Matt/Reduced Gloss Clears
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Matt/Reduced Gloss Clears',
    'Matte and reduced gloss clearcoat options for specialty finishes.',
    'other',
    'painting',
    ARRAY['clearcoat_application'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'February 2012
Matt/Reduced‐Gloss Clearcoats for OEM Colors
New Five Band Format
A new five band format for communicating matt/reduced‐gloss clearcoat recommendations for OEM colors is
being introduced globally. This new format was introduced in Europe and Asia in December 2011 and will be
introduced here in North America immediately in On‐Line Color, the February internet update, and the 1 of
2012 PaintManager™ CD update. It will apply to all brands and product lines.
This format is similar to the way in which spectral grey/grey‐shade undercoat recommendations are
communicated. The new format will replace all previous arrangements for recommending matt/reduced‐gloss
clearcoats. When an OEM color is finished with a reduced‐gloss clearcoat, the recommended matt clearcoat
will be referenced in a comment.
Benefits to this new format include:
 Clear customer information ‐ Provides a clear, simple, easy‐to‐understand recommendation to help the
customer select the correct matt or reduced‐gloss clearcoat for the OEM color being refinished.
 Eliminates data inconsistencies ‐ The adoption of the new color laboratory process will eliminate
inconsistencies in the way that matt/reduced‐gloss clearcoat information is collected. Information can be
shared more easily and efficiently between color laboratories and regions.
 Reduces complexity ‐ Reduces the current number of potential matt/reduced‐gloss clearcoat
recommendations from more than 40 to just five.
The five bands will be represented as follows:
PPG
Band Description Comments
Brand
1 Flat FC01 Aligns with very low gloss clearcoats (Lamborghini and Lexus)
2 Matt FC02 Little or no OEM activity in this range at the current time
3 Eggshell FC03 Aligns with the reduced‐gloss clearcoats seen on Mercedes‐Benz and other OEMs
4 Satin FC04 This range most commonly seen on bumpers and lower body cladding parts
5 Semi‐gloss FC05 This range most commonly seen on bumpers and lower body cladding parts
 ‘FC’ refers to flat clearcoat
Matt/Reduced‐Gloss Clearcoats for OEM Colors (continued)
When a matt/reduced‐gloss clearcoat has been assigned to a color, the comment will be displayed in
PaintManager™ and On‐Line Color Formulations:
Mixing Information – Matt/Reduced Gloss Clearcoat
Information for mixing matt or reduced‐gloss clearcoats will be stored in and accessed from the RTS Master List
in PaintManager™. Please also refer to the relevant product data sheet.
The SU4985 and SLV4985 product data sheets have also been updated to reference this new format.
NOTE: The actual gloss achieved by a painter can vary significantly as a result of variables in application,
temperature, hardener/thinner choice, etc. It is strongly encouraged that a test panel be sprayed before
painting the vehicle.
2
')
) AS chunks(chunk_idx, chunk_content);


-- Document: OC-1 Plastic Prep System
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'OC-1 Plastic Prep System',
    'Complete plastic preparation system overview and procedures.',
    'other',
    'painting',
    ARRAY['surface_prep', 'plastic'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'OC-1
Plastic Prep System
SU4901
Clean and Scuff Sponge
SU4902
Plastic Adhesion Wipe
SU4903
Advance Plastic Bond (Quart)
SUA4903
Advance Plastic Bond (Aerosol)
PPG One Choice® brand Plastic Prep System
is designed to simplify the plastic refinish
prep process and deliver superior adhesion
to all common automotive plastic
substrates.
Features Required Products Compatible Products
· ·
Convenient ready-to-apply SU4901 Clean and Scuff The One Choice Plastic Prep System is for universal use
packaging Sponge with PPG Brand Topcoats and Undercoats.
· ·
Fast application and dry times SU4902 Plastic Adhesion
Note: When applying PPG topcoats and undercoats over plastic
Wipe
substrates, please refer to the products specific technical bulletin
·
SU4903 Advance Plastic for proper application.
Advantages
Bond
· Can be used on all common · SUA4903 Advance Plastic
automotive plastic substrates Bond (Aerosol) Compatible Surfaces
·
Significantly reduces the All common primed and unprimed automotive plastic substrates
potential for warranty repairs
Related Products
·
SXA103 Multi-Prep (Aerosol)
Benefits
·
· DX103 Multi-Prep
Simple, easy-to-use-process
·
Shorter refinish cycle time
·
Superior adhesion
Product Information Effective 1/09
Plastic Prep System
SU4901 SU4903
Clean and Scuff Sponge Advanced Plastic Bond
SU4902 SUA4903
Plastic Adhesion Wipe Advanced Plastic Bond (Aerosol)
Application Data
Process for Pre-Primed Plastic Substrates
Step 1: Using the SU4901 Clean and Scuff Pad…
Tear open SU4901 and clean the substrate thoroughly using the scuff pad side of the
pre-saturated sponge, then rinse with water. Blow dry or wipe with a clean cloth. Entire surface
must be totally de-glossed. Make sure surface is thoroughly dry before proceeding.
Step 2: Using 400 grit sandpaper (hand sand or D.A. machine sand), abrade the entire
surface to be painted.
Blow off and wipe dry or wipe with a clean cloth. Entire surface must be totally de-glossed
before moving to the next step.
Step 3: Anti-static final clean, using SXA103/DX103 Multi-Prep…
Using a clean white cloth, wiping in one direction, final clean the part with SXA103/DX103.
Immediately wipe dry using a separate clean white cloth. Allow 3 –5 minutes to ensure proper
flash before proceeding to the topcoat.
Process for Unprimed Plastic Substrates (Patent Pending)
Step 1: Using the SU4901 Clean and Scuff Pad…
Tear open SU4901 and clean the substrate thoroughly using the scuff pad side of the
pre-saturated sponge, then rinse with water. Blow dry or wipe with a clean cloth. Entire
surface must be totally de-glossed. Make sure surface is thoroughly dry before proceeding.
If the part sits longer than 8 hours, step 1 must be repeated.
Step 2: Using the SU4902 Plastic Adhesion Wipe…
Tear open SU4902. This is an advanced film former that promotes excellent adhesion and
removes static charge from unprimed plastic substrates. Apply a light even coat on the entire
area, wiping in one direction to minimize product overlap. Allow 3 –5 minutes flash time.
If the part sits longer than 1 hour, step 2 must be repeated.
Step 3: Using the SU4903 or SUA4903 (Aerosol) Advance Plastic Bond…
Apply a light coat of either SUA4903 (Aerosol) or SU4903 and allow 5 minutes dry time or until
completely flashed to a matt finish, prior to topcoat or sealing.
If the final coat of SU/SUA4903 is left longer than 8 hours, tack, wipe and reapply 1 light coat
before sealing or topcoating.
Aerosol Can Disposal: When material in can is spent, turn can upside down and depress the nozzle until all propellant
is exhausted. Place empty can or cans that are no longer to be used into properly labeled metal
containers. The waste containers should be managed as a hazardous waste pursuant to local, state
and federal regulations.
Page 2 OC-1
Application Chart
Note: Products used to refinish flexible bumper covers fall under the category of SPECIALTY COATINGS, therefore
products specified in the system below may be used in any VOC regulated area.
Thoroughly clean and scuff the substrate using the pre-saturated SU4901 Clean and Scuff Pad, then rinse
thoroughly with water. Water should sheet (flat run off) from the surface, if not, repeat the process.
Blow dry or wipe with a clean cloth. Entire surface must be totally de-glossed. Make sure surface is thoroughly dry before proceeding.
New Panels Existing Panels
Pre-Primed Plastic Unprimed Plastic Heavily Damaged Repair
Minor Repair
Substrates Substrates (Tears, Punctures, Etc.)
Using 400 grit sandpaper,
hand sand or D.A. Using the SU4902 Plastic
machine the entire Adhesion Wipe, apply a
surface to be painted. light even coat over the Apply SXA103/DX103 Apply SXA103/DX103
Blow off and wipe with entire area, wiping in Multi-Prep as a final wipe Multi-Prep as a final wipe
a clean cloth. Entire one direction to minimize and anti-static agent. and anti-static agent.
surface must be totally product overlap. Allow a
de-glossed before moving 3 – 5 minutes flash time.
to next step.
Flexible Repair
Material or Plastic Weld
as required.
Apply SU4903 or Apply SU4903 or
SUA4903 (Aerosol) SUA4903 (Aerosol)
Advance Plastic Bond. Advance Plastic Bond.
Allow 5 minute flash. Allow 5 minute flash.
Repair with DS1002 or Repair with DS1002 or
Apply SX1056
D8080 UV Cured Primer D8080 UV Cured Primer
Flexible 2K Sealer
Surfacer or SX1057 Surfacer or SX1057
(if required)
Flexible 2K Surfacer. Flexible 2K Surfacer
Apply SU4903 or
Apply SXA103/DX103 Apply SX1056 Apply SX1056
SUA4903 (Aerosol)
Multi-Prep as a final wipe Flexible 2K Sealer Flexible 2K Sealer
Advance Plastic Bond.
and anti-static agent. (if required). (if required).
Allow 5 minute flash.
TOPCOAT WITH ANY FLEXIBILIZED DELTRON or GLOBAL TOPCOAT SYSTEM
For additional information, refer to the appropriate topcoat systems product bulletin.
Page 3 OC-1
Plastic Prep System
Properties:
Product Packaged VOC Less Volume Solids SQ. FT. Coverage @ 1 mil
Exempts (lbs./US Gal.) (RTS) (100% transfer efficiency)
SU4901 0.05 N/A N/A
SUA4903 5.95 N/A N/A
SU4902 SU4903
RTS Volume Ratio: As is RTS Volume Ratio: As is
Applicable Use Category Adhesion Promoter Applicable Use Category Adhesion Promoter
VOC Actual (g/L) 835 VOC Actual (g/L) 834
VOC Actual (lbs/gal) 6.97 VOC Actual (lbs/gal) 6.96
VOC Regulatory 835 VOC Regulatory 834
(less water less exempt) (g/L ) (less water less exempt) (g/L)
VOC Regulatory 6.97 VOC Regulatory 6.96
(less water less exempt) (g/L ) (less water less exempt) (g/L )
Density (g/L) 858 Density (g/L) 875
Density (lbs/gal) 7.16 Density (lbs/gal) 7.30
Volatiles wt. % 97.4 Volatiles wt. % 95.4
Water wt. % 0.0 Water wt. % 0.0
Exempt wt. % 0.0 Exempt wt. % 0.0
Water vol. % 0.0 Water vol. % 0.0
Exempt vol. % 0.0 Exempt vol. % 0.0
See material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434 -4515. IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the
general public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and
warning statements listed on label. Statements and methods described are based upon the best information and practices known to
PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as
to performance, results, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein.
PPG Industries
World Leaders in Automotive Finishes
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive
Mississauga, Ontario, Canada L5J 1K5
1-888-310-4762
© 2009 PPG Industries www.ppgrefinish.com Part No. OC-1 1/09
')
) AS chunks(chunk_idx, chunk_content);


-- Document: OC-36 SX Metal Treatments
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'OC-36 SX Metal Treatments',
    'Metal treatment procedures and specifications for optimal adhesion.',
    'other',
    'painting',
    ARRAY['surface_prep', 'metal'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '-
A Universal Ancillary Brand OC 36
SX Metal Treatments
SX501 / SX503 / SX520 / SX533 / SX579
The ONECHOICE® SX Metal Treatments are
specifically designed to clean, condition and
fortify the corrosion resistance and adhesion of
metal substrates.
Features & Benefits Compatible Surfaces
• Proven technology • Iron (no cast iron)
• Compatible with most metal substrates • Steel
• Convenient packaging • Galvanized
• Higher productivity • Galvaneal
• Lower finishing costs • Aluminum
• Brass
• Copper
• Chrome
• Nickel
• Stainless Steel
Compatible Products
DPLF Epoxy Primers
DPLV 2.1 Epoxy Primers
Followed by any PPG topcoat system
© 2015 PPG Industries www.ppgrefinish.com OC-36 9/15
Metal Treatments
SX501, SX503, SX520, SX533, SX579
SSSSXXXX555533333333 AAAAlllluuuummmmiiiinnnnuuuummmm CCCClllleeeeaaaannnneeeerrrr
SX533 is a phosphoric acid based cleaner, brightener and prepaint conditioner for aluminum substrates. It is used to deep clean and
brighten an aluminum surface prior to welding & painting, or as the first step in a two part process to prepare the surface for a
subsequent application of chemical conditioner SX503. SX533 is clear in color.
SSSSXXXX555500003333 AAAAlllluuuummmmiiiinnnnuuuummmm CCCCoooonnnnddddiiii(cid:22)(cid:22)(cid:22)(cid:22)oooonnnneeeerrrr
SX503 is a chromic acid based conditioner that will form a chrome conversion layer on aluminum and its alloys when applied after a
SX533 cleaning step. The conversion coating formed by SX503 is gold to tan and becomes a part of the aluminum surface. SX503 is
medium orange in color and may darken over time.
SSSSXXXX555577779999 MMMMeeeettttaaaallll CCCClllleeeeaaaannnneeeerrrr
SX579 is a multi-purpose phosphoric acid based cleaner and prepaint conditioner for most metals. It can be used to deep clean a
metal surface prior to paint or to prepare a surface for a subsequent chemical conversion coating (when followed by SX520 or
SX501). SX579 is blue in color and could lighten over time.
SSSSXXXX555522220000 MMMMeeeettttaaaallll CCCCoooonnnnddddiiii(cid:22)(cid:22)(cid:22)(cid:22)oooonnnneeeerrrr
SX520 is a phosphoric acid based conditioner that will deposit a uniform layer of zinc phosphate on properly prepared galvanized
and steel surfaces. SX520 is intended as the second step in a two step process, following SX579 application. SX520 is pale green in
color and may turn darker over time.
SSSSXXXX555500001111 AAAAlllluuuummmmiiiinnnnuuuummmm CCCCoooonnnnddddiiii(cid:22)(cid:22)(cid:22)(cid:22)oooonnnneeeerrrr
SX501 is also chromic acid based but the conversion layer formed is clear in color, also intended to be applied after the SX579
cleaning step. It is used when it is desirable to retain the aluminum substrate’s silver white finish, either unpainted or with a clear
coating applied over the treated metal. Do not dilute SX501 with hot water or a change in color may occur of the diluted mixture and
the resulting chemical conversion layer. The resulting color will be similar to SX503. SX501 is light orange in color.
NNNNooootttteeeessss:
• If the intended coating process includes spray applying Wash Primers (also known as etch primers or pretreatment coatings) to
properly sanded and cleaned bare metal substrates, SX Metal Treatments in any combination are not required or advisable.
• SX Metal Treatments are not recommended or advisable on sandblasted metal.
• Consult SDS for hazardous ingredient content. Run-off of the products contain acid and may be considered hazardous. SX501
and SX503 contain hexavalent chromium residues, will always be considered hazardous. Run-off residues may not be allowed in
local sewer discharge, may have to be captured and special disposal steps required. Consult local Publicly Owned Treatment
Works (POTW) / sewer authority to determine correct disposal procedures.
• Read the printed instructions on the container prior to use.
• For optimal results keep metal surface saturated/wet with SX metal treatment until rinse.
• For optimal results with Metal Cleaner SX579 or Aluminum Cleaner SX533, apply chemicals with acid resistant brush or
synthetic abrasive pad.
• When treating galvanized or galvaneal metal, always use an abrasive pad.
© 2015 PPG Industries www.ppgrefinish.com OC-36 9/15
Metal Treatments
SX501, SX503, SX520, SX533, SX579
Directions for Use
Application:
• Use the steps below to condition and fortify the corrosion resistance and adhesion of metal substrates.
• Abrade the bare metal surface, remove surface rust and remove all contaminants with the appropriate PPG cleaner
before proceeding to Step 1.
• For optimum results keep metal surfaces saturated / wet with SX metal treatments until rinse.
Metal Step #1 Step #2
Iron (no cast iron) • Apply Metal Cleaner (SX579) mixed 1:2 • Apply Metal Conditioner (SX520)
Steel with water using an acid resistant brush straight from the container.
Galvanized or synthetic abrasive pad. • Allow to react 1-2 minutes, then rinse
Galvaneal • Allow to react 2-3 minutes, then rinse well with cool clean water and dry. For
with cool clean water. Water should sheet Galvanized or Galvaneal use an abrasive
over entire surface. For Galvanized or pad.
Galvaneal, use abrasive pad while • Prime with DPLF or DPLV Epoxy Primer
applying within the same day.
Aluminum: to be painted • Apply Aluminum Cleaner (SX533) For painted finish:
mixed 1:3 with water using an acid • Apply Aluminum Conditioner (SX503)
resistant brush or synthetic abrasive pad. straight from the container.
• Allow to react 2-3 minutes and rinse well • Allow to react 1-3 minutes until a golden
with cool clean water. Rinse water should or tan color appears.
sheet over entire surface. • Rinse well with cool clean water and dry.
• Prime with DPLF or DPLV Epoxy Primer
within the same day.
Aluminum: to be clearcoated • Apply Metal Cleaner (SX579) mixed For clear finish:
Brass 1:10 with cold water. Check a small spot • Apply aluminum Conditioner (SX501)
Copper first to be sure it does not discolor mixed 1:1 with cold water.
aluminum. Work from the bottom up. • Allow to react 1-3 minutes
• Rinse with cool clean water. • Rinse well using cool clean water and dry.
Do not overapply, may yellow metal
surface.
• Apply appropriate clearcoat (DAU75)
where VOC rules allow.
Chrome • Apply Aluminum Cleaner (SX533) and • Apply DPLF or DPLV Epoxy Primer
Nickel scour with an abrasive pad.
Stainless Steel • Rinse well with water and dry.
Magnesium No Recommendation
Anodized Aluminum No Recommendation
Lead • Wash with a 1:1:1 (ammonia : alcohol : • Apply DPLF or DPLV Epoxy Primer
water) mixture.
• Rinse with cool clean water and dry.
Technical Data:
VOC Actual VOC Regulatory
Product: Blend Ratio:
(or VOC Content) (or VOC Less Water Less Exempts)
SX501 1 : 1 with water 0.0 lbs./ US Gal. (0 g/L) 0.0 lbs./ US Gal. (0 g/L)
SX503 As is 0.0 lbs./ US Gal. (0 g/L) 0.0 lbs./ US Gal. (0 g/L)
SX520 As is 0.0 lbs./ US Gal. (0 g/L) 0.0 lbs./ US Gal. (0 g/L)
SX533 1 : 3 with water 0.23 lbs./ US Gal. (28 g/L) 4.20 lbs./ US Gal. (503 g/L)
SX579 1 : 2 with water 0.64 lbs./ US Gal. (77 g/L) 4.43 lbs./ US Gal. (531 g/L)
SX579 1 : 10 with water 0.17 lbs./ US Gal. (20 g/L) 4.43 lbs./ US Gal. (531 g/L)
© 2015 PPG Industries www.ppgrefinish.com OC-36 9/15
Metal Treatments
SX501, SX503, SX520, SX533, SX579
See Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434-4515; IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the public.
Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements listed on
label. Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for applications
mentioned are suggestions only and are not to be construed as representations or warranties as to performance, results, or fitness for any intended use,
nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Industries
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive Unit #6
Strongsville, OH 44149 Mississauga, Ontario Canada L5J 1K5
The PPG Logo, OneChoice, and Bringing innovation to the surface are trademarks of PPG Industries Ohio, Inc.
© 2015 PPG Industries www.ppgrefinish.com OC-36 9/15
')
) AS chunks(chunk_idx, chunk_content);


-- Document: OC-6 SX1071 Etch Prime
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'OC-6 SX1071 Etch Prime',
    'Etch prime application for enhanced surface preparation and adhesion.',
    'other',
    'painting',
    ARRAY['surface_prep', 'primer'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'OC-6
Etch Primer
SX1071
Etch Prime
SX1071 Etch Prime is a 2 component
acid etch primer specifically designed to
provide excellent adhesion and corrosion
resistance to properly prepared steel
and aluminum while offering fast dry
characteristics.
Features Required Products
· ·
Fast Dry Formula SX1071 Etch Prime
· ·
Adhesion To Most Metal SX1072 Etch Prime Catalyst
Substrates
Related Products
Advantages
·
· Recommended PPG brand primer/surfacers and sealers
Faster Through Put
·
Fewer Products Needed
Compatible Products
Benefits SX1071 Etch Prime can be appplied over bare steel, aluminum, galvanized metals and
· GRP / Fiberglass polyester fillers after degreasing and sanding.
Higher Productivity
· Lower Finishing Costs Note: When using SX1071 Etch Prime with recommended PPG brand primer surfacers and
sealers, please refer to the products specific technical bulletin for proper application.
Do Not apply topcoats directly over etch primer.
Do Not apply polyester filler directly over etch primer.
Preparation of Substrate
·
In all cases, wash all surfaces to be painted with soap and water, then apply the appropriate
systems cleaner. Ensure that the substrate is thoroughly cleaned and dried both before and after
application work.
·
Sand the bare metal areas completely with 80-180 grit abrasive.
·
Wash off residue and dry thoroughly before recleaning with appropriate systems substrate cleaner.
The use of a tack rag is recommended.
·
Etch Prime aluminum substrate as soon as possible and no later than 8 hours
after cleaning steps.
·
Etch Prime carbon steel immediately after cleaning.
Product Information Effective 3/09
Etch Prime
SX1071
Application Data
Application: SX1071 : SX1072
1 : 1
Pot life is 24 hours at 70°F (21°C). Pot life is shortened as temperatures increase.
Viscosity is 11 – 14 seconds DIN 4 @ 70°F (21°C)
Spraygun Set-up Apply: 2 medium coats
Do not apply excessive film builds to avoid poor adhesion and drying.
Fluid Tip: HVLP: 1.3 – 1.5 mm (.050” – .059”) or equivalent
Air Pressure: 10 PSI at the cap for HVLP guns (maximum)
For compliant or conventional equipment, refer to the gun
manufacturer’s reccommendations.
Dry Times: Between Coats: 2 – 3 minutes
Dry to Prime: 15 minutes minimum @ 70°F (21°C)
Recoat: SX1071 must be topcoated with a compatible surfacer or sealer before
70°F (21°C) applying a topcoat. If left uncoated for more than 24 hours, lightly
scuff and apply an additional coat.
Do not apply topcoats directly over SX1071.
Technical Data: RTS Combinations: SX1071 : SX1072
Volume Ratio: 1 : 1
Applicable Use Category Pretreatment Coating
VOC Actual 288 (g/L)
2.40 (lbs/gal)
VOC Regulatory 657 (g/L)
(less water less exempt) 5.48 (lbs/gal)
Density (g/L) 1095 (g/L)
9.14 (lbs/gal)
Volatiles wt. % 84.1
Water wt. % 0.2
Exempt wt. % 57.6
Water vol. % 0.2
Exempt vol. % 55.9
Solids, wt.% 15.9
Solids, vol% 9.0
Important: Before opening the packages, be sure you understand the warning messages on the labels of all components, since the
mixture will have the hazards of all its parts. Improper spray technique may result in a hazardous condition. Follow spray
equipment manufacturer’s instructions to prevent personal injury or fire. Follow directions for respirator use. Wear eye
and skin protection. Observe all applicable precautions.
See material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434 -4515. IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to
the general public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions
and warning statements listed on label. Statements and methods described are based upon the best information and practices known to
PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as
to performance, results, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein.
PPG Industries
World Leaders in Automotive Finishes
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive
Strongsville, OH 44149 Mississauga, Ontario, Canada L5J 1K5
1-800-647-6050 1-888-310-4762
© 2009 PPG Industries www.ppgrefinish.com Part No. OC-6 3/09
')
) AS chunks(chunk_idx, chunk_content);


-- Document: OC-7 Universal Flattening Agent
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'OC-7 Universal Flattening Agent',
    'Universal flattening agent for creating matte finish effects.',
    'other',
    'painting',
    ARRAY['unique_finishes'],
    '{"process_section": "unique-finishes", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'A Universal Ancillary Brand OC - 7
Universal Flattening Agent LV
SLV4985
SLV4985 is a Low VOC Universal Flattening Agent
designed for use across product lines with compatible
PPG clearcoats. Motor manufacturers have been
introducing various degrees of gloss in basecoat
clearcoat finishes for bumper, clad and trim colors.
There are five levels of gloss available for clearcoats
ranging from flat to semi-gloss. Gloss levels are
represented as FC01-FC05 for PPG brands and MC01-
MC05 for the NEXA AUTOCOLOR® brand. The level
of SLV4985 in the formula will determine the degree
of gloss.
Single stage topcoats are only offered in the three gloss
levels of flat, eggshell, and semi-gloss.
Features Required Products Compatible Products
• Easy mixing ratios • SLV4985 Universal Flattening • ONECHOICE® SLV4985 Universal Flattening Agent LV is for
• Produces consistent results Agent LV use with PPG Brand clearcoats and single stage topcoats.
• Five available levels of gloss Related Products
Note: When adding SLV4985 to recommended PPG and Nexa
Advantages • PPG brand clears and single Autocolor brand products, please refer to the products’ specific
stage topcoats. technical bulletin for proper application.
• Can be used in DELTRON®,
ENVIROBASE® High
Performance, GLOBAL
REFINISH SYSTEM™,
AQUABASE® Plus, Nexa
Autocolor, OMNI™, SHOP-
LINE®, and VALUE-PRO™
clearcoats and single stage
topcoats.
Benefits
• Customer satisfaction
• Versatility and reliability
© 2015 PPG Industries www.ppgrefinish.com OC-7 5/15 Page 1
SLV4985 - Universal Flattening Agent LV
The chart below indicates the number of parts or grams of clear, flattening agent, hardener and reducer to make one ready to spray quart (32 oz.)
of low gloss clearcoat in varying degrees of gloss ranging from flat to semi gloss. To mix one pint (16 oz.), divide each number by 2. Unless
specified below, additional reducers and hardeners that may be used for a particular paint system will appear in the product bulletin for that
system. The numbers of coats, application, and technique will determine final appearance. It is recommended to use a slower solvent for best
overall results and to spray a test panel to verify final appearance. For additional ready to use volumes, refer to the PAINTMANAGER® program
software.
All numbers are represented as NON-CUMULATIVE Parts (or Grams).
FC01/MC01=Flat FC02/MC02= Matt FC03/MC03=Eggshell FC04/MC04=Satin FC05/MC05=Semi-Gloss
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts Red
(G
uc
ra
e
m
r P
s)
a rts
Bulletin
Deltron
FC01 424 (376) 687 (610) 165 (147) -
FC02 493 (437) 601 (533) 178 (157) -
DCU2010 FC03 531 (471) 552 (489) 184 (164) - P-228CA
FC04 550 (488) 528 (468) 188 (167) -
FC05 588 (522) 480 (426) 195 (173) -
FC01 435 (385) 653 (579) 157 (139) -
FC02 453 (402) 628 (557) 161 (142) -
DC3010 FC03 491 (435) 579 (513) 168 (149) - P-242
FC04 509 (451) 554 (491) 171 (152) -
FC05 545 (484) 506 (448) 178 (158) -
FC01 472 (418) 602 (534) 166 (148) -
FC02 509 (451) 553 (490) 173 (154) -
DC4010 FC03 539 (478) 516 (458) 179 (159) - P-243
FC04 563 (500) 481 (426) 183 (162) -
FC05 590 (523) 451 (399) 186 (165) -
FC01 285 (253) 708 (628) 252 (223) -
FC02 316 (280) 658 (583) 265 (235) -
DC4125 FC03 331 (293) 633 (561) 271 (240) - P-244
FC04 360 (319) 584 (518) 283 (251) -
FC05 374 (332) 560 (497) 290 (257) -
DT1855 / D8767
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts
Red
(G
uc
ra
e
m
r P
s)
a rts Bulletin
Envirobase High Performance
FC01 256 (227) 619 (549) 128 (114) 250 (222)
FC02 304 (269) 560 (496) 140 (125) 248 (220)
EB-530
EC530 FC03 320 (283) 540 (479) 144 (128) 247 (219)
For VOC compliance, DT1855
FC04 351 (311) 502 (445) 152 (135) 245 (217)
or D8767 reducers must be used
FC05 366 (325) 483 (428) 156 (138) 244 (217)
with these blends.
FC01 509 (451) 606 (537) 156 (138) -
FC02 553 (491) 552 (489) 164 (145) -
EC700 FC03 573 (508) 528 (468) 167 (148) - EB-700
FC04 603 (535) 492 (436) 171 (152) -
FC05 642 (569) 444 (394) 177 (157) -
FC01 509 (451) 606 (537) 156 (138) -
FC02 553 (591) 552 (489) 164 (145) -
EC750 FC03 573 (508) 528 (468) 167 (148) - EB-750
FC04 603 (535) 492 (436) 171 (152) -
FC05 642 (569) 444 (394) 177 (157) -
FC01 342 (303) 533 (473) 137 (121) 256 (227)
FC02 387 (343) 474 (420) 145 (129) 254 (225)
EC800 FC03 402 (356) 454 (403) 148 (131) 253 (225) EB-800
FC04 417 (369) 434 (385) 151 (134) 253 (224)
FC05 431 (382) 415 (368) 153 (136) 252 (224)
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts D
P
8
a
7
r
6
ts
7
(
R
G
e
r
d
a
u
m
c
s
e
)
r
Bulletin
Global Refinish System
FC01 285 (253) 708 (628) 252 (223) -
FC02 316 (280) 658 (583) 265 (235) -
D8126 FC03 331 (293) 633 (561) 271 (240) - EU142
FC04 360 (319) 584 (518) 283 (251) -
FC05 374 (332) 560 (497) 290 (257) -
FC01 422 (374) 551 (489) 178 (158) 144 (127)
FC02 457 (405) 508 (451) 186 (165) 143 (126)
D8188 FC03 483 (428) 479 (425) 191 (169) 142 (126) EU147
FC04 511 (453) 442 (392) 198 (179) 141 (125)
FC05 519 (460) 434 (385) 217 (193) 141 (125)
© 2015 PPG Industries www.ppgrefinish.com OC-7 5/15 Page 2
SLV4985 - Universal Flattening Agent LV
P850-1775
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts
Red
(G
uc
ra
e
m
r P
s)
a rts Bulletin
Nexa Autocolor
MC01 285 (253) 708 (628) 252 (223) -
MC02 316 (280) 658 (583) 265 (235) -
P190-6490 MC03 331 (293) 633 (561) 271 (240) - RM3110
MC04 360 (319) 584 (518) 283 (251) -
MC05 374 (332) 560 (497) 290 (257) -
MC01 381 (337) 524 (464) 142 (126) 256 (227)
MC02 413 (366) 484 (429) 147 (131) 255 (226)
P190-6720 MC03 445 (395) 445 (394) 153 (136) 253 (225) RM2853C-4
MC04 470 (416) 414 (367) 159 (141) 252 (223)
MC05 500 (443) 377 (334) 164 (146) 251 (223)
MC01 422 (374) 551 (489) 178 (158) 144 (127)
MC02 457 (405) 508 (451) 186 (165) 143 (126)
P190-6730 MC03 483 (428) 479 (425) 191 (169) 142 (126) RM2853C-1
MC04 511 (453) 442 (392) 198 (176) 141 (125)
MC05 519 (460) 434 (385) 217 (193) 141 (125)
MC01 252 (224) 611 (542) 113 (101) 323 (286)
MC02 298 (264) 552 (489) 124 (110) 319 (283)
P190-6759 MC03 328 (291) 513 (455) 132 (117) 317 (281) RM2853C-2
MC04 357 (317) 475 (421) 139 (123) 315 (279)
MC05 372 (330) 456 (404) 142 (126) 314 (278)
MC01 252 (224) 611 (542) 113 (101) 323 (286)
MC02 298 (264) 552 (489) 124 (110) 319 (283)
P190-6790 MC03 328 (291) 513 (455) 132 (117) 317 (281) RM2853C-3
MC04 357 (317) 475 (421) 139 (123) 315 (279)
MC05 372 (330) 456 (404) 142 (126) 314 (278)
MC01 342 (303) 533 (473) 137 (121) 256 (227)
MC02 387 (343) 474 (420) 145 (129) 254 (225)
P190-6800 MC03 402 (356) 454 (403) 148 (131) 253 (225) RM2853C-5
MC04 417 (369) 434 (385) 151 (134) 253 (224)
MC05 431 (382) 415 (368) 153 (136) 252 (224)
MC01 256 (227) 319 (549) 128 (114) 250 (222)
MC02 304 (269) 560 (496) 140 (125) 248 (220)
RM2853C-2
P190-6930 MC03 320 (283) 540 (479) 144 (128) 247 (219)
For VOC compliance, P850-1775
MC04 351 (311) 502 (445) 152 (135) 245 (217)
reducer must be used with these
MC05 366 (325) 483 (428) 156 (138) 244 (217)
blends.
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts M
P
R
a
2
rt
9
s
7
(
R
G
e
ra
d
m
uc
s
e
)
r
Bulletin
Omni
FC01 377 (334) 701 (621) 160 (142) -
FC02 413 (366) 651 (577) 167 (148) -
MC262 FC03 441 (391) 610 (541) 174 (154) - OB37
FC04 467 (414) 577 (511) 177 (157) -
FC05 484 (429) 552 (490) 181 (160) -
FC01 356 (316) 566 (502) 125 (111) -
FC02 390 (346) 524 (466) 131 (116) -
MC730 FC03 423 (375) 485 (430) 137 (122) - OB59
FC04 456 (404) 445 (395) 143 (127) -
FC05 472 (419) 426 (378) 146 (129) -
FC01 348 (308) 564 (500) 134 (118) -
FC02 405 (359) 494 (438) 144 (127) -
MC760 FC03 437 (388) 454 (403) 149 (133) - OB52
FC04 453 (402) 435 (385) 152 (135) -
FC05 485 (430) 396 (351) 158 (140) -
FC01 479 (425) 596 (528) 169 (149) -
FC02 536 (475) 524 (465) 177 (157) -
MC770 FC03 557 (494) 491 (436) 182 (161) - OB46
FC04 591 (524) 453 (402) 185 (164) -
FC05 610 (541) 430 (381) 187 (166) -
FC01 334 (296) 717 (636) 238 (211) -
FC02 387 (343) 640 (567) 259 (230) -
MC2910 FC03 421 (373) 590 (523) 273 (242) - OB58
FC04 454 (402) 542 (480) 286 (253) -
FC05 502 (445) 471 (418) 305 (270) -
© 2015 PPG Industries www.ppgrefinish.com OC-7 5/15 Page 3
SLV4985 - Universal Flattening Agent LV
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts M
P
R
a
2
rt
9
s
7
(
R
G
e
ra
d
m
uc
s
e
)
r
Bulletin
Omni Cont’d
FC01 349 (309) 749 (663) 88 (78) 103 (91)
MTX FC03 521 (461) 657 (581) 104 (92) 120 (106) OB47
FC05 467 (431) 563 (498) 119 (105) 137 (121)
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts J
P
R
a
5
r
5
ts
6
(
R
G
e
r
d
a
u
m
c
s
e
)
r
Bulletin
Shop-Line
FC01 525 (465) 502 (445) 227 (201) -
FC02 580 (514) 434 (385) 233 (206) -
JC70 FC03 616 (546) 389 (345) 237 (210) - SL70
FC04 671 (595) 323 (286) 242 (215) -
FC05 688 (610) 301 (267) 244 (217) -
FC01 479 (425) 590 (523) 170 (151) -
FC02 498 (441) 571 (507) 172 (152) -
JC780 FC03 535 (475) 524 (464) 177 (157) - SL780
FC04 554 (491) 500 (443) 180 (160) -
FC05 591 (524) 453 (402) 185 (164) -
FC01 479 (425) 596 (528) 169 (149) -
FC02 536 (475) 524 (465) 177 (157) -
JC781 FC03 557 (494) 491 (436) 182 (161) - SL781
FC04 591 (524) 453 (402) 185 (164) -
FC05 610 (541) 430 (381) 187 (166) -
FC01 356 (316) 566 (502) 125 (111) -
FC02 390 (346) 525 (466) 131 (116) -
JC830 FC03 423 (375) 485 (430) 137 (122) - SL830
FC04 456 (404) 445 (395) 143 (127) -
FC05 472 (419) 426 (378) 146 (129) -
FC01 334 (296) 717 (636) 238 (211) -
FC02 387 (343) 640 (567) 259 (230) -
JC7100 FC03 421 (373) 590 (523) 273 (242) - SL7100
FC04 454 (402) 542 (480) 286 (253) -
FC05 502 (445) 471 (418) 305 (270) -
FC01 342 (303) 608 (539) 306 (272) -
FC02 372 (330) 562 (498) 317 (281) -
JC7200 FC03 401 (356) 516 (458) 328 (291) - SL7200
FC04 430 (382) 471 (418) 339 (300) -
FC05 459 (407) 428 (379) 349 (310) -
FC01 349 (309) 749 (663) 88 (78) 103 (91)
JTX FC03 521 (461) 657 (581) 104 (92) 120 (106) SLJTX
FC05 467 (431) 563 (498) 119 (105) 137 (121)
P830-2035
Product Gloss Level
Clea
(
r
G
c
r
o
a
a
m
t
s
P
)
a rts SLV
(
4
G
9
r
8
a
5
m
P
s)
a rts Hard
(G
en
ra
e
m
r
s
P
)
a rts
Red
(
u
G
c
ra
e
m
r P
s)
a rts Bulletin
Value-Pro
FC01 377 (334) 701 (621) 160 (142) -
FC02 413 (366) 651 (577) 167 (148) -
P390-4004 FC03 441 (391) 610 (541) 174 (154) - RM3004
FC04 467 (414) 577 (511) 177 (157) -
FC05 484 (429) 552 (490) 181 (160) -
FC01 479 (425) 596 (528) 169 (149) -
FC02 536 (475) 524 (564) 177 (157) -
P390-4005 FC03 557 (494) 491 (436) 182 (161) - RM3005
FC04 591 (524) 453 (402) 185 (164) -
FC05 610 (541) 430 (381) 187 (166) -
FC01 356 (316) 566 (502) 125 (111) -
FC02 390 (346) 524 (466) 131 (116) -
P390-4006 FC03 423 (375) 485 (430) 137 (122) - RM4006
FC04 456 (404) 445 (395) 143 (127) -
FC05 472 (419) 426 (378) 146 (129) -
FC01 349 (309) 749 (663) 88 (78) 103 (91)
VUX FC03 521 (461) 657 (581) 104 (92) 120 (106) RM2609-1
FC05 467 (431) 563 (498) 119 (105) 137 (121)
© 2015 PPG Industries www.ppgrefinish.com OC-7 5/15 Page 4
SLV4985 - Universal Flattening Agent LV
Technical Data
Total dry film build:
Minimum 2.0 mils
Maximum 3.0 mils
Film build per wet coat 2.4 - 3.5 mils
Dried film build per coat 1.0 mil
Theoretical coverage 361 - 654 sq. ft. / US gal.
(Theoretical coverage in sq. ft. US/gal. Ready-to-spray (RTS), giving 1 mil dry film thickness
Percent solids by volume RTS 22.5 - 40.8%
Percent solids by weight RTS 22.8 - 41.7%
Deltron Deltron Deltron
Topcoat System: DCU2010 DC3010 DC4010
Gloss Levels* FC01 - FC05 FC01 - FC05 FC01 - FC05
Applicable Use Category Clear Coating Clear Coating Clear Coating
VOC Actual (g/L) 103-116 99-108 97-105
VOC Actual (lbs./gal) 0.86-0.97 0.83-0.91 0.81-0.88
VOC Regulatory (less water less exempt (g/L) 247-247 247-246 243-244
VOC Regulatory (less water less exempt (lbs./gal) 2.06-2.07 2.05-2.06 2.03-2.04
Density (g/L) 1180-1190 1148-1162 1149-1164
Density (lbs./gal) 9.85-9.93 9.85-9.70 9.59-9.71
Volatiles wt. % 67.6-70.7 68.1-70.6 68.5-70.9
Water wt. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt wt. % 57.7-61.9 58.7-62.0 59.3-62.6
Water vol. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt vol. % 52.9-57.6 55.9-59.3 56.6-59.9
*See specific weight ratios of components: topcoat, SLV4985, hardener and thinner needed to meet gloss targets.
Deltron Envirobase Envirobase
Topcoat System: DC4125 EC530 DC700
Gloss Levels* FC01 - FC05 FC01 - FC05 FC01 - FC05
Applicable Use Category Clear Coating Clear Coating Clear Coating
VOC Actual (g/L) 101-115 47-48 105-117
VOC Actual (lbs./gal) 0.84-0.95 0.39-0.40 0.87-0.98
VOC Regulatory (less water less exempt (g/L) 213-218 127-146 248-249
VOC Regulatory (less water less exempt (lbs./gal) 1.78-1.82 1.06-1.22 2.07-2.08
Density (g/L) 1142-1165 1228-1234 1190-1200
Density (lbs./gal) 9.53-9.72 10.25-10.30 9.93-10.01
Volatiles wt. % 59.3-65.1 70.4-73.9 66.8-69.9
Water wt. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt wt. % 49.2-56.4 66.6-70.0 56.9-61.0
Water vol. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt vol. % 46.1-53.3 63.5-67.2 52.4-57.1
*See specific weight ratios of components: topcoat, SLV4985, hardener and thinner needed to meet gloss targets.
© 2015 PPG Industries www.ppgrefinish.com OC-7 5/15 Page 5
SLV4985 - Universal Flattening Agent LV
Envirobase Envirobase Global
Topcoat System: EC750 EC800 D8126
Gloss Levels* FC01-FC05 FC01-FC05 FC01-FC05
Applicable Use Category Clear Coating Clear Coating Clear Coating
VOC Actual (g/L) 105-117 75-81 101-115
VOC Actual (lbs./gal) 0.87-0.98 0.62-0.68 0.84-0.95
VOC Regulatory (less water less exempt (g/L) 248-248 217-220 218-213
VOC Regulatory (less water less exempt (lbs./gal) 2.07-2.07 1.81-1.84 1.82-1.78
Density (g/L) 1149-1200 1166-1183 1142-1165
Density (lbs./gal) 9.91-10.01 9.73-9.87 9.53-9.72
Volatiles wt. % 66.8-69.9 73.1-75.0 59.3-65.1
Water wt. % 0.0-0.0 0.0-0.1 0.0-0.0
Exempt wt. % 56.9-61.0 66.1-68.5 49.2-56.4
Water vol. % 0.0-0.0 0.0-0.1 0.0-0.0
Exempt vol. % 52.4-57.1 63.0-65.6 46.0-53.3
*See specific weight ratios of components: topcoat, SLV4985, hardener and thinner needed to meet gloss targets.
Global Nexa Autocolor Nexa Autocolor
Topcoat System: D8188 P190-6490 P190-6720
Gloss Levels* FC01-FC05 MC01-MC05 MC01-MC05
Applicable Use Category Clear Coating Clear Coating Clear Coating
VOC Actual (g/L) 105-117 101-115 103-116
VOC Actual (lbs./gal) 0.87-0.98 0.84-0.95 0.86-0.97
VOC Regulatory (less water less exempt (g/L) 248-248 213-218 247-247
VOC Regulatory (less water less exempt (lbs./gal) 2.07-2.07 1.78-1.82 2.06-2.07
Density (g/L) 1149-1200 1142-1165 1180-1190
Density (lbs./gal) 9.91-10.01 9.53-9.72 9.85-9.93
Volatiles wt. % 66.8-69.9 59.3-65.1 67.6-70.7
Water wt. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt wt. % 56.9-61.0 49.2-56.4 57.7-61.9
Water vol. % 0.0-0.0 0.0-0.0 0.0-0.0
Exempt ')
) AS chunks(chunk_idx, chunk_content);


-- Document: OC-8 Universal Flexibilizer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'OC-8 Universal Flexibilizer',
    'Universal flexibilizer for improved paint flexibility and durability.',
    'other',
    'painting',
    ARRAY['unique_finishes'],
    '{"process_section": "unique-finishes", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'OC-8
Universal Flexibilizer
SLV814
SLV814 is a VOC compliant flex additive for
use in VOC compliant undercoats, topcoats
and clears.
SLV814 Universal Flexibilizer, when used as
recommended, will form a coating that will
withstand the customary abuse of impact and
flexing in topcoats and undercoats during
and after installation of the part.
Features Required Products
· ·
Fast Dry Formula SLV814 Universal Flexibilizer
·
Produces consistent results
Advantages Related Products
· ·
Can be used in Deltron, Recommended PPG brand VOC compliant undercoats, topcoats and clears
Global, Omni or ShopLine
Systems
· Compatible Products
Get the job done right
The One Choice SLV814 Universal Flexibilizer is for universal use with PPG brand VOC
compliant undercoats, topcoats and clears.
Benefits
· Note: When adding SLV814 Universal Flexibilizer to recommended PPG products, please refer to the
Customer satisfaction
· products specific technical bulletin for proper application.
Versatility and reliability
Product Information Effective 2/09
Universal Flexibilizer
SLV814
Application Data
Preparation: Apply a compatible Plastic Adhesion Promoter to bare plastic substrate before applying flexibilized undercoat or color. If
the SLV814 is stored in a cold area, it must be allowed to come up to room temperature and shaken before use.
Mixing: To properly mix, use the ratios shown on the tables shown below:
VOC
UNDERCOATS Mix Ratio Product Reducer Hardener SLV814 Pot Life Less Water, Less Exempt
lbs/gal (g/l)
DSLV3025 RTS 10:1 10 - - 1 ½ - 1 hr. 2.61 – 2.64 (313 - 316)
DPLV3055 RTS 10:1 10 - - 1 ½ - 1 hr. 1.92 – 2.00 (230 – 240)
DLV8085 RTS 10:1 10 - - 1 ½ - 1 hr. 2.61 – 2.64 (313 - 316)
DLV8005 RTS 10:1 10 - - 1 ½ - 1 hr. 1.92 – 2.00 (230 – 240)
MP292 RTS 10:1 10 - - 1 ½ - 1 hr. 2.11 (252)
JP252 RTS 10:1 10 - - 1 ½ - 1 hr. 2.11 (252)
COLOR
CLV/DCX61 + 1oz.
2:1:2:1 2 1 2 1 1 hr. 2.54 – 2.96 (304 – 354)
DX84/87 per RTS qt.
DGLV/D884 + 1 oz.
2:1:2:1 2 1 2 1 1 hr. 2.54 – 2.96 (304 – 354)
D885/D886 per RTS qt.
CLEAR
DC3010 / DCH36xx 3:1:½ 3 - 1 ½ 1 – 2 hrs. 1.87 (224)
DC4010 / DCH36xx 3:1:½ 3 - 1 ½ 1 – 2 hrs. 1.84 (220)
D8121 / D82xx 2:1:1:1 2 1 1 1 4 hrs. 1.8 (216)
D8170 / D827x 2:1:1:1 2 1 1 1 1 – 1.5 hrs. 1.78 (213)
D8188 / D838x 2:1:10%:1 2 10% 1 1 2 - 4 hrs. 1.89 (226)
JC780 / JH78xx 4:1: ½ 4 - 1 ½ 1.5 hrs. 2.00 (240)
JC781 / JH78xx 4:1: ½ 4 - 1 ½ 1.5 hrs. 1.99 (238)
MC262 / MH26x 4:1: ¼ 4 - 1 ¼ 1.5 hrs. 2.05 (246)
See material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434 -4515. IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to
the general public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions
and warning statements listed on label. Statements and methods described are based upon the best information and practices known to
PPG Industries. Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as
to performance, results, or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any
formula or process set forth herein.
PPG Industries
World Leaders in Automotive Finishes
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive
Strongsville, OH 44149 Mississauga, Ontario, Canada L5J 1K5
1-800-647-6050 1-888-310-4762
© 2009 PPG Industries www.ppgrefinish.com Part No. OC-8 2/09
')
) AS chunks(chunk_idx, chunk_content);


-- Document: P-243 DC4010 Velocity Premium Clearcoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'P-243 DC4010 Velocity Premium Clearcoat',
    'Velocity premium low-VOC clearcoat with superior performance.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'p-243', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'P-243CAN
Deltron® Velocity Premium Clearcoat LV
DC4010
DC4010 is a high velocity, premium clearcoat,
specifically developed to enhance productivity in
air-dry and low bake collision repair facilities.
Deltron DC4010 high velocity premium clearcoat
offers ease of application, outstanding flow and
leveling, superior clarity and a deep rich gloss.
DC4010 is extremely versatile and can be used for
multi-panel and overall refinishing. While offering
good air-dry performance, DC4010 is best suited
for low bake or force dry conditions. DC4010 has
an extremely short bake cycle, which reduces in
booth time, energy cost and can improve paint
shop productivity.
DC4010 is designed to meet the most stringent
VOC regulations in both the U.S. and Canada.
Features Compatible Surfaces
 Low temperature, fast bake DC4010 may be applied over:
 Easy application  Deltron ® (DBU) Universal Basecoat
®
 Deltron 2000 (DBC) Basecoat
 Envirobase High Performance Waterborne Basecoat
Advantages
 Process time savings
 Less rework Required Products
Hardener
Low Temperature (55º - 75ºF / 13º - 24ºC) DCH3610
Benefits Medium Temperature (75º - 95ºF / 24º - 35ºC) DCH3620
 Customer satisfaction High Temperature (95º F & above / 35ºC & above) DCH3630
Ultra High Temp Hardener LV (95º F & above / 35ºC & above) DCH3640
Accelerator EA10
Product Information Effective 06/10
DC4010
Directions For Use:
Preparation:
Where VOC limits allow a maximum of 3.5 lbs./US Gal. for multi-stage systems, reduce DBU
Color 100% with DRR Reducer or DBC Color 100% with DT Reducer. Refer to the Product
Information Bulletin of the color system for its application, dry times, and blend
recommendations. (See P-175CA for DBC and P-152 for DBU Color).
Mixing Ratios: Standard Mix
DC4010 DCH3610/DCH3620/DCH3630/DCH3640
4 1
Accelerated
DC4010 DCH3610/DCH3620/DCH3630/DCH3640 EA10
4 1 10%
Pot life is 2½ - 3 hours at 70ºF (21ºC) for standard mix @ 4:1
Pot life is 2 -2.5 hours at 70ºF (21ºC) with EA10 @ 4:1:10%
Additives: With SLV814 Flexibilizer
DC4010 DCH3610/DCH3620/DCH3630/DCH3640 SLV814
3 1 1/2
DC4010 DCH3610/DCH3620/DCH3630/DCH3640 SLV814 EA10
3 1 1/2 1/2
Appliction Coats:
Apply: 2 wet coats
Air Pressure:
HVLP 10 psi at the air cap
Conventional 45 – 55 psi at the gun
Spraygun Set-up:
Fluid Tip: 1.3 - 1.5 mm or equivalent
Film Build Per Wet Coat: 3.0 – 3.5 mils
Dried Film Build Per Coat: 1.2 – 1.4 mils
Page 2 P-243CAN
Directions For Use:
Drying Times:
Between Coats: 5 -7 minutes
Dust Free:
70ºF (21ºC) 30 - 40 minutes
70ºF (21ºC) with EA10 15 - 20 minutes
Tack Free:
70ºF (21ºC) 3 - 4 hours
70ºF (21ºC) with EA10 1 - 2 hours
Tape Time:
70ºF (21ºC) 12 – 16 hours
70ºF (21ºC) with EA10 6 - 8 hours
Air Dry:
70ºF (21ºC) 4 –6 hours
70ºF (21ºC) with EA10 2 1/2 - 3 hours
Force Dry:
Purge None
Bake w/DCH3610 15 minutes @140ºF (60ºC)
Bake w/DCH3620, DCH3630
or DCH3640 20 minutes @140ºF (60ºC)
Bake w/EA10 10 minutes @ 140ºF (60ºC)
IR (Infrared):
Medium Wave 5 minute half bake, 10 minutes full
Short Wave 5 minutes
Polishing:
Air Dry 4 - 6 hours @ 70º F (21ºC).
1 1/2 - 2 hours @70ºF (21ºC) with
EA10
Force Dry
Immediately after cool down
DC4010 can be lightly sanded with
1500-2000 grit sandpaper and
compounded. Use a foam pad with a
minor cutting compound to remove
any minor imperfections.
Repair and Recoat: Recoat after force dry and cooling cycle
or 4 - 6 hours air dry 70ºF (21ºC).
Repair after force dry and cooling cycle
or 4 - 6 hours air dry 70ºF (21ºC).
DC4010 must be sanded before
recoating with primer, color or clear.
Note: All force dry times are quoted for metal temperature. Additional
time must be allowed during force dry to allow metal to reach
recommended temperature.
Equipment Cleaning: Spray guns, gun cups, storage pots, etc., should be cleaned thoroughly after
each use with any appropriate PPG general-purpose solvent.
Page 3 P-243CAN
DC4010
Deltron® Velocity
Premium Clearcoat
Technical Data:
DC4010 : DC4010: DC4010 :
DCH36XX DCH36X: DCH36XX :
RTS Combinations: EA10 SLV814
Volume Ratio: 4:1 4:1:10% 3:1:1/2
Applicable Use Category Clear Ctg Clear Ctg Clear Ctg (flexed)
VOC Actual (g/L) 129 126 116
VOC Actual (lbs/gal) 1.08 1.06 0.97
VOC Regulatory
244 244 219
(less water less exempt) (g/L)
VOC Regulatory
2.04 2.04 1.83
(less water less exempt) (lbs/gal)
Density (g/L) 1100 1099 1118
Density (lbs/gal) 9.18 9.17 9.33
Volatiles wt. % 60.8 61.8 60.3
Water wt. % 0.0 0.0 0.0
Exempt wt. % 49.0 50.2 49.9
Water vol. % 0.0 0.0 0.0
Exempt vol. % 46.7 48.1 47.1
Solids vol. % 38.2 37.2 39.5
Sq Ft. Coverage / U.S.gal.
613 597 634
1 mil. @ 100% transfer efficiency
Resistance Testing:
Treated steel panels used for evaluation were primed with Original Equipment UNIPRIME® ,
Deltron Sealer and topcoated with DELTRON Basecoat prior to DC4010 Clearcoat. All resistance
results were obtained after DC4010 Clearcoat had been allowed to dry approximately 72 hours at
moderate temperatures (70ºF/21ºC).
Important: The contents of this package must be blended with other components before the product can be
used. Before opening the packages, be sure you understand the warning messages on the labels of
all components, since the mixture will have the hazards of all its parts. Improper spray technique
may result in a hazardous condition. Follow spray equipment manufacturer’s instructions to
prevent personal injury or fire. Follow directions for respirator use. Wear eye and skin protection.
Observe all applicable precautions.
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434-4515; IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not
intended for sale to the public. Products mentioned may be hazardous and should only be used according to directions,
while observing precautions and warning statements listed on label. Statements and methods described are based upon
the best information and practices known to PPG Industries. Procedures for applications mentioned are suggestions only
and are not to be construed as representations or warranties as to performance, results, or fitness for any intended use, nor
does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish
World Leaders in Automotive Finishes
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive Unit #6
Mississauga, Ontario L5J 1K5
1-888-310-4762
© 2010 PPG Industries www.ppgrefinish.com Part No. P243CAN, 06/10
')
) AS chunks(chunk_idx, chunk_content);


-- Document: P-244 DC4125 CeramiClear
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'P-244 DC4125 CeramiClear',
    'CeramiClear ceramic-enhanced clearcoat for maximum protection.',
    'other',
    'painting',
    ARRAY['clearcoat_application', 'p-244'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'P-244
CeramiClear® Mar and Scratch Resistant Clearcoat
DC4125
DC4125 CeramiClear® is a mar and scratch
resistant, high solid clearcoat. This clear was
especially designed to repair Mercedes-Benz
cars and other vehicles that require the best
in mar and scratch resistant performance.
DC4125’s excellent surface properties
minimize the visible marring caused by car
washing and polishing.
DC4125 CeramiClear® was formulated to
meet all current VOC limits and is suitable for
use in Southern California Districts. DC4125
is designed for use over DBC and DBU.
Features Compatible Surfaces
·
Mar & Scratch Resistance CeramiClear® may be applied over:
· ·
High Solids Deltron® (DBU) Universal Basecoat
· ·
OEM Approved Product Deltron® 2000 (DBC) Basecoat
Advantages Required Products
· Minimizes marring caused by Hardener
car washing and polishing CeramiClear Hardener DCH4126
·
Restores OE factory protection
Benefits
·
Customer Satisfaction
Product Information Effective 6/07
DC4125
Directions for Use
Preparation:
Where VOC limits allow a maximum of 5.0 lbs./US Gal. for multi-stage systems, reduce
DBU Color 150% with DRR Reducer or DBC Color 100% with DT Reducer. Refer to
the Product Information Bulletin of the color system for its application, dry times, and
blend recommendations. (See P-175CA for DBC and P-152 for DBU Color)
Mix Ratio:
DC4125 : DCH4126 Hardener
2 : 1
PotLife: 1 hour at 68°F (20°C) for standard mix
Additives:
None
Application Coats:
Apply: 1 medium coat, then 1 full coat (2 coats)
Film Build Per Wet Coat: 2.1 – 3.1 mils
Dried Film Build Per Coat: 1.0 – 1.5 mils
Drying Times:
Between Coats: 5 minutes
Before Baking: 0 – 5 minutes
Dust Free:
68°F (20°C) 30 minutes
Dry to Handle:
68°F (20°C) 4 hours minimum
140°F (60°C) 30 minutes*
Tape Time:
68°F (20°C) 5 – 6 hours
140°F (60°C) 30 minutes + cool down*
Through Dry:
68°F (20°C) 8 hours
140°F (60°C) 30 minutes + 2 hours @ room temperature*
IR (Infrared:
Medium Wave 15 minutes
Short Wave 8 minutes
Polishing: 4 hours minimum.
After 24 hours @ 70°F (21°C) DC4125 CeramiClear
can be lightly de-nibbed with 2000 grit sandpaper and
compounded. Use a foam pad with a minor cutting
compound to remove any minor imperfections.
Note: For best results, DC4125 should be used for full panel repairs.
*All force dry times are quoted for metal temperature. Additional time must be allowed during
force dry to allow metal to reach recommended temperature.
Page 2 P-244
Directions for Use
Drying Times continued:
Overcoat/Recoat Time: 10 hours at 68°F (20°C) or
after force dry/cool down + 2 hours
Grade wet: US 500 – 600 / European P800 – 1200
Grade dry: US 400 – 400 / European P400 – 800
Blending:
The blend technique used for DC4125 Ceramiclear is a “reverse blend process”.
Follow the below instructions for best results:
1. Standard prep - Use 1000 grit on a DA and 1200 grit wet.
2. After finishing color repair, apply 1 wet coat of DX840 Blend-Ease out to the edge of
the area intended for the clear blend. (See note)
3. Mix 1 part of ready-to-spray clear to 1 part of DX840 and apply this mixture on the
blend area where DX840 was applied in step 2.
4. Starting from the blend area and working back into the panel, apply two single coats of
the ready-to-spray clear to the remainder of the refinished panel.
5. Bake or air dry and polish blend area with a fine compound to complete the repair.
Note: For best results, DC4125 should be used for full panel repairs.
Technical Data:
VOC
VOC Regulatory (less water less exempt) 2.00 lbs/gal (240 g/L)
VOC Actual 1.40 lbs/gal (168 g/L)
Total dry film build:
Minimum 2.0 mils
Maximum 2.5 mils
Recommended film build per wet coat 2.1 – 3.1 mils
Recommended dried film build per coat 1.0 – 1.5 mils
Theoretical coverage 799 sq. ft. /US gal
Theoretical coverage in sq.ft./US gal. Ready-to-spray (RTS), giving 1 mils dry film thickness.
Percent solids by volume RTS 49.79
Density 8.96 lbs/gal (1074 g/L)
Volatiles Weight % 47.9 %
Water Weight % 0.0 %
Exempt Weight % 33.3 %
Water Volume % 0.0 %
Exempt Volume % 30.4 %
Solids Volume % 49.8 %
Applicable Use Category Clear Coating
Resistance Testing:
Treated steel panels used for evaluation were primed with Original Equipment UNIPRIME®
and topcoated with DELTRON ® Basecoat prior to DC4125 Clearcoat. All resistance
results were obtained after DC4125 Clearcoat had been allowed to dry approximately
72 hours at moderate temperatures (70ºF/21ºC).
Page 3 P-244
DC4125
CeramiClear®
Mar & Scratch Resistant Clearcoat
Important:
The contents of this package must be blended with other components before the product can be
used. Before opening the packages, be sure you understand the warning messages on the labels of
all components, since the mixture will have the hazards of all its parts. Improper spray technique
may result in a hazardous condition. Follow spray equipment manufacturer’s instructions to
prevent personal injury or fire. Follow directions for respirator use. Wear eye and skin protection.
Observe all applicable precautions.
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434-4515; IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale to the general
public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and warning statements
listed on label. Statements and methods described are based upon the best information and practices known to PPG Industries. Procedures for
applications mentioned are suggestions only and are not to be construed as representations or warranties as to performance, results, or fitness for any
intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process set forth herein.
World Leaders In Automotive Finishes
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive, Unit #6
Mississauga, Ontario L5J 1K5
1-888-310-4762
© 2007 PPG Industries www.ppgrefinish.com Part No. P-244 6/07
')
) AS chunks(chunk_idx, chunk_content);


-- Document: P-245 DPLV Epoxy Primer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'P-245 DPLV Epoxy Primer',
    'Technical specifications and application guide for DPLV epoxy primer.',
    'other',
    'painting',
    ARRAY['primer_application', 'p-245', 'primer'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'P-245C
DPLV 2.1 Epoxy Primer
DPLV
DP48LV (White)
DP50LV (Gray)
DP90LV (Black)
DPLV 2.1 VOC Epoxy Primer provides excellent
adhesion and corrosion resistance to many types
of properly prepared steel, aluminum, and
fiberglass substrates. DPLV Epoxy Primer may
also be used as a sealer and top coated with
many of PPG ‘s two component urethane
undercoats and topcoats as well as waterborne
basecoat.
DPLV 2.1 Epoxy Primer is available in 3 colors,
DP48LV White, DP50LV Gray and DP90LV
Black and can be blended together to achieve
the full range of gray shades, G1 - G7.
Features Compatible Surfaces
Direct to Metal DPLV may be applied over:
Primer / Sealer • Properly cleaned and sanded steel
Three Colors • Properly cleaned and sand blasted steel
Quarts and Gallons • Properly cleaned and sanded galvanized steel
• Properly cleaned and sanded aluminum
Advantages • Properly cleaned and sanded fiberglass
Anti-Corrosion • Properly cleaned (un-sanded) E-Coat
Multi-Purpose • Various cleaned and sanded Rigid Plastics: ABS, Nylon, Polycarbonate, Noryl, PBT SMC
Mix and Match • Properly cleaned and sanded OEM and fully cured refinish paints.
Does Not Require The • OneChoice® Plastics System
Use of an Etch Primer
Benefits NOTE: DPLV is direct to metal and MUST NOT be applied over etch or wash primers.
Excellent Adhesion
Fewer Products to Stock
Faster Hiding of Topcoat
Product Information Effective 1/11
DPLV
Directions For Use
Preparation:
Wash the area to be painted with soap and water, then clean with SWX350 H 2 O -So-
Clean Wax and Grease Remover, DX393 0.6 Low VOC Cleaner or DX394 1.4 Low VOC
Cleaner.
Sand the bare metal areas completely with 80-180 grit abrasive. Sand old finishes with
320-400 grit dry by hand or machine or 600 grit wet.
Re-clean with. SWX350 H 2 O -So-Clean Wax and Grease Remover, DX393 0.6 Low VOC
Cleaner or DX394 1.4 Low VOC Cleaner.
Prime aluminum substrate within 8 hours.
Prime carbon steel immediately after cleaning.
Mixing: DPLV 2.1 DP401LV 2.1 D 87xx
Epoxy Primer Epoxy Hardener Reducers
2 1 1
Additives: None
Pot life: 8 hours @ 70°F (21°C).
Note: Thoroughly mix primer, catalyst and thinner. Mechanical agitation is recommended.
No induction period is necessary.
Spray Gun Set-up: Standard Flexible Parts*
Apply: 1-2 wet coats 1 full wet coat
Fluid Tip: 1.4-1.6 mm 1.4-1.6 mm
Air Pressure: HVLP 8-10 PSI at the cap 8-10 PSI at the cap
Conventional: 40-50 PSI at the gun 40-50 PSI at the gun
* Note: Un-primed plastics will require the use of the OneChoice Plastics system and
adhesion promoter prior to the application of DPLV 2.1 Epoxy Primer.
Dry Times: Standard Flexible Parts
Between Coats: 10-15 minutes Between Coats: N/A
To Topcoat: To Topcoat:
1 Coat 30 minutes 1 Coat 30 minutes
2 Coats 60 minutes
To Apply Body Filler:
1 Coat 1 hour
2 Coats Overnight Dry
Note: DPLV Epoxy Primer may be recoated any time up to 1 week.
After 1 week:
• It must be cleaned, sanded and recleaned.
• Reapply 1 additional coat of DPLV Epoxy Primer.
Page 2 P-245C
DPLV Gray Shade Mixing Chart
This chart can be used to mix the DPLV 2.1 Epoxy Primer. The G1 - G7 ratios will help to achieve better
hiding when used as a guide for mixing the DPLV 2.1 Epoxy Primer.
(cid:1)Weight refers to use of D8767; for other D87xx solvents refer to PaintManager™ for exact weights.
Mix Ratio By Volume Mix Ratio By Cumulative Weight
Grams Parts
Mix Ratio ½ Pint Quart ½ Pint Quart
DP48LV 2 180 720 203 812
G1 DP401LV 1 243 971 274 1095
D87xx 1 314 1256 354 1416
DP48LV 1.6 144 576 162 650
DP50LV .4 177 708 200 798
G2
DP401LV 1 240 959 271 1082
D87xx 1 311 1244 351 1403
DP48LV 1.5 185 540 152 609
DP50LV .5 176 706 199 796
G3
DP401LV 1 239 957 269 1079
D87xx 1 310 1242 350 1401
DP48LV .5 45 180 51 203
DP50LV 1.5 169 676 190 762
G4
DP401LV 1 232 927 261 1045
D87xx 1 303 1212 342 1367
DP50LV 2 166 662 186 746
G5 DP401LV 1 228 913 258 1030
D87xx 1 300 1198 338 1351
DP50LV 1 83 331 93 373
DP90LV 1 164 656 185 740
G6
DP401LV 1 227 907 256 1023
D87xx 1 298 1192 336 1344
DP90LV 2 162 650 183 733
G7 DP401LV 1 225 901 254 1016
D87xx 1 296 1186 334 1338
Page 3 P-245C
Tinting: DPLV Epoxy Primer cannot be tinted.
DPLV Epoxy colors may be blended together.
Note: Do Not blend DPLV and DPLF together.
Equipment Cleaning: Thoroughly clean after each use with All Purpose Clean Up Solvent.
Technical Data:
DP48LV : D P401LV : DP50LV : DP401LV : DP90LV : DP401LV :
D87xx D87xx D87xx
RTS Combinations:
Volume Ratio: 2 : 1 : 1 2 : 1 : 1 2 : 1 : 1
Applicable Use Category Primer Primer Primer
VOC Actual (g/L) 146 149 143
VOC Actual (lbs/gal) 1.22 1.24 1.19
VOC Regulatory
(less water less exempt)
(g/L) 248 250 250
VOC Regulatory
(less water less exempt)
(lbs/gal) 2.07 2.09 2.09
Density (g/L) 1293-1362 1231-1300 1219-1288
Density (lbs/gal) 10.79-11.37 10.27-10.85 10.17-10.75
Volatiles wt. % 45.2-48.0 47.4-50.2 48.8-51.6
Water wt. % 0.0-0.1 0.0-0.1 0.0-0.1
Exempt wt. % 33.7-37.1 35.1-38.5 36.8-40.2
Water vol. % 0.0-0.1 0.0-0.1 0.0-0.1
Exempt vol. % 40.7 40.2 42.4
Important:
The contents of this package must be blended with other components before the product can be used. Before opening the
packages, be sure you understand the warning messages on the labels of all components, since the mixture will have the hazards
of all its parts. Improper spray technique may result in a hazardous condition. Follow spray equipment manufacturer''''s
instructions to prevent personal injury or fire. Follow directions for respirator use. Wear eye and skin protection. Observe all
applicable precautions.
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434-4515; IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended
for sale to the general public. Products mentioned may be hazardous and should only be used according to directions, while
observing precautions and warning statements listed on label. Statements and methods described are based upon the best
information and practices known to PPG Industries. Procedures for applications mentioned are suggestions only and are not to
be construed as representations or warranties as to performance, results, or fitness for any intended use, nor does PPG Industries
warrant freedom from patent infringement in the use of any formula or process set forth herein.
PPG Automotive Refinish
World Leaders in Automotive Finishes
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive Unit #6
Mississauga, Ontario L5J 1K5
1-888-310-4762
© 2011 PPG Industries www.ppgrefinish.com Part No. P-245C , 1/11
')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0001 Choosing PPE
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0001 Choosing PPE',
    'Guidelines for selecting and using appropriate personal protective equipment.',
    'other',
    'painting',
    ARRAY['pre_paint_considerations', 'pd-0001'],
    '{"process_section": "pre-paint-considerations", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
3 - CLEANING

PD-0001

CHOOSING PPE

4 EYES:
Wear safety glasses when handling wet paint.
Wear goggles when cleaning equipment.
Flush eyes with water if splashed.

Two-component spray mist can irritate eyes. Use a visor-type mask or a full-face mask to
reduce risk of irritation.

 

2 SKIN:
Wear solvent-resistant overalls with a hat or hood to protect yourself.
Wear nitrile gloves for protection against solvents.
Use barrier cream before starting work.

Use hand cleaner, not thinner, to clean hands.

 

3 RESPIRATORY:
In areas like spraybooths, the proper, correctly fitted respirator is required
Booth ventilation must be as designed, maintained and operated correctly.

It is best practice to use a full-face air-supply respirator for all spraying operations as this
prevents the inhalation of any and all spray mists in the operating environment.

An air-fed half-mask used in combination with safety goggles is also an acceptable form
of protection.

A particle or filtered mask must be worn when sanding.

Bi Sy sai

SANDING

 

CLEANING

 

MIXING/SETUP

iy ie

 

  

SPRAYING

 

 

 

PPG Certification - E
©201

obase Training 4/2018

  

 

 

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0090 Initial Cleaning
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0090 Initial Cleaning',
    'Procedures for initial vehicle cleaning before repair and paint preparation.',
    'other',
    'painting',
    ARRAY['cleaning', 'pd-0090'],
    '{"process_section": "cleaning", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
3 - CLEANING

PD-0090

INITIAL CLEANING

1 Thoroughly wash entire vehicle with warm, soapy water or “pressure wash” if possible.

When rinsing, concentrate on body panel joints (hood to fender, etc.], seams, wheel
openings, etc.

Dry completely.

 

Blow off vehicle with compressed air (removes loose particles) prior to entering paint
department. Concentrate efforts on body panel joints, seams, and wheel arches.

 

3 Clean using an “Apply On / Wipe Off” procedure:
To avoid contaminants drying on the surface, apply cleaner to a "24 x 24” area.

Apply a generous amount of the appropriate cleaner on the surface with a clean cloth or
a hand-held spray bottle and wipe the surface in one direction only. This initial step floats
the contaminants to the surface.

While the surface is still wet, wipe dry using a second clean cloth to remove contaminants
For maximum results, wipe in one direction to eliminate smearing of contaminants.

 

Do not allow the cleaner to dry on the panel, or wipe marks may be evident in the painting
stage. This will lead to paint failure.

 

PLASTICS:

With bare plastic components, use a water-based cleaner first to remove any contamination.

Follow by using a cleaner designed specifically for plastics to remove any solvent-type
release agents.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0100 Light Body Repair
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0100 Light Body Repair',
    'Procedures for light body repair and surface preparation.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0100'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP

PD-0100

LIGHT BODY REPAIR & SURFACE PREP

(This follows 3M’s Large Damage Repair SOP.)
1 Pre-Cleaning

Pre-wash/clean vehicle prior to disassembly (power wash undercarriage area at repair).

 

2 Initial Prep Sand
DA sand the repair area using P80 grit, removing paint beyond damage by 2-4”. Blow off
with clean, dry air and re-clean with surface cleaner.

3 Final Metal Prep

Remove remaining paint/coatings in “low spots”. Blow off with clean, dry air and re-clean
with surface cleaner.

 

4 Mix and Apply Filler
Mix and apply filler per manufacturer''''s recommendation. Keep the body filler within the
primer featheredge area. Allow body filler to cure completely.

5 Initial Sanding of Filler

Block sand body filler with P80 grit. DA rough featheredge area with P80-P120 abrasive.
Use guide coat between sanding steps to highlight imperfections. Reapply body filler and
guide coat as necessary.

6 Final Sanding of Filler

Final block sand filler with P150 abrasive. DA fine featheredge repair area with P180
abrasive and blow off the area with clean, dry air. Use guide coat between sanding steps to
highlight imperfections.

 

7 Mix and Apply Glaze Filler

Blow off the repair area completely removing sanding dust from the surface. Mix and apply
glaze filler if required per manufacturer’s recommendation. Keep the glaze within the
primer featheredge area. Allow glaze to cure completely.

 

8 Sanding of Glaze Filler

Apply guide coat and block sand polyester glaze with P180 abrasive. Use guide coat to
highlight imperfections. Reapply glaze as necessary to fill minor imperfections.

 

9 Final Sand and Inspect

Blow off repair area. Featheredge the surrounding area using P180- 240 abrasive. Inspect
the repair for quality.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0115A Metal Surface Prep - Aluminum
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0115A Metal Surface Prep - Aluminum',
    'Specialized surface preparation procedures for aluminum metal parts.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0115a', 'metal'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP

PD-0115A

METAL SURFACE PREP - BARE ALUMINUM

CAUTION: Wear the proper safety protection during this process.

To ensure proper corrosion protection and adhesion, specific steps MUST be followed when
preparing and priming bare aluminum substrates. These procedures apply to a damaged painted
OEM panel or an e-coated OEM replacement panel.

1 Clean entire part

A) Use an approved solvent-based wax and grease remover (check local regulations) and
a clean towel. Dry thoroughly.
B) Follow with waterborne pre-cleaner and a clean towel. Dry thoroughly.

 

2 Inspect part for imperfections and damage. Determine what repairs should be made if any
(follow all process documents for repairs made to the part).

 

3 Prepare bare aluminum areas—after making any necessary repairs, sand exposed
aluminum using a DA sander with 120-180 grit sandpaper and interface pad. Re-clean
entire part. Spot prime bare aluminum areas as outlined below in Step 4A, 4B or 4C.

IMPORTANT: To avoid galvanic corrosion, never use the same piece of sandpaper on both
steel and aluminum. Avoid cross contamination of airborne steel and aluminum particles
generated in the same shop areas

 

Prime or chemically treat bare aluminum substrates immediately.
IMPORTANT: Oxidation can form on exposed aluminum surfaces in as little as 15 minutes!
If necessary, scuff and re-sand prior to priming.

 

LA Etch Primer followed by surfacer or sealer and PPG topcoat system (refer to PD-0705 or
PD-0705WB).

IMPORTANT: Do NOT apply epoxy primer, body filler or topcoat directly over etch primer.

 

48 Epoxy Primer followed by body filler or surfacer or PPG topcoat system (refer to PD-0705
or 0705WB).

 

4° SX Metal Treatments* followed by epoxy primer then body filler, surfacer or PPG topcoat
system (refer to PD-0705 or PD-0705WB).

 '),
  (1, 'NOTE: To prevent dissimilar metal corrosion where bare metals make contact with one
another (bolts, rivets, hinges, etc.], ECK® (Electrolysis Corrosion Kontrol) should be
applied. Refer to ECKPBO1 for details.

 

*Cannot be used in some areas due to VOC heavy metal restrictions. Refer to local regulations.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0115S Metal Surface Prep - Steel
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0115S Metal Surface Prep - Steel',
    'Surface preparation procedures for steel metal components.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0115s', 'metal'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP eg #
PD-0115S ,

METAL SURFACE PREP BARE STEEL, GALVANIZED STEEL

Caution: Wear the proper safety protection during this process.
To ensure proper corrosion protection and adhesion, specific steps MUST be followed when
preparing and priming bare steel substrates. These procedures apply to a damaged painted
OEM panel or an e-coated OEM replacement panel.

1 Clean entire part

A) Use an approved solvent-based wax and grease remover (check local regulations] and a
clean towel. Dry thoroughly.

B) Follow with waterborne pre-cleaner and a clean towel. Dry thoroughly.

2 Inspect part for imperfections and damage. Determine what repairs should be made if any
(follow all process documents for repairs made to the part).

 

3 Prepare bare steel areas—after making any necessary repairs, sand exposed steel using
a DA sander with 120-180 grit sandpaper and interface pad. Re-clean entire part. Spot
prime bare steel areas as outlined below in Step 4A or 4B.

 

IMPORTANT: To avoid galvanic corrosion, never use the same piece of sandpaper on both
steel and aluminum. Avoid cross-contamination of airborne steel and aluminum particles
generated in the same shop areas.

 

Prime bare steel substrates immediately.
IMPORTANT: Oxidation can form on exposed steel surfaces in as little as 15 minutes! If
necessary, scuff and re-sand prior to priming.

 

GA Etch Primer followed by surfacer or sealer and PPG topcoat system (refer to PD-0705 or
PD-0705WB).

IMPORTANT: Do NOT apply epoxy primer, body filler or topcoat directly over etch primer.

 

4B Epoxy Primer followed by body filler or surfacer or PPG topcoat system [refer to PD-0705
or PD-0705WB).

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0120 Metal Parts - Ecoat
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0120 Metal Parts - Ecoat',
    'Surface preparation for metal parts with electrocoat protection.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0120', 'metal'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP »

PD-0120

METAL PARTS PREP PRIMED WITH E-COAT

CAUTION: Wear the proper safety protection during this process.

Most Original Equipment Manufacturer (OEM) parts come from the factory with a primer
called e-coat. E-coat stands for Electrodeposition Coating. The part is dipped into a primer
bath and the e-coat adheres to the part with the help of an electrical process. E-coat is a
very durable and corrosion resistant coating so it should not be removed from the part.
Most e-coat appears to be a glossy black coating.

1 Review work order to ensure that all parts to be painted are present and repairs
are understood.

 

Inspect part for imperfections and damage. Determine what repairs should be made if any
(follow all process documents for repairs made to the part.)

 

3 Clean entire part thoroughly with wax & grease remover and/or SWX350 waterborne cleaner
and a clean towel. Dry thoroughly to ensure there is no leftover residue.

 

When the primer is known to be e-coat, prep this way:

Electrodeposition Primer must be thoroughly cleaned and may then be directly overcoated
with the A-Chromatic LV Sealer as a Wet-on-Wet Sealer without abrading.

a. To remove minor defects - Lightly sand primer with a DA sander with 400 grit and an
interface pad. Remove as little e-coat as possible.

b. If preferred, on edges, body lines and recessed areas, use a hand scuff pad.

 

Re-clean entire part thoroughly with wax & grease remover and/or SWX350 waterborne
cleaner and a clean towel. Dry thoroughly. Tack off the dry part before
ECS A-Chromatic Sealer application.

 

6 Sealer must be applied to e-coat. Obtain sealer gray shade number (G1-G7] from color
formula retrieval screen. Apply medium wet coat of ECS A-Chromatic Sealer to entire part.

 

7 Apply color followed by clearcoat.

PPG Certification - En
© 2018 PI

 

obase Training 4/2018
G. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0130 Metal Parts - LKQ Painter Parts
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0130 Metal Parts - LKQ Painter Parts',
    'Preparation procedures for LKQ painter parts and metal components.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0130', 'metal'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP

PD-0130

METAL PARTS PREP — LKQ* PAINTED PARTS

CAUTION: Wear the proper safety protection during this process.
*LKQ is Like Kind or Quality used part.

Review work order to ensure that all parts to be painted are present and repairs
are understood.

2 Inspect part and repair any damage.

 

Test paint by rubbing it with thinner or urethane grade solvent on a clean towel. /f coating
wipes off or softens significantly, remove it by sanding. If bare metal is exposed, apply approved
bare metal primer to bare metal area. If paint is fine, proceed to next step.

 

4 Wash part with soap and hot water, rinse and dry thoroughly.

 

5 Clean entire part thoroughly with wax & grease remover and/or SWX350 waterborne cleaner
and use clean towels to dry thoroughly.

 

6 Sand paint with 600 grit using a DA sander and an interface pad. If bare metal is exposed,
apply a coat of Etch Primer to the bare metal area.

 

7 Scuff all edges and recessed areas with a gray scuff pad, or a pad coarse enough to remove
all gloss.

8 Clean entire part thoroughly with wax & grease remover and/or SWX350 waterborne cleaner
and a clean towel. Dry thoroughly.

 

9 If there are imperfections such as scratches or chips left in the original painted surface,
apply 2-3 coats of surfacer to the necessary areas. In any case, apply a medium wet coat of
sealer to the entire part. Use the recommended G1-G7 shades of gray sealer (or surfacer]
for the basecoat color that will be applied

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0150WB Surface Prep Basecoat Blend
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0150WB Surface Prep Basecoat Blend',
    'Surface preparation for basecoat blending applications.',
    'other',
    'painting',
    ARRAY['blending', 'pd-0150wb', 'basecoat', 'waterborne'],
    '{"process_section": "blending", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP > os
<]
PD-0150WB oD ";

SURFACE PREP BASECOAT BLEND (WATERBORNE)

CAUTION: Wear the proper safety protection during this process.

1 Final sand the repaired area where color will be applied.

Follow recommendations on sanding surfacer process document and Product Data Sheet

2 Sand the remainder of the panell(s).

Hand Sand Edges
Scuff hard to reach areas and panel edges by hand with P800-P1000 abrasive disc or
flexible abrasive sheet.
and/or
Hand sand with a gray or gold scuff pad and sanding paste.

DA Sand Color Blend Area
DA sand the color blend area using a grade P800 abrasive disc and a soft interface pad.
For best results, sand back into primer surfacer.

DA Sand Adjacent Panels
DA sand the remainder of the blend Panel(s] using a P1000 abrasive disc.

Ensure that sanded areas are gloss free or re-sand as necessary!

 

3 Clean and inspect all panels.

a. Thoroughly wash off all traces of sanding paste with clean water.
and/or
Blow away water or sanding dust while wiping with a clean cloth.

b. Final clean with waterborne pre-cleaner and wipe off with a clean, lint free cloth.

c. Blow off area with air and tack off all panels using Tack Rag SX1070.

PPG Certification -
© 2018

 
 

ase Training 4/2018
All Rights Reserved.

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0200C Bare Plastic Prep
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0200C Bare Plastic Prep',
    'Surface preparation techniques for bare plastic components.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0200c', 'plastic'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP

P D re 0 2 0 0 C COMPLIANT MARKETS

PLASTIC PARTS PREP
BARE PLASTIC — PLASTIC PREP SYSTEM

CAUTION: Wear the proper safety protection during this process.

1 Review work order to ensure that all parts to be painted are present and repairs are understood.

 

Using the $U4901 Clean and Scuff Sponge:
(*May use SX1002 Sanding Paste and a gray scuff pad for this step]

a. Tear open the scuff sponge bag. Clean and abrade the substrate thoroughly.
Verify thorough abrasion. Use one (1) package per full-size plastic bumper part.

b. Rinse very thoroughly with water. NOTE: Water should sheet (run off) from the surface
If water beads up, repeat the cleaning process before proceeding.

c. Blow or wipe completely dry with clean cloth and insure that the entire surface has been
totally de-glossed.

 

3 Final clean with waterborne cleaner.
a. Be sure the surface is thoroughly dry before proceeding.

b, Use a tack cloth to remove any dirt particles prior to applying adhesion promoter.

 

4 Apply adhesion promoter:
Apply one medium wet coat of SU470LV/SUA470 adhesion promoter. Allow to flash
10 minutes (@ 70°F or until completely flashed to a matte finish before applying surfacer
or sealer.
NOTE: Do NOT directly topcoat with waterborne basecoat!

5 Apply primer surfacer if there are scratches, chips, or other imperfections. If not, apply a coat
of primer sealer. Use the recommended G1-G7 shade for the basecoat color to be applied.

To maximize coating flexibility and chip resistance, follow product instructions for using
flexible additive in the primer surfacer, primer sealer, and clearcoat. Use activator in
the basecoat.

PPG Certification - En
© 2018 PI

 

obase Training 4/2018
G. All Rights Reserved

 

@

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0220WB Primed Plastic Prep
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0220WB Primed Plastic Prep',
    'Preparation procedures for waterborne primed plastic parts.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0220wb', 'waterborne', 'plastic'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP

PD-0220WB

PLASTIC PARTS PREP
PRIMED PLASTICS (NEW OR LKQ)
CAUTION: Wear the proper safety protection during this process.

1 Inspect the plastic part for defects and plan repairs accordingly.

 

2 Test primer with solvent.
a. Using a clean towel with solvent, rub plastic part to see if the primer will wipe off.

b. If the primer wipes off, remove ALL primer from plastic part and follow bare plastic process.

 

3 Clean ALL surfaces THOROUGHLY.
a. Wash with soap and water (hot water if available).
b. Clean with waterborne cleaner. Blow dry panel.

NOTE: Do NOT use wax & grease remover on plastic parts due to possible static build up
and flash fire!

 

4 Abrade ALL surfaces thoroughly.

a. Sand with P400 grit wet-or-dry paper by hand, P320 grit on DA sander and red/gray
scuff pad or a combination of these sanding methods. [If the coating is particularly hard,
use a coarser grit paper.]

b. Verify after sanding that the surface is dull from abrasion and that all edges and
recessed areas have been completely de-glossed.

Re-clean with waterborne cleaner/anti-static agent.
a. Blow dry panel after cleaning.

b. Using a spray gun, apply a mist coat of anti-static agent/cleaner on the surface both
before and after tacking to help reduce static electricity and minimize the attraction of
dust and dirt.

 

6 Apply one light coat of plastic adhesion promoter to any bare plastic areas only!

Apply approved 2K sealer or if there are scratches, chips, or other imperfections, apply an
approved primer surfacer to repaired areas as needed. Use the recommended G1-G7 shade
for the basecoat color to be applied.

1 Do NOT apply waterborne basecoat directly over an adhesion promoter or factory primer.
= A 2K sealer or primer must be applied first.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0230 Painted Plastic Prep
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0230 Painted Plastic Prep',
    'Surface preparation for previously painted plastic components.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0230', 'plastic'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
<
6 - SURFACE PREP 27,6!
PD-0230 3° %

PLASTIC PARTS PREP
PAINTED PLASTIC (NEW OR LKQ)

CAUTION: Wear the proper safety protection during this process.

Review the work order to ensure that all parts to be painted are present and that repairs
are understood.

 

2 Inspect the plastic part for defects and plan repairs accordingly.

 

3 Wash part with hot water and soap, rinse & dry thoroughly.

4 LKQ painted part:
a. Clean entire part thoroughly with waterborne cleaner.

b. Verify that the part is thoroughly dry.

5 Sand the part very thoroughly with 320 grit on a DA sander.

a. Verify after sanding that the surface is dull from abrasion and that all edges and
recessed areas have been abraded.

b. Verify after sanding that all paint edges are properly featheredged and have good
adhesion to original substrate.

6 Clean entire part thoroughly with waterborne cleaner using a clean towel. This will also
reduce static that attracts dust. Verify that the part is thoroughly dry.

7 Follow with an approved primer surfacer if there are scratches, chips, or other imperfections.
If not, apply a medium wet coat of an approved sealer. Use the recommended G1-G7 shade for
the basecoat color to be applied.

To maximize coating flexibility and chip resistance, follow product instructions for using
flexible additive in the primer surfacer, primer sealer and clearcoat. Use T492 Adjuster
and 1493 Modifier in the basecoat as directed.

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

@

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0235C Bumper Sensor
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0235C Bumper Sensor',
    'Preparation and handling procedures for bumper sensor areas.',
    'other',
    'painting',
    ARRAY['surface_prep', 'pd-0235c'],
    '{"process_section": "surface-prep", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
6 - SURFACE PREP > os
<
PD =0235C COMPLIANT MARKETS 9 i 4

BUMPER SENSOR

Check and confirm that bumper sensors are painted on the customer''''s vehicle.
Do NOT paint if the existing sensors are unpainted.

CAUTION: Wear the proper safety protection during this process.

1 Identify if sensor is raw plastic, primed or painted.

lf bumper sensor is RAW plastic, follow Plastic Parts Prep - Bare Plastic process on
document PD-0200C (Compliant) OR

lf bumper sensor is PRIMED plastic, follow Plastic Parts Prep - Primed Plastic process on
document PD-0220WB OR

lf bumper sensor is PAINTED plastic, follow Plastic Parts Prep - Painted Plastic process on
document PD-0230

 

3 Apply approved sealer.

 

4 Allow sealer to flash per product data sheet.

 

1 IMPORTANT: Never apply waterborne basecoat directly over SUA470LV Advance Plastic
™ Bond. Sealer MUST be applied prior to basecoat application.

 

5 Apply basecoat followed by clearcoat as per respective product data sheets.

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0300 Masking
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0300 Masking',
    'Comprehensive masking procedures to protect non-paint areas during application.',
    'other',
    'painting',
    ARRAY['masking', 'pd-0300'],
    '{"process_section": "masking", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0500 Etch
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0500 Etch',
    'Etch primer application procedures for improved surface adhesion.',
    'other',
    'painting',
    ARRAY['primer_application', 'pd-0500', 'primer'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
PRIMER APPLICATION

PD-0500

ETCH PRIMING

NY wz

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying
all materials included within this process. ALWAYS refer to the specific product data
sheet for mixing and application instructions.

OVERVIEW - A two-component etch primer may be used on bare steel, galvanized steel or
aluminum panels for spot or complete panel priming, to provide adhesion and corrosion
resistance. An aerosol etch may be used on a minor paint cut-through to bare metal.

If corrosion is present or if sheet metal repairs or metal replacement are required, any bare
metal surfaces must be primed with an etch primer or a DTM primer.

Perform all necessary metal repairs to vehicle panel or panels.

Final sand all bare metal and body filler areas with 180 grit using a DA sander. Final sand
and featheredge all adjacent painted areas with 320 grit on a DA sander.

 

IMPORTANT: To avoid galvanic corrosion, never use the same piece of sandpaper on both
steel and aluminum. Avoid cross contamination of airborne steel and aluminum particles
generated in the same shop.

 

Clean area to be primed with an appropriate Wax and Grease Remover and wipe dry with
clean towels. Do not allow wax and grease removers to evaporate on the surface. Prime
carbon steel immediately and aluminum within 8 hours of cleaning.

 

Mask vehicle appropriately according to process document PD-0300 Vehicle Masking.

 

Mix Etch Primer according to the Product Data Sheet.

 

Apply one or two coats of Etch Primer to all bare metal, according to the specific Product
Data Sheet. Allow each coat to flash to a dull appearance before applying the next coat. Slight
overlap onto sanded paint and body filler is acceptable, but should be kept to a minimum.

 

Clean spray gun following the application of the final coat of Etch Primer.

 '),
  (1, 'Allow the Etch Primer to air dry according to the recoat schedule found on the product data
sheet. Apply primer surfacer or sealer after appropriate dry time. Topcoats must NOT be
applied directly to etch primer.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0510 Epoxy
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0510 Epoxy',
    'Epoxy primer application guidelines and technical specifications.',
    'other',
    'painting',
    ARRAY['primer_application', 'pd-0510'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
8 - PRIMER APPLICATION

PD-0510

EPOXY PRIMING

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying
all materials included within this process. ALWAYS refer to the specific product data sheet
for mixing and application instructions.

 

OVERVIEW - A two-component epoxy primer may be used on bare steel or aluminum
panels for spot or complete panel priming.

If corrosion is present or if sheet metal repairs or metal replacement are required, any bare
metal surfaces must be primed with a DTM primer.

Perform all necessary metal repairs to vehicle panel or panels.

 

Final sand all bare metal and body filler areas with 180 grit using a DA sander. Final sand
and featheredge all adjacent painted areas with 320 grit on a DA sander.

Ny —_

 

IMPORTANT: To avoid galvanic corrosion, never use the same piece of sandpaper on both
steel and aluminum. Avoid cross contamination of airborne steel and aluminum particles
generated in the same shop.

 

3 Clean area to be primed with an appropriate Wax and Grease Remover and wipe dry with
clean towels. Do not allow wax and grease removers to evaporate on the surface.

 

4 Mask vehicle appropriately according to process document PD-0300 Vehicle Masking

 

5 Mix Epoxy Primer according to the product data sheet.

 

6 Apply two coats of Epoxy Primer to all repaired areas and bare metal, allowing each coat to
flash to a uniformly dull appearance before applying the next coat.

 

7 Clean spray gun immediately following the application of the final coat of Epoxy Primer.

 

Allow the Epoxy Primer to air dry according to the recoat schedule found on the product data
sheets. Apply primer surfacer, sealer or topcoat after appropriate dry. Body filler and 2K
glaze may be applied over epoxy primer if desired.

PPG Certification - En
© 2018 PI

 

obase Training 4/2018
G. All Rights Reserved

 

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0520 Spray Primer Surfacer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0520 Spray Primer Surfacer',
    'Spray primer surfacer application techniques and best practices.',
    'other',
    'painting',
    ARRAY['surfacer_application', 'pd-0520', 'primer', 'surfacer'],
    '{"process_section": "surfacer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
9 - SURFACER APPLICATION

PD-0520

SPRAY PRIMER SURFACER

CAUTION: Wear the proper safety protection during this process. Refer to specific product
data sheet for application and product details.

1 Prepare surface as per process document PD-0100 Light Body Repair.

 

Scuff sand all recessed areas and panel edges with red scuff pad for adhesion of
primer surfacer.

 

3 Apply Etch Primer to bare metal areas as per process document PD-0500 Etch Priming.

Clean area to be primed with wax and grease remover and/or waterborne cleaner and a
clean cloth.

5 Mask as necessary to protect vehicle from overspray.

 

6 If not using primer sealer later, use the recommended shade of gray surfacer now.

Mix Primer Surfacer according to product document.

7 Apply multiple coats of Primer Surfacer to the repair area.
Apply surfacer just beyond edges of repair area to minimize size.

Use reverse priming technique [cover the largest area with the first coat and keep the
following coats within that area).

Allow each coat of primer to flash to a uniformly dull appearance before applying
the next coat

 

8 Clean spray gun immediately following the application of the final coat of primer.

 

Allow the Primer Surfacer to air or force dry according to the product document. Proceed to
process document PD-0590 Primer Surfacer Sanding for next steps.

PPG Certification - En
© 2018 PI

obase Training 4/2018
G. All Rights Reserved

 

 

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0540 UV Primer Surfacer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0540 UV Primer Surfacer',
    'UV-sensitive primer surfacer application and handling procedures.',
    'other',
    'painting',
    ARRAY['surfacer_application', 'pd-0540', 'primer', 'surfacer'],
    '{"process_section": "surfacer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
9 - SURFACER APPLICATION

PD-0540

UV PRIMER SURFACER

CAUTION: Wear the proper safety protection during this process. Refer to specific product
data sheet for application and product details.

Final sand bare metal and/or body filler with P180 grit dry. For 3” around the repair area,
featheredge paint using P320 grit dry on a DA sander with a back-up pad.

 

Clean area with wax and grease remover or waterborne cleaner prior to
UV Primer application.

 

Mask area as needed.

 

Plug in UV curing lamp and turn unit on allowing sufficient warm-up for a few minutes
before you will need the lamp [at least two minutes or follow time suggested by
manufacturer''''s instructions}.

RO DS =

 

5 Shake SUA1080 UV Primer can vigorously for two minutes, then apply 2-4 continuous coats
of primer to the repair area. Apply from clearcoat edge to clearcoat edge within the sanded
area. (If additional coats are needed, reapply AFTER curing.)

 

6 Cure UV primer for at least two minutes with the UV curing lamp. Take care to place lamp
appropriately. Follow manufacturer''''s instructions.

 

7 Remove film from top surface of primed area by wiping with SU1081 Primer Post Wipe

 

8 Apply guide coat to primed area.

 

9 Block sand UV primer according to process document PD-0590 Primer Surfacer Sanding.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0570AD Pinchweld Priming
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0570AD Pinchweld Priming',
    'Specialized priming procedures for pinchweld seams and joints.',
    'other',
    'painting',
    ARRAY['primer_application', 'pd-0570ad'],
    '{"process_section": "primer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
8 - PRIMER APPLICATION

PD-0570AD

PINCHWELD PRIMING — AIR DRY

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying
all materials included within this process.

OVERVIEW - A two-component epoxy primer must be used on bare metal areas of
pinchwelds when installing stationary glass using urethane repair materials.

If corrosion is present or if sheet metal repairs or metal replacement are required, the
pinchweld flange must be primed in order to restore the bonding area strength.

1 Perform all necessary metal repairs to pinchweld areas on roof, pillar and other panels
where stationary glass will be installed.

 

Final sand all bare metal and body filler areas with 180 grit using a DA sander. Do not apply
body filler to pinchweld area.

ND

Final sand and featheredge all adjacent painted areas with 320 grit on a DA sander.

 

Clean area to be primed with wax and grease remover and/or SWX350 waterborne cleaner
and dry with clean towels.

 

Mask vehicle appropriately according to process document PD-0300 Vehicle Masking.

 

Mix DP50LF/DP90LF (2:1 with DP402LF) OR DP50LV/DP9OLV Epoxy Primer according to the
product document.

 

Apply two coats of DPLF OR DPLV Epoxy Primer to the repair area, allowing each coat to
flash to a uniformly dull appearance before applying the next coat.

 

Clean spray gun immediately following the application of the final coat of
DPLF OR DPLV Epoxy Primer.

 

ox. cfc OR WwW

Allow the DPLF OR DPLV Epoxy Primer to air dry overnight before applying the urethane
adhesive. However, the refinishing process can continue once the epoxy can be masked
without tape tracking.

 

1 IMPORTANT: Mask off primed pinchweld area before color and clearcoat application.
Windshield adhesive must only be applied to a clean, epoxy-primed surface.

py ENVIROBASE

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0610 Mixing RST Paint
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0610 Mixing RST Paint',
    'Mixing procedures and ratios for RST paint basecoats.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats', 'pd-0610'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
8 - PRIMER APPLICATION ss 4

PD-0610

MIXING RTS PAINT: CALCULATING HOW MUCH TO MIX

 

, Fs
9

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying all
materials included within this process.

Use as a guideline only. These are starting point recommendations.

Primer - 4 0z. of ready-for-use primer per panel per coat (3’ x 3’ panel)

Basecoat Color - 12 oz. of ready-for-use color per panel for three coats

 

Clearcoat - 8 oz. of ready-for-use clearcoat per panel for two coats

 

Spot Repair - Mix %% to ‘2 the amount of primers or color that will be applied to a spot repair,
depending on the size of the repair.

 

For an average-size vehicle,
one “panel” is approximately
a3’X3’ area.

4-DOOR:

@ Each fender, door and quarter
panelis a panel

@ Each half of the hood, roof and deck
lid is a panel.

2-DOOR:
@ Each fender and door is a panel.

@ Each half of the hood, roof, deck lid
and quarter panel is a panel.

BUMPER COVERS:

e Usually count as two panels

BASECOAT:
@ Add for blending onto adjacent
panels

 

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0670WB Viscosity
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0670WB Viscosity',
    'Viscosity specifications and measurement procedures for waterborne paints.',
    'other',
    'painting',
    ARRAY['equipment_and_tools', 'pd-0670wb', 'waterborne', 'viscosity'],
    '{"process_section": "equipment-and-tools", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
 

™
11 - BASECOATS AND TRI-COATS i Z
%

PD-0670WB %

MEASURING VISCOSITY - WATERBORNE BASECOAT

 

CAUTION: Wear the proper safety protection during this process.

Items needed:

DIN4 viscosity cup (DEX640)
Stopwatch

Reduced waterborne basecoat

 

1 Clear stopwatch and prepare to submerge DIN4 viscosity cup.

 

2 Completely submerge DIN4 viscosity cup into waterborne basecoat.
3 Simultaneously lift DIN4 viscosity cup from waterborne basecoat AND start stopwatch.

4 Watch paint stream as it flows from DIN4 viscosity cup and prepare to stop stopwatch.

 

5 Stop stopwatch as soon as the paint stream “breaks” and note the seconds elapsed.

 

| The target viscosity for waterborne basecoat is 23-28 seconds using a DIN4 viscosity cup.
.

If the viscosity is greater than 28 seconds (too thick), add additional thinner, stir
well and recheck.

If the viscosity is less than 28 seconds [too thin], add additional unreduced waterborne
basecoat, stir well and recheck.

 

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0705WB Waterborne BC Application
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0705WB Waterborne BC Application',
    'Waterborne basecoat application techniques and spray parameters.',
    'tech_sheet',
    'painting',
    ARRAY['basecoats_and_tricoats', 'pd-0705wb', 'basecoat', 'waterborne'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
11 - BASECOATS AND TRI-COATS

PD-0705WB

WATERBORNE BASECOAT APPLICATION

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying.
ALWAYS refer to the specific product data sheet for mixing and application instructions.

 

Identify color formula. Verify color by choosing the best waterborne variant chip. If an
acceptable variant chip is not available, follow process document PD-0632 Creating a
Sprayout Card. Use the G-shade stated on formula.

 

Verify all panels to be painted have been prepared according to process document PD-0590
Sanding Primer Surfacer. Wipe surface with a tack cloth.

 

3 Apply waterborne basecoat color. Refer to PDS for specific instructions.
a. Apply 2-3 color coats (or the number indicated by the sprayout card).

b. Dehydrate each coat until uniformly dull.

 

1 |fnecessary, basecoat can be de-nibbed: dehydrate thoroughly, and gently scuff with 800-
™ 1500 dry abrasive. Do not use wet or dry abrasive. Do not use water or solvent as a lubricant.

a. Use a basecoat tack cloth to clean scuffed area.

b. If formula is metallic or pearl based, apply two more color coats over sanded areas to
prevent appearance of sand scratches.

4 For metallic or pearl-containing formulas, apply 1-2 control coats over all basecoated areas,
with lowered pressure, increased distance and using 85-90% overlap.

 

5 Allow basecoat to flash for 15 minutes at 70°F.

NOTE: If IR heat is to be used on the clearcoat, BEFORE applying the clearcoat,
IR dry the basecoat.

 

6 Follow with clearcoat application as outlined in process document PD-0730
Clearcoat Application.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0706WB Basecoat Blending
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0706WB Basecoat Blending',
    'Basecoat blending techniques for seamless color matching.',
    'other',
    'painting',
    ARRAY['blending', 'pd-0706wb', 'basecoat', 'waterborne'],
    '{"process_section": "blending", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
12 - BLENDING

PD-0706WB

BASECOAT BLENDING — WATERBORNE COLOR

5

6

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying.
ALWAYS refer to the specific product data sheet for mixing and application instructions.

Identify color formula. Verify color by choosing the best waterborne variant chip. If an
acceptable variant chip is not available, follow process document PD-0632 Creating a
Sprayout Card. Use G-shade stated on formula.

 

Verify all panels to be painted have been prepared according to process document
PD-0150WB Surface Prep Basecoat Blend. Use tack cloth.

 

Apply approved primer sealer.
a. Apply approved primer sealer using the recommended G1- G7 shade of gray for the
basecoat color that was identified in Step 1 above.

b. Apply just enough sealer to cover the primer surfacer area.

c. Melt in sealer edges gently using a high temperature reducer or lightly scuff the edge
of the applied sealer after being thoroughly dry with P800 grit sand paper for
a smoother transition.

 

Apply basecoat color. (For spot repairs, always keep the size of the color repair area as small
as possible for the best result.}
a, Apply the number of “coverage coats” (75% overlap, medium light coats, 6”-8” away]
of color as indicated by the sprayout card created in Step 1 above. Step out each color
coat further than the previous coat, creating an invisible blend.

b. Dehydrate each coat until uniformly dull

c. Apply 1-2 “control coats” (lower pressure, 90% overlap, “light mist” coats 9”-10") of color
as necessary to achieve uniform appearance of color, metallic and/or pearl. Allow to dry.

d. Lightly tack off all panels using tack rag.

e. Acolor blender may be used in the color or as a “wet bed” to assist in color blending
on metallic and pearl colors. See the waterborne basecoat product data sheet for
further instructions.'),
  (1, 'Allow basecoat to flash for 15 minutes at 70°F.
NOTE: If IR heat is to be used on the clearcoat, BEFORE applying the clearcoat,
IR dry the basecoat.

 

Follow with clearcoat application as outlined in process document PD-0730 Clearcoat Application

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0730 Clearcoat Application
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0730 Clearcoat Application',
    'Standard clearcoat application procedures and spray techniques.',
    'tech_sheet',
    'painting',
    ARRAY['clearcoat_application', 'pd-0730', 'clearcoat'],
    '{"process_section": "clearcoat-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
13 - CLEARCOAT APPLICATION

PD-0730

CLEARCOAT APPLICATION

CAUTION: Wear the proper safety protection during this process.

1 After basecoat has flashed appropriate amount of time, begin clearcoat application process.

 

2 Mask vehicle appropriately according to process document PD-0300 Vehicle Masking.

 

3 According to the Product Document Sheet directions, apply clearcoat to the entire panel.
Allow proper flash time between coats.

1 For guarantee and warranty purposes, the clearcoat must extend to the nearest panel edge
™ and cover the basecoat by a minimum of 2.0 mils

Allow the clearcoat to dry according to the product document before beginning the
finishing process.

 

5 Clean spray gun immediately following the application of the final coat of clearcoat.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0735 Clearcoat Blending
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0735 Clearcoat Blending',
    'Clearcoat blending procedures for invisible repairs.',
    'other',
    'painting',
    ARRAY['blending', 'pd-0735', 'clearcoat'],
    '{"process_section": "blending", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
13 - CLEARCOAT APPLICATION 3.
J
PD-0735 ou

CLEARCOAT BLENDING

 

CAUTION: Wear the proper safety protection when sanding, cleaning, ing and spraying
all materials included within this process. ALWAYS refer to the specific product data sheet
for mixing and application instructions.

 

OVERVIEW - Blending a clearcoat edge is not recommended if the repair is to be covered
by a PPG or OEM guarantee or warranty. Clearcoat blending is also not recommended on
horizontal and upper vertical panels with significant exposure to sunlight.

Final sand the blend area prior to refinishing.

a. Choose as smallan area as possible to blend the clearcoat edge.

b. Hand sand with a gray or gold scuff pad and sanding paste.

c. Scuff just slightly beyond where the clearcoat will go.

2 Clean the area thoroughly with an approved pre-paint cleaner.

Apply the first coat of clear after the color application,
a. Apply the first coat of clearcoat keeping the edge of the clearcoat within the sanded area.

b. With a second spray gun apply an approved blending solvent to the clearcoat edge by
lightly misting.

 

Apply the second coat of clear.

a. After the recommended flash time, apply the second coat of clearcoat keeping the edge
just slightly within the edge of the first coat of clear.

b. With a second spray gun apply an approved blending solvent to the clearcoat edge by
lightly misting.

Polish the clearcoat edge after sufficient dry time.
a. Polish lightly by hand.
b. Polish lightly with a machine using a finishing polish and a foam or finesse polishing pad.

PPG Certification -
© 2018

 
 

ase Training 4/2018
All Rights Reserved.

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0740 Painting Parts Off Vehicle
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0740 Painting Parts Off Vehicle',
    'Techniques for painting removed parts and components.',
    'other',
    'painting',
    ARRAY['finished_paint_procedures', 'pd-0740'],
    '{"process_section": "finished-paint-procedures", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
11 - BASECOATS AND TRI-COATS

PD-0740

PAINTING PARTS OFF THE VEHICLE

CAUTION: Wear the proper safety protection when sanding, cleaning, mixing and spraying
all materials included within this process.

1 Coordinate job types.
Type 1 - All parts to be replaced can be painted off the car and no blending is required.

Type 2 - All parts to be replaced can be painted off the car and blending is required on a
removable part (door, fender, etc).

Type 3 - All parts to be replaced can be painted off the car and blending is required on a
non-removable part (core support, quarter panel, rocker panel).

Group type 1 and 2 jobs together to paint multiple ROs and group type 1, 2, and 3 together
if there is room in the booth.

2 Check all replacement parts against repair order to verify proper part.

 

3 Test fit replacement parts to vehicle to verify proper mounting holes, gaskets, fasteners and
body alignment.

 

4 Complete all repairs on replacement panels, non-removable panels and panels to be
blended to the point where primer sealer or color is to be applied. Quality check all repairs

 

5 Mount all parts to holders on proper plane for painting and complete all masking.

6 Apply Primer Sealer, Basecoat Color, and then Clearcoat to all parts. Quality check before
baking. Bake, remove masking and allow parts to cool down

 

7 Reassemble vehicle. Quality check for fit and finish. When ready, send vehicle to detail.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0800 Removing Paint Defects
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0800 Removing Paint Defects',
    'Procedures for identifying and correcting paint defects.',
    'other',
    'painting',
    ARRAY['finished_paint_procedures', 'pd-0800'],
    '{"process_section": "finished-paint-procedures", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
L~
bo”

15 - FINISHED PAINT PROCEDURES > 4",
PD-0800 %

REMOVING PAINT DEFECTS

CAUTION: Wear the proper safety protection during this process.

1 Wash vehicle with soap and water. Clean with appropriate PPG cleaner.

 

2° Dust Nibs
Sand large defects and runs using P1000.

b. Sand small defects with P1500-P2000 using a finishing DA sander with an interface
backup pad. Visual and hand check area to make sure nib is removed.

c. Refine entire sanded area with P3000 damp on a DA sander with a backup pad
Proceed to compound step.

 

3* Runs/Sags
Remove defect with razor blade as best as possible.

b, Use P1000 Wet-or-Dry sandpaper with hand block to remove the remainder of the defect.
c. Refine entire sanded area with P1500-P2000 using a DA sander with an interface pad.

d. Refine entire sanded area with P3000 damp on a DA sander with a backup pad
Proceed to compound step.

 

4° Compound
Wash and dry finish, inspecting to ensure it’s completely flat sanded.

b. Begin by using a white foam or wool compounding pad. Keep buffer moving, bringing
a2’ x 2’ area up to a scratch-free shine. Then, move on to the next section. Exercise
caution when buffing near edges and body lines.

c. Keep buff pad clean. Do not let excess compound build-up and dry on the pad. Take
your time. Use sufficient lighting to help see if you have a scratch-free, smooth surface.
If not, stop and re-sand with P2000-P3000 and re-polish.

d. Once the finish is buffed with sanding marks and scratches removed, wash the vehicle
to remove any excess compound residue.

 

5 Machine Polish
a. Polish the entire repair area with a swirl mark remover and a black foam pad.

b. Wipe panel clean with microfiber towel.

 

6 Ultrafine Machine Polish
a. Final polish the entire repair area with an ultra-fine glaze using a blue foam pad.

b. Then buff by hand with a clean microfiber towel to a deep gloss finish.

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0810 Final Cleaning and Detailing
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0810 Final Cleaning and Detailing',
    'Final cleaning and detailing procedures after painting to ensure quality finish.',
    'other',
    'painting',
    ARRAY['cleaning', 'pd-0810'],
    '{"process_section": "cleaning", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
15 - FINISHED PAINT PROCEDURES

PD-0810

FINAL CLEANING AND DETAIL

CAUTION: Wear the proper safety protection during this process.

1 Inspection:
Inspect the vehicle for any heavily soiled areas or bug spatter, tree sap and other
sticky substances.

2 Interior:

Pre-spot any heavily soiled interior spots using an all-purpose cleaner and degreaser.

3 Wheels:

Apply a heavy-duty wheel cleaner. Do NOT use on uncoated aluminum wheels.

 

Other Areas:

Apply an all-purpose cleaner and degreaser to engine compartment, wheels, tires,
jambs, etc.

Tires & Wheels:

Brush tires and wheels as needed.

Rinse:

Rinse all areas where wheel cleaner or all-purpose cleaner and degreaser were applied.

4 Tar:

Remove tar, tape, or adhesive residue with an adhesive and tar remover.

 

5 Pre-Treat:
Pre-treat heavily soiled, bug spatter, tree sap and other sticky substances with an all
purpose cleaner and degreaser.

6 Wash:

Wash entire vehicle with car wash soap and water.

Cleaner Clay:

If paint overspray, oxidation, or environmental fallout (acid rain, bird droppings, etc.] are
present, use a cleaner clay to remove. Rinse and dry.

7 Tires:

Dress tires with silicone-free tire dressing.

Interior:

Clean interior with an all-purpose cleaner and degreaser. Rinse and pre-spotted materials
and treat again if necessary.

Windows:

Clean interior and exterior windows with glass cleaner.

 

9 Wipe vehicle with a detail cloth and inspect the vehicle for any remaining soiled areas.

PPG Certification - En
© 2018 PI

 

obase Training 4/2018
G. All Rights Reserved

 

S

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0701 Primer Sealer Application
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0701 Primer Sealer Application',
    'Primer sealer application procedures and best practices.',
    'tech_sheet',
    'painting',
    ARRAY['sealer_application', 'pd-0701', 'primer', 'sealer'],
    '{"process_section": "sealer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
wa ™
5% 9
10 - SEALER APPLICATION > ‘
;

|
PS
PD-0701 7>o ";
PRIMER SEALER APPLICATION

CAUTION: Wear the proper safety protection during this process. Refer to specific product
data sheet for application and product details.

1 Clean area to be sealed with wax and grease remover and/or SWX350 waterborne cleaner
and dry with clean towels.

 

2 Mask vehicle appropriately according to process document PD-0300 Vehicle Masking

 

3 Apply a medium wet coat of ECS Primer Sealer to the repair area. (Refer to the Product
Document for the sealer application instructions.)

a. Keep the sealer application area as small as possible on spot repairs.

b. Use the recommended G1 - G7 shade of gray sealer for the color that will be applied

4 Allow each coat of sealer to flash to a uniformly dull appearance before applying
the next coat.

 

5 Clean spray gun immediately following the application of the final coat of sealer.

 

6 Allow the primer sealer to air dry according to the product document before
applying basecoat.

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0521 Spray Waterborne Primer
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0521 Spray Waterborne Primer',
    'Application procedures for waterborne primer surfacers.',
    'other',
    'painting',
    ARRAY['surfacer_application', 'pd-0521', 'primer', 'waterborne'],
    '{"process_section": "surfacer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
9 - SURFACER APPLICATION

PD-0521

SPRAY WATERBORNE SPEED PRIME

CAUTION: Wear the proper safety protection during this process. Refer to specific product
data sheet for application and product details.

Prepare surface as per process document PD-0100 Light Body Repair.

 

Waterborne Speed Prime can be applied direct to metal (DTM). If final primer dry film
thickness (DFT) will be under 2.5 mils, apply SX1071 Etch Prime first.

 

Clean repair area with wax and grease remover and/or waterborne cleaner and a clean
cloth. Completely dry.

 

Mask as necessary to protect vehicle from overspray.

Thoroughly hand shake or mechanically agitate to ensure complete blending of product.
Reduce according to PDS sheet.

 

Use reverse priming technique (cover the largest area with the first coat and keep the
following coats within that area]. Apply surfacer just beyond repair edge to minimize size.
Apply first coat medium wet and thoroughly dehydrate. Apply 2-4 additional coats depending
on desired build and dehydrate each coat.

ao ark WS N =

7 Clean waterborne spray gun with SWX100 Waterborne Spray Gun Cleaner after final coat.

 

Allow the Primer Surfacer to air dry 30 minutes after flashoff, or force dry according to
the product document. Proceed to process document PD-0590 Primer Surfacer Sanding
for next steps.

ENVIROBASE’

HIGH PERFORMANCE

')
) AS chunks(chunk_idx, chunk_content);


-- Document: PD-0590 Primer Surfacer Sanding
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'PD-0590 Primer Surfacer Sanding',
    'Sanding and finishing procedures for primer surfacer coats.',
    'other',
    'painting',
    ARRAY['surfacer_application', 'pd-0590', 'primer', 'surfacer'],
    '{"process_section": "surfacer-application", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '--- Page 1 ---
9 - SURFACER APPLICATION 3.

<
PD-0590 o0 ";
PRIMER SURFACER SANDING

CAUTION: Wear the proper safety protection during this process. Refer to specific product
data sheet for application and product details.

1 Apply guide coat to primed area for final sanding.

 

2 Block sand the repaired area with P320 grit using a flat sanding block to remove guide coat.

 

3 Re-apply guide coat and sand with P400 grit on a DA sander and interface pad.

lf Wet-on-Wet sealer is NOT to be used, finish sand with P600 grit on a DA sander and
interface pad.

 

1 NOTE: if bare metal or body filler is exposed or some of the guide coat remains, a coat
™ of Self-Etch Primer must be applied to the bare metal areas and allowed to flash for
15 minutes. Then reapply Primer Surfacer over the repair areas.
Sand primer surfacer before topcoating.

 

5 Before wet-on-wet sealer application, clean the repair area with waterborne cleaner. Use
clean towels to dry thoroughly.

 

6 For spot repairs, prepare the remainder of the panel as per process document PD-0150WB
Basecoat Blend Prep - Waterborne.

PPG Certification - Envirobase Training 4/2018
© 2018 PPG. All Rights Reserved

')
) AS chunks(chunk_idx, chunk_content);


-- Document: Pastel Color Blend
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Pastel Color Blend',
    'Pastel color blending and application techniques for specialty finishes.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Pastel Color Blend
FFFTOOOraRRRinMMMiAAnATTgTIIIOOONNN
Pastel Colors
Pigment flotation
• Separation of high-density toners vs. low density toners.
• Low density toners struggle at integrating into the mix.
Steps to an invisible blend:
• Pre-reduce the wetbed mix (T490 or VWM5556)
• Ensure viscosity of basecoat and wet bed is set at 18-24 seconds using a #4 DIN cup.
• Use 10% T492 adjuster + 10% T595 thinner in basecoat and wet bed to allow edge of blend to blend
easier.
• Fade out color using the following 3 color mix blends, in 3 different containers add 75%, 50% and 25%
color to T490 or VWM5556 color blender. Apply the 75% color mix first and let down and finish using the
other 2 mixtures.
• Use smaller fluid tip gun nozzle (1.1-1.2) for optimum results (smaller tip = smaller droplet).
• Use slightly lower gun pressure and half-trigger on spray gun for best results.
• To colmplete the fade out (blend), apply color blend using the reverse application technique.
• Sake spray gun regularly prior to spraying.
FFFTOOOraRRRinMMMinAAAgTTTIIIOOONNN
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TBRR-3 Ford Ruby Red
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TBRR-3 Ford Ruby Red',
    'Ford ruby red tri-coat application and repair procedures.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Technical Bulletin
Ford Code RR / Ruby Red Application Process TBRR-3
PRODUCT DESCRIPTION
Ford code RR / Ruby Red uses a special pigment in the clearcoat to produce a very clean candy apple red effect.
This color is currently available on several Ford manufactured vehicles including cars, SUV’s and light trucks.
This repair process utilizes a tinted mid-coat layer that is applied over AQUABASE® Plus, DELTRON® DBC,
ENVIROBASE® High Performance, GLOBAL REFINISH SYSTEM® BC and NEXA AUTOCOLOR® 2K® basecoat
systems. The tinted clear mid-coat layer is made by combining VM4350 Vivid Ruby Tinter with many of PPG’s
popular express, production or glamour clearcoats.
This refinish repair consists of a tri-coat process made up of a red metallic ground coat layer, a tinted clear mid-coat
layer followed by a final clearcoat layer. See illustration below.
Topcoat Clear Layer
Tinted Mid-Coat Clear Layer
Metallic Ground Coat Layer
G6 Sealer
OEM Substrate
Brand specific formulas for the ground coat and the tinted mid-coat layer are available in PPG’s PAINTMANAGER®
software or by calling PPG at 800-647-6050 and follow the prompts to the Color Library.
© 2013 PPG Industries www.ppgrefinish.com TBRR-3 12/13
SELECTING THE PROPER PAINT SYSTEM FROM
PAINTMANAGER® SOFTWARE
• Searching Ford code RR in PAINTMANAGER will enter the user into their primary paint
system. Choose one of these Tri-coat systems below for optimum color match. Note; Ford
code RR formulas are also available from On-Line Color.
o AQUABASE PLUS BC 3CT 2.1 (low VOC clearcoats)
o AQUABASE PLUS BC 3CT NR (National Rule – 4.2 VOC clearcoats)
o DELTRON 2000 DBC TRICOAT
o ENVIROBASE HP EHP TRICOAT 2.1 (low VOC clearcoats)
o ENVIROBASE HP EHP TRICOAT NR (National Rule – 4.2 VOC clearcoats)
o GLOBAL BC TRICOAT
o NEXA 2K LEAD-FREE BC 3CT
• All Tri-coat formulas start with a basecoat formula using toners from that specific paint
system.
• All of these Tri-coat paint systems use the same tinter for the mid-coat: VM4350. This
special clearcoat tinter is from the VIBRANCE COLLECTION® line and it is a limited use
tinter, so please check available stock prior to mixing.
o Note: 1 container holds 4 oz. of tinter and will tint approximately 3.5 gallons of clearcoat.
• Each of the Tri-coat paint systems will express the mid-coat formula as 2 components;
VM4350 and a common clearcoat code.
o AQUABASE PLUS BC 3CT 2.1 P190-YYYY
o AQUABASE PLUS BC 3CT NR P190-XXXX
o DELTRON 2000 DBC TRICOAT DCXXXX
o ENVIROBASE HP EHP TRICOAT 2.1 ECYYY
o ENVIROBASE HP EHP TRICOAT NR DXXXX
o GLOBAL BC TRICOAT DXXXX
o NEXA 2K LEAD-FREE BC 3CT P190-XXXX
• The common clearcoat codes refer to the premium clearcoats currently used in your shop.
o Note: This instruction is given as a reminder within the mid-coat formula screen.
• It is recommended to use the same premium clearcoat for the mid-coat and final topcoat.
• To determine the proper hardener and reduction options proceed in PAINTMANAGER by
clicking on the YES button for “Reduce formula” then select your preferred clearcoat from the
selection menu.
• The creation of these common clearcoat codes are designed to allow each shop to use their
preferred clearcoat to blend the mid-coat. These common clearcoat codes will also allow
shops using PAINTMANAGER to keep track of paint usage and maintain accurate VOC
reporting.
© 2013 PPG Industries www.ppgrefinish.com TBRR-3 12/13
PREPARATION OF SUBSTRATE
• Damaged body work must be repaired using the approved PPG repair process including
selecting the correct under coating system for aluminum, steel and plastic substrates.
• For proper color alignment, finish the body work with the recommended sealer for that
basecoat system using G6 color shade.
PREPARATION OF COLOR CHECK PANEL
NOTE: Due to OEM color variation from model to model it is essential that a color check
panel be prepared to align the color before applying any ground coat color to the
vehicle. The color check panel should be prepared as follows:
• Mix and apply G6 sealer to three color check panels insuring full coverage and allow to flash.
• Mix and apply the ground coat until proper coverage is achieved (Waterborne systems
require a control coat).
• Prepare the tinted mid-coat by mixing VM4350 Vivid Ruby Tinter into a premium clearcoat.
**To avoid potential clearcoat compatibility issues between the tinted mid-coat and the top
clearcoat layer, it is strongly recommended to use the same clearcoat throughout the repair
process. A minimum of 1 topcoat clear layer must be applied over the tinted clear mid-coat.
**The tinted mid-coat must be reduced and catalyzed as normal following the addition of VM4350
Vivid Ruby Tinter. See the specific clearcoat product bulletin for proper reduction prior to
application.
• Apply 1 tinted mid-coat layer over all three color check panels. After flash off, remove one
panel and apply a second coat to the remaining panels. After flash off, remove another panel
and apply a third coat to the last panel. Allow to flash.
CHECKING THE COLOR
• Use the completed color check panels to evaluate the color on the car.
• When one of the color check panels is considered “blendable” to the car, proceed in
refinishing the vehicle. Be sure to spray the vehicle in the same manner and technique as the
color check panels to achieve proper color alignment.
• If a color adjustment is necessary tint the ground coat in the appropriate color direction and
prepare another series of color check panels by repeating the above process. Continue in
this fashion until a blendable match is achieved. Be sure to spray the vehicle in the same
manner and technique as the color check panels.
• Important: The tinted mid-coat layer can only be tinted with VM4350 Vivid Ruby Tinter. Any
color adjustments must be made to the ground coat. If necessary, contact the Color Library
for additional assistance.
• When completing the repair, a minimum of 1 topcoat clear layer must be applied over
the tinted clear mid-coat.
PPG Automotive Refinish
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
1-800-647-6050 1-888-310-4762
© 2013 PPG Industries www.ppgrefinish.com TBRR-3 12/13
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TCB104 Repair Process Document
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TCB104 Repair Process Document',
    'Detailed repair process documentation for TCB104 waterborne tri-coat systems.',
    'tech_sheet',
    'painting',
    ARRAY['repair_process'],
    '{"process_section": "repair-process", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Technical Bulletin
OEM Substrate
www.ppgrefinish.com
589 code 923627 or 590 code 905264
PPG Premium Sealer
© 2022 TCB-104 3/22 PPG Industries
PREPARATION OF SUBSTRATE:
 For all repairs, wash surfaces to be refinished with soap and water and dry. Then clean
with the appropriate PPG surface cleaner. Ensure that the substrate is thoroughly clean
and dried before the application of any refinish materials.
 Repairs must be performed by selecting a correct system for the refinishing of basecoat
/clearcoat, aluminum, steel, and plastic substrates.
 Abrade surfaces with the recommended grade paper according to the PPG product
sheet for the system selected. Carefully abrade the repair area to the original primer to
ensure that the original base color and clearcoat is removed. Abrade the surrounding area
to stable paint layers, then finish abrading the clearcoat on the entire panel. Try to avoid
abrading to bare metal or bare plastic.Thoroughly clean the surface before proceeding.
o If abraded to bare metal, use an OEM approved PPG etch primer* or
epoxy primer system on the bare metal area, followed by an OEM approved
PPG surfacer or sealer.
o If abraded to bare plastic, use an OEM approved PPG Plastic Primer on
the exposed plastic area followed by an OEM approved PPG surfacer or sealer.
o For stable OEM paint or undercoat area on metal or plastic parts, it is sufficient to
use only an OEM approved PPG surfacer
Paint code 589 and
or sealer.
590 Mercedes Basecoat Repair System TCB-104
PRODUCT DESCRIPTION:
This process has been developed to enhance the long term durability refinish repair of Mercedes paint codes 589
and 590 to meet the stringent OEM requirements for these colors. This repair process requires the use of a
hardener in solvent basecoat, or adjuster and modifier in waterborne basecoat. Repair with careful preparation of
the OEM finish with PPG Premium Primers, Primer Surfacers, Primer Sealers, and D8126 or DC4125
CeramiClear.The use of these products deliver excellent gloss and durability.
For all refinish repairs, follow the instructions according to the appropriate PPG Product Sheets.
This refinish repair consists of a basecoat clearcoat process. See illustration below.
CERAMICLEAR® Layer
www.ppgrefinish.com
Note: For solvent basecoat choose reducer according to the application environment
TCB-104 3/22
CLEARCOAT PREPARATION:

o
o Refer to the specific OEM approved product list for the recommended products and
refer to all PPG product sheets for their specific use and instructions.
BASECOAT PREPARATION:
 Solvent basecoat must be activated and reduced. Go to the additives section listed
in the product sheet for the basecoat activator amount required.
 Waterborne basecoat must use adjuster, modifier, and thinner. Go to the mix
ratio section listed in the product sheet, solid color
*Note
for the adjuster, modifier, and
thinner amount required.
: Do not apply basecoat systems directly over 2K Etch Primers
PPG Industries
19699 Progress Drive
Strongsville, OH 44149 1-800-647-6050
The PPG Logo,Ceramiclear, and We protect and beautify the world
PPG Canada Inc.
2301 Royal Windsor Drive Unit #6
Mississauga, Ontario L5J 1K5
1-888-310-4762
are
registered trademarks of PPG Industries Ohio, Inc.
© 2022 PPG Industries, Inc. All rights reserved.
Ceramiclear®
For all repairs, the PPG surfacer
must be activated according to the appropriate product sheets.
®
or sealer must be applied over the whole panel.
Note: For best result, CeramiClear should be used for full panel repairs.
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TCB-107 T4850 Vivid Red Ruby
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TCB-107 T4850 Vivid Red Ruby',
    'Vivid red ruby tri-coat repair process and application guide.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'The PPG Logo, We protect and beautify the world, are trademarks of PPG Industries Ohio, Inc.
© 2025 PPG Industries. All rights reserved. www.ppgrefinish.com
TCB-10 7 10/2025
T4850 Vivid Red Ruby T4800 Midcoat Clear
Technical Bulletin TCB-107
NOTE: Wear proper safety protection during repair processes.
PRODUCT DESCRIPTION:
T4850 Vivid Red Ruby is a brilliant deep red color toner offering a high depth effect.
This striking color tone effect is created by a 3CT layer paint process using special pigments.
T4800 is a transparent toner to support the mid layer.
T4800 has improved transparency versus T490. T4800 will allow light to pass through with little to no scattering or
absorption. This allows a clear appearance over ground layer colors. T4800 is not a product to be used as a wet bed
for the blend process.
T4850 and T4800 Mix Ratios:
Traditional Optional Mix Ratios using T493:
Metallic/Solid Colors: 100:10:5:5 (EHP+T492+T494/T595+T493)
OVM Optional Mix Ratios using T493:
Metallic/Solid Colors: 100:20:5:5 (EHP+T4900/T4910+T494/T595+T493)
Metallic/Solid Colors: 100:10:15:5 (EHP+ T4900/T4910+T494/T595+T493)
For additional information and blend processes refer to product data sheets and/or technical bulletins:
EB143 - ENVIROBASE® High Performance Waterborne Basecoat.
EB-MOD4900 ENVIROBASE® High Performance ONEVISIT Modifier.
WBPT001 - Waterborne Tri Coat Process.
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TCB100 Red Tinted Clearcoat Repair
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TCB100 Red Tinted Clearcoat Repair',
    'Red tinted clearcoat repair process for tri-coat systems.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats', 'clearcoat'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Technical Bulletin
VM4350 Tinted Clearcoat Application Process
TCB100
Some of today’s OEM automotive finishes utilize a tinted clear layer to produce a very clean
candy apple red effect. The repair process for these colors requires a tinted clearcoat layer that
is applied over AQUABASE® Plus, DELTRON® DBC, ENVIROBASE® High Performance,
GLOBAL REFINISH SYSTEM® BC and NEXA AUTOCOLOR® 2K® basecoat systems.
The tinted translucent clearcoat layer is made by combining VM4350 Vivid Ruby Tinter with
many of PPG’s popular express, speed, production or glamour clearcoats. This special
clearcoat tinter is part of the VIBRANCE COLLECTION® line and it is a limited use tinter, so
please check available stock prior to mixing.
The refinish repair for these types of colors consists of a tri-coat process made up of a metallic
ground coat layer, a tinted translucent clearcoat layer, followed by a final clearcoat layer. See
illustration below:
Clearcoat Layer
Tinted Translucent Clearcoat Layer
Metallic Ground Coat Layer
Specific G-shade Sealer
OEM Substrate
Brand specific formulas for colors containing a tinted clearcoat layer are available in PPG’s
PAINTMANAGER® program software for mixing and managing the paint operation or by calling
PPG at 800-647-6050 and follow the prompts to the Color Library.
SELECTING THE PROPER PAINT SYSTEM FROM PaintManager PLATFORM
 Search the OEM color code in PaintManager platform. When a Tri-Coat formula is listed as
shown in this list, it is an indication that the formula contains a tinted clearcoat with
VM4350. Choose one of the listed Tri-coat systems for optimum color match.
o Aquabase Plus BC 3CT 2.1 (uses low VOC clearcoats)
o Aquabase Plus BC 3CT NR (uses National Rule - 4.2 VOC clearcoats)
o Deltron 2000 DBC TRICOAT
o Envirobase High Performance TRICOAT 2.1 (uses low VOC clearcoats)
o Envirobase High Performance TRICOAT NR (uses National Rule - 4.2 VOC clearcoats)
o Global Refinish System BC TRICOAT
o Nexa Autocolor 2K LEAD-FREE BC 3CT
 All of these tri-coat formulas start with a basecoat ground layer using toners from the
specified paint system, followed by a tinted clearcoat made up of PPG premium clearcoat
mixed with VM4350.
 When mixing the tinted clearcoat layer, each of the Tri-coat paint systems will express the
formula as 2 components; A generic clearcoat code and VM4350. The clearcoat code will
show as follows on your mixing screen:
o Aquabase Plus BC 3CT 2.1 P190-YYYY
o Aquabase Plus BC 3CT NR P190-XXXX
o Deltron 2000 DBC TRICOAT DCXXXX
o Envirobase High Performance TRICOAT 2.1 ECYYY
o Envirobase High Performance TRICOAT NR DXXXX
o Global Refinish System BC TRICOAT DXXXX
o Nexa Autocolor 2K LEAD-FREE BC 3CT P190-XXXX
SELECTING THE PROPER PAINT SYSTEM FROM PaintManager PLATFORM
(Cont’d)
 The creation of these common clearcoat codes is meant to allow each shop to use their
preferred clearcoat as a component in the mid-coat formula. These common clearcoat
codes will also allow shops using PaintManager program software to keep track of paint
usage and maintain accurate VOC reporting.
 It is recommended to use the same premium clearcoat for the tinted clearcoat and the final
clearcoat layers.
o Color blenders such as DBC500, VWM500, D895 and P190-1002 are not suitable
replacements for PPG premium clearcoats.
 To determine the proper hardener and reducer options proceed in PaintManager platform
software by clicking on the YES button when “Reduce formula?” pops on the screen after
mixing the clearcoat and VM4350. Select your clearcoat from the menu and choose the
hardener and/or reducer that is best suited for the size of the repair and booth conditions.
 The tinted clearcoat must be reduced and catalyzed as normal following the addition
of VM4350 Vivid Ruby Tinter. See the specific clearcoat product bulletin for proper
mix ratios prior to application.
PREPARATION OF SUBSTRATE
 Damaged body panels must be repaired using an approved PPG repair process, including
using the correct under coating system for aluminum, steel and plastic substrates.
 Finish all body repairs and prep all blend panels for a refinish repair including sealer
application. See specific product bulletins for the basecoat system and sealer for sanding
and pre-cleaning instructions.
 For proper color alignment, begin the refinishing process using the recommended sealer for
the basecoat system being utilized. The correct G-Shade will be noted in PaintManager
platform.
 Be sure to thoroughly clean and tack off all surfaces with approved PPG cleaners before
applying sealer.
PREPARATION OF COLOR CHECK PANEL
NOTE: Due to OEM color variation from model to model it is essential that a color check
panel be prepared to align the color before applying any ground coat color to the
vehicle. The color check panel should be prepared as follows:
 Mix and apply the appropriate G-shade sealer to three color check panels insuring full
coverage and allow to flash.
 Mix and apply the ground coat until proper color is achieved (Waterborne systems require a
control coat).
 Prepare the tinted clearcoat by mixing VM4350 Vivid Ruby Tinter with a premium clearcoat
following the PPG supplied formula.
 To avoid potential clearcoat compatibility issues between the tinted clearcoat and the final
clearcoat layer, it is strongly recommended to use the same clearcoat throughout the repair
process. A minimum of one final un-tinted clear layer must be applied over the tinted
clearcoat.
 Apply one tinted clearcoat layer over all three color check panels. After flash off, remove
one panel and apply a second coat to the remaining panels. After flash off, remove another
panel and apply a third coat to the last panel. Allow to flash.
 Apply one coat of un-tinted clear over all three panels and allow to dry.
CHECKING THE COLOR
 Use the completed color check panels to evaluate the color on the car.
 When one of the color check panels is considered “blendable” to the car, proceed in
refinishing the vehicle. Be sure to spray the vehicle in the same manner and technique as
the color check panels to achieve proper color alignment.
 If a color adjustment is necessary tint the ground coat in the appropriate color direction and
prepare another series of color check panels by repeating the above process. Continue in
this fashion until a blendable match is achieved.
 Important: The tinted clearcoat layer can only be tinted with VM4350 Vivid Ruby Tinter.
Any color adjustments must be made to the ground coat. If necessary, contact the Color
Library for additional assistance at 800-647-6050 and follow the prompts.
PERFORMING THE REPAIR
 Reduce and spray the basecoat layer as normal per instructions in the Technical Data
Sheet for the basecoat being utilized for the repair.
 Apply medium light coats of the ground coat until proper color is achieved as determined by
the color check panel (Waterborne systems require a control coat). Blend adjacent panels
as necessary.
 Allow each coat of basecoat color to flash before applying the next. After each coat is
thoroughly flashed, tack with a PPG ONECHOICE® tack rag (part #SX1070) to remove any
dust or overspray that may have settled on the surface.
 Apply the translucent tinted clearcoat layer to the repair using the number of coats
determined by the color check panels and using the same application technique to ensure
similar coverage.
 The tinted clearcoat must be reduced and catalyzed as normal following the addition
of VM4350 Vivid Ruby Tinter. See the specific clearcoat product bulletin for proper
mix ratios prior to application.
 When completing the repair, a minimum of one final PPG Premium Clearcoat layer
must be applied edge to edge over the tinted clearcoat layer.
PPG Industries PPG Canada Inc.
19699 Progress Drive 2301 Royal Windsor Drive Unit #6
Strongsville, OH 44149 Mississauga, Ontario L5J 1K5
1-800-647-6050 1-888-310-4762
The PPG Logo, We protect and beautify the world, Aquabase, Deltron, Envirobase, Global Refinish System, Nexa Autocolor, 2K, PaintManager and Vibrance Collection are registered
trademarks of PPG Industries Ohio, Inc.
© 2017 PPG Industries www.ppgrefinish.com TCB100 Rev. 8/17
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TCB103 Mazda 46G Full Panel
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TCB103 Mazda 46G Full Panel',
    'Full panel repair process for Mazda 46G Machine Gray tri-coat.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Mazda 46G Machine Gray
TCB103
Technical Bulletin
Waterborne Basecoat Full Panel Repair Process 7‐6‐2017 Revision
This specific full panel / new panel repair process is necessary to meet appearance, performance, and
VOC regulatory requirements. You should contact your PPG representative for full documentation on
the approved products, systems and processes.
DESCRIPTION:
 Mazda’s 46G is a special effect gray metallic color which gives the paint a “sculpted from solid steel”
appearance.
 The OEM process utilizes an exotic tri‐coat system made up of a black color coat followed by high
brightness leafing aluminum, then overcoated by a clear coat layer. See the following illustration:
 The repair outlined in this document is intended to replicate the OEM finish as closely as possible utilizing
products similar to those at the factory.
PREPARATION OF SUBSTRATE:
 Any damaged body work on the vehicle should be repaired using a PPG and Mazda approved repair
process for the substrate being refinished (Aluminum, Steel, Plastic etc).
© 2017 PPG Industries www.ppgrefinish.com 7/2017
PREPARATION OF THE COLOR CHECK PANEL:
 Prior to applying any color on the vehicle, a color check panel must be produced utilizing the same
application methods employed in the actual refinish repair. This color check panel is required on every
car being repaired due to variation of color from one area of the car to the next and from car to car.
Multiple color check panels should be created to determine the best application technique to achieve
correct color alignment to the vehicle.
 The G7 color check panel (PPG Part #ARMC464G7) should be prepared as follows:
 Mix and apply 2 coats of clearcoat to the entire color check panel. Two coats are required so that enough
film build is present to allow for sanding. The use of a PPG or AQUABASE® Plus premium clearcoat is
recommended.
 Once the clearcoat has fully dried, remove any orange peel or texture with P1200 dry.
 Further refine the surface with P1000 Trizact wet to minimize any final scratches or pigtails.
Sandable Clearcoat Note:
 Sanding of this clearcoat layer is mandatory because the leafing aluminum requires a smooth surface
for proper orientation.
 Using PAINTMANAGER® program software for mixing and managing the paint operation, mix the Mazda
46G basecoat color formulated with leafing aluminum, according to one of these formulas.
o ENVIROBASE® High Performance waterborne basecoat Brand Code 944846
o AQUABASE® Plus waterborne basecoat Brand Code 8R8PB
 Reduce the basecoat 2:1 with waterborne reducer (50% reduction).
o Viscosity is 15‐16 seconds DIN #4
Spray Gun Notes:
 Best results are achieved by using small fluid tip setup ( 1.0, 1.1, 1.2 or WSB).
 Best results are achieved by restricting spraygun fluid amount.
o Completely close spraygun fluid knob, then open 1 to 1 ½ turns.
o Reduce spraygun pressure to achieve thin wet coats.
 Apply 3 to 4 thin wet coats of the reduced 46G basecoat to the color check panel. Thoroughly dehydrate
each layer before applying the next. Apply this basecoat layer using an X‐Pattern crosscoat technique (see
below) at 90% overlap to help evenly align the leafing aluminum in a horizontal position. This is the same
application technique to be used on the vehicle. The X‐Pattern crosscoat technique must be used with
every coat.
1 coat consists of two complete passes
© 2017 PPG Industries www.ppgrefinish.com 7/2017
Control Coat Note:
 Do not apply a final control coat. A control coat will orient the leafing aluminum on top of the basecoat
causing coarseness or increased sparkle.
 Ensure complete dehydration of the basecoat and evaluate with a color inspection light for uniform
coverage before the final clearcoat is applied.
 Mix and apply clearcoat to the entire color check panel. The use of a PPG or Aquabase premium clearcoat
is recommended.
o Apply the first coat of clear as a light (tack) coat. Avoid overwetting as movement of the leafing
aluminum basecoat my occur resulting in blotchiness and allow to flash 5 minutes.
o Apply 2 additional coats of clear using normal clearcoat application methods for the clearcoat
selected.
CHECK THE COLOR:
 Use the completed color check panels to evaluate the color on the car.
 If the color achieved on the color check panel is acceptable / blendable to the car proceed to the section
FULL PANEL or MULTIPLE PANEL REPAIR PROCESS.
 If tinting of the color is necessary, tint utilizing toners within the original formula, prepare additional color
check panels and re‐check. Continue in this fashion until an acceptable / blendable match is achieved.
FULL PANEL or MULTIPLE PANEL REPAIR PROCESS:
FULL PANEL REPAIR PREP:
 If using urethane G7 / SG07 sealer, sand repair area with P400‐P600.
 If using waterborne G7 / SG07 basecoat, sand repair area with P800‐P1000.
BLEND PANEL PREP: CAUTION – Be careful not to sand through the OE finish
 Sand blend panel with P1200 – P1500 dry and P1500 dry on edges by hand.
SEALER APPLICATION:
 Apply sealer to repair area and blend edge as needed.
SANDABLE CLEARCOAT APPLICATION:
 Mix and apply 2 coats of clearcoat to the panel being repaired or replaced and adjacent blend panels
edge‐to‐edge.
 Two coats are required so that enough film build is present to allow for sanding. The use of a PPG or
Aquabase premium clearcoat is recommended.
 Once the clearcoat has fully dried, remove any orange peel or texture with P1200 –P1500 dry.
 Further refine the surface with P1000 Trizact wet to minimize any final scratches or pigtails.
Sandable Clearcoat Note:
 Sanding of this clearcoat layer is mandatory because the leafing aluminum requires a smooth surface
for proper orientation.
WET‐BED APPLICATION:
 Reduce T490 or P990‐8999 with 40% waterborne thinner (21‐23 seconds DIN #4) and apply as a wet‐bed
over the entire area to be refinished.
BASECOAT 46G COLOR APPLICATION:
Spray Gun Notes:
 Best results are achieved by using small fluid tip setup ( 1.0, 1.1, 1.2 or WSB).
 Best results are achieved by restricting spraygun fluid amount.
o Completely close spraygun fluid knob, then open 1 to 1 ½ turns.
o Reduce spraygun pressure to achieve thin wet coats.
© 2017 PPG Industries www.ppgrefinish.com 7/2017
 Apply 3‐4 thin wet coats of reduced 46G basecoat using an X‐Pattern crosscoat technique (see below) at
90% overlap to help evenly align the leafing aluminum in a horizontal position. The X‐Pattern crosscoat
technique must be used with every coat.
1 coat consists of two complete passes
 Thoroughly dehydrate each layer before applying the next.
 After each coat is fully dry, tack with a OneChoice tack rag (part #SX1070) to remove any overspray or dust
that may have settled on the surface.
Control Coat Note:
 Do not apply a final control coat. A control coat will orient the leafing aluminum on top of the basecoat
causing coarseness or increased sparkle.
 Ensure complete dehydration of the basecoat and evaluate with a color inspection light for uniform
coverage before the final clearcoat is applied.
FINAL CLEARCOAT APPLICATION:
 Mix and apply clearcoat to all repaired panels, edge to edge. The use of a PPG or Aquabase premium
clearcoat is recommended.
o Apply the first coat of clear as a light (tack) coat. Avoid overwetting as movement of the leafing
aluminum basecoat may occur resulting in blotchiness and allow to flash for 5 minutes.
o Apply 2 additional coats of clear using normal clearcoat application methods for the clearcoat
selected.
The PPG Logo, We protect and beautify the world, PaintManager, Aquabase, Envirobase, and OneChoice are trademarks of PPG Industries Ohio, Inc.
© 2017 PPG Industries www.ppgrefinish.com 7/2017
')
) AS chunks(chunk_idx, chunk_content);


-- Document: TCB103 Mazda 46G Minor Repair
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'TCB103 Mazda 46G Minor Repair',
    'Minor repair process for Mazda 46G Machine Gray tri-coat.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Mazda 46G Machine Gray
TCB103
Technical Bulletin
Waterborne Basecoat Minor Repair Process 6‐22‐2017 Revision
This specific minor repair process is best suited for small to medium sized spot repairs. The process
outlined in this document is necessary to meet appearance, performance, and VOC regulatory
requirements. You should contact your PPG representative for full documentation on the approved
products, systems and processes.
DESCRIPTION:
 Mazda’s 46G is a special effect gray metallic color which gives the paint a “sculpted from solid steel”
appearance.
 The OEM process utilizes an exotic tri‐coat system made up of a black color coat followed by high
brightness leafing aluminum, then overcoated by a clear coat layer. See the following illustration:
 The repair outlined in this document is intended to replicate the OEM finish as closely as possible utilizing
products similar to those at the factory.
PREPARATION OF SUBSTRATE:
 Any damaged body work on the vehicle should be repaired using a PPG and Mazda approved repair
process for the substrate being refinished (Aluminum, Steel, Plastic etc).
© 2017 PPG Industries www.ppgrefinish.com 6/2017
PREPARATION OF THE COLOR CHECK PANEL:
 Prior to applying any color on the vehicle, a color check panel must be produced utilizing the same
application methods employed in the actual refinish repair. This color check panel is required on every
car being repaired due to variation of color from one area of the car to the next and from car to car.
Multiple color check panels should be created to determine the best application technique to achieve
correct color alignment to the vehicle.
 The G7 color check panel (PPG Part #ARMC464G7) should be prepared as follows:
 Using PAINTMANAGER® program software for mixing and managing the paint operation, mix the Mazda
46G basecoat color formulated with leafing aluminum, according to one of these formulas.
o ENVIROBASE® High Performance waterborne basecoat Brand Code 944846
o AQUABASE® Plus waterborne basecoat Brand Code 8R8PB
 Reduce the basecoat 2:1 with waterborne reducer (50% reduction).
o Viscosity is 15‐16 seconds DIN #4
Spray Gun Notes:
 Best results are achieved by using small fluid tip setup ( 1.0,1.1,1.2 or WSB).
 Best results are achieved by restricting spraygun fluid amount.
o Completely close spraygun fluid knob, then open 1 to 1 ½ turns.
o Reduce spraygun pressure to achieve thin wet coats.
 Apply 3 to 4 thin wet coats of the reduced 46G basecoat to the color check panel. Thoroughly dehydrate
each layer before applying the next. Apply this basecoat layer using an X‐Pattern crosscoat technique (see
below) at 90% overlap to help evenly align the leafing aluminum in a horizontal position. This is the same
application technique to be used on the vehicle. The X‐Pattern crosscoat technique must be used with
every coat.
1 coat consists of two complete passes
Control Coat Note:
 Do not apply a final control coat. A control coat will orient the leafing aluminum on top of the basecoat
causing coarseness or increased sparkle.
 Ensure complete dehydration of the basecoat and evaluate with a color inspection light for uniform
coverage before the final clearcoat is applied.
 Mix and apply clearcoat to the entire color check panel. The use of a PPG or Aquabase premium clearcoat
is recommended.
o Apply the first coat of clear as a light (tack) coat. Avoid overwetting as movement of the leafing
aluminum basecoat my occur resulting in blotchiness and allow to flash 5 minutes.
o Apply 2 additional coats of clear using normal clearcoat application methods for the clearcoat
selected.
© 2017 PPG Industries www.ppgrefinish.com 6/2017
CHECK THE COLOR:
 Use the completed color check panels to evaluate the color on the car.
 If the color achieved on the color check panel is acceptable / blendable to the car proceed to the section
MINOR REPAIR PROCESS.
 If tinting of the color is necessary, tint utilizing toners within the original formula, prepare additional color
check panels and re‐check. Continue in this fashion until an acceptable / blendable match is achieved.
MINOR REPAIR PROCESS:
REPAIR AREA PREP:
 If using urethane G7 / SG07 sealer, sand repair area with P400‐P600.
 If using waterborne G7 / SG07 basecoat, sand repair area with P800‐P1000.
BLEND PANEL PREP: CAUTION‐ Be careful not to sand through the OE finish
 Sand blend panel with P1200‐P1500 dry and P1500 dry on edges by hand.
 Refine the blend area with P1000 Trizact wet to minimize any deep scratches or pigtails
SEALER APPLICATION:
 Apply sealer to repair area and blend edge as needed.
 After flash, sand sealer with P800‐P1000 to obtain a smooth substrate for basecoat application.
WET‐BED APPLICATION:
 Reduce T490 or P990‐8999 with 40% waterborne thinner (21‐23 seconds DIN #4) and apply as a wet‐bed
over the entire area to be refinished.
BASECOAT 46G COLOR APPLICATION:
Spray Gun Notes:
 Best results are achieved by using small fluid tip setup ( 1.0,1.1,1.2 or WSB).
 Best results are achieved by restricting spraygun fluid amount.
o Completely close spraygun fluid knob, then open 1 to 1 ½ turns.
o Reduce spraygun pressure to achieve thin wet coats.
 Apply 3 ‐ 4 thin wet coats of reduced 46G basecoat using an X‐Pattern crosscoat technique (see below) at
90% overlap to help evenly align the leafing aluminum in a horizontal position. The X‐Pattern crosscoat
technique must be used with every coat.
1 coat consists ot two complete passes
 Thoroughly dehydrate each layer before applying the next.
 After each coat is fully dry, tack with a OneChoice tack rag (part #SX1070) to remove any overspray or dust
that may have settled on the surface.
© 2017 PPG Industries www.ppgrefinish.com 6/2017
Control Coat Note:
 Do not apply a final control coat. A control coat will orient the leafing aluminum on top of the basecoat
causing coarseness or increased sparkle.
 Ensure complete dehydration of the basecoat and evaluate with a color inspection light for uniform
coverage before the final clearcoat is applied.
FINAL CLEARCOAT APPLICATION:
 Mix and apply clearcoat to all repaired panels, edge to edge. The use of a PPG or Aquabase premium
clearcoat is recommended.
o Apply the first coat of clear as a light (tack) coat. Avoid overwetting as movement of the leafing
aluminum basecoat my occur resulting in blotchiness and allow to flash 5 minutes.
o Apply 2 additional coats of clear using normal clearcoat application methods for the clearcoat
selected.
The PPG Logo, We protect and beautify the world, PaintManager, Aquabase, Envirobase, Nexa Autocolor, and OneChoice are trademarks of PPG Industries Ohio, Inc.
© 2017 PPG Industries www.ppgrefinish.com 6/2017
')
) AS chunks(chunk_idx, chunk_content);


-- Document: VB16 Hot Rod Black
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'VB16 Hot Rod Black',
    'Hot rod black specialty finish application and techniques.',
    'other',
    'painting',
    ARRAY['unique_finishes'],
    '{"process_section": "unique-finishes", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'VB-16
DITZLER® Hot Rod Black
HRB9700 Hot Rod Black Kit
VM9700 Hot Rod Black
VH7700 Hardener
Ditzler Hot Rod Black is a low gloss, single
stage 2K acrylic urethane topcoat offering a
smooth, satin, deep black finish popular
with today’s custom painters.
VM9700 is VOC compliant for all regions.
Compatible Surfaces
VM9700 Hot Rod Black may be applied over the following.
• Fully cured, cleaned and sanded OEM and refinish undercoats and topcoats
Preparation
It is very important to be sure that the surface has been thoroughly cleaned and is dust and dirt free prior to the application of
Hot Rod Black. Hot Rod Black may be lightly de-nibbed to remove minor dirt or imperfections after the flash off time between
coats. Any de-nibbing must be completed before the final coat is applied. Sanding and or polishing out dirt or defects is not
possible from the final cured finish.
Note: Custom or exotic finishes are excluded from coverage under the PPG Paint Performance Guarantee.
Product Information Effective 4/13
Hot Rod Black
Directions For Use
Mixing Ratio:
VM9700 : VH7700 : D87xx/DT18xx
4 : 1 : ½ - 1
Pot life: Pot life is 8 hours at 70ºF (21ºC)
Application:
Apply: 2 - 3 medium wet coats until hiding
Note: The number of coats, film build, spray gun set-up and application will
affect the final appearance and gloss of Hot Rod Black. Before spraying the
vehicle, it is recommended that a test panel be sprayed to determine the overall
final appearance.
Spraygun Set up:
8 - 10 PSI at the cap for HVLP guns
Air
29 - 40 PSI at the gun for compliant guns
Pressure:
30 - 33 PSI at the gun for conventional guns
Fluid Tip: 1.3 - 1.4 mm or equivalent
Drying Times:
Between 10 - 15 minutes
Coats:
70ºF (21ºC) Note: Be sure each coat has completely flashed before applying additional coats.
Note: After 1st coat is applied, you may notice a slight seedy appearance to the
film, which is normal. Apply 2nd and subsequent coats as recommended with the
proper flash times. Product will dry down smooth and flat.
Dust Free:
70ºF (21ºC) 1 hour
Tack Free:
70ºF (21ºC) 4 - 6 hours
Tape Time:
70ºF (21ºC) 8 - 12 hours
Air Dry:*
70ºF (21ºC) 16 - 24 hours / over night
Force Dry:*
30 minutes @ 140ºF (60ºC)
140º (60ºC)
IR*
(Infrared):
30 minutes @ 75% power
Medium
Wave
Polishing
Air Dry N/A
Force Dry N/A
Recoat and
Recoat: After force dry and cool down or air dry for 16 - 24 hours.
VM9700 must be lightly sanded before recoating
Repair
70ºF (21ºC) Repair: After force dry and cool down or air drying for 16 - 24 hours.
Note: All force dry times are quoted for metal temperature. Additional time must be allowed
during force dry to allow metal to reach recommended metal temperature.
*To achieve optimal mar resistance, it is recommended that after being forced dried, the vehicle
should not be put into service for an additional 4 - 6 hours. If air dried, the vehicle should not be
put into use for an additional 24 - 48 hours. See care of the low gloss finish on page 3.
General Care and Maintenance of the Low Gloss Finish
Low gloss finishes can be relatively easily marked with general handling and day to day use (door/hood/deck lid opening, shoe
scuffing on entry or exit of vehicle etc. Care should be taken with these operations because marking or changing of the low gloss
effect could result.
Care should be taken to avoid spillage of fuel onto the low gloss finishes. Fuel spills should be removed as soon as possible using
the washing guidelines below, to avoid permanent damage or altering of the low gloss effect.
1. In order to keep the low gloss surface effect, the use of paint cleaner, abrasives or polishes and wax polishes must be avoided.
The vehicle must not be polished. Polishing will lead to a higher, uneven gloss effect.
2. Cleaning with unsuitable materials could alter the low gloss effect (generally increasing gloss).
3. Automated car washing should be avoided. The preferred car washing method is by hand with a soft sponge, mild soap and lots
of water. Frequent car washing over a period of time could lead to increased and inconsistent gloss levels across a panel.
Washing under direct sunlight should also be avoided.
4. Insects and bird droppings should be removed immediately. These residues should be soaked in water to soften and/or removed
carefully with a high pressure cleaning equipment. In the case of strongly adhered residues, a spray on insect remover should be
used prior to washing.
5. Whenever using any type of cleaning fluids with soft sponges or cloths, it is essential not to apply pressure or rub the low gloss
finish. A gentle wipe/spray on, wipe off technique should be used. Applying pressure will alter the low gloss effect and result in
an uneven appearance.
Technical Data:
VM9700 :
VH7700 :
RTS Combinations: D87xx / DT18xx
Volume Ratio: 4 : 1 : ½ - 1
Applicable Use Category Single-Stage Coating
VOC Actual (g/L) 117 - 128
VOC Actual (lbs/gal) 0.98 – 1.07
VOC Regulatory (less water less exempt) (g/L) 273
VOC Regulatory (less water less exempt) (lbs/gal) 2.28
Density (g/L) 1149 - 1195
Density (lbs/gal)
9.59 – 9.97
Volatiles wt. % 67.3 – 71.0
Water wt. % 0.0 -0.1
Exempt wt. % 56.1 – 61.1
Water vol. % 0.0 – 0.1
Exempt vol. % 53.0 – 57.0
Sq. Ft. Cov. 100% Transfer Efficiency. @ 1 mil 473 - 516
Important: The contents of this package must be blended with other components before the product can be used. Before
opening the packages, be sure you understand the warning messages on the labels of all components, since the
mixture will have the hazards of all its parts. Improper spray technique may result in a hazardous condition.
Follow spray equipment manufacturer’s instructions to prevent personal injury or fire. Follow directions for
respirator use. Wear eye and skin protection. Observe all applicable precautions.
See Material Safety Data Sheet and Labels for additional safety information and handling instructions.
EMERGENCY MEDICAL OR SPILL CONTROL INFORMATION (412) 434-4515; IN CANADA (514) 645-1320
Materials described are designed for application by professional, trained personnel using proper equipment and are not intended for sale
to the public. Products mentioned may be hazardous and should only be used according to directions, while observing precautions and
warning statements listed on label. Statements and methods described are based upon the best information and practices known to PPG Industries.
Procedures for applications mentioned are suggestions only and are not to be construed as representations or warranties as to performance results
or fitness for any intended use, nor does PPG Industries warrant freedom from patent infringement in the use of any formula or process
set forth herein.
For further information, please contact the PPG customer focus center toll-free at (800) 647-6050 or (888) 310-4762 in Canada
PPG Automotive Refinish
PPG Industries
19699 Progress Drive
Strongsville, OH 44149
1-800-647-6050
PPG Canada Inc.
2301 Royal Windsor Drive Unit #6
Mississauga, Ontario L5J 1K5
1-888-310-4762
The PPG logo, Bringing innovation to the surface, Ditzler, and Vibrance Collection are trademarks of PPG Industries Ohio, Inc.
© 2013 PPG Industries All rights reserved www.ppgrefinish.com Part No. VB-16, 4/13
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Variant Symbols
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Variant Symbols',
    'Guide to understanding and using variant color symbols and notation.',
    'other',
    'painting',
    ARRAY['basecoats_and_tricoats'],
    '{"process_section": "basecoats-and-tricoats", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, '“Variant Symbol“ Definitions
Chrysler
CHR,ZBJ (//L)
ZBJ/PBJ
Atlantic Blue Mica 2ct
MV3 - 59870
64007290
5819 (//L)
Variant Symbol
Variant
Definition Explanation
Symbol
B + BLUE Color is bluer than Prime.
Color uses larger or brighter
C ALU + COARSE
aluminum metallics than Prime.
D + DARK Color is darker than Prime.
Color uses smaller or grayer
F ALU + FINE
aluminum metallics than Prime.
G + GREEN Color is greener than Prime.
L + LIGHTER Color is lighter than Prime.
Color is more orange than
O + ORANGER
Prime.
R + RED Color is redder than Prime.
V + VIOLET Color is more violet than Prime.
W + WHITE Color is whiter than Prime.
Y + YELLOW Color is yellower than Prime.
Color is dirtier or less saturated
DI + DIRTY
than Prime.
Color is cleaner or more
VI + VIVID
saturated than Prime.
Metallic and/or pearl color has a
// FLOP “flop” difference in metallic and/or
pearl orientation.
The // FLOP Variant Symbol has to do with “flop” or orientation of metallics and/or pearls in a paint
film. Flop is generally described as either “lighter” or “darker” in the color. For example if you saw
“D // L” Variant Symbols on a formula it would mean the color has a “dark face” and a “light flop”.
EHP Variant Symbols.pub atn Rev. 04/09
© 2009 PPG Industries
')
) AS chunks(chunk_idx, chunk_content);


-- Document: Waterborne Tri-Coat Refinish Process
WITH new_doc AS (
  INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata, is_active)
  VALUES (
    'Waterborne Tri-Coat Refinish Process',
    'Complete guide to the waterborne tri-coat refinishing process for body shop repairs.',
    'tech_sheet',
    'painting',
    ARRAY['repair_process', 'waterborne'],
    '{"process_section": "repair-process", "source": "PPG"}'::jsonb,
    true
  )
  RETURNING id
)
INSERT INTO public.document_chunks (document_id, chunk_index, content)
SELECT id, chunk_idx, chunk_content
FROM new_doc
CROSS JOIN (VALUES
  (0, 'Waterborne Tri-Coat Refinish Process
This Tri-Coat Refinishing Process is designed as a guide when performing
a tri-coat refinish repair. It’s important to familiarize yourself with the
aspects of this process and plan your application prior to beginning the
tri-coat refinish repair.
Should you have additional questions, please contact your local
PPG Training Center. www.ppgrefinish.com
Table of Contents:
Subject: Page:
The Application Flowchart 2
Descriptions of Tri-Coat Terminology 3
Application View 4
Building A Letdown Tool 5
Bringing innovation to the surface™
The PPG logo and Bringing Innovation to the Surface are trademarks of PPG Industries Ohio, Inc. Waterborne Tri-Coat Refinish Process 5/21/13
Waterborne Tri-Coat Repair Process
The following graphic shows a process for the application of a Tri-Coat Paint System:
1 Gray Shade Undercoat Layer
2 Groundcoat Layer (Coverage Coats + Control Coat if required)
NO
Blending ?
YES
Create/Mix “Transition” Color
+
1 Part RTS Groundcoat Color 1 Part RTS Mid-Coat Color
3 Apply 1 “Transition Layer” (To be applied as an “Effect Coat”)
Tack off “Blend Areas” BEFORE proceeding to next step.
OPTIONAL:
If a 2nd "Transition Layer” is needed to step the blend out further,
create/mix 1 part RTS Transition color created above to 1 part RTS
Mid-Coat color.
1 Part RTS Transition Color
+
1 Part RTS Mid-Coat Color
( Created/mixed above )
Apply 2nd “Transition Layer” (To be applied as an “Effect Coat”)
Tack off “Blend Areas” BEFORE proceeding to next step.
4 Mid-Coat (Effect Coats + Control Coat if required)
5 Clearcoat
Page 2
The PPG logo is a trademark of PPG Industries Ohio, Inc.
Waterborne Tri-Coat Repair Process
(continued)
Descriptions of Tri-Coat Terminology:
Term Description
"G" Shade Undercoat Primer/Sealer "gray shade" recommended/referenced on the formula. This will help achieve desired color in the
fewest number of coats. Refer to PPG’s color retrieval system for correct G-Shade.
Coverage Coat Spraygun distance of approximately 6-8", 75% overlap applied to achieve coverage. Apply to a uniform
“wet-dry-wet-dry” appearance. Caution should be taken to avoid wet or over application of color. *
Control Coat Spraygun distance approximately 10-12", 90% overlap with reduced air pressure * . Only to be used on pearl and/
or metallic containing colors. This will ensure metallic and/or pearl orientation. Apply dry with no wetness.
Groundcoat A basecoat color (solid, pearl and/or metallic) used as the first or “ground” color coat of a "Tri-Coat" paint system.
(also referred to as Main Layer) This coat should be sprayed like a standard "Coverage Coat”. Pearl and/or metallic colors will require a "Control
Coat”. Spraygun distance approximately 6-8", 75% overlap applied to achieve coverage. Apply to a uniform
“wet-dry-wet-dry” appearance. Caution should be taken to avoid wet or over application of color. *
Effect Coat The application “method” of applying the Transition Layer and the Mid-Coats. The “Effect Coat” differs from the
(Used for the "Tri-Coat" or normal Groundcoat and Control Coat application in that the “Effect Coats” are specific to achieving proper color and
"Three Stage" system.) effect. A 90% overlap is required and a 10% (2-4 psi) reduction in air pressure * may be necessary to achieve an
appearance that is drier than a "Coverage Coat“ but wetter than a "Control Coat”.
Transition Layer A 1:1 mix of the ready-to-spray (RTS) Groundcoat color and RTS Mid-Coat color. The purpose of the Transition
Layer is to help make a gradual transition from the Groundcoat to the Mid-Coat in blend areas. Sprayed /applied
as an “Effect Coat”. NOTE: A “Control Coat” may not be necessary over the “Transition Layer”.
Mid-Coat Translucent layer (tinted or pearl containing) that is applied over the groundcoat in a three stage or "Tri-Coat"
(also referred to as Tinted system.
Clearcoat/Transparent Coat)
“Zone” or “Section” The process of refinishing an entire “Zone” or “Section” of a vehicle rather than “blending” the repair area.
Refinishing (Refer to Page 4.)
“Let Down” Process A process to help determine the number of “Mid-Coats” necessary in achieving a blendable color alignment to the
vehicle. (Refer to Page 5.)
Reverse Blending A process used to minimize the total size of the blend area. This method is achieved by blending back into the cov-
erage or repair area. This is achieved by starting outside of the coverage or repair area and blending into the repair
or coverage area. As this move is made with the spraygun, the trigger is gradually pulled from no material to full
trigger. keeping the spraygun at a 90 degree angle is important. This will help keep metallic and/or pearl overspray
“float out” to areas that will receive no Mid-Coat.
Viscosity Waterborne basecoats should be mixed at a viscosity of 23-28 seconds using a DIN4 cup. For optimal
performance however, a viscosity of 23-25 seconds generally provides the best results.
Tech Tip: As a general rule, 1 fluid oz. of waterborne thinner will lower the viscosity for 24 oz. of water-
borne basecoat by approximately 5 seconds (temperature and humidity will also affect viscosity).
* Refer to DOX440 Gun Chart for air pressure recommendations.
Page 3
The PPG logo is a trademark of PPG Industries Ohio, Inc.
Waterborne Tri-Coat Repair Process
(continued)
Standard Repair with Color Blending:
Clear Coat
Mid-Coat Layer
Transition Layer
Groundcoat Layer
Repaired Area
Color Blend Area
“Zone” or Section Refinishing: ( No Color Blending )
Next Body Line / Break Point
Repaired Area
Z o n e
(Apply color to the entire “Zone” and then clearcoat all panels to panel edge.)
NOTE:
“Zone” or Section Refinishing is considered when existing finish varies in blotchiness and/or opaqueness in multiple panels on
vehicle. Depending the vehicle/repair area, body lines, feature lines, moldings, etc. may be used to “disguise” or “hide” the color
blend rather than a typical/traditional color blend in the middle of a panel.
Page 4
The PPG logo is a trademark of PPG Industries Ohio, Inc.
Waterborne Tri-Coat Repair Process
(continued)
Building a Let-Down Tool
To help achieve a blendable match when applying a Tri-Coat finish, it is necessary to perform a Let-Down process to determine the
appropriate number of “Mid-Coats”. Follow the steps listed below to build a Let-Down tool. IMPORTANT: the Let-Down tool and
vehicle must be sprayed in exactly the same way (application, viscosity, equipment, etc.).
1. Adhere/affix the necessary number of PPG sprayout cards to a stationary object (cardboard box, scrap hood, etc.).
Sprayout cards should be the correct “G-Shade” or the appropriate G-Shade sealer should be applied.
2. Spray all cards with single coats of Groundcoat until perceived opacity is achieved. Dry thoroughly between coats.
- For metallic and/or pearl containing Groundcoats apply a Control Coat to help ensure proper color alignment.
- IMPORTANT: The Groundcoat must match the Groundcoat of the target before applying the Transition Layer or a Mid-Coat
otherwise it will be difficult to get a blendable match.
3. Using masking paper, cover Card #1. This will be used to reference Groundcoat color by itself.
4. If a blend is being performed, apply 1 Transition Layer to exposed cards (this is not necessary for full-panel, zone, or overall
refinishing).
5. Cover all but 1 card with separate pieces of masking paper.
6. Apply 1 Mid-Coat to exposed card.
7. Remove masking paper for the next card and apply 1 Mid-Coat to both exposed cards.
8. Repeat step 7 until Card #2 has only one coat of Mid-Coat.
9. For pearl-containing Mid-Coats, apply a Control Coat to the exposed areas (depending on the vehicle, a Control Coat may or
may not be necessary).
10. To properly evaluate color, all basecoat layers should be allowed to dry thoroughly before applying 2 coats of clear to ½ of
each card. NOTE: Color should be evaluated either in natural daylight or color-correct lighting.
Once the cards are dry, write on the back of them the formula numbers, viscosity, # of ground and Mid-Coats applied, spray gun
type/set-up, air pressure, etc. Thorough documentation will make it easier to replicate in the future.
Card #1 Card #2 Card #3 Card #4 Card #5 Card #6
Groundcoat plus 1 Groundcoat plus 2 Groundcoat plus 3 Groundcoat plus 4 Groundcoat plus 5
Groundcoat Only
Mid-Coat Mid-Coat Mid-Coat Mid-Coat Mid-Coat
(Optional control coat) (Optional control coat) (Optional control coat) (Optional control coat) (Optional control coat)
C L E A R C O A T 1/2 O F T H E S P R A Y O U T C A R D S
Page 5
The PPG logo is a trademark of PPG Industries Ohio, Inc.
PPG Automotive Refinish
19699 Progress Drive
Strongsville, Ohio 44149
www.ppgrefinish.com
PPG Canada, Inc.
2301 Royal Windsor Drive, Unit #6
Mississauga, Ontario L5J 1K5
www.ppgrefinish.com
© PPG Industries. All rights reserved. The PPG logo and Bringing Innovation to the Surface are trademarks of PPG Industries Ohio, Inc.
')
) AS chunks(chunk_idx, chunk_content);
