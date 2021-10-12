const target_card_data = [
  {
    key: "a",
    status: "",
  },
  {
    key: "s",
    status: "",
  },
  {
    key: "d",
    status: "",
  },
  {
    key: "f",
    status: "active",
  },
  {
    key: "f",
    status: "correct",
  },
  {
    key: "g",
    status: "wrong",
  },
  {
    key: "",
    status: "",
  },
];

target_card_data.pop();
target_card_data.unshift({ key: "a", status: "lol" });
console.log(target_card_data);
