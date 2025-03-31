import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SortingDropdown from "../components/SortingDropDown";
import Input from "./Input";
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createNewListItem, deleteListItem, getListContent } from "../redux/list-actions";
import { createListItem, ListItem } from "../types";
import { logout } from '../redux/todoListSlice';
import { useNavigate } from "react-router-dom";

interface ListViewProps {
  selectedList: number,
  sorting: string,
  setSorting: Dispatch<SetStateAction<string>>,
}

interface ListViewContent extends ListItem {
  completed: boolean
}

const ListView: React.FC<ListViewProps> = ({ selectedList, sorting, setSorting }) => {
  const [items, setItems] = useState<ListViewContent[]>([]);
  const [listItemName, setListItemName] = useState('')
  const [showCompletedList, setShowCompletedList] = useState(false)
  const sortedItems = useRef<ListViewContent[]>([])

  const listContent = useSelector((state: RootState) => state.todoList.listContent);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(selectedList > 0){
      dispatch(getListContent(selectedList));
    }
  }, [dispatch,selectedList]);

  useEffect(() => {
    if (listContent.list_items) {
      const alteredList = listContent.list_items.map((list) => ({
        id: list.id,
        name: list.name,
        listId: list.listId,
        completed: false, 
      }));
      setItems(alteredList);
    }
  }, [listContent]);
  
  sortedItems.current = [...items].sort((a, b) =>
    sorting === "date desc" ? b.id - a.id : a.id - b.id
  );

  const handleListItemSubmit = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
       const payload:createListItem = {
          name: listItemName,
        } 
      dispatch(createNewListItem(listContent.id,payload))
      setListItemName('')
    }
  }

  const handleDeleteListItem = (lisId:number,id:number) => {
    dispatch(deleteListItem(lisId,id))
  }

  const handleCompleteList = (id:number) => {
    const updatedItems = items.map((item) => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  }

  const logOut = async() => {
    await dispatch(logout())
    setItems([])
    navigate('/auth')
  }

  return (
    <div className="list-view">
      <div className="list-header">
        <h2>List {selectedList} items</h2>
        <div className="list-header-btns">
          <SortingDropdown sorting={sorting} setSorting={setSorting} />
          <button className="signout-btn" onClick={()=>logOut()}>Sign Out</button>
        </div>
      </div>
      <ul>
        {sortedItems.current
          .filter((item) => !item.completed)
          .map((item) => (
            <li key={item.id} className="list-item">
              <div className="check-name">
                <input type="checkbox" onChange={()=> handleCompleteList(item.id)} />
                {item.name}
              </div>
              <button className="delete-btn" onClick={(e)=> handleDeleteListItem(item.listId,item.id) }>X</button>
            </li>
          ))}
      </ul>
      <div className="completed">
        <h3 onClick={()=> setShowCompletedList(prevState=> !prevState )}>Completed ▼</h3>
        {showCompletedList &&
        <ul>
          {sortedItems.current
            .filter((item) => item.completed)
            .map((item) => (
              <li key={item.id+1} className="completed-item">
                <button className="checkmark">✔</button>
                {item.name}
              </li>
            ))}
        </ul>}
      </div>
      <Input
        id="new-list-content"
        type="text"
        className="new-item-input"
        placeholder="new item name"
        value={listItemName}
        onChange={(e) => setListItemName(e.target.value)}
        onKeyUp={handleListItemSubmit}
      />
    </div>
  );
};

export default ListView;
