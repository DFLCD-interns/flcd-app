<form method="POST" action="?/createBatch">
  <label>
    Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)" size="lg" />
  </label>

  <button type="submit" class="button-style">reate Batch</button>
</form>

<form method="POST" action="?/createClass">
  <label>
    Class Name:
    <input name="name" type="text" placeholder="(eg, Physics 10 THW)" required />
  </label>

  <label>
    Handler ID:
    <input name="handler_id" type="number" placeholder="1" size="lg" />
  </label>

  <label>
    Batch ID:
    <input name="batch_id" type="number" placeholder="1" size="lg" />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="1" size="lg" />
  </label>

  <label>
    Formatted Schedule:
    <input name="schedule" type="text" placeholder="1" size="lg" />
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