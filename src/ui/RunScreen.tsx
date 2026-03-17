import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { GameSession } from "@/src/types/game";
import { EventCard } from "@/src/ui/components/EventCard";
import { ChoiceButton } from "@/src/ui/components/ChoiceButton";
import { ResultCard } from "@/src/ui/components/ResultCard";

type Props = {
    session: GameSession;
    onSelectChoice: (choiceId: string) => void;
    onContinue: () => void;
};

export function RunScreen({ session, onSelectChoice, onContinue }: Props) {
    const { runState, currentEvent, visibleChoices, resultText } = session;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.statusPanel}>
                <Text style={styles.statusTitle}>현재 상태</Text>
                <Text style={styles.statusText}>Day {runState.day}</Text>
                <Text style={styles.statusText}>체력 {runState.player.resources.hp}</Text>
                <Text style={styles.statusText}>
                    정보 {runState.player.resources.knowledge}
                </Text>
                <Text style={styles.statusText}>
                    명성 {runState.player.resources.reputation}
                </Text>
            </View>

            {currentEvent ? (
                <EventCard
                    title={currentEvent.title}
                    description={currentEvent.description}
                    day={runState.day}
                />
            ) : null}

            {!!visibleChoices.length && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>선택지</Text>
                    <View style={styles.choiceList}>
                        {visibleChoices.map((choice) => (
                            <ChoiceButton
                                key={choice.id}
                                text={choice.text}
                                enabled={!choice.locked}
                                previewText={choice.previewText}
                                lockReasonText={choice.lockReasonText}
                                onPress={() => onSelectChoice(choice.id)}
                            />
                        ))}
                    </View>
                </View>
            )}

            {resultText ? (
                <View style={styles.section}>
                    <ResultCard text={resultText} />
                    <Pressable style={styles.continueButton} onPress={onContinue}>
                        <Text style={styles.continueText}>다음으로</Text>
                    </Pressable>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
        backgroundColor: "#0d0d0d",
        minHeight: "100%",
    },
    statusPanel: {
        borderRadius: 16,
        backgroundColor: "#141414",
        borderWidth: 1,
        borderColor: "#303030",
        padding: 16,
        gap: 6,
    },
    statusTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4,
    },
    statusText: {
        color: "#d6d6d6",
        fontSize: 14,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    choiceList: {
        gap: 10,
    },
    continueButton: {
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#2c2c2c",
    },
    continueText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },
});