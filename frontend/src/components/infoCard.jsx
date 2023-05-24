import "../App.css";

const InfoCard = ({
  item,
  id,
  setShowModal,
  setModalData,
  setID,
  deleteItem,
}) => {
  return (
    <div className="p-2 sm:w-1/2 w-full ">
      <div className="lol bg-gray-100 rounded p-2 flex justify-between h-full items-center">
        <div>
          <div className="title-font font-medium color">
            NAME: <span className="fw-normal color">{item.name}</span>
          </div>
          <br />
          <div className="title-font font-medium color">
            EMAIL: <span className="fw-normal">{item.email}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <i
            className="fa-solid fa-user-pen color"
            onClick={() => {
              setModalData({ name: item.name, email: item.email });
              setShowModal(true);
              setID(id);
            }}
          ></i>
          &nbsp;&nbsp;
          <i
            className="fa-solid fa-trash color"
            onClick={() => {
              deleteItem(id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
