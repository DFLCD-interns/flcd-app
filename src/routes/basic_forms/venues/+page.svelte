
<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createVenue', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Venue created successfully!');
      }
      else {
        alert('Failed to create venue.');
      }
    } catch (error) {
      console.error('Error creating venue:', error);
      alert('Failed to create venue.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Venue Name:
    <input name="name" type="text" placeholder="Room 104" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="1st floor, 4th room leftwards" />
  </label>

  <button type="submit">Create Venue</button>
</form>