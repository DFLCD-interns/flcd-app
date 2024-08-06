# Equipment Request
<form action="?/createEquipmentRequest" method="POST">
  <label>
    Promised Start Time:
    <input name="promised_start_time" type="datetime-local" required />
  </label>

  <label>
    Promised End Time:
    <input name="promised_end_time" type="datetime-local" required />
  </label>

  <label>
    Actual Start Time:
    <input name="actual_start_time" type="datetime-local" required />
  </label>

  <label>
    Actual End Time:
    <input name="actual_end_time" type="datetime-local" required />
  </label>
  
  <label>
    Location of Usage:
    <input name="location" type="text" required />
  </label>

  <label>
    Equipment Type:
    <input name="equipment_type" type="text" required />
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
    Date Needed Start:
    <input name="date_needed_start" type="datetime-local" required />
  </label>

  <label>
    Date Needed End:
    <input name="date_needed_end" type="datetime-local" required />
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