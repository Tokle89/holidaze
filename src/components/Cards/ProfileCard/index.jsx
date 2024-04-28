const ProfileCard = ({ data: { name, avatar, email, venueManager } }) => {
  console.log(name, avatar);
  return (
    <div className="min-w-[300px]  flex justify-between p-5 gap-10 items-center">
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
