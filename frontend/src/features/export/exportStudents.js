import { convertToCSV } from "./csvExport";
import { downloadFile } from "./downloadFile";

export const exportStudents = (students = []) => {
  const formatted = students.map((s) => ({
    first_name: s.first_name,
    last_name:  s.last_name,
    email:      s.email,
  }));
  const csv = convertToCSV(formatted);
  downloadFile({ filename: "students.csv", content: csv });
};