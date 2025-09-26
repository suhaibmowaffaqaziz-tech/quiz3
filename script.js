const quizData = [
  {
    question: "1. أي الخلايا يمكن رؤيتها بالعين المجردة؟",
    options: ["خلية الدم الحمراء", "بيضة الإنسان", "بيضة الضفدع", "البكتيريا"],
    correct: 2
  },
  {
    question: "2. ما هو قطر بيضة الإنسان تقريبًا؟",
    options: ["1 ملم", "100 مايكرومتر", "10 مايكرومتر", "1 مايكرومتر"],
    correct: 1
  },
  {
    question: "3. معظم الخلايا في جسم الكائنات الحية يكون حجمها بالنسبة إلى 1 ملم:",
    options: ["أكبر بكثير", "مساوٍ تقريبًا", "أصغر بكثير", "لا علاقة لها"],
    correct: 2
  },
  {
    question: "4. أي نوع من المجاهر يكفي لرؤية معظم الخلايا الحية؟",
    options: ["المجهر الإلكتروني النافذ", "المجهر الإلكتروني الماسح", "المجهر الضوئي", "العين المجردة"],
    correct: 2
  },
  {
    question: "5. لرؤية تفاصيل عضيات الخلية مثل الميتوكوندريا، نحتاج إلى:",
    options: ["العين المجردة", "المجهر الضوئي", "المجهر الإلكتروني", "العدسة المكبرة"],
    correct: 2
  },
  {
    question: "6. الفيروسات (الرواشح) يمكن مشاهدتها باستخدام:",
    options: ["العين المجردة", "العدسة المكبرة", "المجهر الضوئي", "المجهر الإلكتروني"],
    correct: 3
  }
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const showResultBtn = document.getElementById("showResult");
const restartBtn = document.getElementById("restart");

function loadQuiz() {
  quizContainer.innerHTML = "";
  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("p");
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    q.options.forEach((optionText, i) => {
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("option");
      optionDiv.textContent = optionText;
      optionDiv.onclick = () => selectOption(index, i, optionDiv);
      questionDiv.appendChild(optionDiv);
    });

    quizContainer.appendChild(questionDiv);
  });
}

function selectOption(qIndex, optIndex, optionDiv) {
  const questionDiv = quizContainer.children[qIndex];
  const allOptions = questionDiv.querySelectorAll(".option");

  allOptions.forEach(opt => opt.classList.remove("correct", "incorrect"));

  if (optIndex === quizData[qIndex].correct) {
    optionDiv.classList.add("correct");
  } else {
    optionDiv.classList.add("incorrect");
    allOptions[quizData[qIndex].correct].classList.add("correct");
  }
}

showResultBtn.addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, index) => {
    const questionDiv = quizContainer.children[index];
    const options = questionDiv.querySelectorAll(".option");
    options.forEach((opt, i) => {
      if (i === q.correct && opt.classList.contains("correct")) {
        score++;
      }
    });
  });
  const percent = Math.round((score / quizData.length) * 100);
  resultContainer.innerHTML = `نتيجتك: ${score} من ${quizData.length} (${percent}%)`;
});

restartBtn.addEventListener("click", () => {
  loadQuiz();
  resultContainer.innerHTML = "";
});

loadQuiz();
