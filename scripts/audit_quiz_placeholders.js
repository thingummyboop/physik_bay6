const fs = require('fs');

const langFiles = fs.readdirSync('lang').filter(name => name.endsWith('.json')).sort();
const issues = [];

function collectSectionQuizIds(sections = []) {
  const ids = new Set();
  for (const section of sections) {
    for (const quiz of section.quizzes || []) {
      if (quiz?.id) ids.add(quiz.id);
    }
  }
  return ids;
}

for (const file of langFiles) {
  const data = JSON.parse(fs.readFileSync(`lang/${file}`, 'utf8'));
  for (const [topicId, topic] of Object.entries(data)) {
    if (!topic || typeof topic !== 'object' || !Array.isArray(topic.sections)) continue;

    const topicQuizIds = new Set((topic.quizzes || []).map(quiz => quiz?.id).filter(Boolean));
    const sectionQuizIds = collectSectionQuizIds(topic.sections);

    topic.sections.forEach((section, sectionIndex) => {
      const content = String(section.content || '');
      for (const match of content.matchAll(/\{\{QUIZ_([^}]+)\}\}/g)) {
        const quizId = match[1];
        if (!topicQuizIds.has(quizId) && !sectionQuizIds.has(quizId)) {
          issues.push(`${file}:${topicId}: section ${sectionIndex + 1} references missing quiz "${quizId}"`);
        }
      }
    });
  }
}

if (issues.length > 0) {
  console.error('Quiz placeholder audit failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('QUIZ_PLACEHOLDERS_CLEAR');
