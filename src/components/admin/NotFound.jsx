import notFoundImg from "../../assets/not-found.png";

const NotFound = () => {
  return(
    <div className="w-full flex items-center flex-col">
      <img src={notFoundImg} alt="not-found" className="w-[200px] h-auto opacity-30"></img>
      <h2 className="text-xl font-medium text-slate-400">Sorry, no result found</h2>
    </div>
  )
}

export default NotFound;