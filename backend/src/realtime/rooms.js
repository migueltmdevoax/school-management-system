export const joinUserRooms =
async (

  socket,

  user

) => {

  // 🟣 GLOBAL ROLE ROOM
  await socket.join(
    `role:${user.role}`
  );



  // 🟣 PRIVATE USER ROOM
  await socket.join(
    `user:${user.id}`
  );



  // 👨‍👩‍👧 PARENTS
  if (user.role === "parent") {

    await socket.join(
      `parent:${user.id}`
    );

  }



  // 👨‍🏫 TEACHERS
  if (user.role === "teacher") {

    await socket.join(
      `teacher:${user.id}`
    );

  }



  // 🧑‍💼 ADMINS
  if (user.role === "admin") {

    await socket.join(
      "admins"
    );

  }



  /*
  |--------------------------------------------------------------------------
  | 🚀 ENTITY REALTIME ROOMS
  |--------------------------------------------------------------------------
  */

  if (user.studentId) {

    await socket.join(
      `student:${user.studentId}`
    );

  }



  console.log(

    `📦 Rooms assigned → ${user.role}:${user.id}`

  );

};