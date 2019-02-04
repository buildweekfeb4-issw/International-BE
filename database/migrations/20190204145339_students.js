exports.up = function(knex) {
    return knex.schema.createTable('students', students => {
      students.increments();
  
      students
        .string('name', 255)
        .notNullable()
        .unique();
      students.string('status', 255).notNullable();
      students.string('age', 255).notNullable();
      students.string('insurance-card', 255).notNullable();
      students.string('birth-certificate', 255).notNullable();
      students.string('special-needs', 255).notNullable();
      students.string('represenative', 255).notNullable();
      students.string('contact-info', 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };