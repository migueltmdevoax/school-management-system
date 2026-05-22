export default function StudentAvatar({ name }) {

  const initials = name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="
      w-14 h-14
      rounded-full
      bg-blue-500
      flex items-center justify-center
      text-white
      font-bold
      text-lg
      shadow-lg
    ">
      {initials}
    </div>
  );
}