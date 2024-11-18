function initLoadingBar() {
    // Create loading bar element
    const loadingBar = document.createElement('div');
    loadingBar.className = 'htmx-loading-bar';

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .htmx-loading-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0;
            background-color: #3498db;
            transition: width 0.3s ease-out;
            z-index: 9999;
            display: none;
        }

        .htmx-loading-bar.active {
            display: block;
        }

        body.htmx-requesting .htmx-loading-bar {
            opacity: 1;
            animation: htmx-progress 2s ease-in-out infinite;
        }

        @keyframes htmx-progress {
            0% { width: 0; }
            50% { width: 60%; }
            100% { width: 90%; }
        }
    `;

    // Insert elements into DOM
    document.head.appendChild(style);
    document.body.appendChild(loadingBar);

    // Set up HTMX event listeners
    htmx.on('htmx:beforeRequest', () => {
        loadingBar.style.width = '0';
        loadingBar.classList.add('active');
        setTimeout(() => {
            if (loadingBar.classList.contains('active')) {
                loadingBar.style.width = '90%';
            }
        }, 10);
    });

    const completeRequest = () => {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            loadingBar.classList.remove('active');
            loadingBar.style.width = '0';
        }, 300);
    };

    htmx.on('htmx:afterRequest', completeRequest);
    htmx.on('htmx:responseError', completeRequest);
}

// Auto-initialize when HTMX is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingBar);
} else {
    initLoadingBar();
}

export { initLoadingBar };
