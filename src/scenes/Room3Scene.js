import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";
import RoomView from "../ui/RoomView";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ScoreManager from "../managers/ScoreManager";

import ROOM3_OBJECTS from "../data/room3Objects";
import ROOM3_EVIDENCE from "../data/room3Evidence";
import ROOM3_NOTEBOOK from "../data/room3Notebook";
import ROOM3_ASSESSMENT from "../data/room3Assessment";
import ROOM3_ANSWER from "../data/room3Answer";

export default class Room3Scene extends Phaser.Scene {

    constructor() {

        super("Room3Scene");

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

        // -------------------------------------------------
        // Main Assessment Terminal
        // -------------------------------------------------

        this.terminal =
            new AssessmentTerminal(this);


        // -------------------------------------------------
        // Popup Window
        // -------------------------------------------------

        this.window =
            new Window(this);


        // -------------------------------------------------
        // SCORE MANAGER
        // -------------------------------------------------

        this.scoreManager =
            this.game.scoreManager;

        // Make sure ScoreManager exists
        if (!this.scoreManager) {

            console.error(
                "ScoreManager was not found on this.game."
            );

            return;

        }


        // -------------------------------------------------
        // Set Current Room
        // -------------------------------------------------

        this.scoreManager.setRoom(3);


        // -------------------------------------------------
        // Assessment Configuration
        // -------------------------------------------------

        this.scoreManager.setAssessment(

            ROOM3_ANSWER.correctRecommendation,

            ROOM3_ANSWER.explanation

        );


        // -------------------------------------------------
        // Evidence Viewer
        // -------------------------------------------------

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM3_EVIDENCE

            );


        // -------------------------------------------------
        // Notebook Viewer
        // -------------------------------------------------

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM3_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Room 3 Notebook completed. +${points} points`
                    );


                    // Update score display
                    this.terminal.setScore(

                        this.scoreManager.getScore()

                    );


                    // Unlock assessment
                    this.unlockAssessment();

                }

            );


        // -------------------------------------------------
        // Assessment Viewer
        // -------------------------------------------------

        this.assessmentViewer =
            new AssessmentViewer(

                this,

                this.window,

                ROOM3_ASSESSMENT,

                this.scoreManager

            );


        // -------------------------------------------------
        // Room View
        // -------------------------------------------------

        this.roomView =
            this.terminal.getRoomView();

    }


    // =====================================================
    // INITIAL UI
    // =====================================================

    initializeUI() {

        this.terminal.setRoom(
            "MISSION 03: STRATEGIC DECISION\nCEO OFFICE"
        );


        this.terminal.setDialogue(

            "Welcome to Room 3.\n" +

            "The restaurant has identified a serious " +
            "peak-period capacity problem.\n\n" +

            "Management has limited resources and " +
            "cannot implement every possible solution.\n\n" +

            "Investigate the evidence carefully and " +
            "determine which investment creates the " +
            "greatest strategic value."

        );


        // IMPORTANT:
        // Keep the existing total score.

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        this.terminal.setTime(
            "15:00"
        );


        // Assessment starts locked

        this.terminal.setButtonEnabled(

            "assessment",

            false

        );

    }


    // =====================================================
    // CREATE ROOM OBJECTS
    // =====================================================

    createRoomObjects() {

        ROOM3_OBJECTS.forEach(object => {

            this.roomView.addObject(object);

        });

    }


    // =====================================================
    // UNLOCK ASSESSMENT
    // =====================================================

    unlockAssessment() {

        console.log(
            "Room 3 Assessment unlocked!"
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


                // -----------------------------------------
                // NOTEBOOK
                // -----------------------------------------

                case "notebook":

                    this.notebookViewer.open();

                    break;


                // -----------------------------------------
                // ASSESSMENT
                // -----------------------------------------

                case "assessment":


                    // -------------------------------------
                    // Notebook Check
                    // -------------------------------------

                    if (
                        !this.scoreManager
                            .isNotebookSubmitted()
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
                    // Room Investigation Check
                    // -------------------------------------

                    if (
                        !this.roomView
                            .allObjectsInvestigated()
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
                    // Everything Complete
                    // -------------------------------------

                    this.assessmentViewer.open();

                    break;


                // -----------------------------------------
                // HINT
                // -----------------------------------------

                case "hint":

                    this.window.open({

                        title: "Hint"

                    });


                    this.window.setContent(

                        "Don't automatically choose the " +
                        "cheapest or most innovative option.\n\n" +

                        "First identify the actual bottleneck, " +
                        "then compare each solution's impact, " +
                        "cost, feasibility, and long-term value."

                    );

                    break;


                // -----------------------------------------
                // PROGRESS
                // -----------------------------------------

                case "progress":

                    this.window.open({

                        title: "Progress"

                    });


                    this.window.setContent(

                        "Room 3 of 4\n\n" +

                        "Strategy Lab Investigation"

                    );

                    break;


                // -----------------------------------------
                // UNKNOWN BUTTON
                // -----------------------------------------

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
                ROOM3_OBJECTS.find(

                    obj => obj.id === id

                );


            if (!object) {

                console.warn(

                    `Unknown Room 3 object: ${id}`

                );

                return;

            }


            console.log(

                `Room 3 object clicked: ${object.id}`

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