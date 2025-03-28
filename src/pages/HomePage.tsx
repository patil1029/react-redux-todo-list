import { useState } from "react";
import ListSidebar from "../components/ListSideBar";
import ListView from "../components/ListView";
import NewListModal from "../components/NewListModal";

export default function HomePage() {
  const [selectedList, setSelectedList] = useState(0);
  const [sorting, setSorting] = useState("date desc");
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="listmain">
      <ListSidebar
        setSelectedList={setSelectedList}
        selectedList={selectedList}
        openModal={() => setModalOpen(true)}
      />
      <ListView
        key={selectedList}
        selectedList={selectedList}
        sorting={sorting}
        setSorting={setSorting}
      />
      <NewListModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
