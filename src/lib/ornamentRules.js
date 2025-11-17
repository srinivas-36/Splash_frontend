// Ornament Fitting Rules for AI Model and Real Model Generation
// This file contains detailed fitting rules for each ornament type to ensure realistic appearance

export const ORNAMENT_FITTING_RULES = {
    // Necklaces
    short_necklace: {
        name: "Short Necklace",
        rules: "The short necklace should rest snugly around the base of the neck, sitting just above the collarbone. It must follow the natural curvature of the neck, laying flat against the skin without gaps. The necklace should have realistic contact shadows on the skin and be fully visible in close-up framing. Ensure the chain or embellishments are clearly defined and proportional to the neck size."
    },
    long_necklace: {
        name: "Long Necklace",
        rules: "The long necklace should drape naturally over the chest, with the pendant or central motif resting slightly above the mid-chest line. It should curve along the body's contours and show natural gravity-induced drape. Contact shadows should appear where the chain touches the skin, and the necklace must remain fully visible without twisting or overlapping unnaturally."
    },
    choker: {
        name: "Choker",
        rules: "The choker must sit snugly at the base of the neck, encircling it without gaps. Its surface should gently press against the skin, showing subtle shadows. The closure or clasp should not be overly prominent unless specified. It must maintain a natural circular shape and appear realistic in close-up lighting, highlighting any textures or gemstones."
    },
    pendant: {
        name: "Pendant",
        rules: "The pendant should hang from a chain that sits naturally around the neck. The pendant must rest flat against the chest, aligned with the chain, and oriented correctly (not twisted). Shadows where the pendant touches the skin should be visible, and reflections on the metal or gemstones should look natural under studio lighting."
    },
    pendant_necklace: {
        name: "Pendant Necklace",
        rules: "Pendant necklaces should hang naturally around the neck, with the pendant centered on the chest. Shadows must indicate skin contact, and reflections on metal or gems should be realistic."
    },
    pendant_necklace_set: {
        name: "Pendant Necklace Set",
        rules: "Pendant necklace sets should have all matching components aligned naturally. Necklaces should drape along the neck and chest, pendants should face forward, and earrings or other matching pieces must be proportional. Shadows and reflections should be realistic."
    },
    delicate_necklace: {
        name: "Delicate Necklace",
        rules: "Delicate necklaces should lay softly against the skin, following neck curvature. They should show subtle shadows where chain meets skin, and any pendant must hang naturally without twisting."
    },
    layered_necklace: {
        name: "Layered Necklace",
        rules: "Layered necklaces should drape in multiple levels over the chest naturally. Each chain must remain distinct without tangling, and contact shadows should indicate where each layer touches skin. Decorative elements must face outward and remain fully visible."
    },
    necklace_set: {
        name: "Necklace Set",
        rules: "Necklace sets must include all components (necklace, earrings, etc.) positioned naturally. The necklace should curve around the neck, and earrings must hang proportionally. Shadows and light reflections must indicate realistic contact."
    },
    black_beads_necklace: {
        name: "Black Beads Necklace",
        rules: "The black beads necklace should encircle the neck naturally, with beads resting evenly. The necklace should curve with the neck, showing realistic shadow and light reflections on beads. No beads should appear floating or misaligned."
    },
    hasli: {
        name: "Hasli",
        rules: "Hasli necklaces should sit closely around the neck, following its natural curve. The metal or beads should hug the skin snugly, with realistic shadows and highlights."
    },

    // Earrings
    stud_earrings: {
        name: "Stud Earrings",
        rules: "Stud earrings should sit flush against the earlobe, with the post inserted naturally. Shadows around the earlobe and slight reflection on the earring surface should be visible. The size must be proportional to the ear, and close-up lighting should highlight gemstones, metal, or texture."
    },
    jhumka_earrings: {
        name: "Jhumka / Jhumki Earrings",
        rules: "Jhumka earrings should hang naturally from the earlobe, swinging slightly as if affected by gravity. The dome and decorative elements must face forward and remain visible. Shadows should appear on the skin under the earring, and the earring's curves and embellishments should catch studio lighting naturally."
    },
    drop_earrings: {
        name: "Drop Earrings",
        rules: "Drop earrings should hang vertically from the earlobe, aligning with the natural curve of the ear. The length should be proportional, with slight movement implied. Shadows and highlights must reflect realistic contact with the skin and catch light naturally."
    },
    hoop_earrings: {
        name: "Hoop / Hoop Earrings",
        rules: "Hoop earrings must form a perfect circular or oval shape hanging from the earlobe. The hoops should not appear flat or floating; subtle shadows should appear where they touch the skin. Reflection on metal surface should be realistic, emphasizing smooth curves."
    },
    chandbali: {
        name: "Chandbali",
        rules: "Chandbali earrings should hang symmetrically from the earlobes, with the crescent facing forward. Decorative motifs must be clearly visible, and contact shadows under the crescent should be present. Studio lighting should highlight intricate details without flattening curves."
    },
    damini: {
        name: "Damini",
        rules: "Damini should sit on the hairline or forehead naturally, with chains or decorative elements draping smoothly over the head. Contact points with skin and hair should cast subtle shadows. The central motif should be fully visible and symmetrical."
    },
    ear_chain: {
        name: "Ear Chain",
        rules: "Ear chains should connect the earlobe to the hair or upper ear naturally, following the curve of the ear. The chain must drape without tension, with subtle shadows where it contacts skin or hair. Any decorative motifs should face forward and be clearly visible."
    },

    // Bracelets & Bangles
    bangle: {
        name: "Bangle",
        rules: "The bangle should encircle the wrist comfortably, showing slight movement if the hand is posed. It must maintain a circular shape, with natural contact shadows against the skin. The surface of the bangle must reflect light realistically, emphasizing curves or engravings. Avoid overlapping multiple bangles unless intentionally stacked."
    },
    bracelet: {
        name: "Bracelet",
        rules: "The bracelet should rest naturally on the wrist, conforming to the shape of the hand and arm. It should not appear rigid or floating and must show subtle skin impressions or shadows where it contacts the wrist. Chains or charms should drape realistically, and studio lighting should highlight its texture."
    },
    hand_chain: {
        name: "Hand Chain",
        rules: "Hand chains should drape naturally from the wrist to the finger, following the contours of the hand. Subtle contact shadows must be visible where the chain touches skin. Any central decorative motif should rest flat and be fully visible."
    },

    // Rings
    ring: {
        name: "Ring",
        rules: "Rings should sit snugly on the finger without appearing floating or too tight. Shadows should reflect natural contact with skin. Any gemstones or designs should face outward and be fully visible in close-up framing."
    },
    traditional_ring: {
        name: "Traditional Ring",
        rules: "Traditional rings should sit snugly on the finger, with decorative motifs facing outward. Shadows must indicate natural contact, and any gemstones or engravings should catch studio lighting realistically."
    },
    delicate_ring: {
        name: "Delicate Ring",
        rules: "Delicate rings should sit snugly on fingers, with slight shadows showing skin contact. Small gemstones or motifs must face outward and be clearly visible."
    },
    cocktail_ring: {
        name: "Cocktail Ring",
        rules: "Cocktail rings should sit prominently on the finger, with large gemstones facing outward. Shadows should reflect realistic finger contact, and the ring must appear proportionally balanced."
    },

    // Anklets
    anklets: {
        name: "Anklets",
        rules: "Anklets should encircle the ankle comfortably, draping slightly with gravity. The surface should reflect light realistically, with shadows where it touches skin. Any dangling charms should hang naturally and remain fully visible."
    },

    // Head Jewelry
    maang_tikka: {
        name: "Maang Tikka",
        rules: "Maang tikka should rest at the center of the forehead with the chain following the hairline naturally. The pendant should sit flat on the skin without tilting. Shadows and subtle skin reflections must show realistic contact, and the chain should curve naturally over hair."
    },
    hair_brooch: {
        name: "Hair Brooch",
        rules: "Hair brooches should be inserted into hair naturally, following the flow of strands. The clip or base should be hidden, and decorative elements should face outward. Shadows and highlights on the ornament and hair should appear realistic under studio lighting."
    },

    // Nose Jewelry
    nose_ring: {
        name: "Nose Ring",
        rules: "Nose rings should sit snugly on the nostril, following its curvature. The decorative portion should face outward and remain fully visible. Shadows and reflections must show realistic skin contact."
    },
    nose_pin: {
        name: "Nose Pin",
        rules: "Nose pins should sit flush against the nostril with the decorative tip facing outward. Shadows and reflections should highlight skin contact, and the pin should appear proportional to the nose."
    },

    // Arm Jewelry
    armlet: {
        name: "Armlet",
        rules: "Armlets should wrap naturally around the upper arm, following the curve of the bicep. Subtle impressions and shadows should indicate contact with skin. The decorative motif should face outward, fully visible from a frontal or side view."
    },

    // Waist Jewelry
    waist_band: {
        name: "Waist Band",
        rules: "Waist bands should rest naturally around the waist, conforming to body curves. Decorative elements should face outward and remain fully visible. Shadows should indicate skin contact, and any dangling parts should drape naturally."
    },

    // Charms
    charm: {
        name: "Charm",
        rules: "Charms should hang naturally from bracelets, anklets, or necklaces. They should follow gravity, swinging slightly, with shadows indicating skin contact. All details of the charm must be visible."
    }
};

/**
 * Get fitting rules for a specific ornament type
 * @param {string} ornamentType - The ornament type ID
 * @returns {string} The fitting rules for the ornament type
 */
export const getOrnamentFittingRules = (ornamentType) => {
    return ORNAMENT_FITTING_RULES[ornamentType]?.rules || "";
};

/**
 * Get ornament name for a specific ornament type
 * @param {string} ornamentType - The ornament type ID
 * @returns {string} The ornament name
 */
export const getOrnamentName = (ornamentType) => {
    return ORNAMENT_FITTING_RULES[ornamentType]?.name || ornamentType;
};

/**
 * Generate enhanced prompt with ornament fitting rules
 * @param {string} basePrompt - The base prompt from user input
 * @param {string} ornamentType - The selected ornament type
 * @param {Object} ornamentMeasurements - The ornament measurements
 * @returns {string} Enhanced prompt with fitting rules
 */
export const generateEnhancedPrompt = (basePrompt, ornamentType, ornamentMeasurements = {}) => {
    const fittingRules = getOrnamentFittingRules(ornamentType);
    const ornamentName = getOrnamentName(ornamentType);

    if (!fittingRules) {
        return basePrompt;
    }

    // Build measurements string if provided
    let measurementsText = "";
    if (ornamentMeasurements && Object.keys(ornamentMeasurements).length > 0) {
        const measurementEntries = Object.entries(ornamentMeasurements)
            .filter(([key, value]) => value && value.trim() !== "")
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");

        if (measurementEntries) {
            measurementsText = ` Measurements: ${measurementEntries}.`;
        }
    }

    // Combine base prompt with fitting rules
    const enhancedPrompt = `${basePrompt}${measurementsText} 

Ornament Fitting Rules for ${ornamentName}: ${fittingRules}`;

    return enhancedPrompt.trim();
};

/**
 * Generate enhanced prompt for multiple ornaments (campaign shots)
 * @param {string} basePrompt - The base prompt from user input
 * @param {Array<string>} ornamentTypes - Array of ornament type IDs
 * @param {Array<Object>} ornamentMeasurements - Array of ornament measurements
 * @returns {string} Enhanced prompt with fitting rules for all ornaments
 */
export const generateEnhancedCampaignPrompt = (basePrompt, ornamentTypes = [], ornamentMeasurements = []) => {
    if (!ornamentTypes || ornamentTypes.length === 0) {
        return basePrompt;
    }

    let enhancedPrompt = basePrompt;
    let fittingRulesText = "";

    for (const [index, ornamentType] of ornamentTypes.entries()) {
        const fittingRules = getOrnamentFittingRules(ornamentType);
        const ornamentName = getOrnamentName(ornamentType);

        if (fittingRules) {
            // Build measurements for this ornament
            let measurementsText = "";
            if (ornamentMeasurements[index] && Object.keys(ornamentMeasurements[index]).length > 0) {
                const measurementEntries = Object.entries(ornamentMeasurements[index])
                    .filter(([key, value]) => value && value.trim() !== "")
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ");

                if (measurementEntries) {
                    measurementsText = ` Measurements: ${measurementEntries}.`;
                }
            }

            fittingRulesText += `\n\n${ornamentName} Fitting Rules: ${fittingRules}${measurementsText}`;
        }
    }

    if (fittingRulesText) {
        enhancedPrompt += fittingRulesText;
    }

    return enhancedPrompt.trim();
};

export default {
    ORNAMENT_FITTING_RULES,
    getOrnamentFittingRules,
    getOrnamentName,
    generateEnhancedPrompt,
    generateEnhancedCampaignPrompt
};
