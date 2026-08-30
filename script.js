function openFeature() {
    let allElems = document.querySelectorAll(".elems")
    let FullElemPage = document.querySelectorAll('.fullElem')
    let FullElemPageBackBtn = document.querySelectorAll('.back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            FullElemPage[elem.id].style.display = 'block'
        })
    })

    FullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            FullElemPage[back.id].style.display = 'none'
        })
    })
}
openFeature();

function todoList() {

    var currentTask = []
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }
    else {
        console.log("task list is empty");

    }
    function renderTask() {

        var allTask = document.querySelector('.allTask')
        let sum = ''
        currentTask.forEach(function (elem, idx) {
            sum = sum + ` <div class="task">
                        <h5>${elem.task}
                             <span class="${elem.imp}">imp</span>
                        </h5>
                        <button id=${idx}>Mark as Completed</button>
                    </div>`
        })
        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))


        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()

            })
        })
    }
    renderTask()


    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input')
    let taskDetailInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailInput.value,
                imp: taskCheckbox.checked
            })
        renderTask();
        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailInput.value = ''
    })

}

todoList()