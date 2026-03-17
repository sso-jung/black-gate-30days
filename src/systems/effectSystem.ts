import { Effect, RunState } from "@/src/types/game";

export function applyEffects(effects: Effect[], runState: RunState): RunState {
    let nextState = { ...runState };

    for (const effect of effects) {
        switch (effect.type) {
            case "modify_resource": {
                if (!effect.target) break;
                const key = effect.target as keyof RunState["player"]["resources"];
                nextState = {
                    ...nextState,
                    player: {
                        ...nextState.player,
                        resources: {
                            ...nextState.player.resources,
                            [key]:
                            Number(nextState.player.resources[key]) + Number(effect.value),
                        },
                    },
                };
                break;
            }

            case "modify_stat": {
                if (!effect.target) break;
                const key = effect.target as keyof RunState["player"]["stats"];
                nextState = {
                    ...nextState,
                    player: {
                        ...nextState.player,
                        stats: {
                            ...nextState.player.stats,
                            [key]: Number(nextState.player.stats[key]) + Number(effect.value),
                        },
                    },
                };
                break;
            }

            case "add_flag": {
                if (!effect.target) break;
                if (nextState.flags.includes(effect.target)) break;
                nextState = {
                    ...nextState,
                    flags: [...nextState.flags, effect.target],
                };
                break;
            }

            case "remove_flag": {
                if (!effect.target) break;
                nextState = {
                    ...nextState,
                    flags: nextState.flags.filter((flag) => flag !== effect.target),
                };
                break;
            }

            default:
                break;
        }
    }

    return {
        ...nextState,
        updatedAt: new Date().toISOString(),
    };
}