const RESULTS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwa9HWG-_lHdf1DeeyspjtNSY66NsgznrhEnUI_g81V5pDxvaYGS2376K1isj81QP8H/exec";


export default class CompetitionResultsService {

    // =====================================================
    // SUBMIT RESULT
    // =====================================================

    static async submit(
        scoreManager
    ) {

        // =================================================
        // VALIDATE SCORE MANAGER
        // =================================================

        if (
            !scoreManager
        ) {

            throw new Error(
                "ScoreManager is missing."
            );

        }


        // =================================================
        // VALIDATE ENDPOINT
        // =================================================

        if (
            !RESULTS_ENDPOINT ||
            RESULTS_ENDPOINT.includes(
                "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
            )
        ) {

            throw new Error(
                "CompetitionResultsService: Google Apps Script endpoint has not been configured."
            );

        }


        // =================================================
        // PREVENT DUPLICATE SUBMISSION
        // =================================================

        if (
            typeof scoreManager.hasResultBeenSubmitted ===
                "function" &&
            scoreManager.hasResultBeenSubmitted()
        ) {

            console.log(
                "Competition result already submitted."
            );


            return {

                submitted:
                    false,

                alreadySubmitted:
                    true

            };

        }


        // =================================================
        // GET RESULT
        // =================================================

        if (
            typeof scoreManager.getCompetitionResult !==
                "function"
        ) {

            throw new Error(
                "ScoreManager does not provide getCompetitionResult()."
            );

        }


        const result =
            scoreManager.getCompetitionResult();


        // =================================================
        // VALIDATE TEAM
        // =================================================

        const teamName =
            String(
                result.teamName || ""
            ).trim();


        if (
            !teamName
        ) {

            throw new Error(
                "Cannot submit competition result without a team name."
            );

        }


        // =================================================
        // BUILD PAYLOAD
        // =================================================

        const payload = {

            ...result,

            teamName,

            submittedAt:
                new Date().toISOString(),

            source:
                "Escape Startup Lab"

        };


        console.log(

            "Submitting competition result:",

            payload

        );


        // =================================================
        // FORM DATA
        // =================================================

        const formData =
            new URLSearchParams();


        Object.entries(
            payload
        ).forEach(

            ([key, value]) => {

                formData.append(

                    key,

                    String(
                        value ?? ""
                    )

                );

            }

        );


        // =================================================
        // ABORT CONTROLLER
        // =================================================

        const controller =
            new AbortController();


        const timeout =
            setTimeout(

                () => {

                    controller.abort();

                },

                10000

            );


        // =================================================
        // SEND TO GOOGLE APPS SCRIPT
        // =================================================

        try {

            await fetch(

                RESULTS_ENDPOINT,

                {

                    method:
                        "POST",

                    mode:
                        "no-cors",

                    headers: {

                        "Content-Type":
                            "application/x-www-form-urlencoded"

                    },

                    body:
                        formData.toString(),

                    signal:
                        controller.signal

                }

            );


            clearTimeout(
                timeout
            );


            // =================================================
            // MARK THIS RUN AS SENT
            // =================================================

            if (
                typeof scoreManager.markResultSubmitted ===
                    "function"
            ) {

                scoreManager.markResultSubmitted();

            }


            // =================================================
            // LOCAL BACKUP
            // =================================================

            this.saveLocalBackup(
                payload
            );


            console.log(
                "Competition result was sent to the results endpoint."
            );


            return {

                submitted:
                    true,

                runId:
                    result.runId,

                teamName:
                    teamName

            };

        }

        catch (
            error
        ) {

            clearTimeout(
                timeout
            );


            // =================================================
            // LOCAL BACKUP EVEN IF NETWORK FAILS
            // =================================================

            this.saveLocalBackup(
                {

                    ...payload,

                    submissionFailed:
                        true

                }

            );


            if (
                error.name ===
                "AbortError"
            ) {

                throw new Error(
                    "Competition result submission timed out."
                );

            }


            throw error;

        }

    }


    // =====================================================
    // LOCAL BACKUP
    // =====================================================

    static saveLocalBackup(
        result
    ) {

        try {

            const storageKey =
                "escapeStartupLabResults";


            const existing =
                JSON.parse(

                    localStorage.getItem(
                        storageKey
                    ) || "[]"

                );


            // =================================================
            // DON'T DUPLICATE THE SAME RUN
            // =================================================

            const duplicate =
                existing.some(

                    item =>
                        item.runId ===
                        result.runId

                );


            if (
                duplicate
            ) {

                return;

            }


            existing.push(
                result
            );


            localStorage.setItem(

                storageKey,

                JSON.stringify(
                    existing
                )

            );


            console.log(
                "Competition result backed up locally."
            );

        }

        catch (
            error
        ) {

            console.warn(

                "Could not create local result backup:",

                error

            );

        }

    }


    // =====================================================
    // GET LOCAL RESULTS
    // =====================================================

    static getLocalBackups() {

        try {

            return JSON.parse(

                localStorage.getItem(
                    "escapeStartupLabResults"
                ) || "[]"

            );

        }

        catch (
            error
        ) {

            console.warn(
                "Could not read local result backups."
            );


            return [];

        }

    }


    // =====================================================
    // CLEAR LOCAL RESULTS
    // =====================================================

    static clearLocalBackups() {

        try {

            localStorage.removeItem(
                "escapeStartupLabResults"
            );


            console.log(
                "Local competition backups cleared."
            );

        }

        catch (
            error
        ) {

            console.warn(
                "Could not clear local result backups."
            );

        }

    }

}