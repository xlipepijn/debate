

// function makeCall({ room }) {
//   return new Promise((resolve) => {
//     const URLEndConversation = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/endConversation?conversationId=${room}`;
//     console.log("help mehhh");
//     fetch(URLEndConversation, {
//       method: "DELETE",
//     })
//     .then(setTimeout(() => resolve(), 500) )
//   });
// }

const joinConversation = ( room, currentUser ) => {
  return new Promise((resolve, reject) => {
    const URLJoinConversation = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/joinConversation?conversationId=${room}`;

    fetch(URLJoinConversation, {
      method: "PUT",
      body: JSON.stringify({
        challenger: {
          id: currentUser.userId,
          color1: currentUser.color1,
          color2: currentUser.color2,
          color3: currentUser.color3,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => json === true ? resolve() : reject() )
      .catch((err) => reject(err));
  }); 
};

const getConversations = (page) => {

  const URLGetConversations = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/getConversations?page=${page}`;
  return new Promise((resolve, reject) => {
    fetch(URLGetConversations)
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err))


  })
};

const createNew = (topic, userId, color1, color2, color3) => {
  return new Promise((resolve) => {
  const URL =
    "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/createConversation";
  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      topic: topic,
      joinedUsers: [
        {
          id: userId,
          color1: color1,
          color2: color2,
          color3: color3,
        },
      ],
    }),
  })
  .then(() => resolve());
})};


const getJoinedConversation = (userId) => {
  return new Promise((resolve, reject) => {
    const URL = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/getCreated?userId=${userId}`;

    fetch(URL)
    .then((res) => res.json())
    .then((json) => resolve(json))
    .catch(() => reject())
  });
};

const getConversation= (room) => {
  return new Promise ((resolve, reject) => {
  const URLGetUsers = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/getConversations?filter=${room}`;
  fetch(URLGetUsers)
    .then((res) => res.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err))
  })
};

const endConversation = (room) => {
  const URLEndConversation = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-pieyv/service/Pepapp/incoming_webhook/endConversation?conversationId=${room}`;
  return new Promise((resolve, reject) => {
    fetch(URLEndConversation, {
      method: 'DELETE'
    })
    .then(() => resolve())
    .catch((err) => reject(err))
  })
}

export {joinConversation, getConversations, createNew, getJoinedConversation, getConversation, endConversation };
