export type Phase = "start" | "event" | "result";

export type ConditionComparison =
    | ">="
    | "<="
    | ">"
    | "<"
    | "=="
    | "exists";

export type Condition = {
    type: "stat_gte" | "resource_gte" | "day_gte" | "has_flag";
    target: string;
    comparison: ConditionComparison;
    value: unknown;
};

export type ConditionGroup = {
    operator: "AND" | "OR";
    conditions: Condition[];
};

export type Effect = {
    type:
        | "modify_stat"
        | "modify_resource"
        | "add_flag"
        | "remove_flag";
    target: string | null;
    operation: "add" | "set" | "grant" | "remove";
    value: unknown;
    durationDays: number | null;
    metadata: Record<string, unknown> | null;
};

export type ChoiceResultGroup = {
    id: string;
    conditions: ConditionGroup[];
    chanceWeight: number;
    resultText: string;
    effects: Effect[];
    nextEventId: string | null;
    grantLoreId: string | null;
};

export type EventChoice = {
    id: string;
    text: string;
    style: "normal" | "risk" | "support" | "hidden" | "locked";
    showConditions: ConditionGroup[];
    lockConditions: ConditionGroup[];
    lockReasonText: string | null;
    previewText: string | null;
    successRateFormula: string | null;
    resultGroups: ChoiceResultGroup[];
    nextEventId: string | null;
    battleId: string | null;
    tags: string[];
};

export type EventMaster = {
    id: string;
    name: string;
    codeName: string;
    category: string;
    routeTags: string[];
    loreTier: string;
    weight: number;
    minDay: number | null;
    maxDay: number | null;
    repeatPolicy: string;
    priority: number;
    conditions: ConditionGroup[];
    blockConditions: ConditionGroup[];
    title: string;
    description: string;
    speakerId: string | null;
    locationId: string | null;
    illustrationHint: string | null;
    choices: EventChoice[];
    onEnterEffects: Effect[];
    onExitEffects: Effect[];
    followUpEventIds: string[];
    relatedCharacterIds: string[];
    relatedFactionIds: string[];
    tags: string[];
    isHidden: boolean;
    isActive: boolean;
    version: number;
};

export type PlayerStats = {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
    charisma: number;
    corruption: number;
};

export type PlayerResources = {
    hp: number;
    maxHp: number;
    reputation: number;
    gold: number;
    knowledge: number;
};

export type PlayerState = {
    name: string;
    stats: PlayerStats;
    resources: PlayerResources;
    traits: Array<{
        traitId: string;
        sourceType: string;
        sourceId: string | null;
        acquiredDay: number;
        stack: number;
        isHidden: boolean;
    }>;
    equippedRelicIds: string[];
    inventoryItemIds: string[];
    knownLoreIds: string[];
    relationshipStates: Array<{
        targetId: string;
        value: number;
        tags: string[];
    }>;
    temporaryEffects: Array<{
        effectId: string;
        remainingDays: number;
        payload: Record<string, unknown> | null;
    }>;
    routeAffinity: Array<{
        routeId: string;
        score: number;
    }>;
    statusFlags: string[];
};

export type FactionState = {
    factionId: string;
    trust: number;
    fear: number;
    interest: number;
    statusTags: string[];
    knownSecrets: string[];
    routeScore: number;
};

export type LogEntry = {
    id: string;
    day: number;
    phase: string;
    type: string;
    title: string;
    text: string;
    relatedEventId: string | null;
    relatedChoiceId: string | null;
    relatedBattleId: string | null;
    tags: string[];
};

export type RunState = {
    runId: string;
    day: number;
    maxDay: number;
    phase: Phase;
    player: PlayerState;
    factions: FactionState[];
    flags: string[];
    hiddenFlags: string[];
    completedEventIds: string[];
    seenEventIds: string[];
    scheduledEventIds: string[];
    battleState: null;
    lastEventId: string | null;
    lastChoiceId: string | null;
    currentRouteHints: string[];
    currentEndingCandidateIds: string[];
    logEntries: LogEntry[];
    createdAt: string;
    updatedAt: string;
};

export type VisibleChoice = {
    id: string;
    text: string;
    style: EventChoice["style"];
    locked: boolean;
    lockReasonText: string | null;
    previewText: string | null;
};

export type DayViewModel = {
    event: EventMaster | null;
    visibleChoices: VisibleChoice[];
    resultText: string | null;
};

export type GameSession = {
    runState: RunState;
    currentEvent: EventMaster | null;
    visibleChoices: VisibleChoice[];
    resultText: string | null;
};