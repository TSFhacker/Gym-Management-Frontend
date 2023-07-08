import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";

const AddMembershipForm = ({
  setOpenModal,
  setUpdatedMemberId,
  updatedMemberId,
}) => {
  const [membershipList, setMembershipList] = useState([]);
  const [membershipName, setMembershipName] = useState("");
  const [membershipId, setMembershipId] = useState(0);
  const [registrationDate, setRegistrationDate] = useState(new Date());
  const [registrationType, setRegistrationType] = useState("");
  const [trainerList, setTrainerList] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [visibility, setVisibility] = useState("hidden");
  const [showListTrainer, setShowListTrainer] = useState("hidden");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://localhost:8080/api/memberships");
    result = await result.json();
    console.log(result);
    setMembershipList(result);
    result = await fetch("http://localhost:8080/api/v1/gymstaff");
    result = await result.json();
    console.log(result);
    setTrainerList(result);
  };

  const handleChange = (value) => {
    setRegistrationDate(value);
    setShowCalendar(false);
  };

  const handleSubmit = (e) => {
    if (membershipId && registrationDate && registrationType && trainerId) {
      e.preventDefault();
      const newMember = {
        memberId: {
          memberId: updatedMemberId,
        },
        membershipId: {
          membershipId,
        },
        registrationDate,
        registrationType,
        trainerId: {
          id: trainerId,
        },
      };
      fetch(`http://localhost:8080/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });

      setOpenModal(false);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-full h-full text-center p-16 p-12 bg-gray-700/[0.9]">
        <form className="flex flex-col gap-4 bg-white w-[50%] mx-auto p-8 shadow-xl rounded-xl px-24 relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
              setUpdatedMemberId(0);
            }}
            className="absolute top-8 right-8 text-3xl bg-transparent text-main font-black cursor-pointer border-none"
          >
            X
          </button>
          <div className="w-100 h-20 text-4xl font-black text-center pt-8">
            Register Membership
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              name="membershipName"
              placeholder="Membership Name"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={membershipName}
              onClick={() => setVisibility("")}
            />
            <select
              name="membershipName"
              multiple
              onChange={(e) => {
                setMembershipName(e.target.value);
              }}
              className={`${visibility} w-full`}
            >
              {membershipList.map((membership) => (
                <option
                  value={membership.membershipName}
                  onClick={() => {
                    setVisibility("hidden");
                    setMembershipId(membership.membershipId);
                  }}
                >
                  {membership.membershipName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              name="registrationType"
              placeholder="Registration type"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value)}
            />
          </div>
          <div>
            <input
              name="trainer"
              placeholder="Trainer"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              onClick={() => setShowListTrainer("")}
            />
            <select
              name="membershipName"
              multiple
              onChange={(e) => {
                setTrainerName(e.target.value);
              }}
              className={`${showListTrainer} w-full`}
            >
              {trainerList.map((trainer) => (
                <option
                  value={trainer.name}
                  onClick={() => {
                    setShowListTrainer("hidden");
                    setTrainerId(trainer.id);
                  }}
                >
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-full w-full">
            <label for="start" className="mt-5 mr-12">
              Start date
            </label>
            <input
              name="start"
              value={registrationDate.toLocaleDateString()}
              onFocus={() => setShowCalendar(true)}
              className=" p-4 rounded-3xl border-solid border-2 border-slate-300 inline-block"
            />
            <Calendar
              className={
                showCalendar
                  ? "p-4 rounded-3xl border-solid border-2 border-slate-300 block"
                  : "h-0 w-0 invisible"
              }
              value={registrationDate}
              onChange={handleChange}
            />
          </div>
          <button
            className="grow-0 mx-auto rounded-3xl border-solid border-2 border-slate-300 w-[30%] h-16 font-black text-xl hover:bg-green-500 hover:text-white transition duration-100"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMembershipForm;
