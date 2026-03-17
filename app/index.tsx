import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import {
    chooseOption,
    continueAfterResult,
    createGameSession,
    startNewGame,
} from "@/src/app/gameController";
import { StartScreen } from "@/src/ui/StartScreen";
import { RunScreen } from "@/src/ui/RunScreen";
import { GameSession } from "@/src/types/game";

export default function IndexScreen() {
    const [session, setSession] = useState<GameSession>(createGameSession());

    const isAtTitle =
        session.runState.phase === "start" &&
        !session.currentEvent &&
        !session.resultText;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            {isAtTitle ? (
                <StartScreen onStart={() => setSession((prev) => startNewGame(prev))} />
            ) : (
                <RunScreen
                    session={session}
                    onSelectChoice={(choiceId) =>
                        setSession((prev) => chooseOption(prev, choiceId))
                    }
                    onContinue={() =>
                        setSession((prev) => continueAfterResult(prev))
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0d0d0d",
    },
});