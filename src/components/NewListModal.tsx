import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createNewList } from "../redux/list-actions";
import { createListPayload } from "../types";

interface NewListModalProps {
  isOpen: boolean,
  onClose:()=> void,
}

const NewListModal: React.FC<NewListModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [listName, setListName] = useState("");

  if (!isOpen) return null; // Hide modal if not open

  const handleSubmit = () => {
    if (listName.trim() !== "") {
      const payload:createListPayload = {
        name: listName,
        list_items: [{name:listName+" Item"}]
      } 
      dispatch(createNewList(payload))
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>New List</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <label>List name</label>
          <Input
            type="text"
            id={listName}
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
        </div>
        <div className="modal-footer">
          <button className="add-btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewListModal;
