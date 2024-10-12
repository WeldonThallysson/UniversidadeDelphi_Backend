import prismaClient from "../../prisma";

interface IGetAllClassService {
  id_category: string
  id_course: string;
  name: string;
  tag: string;
  data: string;
  tutor: string;
}

class GetAllClassService {
  async execute({
    name,
    id_category,
    id_course,
    tag,
    data,
    tutor,
  }: IGetAllClassService) {
    if (name) {
      const getAllCourseFiltered = await prismaClient.class.findMany({
        ...((name || id_category || tag || data || tutor || id_course) && {
          where: {
            name: name,
            id_category: id_category,
            tag: tag,
            data: data,
            tutor: tutor,
            id_course: id_course,
          },
          select: {
            id: true,
            name: true,
            description: true,
            data: true,
            tag: true,
            tutor: true,
            urlVideo: true,
            urlImage: true,
            id_author: true,
            idURLVideo: true,
            id_course: true,
            id_category: true,
            status: true,
            created_At: true,
          },
        }),
      });

      return {
        data: getAllCourseFiltered,
        status: 200,
      };
    } else {
      const getAllCourse = await prismaClient.courses.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          class: true,
          data: true,
          category_id: true,
          id_author: true,
          urlImage: true,
          status: true,
          created_At: true,
        },
      });

      return {
        data: getAllCourse,
        status: 200,
      };
    }
  }
}

export { GetAllClassService };
