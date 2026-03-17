import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    text: string;
    enabled: boolean;
    previewText?: string | null;
    lockReasonText?: string | null;
    onPress: () => void;
};

export function ChoiceButton({
                                 text,
                                 enabled,
                                 previewText,
                                 lockReasonText,
                                 onPress,
                             }: Props) {
    return (
        <Pressable
            style={[styles.button, !enabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={!enabled}
        >
            <Text style={styles.text}>{text}</Text>
            {previewText ? <Text style={styles.preview}>{previewText}</Text> : null}
            {!enabled && lockReasonText ? (
                <Text style={styles.lock}>{lockReasonText}</Text>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 12,
        padding: 14,
        gap: 4,
        backgroundColor: "#1f1f1f",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    preview: {
        color: "#bbb",
        fontSize: 12,
    },
    lock: {
        color: "#ffb3b3",
        fontSize: 12,
    },
});