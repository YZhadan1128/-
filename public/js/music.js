fetch("https://api.wulv5.com/music/personalized")
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    data.result.forEach((item) => {
    //   console.log(item);
    //   const li = document.createElement("li");
    //   li.innerHTML = `<img src="${item.song.album.picUrl}" width="100" height="100" >
    //     ${item.name}
    //   `;
    //   ul.appendChild(li);
    //   li.onclick = function () {
        // 音乐的真实地址 xxxxx.mp3
    //     fetch(`https://api.wulv5.com/music/song/url?id=${item.id}`)
    //       .then(res => res.json()).
    //       then(data => {
    //       console.log(data.data[0].url);
    //       audio.src = data.data[0].url;
    //       audio.play();
    //     });
    //   }
    })
  });