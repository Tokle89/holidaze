const ProfileCard = ({ data: { name, avatar, email, venueManager } }) => {
  return (
    <div className=" max-w-[600px] flex justify-between p-5 gap-2 md:gap-10 items-center ">
      <div>
        <img src={avatar.url} alt={name} className="rounded-full w-[40px] h-[40px] md:w-[80px] md:h-[80px]" />
      </div>
      <div className="space-y-2 capitalize">
        <h1 className="text-xl sm:text-2xl">{name}</h1>
        <p className="text-gray-800 text-sm sm:text-base">{email}</p>
        {venueManager && <p className="text-gray-800">Venue Manager</p>}
      </div>
    </div>
  );
};

export default ProfileCard;
