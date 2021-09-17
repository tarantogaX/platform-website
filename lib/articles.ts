import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'articles')
const sectionsFile = path.join(process.cwd(), 'lib', 'sections.json')

export function getSectionsList() {
  const sectionsListString = fs.readFileSync(sectionsFile, 'utf8')
  let sectionsList = JSON.parse(sectionsListString);
  return sectionsList.sections;
}

export function getSectionWithLesson(id: string) {
  const allSections = getSectionsList();
  const thisSection = allSections.find(section => section.lessons.map(lesson => lesson.id).indexOf(id) > -1);
  return thisSection;
}

export function getAllArticlesIds() {
    const fileNames = fs.readdirSync(articlesDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export function getArticlesData(id) {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  console.log(fullPath)

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
