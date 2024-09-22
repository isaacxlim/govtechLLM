import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatPage from "./page";
import { mockConversations, mockResponse } from "./mockData";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe("ChatPage", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ data: mockResponse });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the chat page and display conversations", () => {
    renderWithQueryClient(<ChatPage />);
    // Alternative way 1: Check if the element is not null
    const element = screen.queryByText("Start a New Conversation");
    expect(element).not.toBeNull();
  });

  it("should allow the user to create a new conversation", () => {
    renderWithQueryClient(<ChatPage />);

    const newConversationButton = screen.getByText("Start a New Conversation");
    fireEvent.click(newConversationButton);

    // Alternative way 2: Use toBeTruthy() to assert existence
    expect(screen.getByText("Conversation 1")).toBeTruthy();
  });

  it("should handle user input and submit a prompt", async () => {
    renderWithQueryClient(<ChatPage />);

    // Create a new conversation
    const newConversationButton = screen.getByText("Start a New Conversation");
    fireEvent.click(newConversationButton);

    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "What is the weather?" } });

    const sendButton = screen.getByRole("button");
    fireEvent.click(sendButton);

    // Ensure the API request was made
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/chat", {
        prompt: "What is the weather?",
        model: "gpt-3.5-turbo",
      });
    });

    // Ensure the bot response appears in the conversation
    expect(await screen.findByText("The weather today is sunny.")).toBeTruthy();
  });

  it("should display an error message if the API request fails", async () => {
    mockedAxios.post.mockRejectedValue(new Error("API Error"));
    renderWithQueryClient(<ChatPage />);

    // Create a new conversation
    const newConversationButton = screen.getByText("Start a New Conversation");
    fireEvent.click(newConversationButton);

    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "Test error" } });

    const sendButton = screen.getByRole("button");
    fireEvent.click(sendButton);

    // Wait for error toast to appear
    await waitFor(() => {
      expect(screen.queryByText("Something went wrong. Please try again.")).not.toBeNull(); // Alternative way 1: Check if error message exists
    });
  });
});
