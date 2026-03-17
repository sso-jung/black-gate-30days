import { proceed, processDay, selectChoice } from "@/src/engine/dayLoop";
import { startRun } from "@/src/engine/runEngine";
import { GameSession } from "@/src/types/game";

export function createGameSession(): GameSession {
    return startRun();
}

export function startNewGame(session: GameSession): GameSession {
    return processDay(session);
}

export function chooseOption(
    session: GameSession,
    choiceId: string,
): GameSession {
    return selectChoice(session, choiceId);
}

export function continueAfterResult(session: GameSession): GameSession {
    return proceed(session);
}