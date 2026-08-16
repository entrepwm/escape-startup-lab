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
        // SYSTEMS
        // =================================================

        this.createSystems();


        if (!this.scoreManager) {

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
        // CAMERA
        // =================================================

        this.cameras.main.fadeIn(
            400
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
            typeof globalScoreManager.setRoom === "function" &&
            typeof globalScoreManager.getScore === "function" &&
            typeof globalScoreManager.setAssessment === "function"
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


                    // -----------------------------------------
                    // UPDATE SCORE HUD
                    // -----------------------------------------

                    this.terminal.setScore(

                        this.scoreManager.getScore()

                    );


                    // -----------------------------------------
                    // UNLOCK ASSESSMENT
                    // -----------------------------------------

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


        if (!this.roomView) {

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
            "Investigate every object before completing your assessment."

        );


        // =================================================
        // CURRENT GLOBAL SCORE
        // =================================================

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        // =================================================
        // TIMER
        // =================================================

        this.terminal.setTime(
            "15:00"
        );


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

        if (!this.roomView) {

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

            "Investigation complete.\n" +
            "Your final assessment is now available."

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

                switch (id) {

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



                    // -----------------------------------------
                    // TEMP DEV CONTINUE
                    // -----------------------------------------

                    case "continue":

                        console.log(
                            "DEV: Skipping Room 1 → Room 2"
                        );

                        this.scoreManager.setRoom(2);

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

        if (!this.roomView) {

            return;

        }


        this.roomView.onObjectClick(

            (id) => {

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
                "Investigation Notebook first."

            );


            return;

        }


        // =================================================
        // OPTIONAL OBJECT CHECK
        // =================================================

        if (
            this.roomView &&
            typeof this.roomView.allObjectsInvestigated ===
                "function" &&
            !this.roomView.allObjectsInvestigated()
        ) {

            this.window.open({

                title:
                    "Assessment Locked"

            });


            this.window.setContent(

                "Investigate all objects in the room " +
                "before completing the assessment."

            );


            return;

        }


        // =================================================
        // OPEN ASSESSMENT
        // =================================================

        this.assessmentViewer.open();

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
            "and business assumptions before making your recommendation."

        );

    }


    // =====================================================
    // OPEN PROGRESS
    // =====================================================

    openProgress() {

        const score =
            this.scoreManager.getScore();


        const notebookStatus =
            this.scoreManager.isNotebookSubmitted()
                ? "Completed"
                : "Not Completed";


        const assessmentStatus =
            this.scoreManager.isAssessmentSubmitted()
                ? "Completed"
                : "Not Completed";


        this.window.open({

            title:
                "Mission Progress"

        });


        this.window.setContent(

            "MISSION 01: PROBLEM DISCOVERY\n" +
            "RESTAURANT\n\n" +

            `Notebook: ${notebookStatus}\n` +

            `Assessment: ${assessmentStatus}\n\n` +

            `Current Score: ${score}`

        );

    }


    // =====================================================
    // HANDLE ROOM OBJECT CLICK
    // =====================================================

    handleRoomObjectClick(id) {

        const object =
            ROOM1_OBJECTS.find(

                item =>
                    item.id === id

            );


        // =================================================
        // UNKNOWN OBJECT
        // =================================================

        if (!object) {

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

        if (!object.evidence) {

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

    }

}