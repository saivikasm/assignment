const axios = require("axios");

export default class Data {
  constructor() {
    // eslint-disable-next-line
    this.url ="http://localhost:8080/randoms"

    this.offset = 0;
    this.limit = 20;
  }
  
  getOffset(url) {
    url = this.append(url, `offset=${this.offset}`);
    return url;
  }
  incrementOffset() {
    this.offset += this.limit;
  }
  getLimit(url) {
    url = this.append(url, `limit=${this.limit}`);
    return url;
  }
  getParams(url) {
    if (!this.params) return url;
    return this.append(url, this.params);
  }
  setParams(params) {
    if (params) this.params = params;
  }
  append(url, params) {
    if (!url) url = "";
    let prepend = "?";
    if (url.indexOf("?") != -1) prepend = "&";

    url = `${url}${prepend}${params}`;
    return url;
  }
  async get() {
    console.log("Getting", this.url);
    let url = this.url;
    url = this.getLimit(url);
    url = this.getOffset(url);
    url = this.getParams(url);
    let result = await axios.get(url, {});
    result = result.data;

    // Increment the offset
    this.incrementOffset();

    return result;
  }

}
