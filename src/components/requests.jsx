import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, swapRequests } from "../store/actions";
import { startTimer } from "./../store/actions";

const Requests = () => {
  const dispatch = useDispatch();

  function handleRemove(request) {
    dispatch(deleteRequest(request));
  }
  const requests = useSelector((state) => state.entities.requests);

  let startingEntry;
  let endingEntry;
  function dragStart(e) {
    startingEntry = e.target.attributes.id.value;

    let empties = document.querySelectorAll(".empty");
    for (let empty of empties) {
      empty.className = "emptyInteract";
    }
    document.querySelector(".firstempty").className = "firstemptyInteract";
  }
  function dragEnd() {
    console.log("drag end");
    let empties = document.querySelectorAll(".emptyInteract");
    for (let empty of empties) {
      empty.className = "empty";
    }
    document.querySelector(".firstemptyInteract").className = "firstempty";
    let highlights = document.querySelectorAll(".hovering");
    for (let highlight of highlights) {
      highlight.className = "notHovering";
    }
  }
  function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function dragEnter(e) {
    let highlights = document.querySelector("#h" + e.target.id.substring(1));
    highlights.className = "hovering";
    e.preventDefault();
    e.stopPropagation();
  }
  function dragLeave(e) {
    let nohighlight = document.querySelector(".hovering");
    nohighlight.className = "notHovering";
  }
  function dragDrop(e) {
    endingEntry = e.target.id.substring(1);
    dispatch(
      swapRequests({
        start: startingEntry,
        end: endingEntry,
      })
    );
  }
  return (
    <div className="requestsContainer">
      <div
        className="firstempty"
        id="e0"
        onDragOver={(e) => dragOver(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragLeave={(e) => dragLeave(e)}
        onDrop={(e) => dragDrop(e)}
      ></div>
      <div className="notHovering" id="h0"></div>
      {requests.map((request) => (
        <div className="request" key={"keyR" + request.id}>
          <div>
            <div
              className="button1"
              draggable="true"
              onDragEnd={dragEnd}
              onDragStart={(e) => dragStart(e)}
              id={request.id}
            >
              {request.link ? (
                <a
                  onAuxClick={() => dispatch(startTimer())}
                  onClick={(e) => e.preventDefault()}
                  className="link"
                  href={request.link}
                  request={request}
                >
                  {request.id}. {request.subtype + " - " + request.name}
                  {request.message !== "" ? (
                    <div className="requestMessage">{request.message}</div>
                  ) : null}
                </a>
              ) : (
                <div>
                  <div
                    className="nolink"
                    onAuxClick={() => dispatch(startTimer())}
                    onClick={(e) => e.preventDefault()}
                  >
                    {request.id}. {request.subtype + " - " + request.name}
                  </div>
                  {request.message !== "" ? (
                    <div className="requestMessage">{request.message}</div>
                  ) : null}
                </div>
              )}
            </div>
            <button className="button2" onClick={() => handleRemove(request)}>
              X
            </button>
          </div>
          <div
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDrop={(e) => dragDrop(e)}
            className="empty"
            id={"e" + request.id}
          ></div>
          <div className="notHovering" id={"h" + request.id}></div>
        </div>
      ))}
    </div>
  );
};
export default Requests;
