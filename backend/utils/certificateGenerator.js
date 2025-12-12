exports.generateCertificate = (user, course) => {
  return {
    title: "Course Completion Certificate",
    awardedTo: user.name,
    courseName: course.title,
    date: new Date().toLocaleDateString(),
    message: "Congratulations on successfully completing the course!"
  };
};
