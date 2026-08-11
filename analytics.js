/* =====================================================
   NYROX — ANALYTICS COMPLETE SCRIPT
   Reads data from:
   7 Days
   21 Days
   30 Days
   45 Days
   90 Days

   Features:
   - Sidebar
   - Navigation
   - Overall statistics
   - Completion rate
   - Challenge-wise progress
   - Current streak
   - Best streak
   - Status breakdown
   - Missed target reasons
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       SIDEBAR
    ================================================= */

    const menuBtn =
        document.querySelector(".menu-btn");

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".overlay");


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

                    window.location.href =
                        href;

                }, 300);

            });

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
       BASIC ELEMENTS
    ================================================= */

    const refreshButton =
        document.getElementById(
            "refreshAnalytics"
        );


    /* =================================================
       CHALLENGE CONFIG
    ================================================= */

    const challenges = [

        {
            name: "7 Days",
            prefix: "nyroxDayData_",
            selectedKey: "nyroxSelectedDay",
            streakKey: "nyroxStreak",
            progressId: "progress7",
            fillId: "fill7",
            days: 7
        },

        {
            name: "21 Days",
            prefix: "nyrox21DayData_",
            selectedKey: "nyrox21SelectedDay",
            streakKey: "nyrox21Streak",
            progressId: "progress21",
            fillId: "fill21",
            days: 21
        },

        {
            name: "30 Days",
            prefix: "nyrox30DayData_",
            selectedKey: "nyrox30SelectedDay",
            streakKey: "nyrox30Streak",
            progressId: "progress30",
            fillId: "fill30",
            days: 30
        },

        {
            name: "45 Days",
            prefix: "nyrox45DayData_",
            selectedKey: "nyrox45SelectedDay",
            streakKey: "nyrox45Streak",
            progressId: "progress45",
            fillId: "fill45",
            days: 45
        },

        {
            name: "90 Days",
            prefix: "nyrox90DayData_",
            selectedKey: "nyrox90SelectedDay",
            streakKey: "nyrox90Streak",
            progressId: "progress90",
            fillId: "fill90",
            days: 90
        }

    ];


    /* =================================================
       GET CHALLENGE DATA
    ================================================= */

    function getChallengeData(challenge) {

        const result = [];


        for (
            let day = 0;
            day < challenge.days;
            day++
        ) {

            const saved =
                localStorage.getItem(
                    challenge.prefix + day
                );


            if (!saved) {

                continue;

            }


            try {

                const data =
                    JSON.parse(saved);


                if (data) {

                    result.push({

                        day: day,

                        data: data

                    });

                }

            }

            catch {

                continue;

            }

        }


        return result;

    }


    /* =================================================
       GET ALL TARGETS
    ================================================= */

    function getAllTargets() {

        const allTargets = [];


        challenges.forEach(
            challenge => {

                const days =
                    getChallengeData(
                        challenge
                    );


                days.forEach(item => {

                    if (
                        item.data &&
                        Array.isArray(
                            item.data.targets
                        )
                    ) {

                        item.data.targets.forEach(
                            target => {

                                allTargets.push({

                                    challenge:
                                        challenge.name,

                                    day:
                                        item.day + 1,

                                    target:
                                        target

                                });

                            }
                        );

                    }

                });

            }
        );


        return allTargets;

    }


    /* =================================================
       CALCULATE STATS
    ================================================= */

    function calculateStats() {

        const targets =
            getAllTargets();


        let done = 0;

        let partial = 0;

        let missed = 0;

        let pending = 0;


        targets.forEach(item => {

            const status =
                item.target.status ||
                "Pending";


            if (status === "Done") {

                done++;

            }

            else if (status === "Partial") {

                partial++;

            }

            else if (status === "Missed") {

                missed++;

            }

            else {

                pending++;

            }

        });


        const total =
            targets.length;


        const completion =
            total > 0
            ? Math.round(
                (done / total) * 100
            )
            : 0;


        return {

            total,

            done,

            partial,

            missed,

            pending,

            completion

        };

    }


    /* =================================================
       UPDATE OVERALL STATS
    ================================================= */

    function updateOverallStats() {

        const stats =
            calculateStats();


        const totalDone =
            document.getElementById(
                "totalDone"
            );

        const totalPartial =
            document.getElementById(
                "totalPartial"
            );

        const totalMissed =
            document.getElementById(
                "totalMissed"
            );

        const totalPending =
            document.getElementById(
                "totalPending"
            );

        const totalTargets =
            document.getElementById(
                "totalTargets"
            );

        const completionNumber =
            document.getElementById(
                "completionNumber"
            );

        const completionRate =
            document.getElementById(
                "completionRate"
            );

        const overallFill =
            document.getElementById(
                "overallProgressFill"
            );


        if (totalDone) {

            totalDone.value =
                stats.done;

        }


        if (totalPartial) {

            totalPartial.value =
                stats.partial;

        }


        if (totalMissed) {

            totalMissed.value =
                stats.missed;

        }


        if (totalPending) {

            totalPending.value =
                stats.pending;

        }


        if (totalTargets) {

            totalTargets.value =
                stats.total;

        }


        if (completionNumber) {

            completionNumber.value =
                stats.completion;

        }


        if (completionRate) {

            completionRate.innerText =
                stats.completion + "%";

        }


        if (overallFill) {

            overallFill.style.width =
                stats.completion + "%";

        }


        /* Breakdown */

        const breakdownDone =
            document.getElementById(
                "breakdownDone"
            );

        const breakdownPartial =
            document.getElementById(
                "breakdownPartial"
            );

        const breakdownMissed =
            document.getElementById(
                "breakdownMissed"
            );

        const breakdownPending =
            document.getElementById(
                "breakdownPending"
            );


        if (breakdownDone) {

            breakdownDone.innerText =
                stats.done;

        }


        if (breakdownPartial) {

            breakdownPartial.innerText =
                stats.partial;

        }


        if (breakdownMissed) {

            breakdownMissed.innerText =
                stats.missed;

        }


        if (breakdownPending) {

            breakdownPending.innerText =
                stats.pending;

        }

    }


    /* =================================================
       CHALLENGE PROGRESS
    ================================================= */

    function getChallengeProgress(
        challenge
    ) {

        const days =
            getChallengeData(
                challenge
            );


        let total = 0;

        let done = 0;


        days.forEach(item => {

            if (
                !item.data ||
                !Array.isArray(
                    item.data.targets
                )
            ) {

                return;

            }


            item.data.targets.forEach(
                target => {

                    total++;


                    if (
                        target.status ===
                        "Done"
                    ) {

                        done++;

                    }

                }
            );

        });


        if (total === 0) {

            return 0;

        }


        return Math.round(
            (done / total) * 100
        );

    }


    function updateChallengeProgress() {

        challenges.forEach(
            challenge => {

                const progress =
                    getChallengeProgress(
                        challenge
                    );


                const progressElement =
                    document.getElementById(
                        challenge.progressId
                    );


                const fillElement =
                    document.getElementById(
                        challenge.fillId
                    );


                if (progressElement) {

                    progressElement.innerText =
                        progress + "%";

                }


                if (fillElement) {

                    fillElement.style.width =
                        progress + "%";

                }

            }
        );

    }


    /* =================================================
       STREAK
    ================================================= */

    function calculateCurrentStreak() {

        let current = 0;


        challenges.forEach(
            challenge => {

                const saved =
                    localStorage.getItem(
                        challenge.streakKey
                    );


                if (saved) {

                    const value =
                        Number(saved);


                    if (
                        value > current
                    ) {

                        current = value;

                    }

                }

            }
        );


        return current;

    }


    function calculateBestStreak() {

        let best = 0;


        challenges.forEach(
            challenge => {

                const days =
                    getChallengeData(
                        challenge
                    );


                let streak = 0;

                let bestLocal = 0;


                for (
                    let day = 0;
                    day < challenge.days;
                    day++
                ) {

                    const found =
                        days.find(
                            item =>
                                item.day === day
                        );


                    if (
                        found &&
                        found.data &&
                        Array.isArray(
                            found.data.targets
                        ) &&
                        found.data.targets.length
                    ) {

                        const allDone =
                            found.data.targets.every(
                                target =>
                                    target.status ===
                                    "Done"
                            );


                        if (allDone) {

                            streak++;


                            if (
                                streak >
                                bestLocal
                            ) {

                                bestLocal =
                                    streak;

                            }

                        }

                        else {

                            streak = 0;

                        }

                    }

                    else {

                        streak = 0;

                    }

                }


                if (
                    bestLocal > best
                ) {

                    best =
                        bestLocal;

                }

            }
        );


        return best;

    }


    function updateStreak() {

        const current =
            calculateCurrentStreak();


        const best =
            calculateBestStreak();


        const currentElement =
            document.getElementById(
                "currentStreak"
            );


        const bestElement =
            document.getElementById(
                "bestStreak"
            );


        if (currentElement) {

            currentElement.value =
                current;

        }


        if (bestElement) {

            bestElement.value =
                best;

        }

    }


    /* =================================================
       MISSED REASONS
    ================================================= */

    function updateMissedReasons() {

        const container =
            document.getElementById(
                "missedReasons"
            );


        if (!container) {

            return;

        }


        container.innerHTML = "";


        const targets =
            getAllTargets();


        const missed =
            targets.filter(
                item =>
                    item.target.status ===
                    "Missed"
            );


        if (!missed.length) {

            const empty =
                document.createElement(
                    "p"
                );


            empty.innerText =
                "No missed targets yet.";


            container.appendChild(
                empty
            );


            return;

        }


        missed.forEach(item => {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "analytics-missed-item";


            const title =
                document.createElement(
                    "h3"
                );


            title.innerText =
                `${item.challenge} — Day ${item.day}`;


            const targetText =
                document.createElement(
                    "p"
                );


            targetText.innerText =
                "Target: " +
                (
                    item.target.text ||
                    "Unnamed Target"
                );


            const reason =
                document.createElement(
                    "p"
                );


            reason.innerText =
                "Reason: " +
                (
                    item.target.reason ||
                    "No reason provided."
                );


            box.appendChild(
                title
            );


            box.appendChild(
                targetText
            );


            box.appendChild(
                reason
            );


            container.appendChild(
                box
            );

        });

    }


    /* =================================================
       REFRESH EVERYTHING
    ================================================= */

    function refreshAnalytics() {

        updateOverallStats();

        updateChallengeProgress();

        updateStreak();

        updateMissedReasons();

    }


    /* =================================================
       REFRESH BUTTON
    ================================================= */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                refreshAnalytics();


                refreshButton.innerText =
                    "✓ Analytics Updated";


                setTimeout(() => {

                    refreshButton.innerText =
                        "↻ Refresh Analytics";

                }, 1500);

            }
        );

    }


    /* =================================================
       BUTTON EFFECT
    ================================================= */

    document.querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.style.transform =
                        "scale(0.95)";


                    setTimeout(() => {

                        button.style.transform =
                            "";

                    }, 150);

                }
            );

        });


    /* =================================================
       INITIAL LOAD
    ================================================= */

    refreshAnalytics();

});