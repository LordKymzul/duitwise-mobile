import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, ActivityIndicator, useColorScheme } from "react-native";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle } from "src/core/constant/Texts";
import ChatCard from "./chat-card";
import { useEffect, useState } from "react";
import { COLORS } from "src/core/constant/Colors";


interface Message {
    id: string;
    message: string;
    isUserMessage: boolean;
    isVisible: boolean;
    isText: boolean;
    path?: string;
    isOptions?: boolean;
}



const AiAgentSheet = () => {

    let messageData: Message[] = [
        {
            id: "1",
            message: "Hello, I'm JuruWang AI Agent. I noticed you from financial fitness that you have low investment on low-risk investment. I suggest to allocate RM5,600 to ASB unit trust. Would you like to proceed?",
            isUserMessage: false,
            isVisible: true,
            isText: true,
            isOptions: true,
        },
        {
            id: "2",
            message: "Yes, I would like to proceed.",
            isUserMessage: true,
            isVisible: false,
            isText: true,
            isOptions: false,
        },
        {
            id: "3",
            message: "Transfer RM5,600 to ASB unit trust with RM 10000 through FPX. Would you like to proceed?",
            isUserMessage: false,
            isVisible: false,
            isText: false,
            isOptions: false,
            path: '@assets/images/paynet.jpeg'
        },
        {
            id: "4",
            message: "Successfully transferred RM5,000 to ASB unit trust.",
            isUserMessage: false,
            isVisible: false,
            isText: true,
            isOptions: false,
        },

    ];

    const [messages, setMessages] = useState<Message[]>(messageData);

    const [isLoading, setIsLoading] = useState(false);

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];



    const onYesPress = async (id: string, index: number) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const nextMessage = messages[index + 1];
        if (nextMessage) {
            nextMessage.isVisible = true;
        }

        if (nextMessage.message === "Yes, I would like to proceed.") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            messages[index + 1 + 1].isVisible = true;
        }


        setMessages([...messages]);
        setIsLoading(false);
    }

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        }}>



            {
                messages.map((message, index) => (
                    message.isVisible && (
                        <View key={index} style={{
                            width: "100%",
                            marginVertical: Sizes.spacing.sm,
                        }}>
                            <ChatCard
                                isText={message.isText}
                                key={index}
                                isUserMessage={message.isUserMessage}
                                message={message.message}
                                isVisible={message.isVisible}
                                isOptions={message.isOptions ?? false}
                                onYesPress={() => {
                                    onYesPress(message.id, index);
                                }}
                                onNoPress={() => {
                                    console.log("no");
                                }}

                            />
                        </View>
                    )
                ))}
            {isLoading && <ActivityIndicator size="small" color={colors.tint} />}

        </View>
    )
}




export default AiAgentSheet;