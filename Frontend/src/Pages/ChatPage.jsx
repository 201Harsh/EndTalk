import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [isOpened, setisOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only auto-show sidebar on desktop
      if (!mobile) setShowSidebar(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chats = [
    {
      id: 1,
      name: "Alex Johnson",
      lastMessage: "See you tomorrow!",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Sarah Williams",
      lastMessage: "Thanks for the help",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Mike Peterson",
      lastMessage: "The documents are ready",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "Let me check and get back",
      time: "2 days ago",
      unread: 1,
      online: false,
    },
    {
      id: 5,
      name: "David Wilson",
      lastMessage: "Meeting at 3 PM",
      time: "3 days ago",
      unread: 0,
      online: true,
    },
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Simulate loading messages for the selected chat
    setMessages([
      { id: 1, text: "Hey there!", time: "10:00 AM", sent: false },
      { id: 2, text: "Hi! How are you?", time: "10:02 AM", sent: true },
      {
        id: 3,
        text: "I was wondering if we could meet tomorrow?",
        time: "10:05 AM",
        sent: false,
      },
      {
        id: 4,
        text: "Sure, what time works for you?",
        time: "10:10 AM",
        sent: true,
      },
      { id: 5, text: "How about 2 PM?", time: "10:15 AM", sent: false },
      { id: 6, text: "Perfect! See you then", time: "10:20 AM", sent: true },
    ]);
    if (isMobile) setShowSidebar(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="h-screen w-screen bg-[url(https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover bg-no-repeat overflow-hidden">
      <div className="flex h-full w-full bg-[hsla(0,0%,6%,0.7)] backdrop-blur-sm">
        {/* Mobile Header - Only shows when sidebar is hidden on mobile */}
        {isMobile && !showSidebar && !selectedChat && (
          <div className="absolute top-0 left-0 right-0 p-4 bg-[hsla(0,0%,6%,0.8)] z-10 flex justify-between items-center md:hidden">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400">
              EndTalk
            </h2>
            <button
              onClick={() => setShowSidebar(true)}
              className="text-white/70 hover:text-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Sidebar - Conversations List */}
        {showSidebar && (
          <div
            className={`${
              isMobile ? "absolute inset-0 z-20" : "relative"
            } w-full md:w-80 lg:w-96 bg-[hsla(0,0%,6%,0.8)] border-r border-white/10`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400">
                EndTalk
              </h2>
              <div className="flex space-x-3">
                <button className="text-white/70 hover:text-white">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
                {isMobile && (
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 pl-10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-white/50 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Chats List */}
            <div className="overflow-y-auto h-[calc(100%-120px)]">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 ${
                    selectedChat?.id === chat.id ? "bg-white/10" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[hsla(0,0%,6%,0.7)]"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-medium">{chat.name}</h3>
                      <span className="text-xs text-white/50">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-white/70 truncate max-w-[180px]">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            !selectedChat && !isMobile ? "hidden md:flex" : ""
          }`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b border-white/10 flex items-center justify-between bg-[hsla(0,0%,6%,0.8)]">
                <div className="flex items-center">
                  {isMobile && (
                    <button
                      onClick={() => {
                        setSelectedChat(null);
                        setShowSidebar(true);
                      }}
                      className="mr-2 text-white/70 hover:text-white"
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                  )}
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[hsla(0,0%,6%,0.7)]"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-medium">
                      {selectedChat.name}
                    </h3>
                    <p className="text-xs text-white/50">
                      {selectedChat.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <button className="text-white/70 hover:text-white">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[hsla(0,0%,6%,0.6)]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] lg:max-w-[60%] rounded-lg p-3 ${
                        msg.sent
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                          : "bg-white/10"
                      }`}
                    >
                      <p className="text-white">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sent ? "text-white/70" : "text-white/50"
                        }`}
                      >
                        {msg.time}{" "}
                        {msg.sent && (
                          <CheckIcon className="h-3 w-3 inline ml-1" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}/>
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-white/10 bg-[hsla(0,0%,6%,0.8)]">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 bg-white/10 border border-white/20 rounded-l-lg py-2 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 rounded-r-lg hover:from-cyan-600 hover:to-blue-700 transition"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : isMobile && !isOpened ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center mb-6">
                <UserIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No chat selected
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Tap the menu button to view conversations. Choose a conversation
                from the sidebar to begin messaging.
              </p>
              {!showSidebar && (
                <button
                  onClick={() => {
                    setShowSidebar(true);
                    setisOpened(true);
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition flex items-center"
                >
                  View conversations{" "}
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
