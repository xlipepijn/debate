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
      .then(() => setLoading(false));
  }, [page]);


  // Go to first page if next page is empty
  useEffect(() => {
    if (conversations[0] === undefined) {
      setPage(1);
    }
  }, [conversations]);

  return (
    <div className="lobby">
      {loading && <Loading />}
      <div className="lobby-grid">
        {conversations.map((i) => (
          <Conversation
            topic={i.topic}
            color1={i.joinedUsers[0].color1}
            color2={i.joinedUsers[0].color2}
            color3={i.joinedUsers[0].color3}
            id={i._id.$oid}
            joinConversation={joinAndGoToConversation}
          />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
