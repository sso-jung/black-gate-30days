import { EventMaster, RunState } from "@/src/types/game";
import { evaluateConditionGroups } from "@/src/rules/conditionEvaluator";

export function selectEvent(
    runState: RunState,
    eventPool: EventMaster[],
): EventMaster | null {
    const candidates = eventPool
        .filter((event) => event.isActive)
        .filter((event) => event.minDay === null || runState.day >= event.minDay)
        .filter((event) => event.maxDay === null || runState.day <= event.maxDay)
        .filter((event) => evaluateConditionGroups(event.conditions, runState))
        .filter((event) => !evaluateConditionGroups(event.blockConditions, runState))
        .filter((event) => {
            if (event.repeatPolicy === "once_per_run") {
                return !runState.completedEventIds.includes(event.id);
            }
            return true;
        });

    if (!candidates.length) {
        return null;
    }

    const maxPriority = Math.max(...candidates.map((event) => event.priority));
    const samePriority = candidates.filter(
        (event) => event.priority === maxPriority,
    );

    return samePriority[0] ?? null;
}