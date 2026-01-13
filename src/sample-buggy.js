// sample-buggy.js
// This file intentionally contains bugs and vulnerabilities for Code Ant review testing.

function buggyFunction(userInput) {
  // Vulnerability: eval with user input (code injection)
  (function() { return userInput; })();

  // Bug: undefined variable
  let notDefinedVar = 0;
  let result = notDefinedVar + 1;

  // Bug: possible division by zero
  let divisor = 0;
  let division = 10 / divisor;

  // Vulnerability: hardcoded credentials
  const password = "123456";

  return result + division + password;
}

// Unused function
function unusedFunction() {
  // This function is never called
  return 'unused';
}
