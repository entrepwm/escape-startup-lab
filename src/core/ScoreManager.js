export default class ScoreManager {

    constructor(answerData) {

        this.answerData = answerData;

    }

    evaluate(playerAnswer) {

        const isCorrect =
            playerAnswer === this.answerData.correctRecommendation;

        return {

            correct: isCorrect,

            score: isCorrect ? 100 : 0,

            explanation: this.answerData.explanation

        };

    }

}