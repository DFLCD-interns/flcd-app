<script>
  let data;
  let form; 

  async function handleSubmitChild(event) {
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

  async function handleSubmitPreferredTimeChild(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createPreferredTimeChild', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Preferred time chosen successfully!');
      }
      else {
        alert('Failed to choose preferred time.');
      }
    } catch (error) {
      console.error('Error choosing preferred class:', error);
      alert('Failed to choose preferred time.');
    }
  }

  async function handleSubmitClass(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createClassRequest', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Class request created successfully!');
      }
      else {
        alert('Failed to create class request.');
      }
    } catch (error) {
      console.error('Error creating class request:', error);
      alert('Failed to create class request.');
    }
  }

  async function handleSubmitPreferredTimeClass(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createPreferredTimeClass', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Preferred time chosen successfully!');
      }
      else {
        alert('Failed to choose preferred time.');
      }
    } catch (error) {
      console.error('Error choosing preferred class:', error);
      alert('Failed to choose preferred time.');
    }
  }
</script>

# Child Observation Request
<form on:submit|preventDefault={handleSubmitChild}>
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

  <button type="submit" class="button-style">Create Child Observation Request</button>
</form>

# Preferred Times (in Child Observation)
<form on:submit|preventDefault={handleSubmitPreferredTimeChild}>
  <label>
    Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    End Time:
    <input name="end_time" type="datetime-local" required />
  </label>

  <label>
    Child Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Choose this Preferred Time (Child)</button>
</form>

# Class Observation Request
<form on:submit|preventDefault={handleSubmitClass}>
  <label>
    Class ID:
    <input name="class_id" type="number" required />
  </label>
  
  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Class Observation Request</button>
</form>

# Preferred Times (in Class Observation)
<form on:submit|preventDefault={handleSubmitPreferredTimeClass}>
  <label>
    Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    End Time:
    <input name="end_time" type="datetime-local" required />
  </label>

  <label>
    Class Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Choose this Preferred Time (Class)</button>
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