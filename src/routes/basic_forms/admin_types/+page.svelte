<form action="?/createAdminType" method="POST">
  <label>
    Admin Type Name:
    <input name="name" type="text" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" />
  </label>

  <label>
    Access Level:
    <input name="access_level" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Admin Type</button>
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