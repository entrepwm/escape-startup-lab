import Phaser from "phaser";
import DialogueBox from "../ui/DialogueBox";

export default class IntroScene extends Phaser.Scene {

    constructor() {
        super("IntroScene");
    }

    create() {

        // Background
        this.cameras.main.setBackgroundColor("#24324a");

        // Create Dialogue Box
        const dialogue = new DialogueBox(this);

        // Intro Dialogue
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
                text: "Each room contains evidence hidden in documents, reports, and customer feedback."
            },
            {
                speaker: "EVA",
                text: "Collect the evidence carefully before making your recommendation."
            },
            {
                speaker: "EVA",
                text: "Good luck. Your assessment begins now."
            }
        ], () => {

            this.scene.start("Room1Scene");

        });

    }

}