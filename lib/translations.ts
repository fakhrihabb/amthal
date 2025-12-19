/**
 * Translation Utilities
 * 
 * Provides translation dictionaries and utilities to convert Indonesian terms
 * to English without modifying the database.
 */

// Infrastructure Type Translations
export const INFRASTRUCTURE_TYPES = {
    'SPKLU': 'Public Charging Station',
    'SPBKLU': 'Battery Swap Station',
    'Hybrid': 'Hybrid Station',
} as const;

export const INFRASTRUCTURE_TYPES_ABBR = {
    'SPKLU': 'PCS',
    'SPBKLU': 'BSS',
    'Hybrid': 'Hybrid',
} as const;

export const INFRASTRUCTURE_TYPES_FULL = {
    'SPKLU': 'Public Charging Station (SPKLU)',
    'SPBKLU': 'Battery Swap Station (SPBKLU)',
    'Hybrid': 'Hybrid Charging & Swap Station',
} as const;

// Scoring Term Translations
export const SCORING_TERMS = {
    'permintaan': 'demand',
    'penawaran': 'supply',
    'keamanan': 'security',
    'infrastruktur': 'infrastructure',
    'lingkungan': 'environment',
    'biaya': 'cost',
    'aksesibilitas': 'accessibility',
    'kompetisi': 'competition',
    'grid': 'grid',
    'keseluruhan': 'overall',
    'skor': 'score',
    'tinggi': 'high',
    'sedang': 'moderate',
    'rendah': 'low',
    'sangat baik': 'excellent',
    'baik': 'good',
    'cukup': 'fair',
    'kurang': 'poor',
} as const;

// Analysis Status Translations
export const STATUS_TRANSLATIONS = {
    'recommended': 'Recommended',
    'rejected': 'Rejected',
    'pending': 'Pending',
} as const;

// Common UI Terms
export const UI_TERMS = {
    'lokasi': 'location',
    'proyek': 'project',
    'analisis': 'analysis',
    'laporan': 'report',
    'peta': 'map',
    'data': 'data',
    'hasil': 'results',
    'rekomendasi': 'recommendation',
    'kelayakan': 'feasibility',
    'kesiapan': 'readiness',
    'jaringan listrik': 'electrical grid',
    'stasiun pengisian': 'charging station',
    'stasiun penukaran baterai': 'battery swap station',
    'kendaraan listrik': 'electric vehicle',
} as const;

/**
 * Translate infrastructure type from Indonesian to English
 */
export function translateInfrastructureType(
    type: string,
    format: 'short' | 'abbr' | 'full' = 'short'
): string {
    const typeKey = type as keyof typeof INFRASTRUCTURE_TYPES;

    if (format === 'abbr') {
        return INFRASTRUCTURE_TYPES_ABBR[typeKey] || type;
    } else if (format === 'full') {
        return INFRASTRUCTURE_TYPES_FULL[typeKey] || type;
    }

    return INFRASTRUCTURE_TYPES[typeKey] || type;
}

/**
 * Translate scoring term from Indonesian to English
 */
export function translateScoringTerm(term: string): string {
    const lowerTerm = term.toLowerCase();
    const termKey = lowerTerm as keyof typeof SCORING_TERMS;
    return SCORING_TERMS[termKey] || term;
}

/**
 * Translate status from code to English
 */
export function translateStatus(status: string): string {
    const statusKey = status as keyof typeof STATUS_TRANSLATIONS;
    return STATUS_TRANSLATIONS[statusKey] || status;
}

/**
 * Translate common UI term from Indonesian to English
 */
export function translateUITerm(term: string): string {
    const lowerTerm = term.toLowerCase();
    const termKey = lowerTerm as keyof typeof UI_TERMS;
    return UI_TERMS[termKey] || term;
}

/**
 * Translate a full Indonesian insight text to English
 * This is a basic word-by-word translation for fallback purposes
 */
export function translateInsightText(indonesianText: string): string {
    let translated = indonesianText;

    // Replace infrastructure types
    translated = translated.replace(/SPKLU \(Stasiun Pengisian Kendaraan Listrik Umum\)/gi, 'Public Charging Station (SPKLU)');
    translated = translated.replace(/SPBKLU \(Stasiun Penukaran Baterai Kendaraan Listrik Umum\)/gi, 'Battery Swap Station (SPBKLU)');
    translated = translated.replace(/SPKLU/gi, 'Public Charging Station');
    translated = translated.replace(/SPBKLU/gi, 'Battery Swap Station');

    // Replace common phrases
    const phraseReplacements: Record<string, string> = {
        'Analisis untuk lokasi ini menunjukkan': 'Analysis for this location shows',
        'skor kelayakan keseluruhan sebesar': 'an overall feasibility score of',
        'Kekuatan utama lokasi ini adalah': 'The main strengths of this location are',
        'tingkat permintaan yang tinggi': 'high demand level',
        'kesiapan jaringan listrik yang baik': 'good electrical grid readiness',
        'aksesibilitas yang sangat baik': 'excellent accessibility',
        'tingkat kompetisi yang rendah': 'low competition level',
        'potensi solar panel yang sangat baik': 'excellent solar panel potential',
        'Perhatian utama meliputi': 'Main concerns include',
        'permintaan yang moderat': 'moderate demand',
        'jarak ke jaringan listrik terdekat': 'distance to nearest electrical grid',
        'aksesibilitas yang terbatas': 'limited accessibility',
        'tingkat kompetisi yang tinggi': 'high competition level',
        'Berdasarkan analisis ini, kami merekomendasikan infrastruktur': 'Based on this analysis, we recommend',
        'untuk lokasi ini': 'for this location',
        'yang menggabungkan': 'which combines',
        'untuk melayani berbagai kebutuhan': 'to serve various needs',
        'Proyeksi finansial menunjukkan': 'Financial projections show',
        'potensi pengembalian investasi yang layak': 'viable investment return potential',
        'dengan estimasi modal dan pendapatan yang telah diperhitungkan': 'with capital and revenue estimates already calculated',
        'Potensi solar panel sangat baik dengan': 'Solar panel potential is excellent with',
        'mencapai': 'reaching',
        'Potensi solar panel cukup baik untuk supplemental power': 'Solar panel potential is quite good for supplemental power',
        'Lokasi ini sangat cocok untuk': 'This location is highly suitable for',
        'karena tingkat permintaan dan aksesibilitas yang baik': 'due to good demand levels and accessibility',
        'Lokasi ini ideal untuk': 'This location is ideal for',
        'dengan kompetisi rendah dan permintaan moderat': 'with low competition and moderate demand',
        'Lokasi ini sangat strategis untuk infrastruktur': 'This location is very strategic for',
        'infrastructure': 'infrastructure',
    };

    for (const [indonesian, english] of Object.entries(phraseReplacements)) {
        const regex = new RegExp(indonesian, 'gi');
        translated = translated.replace(regex, english);
    }

    // Replace individual terms
    translated = translated.replace(/\bpayback\s+(\d+\.?\d*)\s+tahun/gi, 'payback $1 years');
    translated = translated.replace(/\bROI\s+25-tahun/gi, '25-year ROI');

    return translated;
}

/**
 * Translate recommendation rationale
 */
export function translateRationale(rationale: string, type: string): string {
    // If already in English, return as-is
    if (!rationale.match(/[^\x00-\x7F]/)) {
        return rationale;
    }

    // Otherwise, use template translations
    if (type === 'SPKLU') {
        return `This location is highly suitable for a Public Charging Station (SPKLU) due to good demand levels and accessibility.`;
    } else if (type === 'SPBKLU') {
        return `This location is ideal for a Battery Swap Station (SPBKLU) with low competition and moderate demand.`;
    } else if (type === 'Hybrid') {
        return `This location is very strategic for a Hybrid infrastructure that combines Public Charging and Battery Swap stations to serve various needs.`;
    }

    return translateInsightText(rationale);
}
