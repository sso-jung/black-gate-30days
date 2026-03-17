import { GameSession, RunState } from "@/src/types/game";

export function createInitialRunState(): RunState {
    const now = new Date().toISOString();

    return {
        runId: `run-${Date.now()}`,
        day: 1,
        maxDay: 30,
        phase: "start",
        player: {
            name: "플레이어",
            stats: {
                strength: 5,
                dexterity: 5,
                intelligence: 5,
                faith: 5,
                charisma: 5,
                corruption: 0,
            },
            resources: {
                hp: 10,
                maxHp: 10,
                reputation: 0,
                gold: 0,
                knowledge: 0,
            },
            traits: [],
            equippedRelicIds: [],
            inventoryItemIds: [],
            knownLoreIds: [],
            relationshipStates: [],
            temporaryEffects: [],
            routeAffinity: [],
            statusFlags: [],
        },
        factions: [
            {
                factionId: "faction_knights",
                trust: 0,
                fear: 0,
                interest: 0,
                statusTags: [],
                knownSecrets: [],
                routeScore: 0,
            },
        ],
        flags: [],
        hiddenFlags: [],
        completedEventIds: [],
        seenEventIds: [],
        scheduledEventIds: [],
        battleState: null,
        lastEventId: null,
        lastChoiceId: null,
        currentRouteHints: [],
        currentEndingCandidateIds: [],
        logEntries: [],
        createdAt: now,
        updatedAt: now,
    };
}

export function startRun(): GameSession {
    return {
        runState: createInitialRunState(),
        currentEvent: null,
        visibleChoices: [],
        resultText: null,
    };
}