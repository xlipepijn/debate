import Conversation from "../components/ConversationTwo";
import { getConversations, joinConversation } from "../API/Calls";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Lobby = ({ page, getNextPage, setPage, history }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const joinAndGoToConversation = (room, currentUser) => {
    joinConversation(room, currentUser)
      .then(() => history.push(`chat/${room}`))
      .catch(() => {
        alert(
          "this discussion is already full! try to join a different discussion"
        );
        getNextPage();
      });
  };

  // Get the conversations
  useEffect(() => {
    setLoading(true);
    getConversations(page)
      .then((json) => setConversations(json))
      .then(() => setLoading(false))
      .catch(() => console.log('no conversations found'))
  }, [page]);


  // Go to first page if next page is empty
  useEffect(() => {

    if (!conversations[0] || conversations[0] === undefined) {
      setPage(1);
    }
  }, [conversations]);



  return (
    <div className="lobby">
      {loading && <Loading />}
      <div className={!conversations[0] ? "empty-lobby" : "lobby-grid"}>
        {/* {!!conversations && <p>EMPP</p>} */}
        {!conversations[0] ? (
          <div style={{textAlign:'center', margin:'40px'}}>
            {" "}
            <p style={{fontWeight:'400', fontSize: '16px'}}>
              No conversations currently available to join
            </p>
             {/* <span style={{fontSize:'14px'}}>You can create the first conversation by pressing the 'Start my own discussion' button above here  </span>{" "} */}
          </div>
        ) : (
          conversations.map((i) => (
            <Conversation
              topic={i.topic}
              color1={i.joinedUsers[0].color1}
              color2={i.joinedUsers[0].color2}
              color3={i.joinedUsers[0].color3}
              id={i._id.$oid}
              joinConversation={joinAndGoToConversation}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Lobby;
