import React from 'react'
import { IconButton, InputAdornment } from "@mui/material";
import "./chat.css";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Box, Typography, Paper } from "@mui/material";
import { useState } from "react";

interface ChatMessage {
  sender: string;
  message: string;
}
;

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "Bot", message: "Hello, How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: "User", message: input }, 
      { sender: "Bot", message: "This is a default reply from bot" }, 
    ]);

    setInput(""); 
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if(e.key === "Enter"){
      e.preventDefault();
      handleSendMessage();
    }
  }
  return (
    <div className="chat">
      <div className="chat-history">
        <Box
          sx={{
            height: "80vh",
            width: "60vw",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          {chatHistory.map((chat, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 2,
                mb: 1.5,
                alignSelf: chat.sender === "User" ? "flex-end" : "flex-start",
                backgroundColor: chat.sender === "User" ? "#e3f2fd" : "#e8f5e9",
                maxWidth: "80%",
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: "bold" }}
              >
                {chat.sender}
              </Typography>
              <Typography variant="body1">{chat.message}</Typography>
            </Paper>
          ))}
        </Box>
      </div>
      <div className="chat-type">
        <TextField
          id="input-with-icon-textfield"
          label="Type something to chat"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleEnter}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
          sx={{ width: "60vw" }}
        />
      </div>
    </div>
  );
        }
export default Chat;