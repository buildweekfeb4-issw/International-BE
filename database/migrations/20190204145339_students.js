exports.up = function(knex) {
    return knex.schema.createTable('students', student => {
      student.increments();
  
      student
        .string('name', 255)
        .notNullable()
        .unique();
      student.string('status', 255).notNullable();
      student.string('age', 255).notNullable();
      student.string('insuranceCardexpires', 255);
      student.string('birthcertificate', 255).notNullable();
      student.string('specialneeds', 255).notNullable();
      student.string('represenative', 255).notNullable();
      student.string('contactinfo', 255);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };