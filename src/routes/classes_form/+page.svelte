
<script>
  let data;
  let form; 

  async function handleSubmitBatch(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createBatch', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('Batch created successfully!');
      }
      else throw new Error('Failed to create batch');
      // Optionally, redirect or perform another action upon success
    } catch (error) {
      console.error('Error creating batch:', error);
      alert('Failed to create batch');
    }
  }

  async function handleSubmitClass(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createClass', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('Class created successfully!');
      }
      else throw new Error('Failed to create class');
      // Optionally, redirect or perform another action upon success
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    }
  }
</script>
  
<form method="POST" action="?/createBatch" on:submit|preventDefault={handleSubmitBatch}>
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

<form method="POST" action="?/createClass" on:submit|preventDefault={handleSubmitClass}>
  <label>
    Class Name:
    <input name="name" type="text" placeholder="(eg, String Theory 101 - Section 1)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, Section 1)" size="lg" />
  </label>

  <!--Handler is the user. Batch is either DROPDOWN or automatically the latest one (?)-->

  <button type="submit">Create Class</button>
</form>