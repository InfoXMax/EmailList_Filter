function searchEmails() {
    var emailList = document.getElementById('emailList').value.split('\n').map(email => email.trim());
    var keyword = document.getElementById('searchKeyword').value.toLowerCase();
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    emailList.forEach(email => {
        var lowercasedEmail = email.toLowerCase();
        if (lowercasedEmail.includes(keyword)) {
            var listItem = document.createElement('li');
            listItem.innerHTML = email.replace(new RegExp(`(${escapeRegExp(keyword)})`, 'ig'), match => `<span class="highlight">${match}</span>`);
            resultsContainer.appendChild(listItem);
        }
    });

    if (resultsContainer.children.length === 0) {
        displayError("No matching emails found.");
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function displayError(message) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `<li class="error">${message}</li>`;
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}

function copyToClipboard() {
    var resultsText = document.getElementById('results').innerText;
    if (resultsText) {
        navigator.clipboard.writeText(resultsText).then(function() {
            alert('Results copied to clipboard!');
        }).catch(function(err) {
            displayError('Unable to copy results to clipboard.');
            console.error('Unable to copy to clipboard', err);
        });
    }
}

// Add a loading indicator when the search is in progress
function showLoadingIndicator() {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<li class="loading">Searching...</li>';
}

// Export Results to a file (dummy implementation)
function exportResults() {
    var resultsText = document.getElementById('results').innerText;

    if (resultsText) {
        var blob = new Blob([resultsText], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'search_results.txt';
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } else {
        displayError('No results to export.');
    }
}


// Clear the search results and reset the input fields
function clearApp() {
    document.getElementById('emailList').value = '';
    document.getElementById('searchKeyword').value = '';
    clearResults();
}

// Highlight search results in a case-insensitive manner
function highlightSearchResults() {
    searchEmails();
}

// Event listener for the Clear App button
document.getElementById('clearAppBtn').addEventListener('click', clearApp);

// Event listener for the Export Results button
document.getElementById('exportBtn').addEventListener('click', exportResults);

// Event listener for the Highlight Search Results button
document.getElementById('highlightBtn').addEventListener('click', highlightSearchResults);


