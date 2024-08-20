const pool = require("./pool");

class User {
   async getUserByEmail(email) {
      const { rows } = await pool.query("SELECT * FROM user_account WHERE email=$1", [email]);
      return rows[0] || null;
   }
   async getUserById(id) {
      const { rows } = await pool.query("SELECT * FROM user_account WHERE id=$1", [id]);
      return rows[0] || null;
   }

   async createUser({ email, password, firstname, lastname }) {
      const query =
         "INSERT INTO user_account (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)";
      await pool.query(query);
   }
}

class Message {
   async getAllMessages() {
      const query = `
        SELECT *
        FROM user_account 
        LEFT JOIN user_role ON user_account.id = user_role.user_account_id 
        LEFT JOIN role ON user_role.role_id = role.id
        JOIN user_message ON user_account.id = user_message.user_account_id
        JOIN message ON user_message.message_id = message.id`;
      const { rows } = await pool.query(query);

      return rows;
   }
}

module.exports = {
   User: new User(),
   Message: new Message(),
};
