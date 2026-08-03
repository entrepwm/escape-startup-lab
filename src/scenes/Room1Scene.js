import Phaser from "phaser";

import DesktopLayout from "../ui/DesktopLayout";
import Window from "../ui/Window";
import EvidenceViewer from "../ui/EvidenceViewer";

import ROOM1_EVIDENCE from "../data/room1Evidence";

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

                    console.log("Notebook clicked");

                    break;

                case "assessment":

                    console.log("Assessment clicked");

                    break;

                default:

                    console.warn(`Unknown icon: ${id}`);

            }

        });

    }

}