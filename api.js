class ProductAPI {
    static async searchSerpApi(query) {
        try {
            const response = await fetch(`http://localhost:3000/api/search/serpapi?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('SerpAPI Error:', error);
            return this.searchSerpApiFallback(query);
        }
    }

    static async searchRapidApi(query) {
        try {
            const response = await fetch(`http://localhost:3000/api/search/rapidapi?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('RapidAPI Error:', error);
            return this.searchRapidApiFallback(query);
        }
    }

    static async searchCombined(query) {
        try {
            const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Combined API Error:', error);
            const [serpResults, rapidResults] = await Promise.all([
                this.searchSerpApi(query),
                this.searchRapidApi(query)
            ]);
            return [...serpResults, ...rapidResults];
        }
    }

    static async getAlternatives(productId) {
        try {
            const response = await fetch(`http://localhost:3000/api/alternatives/${productId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get alternatives error:', error);
            return [];
        }
    }

    static async searchSerpApiFallback(query) {
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
            console.error('SerpAPI Fallback Error:', error);
            return [];
        }
    }

    static async searchRapidApiFallback(query) {
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
            console.error('RapidAPI Fallback Error:', error);
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
