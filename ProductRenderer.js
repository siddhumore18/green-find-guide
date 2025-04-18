
class ProductRenderer {
    constructor() {
        this.ecoService = new EcoService();
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
                                    <i class="fas fa-${this.ecoService.getBadgeIcon(badge)}"></i>
                                    ${this.ecoService.formatBadgeLabel(badge)}
                                </span>
                            `).join(' ')}
                        </div>
                        <p class="card-text small text-muted">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    createProductDetailView(product, alternatives, ecoCart) {
        const alternativesHtml = alternatives.length > 0 
            ? `
                <div class="mt-5">
                    <h3>Eco-friendly Alternatives</h3>
                    <div class="row">
                        ${alternatives.map(alt => `
                            <div class="col-md-4 mb-3">
                                <div class="card h-100" style="cursor: pointer;" onclick="app.showProductDetail(app.products.find(p => p.id === '${alt.id}'))">
                                    <img src="${alt.image}" class="card-img-top" alt="${alt.name}" style="height: 140px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title small">${alt.name}</h5>
                                        <p class="text-success fw-bold mb-1">${alt.price}</p>
                                        <div class="eco-score mb-2">
                                            <i class="fas fa-leaf"></i>
                                            ${alt.rating}/10
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `
            : '';

        return `
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
                                        <i class="fas fa-${this.ecoService.getBadgeIcon(badge)}"></i>
                                        ${this.ecoService.formatBadgeLabel(badge)}
                                    </span>
                                `).join(' ')}
                            </div>
                        </div>
                        <p class="mb-4">${product.description}</p>
                    </div>
                </div>
                ${alternativesHtml}
            </div>
        `;
    }
}

window.ProductRenderer = ProductRenderer;
