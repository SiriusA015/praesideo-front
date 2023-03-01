export const UrlUtils = {
  getFullUrl(url: string): string {
    let baseUrl: string = process.env.REACT_APP_API_URL || "";
    return `${baseUrl}${url}`;
  },
};

export const StringUtils = {
  capitalizeFirstLetter(string: string) {
    if (!string || string.length === 0) {
      return "";
    }

    string = string.toLowerCase();

    if (string.length === 1) {
      return string.charAt(0).toUpperCase();
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
