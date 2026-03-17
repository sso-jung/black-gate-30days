import { StyleSheet, Text, View } from "react-native";

type Props = {
    text: string;
};

export function ResultCard({ text }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>결과</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: "#1a1a1a",
        borderWidth: 1,
        borderColor: "#444",
        gap: 8,
    },
    label: {
        color: "#bbb",
        fontSize: 13,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 24,
    },
});