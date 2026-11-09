// ========================================================
// 👤 TEAMMATES 1-3: SEPARATE PASSWORD VALIDATION WORKSPACES
// ========================================================

/**
 * JAVASCRIPT WORKSPACE 1 - Owned Fully By: [Teammate 1 Name]
 * Task: Rule 1 - Length verification condition check
 */
function runRuleOne(pwd) {
    return pwd.length >= 5;
}

/**
 * JAVASCRIPT WORKSPACE 2 - Owned Fully By: [Teammate 2 Name]
 * Task: Rule 2 - Checking if a numeric digit exists
 */
function runRuleTwo(pwd) {
    return /\d/.test(pwd);
}

/**
 * JAVASCRIPT WORKSPACE 3 - Owned Fully By: [Teammate 3 Name]
 * Task: Rule 3 - Calculating if the string digits total 15
 */
function runRuleThree(pwd) {
    const digits = pwd.match(/\d/g) || [];
    const sum = digits.reduce((accumulator, current) => accumulator + Number(current), 0);
    return sum === 15;
}


// ========================================================
// 👤 TEAMMATE 5: CORE ENGINE & LOCAL STORAGE ENGINE
// ========================================================

/**
 * JAVASCRIPT WORKSPACE 5 - Owned Fully By: [Teammate 5 Name]
 * Task: Live Input Tracker, DOM Generation, and localStorage Saves
 */

// Centralised Array mapping our exactly 3 rules
const rulesList = [
    { id: 1, description: "Your password must be at least 5 characters long.", check: runRuleOne },
    { id: 2, description: "Your password must include at least one number.", check: runRuleTwo },
    { id: 3, description: "The digits in your password must add up to exactly 15.", check: runRuleThree }
];

const passwordInput = document.getElementById("password-input");
const charCount = document.getElementById("char-count");
const rulesContainer = document.getElementById("rules-container");
const statsBanner = document.getElementById("stats-banner");

// Read and restore score milestone tracking metrics on start
let personalBest = localStorage.getItem("via_unstyled_score") || 0;
statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;

function processPasswordGameLoop() {
    const password = passwordInput.value;
    charCount.innerText = password.length;
    rulesContainer.innerHTML = ""; // Clear existing rule lists

    let currentScore = 0;
    let stopPipeline = false;

    for (let i = 0; i < rulesList.length; i++) {
        if (stopPipeline) break;

        const rule = rulesList[i];
        const isPassed = rule.check(password);

        // Build standard unstyled block components cleanly via native DOM API
        const ruleParagraph = document.createElement("p");
        
        // Use clean text marks instead of CSS colors to display status
        const statusLabel = isPassed ? "[VALID] " : "[INVALID] ";
        ruleParagraph.innerText = `${statusLabel} Rule ${rule.id}: ${rule.description}`;

        rulesContainer.appendChild(ruleParagraph);

        if (isPassed) {
            currentScore++;
        } else {
            stopPipeline = true; // Stop here so subsequent locked rules don't render
        }
    }

    // Save peak milestone records down into browser's local cache
    if (currentScore > personalBest) {
        personalBest = currentScore;
        localStorage.setItem("via_unstyled_score", personalBest);
        statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;
    }
}

// Map event binding handles
passwordInput.addEventListener("input", processPasswordGameLoop);

// Execution trigger to initialize the application interface loop
processPasswordGameLoop();
