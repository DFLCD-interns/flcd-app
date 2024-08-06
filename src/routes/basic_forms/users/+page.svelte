<form action="?/register" method="POST">
  <label>
    UUID:
    <input name="uuid" type="text" required />
  </label>

  <label>
    First Name:
    <input name="first_name" type="text" required />
  </label>

  <label>
    Last Name:
    <input name="last_name" type="text" required />
  </label>

  <label>
    Email:
    <input name="email" type="email" required />
  </label>

  <label>
    Password Hash:
    <input name="pw_hash" type="password" required />
  </label>

  <label>
    Phone:
    <input name="phone" type="text" />
  </label>

  <label>
    Student Number:
    <input name="student_number" type="text" />
  </label>

  <label>
    Course:
    <input name="course" type="text" />
  </label>

  <label>
    Department:
    <input name="department" type="text" />
  </label>

  <label>
    Superior ID:
    <input name="superior_id" type="number" />
  </label>

  <label>
    Access Level:
    <input name="access_level" type="number" />
  </label>

  <button type="submit" class="button-style">Create User</button>
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