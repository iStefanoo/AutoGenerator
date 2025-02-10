document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const passwordResult = document.getElementById('passwordResult');
    const copyPassword = document.getElementById('copyPassword');
    const generateBtn = document.getElementById('generatePassword');
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');

    // Caracteres disponibles
    const characters = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Actualizar valor del slider
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generar contraseña
    function generatePassword() {
        let charset = '';
        let password = '';

        // Construir conjunto de caracteres según opciones seleccionadas
        if (uppercaseCheck.checked) charset += characters.uppercase;
        if (lowercaseCheck.checked) charset += characters.lowercase;
        if (numbersCheck.checked) charset += characters.numbers;
        if (symbolsCheck.checked) charset += characters.symbols;

        // Verificar que al menos una opción está seleccionada
        if (charset === '') {
            alert('Por favor, selecciona al menos un tipo de caracteres');
            return;
        }

        // Generar contraseña
        const length = parseInt(lengthSlider.value);
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        // Asegurar que la contraseña contiene al menos un carácter de cada tipo seleccionado
        if (uppercaseCheck.checked && !/[A-Z]/.test(password)) return generatePassword();
        if (lowercaseCheck.checked && !/[a-z]/.test(password)) return generatePassword();
        if (numbersCheck.checked && !/[0-9]/.test(password)) return generatePassword();
        if (symbolsCheck.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) return generatePassword();

        passwordResult.value = password;
    }

    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);

    copyPassword.addEventListener('click', function() {
        if (passwordResult.value) {
            passwordResult.select();
            navigator.clipboard.writeText(passwordResult.value).then(() => {
                // Feedback visual del botón
                const originalText = copyPassword.innerHTML;
                copyPassword.innerHTML = '<i class="fas fa-check"></i>';
                
                // Mostrar mensaje de éxito
                const copyAlert = document.getElementById('copyAlert');
                copyAlert.style.display = 'block';
                
                // Ocultar mensaje y restaurar botón después de 5 segundos
                setTimeout(() => {
                    copyAlert.style.display = 'none';
                    copyPassword.innerHTML = originalText;
                }, 5000);
            });
        }
    });

    // Tema oscuro/claro
    const themeToggle = document.getElementById('themeToggle');
    
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

    // Inicializar tema
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');

    themeToggle.addEventListener('click', function() {
        const isDark = !document.documentElement.hasAttribute('data-theme');
        setTheme(!isDark);
    });

    // Generar contraseña inicial
    generatePassword();
}); 