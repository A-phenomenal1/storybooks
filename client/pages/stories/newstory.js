import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

function newstory() {
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/contents", values);
      console.log(response.data);
      router.push("/stories");
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const onInputChange = (e, field) => {
    setErrors([]);
    if (field === "title")
      setValues((prev) => ({ ...prev, title: e.target.value }));
    else setValues((prev) => ({ ...prev, content: e.target.value }));
  };

  return (
    <div className="cstory-cont">
      <div className="cstory-bot-cont">
        <div className="cstory-side-cont">
          <img src="https://img.icons8.com/color/100/ffffff/open-book--v2.png" />
          <div className="cstory-content-cont">
            <div className="cstory-side-title">
              <span>Writing</span> is not a job
              <br />
              It is a <span>PASSION</span>
            </div>
            <div className="cstory-side-text">
              Continue writing new stories and follow your passion with a
              certain amount of compensation.
            </div>
          </div>
        </div>
        <div className="cstory-right-cont">
          <form className="cstory-main-form-cont" onSubmit={onSubmit}>
            <div className="cstory-right-title">Write a Story!</div>
            <div className="cstory-form-cont">
              <div className="cstory-error">
                {errors.length > 0 && errors[0].message}
              </div>
              <input
                className="cstory-input-field input-font"
                value={values.title}
                onChange={(e) => onInputChange(e, "title")}
                placeholder="Title of the story"
              />
              <div className="cstory-input-field cstory-rcontent-cont">
                <textarea
                  className="cstory-content-input input-content-font"
                  value={values.content}
                  onChange={(e) => onInputChange(e, "content")}
                  placeholder="Start Writing story here..."
                />
              </div>
              <button
                disabled={values.title === "" || values.content === ""}
                className={
                  values.title === "" || values.content === ""
                    ? "publish-btn"
                    : "publish-btn btn-active"
                }
              >
                Publish the story
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default newstory;
