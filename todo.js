var mainInput = document.getElementById("mainInput");
var totalTodo = document.getElementById('totalTodos');
// Set this to give unique id on each todo list
var todoid = '0';
var todoDone = '0';

// Add todos - Trigger on Enter
mainInput.addEventListener("keyup", function(e){
    var key = e.which || e.keyCode;
    if (key === 13) {
        if (mainInput.value === ''){
            // If empty value entered
            //console.log('Empty value');
            return false;
        }else{
            // If value passed
            todoid++;
            //console.log(todoid);
            // Create element to hold new value
            var node = document.createElement("LI");

        

            // Add data attribute on li
            node.setAttribute('id', 'todo_' + todoid);

            // Greate i element - Check icon
            var nodeTwo = document.createElement("I");
            // Add i into li element
            node.appendChild(nodeTwo);
            // Add Classes into i
            nodeTwo.className = 'ion-ios-circle-outline';
            nodeTwo.setAttribute('id', 'child_todo_' + todoid);


            // Save textnode from the value
            var textnode = document.createTextNode(mainInput.value);
            // Add that into li
            node.appendChild(textnode);


            // Greate i element - Remove icon
            var nodeThree = document.createElement("I");
            // Add i into li element
            node.appendChild(nodeThree);
            // Add Classes into i
            nodeThree.className = 'ion-ios-close-empty';
            nodeThree.setAttribute('id', 'close_child_todo_' + todoid);

            // Add new list on the main div
            document.getElementById('todoList').appendChild(node);
            // Clear input
            mainInput.value = '';
            //console.log(mainInput.value);

            // Update total todos

            totalMsg(todoid, todoDone);
            //console.log('Total ' + todoid + ' todos to do');
        }
    }
});

// Fuction to show total message
function totalMsg(todoid, todoDone){
    if(todoid === 1){
        return totalTodos.innerHTML = '<b>' + todoid + '</b> thing to do / <b>' + todoDone + '</b> completed';
    }else{
        return totalTodos.innerHTML = '<b>' + todoid + '</b> things to do / <b>' + todoDone + '</b> completed';
    }
}

// Function to check Class name on elements
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
document.querySelector('body').addEventListener('click', function(event) {
    if (event.target.id.startsWith("child_todo_")) {
        // Get clicked item's ID
        var todoClicked = event.target.id;
        //console.log(todoClicked);
        var todoClickedElement = document.getElementById(todoClicked);
        todoClickedElement.classList.toggle('completed');

        var parent_tce = todoClickedElement.parentElement.id;
        //console.log(parent_tce);
        var completedList = document.getElementById(parent_tce);
        completedList.classList.toggle('completedlist');

        // if todoClickedElement has completed class add or substract
        //console.log(hasClass(todoClickedElement, 'completed'));
        if(hasClass(completedList, 'completedlist')){
            todoDone++;
            totalMsg(todoid, todoDone);
        }else{
            todoDone--;
            totalMsg(todoid, todoDone);
        }
    }
});

// Remove todo
document.querySelector('body').addEventListener('click', function(event) {
    // Select all elements have ID starts with "child_todo_close_"
    if (event.target.id.startsWith("close_child_todo_")) {
        var closeClicked = event.target.id;
        //console.log(closeClicked);
        var closeClickedElement = document.getElementById(closeClicked);
        var parent_cce = closeClickedElement.parentElement.id;

        // Update total todo number
        var willBeRemoved = document.getElementById(parent_cce);
        todoid--;
        if(todoDone != 0 && hasClass(willBeRemoved, 'completedlist')){
            todoDone--;
        }
        if(todoid === 0){
            totalTodos.innerHTML = '';
        }else{
            totalMsg(todoid, todoDone);
        }

       // Remove clicked todo list
        document.getElementById(parent_cce).remove();
    }
});
