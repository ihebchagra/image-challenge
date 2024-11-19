function defineComponent(name, template, styles) {
    customElements.define(
        name,
        class extends HTMLElement {
            connectedCallback() {
                const root = this.attachShadow({ mode: "closed" });
                root.innerHTML = `<style>${styles}</style>${template}`;
                Alpine.initTree(root);

            }
        }
    );
}

defineComponent(
    "custom-button",
    /*html*/`<button><slot /></button>`,
    /*css*/`button {
        background-color: rgb(245 158 11);
        color: rgb(255 255 255);
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        padding: 1rem;
    }`
);

defineComponent(
    "about-page",
    /*html*/`<div>
    <h1>About Page</h1>
    <p>This is the about page.</p>
    </div>`,
    /*css*/`h1 {
        font-size: 3rem;
        line-height: 1;
        text-align: center;
    }`
);

defineComponent(
    "image-grid",
    /*html*/`<div class="grid">
        <slot />
    </div>`,
    /*css*/`.grid {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        margin: 1rem;
        align-items: center;
    }
    
    @media (min-width: 768px) {
        .grid {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            margin: 1rem;
        }
        
        ::slotted(img) {
            flex: 0 1 auto;
            min-width: 200px;
            max-width: calc(33.333% - 1rem);
        }
    }
    
    ::slotted(img) {
        background-color: rgb(243 244 246);
        padding: 1rem;
        width: 100%;
        height: auto;
    }`
);

defineComponent(
    "site-footer",
    /*html*/`
    <footer class="footer">
        <div class="footer-content">
            <p class="copyright">© 2024 Dr. Iheb Chagra. Tous droits réservés.</p>
            <p class="license">Licence Creative Commons Attribution-NonCommercial 4.0 International</p>
            <div class="contact-info">
                <p>Contact: <a href="mailto:contact@ihebchagra.com">contact@ihebchagra.com</a></p>
                <p>Service de Dermatologie, Hôpital Universitaire Farhat Hached, Sousse, Tunisie</p>
            </div>
        </div>
    </footer>`,
    /*css*/`
    .footer {
        font-family: 'EB Garamond', ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        margin-top: 4rem;
        padding: 2rem 0;
        background-color: #F3F4F6;
        border-top: 1px solid #E5E7EB;
    }
    
    .footer-content {
        max-width: 65ch;
        margin: 0 auto;
        text-align: center;
    }
    
    .footer p {
        margin: 0.5rem 0;
        font-size: 0.875rem;
        color: #4B5563;
    }
    
    .footer a {
        color: #000;
        text-decoration: none;
    }
    
    .footer a:hover {
        text-decoration: underline;
    }
    
    .copyright {
        font-weight: bold;
    }
    
    .contact-info {
        margin-top: 1rem;
    }
    `
);

defineComponent(
    "multiple-choice",
    /*html*/`
    <div class="choices-container" x-data="{
        selectedAnswer: null,
        submitted: false,
        retry() {
            this.submitted = false;
            this.selectedAnswer = null;
        }
    }">
        <template x-for="(choice, index) in choices" :key="index">
            <div class="choice">
                <input type="radio" name="diagnosis" :id="'choice' + index" :value="index" x-model="selectedAnswer"
                    class="radio-input"  :disabled="submitted===true">
                <label :for="'choice' + index">
                    <span class="choice-letter" x-text="String.fromCharCode(65 + index)"></span>
                    <span x-text="choice.text"></span>
                </label>
            </div>
        </template>

        <div class="button-group">
            <button @click="submitted = true" x-show="!submitted" :disabled="selectedAnswer === null"
                class="submit-btn">
                Soumettre
            </button>
            <button @click="retry()" x-show="submitted && !choices[selectedAnswer].correct" class="retry-btn">
                Réessayer
            </button>
        </div>

        <div x-show="submitted" class="feedback">
            <template x-if="selectedAnswer !== null && choices[selectedAnswer].correct">
                <div class="correct">
                    <p class="success">Correct! ✓</p>
                    <p x-text="explanation"></p>
                    <p class="source">
                        Source: <a :href="sourceUrl" target="_blank" x-text="source"></a>
                    </p>
                    <slot/>
                </div>
            </template>
            <template x-if="selectedAnswer !== null && !choices[selectedAnswer].correct">
                <p class="error">Incorrect. Essayez encore!</p>
            </template>
        </div>
    </div>`,
    /*css*/`
    .choices-container {
        max-width: 65ch;
        margin: 1.5rem auto;
        background-color: white;
        border: 1px solid #000;
        border-radius: 0.25rem;
        padding: 1rem;
        font-family: 'EB Garamond', ui-sans-serif, system-ui, sans-serif;
    }

    .choice {
        margin: 0.75rem 0;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
    }

    .choice:hover {
        background-color: #f5f5f5;
    }

    .radio-input {
        position: absolute;
        opacity: 0;
    }

    .choice label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
        width: 100%;
    }

    .choice-letter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border: 1.5px solid #000;
        border-radius: 50%;
        margin-right: 0.75rem;
        font-weight: bold;
    }

    .radio-input:checked + label .choice-letter {
        background-color: #000;
        color: white;
    }

    .radio-input:focus + label .choice-letter {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }

    .submit-btn, .retry-btn {
        min-width: 120px;
        padding: 0.5rem 1.5rem;
        font-family: inherit;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: 1.5px solid #000;
        background-color: #000;
        color: white;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .submit-btn:hover, .retry-btn:hover {
        background-color: white;
        color: #000;
    }

    .submit-btn:disabled {
        background-color: #ccc;
        border-color: #ccc;
        color: #666;
        cursor: not-allowed;
    }

    .feedback {
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 0.25rem;
        text-align: center;
    }

    .correct {
        background-color: #f8f8f8;
        border: 1px solid #000;
    }

    .error {
        background-color: #f8f8f8;
        border: 1px solid #000;
        color: #000;
    }

    .success {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .source {
        font-style: italic;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }

    .source a {
        color: #000;
        text-decoration: none;
        border-bottom: 1px solid #000;
    }

    .source a:hover {
        background-color: #f0f0f0;
    }`
);

defineComponent(
    "nav-button",
    /*html*/`<button hx-get="" hx-push-url="true" hx-target="#content"><slot /></button>`,
    /*css*/`button {
        background-color: #000;
        color: white;
        border: 1.5px solid #000;
        border-radius: 0.25rem;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.9rem;
        transition: all 0.2s;
    }
    
    button:hover {
        background-color: white;
        color: #000;
    }`
);