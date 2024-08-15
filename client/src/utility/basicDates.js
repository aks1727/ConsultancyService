const formatDate = (dateString) => {
    const date = new Date(dateString);

    return isNaN(date.getTime())
        ? "Invalid Date"
        : `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`;
};

export {
    formatDate
}