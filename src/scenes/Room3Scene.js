import Phaser from "phaser";

import AssessmentTerminal from "../ui/AssessmentTerminal";
import Window from "../ui/Window";

import EvidenceViewer from "../ui/EvidenceViewer";
import NotebookViewer from "../ui/NotebookViewer";
import AssessmentViewer from "../ui/AssessmentViewer";

import ROOM3_OBJECTS from "../data/room3Objects";
import ROOM3_EVIDENCE from "../data/room3Evidence";
import ROOM3_NOTEBOOK from "../data/room3Notebook";
import ROOM3_ASSESSMENT from "../data/room3Assessment";
import ROOM3_ANSWER from "../data/room3Answer";


export default class Room3Scene extends Phaser.Scene {

    constructor() {

        super("Room3Scene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        console.log(
            "Memulai Room 3: Misi 03 - Keputusan Strategis"
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
                "Room 3 gagal menginisialisasi ScoreManager."
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
        // MAIN ASSESSMENT TERMINAL
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

        this.scoreManager =
            this.game.scoreManager;


        if (
            !this.scoreManager
        ) {

            console.error(
                "ScoreManager tidak ditemukan pada this.game."
            );


            return;

        }


        // =================================================
        // SET CURRENT ROOM
        // =================================================

        this.scoreManager.setRoom(
            3
        );


        // =================================================
        // ASSESSMENT CONFIGURATION
        // =================================================

        this.scoreManager.setAssessment(

            ROOM3_ANSWER.correctRecommendation,

            ROOM3_ANSWER.explanation

        );


        // =================================================
        // EVIDENCE VIEWER
        // =================================================

        this.evidenceViewer =
            new EvidenceViewer(

                this,

                this.window,

                ROOM3_EVIDENCE

            );


        // =================================================
        // NOTEBOOK VIEWER
        // =================================================

        this.notebookViewer =
            new NotebookViewer(

                this,

                this.window,

                ROOM3_NOTEBOOK,

                this.scoreManager,

                (points) => {

                    console.log(
                        `Catatan Room 3 selesai. +${points} poin`
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

                ROOM3_ASSESSMENT,

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
                "RoomView untuk Room 3 gagal dibuat."
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

            "MISI 03: KEPUTUSAN STRATEGIS\nKANTOR CEO"

        );


        // =================================================
        // ROOM DIALOGUE
        // =================================================

        this.terminal.setDialogue(

            "Selamat datang di Room 3.\n" +

            "Manajemen memiliki sumber daya yang terbatas dan tidak dapat menerapkan semua solusi yang tersedia.\n\n" +

            "Selesaikan Catatan Investigasi untuk membuka Asesmen.\n" +

            "Pemeriksaan bukti bersifat opsional, tetapi investigasi menyeluruh dapat memberikan penghargaan tambahan."

        );


        // =================================================
        // KEEP GLOBAL SCORE
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


        ROOM3_OBJECTS.forEach(

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
        // DOES NOT RESET IF ALREADY STARTED
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
        // ROOM 3 LOCAL PHASER EVENT
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
            "Timer global 20 menit habis di Room 3."
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
            "Asesmen Room 3 terbuka!"
        );


        this.terminal.setButtonEnabled(

            "assessment",

            true

        );


        this.terminal.setDialogue(

            "Catatan Investigasi telah dikumpulkan.\n" +

            "Asesmen akhir Anda sekarang tersedia.\n" +

            "Anda masih dapat memeriksa bukti tambahan sebelum membuat rekomendasi strategis."

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
                            "DEV: Melanjutkan Room 3 → Hasil Akhir"
                        );


                        this.stopLocalTimerEvent();


                        this.scene.start(

                            "FinalResultsScene",

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

                "ACHIEVEMENT TERBUKA: " +
                "Investigator Menyeluruh — Room 3"

            );


            this.terminal.setDialogue(

                "Pencapaian terbuka: Investigator Menyeluruh!\n" +

                "Anda telah memeriksa seluruh sumber bukti strategis yang tersedia."

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

            "Jangan langsung memilih pilihan yang paling murah atau paling inovatif.\n\n" +

            "Identifikasi terlebih dahulu bottleneck yang sebenarnya, kemudian bandingkan dampak, biaya, kelayakan, kesesuaian strategis, dan nilai jangka panjang dari setiap solusi.\n\n" +

            "Pemeriksaan bukti bersifat opsional, tetapi keputusan strategis yang lebih kuat biasanya berasal dari bukti yang lebih kuat."

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
            ROOM3_OBJECTS.length;


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

            "MISI 03: KEPUTUSAN STRATEGIS\n" +

            "KANTOR CEO\n\n" +

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

            ROOM3_OBJECTS.find(

                obj =>
                    obj.id === id

            );


        if (
            !object
        ) {

            console.warn(

                `Objek Room 3 tidak dikenal: ${id}`

            );


            return;

        }


        console.log(

            `Objek Room 3 diklik: ${object.id}`

        );


        if (
            !object.evidence
        ) {

            console.warn(

                `Tidak ada bukti yang terhubung ke objek Room 3: ${object.id}`

            );


            return;

        }


        this.evidenceViewer.openEvidence(

            object.evidence

        );


        this.checkThoroughInvestigator();

    }


    // =====================================================
    // CLEANUP
    // =====================================================

    cleanupScene() {

        this.stopLocalTimerEvent();

    }

}