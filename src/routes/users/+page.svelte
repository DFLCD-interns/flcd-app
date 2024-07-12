<script>
    let data;
    let form; 
</script>
  
<form method="POST" action="?/register">
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

  <button type="submit">Create User</button>
</form>
  
{#if form?.status === "201"}
	<p>Successfully logged in, {data.user}!</p>
{/if}