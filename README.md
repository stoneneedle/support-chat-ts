# Support Chat v1

## Overview
This project is a real-time support chat intended for small business or personal use, the design loosely based on [Project JJ](https://pjj.cc) chat rooms created by Tino Didriksen. The design is intended to be as simple and minimalist as possible.

This new and improved version of the design features a React frontend to improve speed and quality of life, since the original version uses PHP and frames, causing performance lags.

Although this design is intended to be more general, the original design was for a Star Wars chat room created in the early 2000s. Since then Project JJ has grown to contain a number of topic-based chats, mostly for freeform real-time text-based roleplaying.

## Usage
The chats have an active user menu on the sidebar, a bottom login/message bar for sending chat messages, and a chat window display that also contains a landing page.

## Developer Installation
You may use the following commands to install the chat on your system.

```
[Terminal 1]
user@machine:~$ git clone https://github.com/stoneneedle/support-chat-ts.git
user@machine:~$ cd support-chat-ts/server
user@machine:~/support-chat-ts/server$ npm i
user@machine:~$/support-chat-ts/server npm run dev

[Terminal 2]
user@machine:~$ cd support-chat-ts/client
user@machine:~/support-chat-ts/client$ npm i
user@machine:~$/support-chat-ts/client npm run dev

```

## Technologies Used
Intended to be a light MERN stack, this project makes use of NodeJS, Vite, React Typescript, and JavaScript on the frontend.

On the backend, nedb (essentially an equivalent to sqlite3 for MongoDB) is used with an express server with NodeJS. The database can be viewed as JSON for ease of debugging.

Additional miscellaneous libraries are used as needed, such as [Crypto-JS](https://www.npmjs.com/package/crypto-js) for hashing IPs/passwords, or [Date-FNS](https://date-fns.org/) for date math/display.

## Ideas for Future Improvement
Numerous ways of expanding the chat could follow PJJ's original design. This new system would provide additional speed and decreased time in network access for each feature.

1. User Profile Creation: Registered users can make a user profile accessible when their icon link is clicked.
1. Message Board: A Bulletin Board System (BBS)-like system for displaying long term updates and announcements is possible.
1. Admin Panel: A view for adding/removing users, kicking/banning interface, etc. This would also include a way of seeing when a given user was last active, and based on varying time periods, understand which users have gone inactive.
1. Admin Chat Customization Panel: A view allowing admins to customize chat refresh speed, message of the day (MOTD), default icons, and other aesthetic and functional aspects of their chat rooms.
1. Chat Portal: A view for viewing chats, as well as which ones are active right now.
1. Chat Creation/Removal: A view for adding/removing chat rooms into the system, so that anyone could create their own or remove their chat room when finished.

## User Stories

**Chat Room Administrator**

As a chat room administrator, I want to create a chat room, so that I can engage collaboratively with users on a chosen topic of discussion.

As a chat room administrator, I want to add new users, so that I can

As a chat room administrator, I want to remove old users, so that I can keep the user list up to date as community size changes, and know how big the active user base is.

**Chat Room Moderator**

As a chat room moderator, I want to ban trouble users, so that I can keep the environment free from harmful content.

**Chat Room User**

As a chat room user, I want to see who is actively online, so that I can participate in discussions.

As a chat room user, I want to register for an online community, so that I can engage upon a topic of interest to me.

As a chat room user, I want to create a profile, so that I can make my own web site and other users can see created content.

## Wireframes

### Wireframe 1 (Index)
![Support Chat Wireframe 1](https://jamesgroth.net/assets/wireframes/SupportChat.png "Support Chat 1")
![Support Chat Wireframe 2](https://jamesgroth.net/assets/wireframes/SupportChat2.png "Support Chat 2")

## References
Project JJ. (2022). "Project JJ Chats - Let Worlds Unfold." Retrieved August 16, 2022, from https://pjj.cc/.

