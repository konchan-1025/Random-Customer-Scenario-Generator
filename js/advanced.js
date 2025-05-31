// js/advanced.js
document.addEventListener('DOMContentLoaded', () => {
    const numberOfPeopleSelect = document.getElementById('numberOfPeople');
    const generateBtn = document.getElementById('generateAdvancedBtn');
    const resultsContainer = document.getElementById('advanced-results');

    function generateAdvancedConditions() {
        const numPeople = parseInt(numberOfPeopleSelect.value, 10);
        resultsContainer.innerHTML = ''; // 前回の結果をクリア

        if (isNaN(numPeople) || numPeople < 1) {
            resultsContainer.innerHTML = '<p>正しい人数を選択してください。</p>';
            return;
        }

        let firstPersonAge = 0; // 家族構成を意識するための基準年齢

        for (let i = 0; i < numPeople; i++) {
            const personDiv = document.createElement('div');
            personDiv.classList.add('person-block');

            const personTitle = document.createElement('h4');
            personTitle.textContent = `${i + 1}人目`;
            personDiv.appendChild(personTitle);

            let currentPersonAge;
            if (i === 0) { // 1人目 (親世代を想定)
                currentPersonAge = generateRandomAge(30, 65);
                firstPersonAge = currentPersonAge;
            } else { // 2人目以降 (配偶者や成人した子供を想定)
                let potentialRelativeMaxAge = firstPersonAge > 20 ? firstPersonAge : 60;
                currentPersonAge = generateRandomAge(20, potentialRelativeMaxAge);
            }
            
            if (i > 0 && currentPersonAge > firstPersonAge) {
                 currentPersonAge = generateRandomAge(20, firstPersonAge);
            }

            const gigaItem = createConditionDisplay("ギガ数目安", getRandomElement(gigaOptions));
            const callItem = createConditionDisplay("通話時間目安", getRandomElement(callOptions));
            const ageItem = createConditionDisplay("年齢", currentPersonAge + "歳");
            
            personDiv.appendChild(gigaItem);
            personDiv.appendChild(callItem);
            personDiv.appendChild(ageItem);
            
            resultsContainer.appendChild(personDiv);
        }
    }

    function createConditionDisplay(label, value) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('condition-item');
        const strongElement = document.createElement('strong');
        strongElement.textContent = label + "：";
        const spanElement = document.createElement('span');
        spanElement.textContent = value;
        itemDiv.appendChild(strongElement);
        itemDiv.appendChild(spanElement);
        return itemDiv;
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', generateAdvancedConditions);
    }

    // ページ読み込み時に最初の条件を生成 (デフォルトの人数選択に基づいて)
    generateAdvancedConditions();
});