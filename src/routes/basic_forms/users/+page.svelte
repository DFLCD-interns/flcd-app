
<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/register', {
        method: 'POST',
        body: formData
      });
      
      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('User created successfully!');
      }
      else {
        alert('Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
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
    <input name="workgroup" type="number" />
  </label>

  <button type="submit">Create User</button>
</form>