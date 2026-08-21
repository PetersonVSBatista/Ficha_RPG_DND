const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const slides = Array.from(document.querySelectorAll('.slide'));
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

if (prevSlide && nextSlide && slides.length > 0) {
  prevSlide.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextSlide.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

const quizQuestions = [
  {
    prompt: 'O que deve ser feito com medicamentos vencidos?',
    options: [
      'Jogá-los no lixo comum',
      'Jogá-los na pia ou no vaso sanitário',
      'Levá-los a um ponto de coleta adequado',
      'Guardá-los indefinidamente em casa'
    ],
    correct: 2,
    explanation: 'Medicamentos vencidos devem ser entregues em pontos de coleta específicos, que garantem o descarte ambientalmente correto.'
  },
  {
    prompt: 'Por que não devemos descartar medicamentos no vaso sanitário?',
    options: [
      'Porque podem contaminar a água e o meio ambiente',
      'Porque podem entupir o vaso',
      'Porque perdem a validade mais rápido',
      'Porque ficam mais caros'
    ],
    correct: 0,
    explanation: 'Substâncias presentes nos medicamentos podem chegar aos rios e lençóis freáticos, contaminando a água e o meio ambiente.'
  },
  {
    prompt: 'O descarte inadequado de medicamentos pode causar:',
    options: [
      'Contaminação do solo e da água',
      'Aumento da qualidade da água',
      'Redução da poluição',
      'Nenhum impacto'
    ],
    correct: 0,
    explanation: 'Resíduos de medicamentos descartados de forma incorreta contaminam o solo e a água, gerando impactos ambientais.'
  },
  {
    prompt: 'Uma pessoa afirma: “Medicamentos são pequenos, então não causam problemas ambientais quando jogados no lixo”. Você:',
    options: [
      'Concorda',
      'Discorda, pois substâncias dos medicamentos podem causar impactos ambientais',
      'Concorda apenas para medicamentos líquidos',
      'Não sabe'
    ],
    correct: 1,
    explanation: 'Mesmo em pequenas quantidades, as substâncias biologicamente ativas dos medicamentos podem gerar impactos ambientais significativos.'
  },
  {
    prompt: 'Antes de descartar um medicamento, é importante:',
    options: [
      'Verificar as orientações do fabricante e do sistema de coleta local',
      'Misturá-lo com produtos de limpeza',
      'Jogá-lo imediatamente no ralo',
      'Queimá-lo em casa'
    ],
    correct: 0,
    explanation: 'Seguir as orientações corretas garante que o descarte seja seguro tanto para as pessoas quanto para o meio ambiente.'
  },
  {
    prompt: 'Quem deve contribuir para o descarte correto de medicamentos?',
    options: [
      'Somente os hospitais',
      'Somente as farmácias',
      'Somente o governo',
      'Toda a sociedade, seguindo as orientações de descarte'
    ],
    correct: 3,
    explanation: 'O descarte correto é responsabilidade coletiva: cada pessoa deve seguir as orientações para reduzir os impactos ambientais.'
  },
  {
    prompt: 'Por que os medicamentos exigem atenção especial no descarte?',
    options: [
      'Porque podem conter substâncias biologicamente ativas',
      'Porque são sempre inflamáveis',
      'Porque todas as embalagens são tóxicas',
      'Porque não podem ser transportados'
    ],
    correct: 0,
    explanation: 'As substâncias biologicamente ativas presentes nos medicamentos podem causar impactos mesmo em pequenas concentrações, exigindo descarte adequado.'
  },
  {
    prompt: 'Complete: o descarte correto de medicamentos contribui para a proteção da ______.',
    options: [
      'poluição',
      'saúde e do meio ambiente',
      'automedicação',
      'contaminação'
    ],
    correct: 1,
    explanation: 'O descarte correto protege tanto a saúde pública quanto o meio ambiente, evitando contaminação de água e solo.'
  }
];

const quizAccessForm = document.getElementById('quizAccessForm');
const quizRegistrationCard = document.getElementById('quizRegistrationCard');
const quizContent = document.getElementById('quizContent');
const quizFormMessage = document.getElementById('quizFormMessage');

const quizTags = ['A', 'B', 'C', 'D'];
const quizStrip = document.getElementById('quizStrip');
const quizStripCurrent = document.getElementById('quizStripCurrent');
const quizStripScore = document.getElementById('quizStripScore');
const quizQnum = document.getElementById('quizQnum');
const quizPrompt = document.getElementById('quizPrompt');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizNextLabel = document.getElementById('quizNextLabel');
const quizView = document.getElementById('quizView');
const quizResultView = document.getElementById('quizResultView');
const quizFinalScore = document.getElementById('quizFinalScore');
const quizVerdictTitle = document.getElementById('quizVerdictTitle');
const quizVerdictCopy = document.getElementById('quizVerdictCopy');
const quizRetryBtn = document.getElementById('quizRetryBtn');
const quizReviewBtn = document.getElementById('quizReviewBtn');
const quizReviewList = document.getElementById('quizReviewList');

let quizCurrent = 0;
let quizScore = 0;
let quizAnswered = false;
let quizUserAnswers = new Array(quizQuestions.length).fill(null);

function buildQuizStrip() {
  if (!quizStrip) return;
  quizStrip.innerHTML = '';
  quizQuestions.forEach(() => {
    const dose = document.createElement('div');
    dose.className = 'quiz-dose';
    quizStrip.appendChild(dose);
  });
}

function updateQuizStrip() {
  if (!quizStrip) return;
  const doses = quizStrip.querySelectorAll('.quiz-dose');
  doses.forEach((dose, index) => {
    dose.className = 'quiz-dose' + (index < quizCurrent ? ' done' : index === quizCurrent ? ' now' : '');
  });

  quizStripCurrent.textContent = `Pergunta ${quizCurrent + 1} de ${quizQuestions.length}`;
  quizStripScore.textContent = `${quizScore} acerto${quizScore === 1 ? '' : 's'}`;
}

function renderQuizQuestion() {
  if (!quizPrompt || !quizOptions) return;

  quizAnswered = false;
  const question = quizQuestions[quizCurrent];

  quizQnum.textContent = `Pergunta ${String(quizCurrent + 1).padStart(2, '0')}`;
  quizPrompt.textContent = question.prompt;
  quizOptions.innerHTML = '';
  quizFeedback.className = 'quiz-feedback';
  quizFeedback.innerHTML = '';
  quizNextLabel.textContent = quizCurrent === quizQuestions.length - 1 ? 'Ver resultado' : 'Próxima pergunta';

  question.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.innerHTML = `<span class="quiz-option-tag">${quizTags[index]}</span><span>${optionText}</span>`;
    button.addEventListener('click', () => selectQuizAnswer(index));
    quizOptions.appendChild(button);
  });

  if (quizView) {
    quizView.classList.remove('quiz-enter');
    void quizView.offsetWidth;
    quizView.classList.add('quiz-enter');
  }

  updateQuizStrip();
}

function selectQuizAnswer(index) {
  if (quizAnswered || !quizQuestions[quizCurrent]) return;

  quizAnswered = true;
  quizUserAnswers[quizCurrent] = index;
  const question = quizQuestions[quizCurrent];
  const correct = index === question.correct;

  if (correct) quizScore++;

  const buttons = quizOptions.querySelectorAll('.quiz-option');
  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === question.correct) {
      button.classList.add('correct');
    } else if (buttonIndex === index) {
      button.classList.add('wrong');
    } else {
      button.classList.add('dim');
    }
  });

  const okMessages = ['Exato.', 'Isso aí!', 'Na mosca.', 'Certeza absoluta.', 'Mandou bem!'];
  const badMessages = ['Não é essa.', 'Quase.', 'Essa não.', 'Vamos revisar.'];
  const line = correct ? okMessages[Math.floor(Math.random() * okMessages.length)] : badMessages[Math.floor(Math.random() * badMessages.length)];

  quizFeedback.className = 'quiz-feedback show ' + (correct ? 'ok' : 'bad');
  quizFeedback.innerHTML = `<b>${line}</b>${question.explanation}`;

  updateQuizStrip();
}

function showQuizResult() {
  if (!quizView || !quizResultView) return;

  quizView.style.display = 'none';
  quizResultView.classList.add('show');

  quizFinalScore.textContent = String(quizScore);

  const percent = quizScore / quizQuestions.length;
  let title = 'Vale revisar o tema.';
  let copy = 'O descarte incorreto de medicamentos tem impacto direto na água e no solo. Reveja as respostas abaixo e tente novamente.';

  if (percent === 1) {
    title = 'Domínio completo.';
    copy = 'Você acertou todas as perguntas — sabe exatamente por que o descarte correto de medicamentos protege a água, o solo e a saúde pública.';
  } else if (percent >= 0.75) {
    title = 'Quase lá.';
    copy = 'Você já entende bem os riscos do descarte incorreto. Vale revisar os pontos que passaram batido antes de aplicar no dia a dia.';
  } else if (percent >= 0.5) {
    title = 'No caminho certo.';
    copy = 'Você acertou o essencial, mas ainda há lacunas importantes sobre contaminação ambiental e o papel de cada pessoa no descarte correto.';
  }

  quizVerdictTitle.textContent = title;
  quizVerdictCopy.textContent = copy;

  quizReviewList.innerHTML = '<div class="quiz-divider"></div>';
  quizQuestions.forEach((question, index) => {
    const isCorrect = quizUserAnswers[index] === question.correct;
    const item = document.createElement('div');
    item.className = 'quiz-review-item';
    item.innerHTML = `
      <span class="quiz-dot ${isCorrect ? 'ok' : 'bad'}">${isCorrect ? '✓' : '✕'}</span>
      <p><strong>${question.prompt}</strong><br>${question.explanation}</p>
    `;
    quizReviewList.appendChild(item);
  });
}

quizNextBtn.addEventListener('click', () => {
  if (quizCurrent < quizQuestions.length - 1) {
    quizCurrent++;
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
});

quizRetryBtn.addEventListener('click', () => {
  quizCurrent = 0;
  quizScore = 0;
  quizUserAnswers = new Array(quizQuestions.length).fill(null);
  quizResultView.classList.remove('show');
  quizReviewList.style.display = 'none';
  quizView.style.display = 'block';
  renderQuizQuestion();
});

quizReviewBtn.addEventListener('click', () => {
  const isHidden = quizReviewList.style.display === 'none';
  quizReviewList.style.display = isHidden ? 'block' : 'none';
  quizReviewBtn.textContent = isHidden ? 'Ocultar respostas' : 'Ver respostas';
});

if (quizAccessForm) {
  quizAccessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!quizAccessForm.checkValidity()) {
      quizAccessForm.reportValidity();
      return;
    }

    const name = document.getElementById('quizName')?.value.trim() || 'participante';
    if (quizFormMessage) {
      quizFormMessage.textContent = `Dados salvos com sucesso, ${name}! Agora você pode responder ao quiz.`;
    }

    if (quizRegistrationCard) {
      quizRegistrationCard.style.display = 'none';
    }

    if (quizContent) {
      quizContent.hidden = false;
      quizContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

if (quizContent) {
  quizContent.hidden = true;
}

buildQuizStrip();
renderQuizQuestion();
