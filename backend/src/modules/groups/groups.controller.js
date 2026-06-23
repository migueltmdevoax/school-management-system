import * as groupsService from "./groups.service.js";
import db from "../../config/db.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getGroups = async (req, res) => {
  try {
    const { role } = req.user;
    let groups;

    if (role === "teacher") {
      // 🔥 Teacher solo ve sus propios grupos
      const teacherId = await resolveTeacherId(req.user);
      if (!teacherId) {
        return res.status(404).json({ success: false, message: "Teacher profile not found" });
      }
      groups = await groupsService.getGroupsByTeacher(teacherId);
    } else {
      // Admin y parent ven todos
      groups = await groupsService.getAllGroups();
    }

    return res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error("❌ getGroups error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch groups" });
  }
};