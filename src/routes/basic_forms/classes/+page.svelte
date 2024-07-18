
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

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Batch created successfully!');
      }
      else {
        alert('Failed to create batch.');
      }
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
      
      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Class created successfully!');
      }
      else {
        alert('Failed to create class.');
      }
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    }
  }
</script>

# Batch Creation
<form on:submit|preventDefault={handleSubmitBatch}>
  <label>
    Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)" />
  </label>

  <button type="submit" class="button-style">Create Batch</button>
</form>

# Class Creation
<form on:submit|preventDefault={handleSubmitClass}>
  <label>
    Class Name:
    <input name="name" type="text" placeholder="(eg, String Theory 101 - Section 1)" required />
  </label>
  
  <label>
    Handler ID:
    <input name="handler_id" type="number" placeholder="(eg, 12)" />
  </label>
  <label>

    Batch ID:
    <input name="batch_id" type="number" placeholder="(eg, 4)" />
  </label>
  
  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, Section 1)" size="lg" />
  </label>
  
  <button type="submit" class="button-style">Create Class</button>
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