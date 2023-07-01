import image from "../../assets/admin.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../utils/api";

const MemberInfo = () => {
  const id = useSelector((state) => state.auth.id);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/members/${id}`)
      .then((res) => setInfo(res.data));
  }, []);

  return (
    <div className="h-screen items-center flex">
      <div className="flex items-center -translate-y-1/2 gap-20 mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md w-full">
        <img src={image} alt="" width={100} />
        <div className="flex gap-10">
          <div>
            <div>
              <span className="font-bold">Name</span>: {info?.name}
            </div>
            <div>
              <span className="font-bold">Email</span>: {info?.email}
            </div>
            <div>
              <span className="font-bold">Gender</span>: {info?.gender}
            </div>
            <div>
              <span className="font-bold">Job</span>: {info?.job}
            </div>
          </div>
          <div>
            <div>
              <span className="font-bold">Member type</span>: {info?.memberType}
            </div>
            <div>
              <span className="font-bold">Occupation</span>: {info?.occupation}
            </div>
            <div>
              <span className="font-bold">Phone number</span>:{" "}
              {info?.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
