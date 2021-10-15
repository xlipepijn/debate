import { AiOutlineLink } from "react-icons/ai";
import { IconContext } from "react-icons";
const Credits = (props) => {
    return (
      <>
        <div className={props.right ? "credits-container right-aligned" : 'credits-container'}>
          <a
            href="https://www.linkedin.com/in/pepijn-eikelboom-60a322133/"
            target="_blank"
          >
            <div style={{ alignContent: "center" }} className="flex">
              <div className="flex" style={{ marginRight: "3px" }}></div>
              <p style={{ fontSize: "12px" }}>
                Created by
                <IconContext.Provider value={{ className: "link-icon" }}>
                  <AiOutlineLink />
                </IconContext.Provider>
                <span style={{ color: "#CF3636", fontWeight: "700" }}>
                  Pepijn Eikelboom
                </span>
              </p>
            </div>
          </a>
        </div>
      </>
    );
}

export default Credits
