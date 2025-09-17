// 获取所有词语和目标区域
const words = document.querySelectorAll('.word');
const dropZones = document.querySelectorAll('.drop-zone');
const successMessage = document.getElementById('success-message');

// 打乱词语顺序
function shuffleWords() {
    const wordsContainer = document.getElementById('words');
    const wordArray = Array.from(wordsContainer.children);
    wordArray.sort(() => Math.random() - 0.5); // 打乱数组顺序
    wordArray.forEach(word => wordsContainer.appendChild(word)); // 更新DOM顺序
}

// 检查所有目标区域是否已正确填充
function checkCompletion() {
    const allCorrect = Array.from(dropZones).every(zone => {
        const expectedWordId = `word${zone.getAttribute('data-order')}`;
        return zone.textContent === document.getElementById(expectedWordId)?.textContent;
    });

    if (allCorrect) {
        successMessage.style.display = 'block';  // 显示“完全正确太棒了”提示
    }
}

// 拖拽开始事件
words.forEach(word => {
    word.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// 拖拽进入目标区域
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('over');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('over');
    });

    // 拖拽放下事件
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text');
        const draggedWord = document.getElementById(draggedId);

        // 判断拖放的词语是否与目标区域匹配
        if (zone.getAttribute('data-order') == draggedWord.id.replace('word', '')) {
            zone.textContent = draggedWord.textContent;
            draggedWord.classList.add('correct');
            zone.classList.add('correct');
            draggedWord.setAttribute('draggable', 'false');
            zone.setAttribute('draggable', 'false');
            zone.classList.remove('over');
            checkCompletion(); // 每次放下一个词语后检查是否完成
        } else {
            zone.classList.remove('over');
            alert("位置不对，请重新尝试！");
        }
    });
});

// 页面加载时，打乱词语顺序
window.onload = shuffleWords;
