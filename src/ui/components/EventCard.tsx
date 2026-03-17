import { StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    description: string;
    day: number;
};

export function EventCard({ title, description, day }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.day}>Day {day}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: 10,
        borderRadius: 16,
        padding: 16,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#333",
    },
    day: {
        color: "#aaa",
        fontSize: 13,
    },
    title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },
    description: {
        color: "#ddd",
        fontSize: 15,
        lineHeight: 22,
    },
});