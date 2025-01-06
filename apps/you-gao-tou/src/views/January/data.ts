export const questionData = [
  {
    question: "“嘎嘎”",
    options: ["A. 鸭子", "B. 肉", "C. 脑子", "D. 语气词"],
    answer: "B. 肉",
  },
  {
    question: "“相应”",
    options: ["A. 新鲜", "B. 便宜", "C. 丰富", "D. 漂亮"],
    answer: "B. 便宜",
  },
  {
    question: "“雄起”",
    options: ["A. 加油", "B. 站立", "C. 退缩", "D. 哭泣"],
    answer: "A. 加油",
  },
];

export const tipText = {
  notStock: {
    title: "嗨！活动太火爆了！",
    content: "很抱歉，本场活动奖品已抢光，<br />请期待下一场幸运翻翻乐活动时间：<br />2025年1月14日我们不见不散",
  },
};

export function useQuestion() {
  let firstQuestionIndex = 0;
  let index = 0;

  const getOneQuestion = () => {
    firstQuestionIndex = Math.floor(Math.random() * questionData.length);
    index = firstQuestionIndex;
    // 排除已经出现过的题目
    return questionData[firstQuestionIndex];
  };
  const getOneQuestionByIndex = () => {
    index++;
    if (index > questionData.length - 1) {
      index = 0;
    }
    return questionData[index];
  };
  return {
    getOneQuestion,
    getOneQuestionByIndex,
  };
}
