import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

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

        console.log(
            "Memulai Ruang 1: Misi 01 - Identifikasi Masalah"
        );


        // =================================================
        // AUDIO
        // =================================================

        if (
            this.game.openingMusic
        ) {

            this.game.openingMusic.stop();
            this.game.openingMusic.destroy();


            this.game.openingMusic =
                null;

        }


        if (
            !this.game.gameMusic
        ) {

            this.game.gameMusic =
                this.sound.add(

                    "startup-lab-loop",

                    {
                        loop:
                            true,

                        volume:
                            0.22
                    }

                );


            this.game.gameMusic.play();

        }


        // =================================================
        // ACHIEVEMENT STATE
        // =================================================

        this.thoroughInvestigatorEarned =
            false;


        // =================================================
        // GLOBAL TIMER LOCAL EVENT STATE
        // =================================================

        this.globalTimerEvent =
            null;


        this.timeExpiredHandled =
            false;


        // =================================================
        // SYSTEMS
        // =================================================

        this.createSystems();


        if (
            !this.scoreManager
        ) {

            console.error(
                "Room 1 gagal menginisialisasi ScoreManager."
            );


            return;

        }


        // =================================================
        // ROOM OBJECTS
        // =================================================

        this.createRoomObjects();


        // =================================================
        // EVENTS
        // =================================================

        this.registerEvents();


        // =================================================
        // UI
        // =================================================

        this.initializeUI();


        // =================================================
        // GLOBAL 20-MINUTE TIMER
        // =================================================

        this.startGlobalGameTimer();


        // =================================================
        // CAMERA
        // =================================================

        this.cameras.main.fadeIn(
            400
        );


        // =================================================
        // CLEANUP WHEN LEAVING SCENE
        // =================================================

        this.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.cleanupScene();

            }

        );

    }


    // =====================================================
    // CREATE SYSTEMS
    // =====================================================

    createSystems() {

        // =================================================
        // ASSESSMENT TERMINAL
        // =================================================

        this.terminal =
            new AssessmentTerminal(
                this
            );


        // =================================================
        // POPUP WINDOW
        // =================================================

        this.window =
            new Window(
                this
            );


        // =================================================
        // SCORE MANAGER
        // =================================================

        const globalScoreManager =
            this.game.scoreManager;


        if (
            globalScoreManager &&
            typeof globalScoreManager.setRoom ===
                "function" &&
            typeof globalScoreManager.getScore ===
                "function" &&
            typeof globalScoreManager.setAssessment ===
                "function"
        ) {

            this.scoreManager =
                globalScoreManager;

        }
        else {

            console.warn(
                "Global ScoreManager tidak ditemukan atau tidak valid. Membuat ScoreManager baru."
            );


            this.scoreManager =
                new ScoreManager();


            this.game.scoreManager =
                this.scoreManager;

        }


        console.log(

            "Room 1 ScoreManager:",

            this.scoreManager

        );


        // =================================================
        // CONFIGURE ROOM 1
        // =================================================

        this.scoreManager.setRoom(
            1
        );


        this.scoreManager.setAssessment(

            ROOM1_ANSWER.correctRecommendation,

            ROOM1_ANSWER.explanation

        );


        // =================================================
        // EVIDENCE VIEWER
        // =================================================

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM1_EVIDENCE

            );


        // =================================================
        // NOTEBOOK VIEWER
        // =================================================

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM1_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Catatan Room 1 selesai. +${points} poin`
                    );


                    this.terminal.setScore(

                        this.scoreManager.getScore()

                    );


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

                ROOM1_ASSESSMENT,

                this.scoreManager

            );


        // =================================================
        // ROOM VIEW
        // =================================================

        this.roomView =
            this.terminal.getRoomView();


        if (
            !this.roomView
        ) {

            console.error(
                "RoomView untuk Room 1 gagal dibuat."
            );

        }

    }


    // =====================================================
    // INITIALIZE UI
    // =====================================================

    initializeUI() {

        // =================================================
        // ROOM NAME
        // =================================================

        this.terminal.setRoom(

            "MISI 01: IDENTIFIKASI MASALAH\nRESTORAN"

        );


        // =================================================
        // DIALOGUE
        // =================================================

        this.terminal.setDialogue(

            "Selamat datang, Kandidat.\n" +
            "Selesaikan Catatan Investigasi untuk membuka Asesmen.\n" +
            "Pemeriksaan bukti bersifat opsional, tetapi investigasi menyeluruh dapat memberikan penghargaan tambahan."

        );


        // =================================================
        // CURRENT SCORE
        // =================================================

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        // =================================================
        // INITIAL GLOBAL TIMER DISPLAY
        // =================================================

        this.updateGlobalTimerDisplay();


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

        if (
            !this.roomView
        ) {

            console.error(
                "Objek Room 1 tidak dapat dibuat karena RoomView tidak tersedia."
            );


            return;

        }


        ROOM1_OBJECTS.forEach(

            object => {

                this.roomView.addObject(
                    object
                );

            }

        );

    }


    // =====================================================
    // GLOBAL GAME TIMER
    // =====================================================

    startGlobalGameTimer() {

        if (
            !this.scoreManager ||
            typeof this.scoreManager.startGameTimer !==
                "function"
        ) {

            console.error(
                "Method timer global tidak tersedia di ScoreManager."
            );


            return;

        }


        // =================================================
        // START ONLY ONCE
        // =================================================

        this.scoreManager.startGameTimer();


        // =================================================
        // IF TIMER WAS ALREADY EXPIRED
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();


            return;

        }


        // =================================================
        // INITIAL HUD UPDATE
        // =================================================

        this.updateGlobalTimerDisplay();


        // =================================================
        // REMOVE POSSIBLE OLD LOCAL EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // LOCAL PHASER CLOCK
        // =================================================

        this.globalTimerEvent =
            this.time.addEvent({

                delay:
                    1000,

                loop:
                    true,

                callback:
                    () => {

                        if (
                            this.timeExpiredHandled
                        ) {

                            return;

                        }


                        this.scoreManager.tickGameTimer();


                        this.updateGlobalTimerDisplay();


                        if (
                            this.scoreManager.isTimerExpired()
                        ) {

                            this.handleGlobalTimeExpired();

                        }

                    }

            });

    }


    // =====================================================
    // UPDATE GLOBAL TIMER DISPLAY
    // =====================================================

    updateGlobalTimerDisplay() {

        if (
            !this.scoreManager ||
            !this.terminal
        ) {

            return;

        }


        if (
            typeof this.scoreManager.getFormattedTime !==
                "function"
        ) {

            return;

        }


        const remaining =
            this.scoreManager.getTimeRemaining();


        const formatted =
            this.scoreManager.getFormattedTime();


        this.terminal.setTime(
            formatted
        );


        if (
            this.terminal.timeText
        ) {

            if (
                remaining <=
                60
            ) {

                this.terminal.timeText.setColor(
                    "#ff5c5c"
                );

            }
            else if (
                remaining <=
                180
            ) {

                this.terminal.timeText.setColor(
                    "#ffd166"
                );

            }
            else {

                this.terminal.timeText.setColor(
                    "#ffffff"
                );

            }

        }

    }


    // =====================================================
    // HANDLE GLOBAL TIME EXPIRED
    // =====================================================

    handleGlobalTimeExpired() {

        if (
            this.timeExpiredHandled
        ) {

            return;

        }


        this.timeExpiredHandled =
            true;


        console.log(
            "Timer global 20 menit habis di Room 1."
        );


        this.stopLocalTimerEvent();


        if (
            this.terminal
        ) {

            this.terminal.setTime(
                "00:00"
            );


            if (
                this.terminal.timeText
            ) {

                this.terminal.timeText.setColor(
                    "#ff5c5c"
                );

            }


            this.terminal.setDialogue(

                "WAKTU HABIS.\n" +
                "Asesmen Pendiri telah berakhir."

            );

        }


        if (
            this.window &&
            typeof this.window.close ===
                "function"
        ) {

            this.window.close();

        }


        this.scene.start(

            "FinalResultsScene",

            {

                scoreManager:
                    this.scoreManager

            }

        );

    }


    // =====================================================
    // STOP LOCAL TIMER EVENT
    // =====================================================

    stopLocalTimerEvent() {

        if (
            this.globalTimerEvent
        ) {

            this.globalTimerEvent.remove(
                false
            );


            this.globalTimerEvent =
                null;

        }

    }


    // =====================================================
    // UNLOCK ASSESSMENT
    // =====================================================

    unlockAssessment() {

        console.log(
            "Asesmen Room 1 terbuka!"
        );


        this.terminal.setButtonEnabled(

            "assessment",

            true

        );


        this.terminal.setDialogue(

            "Catatan Investigasi telah dikumpulkan.\n" +
            "Asesmen akhir Anda sekarang tersedia.\n" +
            "Anda masih dapat memeriksa bukti tambahan sebelum memberikan jawaban."

        );

    }


    // =====================================================
    // REGISTER EVENTS
    // =====================================================

    registerEvents() {

        this.terminal.onButtonClick(

            (id) => {

                if (
                    this.timeExpiredHandled
                ) {

                    return;

                }


                switch (
                    id
                ) {

                    case "notebook":

                        this.notebookViewer.open();

                        break;


                    case "assessment":

                        this.openAssessment();

                        break;


                    case "hint":

                        this.openHint();

                        break;


                    case "progress":

                        this.openProgress();

                        break;


                    case "continue":

                        console.log(
                            "DEV: Melewati Room 1 → Room 2"
                        );


                        this.stopLocalTimerEvent();


                        this.scoreManager.setRoom(
                            2
                        );


                        this.scene.start(

                            "Room2Scene",

                            {

                                scoreManager:
                                    this.scoreManager

                            }

                        );


                        break;


                    default:

                        console.warn(

                            `Tombol sidebar tidak dikenal: ${id}`

                        );

                }

            }

        );


        if (
            !this.roomView
        ) {

            return;

        }


        this.roomView.onObjectClick(

            (id) => {

                if (
                    this.timeExpiredHandled
                ) {

                    return;

                }


                this.handleRoomObjectClick(
                    id
                );

            }

        );

    }


    // =====================================================
    // OPEN ASSESSMENT
    // =====================================================

    openAssessment() {

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();


            return;

        }


        if (
            !this.scoreManager.isNotebookSubmitted()
        ) {

            this.window.open({

                title:
                    "Asesmen Terkunci"

            });


            this.window.setContent(

                "Selesaikan dan kumpulkan Catatan Investigasi terlebih dahulu.\n\n" +

                "Pemeriksaan bukti bersifat opsional."

            );


            return;

        }


        this.checkThoroughInvestigator();


        this.assessmentViewer.open();

    }


    // =====================================================
    // CHECK THOROUGH INVESTIGATOR
    // =====================================================

    checkThoroughInvestigator() {

        if (
            !this.roomView ||
            typeof this.roomView.allObjectsInvestigated !==
                "function"
        ) {

            return false;

        }


        const allInvestigated =

            this.roomView
                .allObjectsInvestigated();


        if (
            allInvestigated &&
            !this.thoroughInvestigatorEarned
        ) {

            this.thoroughInvestigatorEarned =
                true;


            console.log(
                "ACHIEVEMENT TERBUKA: Investigator Menyeluruh — Room 1"
            );


            this.terminal.setDialogue(

                "Pencapaian terbuka: Investigator Menyeluruh!\n" +
                "Anda telah memeriksa seluruh sumber bukti yang tersedia."

            );

        }


        return this.thoroughInvestigatorEarned;

    }


    // =====================================================
    // OPEN HINT
    // =====================================================

    openHint() {

        this.window.open({

            title:
                "Petunjuk EVA"

        });


        this.window.setContent(

            "Jangan mengandalkan hanya satu sumber informasi.\n\n" +

            "Bandingkan umpan balik pelanggan, bukti operasional, " +
            "dan asumsi bisnis sebelum membuat rekomendasi.\n\n" +

            "Ingat: pemeriksaan bukti bersifat opsional, " +
            "tetapi rekomendasi yang lebih kuat biasanya didukung oleh bukti yang lebih kuat."

        );

    }


    // =====================================================
    // OPEN PROGRESS
    // =====================================================

    openProgress() {

        const score =
            this.scoreManager.getScore();


        const timeRemaining =
            this.scoreManager.getFormattedTime();


        const notebookStatus =

            this.scoreManager.isNotebookSubmitted()

                ? "Selesai"

                : "Belum Selesai";


        const assessmentStatus =

            this.scoreManager.isAssessmentSubmitted()

                ? "Selesai"

                : (
                    this.scoreManager.isNotebookSubmitted()

                        ? "Terbuka"

                        : "Terkunci"
                );


        let investigatedCount =
            0;


        const totalEvidence =
            ROOM1_OBJECTS.length;


        if (
            this.roomView &&
            typeof this.roomView.getInvestigatedObjects ===
                "function"
        ) {

            investigatedCount =

                this.roomView
                    .getInvestigatedObjects()
                    .length;

        }


        this.checkThoroughInvestigator();


        const achievementStatus =

            this.thoroughInvestigatorEarned

                ? "Terbuka ✓"

                : `${investigatedCount} / ${totalEvidence}`;


        this.window.open({

            title:
                "Progres Misi"

        });


        this.window.setContent(

            "MISI 01: IDENTIFIKASI MASALAH\n" +
            "RESTORAN\n\n" +

            `Sisa Waktu: ${timeRemaining}\n\n` +

            `Catatan Investigasi: ${notebookStatus}\n` +

            `Asesmen: ${assessmentStatus}\n` +

            `Bukti: ${investigatedCount} / ${totalEvidence}\n\n` +

            "PENCAPAIAN BONUS\n" +

            `Investigator Menyeluruh: ${achievementStatus}\n\n` +

            `Skor Saat Ini: ${score}`

        );

    }


    // =====================================================
    // HANDLE ROOM OBJECT CLICK
    // =====================================================

    handleRoomObjectClick(
        id
    ) {

        const object =

            ROOM1_OBJECTS.find(

                item =>
                    item.id === id

            );


        if (
            !object
        ) {

            console.warn(

                `Objek Room 1 tidak dikenal: ${id}`

            );


            return;

        }


        console.log(

            `Objek Room 1 diklik: ${object.id}`

        );


        if (
            !object.evidence
        ) {

            console.warn(

                `Tidak ada bukti yang terhubung ke objek Room 1: ${object.id}`

            );


            return;

        }


        this.evidenceViewer.openEvidence(

            object.evidence

        );


        this.checkThoroughInvestigator();

    }


    // =====================================================
    // CLEANUP SCENE
    // =====================================================

    cleanupScene() {

        this.stopLocalTimerEvent();

    }

}