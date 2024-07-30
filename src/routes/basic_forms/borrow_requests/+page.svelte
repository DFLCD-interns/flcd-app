# Equipment Request
<form action="?/createEquipmentRequest" method="POST">
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
<form action="?/createVenueRequest" method="POST">
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