exports.up = function(knex) {
    return knex.schema.createTable('students', students => {
      students.increments();
  
      students
        .string('name', 255)
        .notNullable()
        .unique();
      students.string('status', 255).notNullable();
      students.string('age', 255).notNullable();
      students.string('insuranceCardexpires', 255).notNullable();
      students.string('birthcertificate', 255).notNullable();
      students.string('specialneeds', 255).notNullable();
      students.string('represenative', 255).notNullable();
      students.string('contactinfo', 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };