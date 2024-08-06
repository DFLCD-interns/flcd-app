<form action="?/createUserType" method="POST">
  <label>
    Description:
    <input name="description" type="text" required />
  </label>

  <label>
    Access Level:
    <input name="access_level" type="number" required />
  </label>

  <button type="submit" class="button-style">Create User Type</button>
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