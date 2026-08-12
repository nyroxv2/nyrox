/* =====================================================
   NYROX V3 - COMPLETE SCRIPT.JS
   Sidebar + Navigation + 7 Days Dashboard
   Targets + Progress + Streak + Day-wise Storage
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       BASIC ELEMENTS
    ================================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    const startBtn = document.querySelector(".start-btn");

    const taskList = document.getElementById("taskList");
    const addTask = document.getElementById("addTask");
    const saveButton = document.getElementById("saveProgress");

    const days = document.querySelectorAll(".week-tracker .day");

    const currentDay = document.getElementById("currentDay");
    const dayName = document.getElementById("dayName");

    const streakInput = document.getElementById("streak");

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
       HERO ANIMATION
    ================================================= */

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(40px)";

        setTimeout(() => {

            hero.style.transition = "0.8s ease";
            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";

        }, 200);

    }


    /* =================================================
       START / GET STARTED BUTTON
    ================================================= */

    if (startBtn) {

        startBtn.addEventListener("click", () => {

            const page =
                startBtn.dataset.page || "dashboard.html";

            startBtn.innerText = "Loading...";
            startBtn.disabled = true;

            setTimeout(() => {

                window.location.href = page;

            }, 700);

        });

    }


    /* =================================================
       ALL BUTTON CLICK EFFECT
    ================================================= */

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.95)";

            setTimeout(() => {

                button.style.transform = "";

            }, 150);

        });

        button.addEventListener("mousedown", event => {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            ripple.style.left = event.offsetX + "px";
            ripple.style.top = event.offsetY + "px";

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =================================================
       CARD HOVER
    ================================================= */

    const cards = document.querySelectorAll(".feature-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =================================================
       SIDEBAR LINKS + PAGE TRANSITION
    ================================================= */

    const sidebarLinks =
        document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {

                event.preventDefault();
                return;

            }

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {

                window.location.href = href;

            }, 300);

        });

    });


    /* =================================================
       PAGE ENTRY ANIMATION
    ================================================= */

    document.body.classList.add("page-enter");

    setTimeout(() => {

        document.body.classList.add("page-enter-active");

    }, 50);


    /* =================================================
       CHALLENGE BUTTONS
    ================================================= */

    const challengeButtons =
        document.querySelectorAll(".challenge-btn");

    challengeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const page = button.dataset.page;

            if (!page) return;

            button.innerText = "Opening...";
            button.disabled = true;

            const card =
                button.closest(".challenge-card");

            if (card) {

                card.classList.add("challenge-selected");

            }

            setTimeout(() => {

                window.location.href = page;

            }, 400);

        });

    });


    /* =================================================
       DASHBOARD SYSTEM
    ================================================= */

    if (!taskList || !days.length) {

        return;

    }


    /* =================================================
       SELECTED DAY
    ================================================= */

    let selectedDay =
        Number(
            localStorage.getItem("nyroxSelectedDay") || 0
        );

    if (selectedDay < 0 || selectedDay >= days.length) {

        selectedDay = 0;

    }


    /* =================================================
       STORAGE KEYS
    ================================================= */

    function getDayKey(day) {

        return "nyroxDayData_" + day;

    }


    function getDayData(day) {

        const saved =
            localStorage.getItem(getDayKey(day));

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
       GET CURRENT TARGETS
    ================================================= */

    function getCurrentTargets() {

        const rows =
            [...taskList.querySelectorAll(".target-row")];

        return rows.map(row => {

            const input =
                row.querySelector(".task-input");

            const select =
                row.querySelector(".task-status");

            return {

                text:
                    input ? input.value : "",

                status:
                    select ? select.value : "Pending",

                extra:
                    row.classList.contains("extra-target")

            };

        });

    }


    /* =================================================
       SAVE CURRENT DAY
    ================================================= */

    function saveCurrentDay() {

        const anchor =
            document.getElementById("weeklyAnchor");

        const priority =
            document.getElementById("topPriority");

        const data = {

            targets: getCurrentTargets(),

            anchor:
                anchor ? anchor.value : "",

            priority:
                priority ? priority.value : ""

        };

        localStorage.setItem(
            getDayKey(selectedDay),
            JSON.stringify(data)
        );

    }


    /* =================================================
       CREATE TARGET ROW
    ================================================= */

    function createTargetRow(
        text = "",
        status = "Pending",
        extra = false
    ) {

        const row =
            document.createElement("div");

        row.className =
            "target-row" +
            (extra ? " extra-target" : "");


        row.innerHTML = `

            <input
                type="text"
                placeholder="Target"
                class="task-input"
            >

            <select class="task-status">

                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Partial">Partial</option>
                <option value="Missed">Missed</option>

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
            row.querySelector(".task-input");

        const select =
            row.querySelector(".task-status");


        input.value = text;
        select.value = status;


        taskList.appendChild(row);

    }


    /* =================================================
       ADD TARGET
    ================================================= */

    if (addTask) {

        addTask.addEventListener("click", () => {

            createTargetRow(
                "",
                "Pending",
                true
            );

            updateProgress();

        });

    }


    /* =================================================
       REMOVE TARGET
    ================================================= */

    taskList.addEventListener("click", event => {

        const removeButton =
            event.target.closest(
                ".remove-task-btn, .remove-target"
            );

        if (!removeButton) return;

        const row =
            removeButton.closest(".target-row");

        if (!row) return;

        row.remove();

        updateProgress();

    });


    /* =================================================
       PROGRESS
    ================================================= */

    function updateProgress() {

        const statuses =
            taskList.querySelectorAll(".task-status");

        const progressFill =
            document.getElementById("progressFill");

        const progressPercent =
            document.getElementById("progressPercent");


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
                (completed / statuses.length) * 100
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


    /* =================================================
       MAKE updateProgress AVAILABLE GLOBALLY
    ================================================= */

    window.updateProgress = updateProgress;


    /* =================================================
       STATUS CHANGE
    ================================================= */

    taskList.addEventListener("change", event => {

        if (
            event.target.classList.contains(
                "task-status"
            )
        ) {

            updateProgress();

            saveCurrentDay();

            updateDayIndicators();

            calculateStreak();

        }

    });


    /* =================================================
       INPUT AUTO SAVE
    ================================================= */

    taskList.addEventListener("input", () => {

        saveCurrentDay();

    });


    const anchorInput =
        document.getElementById("weeklyAnchor");

    const priorityInput =
        document.getElementById("topPriority");


    if (anchorInput) {

        anchorInput.addEventListener(
            "input",
            saveCurrentDay
        );

    }


    if (priorityInput) {

        priorityInput.addEventListener(
            "input",
            saveCurrentDay
        );

    }


    /* =================================================
       LOAD DAY DATA
    ================================================= */

    function loadDay(day) {

        selectedDay = day;

        localStorage.setItem(
            "nyroxSelectedDay",
            String(day)
        );


        /* ---------------------------------------------
           Active Day
        --------------------------------------------- */

        days.forEach(item => {

            item.classList.remove("active");

        });


        if (days[day]) {

            days[day].classList.add("active");

        }


        /* ---------------------------------------------
           Day Number
        --------------------------------------------- */

        if (currentDay) {

            currentDay.innerText =
                String(day + 1).padStart(2, "0");

        }


        /* ---------------------------------------------
           Day Name
        --------------------------------------------- */

        if (dayName) {

            dayName.value =
                "Day " + (day + 1);

        }


        const data =
            getDayData(day);


        /* ---------------------------------------------
           TARGETS
        --------------------------------------------- */

        if (data && Array.isArray(data.targets)) {

            taskList.innerHTML = "";


            data.targets.forEach(target => {

                createTargetRow(

                    target.text || "",

                    target.status || "Pending",

                    target.extra === true

                );

            });

        }


        /*
           If there is NO saved data:

           Day 1 keeps the original HTML targets.

           Other days get 3 fresh targets.
        */

        else if (day !== 0) {

            taskList.innerHTML = "";

            createTargetRow();
            createTargetRow();
            createTargetRow();

        }


        /* ---------------------------------------------
           ANCHOR
        --------------------------------------------- */

        if (anchorInput) {

            anchorInput.value =
                data?.anchor || "";

        }


        /* ---------------------------------------------
           PRIORITY
        --------------------------------------------- */

        if (priorityInput) {

            priorityInput.value =
                data?.priority || "";

        }


        /* ---------------------------------------------
           UPDATE PROGRESS
        --------------------------------------------- */

        updateProgress();

        updateDayIndicators();

        calculateStreak();

    }


    /* =================================================
       WEEK TRACKER CLICK
    ================================================= */

    days.forEach((day, index) => {

        day.addEventListener("click", () => {

            /* Save previous day */

            saveCurrentDay();


            /* Change selected day */

            loadDay(index);

        });

    });


    /* =================================================
       SAVE BUTTON
    ================================================= */

    if (saveButton) {

        saveButton.addEventListener("click", () => {

            saveCurrentDay();

            updateProgress();

            updateDayIndicators();

            calculateStreak();


            saveButton.innerText =
                "✓ Progress Saved";


            setTimeout(() => {

                saveButton.innerText =
                    "Save Progress";

            }, 1500);

        });

    }


    /* =================================================
       DAY COMPLETION INDICATOR
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
                    target.status || "Pending"
            );


        const done =
            statuses.filter(
                status => status === "Done"
            ).length;


        return Math.round(
            (done / statuses.length) * 100
        );

    }


    function updateDayIndicators() {

        days.forEach((day, index) => {

            day.classList.remove(
                "completed",
                "partial"
            );


            const progress =
                getDayProgress(index);


            if (progress === 100) {

                day.classList.add("completed");

            }

            else if (progress > 0) {

                day.classList.add("partial");

            }

        });

    }


    /* =================================================
       STREAK
       Consecutive completed days from Day 1
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
            "nyroxStreak",
            String(streak)
        );

    }


    /* =================================================
       INITIAL LOAD
    ================================================= */

    loadDay(selectedDay);

    updateDayIndicators();

    calculateStreak();

});
