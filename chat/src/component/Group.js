import React, { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

const Group = () => {
  const [list, setList] = useState(null);
  const [choosen, setchoosen] = useState([]);
  let id = decodeToken(localStorage.getItem("auth")).user[0]._id;
  let get = async () => {
    let respons = await fetch("http://127.0.0.1:3005/auth/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    let data = await respons.json();
    setList(data);
  };
  let handle = (e) => {
    e.preventDefault();
    let ok = false,
      toSet;
    list.map((item) => {
      if (item.email == e.target.message.value) {
        ok = true;
        toSet = item;
      } else return item;
    });
    if (ok) {
      if (!choosen.includes(toSet)) {
        setchoosen([...choosen, toSet]);
      }
    }
    e.target.message.value = ''
  };
  let handle2 = async (e) => {
    e.preventDefault();
    if (choosen.length <= 2) {
      alert("group size must be at least 3");
    } else {
      let res = await fetch("http://127.0.0.1:3005/chat/getChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: choosen,
        }),
      });
      res = await res.json();

      window.location.replace("http://localhost:3000/message/" + res._id);
    }
  };
  useEffect(() => {
    if (!choosen.includes(decodeToken(localStorage.getItem("auth")).user[0])) {
      setchoosen([
        ...choosen,
        decodeToken(localStorage.getItem("auth")).user[0],
      ]);
    }
    get();
  }, []);
  if (!list) return <div>loading...</div>;
  else
    return (
      <>
        <form onSubmit={handle}>
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              textDecorationLine: "underline",
            }}
          >
            <h3>
              <b>Email address</b>
            </h3>
          </label>
          <input
            type={"text"}
            name="message"
            class="form-control"
            placeholder="name@example.com"
          />
          <button
            type="submit"
            class="btn btn-primary mb-2"
            style={{ marginTop: "10px" }}
          >
            Confirm{" "}
          </button>
        </form>
        <div class="form-group">
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              textDecorationLine: "underline",
            }}
          >
            {" "}
            <h3>
              <b>choosen</b>
            </h3>{" "}
          </label>
          {choosen.map((item) => {
            return (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "gray",
                  marginBottom: "5px",
                  color: "white",
                  justifyContent: "space-evenly",
                }}
                rows="3"
              >
                <img src={item.pic} height={60} width={70}></img>
                <h3 style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <b>{item.name}</b>
                </h3>
              </div>
            );
          })}
        </div>
        <button class="btn btn-primary mb-2" onClick={handle2}>
          Create
        </button>
      </>
    );
};

export default Group;
