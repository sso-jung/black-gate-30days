import { EventMaster, RunState, VisibleChoice } from "@/src/types/game";
import { evaluateConditionGroups } from "@/src/rules/conditionEvaluator";

export function getVisibleChoices(
    event: EventMaster,
    runState: RunState,
): VisibleChoice[] {
    return event.choices
        .filter((choice) => evaluateConditionGroups(choice.showConditions, runState))
        .map((choice) => {
            const locked = evaluateConditionGroups(choice.lockConditions, runState);

            return {
                id: choice.id,
                text: choice.text,
                style: choice.style,
                locked,
                lockReasonText: locked ? choice.lockReasonText : null,
                previewText: choice.previewText,
            };
        });
}