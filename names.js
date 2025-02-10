document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const nameType = document.getElementById('nameType');
    const nameStyle = document.getElementById('nameStyle');
    const keywords = document.getElementById('keywords');
    const generateBtn = document.getElementById('generateNames');
    const generateMoreBtn = document.getElementById('generateMore');
    const resultsDiv = document.getElementById('nameResults');
    const genderSelect = document.getElementById('genderSelect');
    const gender = document.getElementById('gender');

    // Base de palabras por tipo y estilo
    const wordBase = {
        business: {
            prefixes: ['Tech', 'Nova', 'Eco', 'Pro', 'Smart', 'Global', 'Next', 'Peak', 'Prime', 'Elite'],
            suffixes: ['Solutions', 'Systems', 'Group', 'Labs', 'Hub', 'Corp', 'Tech', 'Works', 'Logic', 'Mind'],
            modern: ['AI', 'Digital', 'Cyber', 'Cloud', 'Data', 'Net', 'Web', 'App'],
            classic: ['Standard', 'Quality', 'Trust', 'Value', 'Core', 'Base'],
            creative: ['Spark', 'Flux', 'Wave', 'Pulse', 'Flow', 'Drift', 'Bloom'],
            professional: ['Enterprise', 'Consulting', 'Partners', 'Associates', 'Ventures'],
            fun: ['Buzz', 'Pop', 'Snap', 'Zip', 'Bang', 'Boom', 'Wow']
        },
        project: {
            prefixes: ['Project', 'Operation', 'Initiative', 'Mission', 'Vision'],
            suffixes: ['Plus', 'Pro', 'Max', 'Ultra', 'Elite'],
            modern: ['Alpha', 'Beta', 'Delta', 'Omega'],
            classic: ['One', 'First', 'Prime', 'Core'],
            creative: ['Phoenix', 'Dragon', 'Eagle', 'Lion'],
            professional: ['Excellence', 'Success', 'Progress'],
            fun: ['Star', 'Hero', 'Champion', 'Legend']
        },
        pet: {
            prefixes: ['Mr', 'Ms', 'Sir', 'Lady'],
            modern: ['Luna', 'Nova', 'Storm', 'Shadow'],
            classic: ['Max', 'Charlie', 'Lucy', 'Bella'],
            creative: ['Ghost', 'River', 'Sky', 'Echo'],
            professional: ['Professor', 'Doctor', 'Captain'],
            fun: ['Cookie', 'Pickle', 'Waffle', 'Nugget']
        },
        product: {
            prefixes: ['i', 'e', 'u', 'a'],
            suffixes: ['Pro', 'Plus', 'Max', 'Ultra', 'Lite'],
            modern: ['Smart', 'Flex', 'Swift', 'Prime'],
            classic: ['Basic', 'Standard', 'Premium'],
            creative: ['Fusion', 'Infinity', 'Genesis'],
            professional: ['Professional', 'Enterprise'],
            fun: ['Joy', 'Fun', 'Happy', 'Cool']
        },
        brand: {
            prefixes: ['The', 'My', 'Our'],
            suffixes: ['Co', 'Inc', 'Ltd', 'Brand'],
            modern: ['Pixel', 'Vector', 'Nexus', 'Vertex'],
            classic: ['Heritage', 'Legacy', 'Tradition'],
            creative: ['Dream', 'Vision', 'Spirit', 'Soul'],
            professional: ['Select', 'Premier', 'Elite'],
            fun: ['Happy', 'Sunny', 'Bright', 'Joy']
        }
    };

    // Base de nombres de personas
    const personNames = {
        female: {
            modern: ['Sophia', 'Luna', 'Aria', 'Nova', 'Zara', 'Maya', 'Leia', 'Kyra'],
            classic: ['María', 'Ana', 'Isabel', 'Elena', 'Clara', 'Laura', 'Carmen', 'Rosa'],
            creative: ['Celeste', 'Aurora', 'Coral', 'Iris', 'Luz', 'Alba', 'Estrella'],
            traditional: ['Josefa', 'Dolores', 'Pilar', 'Mercedes', 'Concepción', 'Teresa'],
            international: ['Sakura', 'Aisha', 'Valentina', 'Emma', 'Chiara', 'Natasha']
        },
        male: {
            modern: ['Kai', 'Liam', 'Noah', 'Axel', 'Zion', 'Neo', 'Atlas', 'Leo'],
            classic: ['Juan', 'Carlos', 'Antonio', 'José', 'Manuel', 'Francisco', 'Pedro'],
            creative: ['Orión', 'Dante', 'Zeus', 'Ares', 'Phoenix', 'River', 'Ocean'],
            traditional: ['Jesús', 'Miguel', 'Ángel', 'Rafael', 'Santiago', 'Fernando'],
            international: ['Alessandro', 'Hans', 'Yuki', 'Omar', 'Viktor', 'Dimitri']
        }
    };

    // Función para manejar la visibilidad del selector de género
    function updateGenderSelectVisibility() {
        genderSelect.style.display = nameType.value === 'person' ? 'block' : 'none';
    }

    // Verificar el estado inicial al cargar la página
    updateGenderSelectVisibility();

    // Event listener para cambios
    nameType.addEventListener('change', updateGenderSelectVisibility);

    // Función para generar nombres de personas
    function generatePersonNames() {
        const selectedGender = gender.value;
        const style = nameStyle.value;
        let names = [];

        if (selectedGender === 'both') {
            // Mezclar nombres de ambos géneros
            const femaleNames = personNames.female[style];
            const maleNames = personNames.male[style];
            const mixedNames = [...femaleNames, ...maleNames];
            
            // Barajar el array
            for (let i = mixedNames.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [mixedNames[i], mixedNames[j]] = [mixedNames[j], mixedNames[i]];
            }
            
            names = mixedNames.slice(0, 5);
        } else {
            const genderNames = personNames[selectedGender][style];
            names = genderNames
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);
        }

        return names;
    }

    // Función para generar nombres aleatorios
    function generateRandomNames(count = 5) {
        const type = nameType.value;
        
        if (type === 'person') {
            return generatePersonNames();
        }

        const style = nameStyle.value;
        const userKeywords = keywords.value.split(',').map(k => k.trim());
        let names = [];

        for (let i = 0; i < count; i++) {
            let name = '';
            const base = wordBase[type];
            const styleWords = base[style] || [];

            // Probabilidad de usar diferentes componentes
            const usePrefix = Math.random() < 0.3;
            const useSuffix = Math.random() < 0.3;
            const useKeyword = userKeywords.length > 0 && Math.random() < 0.4;

            // Construir el nombre
            if (usePrefix && base.prefixes) {
                name += base.prefixes[Math.floor(Math.random() * base.prefixes.length)] + ' ';
            }

            if (useKeyword) {
                name += userKeywords[Math.floor(Math.random() * userKeywords.length)] + ' ';
            }

            name += styleWords[Math.floor(Math.random() * styleWords.length)];

            if (useSuffix && base.suffixes) {
                name += ' ' + base.suffixes[Math.floor(Math.random() * base.suffixes.length)];
            }

            names.push(name.trim());
        }

        return [...new Set(names)]; // Eliminar duplicados
    }

    // Función para mostrar los nombres generados
    function displayNames(names) {
        resultsDiv.innerHTML = names.map(name => `
            <div class="name-item p-3 mb-2 bg-light rounded">
                <div class="d-flex justify-content-between align-items-center">
                    <span>${name}</span>
                    <button class="btn btn-sm btn-outline-primary copy-name" data-name="${name}">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Agregar event listeners para los botones de copiar
        document.querySelectorAll('.copy-name').forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                navigator.clipboard.writeText(name).then(() => {
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 1500);
                });
            });
        });
    }

    // Event Listeners
    generateBtn.addEventListener('click', function() {
        const names = generateRandomNames();
        displayNames(names);
    });

    generateMoreBtn.addEventListener('click', function() {
        const names = generateRandomNames();
        displayNames(names);
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

    // Generar nombres iniciales
    const initialNames = generateRandomNames();
    displayNames(initialNames);
}); 