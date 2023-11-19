const AddsSection = () => {
  return (
    <div className="bg-white rounded-md py-2 shadow-sm shadow-white px-3 space-y-2">
      {/* create add */}
      <div className="flex justify-between">
        <h4 className="text-md font-light">Sponsored</h4>
        <p className="text-[0.75rem] text-gray-400">Create add</p>
      </div>
      {/* img */}
      <div>
        <img src="/public/assets/testimg.jpg" alt="test img" className="rounded-md" />
      </div>
      {/* description */}
      <div className="space-y-3">
        {/* name and site */}
        <div className="flex justify-between">
          <h4 className="text-sm">Name</h4>
          <p className="text-[0.75rem] text-gray-400">name.com</p>
        </div>
        {/* description */}
        <div className="text-[0.75rem] text-gray-400">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores optio ea</p>
        </div>
      </div>
    </div>
  );
}

export default AddsSection