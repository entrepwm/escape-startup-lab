import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";
import RoomView from "../ui/RoomView";

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

        this.createSystems();

        this.createRoomObjects();

        this.registerEvents();

        this.initializeUI();

    }


    // =====================================================
    // CREATE SYSTEMS
    // =====================================================

    createSystems() {

        // =================================================
        // SCORE MANAGER
        // =================================================

        this.scoreManager = this.game.scoreManager;

        if (!this.scoreManager) {

            console.error(
                "ScoreManager not found in Room2Scene."
            );

            return;

        }


        // =================================================
        // SET CURRENT ROOM
        // =================================================

        this.scoreManager.setRoom(2);


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
            new AssessmentTerminal(this);


        // =================================================
        // POPUP WINDOW
        // =================================================

        this.window =
            new Window(this);


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


                    // Update HUD with current total score
                    this.terminal.setScore(
                        this.scoreManager.getScore()
                    );


                    // Unlock assessment
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

    }


    // =====================================================
    // INITIAL UI
    // =====================================================

    initializeUI() {

        // Room title
        this.terminal.setRoom(
            "MISSION 02: OPPORTUNITY ANALYSIS\nMANAGEMENT OFFICE"
        );


        // Room dialogue
        this.terminal.setDialogue(

            "Welcome to Room 2.\n" +
            "Investigate the customer experience carefully. " +
            "Not every business assumption is supported by the " +
            "evidence."

        );


        // =================================================
        // IMPORTANT:
        // DO NOT RESET SCORE TO ZERO
        // =================================================

        this.terminal.setScore(
            this.scoreManager.getScore()
        );


        // Room timer
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
                "RoomView not initialized."
            );

            return;

        }


        ROOM2_OBJECTS.forEach(object => {

            this.roomView.addObject(
                object
            );

        });

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

    }


    // =====================================================
    // EVENTS
    // =====================================================

    registerEvents() {

        // =================================================
        // SIDEBAR BUTTONS
        // =================================================

        this.terminal.onButtonClick((id) => {

            switch (id) {


                // =========================================
                // NOTEBOOK
                // =========================================

                case "notebook":

                    this.notebookViewer.open();

                    break;


                // =========================================
                // ASSESSMENT
                // =========================================

                case "assessment":

                    // -------------------------------------
                    // Notebook must be submitted
                    // -------------------------------------

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


                    // -------------------------------------
                    // All room objects must be investigated
                    // -------------------------------------

                    if (
                        !this.roomView.allObjectsInvestigated()
                    ) {

                        this.window.open({

                            title:
                                "Assessment Locked"

                        });

                        this.window.setContent(

                            "You must investigate all " +
                            "objects in the room before " +
                            "completing the assessment."

                        );

                        return;

                    }


                    // -------------------------------------
                    // Everything completed
                    // -------------------------------------

                    this.assessmentViewer.open();

                    break;


                // =========================================
                // HINT
                // =========================================

                case "hint":

                    this.window.open({

                        title: "Hint"

                    });

                    this.window.setContent(

                        "Compare what the manager believes " +
                        "with what customers and the " +
                        "operational data actually show."

                    );

                    break;


                // =========================================
                // PROGRESS
                // =========================================

                case "progress":

                    this.window.open({

                        title: "Progress"

                    });

                    this.window.setContent(

                        "Room 2 of 4\n\n" +
                        "Customer Hub Investigation"

                    );

                    break;

                // =============================================
                // TEMPORARY DEVELOPMENT SHORTCUT
                // =============================================

                case "continue":

                    console.log(
                        "DEV: Skipping Room 2 → Room 3"
                    );

                    this.scoreManager.setRoom(3);

                    this.scene.start(
                        "Room3Scene",
                        {
                            scoreManager:
                                this.scoreManager
                        }
                    );

                    break;



                // =========================================
                // UNKNOWN BUTTON
                // =========================================

                default:

                    console.warn(
                        `Unknown sidebar button: ${id}`
                    );

            }

        });


        // =================================================
        // ROOM OBJECTS
        // =================================================

        this.roomView.onObjectClick((id) => {

            const object =
                ROOM2_OBJECTS.find(
                    obj => obj.id === id
                );


            if (!object) {

                console.warn(
                    `Unknown Room 2 object: ${id}`
                );

                return;

            }


            console.log(
                `Room 2 object clicked: ${object.id}`
            );


            // ---------------------------------------------
            // Check Evidence
            // ---------------------------------------------

            if (!object.evidence) {

                console.warn(

                    `No evidence assigned to room object: ${object.id}`

                );

                return;

            }


            // ---------------------------------------------
            // Open Evidence
            // ---------------------------------------------

            this.evidenceViewer.openEvidence(

                object.evidence

            );

        });

    }

}