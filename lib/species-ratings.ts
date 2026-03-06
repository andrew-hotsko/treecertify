/**
 * CTLA Species Ratings — Bay Area, North Bay, and Tahoe/Sierra regions.
 *
 * Species ratings reflect adaptability, desirability, and longevity in the
 * local climate per CTLA Guide for Plant Appraisal, 10th Edition (2019).
 *
 * IMPORTANT: Keys use COMMON NAME format matching TreeRecord.speciesCommon
 * (e.g., "Coast Live Oak", NOT "Coast Live Oak (Quercus agrifolia)").
 * Update annually when CTLA publishes new regional classification guides.
 *
 * Default for unlisted species: 60%
 */

export const SPECIES_RATINGS: Record<string, number> = {
  // ---------------------------------------------------------------------------
  // Native Oaks (Bay Area flagship species)
  // ---------------------------------------------------------------------------
  "Coast Live Oak": 100,
  "Valley Oak": 100,
  "Blue Oak": 95,
  "California Black Oak": 95,
  "Oregon White Oak": 95,
  "Canyon Live Oak": 90,
  "Interior Live Oak": 90,
  "Tan Oak": 75,

  // ---------------------------------------------------------------------------
  // Native Redwoods & Sequoias
  // ---------------------------------------------------------------------------
  "Coast Redwood": 100,
  "Giant Sequoia": 100,
  "Dawn Redwood": 80,

  // ---------------------------------------------------------------------------
  // Native Pines
  // ---------------------------------------------------------------------------
  "Monterey Pine": 60,
  "Bishop Pine": 55,
  "Knobcone Pine": 50,
  "Gray Pine": 55,
  "Ponderosa Pine": 80,
  "Sugar Pine": 85,
  "Torrey Pine": 70,

  // ---------------------------------------------------------------------------
  // Native Cypresses & Cedars
  // ---------------------------------------------------------------------------
  "Monterey Cypress": 75,
  "Incense Cedar": 85,

  // ---------------------------------------------------------------------------
  // Other Native Conifers
  // ---------------------------------------------------------------------------
  "Douglas Fir": 85,
  "White Fir": 75,
  "Red Fir": 75,
  "Jeffrey Pine": 80,
  "Lodgepole Pine": 60,

  // ---------------------------------------------------------------------------
  // Native Broadleaf Trees
  // ---------------------------------------------------------------------------
  "California Bay Laurel": 80,
  "California Buckeye": 70,
  "Madrone": 85,
  "Big Leaf Maple": 80,
  "Western Sycamore": 80,
  "White Alder": 60,
  "Red Alder": 55,
  "Arroyo Willow": 50,
  "Catalina Ironwood": 75,
  "California Fan Palm": 60,
  "California Black Walnut": 75,

  // ---------------------------------------------------------------------------
  // Non-native Eucalyptus
  // ---------------------------------------------------------------------------
  "Eucalyptus (Blue Gum)": 40,
  "Eucalyptus (Red Gum)": 45,
  "Eucalyptus (Lemon Gum)": 50,
  "Eucalyptus (Silver Dollar)": 45,

  // ---------------------------------------------------------------------------
  // Non-native Palms
  // ---------------------------------------------------------------------------
  "Mexican Fan Palm": 35,
  "Canary Island Date Palm": 55,
  "King Palm": 45,
  "Queen Palm": 40,
  "Windmill Palm": 45,

  // ---------------------------------------------------------------------------
  // Non-native Pines & Cedars
  // ---------------------------------------------------------------------------
  "Italian Stone Pine": 60,
  "Canary Island Pine": 55,
  "Aleppo Pine": 50,
  "Deodar Cedar": 75,
  "Atlas Cedar": 75,
  "Western Red Cedar": 80,

  // ---------------------------------------------------------------------------
  // Non-native Fruit & Ornamental
  // ---------------------------------------------------------------------------
  "Olive": 75,
  "Fig": 60,
  "Avocado": 55,
  "Citrus (Lemon)": 50,
  "Citrus (Orange)": 50,
  "Japanese Maple": 85,
  "Southern Magnolia": 80,
  "Jacaranda": 65,
  "Crepe Myrtle": 65,

  // ---------------------------------------------------------------------------
  // Non-native Elms, Planes & Shade Trees
  // ---------------------------------------------------------------------------
  "Chinese Elm": 55,
  "American Elm": 70,
  "London Plane": 75,
  "Sweetgum": 70,
  "Tulip Tree": 70,
  "Camphor Tree": 55,
  "Ginkgo": 80,

  // ---------------------------------------------------------------------------
  // Non-native Street Trees
  // ---------------------------------------------------------------------------
  "Brisbane Box": 65,
  "Fern Pine": 60,
  "New Zealand Christmas Tree": 60,
  "Flowering Pear": 50,
  "Chinese Pistache": 80,
  "Zelkova": 75,

  // ---------------------------------------------------------------------------
  // Other Non-native
  // ---------------------------------------------------------------------------
  "Cork Oak": 80,
  "Acacia (Bailey)": 40,
  "Norfolk Island Pine": 55,

  // ---------------------------------------------------------------------------
  // Tahoe / Sierra species
  // ---------------------------------------------------------------------------
  "Western White Pine": 75,
  "Whitebark Pine": 70,
  "Mountain Hemlock": 70,
  "Quaking Aspen": 65,
  "Black Cottonwood": 50,

  // ---------------------------------------------------------------------------
  // North Bay / Wine Country
  // ---------------------------------------------------------------------------
  "Oregon Ash": 60,
  "Black Walnut": 70,
  "California Sycamore": 80,
  "Tree of Heaven": 20,
  "Brazilian Pepper": 30,
};

/**
 * Look up the default CTLA species rating for a given common name.
 * Returns 60 (default) if species is not in the table.
 *
 * Matching is case-insensitive.
 */
export function getDefaultSpeciesRating(speciesCommon: string): number {
  if (!speciesCommon) return 60;

  // Try exact match first (case-insensitive)
  const normalized = speciesCommon.trim();
  for (const [key, value] of Object.entries(SPECIES_RATINGS)) {
    if (key.toLowerCase() === normalized.toLowerCase()) {
      return value;
    }
  }

  // Try partial match (species name contains key or key contains species name)
  const lower = normalized.toLowerCase();
  for (const [key, value] of Object.entries(SPECIES_RATINGS)) {
    const keyLower = key.toLowerCase();
    if (lower.includes(keyLower) || keyLower.includes(lower)) {
      return value;
    }
  }

  return 60; // default for unlisted species
}
