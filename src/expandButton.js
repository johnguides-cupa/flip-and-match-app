// Expand/Collapse button functionality
class ExpandButtonManager {
    constructor() {
        this.isExpanded = false;
        this.button = null;
        this.icon = null;
    }

    initialize() {
        this.button = document.getElementById('expandButton');
        this.icon = this.button?.querySelector('.expand-icon');
        
        if (this.button) {
            this.button.addEventListener('click', () => this.toggleExpand());
        }
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            document.body.classList.add('expanded-mode');
            this.button.title = 'Collapse to normal size';
            this.icon.textContent = '⛶'; // Use collapse icon
        } else {
            document.body.classList.remove('expanded-mode');
            this.button.title = 'Expand to full screen';
            this.icon.textContent = '⛶'; // Use expand icon
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.expandButtonManager = new ExpandButtonManager();
        window.expandButtonManager.initialize();
    });
} else {
    window.expandButtonManager = new ExpandButtonManager();
    window.expandButtonManager.initialize();
}
