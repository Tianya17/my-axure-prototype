const questions = [
    {
        question: "谁在1089年第二次来到杭州时写下《乞度牒开西湖状》？",
        options: ["苏东坡", "杨孟瑛", "聂心汤", "赵匡胤"],
        correctAnswer: "苏东坡"
    },
    {
        question: "苏东坡在西湖疏浚工程中修建了哪座堤？",
        options: ["杨公堤", "苏堤", "白堤", "寒山堤"],
        correctAnswer: "苏堤"
    },
    {
        question: "杨孟瑛在1508年修建了哪条堤？",
        options: ["苏堤", "杨公堤", "白堤", "柳堤"],
        correctAnswer: "杨公堤"
    },
    {
        question: "明朝万历三十五年，谁模仿苏东坡疏浚西湖并修建了一个小岛？",
        options: ["钱唐县令聂心汤", "杨孟瑛", "苏东坡", "赵高"],
        correctAnswer: "钱唐县令聂心汤"
    },
    {
        question: "根据文人的说法，西湖自带多少个月亮？",
        options: ["10个月亮", "20个月亮", "30个月亮", "40个月亮"],
        correctAnswer: "30个月亮"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");
    const feedbackContainer = document.getElementById("feedback-container");

    // 清空之前的问题
    questionContainer.innerHTML = "";

    // 显示问题
    const questionElement = document.createElement("h2");
    questionElement.textContent = question.question;
    questionContainer.appendChild(questionElement);

    // 显示选项
    question.options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.onclick = () => checkAnswer(option);
        questionContainer.appendChild(optionButton);
    });
}

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // 根据答案显示弹窗
    if (answer === correctAnswer) {
        showModal("恭喜答对了！");
        score++;
    } else {
        showModal("太遗憾了，选错了！");
    }

    // 禁用按钮
    const buttons = document.querySelectorAll(".question-container button");
    buttons.forEach(button => button.disabled = true);

    // 显示下一题按钮
    document.getElementById("next-btn").style.display = "block";
}

function showModal(message) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = message;
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("next-btn").style.display = "none";
    } else {
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("submit-btn").style.display = "block";
    }
}

function submitQuiz() {
    // 隐藏题目区域，显示得分
    document.getElementById("question-container").style.display = "none";
    document.getElementById("buttons-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";

    // 显示得分
    document.getElementById("score").textContent = score;
}

// 初始加载第一题
loadQuestion();
