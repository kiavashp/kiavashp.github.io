'use strict';

window.projectPopup = (() => {
    let popupOpen = null;
    const projects = {};

    const close = () => {
        if (popupOpen) {
            document.body.style.overflow = '';
            popupOpen.parentElement.removeChild(popupOpen);
            popupOpen = null;
            location.hash = '';
        }
    };

    document.addEventListener('keydown', event => {
        if (event.keyCode === 27) {
            close();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const entries = document.querySelectorAll('.entry');

        for (let entry of entries) {
            const hash = entry.getAttribute('data-hash');
            const entryData = JSON.parse(entry.getAttribute('data-json'));
            projects[hash] = entryData;
        }
    });

    return hash => {
        if (!projects.hasOwnProperty(hash)) {
            console.warn(`unknown project hash: ${hash}`);
            return;
        }
        const project = projects[hash];
        window.closePopup = close;

        const popup = document.createElement('div');
        popup.setAttribute('class', 'popup-wrapper');
        popup.innerHTML = `
        <div class="popup">
            <div class="popup-close" onclick="closePopup()">&#215;</div>
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

        popupOpen = popup;

        document.body.appendChild(popup);
    };
})();

(() => {
    const onHashChange = () => {
        if (location.hash) {
            projectPopup(location.hash.slice(1));
        }
    };

    document.addEventListener('DOMContentLoaded', onHashChange);
    window.addEventListener('hashchange', onHashChange);
})();
