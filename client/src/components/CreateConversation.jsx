import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import { createNew, getJoinedConversation } from "../API/Calls";
import { templates } from "../Contents/Templates";
import { useHistory} from 'react-router-dom';

const CreateConversation = ({ userId, color1, color2, color3, toggleModal }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [fields, setFields] = useState(["", ""]);
  const [total, setTotal] = useState("");
  const [chosenTemplate, setChosenTemplate] = useState(
    "... is better than ..."
  );
  let history = useHistory();
  const template = templates.filter((i) => i.name === chosenTemplate);

  //JSON.stringify(i._id.$oid)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {
      createNew(total, userId, color1, color2, color3)
        .then(() => getJoinedConversation(userId))
        .then((json) =>
          history.push(`chat/${JSON.stringify(json._id.$oid).slice(1, -1)}`)
        );
    }
  }, [total]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTotal(
      (typeof fields[0] !== "undefined" ? fields[0] : "") +
        template[0].content.filter((i) => typeof i === "string") +
        (typeof fields[1] !== "undefined" ? fields[1] : "")
    );
    setFields(["", ""]);
  };

  const test = () => {
    console.log("tesst");
  };

  return (
    <div>
      <div className="modal-background">
        <div className="modal">
          <div className="close-button" onClick={toggleModal}>
            <IconContext.Provider value={{ className: "close-icon" }}>
              <GrClose />
            </IconContext.Provider>
          </div>
          <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>
            Start a new discussion
          </h2>
          <label>Choose a template</label>

          {/* Dropdown */}
          <select
            value={chosenTemplate}
            onChange={(e) => (
              setChosenTemplate(e.target.value), setFields(["", ""])
            )}
          >
            {templates.map((i) => (
              <option value={i.name}>{i.name}</option>
            ))}
          </select>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="new-topic-container">
              {template[0].content.map((c, index) =>
                typeof c === "string" ? (
                  <h3> {c} </h3>
                ) : index === 0 ? (
                  <input
                    placeholder="input something here..."
                    value={fields[0]}
                    onChange={(e) =>
                      typeof e.target.value !== "undefined" &&
                      setFields([e.target.value, fields[1]])
                    }
                  />
                ) : (
                  <input
                    placeholder="input something here..."
                    value={fields[1]}
                    onChange={(e) => setFields([fields[0], e.target.value])}
                  />
                )
              )}
            </div>
            <button className="primary-button"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CreateConversation;
