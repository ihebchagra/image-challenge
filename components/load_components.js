function defineComponent(name, template, styles) {
    customElements.define(
        name,
        class extends HTMLElement {
            connectedCallback() {
                const root = this.attachShadow({ mode: "closed" });
                root.innerHTML = `<style>${styles}</style>${template}`;
                htmx.process(root);
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