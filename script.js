// Click tracking system
let clickSequence = [];
const requiredSequence = ['newton', 'newton', 'newton', 'pancake', 'parralexs'];

// Question and Answer Database
const questionDatabase = [
    {
        question: "What is The Gap?",
        answer: "The Gap is what ROAB classifies as an Open Wound in reality.\n\nObjects have entered.\n\nNone have returned.\n\nResearch continues."
    },
    {
        question: "Who is Parralexs?",
        answer: "Parralexs is an advanced artificial intelligence created by Professor Newton.\n\nPrimary Directives:\n• Preserve Life\n• Protect Civilians\n• Investigate Anomalies"
    },
    {
        question: "What are anomalies?",
        answer: "Anomalies are events, entities, or locations that cannot be explained through currently accepted scientific understanding."
    },
    {
        question: "Has anyone entered The Gap?",
        answer: "No approved traversal attempts have occurred.\n\nFurther requests remain denied."
    }
];

// Track clicks for the secret unlock
function trackClick(element) {
    clickSequence.push(element);
    
    // Keep only the last 5 clicks
    if (clickSequence.length > 5) {
        clickSequence.shift();
    }
    
    // Check if sequence matches
    if (clickSequence.length === 5 && 
        clickSequence[0] === 'newton' && 
        clickSequence[1] === 'newton' && 
        clickSequence[2] === 'newton' && 
        clickSequence[3] === 'pancake' && 
        clickSequence[4] === 'parralexs') {
        
        showHintPopup();
        clickSequence = []; // Reset sequence
    }
    
    console.log('Click sequence:', clickSequence);
}

// Show the hint popup
function showHintPopup() {
    const popup = document.getElementById('hintPopup');
    popup.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}

// Typewriter Effect with Glitch
function typewriterEffect(element, text, speed = 30) {
    element.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            const char = text[index];
            
            // Add glitch effect occasionally
            if (Math.random() < 0.05) {
                element.innerHTML += `<span class="char-glitch">${char}</span>`;
                setTimeout(() => {
                    const lastChar = element.lastChild;
                    if (lastChar && lastChar.classList.contains('char-glitch')) {
                        lastChar.classList.remove('char-glitch');
                    }
                }, 50);
            } else {
                element.innerHTML += char;
            }
            
            index++;
            setTimeout(type, speed + Math.random() * 20 - 10);
        }
    }
    type();
}

// Ask Question Function
function askQuestion(index) {
    if (index >= 0 && index < questionDatabase.length) {
        const q = questionDatabase[index];
        const answerContent = document.getElementById('answerContent');
        
        // Show question header
        answerContent.innerHTML = `<div class="question-title">${q.question}</div><div class="answer-text"></div>`;
        
        // Typewriter effect on answer
        const answerText = answerContent.querySelector('.answer-text');
        typewriterEffect(answerText, q.answer, 25);
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Password Check
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const message = document.getElementById('loginMessage');
    const correctPassword = 'protect newton';
    
    if (input.value.toLowerCase() === correctPassword) {
        message.innerHTML = '<span style="color: var(--accent-green);">ACCESS GRANTED</span>';
        message.style.color = 'var(--accent-green)';
        
        // Show final message page after delay
        setTimeout(() => {
            showPage('final-message');
            input.value = '';
            message.innerHTML = '';
        }, 1500);
    } else if (input.value.toLowerCase() === 'gap') {
        // Original password still works for Level 5 Archive
        message.innerHTML = '<span style="color: var(--accent-green);">ACCESS GRANTED</span>';
        message.style.color = 'var(--accent-green)';
        
        setTimeout(() => {
            showPage('archive');
            input.value = '';
            message.innerHTML = '';
        }, 1500);
    } else if (input.value !== '') {
        message.innerHTML = '<span style="color: var(--accent-red);">ACCESS DENIED</span>';
        input.value = '';
        
        // Shake animation
        input.style.animation = 'shake 0.3s';
        setTimeout(() => {
            input.style.animation = '';
        }, 300);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// Shake Animation and other dynamic styles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .char-glitch {
        color: var(--glitch-color);
        text-shadow: -2px 0 var(--accent-red);
        animation: glitch-char 0.1s;
    }
    
    @keyframes glitch-char {
        0% {
            opacity: 0.8;
            transform: translateX(-2px);
        }
        50% {
            opacity: 1;
            transform: translateX(2px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .question-title {
        color: var(--accent-red);
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 11px;
        letter-spacing: 1px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 8px;
    }
    
    .answer-text {
        white-space: pre-wrap;
        word-wrap: break-word;
        line-height: 1.6;
    }
`;
document.head.appendChild(style);

// Show home page by default and load first answer
window.addEventListener('load', function() {
    showPage('home');
    askQuestion(0);
});