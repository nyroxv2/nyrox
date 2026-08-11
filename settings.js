/* =====================================================
   NYROX — SETTINGS COMPLETE JS
   Profile + Dark Mode + Reminder + Streak
   Save + Individual Challenge Reset + Reset All
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       SIDEBAR
    ================================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");

            if (overlay) {
                overlay.classList.toggle("active");
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }


    /* =================================================
       SIDEBAR NAVIGATION
    ================================================= */

    document.querySelectorAll(".sidebar a").forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                return;
            }

            event.preventDefault();

            if (sidebar) {
                sidebar.classList.remove("active");
            }

            if (overlay) {
                overlay.classList.remove("active");
            }

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 250);

        });

    });


    /* =================================================
       SETTINGS ELEMENTS
    ================================================= */

    const userName = document.getElementById("userName");
    const userGoal = document.getElementById("userGoal");

    const darkMode = document.getElementById("darkMode");
    const dailyReminder = document.getElementById("dailyReminder");
    const showStreak = document.getElementById("showStreak");

    const saveSettings = document.getElementById("saveSettings");


    /* =================================================
       RESET BUTTONS
    ================================================= */

    const reset7Days = document.getElementById("reset7Days");
    const reset21Days = document.getElementById("reset21Days");
    const reset30Days = document.getElementById("reset30Days");
    const reset45Days = document.getElementById("reset45Days");
    const reset90Days = document.getElementById("reset90Days");

    const resetAllChallenges =
        document.getElementById("resetAllChallenges");


    /* =================================================
       CHALLENGE CONFIG
    ================================================= */

    const challenges = {

        "7": {
            prefixes: [
                "nyroxDayData_"
            ],
            selected: [
                "nyroxSelectedDay"
            ],
            streak: [
                "nyroxStreak"
            ],
            days: 7
        },

        "21": {
            prefixes: [
                "nyrox21DayData_"
            ],
            selected: [
                "nyrox21SelectedDay"
            ],
            streak: [
                "nyrox21Streak"
            ],
            days: 21
        },

        "30": {
            prefixes: [
                "nyrox30DayData_"
            ],
            selected: [
                "nyrox30SelectedDay"
            ],
            streak: [
                "nyrox30Streak"
            ],
            days: 30
        },

        "45": {
            prefixes: [
                "nyrox45DayData_"
            ],
            selected: [
                "nyrox45SelectedDay"
            ],
            streak: [
                "nyrox45Streak"
            ],
            days: 45
        },

        "90": {
            prefixes: [
                "nyrox90DayData_"
            ],
            selected: [
                "nyrox90SelectedDay"
            ],
            streak: [
                "nyrox90Streak"
            ],
            days: 90
        }

    };


    /* =================================================
       DARK MODE
    ================================================= */

    function applyDarkMode() {

        const enabled = darkMode
            ? darkMode.checked
            : true;

        document.body.classList.toggle(
            "dark-mode",
            enabled
        );

        document.body.classList.toggle(
            "light-mode",
            !enabled
        );
    }


    /* =================================================
       LOAD SETTINGS
    ================================================= */

    function loadSettings() {

        /* NAME */

        if (userName) {

            userName.value =
                localStorage.getItem(
                    "nyroxUserName"
                ) || "";

        }


        /* GOAL */

        if (userGoal) {

            userGoal.value =
                localStorage.getItem(
                    "nyroxUserGoal"
                ) || "";

        }


        /* DARK MODE */

        if (darkMode) {

            const saved =
                localStorage.getItem(
                    "nyroxDarkMode"
                );

            if (saved === null) {

                darkMode.checked = true;

            } else {

                darkMode.checked =
                    saved === "true";

            }

            applyDarkMode();
        }


        /* DAILY REMINDER */

        if (dailyReminder) {

            dailyReminder.checked =
                localStorage.getItem(
                    "nyroxDailyReminder"
                ) === "true";

        }


        /* SHOW STREAK */

        if (showStreak) {

            const saved =
                localStorage.getItem(
                    "nyroxShowStreak"
                );

            if (saved === null) {

                showStreak.checked = true;

            } else {

                showStreak.checked =
                    saved === "true";

            }

        }

    }


    /* =================================================
       SAVE SETTINGS
    ================================================= */

    function saveAllSettings() {

        if (userName) {

            localStorage.setItem(
                "nyroxUserName",
                userName.value.trim()
            );

        }

        if (userGoal) {

            localStorage.setItem(
                "nyroxUserGoal",
                userGoal.value.trim()
            );

        }

        if (darkMode) {

            localStorage.setItem(
                "nyroxDarkMode",
                String(darkMode.checked)
            );

        }

        if (dailyReminder) {

            localStorage.setItem(
                "nyroxDailyReminder",
                String(dailyReminder.checked)
            );

        }

        if (showStreak) {

            localStorage.setItem(
                "nyroxShowStreak",
                String(showStreak.checked)
            );

        }

    }


    /* =================================================
       SAVE BUTTON
    ================================================= */

    if (saveSettings) {

        saveSettings.addEventListener(
            "click",
            () => {

                saveAllSettings();
                applyDarkMode();

                const oldText =
                    saveSettings.innerHTML;

                saveSettings.innerHTML =
                    "✓ &nbsp; SETTINGS SAVED";

                setTimeout(() => {

                    saveSettings.innerHTML =
                        oldText;

                }, 1500);

            }
        );

    }


    /* =================================================
       PROFILE AUTO SAVE
    ================================================= */

    if (userName) {

        userName.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    "nyroxUserName",
                    userName.value
                );

            }
        );

    }


    if (userGoal) {

        userGoal.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    "nyroxUserGoal",
                    userGoal.value
                );

            }
        );

    }


    /* =================================================
       DARK MODE
    ================================================= */

    if (darkMode) {

        darkMode.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "nyroxDarkMode",
                    String(darkMode.checked)
                );

                applyDarkMode();

            }
        );

    }


    /* =================================================
       DAILY REMINDER
    ================================================= */

    if (dailyReminder) {

        dailyReminder.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "nyroxDailyReminder",
                    String(
                        dailyReminder.checked
                    )
                );

            }
        );

    }


    /* =================================================
       SHOW STREAK
    ================================================= */

    if (showStreak) {

        showStreak.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "nyroxShowStreak",
                    String(
                        showStreak.checked
                    )
                );

            }
        );

    }


    /* =================================================
       RESET SINGLE CHALLENGE
    ================================================= */

    function resetChallenge(number) {

        const challenge =
            challenges[number];

        if (!challenge) {
            return;
        }


        const confirmed = confirm(

            `Reset ${number} Days challenge?\n\n` +

            `All progress and targets from ` +
            `${number} Days will be deleted.\n\n` +

            `Other challenges and Settings ` +
            `will remain safe.`

        );


        if (!confirmed) {
            return;
        }


        /* DELETE DAY DATA */

        challenge.prefixes.forEach(prefix => {

            for (
                let i = 0;
                i < challenge.days;
                i++
            ) {

                localStorage.removeItem(
                    prefix + i
                );

            }

        });


        /* DELETE SELECTED DAY */

        challenge.selected.forEach(key => {

            localStorage.removeItem(key);

        });


        /* DELETE STREAK */

        challenge.streak.forEach(key => {

            localStorage.removeItem(key);

        });


        alert(
            `✓ ${number} Days challenge reset successfully.`
        );

    }


    /* =================================================
       RESET BUTTON EVENTS
    ================================================= */

    if (reset7Days) {

        reset7Days.addEventListener(
            "click",
            () => resetChallenge("7")
        );

    }


    if (reset21Days) {

        reset21Days.addEventListener(
            "click",
            () => resetChallenge("21")
        );

    }


    if (reset30Days) {

        reset30Days.addEventListener(
            "click",
            () => resetChallenge("30")
        );

    }


    if (reset45Days) {

        reset45Days.addEventListener(
            "click",
            () => resetChallenge("45")
        );

    }


    if (reset90Days) {

        reset90Days.addEventListener(
            "click",
            () => resetChallenge("90")
        );

    }


    /* =================================================
       RESET ALL CHALLENGES
    ================================================= */

    if (resetAllChallenges) {

        resetAllChallenges.addEventListener(
            "click",
            () => {

                const confirmed = confirm(

                    "⚠ RESET ALL CHALLENGES?\n\n" +

                    "This will delete all progress from:\n" +
                    "• 7 Days\n" +
                    "• 21 Days\n" +
                    "• 30 Days\n" +
                    "• 45 Days\n" +
                    "• 90 Days\n\n" +

                    "Your Settings will remain safe."

                );


                if (!confirmed) {
                    return;
                }


                const finalConfirm = confirm(

                    "Are you absolutely sure?\n\n" +

                    "All challenge progress will be deleted."

                );


                if (!finalConfirm) {
                    return;
                }


                /* DELETE ALL CHALLENGES */

                Object.values(challenges)
                    .forEach(challenge => {

                        challenge.prefixes.forEach(
                            prefix => {

                                for (
                                    let i = 0;
                                    i < challenge.days;
                                    i++
                                ) {

                                    localStorage.removeItem(
                                        prefix + i
                                    );

                                }

                            }
                        );


                        challenge.selected.forEach(
                            key => {

                                localStorage.removeItem(
                                    key
                                );

                            }
                        );


                        challenge.streak.forEach(
                            key => {

                                localStorage.removeItem(
                                    key
                                );

                            }
                        );

                    });


                alert(
                    "✓ All NYROX challenge data has been reset."
                );

            }
        );

    }


    /* =================================================
       BUTTON PRESS EFFECT
    ================================================= */

    document.querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "pointerdown",
                () => {

                    button.style.transform =
                        "scale(0.97)";

                }
            );


            button.addEventListener(
                "pointerup",
                () => {

                    setTimeout(() => {

                        button.style.transform =
                            "";

                    }, 100);

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

    });


    /* =================================================
       PAGE ENTRY
    ================================================= */

    document.body.classList.add(
        "page-enter"
    );

    setTimeout(() => {

        document.body.classList.add(
            "page-enter-active"
        );

    }, 50);


    /* =================================================
       INITIAL LOAD
    ================================================= */

    loadSettings();

});