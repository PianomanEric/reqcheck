const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const axios = require('axios');
const { parse: parseHTML } = require('node-html-parser');
const { decode: decodeHTMLEntities } = require('html-entities');

router.get('/', (req, res) => {
  db.query('SELECT * FROM demo').then(([results, fields]) => {
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
  db.query('SELECT * FROM demo WHERE subarea LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
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
  db.query('SELECT * FROM demo WHERE codeID LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
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
// Additional info to scrape: attributes, prerequisites
router.get('/scrape', (req, res) => {
  axios.get('https://bulletin.sfsu.edu/courses').then((axiosRes) => {
    const root = parseHTML(axiosRes.data);
    const subjectAnchors = root.querySelectorAll('#atozindex li a');
    const promises = [];
    const attributeSet = new Set();

    let longestDescription = 0;

    for (const anchor of subjectAnchors) {
      const path = anchor.attributes.href
      promises.push(new Promise((resolve, reject) => {
        axios.get(`https://bulletin.sfsu.edu${path}`).then((axiosRes) => {
          const root = parseHTML(axiosRes.data);
          const courseDivs = root.querySelectorAll('.sc_sccoursedescs .courseblock');
          const courses = [];
          for (const div of courseDivs) {
            const courseTitleElement = div.querySelector('.courseblocktitle strong');
            const fullCourseTitle = decodeHTMLEntities(courseTitleElement?.innerHTML).trim();
            const results = fullCourseTitle?.match(/^([A-Z \u00A0]+)(\d+\w*)[ ]+(.+?) *\(Units?: (.+)\)$/i);
            if (results) {
              const subject = results[1].trim().replaceAll(/[\u00A0 ]+/gi, '-');
              const courseNumber = results[2].replaceAll(/[\u00A0 ]+/gi, '').trim();
              const courseID = subject + courseNumber;
              const title = results[3];
              const units = results[4];
              const courseInt = parseInt(courseNumber);
              const division = (courseInt < 300) ? 'Lower' : 'Upper';

              const courseDescriptionElement = div.querySelector('.courseblockdesc');
              let description = '';

              if (courseDescriptionElement) {
                for (const node of courseDescriptionElement.childNodes) {
                  if (node.nodeType == 3) {
                    description += node.innerText;
                  } else if (node.tagName == "A") {
                    description += node.innerText;
                  } else if (node.tagName == "BR") {
                    description += '\n';
                  }
                }
                description += '\n';
              }

              for (const node of div.childNodes) {
                if (node.nodeType == 3) {
                  description += node.innerText;
                } else if (node.tagName == "A") {
                  description += node.innerText;
                } else if (node.tagName == "BR") {
                  description += '\n';
                }
              }
              description = decodeHTMLEntities(description).trim();

              const attributesElements = div.querySelectorAll('ul li');
              const attributes = [];
              const areas = [];
              if (attributesElements) {
                for (const attributeElement of attributesElements) {
                  const attribute = decodeHTMLEntities(attributeElement.innerText);
                  attributes.push(attribute);
                  attributeSet.add(attribute);
                  const attributeSegments = attribute.split(':');
                  if (attributeSegments.length > 1) {
                    areas.push(attributeSegments[0]);
                  }
                }
              }

              if (areas.length === 0) {
                areas.push(subject);
              }

              longestDescription = Math.max(longestDescription, description.length);
              if (longestDescription === description.length) {
                console.log(courseID);
              }

              courses.push({courseID, title, units, areas, division, description, attributes});
              //courses.push(courseID);
            } else {
              console.log(`No results ${fullCourseTitle}`);
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
      let numAttributes = 0;
      attributeSet.forEach((key) => {
        console.log(key);
        numAttributes += 1;
      });
      console.log(`${numAttributes} attributes found!`);
      console.log(longestDescription);
      return res.json(courseData);
    })
  })
});

router.get('/:courseID', (req, res) => {
  const courseID = req.params.courseID;
  db.query('SELECT * FROM demo WHERE codeID = ?', [courseID]).then(([results, fields]) => {
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