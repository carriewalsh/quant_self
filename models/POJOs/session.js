class Session {
  constructor(apiKey) {
    this.apiKey = null
  }

  setKey(userKey) {
    this.apiKey = userKey
  }

  deleteKey() {
    this.apiKey = null
  }
}

var session = new Session

module.exports = session;
