<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createEquipment', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Equipment created successfully!');
      }
      else {
        alert('Failed to create equipment.');
      }
    } catch (error) {
      console.error('Error creating equipment:', error);
      alert('Failed to create equipment.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Equipment Name:
    <input name="name" type="text" placeholder="Electric Fan Room 103" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="From room 103" />
  </label>

  <label>
    Total Count:
    <input name="count" type="text" placeholder="2" required />
  </label>

  <button type="submit" class="button-style">Create Equipment</button>
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