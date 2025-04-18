class ProductService {
    constructor() {
        this.initialProductsLoaded = false;
    }

    async getInitialProducts() {
        // In a real app, this would fetch from APIs
        // For now, return mock data
        return [
            {
                id: '1',
                name: 'Bamboo Toothbrush Set',
                price: '$12.99',
                image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200',
                description: 'Biodegradable bamboo toothbrushes with charcoal-infused bristles',
                rating: 9,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '2',
                name: 'Reusable Water Bottle',
                price: '$24.99',
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200',
                description: 'Stainless steel water bottle, BPA-free and eco-friendly',
                rating: 8,
                badges: ['recyclable', 'plastic-free']
            },
            {
                id: '3',
                name: 'Organic Cotton T-Shirt',
                price: '$29.99',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
                description: 'GOTS certified organic cotton, fair trade manufactured',
                rating: 9,
                badges: ['sustainable', 'biodegradable']
            },
            {
                id: '4',
                name: 'Solar Power Bank',
                price: '$39.99',
                image: 'https://images.unsplash.com/photo-1594008671689-b4d4f3f0e09e?w=200',
                description: 'Solar-powered 10000mAh power bank with eco-friendly materials',
                rating: 7,
                badges: ['sustainable']
            },
            {
                id: '5',
                name: 'Recycled Paper Notebook',
                price: '$8.99',
                image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200',
                description: '100% recycled paper, tree-free notebook with biodegradable cover',
                rating: 9,
                badges: ['recyclable', 'biodegradable']
            },
            {
                id: '6',
                name: 'Eco-friendly Yoga Mat',
                price: '$45.99',
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200',
                description: 'Natural rubber yoga mat, biodegradable and non-toxic',
                rating: 8,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '7',
                name: 'Reusable Produce Bags',
                price: '$15.99',
                image: 'https://images.unsplash.com/photo-1592423777039-425066b5cdb8?w=200',
                description: 'Mesh produce bags for plastic-free grocery shopping',
                rating: 9,
                badges: ['recyclable', 'plastic-free']
            },
            {
                id: '8',
                name: 'Solar Garden Lights',
                price: '$34.99',
                image: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=200',
                description: 'Solar-powered LED garden lights with recycled materials',
                rating: 8,
                badges: ['sustainable', 'recyclable']
            },
            {
                id: '9',
                name: 'Bamboo Cutlery Set',
                price: '$19.99',
                image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=200',
                description: 'Portable bamboo utensil set with carrying case',
                rating: 9,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '10',
                name: 'Recycled Glass Vase',
                price: '$29.99',
                image: 'https://images.unsplash.com/photo-1582827815636-66c91ede4d76?w=200',
                description: 'Handcrafted vase made from recycled glass',
                rating: 8,
                badges: ['recyclable', 'sustainable']
            },
            {
                id: '11',
                name: 'Organic Bath Towels',
                price: '$42.99',
                image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=200',
                description: 'Organic cotton bath towels, chemical-free dyeing',
                rating: 9,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '12',
                name: 'Hemp Backpack',
                price: '$49.99',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200',
                description: 'Durable hemp backpack with organic cotton lining',
                rating: 8,
                badges: ['sustainable', 'biodegradable']
            },
            {
                id: '13',
                name: 'Bamboo Phone Case',
                price: '$24.99',
                image: 'https://images.unsplash.com/photo-1601725660433-6e3d470b4f1d?w=200',
                description: 'Biodegradable phone case made from bamboo',
                rating: 7,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '14',
                name: 'Natural Loofah Set',
                price: '$9.99',
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200',
                description: 'Natural loofah sponges for plastic-free cleaning',
                rating: 8,
                badges: ['biodegradable', 'plastic-free']
            },
            {
                id: '15',
                name: 'Recycled Wool Blanket',
                price: '$64.99',
                image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=200',
                description: 'Cozy blanket made from recycled wool fibers',
                rating: 9,
                badges: ['recyclable', 'sustainable']
            },
            {
                id: '16',
                name: 'Solar Powered Watch',
                price: '$89.99',
                image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=200',
                description: 'Solar-powered watch with recycled metal case',
                rating: 8,
                badges: ['sustainable', 'recyclable']
            },
            {
                id: '17',
                name: 'Bamboo Toilet Paper',
                price: '$18.99',
                image: 'https://images.unsplash.com/photo-1584515848937-d874e36208aa?w=200',
                description: 'Tree-free toilet paper made from bamboo',
                rating: 9,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '18',
                name: 'Cork Yoga Blocks',
                price: '$29.99',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200',
                description: 'Sustainable cork yoga blocks, naturally antimicrobial',
                rating: 8,
                badges: ['sustainable', 'biodegradable']
            },
            {
                id: '19',
                name: 'Glass Food Containers',
                price: '$39.99',
                image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=200',
                description: 'Glass food storage containers with bamboo lids',
                rating: 9,
                badges: ['recyclable', 'plastic-free']
            },
            {
                id: '20',
                name: 'Organic Cotton Sheets',
                price: '$79.99',
                image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200',
                description: 'GOTS certified organic cotton bed sheets',
                rating: 9,
                badges: ['sustainable', 'biodegradable']
            },
            {
                id: '21',
                name: 'Natural Dish Brush',
                price: '$7.99',
                image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=200',
                description: 'Coconut fiber dish brush with wooden handle',
                rating: 8,
                badges: ['biodegradable', 'plastic-free']
            },
            {
                id: '22',
                name: 'Hemp Face Mask',
                price: '$14.99',
                image: 'https://images.unsplash.com/photo-1605845328644-c12cc9940a2c?w=200',
                description: 'Reusable hemp face mask with organic cotton lining',
                rating: 8,
                badges: ['sustainable', 'biodegradable']
            },
            {
                id: '23',
                name: 'Recycled Metal Straws',
                price: '$16.99',
                image: 'https://images.unsplash.com/photo-1572574933255-43242235efaf?w=200',
                description: 'Stainless steel straws made from recycled metal',
                rating: 9,
                badges: ['recyclable', 'plastic-free']
            },
            {
                id: '24',
                name: 'Natural Deodorant',
                price: '$11.99',
                image: 'https://images.unsplash.com/photo-1604421857670-fd30da037616?w=200',
                description: 'Aluminum-free deodorant in cardboard packaging',
                rating: 7,
                badges: ['biodegradable', 'sustainable']
            },
            {
                id: '25',
                name: 'Upcycled Tote Bag',
                price: '$19.99',
                image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=200',
                description: 'Tote bag made from upcycled materials',
                rating: 8,
                badges: ['recyclable', 'sustainable']
            }
        ];
    }

    async searchProducts(query) {
        try {
            return await ProductAPI.searchCombined(query);
        } catch (error) {
            console.error('API Search Error:', error);
            return this.searchFallback(query);
        }
    }

    async searchFallback(query) {
        // Fallback search that filters existing products
        query = query.toLowerCase();
        const initialProducts = await this.getInitialProducts();
        return initialProducts.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
    }

    async getAlternatives(productId) {
        try {
            const alternatives = await ProductAPI.getAlternatives(productId);
            if (alternatives && alternatives.length > 0) {
                return alternatives;
            }
            return this.getAlternativesFallback(productId);
        } catch (error) {
            console.error('Get Alternatives Error:', error);
            return this.getAlternativesFallback(productId);
        }
    }

    async getAlternativesFallback(productId) {
        // Fallback method to find alternatives
        const allProducts = await this.getInitialProducts();
        const product = allProducts.find(p => p.id === productId);
        
        if (!product) return [];
        
        // Find products with similar badges and higher rating
        return allProducts
            .filter(p => 
                p.id !== productId && 
                p.rating >= product.rating && 
                p.badges.some(badge => product.badges.includes(badge))
            )
            .slice(0, 3);
    }
}

window.ProductService = ProductService;
