/**
 * Default document templates seeded for new arborists.
 * Editable — the arborist can customize them after creation.
 */

export interface DefaultTemplate {
  name: string;
  content: string;
  category: string;
}

export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  {
    name: "Standard Limitations",
    content:
      "The observations and opinions expressed in this report are limited to the trees, date, and conditions as described. The findings are based on a visual assessment from ground level per ISA standards. No invasive testing, root excavation, or aerial inspection was performed unless otherwise noted. This report does not guarantee the health, structural stability, or longevity of any tree assessed.",
    category: "limitations",
  },
  {
    name: "Methodology Statement",
    content:
      "Trees were assessed using ISA Tree Risk Assessment Qualification (TRAQ) Level 2 methodology. Each tree was visually inspected from ground level, with measurements taken for diameter at breast height (DBH), estimated height, and canopy spread. Condition ratings follow the ISA 1-5 scale where 1 represents a dead or dying specimen and 5 represents excellent health and structure.",
    category: "methodology",
  },
  {
    name: "Qualifications Summary",
    content:
      "[Arborist Name] is an International Society of Arboriculture (ISA) Certified Arborist (credential #[ISA Number]). All assessments and recommendations in this report are made in accordance with ISA Best Management Practices and the ANSI A300 standards for tree care.",
    category: "qualifications",
  },
];
