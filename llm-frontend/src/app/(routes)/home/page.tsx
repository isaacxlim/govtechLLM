"use client";

import axios from "axios";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { formSchema } from "./constants";
import toast from "react-hot-toast";


const ChatPage = () => {
    const [messages, setMessages] = useState<
        { content: string; role: string }[]
    >([]);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!selectedModel) {
            setError("Please select an index.");
            toast.error("No index selected");
            return;
        }
        setError(null);
    
        try {
            const userMessage = {
                content: values.prompt,
                role: "user",
            };
    
            const newMessages = [...messages, userMessage];
            const response = 
        }

    return (
        <div>
            <div className="flex flex-col lg:flex-row max-w-3xl">
                <Heading
                    title="ALEX Chat"
                    description="ALEX Chat accesses our extensive database, populated with local educational material, including past year papers, 10-year series questions and answers, school notes and much more!"
                    icon={MessageSquare}
                    iconColor="text-green-500"
                    bgColor="bg-green-500/10"
                />
                <div className="mt-2 ml-4 mb-3">
                    <Combobox onChange={setSelectedModel} />
                    <div className="ml-1">
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <textarea
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full resize-none"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle?"
                                                {...field}
                                                ref={textareaRef}
                                                rows={1}
                                                onInput={(
                                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                                ) => {
                                                    e.target.style.height =
                                                        "auto";
                                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                                }}
                                                onKeyDown={(e) => {
                                                    if (
                                                        e.key === "Enter" &&
                                                        !e.shiftKey
                                                    ) {
                                                        e.preventDefault();
                                                        form.handleSubmit(
                                                            onSubmit
                                                        )();
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No Chat started." />
                    )}

                    <div className="flex flex-col gap-y-4">
                        {formattedGroupedMessages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user"
                                        ? "bg-white border border-black/10"
                                        : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? (
                                    <UserAvatar user={user} />
                                ) : (
                                    <BotAvatar />
                                )}
                                <div
                                    className="text-sm whitespace-pre-wrap"
                                    style={{ fontFamily: "inherit" }}
                                >
                                    {message.content}
                                </div>{" "}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
