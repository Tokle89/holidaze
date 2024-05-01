const ProfileCard = ({ data: { name, avatar, email, venueManager } }) => {
  return (
    <div className=" max-w-[350px] flex justify-between p-5 gap-10 items-center ">
      <div>
        <img src={avatar.url} alt={name} className="rounded-full w-[80px] h-[80px]" />
      </div>
      <div className="space-y-2 capitalize">
        <h1>{name}</h1>
        <p className="text-gray-800">{email}</p>
        {venueManager && <p className="text-gray-800">Venue Manager</p>}
      </div>
    </div>
  );
};

export default ProfileCard;
