
/**
 * Utility functions for calculating eco-friendliness ratings and badges
 */

// Material sustainability scores (0-10)
const materialScores = {
  "bamboo": 9.5,
  "organic cotton": 8.5,
  "recycled plastic": 7.5,
  "recycled paper": 8.0,
  "stainless steel": 7.0,
  "glass": 7.5,
  "bioplastic": 8.0,
  "synthetic": 3.0,
  "plastic": 2.0,
  "leather": 4.0,
  "conventional cotton": 3.0,
  "polyester": 2.5,
  "aluminum": 5.0,
};

// Brand ethics scores (0-10)
const brandEthicsScores = {
  "fair trade certified": 9.0,
  "b-corp": 9.0,
  "1% for the planet": 8.0,
  "locally made": 7.5,
  "carbon neutral": 8.0,
  "sustainable practices": 7.0,
  "ethical labor": 8.5,
  "transparency": 7.0,
  "no certifications": 3.0,
  "greenwashing concerns": 1.0,
};

// Packaging scores (0-10)
const packagingScores = {
  "plastic-free": 9.0,
  "compostable": 9.5,
  "biodegradable": 8.5,
  "minimal": 8.0,
  "recycled materials": 7.5,
  "recyclable": 7.0,
  "conventional plastic": 2.0,
  "excessive": 1.0,
};

/**
 * Calculate eco-score based on product attributes
 * @param {Object} product - Product with material, brand, and packaging info
 * @returns {number} - Eco-score from 0-10
 */
export const calculateEcoScore = (product) => {
  let materialScore = 5;
  let ethicsScore = 5;
  let packagingScore = 5;
  
  // In a real implementation, we would use NLP to analyze product descriptions
  // and extract information about materials, brand ethics, and packaging
  
  // Check product materials
  Object.keys(materialScores).forEach(material => {
    if (product.description.toLowerCase().includes(material)) {
      materialScore = materialScores[material];
    }
  });
  
  // Check brand ethics
  Object.keys(brandEthicsScores).forEach(ethic => {
    if (product.description.toLowerCase().includes(ethic)) {
      ethicsScore = brandEthicsScores[ethic];
    }
  });
  
  // Check packaging
  Object.keys(packagingScores).forEach(packaging => {
    if (product.description.toLowerCase().includes(packaging)) {
      packagingScore = packagingScores[packaging];
    }
  });
  
  // Calculate weighted average
  const ecoScore = (materialScore * 0.4) + (ethicsScore * 0.4) + (packagingScore * 0.2);
  
  // Round to 1 decimal place
  return Math.round(ecoScore * 10) / 10;
};

/**
 * Generate eco-badges based on product description and attributes
 * @param {Object} product - Product with description and other attributes
 * @returns {string[]} - Array of badge IDs
 */
export const generateEcoBadges = (product) => {
  const badges = [];
  const description = product.description.toLowerCase();
  
  // Material badges
  if (description.includes("recycled")) badges.push("recycled-materials");
  if (description.includes("organic")) badges.push("organic");
  if (description.includes("bamboo") || description.includes("cotton")) badges.push("sustainable-materials");
  
  // Packaging badges
  if (description.includes("plastic-free")) badges.push("plastic-free");
  if (description.includes("compostable")) badges.push("compostable");
  if (description.includes("biodegradable")) badges.push("biodegradable");
  if (description.includes("recyclable")) badges.push("recyclable");
  
  // Ethics badges
  if (description.includes("fair trade")) badges.push("fair-trade");
  if (description.includes("ethical")) badges.push("ethical-labor");
  if (description.includes("carbon neutral")) badges.push("carbon-neutral");
  if (description.includes("renewable")) badges.push("renewable-energy");
  if (description.includes("cruelty-free") || description.includes("vegan")) badges.push("cruelty-free");
  
  // Usage badges
  if (description.includes("reusable")) badges.push("reusable");
  if (description.includes("long-lasting") || description.includes("durable")) badges.push("long-lasting");
  if (description.includes("energy efficient") || description.includes("energy-saving")) badges.push("energy-efficient");
  if (description.includes("water-saving")) badges.push("water-saving");
  
  // Geographic badges
  if (description.includes("local") || description.includes("locally made")) badges.push("locally-made");
  if (description.includes("ocean") || description.includes("marine")) badges.push("ocean-friendly");
  
  // Certification badges (would be more sophisticated in real app)
  if (description.includes("certified")) badges.push("certified");
  
  // Limit to unique badges only
  return [...new Set(badges)];
};

/**
 * Find greener alternatives based on product category and eco-score
 * @param {Object} product - Current product
 * @param {Array} allProducts - All available products
 * @returns {Array} - Alternative products with higher eco-scores
 */
export const findGreenerAlternatives = (product, allProducts) => {
  // Extract product category (in a real app, would use more sophisticated categorization)
  const keywords = product.name.toLowerCase().split(" ");
  
  // Find products in same category with higher eco-scores
  const alternatives = allProducts.filter(alt => {
    // Don't include the same product
    if (alt.id === product.id) return false;
    
    // Check if it's in same category (simple keyword matching)
    const isRelated = keywords.some(keyword => 
      keyword.length > 3 && alt.name.toLowerCase().includes(keyword)
    );
    
    // Must be related and have higher eco-score
    return isRelated && alt.ecoScore > product.ecoScore;
  });
  
  // Sort by eco-score (highest first) and return top 3
  return alternatives
    .sort((a, b) => b.ecoScore - a.ecoScore)
    .slice(0, 3);
};

/**
 * Get detailed eco-impact explanation for a product
 * @param {Object} product - Product with eco-score and badges
 * @returns {string} - Detailed explanation
 */
export const getEcoImpactExplanation = (product) => {
  let impact = "";
  
  if (product.ecoScore >= 9) {
    impact = "This product has an excellent environmental impact rating. ";
  } else if (product.ecoScore >= 7) {
    impact = "This product has a very good environmental impact rating. ";
  } else if (product.ecoScore >= 5) {
    impact = "This product has a moderate environmental impact. ";
  } else if (product.ecoScore >= 3) {
    impact = "This product has a significant environmental impact. ";
  } else {
    impact = "This product has a high environmental impact. ";
  }
  
  // Add badge-specific explanations
  if (product.badges.includes("recyclable")) {
    impact += "It is recyclable, which helps reduce waste. ";
  }
  
  if (product.badges.includes("organic")) {
    impact += "It uses organic materials, which reduces chemical pollution. ";
  }
  
  if (product.badges.includes("sustainable-materials")) {
    impact += "It is made with sustainable materials that have a lower environmental footprint. ";
  }
  
  if (product.badges.includes("plastic-free")) {
    impact += "It contains no plastic, helping reduce plastic pollution. ";
  }
  
  if (product.badges.includes("fair-trade")) {
    impact += "It is fair trade certified, ensuring ethical production practices. ";
  }
  
  return impact;
};

export default {
  calculateEcoScore,
  generateEcoBadges,
  findGreenerAlternatives,
  getEcoImpactExplanation
};
