export const taxSwitch = (store) => {
  switch (store) {
    case "$":
      return " $15.00";

    case "£":
      return " £10.83";

    case "A$":
      return " A$19.44";

    case "¥":
      return " ¥1627.62";

    case "₽":
      return " ₽1139.76";
    default:
      return null;
  }
};
