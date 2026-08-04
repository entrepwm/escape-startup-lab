import Phaser from "phaser";

import DesktopLayout from "../ui/DesktopLayout";
import Window from "../ui/Window";
import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import ROOM1_NOTEBOOK from "../data/room1Notebook";
import ROOM1_EVIDENCE from "../data/room1Evidence";
import AssessmentViewer from "../ui/AssessmentViewer";
import ROOM1_ASSESSMENT from "../data/room1Assessment";

export default class Room1Scene extends Phaser.Scene {

    constructor() {

        super("Room1Scene");

    }

    create() {

        this.createSystems();

        this.createDesktop();

        this.registerEvents();

    }

    // =====================================================
    // CREATE SYSTEMS
    // =====================================================

    createSystems() {

        this.desktop = new DesktopLayout(this);

        this.window = new Window(this);

        this.evidenceViewer = new EvidenceViewer(

            this,
            this.window,
            ROOM1_EVIDENCE

        );

        this.NotebookViewer = new NotebookViewer(

            this,
            this.window,
            ROOM1_NOTEBOOK

        );

        this.assessmentViewer = new AssessmentViewer(

            this,
            this.window,
            ROOM1_ASSESSMENT

        );

    }

    // =====================================================
    // DESKTOP ICONS
    // =====================================================

    createDesktop() {

        this.desktop.addIcon({

            id: "evidence",

            label: "Evidence",

            icon: "📂",

            x: 80,

            y: 120

        });

        this.desktop.addIcon({

            id: "notebook",

            label: "Notebook",

            icon: "📓",

            x: 80,

            y: 240

        });

        this.desktop.addIcon({

            id: "assessment",

            label: "Assessment",

            icon: "📋",

            x: 80,

            y: 360

        });

    }

    // =====================================================
    // EVENTS
    // =====================================================

    registerEvents() {

        this.desktop.onIconClick((id) => {

            switch (id) {

                case "evidence":

                    this.evidenceViewer.openFolder();

                    break;

                case "notebook":

                    this.notebookViewer.open();

                    break;

                case "assessment":

                    this.assessmentViewer.open();

                    break;

                default:

                    console.warn(`Unknown icon: ${id}`);

            }

        });

    }

}