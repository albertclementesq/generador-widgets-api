window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitButton').addEventListener('click', () => {
        if (document.getElementById('jsonContainer').value !== '') {
            let themeJSON;

            try {
                themeJSON = JSON.parse(document.getElementById('jsonContainer').value);
            } catch (error) {
                showToast(type = 'is-danger', message = error);
            }

            const htmlAttribsArray = [];
        
            for (let [key, value] of Object.entries(themeJSON)) {
                htmlAttribsArray.push(`data-${key}="${value}"`);
            }
    
            document.getElementById('htmlContainer').innerHTML = `<div class="sequra-promotion-widget" data-product="xxxx" data-amount="15000" ${htmlAttribsArray.join(' ')}>`;
            
            document.getElementById('copyButton').removeAttribute('disabled');

            showWidgets(htmlAttribsArray);
        } else {
            showToast(type = 'is-danger', message = 'No JSON code has been set!');
        }
    });

    document.getElementById('copyButton').addEventListener('click', () => {
        const copyText = document.getElementById("htmlContainer");
        
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        
        document.execCommand("copy");
        
        showToast(type = 'is-success', message = 'HTML code has been <strong>copied</strong> to your clipboard.');
    });
    
    const showWidgets = (htmlAttribsArray) => {
        const sequraProducts = ['i1', 'pp3', 'sp1'];

        for (let index in sequraProducts) {
            if (document.getElementById(sequraProducts[index]).firstChild) {
                document.getElementById(sequraProducts[index]).removeChild(document.getElementById(sequraProducts[index]).firstChild);
            }

            document.getElementById(sequraProducts[index]).innerHTML = `<div class="sequra-promotion-widget" data-product="${sequraProducts[index]}" data-amount="15000" ${htmlAttribsArray.join(' ')}>`;
        }

        Sequra.onLoad(() => {
            Sequra.refreshComponents();
        });
    }

    const showToast = (type, message) => {
        const toastContainer = document.getElementById("toast-container");

        toastContainer.innerHTML = `
            <div class="notification ${type} animate__animated" id="toast">
                <button class="delete" id="close-button"></button>
                ${message}
            </div>
        `;

        const toast = document.getElementById('toast');

        toast.classList.add('animate__fadeInRight');
    
        document.getElementById('close-button').addEventListener('click', removeToast);
        
        setTimeout(() => {
            removeToast();
        }, 5000);
    }

    const removeToast = () => {
        const toastContainer = document.getElementById("toast-container");
        const toast = document.getElementById('toast');

        toast.classList.remove('animate__fadeInRight');
        toast.classList.add('animate__fadeOutRight');
        setTimeout(() => {
            toastContainer.innerHTML = '';
        }, 2000);
    }
});