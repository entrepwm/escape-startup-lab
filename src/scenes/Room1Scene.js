import Phaser from "phaser";
import DesktopLayout from "../ui/DesktopLayout";
import Window from "../ui/Window";


export default class Room1Scene extends Phaser.Scene {

    constructor() {

        super("Room1Scene");

    }

    create() {

        const desktop = new DesktopLayout(this);

        const window = new Window(this);

        desktop.onIconClick((id) => {

            if (id === "evidence") {

                window.open({

                    title: "Evidence",

                    content:
        `Available Evidence

        📄 Customer Reviews
        📊 Sales Report
        🖼 Kitchen Photo
        📝 Employee Interview`

                });

            }

        });

        desktop.addIcon({
            id: "evidence",
            label: "Evidence",
            icon: "📂",
            x: 120,
            y: 140
        });

        desktop.addIcon({
            id: "notebook",
            label: "Notebook",
            icon: "📓",
            x: 120,
            y: 260
        });

        desktop.addIcon({
            id: "assessment",
            label: "Founder Assessment",
            icon: "📋",
            x: 120,
            y: 380
        });

        desktop.onIconClick((id) => {

            console.log(`${id} clicked`);

        });

    }

}