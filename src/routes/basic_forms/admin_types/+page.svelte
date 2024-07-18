<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createAdminType', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Admin type created successfully!');
      }
      else {
        alert('Failed to create admin type.');
      }
    } catch (error) {
      console.error('Error creating admin type:', error);
      alert('Failed to create admin type.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
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