/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('albums', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: true,
        },
        year: {
          type: 'Integer',
          notNull: true,
        },
        createdAt: {
          type: 'TEXT',
          notNull: true,
        },
        updatedAt: {
          type: 'TEXT',
          notNull: true,
        },
      });
};

exports.down = pgm => {
    pgm.dropTable('albums');
};
