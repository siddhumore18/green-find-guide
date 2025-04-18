
// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize the EcoCart application
    const app = new EcoCart();
    
    // Make app accessible globally for event handlers
    window.app = app;
});
