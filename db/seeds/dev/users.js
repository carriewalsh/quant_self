let usersData = [
  {
    id: 1,
    name: "Jennie Stones",
    email: "jstones0@ted.com",
    password: "password",
    apiKey: "XUrJTVKh20s2"
  },
  {
    id: 2,
    name: "Ariana Kidds",
    email: "akidds1@unc.edu",
    password: "password",
    apiKey: "ugHpafDoO3a2"
  },
  {
    id: 3,
    name: "Barry Eastbrook",
    email: "beastbrook2@smugmug.com",
    password: "password",
    apiKey: "kcgF8gno38ru"
  }
]

const createUser = (knex,user) => {
  return knex('users').insert({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    apiKey: user.apiKey
  })
}


exports.seed = function(knex) {

  return knex('users').del()
    .then(function () {
      let promises = []

      usersData.forEach(user => {
        promises.push(createUser(knex, {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          apiKey: user.apiKey
        }))
      })

      return Promise.all(promises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
