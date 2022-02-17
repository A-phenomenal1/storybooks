import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function StoryPage() {
  const [story, setStory] = useState();
  const router = useRouter();

  const changeFormatedDate = (timestamp) => {
    let date = new Date(timestamp);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  useEffect(async () => {
    try {
      const response = await axios.get(`/api/contents/${router.query.id}`);
      console.log("res: ", response);
      setStory(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [router.query.id]);

  return (
    <div className="cstory-cont">
      <div className="cstory-bot-cont">
        <div className="cstory-side-cont">
          <img src="https://img.icons8.com/color/100/ffffff/open-book--v2.png" />
          <div className="cstory-content-cont">
            <div className="cstory-side-title">
              <span>Read</span> this awesome story
              <br />
              and start your <span>Streak</span>
            </div>
            <div className="cstory-side-text">
              Continue reading new stories and win prizes.
            </div>
          </div>
          <button
            className="sign-side-btn"
            onClick={() => router.push("/stories/newstory")}
          >
            Write a story
          </button>
        </div>
        <div className="cstory-right-cont">
          <div className="cstory-main-form-cont">
            <div className="rstory-form-cont">
              <input
                className="rstory-input-field r-input-font"
                value={story && story.title}
                disabled
              />
              <div className="rstory-input-field rstory-rcontent-cont">
                <textarea
                  className="rstory-content-input r-input-content-font"
                  value={story && story.content}
                  disabled
                  placeholder="Start Writing story here..."
                />
              </div>
              <div>
                <span>Published Date: </span>
                {story && changeFormatedDate(story.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryPage;
