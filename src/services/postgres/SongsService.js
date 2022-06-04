const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModelsong,mapDBToModelsong3 } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async  addSong({ title, year,  genre, performer, duration,albumId  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
 
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };
 
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
        throw new InvariantError('lagu gagal ditambahkan');
      }

      return result.rows[0].id;
  }

//   async getSongs() {
//     const query = {
//       text: 'SELECT id,title,performer FROM songs'
//     };
//     const result = await this._pool.query(query);

//     if (!result.rows.length) {
//         throw new NotFoundError('tidak ada lagu');
//       }

//     return result.rows.map(mapDBToModelsong3)[0];
//   }

  async getSongs() {
    const result = await this._pool.query('SELECT id,title,performer FROM songs');
    return result.rows.map(mapDBToModelsong3);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
        throw new NotFoundError('lagu tidak ditemukan');
      }

    return result.rows.map(mapDBToModelsong)[0];
  }

  async getSongByTitle(title) {
    const query = {
      text: `SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1)`,
      values: [`%${title}%`],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
        throw new NotFoundError('lagu tidak ditemukan');
      }

    return result.rows.map(mapDBToModelsong3);
  }

  async getSongByPerformer(performer) {
    const query = {
      text: `SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE LOWER($1)`,
      values: [`%${performer}%`],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
        throw new NotFoundError('lagu tidak ditemukan');
      }

    return result.rows.map(mapDBToModelsong3);
  }

  async getSongBytitleperformer(title, performer) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1) and LOWER(performer) LIKE LOWER($2)',
      values: [`%${title}%`, `%${performer}%`],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
        throw new NotFoundError('lagu tidak ditemukan');
      }

    return result.rows.map(mapDBToModelsong3);
  }

    async editSongById(id, { title, year, genre, performer, duration, albumId, }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer=$4, duration=$5, "albumId"=$6, "updatedAt" = $7 WHERE id = $8 RETURNING id`,
      values: [ title, year, genre, performer, duration, albumId, updatedAt, id],
      
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
          text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
          values: [id],
        };
     
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('lagu gagal dihapus. Id tidak ditemukan');
          }
      }
}

module.exports = SongsService;