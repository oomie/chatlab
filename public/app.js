window.addEventListener("load", () => {

    setInterval(() => {     //get messages from server every 2 seconds
        refreshMsgs();
    }, 2000);


    let chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {     // on form submission
        e.preventDefault();
        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;
        console.log("chat sent!", chatName, chatMsg);

        let msgObj = {
            "name": chatName,
            "msg": chatMsg,
            "updateAt" : new Date()
        };

        let msgObjJSON = JSON.stringify(msgObj);
        console.log(msgObj);

        fetch('/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: msgObjJSON
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });
    });
});


function refreshMsgs() {
    fetch('/messages')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById("chat-msgs").innerHTML = "";
            let allchats = data.msgs;
            allchats.forEach((chat) => {
                let chatcontainer = document.createElement('li');
                let nameElt = document.createElement('p');
                let msgElt = document.createElement('p');
                nameElt.innerHTML = chat.name;
                msgElt.innerHTML = chat.msg;

                //append elts as per their heirarchy
                chatcontainer.appendChild(nameElt);
                chatcontainer.appendChild(msgElt);
                document.getElementById("chat-msgs").appendChild(chatcontainer);
            })
            //clear out the HTML div that contains all the messages
            //add all the new messages that we have
        })
}


/* what happens on form submission?
1. get the value of what the user typed - DONE
2a. Sent message to the server - DONE
2b. store the message on server side 
3. display the chat message on screen
 
*/



