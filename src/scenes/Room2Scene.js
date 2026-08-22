import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

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

        console.log(
            "Memulai Room 2: Misi 02 - Analisis Peluang"
        );


        // =================================================
        // ACHIEVEMENT STATE
        // =================================================

        this.thoroughInvestigatorEarned =
            false;


        // =================================================
        // TIMER LOCAL STATE
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
                "Room 2 gagal menginisialisasi ScoreManager."
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
        // CONTINUE GLOBAL TIMER
        // =================================================

        this.startGlobalGameTimer();


        // =================================================
        // CAMERA
        // =================================================

        this.cameras.main.fadeIn(
            400
        );


        // =================================================
        // CLEANUP
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
        // SCORE MANAGER
        // =================================================

        this.scoreManager =
            this.game.scoreManager;


        if (
            !this.scoreManager
        ) {

            console.error(
                "ScoreManager tidak ditemukan di Room2Scene."
            );


            return;

        }


        // =================================================
        // SET CURRENT ROOM
        // =================================================

        /*
         * Hanya mereset status notebook dan assessment Room 2.
         *
         * Timer global TIDAK direset di sini.
         */

        this.scoreManager.setRoom(
            2
        );


        // =================================================
        // ASSESSMENT CONFIGURATION
        // =================================================

        this.scoreManager.setAssessment(

            ROOM2_ANSWER.correctRecommendation,

            ROOM2_ANSWER.explanation

        );


        // =================================================
        // MAIN TERMINAL
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
        // EVIDENCE VIEWER
        // =================================================

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM2_EVIDENCE

            );


        // =================================================
        // NOTEBOOK VIEWER
        // =================================================

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM2_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Catatan Room 2 selesai. +${points} poin`
                    );


                    // =========================================
                    // UPDATE SCORE HUD
                    // =========================================

                    this.terminal.setScore(

                        this.scoreManager.getScore()

                    );


                    // =========================================
                    // UNLOCK ASSESSMENT
                    // =========================================

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

                ROOM2_ASSESSMENT,

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
                "RoomView untuk Room 2 gagal dibuat."
            );

        }

    }


    // =====================================================
    // INITIALIZE UI
    // =====================================================

    initializeUI() {

        // =================================================
        // ROOM TITLE
        // =================================================

        this.terminal.setRoom(

            "MISI 02: ANALISIS PELUANG\nKANTOR MANAJEMEN"

        );


        // =================================================
        // ROOM DIALOGUE
        // =================================================

        this.terminal.setDialogue(

            "Selamat datang di Room 2.\n" +
            "Selesaikan Catatan Investigasi untuk membuka Asesmen.\n" +
            "Pemeriksaan bukti bersifat opsional, tetapi investigasi menyeluruh dapat memberikan penghargaan tambahan."

        );


        // =================================================
        // KEEP CURRENT GLOBAL SCORE
        // =================================================

        this.terminal.setScore(

            this.scoreManager.getScore()

        );


        // =================================================
        // GLOBAL TIMER DISPLAY
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
                "RoomView belum diinisialisasi."
            );


            return;

        }


        ROOM2_OBJECTS.forEach(

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
        // THIS DOES NOT RESET THE TIMER
        // =================================================

        this.scoreManager.startGameTimer();


        // =================================================
        // ALREADY EXPIRED?
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();


            return;

        }


        // =================================================
        // INITIAL DISPLAY
        // =================================================

        this.updateGlobalTimerDisplay();


        // =================================================
        // REMOVE OLD LOCAL EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // ROOM 2 LOCAL PHASER EVENT
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


                        // =====================================
                        // DECREASE SHARED GLOBAL TIME
                        // =====================================

                        this.scoreManager.tickGameTimer();


                        // =====================================
                        // REFRESH HUD
                        // =====================================

                        this.updateGlobalTimerDisplay();


                        // =====================================
                        // EXPIRED
                        // =====================================

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
            "Timer global 20 menit habis di Room 2."
        );


        // =================================================
        // STOP ROOM 2 CLOCK EVENT
        // =================================================

        this.stopLocalTimerEvent();


        // =================================================
        // UPDATE HUD
        // =================================================

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


        // =================================================
        // CLOSE MODAL
        // =================================================

        if (
            this.window &&
            typeof this.window.close ===
                "function"
        ) {

            this.window.close();

        }


        // =================================================
        // FINAL RESULTS
        // =================================================

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
            "Asesmen Room 2 terbuka!"
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

        // =================================================
        // SIDEBAR BUTTONS
        // =================================================

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
                            "DEV: Melewati Room 2 → Room 3"
                        );


                        // =================================
                        // STOP ROOM 2 LOCAL CLOCK
                        // =================================

                        this.stopLocalTimerEvent();


                        // =================================
                        // ENTER ROOM 3
                        // =================================

                        this.scoreManager.setRoom(
                            3
                        );


                        this.scene.start(

                            "Room3Scene",

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


        // =================================================
        // ROOM OBJECTS
        // =================================================

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

        // =================================================
        // TIMER CHECK
        // =================================================

        if (
            this.scoreManager.isTimerExpired()
        ) {

            this.handleGlobalTimeExpired();


            return;

        }


        // =================================================
        // NOTEBOOK MUST BE SUBMITTED
        // =================================================

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


        // =================================================
        // EVIDENCE REMAINS OPTIONAL
        // =================================================

        this.checkThoroughInvestigator();


        // =================================================
        // OPEN ASSESSMENT
        // =================================================

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
                "ACHIEVEMENT TERBUKA: Investigator Menyeluruh — Room 2"
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

            "Bandingkan apa yang diyakini oleh manajer dengan apa yang sebenarnya ditunjukkan oleh pelanggan dan data operasional.\n\n" +

            "Cari pola dari wawancara, survei, ulasan, dan dasbor penjualan daripada hanya mengandalkan satu sumber informasi.\n\n" +

            "Pemeriksaan bukti bersifat opsional, tetapi kesimpulan yang lebih kuat biasanya berasal dari bukti yang lebih kuat."

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


        // =================================================
        // NOTEBOOK STATUS
        // =================================================

        const notebookStatus =

            this.scoreManager.isNotebookSubmitted()

                ? "Selesai"

                : "Belum Selesai";


        // =================================================
        // ASSESSMENT STATUS
        // =================================================

        const assessmentStatus =

            this.scoreManager.isAssessmentSubmitted()

                ? "Selesai"

                : (
                    this.scoreManager.isNotebookSubmitted()

                        ? "Terbuka"

                        : "Terkunci"
                );


        // =================================================
        // EVIDENCE PROGRESS
        // =================================================

        let investigatedCount =
            0;


        const totalEvidence =
            ROOM2_OBJECTS.length;


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


        // =================================================
        // ACHIEVEMENT CHECK
        // =================================================

        this.checkThoroughInvestigator();


        const achievementStatus =

            this.thoroughInvestigatorEarned

                ? "Terbuka ✓"

                : `${investigatedCount} / ${totalEvidence}`;


        // =================================================
        // WINDOW
        // =================================================

        this.window.open({

            title:
                "Progres Misi"

        });


        this.window.setContent(

            "MISI 02: ANALISIS PELUANG\n" +
            "KANTOR MANAJEMEN\n\n" +

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

            ROOM2_OBJECTS.find(

                obj =>
                    obj.id === id

            );


        if (
            !object
        ) {

            console.warn(

                `Objek Room 2 tidak dikenal: ${id}`

            );


            return;

        }


        console.log(

            `Objek Room 2 diklik: ${object.id}`

        );


        if (
            !object.evidence
        ) {

            console.warn(

                `Tidak ada bukti yang terhubung ke objek Room 2: ${object.id}`

            );


            return;

        }


        // =================================================
        // OPEN EVIDENCE
        // =================================================

        this.evidenceViewer.openEvidence(

            object.evidence

        );


        // =================================================
        // CHECK OPTIONAL ACHIEVEMENT
        // =================================================

        this.checkThoroughInvestigator();

    }


    // =====================================================
    // CLEANUP
    // =====================================================

    cleanupScene() {

        /*
         * Hanya hentikan Phaser timer event milik Room 2.
         *
         * Jangan reset timer global di ScoreManager.
         */

        this.stopLocalTimerEvent();

    }

}