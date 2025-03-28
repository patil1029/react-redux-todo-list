import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, getList } from "../redux/list-actions";
import { RootState , AppDispatch } from "../redux/store";

interface ListSidebarProps {
  setSelectedList: (id: number) => void;
  selectedList: number;
  openModal: () => void;
}

const ListSidebar: React.FC<ListSidebarProps> = ({setSelectedList, selectedList, openModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const list = useSelector((state: RootState) => state.todoList.listItems);

  const listId = list[0]?.id

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(()=> {
    if(listId){
      setSelectedList(listId)
    }
  },[setSelectedList,listId])

  const handleDeleteList = (id:number) => {
    dispatch(deleteList(id))
  }

  return (
    <div className="sidebar">
      <button className="new-list" onClick={openModal}>
        + new list
      </button>
      <ul>
        {list.length && list.map((list, index) => (
          <li
            key={list.id}
            className={list.id === selectedList || index=== selectedList ? "active" : ""}
          >
            <span onClick={() => setSelectedList(list.id)}>{list.name} {list.id}{selectedList}</span>
            {list.id === selectedList && (
              <button className="close-btn" onClick={(e)=> handleDeleteList(list.id)} >X</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSidebar;
