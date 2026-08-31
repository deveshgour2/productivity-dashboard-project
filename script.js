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

function pomodoro() {

    let timer = document.querySelector('.pomodoro-timer h1')
    let startBtn = document.querySelector('.pomodoro-timer .start')
    let pauseBtn = document.querySelector('.pomodoro-timer .pause')
    let resetBtn = document.querySelector('.pomodoro-timer .reset')
    let session = document.querySelector('.pomodoro-timer-fullpage .session')

    let timeInterval = null
    let totalSeconds = 25 * 60
    let isWorkSession = true

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timeInterval)

        if (isWorkSession) {

            timeInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }
                else {
                    isWorkSession = false
                    clearInterval(timeInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Break Session'
                    session.style.backgroundColor = 'blue'
                    totalSeconds = 5 * 60
                }
            }, 1000);
        }
        else {
            timeInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }
                else {
                    isWorkSession = true
                    clearInterval(timeInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'green'
                    totalSeconds = 25 * 60;
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timeInterval)
    }

    function resetTimer() {
        clearInterval(timeInterval)
        if (isWorkSession === true) {
            totalSeconds = 25 * 60
        }
        else {
            totalSeconds = 5 * 60
        }
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)


}

pomodoro()

function weather() {

    let header1Time = document.querySelector('.header1 h1')
    let header1Date = document.querySelector('.header1 h2')
    let header1City = document.querySelector('.header1 h4')
    let header2Temp = document.querySelector('.header2 h2')
    let forecast = document.querySelector('.header2 h4')
    let heat = document.querySelector('.header2 .heat')
    let humidity = document.querySelector('.header2 .humidity')
    let wind = document.querySelector('.header2 .wind')


    let city = 'Indore'
    let apiKey = null
    let data = null


    async function weatherAPI() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()
        console.log(data);

        header1City.innerHTML = `${data.location.name} (${data.location.region})`
        header2Temp.innerHTML = `${data.current.temp_c}°C`
        forecast.innerHTML = `${data.current.condition.text}`
        heat.innerHTML = `Heat Index:${data.current.heatindex_c}°C`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        wind.innerHTML = `Wind: ${data.current.wind_kph}Km/h`
    }
    weatherAPI()

    function getTime() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const totalMonths = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var day = daysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = totalMonths[date.getMonth()]
        var year = date.getFullYear()

        if (hours > 12) {
            header1Time.innerHTML = `${day}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
        }
        else {
            header1Time.innerHTML = `${day}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }

        header1Date.innerHTML = `${tarik} ${month} ${year}`


    }
    setInterval(() => {
        getTime()
    }, 1000);
}
weather()
