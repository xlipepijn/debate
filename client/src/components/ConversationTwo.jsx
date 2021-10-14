
const Conversation = ({topic,color1, color2, color3, id, joinConversation}) => {

  const currentUser = localStorage;

  return (
    <div>
      {/* {conversations.map((i) => ( */}
      <div
        style={{
          borderColor: color1,
          borderTopWidth: "6px",
          borderStyle: "solid",
          backgroundColor: "#FFFCF6",
        }}
        className="conversation"
      >
        <div style={{ position: "absolute", top: "-25px", left: "42%" }}>
          {/* <Avatar size="46px" color1={color1} color2={color2} color3={color3} /> */}
        </div>
        <div className="conversation-meta-data">
          <div className="topic-container">
            <p>{'"' + topic + '"'}</p>
          </div>

          <button
            onClick={() => joinConversation(id, currentUser)}
            className="primary-button font-thinner"
          >
            Challenge believe
          </button>
        </div>
      </div>
      {/* ))} */}
      {/* <button onClick={getNextPage}>Show me other topics</button> */}
    </div>
  );
};

export default Conversation;
