

function clearForm() {

    document.getElementById('exerise-name').innerHTML='';
    document.getElementById('description').innerHTML='';
    document.getElementById('easy').checked;
}

function clearResults() {
    document.getElementById("results").innerHTML='';
}

function updateFormFields(data) {
    document.getElementById('exerise-name').innerHTML='data.name';
    document.getElementById('description').innerHTML='data.description';

    switch(data.difficulty) {
        case 'easy':
            document.getElementById('easy').checked;
          break;
        case 'medium':
            document.getElementById('medium').checked;
          break;
          case 'hard':
            document.getElementById('hard').checked;
            break;
          default:
          // code block
    }
}

function getResults() {
    clearResults();

    fetch("/exercises")
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(function(data) {
                newRecordSnippet(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

function newRecordSnippet(res) {
    for (var i = 0; i < res.length; i++) {
        let data_id = res[i]["_id"];
        let exName = res[i]["name"];
        let exDifficulty = res[i]["difficulty"];
        let exDesc = res[i]["description"];
        let exList = document.getElementById("results");
        snippet = `
      <p class="data-entry">
      <span class="data-exercise-name" data-id=${data_id}>${exName}</span>
      <span class="data-exercise-name" data-id=${data_id}>${exDesc}</span>
      <span class="data-exercise-name" data-id=${data_id}>${exDifficulty}</span>
      <span onClick="delete" class="delete" data-id=${data_id}>x</span>;
      </p>`;
        exList.insertAdjacentHTML("beforeend", snippet);
    }
}

getResults();

