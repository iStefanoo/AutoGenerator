document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const categorySelect = document.getElementById('category');
    const keywordsInput = document.getElementById('keywords');
    const hashtagCount = document.getElementById('hashtagCount');
    const countValue = document.getElementById('countValue');
    const generateBtn = document.getElementById('generateHashtags');
    const regenerateBtn = document.getElementById('regenerateHashtags');
    const copyBtn = document.getElementById('copyHashtags');
    const resultDiv = document.getElementById('hashtagResult');

    // Base de hashtags por categoría
    const hashtagBase = {
        general: ['love', 'instagood', 'photooftheday', 'beautiful', 'happy', 'cute', 'fashion', 'followme', 'me', 'follow', 'like4like', 'picoftheday', 'selfie', 'summer', 'instadaily', 'friends', 'fun', 'style', 'instalike', 'smile'],
        photography: ['photography', 'photo', 'photographer', 'naturephotography', 'photooftheday', 'photographylovers', 'travelphotography', 'streetphotography', 'photoshoot', 'portrait', 'canon', 'nikon', 'sony', 'camera', 'photogram'],
        food: ['food', 'foodporn', 'instafood', 'foodie', 'yummy', 'foodphotography', 'foodstagram', 'delicious', 'foodlover', 'foodblogger', 'homemade', 'healthy', 'dinner', 'lunch', 'breakfast'],
        travel: ['travel', 'travelgram', 'traveling', 'travelling', 'travelphotography', 'travelblogger', 'wanderlust', 'instatravel', 'adventure', 'vacation', 'holiday', 'explore', 'trip', 'tourism', 'wanderlust'],
        fashion: ['fashion', 'style', 'fashionblogger', 'ootd', 'fashionista', 'streetstyle', 'fashionstyle', 'outfit', 'streetwear', 'model', 'moda', 'fashionable', 'instafashion', 'shopping', 'trend'],
        fitness: ['fitness', 'gym', 'workout', 'fit', 'training', 'motivation', 'health', 'fitnessmotivation', 'lifestyle', 'bodybuilding', 'exercise', 'healthy', 'sport', 'fitfam', 'gymlife'],
        business: ['business', 'entrepreneur', 'success', 'motivation', 'entrepreneurship', 'marketing', 'smallbusiness', 'money', 'businessowner', 'startup', 'mindset', 'leadership', 'inspiration', 'goals', 'hustle'],
        art: ['art', 'artist', 'artwork', 'drawing', 'painting', 'illustration', 'design', 'digitalart', 'sketch', 'creative', 'artistsoninstagram', 'arte', 'draw', 'instaart', 'contemporaryart']
    };

    // Actualizar valor del contador
    hashtagCount.addEventListener('input', function() {
        countValue.textContent = this.value;
    });

    // Generar hashtags
    function generateHashtags() {
        const category = categorySelect.value;
        const keywords = keywordsInput.value.split(',').map(k => k.trim().toLowerCase());
        const count = parseInt(hashtagCount.value);
        
        let hashtags = [];
        let baseHashtags = [...hashtagBase[category]];

        // Agregar hashtags de palabras clave
        keywords.forEach(keyword => {
            if (keyword) {
                hashtags.push('#' + keyword.replace(/\s+/g, ''));
            }
        });

        // Mezclar hashtags base
        for (let i = baseHashtags.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [baseHashtags[i], baseHashtags[j]] = [baseHashtags[j], baseHashtags[i]];
        }

        // Agregar hashtags base hasta alcanzar el número deseado
        while (hashtags.length < count && baseHashtags.length > 0) {
            hashtags.push('#' + baseHashtags.pop());
        }

        // Mostrar resultados
        resultDiv.innerHTML = hashtags.join(' ');
    }

    // Event Listeners
    generateBtn.addEventListener('click', generateHashtags);
    regenerateBtn.addEventListener('click', generateHashtags);

    copyBtn.addEventListener('click', function() {
        const text = resultDiv.innerText;
        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 1500);
        });
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

    // Generar hashtags iniciales
    generateHashtags();
}); 