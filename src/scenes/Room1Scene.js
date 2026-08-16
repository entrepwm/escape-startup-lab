import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ScoreManager from "../managers/ScoreManager";

import ROOM1_OBJECTS from "../data/room1Objects";
import ROOM1_EVIDENCE from "../data/room1Evidence";
import ROOM1_NOTEBOOK from "../data/room1Notebook";
import ROOM1_ASSESSMENT from "../data/room1Assessment";
import ROOM1_ANSWER from "../data/room1Answer";


export default class Room1Scene extends Phaser.Scene {

    constructor() {

        super("Room1Scene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        console.log(
            "Starting Room 1: Mission 01 - Problem Discovery"
        );

        // =================================================
        // AUDIO
        // =================================================

        if (
            this.game.openingMusic
        ) {

            this.game.openingMusic.stop();
            this.game.openingMusic.destroy();

            this.game.openingMusic =
                null;

        }


        if (
            !this.game.gameMusic
        ) {

            this.game.gameMusic =
                this.sound.add(
                    "startup-lab-loop",
                    {
                        loop: true,
                        volume: 0.22
                    }
                );

            this.game.gameMusic.play();

        }

        // =================================================
        // ACHIEVEMENT STATE
        // =================================================

        this.thoroughInvestigatorEarned =
            false;


        // =================================================
        // GLOBAL TIMER LOCAL EVENT STATE
        // =================================================

        this.globalTimerEvent =
            null;


        this.timeExpiredHandled =
            false;


        // =================================================
        // SYSTEMS
        // =================================================

        this.createSystems();


        if (
            !this.scoreManager
        ) {

            console.error(
                "Room 1 could not initialize ScoreManager."
            );

            return;

        }


        // =================================================
        // ROOM OBJECTS
        // =================================================

        this.createRoomObjects();


        // =================================================
        // EVENTS
        // =================================================

        this.registerEvents();


        // =================================================
        // UI
        // =================================================

        this.initializeUI();


        // =================================================
        // GLOBAL 20-MINUTE TIMER
        // =================================================

        this.startGlobalGameTimer();


        // =================================================
        // CAMERA
        // =================================================

        this.cameras.main.fadeIn(
            400
        );


        // =================================================
        // CLEANUP WHEN LEAVING SCENE
        // =================================================

        this.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.cleanupScene();

            }

        );

    }


    // =====================================================
    // CREATE SYSTEMS
    // =====================================================

    createSystems() {

        // =================================================
        // ASSESSMENT TERMINAL
        // =================================================

        this.terminal =
            new AssessmentTerminal(
                this
            );


        // =================================================
        // POPUP WINDOW
        // =================================================

        this.window =
            new Window(
                this
            );


        // =================================================
        // SCORE MANAGER
        // =================================================

        const globalScoreManager =
            this.game.scoreManager;


        if (
            globalScoreManager &&
            typeof globalScoreManager.setRoom ===
                "function" &&
            typeof globalScoreManager.getScore ===
                "function" &&
            typeof globalScoreManager.setAssessment ===
                "function"
        ) {

            this.scoreManager =
                globalScoreManager;

        }

        else {

            console.warn(
                "Global ScoreManager missing or invalid. Creating a new ScoreManager."
            );


            this.scoreManager =
                new ScoreManager();


            this.game.scoreManager =
                this.scoreManager;

        }


        console.log(
            "Room 1 ScoreManager:",
            this.scoreManager
        );


        // =================================================
        // CONFIGURE ROOM 1
        // =================================================

        this.scoreManager.setRoom(
            1
        );


        this.scoreManager.setAssessment(

            ROOM1_ANSWER.correctRecommendation,

            ROOM1_ANSWER.explanation

        );


        // =================================================
        // EVIDENCE VIEWER
        // =================================================

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM1_EVIDENCE

            );


        // =================================================
        // NOTEBOOK VIEWER
        // =================================================

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM1_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Room 1 Notebook completed. +${points} points`
                    );


                    // =========================================
                    // UPDATE SCORE HUD
                    // =========================================

                    this.terminal.setScore(

                        this.scoreManager.getScore()

                    );


                    // =========================================
                    // UNLOCK ASSESSMENT
                    // =========================================

                    this.unlockAssessment();

                }

            );


        // =================================================
        // ASSESSMENT VIEWER
        // =================================================

        this.assessmentViewer =
            new AssessmentViewer(

                this,

                this.window,

                ROOM1_ASSESSMENT,

                this.scoreManager

            );


        // =================================================
        // ROOM VIEW
        // =================================================

        this.roomView =
            this.terminal.getRoomView();


        if (
            !this.roomView
        ) {

            console.error(
                "Room 1 RoomView could not be created."
            );

        }

    }


    // =====================================================
    // INITIALIZE UI
    // =====================================================

    initializeUI() {

        // =================================================
        // ROOM NAME
        // =================================================

        this.terminal.setRoom(

            "MISSION 01: PROBLEM DISCOVERY\nRESTAURANT"

        );


        // =================================================
        // DIALOGUE
        // =================================================

        this.terminal.setDialogue(

            "Welcome, Candidate.\n" +
            "Complete your Investigation Notebook to unlock the Assessment.\n" +
            "Evidence is optional, but thorough investigation may earn additional recognition."

        );


        // =================================================
        // CURRENT SCORE
        // =================================================

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        // =================================================
        // INITIAL GLOBAL TIMER DISPLAY
        // =================================================

        /*
         * Do NOT hard-code 15:00 here.
         *
         * The timer now comes from ScoreManager and lasts
         * 20 minutes across all three rooms.
         */

        this.updateGlobalTimerDisplay();


        // =================================================
        // ASSESSMENT STARTS LOCKED
        // =================================================

        this.terminal.setButtonEnabled(

            "assessment",

            false

        );

    }


    // =====================================================
    // CREATE ROOM OBJECTS
    // =====================================================

    createRoomObjects() {

        if (
            !this.roomView
        ) {

            console.error(
                "Cannot create Room 1 objects because RoomView is missing."
            );

            return;

        }


        ROOM1_OBJECTS.forEach(
            object => {

                this.roomView.addObject(
                    object
                );

            }
        );

    }


    // =====================================================
    // GLOBAL GAME TIMER
    // =====================================================

    startGlobalGameTimer() {

        if (
            !this.scoreManager ||
            typeof this.scoreManager.startGameTimer !==
                "function"
        ) {

            console.error(
                "Global timer methods are missing from ScoreManager."
            );

            return;

        }


        // =================================================
        // START ONLY ONCE
        // =================================================

        this.scoreManager.startGameTimer();


        // =================================================
        // IF TIMER WAS ALREADY EXPIRED
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();

            return;

        }


        // =================================================
        // INITIAL HUD UPDATE
        // =================================================

        this.updateGlobalTimerDisplay();


        // =================================================
        // REMOVE POSSIBLE OLD LOCAL EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // LOCAL PHASER CLOCK
        // =================================================

        /*
         * The Phaser event belongs to this scene.
         *
         * The actual remaining seconds live inside
         * ScoreManager, so changing rooms does not reset
         * the timer.
         */

        this.globalTimerEvent =
            this.time.addEvent({

                delay:
                    1000,

                loop:
                    true,

                callback:
                    () => {

                        // =====================================
                        // GLOBAL TIMER MAY ALREADY BE FINISHED
                        // =====================================

                        if (
                            this.timeExpiredHandled
                        ) {

                            return;

                        }


                        // =====================================
                        // DECREASE SHARED TIMER
                        // =====================================

                        this.scoreManager.tickGameTimer();


                        // =====================================
                        // UPDATE TERMINAL DISPLAY
                        // =====================================

                        this.updateGlobalTimerDisplay();


                        // =====================================
                        // TIME EXPIRED
                        // =====================================

                        if (
                            this.scoreManager.isTimerExpired()
                        ) {

                            this.handleGlobalTimeExpired();

                        }

                    }

            });

    }


    // =====================================================
    // UPDATE GLOBAL TIMER DISPLAY
    // =====================================================

    updateGlobalTimerDisplay() {

        if (
            !this.scoreManager ||
            !this.terminal
        ) {

            return;

        }


        if (
            typeof this.scoreManager.getFormattedTime !==
                "function"
        ) {

            return;

        }


        const remaining =
            this.scoreManager.getTimeRemaining();


        const formatted =
            this.scoreManager.getFormattedTime();


        // =================================================
        // DISPLAY ONLY
        // =================================================

        this.terminal.setTime(
            formatted
        );


        // =================================================
        // TIMER COLORS
        // =================================================

        if (
            this.terminal.timeText
        ) {

            // =============================================
            // FINAL MINUTE
            // =============================================

            if (
                remaining <= 60
            ) {

                this.terminal.timeText.setColor(
                    "#ff5c5c"
                );

            }


            // =============================================
            // FINAL THREE MINUTES
            // =============================================

            else if (
                remaining <= 180
            ) {

                this.terminal.timeText.setColor(
                    "#ffd166"
                );

            }


            // =============================================
            // NORMAL
            // =============================================

            else {

                this.terminal.timeText.setColor(
                    "#ffffff"
                );

            }

        }

    }


    // =====================================================
    // HANDLE GLOBAL TIME EXPIRED
    // =====================================================

    handleGlobalTimeExpired() {

        // =================================================
        // PREVENT MULTIPLE TRANSITIONS
        // =================================================

        if (
            this.timeExpiredHandled
        ) {

            return;

        }


        this.timeExpiredHandled =
            true;


        console.log(
            "20-minute global game timer expired in Room 1."
        );


        // =================================================
        // STOP LOCAL TIMER EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // UPDATE HUD
        // =================================================

        if (
            this.terminal
        ) {

            this.terminal.setTime(
                "00:00"
            );


            if (
                this.terminal.timeText
            ) {

                this.terminal.timeText.setColor(
                    "#ff5c5c"
                );

            }


            this.terminal.setDialogue(

                "TIME EXPIRED.\n" +
                "The Founder Assessment has ended."

            );

        }


        // =================================================
        // CLOSE MODAL IF OPEN
        // =================================================

        if (
            this.window &&
            typeof this.window.close ===
                "function"
        ) {

            this.window.close();

        }


        // =================================================
        // MOVE DIRECTLY TO FINAL RESULTS
        // =================================================

        this.scene.start(

            "FinalResultsScene",

            {

                scoreManager:
                    this.scoreManager

            }

        );

    }


    // =====================================================
    // STOP LOCAL TIMER EVENT
    // =====================================================

    stopLocalTimerEvent() {

        if (
            this.globalTimerEvent
        ) {

            this.globalTimerEvent.remove(
                false
            );


            this.globalTimerEvent =
                null;

        }

    }


    // =====================================================
    // UNLOCK ASSESSMENT
    // =====================================================

    unlockAssessment() {

        console.log(
            "Room 1 Assessment unlocked!"
        );


        this.terminal.setButtonEnabled(

            "assessment",

            true

        );


        this.terminal.setDialogue(

            "Notebook submitted.\n" +
            "Your final Assessment is now available.\n" +
            "You may still investigate additional evidence before answering."

        );

    }


    // =====================================================
    // REGISTER EVENTS
    // =====================================================

    registerEvents() {

        // =================================================
        // TERMINAL BUTTONS
        // =================================================

        this.terminal.onButtonClick(

            (id) => {

                // =================================================
                // IGNORE INPUT AFTER TIME EXPIRES
                // =================================================

                if (
                    this.timeExpiredHandled
                ) {

                    return;

                }


                switch (
                    id
                ) {


                    // =====================================
                    // NOTEBOOK
                    // =====================================

                    case "notebook":

                        this.notebookViewer.open();

                        break;


                    // =====================================
                    // ASSESSMENT
                    // =====================================

                    case "assessment":

                        this.openAssessment();

                        break;


                    // =====================================
                    // HINT
                    // =====================================

                    case "hint":

                        this.openHint();

                        break;


                    // =====================================
                    // PROGRESS
                    // =====================================

                    case "progress":

                        this.openProgress();

                        break;


                    // =====================================
                    // TEMP DEVELOPMENT CONTINUE
                    // =====================================

                    case "continue":

                        console.log(
                            "DEV: Skipping Room 1 → Room 2"
                        );


                        // =================================
                        // STOP ROOM 1 LOCAL CLOCK
                        // =================================

                        this.stopLocalTimerEvent();


                        // =================================
                        // MOVE TO ROOM 2
                        // =================================

                        this.scoreManager.setRoom(
                            2
                        );


                        this.scene.start(

                            "Room2Scene",

                            {

                                scoreManager:
                                    this.scoreManager

                            }

                        );

                        break;


                    // =====================================
                    // UNKNOWN
                    // =====================================

                    default:

                        console.warn(

                            `Unknown sidebar button: ${id}`

                        );

                }

            }

        );


        // =================================================
        // ROOM OBJECT CLICKS
        // =================================================

        if (
            !this.roomView
        ) {

            return;

        }


        this.roomView.onObjectClick(

            (id) => {

                if (
                    this.timeExpiredHandled
                ) {

                    return;

                }


                this.handleRoomObjectClick(
                    id
                );

            }

        );

    }


    // =====================================================
    // OPEN ASSESSMENT
    // =====================================================

    openAssessment() {

        // =================================================
        // TIMER CHECK
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();

            return;

        }


        // =================================================
        // ONLY REQUIREMENT:
        // NOTEBOOK MUST BE SUBMITTED
        // =================================================

        if (
            !this.scoreManager.isNotebookSubmitted()
        ) {

            this.window.open({

                title:
                    "Assessment Locked"

            });


            this.window.setContent(

                "Complete and submit the " +
                "Investigation Notebook first.\n\n" +

                "Evidence investigation is optional."

            );


            return;

        }


        // =================================================
        // NO EVIDENCE LOCK
        // =================================================

        /*
         * We intentionally DO NOT check:
         *
         * this.roomView.allObjectsInvestigated()
         *
         * Evidence is optional.
         */


        // =================================================
        // CHECK OPTIONAL ACHIEVEMENT
        // =================================================

        this.checkThoroughInvestigator();


        // =================================================
        // OPEN ASSESSMENT
        // =================================================

        this.assessmentViewer.open();

    }


    // =====================================================
    // CHECK THOROUGH INVESTIGATOR
    // =====================================================

    checkThoroughInvestigator() {

        if (
            !this.roomView ||
            typeof this.roomView.allObjectsInvestigated !==
                "function"
        ) {

            return false;

        }


        const allInvestigated =
            this.roomView
                .allObjectsInvestigated();


        if (
            allInvestigated &&
            !this.thoroughInvestigatorEarned
        ) {

            this.thoroughInvestigatorEarned =
                true;


            console.log(
                "ACHIEVEMENT UNLOCKED: Thorough Investigator — Room 1"
            );


            this.terminal.setDialogue(

                "Achievement unlocked: Thorough Investigator!\n" +
                "You examined every available source of evidence."

            );

        }


        return this.thoroughInvestigatorEarned;

    }


    // =====================================================
    // OPEN HINT
    // =====================================================

    openHint() {

        this.window.open({

            title:
                "EVA Hint"

        });


        this.window.setContent(

            "Do not rely on a single source of information.\n\n" +

            "Compare customer feedback, operational evidence, " +
            "and business assumptions before making your recommendation.\n\n" +

            "Remember: evidence investigation is optional, " +
            "but stronger recommendations usually come from stronger evidence."

        );

    }


    // =====================================================
    // OPEN PROGRESS
    // =====================================================

    openProgress() {

        const score =
            this.scoreManager.getScore();


        const timeRemaining =
            this.scoreManager.getFormattedTime();


        // =================================================
        // NOTEBOOK STATUS
        // =================================================

        const notebookStatus =
            this.scoreManager.isNotebookSubmitted()
                ? "Completed"
                : "Not Completed";


        // =================================================
        // ASSESSMENT STATUS
        // =================================================

        const assessmentStatus =
            this.scoreManager.isAssessmentSubmitted()
                ? "Completed"
                : (
                    this.scoreManager.isNotebookSubmitted()
                        ? "Unlocked"
                        : "Locked"
                );


        // =================================================
        // EVIDENCE PROGRESS
        // =================================================

        let investigatedCount =
            0;


        const totalEvidence =
            ROOM1_OBJECTS.length;


        if (
            this.roomView &&
            typeof this.roomView.getInvestigatedObjects ===
                "function"
        ) {

            investigatedCount =
                this.roomView
                    .getInvestigatedObjects()
                    .length;

        }


        // =================================================
        // ACHIEVEMENT CHECK
        // =================================================

        this.checkThoroughInvestigator();


        const achievementStatus =
            this.thoroughInvestigatorEarned
                ? "Unlocked ✓"
                : `${investigatedCount} / ${totalEvidence}`;


        // =================================================
        // WINDOW
        // =================================================

        this.window.open({

            title:
                "Mission Progress"

        });


        this.window.setContent(

            "MISSION 01: PROBLEM DISCOVERY\n" +
            "RESTAURANT\n\n" +

            `Time Remaining: ${timeRemaining}\n\n` +

            `Notebook: ${notebookStatus}\n` +

            `Assessment: ${assessmentStatus}\n` +

            `Evidence: ${investigatedCount} / ${totalEvidence}\n\n` +

            "BONUS ACHIEVEMENT\n" +

            `Thorough Investigator: ${achievementStatus}\n\n` +

            `Current Score: ${score}`

        );

    }


    // =====================================================
    // HANDLE ROOM OBJECT CLICK
    // =====================================================

    handleRoomObjectClick(
        id
    ) {

        const object =
            ROOM1_OBJECTS.find(

                item =>
                    item.id === id

            );


        // =================================================
        // UNKNOWN OBJECT
        // =================================================

        if (
            !object
        ) {

            console.warn(

                `Unknown Room 1 object: ${id}`

            );


            return;

        }


        console.log(

            `Room 1 object clicked: ${object.id}`

        );


        // =================================================
        // CHECK EVIDENCE
        // =================================================

        if (
            !object.evidence
        ) {

            console.warn(

                `No evidence assigned to Room 1 object: ${object.id}`

            );


            return;

        }


        // =================================================
        // OPEN EVIDENCE
        // =================================================

        this.evidenceViewer.openEvidence(

            object.evidence

        );


        // =================================================
        // CHECK OPTIONAL ACHIEVEMENT
        // =================================================

        this.checkThoroughInvestigator();

    }


    // =====================================================
    // CLEANUP SCENE
    // =====================================================

    cleanupScene() {

        // =================================================
        // IMPORTANT:
        //
        // Stop only the Phaser event owned by Room 1.
        //
        // DO NOT reset ScoreManager's timer.
        // =================================================

        this.stopLocalTimerEvent();

    }

}