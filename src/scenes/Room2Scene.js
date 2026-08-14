import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";
import RoomView from "../ui/RoomView";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ScoreManager from "../managers/ScoreManager";

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

        // Main assessment terminal
        this.terminal = new AssessmentTerminal(this);

        // Popup window
        this.window = new Window(this);

        // Score system
        this.scoreManager = this.game.scoreManager;

        this.scoreManager.setRoom(2);

        this.scoreManager.setAssessment(
            ROOM2_ANSWER.correctRecommendation,
            ROOM2_ANSWER.explanation
        );

        // =================================================
        // Evidence Viewer
        // =================================================

        this.evidenceViewer = new EvidenceViewer(

            this,
            this.window,
            ROOM2_EVIDENCE

        );

        // =================================================
        // Notebook Viewer
        // =================================================

        this.notebookViewer = new NotebookViewer(

            this,
            this.window,
            ROOM2_NOTEBOOK,
            this.scoreManager,

            (points) => {

                console.log(
                    `Room 2 Notebook completed. +${points} points`
                );

                this.terminal.setScore(
                    this.scoreManager.getScore()
                );

                this.unlockAssessment();

            }

        );

        // =================================================
        // Assessment Viewer
        // =================================================

        this.assessmentViewer = new AssessmentViewer(

            this,
            this.window,
            ROOM2_ASSESSMENT,
            this.scoreManager

        );

        // Tell ScoreManager which answer is correct
        this.scoreManager.correctRecommendation =
            ROOM2_ANSWER.correctRecommendation;

        this.scoreManager.assessmentExplanation =
            ROOM2_ANSWER.explanation;

        // =================================================
        // Room View
        // =================================================

        this.roomView =
            this.terminal.getRoomView();

    }

    // =====================================================
    // INITIAL UI
    // =====================================================

    initializeUI() {

        this.terminal.setRoom("Customer Hub");

        this.terminal.setDialogue(

            "Welcome to Room 2.\n" +
            "Investigate the customer experience carefully. " +
            "Not every business assumption is supported by the evidence."

        );

        this.terminal.setScore(0);

        this.terminal.setTime("15:00");

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

        ROOM2_OBJECTS.forEach(object => {

            this.roomView.addObject(object);

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

                    // Notebook must be submitted first
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

                    // All room objects must be investigated
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

                    // Everything completed
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

                        "Compare what the manager believes " +
                        "with what customers and the " +
                        "operational data actually show."

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

                        "Room 2 of 4\n\n" +
                        "Customer Hub Investigation"

                    );

                    break;


                // -----------------------------------------
                // UNKNOWN
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
                ROOM2_OBJECTS.find(
                    obj => obj.id === id
                );

            if (!object) {

                console.warn(
                    `Unknown room object: ${id}`
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
            // Open Evidence Popup
            // ---------------------------------------------

            this.evidenceViewer.openEvidence(

                object.evidence

            );

        });

    }

}