import { Condition, ConditionGroup, RunState } from "@/src/types/game";

function evaluateCondition(condition: Condition, runState: RunState): boolean {
    switch (condition.type) {
        case "day_gte": {
            return runState.day >= Number(condition.value);
        }
        case "stat_gte": {
            const key = condition.target as keyof RunState["player"]["stats"];
            return runState.player.stats[key] >= Number(condition.value);
        }
        case "resource_gte": {
            const key = condition.target as keyof RunState["player"]["resources"];
            return runState.player.resources[key] >= Number(condition.value);
        }
        case "has_flag": {
            return runState.flags.includes(String(condition.target));
        }
        default:
            return false;
    }
}

export function evaluateConditionGroup(
    group: ConditionGroup,
    runState: RunState,
): boolean {
    if (!group.conditions.length) {
        return true;
    }

    if (group.operator === "AND") {
        return group.conditions.every((condition) =>
            evaluateCondition(condition, runState),
        );
    }

    return group.conditions.some((condition) =>
        evaluateCondition(condition, runState),
    );
}

export function evaluateConditionGroups(
    groups: ConditionGroup[],
    runState: RunState,
): boolean {
    if (!groups.length) {
        return true;
    }

    return groups.every((group) => evaluateConditionGroup(group, runState));
}