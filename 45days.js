/* =====================================================
   NYROX — 45 DAYS COMPLETE SCRIPT
   Sidebar + Navigation
   Day-wise Storage
   Targets + Progress
   Streak
   Missed Reason
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       BASIC ELEMENTS
    ================================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    const taskList = document.getElementById("taskList");
    const addTask = document.getElementById("addTask");
    const saveButton = document.getElementById("saveProgress");

    const days =
        document.querySelectorAll(".week-tracker .day");

    const currentDay =
        document.getElementById("currentDay");

    const dayName =
        document.getElementById("dayName");

    const streakInput =
        document.getElementById("streak");

    const targetDate =
        document.getElementById("targetDate");

    const weeklyAnchor =
        document.getElementById("weeklyAnchor");

    const topPriority =
        document.getElementById("topPriority");


    /* =================================================
       SIDEBAR
    ================================================= */

    if (menuBtn && sidebar && overlay) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.add("active");
            overlay.classList.add("active");

        });

        overlay.addEventListener("click", () => {

            sidebar.classList.remove("active");
            overlay.classList.remove("active");

        });

    }


    /* =================================================
       PAGE ENTRY
    ================================================= */

    document.body.classList.add("page-enter");

    setTimeout(() => {

        document.body.classList.add(
            "page-enter-active"
        );

    }, 50);


    /* =================================================
       SIDEBAR NAVIGATION
    ================================================= */

    document.querySelectorAll(".sidebar a")
        .forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");

                if (!href || href === "#") {

                    event.preventDefault();
                    return;

                }

                event.preventDefault();

                document.body.classList.add(
                    "page-exit"
                );

                setTimeout(() => {

                    window.location.href = href;

                }, 300);

            });

        });


    /* =================================================
       BUTTON CLICK EFFECT
    ================================================= */

    document.querySelectorAll("button")
        .forEach(button => {

            button.addEventListener("click", () => {

                button.style.transform =
                    "scale(0.95)";

                setTimeout(() => {

                    button.style.transform = "";

                }, 150);

            });

        });


    /* =================================================
       DASHBOARD CHECK
    ================================================= */

    if (!taskList || !days.length) {
        return;
    }


    /* =================================================
       SELECTED DAY
    ================================================= */

    let selectedDay = Number(
        localStorage.getItem(
            "nyrox45SelectedDay"
        ) || 0
    );


    if (
        selectedDay < 0 ||
        selectedDay >= days.length
    ) {

        selectedDay = 0;

    }


    /* =================================================
       STORAGE
    ================================================= */

    function getDayKey(day) {

        return "nyrox45DayData_" + day;

    }


    function getDayData(day) {

        const saved =
            localStorage.getItem(
                getDayKey(day)
            );

        if (!saved) {
            return null;
        }

        try {

            return JSON.parse(saved);

        } catch {

            return null;

        }

    }


    /* =================================================
       CREATE MISSED REASON BOX
    ================================================= */

    function createReasonBox(row, reason = "") {

        let reasonBox =
            row.querySelector(".missed-reason");

        if (reasonBox) {

            reasonBox.value = reason;

            return;

        }


        reasonBox =
            document.createElement("textarea");

        reasonBox.className =
            "missed-reason";

        reasonBox.placeholder =
            "Why did you miss this target?";

        reasonBox.rows = 2;

        reasonBox.value = reason;


        row.appendChild(reasonBox);


        reasonBox.addEventListener(
            "input",
            () => {

                saveCurrentDay();

            }
        );

    }


    /* =================================================
       REMOVE MISSED REASON BOX
    ================================================= */

    function removeReasonBox(row) {

        const reasonBox =
            row.querySelector(
                ".missed-reason"
            );

        if (reasonBox) {

            reasonBox.remove();

        }

    }


    /* =================================================
       HANDLE STATUS
    ================================================= */

    function handleStatus(
        row,
        status,
        reason = ""
    ) {

        if (status === "Missed") {

            createReasonBox(
                row,
                reason
            );

        } else {

            removeReasonBox(row);

        }

    }


    /* =================================================
       CREATE TARGET ROW
    ================================================= */

    function createTargetRow(
        text = "",
        status = "Pending",
        extra = false,
        reason = ""
    ) {

        const row =
            document.createElement("div");


        row.className =
            "target-row" +
            (extra
                ? " extra-target"
                : ""
            );


        row.innerHTML = `

            <input
                type="text"
                placeholder="Target"
                class="task-input"
            >

            <select class="task-status">

                <option value="Pending">
                    Pending
                </option>

                <option value="Done">
                    Done
                </option>

                <option value="Partial">
                    Partial
                </option>

                <option value="Missed">
                    Missed
                </option>

            </select>

            ${
                extra
                ? `
                    <button
                        type="button"
                        class="remove-task-btn remove-target">
                        ✕
                    </button>
                `
                : ""
            }

        `;


        const input =
            row.querySelector(
                ".task-input"
            );

        const select =
            row.querySelector(
                ".task-status"
            );


        input.value = text;

        select.value = status;


        taskList.appendChild(row);


        /* Missed Reason */

        handleStatus(
            row,
            status,
            reason
        );

    }


    /* =================================================
       GET CURRENT TARGETS
    ================================================= */

    function getCurrentTargets() {

        return [
            ...taskList.querySelectorAll(
                ".target-row"
            )
        ].map(row => {

            const input =
                row.querySelector(
                    ".task-input"
                );

            const select =
                row.querySelector(
                    ".task-status"
                );

            const reasonBox =
                row.querySelector(
                    ".missed-reason"
                );


            return {

                text:
                    input
                    ? input.value
                    : "",

                status:
                    select
                    ? select.value
                    : "Pending",

                reason:
                    reasonBox
                    ? reasonBox.value
                    : "",

                extra:
                    row.classList.contains(
                        "extra-target"
                    )

            };

        });

    }


    /* =================================================
       SAVE CURRENT DAY
    ================================================= */

    function saveCurrentDay() {

        const data = {

            date:
                targetDate
                ? targetDate.value
                : "",

            day:
                dayName
                ? dayName.value
                : "Day " + (selectedDay + 1),

            anchor:
                weeklyAnchor
                ? weeklyAnchor.value
                : "",

            priority:
                topPriority
                ? topPriority.value
                : "",

            targets:
                getCurrentTargets()

        };


        localStorage.setItem(
            getDayKey(selectedDay),
            JSON.stringify(data)
        );

    }


    /* =================================================
       PROGRESS
    ================================================= */

    function updateProgress() {

        const statuses =
            taskList.querySelectorAll(
                ".task-status"
            );

        const progressFill =
            document.getElementById(
                "progressFill"
            );

        const progressPercent =
            document.getElementById(
                "progressPercent"
            );


        if (!statuses.length) {

            if (progressFill) {
                progressFill.style.width = "0%";
            }

            if (progressPercent) {
                progressPercent.innerText = "0%";
            }

            return;

        }


        let completed = 0;


        statuses.forEach(status => {

            if (status.value === "Done") {

                completed++;

            }

        });


        const percent =
            Math.round(
                (completed /
                    statuses.length) *
                    100
            );


        if (progressFill) {

            progressFill.style.width =
                percent + "%";

        }


        if (progressPercent) {

            progressPercent.innerText =
                percent + "%";

        }

    }


    window.update45DaysProgress =
        updateProgress;


    /* =================================================
       ADD TARGET
    ================================================= */

    if (addTask) {

        addTask.addEventListener(
            "click",
            () => {

                createTargetRow(
                    "",
                    "Pending",
                    true
                );

                updateProgress();

                saveCurrentDay();

            }
        );

    }


    /* =================================================
       REMOVE TARGET
    ================================================= */

    taskList.addEventListener(
        "click",
        event => {

            const removeButton =
                event.target.closest(
                    ".remove-task-btn, .remove-target"
                );


            if (!removeButton) {
                return;
            }


            const row =
                removeButton.closest(
                    ".target-row"
                );


            if (!row) {
                return;
            }


            row.remove();

            updateProgress();

            saveCurrentDay();

            updateDayIndicators();

            calculateStreak();

        }
    );


    /* =================================================
       STATUS CHANGE
    ================================================= */

    taskList.addEventListener(
        "change",
        event => {

            if (
                !event.target.classList.contains(
                    "task-status"
                )
            ) {
                return;
            }


            const select =
                event.target;

            const row =
                select.closest(
                    ".target-row"
                );


            if (!row) {
                return;
            }


            handleStatus(
                row,
                select.value
            );


            updateProgress();

            saveCurrentDay();

            updateDayIndicators();

            calculateStreak();

        }
    );


    /* =================================================
       INPUT AUTO SAVE
    ================================================= */

    taskList.addEventListener(
        "input",
        () => {

            saveCurrentDay();

        }
    );


    if (targetDate) {

        targetDate.addEventListener(
            "change",
            saveCurrentDay
        );

    }


    if (weeklyAnchor) {

        weeklyAnchor.addEventListener(
            "input",
            saveCurrentDay
        );

    }


    if (topPriority) {

        topPriority.addEventListener(
            "input",
            saveCurrentDay
        );

    }


    /* =================================================
       LOAD DAY
    ================================================= */

    function loadDay(day) {

        selectedDay = day;


        localStorage.setItem(
            "nyrox45SelectedDay",
            String(day)
        );


        /* ACTIVE DAY */

        days.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        if (days[day]) {

            days[day].classList.add(
                "active"
            );

        }


        /* CURRENT DAY NUMBER */

        if (currentDay) {

            currentDay.innerText =
                String(day + 1)
                    .padStart(2, "0");

        }


        /* DAY NAME */

        if (dayName) {

            dayName.value =
                "Day " + (day + 1);

        }


        const data =
            getDayData(day);


        /* CLEAR OLD TARGETS */

        taskList.innerHTML = "";


        /* LOAD SAVED TARGETS */

        if (
            data &&
            Array.isArray(data.targets) &&
            data.targets.length
        ) {

            data.targets.forEach(
                target => {

                    createTargetRow(

                        target.text || "",

                        target.status ||
                            "Pending",

                        target.extra === true,

                        target.reason || ""

                    );

                }
            );

        }


        /* NEW DAY */

        else {

            createTargetRow();

            createTargetRow();

            createTargetRow();

        }


        /* DATE */

        if (targetDate) {

            targetDate.value =
                data?.date || "";

        }


        /* ANCHOR */

        if (weeklyAnchor) {

            weeklyAnchor.value =
                data?.anchor || "";

        }


        /* PRIORITY */

        if (topPriority) {

            topPriority.value =
                data?.priority || "";

        }


        updateProgress();

        updateDayIndicators();

        calculateStreak();

    }


    /* =================================================
       DAY CLICK
    ================================================= */

    days.forEach(
        (day, index) => {

            day.addEventListener(
                "click",
                () => {

                    saveCurrentDay();

                    loadDay(index);

                }
            );

        }
    );


    /* =================================================
       DAY PROGRESS
    ================================================= */

    function getDayProgress(day) {

        const data =
            getDayData(day);


        if (
            !data ||
            !Array.isArray(data.targets) ||
            !data.targets.length
        ) {

            return 0;

        }


        const statuses =
            data.targets.map(
                target =>
                    target.status ||
                    "Pending"
            );


        const done =
            statuses.filter(
                status =>
                    status === "Done"
            ).length;


        return Math.round(
            (done /
                statuses.length) *
                100
        );

    }


    /* =================================================
       DAY INDICATORS
    ================================================= */

    function updateDayIndicators() {

        days.forEach(
            (day, index) => {

                day.classList.remove(
                    "completed",
                    "partial"
                );


                const progress =
                    getDayProgress(
                        index
                    );


                if (progress === 100) {

                    day.classList.add(
                        "completed"
                    );

                }

                else if (progress > 0) {

                    day.classList.add(
                        "partial"
                    );

                }

            }
        );

    }


    /* =================================================
       STREAK
    ================================================= */

    function calculateStreak() {

        let streak = 0;


        for (
            let day = 0;
            day < days.length;
            day++
        ) {

            const progress =
                getDayProgress(day);


            if (progress === 100) {

                streak++;

            }

            else {

                break;

            }

        }


        if (streakInput) {

            streakInput.value =
                streak;

        }


        localStorage.setItem(
            "nyrox45Streak",
            String(streak)
        );

    }


    /* =================================================
       SAVE BUTTON
    ================================================= */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                saveCurrentDay();

                updateProgress();

                updateDayIndicators();

                calculateStreak();


                saveButton.innerText =
                    "✓ Progress Saved";


                setTimeout(
                    () => {

                        saveButton.innerText =
                            "Save Progress";

                    },
                    1500
                );

            }
        );

    }


    /* =================================================
       INITIAL LOAD
    ================================================= */

    loadDay(selectedDay);

    updateDayIndicators();

    calculateStreak();

});