
class EcoCart {
    constructor() {
        this.products = [];
        this.currentFilter = 'all';
        this.setupEventListeners();
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
    }

    async handleSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        this.showLoading(true);
        
        try {
            // Fetch products from both APIs
            const [serpResults, rapidResults] = await Promise.all([
                ProductAPI.searchSerpApi(query),
                ProductAPI.searchRapidApi(query)
            ]);

            // Combine and deduplicate results
            this.products = [...new Map([...serpResults, ...rapidResults].map(item => [item.id, item])).values()];
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
}

// Initialize the application
const app = new EcoCart();

