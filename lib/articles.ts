import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sections } from "./sections";

const articlesDirectory = path.join(process.cwd(), 'articles');

export function getSectionsList() {
  return sections;
}

export function getSectionWithLesson(id: string) {
  const thisSection = sections.find(section => section.lessons.map(lesson => lesson.id).indexOf(id) > -1);
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
