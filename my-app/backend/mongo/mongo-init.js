db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('Person');

db.Person.insert({ name: 'Anna', number:'041-54321' });
db.Person.insert({ name: 'Arto Vihavainen', number:'041-12345' });