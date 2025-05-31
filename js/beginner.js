// js/beginner.js
document.addEventListener('DOMContentLoaded', () => {
    const gigaElement = document.getElementById('giga');
    const callElement = document.getElementById('call');
    const ageElement = document.getElementById('age');
    const generateBtn = document.getElementById('generateBeginnerBtn');

    function generateBeginnerConditions() {
        gigaElement.textContent = getRandomElement(gigaOptions);
        callElement.textContent = getRandomElement(callOptions);
        ageElement.textContent = generateRandomAge(20, 75) + "歳"; // 初級は20歳～75歳で生成
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', generateBeginnerConditions);
    }

    // ページ読み込み時に最初の条件を生成
    generateBeginnerConditions();
});