'use strict';

window.projectPopup = (() => {
    let popupOpen = null;

    const close = () => {
        if (popupOpen) {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            popupOpen.parentElement.removeChild(popupOpen);
            popupOpen = null;
        }
    };

    document.addEventListener('keydown', event => {
        if (event.keyCode === 27) {
            close();
        }
    });

    return project => {
        const popup = document.createElement('div');
        popup.setAttribute('class', 'popup-wrapper');
        popup.innerHTML = `
        <div class="popup">
            <div class="popup-title">${project.title}</div>
            <div class="popup-description">${project.description}</div>
            ${project.images.map(image =>
                `<img class="popup-image" src="/assets/${image}"/>`
            ).join('')}
        </div>
        `;

        popup.addEventListener('click', event => {
            if (event.target === popup) {
                close();
            }
        });

        close();

        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'manipulation';
        popup.style.touchAction = 'auto';

        popupOpen = popup;

        document.body.appendChild(popup);
    };
})();
