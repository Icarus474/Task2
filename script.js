// Define variables to store counts of each priority
var highPriorityCount = 0;
var mediumPriorityCount = 0;
var lowPriorityCount = 0;

// Function to update priority counts and display them
function updatePriorityCounts() {
    document.getElementById('highPriorityCount').textContent = highPriorityCount;
    document.getElementById('mediumPriorityCount').textContent = mediumPriorityCount;
    document.getElementById('lowPriorityCount').textContent = lowPriorityCount;
}

// Modify the addIssue function to update priority counts
function addIssue(issueText, priority, description, file) {
    var issueList = document.getElementById('issueList');
    var li = document.createElement('li');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.onclick = function() {
        issueList.removeChild(li);
        // Decrease count based on deleted issue's priority
        if (priority === 'high') {
            highPriorityCount--;
        } else if (priority === 'medium') {
            mediumPriorityCount--;
        } else if (priority === 'low') {
            lowPriorityCount--;
        }
        // Update priority counts display
        updatePriorityCounts();
    };

    var issueTextNode = document.createElement('p');
    issueTextNode.textContent = 'Issue Name: ' + issueText;
    li.appendChild(issueTextNode);

    var priorityNode = document.createElement('p');
    priorityNode.textContent = 'Priority: ' + priority;
    li.appendChild(priorityNode);
    // Applying color based on priority
    if (priority === 'high') {
        priorityNode.style.color = 'red';
        highPriorityCount++;
    } else if (priority === 'medium') {
        priorityNode.style.color = 'yellow';
        mediumPriorityCount++;
    } else if (priority === 'low') {
        priorityNode.style.color = 'green';
        lowPriorityCount++;
    }

    var descriptionNode = document.createElement('p');
    descriptionNode.textContent = 'Description: ' + description;
    li.appendChild(descriptionNode);

    if (file) {
        var fileLabel = document.createElement('label');
        fileLabel.textContent = 'File: ' + file.name;
        li.appendChild(fileLabel);
    }

    li.appendChild(deleteButton);
    issueList.appendChild(li);

   
    updatePriorityCounts();
}


document.getElementById('issueForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var issueInput = document.getElementById('issueInput').value;
    var prioritySelect = document.getElementById('prioritySelect');
    var priority = prioritySelect.options[prioritySelect.selectedIndex].value;
    var descriptionInput = document.getElementById('descriptionInput').value;
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0]; 
    if (issueInput !== '') {
        addIssue(issueInput, priority, descriptionInput, file);
        document.getElementById('issueInput').value = '';
        document.getElementById('descriptionInput').value = '';
        fileInput.value = ''; 
    }
});
