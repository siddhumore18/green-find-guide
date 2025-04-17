class EcoCart {
    constructor() {
        this.products = [];
        this.currentFilter = 'all';
        this.setupEventListeners();
        this.loadInitialProducts();
    }

    setupEventListeners() {
        // Search form submission
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Filter buttons
        document.querySelectorAll('.filter-tabs button').forEach(button => {
            button.addEventListener('click', () => {
                this.handleFilter(button.dataset.filter);
                this.updateFilterButtons(button);
            });
        });

        // Close detail modal when clicking outside
        document.getElementById('productDetail').addEventListener('click', (e) => {
            if (e.target.id === 'productDetail') {
                this.closeProductDetail();
            }
        });

        // Add scroll event listener for infinite loading
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                this.loadMoreProducts();
            }
        });
    }

    async loadInitialProducts() {
        const initialProducts = [
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

        this.products = initialProducts;
        this.renderProducts();
    }

    async handleSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        // Check if product exists in current list
        const existingProduct = this.products.find(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );

        if (existingProduct) {
            this.showProductDetail(existingProduct);
            return;
        }

        // If not found in initial products, fetch from APIs
        this.showLoading(true);
        
        try {
            const [serpResults, rapidResults] = await Promise.all([
                ProductAPI.searchSerpApi(query),
                ProductAPI.searchRapidApi(query)
            ]);

            // Combine and deduplicate results
            const newProducts = [...new Map([...serpResults, ...rapidResults]
                .map(item => [item.id, item])).values()];

            // Add new products to the existing list
            this.products = [...this.products, ...newProducts];
            this.renderProducts();
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Failed to fetch products. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    handleFilter(filter) {
        this.currentFilter = filter;
        this.renderProducts();
    }

    updateFilterButtons(activeButton) {
        document.querySelectorAll('.filter-tabs button').forEach(btn => {
            btn.classList.toggle('active', btn === activeButton);
        });
    }

    renderProducts() {
        const grid = document.getElementById('productGrid');
        const filteredProducts = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(product => product.badges.includes(this.currentFilter));

        grid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');

        // Add click event listeners to the new cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showProductDetail(this.products.find(p => p.id === card.dataset.productId));
            });
        });
    }

    createProductCard(product) {
        return `
            <div class="col-md-4 mb-4">
                <div class="product-card card h-100" data-product-id="${product.id}">
                    <img src="${product.image}" class="product-image card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${product.name}</h5>
                            <span class="eco-score">
                                <i class="fas fa-leaf"></i>
                                ${product.rating}/10
                            </span>
                        </div>
                        <p class="card-text text-success fw-bold">${product.price}</p>
                        <div class="badges mb-3">
                            ${product.badges.map(badge => `
                                <span class="badge-eco badge-${badge}">
                                    <i class="fas fa-${this.getBadgeIcon(badge)}"></i>
                                    ${this.formatBadgeLabel(badge)}
                                </span>
                            `).join(' ')}
                        </div>
                        <p class="card-text small text-muted">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    showProductDetail(product) {
        const modal = document.getElementById('productDetail');
        modal.innerHTML = `
            <div class="product-detail-content">
                <button class="btn-close position-absolute top-0 end-0 m-3" onclick="app.closeProductDetail()"></button>
                <div class="row">
                    <div class="col-md-6">
                        <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                    </div>
                    <div class="col-md-6">
                        <h2 class="mb-3">${product.name}</h2>
                        <p class="text-success h4 mb-4">${product.price}</p>
                        <div class="mb-4">
                            <h5>Eco Score: ${product.rating}/10</h5>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" 
                                     style="width: ${product.rating * 10}%" 
                                     aria-valuenow="${product.rating}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="10"></div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h5>Sustainability Features:</h5>
                            <div class="badges">
                                ${product.badges.map(badge => `
                                    <span class="badge-eco badge-${badge}">
                                        <i class="fas fa-${this.getBadgeIcon(badge)}"></i>
                                        ${this.formatBadgeLabel(badge)}
                                    </span>
                                `).join(' ')}
                            </div>
                        </div>
                        <p class="mb-4">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
        modal.classList.add('active');
    }

    closeProductDetail() {
        document.getElementById('productDetail').classList.remove('active');
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

    showLoading(show) {
        document.getElementById('loading').classList.toggle('d-none', !show);
    }

    showError(message) {
        // You could enhance this with a proper toast notification
        alert(message);
    }

    async loadMoreProducts() {
        // Implement logic to load more products
    }
}

// Initialize the application
const app = new EcoCart();
