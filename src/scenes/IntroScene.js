import Phaser from "phaser";
import DialogueBox from "../ui/DialogueBox";

export default class IntroScene extends Phaser.Scene {

    constructor() {
        super("IntroScene");
    }

    create() {

        // -------------------------------------------------
        // Background
        // -------------------------------------------------

        this.cameras.main.setBackgroundColor("#24324a");

        // -------------------------------------------------
        // Title
        // -------------------------------------------------

        this.add.text(
            this.scale.width / 2,
            90,
            "ESCAPE STARTUP LAB",
            {
                fontSize: "40px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            140,
            "Founder Assessment Initiated",
            {
                fontSize: "22px",
                color: "#b8c7e0"
            }
        ).setOrigin(0.5);

        // -------------------------------------------------
        // Fade In
        // -------------------------------------------------

        this.cameras.main.fadeIn(500);

        // -------------------------------------------------
        // Dialogue
        // -------------------------------------------------

        const dialogue = new DialogueBox(this);

        dialogue.start([
            {
                speaker: "EVA",
                text: "Welcome, Candidate Team."
            },
            {
                speaker: "EVA",
                text: "I am EVA, your Entrepreneurial Virtual Assistant."
            },
            {
                speaker: "EVA",
                text: "Today you will complete three Founder Assessments designed to evaluate your entrepreneurial thinking."
            },
            {
                speaker: "EVA",
                text: "Search every room carefully. Evidence may be hidden inside reports, interviews, financial records, and customer feedback."
            },
            {
                speaker: "EVA",
                text: "Your objective is not to find the 'correct answer', but to justify the strongest recommendation using evidence."
            },
            {
                speaker: "EVA",
                text: "The Investment Committee will evaluate both your reasoning and your final proposal."
            },
            {
                speaker: "EVA",
                text: "Good luck.\n\nYour assessment begins now."
            }

        ], () => {

            // Fade Out
            this.cameras.main.fadeOut(500);

            this.cameras.main.once("camerafadeoutcomplete", () => {

                this.scene.start("Room1Scene");

            });

        });

    }

}