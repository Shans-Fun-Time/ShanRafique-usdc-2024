/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    if (!scannedTextObj || !scannedTextObj.length)
        return result;

    for (const scannedText of scannedTextObj){
        if (!scannedText.Content || !scannedText.Content.length) {
            console.log("Book with ISBN", scannedText.ISBN, "has no content.");
            continue;
        }
        for (text of scannedText.Content){
            const t = text.Text;
            const r = new RegExp(searchTerm);
            if (t.match(r)){
                result.Results.push({
                    "ISBN": scannedText.ISBN,
                    "Page": text.Page,
                    "Line": text.Line
                });
            }  
        }
    }
    console.log("Answer --> ", result);
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOut3 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const bookWithNoContent = {
    Title: "Pageless",
    ISBN: "1234567890"
  };

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

//  Positive tests: tests that return a match.
const test3result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut3) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut3);
    console.log("Received:", test3result);
}

// Negative tests: tests that do not return any matches due to having empty list of books
const emptyInput = [];
const emptyResult = findSearchTermInBooks("the", emptyInput);
if (JSON.stringify(emptyResult) === JSON.stringify({ SearchTerm: "the", Results: [] })) {
  console.log("PASS: Test 4 - Empty input object");
} else {
  console.log("FAIL: Test 4 - Empty input object");
  console.log("Expected:", { SearchTerm: "the", Results: [] });
  console.log("Received:", emptyResult);
}

// Negative tests: tests that do not return any matches due to being pageless
const noContentResult = findSearchTermInBooks("the", [bookWithNoContent]);
if (JSON.stringify(noContentResult) === JSON.stringify({ SearchTerm: "the", Results: [] })) {
  console.log("PASS: Test 5 - Book with no content");
} else {
  console.log("FAIL: Test 5 - Book with no content");
  console.log("Expected:", { SearchTerm: "the", Results: [] });
  console.log("Received:", noContentResult);
}

// Negative tests: tests that do not return any matches due to string not being in book
const noMatchesInput = "awesomeee";
const noMatchesResult = findSearchTermInBooks(noMatchesInput, twentyLeaguesIn);
if (noMatchesResult.Results.length === 0) {
  console.log("PASS: Test 7 - No matches found");
} else {
  console.log("FAIL: Test 7 - No matches found");
  console.log("Expected:", 0);
  console.log("Received:", noMatchesResult.Results.length);
}

// Case-sensitive tests: tests that match (for example) on “The” but not on “the”.
const caseInsensitiveInput = "i";
const caseInsensitiveResult = findSearchTermInBooks(caseInsensitiveInput, twentyLeaguesIn);
if (caseInsensitiveResult.Results.length === 2) {
  console.log("PASS: Test 6 - Case-insensitive search");
} else {
  console.log("FAIL: Test 6 - Case-insensitive search");
  console.log("Expected:", 2);
  console.log("Received:", caseInsensitiveResult.Results.length);
}