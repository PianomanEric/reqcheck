const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const axios = require('axios');
const { parse: parseHTML } = require('node-html-parser');

router.get('/', (req, res) => {
  db.query('SELECT * FROM reference').then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log(err);
    console.log("Could not search courses!");
    return res.json([]);
  });
})

router.get('/searchByRequirement', (req, res) => {
  console.log("Searching by requirement");
  const searchQuery = req.query.query;
  console.log(searchQuery);
  db.query('SELECT * FROM reference WHERE subarea LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log("Could not search courses!");
    console.log(err.stack)
    return res.json([]);
  });
});

router.get('/search', (req, res) => {
  const searchQuery = req.query.query.replaceAll(/( )/g, '');
  console.log(searchQuery);
  db.query('SELECT * FROM reference WHERE codeID LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log("Could not search courses!");
    console.log(err.stack)
    return res.json([]);
  });
});

// ^([a-zA-Z ]+\d+\w*) (.+) \(Units: (.+)\)$

// Scrape all courses from SFSU's website
// This might help for populating our database
router.get('/scrape', (req, res) => {
  axios.get('https://bulletin.sfsu.edu/courses').then((axiosRes) => {
    const root = parseHTML(axiosRes.data);
    const subjectAnchors = root.querySelectorAll('#atozindex li a');
    const promises = [];
    for (const anchor of subjectAnchors) {
      const path = anchor.attributes.href
      promises.push(new Promise((resolve, reject) => {
        axios.get(`https://bulletin.sfsu.edu${path}`).then((axiosRes) => {
          const root = parseHTML(axiosRes.data);
          const courseDivs = root.querySelectorAll('.sc_sccoursedescs .courseblock');
          const courses = [];
          for (const div of courseDivs) {
            const courseTitleElement = div.querySelector('.courseblocktitle strong');
            const fullCourseTitle = courseTitleElement?.innerHTML.trim();
            const results = fullCourseTitle?.match(/^([A-Z \u00A0]+\d+\w*)[ ]+(.+?) *\(Units: (.+)\)$/i);
            if (results) {
              const courseID = results[1].replaceAll(/[\u00A0 ]+/gi, '');
              const title = results[2];
              const units = results[3];
              const courseDescriptionElement = div.querySelector('.courseblockdesc');
              let description = courseDescriptionElement?.innerHTML || '';
              for (const node of div.childNodes) {
                if (node.nodeType == 3) {
                  description += '\n' + node.innerText;
                }
              }
              description = description.trim();
              courses.push({courseID, title, units, description});
            }
          }
          resolve(courses);
        })
      }));
    }
    Promise.all(promises).then((allCourses) => {
      let count = 0;
      const courseData = [];
      for (const subjectCourses of allCourses) {
        for (const course of subjectCourses) {
          count += 1;
          courseData.push(course);
        }
      }
      console.log(`${count} courses found!`);
      return res.json(courseData);
    })
  })
});

router.get('/:courseID', (req, res) => {
  const courseID = req.params.courseID;
  db.query('SELECT * FROM reference WHERE codeID = ?', [courseID]).then(([results, fields]) => {
    if (results.length == 1) {
      return res.json(results[0]);
    } else {
      return res.json([]);
    }
  }).catch((err) => {
    return res.json([]);
  });
});

module.exports = router;