
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
      
      if (response.ok) {
        alert('User created successfully!');
      }
      else throw new Error('Failed to create user');
      // Optionally, redirect or perform another action upon success
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  }
</script>
  
<form method="POST" action="?/register" on:submit|preventDefault={handleSubmit}>
  <label>
    Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)" size="lg" />
  </label>

  <button type="submit">Create Batch</button>
</form>