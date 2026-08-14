import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";
import RoomView from "../ui/RoomView";

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

        this.createSystems();

        this.createRoomObjects();

        this.registerEvents();

        this.initializeUI();

    }

    // =====================================================
    // SYSTEMS
    // =====================================================

    createSystems() {

        // -------------------------------------------------
        // Main UI
        // -------------------------------------------------

        this.terminal = new AssessmentTerminal(this);

        // -------------------------------------------------
        // Popup Window
        // -------------------------------------------------

        this.window = new Window(this);

        // -------------------------------------------------
        // Score Manager
        // -------------------------------------------------

        this.scoreManager = this.game.scoreManager

        this.scoreManager.setRoom(1);

        this.scoreManager.setAssessment(
            ROOM1_ANSWER.correctRecommendation,
            ROOM1_ANSWER.explanation
        );

        // -------------------------------------------------
        // Evidence Viewer
        // -------------------------------------------------

        this.evidenceViewer = new EvidenceViewer(
            this,
            this.window,
            ROOM1_EVIDENCE
        );

        // -------------------------------------------------
        // Notebook Viewer
        // -------------------------------------------------

        this.notebookViewer = new NotebookViewer(

            this,
            this.window,
            ROOM1_NOTEBOOK,
            this.scoreManager,
            ROOM1_NOTEBOOK_ANSWERS,
            (points) => {

                this.terminal.setScore(
                    this.scoreManager.getScore()
                );

                this.unlockAssessment();

            }
        );

        // -------------------------------------------------
        // Assessment Viewer
        // -------------------------------------------------

        this.assessmentViewer = new AssessmentViewer(

            this,
            this.window,
            ROOM1_ASSESSMENT,
            this.scoreManager,
            "Room2Scene"
            
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

        this.terminal.setRoom("Idea Lab");

        this.terminal.setDialogue(
            "Welcome, Candidate.\n" +
            "Investigate every object before completing your assessment."
        );

        this.terminal.setScore(0);

        this.terminal.setTime("15:00");

        // -----------------------------------------------
        // Assessment starts LOCKED
        // -----------------------------------------------

        this.terminal.setButtonEnabled(
            "assessment",
            false
        );

    }

    // =====================================================
    // ROOM OBJECTS
    // =====================================================

    createRoomObjects() {

        ROOM1_OBJECTS.forEach(object => {

            this.roomView.addObject(object);

        });

    }

    // =====================================================
    // UNLOCK ASSESSMENT
    // =====================================================

    unlockAssessment() {

        console.log("Assessment unlocked!");

        this.terminal.setButtonEnabled(
            "assessment",
            true
        );

        this.terminal.setDialogue(
            "Notebook completed. Your assessment is now unlocked."
        );

    }

    // =====================================================
    // ROOM 1 COMPLETE
    // =====================================================

    completeRoom1() {

        console.log(
            "ROOM 1 COMPLETED"
        );

        const finalScore =
            this.scoreManager.getScore();

        const container =
            this.add.container(0, 0);

    // -------------------------------------------------
    // Title
    // -------------------------------------------------

    const title =
        this.add.text(
            0,
            0,
            "🎉 ROOM 1 COMPLETE",
            {
                fontSize: "28px",
                color: "#000000",
                fontStyle: "bold"
            }
        );

    // -------------------------------------------------
    // Description
    // -------------------------------------------------

    const description =
        this.add.text(
            0,
            60,

            "You investigated the restaurant,\nanalyzed the evidence,\nand identified the main operational problem.",

            {
                fontSize: "20px",
                color: "#000000",
                wordWrap: {
                    width: 420
                }
            }
        );

    // -------------------------------------------------
    // Final score
    // -------------------------------------------------

    const score =
        this.add.text(
            0,
            170,

            `Final Score: ${finalScore}`,

            {
                fontSize: "24px",
                color: "#008800",
                fontStyle: "bold"
            }
        );

    // -------------------------------------------------
    // Recommendation
    // -------------------------------------------------

    const recommendation =
        this.add.text(
            0,
            220,

            "Recommendation:\nImprove Service Speed",

            {
                fontSize: "20px",
                color: "#000000",
                fontStyle: "bold"
            }
        );

    // -------------------------------------------------
    // Continue button
    // -------------------------------------------------

    const continueButton =
        this.add.text(
            0,
            310,

            "Continue to Room 2 →",

            {
                fontSize: "22px",
                color: "#0066cc",
                fontStyle: "bold"
            }
        );

    continueButton.setInteractive({
        useHandCursor: true
    });

    continueButton.on("pointerover", () => {

        continueButton.setColor(
            "#ff8800"
        );

    });

    continueButton.on("pointerout", () => {

        continueButton.setColor(
            "#0066cc"
        );

    });

    continueButton.on("pointerdown", () => {

        console.log(
            "Moving to Room 2..."
        );

        this.scene.start(
            "Room2Scene"
        );

    });

    container.add(title);
    container.add(description);
    container.add(score);
    container.add(recommendation);
    container.add(continueButton);

    // -------------------------------------------------
    // Open completion window
    // -------------------------------------------------

    this.window.open({
        title: "Room 1 Complete"
    });

    this.window.setContent(
        container
    );

}

    // =====================================================
    // EVENTS
    // =====================================================

    registerEvents() {

        // =================================================
        // SIDEBAR
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

                // Assessment is unlocked only after Notebook is submitted
                if (!this.scoreManager.isNotebookSubmitted()) {

                    this.window.open({
                        title: "Assessment Locked"
                    });

                    this.window.setContent(
                        "Complete and submit the Investigation Notebook first."
                    );

                    return;

                }

                // Notebook completed → open assessment
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
                        "Remember to compare customer opinions with operational evidence."
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
                        "Room 1 of 4"
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
                ROOM1_OBJECTS.find(
                    obj => obj.id === id
                );

            if (!object) {

                console.warn(
                    `Unknown room object: ${id}`
                );

                return;

            }

            console.log(
                `Room object clicked: ${object.id}`
            );


            // ---------------------------------------------
            // Check evidence
            // ---------------------------------------------

            if (!object.evidence) {

                console.warn(
                    `No evidence assigned to room object: ${object.id}`
                );

                return;

            }


            // ---------------------------------------------
            // Open evidence
            // ---------------------------------------------

            this.evidenceViewer.openEvidence(
                object.evidence
            );

        });

    }

}