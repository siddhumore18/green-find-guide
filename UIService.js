
class UIService {
    constructor(ecoCart) {
        this.ecoCart = ecoCart;
    }

    updateFilterButtons(activeButton) {
        document.querySelectorAll('.filter-tabs button').forEach(btn => {
            btn.classList.toggle('active', btn === activeButton);
        });
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('d-none', !show);
    }

    showError(message) {
        // You could enhance this with a proper toast notification
        alert(message);
    }

    showSuccess(message) {
        // You could enhance this with a proper toast notification
        console.log('Success:', message);
    }
}

window.UIService = UIService;
