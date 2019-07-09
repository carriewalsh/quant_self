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


module.exports = Session;
