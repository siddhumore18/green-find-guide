
class ProductAPI {
    static async searchSerpApi(query) {
        const params = new URLSearchParams({
            api_key: CONFIG.serpapi.key,
            engine: 'google_shopping',
            q: query,
            num: 10
        });

        try {
            const response = await fetch(`${CONFIG.serpapi.endpoint}?${params}`);
            const data = await response.json();
            return this.formatSerpApiResults(data.shopping_results);
        } catch (error) {
            console.error('SerpAPI Error:', error);
            return [];
        }
    }

    static async searchRapidApi(query) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': CONFIG.rapidapi.key,
                'X-RapidAPI-Host': CONFIG.rapidapi.host
            }
        };

        try {
            const response = await fetch(`${CONFIG.rapidapi.endpoint}?query=${encodeURIComponent(query)}`, options);
            const data = await response.json();
            return this.formatRapidApiResults(data.products);
        } catch (error) {
            console.error('RapidAPI Error:', error);
            return [];
        }
    }

    static formatSerpApiResults(results) {
        if (!results) return [];
        return results.map(item => ({
            id: item.product_id || Math.random().toString(36).substr(2, 9),
            name: item.title,
            price: item.price,
            image: item.thumbnail,
            description: item.snippet || 'No description available',
            rating: this.calculateEcoScore(item),
            badges: this.generateEcoBadges(item)
        }));
    }

    static formatRapidApiResults(results) {
        if (!results) return [];
        return results.map(item => ({
            id: item.asin || Math.random().toString(36).substr(2, 9),
            name: item.title,
            price: item.price?.current_price || 'Price not available',
            image: item.thumbnail,
            description: item.description || 'No description available',
            rating: this.calculateEcoScore(item),
            badges: this.generateEcoBadges(item)
        }));
    }

    static calculateEcoScore(product) {
        // Simple eco-score calculation based on keywords
        const keywords = [
            'eco', 'sustainable', 'organic', 'recycled', 'biodegradable',
            'natural', 'renewable', 'green', 'environmentally friendly'
        ];
        
        const productText = `${product.title} ${product.description || ''}`.toLowerCase();
        const matchCount = keywords.filter(keyword => productText.includes(keyword)).length;
        return Math.min(Math.max(5 + matchCount, 1), 10);
    }

    static generateEcoBadges(product) {
        const badges = [];
        const productText = `${product.title} ${product.description || ''}`.toLowerCase();

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
}

