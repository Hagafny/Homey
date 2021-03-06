// TODO: Get rid of the INTERVAL 3/2 hours - this will break if we're on another country or daylight savings time
// We need to save the date as UTC and remove this later.
const getAssingments = classIds =>
  `SELECT ass.*, cr.id as course_id,
       cr.title as course_title,
       cr.piazza_id,
       cr.drive_lectures_url,
       cr.classboost_id,
       cr.moodle_course_id,
       cr.trello_id
FROM
  (SELECT *
   FROM public.assignments AS ass
   WHERE end_date > CURRENT_TIMESTAMP + INTERVAL '3 hours' ) AS ass
LEFT JOIN public.courses AS cr ON ass.course_id = cr.id WHERE cr.class_id IN (${classIds})
  ORDER BY end_date ASC;`;

const service = {
  getAssingments
};

module.exports = service;
