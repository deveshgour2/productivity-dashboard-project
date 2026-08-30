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

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    let hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = ''

    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text"  placeholder="Enter Task" value = "${savedData}">
                </div>`
    })

    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuotes() {

    var motivationQuote = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes/random')
        let data = await response.json()

        motivationQuote.innerHTML = data.quote
        motivationAuthor.innerHTML = data.author
    }
    fetchQuote()
}

motivationalQuotes()