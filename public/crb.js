const actionBtn = document.getElementById("action-button");
// new item
const makeNote = document.getElementById("make-new");
// clear all items
const clear = document.getElementById("clear-all");
// delete an item
const results = document.getElementById("results");

const status = document.getElementById("status");

function clearForm() {

    document.getElementById('exercise-name').innerHTML='';
    document.getElementById('description').innerHTML='';
    document.getElementById('easy').checked;
}

function clearResults() {
    document.getElementById("results").innerHTML='';
}

function updateFormFields(data) {
    document.getElementById('exercise-name').innerHTML= data.name;
    document.getElementById('description').innerHTML= data.description;

    switch(data.difficulty) {
        case 'easy':
            document.getElementById('easy').value;
          break;
        case 'medium':
            document.getElementById('medium').value;
          break;
          case 'hard':
            document.getElementById('hard').value;
            break;
          default:
          // code block
    }
}

function getResults() {
    clearResults();

//    fetch("/all")
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

clear.addEventListener("click", function(e) {
    if (e.target.matches("#clear-all")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/clearall", {
                method: "delete"
            })
            .then(function(response) {
                if (response.status !== 200) {
                    console.log("Looks like there was a problem. Status Code: " + response.status);
                    return;
                }
                clearForm();
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    }
});

results.addEventListener("click", function(e) {
    if (e.target.matches(".delete")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/delete/" + data_id, {
                method: "delete"
            })
            .then(function(response) {
                if (response.status !== 200) {
                    console.log("Looks like there was a problem. Status Code: " + response.status);
                    return;
                }
                element.parentNode.remove();
                updateFormFields();
                let newButton = `
                    <button id='make-new'>Submit</button>`;
                actionBtn.innerHTML = newButton;
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    } else if (e.target.matches(".data-exercise-name")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        //status.innerText = "Editing"
        console.log('crb about to call fetch for /exercises/ by id testing:'+data_id);

        fetch("/exercises/" + data_id, { method: "get" })
            .then(function(response) {
                console.log('crb checking response:'+response.json());
                return response.json();
            })
            .then(function(data) {
                updateFormFields(data);
                let newButton = `<button id='updater' data-id=${data_id}>Update</button>`;
                actionBtn.innerHTML = newButton;
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    }
});

actionBtn.addEventListener("click", function(e) {

    if (e.target.matches("#updater")) {
        updateBtnEl = e.target;
        data_id = updateBtnEl.getAttribute("data-id");
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const difficulty = "";
        if (document.getElementById('easy').checked) {
            difficulty = "easy";
        } else if (document.getElementById('medium').checked)   {
            difficulty = "medium";
        } else {
            difficulty = "hard";
            }

        fetch("/update/" + data_id, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    difficulty
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                element.innerText = name
                clearForm();
                let newButton = `<button id='make-new'>Submit</button>`;
                actionBtn.innerHTML = newButton;
                status.innerText = "Creating"
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    } else if (e.target.matches("#make-new")) {
        element = e.target;

        data_id = element.getAttribute("data-id");
        var diff = "";
        if (document.getElementById('easy').checked) {
            diff = "easy";
        } else if (document.getElementById('medium').checked) 
        {
            diff = "medium";
        } else {
            diff = "hard";
            }

        fetch("/submit", {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("exercise-name").value,
                    description: document.getElementById("description").value,
                    difficulty: diff
                })
            })
            .then(result => result.json().then(newEx => {
                location.reload();
                //console.log("From fetch(/submit", newEx)
                // newRecordSnippet([dbWorkout])
            }));
        clearForm();
    }
});
