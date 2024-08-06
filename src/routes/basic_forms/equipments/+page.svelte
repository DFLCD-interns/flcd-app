<form action="?/createEquipment" method="POST">
  <label>
    Equipment Name:
    <input name="name" type="text" placeholder="TVA" required />
  </label>

  <label>
    Type:
    <input name="type" type="text" placeholder="Movable TV" required />
  </label>
  
  <label>
    Current Location:
    <input name="location" type="text" placeholder="Room 103" required />
  </label>
  
  <label>
    Status:
    <input name="status" type="text" placeholder="available" required />
  </label>

  <label>
    Notes (description):
    <input name="notes" type="text" placeholder="From room 103" />
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