const decodeCourseID = (rawCourseID) => {
    return rawCourseID?.replace(/^([a-zA-Z\-]+)/g, '$1 ').replace('-', ' ');
}

const encodeCourseID = (formattedCourseID) => {
    const destructedCourseID = formattedCourseID?.match(/^([A-Z ]+)(\d+\w*)$/i);
    console.log("Match?");
    console.log(destructedCourseID);
    if (destructedCourseID) {
        return destructedCourseID[1].trim().replace(' ', '-') + destructedCourseID[2].trim().replace(' ', '');
    }
}

module.exports = { decodeCourseID, encodeCourseID }