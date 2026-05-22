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

    // 🟣 parent private room
    await socket.join(
      `parent:${user.id}`
    );



    // 🚀 FUTURE:
    // hijos reales desde DB
    //
    // for (const child of children) {
    //   await socket.join(
    //     `student:${child.id}`
    //   );
    // }
  }





  // 👨‍🏫 TEACHERS
  if (user.role === "teacher") {

    // 🟣 teacher private room
    await socket.join(
      `teacher:${user.id}`
    );



    // 🚀 FUTURE:
    // classrooms reales
    //
    // await socket.join(
    //   `classroom:${groupId}`
    // );
  }





  // 🧑‍💼 ADMINS
  if (user.role === "admin") {

    await socket.join(
      "admins"
    );
  }





  console.log(

    `📦 Rooms assigned → ${user.role}:${user.id}`
  );
};