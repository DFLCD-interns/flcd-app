<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createChildRequest', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Child request created successfully!');
      }
      else {
        alert('Failed to create child request.');
      }
    } catch (error) {
      console.error('Error creating child request:', error);
      alert('Failed to create child request.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Preferred Age Group Low:
    <input name="preferred_age_group_low" type="number" placeholder="4" />
  </label>

  <label>
    Preferred Age Group High:
    <input name="preferred_age_group_high" type="number" placeholder="7" />
  </label>

  <label>
    Child ID:
    <input name="child_id" type="number" />
  </label>
  
  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit">Create Child Observation Request</button>
</form>