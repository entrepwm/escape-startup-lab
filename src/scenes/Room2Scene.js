import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ROOM2_OBJECTS from "../data/room2Objects";
import ROOM2_EVIDENCE from "../data/room2Evidence";
import ROOM2_NOTEBOOK from "../data/room2Notebook";
import ROOM2_ASSESSMENT from "../data/room2Assessment";
import ROOM2_ANSWER from "../data/room2Answer";


export default class Room2Scene extends Phaser.Scene {

    constructor() {

        super("Room2Scene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        console.log(
            "Starting Room 2: Mission 02 - Opportunity Analysis"
        );


        // =================================================
        // ACHIEVEMENT STATE
        // =================================================

        this.thoroughInvestigatorEarned =
            false;


        // =================================================
        // TIMER LOCAL STATE
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
                "Room 2 could not initialize ScoreManager."
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
        // CONTINUE GLOBAL TIMER
        // =================================================

        this.startGlobalGameTimer();


        // =================================================
        // CAMERA
        // =================================================

        this.cameras.main.fadeIn(
            400
        );


        // =================================================
        // CLEANUP
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
        // SCORE MANAGER
        // =================================================

        this.scoreManager =
            this.game.scoreManager;


        if (
            !this.scoreManager
        ) {

            console.error(
                "ScoreManager not found in Room2Scene."
            );

            return;

        }


        // =================================================
        // SET CURRENT ROOM
        // =================================================

        /*
         * This resets only Room 2 notebook /
         * assessment submission state.
         *
         * The global timer must NOT reset here.
         */

        this.scoreManager.setRoom(
            2
        );


        // =================================================
        // ASSESSMENT CONFIGURATION
        // =================================================

        this.scoreManager.setAssessment(

            ROOM2_ANSWER.correctRecommendation,

            ROOM2_ANSWER.explanation

        );


        // =================================================
        // MAIN TERMINAL
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
        // EVIDENCE VIEWER
        // =================================================

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM2_EVIDENCE

            );


        // =================================================
        // NOTEBOOK VIEWER
        // =================================================

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM2_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Room 2 Notebook completed. +${points} points`
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

                ROOM2_ASSESSMENT,

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
                "Room 2 RoomView could not be created."
            );

        }

    }


    // =====================================================
    // INITIALIZE UI
    // =====================================================

    initializeUI() {

        // =================================================
        // ROOM TITLE
        // =================================================

        this.terminal.setRoom(

            "MISSION 02: OPPORTUNITY ANALYSIS\nMANAGEMENT OFFICE"

        );


        // =================================================
        // ROOM DIALOGUE
        // =================================================

        this.terminal.setDialogue(

            "Welcome to Room 2.\n" +
            "Complete your Investigation Notebook to unlock the Assessment.\n" +
            "Evidence is optional, but thorough investigation may earn additional recognition."

        );


        // =================================================
        // KEEP CURRENT GLOBAL SCORE
        // =================================================

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        // =================================================
        // GLOBAL TIMER DISPLAY
        // =================================================

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
                "RoomView not initialized."
            );

            return;

        }


        ROOM2_OBJECTS.forEach(
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
        // THIS DOES NOT RESET THE TIMER
        // =================================================

        this.scoreManager.startGameTimer();


        // =================================================
        // ALREADY EXPIRED?
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();

            return;

        }


        // =================================================
        // INITIAL DISPLAY
        // =================================================

        this.updateGlobalTimerDisplay();


        // =================================================
        // REMOVE OLD LOCAL EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // ROOM 2 LOCAL PHASER EVENT
        // =================================================

        this.globalTimerEvent =
            this.time.addEvent({

                delay:
                    1000,

                loop:
                    true,

                callback:
                    () => {

                        if (
                            this.timeExpiredHandled
                        ) {

                            return;

                        }


                        // =====================================
                        // DECREASE SHARED GLOBAL TIME
                        // =====================================

                        this.scoreManager.tickGameTimer();


                        // =====================================
                        // REFRESH HUD
                        // =====================================

                        this.updateGlobalTimerDisplay();


                        // =====================================
                        // EXPIRED
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
        // TERMINAL ONLY DISPLAYS TIME
        // =================================================

        this.terminal.setTime(
            formatted
        );


        // =================================================
        // COLOR WARNING
        // =================================================

        if (
            this.terminal.timeText
        ) {

            if (
                remaining <= 60
            ) {

                this.terminal.timeText.setColor(
                    "#ff5c5c"
                );

            }

            else if (
                remaining <= 180
            ) {

                this.terminal.timeText.setColor(
                    "#ffd166"
                );

            }

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
        // PREVENT DOUBLE TRANSITION
        // =================================================

        if (
            this.timeExpiredHandled
        ) {

            return;

        }


        this.timeExpiredHandled =
            true;


        console.log(
            "20-minute global game timer expired in Room 2."
        );


        // =================================================
        // STOP ROOM 2 CLOCK EVENT
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
        // CLOSE MODAL
        // =================================================

        if (
            this.window &&
            typeof this.window.close ===
                "function"
        ) {

            this.window.close();

        }


        // =================================================
        // FINAL RESULTS
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
            "Room 2 Assessment unlocked!"
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
        // SIDEBAR BUTTONS
        // =================================================

        this.terminal.onButtonClick(

            (id) => {

                // =================================================
                // BLOCK INPUT AFTER TIMER ENDS
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
                    // TEMPORARY DEVELOPMENT SHORTCUT
                    // =====================================

                    case "continue":

                        console.log(
                            "DEV: Skipping Room 2 → Room 3"
                        );


                        // =================================
                        // STOP ROOM 2 LOCAL CLOCK
                        // =================================

                        this.stopLocalTimerEvent();


                        // =================================
                        // ENTER ROOM 3
                        // =================================

                        this.scoreManager.setRoom(
                            3
                        );


                        this.scene.start(

                            "Room3Scene",

                            {

                                scoreManager:
                                    this.scoreManager

                            }

                        );

                        break;


                    // =====================================
                    // UNKNOWN BUTTON
                    // =====================================

                    default:

                        console.warn(
                            `Unknown sidebar button: ${id}`
                        );

                }

            }

        );


        // =================================================
        // ROOM OBJECTS
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

                "Complete and submit the Investigation Notebook first.\n\n" +
                "Evidence investigation is optional."

            );


            return;

        }


        // =================================================
        // NO EVIDENCE REQUIREMENT
        // =================================================

        /*
         * Evidence remains optional.
         *
         * Thorough Investigator is only a bonus.
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
                "ACHIEVEMENT UNLOCKED: Thorough Investigator — Room 2"
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

            "Compare what the manager believes with what customers " +
            "and the operational data actually show.\n\n" +

            "Look for patterns across interviews, surveys, reviews, " +
            "and the sales dashboard rather than relying on one source.\n\n" +

            "Evidence investigation is optional, but stronger conclusions " +
            "usually come from stronger evidence."

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
            ROOM2_OBJECTS.length;


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

            "MISSION 02: OPPORTUNITY ANALYSIS\n" +
            "MANAGEMENT OFFICE\n\n" +

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
            ROOM2_OBJECTS.find(

                obj =>
                    obj.id === id

            );


        // =================================================
        // UNKNOWN OBJECT
        // =================================================

        if (
            !object
        ) {

            console.warn(
                `Unknown Room 2 object: ${id}`
            );

            return;

        }


        console.log(
            `Room 2 object clicked: ${object.id}`
        );


        // =================================================
        // CHECK EVIDENCE
        // =================================================

        if (
            !object.evidence
        ) {

            console.warn(
                `No evidence assigned to room object: ${object.id}`
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
    // CLEANUP
    // =====================================================

    cleanupScene() {

        /*
         * Stop ONLY the Room 2 Phaser event.
         *
         * Do not reset ScoreManager's global timer.
         */

        this.stopLocalTimerEvent();

    }

}