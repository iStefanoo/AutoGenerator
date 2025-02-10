document.addEventListener('DOMContentLoaded', function() {
    const qrType = document.getElementById('qrType');
    const qrInputs = document.getElementById('qrInputs');
    const generateQRBtn = document.getElementById('generateQR');
    const qrResult = document.getElementById('qrResult');
    const downloadQRBtn = document.getElementById('downloadQR');

    // Objeto con los campos para cada tipo de QR
    const inputFields = {
        url: `
            <div class="mb-3">
                <label class="form-label">URL</label>
                <input type="url" class="form-control" id="urlInput" placeholder="https://youtube.com">
            </div>
        `,
        wifi: `
            <div class="mb-3">
                <label class="form-label">Nombre de la Red</label>
                <input type="text" class="form-control" id="ssidInput" placeholder="Mi WiFi">
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="passwordInput" placeholder="Contraseña">
            </div>
            <div class="mb-3">
                <label class="form-label">Tipo de Seguridad</label>
                <select class="form-select" id="securityInput">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Sin contraseña</option>
                </select>
            </div>
        `,
        social: `
            <div class="mb-3">
                <label class="form-label">Red Social</label>
                <select class="form-select" id="socialNetwork">
                    <option value="instagram">Instagram</option>
                    <option value="x">X</option>
                    <option value="facebook">Facebook</option>
                </select>
            </div>
            <div class="mb-3">
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="useUsername" checked>
                    <label class="form-check-label" for="useUsername">
                        Usar nombre de usuario (@)
                    </label>
                </div>
                <div id="usernameInput">
                    <label class="form-label">Usuario</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="text" class="form-control" id="socialUser" placeholder="usuario">
                    </div>
                </div>
                <div id="profileInput" style="display: none;">
                    <label class="form-label">URL del perfil</label>
                    <input type="url" class="form-control" id="socialUrl" placeholder="https://instagram.com/usuario">
                </div>
            </div>
        `,
        text: `
            <div class="mb-3">
                <label class="form-label">Texto</label>
                <textarea class="form-control" id="textInput" rows="3" placeholder="Escribe tu texto aquí"></textarea>
            </div>
        `
    };

    // Inicializamos los campos con URL por defecto
    qrInputs.innerHTML = inputFields['url'];

    // Agregamos una función para actualizar el placeholder según la red social
    function updateSocialPlaceholder() {
        const network = document.getElementById('socialNetwork').value;
        const socialUser = document.getElementById('socialUser');
        const socialUrl = document.getElementById('socialUrl');
        
        switch(network) {
            case 'instagram':
                socialUser.placeholder = 'usuario';
                socialUrl.placeholder = 'https://instagram.com/usuario';
                break;
            case 'x':
                socialUser.placeholder = 'usuario';
                socialUrl.placeholder = 'https://x.com/usuario';
                break;
            case 'facebook':
                socialUser.placeholder = 'usuario';
                socialUrl.placeholder = 'https://facebook.com/usuario';
                break;
        }
    }

    // Agregamos el event listener para cambios
    qrType.addEventListener('change', function() {
        qrInputs.innerHTML = inputFields[this.value];
        if(this.value === 'social') {
            const socialNetwork = document.getElementById('socialNetwork');
            socialNetwork.addEventListener('change', updateSocialPlaceholder);
            updateSocialPlaceholder();
        }
    });

    // Aseguramos que los campos iniciales estén cargados
    const initialType = qrType.value;
    qrInputs.innerHTML = inputFields[initialType];
    if(initialType === 'social') {
        const socialNetwork = document.getElementById('socialNetwork');
        socialNetwork.addEventListener('change', updateSocialPlaceholder);
        updateSocialPlaceholder();
    }

    // Función para manejar el cambio entre usuario y URL
    function handleSocialInputChange() {
        document.addEventListener('change', function(e) {
            if (e.target && e.target.id === 'useUsername') {
                const usernameInput = document.getElementById('usernameInput');
                const profileInput = document.getElementById('profileInput');
                
                if (e.target.checked) {
                    usernameInput.style.display = 'block';
                    profileInput.style.display = 'none';
                } else {
                    usernameInput.style.display = 'none';
                    profileInput.style.display = 'block';
                }
            }
        });
    }

    // Llamamos a la función cuando se carga la página
    handleSocialInputChange();

    // Nueva implementación de la generación del QR
    generateQRBtn.addEventListener('click', function() {
        let qrData = '';
        const type = qrType.value;

        switch(type) {
            case 'url':
                qrData = document.getElementById('urlInput').value;
                break;
            case 'wifi':
                const ssid = document.getElementById('ssidInput').value;
                const password = document.getElementById('passwordInput').value;
                const security = document.getElementById('securityInput').value;
                qrData = `WIFI:T:${security};S:${ssid};P:${password};;`;
                break;
            case 'social':
                const network = document.getElementById('socialNetwork').value;
                const useUsername = document.getElementById('useUsername').checked;
                
                if (useUsername) {
                    const user = document.getElementById('socialUser').value;
                    switch(network) {
                        case 'instagram':
                            qrData = `https://instagram.com/${user}`;
                            break;
                        case 'x':
                            qrData = `https://x.com/${user}`;
                            break;
                        case 'facebook':
                            qrData = `https://facebook.com/${user}`;
                            break;
                    }
                } else {
                    qrData = document.getElementById('socialUrl').value;
                }
                break;
            case 'text':
                qrData = document.getElementById('textInput').value;
                break;
        }

        if (qrData) {
            // Limpiamos el contenedor
            qrResult.innerHTML = '';
            
            // Creamos nuevo QR
            new QRCode(qrResult, {
                text: qrData,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Mostramos el botón de descarga
            downloadQRBtn.style.display = 'inline-block';
        } else {
            alert('Por favor, ingresa datos válidos');
        }
    });

    // Actualización de la función de descarga
    downloadQRBtn.addEventListener('click', function() {
        const img = qrResult.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = img.src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    // Agregar la funcionalidad del tema
    const themeToggle = document.getElementById('themeToggle');
    
    // Función para establecer el tema
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    }

    // Inicializar tema (por defecto oscuro)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');

    // Event listener para el botón de tema
    themeToggle.addEventListener('click', function() {
        const isDark = !document.documentElement.hasAttribute('data-theme');
        setTheme(!isDark);
    });

    // Función para limpiar el QR y los campos
    function clearQRAndInputs() {
        qrResult.innerHTML = '';
        downloadQRBtn.style.display = 'none';
        
        // Resetear los campos al valor por defecto
        qrType.value = 'url';
        qrInputs.innerHTML = inputFields['url'];
        
        // Si hay algún input visible, lo limpiamos
        const visibleInput = qrInputs.querySelector('input, textarea');
        if (visibleInput) {
            visibleInput.value = '';
        }
    }

    // Event listeners para los enlaces de navegación
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                clearQRAndInputs();
            }
        });
    });

    // Event listener para el logo/brand
    document.querySelector('.navbar-brand').addEventListener('click', function(e) {
        clearQRAndInputs();
    });
}); 