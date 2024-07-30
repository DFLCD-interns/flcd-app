<form action="?/createTransactionLog" method="POST">
  <label>
    User ID:
    <input name="user_id" type="number" required />
  </label>
  
  <label>
    Transaction Description:
    <input name="transaction_description" type="text" />
  </label>
  <button type="submit" class="button-style">Create Transaction Log</button>
</form>

<style>
  .button-style {
    border-radius: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>