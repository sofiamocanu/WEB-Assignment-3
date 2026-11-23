// Responsible: Anna
let thirdPassword = null;

// Rule 1 - Length verification condition check
// Responsible: Jade
function runRuleOne(pwd) {
    return pwd.length >= 5;
}

// Rule 2 - Checking if a numeric digit exists
// Responsible: Anna
function runRuleTwo(pwd) {
    return /\d/.test(pwd);
}

// Rule 3 - Checking if an uppercase letter exists
// Responsible: Jade
function runRuleThree(pwd) {
    return /[A-Z]/.test(pwd);
}

// Rule 4 - Checking if a special character exists
// Responsible: Jade
function runRuleFour(pwd) {
    return /[^a-zA-Z0-9]/.test(pwd);
}

// Rule 5 - Calculating if the string digits total 55
// Responsible: Sofia
function runRuleFive(pwd) {
    const digits = pwd.match(/\d/g) || [];
    const sum = digits.reduce((accumulator, current) => accumulator + Number(current), 0);
    return sum === 55;
}

// Rule 6 - Your password must include a month of the year.
// Responsible: Sofia
function runRuleSix(pwd) {
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const lowerPwd = pwd.toLowerCase();
    for (let i = 0; i < months.length; i++) {
        if (lowerPwd.includes(months[i])) {
            return true;
        }
    }
    return false;
}

// Rule 7 - Your password must include a roman numeral.
// Responsible: Alisia
function runRuleSeven(pwd) {
    return /[IVXLCDM]/.test(pwd);
}

// Helper function for rule 8 to convert a Roman Numeral character to its numeric value
// Responsible: Ionela
function getRomanValueForRuleEight(char) {
    if (char === "I") return 1;
    if (char === "V") return 5;
    if (char === "X") return 10;
    if (char === "L") return 50;
    if (char === "C") return 100;
    if (char === "D") return 500;
    if (char === "M") return 1000;
    return 0;
}

// Rule 8 - The Roman numerals in your password should multiply to 35
// Responsible: Ionela
function runRuleEight(pwd) {
    const matches = pwd.match(/[IVXLCDM]+/g);
    if (!matches) return false;

    let totalProduct = 1;
    let foundAny = false;

    for (let i = 0; i < matches.length; i++) {
        const romanStr = matches[i];
        let numericVal = 0;

        for (let j = 0; j < romanStr.length; j++) {
            const current = getRomanValueForRuleEight(romanStr[j]);
            const next = getRomanValueForRuleEight(romanStr[j + 1]);
            if (next && current < next) {
                numericVal -= current;
            } else {
                numericVal += current;
            }
        }

        if (numericVal > 0) {
            totalProduct *= numericVal;
            foundAny = true;
        }
    }

    return foundAny && (totalProduct === 35);
}

// Rule 9 - Your password must include the HTML line of code needed for making or closing a new paragraph
// Responsible: Ionela
function runRuleNine(pwd) {
    return pwd.indexOf("<p>") !== -1 || pwd.indexOf("</p>") !== -1;
}

// Rule 10 - This is Line's cat Sofus. Please put him in your password and keep him safe.
// Responsible: Anna
function runRuleTen(pwd) {
    return /sofus/i.test(pwd);
}

// Rule 11 - Sofus is hungry! Please don't forget to feed him one mouse and one fish.
// Responsible: Anna
function runRuleEleven(pwd) {
    return pwd.includes("🐁") && pwd.includes("🐟");
}

// Rule 12 - A sacrifice must be made. Pick two letters that you will no longer be able to use.
// Responsible: Sofia
let sacrificedLetters = JSON.parse(localStorage.getItem("sacrificedLetters")) || [];

function runRuleTwelve() {
    return sacrificedLetters.length === 4;
}

const pwdInput = document.getElementById("password-input");

// Intercept typing in the MAIN password box to block banned letters
pwdInput.addEventListener("beforeinput", (event) => {
    if (!event.data) return;
    const incomingText = event.data.toLowerCase();

    if (sacrificedLetters.length === 2) {
        const containsBanned = sacrificedLetters.some((letter) => incomingText.includes(letter));
        if (containsBanned) {
            event.preventDefault();
        }
    }
});

function refreshRuleTwelveDescription() {
    const ruleTwelve = rulesList.find((rule) => rule.id === 12);
    if (ruleTwelve) {
        ruleTwelve.description = getRuleTwelveUIHTML();
    }
}

// Function to handle setting or changing the sacrificed letters from the UI field
function handleSacrificeSubmission(inputVal) {
    const cleanLetters = inputVal.toLowerCase().replace(/[^a-z]/g, "");

    const uniqueLetters = [];
    for (const char of cleanLetters) {
        if (!uniqueLetters.includes(char)) {
            uniqueLetters.push(char);
        }
        if (uniqueLetters.length === 2) break;
    }

    if (uniqueLetters.length === 2) {
        sacrificedLetters = uniqueLetters;
        localStorage.setItem("sacrificedLetters", JSON.stringify(sacrificedLetters));
        refreshRuleTwelveDescription();
        processPasswordGameLoop();
        alert(`Sacrifice locked: ${sacrificedLetters[0].toUpperCase()} and ${sacrificedLetters[1].toUpperCase()} are now banned from your password!`);
    } else {
        alert("Please enter at least 2 unique alphabetical letters.");
    }
}

// Function to clear/change the sacrifice
function resetSacrifice() {
    localStorage.removeItem("sacrificedLetters");
    sacrificedLetters = [];
    refreshRuleTwelveDescription();
    processPasswordGameLoop();
    alert("Sacrifice cleared! You can now choose new letters.");
}

// UI generator function using template literals
function getRuleTwelveUIHTML() {
    if (sacrificedLetters.length === 2) {
        return `
            <div>
                <span>Sacrificed: <strong>${sacrificedLetters[0].toUpperCase()}</strong> and <strong>${sacrificedLetters[1].toUpperCase()}</strong> (Permanently Banned)</span>
                <button type="button" onclick="resetSacrifice()">Change Sacrifice</button>
            </div>
        `;
    } else {
        return `
            <div>
                <p>A sacrifice must be made. Type 2 letters to ban:</p>
                <input type="text" id="sacrifice-input" maxlength="2" placeholder="e.g. m, o">
                <button type="button" onclick="handleSacrificeSubmission(document.getElementById('sacrifice-input').value)">Lock In Sacrifice</button>
            </div>
        `;
    }
}

// Rule 13 - Sacrifice one course that you will fail and go for a retake.
// Responsible: Sofia
function runRuleThirteen(pwd) {
    const courses = ["web1", "mse1", "pro1", "sep1"];
    const lowerPassword = pwd.toLowerCase();
    return courses.some((course) => lowerPassword.includes(course));
}

// Rule 14 - Your password must include this color in hex. (randomly generated)
// Responsible: Alisia
const targetColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
function runRuleColor(pwd) {
    return pwd.toLowerCase().includes(targetColor.toLowerCase());
}

// Rule 15 - Password must contain the capital of Denmark
// Responsible: Alisia
function runRuleDenmarkCapital(pwd) {
    return /(copenhagen|københavn)/i.test(pwd);
}

// Rule 16 - Every vowel must be uppercase.
// Responsible: Alisia
function runRuleVowelsUppercase(pwd) {
    return !/[aeiou]/.test(pwd);
}

// Rule 17 - Every consonant not in a roman numeral must be lowercase.
// Responsible: Alisia
function runRuleConsonantsLowercase(pwd) {
    return !/[BFGHJKNPQRSTWXYZ]/.test(pwd);
}

// Rule 18 - The password must contain a day of the week in Danish
// Responsible: Alisia
function runRuleDanishDay(pwd) {
    return /(mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)/i.test(pwd);
}

// Rule 19 - The password must include one of the colors in the Danish flag
// Responsible: Alisia
function runRuleDanishFlagColor(pwd) {
    return /(red|white|rød|hvid)/i.test(pwd);
}

// Rule 20 - Checking if the length is contained in the string
// Responsible: Jade
function runRuleTwenty(pwd) {
    const len = String(pwd.length);
    return pwd.includes(len);
}

// Rule 21 - Checking if the length is a prime number
// Responsible: Jade
function runRuleTwentyOne(pwd) {
    const len = pwd.length;
    if (len < 2) return false;
    for (let i = 2; i <= Math.sqrt(len); i++) {
        if (len % i === 0) return false;
    }
    return true;
}

// Rule 22 - Allan's favourite exercise, all lowercase letters
// Responsible: Ionela
function runRuleTwentyTwo(pwd) {
    const lowerPwd = pwd.toLowerCase();
    return lowerPwd.indexOf("mydate") !== -1;
}

// Rule 23 - Password must contain a palindrome (at least 3 characters long)
// Responsible: Ionela
function runRuleTwentyThree(pwd) {
    const lowerPwd = pwd.toLowerCase();
    const length = lowerPwd.length;

    for (let i = 0; i < length; i++) {
        for (let j = i + 3; j <= length; j++) {
            const sub = lowerPwd.substring(i, j);
            let reversed = "";
            for (let k = sub.length - 1; k >= 0; k--) {
                reversed += sub[k];
            }
            if (sub === reversed) {
                return true;
            }
        }
    }
    return false;
}

// Rule 24 - Your password must contain the third password you entered.
// Responsible: Anna
function runRuleTwentyFour(pwd) {
    if (thirdPassword === null) return false;
    return pwd.toLowerCase().includes(thirdPassword.toLowerCase());
}

// Centralised Array mapping our 24 rules
// Responsible: Team
const rulesList = [
    { id: 1, description: "Your password must be at least 5 characters long.", check: runRuleOne },
    { id: 2, description: "Your password must include a number.", check: runRuleTwo },
    { id: 3, description: "Your password must include an uppercase letter.", check: runRuleThree },
    { id: 4, description: "Your password must include a special character.", check: runRuleFour },
    { id: 5, description: "The digits in your password must add up to exactly 55.", check: runRuleFive },
    { id: 6, description: "Your password must include a month of the year.", check: runRuleSix },
    { id: 7, description: "Your password must include a roman numeral.", check: runRuleSeven },
    { id: 8, description: "The Roman numerals in your password should multiply to 35.", check: runRuleEight },
    { id: 9, description: "Your password must include the HTML line of code needed for making or closing a new paragraph.", check: runRuleNine },
    { id: 10, description: "🐈 This is Line’s cat Sofus. Please put him in your password and keep him safe.", check: runRuleTen },
    { id: 11, description: "Sofus is hungry! Please don’t forget to feed him one 🐁and one🐟.", check: runRuleEleven },
    { id: 12, description: getRuleTwelveUIHTML(), check: runRuleTwelve },
    { id: 13, description: "You do not have enough time this semester; sacrifice one course that you will fail and go for a retake.", check: runRuleThirteen },
    { id: 14, description: `Your password must include this color in hex: ${targetColor}`, check: runRuleColor },
    { id: 15, description: "Password must contain the capital of Denmark.", check: runRuleDenmarkCapital },
    { id: 16, description: "Every vowel must be uppercase.", check: runRuleVowelsUppercase },
    { id: 17, description: "Every consonant not in a roman numeral must be lowercase.", check: runRuleConsonantsLowercase },
    { id: 18, description: "The password must contain a day of the week in Danish.", check: runRuleDanishDay },
    { id: 19, description: "The password must include one of the colors in the Danish flag.", check: runRuleDanishFlagColor },
    { id: 20, description: "Your password must include the total password length.", check: runRuleTwenty },
    { id: 21, description: "Your password length must be a prime number.", check: runRuleTwentyOne },
    { id: 22, description: "Your password should include Allan's favourite exercise, all lowercase letters.", check: runRuleTwentyTwo },
    { id: 23, description: "Your password must contain a palindrome (at least 3 characters).", check: runRuleTwentyThree },
    { id: 24, description: "Your password must contain the third password you entered.", check: runRuleTwentyFour }
];

const passwordInput = document.getElementById("password-input");
const charCount = document.getElementById("char-count");
const rulesContainer = document.getElementById("rules-container");
const statsBanner = document.getElementById("stats-banner");
const rulesMetCount = document.getElementById("rules-met-count");
const totalRulesCount = document.getElementById("total-rules-count");
const victoryBanner = document.getElementById("victory-banner");
const resetGameBtn = document.getElementById("reset-game-btn");

// Read and restore score milestone tracking metrics on start
// Responsible: Anna
let personalBest = Number(localStorage.getItem("via_unstyled_score")) || 0;
statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;
totalRulesCount.innerText = rulesList.length;

// Main game loop
// Responsible: Team
function processPasswordGameLoop() {
    const password = passwordInput.value;
    charCount.innerText = password.length;
    rulesContainer.innerHTML = "";

    let currentScore = 0;
    const validRulesHTML = [];
    const invalidRulesHTML = [];

    for (let i = 0; i < rulesList.length; i++) {
        const rule = rulesList[i];
        const isPassed = rule.check(password);

        const ruleParagraph = document.createElement("p");
        ruleParagraph.classList.add("rule-card");

        if (isPassed) {
            ruleParagraph.classList.add("valid");
            ruleParagraph.innerHTML = `[VALID] Rule ${rule.id}: ${rule.description}`;
            currentScore++;
            validRulesHTML.push(ruleParagraph);
        } else {
            ruleParagraph.classList.add("invalid");
            ruleParagraph.innerHTML = `[INVALID] Rule ${rule.id}: ${rule.description}`;
            invalidRulesHTML.push(ruleParagraph);
            break;
        }
    }

    // Update live rules-met counter (goes up as rules pass, goes down if an earlier rule breaks)
    rulesMetCount.innerText = currentScore;

    // Append INVALID rules FIRST so they appear at the top
    for (const ruleCard of invalidRulesHTML) {
        rulesContainer.appendChild(ruleCard);
    }

    // Append VALID rules below them
    for (const ruleCard of validRulesHTML) {
        rulesContainer.appendChild(ruleCard);
    }

    // Remember the password the first time rule 3 is passed (Rule 24)
    if (currentScore >= 3 && thirdPassword === null) {
        thirdPassword = password;
    }

    // Save peak milestone records
    if (currentScore > personalBest) {
        personalBest = currentScore;
        localStorage.setItem("via_unstyled_score", personalBest);
        statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;
    }

    // Show or hide victory banner when all rules are met
    if (rulesList.length > 0 && currentScore === rulesList.length) {
        victoryBanner.classList.remove("hidden");
    } else {
        victoryBanner.classList.add("hidden");
    }
}

// Reset / New Game handler
// Responsible: Team
function resetGame() {
    passwordInput.value = "";
    thirdPassword = null;
    sacrificedLetters = [];
    localStorage.removeItem("sacrificedLetters");
    refreshRuleTwelveDescription();
    processPasswordGameLoop();
    passwordInput.focus();
}

passwordInput.addEventListener("input", processPasswordGameLoop);
resetGameBtn.addEventListener("click", resetGame);

// Initialize application interface loop
processPasswordGameLoop();

