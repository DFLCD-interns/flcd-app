# Batch Creation
<form action="?/createBatch" method="POST">
  <label>
    Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)" />
  </label>

  <button type="submit" class="button-style">Create Batch</button>
</form>

# Class Creation
<form action="?/createClass" method="POST">
  <label>
    Class Name:
    <input name="name" type="text" placeholder="(eg, String Theory 101 - Section 1)" required />
  </label>
  
  <label>
    Handler ID:
    <input name="handler_id" type="number" placeholder="(eg, 12)" />
  </label>
  <label>

    Batch ID:
    <input name="batch_id" type="number" placeholder="(eg, 4)" />
  </label>
  
  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, Section 1)" size="lg" />
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