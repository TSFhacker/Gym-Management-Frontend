import React, { useState } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";

const MemberInfoForm = ({
  setOpenModal,
  setUpdatedMemberId,
  member,
  memberList,
  setMemberList,
  setMemberList2,
}) => {
  console.log(member);
  const [name, setName] = useState(member ? member.name : "");
  const [email, setEmail] = useState(member ? member.email : "");
  const [job, setJob] = useState(member ? member.job : "");
  const [memberType, setMemberType] = useState(member ? member.memberType : "");
  const [phoneNumber, setPhoneNumber] = useState(
    member ? member.phoneNumber : ""
  );
  const [gender, setGender] = useState(member ? member.gender : "");
  const [birthday, setBirthday] = useState(
    member ? new Date(member.birthday) : new Date()
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const { memberId } = useParams();
  const handleChange = (value) => {
    setBirthday(value);
    setShowCalendar(false);
  };

  const handleChange2 = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    if (
      name &&
      email &&
      job &&
      memberType &&
      phoneNumber &&
      gender &&
      birthday
    ) {
      e.preventDefault();
      console.log(birthday.getFullYear().toString());
      const newMember = {
        memberId: member ? member.memberId : null,
        name,
        age: new Date().getFullYear() - birthday.getFullYear(),
        gender,
        email,
        phoneNumber,
        occupation: job,
        birthday,
        job,
        memberType,
      };
      fetch(
        `http://localhost:8080/api/members${
          member ? "/" + member.memberId : ""
        }`,
        {
          method: `${member ? "PUT" : "POST"}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMember),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });

      setOpenModal(false);
      member && setUpdatedMemberId(0);
      member
        ? setMemberList(
            memberList.map((e) =>
              e.memberId === member.memberId ? newMember : e
            )
          )
        : setMemberList([...memberList, newMember]);

      member
        ? setMemberList2(
            memberList.map((e) =>
              e.memberId === member.memberId ? newMember : e
            )
          )
        : setMemberList2([...memberList, newMember]);
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
              member && setUpdatedMemberId(0);
            }}
            className="absolute top-8 right-8 text-3xl bg-transparent text-main font-black cursor-pointer border-none"
          >
            X
          </button>
          <div className="w-100 h-20 text-4xl font-black text-center pt-8">
            {member ? "Update form" : "Add member"}
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              name="name"
              placeholder="Name"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              name="job"
              placeholder="Job"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div>
            <input
              name="memberType"
              placeholder="Member type"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
            />
          </div>
          <div>
            <span>
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full p-4 rounded-3xl border-solid border-2 border-slate-300"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full">
            <div
              className="w-[80%] mx-auto flex justify-around"
              onChange={handleChange2}
            >
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="radiogroup1"
                  id="rd1"
                  value="Male"
                  checked={gender === "Male"}
                />
                <label for="rd1">Male</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="radiogroup1"
                  id="rd2"
                  value="Female"
                  checked={gender === "Female"}
                />
                <label for="rd2">Female</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="radiogroup1"
                  id="rd3"
                  value="Others"
                  checked={gender === "Others"}
                />
                <label for="rd3">Others</label>
              </div>
            </div>
          </div>
          <div className="h-full w-full">
            <label for="birthday" className="mt-5 mr-12">
              Birthday
            </label>
            <input
              name="birthday"
              value={birthday.toLocaleDateString()}
              onFocus={() => setShowCalendar(true)}
              className=" p-4 rounded-3xl border-solid border-2 border-slate-300 inline-block"
            />
            <Calendar
              className={
                showCalendar
                  ? "p-4 rounded-3xl border-solid border-2 border-slate-300 block"
                  : "h-0 w-0 invisible"
              }
              value={birthday}
              onChange={handleChange}
            />
          </div>
          <button
            className="grow-0 mx-auto rounded-3xl border-solid border-2 border-slate-300 w-[30%] h-16 font-black text-xl hover:bg-green-500 hover:text-white transition duration-100"
            type="submit"
            onClick={handleSubmit}
          >
            {member ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MemberInfoForm;
