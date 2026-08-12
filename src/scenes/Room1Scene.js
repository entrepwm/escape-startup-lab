import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

import RoomView from "../ui/RoomView";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ScoreManager from "../core/ScoreManager";

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

        // Main UI
        this.terminal = new AssessmentTerminal(this);

        // Popup window
        this.window = new Window(this);

        // Game systems
        this.scoreManager = new ScoreManager(
            ROOM1_ANSWER
        );

        // Viewers
        this.evidenceViewer = new EvidenceViewer(

            this,
            this.window,
            ROOM1_EVIDENCE

        );

        this.notebookViewer = new NotebookViewer(

            this,
            this.window,
            ROOM1_NOTEBOOK

        );

        this.assessmentViewer = new AssessmentViewer(

            this,
            this.window,
            ROOM1_ASSESSMENT,
            this.scoreManager

        );

        // Room View
        this.roomView = this.terminal.getRoomView();

    }

    // =====================================================
    // INITIAL UI
    // =====================================================

    initializeUI() {

        this.terminal.setRoom("Idea Lab");

        this.terminal.setDialogue(

            "Welcome, Candidate.\nInvestigate every object before completing your assessment."

        );

        this.terminal.setScore(0);

        this.terminal.setTime("15:00");

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
    // EVENTS
    // =====================================================

    registerEvents() {

        // -------------------------------
        // Sidebar Buttons
        // -------------------------------

        this.terminal.onButtonClick((id) => {

            switch (id) {

                case "notebook":

                    this.notebookViewer.open();

                    break;

                case "assessment":

                    this.assessmentViewer.open();

                    break;

                case "hint":

                    this.window.open({

                        title: "Hint"

                    });

                    this.window.setContent(

                        "Remember to compare customer opinions with operational evidence."

                    );

                    break;

                case "progress":

                    this.window.open({

                        title: "Progress"

                    });

                    this.window.setContent(

                        "Room 1 of 4"

                    );

                    break;

                default:

                    console.warn(`Unknown sidebar button: ${id}`);

            }

        });

        // -------------------------------
        // Room Objects
        // -------------------------------

        this.roomView.onObjectClick((id) => {

            const object = ROOM1_OBJECTS.find(
                obj => obj.id === id
            );

            if (!object) {

                console.warn(`Unknown room object: ${id}`);

                return;

            }

            console.log(`Room object clicked: ${object.id}`);

            if (!object.evidence) {

                console.warn(
                    `No evidence assigned to room object: ${object.id}`
                );

                return;

            }

            this.evidenceViewer.openEvidence(
                object.evidence
            );

        });

    }

}