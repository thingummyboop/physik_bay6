#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const physicsSource = fs.readFileSync(path.join(root, 'js', 'physics_course.js'), 'utf8');
const physicsBlock = indexSource.match(/physik:\s*\{\s*topics:\s*\[([\s\S]*?)\]\s*\},\s*dgb:/);
const findings = [];

if (!physicsBlock) {
  console.error('PHYSICS_COURSE_ISSUES');
  console.error('- Physics navigation block was not found in index.html');
  process.exit(1);
}

const navigationIds = [...physicsBlock[1].matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const sandbox = { window: {} };
vm.runInNewContext(physicsSource, sandbox, { filename: 'js/physics_course.js' });
const course = sandbox.window.PHYSICS_COURSE;

if (!course) {
  console.error('PHYSICS_COURSE_ISSUES');
  console.error('- window.PHYSICS_COURSE is missing');
  process.exit(1);
}

for (const topicId of navigationIds) {
  if (!course.isPhysicsTopic(topicId)) {
    findings.push(`${topicId}: learning support or vocabulary missing`);
  }
}

for (const topicId of ['strahlung_radioaktivitaet', 'kraftwerke_energieversorgung']) {
  if (!navigationIds.includes(topicId)) {
    findings.push(`${topicId}: missing from physics navigation`);
  }

  const topic = course.getTopic(topicId);
  if (!topic?.title || !topic.subtitle || !topic.chapterCompassText) {
    findings.push(`${topicId}: title, subtitle or chapter compass missing`);
    continue;
  }
  if (!Array.isArray(topic.sections) || topic.sections.length < 6) {
    findings.push(`${topicId}: expected at least six sections`);
    continue;
  }
  if (topic.script !== false) {
    findings.push(`${topicId}: shared interactions require script=false`);
  }

  topic.sections.forEach((section, sectionIndex) => {
    if (!section.title || typeof section.content !== 'string' || section.content.length < 500) {
      findings.push(`${topicId}[${sectionIndex}]: section content is incomplete`);
    }
    if (!Array.isArray(section.quizzes) || section.quizzes.length < 4) {
      findings.push(`${topicId}[${sectionIndex}]: expected at least four practice questions`);
    }
    for (const quiz of section.quizzes || []) {
      if (!section.content.includes(`{{QUIZ_${quiz.id}}}`)) {
        findings.push(`${topicId}[${sectionIndex}]: placeholder for ${quiz.id} missing`);
      }
      if (!Array.isArray(quiz.answers) || quiz.answers.filter((answer) => answer.correct).length !== 1) {
        findings.push(`${topicId}[${sectionIndex}]: ${quiz.id} needs exactly one correct answer`);
      }
      if ((quiz.answers || []).some((answer) => !answer.feedback || answer.feedback.length < 20)) {
        findings.push(`${topicId}[${sectionIndex}]: ${quiz.id} has weak feedback`);
      }
    }
    if (!course.guideHtml(topicId, sectionIndex)) {
      findings.push(`${topicId}[${sectionIndex}]: section guide missing`);
    }
  });

  if (!Array.isArray(topic.diplom?.questions) || topic.diplom.questions.length < 8) {
    findings.push(`${topicId}: chapter check needs at least eight questions`);
  }
}

if (findings.length) {
  console.error(`PHYSICS_COURSE_ISSUES (${findings.length})`);
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log(`PHYSICS_COURSE_CLEAR (${navigationIds.length} topics, 2 complete new chapters)`);
