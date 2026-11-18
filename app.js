
//Rule 1 - Length verification condition check
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
    const months = ["january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"];
    
    let lowerPwd = pwd.toLowerCase();
    for (let i = 0; i < months.length; i++) {
        if (lowerPwd.includes(months[i])) {
            return true;
        }
    }
    return false;
}

// Rule 7 - Your password must include a roman numeral.
// Responsible: Alisia
function runRuleSeven(pwd){
   return /[IVXLCDM]/.test(pwd);
}

// Helper function for rule 8 to convert a Roman Numeral character to its numeric value
function getRomanValueForRuleEight(char) {
    if (char === 'I') return 1;
    if (char === 'V') return 5;
    if (char === 'X') return 10;
    if (char === 'L') return 50;
    if (char === 'C') return 100;
    if (char === 'D') return 500;
    if (char === 'M') return 1000;
    return 0;
}

// Rule 8 - The Roman numerals in your password should multiply to 35
// Responsible: Ionela
function runRuleEight(pwd) {
    var matches = pwd.match(/[IVXLCDM]+/g);
    if (!matches) return false;

    var totalProduct = 1;
    var foundAny = false;

    for (var i = 0; i < matches.length; i++) {
        var romanStr = matches[i];
        var numericVal = 0;
        
        for (var j = 0; j < romanStr.length; j++) {
            var current = getRomanValueForRuleEight(romanStr[j]);
            var next = getRomanValueForRuleEight(romanStr[j + 1]);
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
    var hasP = pwd.indexOf("<p>") !== -1 || pwd.indexOf("</p>") !== -1;
    return hasP;
}

// Rule 10 - 🐈 This is Line’s cat Sofus. Please put him in your password and keep him safe.
// Responsible: Anna



// Rule 11 - Sofus is hungry! Please don’t forget to feed him one 🐁and one🐟.
// Responsible: Anna



// Rule 12 - A sacrifice must be made. Pick two letters that you will no longer be able to use.
// Responsible: Sofia
/*function runRuleTwelve() {
  return sacrificedLetters.length === 2;
}
const pwdInput = document.getElementById("password-input");
// Load any previously saved sacrificed letters from localStorage (if there are any)
let sacrificedLetters = JSON.parse(localStorage.getItem("sacrificedLetters")) || [];

//Intercepts typing to block future insertions once 2 letters are locked in
pwdInput.addEventListener("beforeinput", (event) => {
  if (!event.data) return;

  const incomingText = event.data.toLowerCase();

  //If the sacrifice has been chosen, blocks any incoming text containing those letters
  if (sacrificedLetters.length === 2) {
    const containsBanned = sacrificedLetters.some((letter) => incomingText.includes(letter));
    if (containsBanned) {
      event.preventDefault(); // Blocks new typing, leaves existing text intact
    }
  }
});

//Detects and locks in the 2 unique letters typed into the password box
pwdInput.addEventListener("input", () => {
  if (sacrificedLetters.length < 2) {
    //Extract alphabetical characters from the password
    const lettersOnly = pwdInput.value.toLowerCase().replace(/[^a-z]/g, "");
    
    // Grab the 2 unique letters the player types
    let uniqueLetters = [];
    for (const char of lettersOnly) {
      if (!uniqueLetters.includes(char)) {
        uniqueLetters.push(char); //Takes the letter in parentheses (char) and adds it to the end of uniqueLatters []
      }
      if (uniqueLetters.length === 2) break;
    }

    //Once the 2 letters are found in the password, locks them in as the sacrifice
    if (uniqueLetters.length === 2) {
      sacrificedLetters = uniqueLetters;
      localStorage.setItem("sacrificedLetters", JSON.stringify(sacrificedLetters));
    }
  }
});*/

// Rule 13 - You do not have enough time this semester; sacrifice one course that you will fail and go for a retake.
// Responsible: Sofia
function runRuleThirteen(pwd) {
  const courses = ["web1", "mse1", "pro1", "sep1"];
  const lowerPassword = pwd.toLowerCase();
  
  //Returns true if the password includes at least one of these courses
  return courses.some((course) => lowerPassword.includes(course));
}



// Rule 14 - Your password must include this color in hex. (randomly generated)
// Responsible: Alisia
const targetColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
function runRuleColor(pwd) {
   // Checks if the password contains the hex code (case-insensitive)
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
   // Returns false if any lowercase vowel is found
   return !/[aeiou]/.test(pwd);
}

// Rule 17 - Every consonant not in a roman number must be lowercase.
// Responsible: Alisia
function runRuleConsonantsLowercase(pwd) {
   // Returns false if any uppercase consonant is found
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
    const n = str.length;
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}



// Rule 22 - Your password should include Allan's favourite exercise, all lowercase letters except vowels (Hint: Session 14)
// Responsible: Ionela

function runRuleTwentyTwo(pwd) {
    var lowerPwd = pwd.toLowerCase();
    return lowerPwd.indexOf("mydAtE") !== -1;
}

// Rule 23 - Password must contain a palindrome (at least 3 characters long)
// Responsible: Ionela

function runRuleTwentyThree(pwd) {
    var lowerPwd = pwd.toLowerCase();
    var length = lowerPwd.length;

    for (var i = 0; i < length; i++) {
        for (var j = i + 3; j <= length; j++) {
            var sub = lowerPwd.substring(i, j);
            var reversed = "";
            for (var k = sub.length - 1; k >= 0; k--) {
                reversed += sub[k];
            }
            if (sub === reversed) {
                return true;
            }
        }
    }
    return false;
}

// Centralised Array mapping our 25 rules
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
    //{ id: 12, description: "A sacrifice must be made. Pick two letters that you will no longer be able to use.", check: runRuleTwelve },
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
    { id: 23, description: "Your password must contain a palindrome (at least 3 characters).", check: runRuleTwentyThree }
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
