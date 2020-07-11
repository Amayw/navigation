const $siteList = $(".siteList");
const $last = $siteList.find(".last");
const simplify = (url) => {
  console.log(url);
  console.log(
    url.replace("https://", "").replace("http://", "").replace("www://", "")
  );
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www://", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(node);
    const $li = $(
      `
            <li>
              <div class="site">
                 <div class="logo">${node.logo}</div>
                 <div class="link">${simplify(node.url)}</div>
                 <div class="close">
                 <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-close"></use>
               </svg>
                 </div>
              </div>
            </li>
        `
    ).insertBefore($last);
    console.log(index);
    $li.on("click", (e) => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      console.log(index);
      hashMap.splice(index, 1);
      render();
    });
  });
};
const hashMap = JSON.parse(localStorage.getItem("nav")) || [
  {
    logo: "B",
    url: "https://bilibili.com",
  },
  {
    logo: "I",
    url: "https://iconfont.cn",
  },
];
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = `https://` + url;
  }
  hashMap.push({
    logo: simplify(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("nav", string);
};

$(document).on("keypress", (e) => {
  // console.log(e);
  const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
