<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/registerChild', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Child registered successfully!');
      }
      else {
        alert('Failed to register child.');
      }
    } catch (error) {
      console.error('Error registering child:', error);
      alert('Failed to register child.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Child Name:
    <input name="name" type="text" placeholder="Prinz Zedric" required />
  </label>

  <label>
    Birthdate:
    <input name="birthdate" type="date" />
  </label>

  <label>
    Tracking ID:
    <input name="tracking_id" type="text" placeholder="(from the Excel Database)" required />
  </label>

  <label>
    Class ID:
    <input name="class_id" type="number" placeholder="12" />
  </label>

  <button type="submit">Create Child</button>
</form>