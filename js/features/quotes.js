const quoteContent = document.querySelector(".footer__quotes--content");
const quoteAuthor = document.querySelector(".footer__quotes--author");

let quotes = [
  {
    content:
      "나는 무리 지어 다니는 사람들 중 제대로 된 인생을 사는 사람을 본 적이 없다",
    author: "프리드리히 니체",
  },
  {
    content:
      "문제를 발생시켰을 때와 똑같은 의식수준으로는 어떤 문제도 해결할 수 없다",
    author: "알버트 아인슈타인",
  },
  {
    content: "분노는 나약함의 증거다",
    author: "아리에텐",
  },
  {
    content:
      "우리가 세상을 바라보고 인식하는 것은 결국 믿음으로 이루어 져 있다",
    author: "아리에텐",
  },
  {
    content: "군중은 왕관에 박수치고, 왕의 목이 떨어질 땐 더 크게 환호한다",
    author: "아리에텐",
  },
  {
    content:
      "돈이 없다고 해서 문제가 있는 삶이면, 돈이 있을 땐 더 큰 문제가 발생한다",
    author: "아리에텐",
  },
  {
    content:
      "예수회는 신과 세상의 결합을 시도했지만, 결과적으로 신과 세상 모두에게 경멸을 받았다",
    author: "블레즈 파스칼",
  },
  {
    content: "이 세상은 잔혹하다. 그리고 너무나 아름답다",
    author: "미카사 아커만",
  },
  {
    content:
      "무의식을 의식화 하지 못하면 무의식이 삶의 방향을 결정하게 되는데 사람들은 이를 두고 운명이라 부른다",
    author: "카를 구스타프 융",
  },
  {
    content: "동경은 이해에서 가장 먼 감정이다",
    author: "아이젠 소스케",
  },
  {
    content:
      "세상은 인간이 설명할 수 있는 영역이 아니다. 하지만 소중한 이들과 온기를 나누면 모든 것이 이해 된다",
    author: "아리에텐",
  },
  {
    content: "똑똑하게 사랑하라",
    author: "아리에텐",
  },
  {
    content: "인간에겐 의미가 삶이고 믿음이 세상이다",
    author: "아리에텐",
  },
  {
    content:
      "펜은 칼보다 강해서 무서운 것이 아니라 칼보다 가벼워서 무서운 것이다",
    author: "아리에텐",
  },
  {
    content:
      "기술은 대중들을 위해서 존재하는 것이 아니라, 권력을 위해서 존재한다",
    author: "아리에텐",
  },
  {
    content:
      "수많은 악의를 경험한 사람에게도 단 한 번의 따뜻한 온정이 희망을 줄 수 있다. 이런 것을 보면 인간의 선의는 가장 위대한 힘이 맞다",
    author: "아리에텐",
  },
  {
    content: "좋은 결정은 경험에서 나오고, 좋은 경험은 나쁜 결정에서 나온다",
    author: "마크 트웨인",
  },
];

export function getQuote() {
  const randomQuoteItem = quotes[Math.floor(Math.random() * quotes.length)];
  quoteContent.innerText = randomQuoteItem.content;
  quoteAuthor.innerText = randomQuoteItem.author;
}
