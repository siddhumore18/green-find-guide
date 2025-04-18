
class EcoCart {
    constructor() {
        this.products = [];
        this.currentFilter = 'all';
        this.productService = new ProductService();
        this.uiService = new UIService(this);
        this.productRenderer = new ProductRenderer();
        this.ecoService = new EcoService();
        
        // Create the initial HTML structure
        this.createInitialHtml();
        
        // Now that the HTML elements exist, we can add event listeners
        this.setupEventListeners();
        this.loadInitialProducts();
    }

    createInitialHtml() {
        // Get the root element
        const root = document.getElementById('root');
        
        // Create the main HTML structure
        root.innerHTML = `
            <div class="container my-4">
                <header class="mb-5 text-center">
                    <h1 class="mb-3">EcoCart</h1>
                    <p class="lead">Your Sustainable Shopping Assistant</p>
                </header>
                
                <div class="row mb-4">
                    <div class="col-md-8 mx-auto">
                        <form id="searchForm" class="d-flex">
                            <input type="text" id="searchInput" class="form-control me-2" placeholder="Search for products...">
                            <button type="submit" class="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
                
                <div class="filter-tabs d-flex justify-content-center mb-4">
                    <button class="btn btn-outline-primary me-2 active" data-filter="all">All Products</button>
                    <button class="btn btn-outline-primary me-2" data-filter="recyclable">Recyclable</button>
                    <button class="btn btn-outline-primary me-2" data-filter="biodegradable">Biodegradable</button>
                    <button class="btn btn-outline-primary me-2" data-filter="sustainable">Sustainable</button>
                    <button class="btn btn-outline-primary" data-filter="plastic-free">Plastic-Free</button>
                </div>
                
                <div id="loading" class="text-center my-4 d-none">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                
                <div class="row" id="productGrid"></div>
                
                <div id="productDetail" class="product-detail"></div>
            </div>
        `;
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
                this.uiService.updateFilterButtons(button);
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
        this.products = await this.productService.getInitialProducts();
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
        this.uiService.showLoading(true);
        
        try {
            // Use the combined search endpoint
            const newProducts = await this.productService.searchProducts(query);

            // Add new products to the existing list
            this.products = [...this.products, ...newProducts];
            this.renderProducts();
        } catch (error) {
            console.error('Search error:', error);
            this.uiService.showError('Failed to fetch products. Please try again.');
        } finally {
            this.uiService.showLoading(false);
        }
    }

    handleFilter(filter) {
        this.currentFilter = filter;
        this.renderProducts();
    }

    renderProducts() {
        const grid = document.getElementById('productGrid');
        const filteredProducts = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(product => product.badges.includes(this.currentFilter));

        grid.innerHTML = filteredProducts.map(product => 
            this.productRenderer.createProductCard(product)
        ).join('');

        // Add click event listeners to the new cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showProductDetail(this.products.find(p => p.id === card.dataset.productId));
            });
        });
    }

    showProductDetail(product) {
        this.productService.getAlternatives(product.id).then(alternatives => {
            const modal = document.getElementById('productDetail');
            modal.innerHTML = this.productRenderer.createProductDetailView(product, alternatives, this);
            modal.classList.add('active');
        });
    }

    closeProductDetail() {
        document.getElementById('productDetail').classList.remove('active');
    }

    async loadMoreProducts() {
        // Implement logic to load more products
        // This would be implemented in a real application
    }
}

// Expose to global scope
window.EcoCart = EcoCart;
