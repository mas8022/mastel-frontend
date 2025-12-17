// In a real app, you would fetch this data from a server
// For now, we're using mock data

export type User = {
  id: string;
  username: string;
  avatar: string;
};

export type Message = {
  sender: User;
  content: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  username: string;
  avatar: string;
  messages: Message[];
};

export const loggedInUser: User = {
  id: "user0",
  username: "You",
  avatar: "https://picsum.photos/seed/0/200/200",
};

const users: User[] = [
  loggedInUser,
  {
    id: "user1",
    username: "Alice",
    avatar: "https://picsum.photos/seed/1/200/200",
  },
  {
    id: "user2",
    username: "Bob",
    avatar: "https://picsum.photos/seed/2/200/200",
  },
  {
    id: "user3",
    username: "Charlie",
    avatar: "https://picsum.photos/seed/3/200/200",
  },
  {
    id: "user4",
    username: "Design Team",
    avatar: "https://picsum.photos/seed/4/200/200",
  },
  {
    id: "user5",
    username: "Project Phoenix",
    avatar: "https://picsum.photos/seed/5/200/200",
  },
];

export const chats: Chat[] = [
  {
    id: "chat1",
    username: "Alice",
    avatar: users[1].avatar,
    messages: [
      {
        sender: users[1],
        content: "Hey, how's it going?",
        timestamp: "10:00 AM",
      },
      {
        sender: loggedInUser,
        content:
          "Pretty good! Just working on the new messenger app. What do you think?",
        timestamp: "10:01 AM",
      },
      {
        sender: users[1],
        content: "Wow, this purple theme is amazing! 💜",
        timestamp: "10:02 AM",
      },
      {
        sender: users[1],
        content: "Hey, how's it going?",
        timestamp: "10:00 AM",
      },
      {
        sender: loggedInUser,
        content:
          "Pretty good! Just working on the new messenger app. What do you think?",
        timestamp: "10:01 AM",
      },
      {
        sender: users[1],
        content: "Wow, this purple theme is amazing! 💜",
        timestamp: "10:02 AM",
      },
      {
        sender: users[1],
        content: "Hey, how's it going?",
        timestamp: "10:00 AM",
      },
      {
        sender: loggedInUser,
        content:
          "Pretty good! Just working on the new messenger app. What do you think?",
        timestamp: "10:01 AM",
      },
      {
        sender: users[1],
        content: "Wow, this purple theme is amazing! 💜",
        timestamp: "10:02 AM",
      },
    ],
  },
  {
    id: "chat2",
    username: "Design Team",
    avatar: users[4].avatar,
    messages: [
      {
        sender: users[2],
        content: "Meeting at 3 PM to review the new sticker designs.",
        timestamp: "11:30 AM",
      },
      {
        sender: users[3],
        content: "Sounds good, I'll be there.",
        timestamp: "11:31 AM",
      },
      {
        sender: loggedInUser,
        content: "I've got some AI suggestions for stickers ready to show!",
        timestamp: "11:32 AM",
      },
    ],
  },
  {
    id: "chat3",
    username: "Bob",
    avatar: users[2].avatar,
    messages: [
      {
        sender: users[2],
        content: "Did you see the latest Next.js update?",
        timestamp: "Yesterday",
      },
      {
        sender: loggedInUser,
        content: "Yeah, server actions are getting powerful.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "chat4",
    username: "Project Phoenix",
    avatar: users[5].avatar,
    messages: [
      {
        sender: users[1],
        content: "Launch plan is approved!",
        timestamp: "Yesterday",
      },
      {
        sender: loggedInUser,
        content: "That's great news!",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "chat5",
    username: "Charlie",
    avatar: users[3].avatar,
    messages: [
      { sender: users[3], content: "Lunch today?", timestamp: "9:00 AM" },
      {
        sender: loggedInUser,
        content: "Sure, where to?",
        timestamp: "9:01 AM",
      },
    ],
  },
];
