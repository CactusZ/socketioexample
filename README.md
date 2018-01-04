# Socket.io chat example

This is the source code for a very simple chat example made with socket.io.
As the basis the [Getting Started](http://socket.io/get-started/chat/) guide source code was used.

Additional improvements (from Homework section):
1) Online user list
2) "User is typing" functionality
3) System notifications when user logins/disconnects
4) Nickname support
5) Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.


To install application execute
`npm install`

To run application execute
` node index.js ` and connect to `localhost:3000` via browser.
