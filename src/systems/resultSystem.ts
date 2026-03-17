import { ChoiceResultGroup, EventChoice, RunState } from "@/src/types/game";
import { evaluateConditionGroups } from "@/src/rules/conditionEvaluator";

export function resolveChoiceResult(
    choice: EventChoice,
    runState: RunState,
): ChoiceResultGroup | null {
    const candidates = choice.resultGroups.filter((group) =>
        evaluateConditionGroups(group.conditions, runState),
    );

    if (!candidates.length) {
        return null;
    }

    return candidates[0] ?? null;
}