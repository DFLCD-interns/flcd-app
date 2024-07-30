<form action="?/createEquipment" method="POST">
  <label>
    Equipment Name:
    <input name="name" type="text" placeholder="Electric Fan Room 103" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="From room 103" />
  </label>

  <label>
    Total Count:
    <input name="count" type="text" placeholder="2" required />
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