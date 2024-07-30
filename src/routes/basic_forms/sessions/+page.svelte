<form action="?/createSession" method="POST">
  <label>
    User ID:
    <input name="user_id" type="number" required />
  </label>

  <label>
    Session ID:
    <input name="session_id" type="text" />
  </label>
  
  <label>
    Last Used:
    <input name="last_used" type="datetime-local" />
  </label>

  <button type="submit" class="button-style">Create Session</button>
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