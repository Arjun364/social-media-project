import React, { useState, useRef, useEffect } from 'react';
// icons
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
const Message = () => {
    const [chatbox, setChatbox] = useState(null)
    const messages = [
        {
            name: "Henry Dholi",
            message: "I came across your profile and...",
            time: "1:55pm",
            active: true,
        },
        {
            name: "Mariya Desoja",
            message: "I like your confidence 👍",
            time: "1:50pm",
            active: true,
        },
        {
            name: "Robert Jhon",
            message: "Can you share your offer?",
            time: "1:45pm",
            active: false,
        },
        {
            name: "Cody Fisher",
            message: "I'm waiting for your response!",
            time: "1:40pm",
            active: false,
        },
        {
            name: "Jenny Wilson",
            message: "I came across your profile and...",
            time: "1:35pm",
            active: false,
        },
        {
            name: "Jenny Wilson",
            message: "I came across your profile and...",
            time: "1:35pm",
            active: false,
        },
        {
            name: "Jenny Wilson",
            message: "I came across your profile and...",
            time: "1:35pm",
            active: false,
        },
        {
            name: "Jenny Wilson",
            message: "I came across your profile and...",
            time: "1:35pm",
            active: false,
        },
    ];

    console.log(chatbox);

    return (
        <div className="h-full w-full dark:bg-gray-900 dark:text-white flex  relative overflow-hidden">
            {/* Sidebar */}
            <div className={`${chatbox ? 'hidden' : ' '} absolute z-10 bg-white dark:bg-gray-900 xl:relative w-full xl:w-1/3 h-full px-2 py-4 border-r border-slate-400 dark:border-gray-700 flex flex-col gap-4`}>
                <h2 className="text-2xl font-semibold">Active Conversations</h2>
                {/* search */}
                <div className='border-2 border-solid flex items-center justify-around pe-4 '>
                    <input type="text" placeholder="Search..." className="w-full p-2 rounded border-0 focus:ring-0 dark:bg-gray-800 dark:text-gray-300" />
                    <IoIosSearch className='text-[1.5rem] cursor-pointer' />
                </div>
                <ul className='h-full overflow-x-hidden overflow-y-scroll'>
                    {messages.map((chat, index) => (
                        <li key={index} className={`flex items-center gap-4 p-3 rounded ${chat.active ? "dark:bg-gray-800" : "dark:hover:bg-gray-800"} mb-2 cursor-pointer`} onClick={() => setChatbox(true)}>
                            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                            <div>
                                <p className="font-semibold">{chat.name}</p>
                                <p className="text-sm text-gray-400">{chat.message}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Area */}
            {
                chatbox == null ? <div className='flex-1 flex items-center justify-center gap-4'>
                    <h2>Chat Box</h2>
                    <IoChatboxEllipses className='text-[3rem]'/>
                </div>
                :
                    <div className="flex-1 flex flex-col pb-[4rem] md:pb-0">
                        <div className="p-4 border-b border-slate-400 dark:border-gray-700 flex items-center justify-between">
                            <div className='flex items-center gap-4'>
                                < IoIosArrowBack className='cursor-pointer text-[1.5rem]' onClick={() => setChatbox(false)} />
                                <div>
                                    <h3 className="text-xl font-semibold">Henry Dholi</h3>
                                    <p className="text-sm text-gray-400">Reply to message</p>
                                </div>
                            </div>
                            <div className="text-gray-500">...</div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded self-start max-w-sm">
                                        I want to make an appointment tomorrow from 2:00 to 5:00pm?
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">1:55pm</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="bg-blue-600 text-white p-3 rounded self-end max-w-sm">
                                        Hello, Thomas! I will check the schedule and inform you
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1 text-right">
                                        1:55pm
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded self-start max-w-sm">
                                        Ok, Thanks for your reply.
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">1:55pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex items-center gap-2 border-t border-slate-400 dark:border-gray-700">
                            <input
                                type="text"
                                placeholder="Type something here..."
                                className="flex-1 p-2 dark:bg-gray-800 rounded dark:text-gray-300"
                            />
                            <button className="bg-blue-600 p-2 rounded text-white">Send</button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Message;
