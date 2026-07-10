#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function runBrowserDataScript(relativePath, sandbox) {
  const file = path.join(root, relativePath);
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const sandbox = { window: {} };
runBrowserDataScript(path.join('js', 'curriculum.js'), sandbox);
runBrowserDataScript(path.join('js', 'physics_course.js'), sandbox);

const course = sandbox.window.PHYSICS_COURSE;
const physicsTopics = sandbox.window.LEARNQUEST_CURRICULUM.subjects.physik.topics
  .filter((topic) => topic.available);
const findings = [];

for (const topic of physicsTopics) {
  if (!course.isPhysicsTopic(topic.id)) {
    findings.push(`${topic.id}: missing learning support or vocabulary`);
  }
}

for (const topicId of ['strahlung_radioaktivitaet', 'kraftwerke_energieversorgung']) {
  const topic = course.getTopic(topicId);
  if (!topic) {
    findings.push(`${topicId}: topic data missing`);
    continue;
  }
  if (!topic.title || !topic.subtitle || !topic.chapterCompassText) {
    findings.push(`${topicId}: title, subtitle or chapter compass missing`);
  }
  if (!Array.isArray(topic.sections) || topic.sections.length < 6) {
    findings.push(`${topicId}: expected at least six sections`);
    continue;
  }
  if (topic.script !== false) {
    findings.push(`${topicId}: topic must set script=false because interactions are shared`);
  }

  topic.sections.forEach((section, index) => {
    if (!section.title || typeof section.content !== 'string' || section.content.length < 500) {
      findings.push(`${topicId}[${index}]: section content is incomplete`);
    }
    if (!Array.isArray(section.quizzes) || section.quizzes.length < 4) {
      findings.push(`${topicId}[${index}]: expected at least four practice questions`);
    }
    for (const quiz of section.quizzes || []) {
      if (!section.content.includes(`{{QUIZ_${quiz.id}}}`)) {
        findings.push(`${topicId}[${index}]: missing placeholder for ${quiz.id}`);
      }
      if (!Array.isArray(quiz.answers) || quiz.answers.filter((answer) => answer.correct).length !== 1) {
        findings.push(`${topicId}[${index}]: ${quiz.id} needs exactly one correct answer`);
      }
      if ((quiz.answers || []).some((answer) => !answer.feedback || answer.feedback.length < 20)) {
        findings.push(`${topicId}[${index}]: ${quiz.id} has weak feedback`);
      }
    }
    if (!course.guideHtml(topicId, index)) {
      findings.push(`${topicId}[${index}]: section guide missing`);
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

console.log(`PHYSICS_COURSE_CLEAR (${physicsTopics.length} topics, 2 new complete chapters)`);
