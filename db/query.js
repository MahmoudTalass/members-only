const pool = require("./pool");

class User {
   async getUserByEmail(email) {
      const query = `
      SELECT * FROM user_account
      WHERE email=$1`;

      const { rows } = await pool.query(query, [email]);
      return rows[0] || null;
   }
   async getUserById(id) {
      const query = `
      SELECT * FROM user_account 
      WHERE id=$1`;
      const { rows } = await pool.query(query, [id]);
      return rows[0] || null;
   }

   async createUser({ email, password, firstname, lastname }) {
      const query =
         "INSERT INTO user_account (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)";
      await pool.query(query, [email, password, firstname, lastname]);
   }
}

class Message {
   async getAllMessages() {
      const query = `
        SELECT *
        FROM user_account 
        JOIN user_message ON user_account.id = user_message.user_account_id
        JOIN message ON user_message.message_id = message.id`;
      const { rows } = await pool.query(query);

      return rows;
   }

   async createMessage({ title, text, userId }) {
      const messageId = await pool.query(
         "INSERT INTO message (title, text) VALUES ($1, $2) RETURNING id",
         [title, text]
      );
      await pool.query("INSERT INTO user_message (user_account_id, message_id) VALUES($1, $2)", [
         userId,
         messageId,
      ]);
   }
}

module.exports = {
   User: new User(),
   Message: new Message(),
};
