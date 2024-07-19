<script>
  let data;
  let form; 

  async function handleSubmitEquipment(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createEquipmentRequest', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Equipment request created successfully!');
      }
      else {
        alert('Failed to create equipment request.');
      }
    } catch (error) {
      console.error('Error creating equipment request:', error);
      alert('Failed to create equipment request.');
    }
  }

  async function handleSubmitVenue(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createVenueRequest', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Venue request created successfully!');
      }
      else {
        alert('Failed to create venue request.');
      }
    } catch (error) {
      console.error('Error creating venue request:', error);
      alert('Failed to create venue request.');
    }
  }
</script>
  
# Equipment Request
<form on:submit|preventDefault={handleSubmitEquipment}>
  <label>
    Count:
    <input name="count" type="number" placeholder="10" required />
  </label>

  <label>
    Usage Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    Usage End Time:
    <input name="end_time" type="datetime-local" required />
  </label>
  
  <label>
    Promised Return Time:
    <input name="promised_return_time" type="datetime-local" required />
  </label>
  
  <label>
    Actual Return Time:
    <input name="return_time" type="datetime-local" />
  </label>

  <label>
    Equipment ID:
    <input name="equipment_id" type="number" required />
  </label>

  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Equipment Request</button>
</form>

# Venue Request
<form on:submit|preventDefault={handleSubmitVenue}>
  <label>
    Usage Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    Usage End Time:
    <input name="end_time" type="datetime-local" required />
  </label>
  
  <label>
    Promised Return Time:
    <input name="promised_return_time" type="datetime-local" required />
  </label>
  
  <label>
    Actual Return Time:
    <input name="return_time" type="datetime-local" />
  </label>

  <label>
    Venue ID:
    <input name="venue_id" type="number" required />
  </label>

  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Venue Request</button>
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