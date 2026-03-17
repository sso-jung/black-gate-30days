import { EVENT_POOL } from "@/src/data/events/testEvent";
import { getVisibleChoices } from "@/src/systems/choiceSystem";
import { applyEffects } from "@/src/systems/effectSystem";
import { selectEvent } from "@/src/systems/eventSystem";
import { resolveChoiceResult } from "@/src/systems/resultSystem";
import { EventChoice, GameSession } from "@/src/types/game";

export function processDay(session: GameSession): GameSession {
    const event = selectEvent(session.runState, EVENT_POOL);

    if (!event) {
        return {
            ...session,
            currentEvent: null,
            visibleChoices: [],
            resultText: "표시할 이벤트가 없습니다.",
            runState: {
                ...session.runState,
                phase: "result",
            },
        };
    }

    const visibleChoices = getVisibleChoices(event, session.runState);

    return {
        ...session,
        currentEvent: event,
        visibleChoices,
        resultText: null,
        runState: {
            ...session.runState,
            phase: "event",
            lastEventId: event.id,
            seenEventIds: session.runState.seenEventIds.includes(event.id)
                ? session.runState.seenEventIds
                : [...session.runState.seenEventIds, event.id],
            updatedAt: new Date().toISOString(),
        },
    };
}

export function selectChoice(
    session: GameSession,
    choiceId: string,
): GameSession {
    if (!session.currentEvent) {
        return session;
    }

    const selectedChoice = session.currentEvent.choices.find(
        (choice) => choice.id === choiceId,
    );

    if (!selectedChoice) {
        return {
            ...session,
            resultText: "선택지를 찾을 수 없습니다.",
        };
    }

    const resolved = resolveChoiceResult(selectedChoice as EventChoice, session.runState);

    if (!resolved) {
        return {
            ...session,
            resultText: "결과를 찾을 수 없습니다.",
        };
    }

    const updatedRunState = applyEffects(resolved.effects, {
        ...session.runState,
        lastChoiceId: selectedChoice.id,
        completedEventIds: session.runState.completedEventIds.includes(
            session.currentEvent.id,
        )
            ? session.runState.completedEventIds
            : [...session.runState.completedEventIds, session.currentEvent.id],
    });

    return {
        ...session,
        resultText: resolved.resultText,
        visibleChoices: [],
        runState: {
            ...updatedRunState,
            phase: "result",
        },
    };
}

export function proceed(session: GameSession): GameSession {
    return {
        ...session,
        currentEvent: null,
        visibleChoices: [],
        resultText: null,
        runState: {
            ...session.runState,
            phase: "start",
        },
    };
}