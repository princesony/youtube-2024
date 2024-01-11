
  const result = document.querySelector(".result");
  mostPopular();
  async function mostPopular() {
    try {
      const url1 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyA_fpoGaLDsz872KoQmph_sfBCVn0A1YNQ&maxResults=50`;
      let res = await fetch(url1);
      let data = await res.json();
      let video = data.items;
      appendVideos(video);
    } catch (err) {
      console.log(err);
    }
  }

  async function channelIcon(snippet) {
    try {
      const url2 = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyA_fpoGaLDsz872KoQmph_sfBCVn0A1YNQ&id=${snippet.channelId}`;
      let res = await fetch(url2);
      let data = await res.json();
      snippet["channelImg"] = data.items[0].snippet.thumbnails.default.url;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchVideo() {
    try {
      let video = document.getElementById("video").value;
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video}&type=video&key=AIzaSyA_fpoGaLDsz872KoQmph_sfBCVn0A1YNQ&maxResults=20`;
      let res = await fetch(url);
      let data = await res.json();
      let videos = data.items;
      appendVideos(videos);
    } catch (err) {
      console.log(err, "try next time");
    }
  }

  const appendVideos = (items) => {
    result.textContent = null;
    items.forEach(async ({ id, snippet, id: { videoId } }) => {
      let y = await channelIcon(snippet);
      let img = document.createElement("img");
      img.setAttribute("class", "channel-icon");
      img.src = snippet.channelImg;
      let div = document.createElement("div");
      div.setAttribute("class", "info");
      let h4 = document.createElement("h4");
      h4.setAttribute("class", "tittle");
      h4.textContent = snippet.title;
      let p = document.createElement("p");
      p.setAttribute("class", "channel-name");
      p.textContent = snippet.channelTitle;
      div.append(h4, p);

      let div2 = document.createElement("div");
      div2.setAttribute("class", "content");
      div2.append(img, div);
      let img1 = document.createElement("img");
      img1.setAttribute("class", "thumbnails");
      img1.src = snippet.thumbnails.medium.url;
      let final_div = document.createElement("div");
      final_div.setAttribute("class", "video");
      final_div.append(img1, div2);
      result.append(final_div);

      let data_to_send = {
        snippet,
        id: id,
        videoId,
      };

      final_div.onclick = () => {
        showVideo(data_to_send);
      };
    });
    localStorage.setItem("youtube_videos", JSON.stringify(items));
  };

  function showVideo(data) {
    localStorage.setItem("clicked_video", JSON.stringify(data));
    window.location.href = "video_youtube.html";
  }
  function goBack() {
    window.history.back();
  }
  