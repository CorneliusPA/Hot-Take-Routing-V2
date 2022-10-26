import React from 'react'

function CreateProduct(props) {
  return (
    <div>

<div className="information">
<div className="informationBox" >
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            props.setName(event.target.value);
          }}
        />
        <label>Dept:</label>
        <input
          type="number"
          onChange={(event) => {
            props.setDept(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={(event) => {
            props.setDescription(event.target.value);
          }}
        />
        <label>Image:</label>
        <input
          type="text"
          onChange={(event) => {
            props.setImage(event.target.value);
          }}
        />
        <label>Price:</label>
        <input
          type="number"
          onChange={(event) => {
            props.setPrice(event.target.value);
          }}
        />
       
        </div>
         <button className="boxButton" onClick={props.addProduct}>Add Product</button>

      </div>

    </div>
  )
}

export default CreateProduct