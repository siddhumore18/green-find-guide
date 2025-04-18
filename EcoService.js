
class EcoService {
    constructor() {
        // Initialize with common eco-parameters
        this.materialScores = {
            'bamboo': 9,
            'glass': 8,
            'recycled': 9,
            'organic': 9,
            'steel': 7,
            'natural': 8,
            'plastic': 3
        };
    }

    calculateEcoScore(product) {
        // This is a simplified scoring algorithm
        // In a real application, this would be more sophisticated
        const keywords = [
            'eco', 'sustainable', 'organic', 'recycled', 'biodegradable',
            'natural', 'renewable', 'green', 'environmentally friendly'
        ];
        
        const productText = `${product.name} ${product.description}`.toLowerCase();
        const matchCount = keywords.filter(keyword => productText.includes(keyword)).length;
        
        return Math.min(Math.max(5 + matchCount, 1), 10);
    }

    generateEcoBadges(product) {
        const badges = [];
        const productText = `${product.name} ${product.description}`.toLowerCase();

        const badgeRules = {
            'recyclable': ['recycle', 'recyclable'],
            'biodegradable': ['biodegradable', 'compostable', 'organic'],
            'sustainable': ['sustainable', 'eco-friendly', 'green'],
            'plastic-free': ['plastic-free', 'zero waste']
        };

        for (const [badge, keywords] of Object.entries(badgeRules)) {
            if (keywords.some(keyword => productText.includes(keyword))) {
                badges.push(badge);
            }
        }

        return badges;
    }

    getBadgeIcon(badge) {
        const icons = {
            'recyclable': 'recycle',
            'biodegradable': 'leaf',
            'sustainable': 'globe',
            'plastic-free': 'ban'
        };
        return icons[badge] || 'check';
    }

    formatBadgeLabel(badge) {
        return badge.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getEcoRating(score) {
        if (score >= 9) return 'Excellent';
        if (score >= 7) return 'Very Good';
        if (score >= 5) return 'Good';
        if (score >= 3) return 'Fair';
        return 'Poor';
    }
}

window.EcoService = EcoService;
