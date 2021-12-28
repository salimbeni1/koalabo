import { gql } from "@apollo/client";

export const NEW_COURSE = gql`
  mutation
    AddNewCourse($className: String, $course: CourseI) {
        addNewCourse(className: $className , course: $course)
    }
  
`;