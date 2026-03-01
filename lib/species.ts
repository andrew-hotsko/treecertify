export interface TreeSpecies {
  common: string;
  scientific: string;
  category: "native" | "nonnative";
  commonOnPeninsula: boolean;
}

export const PENINSULA_SPECIES: TreeSpecies[] = [
  // ---------------------------------------------------------------------------
  // Native Oaks
  // ---------------------------------------------------------------------------
  { common: "Coast Live Oak", scientific: "Quercus agrifolia", category: "native", commonOnPeninsula: true },
  { common: "Valley Oak", scientific: "Quercus lobata", category: "native", commonOnPeninsula: true },
  { common: "Blue Oak", scientific: "Quercus douglasii", category: "native", commonOnPeninsula: true },
  { common: "California Black Oak", scientific: "Quercus kelloggii", category: "native", commonOnPeninsula: true },
  { common: "Canyon Live Oak", scientific: "Quercus chrysolepis", category: "native", commonOnPeninsula: true },
  { common: "Interior Live Oak", scientific: "Quercus wislizeni", category: "native", commonOnPeninsula: true },
  { common: "Oregon White Oak", scientific: "Quercus garryana", category: "native", commonOnPeninsula: true },
  { common: "Tan Oak", scientific: "Notholithocarpus densiflorus", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Redwoods & Sequoias
  // ---------------------------------------------------------------------------
  { common: "Coast Redwood", scientific: "Sequoia sempervirens", category: "native", commonOnPeninsula: true },
  { common: "Giant Sequoia", scientific: "Sequoiadendron giganteum", category: "native", commonOnPeninsula: false },
  { common: "Dawn Redwood", scientific: "Metasequoia glyptostroboides", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Pines
  // ---------------------------------------------------------------------------
  { common: "Monterey Pine", scientific: "Pinus radiata", category: "native", commonOnPeninsula: true },
  { common: "Bishop Pine", scientific: "Pinus muricata", category: "native", commonOnPeninsula: false },
  { common: "Knobcone Pine", scientific: "Pinus attenuata", category: "native", commonOnPeninsula: false },
  { common: "Gray Pine", scientific: "Pinus sabiniana", category: "native", commonOnPeninsula: false },
  { common: "Ponderosa Pine", scientific: "Pinus ponderosa", category: "native", commonOnPeninsula: false },
  { common: "Sugar Pine", scientific: "Pinus lambertiana", category: "native", commonOnPeninsula: false },
  { common: "Torrey Pine", scientific: "Pinus torreyana", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Native Cypresses & Cedars
  // ---------------------------------------------------------------------------
  { common: "Monterey Cypress", scientific: "Hesperocyparis macrocarpa", category: "native", commonOnPeninsula: true },
  { common: "Incense Cedar", scientific: "Calocedrus decurrens", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Native Conifers
  // ---------------------------------------------------------------------------
  { common: "Douglas Fir", scientific: "Pseudotsuga menziesii", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Broadleaf Trees
  // ---------------------------------------------------------------------------
  { common: "California Bay Laurel", scientific: "Umbellularia californica", category: "native", commonOnPeninsula: true },
  { common: "California Buckeye", scientific: "Aesculus californica", category: "native", commonOnPeninsula: true },
  { common: "Madrone", scientific: "Arbutus menziesii", category: "native", commonOnPeninsula: true },
  { common: "Big Leaf Maple", scientific: "Acer macrophyllum", category: "native", commonOnPeninsula: true },
  { common: "Western Sycamore", scientific: "Platanus racemosa", category: "native", commonOnPeninsula: true },
  { common: "White Alder", scientific: "Alnus rhombifolia", category: "native", commonOnPeninsula: true },
  { common: "Arroyo Willow", scientific: "Salix lasiolepis", category: "native", commonOnPeninsula: true },
  { common: "Catalina Ironwood", scientific: "Lyonothamnus floribundus", category: "native", commonOnPeninsula: false },
  { common: "California Fan Palm", scientific: "Washingtonia filifera", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Non-native Eucalyptus
  // ---------------------------------------------------------------------------
  { common: "Eucalyptus (Blue Gum)", scientific: "Eucalyptus globulus", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Red Gum)", scientific: "Eucalyptus camaldulensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Lemon Gum)", scientific: "Corymbia citriodora", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Silver Dollar)", scientific: "Eucalyptus polyanthemos", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Palms
  // ---------------------------------------------------------------------------
  { common: "Mexican Fan Palm", scientific: "Washingtonia robusta", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Date Palm", scientific: "Phoenix canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "King Palm", scientific: "Archontophoenix cunninghamiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Queen Palm", scientific: "Syagrus romanzoffiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Windmill Palm", scientific: "Trachycarpus fortunei", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Pines & Cedars
  // ---------------------------------------------------------------------------
  { common: "Italian Stone Pine", scientific: "Pinus pinea", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Pine", scientific: "Pinus canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Aleppo Pine", scientific: "Pinus halepensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Deodar Cedar", scientific: "Cedrus deodara", category: "nonnative", commonOnPeninsula: true },
  { common: "Atlas Cedar", scientific: "Cedrus atlantica", category: "nonnative", commonOnPeninsula: true },
  { common: "Western Red Cedar", scientific: "Thuja plicata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Fruit & Ornamental
  // ---------------------------------------------------------------------------
  { common: "Olive", scientific: "Olea europaea", category: "nonnative", commonOnPeninsula: true },
  { common: "Fig", scientific: "Ficus carica", category: "nonnative", commonOnPeninsula: true },
  { common: "Avocado", scientific: "Persea americana", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Lemon)", scientific: "Citrus limon", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Orange)", scientific: "Citrus sinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Japanese Maple", scientific: "Acer palmatum", category: "nonnative", commonOnPeninsula: true },
  { common: "Southern Magnolia", scientific: "Magnolia grandiflora", category: "nonnative", commonOnPeninsula: true },
  { common: "Jacaranda", scientific: "Jacaranda mimosifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Crepe Myrtle", scientific: "Lagerstroemia indica", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Elms, Planes & Shade Trees
  // ---------------------------------------------------------------------------
  { common: "Chinese Elm", scientific: "Ulmus parvifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "American Elm", scientific: "Ulmus americana", category: "nonnative", commonOnPeninsula: true },
  { common: "London Plane", scientific: "Platanus x acerifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Sweetgum", scientific: "Liquidambar styraciflua", category: "nonnative", commonOnPeninsula: true },
  { common: "Tulip Tree", scientific: "Liriodendron tulipifera", category: "nonnative", commonOnPeninsula: true },
  { common: "Camphor Tree", scientific: "Cinnamomum camphora", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Street Trees
  // ---------------------------------------------------------------------------
  { common: "Brisbane Box", scientific: "Lophostemon confertus", category: "nonnative", commonOnPeninsula: true },
  { common: "Fern Pine", scientific: "Afrocarpus gracilior", category: "nonnative", commonOnPeninsula: true },
  { common: "New Zealand Christmas Tree", scientific: "Metrosideros excelsa", category: "nonnative", commonOnPeninsula: true },
  { common: "Flowering Pear", scientific: "Pyrus calleryana", category: "nonnative", commonOnPeninsula: true },
  { common: "Chinese Pistache", scientific: "Pistacia chinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Zelkova", scientific: "Zelkova serrata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Non-native
  // ---------------------------------------------------------------------------
  { common: "Cork Oak", scientific: "Quercus suber", category: "nonnative", commonOnPeninsula: true },
  { common: "Acacia (Bailey)", scientific: "Acacia baileyana", category: "nonnative", commonOnPeninsula: true },
  { common: "Norfolk Island Pine", scientific: "Araucaria heterophylla", category: "nonnative", commonOnPeninsula: true },
];

export function searchSpecies(query: string): TreeSpecies[] {
  const q = query.toLowerCase();
  return PENINSULA_SPECIES.filter(
    (s) =>
      s.common.toLowerCase().includes(q) ||
      s.scientific.toLowerCase().includes(q)
  );
}

export function getSpeciesByName(common: string): TreeSpecies | undefined {
  return PENINSULA_SPECIES.find(
    (s) => s.common.toLowerCase() === common.toLowerCase()
  );
}
