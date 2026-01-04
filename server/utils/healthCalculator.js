export const calculateHealth = (subjects, deadlines) => {
  // ---------- ATTENDANCE ----------
  const attendanceScore =
    subjects.length === 0
      ? 0
      : subjects.reduce(
          (acc, s) => acc + (s.attended / s.total) * 100,
          0
        ) / subjects.length;

  // ---------- DEADLINES ----------
  const completed = deadlines.filter(d => d.completed).length;
  const deadlineScore =
    deadlines.length === 0
      ? 0
      : (completed / deadlines.length) * 100;

  // ---------- OVERALL ----------
  const overall = Math.round(
    attendanceScore * 0.6 + deadlineScore * 0.4
  );

  // ---------- STATUS ----------
  let status = "Critical";
  if (overall >= 75) status = "On Track";
  else if (overall >= 60) status = "Needs Attention";

  return {
    overall,
    status,
    attendanceScore: attendanceScore.toFixed(1),
    deadlineScore: deadlineScore.toFixed(1),
    totalSubjects: subjects.length,
    subjects
  };
};

