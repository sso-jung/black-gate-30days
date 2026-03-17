import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>검은 성문 30일</Text>
            <Text style={styles.subtitle}>
                멸망 30일 전으로 돌아온 기사 후보생의 첫날
            </Text>

            <Pressable style={styles.button} onPress={onStart}>
                <Text style={styles.buttonText}>새 게임 시작</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        gap: 16,
        padding: 24,
        backgroundColor: "#0d0d0d",
    },
    title: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "800",
        textAlign: "center",
    },
    subtitle: {
        color: "#bbb",
        fontSize: 15,
        textAlign: "center",
        lineHeight: 22,
    },
    button: {
        marginTop: 8,
        paddingVertical: 16,
        borderRadius: 14,
        backgroundColor: "#2c2c2c",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "700",
    },
});