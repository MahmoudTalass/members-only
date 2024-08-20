const pool = require("./pool");

class User {
   async getUserByEmail(email) {
      const { rows } = await pool.query("SELECT * FROM user_account WHERE email=$1", [email]);
      return rows[0];
   }
   async getUserById(id) {
      const { rows } = await pool.query("SELECT * FROM user_account WHERE id=$1", [id]);
      return rows[0];
   }
}

class Message {
   async getAllMessages() {
      const query = `
        SELECT *
        FROM user_account 
        JOIN user_message ON user_account.id = user_message.user_account_id
        JOIN message ON user_message.message_id = message.id 
        JOIN user_role ON user_account.id = user_role.user_account_id 
        JOIN role ON user_role.role_id = role.id`;
      const { rows } = await pool.query(query);

      return rows;
   }
}

module.exports = {
   User: new User(),
   Message: new Message(),
};
