import { useRouter } from "next/router";
import React from "react";
import axios from "axios";

import HomeCard from "../../components/HomeCard";

function StoriesDashboard({ currentUser, stories }) {
  const router = useRouter();

  const storyList = stories.map((story) => {
    return (
      <HomeCard
        story={story}
        likeCallbackfn={(id, likestatus) => likeCallback(id, likestatus)}
      />
    );
  });

  const likeCallback = async (id, likestatus) => {
    try {
      const response = await axios.patch(`/api/contents/${id}`, {
        likestatus: likestatus,
      });
      return response.data.likes;
    } catch (err) {
      console.log(err);
      return -1;
    }
  };

  return (
    <div className="cstory-cont">
      <div
        className="cstory-bot-cont"
        style={{
          flexDirection: "column",
          padding: "0 10px",
          marginTop: "50px",
        }}
      >
        <div className="cstory-title-box">
          <span>All Stories</span>
          <button
            className="btn btn-info"
            style={{ minWidth: 120 }}
            onClick={() => router.push("/stories/newstory")}
          >
            Write a story
          </button>
        </div>
        <div className="cstory-card-container">{storyList}</div>
      </div>
    </div>
  );
}

StoriesDashboard.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/contents");

  return { stories: data };
};

export default StoriesDashboard;
